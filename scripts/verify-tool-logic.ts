/* ============================================================
 * verify-tool-logic.ts
 * ------------------------------------------------------------
 * Pure logic smoke tests for core tools.
 * Runs without a browser. If a tool's core function breaks,
 * the build fails before it reaches production.
 * ============================================================ */

import { countStats } from "../src/tools/text/word-counter/logic";
import { encodeText, decodeText } from "../src/tools/developer/base64-encoder/logic";

let passed = 0;
let failed = 0;

function assert(condition: boolean, testName: string, errorMsg: string) {
  if (condition) {
    console.log(`  ✅ ${testName}`);
    passed++;
  } else {
    console.error(`  ❌ ${testName}: ${errorMsg}`);
    failed++;
  }
}

console.log("\n🔍 Running Tool Logic Smoke Tests...\n");

// ─────────────────────────────────────────────────────────────
// 1. Word Counter
// ─────────────────────────────────────────────────────────────
console.log("📝 Word Counter:");
try {
  const text = "Hello world, this is AHADEX!";
  const stats = countStats(text);
  assert(stats.words === 5, "Word count is 5", `Got ${stats.words}`);
  assert(stats.characters === 28, "Character count is 28", `Got ${stats.characters}`);
  assert(stats.sentences >= 1, "Sentence count >= 1", `Got ${stats.sentences}`);
} catch (e) {
  console.error("  ❌ Word Counter threw an error:", e);
  failed++;
}

// ─────────────────────────────────────────────────────────────
// 2. Base64 Encoder
// ─────────────────────────────────────────────────────────────
console.log("\n🔐 Base64 Encoder:");
try {
  const input = "Hello, AHADEX!";
  const encoded = encodeText(input, false);
  assert(encoded.output === "SGVsbG8sIEFIQURFWCE=", "Encode 'Hello, AHADEX!'", `Got ${encoded.output}`);
  
  const decoded = decodeText(encoded.output, false);
  assert(decoded.output === input, "Decode back to original", `Got ${decoded.output}`);

  // Invalid base64
  const invalid = decodeText("!!!not-base64!!!", false);
  assert(!!invalid.error, "Invalid base64 throws error", "Expected error but got none");
} catch (e) {
  console.error("  ❌ Base64 threw an error:", e);
  failed++;
}

// ─────────────────────────────────────────────────────────────
// 3. JSON Formatter (Logic simulation)
// ─────────────────────────────────────────────────────────────
console.log("\n{ } JSON Formatter:");
try {
  const raw = '{"name":"AHADEX","version":1}';
  // Test: valid JSON should parse
  const parsed = JSON.parse(raw);
  assert(parsed.name === "AHADEX", "Valid JSON parses correctly", "Parse failed");
  
  // Test: minifying should not have spaces
  const minified = JSON.stringify(parsed);
  assert(minified === '{"name":"AHADEX","version":1}', "Minify produces compact output", `Got ${minified}`);
  
  // Test: invalid JSON should throw
  let threw = false;
  try { JSON.parse("{invalid}"); } catch { threw = true; }
  assert(threw, "Invalid JSON throws error", "Expected throw but got none");
} catch (e) {
  console.error("  ❌ JSON Formatter threw an error:", e);
  failed++;
}

// ─────────────────────────────────────────────────────────────
// Summary
// ─────────────────────────────────────────────────────────────
console.log("\n" + "─".repeat(40));
if (failed > 0) {
  console.error(`❌ Smoke tests FAILED: ${failed} failed, ${passed} passed.\n`);
  process.exit(1);
} else {
  console.log(`✅ All ${passed} logic smoke tests passed!\n`);
}
