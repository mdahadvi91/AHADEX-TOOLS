/* ============================================================
 * Sitemap Generator
 * ------------------------------------------------------------
 * Reads:  src/data/tools.ts + src/data/blog.ts
 * Writes: public/sitemap.xml
 *
 * Rules:
 *   - Only canonical URLs
 *   - No editor routes
 *   - No query strings
 *   - No duplicates
 *   - lastmod = most recent known change (not build date)
 * ============================================================ */

import { writeFileSync } from "node:fs";
import { resolve } from "node:path";
import { tools } from "../src/data/tools";
import { blogPosts } from "../src/data/blog";

const SITE_URL = "https://ahadex.fun";

/* ── Stable site-wide lastmod (update manually when site content changes) ── */
const SITE_LASTMOD = "2026-10-07";

interface SitemapEntry {
  loc: string;
  changefreq: "daily" | "weekly" | "monthly" | "yearly";
  priority: number;
  lastmod: string;
}

/* ── Static routes ── */
const staticRoutes: SitemapEntry[] = [
  { loc: "/", changefreq: "weekly", priority: 1.0, lastmod: SITE_LASTMOD },
  { loc: "/tools", changefreq: "weekly", priority: 0.9, lastmod: SITE_LASTMOD },
  { loc: "/blog", changefreq: "weekly", priority: 0.7, lastmod: SITE_LASTMOD },
  { loc: "/about", changefreq: "monthly", priority: 0.6, lastmod: SITE_LASTMOD },
  { loc: "/contact", changefreq: "monthly", priority: 0.6, lastmod: SITE_LASTMOD },
  { loc: "/privacy", changefreq: "yearly", priority: 0.3, lastmod: SITE_LASTMOD },
  { loc: "/terms", changefreq: "yearly", priority: 0.3, lastmod: SITE_LASTMOD },
  { loc: "/disclaimer", changefreq: "yearly", priority: 0.3, lastmod: SITE_LASTMOD },
  { loc: "/accessibility", changefreq: "yearly", priority: 0.3, lastmod: SITE_LASTMOD },
  { loc: "/cookie-policy", changefreq: "yearly", priority: 0.3, lastmod: SITE_LASTMOD },
  { loc: "/editorial-policy", changefreq: "yearly", priority: 0.3, lastmod: SITE_LASTMOD },
  { loc: "/affiliate-disclosure", changefreq: "yearly", priority: 0.3, lastmod: SITE_LASTMOD },
  { loc: "/sitemap", changefreq: "monthly", priority: 0.4, lastmod: SITE_LASTMOD },
];

/* ── Tool routes ── */
const toolRoutes: SitemapEntry[] = tools.map((t) => ({
  loc: t.path,
  changefreq: "weekly" as const,
  priority: t.popular ? 0.9 : 0.8,
  lastmod: SITE_LASTMOD,
}));

/* ── Blog routes ── */
const blogRoutes: SitemapEntry[] = blogPosts.map((p) => ({
  loc: `/blog/${p.slug}`,
  changefreq: "monthly" as const,
  priority: 0.6,
  lastmod: p.publishedAt || SITE_LASTMOD,
}));

/* ── Dedupe by loc (safety) ── */
const allEntries = [...staticRoutes, ...toolRoutes, ...blogRoutes];
const seen = new Set<string>();
const allRoutes: SitemapEntry[] = [];
for (const e of allEntries) {
  if (seen.has(e.loc)) continue;
  seen.add(e.loc);
  allRoutes.push(e);
}

/* ── XML validation guard ── */
function validateEntry(e: SitemapEntry): boolean {
  if (!e.loc.startsWith("/")) return false;
  if (e.loc.includes("?")) return false;
  if (e.loc.includes("/edit/")) return false;
  return true;
}

const validRoutes = allRoutes.filter(validateEntry);

/* ── Build XML ── */
function buildXml(): string {
  const urls = validRoutes
    .map((r) => {
      const fullUrl = `${SITE_URL}${r.loc}`;
      return `  <url>
    <loc>${fullUrl}</loc>
    <lastmod>${r.lastmod}</lastmod>
    <changefreq>${r.changefreq}</changefreq>
    <priority>${r.priority.toFixed(1)}</priority>
  </url>`;
    })
    .join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`;
}

const xml = buildXml();
const outPath = resolve(process.cwd(), "public/sitemap.xml");
writeFileSync(outPath, xml, "utf-8");

console.log(`✅ Sitemap generated: ${outPath}`);
console.log(
  `   ${validRoutes.length} URLs (${tools.length} tools + ${staticRoutes.length} static + ${blogRoutes.length} blog)`
);
