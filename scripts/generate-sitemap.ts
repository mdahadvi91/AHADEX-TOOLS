/* ============================================================
 * Sitemap Generator
 * ------------------------------------------------------------
 * Reads:  src/data/tools.ts (working tools only)
 * Writes: public/sitemap.xml
 *
 * Run:    npm run sitemap
 * Auto:   runs before `npm run build`
 *
 * NOTE: AHADEX has no categories. Only real pages and working
 * tools are included.
 * ============================================================ */

import { writeFileSync } from "node:fs";
import { resolve } from "node:path";
import { tools } from "../src/data/tools";

const SITE_URL = "https://ahadex.fun";

interface SitemapEntry {
  loc: string;
  changefreq: "daily" | "weekly" | "monthly" | "yearly";
  priority: number;
}

const today = new Date().toISOString().split("T")[0];

/* ── Static routes ── */
const staticRoutes: SitemapEntry[] = [
  { loc: "/", changefreq: "weekly", priority: 1.0 },
  { loc: "/tools", changefreq: "weekly", priority: 0.9 },
  { loc: "/about", changefreq: "monthly", priority: 0.6 },
  { loc: "/contact", changefreq: "monthly", priority: 0.6 },
  { loc: "/privacy", changefreq: "yearly", priority: 0.3 },
  { loc: "/terms", changefreq: "yearly", priority: 0.3 },
  { loc: "/disclaimer", changefreq: "yearly", priority: 0.3 },
  { loc: "/accessibility", changefreq: "yearly", priority: 0.3 },
  { loc: "/cookie-policy", changefreq: "yearly", priority: 0.3 },
];

/* ── Tool routes (auto from registry) ── */
const toolRoutes: SitemapEntry[] = tools.map((t) => ({
  loc: t.path,
  changefreq: "weekly" as const,
  priority: t.popular ? 0.9 : 0.8,
}));

const allRoutes = [...staticRoutes, ...toolRoutes];

/* ── Build XML ── */
function buildXml(): string {
  const urls = allRoutes
    .map((r) => {
      const fullUrl = `${SITE_URL}${r.loc}`;
      return `  <url>
    <loc>${fullUrl}</loc>
    <lastmod>${today}</lastmod>
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
console.log(`   ${allRoutes.length} URLs (${tools.length} tools + ${staticRoutes.length} static)`);
