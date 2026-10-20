import { readFileSync, existsSync } from "node:fs";
import { resolve } from "node:path";
import { request as httpsRequest } from "node:https";
import { request as httpRequest } from "node:http";

const TIMEOUT_MS = 15_000;
const MAX_REDIRECTS = 5;
const UA = "AHADEX-VerifyProduction/1.0 (+https://ahadex.fun)";

// ── HTTP layer ───────────────────────────────────────────────
interface FetchResult {
  status: number;
  headers: Record<string, string>;
  body: string;
  finalUrl: string;
  redirects: string[];
}

function singleRequest(url: string): Promise<{
  status: number;
  headers: Record<string, string>;
  body: string;
}> {
  return new Promise((resolveP, rejectP) => {
    const u = new URL(url);
    const client = u.protocol === "https:" ? httpsRequest : httpRequest;
    const req = client(
      url,
      { method: "GET", headers: { "user-agent": UA, accept: "text/html" } },
      (res) => {
        const chunks: Buffer[] = [];
        res.on("data", (c: Buffer) => chunks.push(c));
        res.on("end", () => {
          const headers: Record<string, string> = {};
          for (const [k, v] of Object.entries(res.headers)) {
            if (typeof v === "string") headers[k.toLowerCase()] = v;
            else if (Array.isArray(v)) headers[k.toLowerCase()] = v.join(", ");
          }
          resolveP({
            status: res.statusCode || 0,
            headers,
            body: Buffer.concat(chunks).toString("utf-8"),
          });
        });
      }
    );
    req.on("error", rejectP);
    req.setTimeout(TIMEOUT_MS, () =>
      req.destroy(new Error(`timeout after ${TIMEOUT_MS}ms`))
    );
    req.end();
  });
}

async function fetchFollow(url: string): Promise<FetchResult> {
  const redirects: string[] = [];
  let current = url;
  for (let i = 0; i <= MAX_REDIRECTS; i++) {
    const r = await singleRequest(current);
    const loc = r.headers.location;
    if (r.status >= 300 && r.status < 400 && loc) {
      redirects.push(`${r.status} ${current} -> ${loc}`);
      current = new URL(loc, current).toString();
      continue;
    }
    return { ...r, finalUrl: current, redirects };
  }
  throw new Error(`too many redirects (>${MAX_REDIRECTS})`);
}

// ── HTML helpers ────────────────────────────────────────────
function getTitle(html: string): string | null {
  const m = html.match(/<title\b[^>]*>([\s\S]*?)<\/title>/i);
  return m ? m[1].trim() : null;
}
function getMetaContent(html: string, name: string): string | null {
  const re = new RegExp(`<meta\\b[^>]*\\bname=["']${name}["'][^>]*>`, "i");
  const tag = html.match(re);
  if (!tag) return null;
  const c = tag[0].match(/content=(["'])([\s\S]*?)\1/);
  return c ? c[2].trim() : null;
}
function getCanonical(html: string): string | null {
  const tag = html.match(/<link\b[^>]*\brel=["']canonical["'][^>]*>/i);
  if (!tag) return null;
  const h = tag[0].match(/href=(["'])([\s\S]*?)\1/);
  return h ? h[2].trim() : null;
}
function hasNonEmptyH1(html: string): boolean {
  const h1s = [...html.matchAll(/<h1\b[^>]*>([\s\S]*?)<\/h1>/gi)];
  return h1s.some((m) => m[1].replace(/<[^>]+>/g, "").trim().length > 0);
}
function countJsonLd(html: string, problems: string[]): number {
  const re = /<script\b[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi;
  let m: RegExpExecArray | null;
  let n = 0;
  while ((m = re.exec(html)) !== null) {
    n++;
    const raw = m[1].trim();
    if (!raw) { problems.push(`JSON-LD block #${n} empty`); continue; }
    try { JSON.parse(raw); }
    catch (e) {
      const msg = e instanceof Error ? e.message : String(e);
      problems.push(`JSON-LD block #${n} invalid: ${msg}`);
    }
  }
  return n;
}

// ── Verification per URL ────────────────────────────────────
async function verifyUrl(url: string): Promise<{ url: string; problems: string[] }> {
  const problems: string[] = [];
  
  try {
    const res = await fetchFollow(url);
    
    if (res.status !== 200) {
      problems.push(`expected HTTP 200, got ${res.status}`);
    }
    
    const ct = res.headers["content-type"] || "";
    if (!ct.toLowerCase().includes("text/html")) {
      problems.push(`expected content-type text/html, got "${ct}"`);
    }

    // If we have major errors, no need to parse the rest
    if (problems.length === 0) {
      const html = res.body;

      if (!getTitle(html)) problems.push("missing or empty <title>");
      if (!getMetaContent(html, "description")) problems.push('missing or empty <meta name="description">');

      const canonical = getCanonical(html);
      if (!canonical) {
        problems.push('<link rel="canonical"> missing');
      } else if (canonical.replace(/\/$/, "") !== url.replace(/\/$/, "")) {
        problems.push(`canonical mismatch (got "${canonical}", expected "${url}")`);
      }

      const robots = getMetaContent(html, "robots");
      if (robots && /noindex/i.test(robots)) {
        problems.push(`<meta name="robots"> contains noindex ("${robots}")`);
      }

      if (!hasNonEmptyH1(html)) problems.push("missing non-empty <h1>");

      countJsonLd(html, problems);
    }
  } catch (e) {
    problems.push(`request failed: ${e instanceof Error ? e.message : String(e)}`);
  }

  return { url, problems };
}

// ── Main ────────────────────────────────────────────────────
async function main() {
  const sitemapPath = resolve(process.cwd(), "public/sitemap.xml");
  if (!existsSync(sitemapPath)) {
    console.error("❌ public/sitemap.xml not found. Run npm run sitemap first.");
    process.exit(1);
  }

  const xml = readFileSync(sitemapPath, "utf-8");
  const urls = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);

  console.log(`\n🔎 Verifying ${urls.length} production URLs from sitemap...\n`);

  let failedCount = 0;
  const concurrency = 5; // Process 5 URLs at a time to avoid Cloudflare rate limits

  for (let i = 0; i < urls.length; i += concurrency) {
    const batch = urls.slice(i, i + concurrency);
    const results = await Promise.all(batch.map(verifyUrl));

    for (const res of results) {
      if (res.problems.length > 0) {
        failedCount++;
        console.error(`❌ ${res.url}`);
        for (const p of res.problems) {
          console.error(`   - ${p}`);
        }
      } else {
        console.log(`✅ ${res.url}`);
      }
    }
  }

  console.log("");
  if (failedCount > 0) {
    console.error(`❌ Production verification FAILED — ${failedCount} out of ${urls.length} URLs have issues.`);
    process.exit(1);
  }
  console.log(`✅ Production verification passed — All ${urls.length} URLs are fully healthy! 🎉`);
}

main().catch((e) => {
  console.error("❌ verify-production crashed:", e);
  process.exit(1);
});
