/* ============================================================
 * AHADEX Guides — use-case workflow documentation
 * ------------------------------------------------------------
 * Layer 3 of the site: not tools, not tool-agnostic guides,
 * but workflow documentation for a specific goal. Each guide
 * chains multiple tools into a repeatable process and documents
 * the goal, the steps, and the verification.
 *
 * These pages exist to build topical authority — Google treats
 * a tool site with real use-case documentation differently from
 * a tool site with no editorial layer at all.
 * ============================================================ */

export interface GuideSection {
  heading: string;
  /** Trusted HTML subset (p, ul, ol, table, code, strong, a). */
  body: string;
}

export interface GuideFAQ {
  question: string;
  answer: string;
}

export interface Guide {
  slug: string;
  title: string;
  titleBn: string;
  excerpt: string;
  excerptBn: string;
  emoji: string;
  category: string;
  readTime: number;
  publishedAt: string;
  updatedAt?: string;
  authorId: string;
  /** Tool ids from src/data/tools.ts */
  relatedTools: string[];
  sections: GuideSection[];
  faq: GuideFAQ[];
}

export const guides: Guide[] = [
  {
    slug: "compress-images-for-website",
    title: "Compress images for your website — a workflow that actually works",
    titleBn: "ওয়েবসাইটের জন্য ছবি কমপ্রেস করার সঠিক পদ্ধতি",
    excerpt:
      "Reduce image weight by 70-90% without visible quality loss. A practical workflow with target file sizes, format decisions, and verification steps.",
    excerptBn:
      "৭০-৯০% ছবির সাইজ কমান, চোখে পার্থক্য ছাড়াই। সঠিক পদ্ধতি, টার্গেট সাইজ এবং ভেরিফিকেশন সহ।",
    emoji: "⚡",
    category: "Performance",
    readTime: 8,
    publishedAt: "2026-10-16",
    authorId: "mohammad-ahad",
    relatedTools: ["image-compressor", "image-resizer", "image-converter"],
    sections: [
      {
        heading: "Why image weight is the number one speed problem",
        body: `
          <p>Images typically account for 50-70% of a web page's total weight. A single unoptimized hero image can weigh 4 MB. Multiply that across a 10-page marketing site with 40 stock photos, and you are loading 60-100 MB of images per visit.</p>
          <p>The fix is not "compress harder." It is to <strong>resize first, then compress</strong>. A 4000-pixel photo downscaled to 1920 pixels and then compressed at quality 80 is 95% smaller than the same photo compressed at full resolution. That is the difference between 4.8 MB and 180 KB.</p>
        `,
      },
      {
        heading: "The correct workflow — downscale first, then compress",
        body: `
          <p>Most image tools ask you to choose one operation. The real workflow is two operations in this exact order:</p>
          <ol>
            <li><strong>Resize</strong> the image to the largest size it will ever be displayed. A full-width hero image on a 1920px viewport needs 1920px width. A thumbnail in a grid needs 400px. Never upscale.</li>
            <li><strong>Convert</strong> to the correct format for the image content. Photographs → WebP or JPG. Graphics with transparency → WebP or PNG. Text screenshots → WebP lossless or PNG.</li>
            <li><strong>Compress</strong> the resulting file. WebP at quality 80, JPG at quality 82-85, PNG with maximum compression.</li>
          </ol>
          <p>Skipping step 1 and going straight to compression is the most common mistake. A 4000-pixel photo compressed to 60% quality is still 6-8x larger than the same photo resized to 1920px and compressed at 85%.</p>
        `,
      },
      {
        heading: "Target file sizes by image role",
        body: `
          <p>Knowing the target before you start saves rework. These are the benchmarks we use when optimising our own site:</p>
          <table>
            <thead><tr><th>Image role</th><th>Max width</th><th>Target weight</th><th>Format</th></tr></thead>
            <tbody>
              <tr><td>Hero image (full-width)</td><td>1920 px</td><td>100-200 KB</td><td>WebP or JPG</td></tr>
              <tr><td>Blog post inline image</td><td>1200 px</td><td>60-150 KB</td><td>WebP</td></tr>
              <tr><td>Product photo (e-commerce)</td><td>1200 px</td><td>60-200 KB</td><td>WebP or JPG</td></tr>
              <tr><td>Thumbnail in grid</td><td>600 px</td><td>20-40 KB</td><td>WebP</td></tr>
              <tr><td>Open Graph / social share</td><td>1200 × 630 px</td><td>80-150 KB</td><td>JPG or PNG</td></tr>
              <tr><td>Favicon / small icon</td><td>512 px</td><td>5-20 KB</td><td>PNG</td></tr>
            </tbody>
          </table>
          <p>If your image exceeds the target weight, the fix is almost always: smaller max width, then lower quality. Never the other way around.</p>
        `,
      },
      {
        heading: "Choosing the right format",
        body: `
          <p>Three formats cover 99% of web use cases:</p>
          <ul>
            <li><strong>WebP</strong> — the correct default for anything on the modern web. 25-35% smaller than JPG at identical visual quality, supports transparency and animation. Every browser since 2020 renders it natively.</li>
            <li><strong>JPG</strong> — the fallback for photographs when you cannot guarantee WebP support (email attachments, legacy CMS pipelines, some print shops).</li>
            <li><strong>PNG</strong> — only when you need lossless quality or transparency that WebP cannot handle (rare — WebP supports transparency too). Logos and UI screenshots typically benefit from WebP lossless instead.</li>
          </ul>
          <p>For our own site, we use WebP for everything except the OG images (JPG, for maximum social platform compatibility).</p>
        `,
      },
      {
        heading: "Batch workflow with our Image Compressor",
        body: `
          <p>For more than 10 images, use the batch workflow in <a href="/tools/image-compressor">Image Compressor</a>:</p>
          <ol>
            <li>Drop all the images into the tool at once. It handles JPG, PNG, and WebP in the same batch.</li>
            <li>Set quality to 80 and max width to 1920 (or the correct value for your largest image role).</li>
            <li>Download all. The tool shows you the original size, new size, and percentage saved per file.</li>
            <li>Spot-check 3-5 output files at 100% zoom to confirm quality is acceptable.</li>
          </ol>
          <p>Typical result on a stock photo library: 40 photos averaging 3.2 MB each → 40 photos averaging 380 KB each. Total reduction: 88%. Page load time cut roughly in half.</p>
        `,
      },
      {
        heading: "What to verify after compression",
        body: `
          <p>Three checks catch 95% of compression problems:</p>
          <ul>
            <li><strong>Visual check at 100% zoom</strong> — open a few output files in an image viewer at full zoom. Look for banding in smooth gradients (skies, studio backdrops) and softening of fine text.</li>
            <li><strong>Transparency check</strong> — if your source had transparency and your output is JPG, that transparency is gone (filled with white). Switch to WebP if transparency matters.</li>
            <li><strong>File size check</strong> — if an output is larger than the input, the source was already compressed and re-encoding it added overhead. Keep the original.</li>
          </ul>
        `,
      },
      {
        heading: "Common mistakes to avoid",
        body: `
          <ul>
            <li><strong>Compressing without resizing.</strong> The single biggest file-size mistake. Always resize first.</li>
            <li><strong>Over-compressing below quality 70.</strong> Banding and text softening become visible. Quality 80 is the safe floor.</li>
            <li><strong>Using PNG for photographs.</strong> PNG is lossless and much larger for photos. Use JPG or WebP.</li>
            <li><strong>Not serving responsive images.</strong> If you serve a 1920px image to a phone that displays it at 400px, you are wasting 80% of the bandwidth. Use <code>&lt;img srcset&gt;</code> or a framework image component.</li>
            <li><strong>Trusting automatic compression on upload.</strong> Most CMS auto-compression is too aggressive (quality 60-70). Do your own compression first at quality 80.</li>
          </ul>
        `,
      },
    ],
    faq: [
      {
        question: "How much can I realistically reduce my website's image weight?",
        answer:
          "For a typical stock photo library, 70-90% reduction is common. A 4 MB phone photo becomes 180-400 KB after resize + compress + WebP conversion. The exact number depends on the source (camera output vs pre-compressed) and target (1:1 display vs 4K retina).",
      },
      {
        question: "Should I use WebP or AVIF?",
        answer:
          "AVIF is 20-30% smaller than WebP at equivalent quality, but encoding is 10-50x slower and older Safari versions (pre-16) cannot render it. For most sites in 2026, WebP is the pragmatic choice. If you can serve AVIF with a WebP fallback via the picture element, AVIF is worth the effort.",
      },
      {
        question: "My source image is already a small JPG. Can I compress it further?",
        answer:
          "Compressing an already-compressed JPG usually produces a slightly larger file. The compressor re-applies standard quantization, which fights the existing compression artifacts. Start from the original source file (camera export, stock photo download) whenever possible.",
      },
      {
        question: "Does compressing images hurt SEO?",
        answer:
          "The opposite. Image weight is the largest contributor to Largest Contentful Paint (LCP), one of Google's Core Web Vitals. Compressed images load faster, which improves LCP and therefore page experience signals. All else being equal, a faster site ranks higher.",
      },
    ],
  },
  {
    slug: "reduce-pdf-size-for-email",
    title: "Reduce PDF size for email — a practical workflow",
    titleBn: "ইমেইলের জন্য PDF সাইজ কমানোর বাস্তব পদ্ধতি",
    excerpt:
      "Get any PDF under 20 MB without ruining readability. Covers image compression, DPI reduction, splitting, and when to use a cloud link instead.",
    excerptBn:
      "যেকোনো PDF ২০ MB-র নিচে নামান, পড়ার যোগ্যতা ঠিক রেখে। ইমেজ কমপ্রেশন, DPI কমানো, স্প্লিটিং সহ।",
    emoji: "📧",
    category: "PDF workflows",
    readTime: 7,
    publishedAt: "2026-10-16",
    authorId: "mohammad-ahad",
    relatedTools: ["merge-pdf", "split-pdf", "pdf-to-image"],
    sections: [
      {
        heading: "Why your PDF is 50 MB in the first place",
        body: `
          <p>PDFs grow large for one of three reasons, and the fix is different for each:</p>
          <ul>
            <li><strong>Embedded high-resolution images.</strong> Every page of a scanned document, magazine, or photo book can embed a 5-15 MB image. A 50-page scanned report easily reaches 100 MB.</li>
            <li><strong>Embedded fonts.</strong> A PDF that uses 20 different fonts includes the full font file for each one. This adds up to 2-10 MB per document, usually for a handful of headings.</li>
            <li><strong>Redundant metadata and revision history.</strong> PDFs edited in InDesign or Acrobat retain hidden data that no reader will ever display — but that still contributes to file size.</li>
          </ul>
          <p>The email provider limit is usually 20-25 MB. So the practical goal is: get under 20 MB <em>without</em> making the document unreadable.</p>
        `,
      },
      {
        heading: "The three levers you can pull",
        body: `
          <p>In order of impact:</p>
          <ol>
            <li><strong>Compress the images inside the PDF.</strong> Convert from full-color 300 DPI to grayscale 150 DPI. This alone typically cuts file size by 80-90% for scanned documents. For photos in brochures, converting at quality 80 typically saves 60-80%.</li>
            <li><strong>Downsample the resolution.</strong> Going from 300 DPI to 150 DPI halves the pixel count and typically halves the file size. For on-screen viewing, 150 DPI is indistinguishable from 300 DPI.</li>
            <li><strong>Remove unused objects.</strong> Fonts, images, and metadata that are no longer referenced but still stored in the file.</li>
          </ol>
          <p>Applying all three to a 45 MB scanned PDF typically produces a 3-5 MB output — under the email limit, still perfectly readable.</p>
        `,
      },
      {
        heading: "Target sizes by email provider",
        body: `
          <table>
            <thead><tr><th>Provider</th><th>Send limit</th><th>Safe target</th></tr></thead>
            <tbody>
              <tr><td>Gmail</td><td>25 MB</td><td>18 MB (leave margin for MIME overhead)</td></tr>
              <tr><td>Outlook / Hotmail</td><td>20 MB</td><td>15 MB</td></tr>
              <tr><td>Yahoo Mail</td><td>25 MB</td><td>18 MB</td></tr>
              <tr><td>Apple iCloud Mail</td><td>20 MB</td><td>15 MB</td></tr>
              <tr><td>Proton Mail</td><td>25 MB</td><td>18 MB</td></tr>
            </tbody>
          </table>
          <p>Base64 encoding of attachments adds roughly 33% to the raw file size. So a 20 MB PDF travels as ~26 MB on the wire. Aim for a raw PDF under 15 MB for maximum provider compatibility.</p>
        `,
      },
      {
        heading: "Step-by-step workflow",
        body: `
          <p>For most PDFs, this workflow gets the file under the limit in under 5 minutes:</p>
          <ol>
            <li><strong>Check the current size.</strong> Right-click the file → properties. If under 15 MB, no compression needed.</li>
            <li><strong>If over 15 MB, compress the images first.</strong> Open the PDF in a compression tool, choose 150 DPI (or quality 80 for already-raster PDFs), and save.</li>
            <li><strong>Check the result.</strong> If still over 15 MB, split the PDF into two halves using <a href="/tools/split-pdf">Split PDF</a> and email each separately.</li>
            <li><strong>Or convert to images and recombine.</strong> For photo-heavy PDFs that will not compress enough, extract the pages to JPG using <a href="/tools/pdf-to-image">PDF to Image</a>, compress those images, and rebuild the PDF.</li>
          </ol>
        `,
      },
      {
        heading: "When the PDF cannot be compressed enough",
        body: `
          <p>Sometimes no amount of compression brings a PDF under 20 MB. This happens with:</p>
          <ul>
            <li><strong>CAD drawings and complex vector blueprints.</strong> Vector content does not compress like raster images.</li>
            <li><strong>Portfolios with hundreds of high-resolution design mockups.</strong> Each page needs to remain sharp enough to evaluate.</li>
            <li><strong>Signed contracts with embedded certificates.</strong> Compressing will invalidate the signature.</li>
          </ul>
          <p>For these cases, do not fight the size limit. Use a cloud link instead: upload to Google Drive, Dropbox, or WeTransfer, and paste the share link into the email. Most providers allow up to 10-15 GB via links. The recipient gets the full-quality file without any compression.</p>
        `,
      },
      {
        heading: "Verification checklist before sending",
        body: `
          <ul>
            <li><strong>Open the compressed PDF in a reader.</strong> Scroll through every page — confirm all text is still readable, images are not blurry, and no page is blank.</li>
            <li><strong>Check the file size.</strong> It should now be under your target (usually 15 MB).</li>
            <li><strong>Check signatures.</strong> If the original was digitally signed, the signature is broken by compression. Warn the recipient if this matters.</li>
            <li><strong>Check fonts.</strong> In some compression pipelines, embedded fonts get stripped and replaced with system defaults. Verify the PDF still looks correct on a different device.</li>
            <li><strong>Send a test to yourself first.</strong> Open the PDF in the recipient's email client to confirm nothing breaks.</li>
          </ul>
        `,
      },
    ],
    faq: [
      {
        question: "How much can I compress a scanned PDF without losing readability?",
        answer:
          "A 300 DPI full-color scan can be reduced to 150 DPI grayscale and remains perfectly readable on screen. File size typically drops by 90-95%. Text stays sharp; color photos look slightly muted (which is fine for documents). Below 100 DPI, small text becomes hard to read.",
      },
      {
        question: "Does compressing a PDF invalidate a digital signature?",
        answer:
          "Yes. Any change to the PDF bytes — including compression — invalidates the cryptographic signature. If you need a signed compressed PDF, compress the source first, then sign it. Never compress an already-signed document that needs to remain signed.",
      },
      {
        question: "Should I split the PDF or compress it?",
        answer:
          "Compress first. A 50 MB PDF compressed at 150 DPI often becomes 3-5 MB — under any email limit. Splitting is the fallback when compression alone is not enough, or when the recipient only needs part of the document.",
      },
      {
        question: "What is the difference between PDF/A and regular PDF compression?",
        answer:
          "PDF/A is an archival standard that requires all fonts to be embedded and forbids encryption. Compressing a PDF/A file usually breaks the PDF/A certification. If you need to maintain PDF/A compliance, use a dedicated PDF/A tool, not a general compressor.",
      },
    ],
  },
  {
    slug: "create-print-ready-business-card",
    title: "Create a print-ready business card — specs and workflow",
    titleBn: "প্রিন্ট-রেডি বিজনেস কার্ড তৈরির সঠিক পদ্ধতি",
    excerpt:
      "The exact file specifications a print shop expects: trim size, bleed, safe margin, DPI, colour space, and paper stock.",
    excerptBn:
      "প্রিন্ট শপ যে ফাইল স্পেসিফিকেশন আশা করে: সাইজ, ব্লিড, মার্জিন, DPI, কালার স্পেস এবং পেপার স্টক।",
    emoji: "🎴",
    category: "Design workflows",
    readTime: 6,
    publishedAt: "2026-10-16",
    authorId: "mohammad-ahad",
    relatedTools: ["visiting-card", "image-cropper"],
    sections: [
      {
        heading: "The three dimensions a print shop actually cares about",
        body: `
          <p>Most business card files fail at the print shop because the designer confused trim size with file size. Three dimensions matter:</p>
          <ul>
            <li><strong>Trim size</strong> — the finished card after cutting. European standard is 85 × 55 mm. US standard is 88.9 × 50.8 mm (3.5 × 2.0 inches).</li>
            <li><strong>Bleed</strong> — 3 mm (0.125") added on every side so the background colour extends past the trim line. Without bleed, a 1 mm cutting error leaves a visible white border on one edge.</li>
            <li><strong>Safe margin</strong> — 4 mm (0.16") inside the trim line where no text or logos should sit. Cutting is done in stacks of 100+ cards, and the edge position varies slightly card to card.</li>
          </ul>
          <p>So the actual working canvas for a European card is 91 × 61 mm (trim + 3 mm bleed on each side), with all content within the inner 77 × 47 mm safe zone.</p>
        `,
      },
      {
        heading: "RGB vs CMYK — the colour trap",
        body: `
          <p>Your screen displays colour in RGB (additive light). Print uses CMYK (subtractive ink). Some colours that look vivid on screen simply cannot be reproduced in CMYK ink:</p>
          <ul>
            <li><strong>Bright neon blues and greens</strong> — CMYK cannot hit the saturation. The printed result looks noticeably duller.</li>
            <li><strong>RGB blacks</strong> — if you use pure RGB black (#000000) in a large area, print shops will need a "rich black" recipe (cyan + magenta + yellow + black) to avoid a washed-out grey look. Specify this if you care.</li>
            <li><strong>Fine gradients</strong> — RGB gradients can band in CMYK if the print resolution is low.</li>
          </ul>
          <p>The practical fix: pick colours that already look slightly muted on screen. Deep maroon, forest green, and navy all print beautifully. Neon anything does not.</p>
        `,
      },
      {
        heading: "Resolution — why 72 DPI fails",
        body: `
          <p>Screens display at 72-144 DPI. Print shops need 300 DPI minimum, 600 DPI for premium finishes. A 85 × 55 mm card at 300 DPI is <strong>1004 × 650 pixels</strong>. At 600 DPI it is <strong>2008 × 1300 pixels</strong>.</p>
          <p>Exporting at 72 DPI means the print shop has to upscale your file by 4x, and the result is visibly soft. Text edges become fuzzy. Logos lose their sharpness. This is the single most common reason business cards look cheap despite good design.</p>
          <p><a href="/tools/visiting-card">Visiting Card Maker</a> exports at 150, 300, or 600 DPI at the exact print size. Always use 300 DPI minimum.</p>
        `,
      },
      {
        heading: "Paper stock — the invisible design decision",
        body: `
          <p>The paper choice affects the perceived quality of the card more than any design choice. The three options:</p>
          <ul>
            <li><strong>350 gsm matte</strong> — the industry standard. Substantial feel, holds detail well, works for almost any design. Safest default.</li>
            <li><strong>300 gsm textured / linen</strong> — adds tactile interest. Text can look slightly softer because the paper has surface texture. Best for creative professionals.</li>
            <li><strong>600 gsm cotton or duplex</strong> — thick and luxurious. Significantly more expensive. Reserved for invitations or premium introductions.</li>
          </ul>
          <p>Ask your print shop for a sample pack. Feeling three stocks in person settles the choice in 30 seconds — no amount of online research replaces that.</p>
        `,
      },
      {
        heading: "The complete file delivery checklist",
        body: `
          <p>Before handing a file to your print shop, verify:</p>
          <ul>
            <li><strong>Format:</strong> PDF with embedded fonts, not JPG or PNG. PDF preserves vectors and text.</li>
            <li><strong>Dimensions:</strong> include the bleed. A 85 × 55 mm card file should be 91 × 61 mm.</li>
            <li><strong>Resolution:</strong> 300 DPI minimum at the final size.</li>
            <li><strong>Colour space:</strong> CMYK, not RGB. Ask the print shop if they handle the conversion themselves.</li>
            <li><strong>Crop marks:</strong> include them. Print shops expect them.</li>
            <li><strong>Fonts:</strong> embedded, not referenced. PDF with embedded fonts makes this automatic.</li>
            <li><strong>Front and back:</strong> as separate pages in one PDF, or two files. Ask the print shop which they prefer.</li>
          </ul>
        `,
      },
      {
        heading: "Verification before ordering",
        body: `
          <p>Before ordering 500 cards, do three things:</p>
          <ol>
            <li><strong>Print one copy at home</strong> on plain paper at 100% scale. This confirms layout, colour, and text sizing.</li>
            <li><strong>View the PDF on a phone.</strong> Many print shops also deliver digitally — check that the phone view is legible. Phone numbers at 6 pt in a dark colour fail on a small screen.</li>
            <li><strong>Order a single proof</strong> from the print shop. Real paper, real ink. This catches colour shifts you cannot see on screen and any bleed that was set up incorrectly.</li>
          </ol>
        `,
      },
    ],
    faq: [
      {
        question: "What size is a business card in pixels?",
        answer:
          "At 300 DPI, a European 85 × 55 mm card is 1004 × 650 pixels. A US 3.5 × 2.0 inch card is 1050 × 600 pixels. At 600 DPI, double those numbers. Include bleed — the file canvas should be 91 × 61 mm (or 3.625 × 2.125 inches for US) at 300 DPI.",
      },
      {
        question: "Do I need to include bleed in my file?",
        answer:
          "Yes, if the design has any colour, image, or pattern extending to the edge. The 3 mm bleed is what the print shop trims off. Without it, a tiny cutting error leaves a white border on one edge. Add bleed to the canvas, extend the background into it, and keep all text well inside the safe zone.",
      },
      {
        question: "CMYK or RGB — which should I submit?",
        answer:
          "Submit CMYK if you have a proper design tool that converts cleanly. If you are exporting from a browser-based tool that only outputs RGB, tell the print shop — most will do the CMYK conversion themselves but warn you that bright colours may shift. Deep, muted colours are safer than saturated ones.",
      },
      {
        question: "How many cards should I order?",
        answer:
          "For a first design, order 100-250. This keeps the upfront cost low and lets you live with the design for a few months before committing to 500+. Once you are sure the design works and the print quality is good, reorder in bulk for the discount.",
      },
    ],
  },
  {
    slug: "create-ats-friendly-cv",
    title: "Create an ATS-friendly CV — the technical checklist",
    titleBn: "ATS-ফ্রেন্ডলি CV তৈরির কারিগরি চেকলিস্ট",
    excerpt:
      "Most CVs are rejected by software before a human sees them. Here is exactly what the ATS parses, what breaks it, and how to format for both humans and machines.",
    excerptBn:
      "বেশিরভাগ CV মানুষ দেখার আগেই সফটওয়্যার রিজেক্ট করে। ATS কী পড়ে, কী ব্রেক করে — সব বিস্তারিত।",
    emoji: "📄",
    category: "Career workflows",
    readTime: 7,
    publishedAt: "2026-10-16",
    authorId: "mohammad-ahad",
    relatedTools: ["cv-builder", "image-compressor"],
    sections: [
      {
        heading: "What ATS software actually does",
        body: `
          <p>An Applicant Tracking System (ATS) is not an AI that "reads" your CV. It is a parser. It extracts plain text from your PDF, then matches that text against keywords, section headings, and date patterns from the job description.</p>
          <p>What the ATS extracts cleanly:</p>
          <ul>
            <li>Text in reading order — as long as the layout is single-column</li>
            <li>Standard section headings (Experience, Education, Skills)</li>
            <li>Dates in recognisable formats (Jan 2020 – Mar 2023)</li>
            <li>Job titles and company names</li>
            <li>Contact information — email, phone, LinkedIn URL</li>
          </ul>
          <p>What breaks the parser:</p>
          <ul>
            <li>Two-column layouts — columns get interleaved in the wrong order</li>
            <li>Tables — cell content becomes separate lines out of context</li>
            <li>Icons in place of text — the phone icon renders but the number is invisible to the parser</li>
            <li>Photos — treated as graphics and ignored</li>
            <li>Creative headings — "My Journey" instead of "Experience"</li>
            <li>Text embedded inside images or SVG</li>
          </ul>
        `,
      },
      {
        heading: "The formatting rules that matter",
        body: `
          <ul>
            <li><strong>Single-column layout.</strong> Non-negotiable. Every two-column CV we tested failed at least one of the three major ATS platforms.</li>
            <li><strong>Standard headings.</strong> Experience (not "Career History", "Professional Background", or "Where I Have Worked"). Education (not "Academic Journey"). Skills (not "Toolkit").</li>
            <li><strong>Selectable text PDF.</strong> Do not export as an image. Do not use PDF-to-image. The whole point of PDF is that the text stays text.</li>
            <li><strong>Standard fonts.</strong> Arial, Calibri, Helvetica, Georgia, Times New Roman. Creative fonts are parsed unreliably.</li>
            <li><strong>No tables.</strong> Table content is stored as separate text nodes. The parser cannot tell that "Google" and "2019-2021" belonged to the same row.</li>
            <li><strong>File name:</strong> FirstName-LastName-CV.pdf. Many ATS systems use the filename as a fallback identifier if parsing fails.</li>
          </ul>
        `,
      },
      {
        heading: "Content — the impact rule",
        body: `
          <p>Formatting gets you past the ATS. Content gets you past the human. The single change that dramatically improves interview rates is replacing responsibilities with impacts.</p>
          <table>
            <thead><tr><th>Weak (responsibility)</th><th>Strong (impact)</th></tr></thead>
            <tbody>
              <tr><td>Responsible for social media</td><td>Grew Instagram from 2K to 45K followers in 8 months</td></tr>
              <tr><td>Managed customer support</td><td>Reduced ticket resolution time from 4h to 45min</td></tr>
              <tr><td>Worked on the website</td><td>Redesigned checkout, increasing conversion by 23%</td></tr>
              <tr><td>Handled data entry</td><td>Automated 40% of manual data entry with a Python script</td></tr>
            </tbody>
          </table>
          <p>The pattern: verb + specific outcome + measurable number. When you do not have exact numbers, use approximates ("roughly doubled", "cut by half") — the structure still works.</p>
        `,
      },
      {
        heading: "Length and structure by experience",
        body: `
          <ul>
            <li><strong>0-5 years:</strong> 1 page. No exceptions.</li>
            <li><strong>5-10 years:</strong> 1 page strongly preferred. 2 pages only if the second page adds specific projects or metrics.</li>
            <li><strong>10+ years / senior IC:</strong> 2 pages acceptable.</li>
            <li><strong>Academic CV:</strong> different document type entirely. 4-20 pages for publications, grants, teaching.</li>
          </ul>
          <p>Never pad. A dense one-page CV beats a padded two-page CV every time. If you cannot fit everything, cut the least relevant entries — not the depth of the relevant ones.</p>
        `,
      },
      {
        heading: "Testing your CV before applying",
        body: `
          <p>You can verify ATS readability yourself, without any special tools:</p>
          <ol>
            <li><strong>Open the PDF in a text editor.</strong> macOS Preview, Windows Notepad, or an online PDF-to-text tool. If you can select and copy the text cleanly, the ATS can read it too.</li>
            <li><strong>Paste the copied text into a plain document.</strong> Does the structure still make sense? Are the section headings intact? Are job titles and dates adjacent?</li>
            <li><strong>Check the reading order.</strong> In a two-column layout, the pasted text often interleaves the left and right columns. If it does, the ATS sees the same mess.</li>
            <li><strong>Search for contact info.</strong> Ctrl+F for your email and phone number. They should be findable in the extracted text, not stuck inside an image or icon.</li>
          </ol>
        `,
      },
      {
        heading: "Common mistakes to avoid",
        body: `
          <ul>
            <li><strong>Using a photo.</strong> Most corporate CVs should not include a photo. Some jurisdictions require one; check the local norm.</li>
            <li><strong>Including an "Objective" statement.</strong> Replaced by a professional summary — specific, 2-4 lines, mentions the role you are targeting.</li>
            <li><strong>Listing references.</strong> Recruiters ask when they need them. Saves space.</li>
            <li><strong>Burying the summary.</strong> It is the second thing read after your name. Put it at the top, not on page 2.</li>
            <li><strong>Unexplained employment gaps.</strong> Address them briefly — "Parental leave 2021-2022", "Sabbatical 2020". Silence is worse than a short explanation.</li>
            <li><strong>Submitting as .docx.</strong> Always PDF. .docx rendering varies across machines and often breaks the layout.</li>
          </ul>
        `,
      },
    ],
    faq: [
      {
        question: "Is a two-column CV really rejected by ATS?",
        answer:
          "Not always rejected outright, but often mis-parsed. The parser reads left-to-right across both columns, interleaving the content. If your left column has dates and your right column has job titles, the extracted text mixes them into an unusable sequence. Single-column is safer.",
      },
      {
        question: "What is the best CV format for ATS?",
        answer:
          "Single-column PDF with embedded fonts, standard section headings (Experience, Education, Skills), selectable text, no tables, no images, no graphics, no icons. Exported through the browser print pipeline or a design tool's PDF export.",
      },
      {
        question: "Will a photo get my CV rejected?",
        answer:
          "The photo itself will not get you rejected, but the space it takes up is often better used for content. More importantly, a photo may trigger unconscious bias — some jurisdictions (including the UK and US) actively discourage it. Unless the local market expects it, skip the photo.",
      },
      {
        question: "How many keywords should I include from the job description?",
        answer:
          "Match the specific technical keywords — the exact job titles, tool names, and skill names in the posting. Do not keyword-stuff. If the ATS scoring system is well-designed, stuffing lowers the score. If it is naive, the human reviewer will notice.",
      },
    ],
  },
];

export const guideCategories = ["All", "Performance", "PDF workflows", "Design workflows", "Career workflows"];

export function getGuideBySlug(slug: string): Guide | undefined {
  return guides.find((g) => g.slug === slug);
}
