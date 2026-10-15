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
 *   - Tool pages ship an <image:image> entry for Google Image
 *   - Blog posts ship an <image:image> using their OG image
 * ============================================================ */

import { writeFileSync, existsSync } from "node:fs";
import { resolve } from "node:path";
import { execSync } from "node:child_process";
import { tools } from "../src/data/tools";
import { blogPosts } from "../src/data/blog";

const SITE_URL = "https://ahadex.fun";

/* ── Git-based lastmod lookup ────────────────────────────────
 * Reads the date of the most recent commit that touched a given
 * file, so lastmod reflects actual content changes instead of a
 * manually-maintained constant.
 *
 * Falls back to today's date if git is unavailable (e.g. a shallow
 * clone without history, or a build environment that strips .git).
 * ─────────────────────────────────────────────────────────── */
function gitLastMod(filePath: string): string {
  try {
    const date = execSync(`git log -1 --format=%cs -- "${filePath}"`, {
      encoding: "utf-8",
      stdio: ["pipe", "pipe", "ignore"],
    }).trim();
    if (date) return date;
  } catch {
    /* ignore */
  }
  return new Date().toISOString().slice(0, 10);
}

/* Compute once, reuse across all entries from the same source. */
const TOOLS_LASTMOD = gitLastMod("src/data/tools.ts");
const TRUST_LASTMOD = gitLastMod("src/data/trustContent.ts");
const BLOG_LASTMOD = gitLastMod("src/data/blog.ts");
const HOME_LASTMOD = gitLastMod("src/pages/ToolsIndexPage.tsx");

interface SitemapImage {
  loc: string;
  title: string;
  caption?: string;
}

interface SitemapEntry {
  loc: string;
  changefreq: "daily" | "weekly" | "monthly" | "yearly";
  priority: number;
  lastmod: string;
  images?: SitemapImage[];
}

/* ── Static routes ── */
const staticRoutes: SitemapEntry[] = [
  { loc: "/", changefreq: "weekly", priority: 1.0, lastmod: HOME_LASTMOD },
  { loc: "/tools", changefreq: "weekly", priority: 0.9, lastmod: TOOLS_LASTMOD },
  { loc: "/blog", changefreq: "weekly", priority: 0.7, lastmod: BLOG_LASTMOD },
  { loc: "/about", changefreq: "monthly", priority: 0.6, lastmod: TRUST_LASTMOD },
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

/* ── Tool routes (each ships its OG image) ── */
const toolRoutes: SitemapEntry[] = tools.map((t) => {
  const og = t.seo.ogImage.startsWith("http")
    ? t.seo.ogImage
    : `${SITE_URL}${t.seo.ogImage}`;
  return {
    loc: t.path,
    changefreq: "weekly" as const,
    priority: t.popular ? 0.9 : 0.8,
    lastmod: TOOLS_LASTMOD,
    images: [
      {
        loc: og,
        title: t.seo.title,
        caption: t.seo.description,
      },
    ],
  };
});

/* ── Blog routes (each ships its OG image when present) ── */
const blogRoutes: SitemapEntry[] = blogPosts.map((p) => {
  const og = (p as unknown as { ogImage?: string }).ogImage;
  const images: SitemapImage[] = og
    ? [
        {
          loc: og.startsWith("http") ? og : `${SITE_URL}${og}`,
          title: p.title,
          caption: p.excerpt,
        },
      ]
    : [];
  return {
    loc: `/blog/${p.slug}`,
    changefreq: "monthly" as const,
    priority: 0.6,
    lastmod: p.publishedAt || BLOG_LASTMOD,
    images,
  };
});

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

/* ── Escape XML entities in text fields ── */
function esc(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

/* ── Build XML ── */
function buildXml(): string {
  const urls = validRoutes
    .map((r) => {
      const fullUrl = `${SITE_URL}${r.loc}`;
      const imageTags = (r.images || [])
        .map(
          (img) =>
            `    <image:image>\n      <image:loc>${esc(img.loc)}</image:loc>\n      <image:title>${esc(img.title)}</image:title>${
              img.caption
                ? `\n      <image:caption>${esc(img.caption)}</image:caption>`
                : ""
            }\n    </image:image>`
        )
        .join("\n");

      const urlBlock = `  <url>
    <loc>${fullUrl}</loc>
    <lastmod>${r.lastmod}</lastmod>
    <changefreq>${r.changefreq}</changefreq>
    <priority>${r.priority.toFixed(1)}</priority>${
        imageTags ? "\n" + imageTags : ""
      }
  </url>`;
      return urlBlock;
    })
    .join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${urls}
</urlset>
`;
}

const xml = buildXml();
const outPath = resolve(process.cwd(), "public/sitemap.xml");

writeFileSync(outPath, xml, "utf-8");

const imageCount = validRoutes.reduce(
  (sum, r) => sum + (r.images?.length || 0),
  0
);
console.log(`✅ Sitemap generated: ${outPath}`);
console.log(
  `   ${validRoutes.length} URLs (${tools.length} tools + ${staticRoutes.length} static + ${blogRoutes.length} blog)`
);
console.log(`   ${imageCount} image entries`);
