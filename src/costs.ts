import { writeFile } from "node:fs/promises";
import type { ProviderId } from "./providers.ts";

/**
 * List prices as published on 2026-10-09. Workloads are in GB of 10^9 bytes. AWS and Tigris document storage in
 * binary GB (2^30 bytes), so their stored amount is converted before the rate applies.
 */
const checkedOn = "2026-10-09";

/** One month of usage. */
type Workload = {
  readonly name: string;
  readonly what: string;
  readonly storedGb: number;
  readonly egressGb: number;
  /** PUT, COPY, POST, LIST */
  readonly writes: number;
  /** GET, HEAD */
  readonly reads: number;
};

const workloads: readonly Workload[] = [
  { name: "Side project", what: "10 GB stored, 50 GB served, 100k uploads, 1M reads", storedGb: 10, egressGb: 50, writes: 100_000, reads: 1_000_000 },
  { name: "SaaS with user uploads", what: "500 GB stored, 2 TB served, 5M uploads, 50M reads", storedGb: 500, egressGb: 2_000, writes: 5_000_000, reads: 50_000_000 },
  { name: "Media-heavy app", what: "10 TB stored, 50 TB served, 20M uploads, 500M reads", storedGb: 10_000, egressGb: 50_000, writes: 20_000_000, reads: 500_000_000 },
];

type Price = {
  readonly id: ProviderId;
  readonly label: string;
  readonly source: string;
  /** Plain-language summary of the price model, for the table footnotes. */
  readonly model: string;
  readonly monthly: (w: Workload) => number;
};

const tiered = (amount: number, tiers: readonly (readonly [upTo: number, rate: number])[]): number => {
  let cost = 0;
  let prev = 0;
  for (const [upTo, rate] of tiers) {
    if (amount <= prev) break;
    cost += (Math.min(amount, upTo) - prev) * rate;
    prev = upTo;
  }
  return cost;
};

const over = (amount: number, free: number): number => Math.max(0, amount - free);

/** Decimal GB to the binary GB AWS bills in. */
const toGiB = (gb: number): number => (gb * 1e9) / 2 ** 30;

const prices: readonly Price[] = [
  {
    id: "aws-s3",
    label: "Amazon S3 (us-east-2)",
    source: "https://aws.amazon.com/s3/pricing/ (storage, requests, and data transfer tabs, US East (Ohio)); same values in the AWS Price List API, AmazonS3 and AWSDataTransfer offers",
    model: "$0.023/GB-month, $0.005 per 1k writes, $0.0004 per 1k reads, egress $0.09/GB after 100 GB/month free (then $0.085, $0.07 tiers)",
    monthly: (w) =>
      toGiB(w.storedGb) * 0.023 +
      (w.writes / 1000) * 0.005 +
      (w.reads / 1000) * 0.0004 +
      // Tier boundaries from the AWSDataTransfer price list, after the free 100 GB.
      tiered(over(w.egressGb, 100), [
        [10_240, 0.09],
        [51_200, 0.085],
        [153_600, 0.07],
        [Number.POSITIVE_INFINITY, 0.05],
      ]),
  },
  {
    id: "r2",
    label: "Cloudflare R2",
    source: "https://developers.cloudflare.com/r2/pricing/",
    model: "$0.015/GB-month after 10 GB free, $4.50 per 1M writes after 1M, $0.36 per 1M reads after 10M, egress free",
    monthly: (w) => over(w.storedGb, 10) * 0.015 + (over(w.writes, 1e6) / 1e6) * 4.5 + (over(w.reads, 10e6) / 1e6) * 0.36,
  },
  {
    id: "railway",
    label: "Railway Buckets",
    source: "https://docs.railway.com/storage-buckets/billing",
    model:
      "$0.015/GB-month, requests and egress free. The Free plan covers up to 10 GB-month with its $1 monthly credit; Hobby ($5/month, counted toward usage) caps storage at 1 TB; Pro ($20/month, counted toward usage) has no cap. This assumes uploads go straight to the bucket; uploads sent through a Railway service are billed as service egress at $0.05/GB (railway.com/pricing), since buckets are not on the private network yet",
    monthly: (w) => {
      const usage = w.storedGb * 0.015;
      if (w.storedGb <= 10) return over(usage, 1);
      return Math.max(w.storedGb <= 1_000 ? 5 : 20, usage);
    },
  },
  {
    id: "b2",
    label: "Backblaze B2",
    source: "https://www.backblaze.com/cloud-storage/pricing",
    model: "$6.95/TB-month after 10 GB free, class A/B/C requests free, egress free up to 3x stored then $0.01/GB",
    monthly: (w) => over(w.storedGb, 10) * 0.00695 + over(w.egressGb, 3 * w.storedGb) * 0.01,
  },
  {
    id: "neon",
    label: "Neon (Launch plan)",
    source: "https://neon.com/pricing",
    model: "$0.023/GB-month, requests free, 500 GB/month egress per project then $0.10/GB (shared with Postgres traffic)",
    monthly: (w) => w.storedGb * 0.023 + over(w.egressGb, 500) * 0.1,
  },
  {
    id: "bunny",
    label: "Bunny Storage (Standard, 1 region)",
    source: "https://bunny.net/pricing/storage/ and https://bunny.net/pricing/cdn/ (Standard network), checked 2026-10-16",
    model:
      "$0.01/GB-month, requests and API egress free, $1 monthly minimum. Bunny's pricing assumes files are served through Bunny CDN, so egress is priced at its Europe and North America CDN rate of $0.01/GB",
    monthly: (w) => Math.max(1, w.storedGb * 0.01 + w.egressGb * 0.01),
  },
  {
    id: "appwrite",
    label: "Appwrite (Pro plan)",
    source: "https://appwrite.io/pricing (Compare plans), checked 2026-10-16",
    model: "$25/month per project with 150 GB storage and 2 TB bandwidth, then $2.80 per 100 GB stored and $15 per 100 GB served; file operations are not billed per request",
    monthly: (w) => 25 + over(w.storedGb, 150) * 0.028 + over(w.egressGb, 2_000) * 0.15,
  },
  {
    id: "convex",
    label: "Convex (Professional, 1 developer)",
    source: "https://www.convex.dev/pricing, checked 2026-10-16",
    model:
      "$25 per developer per month with 100 GB file storage, 50 GB egress, and 25M function calls, then $0.03/GB stored, $0.12/GB served, and $2 per 1M calls. Each upload costs one function call to mint its upload URL; reads from file URLs are not function calls",
    monthly: (w) => 25 + over(w.storedGb, 100) * 0.03 + over(w.egressGb, 50) * 0.12 + (over(w.writes, 25e6) / 1e6) * 2,
  },
  {
    id: "upstash",
    label: "Upstash Blob (pay as you go)",
    source: "https://upstash.com/pricing/blob, checked 2026-10-16",
    model: "$0.02/GB-month, $4.50 per 1M writes, $0.30 per 1M reads, egress free up to 1 TB/month then $0.02/GB",
    monthly: (w) => w.storedGb * 0.02 + (w.writes / 1e6) * 4.5 + (w.reads / 1e6) * 0.3 + over(w.egressGb, 1_000) * 0.02,
  },
  {
    id: "tigris",
    label: "Tigris (Standard)",
    source: "https://www.tigrisdata.com/pricing/, checked 2026-10-16",
    model:
      "$0.02/GB-month after 5 GB free (billed in binary GB, like S3), $0.005 per 1k writes after 10k, $0.0005 per 1k reads after 100k, egress free",
    monthly: (w) => over(toGiB(w.storedGb), 5) * 0.02 + (over(w.writes, 10_000) / 1000) * 0.005 + (over(w.reads, 100_000) / 1000) * 0.0005,
  },
];

const usd = (n: number): string => (n >= 100 ? `$${Math.round(n).toLocaleString("en-US")}` : `$${n.toFixed(2)}`);

const lines = [
  "# Monthly cost",
  "",
  `List prices checked ${checkedOn}. Storage, requests, and egress; no compute, support plans, or taxes.`,
  "",
  "Workloads are in GB of 10^9 bytes. AWS and Tigris document storage in binary GB (2^30 bytes), so their stored amounts are converted first. Everything else, including S3 transfer, is priced assuming decimal GB, since the pricing pages don't define the unit.",
  "",
  `| Provider | ${workloads.map((w) => w.name).join(" | ")} |`,
  `|---|${workloads.map(() => "---").join("|")}|`,
  ...prices.map((p) => `| ${p.label} | ${workloads.map((w) => usd(p.monthly(w))).join(" | ")} |`),
  "",
  ...workloads.map((w) => `- **${w.name}:** ${w.what}.`),
  "",
  "## Price models",
  "",
  ...prices.map((p) => `- **${p.label}:** ${p.model}. Source: ${p.source}`),
];

await writeFile("results/COSTS.md", `${lines.join("\n")}\n`);
await writeFile(
  "results/costs.json",
  JSON.stringify({ checkedOn, workloads, costs: prices.map((p) => ({ id: p.id, label: p.label, model: p.model, source: p.source, monthly: workloads.map((w) => p.monthly(w)) })) }, null, 2),
);
process.stdout.write(`${lines.join("\n")}\n`);
