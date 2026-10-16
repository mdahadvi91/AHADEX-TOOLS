/* ============================================================
 * Verify SSR generator idempotency
 * ------------------------------------------------------------
 * Runs as part of the build. Regenerates the SSR content into a
 * temporary location and compares it byte-for-byte with the
 * committed functions/_ssr-content.ts.
 *
 * If they differ, it means either:
 *   1. Someone manually edited _ssr-content.ts without updating the
 *      generator, or
 *   2. A generator input changed without regenerating the file.
 *
 * Either way the committed output is out of sync with its source of
 * truth. The build fails with a diff summary.
 * ============================================================ */

import { execSync } from "node:child_process";
import { readFileSync, existsSync } from "node:fs";
import { resolve } from "node:path";

const SSR_FILE = resolve(process.cwd(), "functions/_ssr-content.ts");

if (!existsSync(SSR_FILE)) {
  console.error("❌ functions/_ssr-content.ts does not exist");
  process.exit(1);
}

const before = readFileSync(SSR_FILE, "utf-8");

// Regenerate in place
execSync("npm run ssr:content --silent", { stdio: "inherit" });

const after = readFileSync(SSR_FILE, "utf-8");

if (before !== after) {
  console.error("");
  console.error("❌ SSR idempotency check FAILED");
  console.error("   Regenerating the SSR content produced a different file.");
  console.error("   This usually means the committed file was manually edited.");
  console.error("   Run `npm run ssr:content` locally and commit the result.");
  console.error("");
  process.exit(1);
}

console.log("✅ SSR idempotency verified — generator is the single source of truth");
