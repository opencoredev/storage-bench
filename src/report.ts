import { readdir, readFile, writeFile } from "node:fs/promises";
import { parseArgs } from "node:util";
import { z } from "zod";
import { isProviderId } from "./providers.ts";

const sampleSchema = z.object({
  provider: z.string(),
  op: z.string(),
  size: z.string(),
  round: z.number(),
  ms: z.number(),
  ttfbMs: z.number().optional(),
  bytes: z.number(),
  ok: z.boolean(),
  error: z.string().optional(),
  at: z.iso.datetime(),
});
type Sample = z.infer<typeof sampleSchema>;

const metaSchema = z.object({
  runId: z.string(),
  client: z.string(),
  profile: z.string(),
  // City is left out on purpose: one client is a home server. Region and network are enough to place a run.
  location: z.object({ region: z.string(), country: z.string(), org: z.string() }).partial().optional(),
  providers: z.array(z.object({ id: z.string(), label: z.string(), region: z.string() })),
  node: z.string(),
  filesSdk: z.string(),
  startedAt: z.string(),
});

const args = parseArgs({
  options: {
    in: { type: "string", default: "results/raw" },
    out: { type: "string", default: "results" },
    exclusions: { type: "string", default: "results/exclusions.json" },
  },
});

/**
 * Time windows where a client machine itself stalled, or where an account-side limit blocked a provider (not the
 * provider's own service). Samples overlapping them are dropped. `client: "*"` matches every client, and `provider`
 * narrows a window to one provider.
 */
const exclusionSchema = z.array(
  z.object({ client: z.string(), provider: z.string().optional(), from: z.iso.datetime(), to: z.iso.datetime(), reason: z.string() }),
);
const loadExclusions = async (): Promise<z.infer<typeof exclusionSchema>> => {
  try {
    return exclusionSchema.parse(JSON.parse(await readFile(args.values.exclusions, "utf8")));
  } catch (err) {
    if (err instanceof Error && "code" in err && err.code === "ENOENT") return [];
    throw err;
  }
};

const providerIdsIn = (samples: readonly Sample[]): string[] => [...new Set(samples.map((s) => s.provider))];

const quantile = (sorted: readonly number[], q: number): number => {
  if (sorted.length === 0) return Number.NaN;
  const pos = (sorted.length - 1) * q;
  const lo = Math.floor(pos);
  const hi = Math.ceil(pos);
  const a = sorted[lo] ?? Number.NaN;
  const b = sorted[hi] ?? a;
  return a + (b - a) * (pos - lo);
};

export type Row = {
  client: string;
  provider: string;
  op: string;
  size: string;
  n: number;
  failures: number;
  p50: number;
  p95: number;
  p99: number;
  ttfbP50?: number;
  /** Megabytes per second at the median, for ops that move a body. */
  mbpsP50?: number;
};

const bodyOps = new Set(["upload", "download", "url-get", "concurrent-upload", "concurrent-download", "burst-upload"]);

/** Tail percentiles from fewer samples than this are noise, so they aren't reported. */
const MIN_TAIL_SAMPLES = 20;

const summarize = (client: string, samples: readonly Sample[]): Row[] => {
  const groups = new Map<string, Sample[]>();
  for (const s of samples) {
    const k = `${s.provider}\u0000${s.op}\u0000${s.size}`;
    const g = groups.get(k);
    if (g) g.push(s);
    else groups.set(k, [s]);
  }
  return [...groups.values()].flatMap((g) => {
    const first = g[0];
    if (!first) return [];
    const ok = g.filter((s) => s.ok);
    const ms = ok.map((s) => s.ms).sort((a, b) => a - b);
    const ttfb = ok.flatMap((s) => (s.ttfbMs === undefined ? [] : [s.ttfbMs])).sort((a, b) => a - b);
    const p50 = quantile(ms, 0.5);
    return [
      {
        client,
        provider: first.provider,
        op: first.op,
        size: first.size,
        n: g.length,
        failures: g.length - ok.length,
        p50,
        p95: ms.length >= MIN_TAIL_SAMPLES ? quantile(ms, 0.95) : Number.NaN,
        p99: ms.length >= MIN_TAIL_SAMPLES ? quantile(ms, 0.99) : Number.NaN,
        ...(ttfb.length > 0 ? { ttfbP50: quantile(ttfb, 0.5) } : {}),
        ...(first.bytes > 0 && bodyOps.has(first.op) ? { mbpsP50: first.bytes / 1e6 / (p50 / 1000) } : {}),
      },
    ];
  });
};

const fmt = (ms: number): string => (Number.isNaN(ms) ? "–" : ms >= 1000 ? `${(ms / 1000).toFixed(2)} s` : `${ms.toFixed(0)} ms`);

const main = async () => {
  const files = (await readdir(args.values.in)).filter((f) => f.endsWith(".jsonl"));
  const rows: Row[] = [];
  const metas: z.infer<typeof metaSchema>[] = [];
  const errors = new Map<string, number>();
  const exclusions = await loadExclusions();
  const excluded = new Map<string, number>();
  const byClient = new Map<string, Sample[]>();
  for (const f of files) {
    const meta = metaSchema.parse(JSON.parse(await readFile(`${args.values.in}/${f.replace(/\.jsonl$/, ".meta.json")}`, "utf8")));
    // Smoke runs are connectivity checks, not results.
    if (meta.profile !== "full") continue;
    // Runs of providers that were later dropped are skipped entirely.
    meta.providers = meta.providers.filter((p) => isProviderId(p.id));
    if (meta.providers.length === 0) continue;
    metas.push(meta);
    const samples = (await readFile(`${args.values.in}/${f}`, "utf8"))
      .split("\n")
      .filter((l) => l.trim() !== "")
      .map((l) => sampleSchema.parse(JSON.parse(l)))
      // Early runs also covered Appwrite, which was dropped once its free plan ran out of bandwidth.
      .filter((s) => isProviderId(s.provider));
    // Runs before the probe got setup retries could fail to create the object that first-request HEADs
    // (a provider still throttling right after the burst test). Every HEAD then 404s; that measures nothing,
    // so those samples become one setup error.
    const missingProbe = new Set(
      providerIdsIn(samples).filter((id) => {
        const heads = samples.filter((s) => s.provider === id && s.op === "first-request");
        return heads.length > 0 && heads.every((s) => !s.ok && /HTTP 404/.test(s.error ?? ""));
      }),
    );
    const probeFixed = samples.flatMap((s): Sample[] => {
      if (s.op !== "first-request" || !missingProbe.has(s.provider)) return [s];
      return s.round === 0 ? [{ ...s, round: -1, ms: 0, error: `seed failed: probe object missing (${s.error})` }] : [];
    });
    // Around each timed signed upload, setup steps (minting the URL, then a HEAD of what was stored) write
    // their own zero-time records. A wrong stored size fails that round's upload. Any other setup error is
    // listed under Errors and never counted as an upload sample.
    const roundKey = (s: Sample): string => `${s.provider}\u0000${s.round}`;
    const isCheck = (s: Sample): boolean => s.op === "signed-upload" && s.ms === 0 && (s.error?.startsWith("stored size") || s.error?.startsWith("setup:")) === true;
    const badStore = new Map(probeFixed.filter((s) => isCheck(s) && s.error?.startsWith("stored size")).map((s) => [roundKey(s), s.error]));
    const folded = probeFixed.flatMap((s): Sample[] => {
      if (s.op !== "signed-upload") return [s];
      if (isCheck(s)) return s.error?.startsWith("setup:") ? [{ ...s, error: `seed failed: ${s.error}` }] : [];
      const error = badStore.get(roundKey(s));
      return [error === undefined ? s : { ...s, ok: false, error }];
    });
    for (const s of folded) {
      if (!s.error) continue;
      const k = `${s.provider}: ${s.error.slice(0, 160)}`;
      errors.set(k, (errors.get(k) ?? 0) + 1);
    }
    // Several runs from one client (e.g. a rerun of one suite) merge into one set of rows.
    // Seed failures are setup errors, listed under Errors but not counted as listing samples.
    const overlapsExclusion = (s: Sample): boolean => {
      const end = Date.parse(s.at);
      const start = end - s.ms;
      return exclusions.some(
        (x) =>
          (x.client === "*" || x.client === meta.client) &&
          (x.provider === undefined || x.provider === s.provider) &&
          start < Date.parse(x.to) &&
          end > Date.parse(x.from),
      );
    };
    const measured = folded.filter((s) => {
      if (!overlapsExclusion(s)) return !s.error?.startsWith("seed failed");
      excluded.set(meta.client, (excluded.get(meta.client) ?? 0) + 1);
      return false;
    });
    byClient.set(meta.client, [...(byClient.get(meta.client) ?? []), ...measured]);
  }
  for (const [client, samples] of byClient) rows.push(...summarize(client, samples));

  await writeFile(`${args.values.out}/summary.json`, JSON.stringify({ runs: metas, rows, errors: Object.fromEntries(errors) }, null, 2));

  const lines: string[] = ["# Results", ""];
  for (const m of metas) {
    lines.push(`- **${m.client}** (${[m.location?.region, m.location?.org].filter(Boolean).join(", ")}), run ${m.runId}, Node ${m.node}, files-sdk ${m.filesSdk}`);
  }
  for (const x of exclusions) {
    const who = `${x.provider ? `${x.provider} on ` : ""}${x.client === "*" ? "every client" : `**${x.client}**`}`;
    lines.push(`- Excluded samples from ${who} between ${x.from} and ${x.to}: ${x.reason}`);
  }
  const clients = [...new Set(rows.map((r) => r.client))];
  for (const client of clients) {
    lines.push("", `## From ${client}`, "", "| Provider | Op | Size | p50 | p95 | p99 | TTFB p50 | MB/s p50 | n | fail % |", "|---|---|---|---|---|---|---|---|---|---|");
    const cr = rows
      .filter((r) => r.client === client)
      .sort((a, b) => a.op.localeCompare(b.op) || a.size.localeCompare(b.size, undefined, { numeric: true }) || a.p50 - b.p50);
    for (const r of cr) {
      lines.push(
        `| ${r.provider} | ${r.op} | ${r.size} | ${fmt(r.p50)} | ${fmt(r.p95)} | ${fmt(r.p99)} | ${r.ttfbP50 === undefined ? "–" : fmt(r.ttfbP50)} | ${r.mbpsP50 === undefined || Number.isNaN(r.mbpsP50) ? "–" : r.mbpsP50.toFixed(1)} | ${r.n} | ${((100 * r.failures) / r.n).toFixed(1)} |`,
      );
    }
  }
  if (errors.size > 0) {
    lines.push("", "## Errors", "");
    for (const [e, n] of errors) lines.push(`- ${n}× ${e}`);
  }
  await writeFile(`${args.values.out}/RESULTS.md`, `${lines.join("\n")}\n`);
  process.stdout.write(`${lines.join("\n")}\n`);
};

await main();
