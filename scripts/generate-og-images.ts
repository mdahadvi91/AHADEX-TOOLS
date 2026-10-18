/* ============================================================
 * OG Image Generator
 * ------------------------------------------------------------
 * Reads:  src/data/tools.ts (working tools)
 *         src/data/blog.ts  (blog posts)
 * Writes: public/images/og/tools/{id}-og.svg + .png   (1200×630)
 *         public/images/og/blog/{slug}-og.svg + .png  (1200×630)
 *
 * Run:  npx tsx scripts/generate-og-images.ts
 * Auto: runs before `npm run build` (after sitemap)
 * ============================================================ */

import { Resvg } from "@resvg/resvg-js";
import sharp from "sharp";
import { readFileSync } from "node:fs";
import { existsSync, mkdirSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";
import { tools } from "../src/data/tools";
import { blogPosts } from "../src/data/blog";

type Tool = {
  id: string;
  name: string;
  description: string;
  keywords: string[];
  path: string;
  popular?: boolean;
  newTool?: boolean;
};

const OUT_DIR = resolve(process.cwd(), "public/images/og/tools");
const W = 1200;
const H = 630;

/* ── Category detection ── */
function getCategory(id: string, p: string): { label: string } {
  const path = p.toLowerCase();
  if (id.includes("qr") || id.includes("barcode")) return { label: "QR & BARCODE" };
  if (id.includes("visiting-card") || id.includes("cv-builder")) return { label: "DESIGN & DOCS" };
  if (path.includes("/image/") || id.includes("image") || id.includes("jpg") || id.includes("png") || id.includes("webp"))
    return { label: "IMAGE TOOL" };
  if (path.includes("/pdf/") || id.includes("pdf")) return { label: "PDF TOOL" };
  if (path.includes("/text/") || id.includes("word") || id.includes("case")) return { label: "TEXT TOOL" };
  if (path.includes("/developer/")) return { label: "DEVELOPER" };
  return { label: "FREE TOOL" };
}

/* ── XML escape ── */
function esc(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

/* ── Dynamic title size ── */
function titleSize(name: string): number {
  const len = name.length;
  if (len <= 15) return 96;
  if (len <= 22) return 80;
  if (len <= 30) return 64;
  return 52;
}

/* ── Dynamic subtitle size ── */
function subtitleSize(desc: string): number {
  return desc.length > 75 ? 26 : 30;
}

/* ── Truncate ── */
function truncate(s: string, max: number): string {
  return s.length > max ? s.slice(0, max - 1).trimEnd() + "…" : s;
}

/* ── Feature pills (3 keywords) ── */
function pickPills(keywords: string[]): string[] {
  const cleaned = keywords
    .map((k) => k.trim())
    .filter((k) => k.length > 0 && k.length <= 22)
    .slice(0, 3);
  while (cleaned.length < 3) {
    const fallbacks = ["No Uploads", "100% Private", "Free Forever"];
    const fb = fallbacks[cleaned.length];
    if (!cleaned.includes(fb)) cleaned.push(fb);
    else break;
  }
  return cleaned;
}

/* ── Title case for pills ── */
function titleCase(s: string): string {
  return s
    .split(" ")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
    .join(" ");
}

/* ── Build SVG for a single tool ── */
function buildSvg(tool: Tool): string {
  const { label } = getCategory(tool.id, tool.path);
  const tSize = titleSize(tool.name);
  const subSize = subtitleSize(tool.description);
  const subtitle = truncate(tool.description, 72);
  const pills = pickPills(tool.keywords).map(titleCase);
  const topPillPadding = (W - 100 - 200 * 3 - 20 * 2) / 2; // not used, but keeps math simple

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" width="${W}" height="${H}" fill="none">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="${W}" y2="${H}" gradientUnits="userSpaceOnUse">
      <stop offset="0%" stop-color="#1A1114"/>
      <stop offset="100%" stop-color="#32202A"/>
    </linearGradient>
    <linearGradient id="accent" x1="0" y1="0" x2="${W}" y2="${H}" gradientUnits="userSpaceOnUse">
      <stop offset="0%" stop-color="#D88B9A"/>
      <stop offset="50%" stop-color="#8B3A4F"/>
      <stop offset="100%" stop-color="#C99667"/>
    </linearGradient>
    <radialGradient id="glow1" cx="0.15" cy="0.2" r="0.6">
      <stop offset="0%" stop-color="#D88B9A" stop-opacity="0.35"/>
      <stop offset="100%" stop-color="#D88B9A" stop-opacity="0"/>
    </radialGradient>
    <radialGradient id="glow2" cx="0.9" cy="0.85" r="0.7">
      <stop offset="0%" stop-color="#C99667" stop-opacity="0.35"/>
      <stop offset="100%" stop-color="#C99667" stop-opacity="0"/>
    </radialGradient>
  </defs>

  <rect width="${W}" height="${H}" fill="url(#bg)"/>
  <rect width="${W}" height="${H}" fill="url(#glow1)"/>
  <rect width="${W}" height="${H}" fill="url(#glow2)"/>

  <rect x="0" y="0" width="${W}" height="6" fill="url(#accent)"/>
  <rect x="0" y="${H - 6}" width="${W}" height="6" fill="url(#accent)"/>

  <!-- Category badge -->
  <rect x="100" y="90" width="${8 + label.length * 15}" height="50" rx="25" fill="#D88B9A" opacity="0.15" stroke="#D88B9A" stroke-width="1.5"/>
  <text x="${100 + (8 + label.length * 15) / 2}" y="122" text-anchor="middle" font-family="'Noto Sans','Droid Sans',system-ui,sans-serif" font-size="22" font-weight="600" fill="#E8B4B8" letter-spacing="0.5">${esc(label)}</text>

  <!-- Main title -->
  <text x="100" y="260" font-family="'Noto Sans','Droid Sans',system-ui,sans-serif" font-size="${tSize}" font-weight="800" fill="#F8F6F1" letter-spacing="-2">${esc(tool.name)}</text>

  <!-- Subtitle -->
  <text x="100" y="335" font-family="'Noto Sans','Droid Sans',system-ui,sans-serif" font-size="${subSize}" font-weight="400" fill="#C4A89E" letter-spacing="-0.3">${esc(subtitle)}</text>

  <!-- Feature pills -->
  <g transform="translate(100, 460)">
    <rect x="0" y="0" width="240" height="56" rx="28" fill="#FFFFFF" opacity="0.06" stroke="#D88B9A" stroke-width="1.5"/>
    <circle cx="30" cy="28" r="6" fill="#D88B9A"/>
    <text x="52" y="36" font-family="'Noto Sans','Droid Sans',sans-serif" font-size="18" font-weight="500" fill="#F8F6F1">${esc(pills[0])}</text>

    <rect x="260" y="0" width="240" height="56" rx="28" fill="#FFFFFF" opacity="0.06" stroke="#C99667" stroke-width="1.5"/>
    <circle cx="290" cy="28" r="6" fill="#C99667"/>
    <text x="312" y="36" font-family="'Noto Sans','Droid Sans',sans-serif" font-size="18" font-weight="500" fill="#F8F6F1">${esc(pills[1])}</text>

    <rect x="520" y="0" width="240" height="56" rx="28" fill="#FFFFFF" opacity="0.06" stroke="#B36878" stroke-width="1.5"/>
    <circle cx="550" cy="28" r="6" fill="#B36878"/>
    <text x="572" y="36" font-family="'Noto Sans','Droid Sans',sans-serif" font-size="18" font-weight="500" fill="#F8F6F1">${esc(pills[2])}</text>
  </g>

  <!-- Domain -->
  <text x="100" y="580" font-family="'Noto Sans Mono','Droid Sans Mono',monospace" font-size="22" font-weight="500" fill="#D88B9A" letter-spacing="0.5" opacity="0.85">ahadex.fun</text>

  <!-- Brand mark (right) -->
  <g transform="translate(900, 220)">
    <circle cx="140" cy="130" r="130" fill="url(#accent)" opacity="0.15"/>
    <path d="M 140 40 L 90 220 L 118 220 L 128 172 L 152 172 L 162 220 L 190 220 L 140 40 Z M 133 152 L 147 152 L 140 110 L 133 152 Z" fill="url(#accent)"/>
  </g>
</svg>
`;
}

/* ── Split a title into balanced lines by character count ── */
function splitTitle(title: string, maxCharsPerLine = 32): string[] {
  const words = title.split(" ");
  const lines: string[] = [];
  let current = "";

  for (const word of words) {
    const candidate = current ? `${current} ${word}` : word;
    if (candidate.length > maxCharsPerLine && current) {
      lines.push(current);
      current = word;
    } else {
      current = candidate;
    }
  }
  if (current) lines.push(current);

  // Cap at 3 lines — if we have more, redistribute more evenly
  if (lines.length > 3) {
    const merged = lines.join(" ");
    const target = Math.ceil(merged.length / 3);
    return splitTitle(merged, target);
  }
  return lines;
}

/* ── Pick font size from line count and longest line width ── */
function pickTitleSize(lines: string[]): number {
  const longest = Math.max(...lines.map((l) => l.length));
  const count = lines.length;

  // The image is 1200 wide with 100px margins each side = 1000 usable.
  // Empirically: at font size N, average char width ≈ 0.55 * N.
  // Max chars per line at font N: floor(1000 / (0.55 * N)) = floor(1818 / N).
  // Pick the largest size where longest line still fits.
  const candidates = [72, 64, 56, 48, 42, 36, 32, 28];

  for (const size of candidates) {
    const maxChars = Math.floor(1818 / size);
    // Reduce for extra lines (they compete for vertical space)
    const verticalFactor = count >= 3 ? 0.85 : 1;
    if (longest <= maxChars * verticalFactor) {
      return size;
    }
  }
  return 28;
}

/* ── Build SVG for a single blog post ── */
function buildBlogSvg(post: typeof blogPosts[0]): string {
  const rawTitle = post.title.length > 110 ? post.title.slice(0, 109).trimEnd() + "…" : post.title;
  const titleLines = splitTitle(rawTitle);
  const titleSize = pickTitleSize(titleLines);

  const excerpt = post.excerpt.length > 110 ? post.excerpt.slice(0, 109).trimEnd() + "…" : post.excerpt;
  const category = post.category.toUpperCase();
  const emoji = post.emoji || "📄";
  const readTime = `${post.readTime} min read`;

  // Build title <text> elements with proper vertical spacing
  const lineHeight = Math.round(titleSize * 1.08);
  const titleStartY = 230;
  const titleSvg = titleLines
    .map(
      (line, i) =>
        `<text x="100" y="${titleStartY + i * lineHeight}" font-family="'Noto Sans','Droid Sans',system-ui,sans-serif" font-size="${titleSize}" font-weight="800" fill="#F8F6F1" letter-spacing="-2">${esc(line)}</text>`
    )
    .join("\n    ");

  // Excerpt y position depends on where the title ends
  const excerptY = titleStartY + titleLines.length * lineHeight + 60;

  // Badge width depends on category length
  const badgeW = 8 + category.length * 15;

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" width="${W}" height="${H}" fill="none">
    <defs>
      <linearGradient id="bg" x1="0" y1="0" x2="${W}" y2="${H}" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stop-color="#1A1114"/>
        <stop offset="100%" stop-color="#32202A"/>
      </linearGradient>
      <linearGradient id="accent" x1="0" y1="0" x2="${W}" y2="${H}" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stop-color="#D88B9A"/>
        <stop offset="50%" stop-color="#8B3A4F"/>
        <stop offset="100%" stop-color="#C99667"/>
      </linearGradient>
      <radialGradient id="glow1" cx="0.15" cy="0.2" r="0.6">
        <stop offset="0%" stop-color="#D88B9A" stop-opacity="0.35"/>
        <stop offset="100%" stop-color="#D88B9A" stop-opacity="0"/>
      </radialGradient>
      <radialGradient id="glow2" cx="0.9" cy="0.85" r="0.7">
        <stop offset="0%" stop-color="#C99667" stop-opacity="0.35"/>
        <stop offset="100%" stop-color="#C99667" stop-opacity="0"/>
      </radialGradient>
    </defs>

    <rect width="${W}" height="${H}" fill="url(#bg)"/>
    <rect width="${W}" height="${H}" fill="url(#glow1)"/>
    <rect width="${W}" height="${H}" fill="url(#glow2)"/>

    <rect x="0" y="0" width="${W}" height="6" fill="url(#accent)"/>
    <rect x="0" y="${H - 6}" width="${W}" height="6" fill="url(#accent)"/>

    <!-- Category badge -->
    <rect x="100" y="80" width="${badgeW}" height="46" rx="23" fill="#D88B9A" opacity="0.15" stroke="#D88B9A" stroke-width="1.5"/>
    <text x="${100 + badgeW / 2}" y="110" text-anchor="middle" font-family="'Noto Sans','Droid Sans',system-ui,sans-serif" font-size="20" font-weight="600" fill="#E8B4B8" letter-spacing="0.5">${esc(category)}</text>

    <!-- Emoji decoration (top right) -->
    <text x="1080" y="130" text-anchor="middle" font-family="'Noto Color Emoji','Noto Sans',sans-serif" font-size="72" opacity="0.85">${emoji}</text>

    <!-- Title -->
    ${titleSvg}

    <!-- Excerpt -->
    <text x="100" y="${excerptY}" font-family="'Noto Sans','Droid Sans',system-ui,sans-serif" font-size="24" font-weight="400" fill="#C4A89E" letter-spacing="-0.3">${esc(excerpt)}</text>

    <!-- Meta pills -->
    <g transform="translate(100, 545)">
      <rect x="0" y="0" width="220" height="52" rx="26" fill="#FFFFFF" opacity="0.06" stroke="#D88B9A" stroke-width="1.5"/>
      <circle cx="28" cy="26" r="5" fill="#D88B9A"/>
      <text x="46" y="34" font-family="'Noto Sans','Droid Sans',sans-serif" font-size="18" font-weight="500" fill="#F8F6F1">${esc(readTime)}</text>

      <rect x="240" y="0" width="260" height="52" rx="26" fill="#FFFFFF" opacity="0.06" stroke="#C99667" stroke-width="1.5"/>
      <circle cx="268" cy="26" r="5" fill="#C99667"/>
      <text x="286" y="34" font-family="'Noto Sans','Droid Sans',sans-serif" font-size="18" font-weight="500" fill="#F8F6F1">AHADEX Blog</text>
    </g>

    <!-- Domain -->
    <text x="100" y="610" font-family="'Noto Sans Mono','Droid Sans Mono',monospace" font-size="22" font-weight="500" fill="#D88B9A" letter-spacing="0.5" opacity="0.85">ahadex.fun/blog</text>
  </svg>
  `;
}

/* ── Main ── */
async function main(): Promise<void> {
  if (!existsSync(OUT_DIR)) mkdirSync(OUT_DIR, { recursive: true });

  const allTools = tools as unknown as Tool[];
  let okCount = 0;
  let failCount = 0;

  for (const tool of allTools) {
    const svg = buildSvg(tool);
    const svgPath = resolve(OUT_DIR, `${tool.id}-og.svg`);
    const pngPath = resolve(OUT_DIR, `${tool.id}-og.png`);

    try {
      writeFileSync(svgPath, svg, "utf-8");
      const renderer = new Resvg(svg, {
        fitTo: { mode: "width", value: W },
      });
      const pngBuffer = renderer.render().asPng();
      const jpgPath = pngPath.replace(/\.png$/, ".jpg");
      await sharp(pngBuffer).jpeg({ quality: 85 }).toFile(jpgPath);
      okCount += 1;
      console.log(`✅ ${tool.id}-og.jpg`);
    } catch (e) {
      failCount += 1;
      console.error(`❌ ${tool.id}:`, e instanceof Error ? e.message : e);
    }
  }

  console.log("");
  console.log(`📊 Tools: ${okCount} OK, ${failCount} failed (total ${allTools.length})`);

  /* ── Blog OG images ── */
  const BLOG_OUT_DIR = resolve(process.cwd(), "public/images/og/blog");
  if (!existsSync(BLOG_OUT_DIR)) mkdirSync(BLOG_OUT_DIR, { recursive: true });

  let blogOk = 0;
  let blogFail = 0;

  for (const post of blogPosts) {
    const svg = buildBlogSvg(post);
    const svgPath = resolve(BLOG_OUT_DIR, `${post.slug}-og.svg`);
    const pngPath = resolve(BLOG_OUT_DIR, `${post.slug}-og.png`);

    try {
      writeFileSync(svgPath, svg, "utf-8");
      const renderer = new Resvg(svg, {
        fitTo: { mode: "width", value: W },
      });
      const pngBuffer = renderer.render().asPng();
      const jpgPath = pngPath.replace(/\.png$/, ".jpg");
      await sharp(pngBuffer).jpeg({ quality: 85 }).toFile(jpgPath);
      blogOk += 1;
    } catch (e) {
      blogFail += 1;
      console.error(`❌ blog/${post.slug}:`, e instanceof Error ? e.message : e);
    }
  }

  console.log(`📰 Blog: ${blogOk} OK, ${blogFail} failed (total ${blogPosts.length})`);
  console.log(`📁 Tool output: ${OUT_DIR}`);
  console.log(`📁 Blog output: ${BLOG_OUT_DIR}`);
}

main().catch(console.error);

/* ── Home & default OG ── */
async function generateRootOg(): Promise<void> {
  const root = resolve(process.cwd(), "public/images/og");
  const files = ["home-og", "default-og"];
  for (const f of files) {
    const svg = resolve(root, `${f}.svg`);
    const png = resolve(root, `${f}.png`);
    if (!existsSync(svg)) {
      console.log(`⚠️  ${f}.svg not found, skipping`);
      continue;
    }
    try {
      const rootSvg = readFileSync(svg, "utf-8");
      const renderer = new Resvg(rootSvg, {
        fitTo: { mode: "width", value: W },
      });
      const pngBuffer = renderer.render().asPng();
      const jpg = png.replace(/\.png$/, ".jpg");
      await sharp(pngBuffer).jpeg({ quality: 85 }).toFile(jpg);
      console.log(`✅ ${f}.jpg`);
    } catch {
      console.log(`❌ Failed: ${f}.png`);
    }
  }
}

// Run at end of script (after tools loop)
if (typeof require !== "undefined" && require.main === module) {
  generateRootOg().catch(console.error);
}
