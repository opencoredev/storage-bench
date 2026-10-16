# Methodology

How storage-bench measures each provider, where everything ran, and what to keep in mind when reading the numbers. The results are on [the site](https://storage-bench.vercel.app) and in [results/RESULTS.md](../results/RESULTS.md).

## What it measures

Each object size stands in for a real payload: 1 KB (JSON), 100 KB (avatars), 1 MB (photos), 10 MB (PDFs, audio), and 100 MB (video). How 100 MB uploads are sent depends on each provider's own SDK, so upload throughput reflects both the service and its client:

- S3, R2, Railway, Backblaze, Neon, Bunny, and Tigris: multipart through the AWS SDK, 5 MiB parts, 4 in flight.
- Upstash: multipart through `@upstash/blob`, which sends one part at a time.
- Appwrite: `node-appwrite`'s chunked upload, 5 MiB chunks: the first on its own, then up to 8 in flight.
- Convex: one POST of the whole file to a Convex upload URL, which is how Convex accepts files.

For every size, one round trip is:

| Op | What is timed |
|---|---|
| `upload` | `files.upload()` until it resolves |
| `head` | `files.head()` |
| `download` | `files.download({ as: "stream" })` until the last byte is read and hashed |
| `url-get` | A presigned GET URL fetched with plain `fetch()`, the path a browser takes. Getting the URL is not timed: it is local signing for the S3-style providers, and a call to the provider for Upstash (its signing service) and Convex (the file URL). Appwrite has no signed URLs, so it uses its permanent public `/view` URL on a public-read bucket. Its time to first byte is the cleanest network number in the run. |
| `delete` | `files.delete()` |

Then, once per round:

| Op | What is timed |
|---|---|
| `concurrent-upload`, `concurrent-download` | 16 objects of 100 KB in parallel, like a gallery page |
| `burst-upload` | 32 uploads in parallel, reported separately |
| `first-request` | A brand-new SDK client does one `head()` on an existing object, so it opens a new TCP and TLS connection, like the first request after a deploy. Each sample also gets a fresh connection pool, since the fetch-based SDKs (Appwrite, Convex, Upstash) would otherwise reuse a warm one. |
| `list-all` | Walk 1,000 objects under one prefix. Skipped for Convex, whose storage ids can't be listed by prefix. |
| `signed-upload` | A 1 MB browser-style upload: `fetch()` PUT to a URL from `signedUploadUrl()`. Minting the URL is not timed. |
| `range-get` | 256 KB from a random offset in a 10 MB object, like seeking in a video. Skipped where the SDK has no range reads (Appwrite, Upstash). |
| `copy` | `copy()` of a 10 MB object, only on providers that copy server-side. Appwrite and Convex can't, so they skip it. |

For the parallel tests, one sample is the whole batch: its time runs until every request finishes, and it counts as failed if any request in it fails. Their sample count and failure rate count batches, not requests.

A full run does 60 round trips at 1 KB and 100 KB, 30 at 1 MB, 20 at 10 MB, 8 at 100 MB, 10 parallel rounds, 20 fresh-client requests, 20 rounds of the signed-upload, range, and copy tests, and 6 listings. p95 and p99 are left blank when a row has fewer than 20 successful samples.

## How it stays fair

- Providers take turns, in a fresh random order every round, so a slow minute on the network hits all of them.
- Warmup requests are discarded.
- Every body is fresh random bytes and every download is SHA-256 checked, so deduplication or caching can't fake a result.
- One attempt per measured request for everyone. The AWS SDK normally retries throttles and 5xx errors three times, which would hide failures inside its latency, so it runs with `AWS_MAX_ATTEMPTS=1` and files-sdk with `retries: 0`. Upstash's SDK also retries requests three times with no setting to turn it off, so `scripts/patch-upstash-blob.mjs` sets its attempt count to 1 at install. During these runs the patch missed one more retry path: when Upstash's credential service answered 429 or 503, the SDK could ask for credentials up to three more times. That only happens when credentials are first fetched or refreshed, not on every request; the patch now disables it too. The SDK's single re-request after refreshing an expired credential is kept, since that is how its credentials work rather than a retry of a failed request. Untimed setup, like creating the 1,000 objects to list, does retry.
- Latency percentiles cover successful requests.
- Raw samples are kept as JSON lines with the client location, Node version, files-sdk version, and code version.

## Where the buckets and clients are

| Provider | Bucket region | Notes |
|---|---|---|
| Amazon S3 | us-east-2 (Ohio) | The AWS organization used blocks us-east-1. Ohio is about 10 ms farther from Virginia than the other buckets. |
| Cloudflare R2 | Eastern North America location hint | R2 picks the exact site. |
| Railway Buckets | iad | Runs on Tigris. |
| Backblaze B2 | us-east-005 | |
| Neon | aws us-east-1 | |
| Bunny Storage | ny | Through Bunny's S3-compatible endpoint, which is in preview. Standard tier, one region. |
| Appwrite | nyc | Appwrite Cloud, on a public-read bucket with default settings (encryption and antivirus on). |
| Convex | aws us-east-1 | Production deployment. |
| Upstash Blob | No region to choose | A private bucket. Upstash buckets are global and run on Cloudflare R2. |
| Tigris | global (the default) | Private, Standard tier, created with `tigris mk`. A global bucket keeps data near where it is read. Railway Buckets also runs on Tigris, but pinned to iad. |

| Client | Location | Network |
|---|---|---|
| `railway-ashburn` | Ashburn, Virginia | Railway (us-east4) |
| `ms-a2` | Florida | A Minisforum MS-A2 on a home AT&T line |
| `freestyle-sf` | San Francisco | Freestyle VM |
| `tenki-seattle` | Seattle | Tenki sandbox VM on Luxor's network (AS19538) |
| `railway-amsterdam` | Amsterdam | Railway (europe-west4) |
| `boat-lille` | Lille, France | boat sandbox (OVH) |

Ashburn sits next to most of the buckets, like an app on AWS us-east-1. The other locations show the same buckets from across the country and from Europe. The two Railway clients share a network with Railway Buckets; the other four don't. The home line's upload speed caps its 100 MB numbers.

Each client ran three passes on 2026-10-16 (San Francisco's third was cut short; see the data notes) with all ten providers taking turns in the same runs, so every provider was measured over the same hours. A client runs one benchmark process at a time. The earlier five-provider runs from 2026-10-09 and 2026-10-15, which the first version of the site used, are kept in `results/archive/v1-five-providers/`.

## SDK notes

- S3, R2, Railway, Backblaze, Neon, Bunny, and Tigris go through files-sdk's S3 path on `@aws-sdk/client-s3`, so client overhead is the same for all of them.
- Appwrite uses files-sdk's Appwrite adapter, on `node-appwrite`.
- Convex: files-sdk's Convex adapter only runs inside Convex functions, so `convex-app/` deploys a small Convex app that exposes it over authenticated HTTP actions, and `src/convex-http.ts` is the client side. Uploads go through Convex upload URLs, Convex's documented path for files from clients, and `upload` times both minting the URL and sending the file. Reads use the file URL Convex hands out.
- Upstash Blob: files-sdk has no Upstash adapter, so `src/upstash-blob.ts` maps files-sdk's interface onto `@upstash/blob`, Upstash's own SDK.
- `download` time to first byte is the time until the SDK yields the first chunk. Use `url-get` for the network's time to first byte.

## Data notes

Samples that overlap a stall of the client machine itself, or a window where two runs overlapped, are dropped. Each window and its reason is in [results/exclusions.json](../results/exclusions.json).

Three things went wrong during the 2026-10-16 runs:

- The Railway account that hosts the Ashburn and Amsterdam machines hit its monthly compute spending limit. Railway paused both machines and also refused requests to its bucket with Access Denied until the limit was raised. Railway Buckets samples from that window are dropped for every location, since they measure the account limit rather than the service. Amsterdam's third pass was cut off by the pause twice, so it was set aside and run again in full.
- San Francisco's third pass hung on one 100 MB request for over 30 minutes, with no response and no error. The pass was stopped there and the samples it had already recorded were kept, so San Francisco has slightly fewer samples for the tests that come after the 100 MB round.
- Partial runs that were stopped to add a provider are kept out of the results.



## Running every location

To run the full campaign from every client location, `scripts/remote.sh` pushes, starts, and pulls runs on each machine, and `scripts/campaign.sh` runs the passes:

```sh
CAMPAIGN_NAME=v3 scripts/campaign.sh 3 ms-a2 railway-ashburn railway-amsterdam tenki-seattle freestyle-sf boat-lille
```

## Building the site

`site/` is a static Next.js site built with [dithercn](https://dithercn.vercel.app). It reads one file, `site/src/data/results.json`, which `npm run site:data` writes from the committed `results/summary.json` and `results/costs.json`:

```sh
npm ci
npm run site:data
cd site
bun install
bun run dev      # or: bun run build, which writes a static site to site/out
```

## Repository layout

| Path | What it is |
|---|---|
| `src/bench.ts` | The benchmark runner |
| `src/providers.ts` | One files-sdk client per provider, built from environment variables |
| `src/convex-http.ts`, `src/upstash-blob.ts` | files-sdk adapters for Convex (over `convex-app/`) and Upstash Blob |
| `convex-app/` | The Convex app the Convex adapter calls |
| `src/report.ts` | Merges raw runs per location into `results/RESULTS.md` and `results/summary.json` |
| `src/costs.ts` | The monthly cost model and its list prices |
| `src/model.ts` | The shape the results views read: one value per metric, provider, and location |
| `src/site-data.ts` | Writes the site's data file |
| `scripts/` | Remote runs and the multi-location campaign |
| `results/` | Generated tables, cost model, and exclusion windows |
| `site/` | The results site |
