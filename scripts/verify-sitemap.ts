/* ============================================================
 * Verify sitemap URL integrity — PRODUCTION ARTIFACT CHECK
 * ------------------------------------------------------------
 * Runs AFTER `vite build` + `build-route-html`.
 *
 * Reads public/sitemap.xml and, for every <loc>, checks:
 *
 *   1. Source-of-truth — URL comes from tools/blog/guides/
 *      authors/staticRoutes. (Sanity check.)
 *
 *   2. Production HTML — dist/<route>/index.html exists.
 *      This is the ACTUAL artifact Cloudflare Pages serves.
 *
 *   3. SEO-critical markup in that HTML:
 *        - non-empty <title>
 *        - non-empty <meta name="description">
 *        - <link rel="canonical"> equals the sitemap URL
 *        - <meta name="robots"> must NOT contain "noindex"
 *        - every <script type="application/ld+json"> parses
 *        - at least one non-empty <h1>
 *
 * Replaces the old SSR_CONTENT check. SSR_CONTENT is a build
 * *input*, not the production output — dist/ is the authority.
 * ============================================================ */

import { readFileSync, existsSync } from "node:fs";
import { resolve } from "node:path";
import { tools } from "../src/data/tools";
import { blogPosts } from "../src/data/blog";
import { authors } from "../src/data/authors";
import { guides } from "../src/data/guides";

const SITE = "https://ahadex.fun";
const SITEMAP = resolve(process.cwd(), "public/sitemap.xml");
const DIST = resolve(process.cwd(), "dist");

if (!existsSync(SITEMAP)) {
  console.error("❌ public/sitemap.xml does not exist — run 'npm run sitemap'");
  process.exit(1);
}
if (!existsSync(DIST)) {
  console.error("❌ dist/ does not exist — run 'npm run build' first");
  process.exit(1);
}

const xml = readFileSync(SITEMAP, "utf-8");
const locs = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);

// ── Expected URLs from source data ─────────────────────────────
const expected = new Set<string>();

const staticPaths = [
  "/", "/tools", "/blog", "/about", "/contact",
  "/privacy", "/terms", "/disclaimer", "/accessibility",
  "/cookie-policy", "/editorial-policy", "/affiliate-disclosure",
  "/sitemap", "/guides",
];
for (const p of staticPaths) expected.add(`${SITE}${p}`);

for (const t of tools) expected.add(`${SITE}${t.path}`);
for (const p of blogPosts) expected.add(`${SITE}/blog/${p.slug}`);
for (const a of Object.values(authors)) expected.add(`${SITE}/about/author/${a.id}`);
for (const g of guides) expected.add(`${SITE}/guides/${g.slug}`);

// ── sitemap URL → dist/<route>/index.html ─────────────────────
function distFileFor(loc: string): string {
  const path = loc.replace(SITE, "");
  if (path === "" || path === "/") return resolve(DIST, "index.html");
  const clean = path.replace(/\/$/, "");
  return resolve(DIST, clean.slice(1), "index.html");
}

// ── HTML helpers ──────────────────────────────────────────────

function getOgMeta(html: string, property: string): string | null {
  const tagRegex = new RegExp(`<meta[^>]+property=["']${property}["'][^>]*>`, "i");
  const tagMatch = html.match(tagRegex);
  if (!tagMatch) return null;
  const contentMatch = tagMatch[0].match(/content=["']([^"']+)["']/);
  return contentMatch ? contentMatch[1].trim() : null;
}

function getTwitterMeta(html: string, name: string): string | null {
  const tagRegex = new RegExp(`<meta[^>]+name=["']${name}["'][^>]*>`, "i");
  const tagMatch = html.match(tagRegex);
  if (!tagMatch) return null;
  const contentMatch = tagMatch[0].match(/content=["']([^"']+)["']/);
  return contentMatch ? contentMatch[1].trim() : null;
}

function getTitle(html: string): string | null {
  const m = html.match(/<title\b[^>]*>([\s\S]*?)<\/title>/i);
  return m ? m[1].trim() : null;
}

function getMetaContent(html: string, name: string): string | null {
  const tagRegex = new RegExp(`<meta\\b[^>]*\\bname=["']${name}["'][^>]*>`, "i");
  const tagMatch = html.match(tagRegex);
  if (!tagMatch) return null;
  const contentMatch = tagMatch[0].match(/content=(["'])([\s\S]*?)\1/);
  return contentMatch ? contentMatch[2].trim() : null;
}

function getCanonical(html: string): string | null {
  const tagRegex = /<link\b[^>]*\brel=["']canonical["'][^>]*>/i;
  const tagMatch = html.match(tagRegex);
  if (!tagMatch) return null;
  const hrefMatch = tagMatch[0].match(/href=(["'])([\s\S]*?)\1/);
  return hrefMatch ? hrefMatch[2].trim() : null;
}

function hasNonEmptyH1(html: string): boolean {
  const h1s = [...html.matchAll(/<h1\b[^>]*>([\s\S]*?)<\/h1>/gi)];
  return h1s.some((m) => m[1].replace(/<[^>]+>/g, "").trim().length > 0);
}

function checkJsonLd(html: string, problems: string[]): void {
  const regex = /<script\b[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi;
  let m: RegExpExecArray | null;
  let index = 0;
  while ((m = regex.exec(html)) !== null) {
    index++;
    const raw = m[1].trim();
    if (!raw) {
      problems.push(`JSON-LD block #${index} is empty`);
      continue;
    }
    try {
      JSON.parse(raw);
    } catch (e) {
      const msg = e instanceof Error ? e.message : String(e);
      problems.push(`JSON-LD block #${index} invalid JSON: ${msg}`);
    }
  }
}

// ── Per-file structural checks ───────────────────────────────
function checkHtml(loc: string, html: string): string[] {
  const problems: string[] = [];

  if (!getTitle(html)) {
    problems.push("missing or empty <title>");
  }

  const desc = getMetaContent(html, "description");
  if (!desc) {
    problems.push('missing or empty <meta name="description">');
  }

  const canonical = getCanonical(html);
  if (!canonical) {
    problems.push('<link rel="canonical"> missing');
  } else if (canonical.replace(/\/$/, "") !== loc.replace(/\/$/, "")) {
    problems.push(`canonical mismatch (got "${canonical}", expected "${loc}")`);
  }

  if (!getOgMeta(html, "og:title")) problems.push('missing og:title');
  if (!getOgMeta(html, "og:description")) problems.push('missing og:description');
  if (!getOgMeta(html, "og:image")) problems.push('missing og:image');
  if (!getTwitterMeta(html, "twitter:card")) problems.push('missing twitter:card');


  const robots = getMetaContent(html, "robots");
  if (robots && /noindex/i.test(robots)) {
    problems.push(`<meta name="robots"> contains noindex ("${robots}")`);
  }

  if (!hasNonEmptyH1(html)) {
    problems.push("missing non-empty <h1>");
  }

  if (!html.match(/<html[^>]+lang=["']([^"']+)["']/i)) problems.push('missing html lang');
  if (!html.includes('name="viewport"')) problems.push('missing viewport meta');
  if (!getOgMeta(html, "og:url")) problems.push('missing og:url');
  if (!getOgMeta(html, "og:type")) problems.push('missing og:type');


  checkJsonLd(html, problems);

  return problems;
}

// ── Main verification loop ───────────────────────────────────
const issues: string[] = [];

for (const loc of locs) {
  if (loc.includes("?") && !loc.includes("sitemap.xml")) {
    issues.push(`  • ${loc} — contains query string`);
    continue;
  }
  if (loc.includes("/edit/")) {
    issues.push(`  • ${loc} — editor route must not be in sitemap`);
    continue;
  }

  if (!expected.has(loc)) {
    issues.push(`  • ${loc} — not in any source-of-truth list`);
  }

  const filePath = distFileFor(loc);
  const relPath = filePath.replace(process.cwd() + "/", "");
  if (!existsSync(filePath)) {
    issues.push(`  • ${loc} — ❌ missing generated HTML: ${relPath}`);
    continue;
  }

  const html = readFileSync(filePath, "utf-8");
  for (const problem of checkHtml(loc, html)) {
    issues.push(`  • ${loc} — ${problem}`);
  }
}

if (issues.length > 0) {
  console.error("");
  console.error(`❌ Sitemap verification FAILED (${issues.length} issue${issues.length === 1 ? "" : "s"}):`);
  console.error(issues.join("\n"));
  console.error("");
  console.error(`Sitemap URLs: ${locs.length}, expected entries: ${expected.size}`);
  console.error("");
  process.exit(1);
}

console.log(
  `✅ Sitemap verified — ${locs.length} URLs, all match source data and have valid production HTML ` +
  `(title, description, canonical, robots, JSON-LD, h1)`
);
