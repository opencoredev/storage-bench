import { httpActionGeneric, httpRouter } from "convex/server";
import { FilesError } from "files-sdk";
import { convex } from "files-sdk/convex";

const http = httpRouter();

for (const route of [
  { path: "/upload-url", method: "POST" },
  { path: "/head", method: "GET" },
  { path: "/delete", method: "POST" },
  { path: "/url", method: "GET" },
] satisfies { path: string; method: "GET" | "POST" }[]) {
  http.route({
    ...route,
    handler: httpActionGeneric(async (ctx, request) => {
      const token = process.env.CONVEX_BENCH_TOKEN;
      if (!token || request.headers.get("Authorization") !== `Bearer ${token}`) {
        return Response.json({ error: "Unauthorized" }, { status: 401 });
      }
      if (route.path === "/upload-url") {
        return Response.json({ url: await ctx.storage.generateUploadUrl() });
      }
      const id = new URL(request.url).searchParams.get("id");
      if (!id) return Response.json({ error: "Missing id" }, { status: 400 });
      const files = convex({ ctx });
      try {
        switch (route.path) {
          case "/head": {
            const { size, contentType, etag } = await files.head(id);
            return Response.json({ size, contentType, etag });
          }
          case "/delete":
            await files.delete(id);
            return Response.json({ deleted: true });
          case "/url":
            return Response.json({ url: await files.url(id) });
          default:
            return new Response(null, { status: 404 });
        }
      } catch (error) {
        const status = error instanceof FilesError && error.code === "NotFound" ? 404 : 500;
        return Response.json({ error: status === 404 ? "NotFound" : "Storage operation failed" }, { status });
      }
    }),
  });
}

export default http;
