/* ============================================================
 * Sync README tool count
 * ------------------------------------------------------------
 * Reads tools.length from the registry and updates the
 * "Total: N tools" line in README.md if it drifts.
 *
 * Runs as part of 'npm run tool:meta' so README stays in sync
 * automatically whenever a tool is added or removed.
 * ============================================================ */

import { readFileSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";
import { tools } from "../src/data/tools";

const README = resolve(process.cwd(), "README.md");

let readme: string;
try {
  readme = readFileSync(README, "utf-8");
} catch {
  console.log("ℹ️  README.md not found, skipping count sync");
  process.exit(0);
}

const expected = tools.length;
const re = /Total:\s*\d+\s*tools/i;
const match = readme.match(re);

if (!match) {
  console.log("ℹ️  No 'Total: N tools' line in README — nothing to sync");
  process.exit(0);
}

const current = parseInt(match[0].match(/\d+/)?.[0] ?? "0", 10);
if (current === expected) {
  console.log(`✅ README count already correct (${expected} tools)`);
  process.exit(0);
}

const updated = readme.replace(re, `Total: ${expected} tools`);
writeFileSync(README, updated, "utf-8");
console.log(`✅ README count synced: ${current} → ${expected} tools`);
