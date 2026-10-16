// @upstash/blob retries GET, HEAD, PUT and DELETE up to 3 times on 5xx, 429 and dropped connections, and
// retries its signing calls the same way, with no option to turn it off. Every provider in the benchmark runs
// with retries off, so this sets the SDK's attempt count to 1.
import { readFile, writeFile } from "node:fs/promises";

for (const build of ["dist/index.js", "dist/index.cjs"]) {
  const file = new URL(`../node_modules/@upstash/blob/${build}`, import.meta.url);
  const src = await readFile(file, "utf8").catch(() => undefined);
  if (src === undefined || src.includes("RETRY_ATTEMPTS = 1;")) continue;
  if (!src.includes("RETRY_ATTEMPTS = 3;")) throw new Error(`patch-upstash-blob: retry constant not found in ${build}; check the SDK version`);
  await writeFile(file, src.replace("RETRY_ATTEMPTS = 3;", "RETRY_ATTEMPTS = 1;"));
}
