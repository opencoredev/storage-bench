// @upstash/blob retries GET, HEAD, PUT and DELETE up to 3 times on 5xx, 429 and dropped connections, retries its
// signing calls the same way, and retries credential minting up to 3 more times on 429 or 503, with no option to
// turn any of it off. Every provider in the benchmark runs with retries off, so this sets all of them to one attempt.
// The SDK's single re-request after refreshing an expired credential is kept: it is how its credentials work, not a
// retry of a failed request.
import { readFile, writeFile } from "node:fs/promises";

const edits = [
  ["RETRY_ATTEMPTS = 3;", "RETRY_ATTEMPTS = 1;"],
  ["if (attempt < 3) {", "if (attempt < 0) {"],
];

for (const build of ["dist/index.js", "dist/index.cjs"]) {
  const file = new URL(`../node_modules/@upstash/blob/${build}`, import.meta.url);
  let src = await readFile(file, "utf8").catch(() => undefined);
  if (src === undefined) continue;
  for (const [from, to] of edits) {
    if (src.includes(to)) continue;
    if (!src.includes(from)) throw new Error(`patch-upstash-blob: "${from}" not found in ${build}; check the SDK version`);
    src = src.replace(from, to);
  }
  await writeFile(file, src);
}
