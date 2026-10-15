/* ============================================================
 * Verify count consistency across the codebase
 * ------------------------------------------------------------
 * Runs as part of the build. Fails if any hard-coded count of
 * tools contradicts tools.length. This prevents the site from
 * shipping with "27 tools" in one place and "28" in another.
 *
 * To add a new tool:
 *   1. Add it to src/data/tools.ts (source of truth)
 *   2. Update any manual lists in static-ssr-content.ts and README
 *   3. This script confirms the counts match
 * ============================================================ */

import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { tools } from "../src/data/tools";

const EXPECTED = tools.length;
const errors: string[] = [];

/* ── 1. static-ssr-content.ts — tool list section ── */
const staticContent = readFileSync(
  resolve(process.cwd(), "src/data/static-ssr-content.ts"),
  "utf-8"
);

// Count unique tool slugs referenced in the /tools page static content.
// Using a Set so a tool referenced twice (once in the category list,
// once in the "How to choose a tool" section) counts only once.
const toolsPageMatch = staticContent.match(
  /path: "\/tools",[\s\S]*?<\/article>/
);
if (toolsPageMatch) {
  const slugSet = new Set<string>();
  const slugRegex = /href="\/tools\/([a-z0-9-]+)"/g;
  let m: RegExpExecArray | null;
  while ((m = slugRegex.exec(toolsPageMatch[0])) !== null) {
    slugSet.add(m[1]);
  }
  const uniqueCount = slugSet.size;
  if (uniqueCount !== EXPECTED) {
    const missing = tools.map((t) => t.slug).filter((s) => !slugSet.has(s));
    const extra = [...slugSet].filter(
      (s) => !tools.some((t) => t.slug === s)
    );
    errors.push(
      `static-ssr-content.ts /tools list references ${uniqueCount} unique tool slugs, but tools.length is ${EXPECTED}.` +
        (missing.length ? ` Missing: ${missing.join(", ")}.` : "") +
        (extra.length ? ` Unknown: ${extra.join(", ")}.` : "")
    );
  }
}

/* ── 2. README.md ── */
try {
  const readme = readFileSync(resolve(process.cwd(), "README.md"), "utf-8");

  // Match "## 🛠 Tools (N)" or "Tools (N)"
  const headingMatch = readme.match(/## .*Tools \((\d+)\)/);
  if (headingMatch && parseInt(headingMatch[1], 10) !== EXPECTED) {
    errors.push(
      `README.md heading says "Tools (${headingMatch[1]})" but tools.length is ${EXPECTED}.`
    );
  }

  // Match "Total: N tools"
  const totalMatch = readme.match(/Total:\s*(\d+)\s*tools/i);
  if (totalMatch && parseInt(totalMatch[1], 10) !== EXPECTED) {
    errors.push(
      `README.md "Total: ${totalMatch[1]} tools" but tools.length is ${EXPECTED}.`
    );
  }
} catch {
  // README missing — not fatal
}

/* ── 3. HomeFAQ — uses tools.length at runtime, so no check needed ── */

/* ── Report ── */
if (errors.length > 0) {
  console.error("");
  console.error("❌ Count consistency check FAILED:");
  for (const err of errors) console.error(`   • ${err}`);
  console.error("");
  console.error(`   Source of truth: src/data/tools.ts (${EXPECTED} tools)`);
  console.error("");
  process.exit(1);
}

console.log(`✅ Count consistency: all references match tools.length (${EXPECTED})`);
