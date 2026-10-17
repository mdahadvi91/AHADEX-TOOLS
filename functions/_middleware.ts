/* ============================================================
 * Cloudflare Pages Middleware — minimal, asset-serving only
 * ------------------------------------------------------------
 * Every SEO-critical route has its own pre-built HTML file at
 * dist/<path>/index.html (produced by scripts/build-route-html.ts).
 *
 * Editor routes (/tools/cv-builder/edit/* and /tools/visiting-
 * card/edit/*) are handled by _redirects, which rewrites them to
 * pre-built catch-all HTML files with noindex + canonical meta
 * already baked in.
 *
 * This middleware therefore does only three things:
 *   1. Redirect www → non-www
 *   2. Redirect trailing slash → no trailing slash
 *   3. Serve dist/<path>/index.html (or 404.html)
 *
 * Nothing else. No meta injection, no editor logic, no SSR
 * injection — those are all deterministic at build time now.
 * ============================================================ */

interface Env {
  ASSETS: { fetch: (req: Request) => Promise<Response> };
}

async function fetchAsset(
  env: Env,
  origin: string,
  path: string,
  req: Request
): Promise<Response | null> {
  try {
    const url = new URL(path, origin);
    const resp = await env.ASSETS.fetch(
      new Request(url.toString(), {
        method: "GET",
        headers: req.headers,
      })
    );
    return resp.ok ? resp : null;
  } catch {
    return null;
  }
}

export const onRequest: PagesFunction<Env> = async (context) => {
  const url = new URL(context.request.url);

  // 1. www → non-www
  if (url.hostname === "www.ahadex.fun") {
    const newUrl = new URL(url);
    newUrl.hostname = "ahadex.fun";
    return Response.redirect(newUrl.toString(), 301);
  }

  // 2. Trailing slash → no trailing slash
  if (url.pathname !== "/" && url.pathname.endsWith("/")) {
    const newUrl = new URL(url);
    newUrl.pathname = url.pathname.slice(0, -1);
    return Response.redirect(newUrl.toString(), 301);
  }

  // 3. Root → dist/index.html
  if (url.pathname === "/") {
    const root = await fetchAsset(
      context.env,
      url.origin,
      "/index.html",
      context.request
    );
    if (root) return root;
  }

  // 4. /<path> → dist/<path>/index.html
  if (!url.pathname.endsWith(".html")) {
    const dirIndex = url.pathname.endsWith("/")
      ? `${url.pathname}index.html`
      : `${url.pathname}/index.html`;
    const page = await fetchAsset(
      context.env,
      url.origin,
      dirIndex,
      context.request
    );
    if (page) return page;
  }

  // 5. Direct file (e.g. /sitemap.xml, /ads.txt)
  const direct = await fetchAsset(
    context.env,
    url.origin,
    url.pathname,
    context.request
  );
  if (direct) return direct;

  // 6. 404 fallback
  const notFound = await fetchAsset(
    context.env,
    url.origin,
    "/404.html",
    context.request
  );
  if (notFound) {
    return new Response(notFound.body, {
      status: 404,
      headers: notFound.headers,
    });
  }

  return context.next();
};
