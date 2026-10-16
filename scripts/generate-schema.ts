/* ============================================================
 * Schema Generator
 * ------------------------------------------------------------
 * Reads full tool data from src/data/tools.ts and emits
 * functions/_schema.ts — a compiled map of JSON-LD @graph
 * objects per tool path.
 *
 * Why: The React ToolSchema component injects schema client-side,
 * but crawlers and AdSense reviewers usually read only the initial
 * HTML. Emitting schema server-side from the Cloudflare Pages
 * middleware guarantees every tool page ships structured data to
 * every visitor, regardless of JavaScript.
 *
 * Writes: functions/_schema.ts
 * ============================================================ */

import { writeFileSync } from "node:fs";
import { resolve } from "node:path";
import { tools } from "../src/data/tools";
import { authors } from "../src/data/authors";
import { blogPosts } from "../src/data/blog";

const SITE_URL = "https://ahadex.fun";
const SITE_NAME = "AHADEX Tools";

const OUT_FILE = resolve(process.cwd(), "functions/_schema.ts");

interface SchemaMap {
  [path: string]: object;
}

const schemas: SchemaMap = {};

for (const tool of tools) {
  const canonical = `${SITE_URL}${tool.path}`;
  const ogImage = tool.seo.ogImage.startsWith("http")
    ? tool.seo.ogImage
    : `${SITE_URL}${tool.seo.ogImage}`;

  const graph: Record<string, unknown>[] = [];

  // ── SoftwareApplication ──
  graph.push({
    "@type": "SoftwareApplication",
    "@id": `${canonical}#app`,
    name: tool.name,
    description: tool.seo.description,
    url: canonical,
    applicationCategory: "WebApplication",
    operatingSystem: "Any (Browser)",
    browserRequirements: "Requires JavaScript",
    isAccessibleForFree: true,
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    image: ogImage,
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
      url: SITE_URL,
    },
    featureList: tool.features.map((f) => f.title),
  });

  // ── BreadcrumbList ──
  graph.push({
    "@type": "BreadcrumbList",
    "@id": `${canonical}#breadcrumb`,
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: `${SITE_URL}/`,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Tools",
        item: `${SITE_URL}/tools`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: tool.name,
        item: canonical,
      },
    ],
  });

  schemas[tool.path] = {
    "@context": "https://schema.org",
    "@graph": graph,
  };
}

/* ── Author profile schemas (ProfilePage + Person) ── */
for (const author of Object.values(authors)) {
  const canonical = `${SITE_URL}/about/author/${author.id}`;

  const graph: Record<string, unknown>[] = [
    {
      "@type": "ProfilePage",
      "@id": `${canonical}#profile`,
      url: canonical,
      name: `${author.name} — ${author.role}`,
      description: author.bio,
      mainEntity: {
        "@type": "Person",
        "@id": `${canonical}#person`,
        name: author.name,
        jobTitle: author.role,
        description: author.bio,
        url: canonical,
        ...(author.location && {
          address: {
            "@type": "PostalAddress",
            addressLocality: author.location,
          },
        }),
        ...(author.email && { email: author.email }),
        ...(author.sameAs && { sameAs: author.sameAs }),
        worksFor: {
          "@type": "Organization",
          name: SITE_NAME,
          url: SITE_URL,
        },
        knowsAbout: [
          "Browser-based image processing",
          "PDF manipulation in the browser",
          "Client-side privacy tools",
          "JavaScript and TypeScript",
          "Web performance optimization",
        ],
      },
    },
  ];

  schemas[`/about/author/${author.id}`] = {
    "@context": "https://schema.org",
    "@graph": graph,
  };
}

/* ── Blog post schemas (BlogPosting) ──
 * Each blog post ships a BlogPosting entity so search engines and
 * social crawlers can link the article to its author, its published
 * and modified dates, and its primary image. Person and Organization
 * are referenced by @id so they resolve to the entries already
 * emitted elsewhere in the graph. */
for (const post of blogPosts) {
  const canonical = `${SITE_URL}/blog/${post.slug}`;
  const ogImage = `${SITE_URL}/images/og/blog/${post.slug}-og.png`;
  const authorId = `${SITE_URL}/about/author/${post.authorId}#person`;

  const graph: Record<string, unknown>[] = [
    {
      "@type": "BlogPosting",
      "@id": `${canonical}#article`,
      mainEntityOfPage: canonical,
      headline: post.title,
      description: post.excerpt,
      image: ogImage,
      datePublished: post.publishedAt,
      dateModified: post.updatedAt ?? post.publishedAt,
      author: { "@id": authorId },
      publisher: { "@id": `${SITE_URL}#organization` },
      inLanguage: "en",
      keywords: post.blocks
        .filter((b) => b.type === "h2" && b.content)
        .slice(0, 5)
        .map((b) => b.content as string)
        .join(", "),
    },
  ];

  schemas[`/blog/${post.slug}`] = {
    "@context": "https://schema.org",
    "@graph": graph,
  };
}

/* ── Write file ── */
const file = `/* ============================================================
 * AUTO-GENERATED — do not edit by hand
 * Generated by scripts/generate-schema.ts
 * ============================================================ */

export const SSR_SCHEMA: Record<string, object> = ${JSON.stringify(
  schemas,
  null,
  2
)};
`;

writeFileSync(OUT_FILE, file, "utf-8");
console.log(`✅ Generated schema → ${OUT_FILE}`);
console.log(`   ${Object.keys(schemas).length} tool schemas`);
