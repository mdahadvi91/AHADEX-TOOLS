import { writeFileSync } from "node:fs";
import { resolve } from "node:path";
import { blogPosts } from "../src/data/blog";

const SITE_URL = "https://ahadex.fun";
const now = new Date().toUTCString();

function escapeXml(s: string): string {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;").replace(/'/g, "&apos;");
}

const items = blogPosts.map((p) => {
  const url = `${SITE_URL}/blog/${p.slug}`;
  const pubDate = new Date(p.publishedAt).toUTCString();
  return `    <item>
      <title>${escapeXml(p.title)}</title>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>
      <pubDate>${pubDate}</pubDate>
      <description>${escapeXml(p.excerpt)}</description>
      <category>${escapeXml(p.category)}</category>
    </item>`;
}).join("\n");

const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>AHADEX Tools Blog</title>
    <link>${SITE_URL}/blog</link>
    <description>Guides, tips, and tutorials for AHADEX Tools — free browser-based utilities.</description>
    <language>en-us</language>
    <lastBuildDate>${now}</lastBuildDate>
    <atom:link href="${SITE_URL}/rss.xml" rel="self" type="application/rss+xml" />
${items}
  </channel>
</rss>
`;

const outPath = resolve(process.cwd(), "public/rss.xml");
writeFileSync(outPath, rss, "utf-8");
console.log(`✅ RSS feed generated: ${outPath}`);
console.log(`   ${blogPosts.length} items`);
