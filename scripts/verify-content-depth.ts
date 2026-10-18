import { tools } from "../src/data/tools";

let issues = 0;

console.log("🔎 Auditing Tool Content Depth...");

for (const tool of tools) {
  const errs: string[] = [];
  
  if (!tool.longDescription || tool.longDescription.length < 50) errs.push("longDescription too short");
  if (!tool.editorialContent || tool.editorialContent.length < 1) errs.push("missing editorialContent");
  if (!tool.features || tool.features.length < 3) errs.push("features < 3");
  if (!tool.howTo || tool.howTo.length < 3) errs.push("howTo < 3");
  if (!tool.faq || tool.faq.length < 3) errs.push("faq < 3");
  if (!tool.useCases || tool.useCases.length < 2) errs.push("useCases < 2");
  if (!tool.limitations || tool.limitations.length < 2) errs.push("limitations < 2");
  if (!tool.privacy) errs.push("missing privacy object");
  if (!tool.relatedTools || tool.relatedTools.length < 1) errs.push("missing relatedTools");
  if (!tool.seo || !tool.seo.title || !tool.seo.description) errs.push("missing SEO metadata");

  if (errs.length > 0) {
    console.error(`❌ ${tool.id}: ${errs.join(", ")}`);
    issues++;
  }
}

if (issues > 0) {
  console.error(`\n❌ Content audit FAILED: ${issues} tool(s) need improvement.`);
  process.exit(1);
}
console.log(`✅ Content audit passed: All ${tools.length} tools meet the depth requirements.`);
