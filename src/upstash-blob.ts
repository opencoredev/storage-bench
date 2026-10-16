import { createStoredFile, FilesError, type Adapter, type FileInfo } from "files-sdk";
import { Bucket, BlobError } from "@upstash/blob";

/**
 * files-sdk has no Upstash Blob adapter, so this maps its interface onto Upstash's own SDK, which is how
 * Upstash users reach their buckets. URLs are signed by Upstash's signing service, one object at a time.
 * The SDK's built-in retries are patched off at install (scripts/patch-upstash-blob.mjs), like every
 * provider here.
 */

const toFilesError = (error: unknown): FilesError => {
  if (error instanceof FilesError) return error;
  if (BlobError.is(error)) {
    const code = error.code === "not_found" ? "NotFound" : error.code === "unauthorized" || error.code === "forbidden" ? "Unauthorized" : "Provider";
    return new FilesError(code, `upstash-blob: ${error.message}`, error);
  }
  return new FilesError("Provider", `upstash-blob: ${error instanceof Error ? error.message : String(error)}`, error);
};

const call = async <T>(fn: () => Promise<T>): Promise<T> => {
  try {
    return await fn();
  } catch (error) {
    throw toFilesError(error);
  }
};

export function upstashBlob(opts: { token: string }): Adapter<Bucket> {
  // Objects are stored with the SDK's default Cache-Control; nothing here reads through a cache.
  const bucket = new Bucket({ token: opts.token, enableTelemetry: false });
  const info = (key: string): Promise<FileInfo> =>
    call(async () => {
      const i = await bucket.info(key);
      return { key, size: i.size, contentType: i.contentType, etag: i.etag, lastModified: i.uploadedAt.getTime() };
    });

  return {
    name: "upstash-blob",
    raw: bucket,
    capabilities: {
      serverSideCopy: true,
      signedUrl: { supported: true, expiry: "exact", disposition: false },
      signedUpload: { supported: true, maxSize: false },
    },
    upload: (key, body, options) =>
      call(async () => {
        const blob = await bucket.put(key, body, {
          contentType: options?.contentType ?? "application/octet-stream",
        });
        return { key, size: blob.size, contentType: blob.contentType, etag: blob.etag };
      }),
    download: (key) =>
      call(async () => {
        const d = await bucket.get(key);
        return createStoredFile(
          { key, size: d.size, contentType: d.contentType, etag: d.etag, lastModified: d.uploadedAt.getTime() },
          { kind: "stream", factory: () => d.body },
        );
      }),
    head: info,
    exists: (key) => call(() => bucket.exists(key)),
    delete: (key) => call(() => bucket.del(key)),
    copy: (from, to) =>
      call(async () => {
        await bucket.copy(from, to);
      }),
    list: (options) =>
      call(async () => {
        const page = await bucket.list({ prefix: options?.prefix, cursor: options?.cursor, limit: options?.limit });
        return {
          items: page.blobs.map((b) => ({ key: b.path, size: b.size, contentType: "application/octet-stream", etag: b.etag, lastModified: b.uploadedAt.getTime() })),
          ...(page.cursor === undefined ? {} : { cursor: page.cursor }),
        };
      }),
    url: (key, options) =>
      call(async () => {
        if (options?.responseContentDisposition) throw new FilesError("Unsupported", "upstash-blob: responseContentDisposition is not supported");
        return (await bucket.signedReadUrl(key, options?.expiresIn === undefined ? {} : { expiresIn: options.expiresIn })).url;
      }),
    signedUploadUrl: (key, options) =>
      call(async () => {
        const target = await bucket.signedUploadUrl(key, { expiresIn: options.expiresIn, ...(options.contentType ? { contentType: options.contentType } : {}) });
        return { method: "PUT", url: target.url, headers: target.headers };
      }),
  };
}
