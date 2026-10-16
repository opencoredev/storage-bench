<p align="center">
  <a href="https://x.com/leodev"><img alt="Follow @leodev on X" src="https://shieldcn.dev/x/follow/leodev.svg?variant=branded&mode=dark" /></a>
</p>

storage-bench measures how fast ten object storage providers are for the things apps actually do, and what each costs per month: Amazon S3, Cloudflare R2, Railway Buckets, Backblaze B2, Neon, Bunny Storage, Appwrite, Convex, Upstash Blob, and Tigris. Every provider runs through the same SDK ([files-sdk](https://files-sdk.dev) 3.0.0) on Node 24, side by side in the same runs, from six places: Ashburn, a home line in Florida, San Francisco, Seattle, Amsterdam, and Lille.

[See the results](https://storage-bench.vercel.app) · [Read the methodology](docs/METHODOLOGY.md) · [Every number](results/RESULTS.md)

## Results

Distance decides most of it, so the order changes with where your app runs. Median time to first byte for a 1 KB file:

| From | Fastest | Slowest |
|---|---|---|
| Ashburn, Virginia | Tigris 20 ms, Backblaze B2 21 ms | Appwrite 104 ms |
| Florida home line | Convex 77 ms, Upstash 111 ms | Bunny 177 ms |
| San Francisco | Tigris 110 ms, Convex 125 ms | Neon 361 ms |
| Amsterdam | Tigris 26 ms, Convex 141 ms | Amazon S3 321 ms |

Tigris and Upstash have no region to pick. Tigris's default global bucket keeps each file near where it was written, so from Amsterdam or San Francisco it behaves like a nearby bucket, while every other provider here sits in the eastern US. That is how Tigris works by default, and it is why it leads most charts.

Monthly cost from list prices, for 500 GB stored, 2 TB served, 5M uploads, and 50M reads:

| Railway | Backblaze B2 | Bunny | Appwrite | R2 | Tigris | Upstash | Neon | S3 | Convex |
|---|---|---|---|---|---|---|---|---|---|
| $7.50 | $8.41 | $25 | $34.80 | $39.75 | $59.11 | $67.50 | $162 | $227 | $271 |

Railway's price assumes uploads go straight to the bucket; uploads sent through a Railway service are billed as service egress.

With no retries for anyone, Tigris failed 25 of 3,883 upload attempts and Backblaze B2 22, mostly dropped connections. The other providers failed six or fewer, and Bunny none.

Two of the six test machines run on Railway's network, which may favor Railway Buckets. The site marks them, and every other caveat, including how each provider was set up, is in the [methodology](docs/METHODOLOGY.md).

## Run it

You need Node 24 and credentials for at least one provider. [.env.example](.env.example) lists the variables; providers without credentials are skipped.

```sh
cp .env.example .env
npm ci
set -a; . ./.env; set +a
npm run bench -- --profile full --client my-laptop
npm run report
```

`--profile smoke` runs a quick check, and `--providers r2,railway` limits the run.

<p align="center"><sub>Built by <a href="https://x.com/leodev">@leodev</a></sub></p>
