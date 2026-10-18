/* ============================================================
 * verify-production.ts
 * ------------------------------------------------------------
 * Post-deploy verification of LIVE production URLs.
 *
 * Runs AFTER `git push` + Cloudflare deploy. Performs real
 * HTTP requests and checks:
 *
 *   - HTTP status (must be 200)
 *   - Content-Type (html / xml / txt per URL kind)
 *   - Redirect chain (should be empty for canonical URLs)
 *   - HTML: <title>, description, canonical, robots, h1,
 *           JSON-LD parse, hreflang presence (warning)
 *   - sitemap.xml: body starts with <?xml, contains <urlset>,
 *                  has >= 50 <loc> entries
 *   - robots.txt: contains "Sitemap:" directive
 *
 * Exit code 1 on any hard failure. Warnings do not fail.
 * ============================================================ */

import { request as httpsRequest } from "node:https";
import { request as httpRequest } from "node:http";
import { readFileSync, existsSync } from "node:fs";
import { resolve } from "node:path";

const SITE = "https://ahadex.fun";
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
      { method: "GET", headers: { "user-agent": UA, accept: "*/*" } },
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
function countHreflang(html: string): number {
  return (html.match(/<link\b[^>]*\bhreflang=/gi) || []).length;
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

// ── Specs ───────────────────────────────────────────────────
interface Spec {
  path: string;
  kind: "html" | "xml" | "txt";
  label: string;
  expectedCanonical?: string;
  expectSitemapInBody?: boolean;
}

const TARGETS: Spec[] = [
  { path: "/", kind: "html", label: "homepage", expectedCanonical: `${SITE}/` },
  { path: "/robots.txt", kind: "txt", label: "robots.txt", expectSitemapInBody: true },
  { path: "/sitemap.xml", kind: "xml", label: "sitemap.xml" },
  { path: "/tools", kind: "html", label: "tools index", expectedCanonical: `${SITE}/tools` },
  { path: "/tools/visiting-card", kind: "html", label: "tool page", expectedCanonical: `${SITE}/tools/visiting-card` },
  { path: "/blog", kind: "html", label: "blog index", expectedCanonical: `${SITE}/blog` },
  { path: "/guides", kind: "html", label: "guides index", expectedCanonical: `${SITE}/guides` },
];

// ── Checks ──────────────────────────────────────────────────
interface Report {
  spec: Spec;
  status: number;
  contentType: string;
  finalUrl: string;
  redirects: string[];
  problems: string[];
  warnings: string[];
  notes: string[];
}

function checkContentType(kind: Spec["kind"], ct: string): string | null {
  const c = ct.toLowerCase();
  if (kind === "html" && !c.includes("text/html") && !c.includes("application/xhtml"))
    return `expected text/html, got "${ct || "(none)"}"`;
  if (kind === "xml" && !c.includes("xml"))
    return `expected */*xml, got "${ct || "(none)"}"`;
  if (kind === "txt" && !c.includes("text/"))
    return `expected text/*, got "${ct || "(none)"}"`;
  return null;
}

function checkHtmlBody(spec: Spec, html: string, r: Report) {
  const title = getTitle(html);
  if (!title) r.problems.push("missing or empty <title>");
  else r.notes.push(`title: ${title.length > 60 ? title.slice(0, 60) + "…" : title}`);

  if (!getMetaContent(html, "description"))
    r.problems.push('missing or empty <meta name="description">');

  const canonical = getCanonical(html);
  if (!canonical) {
    r.problems.push('<link rel="canonical"> missing');
  } else if (
    spec.expectedCanonical &&
    canonical.replace(/\/$/, "") !== spec.expectedCanonical.replace(/\/$/, "")
  ) {
    r.problems.push(
      `canonical mismatch (got "${canonical}", expected "${spec.expectedCanonical}")`
    );
  } else {
    r.notes.push(`canonical: ${canonical}`);
  }

  const robots = getMetaContent(html, "robots");
  if (robots && /noindex/i.test(robots))
    r.problems.push(`robots meta contains noindex ("${robots}")`);

  if (!hasNonEmptyH1(html)) r.problems.push("missing non-empty <h1>");

  const hl = countHreflang(html);
  if (hl > 0)
    r.warnings.push(
      `${hl} hreflang tag(s) present — we intentionally removed self-referential hreflang`
    );

  const jld = countJsonLd(html, r.problems);
  if (jld > 0) r.notes.push(`${jld} valid JSON-LD block(s)`);
  else r.warnings.push("no JSON-LD blocks found");
}

function checkXmlBody(body: string, r: Report) {
  const t = body.trim();
  if (!t.startsWith("<?xml")) r.problems.push("body does not start with <?xml");
  if (!t.includes("<urlset")) r.problems.push("body missing <urlset>");
  const locs = [...t.matchAll(/<loc>([^<]+)<\/loc>/g)].length;
  if (locs < 50) r.problems.push(`only ${locs} <loc> entries — suspiciously low`);
  else r.notes.push(`${locs} <loc> entries`);
}

function checkTxtBody(spec: Spec, body: string, r: Report) {
  if (spec.expectSitemapInBody) {
    const m = body.match(/^Sitemap:\s*(\S+)/im);
    if (!m) r.problems.push("robots.txt has no `Sitemap:` line");
    else r.notes.push(`Sitemap: ${m[1]}`);
  }
}

async function verifyOne(spec: Spec): Promise<Report> {
  const url = SITE + spec.path;
  const r: Report = {
    spec, status: 0, contentType: "", finalUrl: url, redirects: [],
    problems: [], warnings: [], notes: [],
  };

  let res: FetchResult;
  try {
    res = await fetchFollow(url);
  } catch (e) {
    r.problems.push(`request failed: ${e instanceof Error ? e.message : String(e)}`);
    return r;
  }

  r.status = res.status;
  r.contentType = res.headers["content-type"] || "";
  r.finalUrl = res.finalUrl;
  r.redirects = res.redirects;

  if (res.status !== 200) r.problems.push(`expected HTTP 200, got ${res.status}`);
  if (res.finalUrl !== url)
    r.problems.push(`final URL differs: ${url} -> ${res.finalUrl}`);

  const ctProblem = checkContentType(spec.kind, r.contentType);
  if (ctProblem) r.problems.push(`content-type: ${ctProblem}`);

  if (spec.kind === "html") checkHtmlBody(spec, res.body, r);
  else if (spec.kind === "xml") checkXmlBody(res.body, r);
  else if (spec.kind === "txt") checkTxtBody(spec, res.body, r);

  return r;
}

// ── Main ────────────────────────────────────────────────────
async function main() {
  console.log(`\n🔎 Verifying production: ${SITE}\n`);

  const reports = await Promise.all(TARGETS.map(verifyOne));

  let failedReports = 0;
  let totalProblems = 0;

  for (const r of reports) {
    const ok = r.problems.length === 0;
    if (!ok) failedReports++;
    totalProblems += r.problems.length;

    const icon = ok ? "✓" : "✗";
    const ct = r.contentType.split(";")[0] || "(no content-type)";
    const pathCol = r.spec.path.padEnd(26);
    const statusCol = String(r.status).padEnd(4);
    console.log(`${icon} ${pathCol} ${statusCol} ${ct}`);
    console.log(`    (${r.spec.label})`);

    for (const n of r.notes) console.log(`    · ${n}`);
    for (const w of r.warnings) console.log(`    ⚠ ${w}`);
    for (const p of r.problems) console.log(`    ✗ ${p}`);
  }

  // Local vs live sitemap URL-count sanity
  const localPath = resolve(process.cwd(), "public/sitemap.xml");
  if (existsSync(localPath)) {
    const localCount = [...readFileSync(localPath, "utf-8").matchAll(/<loc>/g)].length;
    const sitemapReport = reports.find((x) => x.spec.path === "/sitemap.xml");
    if (sitemapReport) {
      const liveMatch = sitemapReport.notes.find((n) => n.endsWith("<loc> entries"));
      const liveCount = liveMatch ? parseInt(liveMatch, 10) : null;
      if (liveCount !== null && liveCount !== localCount) {
        console.log(
          `\n⚠  local sitemap has ${localCount} URLs but live has ${liveCount} — deploy may be stale`
        );
      }
    }
  }

  console.log("");
  if (totalProblems > 0) {
    console.error(
      `❌ Production verification FAILED — ${totalProblems} problem(s) across ${failedReports} URL(s).`
    );
    process.exit(1);
  }
  console.log(`✅ Production verification passed — ${reports.length} URLs checked.\n`);
}

main().catch((e) => {
  console.error("❌ verify-production crashed:", e);
  process.exit(1);
});
