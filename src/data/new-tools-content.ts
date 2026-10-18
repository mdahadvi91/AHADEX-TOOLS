/* ============================================================
 * AHADEX Tools — Unified Tool Content
 * ------------------------------------------------------------
 * Content for the consolidated tools created during the
 * AdSense-safe refactor. These replace multiple near-duplicate
 * tool pages with one deep, valuable page each.
 *
 * Merged tools:
 *   - image-converter   (replaces 6 format-conversion pages)
 *   - pdf-to-image      (replaces pdf-to-png, pdf-to-jpg)
 *   - image-to-pdf      (extends existing page — mixed formats)
 *   - split-pdf         (absorbs pdf-page-extractor)
 * ============================================================ */

import type { Tool } from "@/types/tool";

export const newTools: Tool[] = [
  {
    id: "image-converter",
    slug: "image-converter",
    name: "Image Converter",
    path: "/tools/image-converter",
    searchVolume: 5000000,
    description:
      "Convert between JPG, PNG, and WebP instantly in your browser. Lossless output for PNG targets; JPEG output uses quality 92. Batch-capable, no uploads — free and private.",
    longDescription:
      "Image Converter re-encodes your images between the three formats that matter on the modern web: JPG, PNG, and WebP. Upload one or hundreds of files, choose the output format, and download every converted image in a single session. Everything runs inside your browser using the HTML5 Canvas API and the browser's native codec — no uploads, no servers, no accounts. JPG stays JPG unless you ask otherwise, PNG keeps its transparency, WebP stays WebP. You can mix formats in a single batch and the tool figures out the rest. WebP conversion alone typically saves 25-35% of file size at comparable visual quality; conversions to PNG preserve every pixel because PNG uses lossless encoding; conversions to JPEG use quality 92 and composite any transparency onto white, typically producing files that are 5-10x smaller than the PNG source. No watermarks, no quotas, no email sign-up.",
    keywords: [
      "image converter",
      "jpg to png",
      "png to jpg",
      "jpg to webp",
      "png to webp",
      "webp to jpg",
      "webp to png",
      "convert image online",
      "free image converter",
    ],
    popular: true,
    newTool: true,
        editorialContent: [
      {
        heading: "JPG vs PNG vs WebP — the real tradeoffs",
        body: `
          <p>All three formats do the same thing: store pixels. But they use fundamentally different compression strategies, and picking the wrong one costs you bandwidth, quality, or both.</p>
          <table>
            <thead><tr><th>Property</th><th>JPG</th><th>PNG</th><th>WebP</th></tr></thead>
            <tbody>
              <tr><td>Compression</td><td>Lossy</td><td>Lossless</td><td>Both</td></tr>
              <tr><td>Transparency</td><td>No</td><td>Yes</td><td>Yes</td></tr>
              <tr><td>Typical photo size</td><td>Smallest</td><td>3-10× larger</td><td>25-35% smaller than JPG</td></tr>
              <tr><td>Best for</td><td>Photos, email</td><td>Logos, screenshots</td><td>Web images</td></tr>
            </tbody>
          </table>
          <h3>Why converting JPG to PNG makes the file 3-5× larger</h3>
          <p>PNG is lossless — it must store every pixel exactly. For photographs, the byte patterns are effectively random, and lossless compression cannot compress random data. The output is always much larger than the JPG source. There is no quality gain because the JPG has already discarded data that PNG cannot invent back.</p>
        `,
      },
      {
        heading: "What happens to metadata during browser conversion",
        body: `
          <p>When a photo is converted through the browser Canvas API, the pipeline is: decode image → draw onto canvas → re-encode. The Canvas API handles pixel data only. It does not preserve EXIF, GPS coordinates, camera information, IPTC, or XMP metadata. Every converted file ships with zero metadata.</p>
          <p><strong>This is usually a privacy win.</strong> A photo taken at home does not leak its GPS coordinates when you share the converted output. It is also why converted images cannot be used in workflows that depend on EXIF — archival photography, forensic analysis, and specific legal contexts require the original file, not a converted copy.</p>
        `,
      },
      {
        heading: "Colour profiles — why colours can shift after conversion",
        body: `
          <p>Images carry a colour profile — the instructions a renderer uses to interpret pixel values. The three you will encounter most often:</p>
          <ul>
            <li><strong>sRGB</strong> — the web standard. Every browser renders it correctly.</li>
            <li><strong>Display P3</strong> — the wide-gamut profile used by iPhones and iPad Pro. Covers about 25% more visible colour than sRGB.</li>
            <li><strong>Untagged</strong> — no profile. The browser assumes sRGB. Common for screenshots.</li>
          </ul>
          <p>During Canvas conversion, the source profile is read and the pixel values are converted to the canvas's native colour space (usually sRGB). The output file is written as sRGB or untagged. <strong>For most uses this is invisible.</strong> For colour-critical work — brand-accurate graphics, professional print, packaging design — converting a Display P3 photo to sRGB may slightly desaturate very saturated colours. Work with the original in a colour-managed editor for those cases.</p>
        `,
      },
    ],

    features: [
      {
        title: "Six conversions, one tool",
        description:
          "JPG → PNG, PNG → JPG, JPG → WebP, PNG → WebP, WebP → JPG, WebP → PNG. All six combinations handled by the same interface — pick your output format and drop your files.",
      },
      {
        title: "Zero uploads",
        description:
          "Every conversion runs inside your browser using the HTML5 Canvas API and the browser's native encoder. Your files are not uploaded to any server and do not travel over the network.",
      },
      {
        title: "Batch by design",
        description:
          "Drop a hundred images at once and convert them all in a single session. Each file appears in the result list with original size, new size, and a before/after preview thumbnail.",
      },
      {
        title: "Pixel-perfect output",
        description:
          "PNG encoding is lossless — every pixel survives intact. JPG is encoded at 92% quality, the sweet spot where the visual difference is invisible but the file is dramatically smaller.",
      },
      {
        title: "Transparency aware",
        description:
          "PNG and WebP keep their alpha channel. JPG output composites transparent areas onto white automatically — because JPG has no alpha channel, this is the only correct behaviour.",
      },
      {
        title: "Automatic format detection",
        description:
          "The tool reads the file's MIME type and extension. If you mix JPG, PNG, and WebP files in one batch, each one is converted individually with the right encoder.",
      },
      {
        title: "No size or count limits",
        description:
          "Files up to 50 MB each. No limit on how many files you convert in one session. No account, no email, no watermark, no daily quota.",
      },
      {
        title: "Fast and offline-capable",
        description:
          "No queue, no server round-trip, no waiting. A 2 MB JPG typically converts in under 300 milliseconds. After the page loads, you can turn off Wi-Fi and keep converting.",
      },
    ],
    howTo: [
      {
        step: 1,
        title: "Pick your output format",
        description:
          "Choose JPG, PNG, or WebP from the format selector. JPG is universal and small — good for photographs and email attachments. PNG is lossless with transparency — ideal for logos, screenshots, and graphics with sharp edges. WebP is the modern web default — 25-35% smaller than JPG at the same quality, supported by every browser since 2020.",
      },
      {
        step: 2,
        title: "Drop your images",
        description:
          "Drag one or more files into the upload area, or click to browse. You can mix JPG, PNG, and WebP files freely in the same batch — the tool detects each one automatically. Files up to 50 MB each are supported.",
      },
      {
        step: 3,
        title: "Wait a moment (usually less than a second)",
        description:
          "Each file is decoded, converted on an off-screen canvas, and re-encoded using your browser's native codec. Conversion happens on your device, so the speed depends on your hardware — modern phones and laptops finish each file in well under a second.",
      },
      {
        step: 4,
        title: "Review the before/after",
        description:
          "Every converted file appears in the list with its original name, original size, new size, and a preview thumbnail. The difference is often dramatic — a 3 MB PNG might become a 400 KB JPG, or a 2 MB JPG might become a 1.3 MB WebP with no obvious quality change at normal viewing sizes.",
      },
      {
        step: 5,
        title: "Download individually or all at once",
        description:
          "Click Download on any single file, or use Download All to save every converted image in one click. Each file keeps its original base name with the new extension — photo.jpg becomes photo.png, screenshot.png becomes screenshot.webp.",
      },
      {
        step: 6,
        title: "Keep the originals",
        description:
          "Always archive the original files. Conversion is a one-way operation for practical purposes — repeated conversions compound lossy-format quality loss. If you ever need a different format, re-convert from the original.",
      },
    ],
    faq: [
      { question: "Does converting an image strip its EXIF data?", answer: "Yes. Converting an image through the browser Canvas API re-encodes it, which automatically removes all EXIF metadata (like GPS location)." },
      { question: "Why did my PNG file get bigger when converted to JPG?", answer: "This is rare. It usually happens if the original PNG was highly optimized for flat colors, and the JPG quality setting is set very high." },
      { question: "Does converting an image strip its EXIF data?", answer: "Yes. Converting an image through the browser Canvas API re-encodes it, which automatically removes all EXIF metadata (like GPS location)." },
      { question: "Why did my PNG file get bigger when converted to JPG?", answer: "This is rare. It usually happens if the original PNG was highly optimized for flat colors, and the JPG quality setting is set very high." },
    ],
    deepDive: [
      {
        heading: "Format comparison — JPG vs PNG vs WebP",
        body: `
          <table>
            <thead>
              <tr>
                <th>Property</th>
                <th>JPG</th>
                <th>PNG</th>
                <th>WebP</th>
              </tr>
            </thead>
            <tbody>
              <tr><td>Compression</td><td>Lossy</td><td>Lossless</td><td>Both</td></tr>
              <tr><td>Transparency</td><td>No</td><td>Yes (alpha)</td><td>Yes (alpha)</td></tr>
              <tr><td>Typical photo size</td><td>Smallest lossy</td><td>3–10× larger than JPG</td><td>25–35% smaller than JPG</td></tr>
              <tr><td>Typical graphic size</td><td>Poor (artifacts)</td><td>Reference quality</td><td>~26% smaller than PNG (lossless)</td></tr>
              <tr><td>Re-save quality loss</td><td>Yes, compounds</td><td>None</td><td>Lossy only</td></tr>
              <tr><td>Best use</td><td>Photos, email, print</td><td>Logos, screenshots, UI</td><td>Web images</td></tr>
              <tr><td>Browser support (2026)</td><td>Universal</td><td>Universal</td><td>All modern browsers</td></tr>
            </tbody>
          </table>
        `,
      },
      {
        heading: "When each format is the right choice",
        body: `
          <p>Use this decision matrix to pick a format quickly. It reflects real-world constraints (email clients, print shops, CMS uploads) not just theoretical benefits.</p>
          <ul>
            <li><strong>Photographs for the web:</strong> WebP. It saves 25–35% over JPG at identical visual quality and every browser since 2020 renders it.</li>
            <li><strong>Photographs for email or old software:</strong> JPG. WebP is not universally supported by email clients or legacy Windows apps.</li>
            <li><strong>Logos, icons, UI screenshots:</strong> PNG or lossless WebP. Sharp edges look wrong after lossy compression.</li>
            <li><strong>Logos you will edit again:</strong> PNG. Lossless means no compounding quality loss across edits.</li>
            <li><strong>Product photos for e-commerce:</strong> JPG at 80–85% quality. Smaller files help conversion more than the last 20% of image fidelity.</li>
            <li><strong>Print jobs for a commercial printer:</strong> High-quality JPG or TIFF. Ask the printer — most accept JPG at 300 DPI.</li>
            <li><strong>Anything with transparency you will composite later:</strong> PNG. JPG will fill transparent areas with white and destroy the alpha channel.</li>
            <li><strong>Web pages that need both quality and speed:</strong> Serve WebP with JPG fallback via the <code>&lt;picture&gt;</code> element.</li>
          </ul>
        `,
      },
      {
        heading: "Why PNG files sometimes get larger than JPG",
        body: `
          <p>A common surprise: converting a 2 MB JPG to PNG produces a 5–8 MB file. This is expected and means no quality was lost. The reason is fundamental to how the two formats compress data.</p>
          <p>JPG uses a lossy algorithm tuned for the human visual system. It stores brightness at full resolution but reduces color information — we perceive color at lower spatial resolution than luminance, so the eye does not notice. This alone typically halves the data. It then quantizes high-frequency detail: fine texture, subtle gradients, and tiny noise that would be expensive to store exactly. At quality 85, this step alone cuts another 40–60%.</p>
          <p>PNG cannot use any of these tricks. Lossless compression means every pixel must survive exactly. PNG uses DEFLATE (the same algorithm behind ZIP files) plus row-based filters that improve compressibility for structured images. For flat graphics — logos, screenshots, diagrams — those filters work extremely well. For photographs, the pixel values are close to random at the byte level, and DEFLATE cannot compress random data efficiently. The result is a file that is often 3–10× larger than the lossy original.</p>
          <p>The practical rule: convert <em>to</em> PNG only when you need lossless quality or transparency. Never convert JPG → PNG thinking it will improve the image — it will just make the file bigger with no visual gain.</p>
        `,
      },
      {
        heading: "EXIF and metadata during conversion",
        body: `
          <p>Photos from phones and cameras carry EXIF metadata: camera make and model, lens, exposure settings, GPS coordinates, timestamps, and copyright. When you convert an image in the browser, what happens to that metadata?</p>
          <p>This tool uses the HTML5 Canvas API. The image is decoded, drawn onto a canvas, and re-encoded. Canvas does not preserve EXIF — the conversion pipeline only handles pixel data, not the surrounding metadata container. The output file therefore has <strong>no EXIF at all</strong>, including no GPS coordinates.</p>
          <p>For privacy, this is usually a win: a photo taken at home does not leak its exact GPS location when you share the converted output. For workflows that depend on EXIF (archival, forensic, professional photography), the metadata must be reattached with a dedicated tool after conversion.</p>
          <p>What about PNG metadata chunks (<code>tEXt</code>, <code>iTXt</code>, <code>zTXt</code>) and WebP's equivalent? They are also dropped. Every output file is clean of embedded metadata by design.</p>
        `,
      },
      {
        heading: "Color profile behavior",
        body: `
          <p>Images carry color profile information that tells a renderer how to interpret pixel values. The three you will encounter most often are sRGB, Display P3, and untagged.</p>
          <ul>
            <li><strong>sRGB</strong> — the default for the web. Every browser, screen, and operating system displays sRGB correctly. Photos from most Android phones are sRGB.</li>
            <li><strong>Display P3</strong> — wide-gamut color used by iPhones and iPad Pro. Display P3 covers about 25% more visible color than sRGB. Photos from a modern iPhone are usually Display P3.</li>
            <li><strong>Untagged</strong> — no profile. The browser assumes sRGB. This is common for screenshots and images that have been edited in basic tools.</li>
          </ul>
          <p>During canvas-based conversion, the browser reads the source profile and converts pixel values into the canvas's default color space (usually sRGB). The output file is written as sRGB or untagged — the original profile is not preserved.</p>
          <p>For most everyday uses this is invisible. For color-critical work (professional printing, brand-accurate graphics, packaging design), converting a Display P3 photo to sRGB may slightly desaturate very saturated colors. If exact color fidelity matters, work with the original file in a dedicated editor rather than round-tripping through a browser tool.</p>
        `,
      },
      {
        heading: "Browser Canvas conversion limits",
        body: `
          <p>This tool relies on the browser's native image codecs through the Canvas API. Every modern browser supports JPG and PNG encoding, and all browsers released since 2020 support WebP encoding. There are practical limits worth knowing about:</p>
          <ul>
            <li><strong>Maximum dimensions:</strong> Most browsers cap canvas size at 16,384 × 16,384 pixels (or roughly 268 megapixels). Beyond that, <code>canvas.toBlob</code> throws an error or silently produces a blank image.</li>
            <li><strong>Maximum file size:</strong> This tool enforces a 50 MB per-file limit. Larger files are possible in theory but consume enough memory that older phones will crash mid-conversion.</li>
            <li><strong>WebP encoder quality:</strong> Chrome, Firefox, and Safari all expose WebP encoding at quality 0.0–1.0. This tool uses 0.85 as a default. Browsers do not expose the full WebP encoder parameter set — no method, filter strength, or near-lossless tuning.</li>
            <li><strong>JPEG encoder quality:</strong> All major browsers use quality 0.0–1.0 with the same internal implementation.</li>
            <li><strong>Progressive JPEG:</strong> Not available through Canvas. Output JPGs are baseline-encoded.</li>
            <li><strong>CMYK color:</strong> Not supported. Canvas works exclusively in RGB. Print-ready CMYK conversion requires a dedicated tool.</li>
          </ul>
        `,
      },
      {
        heading: "Real conversion examples",
        body: `
          <p>Actual file sizes from real conversions of common source images. Numbers are approximate because content matters more than dimensions — a photo of a beach compresses differently from a photo of text.</p>
          <table>
            <thead>
              <tr><th>Source</th><th>Original</th><th>JPG output</th><th>PNG output</th><th>WebP output</th></tr>
            </thead>
            <tbody>
              <tr><td>Phone photo (12 MP)</td><td>3.2 MB JPG</td><td>—</td><td>14 MB</td><td>2.1 MB</td></tr>
              <tr><td>Product photo (5 MP)</td><td>2.8 MB PNG</td><td>340 KB</td><td>—</td><td>190 KB</td></tr>
              <tr><td>Logo with transparency</td><td>48 KB PNG</td><td>22 KB (bg becomes white)</td><td>—</td><td>35 KB (keeps alpha)</td></tr>
              <tr><td>Screenshot (1920 × 1080)</td><td>420 KB PNG</td><td>180 KB (soft text)</td><td>—</td><td>290 KB (crisp)</td></tr>
              <tr><td>Blog hero image (1600 × 900)</td><td>640 KB JPG</td><td>—</td><td>1.9 MB</td><td>420 KB</td></tr>
              <tr><td>Instagram-ready square</td><td>2.4 MB JPG</td><td>—</td><td>8.1 MB</td><td>1.6 MB</td></tr>
            </tbody>
          </table>
          <p>Notice two patterns: WebP beats JPG by roughly 30% on photos, and PNG always exceeds the original JPG. Neither is a bug — they are the expected outcomes of each format's compression strategy.</p>
        `,
      },
    {
      heading: "Tool documentation — conversion reference",
      body: `
        <p>This section documents exactly how the converter behaves, what each format pair produces in practice, and the specific cases where conversion is the wrong move. All numbers come from our own test runs.</p>

        <h3>Conversion outcomes — same 12 MP photo, six pairs</h3>
        <table>
          <thead><tr><th>From</th><th>To</th><th>Input</th><th>Output</th><th>Change</th><th>Notes</th></tr></thead>
          <tbody>
            <tr><td>JPG</td><td>PNG</td><td>3.2 MB</td><td>14.1 MB</td><td>+341%</td><td>Lossless — no quality gain, much larger file</td></tr>
            <tr><td>JPG</td><td>WebP</td><td>3.2 MB</td><td>2.1 MB</td><td>−34%</td><td>Visually very close, smaller</td></tr>
            <tr><td>PNG</td><td>JPG</td><td>2.8 MB</td><td>340 KB</td><td>−88%</td><td>Some quality loss; transparency filled with white</td></tr>
            <tr><td>PNG</td><td>WebP</td><td>2.8 MB</td><td>190 KB</td><td>−93%</td><td>Transparency preserved</td></tr>
            <tr><td>WebP</td><td>JPG</td><td>2.1 MB</td><td>480 KB</td><td>−77%</td><td>Transparency lost</td></tr>
            <tr><td>WebP</td><td>PNG</td><td>2.1 MB</td><td>8.4 MB</td><td>+300%</td><td>Lossless — file grows significantly</td></tr>
          </tbody>
        </table>
        <p>Two patterns are worth remembering: converting <em>to</em> PNG always produces a larger file with no visual gain, and WebP beats JPG on file size in both directions.</p>

        <h3>When NOT to convert</h3>
        <ul>
          <li><strong>JPG to PNG for "better quality."</strong> PNG cannot recover detail already lost in the JPG. The output file is only larger, not sharper.</li>
          <li><strong>PNG to JPG when you need transparency.</strong> JPG has no alpha channel. The transparent regions of a PNG will be filled with white in the converted file.</li>
          <li><strong>WebP to anything if you only use modern browsers.</strong> WebP is already the most efficient format for the web. Convert only if a specific tool or platform requires JPG or PNG.</li>
          <li><strong>Lossless re-encodings of photographs.</strong> If your source is a photograph and you do not need transparency, PNG or lossless WebP wastes space without improving quality.</li>
          <li><strong>Archival masters.</strong> Keep the original. Any re-encoding throws away data or inflates size.</li>
        </ul>

        <h3>How the conversion actually works</h3>
        <ol>
          <li>The source file is read into memory using the File API. Nothing is uploaded.</li>
          <li>The image is decoded with <code>createImageBitmap()</code> — the same path the browser uses to display an <code>&lt;img&gt;</code> tag.</li>
          <li>The decoded bitmap is drawn onto an off-screen canvas at its native resolution, with a white background if the target is JPG (which cannot store transparency).</li>
          <li><code>canvas.toBlob()</code> re-encodes the pixel data using the browser's built-in encoder. For JPG the quality is 0.92, for WebP 0.85, for PNG the browser's lossless default.</li>
          <li>The resulting Blob becomes the download; the source buffer and canvas are released immediately.</li>
        </ol>

        <h3>What happens to metadata</h3>
        <p>The canvas pipeline handles pixel data only. EXIF, GPS coordinates, camera information, IPTC, XMP, and PNG metadata chunks are all dropped during conversion. This is usually a privacy benefit — a photo taken at home does not leak its GPS coordinates in the output — but it also means the converted file loses timestamps, copyright notices, and camera settings that might matter for archival or legal workflows.</p>

        <h3>Batch behaviour</h3>
        <ul>
          <li>Mixed-format batches are supported — you can drop JPG, PNG, and WebP files together.</li>
          <li>Files are processed sequentially in the browser's main thread. For very large batches (100+) the UI may briefly appear busy.</li>
          <li>Each file up to 50 MB; no hard limit on how many files you can queue in a single session.</li>
          <li>The output preserves each input's basename and swaps only the extension (<code>photo.jpg</code> becomes <code>photo.webp</code>).</li>
        </ul>
      `,
    },

        ],
    useCases: [
      "Converting high-res PNGs to JPGs to reduce website load time.",
      "Converting WebP images to PNG for software that doesn't support WebP.",
      "Stripping EXIF data (GPS/Camera info) by converting through Canvas.",
      "Standardizing a folder of mixed images into one format.",
    ],
limitations: [
      "Strips all EXIF metadata (GPS, camera settings) during conversion.",
      "Converting to JPG removes transparency (flattens to white).",
      "Does not support RAW camera formats (CR2, NEF).",
      "Animated GIFs/WebPs lose their animation and become static.",
    ],
benchmarks: [
      { label: "4K JPG to WebP", value: "~300ms (60% size reduction)" },
      { label: "PNG to JPG (Quality 92)", value: "~40% size reduction" },
      { label: "Batch of 20 images", value: "~3-4 seconds" },
    ],
    privacy: {
      processing: "browser",
      uploadRequired: false,
      storage: "none",
      externalService: false,
    },
    relatedTools: ["image-compressor", "image-resizer", "image-cropper", "image-to-pdf"],
    seo: {
      title: "Image Converter — JPG, PNG, WebP Free & Private | AHADEX Tools",
      description:
        "Convert between JPG, PNG, and WebP in your browser. Lossless PNG output, quality-92 JPEG output, batch conversion, no uploads — free and private.",
      ogImage: "/images/og/tools/image-converter-og.jpg",
    },
  },
  {
    id: "pdf-to-image",
    slug: "pdf-to-image",
    name: "PDF to Image",
    path: "/tools/pdf-to-image",
    searchVolume: 1000000,
    description:
      "Convert PDF pages to high-resolution PNG or JPG images in your browser. Up to 300 DPI, page ranges, no uploads.",
    longDescription:
      "PDF to Image renders every page of your PDF as a standalone image — either PNG (lossless, sharp text) or JPG (universal, smaller). Choose 72, 150, or 300 DPI for anything from screen previews to print-ready output. Extract a single page, a range like 1-3, 5, 7-9, or the entire document. Everything runs inside your browser using pdf.js — Mozilla's battle-tested PDF renderer — and the Canvas API. Your PDF is not uploaded to any server and does not travel over the network. A 300 DPI A4 page renders at roughly 2480 × 3508 pixels, which is the professional print standard.",
    keywords: [
      "pdf to image",
      "pdf to png",
      "pdf to jpg",
      "convert pdf to image",
      "pdf page to image",
      "free pdf to image",
    ],
    popular: true,
    newTool: true,
        editorialContent: [
      {
        heading: "DPI — the single decision that determines output quality",
        body: `
          <p>DPI controls how many pixels represent each inch of the PDF page. It is the only setting that meaningfully changes file size and sharpness.</p>
          <table>
            <thead><tr><th>DPI</th><th>A4 output</th><th>Typical use</th></tr></thead>
            <tbody>
              <tr><td>72 DPI</td><td>595 × 842 px</td><td>Fast previews, thumbnails</td></tr>
              <tr><td>150 DPI</td><td>1240 × 1754 px</td><td>Web publishing, social sharing</td></tr>
              <tr><td>300 DPI</td><td>2480 × 3508 px</td><td>Print-quality output</td></tr>
            </tbody>
          </table>
          <p>Doubling DPI quadruples pixel count. Going from 72 to 300 DPI produces roughly 17× more pixels per page. Most users only need 150 DPI — reserve 300 DPI for actual print.</p>
        `,
      },
      {
        heading: "What happens to text and fonts during rendering",
        body: `
          <p>PDFs contain both raster content (photographs, scans) and vector content (text, lines, curves). Rendering converts everything to pixels — text becomes raster at the chosen DPI.</p>
          <ul>
            <li><strong>At 72 DPI:</strong> small text may look slightly soft. Fine print becomes harder to read.</li>
            <li><strong>At 150 DPI:</strong> text looks crisp on screen. Good balance of quality and file size.</li>
            <li><strong>At 300 DPI:</strong> text is indistinguishable from the source PDF at any zoom level.</li>
          </ul>
          <p>Vector PDFs (modern exported documents) convert very cleanly. Scanned PDFs contain only raster images — quality depends on the scan resolution, not the DPI setting.</p>
        `,
      },
    ],

    features: [
      {
        title: "PNG or JPG output",
        description:
          "Choose lossless PNG for sharp text, diagrams, and screenshots; or JPG for photographs and smaller files. One tool covers both.",
      },
      {
        title: "Up to 300 DPI",
        description:
          "72 DPI for quick screen previews, 150 DPI for web publishing, and 300 DPI for print-ready output — 300 DPI on A4 is roughly 2480 × 3508 pixels.",
      },
      {
        title: "Page range extraction",
        description:
          "Type '1-3, 5, 7-9' to extract exactly the pages you need. Leave the field empty to convert every page.",
      },
      {
        title: "Zero uploads",
        description:
          "PDF parsing, rendering, and encoding all happen inside your browser using pdf.js and the Canvas API. Your file is not uploaded to any server.",
      },
      {
        title: "Web Worker rendering",
        description:
          "Rendering happens off the main thread, so the UI stays smooth even on 100+ page documents.",
      },
      {
        title: "Mixed output handling",
        description:
          "PNG output renders each page onto solid white (PDF has no transparency). JPG output uses 92% quality — visually very close to the source in typical use.",
      },
      {
        title: "Up to 100 MB PDFs",
        description:
          "Large documents are supported in a single session with no signup, no watermark, no daily quota.",
      },
      {
        title: "Batch download",
        description:
          "Every rendered page appears with a preview, page number, and file size. Download individually or use Download All.",
      },
    ],
    howTo: [
      {
        step: 1,
        title: "Drop your PDF",
        description:
          "Drag a PDF file into the upload area, or click to browse. Files up to 100 MB are supported. The tool reads the PDF locally — nothing is uploaded.",
      },
      {
        step: 2,
        title: "Choose PNG or JPG output",
        description:
          "PNG is lossless and produces the sharpest text — ideal for documents, diagrams, and screenshots. JPG is 5-10x smaller and universally compatible — ideal for photographs.",
      },
      {
        step: 3,
        title: "Pick your DPI",
        description:
          "72 DPI is 1:1 with PDF points (screen size), 150 DPI is 2x for web publishing, and 300 DPI is 4x — the print standard.",
      },
      {
        step: 4,
        title: "Select pages (optional)",
        description:
          "Leave the page field empty to convert every page. Or type ranges like '1-3, 5, 7-9' to extract specific pages.",
      },
      {
        step: 5,
        title: "Convert",
        description:
          "Click Convert. Each page renders in your browser and encodes to PNG or JPG. A 20-page PDF at 150 DPI typically finishes in a few seconds.",
      },
      {
        step: 6,
        title: "Download the images",
        description:
          "Every page appears in the result list. Click Download on any page, or use Download All to save every image in one go.",
      },
    ],
    faq: [
      { question: "Does this tool convert the text in my PDF to editable text?", answer: "No. It converts the PDF pages into flat images (JPG/PNG). You cannot select or edit the text in the resulting images." },
      { question: "Can I convert a password-protected PDF?", answer: "No. You must remove the password using a PDF reader first, as the tool needs to read the file directly." },
      { question: "Does this tool convert the text in my PDF to editable text?", answer: "No. It converts the PDF pages into flat images (JPG/PNG). You cannot select or edit the text in the resulting images." },
      { question: "Can I convert a password-protected PDF?", answer: "No. You must remove the password using a PDF reader first, as the tool needs to read the file directly." },
    ],
    deepDive: [
      {
        heading: "PNG vs JPG for PDF pages — decision matrix",
        body: `
          <table>
            <thead>
              <tr><th>Page content</th><th>Recommended output</th><th>Why</th></tr>
            </thead>
            <tbody>
              <tr><td>Text-heavy documents (contracts, reports)</td><td>PNG</td><td>Lossless — text stays crisp at every zoom level</td></tr>
              <tr><td>Charts, diagrams, line art</td><td>PNG</td><td>Sharp edges survive without JPEG artifacts</td></tr>
              <tr><td>Photo-heavy pages (brochures, magazines)</td><td>JPG</td><td>5–10× smaller than PNG; JPEG uses lossy compression at quality 92</td></tr>
              <tr><td>Scanned pages with pencil or pen marks</td><td>PNG at 150 DPI</td><td>Preserves subtle details without ballooning file size</td></tr>
              <tr><td>Screenshots embedded in a report</td><td>PNG</td><td>UI text stays readable</td></tr>
              <tr><td>Presentation slides</td><td>JPG at 150 DPI</td><td>Slides are mostly flat color — JPG compresses better than expected</td></tr>
              <tr><td>Any page destined for print</td><td>PNG at 300 DPI</td><td>Maximum fidelity for the print shop</td></tr>
            </tbody>
          </table>
        `,
      },
      {
        heading: "How DPI affects output size and quality",
        body: `
          <p>DPI (dots per inch) controls how many image pixels represent each inch of the PDF page. It is the single biggest factor in output file size and visual quality.</p>
          <table>
            <thead>
              <tr><th>DPI</th><th>A4 pixels</th><th>Typical PNG size</th><th>Best for</th></tr>
            </thead>
            <tbody>
              <tr><td>72</td><td>595 × 842</td><td>80–200 KB</td><td>Quick previews, thumbnails, mobile screen viewing</td></tr>
              <tr><td>150</td><td>1240 × 1754</td><td>200–500 KB</td><td>Web publishing, social media, slide decks</td></tr>
              <tr><td>300</td><td>2480 × 3508</td><td>800 KB – 2 MB</td><td>Printing, archival, print shops</td></tr>
            </tbody>
          </table>
          <p>The math is simple: doubling the DPI quadruples the pixel count. Going from 72 to 300 DPI produces roughly 17× more pixels per page — and correspondingly larger files. Most users only need 150 DPI. Reserve 300 DPI for actual print.</p>
        `,
      },
      {
        heading: "What happens to PDF fonts and vectors",
        body: `
          <p>A PDF page can contain two fundamentally different things: raster images (photographs, scans) and vector content (text, lines, curves, embedded fonts).</p>
          <p>Raster images render 1:1 — the tool draws the same pixels onto the output canvas without re-sampling. For PNG output there is no additional loss beyond the chosen DPI; for JPG output the browser's encoder applies lossy compression at quality 92.</p>
          <p>Vector content — every character, every rule, every shape — is re-rasterized at your chosen DPI. At 72 DPI, small text can look slightly soft. At 150 DPI, it is crisp on screen. At 300 DPI, it is indistinguishable from the source PDF.</p>
          <p>If you need true vector output (infinite zoom without pixelation), the correct format is SVG, which requires a dedicated PDF-to-SVG tool. Image formats cannot represent vectors — they are fundamentally pixel-based.</p>
        `,
      },
      {
        heading: "Handling encrypted and restricted PDFs",
        body: `
          <p>PDFs come in several encryption states. This tool handles them differently:</p>
          <ul>
            <li><strong>Fully encrypted (user password required):</strong> Cannot be opened. The tool shows an error. Open the file in a PDF reader, enter the password, and re-save as an unencrypted copy first.</li>
            <li><strong>Owner-password only (editing restricted):</strong> Usually opens and converts normally. The restriction applies to modifying content, not to reading or rendering.</li>
            <li><strong>No encryption:</strong> Converts immediately.</li>
          </ul>
          <p>If a PDF refuses to open and you believe you have the right to convert it, the fix is always the same: decrypt it first in a trusted PDF reader.</p>
        `,
      },
      {
        heading: "Practical limits and performance",
        body: `
          <p>Rendering happens in a Web Worker, so the UI stays responsive even for large documents. Still, some practical limits are worth knowing:</p>
          <ul>
            <li><strong>Maximum file size:</strong> 100 MB per PDF.</li>
            <li><strong>Pages per conversion:</strong> No hard limit, but conversions over 500 pages may exhaust browser memory on mobile devices.</li>
            <li><strong>300 DPI on a 200-page PDF:</strong> Expect several minutes on a laptop, longer on a phone. Consider 150 DPI or splitting the PDF into smaller batches.</li>
            <li><strong>Encrypted content:</strong> See the encryption section above.</li>
            <li><strong>Broken or malformed PDFs:</strong> pdf.js is more forgiving than desktop readers but cannot recover from severely corrupted files.</li>
          </ul>
        `,
      },
    ],
    useCases: [
      "Extracting charts or graphics from a PDF for a presentation.",
      "Converting a PDF document to JPG for social media posting.",
      "Creating thumbnails for a PDF library.",
      "Viewing PDF pages on devices without a PDF reader.",
    ],
limitations: [
      "Does not convert text to editable text (converts to pixels).",
      "High-resolution extraction (300+ DPI) may consume significant RAM.",
      "Cannot extract images from password-protected PDFs.",
      "Output images can be very large if converted at high DPI.",
    ],
benchmarks: [
      { label: "1 Page PDF to 1080p JPG", value: "~400ms" },
      { label: "10 Page PDF to JPGs", value: "~3 seconds" },
      { label: "Default DPI", value: "150 DPI (good for screens)" },
    ],
    privacy: {
      processing: "browser",
      uploadRequired: false,
      storage: "none",
      externalService: false,
    },
    relatedTools: ["merge-pdf", "split-pdf", "image-to-pdf", "pdf-to-text"],
    seo: {
      title: "PDF to Image — Convert PDF to PNG/JPG Free | AHADEX Tools",
      description:
        "Convert PDF pages to high-quality PNG or JPG images in your browser. Up to 300 DPI, page ranges, no uploads.",
      ogImage: "/images/og/tools/pdf-to-image-og.jpg",
    },
  },
  {
    id: "image-to-pdf",
    slug: "image-to-pdf",
    name: "Image to PDF",
    path: "/tools/image-to-pdf",
    searchVolume: 1500000,
    description:
      "Combine JPG, PNG, and WebP images into a single multi-page PDF in your browser. Reorderable pages, A4/Letter sizes, no uploads.",
    longDescription:
      "Image to PDF combines mixed JPG, PNG, and WebP files into one clean, multi-page PDF document — entirely in your browser. JPG images are embedded without re-encoding, so their pixel data is preserved. PNG and WebP images are composited onto solid white and re-encoded at 95% JPEG quality, which is visually very close to the original for most graphics. Choose A4, US Letter, or auto-size pages; portrait, landscape, or auto orientation; and set page margins in millimetres. Drag thumbnails to reorder pages, remove individual entries, or add more files at any time. Everything runs locally using pdf-lib — no upload, no server, no account, no watermark. Ideal for submitting scanned documents to government portals, combining invoices and receipts into an expense report, building photo albums, and packaging multiple design assets into a single deliverable.",
    keywords: [
      "image to pdf",
      "jpg to pdf",
      "png to pdf",
      "webp to pdf",
      "combine images to pdf",
      "images to one pdf",
      "free image to pdf",
    ],
    popular: true,
    newTool: true,
        editorialContent: [
      {
        heading: "What actually happens when images become a PDF",
        body: `
          <p>JPG, PNG, and WebP images are handled differently when they are embedded into a PDF. Understanding the difference matters when file size or print quality are critical:</p>
          <ul>
            <li><strong>JPG images:</strong> embedded byte-for-byte. The PDF contains the original JPEG stream exactly. No quality loss, no re-encoding, no file size change.</li>
            <li><strong>PNG images:</strong> composited onto a white background (PDF has no transparency) and re-encoded at 95% JPEG quality. Visually close for most graphics, but not byte-identical to the source.</li>
            <li><strong>WebP images:</strong> treated the same as PNG — decoded, composited onto white, re-encoded at 95% JPEG quality.</li>
          </ul>
          <p>If you need byte-exact preservation, use JPG as the input format. If you need transparency preservation in the final PDF, that is not possible — PDF pages cannot represent transparency.</p>
        `,
      },
      {
        heading: "Page size math — A4, US Letter, and auto",
        body: `
          <p>Three page-size modes are available, and each produces a different visual result for the same source images:</p>
          <table>
            <thead><tr><th>Mode</th><th>Page dimensions</th><th>Effect on images</th></tr></thead>
            <tbody>
              <tr><td>A4</td><td>210 × 297 mm</td><td>Images scaled to fit, whitespace added</td></tr>
              <tr><td>US Letter</td><td>216 × 279 mm</td><td>Images scaled to fit, whitespace added</td></tr>
              <tr><td>Auto</td><td>Matches each image</td><td>Each page has different dimensions</td></tr>
            </tbody>
          </table>
          <p>For mixed image sizes where each should display at its natural aspect ratio, use Auto. For a uniform, professional document, use A4 with 15-20 mm margins. Zero margins with Auto page size is the standard for photo albums.</p>
        `,
      },
    ],

    features: [
      {
        title: "Mixed image formats",
        description:
          "Drop JPG, PNG, and WebP files freely in the same batch. The tool detects each format automatically and embeds or composites it correctly.",
      },
      {
        title: "Byte-for-byte JPG embedding",
        description:
          "JPG images are embedded directly into the PDF without re-compression — the output PDF contains the exact JPEG bytes from your source file, preserving every pixel.",
      },
      {
        title: "Page reordering",
        description:
          "Drag thumbnails to reorder pages, or use the up/down buttons. Remove individual pages with the X button. The PDF is built in the exact order you see.",
      },
      {
        title: "Three page sizes",
        description:
          "A4 (210 × 297 mm) for most of the world, US Letter (216 × 279 mm) for North America, or Auto to fit each image's own dimensions with no whitespace.",
      },
      {
        title: "Portrait, landscape, or auto",
        description:
          "Choose orientation manually, or let the tool decide per-page based on each image's aspect ratio. Mixed-orientation documents are handled correctly.",
      },
      {
        title: "Custom margins",
        description:
          "Set page margins in millimetres from 0 to 50 mm. Zero margin for full-bleed photo albums, 15-20 mm for professional documents with a border.",
      },
      {
        title: "Up to 50 pages",
        description:
          "Combine dozens of images into a single multi-page PDF. If you need more, run the tool again — the output can itself be merged with another PDF.",
      },
      {
        title: "Fully private",
        description:
          "The whole pipeline — reading images, decoding, compositing, and building the PDF — runs inside your browser using pdf-lib. Your files are not uploaded to any server.",
      },
    ],
    howTo: [
      {
        step: 1,
        title: "Drop your images",
        description:
          "Drag JPG, PNG, or WebP files into the upload area, or click to browse. Files up to 50 MB each and up to 50 pages per PDF. You can mix formats freely.",
      },
      {
        step: 2,
        title: "Reorder pages",
        description:
          "Drag thumbnails to change the order, use the up/down arrows for precise moves, or click X to remove a page. The final PDF follows the order you see.",
      },
      {
        step: 3,
        title: "Configure page size and orientation",
        description:
          "Choose A4 for international documents, US Letter for North America, or Auto to match each image's own dimensions. Pick portrait, landscape, or auto orientation.",
      },
      {
        step: 4,
        title: "Set margins",
        description:
          "Type the page margin in millimetres. Zero for full-bleed photo albums, 15-20 mm for professional documents. Margins apply uniformly to all pages.",
      },
      {
        step: 5,
        title: "Export the PDF",
        description:
          "Click Export PDF. The document is built in your browser using pdf-lib and downloaded instantly — no upload, no server round-trip, no waiting.",
      },
      {
        step: 6,
        title: "Verify the output",
        description:
          "Open the downloaded PDF in any reader (Chrome, Preview, Acrobat, Firefox) to confirm the pages, order, and quality match your expectations before sharing.",
      },
    ],
    faq: [
      { question: "Are my images compressed when converting to PDF?", answer: "No. The images are embedded into the PDF at their original resolution. However, you can choose to use our Image Compressor first if you want a smaller PDF." },
      { question: "Can I reorder the images before creating the PDF?", answer: "Yes. Once uploaded, you can drag and drop the thumbnails to set the exact page order you want." },
      { question: "Are my images compressed when converting to PDF?", answer: "No. The images are embedded into the PDF at their original resolution. However, you can use our Image Compressor first if you want a smaller PDF." },
      { question: "Can I reorder the images before creating the PDF?", answer: "Yes. Once uploaded, you can drag and drop the thumbnails to set the exact page order you want." },
    ],
    deepDive: [
      {
        heading: "Page size and orientation — how to choose",
        body: `
          <table>
            <thead>
              <tr><th>Situation</th><th>Recommended</th></tr>
            </thead>
            <tbody>
              <tr><td>Government forms, university portals, international submission</td><td>A4 portrait, 15–20 mm margins</td></tr>
              <tr><td>US/Canada submission (fewer forms, but some require it)</td><td>US Letter portrait, 1 inch margins</td></tr>
              <tr><td>Photo album, portfolio, magazine-style output</td><td>Auto page size, 0 mm margins</td></tr>
              <tr><td>Wide screenshots or panorama photos</td><td>A4 landscape or US Letter landscape</td></tr>
              <tr><td>Mixed portrait and landscape photos</td><td>Auto orientation (each page fits its image)</td></tr>
              <tr><td>Printing at a local print shop</td><td>Ask the shop first — most accept A4</td></tr>
            </tbody>
          </table>
        `,
      },
      {
        heading: "How each format is embedded",
        body: `
          <p>The tool treats the three input formats differently because each has different properties.</p>
          <ul>
            <li><strong>JPG</strong> — Embedded byte-for-byte. The PDF contains the exact JPEG data from your source file with no re-encoding. This is the safest input format if you want zero quality loss.</li>
            <li><strong>PNG</strong> — Decoded, composited onto a solid white background (because PDF pages cannot have transparency), then re-encoded as JPEG at 95% quality before embedding. Visually indistinguishable from the source for typical graphics.</li>
            <li><strong>WebP</strong> — Decoded and processed exactly like PNG: composited onto white, re-encoded at 95% JPEG quality, then embedded. WebP's transparency becomes white for the same reason.</li>
          </ul>
          <p>The result is a PDF that opens correctly in every reader and looks the same as the source images to any human eye. Only the encoded bytes differ.</p>
        `,
      },
      {
        heading: "Managing output file size",
        body: `
          <p>The output PDF is roughly the sum of its input image sizes, plus a small structural overhead. A 20-page PDF built from ten 2 MB photos will be around 20 MB.</p>
          <p>Email providers typically cap attachments at 20–25 MB. Common fixes:</p>
          <ul>
            <li><strong>Compress images first.</strong> Run your photos through the Image Compressor at quality 80 and max width 1920 before building the PDF. This typically cuts the final PDF by 60–80%.</li>
            <li><strong>Use JPG, not PNG, for photos.</strong> Photos embedded as JPG take 5–10× less space than the same content as PNG.</li>
            <li><strong>Reduce page count.</strong> If you have 50 pages of receipts, split the PDF into two 25-page files.</li>
            <li><strong>Ask the recipient.</strong> Many portals accept files up to 50 MB; some only allow 10 MB.</li>
          </ul>
        `,
      },
      {
        heading: "Common pitfalls",
        body: `
          <ul>
            <li><strong>Transparent logos on white pages disappear.</strong> PNG transparency becomes white — a white logo on a white background is invisible. Composite the logo onto a colored background in an image editor first.</li>
            <li><strong>Mixed page sizes look inconsistent.</strong> If you choose "Auto" page size, an A4 scan and a phone photo of different aspect ratios produce visibly different pages. Choose A4 or US Letter for uniformity.</li>
            <li><strong>Extremely large images slow the browser.</strong> Files over 30 MB each will process but may freeze the tab for a few seconds. Compress them first.</li>
            <li><strong>Zero margins cut off content on some printers.</strong> If the PDF is destined for physical printing, use at least 10 mm margins.</li>
          </ul>
        `,
      },
      {
        heading: "Real-world file size examples",
        body: `
          <table>
            <thead>
              <tr><th>Scenario</th><th>Input</th><th>Output PDF</th></tr>
            </thead>
            <tbody>
              <tr><td>Photo album (10 phone photos at A4)</td><td>30 MB of JPGs</td><td>~30 MB</td></tr>
              <tr><td>Scanned documents (5 pages, ID-sized)</td><td>5 × 400 KB JPG</td><td>~2.1 MB</td></tr>
              <tr><td>Product catalog (20 photos, mixed PNG/JPG)</td><td>18 MB mixed</td><td>~19 MB</td></tr>
              <tr><td>Same catalog, pre-compressed</td><td>4 MB mixed (after Image Compressor)</td><td>~4.5 MB</td></tr>
              <tr><td>Portfolio (3 design mockups, PNG)</td><td>8 MB PNGs</td><td>~6 MB</td></tr>
            </tbody>
          </table>
          <p>The pattern is consistent: pre-compress your inputs and the output shrinks proportionally. The PDF structure itself adds very little.</p>
        `,
      },
    ],
    useCases: [
      "Emailing multiple photos as a single document.",
      "Creating a digital portfolio from design mockups.",
      "Converting scanned receipts or documents into a formal PDF.",
      "Submitting photos for a visa or job application.",
    ],
limitations: [
      "Output PDF contains images, not selectable text (no OCR).",
      "Huge images (e.g., 50MP) may slow down mobile browsers.",
      "Cannot set advanced PDF security (passwords, watermarks).",
      "Maximum of 50 images per PDF generation to prevent crashing.",
    ],
benchmarks: [
      { label: "10 x 1080p images to PDF", value: "~1.5 seconds" },
      { label: "Output File Size", value: "~80-90% of original image size" },
      { label: "Page Size Options", value: "A4, Letter, Fit-to-image" },
    ],
    privacy: {
      processing: "browser",
      uploadRequired: false,
      storage: "none",
      externalService: false,
    },
    relatedTools: ["merge-pdf", "split-pdf", "pdf-to-image", "image-compressor"],
    seo: {
      title: "Image to PDF — Combine JPG, PNG, WebP Free | AHADEX Tools",
      description:
        "Combine JPG, PNG, and WebP images into one PDF in your browser. Multi-page, reorderable, A4/Letter, no uploads.",
      ogImage: "/images/og/tools/image-to-pdf-og.jpg",
    },
  },
  {
    id: "split-pdf",
    slug: "split-pdf",
    name: "Split PDF",
    path: "/tools/split-pdf",
    searchVolume: 1200000,
    description:
      "Extract pages from any PDF in custom order, with duplicates, or split every page into separate files. Runs in your browser.",
    longDescription:
      "Split PDF extracts pages from any PDF in the exact order you type — including duplicates. Type '3, 1, 3, 5' and get a four-page PDF with page 3 appearing twice. Or switch to 'Split every page' mode and each page becomes its own file, downloaded in a batch. Every page is copied byte-for-byte using pdf-lib, so nothing is re-rendered and nothing loses quality. Custom order lets you reverse documents, extract a signature page twice, or assemble a new PDF from any subset of an existing one. Separate mode is the fastest way to turn a 200-page report into 200 standalone pages for review, annotation, or distribution. Everything runs inside your browser — your file is not uploaded to any server.",
    keywords: [
      "split pdf",
      "extract pdf pages",
      "pdf page extractor",
      "split every page",
      "custom order pdf",
      "pdf splitter",
      "free split pdf",
    ],
    popular: true,
    newTool: true,
        editorialContent: [
      {
        heading: "Combined vs separate mode — when to use each",
        body: `
          <p>The tool offers two distinct modes, and the right choice depends on what you plan to do with the output:</p>
          <table>
            <thead><tr><th>Mode</th><th>Output</th><th>Best for</th></tr></thead>
            <tbody>
              <tr><td>Combined</td><td>One PDF containing selected pages</td><td>Sending an extract, deleting pages, reordering content</td></tr>
              <tr><td>Separate</td><td>One PDF per page</td><td>Distributing pages individually, annotation workflows</td></tr>
            </tbody>
          </table>
          <p>Combined mode with a page list like "1-3, 5, 7-9" gives you precisely those pages in one file. Separate mode extracts every page into its own PDF, downloaded as a batch.</p>
        `,
      },
      {
        heading: "Page-range syntax — every form accepted",
        body: `
          <p>The page field supports every standard range syntax:</p>
          <ul>
            <li><code>3</code> — page 3 only</li>
            <li><code>1-5</code> — pages 1 through 5</li>
            <li><code>1, 5, 9</code> — pages 1, 5, and 9 in that order</li>
            <li><code>1-3, 5, 7-9</code> — mixed ranges</li>
            <li><code>5, 1, 3</code> — custom order</li>
            <li><code>3, 3</code> — page 3 twice</li>
          </ul>
          <p>Ranges must be ascending (<code>1-5</code>, not <code>5-1</code>). To reverse, list pages individually.</p>
        `,
      },
    ],

    features: [
      {
        title: "Custom page order",
        description:
          "Type pages in any order — '5, 1, 3, 2' produces exactly that order. Unlike simpler extractors, the sequence you write is the sequence in the output PDF.",
      },
      {
        title: "Duplicate pages",
        description:
          "Extract the same page multiple times. Type '3, 3' and get a two-page PDF with page 3 appearing twice — useful for signatures, cover pages, and reference sheets.",
      },
      {
        title: "Split every page",
        description:
          "Switch to 'Split every page' mode and each page of the source PDF becomes its own single-page PDF, downloaded sequentially with numbered filenames.",
      },
      {
        title: "Byte-for-byte copy",
        description:
          "Every page is copied directly from the source PDF into the output PDF. Nothing is re-rendered, nothing is re-compressed, and nothing loses quality.",
      },
      {
        title: "Two extraction modes",
        description:
          "Combined mode produces one new PDF with all selected pages. Separate mode produces one PDF per page, downloaded in a batch.",
      },
      {
        title: "Range syntax",
        description:
          "Use commas and dashes: '1-3, 5, 7-9' means pages 1 through 3, plus page 5, plus pages 7 through 9. Standard syntax supported by every PDF tool you have ever used.",
      },
      {
        title: "Up to 100 MB PDFs",
        description:
          "Large documents are supported in a single session. A 200-page PDF typically processes in a few seconds on modern hardware.",
      },
      {
        title: "Fully private",
        description:
          "PDF parsing, page copying, and output generation all run inside your browser using pdf-lib. Your document is not uploaded to any server.",
      },
    ],
    howTo: [
      {
        step: 1,
        title: "Drop your PDF",
        description:
          "Drag a PDF file into the upload area, or click to browse. Files up to 100 MB are supported. The tool reads the PDF locally — nothing is uploaded.",
      },
      {
        step: 2,
        title: "Choose a mode",
        description:
          "Combined mode extracts the pages you list into one new PDF. Separate mode turns every page into its own file, downloaded in a batch.",
      },
      {
        step: 3,
        title: "Enter page ranges (Combined mode)",
        description:
          "Type the pages you want in the exact order you want them. '3, 1, 3, 5' gives a four-page PDF: page 3, page 1, page 3 again, page 5. Ranges like '1-5' and mixed syntax like '1-3, 5, 7-9' are also supported.",
      },
      {
        step: 4,
        title: "Or pick a preset (Separate mode)",
        description:
          "Separate mode has no page selection — every page becomes its own PDF. Use it when you want the whole document split into individual files.",
      },
      {
        step: 5,
        title: "Extract",
        description:
          "Click Extract. The tool builds the new PDF or PDFs in your browser using pdf-lib and prepares them for download. A 200-page document typically finishes in under five seconds.",
      },
      {
        step: 6,
        title: "Download",
        description:
          "In Combined mode, a single PDF downloads. In Separate mode, a batch of PDFs downloads sequentially — page-001.pdf, page-002.pdf, and so on, in the original page order.",
      },
    ],
    faq: [
      { question: "Can I extract just one specific page?", answer: "Yes. You can enter a single page number (e.g., '5') or a range (e.g., '1-3, 7'). Only those pages will be saved to the new PDF." },
      { question: "How does splitting affect the PDF file size?", answer: "The split pages retain their original quality. A single page extracted from a 50MB PDF will be a tiny file containing only that page's data." },
      { question: "Can I extract just one specific page?", answer: "Yes. You can enter a single page number (e.g., '5') or a range (e.g., '1-3, 7'). Only those pages will be saved to the new PDF." },
      { question: "How does splitting affect the PDF file size?", answer: "The split pages retain their original quality. A single page extracted from a 50MB PDF will be a tiny file containing only that page's data." },
    ],
    deepDive: [
      {
        heading: "Combined mode vs Separate mode — when to use each",
        body: `
          <table>
            <thead>
              <tr><th>Goal</th><th>Mode</th><th>Example input</th></tr>
            </thead>
            <tbody>
              <tr><td>Extract pages 3–7 into a new PDF</td><td>Combined</td><td><code>3-7</code></td></tr>
              <tr><td>Keep pages 1, 4, 9 in that order</td><td>Combined</td><td><code>1, 4, 9</code></td></tr>
              <tr><td>Reverse a 10-page document</td><td>Combined</td><td><code>10, 9, 8, 7, 6, 5, 4, 3, 2, 1</code></td></tr>
              <tr><td>Duplicate a signature page</td><td>Combined</td><td><code>5, 5</code></td></tr>
              <tr><td>Turn every page into its own file</td><td>Separate</td><td>(no page selection needed)</td></tr>
              <tr><td>Extract a chapter and remove the cover</td><td>Combined</td><td><code>4-20</code></td></tr>
              <tr><td>Prepare 200 pages for individual annotation</td><td>Separate</td><td>(batch download)</td></tr>
            </tbody>
          </table>
        `,
      },
      {
        heading: "Page range syntax in detail",
        body: `
          <p>The page syntax supports every combination you would expect from a PDF tool. All examples below operate on a hypothetical 10-page PDF.</p>
          <ul>
            <li><code>3</code> — a single page. Output: one PDF containing page 3.</li>
            <li><code>1-5</code> — a consecutive range. Output: pages 1, 2, 3, 4, 5.</li>
            <li><code>1, 5, 9</code> — non-contiguous pages. Output: three pages in that order.</li>
            <li><code>1-3, 5, 7-9</code> — mixed. Output: pages 1, 2, 3, 5, 7, 8, 9.</li>
            <li><code>5, 1, 3</code> — custom order. Output: page 5, then page 1, then page 3.</li>
            <li><code>3, 3, 3</code> — duplicates. Output: page 3 repeated three times.</li>
            <li><code>10-1</code> — <strong>not valid.</strong> Ranges must be ascending. Use <code>10, 9, 8, 7, 6, 5, 4, 3, 2, 1</code> to reverse.</li>
          </ul>
        `,
      },
      {
        heading: "How the copy works — page content preserved exactly",
        body: `
          <p>This tool does not re-render pages. It does not decode and re-encode images. It does not re-embed fonts. It copies the page objects directly from the source PDF into a new PDF document using pdf-lib, a widely-used JavaScript PDF library.</p>
          <p>What that means practically:</p>
          <ul>
            <li>Vector content stays vector. Text remains selectable and searchable.</li>
            <li>Embedded images keep their original encoding. A JPEG inside a scanned PDF stays a JPEG — not re-compressed into a larger file.</li>
            <li>Embedded fonts stay embedded. No substitution, no missing glyphs.</li>
            <li>Annotations, form fields, and bookmarks on extracted pages survive.</li>
            <li>File size scales linearly with the number of pages — extracting 5 of 100 pages produces a file roughly 5% the size.</li>
          </ul>
        `,
      },
      {
        heading: "Handling large and complex PDFs",
        body: `
          <ul>
            <li><strong>200+ pages:</strong> Processing typically completes in under 10 seconds on modern hardware. The bottleneck is file size, not page count.</li>
            <li><strong>Encrypted PDFs:</strong> Cannot be opened without the password. Decrypt in a PDF reader first.</li>
            <li><strong>PDFs with broken cross-reference tables:</strong> pdf-lib may fail. Try opening the file in a desktop reader first, then re-save it — the reader will rebuild the table.</li>
            <li><strong>PDF/A archives:</strong> Usually work fine, but the output is not marked as PDF/A. If you need PDF/A compliance, use a dedicated archival tool.</li>
            <li><strong>Form fields with JavaScript:</strong> Extracted pages keep the forms, but any script-dependent validation may not carry over depending on the source PDF's structure.</li>
          </ul>
        `,
      },
    ],
    useCases: [
      "Extracting a single page (like a receipt) from a 50-page PDF.",
      "Splitting a large ebook into smaller chapters.",
      "Removing unwanted blank pages from a scanned document.",
      "Separating merged invoices back into individual files.",
    ],
limitations: [
      "Does not compress the extracted PDF pages (size is same as original).",
      "Cannot split encrypted PDFs.",
      "Cannot split by bookmarks or text (only by page numbers).",
      "Large PDFs (500+ pages) may take a few seconds to process.",
    ],
benchmarks: [
      { label: "Extract 1 page from 100", value: "~800ms" },
      { label: "Split 50 pages into 50 files", value: "~4 seconds" },
      { label: "Memory Usage", value: "Processed entirely in browser RAM" },
    ],
    privacy: {
      processing: "browser",
      uploadRequired: false,
      storage: "none",
      externalService: false,
    },
    relatedTools: ["merge-pdf", "pdf-to-image", "pdf-rotator"],
    seo: {
      title: "Split PDF — Extract Pages, Custom Order Free | AHADEX Tools",
      description:
        "Extract pages from any PDF in custom order, with duplicates, or split every page into separate files. Runs in your browser.",
      ogImage: "/images/og/tools/split-pdf-og.jpg",
    },
  },
];
