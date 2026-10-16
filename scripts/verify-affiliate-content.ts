/* ============================================================
 * Verify affiliate content completeness
 * ------------------------------------------------------------
 * Runs only when VITE_ENABLE_AFFILIATE_RECOMMENDATIONS=true.
 *
 * Purpose: the AdSense guidance treats affiliate cards without
 * added value as spam. Before the flag can be turned on in
 * production, every product referenced by AFFILIATE_BY_TOOL must
 * be marked contentStatus: "ready" AND must include the full set
 * of rich fields:
 *
 *   - tested: boolean
 *   - whyThisProduct: { en, bn }
 *   - advantages: { en[], bn[] }       (>= 3 items)
 *   - limitations: { en[], bn[] }      (>= 2 items)
 *   - alternatives: { en, bn }
 *   - notRecommendedWhen: { en, bn }
 *
 * If any product is missing any of these, the build fails with a
 * specific list of which products are incomplete. This makes it
 * impossible to accidentally ship a "Recommended Pick" generic
 * card to real users once the flag is on.
 * ============================================================ */

import {
  AFFILIATE_PRODUCTS,
  AFFILIATE_BY_TOOL,
  type AffiliateProduct,
} from "../src/data/affiliates";

const flagOn =
  process.env.VITE_ENABLE_AFFILIATE_RECOMMENDATIONS === "true";

if (!flagOn) {
  console.log(
    "ℹ️  Affiliate recommendations disabled — skipping content check"
  );
  process.exit(0);
}

const referencedIds = new Set<string>();
for (const ids of Object.values(AFFILIATE_BY_TOOL)) {
  for (const id of ids) referencedIds.add(id);
}

const issues: string[] = [];

function checkField<K extends keyof AffiliateProduct>(
  product: AffiliateProduct,
  key: K,
  validate: (v: AffiliateProduct[K]) => boolean,
  description: string
) {
  const value = product[key];
  if (value === undefined || !validate(value)) {
    issues.push(`  • ${product.id}: missing or invalid ${description}`);
  }
}

for (const id of referencedIds) {
  const product = AFFILIATE_PRODUCTS[id];
  if (!product) {
    issues.push(`  • ${id}: referenced but not defined in AFFILIATE_PRODUCTS`);
    continue;
  }

  if (product.contentStatus !== "ready") {
    issues.push(
      `  • ${product.id}: contentStatus is "${product.contentStatus}" (must be "ready")`
    );
    continue;
  }

  if (typeof product.tested !== "boolean") {
    issues.push(`  • ${product.id}: tested must be a boolean`);
  }

  checkField(
    product,
    "whyThisProduct",
    (v) => Boolean(v?.en?.trim()) && Boolean(v?.bn?.trim()),
    "whyThisProduct (en + bn)"
  );

  checkField(
    product,
    "advantages",
    (v) =>
      Array.isArray(v?.en) &&
      v.en.length >= 3 &&
      Array.isArray(v?.bn) &&
      v.bn.length >= 3,
    "advantages (>= 3 items, both languages)"
  );

  checkField(
    product,
    "limitations",
    (v) =>
      Array.isArray(v?.en) &&
      v.en.length >= 2 &&
      Array.isArray(v?.bn) &&
      v.bn.length >= 2,
    "limitations (>= 2 items, both languages)"
  );

  checkField(
    product,
    "alternatives",
    (v) => Boolean(v?.en?.trim()) && Boolean(v?.bn?.trim()),
    "alternatives (en + bn)"
  );

  checkField(
    product,
    "notRecommendedWhen",
    (v) => Boolean(v?.en?.trim()) && Boolean(v?.bn?.trim()),
    "notRecommendedWhen (en + bn)"
  );
}

if (issues.length > 0) {
  console.error("");
  console.error(
    "❌ Affiliate content check FAILED — flag is ON but products are incomplete."
  );
  console.error("");
  console.error(issues.join("\n"));
  console.error("");
  console.error(
    `Referenced products: ${referencedIds.size}. Fix or set VITE_ENABLE_AFFILIATE_RECOMMENDATIONS=false.`
  );
  console.error("");
  process.exit(1);
}

console.log(
  `✅ Affiliate content verified — ${referencedIds.size} referenced products all marked "ready"`
);
