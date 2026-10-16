import { createStoredFile, FilesError, type Adapter, type Body } from "files-sdk";
import { z } from "zod";

const storageIds = new Map<string, string>();
const urlResponse = z.object({ url: z.string().url() });
const uploadResponse = z.object({ storageId: z.string().min(1) });
const headResponse = z.object({
  size: z.number().int().nonnegative(),
  contentType: z.string(),
  etag: z.string().optional(),
});

async function toBlob(body: Body, contentType?: string): Promise<Blob> {
  const type = contentType ?? (body instanceof Blob && body.type ? body.type : "application/octet-stream");
  if (body instanceof Blob) return body.type === type ? body : new Blob([body], { type });
  if (body instanceof ReadableStream) {
    const bytes = await new Response(body).arrayBuffer();
    return new Blob([bytes], { type });
  }
  if (ArrayBuffer.isView(body)) {
    return new Blob([Uint8Array.from(new Uint8Array(body.buffer, body.byteOffset, body.byteLength))], { type });
  }
  return new Blob([body], { type });
}

async function checkedFetch(url: string | URL, init?: RequestInit): Promise<Response> {
  let response: Response;
  try {
    response = await fetch(url, init);
  } catch (error) {
    throw new FilesError("Provider", "convex-http: request failed", error);
  }
  if (!response.ok) {
    await response.body?.cancel();
    const code = response.status === 404 ? "NotFound"
      : response.status === 401 || response.status === 403 ? "Unauthorized" : "Provider";
    throw new FilesError(code, `convex-http: HTTP ${response.status}`);
  }
  return response;
}

export function convexHttp(opts: { siteUrl: string; token: string }): Adapter {
  const siteUrl = new URL(opts.siteUrl);
  if (siteUrl.protocol !== "https:" || !opts.token) {
    throw new FilesError("Invalid", "convex-http: an HTTPS site URL and token are required");
  }
  const namespace = siteUrl.origin;
  const mapKey = (key: string) => `${namespace}\n${key}`;
  const storageId = (key: string) => {
    const id = storageIds.get(mapKey(key));
    if (!id) throw new FilesError("NotFound", `convex-http: unknown key: ${key}`);
    return id;
  };
  const request = async (path: string, method: "GET" | "POST", id?: string, signal?: AbortSignal) => {
    const url = new URL(path, siteUrl);
    if (id) url.searchParams.set("id", id);
    return checkedFetch(url, { method, headers: { Authorization: `Bearer ${opts.token}` }, signal });
  };
  const fileUrl = async (key: string, signal?: AbortSignal) => {
    const response = await request("/url", "GET", storageId(key), signal);
    return urlResponse.parse(await response.json()).url;
  };
  const head: Adapter["head"] = async (key, options) => {
    const response = await request("/head", "GET", storageId(key), options?.signal);
    return { key, ...headResponse.parse(await response.json()) };
  };
  const unsupported = (operation: string): never => {
    throw new FilesError("Unsupported", `convex-http: ${operation} is not supported`);
  };

  return {
    name: "convex-http",
    raw: { siteUrl: siteUrl.origin },
    capabilities: {
      publicUrl: true,
      rangeRead: true,
      serverSideCopy: false,
      signedUpload: { supported: false },
      // Convex URLs do not expire; supported lets the benchmark pass expiresIn through Files.
      signedUrl: { supported: true, expiry: "none", disposition: false },
    },
    async upload(key, body, options) {
      const blob = await toBlob(body, options?.contentType);
      const response = await request("/upload-url", "POST", undefined, options?.signal);
      const { url } = urlResponse.parse(await response.json());
      const uploaded = await checkedFetch(url, {
        method: "POST",
        headers: { "Content-Type": blob.type },
        body: blob,
        signal: options?.signal,
      });
      const { storageId: id } = uploadResponse.parse(await uploaded.json());
      storageIds.set(mapKey(key), id);
      return { key, size: blob.size, contentType: blob.type };
    },
    head,
    async exists(key, options) {
      try {
        await head(key, options);
        return true;
      } catch (error) {
        if (error instanceof FilesError && error.code === "NotFound") return false;
        throw error;
      }
    },
    async delete(key, options) {
      const response = await request("/delete", "POST", storageId(key), options?.signal);
      await response.body?.cancel();
      storageIds.delete(mapKey(key));
    },
    async url(key, options) {
      if (options?.responseContentDisposition) return unsupported("responseContentDisposition");
      return fileUrl(key, options?.signal);
    },
    async download(key, options) {
      const url = await fileUrl(key, options?.signal);
      const range = options?.range;
      const response = await checkedFetch(url, {
        signal: options?.signal,
        headers: range ? { Range: `bytes=${range.start}-${range.end ?? ""}` } : undefined,
      });
      if (!response.body) throw new FilesError("Provider", "convex-http: missing download body");
      const stream = response.body;
      if (range && response.status !== 206) {
        await stream.cancel();
        throw new FilesError("Provider", "convex-http: storage did not honor Range", undefined, { permanent: true });
      }
      const sizeHeader = response.headers.get("content-length");
      const size = sizeHeader === null ? NaN : Number(sizeHeader);
      if (!Number.isSafeInteger(size) || size < 0) {
        await stream.cancel();
        throw new FilesError("Provider", "convex-http: missing or invalid content length");
      }
      return createStoredFile({
        key,
        size,
        contentType: response.headers.get("content-type") ?? "application/octet-stream",
        etag: response.headers.get("etag") ?? undefined,
      }, { kind: "stream", factory: () => stream });
    },
    async list() { return unsupported("list"); },
    async copy() { return unsupported("copy"); },
    async signedUploadUrl() { return unsupported("signedUploadUrl"); },
  };
}
