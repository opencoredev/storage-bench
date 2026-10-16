import { z } from "zod";
import { isProviderId, providerIds, type ProviderId } from "./providers.ts";

/**
 * Turns results/summary.json and results/costs.json into the shape every results view uses: one value per
 * metric, provider, and client location, plus the labels and notes a reader needs to read them fairly.
 * results/index.html (src/page.ts) and the site (src/site-data.ts) both build from this.
 */

const rowSchema = z.object({
  client: z.string(),
  provider: z.string(),
  op: z.string(),
  size: z.string(),
  n: z.number(),
  failures: z.number(),
  p50: z.number().nullable(),
  p95: z.number().nullable(),
  ttfbP50: z.number().optional(),
  mbpsP50: z.number().nullable().optional(),
});
export const summarySchema = z.object({
  runs: z.array(z.object({ client: z.string(), startedAt: z.string() })),
  rows: z.array(rowSchema),
  errors: z.record(z.string(), z.number()),
});
export const costsSchema = z.object({
  checkedOn: z.string(),
  workloads: z.array(z.object({ name: z.string(), what: z.string() })),
  costs: z.array(z.object({ id: z.string(), label: z.string(), model: z.string(), source: z.string(), monthly: z.array(z.number()) })),
});

type LatLon = readonly [lat: number, lon: number];

export const providerInfo: Record<ProviderId, { label: string; place: string; region: string; at: LatLon | null }> = {
  "aws-s3": { label: "Amazon S3", place: "Ohio", region: "us-east-2", at: [40.0, -83.0] },
  // R2 takes a location hint and picks the site itself, so there is no point to put on a map.
  r2: { label: "Cloudflare R2", place: "Eastern US", region: "ENAM hint", at: null },
  railway: { label: "Railway Buckets", place: "Virginia", region: "iad", at: [38.95, -77.45] },
  b2: { label: "Backblaze B2", place: "Eastern US", region: "us-east-005", at: [38.96, -77.36] },
  neon: { label: "Neon", place: "Virginia", region: "aws us-east-1", at: [39.04, -77.49] },
  bunny: { label: "Bunny Storage", place: "New York", region: "ny", at: [40.71, -74.01] },
  appwrite: { label: "Appwrite", place: "New York", region: "nyc", at: [40.71, -74.01] },
  convex: { label: "Convex", place: "Virginia", region: "aws us-east-1", at: [39.04, -77.49] },
  // Global bucket on Cloudflare R2 with no region to choose, so there is no point to put on a map.
  upstash: { label: "Upstash Blob", place: "Global", region: "no region choice", at: null },
};

export const clientIds = ["railway-ashburn", "ms-a2", "freestyle-sf", "tenki-seattle", "railway-amsterdam", "boat-lille"] as const;
export type ClientId = (typeof clientIds)[number];
export const isClientId = (value: string): value is ClientId => clientIds.some((c) => c === value);

/** Where each client ran and what a reader needs to know to read its numbers fairly. The home line is placed by state only. */
export const clientInfo: Record<ClientId, { label: string; host: string; at: LatLon; note: string }> = {
  "railway-ashburn": {
    label: "Ashburn, Virginia",
    host: "Railway",
    at: [39.04, -77.49],
    note: "A Railway server in Ashburn, Virginia: the same metro as most of the buckets, like an app on AWS us-east-1. Railway Buckets is on the same network here, which helps it. S3 is in Ohio, about 10 ms farther away.",
  },
  "ms-a2": {
    label: "Florida home line",
    host: "Home server",
    at: [27.8, -81.7],
    note: "A home server in Florida on an AT&T line. This is the closest thing to a user's machine. The line's upload speed limits the 100 MB uploads, so those numbers say more about the line than the providers.",
  },
  "freestyle-sf": {
    label: "San Francisco",
    host: "Freestyle",
    at: [37.77, -122.42],
    note: "A Freestyle VM in San Francisco. Every bucket is across the country.",
  },
  "tenki-seattle": {
    label: "Seattle",
    host: "Tenki",
    at: [47.47, -122.26],
    note: "A Tenki VM in Seattle. Every bucket is across the country.",
  },
  "railway-amsterdam": {
    label: "Amsterdam",
    host: "Railway",
    at: [52.37, 4.9],
    note: "A Railway server in Amsterdam. Every bucket is across the Atlantic. Railway Buckets is on the same network here.",
  },
  "boat-lille": {
    label: "Lille, France",
    host: "boat",
    at: [50.63, 3.06],
    note: "A boat sandbox on OVH in Lille, France. Every bucket is across the Atlantic.",
  },
};

type MetricSpec = {
  readonly id: string;
  readonly title: string;
  readonly note: string;
  /** Picks the summary row for a provider: the first op whose provider list includes it, else the general one. */
  readonly ops: readonly { op: string; size: string; providers?: readonly ProviderId[] }[];
  readonly value: "p50" | "ttfb" | "mbps";
  readonly better: "lower" | "higher";
  /** One sample is a whole batch of parallel requests, and it fails if any request in it fails. */
  readonly batch: boolean;
};

const presigned = (size: string): MetricSpec["ops"] => [{ op: "url-get", size }];

export const metricSpecs: readonly MetricSpec[] = [
  { id: "up-1mb", title: "Upload a 1 MB file", note: "Median time for put(), like a photo upload.", ops: [{ op: "upload", size: "1MB" }], value: "p50", better: "lower", batch: false },
  { id: "ttfb-1kb", title: "Read a small file: time to first byte", note: "Median TTFB of a 1 KB GET on a presigned URL.", ops: presigned("1KB"), value: "ttfb", better: "lower", batch: false },
  { id: "get-1mb", title: "Download a 1 MB file", note: "Median full GET on a presigned URL.", ops: presigned("1MB"), value: "p50", better: "lower", batch: false },
  { id: "up-100mb", title: "Upload a 100 MB file", note: "Median throughput of put() with a 100 MB body.", ops: [{ op: "upload", size: "100MB" }], value: "mbps", better: "higher", batch: false },
  { id: "get-100mb", title: "Download a 100 MB file", note: "Median throughput of a GET on a presigned URL.", ops: presigned("100MB"), value: "mbps", better: "higher", batch: false },
  { id: "first", title: "First request from a fresh client", note: "New SDK client, new TCP and TLS connection, one head(). Like the first request after a deploy.", ops: [{ op: "first-request", size: "1KB" }], value: "p50", better: "lower", batch: false },
  { id: "par-up", title: "16 uploads in parallel", note: "Sixteen 100 KB put() calls at once, like a gallery upload. Time until all finish.", ops: [{ op: "concurrent-upload", size: "16x100KB" }], value: "p50", better: "lower", batch: true },
  { id: "list", title: "List 1,000 objects", note: "Walk every page of a 1,000-object prefix.", ops: [{ op: "list-all", size: "1000 objects" }], value: "p50", better: "lower", batch: false },
];

export type Cell = { value: number; p95: number | null; n: number; failRate: number };

export type Model = {
  metrics: { id: string; title: string; note: string; value: MetricSpec["value"]; better: MetricSpec["better"]; batch: boolean }[];
  providers: { id: ProviderId; label: string; place: string; region: string; at: LatLon | null }[];
  clients: { id: ClientId; label: string; host: string; at: LatLon; note: string; runs: number }[];
  /** metric id -> provider id -> client id -> cell, or null when that combination has no successful samples. */
  data: Record<string, Record<string, Record<string, Cell | null>>>;
  /** Failed requests over all samples, per provider and client, from the same rows as the charts. */
  reliability: Record<string, Record<string, { samples: number; failures: number }>>;
  /** The same, for upload attempts only (single, parallel, burst, and signed), where nearly every failure happened. */
  uploadReliability: Record<string, Record<string, { samples: number; failures: number }>>;
  errors: { provider: ProviderId; message: string; count: number }[];
  costs: { checkedOn: string; workloads: { name: string; what: string }[]; rows: { id: ProviderId; label: string; model: string; source: string; monthly: number[] }[] };
  runDates: string[];
  runs: number;
};

export const buildModel = (summary: z.infer<typeof summarySchema>, costs: z.infer<typeof costsSchema>): Model => {
  const clients = clientIds.filter((c) => summary.rows.some((r) => r.client === c));
  const data: Model["data"] = {};
  for (const m of metricSpecs) {
    const byProvider: Record<string, Record<string, Cell | null>> = {};
    for (const p of providerIds) {
      const spec = m.ops.find((o) => o.providers?.includes(p)) ?? m.ops.find((o) => o.providers === undefined);
      const byClient: Record<string, Cell | null> = {};
      for (const c of clients) {
        const row = spec && summary.rows.find((r) => r.client === c && r.provider === p && r.op === spec.op && r.size === spec.size);
        const value = row ? (m.value === "p50" ? row.p50 : m.value === "ttfb" ? row.ttfbP50 : row.mbpsP50) : undefined;
        byClient[c] = row && value !== undefined && value !== null && Number.isFinite(value) ? { value, p95: m.value === "p50" ? row.p95 : null, n: row.n, failRate: row.failures / row.n } : null;
      }
      byProvider[p] = byClient;
    }
    data[m.id] = byProvider;
  }

  const reliability: Model["reliability"] = {};
  for (const p of providerIds) {
    reliability[p] = {};
    for (const c of clients) {
      // The 32-upload burst is its own stress test, so it isn't counted here.
      const rows = summary.rows.filter((r) => r.provider === p && r.client === c && r.op !== "burst-upload");
      reliability[p][c] = { samples: rows.reduce((a, r) => a + r.n, 0), failures: rows.reduce((a, r) => a + r.failures, 0) };
    }
  }

  const uploadOps = new Set(["upload", "concurrent-upload", "burst-upload", "signed-upload"]);
  const uploadReliability: Model["uploadReliability"] = {};
  for (const p of providerIds) {
    uploadReliability[p] = {};
    for (const c of clients) {
      const rows = summary.rows.filter((r) => r.provider === p && r.client === c && uploadOps.has(r.op));
      uploadReliability[p][c] = { samples: rows.reduce((a, r) => a + r.n, 0), failures: rows.reduce((a, r) => a + r.failures, 0) };
    }
  }

  const errors = Object.entries(summary.errors).flatMap(([key, count]) => {
    const at = key.indexOf(": ");
    const provider = key.slice(0, at);
    return isProviderId(provider) ? [{ provider, message: key.slice(at + 2), count }] : [];
  });

  return {
    metrics: metricSpecs.map(({ id, title, note, value, better, batch }) => ({ id, title, note, value, better, batch })),
    providers: providerIds.map((id) => ({ id, ...providerInfo[id] })),
    clients: clients.map((id) => ({ id, ...clientInfo[id], runs: summary.runs.filter((r) => r.client === id).length })),
    data,
    reliability,
    uploadReliability,
    errors: errors.sort((a, b) => b.count - a.count),
    costs: {
      checkedOn: costs.checkedOn,
      workloads: costs.workloads,
      rows: costs.costs.flatMap((c) => (isProviderId(c.id) ? [{ id: c.id, label: providerInfo[c.id].label, model: c.model, source: c.source, monthly: c.monthly }] : [])),
    },
    runDates: [...new Set(summary.runs.map((r) => r.startedAt.slice(0, 10)))].sort(),
    runs: summary.runs.length,
  };
};
