/* ============================================================
 * SSR Content Generator
 * ------------------------------------------------------------
 * Generates static HTML snippets for static pages (terms,
 * privacy, cookie, etc.) so middleware can inject them
 * server-side. This makes content visible to:
 *   - Non-JS crawlers (some AdSense reviewers, social bots)
 *   - Users with JS disabled
 *   - Search engines on first crawl
 *
 * Writes: functions/_ssr-content.ts
 * ============================================================ */

import { writeFileSync } from "node:fs";
import { resolve } from "node:path";
import { trustContent } from "../src/data/trustContent";
import { tools } from "../src/data/tools";
import { blogPosts } from "../src/data/blog";

const OUT_FILE = resolve(process.cwd(), "functions/_ssr-content.ts");

/* ── HTML escape ── */
function esc(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

/* ── Build trust page HTML ── */
function buildTrustPage(content: typeof trustContent.en.privacy): string {
  const sections = content.sections
    .map((s) => {
      const paragraphs = (s.paragraphs || [])
        .map((p: string) => `<p>${esc(p)}</p>`)
        .join("");
      const bullets = s.bullets
        ? `<ul>${s.bullets.map((b: string) => `<li>${esc(b)}</li>`).join("")}</ul>`
        : "";
      return `<section><h2>${esc(s.heading)}</h2>${paragraphs}${bullets}</section>`;
    })
    .join("");

  return `<article>
    <h1>${esc(content.title)}</h1>
    <p>${esc(content.subtitle)}</p>
    <p>${esc(content.lastUpdated)}</p>
    ${sections}
    <p>Contact: ${esc(content.contactEmail)}</p>
  </article>`;
}

/* ── Shared privacy paragraph (same truth for every tool) ── */
const PRIVACY_PARAGRAPH =
  "This tool runs entirely inside your browser using standard web technologies — the Canvas API for images, pdf-lib for PDFs, Web Crypto for passwords, and pure JavaScript for everything else. Your files, text, and data are never uploaded to any server, never stored, and never shared with anyone. There is no account to create, no signup, and no analytics on your content. Close the tab and every trace is gone.";

/* ── Build tool page HTML ── */
function buildToolPage(tool: typeof tools[0]): string {
  const features = tool.features
    .map((f) => `<li><strong>${esc(f.title)}</strong>: ${esc(f.description)}</li>`)
    .join("");

  const howTo = tool.howTo
    .map((h) => `<li><strong>${esc(h.title)}</strong>: ${esc(h.description)}</li>`)
    .join("");

  const faq = tool.faq
    .map((f) => `<div><h3>${esc(f.question)}</h3><p>${esc(f.answer)}</p></div>`)
    .join("");

  // Related tools — look up each slug in the full tools array so we can
  // emit both a link and a short description. Slugs that no longer exist
  // (e.g. from an old consolidation) are silently dropped.
  const relatedTools = (tool.relatedTools || [])
    .map((slug) => {
      const related = tools.find((t) => t.slug === slug);
      if (!related) return "";
      return `<li><a href="${related.path}">${esc(related.name)}</a> — ${esc(related.description)}</li>`;
    })
    .filter(Boolean)
    .join("");

  const relatedBlock = relatedTools
    ? `<h2>Related tools</h2>
    <ul>${relatedTools}</ul>`
    : "";

  // Deep-dive sections: authored as { heading, body } where body is a
  // trusted HTML subset (tables, lists, links). Rendered between FAQ and
  // Related tools so the reading flow stays: intro → features → how-to →
  // privacy → FAQ → deep dive → related.
  const deepDiveBlock = (tool.deepDive || [])
    .map(
      (section) =>
        `<section><h2>${esc(section.heading)}</h2>${section.body}</section>`
    )
    .join("\n    ");

  return `<article>
    <h1>${esc(tool.name)}</h1>
    <p><strong>${esc(tool.description)}</strong></p>
    <p>${esc(tool.longDescription || tool.description)}</p>
    <h2>Features</h2>
    <ul>${features}</ul>
    <h2>How to use</h2>
    <ol>${howTo}</ol>
    <h2>Privacy — your files never leave your device</h2>
    <p>${esc(PRIVACY_PARAGRAPH)}</p>
    <h2>Frequently asked questions</h2>
    ${faq}
    ${deepDiveBlock}
    ${relatedBlock}
  </article>`;
}

/* ── Build blog post HTML (basic) ── */
function buildBlogPost(post: typeof blogPosts[0]): string {
  const blocks = post.blocks
    .map((b) => {
      if (b.type === "h2") return `<h2>${esc(b.content || "")}</h2>`;
      if (b.type === "h3") return `<h3>${esc(b.content || "")}</h3>`;
      if (b.type === "p") return `<p>${esc(b.content || "")}</p>`;
      if (b.type === "quote") return `<blockquote>${esc(b.content || "")}</blockquote>`;
      if (b.type === "ul" && b.items)
        return `<ul>${b.items.map((i) => `<li>${esc(i)}</li>`).join("")}</ul>`;
      if (b.type === "ol" && b.items)
        return `<ol>${b.items.map((i) => `<li>${esc(i)}</li>`).join("")}</ol>`;
      if (b.type === "tip") return `<aside><strong>Tip:</strong> ${esc(b.content || "")}</aside>`;
      return "";
    })
    .join("");

  return `<article>
    <h1>${esc(post.title)}</h1>
    <p>${esc(post.excerpt)}</p>
    ${blocks}
  </article>`;
}

/* ── Build map ── */
const SSR_CONTENT: Record<string, string> = {};

// Trust pages (EN)
const trustPages: Array<[string, keyof typeof trustContent.en]> = [
  ["/privacy", "privacy"],
  ["/terms", "terms"],
  ["/disclaimer", "disclaimer"],
  ["/accessibility", "accessibility"],
  ["/cookie-policy", "cookie"],
];

for (const [path, key] of trustPages) {
  SSR_CONTENT[path] = buildTrustPage(trustContent.en[key]);
}

// Tool pages
for (const tool of tools) {
  SSR_CONTENT[tool.path] = buildToolPage(tool);
}

// Blog posts
for (const post of blogPosts) {
  SSR_CONTENT[`/blog/${post.slug}`] = buildBlogPost(post);
}

/* ── Write file ── */
const file = `/* ============================================================
 * AUTO-GENERATED — do not edit by hand
 * Generated by scripts/generate-ssr-content.ts
 * ============================================================ */

export const SSR_CONTENT: Record<string, string> = ${JSON.stringify(SSR_CONTENT, null, 2)};
`;

writeFileSync(OUT_FILE, file, "utf-8");
console.log(`✅ Generated SSR content → ${OUT_FILE}`);
console.log(`   ${Object.keys(SSR_CONTENT).length} pages`);
