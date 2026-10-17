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
import { toolTranslationsBn } from "../src/i18n/toolTranslations";
import { toolFieldNotes } from "../src/data/tool-field-notes";
import { staticPageContents } from "../src/data/static-ssr-content";
import { authors, type Author } from "../src/data/authors";
import { blogPosts } from "../src/data/blog";
import { guides } from "../src/data/guides";
import { getToolCategory, CATEGORY_PRIVACY } from "../src/lib/toolCategory";

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

/* ── Build a category-aware privacy section ──
 * Instead of one boilerplate paragraph repeated across all 27 tools,
 * each tool gets a privacy block tailored to its file type: images,
 * PDFs, developer data, text, QR payloads, or design assets. This
 * reduces the "template smell" AdSense reviewers look for while
 * keeping the core message (nothing is uploaded) intact.
 */
/* ── Compact privacy notice ──
 * AdSense reviewers treat an H2 heading + 3 paragraphs of repeated
 * privacy boilerplate (identical across 27 tool pages) as template
 * padding, not editorial content. This emits a single sentence with
 * a category-specific hook and a link to the full policy.
 * ─────────────────────────────────────────────────────────── */
function buildPrivacyNotice(tool: typeof tools[0]): string {
  const category = getToolCategory(tool.id, tool.path);
  const { specific } = CATEGORY_PRIVACY[category];

  return `<p class="privacy-notice"><strong>Privacy:</strong> ${esc(specific)} <a href="/privacy">Full policy</a></p>`;
}

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

  // Editorial content — unique article sections that break the
  // template pattern. Rendered before Features so the reader meets
  // tool-specific editorial first, not the fixed structure.
  const editorialBlock = (tool.editorialContent || [])
    .map(
      (section) =>
        `<section><h2>${esc(section.heading)}</h2>${section.body}</section>`
    )
    .join("\n    ");

  return `<article>
    <h1>${esc(tool.name)}</h1>
    <p><strong>${esc(tool.description)}</strong></p>
    <p>${esc(tool.longDescription || tool.description)}</p>
    ${buildPrivacyNotice(tool)}
    ${editorialBlock}
    <h2>Features</h2>
    <ul>${features}</ul>
    <h2>How to use</h2>
    <ol>${howTo}</ol>
    <h2>Frequently asked questions</h2>
    ${faq}
    ${deepDiveBlock}
    ${relatedBlock}
    ${buildFieldNoteSection(tool)}
    ${buildBengaliSection(tool)}
  </article>`;
}

/* ── Build the "From our own testing" field-note section ── */
function buildFieldNoteSection(tool: typeof tools[0]): string {
  const note = toolFieldNotes[tool.id];
  if (!note) return "";

  const items = note.items
    .map((item) => `<li>${esc(item)}</li>`)
    .join("");

  return `<section class="tool-field-note">
    <h2>${esc(note.title)}</h2>
    <ul>${items}</ul>
  </section>`;
}

/* ── Build the Bengali summary section ────────────────────────
 * Emits a small <section lang="bn"> at the end of each tool page
 * with the Bengali tool name and a short description. This gives
 * Google and Bengali-reading users a genuine, visible Bengali
 * block on the same URL as the English content. hreflang tags in
 * the middleware declare the language alternates, so there is no
 * duplicate-content ambiguity.
 * ─────────────────────────────────────────────────────────── */
function buildBengaliSection(tool: typeof tools[0]): string {
  const bn = toolTranslationsBn[tool.id];
  if (!bn) return "";

  return `<section lang="bn" dir="ltr">
    <h2>${esc(bn.name)}</h2>
    <p>${esc(bn.description)}</p>
    <p>এই টুলটি সম্পূর্ণভাবে আপনার ব্রাউজারে চলে — কোনো ফাইল বা ডেটা কোথাও আপলোড হয় না। আপনার ছবি, PDF বা লেখা আপনার ডিভাইসেই থাকে।</p>
  </section>`;
}

/* ── Build an author profile page HTML ──────────────────────
 * Reads the author record from src/data/authors.ts and lists every
 * blog post they wrote. Adding a new author or a new post updates
 * the SSR content automatically on the next build.
 * ─────────────────────────────────────────────────────────── */
function buildAuthorPage(
  author: Author,
  posts: typeof blogPosts
): string {
  const authorPosts = posts.filter((p) => p.authorId === author.id);
  const contactParts: string[] = [];

  if (author.email) {
    contactParts.push(
      `<a href="mailto:${esc(author.email)}">${esc(author.email)}</a>`
    );
  }
  if (author.sameAs && author.sameAs.length > 0) {
    contactParts.push(
      author.sameAs
        .map(
          (url) =>
            `<a href="${esc(url)}" rel="me noopener noreferrer">${esc(
              url.replace(/^https?:\/\//, "")
            )}</a>`
        )
        .join(", ")
    );
  }

  const postsList = authorPosts
    .map(
      (p) =>
        `<li><a href="/blog/${esc(p.slug)}">${esc(p.title)}</a> — ${esc(
          p.excerpt
        )}</li>`
    )
    .join("\n    ");

  return `<article>
    <h1>${esc(author.name)}</h1>
    <p><strong>${esc(author.role)}</strong></p>
    <p>${esc(author.bio)}</p>
    ${author.location ? `<p><strong>Based in:</strong> ${esc(author.location)}</p>` : ""}
    ${contactParts.length ? `<p><strong>Contact:</strong> ${contactParts.join(" · ")}</p>` : ""}
    <h2>Articles by ${esc(author.name)}</h2>
    <p>${authorPosts.length} articles written and reviewed by ${esc(
      author.name
    )} across image tools, PDF workflows, developer utilities, and privacy topics.</p>
    <ul>
    ${postsList}
    </ul>
  </article>`;
}

/* ── Build guide page HTML ── */
function buildGuidePage(guide: typeof guides[0]): string {
  const sections = guide.sections
    .map(
      (s) => `<section><h2>${esc(s.heading)}</h2>${s.body}</section>`
    )
    .join("\n    ");

  const faq = guide.faq
    .map(
      (f) => `<div><h3>${esc(f.question)}</h3><p>${esc(f.answer)}</p></div>`
    )
    .join("\n    ");

  const relatedLinks = guide.relatedTools
    .map((id) => tools.find((t) => t.id === id))
    .filter((t): t is NonNullable<typeof t> => Boolean(t))
    .map(
      (t) =>
        `<li><a href="${t.path}">${esc(t.name)}</a> — ${esc(t.description)}</li>`
    )
    .join("\n    ");

  return `<article>
    <h1>${esc(guide.title)}</h1>
    <p><strong>${esc(guide.excerpt)}</strong></p>
    ${sections}
    ${relatedLinks ? `<h2>Tools used in this guide</h2><ul>${relatedLinks}</ul>` : ""}
    <h2>Frequently asked questions</h2>
    ${faq}
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

// Static pages (home, tools, blog, about, contact, editorial, affiliate, sitemap)
for (const page of staticPageContents) {
  SSR_CONTENT[page.path] = page.html;
}

// Trust pages (EN) — these override any static content if the same path appears
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

// Guides
for (const guide of guides) {
  SSR_CONTENT[`/guides/${guide.slug}`] = buildGuidePage(guide);
}

// Author profile pages — one per author in the registry
for (const author of Object.values(authors)) {
  SSR_CONTENT[`/about/author/${author.id}`] = buildAuthorPage(author, blogPosts);
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
