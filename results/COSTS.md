# Monthly cost

List prices checked 2026-10-09. Storage, requests, and egress; no compute, support plans, or taxes.

Workloads are in GB of 10^9 bytes. AWS documents S3 storage in binary GB (2^30 bytes), so S3's stored amount is converted first. Everything else, including S3 transfer, is priced assuming decimal GB, since the pricing pages don't define the unit.

| Provider | Side project | SaaS with user uploads | Media-heavy app |
|---|---|---|---|
| Amazon S3 (us-east-2) | $1.11 | $227 | $4,807 |
| Cloudflare R2 | $0.00 | $39.75 | $412 |
| Railway Buckets | $0.00 | $7.50 | $150 |
| Backblaze B2 | $0.20 | $8.41 | $269 |
| Neon (Launch plan) | $0.23 | $162 | $5,180 |

- **Side project:** 10 GB stored, 50 GB served, 100k uploads, 1M reads.
- **SaaS with user uploads:** 500 GB stored, 2 TB served, 5M uploads, 50M reads.
- **Media-heavy app:** 10 TB stored, 50 TB served, 20M uploads, 500M reads.

## Price models

- **Amazon S3 (us-east-2):** $0.023/GB-month, $0.005 per 1k writes, $0.0004 per 1k reads, egress $0.09/GB after 100 GB/month free (then $0.085, $0.07 tiers). Source: https://aws.amazon.com/s3/pricing/ (storage, requests, and data transfer tabs, US East (Ohio)); same values in the AWS Price List API, AmazonS3 and AWSDataTransfer offers
- **Cloudflare R2:** $0.015/GB-month after 10 GB free, $4.50 per 1M writes after 1M, $0.36 per 1M reads after 10M, egress free. Source: https://developers.cloudflare.com/r2/pricing/
- **Railway Buckets:** $0.015/GB-month, requests and egress free. The Free plan covers up to 10 GB-month with its $1 monthly credit; Hobby ($5/month, counted toward usage) caps storage at 1 TB; Pro ($20/month, counted toward usage) has no cap. This assumes uploads go straight to the bucket; uploads sent through a Railway service are billed as service egress at $0.05/GB (railway.com/pricing), since buckets are not on the private network yet. Source: https://docs.railway.com/storage-buckets/billing
- **Backblaze B2:** $6.95/TB-month after 10 GB free, class A/B/C requests free, egress free up to 3x stored then $0.01/GB. Source: https://www.backblaze.com/cloud-storage/pricing
- **Neon (Launch plan):** $0.023/GB-month, requests free, 500 GB/month egress per project then $0.10/GB (shared with Postgres traffic). Source: https://neon.com/pricing
