import { Files } from "files-sdk";
import { appwrite } from "files-sdk/appwrite";
import { backblazeB2 } from "files-sdk/backblaze-b2";
import { neon } from "files-sdk/neon";
import { r2 } from "files-sdk/r2";
import { s3 } from "files-sdk/s3";
import { z } from "zod";
import { convexHttp } from "./convex-http.ts";
import { upstashBlob } from "./upstash-blob.ts";

export const providerIds = ["aws-s3", "r2", "railway", "b2", "neon", "bunny", "appwrite", "convex", "upstash"] as const;
export type ProviderId = (typeof providerIds)[number];

export type Provider = {
  readonly id: ProviderId;
  readonly label: string;
  /** Where the bucket lives, as the provider names it. */
  readonly region: string;
  /** Builds a fresh client. Each call opens new connections, which is what the cold-start test relies on. */
  readonly connect: () => Files;
  /** Largest object the account's plan accepts, when the plan caps it. Bigger sizes are skipped, not failed. */
  readonly maxObjectBytes?: number;
  /** False when the provider can't list by prefix, so the listing test is skipped rather than failed. */
  readonly canList?: false;
};

const nonEmpty = z.string().min(1);

// Each provider is optional: it joins the run only when every variable it needs is set.
const specs = {
  "aws-s3": z.object({
    AWS_S3_BUCKET: nonEmpty,
    AWS_S3_REGION: nonEmpty,
    AWS_S3_ACCESS_KEY_ID: nonEmpty,
    AWS_S3_SECRET_ACCESS_KEY: nonEmpty,
  }),
  r2: z.object({
    R2_ACCOUNT_ID: nonEmpty,
    R2_BUCKET: nonEmpty,
    R2_ACCESS_KEY_ID: nonEmpty,
    R2_SECRET_ACCESS_KEY: nonEmpty,
    R2_REGION_LABEL: z.string().default("enam (location hint)"),
  }),
  railway: z.object({
    RAILWAY_BUCKET: nonEmpty,
    RAILWAY_ENDPOINT: z.url(),
    RAILWAY_ACCESS_KEY_ID: nonEmpty,
    RAILWAY_SECRET_ACCESS_KEY: nonEmpty,
    RAILWAY_REGION_LABEL: z.string().default("iad"),
  }),
  b2: z.object({
    B2_BUCKET: nonEmpty,
    B2_REGION: nonEmpty,
    B2_APPLICATION_KEY_ID: nonEmpty,
    B2_APPLICATION_KEY: nonEmpty,
  }),
  neon: z.object({
    NEON_BUCKET: nonEmpty,
    NEON_ENDPOINT: z.url(),
    NEON_REGION: nonEmpty,
    NEON_ACCESS_KEY_ID: nonEmpty,
    NEON_SECRET_ACCESS_KEY: nonEmpty,
  }),
  bunny: z.object({
    BUNNY_STORAGE_ZONE: nonEmpty,
    BUNNY_STORAGE_REGION: nonEmpty,
    BUNNY_STORAGE_PASSWORD: nonEmpty,
  }),
  appwrite: z.object({
    APPWRITE_ENDPOINT: z.url(),
    APPWRITE_PROJECT_ID: nonEmpty,
    APPWRITE_API_KEY: nonEmpty,
    APPWRITE_BUCKET: nonEmpty,
  }),
  convex: z.object({
    CONVEX_SITE_URL: z.url(),
    CONVEX_BENCH_TOKEN: nonEmpty,
    CONVEX_REGION: z.string().default("aws-us-east-1"),
  }),
  upstash: z.object({
    UPSTASH_BLOB_TOKEN: nonEmpty,
  }),
} satisfies Record<ProviderId, z.ZodType>;

type Env = Record<string, string | undefined>;

const build = (id: ProviderId, env: Env): Provider | undefined => {
  switch (id) {
    case "aws-s3": {
      const e = specs["aws-s3"].safeParse(env);
      if (!e.success) return undefined;
      const v = e.data;
      return {
        id,
        label: "Amazon S3",
        region: v.AWS_S3_REGION,
        connect: () =>
          new Files({
            retries: 0,
            adapter: s3({
              bucket: v.AWS_S3_BUCKET,
              region: v.AWS_S3_REGION,
              credentials: { accessKeyId: v.AWS_S3_ACCESS_KEY_ID, secretAccessKey: v.AWS_S3_SECRET_ACCESS_KEY },
            }),
          }),
      };
    }
    case "r2": {
      const e = specs.r2.safeParse(env);
      if (!e.success) return undefined;
      const v = e.data;
      return {
        id,
        label: "Cloudflare R2",
        region: v.R2_REGION_LABEL,
        connect: () =>
          new Files({
            retries: 0,
            adapter: r2({
              bucket: v.R2_BUCKET,
              accountId: v.R2_ACCOUNT_ID,
              accessKeyId: v.R2_ACCESS_KEY_ID,
              secretAccessKey: v.R2_SECRET_ACCESS_KEY,
              // Same AWS SDK client as every other S3-compatible provider in the run.
              client: "aws-sdk",
            }),
          }),
      };
    }
    case "railway": {
      const e = specs.railway.safeParse(env);
      if (!e.success) return undefined;
      const v = e.data;
      return {
        id,
        label: "Railway Buckets",
        region: v.RAILWAY_REGION_LABEL,
        // No dedicated adapter: Railway documents its buckets as plain S3-compatible storage.
        connect: () =>
          new Files({
            retries: 0,
            adapter: s3({
              bucket: v.RAILWAY_BUCKET,
              region: "auto",
              endpoint: v.RAILWAY_ENDPOINT,
              credentials: { accessKeyId: v.RAILWAY_ACCESS_KEY_ID, secretAccessKey: v.RAILWAY_SECRET_ACCESS_KEY },
            }),
          }),
      };
    }
    case "b2": {
      const e = specs.b2.safeParse(env);
      if (!e.success) return undefined;
      const v = e.data;
      return {
        id,
        label: "Backblaze B2",
        region: v.B2_REGION,
        connect: () =>
          new Files({
            retries: 0,
            adapter: backblazeB2({
              bucket: v.B2_BUCKET,
              region: v.B2_REGION,
              accessKeyId: v.B2_APPLICATION_KEY_ID,
              secretAccessKey: v.B2_APPLICATION_KEY,
            }),
          }),
      };
    }
    case "neon": {
      const e = specs.neon.safeParse(env);
      if (!e.success) return undefined;
      const v = e.data;
      return {
        id,
        label: "Neon",
        region: v.NEON_REGION,
        connect: () =>
          new Files({
            retries: 0,
            adapter: neon({
              bucket: v.NEON_BUCKET,
              endpoint: v.NEON_ENDPOINT,
              region: v.NEON_REGION,
              accessKeyId: v.NEON_ACCESS_KEY_ID,
              secretAccessKey: v.NEON_SECRET_ACCESS_KEY,
            }),
          }),
      };
    }
    case "bunny": {
      const e = specs.bunny.safeParse(env);
      if (!e.success) return undefined;
      const v = e.data;
      return {
        id,
        label: "Bunny Storage",
        region: v.BUNNY_STORAGE_REGION,
        // Bunny's S3-compatible endpoint (in preview), so Bunny runs on the same AWS SDK path as the other S3-style
        // providers and gets presigned URLs. The zone name is the access key and the zone password the secret.
        connect: () =>
          new Files({
            retries: 0,
            adapter: s3({
              bucket: v.BUNNY_STORAGE_ZONE,
              region: v.BUNNY_STORAGE_REGION,
              endpoint: `https://${v.BUNNY_STORAGE_REGION}-s3.storage.bunnycdn.com`,
              forcePathStyle: true,
              credentials: { accessKeyId: v.BUNNY_STORAGE_ZONE, secretAccessKey: v.BUNNY_STORAGE_PASSWORD },
            }),
          }),
      };
    }
    case "appwrite": {
      const e = specs.appwrite.safeParse(env);
      if (!e.success) return undefined;
      const v = e.data;
      return {
        id,
        label: "Appwrite",
        region: new URL(v.APPWRITE_ENDPOINT).hostname.split(".")[0] ?? v.APPWRITE_ENDPOINT,
        // The bucket allows public reads, so url() returns Appwrite's permanent /view link; it has no signed URLs.
        connect: () =>
          new Files({
            retries: 0,
            adapter: appwrite({
              bucket: v.APPWRITE_BUCKET,
              endpoint: v.APPWRITE_ENDPOINT,
              projectId: v.APPWRITE_PROJECT_ID,
              key: v.APPWRITE_API_KEY,
              public: true,
            }),
          }),
      };
    }
    case "convex": {
      const e = specs.convex.safeParse(env);
      if (!e.success) return undefined;
      const v = e.data;
      return {
        id,
        label: "Convex",
        region: v.CONVEX_REGION,
        // files-sdk's Convex adapter runs inside Convex functions, so a small Convex app (convex-app/) wraps it
        // over HTTP. Uploads use Convex upload URLs and reads use Convex file URLs; see src/convex-http.ts.
        connect: () => new Files({ retries: 0, adapter: convexHttp({ siteUrl: v.CONVEX_SITE_URL, token: v.CONVEX_BENCH_TOKEN }) }),
        // Convex assigns storage ids, which can't be listed by a caller-chosen prefix.
        canList: false,
      };
    }
    case "upstash": {
      const e = specs.upstash.safeParse(env);
      if (!e.success) return undefined;
      const v = e.data;
      return {
        id,
        label: "Upstash Blob",
        // Upstash has no region to pick: buckets are global, on Cloudflare R2, with reads replicated to its CDN.
        region: "global",
        connect: () => new Files({ retries: 0, adapter: upstashBlob({ token: v.UPSTASH_BLOB_TOKEN }) }),
      };
    }
    default: {
      const _exhaustive: never = id;
      return _exhaustive;
    }
  }
};

export const isProviderId = (value: string): value is ProviderId =>
  providerIds.some((id) => id === value);

/** Providers whose credentials are present, optionally narrowed to `only`. */
export const loadProviders = ({ env, only }: { env: Env; only: readonly ProviderId[] | undefined }): Provider[] =>
  providerIds
    .filter((id) => only === undefined || only.includes(id))
    .map((id) => build(id, env))
    .filter((p): p is Provider => p !== undefined);
