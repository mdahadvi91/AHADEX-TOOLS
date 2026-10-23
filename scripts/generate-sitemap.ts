import { writeFileSync } from "node:fs";
import { resolve } from "node:path";
import { execSync } from "node:child_process";
import { tools } from "../src/data/tools";
import { guides } from "../src/data/guides";

const SITE_URL = "https://ahadex.fun";

function gitLastMod(filePath: string): string {
  try {
    const date = execSync(`git log -1 --format=%cs -- "${filePath}"`, { encoding: "utf-8", stdio: ["pipe", "pipe", "ignore"] }).trim();
    if (date) return date;
  } catch { /* ignore */ }
  return new Date().toISOString().slice(0, 10);
}

const TOOLS_LASTMOD = gitLastMod("src/data/tools.ts");
const TRUST_LASTMOD = gitLastMod("src/data/trustContent.ts");
const HOME_LASTMOD = gitLastMod("src/pages/HomePage.tsx");

interface SitemapImage { loc: string; title: string; caption?: string; }
interface SitemapEntry { loc: string; changefreq: "daily" | "weekly" | "monthly" | "yearly"; priority: number; lastmod: string; images?: SitemapImage[]; }

const staticRoutes: SitemapEntry[] = [
  { loc: "/", changefreq: "weekly", priority: 1.0, lastmod: HOME_LASTMOD },
  { loc: "/tools", changefreq: "weekly", priority: 0.9, lastmod: TOOLS_LASTMOD },
  { loc: "/guides", changefreq: "weekly", priority: 0.8, lastmod: TOOLS_LASTMOD },
  { loc: "/about", changefreq: "monthly", priority: 0.6, lastmod: TRUST_LASTMOD },
  { loc: "/about/author/mohammad-ahad", changefreq: "monthly", priority: 0.6, lastmod: TRUST_LASTMOD },
  { loc: "/contact", changefreq: "monthly", priority: 0.6, lastmod: TRUST_LASTMOD },
  { loc: "/privacy", changefreq: "yearly", priority: 0.3, lastmod: TRUST_LASTMOD },
  { loc: "/terms", changefreq: "yearly", priority: 0.3, lastmod: TRUST_LASTMOD },
  { loc: "/disclaimer", changefreq: "yearly", priority: 0.3, lastmod: TRUST_LASTMOD },
  { loc: "/accessibility", changefreq: "yearly", priority: 0.3, lastmod: TRUST_LASTMOD },
  { loc: "/cookie-policy", changefreq: "yearly", priority: 0.3, lastmod: TRUST_LASTMOD },
  { loc: "/editorial-policy", changefreq: "yearly", priority: 0.3, lastmod: TRUST_LASTMOD },
  { loc: "/affiliate-disclosure", changefreq: "yearly", priority: 0.3, lastmod: TRUST_LASTMOD },
  { loc: "/sitemap", changefreq: "monthly", priority: 0.4, lastmod: TRUST_LASTMOD },
];

const toolRoutes: SitemapEntry[] = tools.map((t) => {
  const og = t.seo.ogImage.startsWith("http") ? t.seo.ogImage : `${SITE_URL}${t.seo.ogImage}`;
  return {
    loc: t.path,
    changefreq: "weekly" as const,
    priority: t.popular ? 0.9 : 0.8,
    lastmod: TOOLS_LASTMOD,
    images: [{ loc: og, title: t.seo.title, caption: t.seo.description }],
  };
});

const guideRoutes: SitemapEntry[] = guides.map((g) => ({
  loc: `/guides/${g.slug}`,
  changefreq: "monthly" as const,
  priority: 0.7,
  lastmod: g.updatedAt ?? g.publishedAt,
}));

const allEntries = [...staticRoutes, ...toolRoutes, ...guideRoutes];
const seen = new Set<string>();
const allRoutes: SitemapEntry[] = [];
for (const e of allEntries) {
  if (seen.has(e.loc)) continue;
  seen.add(e.loc);
  allRoutes.push(e);
}

function validateEntry(e: SitemapEntry): boolean {
  if (!e.loc.startsWith("/")) return false;
  if (e.loc.includes("?")) return false;
  if (e.loc.includes("/edit/")) return false;
  return true;
}

const validRoutes = allRoutes.filter(validateEntry);

function esc(s: string): string {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&apos;");
}

function buildXml(): string {
  const urls = validRoutes.map((r) => {
    const fullUrl = `${SITE_URL}${r.loc}`;
    const imageTags = (r.images || []).map((img) =>
      `    <image:image>\n      <image:loc>${esc(img.loc)}</image:loc>\n      <image:title>${esc(img.title)}</image:title>${img.caption ? `\n      <image:caption>${esc(img.caption)}</image:caption>` : ""}\n    </image:image>`
    ).join("\n");

    return `  <url>\n    <loc>${fullUrl}</loc>\n    <lastmod>${r.lastmod}</lastmod>\n    <changefreq>${r.changefreq}</changefreq>\n    <priority>${r.priority.toFixed(1)}</priority>${imageTags ? "\n" + imageTags : ""}\n  </url>`;
  }).join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">\n${urls}\n</urlset>`;
}

const xml = buildXml();
const outPath = resolve(process.cwd(), "public/sitemap.xml");
writeFileSync(outPath, xml, "utf-8");
console.log(`✅ Sitemap generated: ${outPath}`);
console.log(`   ${validRoutes.length} URLs`);
