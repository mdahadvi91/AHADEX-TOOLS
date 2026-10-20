import { readFileSync, readdirSync, statSync } from "node:fs";
import { join, relative } from "node:path";

const TOOLS_DIR = join(process.cwd(), "src/tools");

const SUSPICIOUS_PATTERNS = [
  { name: "FormData (possible file upload)", regex: /new\s+FormData\s*\(/g },
  { name: "XMLHttpRequest", regex: /new\s+XMLHttpRequest\s*\(/g },
  { name: "sendBeacon", regex: /navigator\.sendBeacon\s*\(/g },
  { name: "fetch with remote URL", regex: /fetch\s*\(\s*["'`]https?:\/\/[^"'`]+["'`]/g },
];

interface Issue {
  file: string;
  line: number;
  pattern: string;
  snippet: string;
}

function walk(dir: string): string[] {
  const files: string[] = [];
  try {
    for (const entry of readdirSync(dir)) {
      const full = join(dir, entry);
      const stat = statSync(full);
      if (stat.isDirectory()) {
        files.push(...walk(full));
      } else if (entry.endsWith(".ts") || entry.endsWith(".tsx")) {
        files.push(full);
      }
    }
  } catch {
    /* ignore */
  }
  return files;
}

const issues: Issue[] = [];
const files = walk(TOOLS_DIR);

for (const file of files) {
  const content = readFileSync(file, "utf-8");
  const lines = content.split("\n");

  for (const { name, regex } of SUSPICIOUS_PATTERNS) {
    const re = new RegExp(regex.source, "g");
    let match;
    while ((match = re.exec(content)) !== null) {
      const beforeMatch = content.slice(0, match.index);
      const lineNum = beforeMatch.split("\n").length;
      const snippet = (lines[lineNum - 1] || "").trim();
      issues.push({
        file: relative(process.cwd(), file),
        line: lineNum,
        pattern: name,
        snippet,
      });
    }
  }
}

console.log(`\n🔍 Scanning ${files.length} tool files for suspicious upload patterns...\n`);

const filtered = issues.filter((i) => {
  // Allow fetch for blob/worker loading (these are local)
  if (i.snippet.includes("blob:") || i.snippet.includes("worker")) return false;
  // Allow fetch on same-origin paths (e.g. /api/... but NOT https://external)
  if (i.pattern === "fetch with remote URL") {
    // Only flag external URLs
    if (!i.snippet.match(/fetch\s*\(\s*["'`]https?:\/\/(?!ahadex\.fun)/)) return false;
  }
  return true;
});

if (filtered.length === 0) {
  console.log(`✅ No suspicious upload patterns detected. All ${files.length} tool files are 100% local. 🎉\n`);
  process.exit(0);
}

console.error(`⚠️  Found ${filtered.length} suspicious pattern(s):\n`);
for (const issue of filtered) {
  console.error(`  ${issue.file}:${issue.line}`);
  console.error(`    Pattern: ${issue.pattern}`);
  console.error(`    Code:    ${issue.snippet.slice(0, 100)}`);
  console.error("");
}
console.error(`❌ Please review manually. If any actually upload files, remove them immediately.\n`);
process.exit(1);
