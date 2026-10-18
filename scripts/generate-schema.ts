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
import { guides } from "../src/data/guides";

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

/* ── Guide schemas (Article) ──
 * Guides are workflow documentation, emitted as Article schema
 * with author + publisher references so they're eligible for
 * Article-rich results (not just WebPage).
 */
for (const guide of guides) {
  const canonical = `${SITE_URL}/guides/${guide.slug}`;
  const authorId = `${SITE_URL}/about/author/${guide.authorId}#person`;

  const graph: Record<string, unknown>[] = [
    {
      "@type": "Article",
      "@id": `${canonical}#article`,
      mainEntityOfPage: canonical,
      headline: guide.title,
      description: guide.excerpt,
      datePublished: guide.publishedAt,
      dateModified: guide.updatedAt ?? guide.publishedAt,
      author: { "@id": authorId },
      publisher: { "@id": `${SITE_URL}#organization` },
      inLanguage: "en",
    },
  ];

  schemas[`/guides/${guide.slug}`] = {
    "@context": "https://schema.org",
    "@graph": graph,
  };
}

/* ── Index page schemas ──
 * Homepage: WebSite + Organization (site-level search + brand).
 * Listing pages: CollectionPage + ItemList so Google understands
 * these are hubs, not thin pages.
 */

// Homepage: WebSite + Organization
schemas["/"] = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      name: SITE_NAME,
      url: `${SITE_URL}/`,
      description: `${tools.length} free browser-based tools for images, PDFs, text, and QR codes. No uploads, no signup, 100% private.`,
      publisher: { "@id": `${SITE_URL}/#organization` },
      inLanguage: "en",
    },
    {
      "@type": "ItemList",
      "@id": `${SITE_URL}/#toollist`,
      name: "AHADEX Tools — Free Online Utilities",
      numberOfItems: tools.length,
      itemListElement: tools.slice(0, 20).map((tool, i) => ({
        "@type": "ListItem",
        position: i + 1,
        url: `${SITE_URL}${tool.path}`,
        name: tool.name,
      })),
    },

    {
      "@type": "Organization",
      "@id": `${SITE_URL}/#organization`,
      name: SITE_NAME,
      url: `${SITE_URL}/`,
      logo: {
        "@type": "ImageObject",
        url: `${SITE_URL}/android-chrome-512x512.png`,
        width: 512,
        height: 512,
      },
    },
  ],
};

// /tools: CollectionPage + ItemList
schemas["/tools"] = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "CollectionPage",
      "@id": `${SITE_URL}/tools#collection`,
      name: "All Tools — Free Online Utilities",
      url: `${SITE_URL}/tools`,
      description: `Browse all ${tools.length} free browser-based tools for images, PDFs, text, and QR codes.`,
      inLanguage: "en",
      isPartOf: { "@id": `${SITE_URL}/#website` },
      mainEntity: {
        "@type": "ItemList",
        numberOfItems: tools.length,
        itemListElement: tools.map((t, i) => ({
          "@type": "ListItem",
          position: i + 1,
          url: `${SITE_URL}${t.path}`,
          name: t.name,
        })),
      },
    },
    {
      "@type": "FAQPage",
      "@id": `${SITE_URL}/tools#faq`,
      mainEntity: [
        { "@type": "Question", name: "Are all these tools free to use?", acceptedAnswer: { "@type": "Answer", text: "Yes, every single tool on AHADEX is 100% free. There are no hidden fees, no premium tiers, and no watermarks." } },
        { "@type": "Question", name: "Do I need to create an account?", acceptedAnswer: { "@type": "Answer", text: "No. You can use any tool instantly without creating an account, providing an email, or signing up." } },
        { "@type": "Question", name: "Is my data safe when I upload a file?", acceptedAnswer: { "@type": "Answer", text: "Absolutely. We do not upload your files to a server. All processing happens entirely inside your web browser." } },
        { "@type": "Question", name: "Can I use these tools on my mobile phone?", acceptedAnswer: { "@type": "Answer", text: "Yes. The entire site is fully responsive and designed to work flawlessly on iOS (Safari) and Android (Chrome) devices." } }
      ]
    }
  ]
};

// /blog: CollectionPage + ItemList
schemas["/blog"] = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  "@id": `${SITE_URL}/blog#collection`,
  name: "Blog — Guides & Tutorials",
  url: `${SITE_URL}/blog`,
  description: `In-depth guides and tutorials on image, PDF, text, and QR tools.`,
  inLanguage: "en",
  isPartOf: { "@id": `${SITE_URL}/#website` },
  mainEntity: {
    "@type": "ItemList",
    numberOfItems: blogPosts.length,
    itemListElement: blogPosts.map((p, i) => ({
      "@type": "ListItem",
      position: i + 1,
      url: `${SITE_URL}/blog/${p.slug}`,
      name: p.title,
    })),
  },
};

// /guides: CollectionPage + ItemList
schemas["/guides"] = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  "@id": `${SITE_URL}/guides#collection`,
  name: "Guides — Complete Workflows for Real Tasks",
  url: `${SITE_URL}/guides`,
  description: `Step-by-step workflows combining multiple tools for real tasks.`,
  inLanguage: "en",
  isPartOf: { "@id": `${SITE_URL}/#website` },
  mainEntity: {
    "@type": "ItemList",
    numberOfItems: guides.length,
    itemListElement: guides.map((g, i) => ({
      "@type": "ListItem",
      position: i + 1,
      url: `${SITE_URL}/guides/${g.slug}`,
      name: g.title,
    })),
  },
};

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
console.log(`   ${Object.keys(schemas).length} schemas (tools + blog + guides + index pages)`);
