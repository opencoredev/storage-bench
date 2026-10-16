# Monthly cost

List prices checked 2026-10-09. Storage, requests, and egress; no compute, support plans, or taxes.

Workloads are in GB of 10^9 bytes. AWS and Tigris document storage in binary GB (2^30 bytes), so their stored amounts are converted first. Everything else, including S3 transfer, is priced assuming decimal GB, since the pricing pages don't define the unit.

| Provider | Side project | SaaS with user uploads | Media-heavy app |
|---|---|---|---|
| Amazon S3 (us-east-2) | $1.11 | $227 | $4,807 |
| Cloudflare R2 | $0.00 | $39.75 | $412 |
| Railway Buckets | $0.00 | $7.50 | $150 |
| Backblaze B2 | $0.20 | $8.41 | $269 |
| Neon (Launch plan) | $0.23 | $162 | $5,180 |
| Bunny Storage (Standard, 1 region) | $1.00 | $25.00 | $600 |
| Appwrite (Pro plan) | $25.00 | $34.80 | $7,501 |
| Convex (Professional, 1 developer) | $25.00 | $271 | $6,316 |
| Upstash Blob (pay as you go) | $0.95 | $67.50 | $1,420 |
| Tigris (Standard) | $0.99 | $59.11 | $536 |

- **Side project:** 10 GB stored, 50 GB served, 100k uploads, 1M reads.
- **SaaS with user uploads:** 500 GB stored, 2 TB served, 5M uploads, 50M reads.
- **Media-heavy app:** 10 TB stored, 50 TB served, 20M uploads, 500M reads.

## Price models

- **Amazon S3 (us-east-2):** $0.023/GB-month, $0.005 per 1k writes, $0.0004 per 1k reads, egress $0.09/GB after 100 GB/month free (then $0.085, $0.07 tiers). Source: https://aws.amazon.com/s3/pricing/ (storage, requests, and data transfer tabs, US East (Ohio)); same values in the AWS Price List API, AmazonS3 and AWSDataTransfer offers
- **Cloudflare R2:** $0.015/GB-month after 10 GB free, $4.50 per 1M writes after 1M, $0.36 per 1M reads after 10M, egress free. Source: https://developers.cloudflare.com/r2/pricing/
- **Railway Buckets:** $0.015/GB-month, requests and egress free. The Free plan covers up to 10 GB-month with its $1 monthly credit; Hobby ($5/month, counted toward usage) caps storage at 1 TB; Pro ($20/month, counted toward usage) has no cap. This assumes uploads go straight to the bucket; uploads sent through a Railway service are billed as service egress at $0.05/GB (railway.com/pricing), since buckets are not on the private network yet. Source: https://docs.railway.com/storage-buckets/billing
- **Backblaze B2:** $6.95/TB-month after 10 GB free, class A/B/C requests free, egress free up to 3x stored then $0.01/GB. Source: https://www.backblaze.com/cloud-storage/pricing
- **Neon (Launch plan):** $0.023/GB-month, requests free, 500 GB/month egress per project then $0.10/GB (shared with Postgres traffic). Source: https://neon.com/pricing
- **Bunny Storage (Standard, 1 region):** $0.01/GB-month, requests and API egress free, $1 monthly minimum. Bunny's pricing assumes files are served through Bunny CDN, so egress is priced at its Europe and North America CDN rate of $0.01/GB. Source: https://bunny.net/pricing/storage/ and https://bunny.net/pricing/cdn/ (Standard network), checked 2026-10-16
- **Appwrite (Pro plan):** $25/month per project with 150 GB storage and 2 TB bandwidth, then $2.80 per 100 GB stored and $15 per 100 GB served; file operations are not billed per request. Source: https://appwrite.io/pricing (Compare plans), checked 2026-10-16
- **Convex (Professional, 1 developer):** $25 per developer per month with 100 GB file storage, 50 GB egress, and 25M function calls, then $0.03/GB stored, $0.12/GB served, and $2 per 1M calls. Each upload costs one function call to mint its upload URL; reads from file URLs are not function calls. Source: https://www.convex.dev/pricing, checked 2026-10-16
- **Upstash Blob (pay as you go):** $0.02/GB-month, $4.50 per 1M writes, $0.30 per 1M reads, egress free up to 1 TB/month then $0.02/GB. Source: https://upstash.com/pricing/blob, checked 2026-10-16
- **Tigris (Standard):** $0.02/GB-month after 5 GB free (billed in binary GB, like S3), $0.005 per 1k writes after 10k, $0.0005 per 1k reads after 100k, egress free. Source: https://www.tigrisdata.com/pricing/, checked 2026-10-16
