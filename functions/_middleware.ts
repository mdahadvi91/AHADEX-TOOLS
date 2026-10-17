/* ============================================================
 * Cloudflare Pages Middleware — minimal, explicit asset serving
 * ------------------------------------------------------------
 * Every SEO-critical route has its own pre-built HTML file at
 * dist/<path>/index.html (produced by scripts/build-route-html.ts).
 *
 * This middleware:
 *   1. Redirects www → non-www
 *   2. Redirects trailing slash → no trailing slash
 *   3. Serves dist/<path>/index.html explicitly for known routes
 *   4. Serves index.html for the root path
 *   5. Serves 404.html for unknown paths
 *   6. Editor routes (/tools/*/edit/*) get noindex + parent canonical
 *
 * We fetch assets explicitly rather than calling context.next()
 * because Cloudflare Pages' next() does not resolve directory
 * index files for nested paths like /tools/image-compressor.
 * ============================================================ */

interface Env {
  ASSETS: { fetch: (req: Request) => Promise<Response> };
}

const SITE_URL = "https://ahadex.fun";

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
    if (resp.ok) return resp;
    return null;
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

  // 3. Editor routes: noindex + parent canonical, serve SPA shell
  const editorMatch = url.pathname.match(
    /^\/tools\/(cv-builder|visiting-card)\/edit\//
  );
  if (editorMatch) {
    const parentSlug = editorMatch[1];
    const canonical = `${SITE_URL}/tools/${parentSlug}`;
    const shell =
      (await fetchAsset(context.env, url.origin, "/index.html", context.request)) ??
      null;
    if (!shell) return context.next();
    const html = await shell.text();
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

  // 4. Root path → dist/index.html
  if (url.pathname === "/") {
    const root = await fetchAsset(
      context.env,
      url.origin,
      "/index.html",
      context.request
    );
    if (root) return root;
  }

  // 5. Try explicit directory index: /<path>/index.html
  //    This is what Cloudflare's next() does not do automatically.
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

  // 6. Try the path as a direct file (e.g. /sitemap.xml, /ads.txt)
  const direct = await fetchAsset(
    context.env,
    url.origin,
    url.pathname,
    context.request
  );
  if (direct) return direct;

  // 7. Fallback to 404.html with 404 status
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
