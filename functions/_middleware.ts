/* ============================================================
 * Cloudflare Pages Middleware — minimal
 * ------------------------------------------------------------
 * Every SEO-critical route now has its own pre-built HTML file
 * (produced by scripts/build-route-html.ts), so the middleware
 * no longer needs to inject meta tags, canonical URLs, JSON-LD,
 * hreflang, or SSR content. That work is now deterministic and
 * inspectable at build time.
 *
 * The middleware handles only three things that cannot be done
 * at build time:
 *
 *   1. www → non-www redirect
 *   2. Trailing slash → no trailing slash
 *   3. Editor routes (SPA-only paths) → serve index.html with
 *      noindex so editors are not indexed
 *
 * Everything else is served by Cloudflare Pages as a static file.
 * Unknown paths automatically fall through to dist/404.html with
 * a 404 status code.
 * ============================================================ */

interface Env {
  ASSETS: { fetch: (req: Request) => Promise<Response> };
}

const SITE_URL = "https://ahadex.fun";

export const onRequest: PagesFunction<Env> = async (context) => {
  const url = new URL(context.request.url);

  // 1. www → non-www (canonical host)
  if (url.hostname === "www.ahadex.fun") {
    const newUrl = new URL(url);
    newUrl.hostname = "ahadex.fun";
    return Response.redirect(newUrl.toString(), 301);
  }

  // 2. Trailing slash → no trailing slash (canonical path form)
  if (url.pathname !== "/" && url.pathname.endsWith("/")) {
    const newUrl = new URL(url);
    newUrl.pathname = url.pathname.slice(0, -1);
    return Response.redirect(newUrl.toString(), 301);
  }

  // 3. Editor routes are SPA-only and must be noindexed.
  //    Serve the SPA shell with a noindex meta tag + canonical
  //    pointing to the parent tool page.
  const editorMatch = url.pathname.match(
    /^\/tools\/(cv-builder|visiting-card)\/edit\//
  );
  if (editorMatch) {
    const parentSlug = editorMatch[1];
    const canonical = `${SITE_URL}/tools/${parentSlug}`;
    const assetUrl = new URL("/index.html", url.origin);
    const resp = await context.env.ASSETS.fetch(
      new Request(assetUrl.toString(), {
        method: "GET",
        headers: context.request.headers,
      })
    );
    if (!resp.ok) return context.next();
    const html = await resp.text();
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

  // 4. Everything else: let Cloudflare serve the static asset.
  //    dist/<path>/index.html for known routes,
  //    dist/404.html for unknown routes.
  return context.next();
};
