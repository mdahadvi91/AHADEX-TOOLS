/* ============================================================
 * Cloudflare Pages Middleware
 * ------------------------------------------------------------
 * Runs at the edge BEFORE serving static assets.
 * For /tools/:slug routes, injects tool-specific:
 *   - <title>
 *   - og:title, og:description, og:image, og:url
 *   - twitter:title, twitter:description, twitter:image
 *   - canonical link
 * into the static index.html
 *
 * Why: The site is a React SPA. Search engines handle JS, but
 * social crawlers (WhatsApp, Facebook, Twitter, Telegram, etc.)
 * do NOT — they only read the initial HTML. This middleware
 * provides the correct meta tags server-side.
 * ============================================================ */

import { TOOL_META, type ToolMeta } from "./_data";

const SITE_URL = "https://ahadex.fun";

interface Env {
  ASSETS: { fetch: (req: Request) => Promise<Response> };
}

/* ── Minimal HTML escaping ── */
function esc(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

/* ── Extract slug from /tools/xyz path ── */
function extractToolSlug(pathname: string): string | null {
  const match = pathname.match(/^\/tools\/([^/?#]+)\/?$/);
  return match ? match[1] : null;
}

/* ── Build meta-block HTML to inject ── */
function buildMetaBlock(t: ToolMeta): string {
  const canonical = `${SITE_URL}${t.path}`;
  const ogImage = t.ogImage.startsWith("http")
    ? t.ogImage
    : `${SITE_URL}${t.ogImage}`;

  return `
    <!-- Injected by Cloudflare Pages middleware (tool-specific) -->
    <title>${esc(t.title)}</title>
    <meta name="description" content="${esc(t.description)}" />
    <link rel="canonical" href="${canonical}" />
    <meta property="og:type" content="website" />
    <meta property="og:title" content="${esc(t.title)}" />
    <meta property="og:description" content="${esc(t.description)}" />
    <meta property="og:url" content="${canonical}" />
    <meta property="og:image" content="${ogImage}" />
    <meta property="og:image:width" content="1200" />
    <meta property="og:image:height" content="630" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${esc(t.title)}" />
    <meta name="twitter:description" content="${esc(t.description)}" />
    <meta name="twitter:image" content="${ogImage}" />
`;
}

/* ── Remove existing generic meta tags that we're replacing ── */
function stripGenericMeta(html: string): string {
  return html
    .replace(/<title>[\s\S]*?<\/title>\s*/i, "")
    .replace(/<meta\s+name="description"[^>]*>\s*/gi, "")
    .replace(/<link\s+rel="canonical"[^>]*>\s*/gi, "")
    .replace(/<meta\s+property="og:[^"]+"[^>]*>\s*/gi, "")
    .replace(/<meta\s+name="twitter:[^"]+"[^>]*>\s*/gi, "");
}

/* ── Main middleware ── */
export const onRequest: PagesFunction<Env> = async (context) => {
  const url = new URL(context.request.url);
  const slug = extractToolSlug(url.pathname);

  // Not a tool page → just pass through
  if (!slug) {
    return context.next();
  }

  const tool = TOOL_META[slug];

  // Unknown tool → let SPA handle it (its own 404)
  if (!tool) {
    return context.next();
  }

  // Fetch the static index.html from Cloudflare Pages assets
  const assetUrl = new URL("/index.html", url.origin);
  const assetResp = await context.env.ASSETS.fetch(
    new Request(assetUrl.toString(), {
      method: "GET",
      headers: context.request.headers,
    })
  );

  if (!assetResp.ok) {
    return context.next();
  }

  const html = await assetResp.text();

  // Inject meta tags right before </head>
  const stripped = stripGenericMeta(html);
  const injected = stripped.replace(
    "</head>",
    `${buildMetaBlock(tool)}</head>`
  );

  return new Response(injected, {
    status: 200,
    headers: {
      "content-type": "text/html; charset=utf-8",
      "cache-control": "public, max-age=300, must-revalidate",
    },
  });
};
