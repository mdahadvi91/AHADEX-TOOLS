/* ============================================================
 * Sync tool registry (tools.ts) from content.ts
 * ------------------------------------------------------------
 * Reads each tool's content.ts, extracts English:
 *   - features[]
 *   - howTo[]
 *   - faq[]
 * Writes them into tools.ts (overwrites empty arrays).
 *
 * Also auto-computes relatedTools[] using keyword overlap.
 *
 * Run: npx tsx scripts/sync-tool-data.ts
 * ============================================================ */

import { readFileSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";
import { execSync } from "node:child_process";
import { tools } from "../src/data/tools";

const TOOLS_FILE = resolve(process.cwd(), "src/data/tools.ts");

/* ── Find content.ts for a tool ── */
function findContentFile(toolPath: string): string | null {
  // toolPath example: /tools/image/image-compressor
  // Actual: src/tools/<category>/<slug>/content.ts
  try {
    const result = execSync(
      `find src/tools -name "content.ts" -path "*/$(basename ${toolPath})/content.ts"`,
      { encoding: "utf-8" }
    ).trim();
    if (!result) return null;
    return result.split("\n")[0];
  } catch {
    return null;
  }
}

/* ── Parse content.ts (loose TS object detection via regex) ── */
interface ParsedContent {
  features: { title: string; description: string; emoji?: string }[];
  howTo: { step: number; title: string; description: string }[];
  faq: { question: string; answer: string }[];
}

function parseContentTs(filePath: string): ParsedContent | null {
  try {
    const src = readFileSync(filePath, "utf-8");

    // Extract the EN block (before "bn: {")
    const enEndIdx = src.indexOf("bn:");
    const enBlock = enEndIdx > 0 ? src.slice(0, enEndIdx) : src;

    const features: ParsedContent["features"] = [];
    const howTo: ParsedContent["howTo"] = [];
    const faq: ParsedContent["faq"] = [];

    // Extract features[] block
    const featStart = enBlock.indexOf("features:");
    if (featStart > 0) {
      const featEnd = enBlock.indexOf("faq", featStart);
      const featSection =
        featEnd > 0
          ? enBlock.slice(featStart, featEnd)
          : enBlock.slice(featStart, featStart + 5000);
      const featureRegex =
        /\{\s*emoji:\s*"([^"]*)"[^}]*?title:\s*"([^"]+)"[^}]*?description:\s*"([^"]+)"/g;
      let m;
      while ((m = featureRegex.exec(featSection)) !== null) {
        features.push({
          emoji: m[1],
          title: m[2],
          description: m[3],
        });
      }
    }

    // Extract howTo[] block
    const howStart = enBlock.indexOf("howTo:");
    if (howStart > 0) {
      const howEnd = enBlock.indexOf("features", howStart);
      const howSection =
        howEnd > 0
          ? enBlock.slice(howStart, howEnd)
          : enBlock.slice(howStart, howStart + 5000);
      const howRegex =
        /\{\s*step:\s*(\d+)[^}]*?title:\s*"([^"]+)"[^}]*?description:\s*"([^"]+)"/g;
      let m;
      while ((m = howRegex.exec(howSection)) !== null) {
        howTo.push({
          step: parseInt(m[1]),
          title: m[2],
          description: m[3],
        });
      }
    }

    // Extract faq[] block
    const faqStart = enBlock.indexOf("faq:");
    if (faqStart > 0) {
      const faqEnd = enBlock.indexOf("privacyNote", faqStart);
      const faqSection =
        faqEnd > 0
          ? enBlock.slice(faqStart, faqEnd)
          : enBlock.slice(faqStart, faqStart + 8000);
      const faqRegex =
        /\{\s*question:\s*"([^"]+)"[^}]*?answer:\s*"([^"]+)"/g;
      let m;
      while ((m = faqRegex.exec(faqSection)) !== null) {
        faq.push({ question: m[1], answer: m[2] });
      }
    }

    return { features, howTo, faq };
  } catch {
    return null;
  }
}

/* ── Format as TS literal ── */
function fmtFeatures(arr: ParsedContent["features"]): string {
  if (arr.length === 0) return "[]";
  return (
    "[\n" +
    arr
      .map(
        (f) =>
          `      { title: ${JSON.stringify(f.title)}, description: ${JSON.stringify(f.description)} },`
      )
      .join("\n") +
    "\n    ]"
  );
}

function fmtHowTo(arr: ParsedContent["howTo"]): string {
  if (arr.length === 0) return "[]";
  return (
    "[\n" +
    arr
      .map(
        (s) =>
          `      { step: ${s.step}, title: ${JSON.stringify(s.title)}, description: ${JSON.stringify(s.description)} },`
      )
      .join("\n") +
    "\n    ]"
  );
}

function fmtFaq(arr: ParsedContent["faq"]): string {
  if (arr.length === 0) return "[]";
  return (
    "[\n" +
    arr
      .map(
        (f) =>
          `      { question: ${JSON.stringify(f.question)}, answer: ${JSON.stringify(f.answer)} },`
      )
      .join("\n") +
    "\n    ]"
  );
}

/* ── Auto-compute relatedTools[] (keyword overlap) ── */
function computeRelatedTools(toolId: string, allTools: typeof tools): string[] {
  const current = allTools.find((t) => t.id === toolId);
  if (!current) return [];

  const scores = allTools
    .filter((t) => t.id !== toolId)
    .map((t) => {
      const overlap = t.keywords.filter((k) =>
        current.keywords.includes(k)
      ).length;
      return { id: t.id, score: overlap + (t.popular ? 0.5 : 0) };
    })
    .sort((a, b) => b.score - a.score)
    .slice(0, 4);

  return scores.map((s) => s.id);
}

/* ── Main ── */
console.log("🔍 Scanning tools...");

let src = readFileSync(TOOLS_FILE, "utf-8");
let updated = 0;
let skipped = 0;

for (const tool of tools) {
  const contentPath = findContentFile(tool.path);
  if (!contentPath) {
    console.log(`❌ ${tool.id} — content.ts not found`);
    skipped++;
    continue;
  }

  const parsed = parseContentTs(resolve(process.cwd(), contentPath));
  if (!parsed || (parsed.features.length === 0 && parsed.howTo.length === 0 && parsed.faq.length === 0)) {
    console.log(`⚠️  ${tool.id} — content.ts parsed but empty`);
    skipped++;
    continue;
  }

  // Compute relatedTools
  const related = computeRelatedTools(tool.id, tools);

  // Find the tool's block in tools.ts
  const startPattern = new RegExp(`id:\\s*"${tool.id}"`);
  const startMatch = src.match(startPattern);
  if (!startMatch || startMatch.index === undefined) {
    console.log(`⚠️  ${tool.id} — block not found in tools.ts`);
    skipped++;
    continue;
  }

  // Find features/howTo/faq lines for THIS tool
  const toolStart = startMatch.index;
  const nextToolMatch = src.slice(toolStart + 50).match(/id:\s*"[^"]+"/);
  const toolEnd = nextToolMatch
    ? toolStart + 50 + nextToolMatch.index!
    : src.length;

  let toolBlock = src.slice(toolStart, toolEnd);

  // Replace empty arrays
  toolBlock = toolBlock.replace(
    /features:\s*\[\]/,
    `features: ${fmtFeatures(parsed.features)}`
  );
  toolBlock = toolBlock.replace(
    /howTo:\s*\[\]/,
    `howTo: ${fmtHowTo(parsed.howTo)}`
  );
  toolBlock = toolBlock.replace(/faq:\s*\[\]/, `faq: ${fmtFaq(parsed.faq)}`);
  toolBlock = toolBlock.replace(
    /relatedTools:\s*\[\]/,
    `relatedTools: [${related.map((r) => `"${r}"`).join(", ")}]`
  );

  src = src.slice(0, toolStart) + toolBlock + src.slice(toolEnd);
  updated++;
  console.log(
    `✅ ${tool.id} — ${parsed.features.length}f / ${parsed.howTo.length}h / ${parsed.faq.length}q / ${related.length}r`
  );
}

writeFileSync(TOOLS_FILE, src, "utf-8");
console.log(`\n🎉 Done: ${updated} updated, ${skipped} skipped`);
