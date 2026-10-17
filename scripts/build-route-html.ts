/* ============================================================
 * Build route-specific HTML files
 * ------------------------------------------------------------
 * Runs AFTER vite build. For every route that has meta data,
 * SSR content, or a schema entry, produces a fully-populated
 * HTML file at dist/<route>/index.html so Cloudflare Pages
 * serves it as a static asset with zero middleware work.
 *
 * Inputs:
 *   dist/index.html          (the Vite SPA shell)
 *   functions/_data.ts       (TOOL_META, STATIC_META, BLOG_META, GUIDE_META)
 *   functions/_ssr-content.ts (SSR_CONTENT)
 *   functions/_schema.ts     (SSR_SCHEMA)
 *
 * Outputs:
 *   dist/<route>/index.html  for each route
 *   dist/404.html            fallback for unknown routes
 *
 * Why this exists:
 * Doing this at build time (deterministic, inspectable, testable)
 * instead of at Cloudflare edge (runtime, fragile, hard to debug)
 * means the served HTML is byte-for-byte what we checked in.
 * ============================================================ */

import { readFileSync, writeFileSync, mkdirSync, existsSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { tools } from "../src/data/tools";
import { blogPosts } from "../src/data/blog";
import { guides } from "../src/data/guides";
import { authors } from "../src/data/authors";
import { SSR_CONTENT } from "../functions/_ssr-content";
import { SSR_SCHEMA } from "../functions/_schema";
import {
  TOOL_META,
  STATIC_META,
  BLOG_META,
  GUIDE_META,
} from "../functions/_data";

const SITE_URL = "https://ahadex.fun";
const DIST = resolve(process.cwd(), "dist");
const INDEX_HTML = resolve(DIST, "index.html");

if (!existsSync(INDEX_HTML)) {
  console.error("❌ dist/index.html not found — run 'vite build' first");
  process.exit(1);
}

const baseHtml = readFileSync(INDEX_HTML, "utf-8");

interface RouteMeta {
  path: string;
  title: string;
  description: string;
  canonical: string;
  ogImage: string;
  ogType?: "website" | "article";
}

const routes: RouteMeta[] = [];

// Static pages
for (const [path, meta] of Object.entries(STATIC_META)) {
  routes.push({
    path,
    title: meta.title,
    description: meta.description,
    canonical: path === "/" ? SITE_URL + "/" : `${SITE_URL}${path}`,
    ogImage: meta.ogImage,
    ogType: "website",
  });
}

// Tools
for (const tool of tools) {
  routes.push({
    path: tool.path,
    title: tool.seo.title,
    description: tool.seo.description,
    canonical: `${SITE_URL}${tool.path}`,
    ogImage: tool.seo.ogImage,
    ogType: "website",
  });
}

// Blog posts
for (const post of blogPosts) {
  const path = `/blog/${post.slug}`;
  const meta = BLOG_META[post.slug];
  if (!meta) continue;
  routes.push({
    path,
    title: meta.title,
    description: meta.description,
    canonical: `${SITE_URL}${path}`,
    ogImage: meta.ogImage,
    ogType: "article",
  });
}

// Guides
for (const guide of guides) {
  const path = `/guides/${guide.slug}`;
  const meta = GUIDE_META[guide.slug];
  if (!meta) continue;
  routes.push({
    path,
    title: meta.title,
    description: meta.description,
    canonical: `${SITE_URL}${path}`,
    ogImage: meta.ogImage,
    ogType: "article",
  });
}

// Author pages
for (const author of Object.values(authors)) {
  const path = `/about/author/${author.id}`;
  const meta = STATIC_META[path];
  if (!meta) continue;
  routes.push({
    path,
    title: meta.title,
    description: meta.description,
    canonical: `${SITE_URL}${path}`,
    ogImage: meta.ogImage,
    ogType: "website",
  });
}

function esc(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function stripGenericMeta(html: string): string {
  // Only strip the tags we are about to replace, so tags like
  // <meta name="google-adsense-account"> and og:locale are preserved.
  return html
    .replace(/<title>[\s\S]*?<\/title>\s*/i, "")
    .replace(/<meta\s+name="description"[^>]*>\s*/gi, "")
    .replace(/<link\s+rel="canonical"[^>]*>\s*/gi, "")
    .replace(
      /<meta\s+property="og:(type|title|description|url|image|image:width|image:height)"[^>]*>\s*/gi,
      ""
    )
    .replace(
      /<meta\s+name="twitter:(card|title|description|image)"[^>]*>\s*/gi,
      ""
    );
}

function buildMetaBlock(meta: RouteMeta): string {
  const ogImage = meta.ogImage.startsWith("http")
    ? meta.ogImage
    : `${SITE_URL}${meta.ogImage}`;
  const ogType = meta.ogType || "website";
  return [
    `<title>${esc(meta.title)}</title>`,
    `<meta name="description" content="${esc(meta.description)}" />`,
    `<link rel="canonical" href="${meta.canonical}" />`,
    `<meta property="og:type" content="${ogType}" />`,
    `<meta property="og:title" content="${esc(meta.title)}" />`,
    `<meta property="og:description" content="${esc(meta.description)}" />`,
    `<meta property="og:url" content="${meta.canonical}" />`,
    `<meta property="og:image" content="${ogImage}" />`,
    `<meta property="og:image:width" content="1200" />`,
    `<meta property="og:image:height" content="630" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<meta name="twitter:title" content="${esc(meta.title)}" />`,
    `<meta name="twitter:description" content="${esc(meta.description)}" />`,
    `<meta name="twitter:image" content="${ogImage}" />`,
    `<link rel="alternate" hreflang="en" href="${meta.canonical}" />`,
    `<link rel="alternate" hreflang="x-default" href="${meta.canonical}" />`,
  ].join("\n    ");
}

function buildSchemaTag(path: string): string {
  const schema = SSR_SCHEMA[path];
  if (!schema) return "";
  return `\n    <script type="application/ld+json" data-ssr-schema="true">${JSON.stringify(schema)}</script>`;
}

function buildRouteHtml(route: RouteMeta, base: string): string {
  const stripped = stripGenericMeta(base);
  const withMeta = stripped.replace(
    "</head>",
    `    ${buildMetaBlock(route)}\n  </head>`
  );
  const withSchema = withMeta.replace(
    "</head>",
    `${buildSchemaTag(route.path)}\n  </head>`
  );
  const ssr = SSR_CONTENT[route.path];
  if (!ssr) return withSchema;
  return withSchema.replace(
    /(<div id="root"[^>]*>)/,
    `$1<div data-ssr="true">${ssr}</div>`
  );
}

let count = 0;

for (const route of routes) {
  const html = buildRouteHtml(route, baseHtml);
  if (route.path === "/") {
    writeFileSync(INDEX_HTML, html, "utf-8");
  } else {
    const rel = route.path.replace(/^\//, "");
    const output = resolve(DIST, rel, "index.html");
    mkdirSync(dirname(output), { recursive: true });
    writeFileSync(output, html, "utf-8");
  }
  count++;
}

// Generate editor catch-all HTML files with noindex + canonical.
// Cloudflare _redirects rewrites /tools/*/edit/* to these files,
// keeping the browser URL intact so React Router resolves the route.
// This avoids needing to intercept editor routes in the middleware,
// which caused a Wrangler compile issue.
for (const parentSlug of ["cv-builder", "visiting-card"]) {
  const editorMeta: RouteMeta = {
    path: `/tools/${parentSlug}/edit`,
    title: `${parentSlug === "cv-builder" ? "CV" : "Card"} Editor | AHADEX Tools`,
    description: "Interactive editor — not indexed by search engines.",
    canonical: `${SITE_URL}/tools/${parentSlug}`,
    ogImage: "/images/og/home-og.png",
    ogType: "website",
  };
  const editorBase = stripGenericMeta(baseHtml);
  const editorHtml = editorBase.replace(
    "</head>",
    `    ${buildMetaBlock(editorMeta)}\n    <meta name="robots" content="noindex, follow" />\n  </head>`
  );
  const editorPath = resolve(DIST, "tools", parentSlug, "edit", "index.html");
  mkdirSync(dirname(editorPath), { recursive: true });
  writeFileSync(editorPath, editorHtml, "utf-8");
  count++;
}

// Generate dist/404.html — Cloudflare Pages serves it with 404 status
const notFoundRoute: RouteMeta = {
  path: "/404",
  title: "Page Not Found | AHADEX Tools",
  description: "The page you were looking for could not be found.",
  canonical: `${SITE_URL}/404`,
  ogImage: "/images/og/home-og.png",
  ogType: "website",
};
const notFoundBase = stripGenericMeta(baseHtml);
const notFoundHtml = notFoundBase.replace(
  "</head>",
  `    ${buildMetaBlock(notFoundRoute)}\n    <meta name="robots" content="noindex, follow" />\n  </head>`
);
writeFileSync(resolve(DIST, "404.html"), notFoundHtml, "utf-8");
count++;

console.log(`✅ Generated ${count} static route HTML files`);
console.log(`   Output: dist/<route>/index.html + dist/404.html`);
