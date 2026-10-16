import { createHash, randomBytes, randomFillSync } from "node:crypto";
import { appendFile, mkdir, readFile, writeFile } from "node:fs/promises";
import { performance } from "node:perf_hooks";
import { parseArgs } from "node:util";
import type { Files } from "files-sdk";
import { Agent, getGlobalDispatcher, setGlobalDispatcher } from "undici";
import { z } from "zod";
import { isProviderId, loadProviders, type Provider, type ProviderId } from "./providers.ts";

/** Object sizes that stand in for real app payloads. */
const sizes = [
  { name: "1KB", bytes: 1024, what: "JSON, metadata" },
  { name: "100KB", bytes: 100 * 1024, what: "avatars, thumbnails" },
  { name: "1MB", bytes: 1024 * 1024, what: "photos" },
  { name: "10MB", bytes: 10 * 1024 * 1024, what: "PDFs, audio" },
  { name: "100MB", bytes: 100 * 1024 * 1024, what: "video (multipart upload)" },
] as const;
type SizeName = (typeof sizes)[number]["name"];

const profiles = {
  smoke: { "1KB": 3, "100KB": 3, "1MB": 2, "10MB": 1, "100MB": 0, cold: 2, concurrencyRounds: 1, listRounds: 1, listObjects: 100, extrasRounds: 2 },
  full: { "1KB": 60, "100KB": 60, "1MB": 30, "10MB": 20, "100MB": 8, cold: 20, concurrencyRounds: 10, listRounds: 6, listObjects: 1000, extrasRounds: 20 },
} as const satisfies Record<
  string,
  Record<SizeName, number> & Record<"cold" | "concurrencyRounds" | "listRounds" | "listObjects" | "extrasRounds", number>
>;
type ProfileName = keyof typeof profiles;
const isProfileName = (v: string): v is ProfileName => v in profiles;

// The AWS SDK retries throttles and 5xx three times by default, which hides failures inside latency.
// The other SDKs don't, so every provider gets exactly one attempt and failures are counted.
process.env.AWS_MAX_ATTEMPTS = "1";

/** Parallel uploads and downloads, like a gallery page. */
const CONCURRENCY = 16;
/** A bigger burst of parallel uploads, reported on its own. */
const BURST = 32;
const CONCURRENT_SIZE = 100 * 1024;

type Op =
  | "upload"
  | "head"
  | "download"
  /** A presigned GET URL fetched with plain fetch(): the same HTTP path a browser takes. */
  | "url-get"
  | "delete"
  | "first-request"
  | "concurrent-upload"
  | "concurrent-download"
  | "burst-upload"
  | "list-all"
  /** A browser-style direct upload: fetch() PUT/POST to a URL from signedUploadUrl(). */
  | "signed-upload"
  /** 256 KB from the middle of a 10 MB object, like seeking in a video. */
  | "range-get"
  /** copy() of a 10 MB object, on providers that copy server-side. */
  | "copy";

export type Sample = {
  readonly provider: ProviderId;
  readonly op: Op;
  readonly size: string;
  readonly round: number;
  readonly ms: number;
  /**
   * Time to the first body chunk. Only url-get measures raw HTTP TTFB; for SDK downloads it is
   * "time until the SDK yields the first chunk", which depends on how each adapter buffers.
   */
  readonly ttfbMs?: number;
  readonly bytes: number;
  readonly ok: boolean;
  readonly error?: string;
  readonly at: string;
};

const args = parseArgs({
  options: {
    profile: { type: "string", default: "smoke" },
    providers: { type: "string" },
    client: { type: "string", default: "local" },
    out: { type: "string", default: "results/raw" },
    /** `all` runs everything; `list` reruns only the listing test (e.g. after a seed was throttled). */
    suite: { type: "string", default: "all" },
    /** Git commit of the harness, recorded in the run metadata. */
    "code-version": { type: "string", default: "unknown" },
  },
});

const profileArg = args.values.profile;
if (!isProfileName(profileArg)) throw new Error(`--profile must be one of: ${Object.keys(profiles).join(", ")}`);
const profile = profiles[profileArg];
const suite = args.values.suite;
if (suite !== "all" && suite !== "list") throw new Error("--suite must be all or list");

const only = args.values.providers?.split(",").map((s) => s.trim());
const badIds = only?.filter((id) => !isProviderId(id)) ?? [];
if (badIds.length > 0) throw new Error(`Unknown provider(s): ${badIds.join(", ")}`);

const providers = loadProviders({ env: process.env, only: only?.filter(isProviderId) });
if (providers.length === 0) throw new Error("No providers have credentials set. See .env.example.");

const runId = `${new Date().toISOString().replace(/[:.]/g, "-")}-${args.values.client}`;
// Short, slash-free keys ([a-zA-Z0-9._-], max 36 chars) work on every adapter. Every provider gets the same keys.
const keyTag = randomBytes(3).toString("hex");
let keySeq = 0;
const nextKey = (): string => `b${keyTag}-${(keySeq++).toString(36)}`;

await mkdir(args.values.out, { recursive: true });
const samplesPath = `${args.values.out}/${runId}.jsonl`;

const record = async (sample: Omit<Sample, "at">): Promise<void> => {
  const full: Sample = { ...sample, at: new Date().toISOString() };
  await appendFile(samplesPath, `${JSON.stringify(full)}\n`);
};

const errorText = (err: unknown): string => (err instanceof Error ? `${err.name}: ${err.message}` : String(err));

/** Random, incompressible bytes. A fresh body per upload rules out dedup or caching. */
const freshBody = (bytes: number): Uint8Array<ArrayBuffer> => {
  const body = new Uint8Array(bytes);
  randomFillSync(body);
  return body;
};

const sha256 = (data: Uint8Array): string => createHash("sha256").update(data).digest("hex");

const shuffle = <T>(items: readonly T[]): T[] => {
  const out = [...items];
  for (let i = out.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const a = out[i];
    const b = out[j];
    if (a === undefined || b === undefined) continue;
    out[i] = b;
    out[j] = a;
  }
  return out;
};

/** Drains a stream, returning the bytes and the time the first chunk arrived. */
const drain = async (stream: ReadableStream<Uint8Array>, start: number): Promise<{ data: Uint8Array; ttfbMs: number }> => {
  const reader = stream.getReader();
  const chunks: Uint8Array[] = [];
  let ttfbMs = -1;
  let total = 0;
  for (;;) {
    const { done, value } = await reader.read();
    if (done) break;
    if (ttfbMs < 0) ttfbMs = performance.now() - start;
    chunks.push(value);
    total += value.byteLength;
  }
  const data = new Uint8Array(total);
  let offset = 0;
  for (const c of chunks) {
    data.set(c, offset);
    offset += c.byteLength;
  }
  return { data, ttfbMs: ttfbMs < 0 ? performance.now() - start : ttfbMs };
};

/** Runs `fn`, records its timing, and never throws: one provider failing must not stop the others. */
const timed = async (
  base: { provider: ProviderId; op: Op; size: string; round: number; bytes: number },
  fn: () => Promise<{ ttfbMs?: number } | void>,
): Promise<boolean> => {
  const start = performance.now();
  try {
    const extra = await fn();
    await record({ ...base, ms: performance.now() - start, ok: true, ...(extra ?? {}) });
    return true;
  } catch (err) {
    await record({ ...base, ms: performance.now() - start, ok: false, error: errorText(err) });
    return false;
  }
};

const verify = (got: Uint8Array, expected: string): void => {
  if (sha256(got) !== expected) throw new Error(`Integrity check failed (${got.byteLength} bytes)`);
};

/** One full round trip for a single object: upload, head, download, presigned GET, delete. */
const roundTrip = async ({ p, files, size, round }: { p: Provider; files: Files; size: (typeof sizes)[number]; round: number }) => {
  const key = nextKey();
  const body = freshBody(size.bytes);
  const hash = sha256(body);
  const base = { provider: p.id, size: size.name, round, bytes: size.bytes };
  const multipart = size.bytes >= 100 * 1024 * 1024;

  const uploaded = await timed({ ...base, op: "upload" }, async () => {
    await files.upload(key, body, { contentType: "application/octet-stream", ...(multipart ? { multipart: true } : {}) });
  });
  if (!uploaded) return;

  await timed({ ...base, op: "head" }, async () => {
    const info = await files.head(key);
    if (info.size !== size.bytes) throw new Error(`head size ${info.size} != ${size.bytes}`);
  });

  await timed({ ...base, op: "download" }, async () => {
    const start = performance.now();
    const file = await files.download(key, { as: "stream" });
    const { data, ttfbMs } = await drain(file.stream(), start);
    verify(data, hash);
    return { ttfbMs };
  });

  // Signing is local; time only what a browser would do with the URL. Providers without signed URLs use
  // their permanent public URL if they have one, and skip this step otherwise.
  const caps = files.capabilities;
  let url: string | undefined;
  try {
    url = caps.signedUrl.supported ? await files.url(key, { expiresIn: 600 }) : caps.publicUrl ? await files.url(key) : undefined;
  } catch (err) {
    // Some adapters fetch the URL from the provider; a failed lookup is a failed read, not a crashed run.
    await record({ ...base, op: "url-get", ms: 0, ok: false, error: `url: ${errorText(err)}` });
  }
  if (url !== undefined) await timed({ ...base, op: "url-get" }, async () => {
    const start = performance.now();
    const res = await fetch(url);
    if (!res.ok || res.body === null) throw new Error(`HTTP ${res.status}`);
    const { data, ttfbMs } = await drain(res.body, start);
    verify(data, hash);
    return { ttfbMs };
  });

  await timed({ ...base, op: "delete" }, async () => {
    await files.delete(key);
  });
};

const pool = async <T>(items: readonly T[], limit: number, fn: (item: T) => Promise<void>): Promise<void> => {
  let next = 0;
  const workers = Array.from({ length: Math.min(limit, items.length) }, async () => {
    while (next < items.length) {
      const item = items[next++];
      if (item !== undefined) await fn(item);
    }
  });
  await Promise.all(workers);
};

const makeObjects = (count: number) =>
  Array.from({ length: count }, () => {
    const body = freshBody(CONCURRENT_SIZE);
    return { key: nextKey(), body, hash: sha256(body) };
  });

/** 16 uploads then 16 downloads of 100 KB in parallel, like a gallery page or a batch import. */
const concurrentRound = async ({ p, files, round }: { p: Provider; files: Files; round: number }) => {
  const objects = makeObjects(CONCURRENCY);
  const base = { provider: p.id, size: `${CONCURRENCY}x100KB`, round, bytes: CONCURRENCY * CONCURRENT_SIZE };
  try {
    const uploaded = await timed({ ...base, op: "concurrent-upload" }, async () => {
      await Promise.all(objects.map((o) => files.upload(o.key, o.body, { contentType: "application/octet-stream" })));
    });
    if (!uploaded) return;
    await timed({ ...base, op: "concurrent-download" }, async () => {
      await Promise.all(
        objects.map(async (o) => {
          // Same streaming path as the single-object download.
          const f = await files.download(o.key, { as: "stream" });
          const { data } = await drain(f.stream(), performance.now());
          verify(data, o.hash);
        }),
      );
    });
  } finally {
    await Promise.allSettled(objects.map((o) => files.delete(o.key)));
  }
};

/** 32 parallel uploads, to show how each provider handles a burst. */
const burstRound = async ({ p, files, round }: { p: Provider; files: Files; round: number }) => {
  const objects = makeObjects(BURST);
  try {
    await timed({ provider: p.id, op: "burst-upload", size: `${BURST}x100KB`, round, bytes: BURST * CONCURRENT_SIZE }, async () => {
      await Promise.all(objects.map((o) => files.upload(o.key, o.body, { contentType: "application/octet-stream" })));
    });
  } finally {
    await Promise.allSettled(objects.map((o) => files.delete(o.key)));
  }
};

/** Retries setup steps (never measured ones) with capped backoff, for providers that throttle bursts of writes. */
const withSetupRetries = async (fn: () => Promise<unknown>): Promise<void> => {
  for (let attempt = 0; ; attempt++) {
    try {
      await fn();
      return;
    } catch (err) {
      if (attempt >= 8) throw err;
      await new Promise((r) => setTimeout(r, Math.min(8000, 500 * 2 ** attempt)));
    }
  }
};

/** Seeds N small objects under one prefix, then times walking the whole listing. */
const listTest = async ({ p, files }: { p: Provider; files: Files }) => {
  if (p.canList === false) return;
  const prefix = `l${keyTag}${p.id.replace(/[^a-z0-9]/g, "")}-`;
  const keys = Array.from({ length: profile.listObjects }, (_, i) => `${prefix}${i.toString().padStart(4, "0")}`);
  const seeded: string[] = [];
  try {
    // Seeding is setup, not measured: go gently and retry throttled seeds so the listing has the full count.
    await pool(keys, 8, async (key) => {
      await withSetupRetries(() => files.upload(key, freshBody(1024), { contentType: "application/octet-stream" }));
      seeded.push(key);
    });
    for (let round = 0; round < profile.listRounds; round++) {
      await timed({ provider: p.id, op: "list-all", size: `${profile.listObjects} objects`, round, bytes: 0 }, async () => {
        let count = 0;
        for await (const _item of files.listAll({ prefix })) count++;
        if (count !== keys.length) throw new Error(`listed ${count}, expected ${keys.length}`);
      });
    }
  } catch (err) {
    await record({ provider: p.id, op: "list-all", size: `${profile.listObjects} objects`, round: -1, ms: 0, bytes: 0, ok: false, error: `seed failed: ${errorText(err)}` });
  } finally {
    await pool(seeded, CONCURRENCY, async (key) => {
      await files.delete(key).catch(() => undefined);
    });
  }
};

/**
 * A brand-new SDK client per sample, so each HEAD opens a new TCP + TLS connection, like the first request
 * after a deploy or a serverless cold start. Node does not cache DNS itself; the OS resolver may.
 */
const RANGE_BYTES = 256 * 1024;
const COPY_SIZE = 10 * 1024 * 1024;

/** Patterns real apps use beyond plain upload/download: direct browser uploads, seeking, and copies. */
const extrasRound = async ({ p, files, round }: { p: Provider; files: Files; round: number }) => {
  const caps = files.capabilities;

  if (caps.signedUpload.supported) {
    const key = nextKey();
    const body = freshBody(1024 * 1024);
    try {
      // Minting the URL is a server-side step in a real app; time only the client's upload.
      const target = await files.signedUploadUrl(key, { expiresIn: 600, contentType: "application/octet-stream" });
      await timed({ provider: p.id, op: "signed-upload", size: "1MB", round, bytes: body.byteLength }, async () => {
        const form = (fields: Record<string, string>): FormData => {
          const f = new FormData();
          for (const [k, v] of Object.entries(fields)) f.append(k, v);
          f.append("file", new Blob([body], { type: "application/octet-stream" }));
          return f;
        };
        const res =
          target.method === "PUT"
            ? await fetch(target.url, {
                method: "PUT",
                // Send exactly the signed headers: an extra Content-Type would be merged in and break the signature.
                body,
                headers: target.headers ?? {},
              })
            : await fetch(target.url, {
                method: "POST",
                body: form(target.fields),
              });
        if (!res.ok) throw new Error(`HTTP ${res.status}: ${(await res.text()).slice(0, 120)}`);
      });
      const info = await files.head(key);
      if (info.size !== body.byteLength) {
        await record({ provider: p.id, op: "signed-upload", size: "1MB", round, ms: 0, bytes: 0, ok: false, error: `stored size ${info.size}` });
      }
    } catch (err) {
      await record({ provider: p.id, op: "signed-upload", size: "1MB", round, ms: 0, bytes: 0, ok: false, error: `setup: ${errorText(err)}` });
    } finally {
      await files.delete(key).catch(() => undefined);
    }
  }

  const src = nextKey();
  const body = freshBody(COPY_SIZE);
  const uploaded = await files.upload(src, body, { contentType: "application/octet-stream" }).then(
    () => true,
    (err: unknown) => {
      log(`extras seed ${p.id}: ${errorText(err)}`);
      return false;
    },
  );
  if (!uploaded) return;
  try {
    if (caps.rangeRead) {
      const start = Math.floor(Math.random() * (COPY_SIZE - RANGE_BYTES));
      const expected = sha256(body.subarray(start, start + RANGE_BYTES));
      await timed({ provider: p.id, op: "range-get", size: "256KB of 10MB", round, bytes: RANGE_BYTES }, async () => {
        const t0 = performance.now();
        const file = await files.download(src, { as: "stream", range: { start, end: start + RANGE_BYTES - 1 } });
        const { data, ttfbMs } = await drain(file.stream(), t0);
        verify(data, expected);
        return { ttfbMs };
      });
    }
    // Only server-side copies: a client-side fallback would time a download plus an upload instead.
    if (caps.serverSideCopy) {
      const dst = nextKey();
      await timed({ provider: p.id, op: "copy", size: "10MB", round, bytes: COPY_SIZE }, async () => {
        await files.copy(src, dst);
      });
      await files.delete(dst).catch(() => undefined);
    }
  } finally {
    await files.delete(src).catch(() => undefined);
  }
};

const firstRequest = async ({ p, round, key }: { p: Provider; round: number; key: string }) => {
  // The AWS SDK opens new sockets per client, but fetch-based adapters (Appwrite, Convex) share Node's global
  // pool, which would hand them a warm connection. A fresh pool per sample makes their first request cold too.
  const shared = getGlobalDispatcher();
  const pool = new Agent();
  setGlobalDispatcher(pool);
  try {
    const files = p.connect();
    await timed({ provider: p.id, op: "first-request", size: "1KB", round, bytes: 0 }, async () => {
      await files.head(key);
    });
  } finally {
    setGlobalDispatcher(shared);
    await pool.close();
  }
};

const clientInfo = async (): Promise<unknown> => {
  try {
    const res = await fetch("https://ipinfo.io/json");
    const parsed = z
      .object({ city: z.string(), region: z.string(), country: z.string(), org: z.string() })
      .partial()
      .safeParse(await res.json());
    if (parsed.success) return parsed.data;
  } catch {
    // Location is metadata only; the run doesn't need it.
  }
  return undefined;
};

const log = (msg: string): void => {
  process.stderr.write(`[${new Date().toISOString().slice(11, 19)}] ${msg}\n`);
};

const main = async () => {
  const clients = new Map(providers.map((p) => [p.id, p.connect()] as const));
  const pkg = z.object({ version: z.string() }).parse(JSON.parse(await readFile("node_modules/files-sdk/package.json", "utf8")));
  await writeFile(
    `${args.values.out}/${runId}.meta.json`,
    JSON.stringify(
      {
        runId,
        client: args.values.client,
        location: await clientInfo(),
        profile: profileArg,
        providers: providers.map((p) => ({ id: p.id, label: p.label, region: p.region })),
        node: process.version,
        filesSdk: pkg.version,
        codeVersion: args.values["code-version"],
        startedAt: new Date().toISOString(),
      },
      null,
      2,
    ),
  );
  log(`run ${runId}: ${providers.map((p) => p.id).join(", ")} (profile ${profileArg})`);

  // Warmup: open connections and let each provider route us before anything is measured.
  for (const p of providers) {
    const files = clients.get(p.id);
    if (!files) continue;
    for (let i = 0; i < 3; i++) {
      const key = nextKey();
      await files.upload(key, freshBody(1024)).catch((e: unknown) => log(`warmup ${p.id}: ${errorText(e)}`));
      await files.delete(key).catch(() => undefined);
    }
  }

  if (suite === "list") {
    for (const p of shuffle(providers)) {
      const files = clients.get(p.id);
      if (files) await listTest({ p, files });
    }
    log(`list done. Samples: ${samplesPath}`);
    return;
  }

  for (const size of sizes) {
    const rounds = profile[size.name];
    for (let round = 0; round < rounds; round++) {
      // Interleave providers and shuffle their order so a slow network minute hits everyone, not one provider.
      for (const p of shuffle(providers)) {
        const files = clients.get(p.id);
        if (p.maxObjectBytes !== undefined && size.bytes > p.maxObjectBytes) continue;
        if (files) await roundTrip({ p, files, size, round });
      }
    }
    log(`${size.name} done`);
  }

  for (let round = 0; round < profile.concurrencyRounds; round++) {
    for (const p of shuffle(providers)) {
      const files = clients.get(p.id);
      if (files) await concurrentRound({ p, files, round });
    }
  }
  for (let round = 0; round < profile.concurrencyRounds; round++) {
    for (const p of shuffle(providers)) {
      const files = clients.get(p.id);
      if (files) await burstRound({ p, files, round });
    }
  }
  log("concurrency done");

  // One existing object per provider to HEAD from fresh clients. Creating it is setup and comes right after
  // the burst test, so it retries in case the provider is still throttling; a provider without it is skipped.
  const probeKey = nextKey();
  const probed: Provider[] = [];
  for (const p of providers) {
    const files = clients.get(p.id);
    if (!files) continue;
    try {
      await withSetupRetries(() => files.upload(probeKey, freshBody(1024)));
      probed.push(p);
    } catch (err) {
      await record({ provider: p.id, op: "first-request", size: "1KB", round: -1, ms: 0, bytes: 0, ok: false, error: `seed failed: ${errorText(err)}` });
    }
  }
  for (let round = 0; round < profile.cold; round++) {
    for (const p of shuffle(probed)) await firstRequest({ p, round, key: probeKey });
  }
  for (const p of providers) await clients.get(p.id)?.delete(probeKey).catch(() => undefined);
  log("first requests done");

  for (let round = 0; round < profile.extrasRounds; round++) {
    for (const p of shuffle(providers)) {
      const files = clients.get(p.id);
      if (files) await extrasRound({ p, files, round });
    }
  }
  log("extras done");

  for (const p of shuffle(providers)) {
    const files = clients.get(p.id);
    if (files) await listTest({ p, files });
  }
  log(`list done. Samples: ${samplesPath}`);
};

await main();
