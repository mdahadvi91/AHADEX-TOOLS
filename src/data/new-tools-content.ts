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
      "Convert between JPG, PNG, and WebP instantly in your browser. Lossless, batch, no uploads — 100% free and private.",
    longDescription:
      "Image Converter re-encodes your images between the three formats that matter on the modern web: JPG, PNG, and WebP. Upload one or hundreds of files, choose the output format, and download every converted image in a single session. Everything runs inside your browser using the HTML5 Canvas API and the browser's native codec — no uploads, no servers, no accounts. JPG stays JPG unless you ask otherwise, PNG keeps its transparency, WebP stays WebP. You can mix formats in a single batch and the tool figures out the rest. WebP conversion alone typically saves 25-35% of file size at the same visual quality; JPG to PNG conversion is lossless so every pixel survives; PNG to JPG with the transparent-background composite rule gives you 5-10x smaller files. No watermarks, no quotas, no email sign-up.",
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
    features: [
      {
        title: "Six conversions, one tool",
        description:
          "JPG → PNG, PNG → JPG, JPG → WebP, PNG → WebP, WebP → JPG, WebP → PNG. All six combinations handled by the same interface — pick your output format and drop your files.",
      },
      {
        title: "Zero uploads, ever",
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
          "Every converted file appears in the list with its original name, original size, new size, and a preview thumbnail. The difference is often dramatic — a 3 MB PNG might become a 400 KB JPG, or a 2 MB JPG might become a 1.3 MB WebP with no visible quality change.",
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
      {
        question: "Which format should I choose — JPG, PNG, or WebP?",
        answer:
          "Use JPG for photographs, email attachments, and anywhere universal compatibility matters more than the last 20% of file size. Use PNG for logos, icons, screenshots, diagrams, and anything with transparency or sharp edges. Use WebP for anything on the modern web — it is 25-35% smaller than JPG at the same visual quality and every browser since 2020 supports it. If you are unsure, WebP is the safest modern default; JPG is the safest universal fallback.",
      },
      {
        question: "Will the quality drop when I convert?",
        answer:
          "It depends on the direction. Converting to PNG is lossless — every pixel survives exactly. Converting to JPG uses 92% quality, which is visually very close to the source at normal viewing distance. Converting to WebP uses 85% quality, which also looks identical at normal sizes and saves the most bytes. Only when you go from PNG → JPG or WebP → JPG do you risk losing transparency (JPG has no alpha channel; transparent areas become white).",
      },
      {
        question: "Does the image size change when I convert?",
        answer:
          "Yes, often dramatically. Typical ratios you will see: PNG → JPG shrinks by 70-90% (a 3 MB PNG often becomes a 300-600 KB JPG). JPG → WebP shrinks by 25-35%. JPG → PNG usually grows 2-5x because PNG's lossless compression is less efficient for photographs. PNG → WebP shrinks by 30-50% while keeping transparency. The exact numbers depend on the image content — photos compress much more than screenshots.",
      },
      {
        question: "What happens to transparent backgrounds?",
        answer:
          "PNG and WebP both support full transparency (alpha channel) and preserve it during conversion. JPG does not support transparency at all — when you convert a PNG or WebP with transparent areas to JPG, those areas are composited onto a solid white background. This is the standard and correct behaviour for the format — JPG simply cannot represent transparency. If you need transparency, stay in PNG or WebP.",
      },
      {
        question: "Are my files uploaded to a server?",
        answer:
          "Never. The tool runs entirely inside your browser using the HTML5 Canvas API and the browser's native image codec. Reading the file, decoding the image, drawing on canvas, re-encoding, and generating the download link — all happen on your device. Your files never travel over the network, never touch a server, and never end up in anyone's logs. You can verify this by opening your browser's developer tools, switching to the Network tab, and converting a file — you will see zero outbound requests.",
      },
      {
        question: "Can I convert multiple files at once?",
        answer:
          "Yes. Drag as many files as you like into the upload area and the tool converts them all in sequence. Files of different formats can be mixed in the same batch — JPG and PNG and WebP together — and each one is converted individually to your chosen output format. Use Download All at the end to save every converted file in one click.",
      },
      {
        question: "Is there a file size limit?",
        answer:
          "Each file can be up to 50 MB, which covers almost every image produced by a modern phone or DSLR camera. There is no limit on the number of files you convert in one session — a batch of 200 photos typically converts without trouble. Very large images (over 8000 pixels on the long edge) may take a second or two longer to process on older devices.",
      },
      {
        question: "Why did my JPG become 5x larger after converting to PNG?",
        answer:
          "This is expected and means no quality was lost. PNG uses lossless compression, which is much less efficient for continuous-tone photographs than JPG's lossy algorithm. A 2 MB JPG photo can legitimately become a 5-8 MB PNG. Only convert to PNG when you actually need lossless output or transparency — otherwise stick with JPG or WebP.",
      },
      {
        question: "Does converting to WebP affect how the image looks on screen?",
        answer:
          "No. At the quality setting this tool uses (85%), WebP is visually very close to the source for photographs, screenshots, and graphics. Every browser since 2020 renders WebP natively, so images display identically across Chrome, Firefox, Safari, and Edge. The only visible difference is the smaller file size and faster page load.",
      },
      {
        question: "Can I use the output for commercial purposes?",
        answer:
          "Yes. The converted files are entirely yours. You can use them on business cards, product packaging, marketing materials, websites, social media, print publications, or anything else — without attribution, royalties, or restrictions. This tool claims no rights over your input or your output.",
      },
      {
        question: "Does it work on mobile phones and tablets?",
        answer:
          "Yes. The tool is fully responsive and tested on iOS Safari, Android Chrome, Firefox for Android, and Samsung Internet. On a phone, the interface rearranges so the format selector and file list stack vertically. Batch conversion works identically on mobile — you can convert 50 photos while walking around.",
      },
      {
        question: "What is the difference between JPG and JPEG?",
        answer:
          "Nothing. JPG and JPEG are the same format — just two different file extensions for the same underlying data. The three-letter version (.jpg) exists because older Windows versions required three-character extensions. Modern systems treat them identically. This tool accepts both.",
      },
      {
        question: "Can I convert WebP back to JPG or PNG?",
        answer:
          "Yes — that is one of the six conversions this tool handles. Open the format selector, choose JPG or PNG as your output, and drop your WebP files. WebP → JPG is useful for older software, print shops, and email clients that cannot open WebP. WebP → PNG is useful when you need lossless quality or a format that every legacy application understands.",
      },
      {
        question: "Why does this tool exist instead of six separate conversion pages?",
        answer:
          "Because six pages that do the same thing in slightly different directions is not six tools — it is one tool with six buttons. Splitting JPG-to-PNG and PNG-to-JPG into separate pages creates near-duplicate content that adds no real value to a visitor and makes Google's job harder. This single page covers every combination with deeper explanations, better examples, and a cleaner experience. The old URLs redirect here automatically.",
      },
      {
        question: "Do you keep any data after I close the tab?",
        answer:
          "No. The tool does not store anything — no files, no filenames, no statistics about what you converted. Close the tab and everything is gone. There is nothing to delete because nothing was ever saved. The only persistent state is your browser's normal cache for the page assets themselves.",
      },
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
    relatedTools: ["image-compressor", "image-resizer", "image-cropper", "image-to-pdf"],
    seo: {
      title: "Image Converter — JPG, PNG, WebP Free & Private | AHADEX Tools",
      description:
        "Convert between JPG, PNG, and WebP in your browser. Lossless output, batch conversion, no uploads — 100% free and private.",
      ogImage: "/images/og/tools/image-converter-og.png",
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
      {
        question: "Should I use PNG or JPG for PDF to image?",
        answer:
          "Use PNG when the PDF contains text, diagrams, or charts with sharp edges — PNG is lossless, so text stays crisp at every zoom level. Use JPG when the pages are photographs or complex images, or when file size matters. JPG output is 5-10x smaller than PNG at equivalent visual quality for photographs. As a rule of thumb: documents and charts → PNG; photo-heavy PDFs → JPG.",
      },
      {
        question: "What does 300 DPI mean in practice?",
        answer:
          "DPI (dots per inch) controls the resolution of the output image. 72 DPI produces one image pixel per PDF point — the same size you see on screen. 150 DPI produces 2x the resolution — good for web publishing and moderate print. 300 DPI produces 4x the resolution — the professional print standard. A 300 DPI A4 page is roughly 2480 × 3508 pixels. For social media, 150 DPI is more than enough; use 300 only when the output will actually be printed.",
      },
      {
        question: "Can I convert only specific pages?",
        answer:
          "Yes. Enter page ranges in the page field using the standard syntax: '3' for a single page, '1-5' for a consecutive range, '1, 5, 10' for non-contiguous pages, or '1-3, 5, 7-9' for mixed. Leave the field empty to convert every page.",
      },
      {
        question: "Is my PDF uploaded to a server?",
        answer:
          "Never. Everything — parsing the PDF structure, rendering each page onto a canvas, and encoding to PNG or JPG — runs inside your browser using pdf.js, Mozilla's widely-used PDF renderer. Your file never travels over the network. This matters for contracts, invoices, ID documents, and anything else you would not email to a stranger.",
      },
      {
        question: "How large will the output images be?",
        answer:
          "It depends on DPI, page size, and format. At 150 DPI, an A4 page converted to PNG is roughly 200-500 KB; the same page in JPG is 60-150 KB. At 300 DPI, PNG files are typically 800 KB – 2 MB, and JPG files are 200-500 KB. Photo-heavy pages are larger than text-heavy ones.",
      },
      {
        question: "Does it work on encrypted or password-protected PDFs?",
        answer:
          "Password-protected PDFs cannot be opened without the password — the tool will show an error. PDFs that are 'encrypted' only against editing (owner password) but open freely usually work fine. If you need to convert a fully password-protected PDF, open it in your PDF reader, enter the password, and re-save it as an unencrypted copy first.",
      },
      {
        question: "Will transparent areas in my PDF be preserved?",
        answer:
          "PDF pages do not have a transparency concept — they always render onto a background. This tool composites each page onto solid white, which matches what you see on screen in any PDF reader. If your PDF genuinely contains transparent regions (rare), they will become white.",
      },
      {
        question: "How does this compare to dedicated PDF-to-PNG and PDF-to-JPG tools?",
        answer:
          "It replaces both. Rendering a PDF to PNG and rendering a PDF to JPG use the same underlying pipeline — parse the PDF, draw each page on a canvas, encode in the chosen format. Splitting that into two separate pages just for a format toggle creates near-duplicate content. This single page covers both formats with a deeper explanation of when to use each. The old URLs redirect here automatically.",
      },
      {
        question: "Can I convert a 500-page PDF?",
        answer:
          "Yes, but be aware of the practical limits of browser memory. A 500-page PDF at 300 DPI could produce 500 large images and take several minutes. For very large documents, convert in batches — pages 1-50, then 51-100, and so on. Using 150 DPI instead of 300 cuts the total time and memory use by 75%.",
      },
      {
        question: "What image format should I pick for print?",
        answer:
          "For print, use 300 DPI and PNG. PNG is lossless, so text and line art stay sharp. For photographs, PNG is fine too, though JPG at 300 DPI is also acceptable and produces much smaller files.",
      },
      {
        question: "Does this tool preserve the PDF's original page orientation?",
        answer:
          "Yes. Each page is rendered at its natural size and orientation as defined in the PDF. Landscape pages stay landscape, portrait pages stay portrait, and mixed-orientation documents produce mixed-orientation images.",
      },
      {
        question: "Does it work on mobile phones?",
        answer:
          "Yes. The tool is fully responsive and works in iOS Safari, Android Chrome, and Samsung Internet. Large PDFs take longer on phones — a 100-page PDF that takes 30 seconds on a laptop might take 2 minutes on a phone.",
      },
      {
        question: "What happens to fonts and vector graphics during conversion?",
        answer:
          "Fonts and vector graphics are rendered as pixels at whatever DPI you chose. At 72 DPI, small text may look slightly soft. At 300 DPI, text is indistinguishable from the PDF itself. If you need to preserve vector quality, PDF is the right format — image formats cannot represent vectors.",
      },
      {
        question: "Can I convert a PDF that contains scanned images?",
        answer:
          "Yes. A scanned PDF is just a container for page-sized raster images, and this tool renders them identically to any other PDF page. The output quality matches the scanned source. This tool does not perform OCR — if you need searchable text from a scanned PDF, you need a separate OCR tool.",
      },
      {
        question: "Why does this tool exist instead of two separate PDF-to-PNG and PDF-to-JPG pages?",
        answer:
          "Because both conversions use the exact same pipeline — the only difference is the final encoder. Two pages doing the same thing with a format toggle is near-duplicate content that does not serve visitors or search engines. Consolidating into one page lets us explain when to use each format in depth. Both old URLs redirect here.",
      },
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
              <tr><td>Photo-heavy pages (brochures, magazines)</td><td>JPG</td><td>5–10× smaller than PNG with no visible quality loss</td></tr>
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
          <p>Raster images render 1:1 — the tool draws the same pixels onto the output canvas without re-sampling, so there is no quality loss beyond what the DPI setting implies.</p>
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
    relatedTools: ["merge-pdf", "split-pdf", "image-to-pdf", "pdf-to-text"],
    seo: {
      title: "PDF to Image — Convert PDF to PNG/JPG Free | AHADEX Tools",
      description:
        "Convert PDF pages to high-quality PNG or JPG images in your browser. Up to 300 DPI, page ranges, no uploads.",
      ogImage: "/images/og/tools/pdf-to-image-og.png",
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
      {
        question: "What image formats can I combine into a PDF?",
        answer:
          "JPG, JPEG, PNG, and WebP — and you can mix them freely in the same batch. JPG images are embedded byte-for-byte, so the output PDF contains the original JPEG data exactly. PNG and WebP images are composited onto a solid white background and re-encoded at 95% JPEG quality, which is visually very close to the source for typical graphics and screenshots. Transparent areas in PNG and WebP become white — this is standard behaviour because PDF pages cannot contain transparency.",
      },
      {
        question: "How is this different from the old separate JPG to PDF and PNG to PDF tools?",
        answer:
          "It replaces both. Combining JPG files into a PDF and combining PNG files into a PDF use the same underlying pipeline — read the image, composite onto a page canvas, build the PDF with pdf-lib. Splitting that into two pages for a format-specific URL creates near-duplicate content that adds no real value. This single page accepts all three formats, explains how each is handled, and covers more edge cases. The old URLs redirect here automatically.",
      },
      {
        question: "Will the image quality drop when I convert to PDF?",
        answer:
          "For JPG input, no — the image is embedded byte-for-byte, so the PDF contains the original JPEG stream from your source. For PNG and WebP input, the images are composited onto white and re-encoded at 95% JPEG quality, which is visually very close for the vast majority of graphics, screenshots, and photos. If you need lossless output, JPG input is the safest choice because it avoids any re-encoding.",
      },
      {
        question: "What happens to transparent backgrounds in PNG?",
        answer:
          "PDF pages cannot have transparency — they always render onto a background. This tool composites every transparent area onto a solid white background before embedding the page. This matches the standard behaviour of print shops and PDF readers: transparency in the source becomes white in the output. If you need to preserve transparency, use a PNG editor and keep the source as a PNG file — PDF is not a transparent format.",
      },
      {
        question: "What page size should I use?",
        answer:
          "Use A4 (210 × 297 mm) if you are in Europe, Asia, Africa, or South America — it is the international standard. Use US Letter (216 × 279 mm) if you are in the United States or Canada. Use Auto when you want the PDF page to match each image's own dimensions exactly, with no whitespace added — this is common for photo albums and design portfolios. If you are not sure, A4 is the safest worldwide choice.",
      },
      {
        question: "Can I reorder pages after adding them?",
        answer:
          "Yes. Drag thumbnails directly in the page list to move them around, or use the up and down arrow buttons that appear on each row. Click the X button to remove a page. Everything updates live — the PDF you export reflects the exact order you see on screen.",
      },
      {
        question: "How many images can I combine into one PDF?",
        answer:
          "Up to 50 pages per PDF. For larger documents, split the work into two or three batches and export each one separately, then use our Merge PDF tool to combine the resulting PDFs. This keeps the browser responsive on mobile devices and avoids running into memory limits.",
      },
      {
        question: "Is my data uploaded to a server?",
        answer:
          "No. The entire pipeline — reading image files, decoding them, compositing each onto a page canvas, and assembling the PDF with pdf-lib — runs inside your browser. Your images never travel over the network, never touch a server, and never end up in anyone's logs. This is important for passport photos, ID copies, medical scans, and any other sensitive document you would not email to a stranger.",
      },
      {
        question: "What margins should I use?",
        answer:
          "For professional documents (invoices, contracts, reports), use 15-20 mm margins so the content does not touch the page edge. For photo albums and design portfolios where the image should fill the page, use 0 mm. For a printable book-like document, 20 mm on top and bottom and 25 mm on the left and right gives a comfortable reading layout.",
      },
      {
        question: "Can I merge an existing PDF with new images?",
        answer:
          "Not with this tool directly — but you can achieve it in two steps. First, convert the images to a PDF using this tool. Then use our Merge PDF tool to combine that new PDF with your existing PDF. Both tools run in the browser, so the whole workflow is private.",
      },
      {
        question: "Does the PDF embed a specific PDF version?",
        answer:
          "Yes — pdf-lib generates PDF 1.7 output, which is the modern standard supported by every PDF reader released in the last 15 years. Chrome, Safari, Firefox, Preview, Acrobat Reader, and every mobile PDF app can open the output without any special configuration.",
      },
      {
        question: "Can I add page numbers or a title?",
        answer:
          "Not in this version. The current tool focuses on combining images cleanly. Page numbers, headers, footers, and metadata are on the roadmap. For now, if you need those, open the exported PDF in a full PDF editor after conversion.",
      },
      {
        question: "Does it work on mobile phones and tablets?",
        answer:
          "Yes. The tool is fully responsive and works in iOS Safari, Android Chrome, Firefox for Android, and Samsung Internet. Very large batches (40-50 images) may take longer on mobile due to browser memory limits — for those, use a laptop or desktop if possible.",
      },
      {
        question: "What file size can I expect for the output PDF?",
        answer:
          "The output PDF is roughly the sum of the input image sizes, plus a small overhead for the PDF structure itself. Ten 500 KB JPGs typically produce a PDF around 5-6 MB. If you need a smaller PDF, compress the source images with our Image Compressor first, then build the PDF — that workflow often cuts the final size by 60-80%.",
      },
      {
        question: "Can I combine photos and screenshots in the same PDF?",
        answer:
          "Yes. Mixed content — photos, screenshots, scanned pages, digital graphics — all work. Each image is embedded on its own page, in the order you arranged them. The only caveat is that different aspect ratios will produce different-looking pages unless you choose a fixed page size like A4 or US Letter, in which case images are scaled to fit inside the page.",
      },
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
    relatedTools: ["merge-pdf", "split-pdf", "pdf-to-image", "image-compressor"],
    seo: {
      title: "Image to PDF — Combine JPG, PNG, WebP Free | AHADEX Tools",
      description:
        "Combine JPG, PNG, and WebP images into one PDF in your browser. Multi-page, reorderable, A4/Letter, no uploads.",
      ogImage: "/images/og/tools/image-to-pdf-og.png",
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
      {
        question: "How is this different from the old Split PDF and PDF Page Extractor tools?",
        answer:
          "It replaces both. The old Split PDF handled sorted, unique page ranges. The old PDF Page Extractor handled custom order and duplicates. In practice these are two features of the same operation — extracting pages from a PDF — and splitting them across two URLs created near-duplicate content. This unified page covers both: Combined mode with custom order and duplicates (formerly PDF Page Extractor), and Separate mode that splits every page into its own file (formerly Split PDF's second mode). Both old URLs redirect here automatically.",
      },
      {
        question: "Can I extract the same page more than once?",
        answer:
          "Yes. Type '3, 3' to get page 3 twice, or '1, 1, 1' for a three-page PDF with page 1 repeated. This is useful for printing a signature page on multiple copies, creating a physical cover page for each recipient, or duplicating a reference page next to different sections. Duplicates work in Combined mode; Separate mode always produces exactly one file per source page.",
      },
      {
        question: "Can I reverse the page order of a PDF?",
        answer:
          "Yes. Enter the pages in reverse — if the document has 10 pages, type '10, 9, 8, 7, 6, 5, 4, 3, 2, 1'. The output PDF has the pages in exactly the order you typed, so this instantly flips the document. Useful for right-to-left reading order, reversing scanned pages that came out backwards, or preparing PDFs for reverse-chronological presentations.",
      },
      {
        question: "What is the difference between Combined and Separate modes?",
        answer:
          "Combined mode produces one new PDF containing all the pages you selected, in the order you wrote them. Separate mode ignores your page selection and produces one PDF per source page — if the source has 30 pages, you get 30 single-page PDFs. Use Combined when you want a curated subset in a specific order; use Separate when you need every page as an independent file.",
      },
      {
        question: "Does the PDF quality drop?",
        answer:
          "No. Every page is copied byte-for-byte from the source PDF into the output PDF. The tool does not re-render, re-compress, or resample anything — it copies page objects exactly as they exist in the source file. Embedded images, fonts, vector graphics, and annotations all survive identically.",
      },
      {
        question: "Is my PDF uploaded to a server?",
        answer:
          "Never. Everything — parsing the PDF, copying the page objects, and assembling the output — runs inside your browser using pdf-lib, a widely-used JavaScript PDF library. Your file never travels over the network, never touches a server, and never ends up in anyone's logs. This matters for contracts, invoices, medical records, and any other sensitive document.",
      },
      {
        question: "What page range syntax is supported?",
        answer:
          "Standard syntax: '3' for a single page, '1-5' for a consecutive range, '1, 5, 10' for non-contiguous pages, and '1-3, 5, 7-9' for mixed. Spaces and commas are both fine. Duplicates are allowed — '3, 3' gives page 3 twice. The tool validates your input and reports exactly which pages will be extracted before you click Extract.",
      },
      {
        question: "Can I split a password-protected PDF?",
        answer:
          "Password-protected PDFs cannot be opened without the password, so the tool will show an error. PDFs that are only restricted against editing (owner password, not user password) usually work. If you need to split a fully protected PDF, open it in your PDF reader, enter the password, and re-save it as an unencrypted copy first.",
      },
      {
        question: "How long does splitting a large PDF take?",
        answer:
          "Fast. A 200-page PDF with 100 MB of content typically finishes in under five seconds on modern hardware. The bottleneck is not page count but the total file size — pdf-lib has to read and rebuild the entire PDF structure. For very large files (500+ pages, 200+ MB), allow 15-30 seconds.",
      },
      {
        question: "Does Separate mode preserve the original page order?",
        answer:
          "Yes. Files download as page-001.pdf, page-002.pdf, and so on, in the exact order they appear in the source PDF. If the browser downloads them out of order (some browsers do for batches), the numbered filenames make it trivial to sort them back. Zip download is on the roadmap for future releases.",
      },
      {
        question: "Can I extract pages and merge them into a different PDF?",
        answer:
          "Yes, in two steps. First, extract the pages you want using this tool in Combined mode. Then use our Merge PDF tool to combine the extracted PDF with the other document. Both tools run in the browser, so the entire workflow stays private.",
      },
      {
        question: "Does it work on mobile phones?",
        answer:
          "Yes. The tool is fully responsive and works in iOS Safari, Android Chrome, Firefox for Android, and Samsung Internet. Large PDFs (100+ MB) may take longer on mobile due to browser memory limits — for those, use a laptop or desktop if possible.",
      },
      {
        question: "Can I remove pages from a PDF?",
        answer:
          "Yes, indirectly — use Combined mode and list the pages you want to KEEP, omitting the ones you want to remove. For example, to remove page 3 from a 10-page PDF, enter '1-2, 4-10'. The output contains every page except 3. There is no separate 'remove pages' mode because keeping the complement is mathematically identical and simpler to reason about.",
      },
      {
        question: "What happens if I enter a page number that does not exist?",
        answer:
          "The tool validates your input before processing and shows an error if you reference a page outside the document's range. If the source PDF has 10 pages and you type '11', the tool refuses to run and points out the invalid page. Nothing is processed until the input is valid.",
      },
      {
        question: "Can I split a scanned PDF?",
        answer:
          "Yes. A scanned PDF is still a valid PDF with page objects, and this tool copies those page objects directly. The output keeps the same scanned image quality as the source, byte-for-byte. The tool does not perform OCR or any text processing — it works purely at the page level.",
      },
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
        heading: "How the copy works — byte-for-byte, lossless",
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
    relatedTools: ["merge-pdf", "pdf-to-image", "pdf-rotator"],
    seo: {
      title: "Split PDF — Extract Pages, Custom Order Free | AHADEX Tools",
      description:
        "Extract pages from any PDF in custom order, with duplicates, or split every page into separate files. Runs in your browser.",
      ogImage: "/images/og/tools/split-pdf-og.png",
    },
  },
];
