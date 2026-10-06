/* ============================================================
 * Cloudflare Pages Middleware
 * ------------------------------------------------------------
 * Runs at edge before serving static assets.
 * Injects correct meta tags for:
 *   - /tools/:slug       → TOOL_META
 *   - /blog/:slug        → BLOG_META
 *   - /blog              → static blog index
 *   - /*                 → STATIC_META (matching route)
 *
 * Why: React SPA serves same index.html for every route.
 * Search engines handle JS, but social crawlers (WhatsApp,
 * Facebook, Twitter, Telegram) do NOT. This middleware
 * provides correct meta tags server-side.
 * ============================================================ */

import {
  TOOL_META,
  STATIC_META,
  BLOG_META,
  type ToolMeta,
  type StaticMeta,
  type BlogMeta,
} from "./_data";

const SITE_URL = "https://ahadex.fun";

interface Env {
  ASSETS: { fetch: (req: Request) => Promise<Response> };
}

/* ── HTML escape ── */
function esc(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

/* ── Extract slug from /tools/xyz ── */
function extractToolSlug(pathname: string): string | null {
  const m = pathname.match(/^\/tools\/([^/?#]+)\/?$/);
  return m ? m[1] : null;
}

/* ── Extract slug from /blog/xyz ── */
function extractBlogSlug(pathname: string): string | null {
  const m = pathname.match(/^\/blog\/([^/?#]+)\/?$/);
  return m ? m[1] : null;
}

/* ── Normalize path for static matching ── */
function normalizePath(pathname: string): string {
  if (pathname.length > 1 && pathname.endsWith("/")) {
    return pathname.slice(0, -1);
  }
  return pathname;
}


/* ── Editor route detection (must be noindex) ── */
function isEditorRoute(pathname: string): boolean {
  return /^\/tools\/(cv-builder|visiting-card)\/edit\//.test(pathname);
}


/* ── Static file paths that middleware should NOT handle ── */
function isStaticFile(pathname: string): boolean {
  // File extensions that indicate static assets
  const staticExtensions = /\.(txt|xml|ico|png|jpg|jpeg|webp|gif|svg|css|js|json|woff|woff2|ttf|otf|mp3|mp4|webm|pdf|webmanifest|manifest)$/i;
  if (staticExtensions.test(pathname)) return true;
  
  // Prefixes that are static asset directories
  const staticPrefixes = ["/assets/", "/images/", "/audio/", "/.well-known/"];
  if (staticPrefixes.some((p) => pathname.startsWith(p))) return true;
  
  return false;
}

/* ── Build meta block ── */
function buildMetaBlock(opts: {
  title: string;
  description: string;
  canonical: string;
  ogImage: string;
  ogType?: "website" | "article";
}): string {
  const ogImage = opts.ogImage.startsWith("http")
    ? opts.ogImage
    : `${SITE_URL}${opts.ogImage}`;
  const ogType = opts.ogType || "website";

  return `<!-- Injected by Cloudflare middleware -->
    <title>${esc(opts.title)}</title>
    <meta name="description" content="${esc(opts.description)}" />
    <link rel="canonical" href="${opts.canonical}" />
    <meta property="og:type" content="${ogType}" />
    <meta property="og:title" content="${esc(opts.title)}" />
    <meta property="og:description" content="${esc(opts.description)}" />
    <meta property="og:url" content="${opts.canonical}" />
    <meta property="og:image" content="${ogImage}" />
    <meta property="og:image:width" content="1200" />
    <meta property="og:image:height" content="630" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${esc(opts.title)}" />
    <meta name="twitter:description" content="${esc(opts.description)}" />
    <meta name="twitter:image" content="${ogImage}" />
`;
}

/* ── Remove generic meta tags we're replacing ── */
function stripGenericMeta(html: string): string {
  return html
    .replace(/<title>[\s\S]*?<\/title>\s*/i, "")
    .replace(/<meta\s+name="description"[^>]*>\s*/gi, "")
    .replace(/<link\s+rel="canonical"[^>]*>\s*/gi, "")
    .replace(/<meta\s+property="og:[^"]+"[^>]*>\s*/gi, "")
    .replace(/<meta\s+name="twitter:[^"]+"[^>]*>\s*/gi, "");
}

/* ── Fetch asset HTML ── */
async function fetchIndexHtml(
  url: URL,
  request: Request,
  env: Env
): Promise<string | null> {
  const assetUrl = new URL("/index.html", url.origin);
  const resp = await env.ASSETS.fetch(
    new Request(assetUrl.toString(), {
      method: "GET",
      headers: request.headers,
    })
  );
  if (!resp.ok) return null;
  return await resp.text();
}

/* ── Main middleware ── */
export const onRequest: PagesFunction<Env> = async (context) => {
  const url = new URL(context.request.url);
  const pathname = normalizePath(url.pathname);

  /* Static files bypass middleware entirely */
  if (isStaticFile(pathname)) {
    return context.next();
  }

  /* 0. Editor routes → force noindex + precise canonical to parent tool */
  if (isEditorRoute(pathname)) {
    const editorMatch = pathname.match(/^\/tools\/(cv-builder|visiting-card)\/edit\//);
    const parentSlug = editorMatch ? editorMatch[1] : "tools";
    const canonical = `${SITE_URL}/tools/${parentSlug}`;

    const html = await fetchIndexHtml(url, context.request, context.env);
    if (!html) return context.next();
    const injected = html.replace(
      "</head>",
      `<meta name="robots" content="noindex, follow" /><link rel="canonical" href="${canonical}" /></head>`
    );
    return new Response(injected, {
      status: 200,
      headers: {
        "content-type": "text/html; charset=utf-8",
        "cache-control": "public, max-age=300, must-revalidate",
        "x-robots-tag": "noindex, follow",
      },
    });
  }

  let meta: {
    title: string;
    description: string;
    canonical: string;
    ogImage: string;
    ogType?: "website" | "article";
  } | null = null;

  /* 1. Tool pages: /tools/:slug */
  const toolSlug = extractToolSlug(pathname);
  if (toolSlug) {
    const tool: ToolMeta | undefined = TOOL_META[toolSlug];
    if (tool) {
      meta = {
        title: tool.title,
        description: tool.description,
        canonical: `${SITE_URL}${tool.path}`,
        ogImage: tool.ogImage,
        ogType: "website",
      };
    }
  }

  /* 2. Blog post: /blog/:slug */
  if (!meta) {
    const blogSlug = extractBlogSlug(pathname);
    if (blogSlug) {
      const post: BlogMeta | undefined = BLOG_META[blogSlug];
      if (post) {
        meta = {
          title: `${post.title} | AHADEX Blog`,
          description: post.description,
          canonical: `${SITE_URL}${post.path}`,
          ogImage: post.ogImage,
          ogType: "article",
        };
      }
    }
  }

  /* 3. Static / index pages */
  if (!meta) {
    const staticMeta: StaticMeta | undefined = STATIC_META[pathname];
    if (staticMeta) {
      meta = {
        title: staticMeta.title,
        description: staticMeta.description,
        canonical:
          pathname === "/" ? SITE_URL + "/" : `${SITE_URL}${pathname}`,
        ogImage: staticMeta.ogImage,
        ogType: "website",
      };
    }
  }

  /* No meta match — check if route is known */
  if (!meta) {
    // Known route prefixes (SPA will handle these)
    const knownPrefixes = [
      "/tools/",
      "/blog/",
      "/tools",
      "/blog",
    ];
    const isKnownRoute =
      STATIC_META[pathname] ||
      knownPrefixes.some((p) => pathname === p || pathname.startsWith(p));

    // Return 404 with proper status for unknown routes
    if (!isKnownRoute) {
      const html = await fetchIndexHtml(url, context.request, context.env);
      if (html) {
        const injected = html.replace(
          "</head>",
          `<meta name="robots" content="noindex, follow" /><link rel="canonical" href="${SITE_URL}/404" /><title>Page Not Found | AHADEX Tools</title></head>`
        );
        return new Response(injected, {
          status: 404,
          headers: {
            "content-type": "text/html; charset=utf-8",
            "cache-control": "public, max-age=60",
          },
        });
      }
    }

    return context.next();
  }

  /* Fetch and inject */
  const html = await fetchIndexHtml(url, context.request, context.env);
  if (!html) {
    return context.next();
  }

  const stripped = stripGenericMeta(html);
  const injected = stripped.replace(
    "</head>",
    `${buildMetaBlock(meta)}</head>`
  );

  return new Response(injected, {
    status: 200,
    headers: {
      "content-type": "text/html; charset=utf-8",
      "cache-control": "public, max-age=300, must-revalidate",
    },
  });
};
