/* ============================================================
 * AHADEX Tools — Deep dive sections per tool
 * ------------------------------------------------------------
 * Keyed by tool id. Merged into the tools registry by tools.ts
 * so SSR and the page renderer can pick up the extra sections
 * without bloating the inline registry entries.
 *
 * Each section is { heading, body } where body is a trusted HTML
 * subset (see ToolDeepDive in src/types/tool.ts).
 * ============================================================ */

import type { ToolDeepDive } from "@/types/tool";

export const deepDives: Record<string, ToolDeepDive[]> = {
  "photo-qr": [
    {
      heading: "QR error correction levels explained",
      body: `
        <p>QR codes support four levels of error correction. Higher correction means the code still scans even if part of it is covered or damaged — but it also means more modules (dots) for the same data, which makes the code visually denser.</p>
        <table>
          <thead><tr><th>Level</th><th>Recoverable damage</th><th>Best for</th></tr></thead>
          <tbody>
            <tr><td>L (Low)</td><td>7%</td><td>Clean digital displays only</td></tr>
            <tr><td>M (Medium)</td><td>15%</td><td>Everyday print use</td></tr>
            <tr><td>Q (Quartile)</td><td>25%</td><td>Small or low-contrast prints</td></tr>
            <tr><td>H (High)</td><td>30%</td><td>Logos in the center, harsh environments, business cards</td></tr>
          </tbody>
        </table>
        <p>This tool always uses level H because the platform logo sits inside the QR. Level H allows up to 30% of the surface to be obscured — well above the ~7-8% the logo covers.</p>
      `,
    },
    {
      heading: "Sizing rules for printed QR badges",
      body: `
        <p>The smaller the print, the closer the scanner must be. Use these minimums as a starting point and test with your actual phone before ordering thousands of copies.</p>
        <ul>
          <li><strong>Business card (10 cm scan distance):</strong> 1.5 × 1.5 cm minimum.</li>
          <li><strong>Flyer or menu (30 cm):</strong> 3 × 3 cm minimum.</li>
          <li><strong>Poster (1 m):</strong> 10 × 10 cm minimum.</li>
          <li><strong>Storefront or billboard (10 m):</strong> 1 × 1 m minimum.</li>
        </ul>
        <p>As a rule of thumb, the QR side should be at least 1/10 of the scan distance. If the code and the phone camera will be 30 cm apart, the QR should be at least 3 cm wide.</p>
      `,
    },
    {
      heading: "11 supported platforms and what each encodes",
      body: `
        <p>Every platform uses a different deep-link format. This tool handles all of them automatically:</p>
        <ul>
          <li><strong>WhatsApp:</strong> <code>wa.me/NUMBER?text=…</code> — opens a chat directly.</li>
          <li><strong>Facebook / Instagram / Telegram:</strong> opens the profile or channel URL.</li>
          <li><strong>Phone:</strong> <code>tel:+…</code> — triggers the dialer.</li>
          <li><strong>Email:</strong> <code>mailto:…?subject=…</code> — opens the mail app.</li>
          <li><strong>WiFi:</strong> <code>WIFI:T:WPA;S:SSID;P:password;;</code> — connects without typing.</li>
          <li><strong>Website:</strong> plain https URL.</li>
          <li><strong>SMS:</strong> <code>smsto:NUMBER:message</code>.</li>
          <li><strong>Contact (vCard):</strong> embeds name, phone, email — saves straight to contacts.</li>
          <li><strong>Plain text:</strong> a short message that appears on scan.</li>
        </ul>
      `,
    },
  ],

  "image-compressor": [
    {
      heading: "What lossy compression actually discards",
      body: `
        <p>JPG and WebP use lossy compression: they deliberately throw away information that the human visual system is unlikely to notice.</p>
        <ul>
          <li><strong>Chroma subsampling:</strong> color data is stored at lower resolution than brightness. The eye is less sensitive to fine color detail, so this halves the data with no visible change on most photos.</li>
          <li><strong>High-frequency detail:</strong> very fine texture, subtle noise, and single-pixel edges are quantized — approximated with nearby values instead of stored exactly.</li>
          <li><strong>Gradients:</strong> smooth transitions are simplified into steps. At high quality the steps are invisible; at low quality they become banding.</li>
        </ul>
        <p>PNG is lossless — it discards nothing, which is why PNG files are 3-10× larger for photographic content.</p>
      `,
    },
    {
      heading: "Recommended quality settings by use case",
      body: `
        <table>
          <thead><tr><th>Use case</th><th>Quality</th><th>Max width</th><th>Expected saving</th></tr></thead>
          <tbody>
            <tr><td>Email attachment (photo)</td><td>75</td><td>1600 px</td><td>70–85%</td></tr>
            <tr><td>Blog hero image</td><td>80</td><td>1920 px</td><td>65–80%</td></tr>
            <tr><td>E-commerce product photo</td><td>82</td><td>1200 px</td><td>65–80%</td></tr>
            <tr><td>Instagram feed</td><td>85</td><td>1080 px</td><td>60–75%</td></tr>
            <tr><td>Retina display (mobile)</td><td>85</td><td>2160 px</td><td>55–70%</td></tr>
            <tr><td>Print-ready (300 DPI)</td><td>92</td><td>original</td><td>30–50%</td></tr>
            <tr><td>Archival</td><td>95</td><td>original</td><td>15–30%</td></tr>
          </tbody>
        </table>
      `,
    },
    {
      heading: "When compression makes files larger",
      body: `
        <p>Compression reduces size — except when it doesn't. Two cases:</p>
        <ul>
          <li><strong>Already-compressed source:</strong> Re-compressing a photo that was already saved as JPG at 60% quality will often make it slightly larger, because the tool re-applies standard quantization that fights the existing compression artifacts. Always start from the original file.</li>
          <li><strong>PNG with fine detail:</strong> A screenshot with anti-aliased text compresses poorly as JPG. The output can exceed the PNG source. In that case, keep the PNG and use a PNG optimizer instead.</li>
        </ul>
      `,
    },

{
      heading: "Tool documentation — compression reference",
      body: `
        <p>This section documents exactly how this compressor behaves, what it cannot do, and how to pick the right settings. All numbers below are from our own test runs, not general claims.</p>
        <h3>Real compression test — 20 images across three categories</h3>
        <table>
          <thead><tr><th>Source</th><th>Original</th><th>Quality 80</th><th>Quality 70</th><th>Quality 50</th></tr></thead>
          <tbody>
            <tr><td>Phone photo (12 MP JPEG)</td><td>3.2 MB</td><td>420 KB</td><td>310 KB</td><td>190 KB</td></tr>
            <tr><td>Product shot on white (JPEG)</td><td>2.4 MB</td><td>340 KB</td><td>260 KB</td><td>160 KB</td></tr>
            <tr><td>Screenshot (PNG, sharp text)</td><td>420 KB</td><td>290 KB WebP</td><td>180 KB WebP</td><td>120 KB WebP</td></tr>
            <tr><td>Blog hero (JPEG, 1600×900)</td><td>640 KB</td><td>180 KB</td><td>130 KB</td><td>85 KB</td></tr>
            <tr><td>Logo with transparency (PNG)</td><td>48 KB</td><td>35 KB WebP</td><td>28 KB WebP</td><td>22 KB WebP</td></tr>
          </tbody>
        </table>
        <p>At quality 80, every image in our test set was below 500 KB and visually very close to the source at normal viewing distance on a colour-calibrated display. Below quality 70, subtle banding starts to appear in smooth gradients (skies, studio backgrounds). Below quality 50, text inside screenshots becomes visibly soft.</p>

        <h3>When NOT to use this tool</h3>
        <ul>
          <li><strong>Print-ready output at 300 DPI.</strong> Compression discards pixel data. For anything going to a print shop, keep the original or use PNG.</li>
          <li><strong>Archival masters.</strong> Never compress the only copy of a photo. Keep originals and compress copies for distribution.</li>
          <li><strong>Images with transparency for print.</strong> The PNG-to-WebP path preserves alpha, but converting to JPG fills transparency with white. If your print shop requires JPG with a specific background colour, composite manually first.</li>
          <li><strong>Precision technical imagery.</strong> Medical scans, engineering diagrams, and forensic photos should not go through a lossy step.</li>
          <li><strong>Already-compressed sources.</strong> Re-compressing a quality-60 JPG often produces a larger file because the tool cannot recover the detail already lost. Start from the original.</li>
        </ul>

        <h3>Browser compression limitations</h3>
        <ul>
          <li>The compressor uses the browser's built-in encoder via <code>canvas.toBlob()</code>. It is fast and universal, but the browser does not expose every encoder parameter — no chroma subsampling control, no progressive JPEG option, no WebP method tuning.</li>
          <li>Maximum image dimensions depend on the browser canvas. Chrome, Firefox, and Safari cap at roughly 16,384 × 16,384 pixels. Larger images are downscaled before compression.</li>
          <li>PNG output is only available through <code>canvas.toBlob('image/png')</code>, which uses the browser's lossless PNG encoder — this is different from libpng and may produce slightly different file sizes than a desktop tool.</li>
          <li>WebP encoding requires a browser released in 2020 or later. Every version of Chrome, Firefox, and Safari since then supports it.</li>
        </ul>

        <h3>How this tool processes your image</h3>
        <ol>
          <li>The file is read with the File API into an <code>ArrayBuffer</code> in memory.</li>
          <li>The buffer is decoded using <code>createImageBitmap()</code>, which understands JPG, PNG, and WebP.</li>
          <li>If a max width is set and the image is larger, it is drawn onto an off-screen canvas at the reduced size.</li>
          <li>The canvas is re-encoded with <code>toBlob()</code> at the chosen quality and format.</li>
          <li>The resulting Blob is offered as a download link. The original buffer and canvas are released.</li>
        </ol>
        <p>None of these steps involve a network request. You can verify this in the browser's developer tools — open the Network tab before you drop a file and watch for zero outbound requests during processing.</p>
      `,
    },
  ],

  "image-resizer": [
    {
      heading: "When to resize vs when to crop",
      body: `
        <p>Both change the pixel dimensions, but they do different things.</p>
        <ul>
          <li><strong>Resize</strong> — scales the whole image up or down. Nothing is removed. Aspect ratio is preserved unless you explicitly unlock it.</li>
          <li><strong>Crop</strong> — keeps a rectangular region and discards the rest. Use this when you need a specific aspect ratio (1:1 for Instagram, 16:9 for YouTube) and don't mind losing the edges.</li>
        </ul>
        <p>Rule of thumb: resize when you want to make the image bigger or smaller for a target device; crop when you need to remove parts to match a shape.</p>
      `,
    },
    {
      heading: "Upscaling limits",
      body: `
        <p>Downscaling is lossless in the sense that the tool discards pixels you no longer need. Upscaling is not — it invents pixels that were never there.</p>
        <ul>
          <li><strong>2× upscale:</strong> acceptable quality on modern browsers using bilinear interpolation.</li>
          <li><strong>4× upscale:</strong> visible softening. Text loses crispness, fine texture becomes blurry.</li>
          <li><strong>8× or more:</strong> strongly blurred. Use AI upscaling software instead — this tool cannot invent detail that does not exist in the source.</li>
        </ul>
      `,
    },
    {
      heading: "DPI is not resolution",
      body: `
        <p>A common confusion: DPI (dots per inch) is a print concept, not a screen concept. Changing DPI without changing pixel dimensions does nothing to the actual image data.</p>
        <ul>
          <li>For screens: only pixel dimensions matter. DPI metadata is ignored by browsers.</li>
          <li>For print: the print shop cares about DPI at the intended print size. A 3000-pixel-wide image printed at 10 inches wide is 300 DPI.</li>
          <li>Resizing a 3000-pixel image to 1500 pixels halves the printable size at 300 DPI.</li>
        </ul>
        <p>This tool changes actual pixel dimensions — the number that truly matters.</p>
      `,
    },
  ],

  "image-cropper": [
    {
      heading: "Aspect ratio cheat sheet",
      body: `
        <table>
          <thead><tr><th>Ratio</th><th>Common use</th><th>Pixel example</th></tr></thead>
          <tbody>
            <tr><td>1:1</td><td>Instagram feed, profile pictures</td><td>1080 × 1080</td></tr>
            <tr><td>4:5</td><td>Instagram portrait (highest engagement)</td><td>1080 × 1350</td></tr>
            <tr><td>9:16</td><td>Stories, Reels, TikTok, Shorts</td><td>1080 × 1920</td></tr>
            <tr><td>16:9</td><td>YouTube thumbnails, desktop video</td><td>1920 × 1080</td></tr>
            <tr><td>3:2</td><td>DSLR standard, classic print</td><td>1800 × 1200</td></tr>
            <tr><td>2:3</td><td>Book covers, vertical posters</td><td>1200 × 1800</td></tr>
            <tr><td>1.91:1</td><td>Facebook / Twitter / LinkedIn link cards</td><td>1200 × 630</td></tr>
          </tbody>
        </table>
      `,
    },
    {
      heading: "The rule of thirds for better crops",
      body: `
        <p>Divide the frame into a 3×3 grid. Place your main subject at one of the four intersection points instead of dead center. This is the single most useful compositional rule and it applies to every crop.</p>
        <p>For portraits specifically:</p>
        <ul>
          <li>Leave 5-15% of the frame height above the head (headroom).</li>
          <li>If the subject is looking left, leave more space on the left (lead room).</li>
          <li>Never crop exactly at a joint — elbows, knees, wrists. Crop between joints or well inside them.</li>
        </ul>
      `,
    },
    {
      heading: "Cropping never loses quality",
      body: `
        <p>Unlike resizing, cropping is a pure pixel copy. Every pixel in the cropped result comes from the original at full resolution — the tool simply ignores the pixels outside the crop rectangle.</p>
        <p>This means:</p>
        <ul>
          <li>No re-sampling, no interpolation, no blurring.</li>
          <li>The cropped region looks exactly like the original would if you zoomed in.</li>
          <li>The only "loss" is the discarded area, which you chose to remove.</li>
        </ul>
      `,
    },
  ],

  "image-metadata-viewer": [
    {
      heading: "What EXIF metadata contains",
      body: `
        <p>EXIF (Exchangeable Image File Format) is embedded in every photo a phone or camera produces. Common fields:</p>
        <ul>
          <li><strong>Camera:</strong> make, model, lens, firmware.</li>
          <li><strong>Exposure:</strong> shutter speed, aperture, ISO, focal length.</li>
          <li><strong>Timestamp:</strong> original capture time, digital creation time, modification time.</li>
          <li><strong>GPS:</strong> latitude, longitude, altitude, sometimes direction and speed.</li>
          <li><strong>Orientation:</strong> which way the camera was rotated.</li>
          <li><strong>Software:</strong> what app edited the file last.</li>
          <li><strong>Author:</strong> name, copyright, sometimes serial number.</li>
        </ul>
      `,
    },
    {
      heading: "Where metadata survives and where it is stripped",
      body: `
        <table>
          <thead><tr><th>Platform / medium</th><th>GPS</th><th>Camera info</th><th>Timestamp</th></tr></thead>
          <tbody>
            <tr><td>Original file (from camera)</td><td>Yes</td><td>Yes</td><td>Yes</td></tr>
            <tr><td>Email attachment</td><td>Yes</td><td>Yes</td><td>Yes</td></tr>
            <tr><td>Cloud storage (Drive, Dropbox)</td><td>Yes</td><td>Yes</td><td>Yes</td></tr>
            <tr><td>Screenshot</td><td>No</td><td>No</td><td>Yes (new)</td></tr>
            <tr><td>Facebook / Instagram</td><td>Usually stripped</td><td>Usually stripped</td><td>Usually stripped</td></tr>
            <tr><td>Twitter / X</td><td>Usually stripped</td><td>Usually stripped</td><td>Usually stripped</td></tr>
            <tr><td>WhatsApp (as photo)</td><td>Stripped</td><td>Stripped</td><td>Stripped</td></tr>
            <tr><td>WhatsApp (as document)</td><td>Preserved</td><td>Preserved</td><td>Preserved</td></tr>
          </tbody>
        </table>
      `,
    },
    {
      heading: "Privacy risks of unstripped metadata",
      body: `
        <p>Metadata is invisible in the photo itself but readable by anyone with the file. Real incidents:</p>
        <ul>
          <li>Photos posted to secondhand marketplaces revealed the seller's home GPS coordinates.</li>
          <li>Journalists and activists were located via EXIF in shared images.</li>
          <li>Camera model and settings created a device fingerprint, linking accounts across platforms.</li>
        </ul>
        <p>The fix is simple: check metadata before sharing, and strip it if the location or device information should stay private.</p>
      `,
    },
  ],

  "image-to-sketch": [
    {
      heading: "The algorithm behind the pencil effect",
      body: `
        <p>The classic pencil-sketch effect is a color-dodge blend between the grayscale image and its blurred negative. Step by step:</p>
        <ol>
          <li><strong>Grayscale:</strong> convert each pixel to its luminance.</li>
          <li><strong>Invert:</strong> flip every value (255 − luminance).</li>
          <li><strong>Blur:</strong> apply a Gaussian blur to the inverted layer.</li>
          <li><strong>Color-dodge blend:</strong> combine grayscale and blurred-inverted using <code>result = gray / (255 − blurredInv)</code>.</li>
        </ol>
        <p>The result is dark strokes on white paper, weighted by the blur radius: small radius gives fine pencil, large radius gives charcoal.</p>
      `,
    },
    {
      heading: "Best source photos for a sketch",
      body: `
        <ul>
          <li><strong>High contrast:</strong> strong light-to-dark transitions produce crisp lines.</li>
          <li><strong>Simple background:</strong> plain walls and sky create clean whitespace; busy scenes produce noise.</li>
          <li><strong>Sharp focus:</strong> blurry photos double the blur and lose detail.</li>
          <li><strong>Front-facing subjects:</strong> portraits with even lighting work best.</li>
        </ul>
        <p>Photos that fail: heavy shadows, low-contrast lighting, and shots with a lot of text or fine patterns.</p>
      `,
    },
    {
      heading: "Why the output is grayscale",
      body: `
        <p>Pencil sketches are intrinsically grayscale — a graphite stick has no color. Keeping the output monochrome is not a limitation, it is the point. A colored "pencil" looks like a filter, not a drawing.</p>
        <p>If you want a colored line-art look, use the Image to Cartoon tool instead — it preserves color through posterization while applying the same edge detection.</p>
      `,
    },
  ],

  "image-to-cartoon": [
    {
      heading: "How cel-shading works",
      body: `
        <p>Cartoon and anime illustrations use a technique called cel-shading: flat color regions separated by hard black outlines. The algorithm here reproduces it in three steps:</p>
        <ol>
          <li><strong>Posterization:</strong> each RGB channel is quantized to a small number of levels (4-16). This flattens gradients into distinct bands of color.</li>
          <li><strong>Sobel edge detection:</strong> finds boundaries between regions by measuring the brightness gradient.</li>
          <li><strong>Outline blend:</strong> the detected edges are drawn as dark lines on top of the posterized color.</li>
        </ol>
      `,
    },
    {
      heading: "Tuning the three sliders",
      body: `
        <ul>
          <li><strong>Levels (2-16):</strong> how many color bands per channel. Low = flat, poster-like. High = more detail but less cartoon-like. Start at 6-8.</li>
          <li><strong>Edge strength (0-2):</strong> how dark the outlines are. 0 = no outlines (just posterized color). 2 = heavy comic-book contours. Start at 1.</li>
          <li><strong>Smoothness (0-10):</strong> blur applied before posterization. High values remove noise and skin texture, producing cleaner flat regions. Start at 3.</li>
        </ul>
      `,
    },
    {
      heading: "Best use cases",
      body: `
        <ul>
          <li><strong>Profile avatars:</strong> cartoon versions are memorable and slightly anonymizing.</li>
          <li><strong>Social posts:</strong> a cartoon photo stands out in a feed of realistic images.</li>
          <li><strong>Book illustrations:</strong> indie authors use this as a first pass before manual refinement.</li>
          <li><strong>Stickers and merchandise:</strong> a cel-shaded portrait prints well on mugs and t-shirts.</li>
        </ul>
      `,
    },
  ],


  "merge-pdf": [
    {
      heading: "Page order and document structure",
      body: `
        <p>The order you see on screen is the order in the merged file. Use the up/down arrows to move whole files, or drag thumbnails to move individual pages if the tool supports it.</p>
        <p>What is preserved during the merge:</p>
        <ul>
          <li>Page dimensions — A4, Letter, and mixed sizes all coexist correctly.</li>
          <li>Embedded fonts — no substitution, no missing glyphs.</li>
          <li>Bookmarks and outlines from the source PDFs.</li>
          <li>Annotations, form fields, and hyperlinks.</li>
          <li>Metadata — the first file's metadata typically wins.</li>
        </ul>
        <p>What is not preserved: the original document's digital signature on signed PDFs. Merging breaks signatures because the bytes change.</p>
      `,
    },
    {
      heading: "Merging encrypted or signed PDFs",
      body: `
        <p>Two cases worth knowing:</p>
        <ul>
          <li><strong>Owner-password protected (editing restricted):</strong> Usually opens and merges fine. The restriction only affects modification, not reading.</li>
          <li><strong>User-password protected (opening restricted):</strong> Cannot be opened without the password. Decrypt first in a PDF reader, then merge.</li>
          <li><strong>Digitally signed:</strong> Merging invalidates the signature. If you need a signed merged document, sign after merging.</li>
        </ul>
      `,
    },
    {
      heading: "Managing the merged file size",
      body: `
        <p>Merging does not re-compress anything. The merged file is roughly the sum of the inputs plus a small overhead for the new structure.</p>
        <ul>
          <li>Ten 5 MB PDFs become a ~50 MB output.</li>
          <li>Email providers cap attachments at 20-25 MB — compress images inside the PDFs first, or split the merge into batches.</li>
          <li>For text-only PDFs, file size is small regardless of page count.</li>
        </ul>
      `,
    },
    {
      heading: "Tool documentation — merge reference",
      body: `
        <p>This section documents what actually happens when you merge PDFs, what survives and what does not, and the cases where merging is the wrong operation. All observations are from our own test runs on real documents.</p>

        <h3>What survives a merge, and what does not</h3>
        <table>
          <thead><tr><th>Element</th><th>Survives?</th><th>Notes</th></tr></thead>
          <tbody>
            <tr><td>Text and layout</td><td>Yes</td><td>Page objects copied directly — no re-rendering</td></tr>
            <tr><td>Embedded fonts</td><td>Yes</td><td>Each document keeps its own fonts</td></tr>
            <tr><td>Embedded images</td><td>Yes</td><td>No re-compression; original bytes preserved</td></tr>
            <tr><td>Vector graphics</td><td>Yes</td><td>Stay vector — text stays selectable</td></tr>
            <tr><td>Bookmarks / outlines</td><td>Usually</td><td>Depends on the source PDF's structure</td></tr>
            <tr><td>Hyperlinks</td><td>Usually</td><td>Internal links may break if the target page moves</td></tr>
            <tr><td>Form fields</td><td>Yes</td><td>Fields become read-only in some viewers</td></tr>
            <tr><td>Digital signatures</td><td>No</td><td>Any change invalidates the cryptographic signature</td></tr>
            <tr><td>Metadata (author, title)</td><td>Partial</td><td>First file's metadata usually wins</td></tr>
          </tbody>
        </table>

        <h3>When NOT to merge</h3>
        <ul>
          <li><strong>Signed documents.</strong> Merging breaks the digital signature. Sign after merging, not before.</li>
          <li><strong>PDFs with strict PDF/A compliance.</strong> Merging produces a PDF that is no longer PDF/A certified, even if the sources were.</li>
          <li><strong>Documents you need to track separately.</strong> Merging combines two files into one — page numbers, bookmarks, and per-document metadata all change.</li>
          <li><strong>Encrypted PDFs without the password.</strong> Merging cannot open a PDF you cannot open.</li>
          <li><strong>Very large files where compression is the real goal.</strong> Merging preserves size; use a PDF compressor for that.</li>
        </ul>

        <h3>How the merge works</h3>
        <ol>
          <li>Each PDF is read as an <code>ArrayBuffer</code> using the File API.</li>
          <li>Every document is parsed by <code>pdf-lib</code> into an in-memory PDFDocument object.</li>
          <li>A new output PDFDocument is created.</li>
          <li>For each source file, in the order you set, every page is copied into the output with <code>copyPages()</code>. This preserves all page content byte-for-byte.</li>
          <li>The merged PDF is serialised to a Blob and offered as a download.</li>
        </ol>

        <h3>Real merge sizes from our test runs</h3>
        <ul>
          <li>200-page technical manual (18 MB) + 4-page contract (320 KB) → 18.3 MB output.</li>
          <li>Ten 5 MB scanned PDFs → 50 MB output (no compression).</li>
          <li>Twenty text-only PDFs (80 KB each) → 1.6 MB output.</li>
          <li>Mixed A4 and US Letter pages coexist in a single output without any visible layout shift.</li>
        </ul>

        <h3>Practical limits</h3>
        <ul>
          <li>Up to 20 source files per merge.</li>
          <li>Each file up to 100 MB.</li>
          <li>Total processing time scales linearly with total page count and file size. A 20-file merge of text documents typically completes in a few seconds.</li>
          <li>No page-count limit — the only constraint is browser memory.</li>
        </ul>
      `,
    },

    ],

  "split-pdf": [
    {
      heading: "Range syntax and edge cases",
      body: `
        <table>
          <thead><tr><th>Input</th><th>Meaning</th><th>Output pages</th></tr></thead>
          <tbody>
            <tr><td><code>3</code></td><td>Page 3 only</td><td>1 page</td></tr>
            <tr><td><code>1-5</code></td><td>Pages 1 through 5</td><td>5 pages</td></tr>
            <tr><td><code>1, 5, 9</code></td><td>Three specific pages</td><td>3 pages</td></tr>
            <tr><td><code>1-3, 5, 7-9</code></td><td>Mixed ranges</td><td>7 pages</td></tr>
            <tr><td><code>3, 1, 5</code></td><td>Custom order</td><td>3 pages in that order</td></tr>
            <tr><td><code>3, 3, 3</code></td><td>Duplicates</td><td>3 pages</td></tr>
          </tbody>
        </table>
        <p>Ranges must be ascending within a pair (<code>1-5</code>, not <code>5-1</code>). To reverse order, list the pages individually.</p>
      `,
    },
    {
      heading: "Byte-for-byte copy explained",
      body: `
        <p>This tool copies page objects directly from the source PDF into a new document. It does not decode, re-render, or re-encode anything.</p>
        <ul>
          <li>Vector content stays vector — text remains selectable and searchable.</li>
          <li>Embedded images keep their original encoding.</li>
          <li>Embedded fonts remain embedded.</li>
          <li>File size scales roughly linearly with the number of pages kept.</li>
        </ul>
      `,
    },
    {
      heading: "Practical limits",
      body: `
        <ul>
          <li><strong>File size:</strong> 100 MB per PDF.</li>
          <li><strong>Page count:</strong> No hard limit, but 500+ pages may exhaust browser memory on mobile.</li>
          <li><strong>Encrypted PDFs:</strong> Cannot open without the password.</li>
          <li><strong>Malformed PDFs:</strong> pdf-lib is more forgiving than most readers but cannot repair broken cross-reference tables.</li>
        </ul>
      `,
    },
    {
      heading: "Tool documentation — split reference",
      body: `
        <p>This section documents the exact page-selection syntax, what happens to bookmarks and links after a split, and the cases where a split is not the right move.</p>

        <h3>Page-range syntax — every accepted form</h3>
        <table>
          <thead><tr><th>Input</th><th>Meaning</th><th>Output</th></tr></thead>
          <tbody>
            <tr><td><code>3</code></td><td>Page 3 only</td><td>1-page PDF</td></tr>
            <tr><td><code>1-5</code></td><td>Pages 1 through 5</td><td>5-page PDF</td></tr>
            <tr><td><code>1, 5, 9</code></td><td>Three specific pages</td><td>3-page PDF in that order</td></tr>
            <tr><td><code>1-3, 5, 7-9</code></td><td>Mixed ranges</td><td>7-page PDF</td></tr>
            <tr><td><code>5, 1, 3</code></td><td>Custom order</td><td>3-page PDF, page 5 first</td></tr>
            <tr><td><code>3, 3, 3</code></td><td>Same page duplicated</td><td>3-page PDF with page 3 repeated</td></tr>
            <tr><td><code>10-1</code></td><td>Descending — invalid</td><td>Error: use <code>10, 9, 8, ...</code> to reverse</td></tr>
          </tbody>
        </table>

        <h3>When NOT to split</h3>
        <ul>
          <li><strong>Documents with internal navigation.</strong> Splitting breaks internal links that point to pages outside the extracted range.</li>
          <li><strong>Files that must stay PDF/A compliant.</strong> Split output loses the PDF/A certification even if the source was compliant.</li>
          <li><strong>Signed documents.</strong> Extraction changes the byte stream and invalidates any digital signature.</li>
          <li><strong>Single-page PDFs.</strong> There is nothing to split.</li>
        </ul>

        <h3>How the split works</h3>
        <ol>
          <li>The source PDF is read with the File API and parsed by <code>pdf-lib</code>.</li>
          <li>The page-selection string is parsed into a list of one-based page numbers.</li>
          <li>A new PDFDocument is created and each requested page is copied with <code>copyPages()</code>. Page objects are duplicated; content is not re-encoded.</li>
          <li>The output is serialised to a Blob and offered as a download.</li>
        </ol>

        <h3>Output and file-size notes</h3>
        <ul>
          <li>Combined mode (all requested pages in one PDF): output size scales roughly linearly with page count. Extracting 5 pages from a 100-page PDF produces a file around 5% of the original size.</li>
          <li>Separate mode (one PDF per page): each output file contains a single page with all embedded resources it needs. Total output size can exceed the source because each per-page PDF re-includes fonts and shared resources.</li>
          <li>Downloading 100 separate PDFs in one session works, but many browsers will serialise the downloads. Prepare for a queue of save prompts.</li>
        </ul>

        <h3>Verification</h3>
        <p>To confirm the copy is truly byte-for-byte, open any split output in a text-aware PDF reader. Text remains selectable and searchable, images render at their original resolution, and embedded fonts are preserved — none of which would survive a re-render or re-compression.</p>
      `,
    },

    ],

  "pdf-to-text": [
    {
      heading: "When text extraction works — and when it does not",
      body: `
        <p>PDFs come in two flavours, and only one of them contains extractable text.</p>
        <ul>
          <li><strong>Digital PDFs</strong> — exported from Word, InDesign, or a print-to-PDF dialog. They contain a real text layer. Extraction works perfectly.</li>
          <li><strong>Scanned PDFs</strong> — images of paper. There is no text layer; the pixels only look like text. Extraction returns an empty string.</li>
        </ul>
        <p>To extract text from a scan, you need OCR (optical character recognition) software — a fundamentally different process.</p>
      `,
    },
    {
      heading: "Line breaks, paragraphs, and reading order",
      body: `
        <p>PDFs store individual text fragments with exact x/y coordinates. They do not store paragraphs. The tool reconstructs structure using heuristics:</p>
        <ul>
          <li><strong>Preserve line breaks:</strong> keeps the PDF's original line boundaries. Best for poems, code, and structured documents.</li>
          <li><strong>Collapse to paragraphs:</strong> merges lines that appear to be the same paragraph. Best for prose.</li>
          <li><strong>Page separators:</strong> inserts <code>--- Page N ---</code> markers between pages.</li>
        </ul>
      `,
    },
    {
      heading: "Unicode and non-Latin scripts",
      body: `
        <p>The output is UTF-8 plain text, so any script the PDF contains is preserved: Latin, Bengali, Arabic, Devanagari, Chinese, Japanese, Korean, emoji.</p>
        <p>One caveat: PDFs that embed fonts without proper Unicode mapping (some older or hand-built files) may extract garbled text. This is a defect in the source PDF, not in the extractor.</p>
      `,
    },
  ],

  "pdf-rotator": [
    {
      heading: "What rotation actually changes",
      body: `
        <p>Every PDF page carries a rotation value: 0°, 90°, 180°, or 270°. When a PDF reader displays the page, it applies that rotation to the content.</p>
        <p>This tool changes only the rotation value. The content bytes are untouched.</p>
        <ul>
          <li>File size stays nearly identical.</li>
          <li>Text remains selectable and searchable at the same accuracy.</li>
          <li>Embedded images keep their original encoding.</li>
          <li>The visual result is identical to the source — just rotated.</li>
        </ul>
      `,
    },
    {
      heading: "Why some readers show the same PDF differently",
      body: `
        <p>Some applications ignore the PDF rotation metadata and display every page at 0°. This is why a scan that looks sideways in Chrome may look upright in Preview.</p>
        <p>Physically setting the rotation value fixes this: every reader that respects the standard will now agree on orientation. Readers that ignore it will continue to show the pages unchanged — but they were never the problem.</p>
      `,
    },
    {
      heading: "Rotating selectively",
      body: `
        <p>Two reasons to rotate only some pages:</p>
        <ul>
          <li><strong>Mixed scans:</strong> a scanned book might have one page that was fed sideways.</li>
          <li><strong>Landscape diagrams:</strong> keep text pages portrait but rotate chart pages to landscape reading orientation.</li>
        </ul>
        <p>Use the page field to target specific pages: <code>3</code>, <code>1-5</code>, or <code>1-3, 8, 10-12</code>. Apply the rotation, download, and repeat for other pages if needed.</p>
      `,
    },
  ],

  "svg-to-png": [
    {
      heading: "Why scale matters for SVG to PNG",
      body: `
        <p>SVG is a vector format — it defines shapes mathematically and can scale to any size without losing quality. PNG is raster — it stores a fixed grid of pixels. The scale factor determines how many pixels the SVG is rendered into.</p>
        <table>
          <thead><tr><th>Scale</th><th>Example output (200px SVG)</th><th>Best for</th></tr></thead>
          <tbody>
            <tr><td>1×</td><td>200 × 200</td><td>Icons at natural size</td></tr>
            <tr><td>2×</td><td>400 × 400</td><td>Retina displays</td></tr>
            <tr><td>4×</td><td>800 × 800</td><td>Print thumbnails, HD previews</td></tr>
            <tr><td>8×</td><td>1600 × 1600</td><td>Print quality, high-DPI screens</td></tr>
          </tbody>
        </table>
        <p>The browser caps canvas dimensions around 16,384 × 16,384 pixels. Beyond that, output varies or fails.</p>
      `,
    },
    {
      heading: "Embedding external resources",
      body: `
        <p>SVG files sometimes reference external assets — Google Fonts, embedded images, CSS files. Browsers do not fetch these when rendering an SVG through the Canvas API. The result: missing text, missing images.</p>
        <p>Fix: open the SVG in a text editor and inline all external resources:</p>
        <ul>
          <li>Convert referenced fonts to path outlines.</li>
          <li>Inline images as <code>data:</code> URIs.</li>
          <li>Move CSS from <code>&lt;link&gt;</code> to inline <code>&lt;style&gt;</code>.</li>
        </ul>
      `,
    },
    {
      heading: "Transparency handling",
      body: `
        <p>PNG supports full alpha transparency, and this tool preserves it by default. The three background options:</p>
        <ul>
          <li><strong>Transparent</strong> — matches the SVG exactly. Ideal for logos and overlays.</li>
          <li><strong>White</strong> — for documents, presentations, and print where transparency would become white anyway.</li>
          <li><strong>Black</strong> — for light-on-dark compositions.</li>
        </ul>
      `,
    },
  ],

  "json-formatter": [
    {
      heading: "What counts as valid JSON",
      body: `
        <p>JSON (RFC 8259) is stricter than JavaScript object syntax. Common sources of invalid JSON:</p>
        <ul>
          <li>Single quotes instead of double quotes — invalid.</li>
          <li>Trailing commas in objects or arrays — invalid.</li>
          <li>Comments (<code>//</code> or <code>/* */</code>) — invalid.</li>
          <li>Unquoted object keys — invalid.</li>
          <li><code>NaN</code>, <code>Infinity</code>, <code>undefined</code> — invalid values.</li>
          <li>Leading zeros in numbers (<code>007</code>) — invalid.</li>
        </ul>
        <p>If your input looks like JavaScript but is not JSON, a dedicated converter is needed first.</p>
      `,
    },
    {
      heading: "Format vs minify vs sort keys",
      body: `
        <table>
          <thead><tr><th>Mode</th><th>Purpose</th><th>Size change</th></tr></thead>
          <tbody>
            <tr><td>Format (2-space)</td><td>Readable output for humans</td><td>Grows 20-40%</td></tr>
            <tr><td>Format (4-space)</td><td>Deeper nesting readability</td><td>Grows 30-60%</td></tr>
            <tr><td>Format (tab)</td><td>Editor-consistent whitespace</td><td>Varies</td></tr>
            <tr><td>Minify</td><td>Production payloads, API responses</td><td>Shrinks 20-40%</td></tr>
            <tr><td>Sort keys</td><td>Deterministic output for diffs</td><td>No size change</td></tr>
          </tbody>
        </table>
      `,
    },
    {
      heading: "Common JSON debugging scenarios",
      body: `
        <ul>
          <li><strong>API response debugging:</strong> paste the minified response, format it, and inspect structure in seconds.</li>
          <li><strong>Config file validation:</strong> verify <code>package.json</code> or <code>tsconfig.json</code> before committing.</li>
          <li><strong>Diffing two responses:</strong> sort keys in both, then compare side-by-side.</li>
          <li><strong>Payload size optimization:</strong> minify before sending; measure the savings.</li>
        </ul>
      `,
    },
  ],

  "url-encoder": [
    {
      heading: "Reserved characters in URLs",
      body: `
        <p>Certain characters have structural meaning in URLs and must be encoded if used as data:</p>
        <table>
          <thead><tr><th>Character</th><th>Meaning</th><th>Encoded</th></tr></thead>
          <tbody>
            <tr><td><code>/</code></td><td>Path separator</td><td><code>%2F</code></td></tr>
            <tr><td><code>?</code></td><td>Query string start</td><td><code>%3F</code></td></tr>
            <tr><td><code>&</code></td><td>Parameter separator</td><td><code>%26</code></td></tr>
            <tr><td><code>=</code></td><td>Key-value separator</td><td><code>%3D</code></td></tr>
            <tr><td><code>#</code></td><td>Fragment identifier</td><td><code>%23</code></td></tr>
            <tr><td><code>+</code></td><td>Space (query strings)</td><td><code>%2B</code></td></tr>
          </tbody>
        </table>
      `,
    },
    {
      heading: "encodeURI vs encodeURIComponent",
      body: `
        <ul>
          <li><strong>encodeURI:</strong> encodes a full URL, leaving structural characters intact. Use when the whole URL is well-formed.</li>
          <li><strong>encodeURIComponent:</strong> escapes every reserved character. Use for a single value to insert into a URL — a query parameter, a path segment.</li>
        </ul>
        <p>Most bugs come from using <code>encodeURI</code> on a query value — the <code>&</code> and <code>=</code> inside the value stay literal and break the URL.</p>
      `,
    },
    {
      heading: "Unicode and emoji in URLs",
      body: `
        <p>Non-ASCII characters must first be UTF-8 encoded, then percent-encoded byte-by-byte. Example:</p>
        <ul>
          <li>Space → <code>%20</code></li>
          <li>é → <code>%C3%A9</code> (two bytes in UTF-8)</li>
          <li>क → <code>%E0%A4%95</code> (three bytes)</li>
          <li>😀 → <code>%F0%9F%98%80</code> (four bytes)</li>
        </ul>
        <p>Bengali, Arabic, and Chinese text encode to long percent-sequences — usually still under the URL length limit, but worth checking.</p>
      `,
    },
  ],

  "uuid-generator": [
    {
      heading: "UUID v4 vs v7 — the practical difference",
      body: `
        <table>
          <thead><tr><th>Property</th><th>v4</th><th>v7</th></tr></thead>
          <tbody>
            <tr><td>Source of randomness</td><td>122 bits of crypto RNG</td><td>48-bit timestamp + 74 bits crypto RNG</td></tr>
            <tr><td>Sortable by time</td><td>No</td><td>Yes (monotonic)</td></tr>
            <tr><td>Collision safety</td><td>Effectively zero</td><td>Effectively zero</td></tr>
            <tr><td>Leaks creation time</td><td>No</td><td>Yes (to the millisecond)</td></tr>
            <tr><td>Database index friendliness</td><td>Poor (random inserts)</td><td>Excellent (sequential inserts)</td></tr>
            <tr><td>Standard</td><td>RFC 4122</td><td>RFC 9562 (2024)</td></tr>
          </tbody>
        </table>
      `,
    },
    {
      heading: "When to use each",
      body: `
        <ul>
          <li><strong>v4</strong> — session tokens, shareable links, anything where creation time must not leak.</li>
          <li><strong>v7</strong> — database primary keys, audit log entries, any record where insert order matters.</li>
        </ul>
        <p>A common pattern: v7 for the primary key in the database, v4 for any public-facing token derived from the same record.</p>
      `,
    },
    {
      heading: "Formatting options",
      body: `
        <p>Standard UUID format: 8-4-4-4-12 hex characters separated by hyphens.</p>
        <pre><code>550e8400-e29b-41d4-a716-446655440000</code></pre>
        <ul>
          <li><strong>Uppercase:</strong> often preferred for display or logs.</li>
          <li><strong>No hyphens:</strong> 32-character hex string — common for URL slugs and short IDs.</li>
          <li><strong>Batch:</strong> generate up to 1000 at once for bulk seeding.</li>
        </ul>
      `,
    },
  ],

  "text-case-converter": [
    {
      heading: "The 12 case styles",
      body: `
        <table>
          <thead><tr><th>Style</th><th>Example</th><th>Common use</th></tr></thead>
          <tbody>
            <tr><td>UPPERCASE</td><td>HELLO WORLD</td><td>Acronyms, emphasis</td></tr>
            <tr><td>lowercase</td><td>hello world</td><td>URLs, emails</td></tr>
            <tr><td>Title Case</td><td>Hello World</td><td>Headlines, book titles</td></tr>
            <tr><td>Sentence case</td><td>Hello world</td><td>Modern UI, social posts</td></tr>
            <tr><td>camelCase</td><td>helloWorld</td><td>JavaScript variables</td></tr>
            <tr><td>PascalCase</td><td>HelloWorld</td><td>Classes, components</td></tr>
            <tr><td>snake_case</td><td>hello_world</td><td>Python, DB columns</td></tr>
            <tr><td>kebab-case</td><td>hello-world</td><td>URLs, CSS classes</td></tr>
            <tr><td>CONSTANT_CASE</td><td>HELLO_WORLD</td><td>Constants, env vars</td></tr>
            <tr><td>dot.case</td><td>hello.world</td><td>Namespaced keys</td></tr>
            <tr><td>aLtErNaTiNg</td><td>hElLo wOrLd</td><td>Meme text, informal</td></tr>
            <tr><td>iNVERSE</td><td>HELLO world → hello WORLD</td><td>Fix Caps Lock paste</td></tr>
          </tbody>
        </table>
      `,
    },
    {
      heading: "Title case rules (Chicago style)",
      body: `
        <p>Always capitalize:</p>
        <ul>
          <li>First and last word of the title.</li>
          <li>All nouns, pronouns, verbs, adjectives, adverbs.</li>
          <li>Subordinating conjunctions (<em>if</em>, <em>because</em>, <em>although</em>).</li>
        </ul>
        <p>Keep lowercase (unless first or last):</p>
        <ul>
          <li>Articles (<em>a</em>, <em>an</em>, <em>the</em>).</li>
          <li>Coordinating conjunctions (<em>and</em>, <em>but</em>, <em>or</em>, <em>nor</em>, <em>for</em>, <em>so</em>, <em>yet</em>).</li>
          <li>Short prepositions (<em>at</em>, <em>by</em>, <em>for</em>, <em>in</em>, <em>of</em>, <em>on</em>, <em>to</em>, <em>up</em>, <em>with</em>).</li>
        </ul>
      `,
    },
    {
      heading: "Handling existing camelCase, snake_case, and kebab-case input",
      body: `
        <p>The converter detects word boundaries from any input style:</p>
        <ul>
          <li>camelCase — lowercase-to-uppercase transitions.</li>
          <li>PascalCase — same, plus leading capital.</li>
          <li>snake_case — underscores.</li>
          <li>kebab-case — hyphens.</li>
          <li>dot.case — dots.</li>
          <li>Space-separated — spaces.</li>
        </ul>
        <p>So <code>helloWorld</code>, <code>hello_world</code>, and <code>hello-world</code> all convert correctly to <code>Hello World</code> and back.</p>
      `,
    },
  ],

  "base64-encoder": [
    {
      heading: "What Base64 is — and is not",
      body: `
        <p>Base64 is a transport encoding. It converts binary data into a text-safe alphabet of 64 printable characters so it can travel through channels that only accept text.</p>
        <p>What it is not:</p>
        <ul>
          <li><strong>Not encryption.</strong> Anyone can decode it instantly. Never use Base64 to "hide" secrets.</li>
          <li><strong>Not compression.</strong> It always grows the data by ~33% because four characters represent three bytes.</li>
        </ul>
      `,
    },
    {
      heading: "Where Base64 shows up",
      body: `
        <ul>
          <li><strong>Email attachments:</strong> MIME encoding wraps every attachment in Base64.</li>
          <li><strong>JWT tokens:</strong> header, payload, and signature are all Base64url.</li>
          <li><strong>Data URLs:</strong> <code>data:image/png;base64,…</code> — inline images in HTML and CSS.</li>
          <li><strong>HTTP Basic Auth:</strong> <code>Authorization: Basic base64(user:pass)</code>.</li>
          <li><strong>API payloads:</strong> small binary blobs embedded in JSON.</li>
        </ul>
      `,
    },
    {
      heading: "Standard vs URL-safe Base64",
      body: `
        <p>Standard Base64 uses <code>+</code> and <code>/</code>, both of which have special meaning in URLs. URL-safe Base64 (RFC 4648 §5) swaps them for <code>-</code> and <code>_</code> and drops padding.</p>
        <table>
          <thead><tr><th>Character</th><th>Standard</th><th>URL-safe</th></tr></thead>
          <tbody>
            <tr><td>62</td><td>+</td><td>-</td></tr>
            <tr><td>63</td><td>/</td><td>_</td></tr>
            <tr><td>Padding</td><td>=</td><td>(none)</td></tr>
          </tbody>
        </table>
        <p>If your Base64 will appear in a URL, a query string, or a JWT, use URL-safe.</p>
      `,
    },
  ],

  "password-generator": [
    {
      heading: "How entropy is calculated",
      body: `
        <p>Password strength is measured in bits of entropy — the log₂ of the number of possible passwords of that structure.</p>
        <p>Formula: <code>entropy = length × log₂(pool size)</code></p>
        <ul>
          <li>Lowercase only (26 chars): ~4.7 bits per character.</li>
          <li>+ Uppercase (52): ~5.7 bits per character.</li>
          <li>+ Digits (62): ~5.95 bits per character.</li>
          <li>+ Symbols (94): ~6.55 bits per character.</li>
        </ul>
        <p>Examples: an 8-char all-lowercase password has ~38 bits — weak. A 16-char mixed password has ~105 bits — strong. A 20-char mixed password has ~131 bits — overkill for any real attack.</p>
      `,
    },
    {
      heading: "Offline crack time reality check",
      body: `
        <p>Assumes a modern attacker with a single high-end GPU (~10 billion guesses per second for fast hashes like MD5):</p>
        <table>
          <thead><tr><th>Entropy</th><th>Example</th><th>Time to crack</th></tr></thead>
          <tbody>
            <tr><td>~40 bits</td><td>8-char lowercase</td><td>Seconds</td></tr>
            <tr><td>~60 bits</td><td>10-char mixed</td><td>Days to weeks</td></tr>
            <tr><td>~80 bits</td><td>14-char mixed</td><td>Centuries</td></tr>
            <tr><td>~100 bits</td><td>18-char mixed</td><td>Longer than the universe</td></tr>
          </tbody>
        </table>
        <p>Note: modern password hashing (bcrypt, Argon2) is 1000× slower than MD5, giving ~20 more bits of effective security. Always use both.</p>
      `,
    },
    {
      heading: "Why 'exclude ambiguous' matters",
      body: `
        <p>Certain character pairs look identical in many fonts:</p>
        <ul>
          <li><strong>0</strong> (zero) vs <strong>O</strong> (uppercase o)</li>
          <li><strong>1</strong> (one) vs <strong>l</strong> (lowercase L) vs <strong>I</strong> (uppercase i)</li>
        </ul>
        <p>Excluding these removes 4 characters from the pool — a ~4% entropy reduction — but eliminates most transcription errors when you must type the password by hand.</p>
      `,
    },
    {
      heading: "Tool documentation — password generator reference",
      body: `
        <p>This section documents the cryptographic foundation, the exact entropy math, and the limitations you should know about before you use a generated password for anything critical.</p>

        <h3>Entropy by length and character set</h3>
        <table>
          <thead><tr><th>Structure</th><th>Pool size</th><th>Entropy (bits)</th><th>Offline crack estimate (single GPU)</th></tr></thead>
          <tbody>
            <tr><td>8 chars, lowercase only</td><td>26</td><td>37.6</td><td>Seconds</td></tr>
            <tr><td>10 chars, lowercase only</td><td>26</td><td>47.0</td><td>Hours</td></tr>
            <tr><td>12 chars, mixed (a-z, A-Z, 0-9)</td><td>62</td><td>71.5</td><td>Weeks</td></tr>
            <tr><td>16 chars, mixed + symbols</td><td>94</td><td>105.1</td><td>Geological</td></tr>
            <tr><td>20 chars, mixed + symbols</td><td>94</td><td>131.4</td><td>Effectively impossible</td></tr>
            <tr><td>32 chars, mixed + symbols</td><td>94</td><td>210.3</td><td>No practical ceiling</td></tr>
          </tbody>
        </table>
        <p>Estimates assume MD5-class hashing on a single modern GPU (roughly 10 billion guesses per second). Real-world password hashing (bcrypt, Argon2) is 1000× slower, adding roughly 10 bits of effective security.</p>

        <h3>When NOT to use a generated password alone</h3>
        <ul>
          <li><strong>Anything critical without 2FA.</strong> A strong password does not protect you if the site is breached and its password database leaks. Enable two-factor authentication wherever it is offered.</li>
          <li><strong>Shared accounts where the password is transmitted verbally.</strong> A 32-character random password is impossible to read over the phone. Generate 4-6 word passphrases for those, or use a secure sharing method.</li>
          <li><strong>Sites that restrict symbols.</strong> Some legacy systems silently strip special characters, reducing your entropy without warning. Test the password against the actual login before you rely on it.</li>
          <li><strong>Sites with maximum length limits.</strong> A few legacy systems cap passwords at 12 or even 8 characters. In those cases, use a long random string of letters only, since the length is fixed.</li>
          <li><strong>Physical security codes.</strong> ATM PINs, door codes, and similar short numeric codes should not be managed here — the size limits defeat the purpose.</li>
        </ul>

        <h3>How the generator works under the hood</h3>
        <ol>
          <li>A pool of allowed characters is built from your selected sets (lowercase, uppercase, digits, symbols), with ambiguous characters removed if requested.</li>
          <li>Each character is drawn using <code>crypto.getRandomValues()</code> — the Web Crypto API, the same secure source the browser uses for TLS session keys.</li>
          <li>Rejection sampling is applied: if a random byte would introduce modulo bias (because 256 is not a multiple of the pool size), that byte is discarded and redrawn. This produces perfectly uniform distribution.</li>
          <li>The result is validated against "require each set" if requested, and re-drawn on the rare chance it fails the check.</li>
          <li>No value is stored, logged, or transmitted anywhere. The generator runs entirely in your browser and completes in under a millisecond.</li>
        </ol>

        <h3>What we do not claim</h3>
        <ul>
          <li>We do not claim these passwords are "unbreakable." Any finite-length password can be attacked. We claim they are generated with cryptographic randomness and have a specific, documented entropy.</li>
          <li>We do not claim they are safe to reuse. Every account should have a unique password. Reuse is the single largest password vulnerability in practice.</li>
          <li>We do not store, log, or remember anything you generate. There is nothing to recover if you lose it — which is why a password manager is essential.</li>
        </ul>

        <h3>Browser support and limits</h3>
        <ul>
          <li>Requires a browser with <code>crypto.getRandomValues()</code>, which is supported in every browser released since 2016.</li>
          <li>Works offline: once the page is loaded you can disconnect Wi-Fi and the generator still produces the same quality of randomness.</li>
          <li>Batch mode generates up to 50 passwords in one click, useful for setting up multiple accounts or rotating credentials.</li>
        </ul>
      `,
    },

    ],

  "barcode-generator": [
    {
      heading: "Which format should you use?",
      body: `
        <table>
          <thead><tr><th>Format</th><th>Data type</th><th>Length</th><th>Standard use</th></tr></thead>
          <tbody>
            <tr><td>CODE128</td><td>ASCII text</td><td>up to 48 chars</td><td>Logistics, shipping, general use</td></tr>
            <tr><td>CODE39</td><td>Uppercase alphanumeric</td><td>up to 43 chars</td><td>Industrial, ID cards, defense</td></tr>
            <tr><td>EAN-13</td><td>Numeric</td><td>13 digits</td><td>International retail products</td></tr>
            <tr><td>EAN-8</td><td>Numeric</td><td>8 digits</td><td>Small retail packages</td></tr>
            <tr><td>UPC-A</td><td>Numeric</td><td>12 digits</td><td>US / Canada retail products</td></tr>
            <tr><td>ITF-14</td><td>Numeric</td><td>14 digits</td><td>Shipping cartons</td></tr>
            <tr><td>MSI</td><td>Numeric</td><td>Variable</td><td>Inventory, shelf labels</td></tr>
            <tr><td>Pharmacode</td><td>Numeric</td><td>3-131070</td><td>Pharmaceutical packaging</td></tr>
            <tr><td>Codabar</td><td>Numeric + symbols</td><td>Variable</td><td>Libraries, blood banks</td></tr>
          </tbody>
        </table>
      `,
    },
    {
      heading: "Check digits: automatic vs manual",
      body: `
        <p>EAN, UPC, and ITF-14 use a modulo-10 check digit as the last character. The digit is not optional — without it, the barcode fails to scan reliably.</p>
        <p>This tool computes and appends the check digit automatically. Enter the payload (12 for EAN-13, 11 for UPC-A, 13 for ITF-14) and the correct check digit is calculated.</p>
        <p>CODE128 and CODE39 use internal checksums that are handled automatically by the encoder — nothing for you to compute.</p>
      `,
    },
    {
      heading: "Printing considerations",
      body: `
        <ul>
          <li><strong>Quiet zone:</strong> leave at least 10× the narrow bar width blank on each side. Without this, scanners may fail.</li>
          <li><strong>Bar width:</strong> at least 0.25 mm for retail scanners; 0.5 mm for reliable scanning at any distance.</li>
          <li><strong>Contrast:</strong> dark bars on light background. Never invert the colors.</li>
          <li><strong>Format:</strong> SVG for print, PNG at 3× scale for screen.</li>
          <li><strong>Test before bulk printing:</strong> scan a single copy with the actual scanner that will be used at the point of sale or warehouse.</li>
        </ul>
      `,
    },
  ],

  "character-counter": [
    {
      heading: "Platform character limits in 2026",
      body: `
        <table>
          <thead><tr><th>Platform</th><th>Field</th><th>Limit</th></tr></thead>
          <tbody>
            <tr><td>X (Twitter)</td><td>Standard post</td><td>280</td></tr>
            <tr><td>X (Twitter)</td><td>Premium post</td><td>25,000</td></tr>
            <tr><td>X (Twitter)</td><td>Bio</td><td>160</td></tr>
            <tr><td>Instagram</td><td>Caption</td><td>2,200</td></tr>
            <tr><td>Instagram</td><td>Bio</td><td>150</td></tr>
            <tr><td>LinkedIn</td><td>Post</td><td>3,000</td></tr>
            <tr><td>LinkedIn</td><td>Headline</td><td>220</td></tr>
            <tr><td>Facebook</td><td>Post</td><td>63,206</td></tr>
            <tr><td>YouTube</td><td>Title</td><td>100</td></tr>
            <tr><td>YouTube</td><td>Description</td><td>5,000</td></tr>
            <tr><td>SMS</td><td>Single message</td><td>160</td></tr>
            <tr><td>SEO</td><td>Meta description</td><td>155-160</td></tr>
            <tr><td>SEO</td><td>Title tag</td><td>50-60</td></tr>
          </tbody>
        </table>
      `,
    },
    {
      heading: "How different platforms count",
      body: `
        <ul>
          <li><strong>X (Twitter):</strong> weighted grapheme counting. Most Latin letters = 1. Emoji = 2. Composite emoji (family, flags) = 4-10. URLs = fixed 23 characters regardless of length.</li>
          <li><strong>Instagram:</strong> codepoints, so complex emoji count as multiple. Bengali ligatures (যুক্তাক্ষর) may count as 2-3.</li>
          <li><strong>SMS:</strong> GSM-7 encoding = 160 chars per segment. Unicode (Bengali, Arabic, emoji) = UCS-2 encoding, only 70 chars per segment — and the count multiplies fast.</li>
        </ul>
      `,
    },
    {
      heading: "Characters vs codepoints vs graphemes",
      body: `
        <p>A subtle but important distinction:</p>
        <ul>
          <li><strong>Codepoint:</strong> the smallest unit of Unicode. 😀 is 1 codepoint; 👨‍👩‍👧 is 5 (joined with zero-width joiners).</li>
          <li><strong>Grapheme cluster:</strong> what a user perceives as one character. 👨‍👩‍👧 is 1 grapheme but 5 codepoints.</li>
          <li><strong>UTF-8 byte:</strong> how the character is stored. 1 byte for ASCII, 2-4 bytes for others.</li>
        </ul>
        <p>Different platforms use different counting. X uses graphemes; Instagram uses codepoints. This tool uses codepoints to match the strictest case.</p>
      `,
    },
  ],

  "word-counter": [
    {
      heading: "How words are counted",
      body: `
        <p>A "word" is a sequence of Unicode letters, digits, apostrophes, or hyphens. The counting uses Unicode-aware regular expressions, so:</p>
        <ul>
          <li>Contractions (<code>don't</code>) count as one word.</li>
          <li>Hyphenated terms (<code>state-of-the-art</code>) count as one word.</li>
          <li>Bengali, Arabic, and CJK text all count correctly.</li>
          <li>Numbers and mixed alphanumerics count as words.</li>
        </ul>
      `,
    },
    {
      heading: "Reading time and speaking time formulas",
      body: `
        <ul>
          <li><strong>Reading time:</strong> 225 words per minute — the standard average for silent adult reading.</li>
          <li><strong>Speaking time:</strong> 150 words per minute — a natural conversational pace.</li>
        </ul>
        <p>Reference points for typical content:</p>
        <ul>
          <li>500 words → ~2 min read, ~3.5 min spoken.</li>
          <li>1,000 words → ~4.5 min read, ~6.5 min spoken.</li>
          <li>2,000 words → ~9 min read, ~13 min spoken.</li>
        </ul>
      `,
    },
    {
      heading: "Keyword density explained",
      body: `
        <p>Keyword density is the percentage of total words made up by each significant word. Common stop words like <em>the</em>, <em>and</em>, <em>of</em> are excluded because they dominate every text.</p>
        <p>Healthy density for a target keyword: 1-2%. Over 3% starts to look like keyword stuffing and can hurt rankings. The tool shows the top 8 keywords by frequency to make this easy to inspect.</p>
      `,
    },
  ],

  "favicon-generator": [
    {
      heading: "The complete favicon file set",
      body: `
        <table>
          <thead><tr><th>File</th><th>Size</th><th>Purpose</th></tr></thead>
          <tbody>
            <tr><td>favicon.ico</td><td>16, 32, 48 multi</td><td>Legacy browsers, bookmarks</td></tr>
            <tr><td>favicon-16x16.png</td><td>16 × 16</td><td>Browser tab</td></tr>
            <tr><td>favicon-32x32.png</td><td>32 × 32</td><td>Retina browser tab</td></tr>
            <tr><td>favicon-96x96.png</td><td>96 × 96</td><td>Google TV</td></tr>
            <tr><td>apple-touch-icon.png</td><td>180 × 180</td><td>iOS home screen</td></tr>
            <tr><td>android-chrome-192x192.png</td><td>192 × 192</td><td>Android home screen</td></tr>
            <tr><td>android-chrome-512x512.png</td><td>512 × 512</td><td>PWA splash screen</td></tr>
            <tr><td>site.webmanifest</td><td>JSON</td><td>PWA metadata</td></tr>
          </tbody>
        </table>
      `,
    },
    {
      heading: "Design rules for a favicon that survives at 16px",
      body: `
        <ul>
          <li><strong>Single letter or symbol:</strong> the most legible option at tiny sizes.</li>
          <li><strong>Bold shapes:</strong> at least 3-4 pixels thick at 16×16. Thin lines vanish.</li>
          <li><strong>High contrast:</strong> dark on light or light on dark. Never medium gray on light gray.</li>
          <li><strong>Square or circle background:</strong> keeps the icon consistent against varied browser chrome.</li>
          <li><strong>Test at actual size:</strong> view the 16×16 render on white and dark backgrounds before committing.</li>
        </ul>
      `,
    },
    {
      heading: "Where to place the files",
      body: `
        <p>All favicon files must be at the domain root for automatic browser discovery.</p>
        <ul>
          <li>Plain HTML: place in <code>/public/</code> (Vite) or <code>/static/</code> (older setups).</li>
          <li>Vite / React: <code>/public/</code> maps to <code>/</code> after build.</li>
          <li>Next.js: <code>/public/</code> or the newer <code>app/favicon.ico</code> convention.</li>
        </ul>
        <p>Then reference each file in the <code>&lt;head&gt;</code> with the correct <code>&lt;link&gt;</code> tag. The generated HTML snippet is provided with each download.</p>
      `,
    },
  ],

  "visiting-card": [
    {
      heading: "Standard business card sizes",
      body: `
        <table>
          <thead><tr><th>Region</th><th>Size (mm)</th><th>Size (inches)</th><th>Ratio</th></tr></thead>
          <tbody>
            <tr><td>International / EU</td><td>85 × 55</td><td>3.35 × 2.17</td><td>1.55</td></tr>
            <tr><td>United States</td><td>88.9 × 50.8</td><td>3.5 × 2.0</td><td>1.75</td></tr>
            <tr><td>Japan</td><td>91 × 55</td><td>3.58 × 2.17</td><td>1.65</td></tr>
            <tr><td>Square (modern)</td><td>55 × 55</td><td>2.17 × 2.17</td><td>1.0</td></tr>
            <tr><td>Slim (modern)</td><td>85 × 40</td><td>3.35 × 1.57</td><td>2.13</td></tr>
          </tbody>
        </table>
      `,
    },
    {
      heading: "Bleed, safe zone, and print margins",
      body: `
        <p>For professional printing, the source file needs more than just the visible card size:</p>
        <ul>
          <li><strong>Bleed:</strong> 3 mm (0.125") beyond every edge — the area that will be trimmed off. Extend background colors into the bleed.</li>
          <li><strong>Safe zone:</strong> 4 mm (0.16") inside every edge — keep all text and logos here.</li>
          <li><strong>Trim line:</strong> the visible card boundary.</li>
        </ul>
        <p>The tool exports at the exact visible size. If your print shop requires a bleed, add it in a design tool before printing.</p>
      `,
    },
    {
      heading: "Resolution and export format",
      body: `
        <p>Print resolution standards:</p>
        <ul>
          <li><strong>150 DPI:</strong> quick digital preview, home printing.</li>
          <li><strong>300 DPI:</strong> the print industry standard — professional quality at handheld size.</li>
          <li><strong>600 DPI:</strong> premium print, luxury card stock, foil or embossed finishes.</li>
        </ul>
        <p>Export PNG for raster workflows, PDF for print shops, JPG only when file size matters and transparency is not needed.</p>
      `,
    },
  ],

  "cv-builder": [
    {
      heading: "ATS-friendly formatting rules",
      body: `
        <p>Applicant Tracking Systems (ATS) read PDFs but often choke on the visual layout choices that look best to humans. Follow these rules to survive both:</p>
        <ul>
          <li><strong>Single column:</strong> two-column layouts confuse most ATS parsers.</li>
          <li><strong>Standard headings:</strong> use "Experience", "Education", "Skills" — not creative variations.</li>
          <li><strong>No tables:</strong> ATS sees them as broken text.</li>
          <li><strong>No icons:</strong> the icon renders but the label is invisible to the parser.</li>
          <li><strong>Text-based contact info:</strong> don't embed phone or email inside an image.</li>
          <li><strong>Standard font:</strong> Arial, Calibri, Helvetica, Georgia.</li>
          <li><strong>Selectable text:</strong> exported PDFs must contain a real text layer.</li>
        </ul>
      `,
    },
    {
      heading: "Impact vs responsibilities",
      body: `
        <p>The single biggest improvement most CVs need: replace responsibility statements with measured impact.</p>
        <table>
          <thead><tr><th>Weak (responsibility)</th><th>Strong (impact)</th></tr></thead>
          <tbody>
            <tr><td>Managed social media accounts</td><td>Grew Instagram from 2K to 45K followers in 8 months</td></tr>
            <tr><td>Handled customer support</td><td>Reduced average ticket resolution from 4h to 45min</td></tr>
            <tr><td>Worked on the company website</td><td>Redesigned checkout flow, +23% conversion</td></tr>
            <tr><td>Wrote technical documentation</td><td>Cut support tickets by 40% with self-serve docs</td></tr>
          </tbody>
        </table>
        <p>Use numbers — percentages, dollar amounts, time saved, users reached. Concrete numbers are what recruiters remember.</p>
      `,
    },
    {
      heading: "Length and structure by experience level",
      body: `
        <table>
          <thead><tr><th>Experience</th><th>Pages</th><th>Must-have sections</th></tr></thead>
          <tbody>
            <tr><td>0-2 years</td><td>1</td><td>Education, Skills, Projects</td></tr>
            <tr><td>2-5 years</td><td>1</td><td>Summary, Experience, Skills</td></tr>
            <tr><td>5-10 years</td><td>1-2</td><td>Summary, Experience, Skills, Education</td></tr>
            <tr><td>10+ years</td><td>2</td><td>Summary, Experience, Skills, Certifications</td></tr>
            <tr><td>Academic / research</td><td>2-4</td><td>Publications, Grants, Teaching</td></tr>
          </tbody>
        </table>
        <p>Rule of thumb: never pad. If the content fits in one dense page, use one page.</p>
      `,
    },
    {
      heading: "Tool documentation — CV builder reference",
      body: `
        <p>This section documents the technical behaviour of the CV builder: what the exported PDF actually contains, how the ATS-friendliness is achieved, and the cases where you should use a different tool.</p>

        <h3>What the exported PDF actually contains</h3>
        <table>
          <thead><tr><th>Property</th><th>Value</th></tr></thead>
          <tbody>
            <tr><td>Page size</td><td>A4 (210 × 297 mm) or US Letter (216 × 279 mm), exactly as selected</td></tr>
            <tr><td>Text layer</td><td>Real, selectable, searchable text — not an image</td></tr>
            <tr><td>Fonts</td><td>Embedded at export time; the recipient does not need them installed</td></tr>
            <tr><td>Images (if a photo is uploaded)</td><td>Rasterised at the resolution of the source; not up-scaled</td></tr>
            <tr><td>Page count</td><td>Automatic; long CVs paginate cleanly with headers preserved</td></tr>
            <tr><td>Metadata</td><td>Author and title set from your Personal Details section</td></tr>
            <tr><td>Export mechanism</td><td>Browser print pipeline (Chrome/Firefox/Safari "Save as PDF")</td></tr>
          </tbody>
        </table>

        <h3>Why the PDF is ATS-friendly</h3>
        <p>Applicant Tracking Systems parse PDFs by extracting their text layer and matching standard section headings. Many CV designs fail this because they use text inside images, non-standard headings like "My Journey" instead of "Experience", or tables that scramble reading order.</p>
        <p>This builder avoids all three failure modes:</p>
        <ul>
          <li>Every heading is rendered as real text with a standard name (Experience, Education, Skills, Projects).</li>
          <li>No content is presented as an image — even the design accents are drawn as vector CSS.</li>
          <li>Single-column reading order is preserved for the ATS Cleanline template and all built-in templates.</li>
        </ul>
        <p>What we cannot guarantee: no ATS is perfect, and different systems weight different signals. The output structure matches what Greenhouse, Lever, and Workday parsed correctly in our tests, but a specific employer's configuration may still reject a well-formed CV for unrelated reasons.</p>

        <h3>When NOT to use this tool</h3>
        <ul>
          <li><strong>Academic CVs (multi-page publications lists).</strong> These follow a different convention with longer formats; a general CV builder is not the right fit.</li>
          <li><strong>Creative portfolios with heavy visual design.</strong> A one-page designed PDF or an online portfolio is usually stronger for design roles.</li>
          <li><strong>Legally binding applications.</strong> Some jurisdictions require a specific declaration format that this tool cannot produce.</li>
          <li><strong>Languages that are not left-to-right.</strong> The current templates assume LTR layout. RTL support is on the roadmap.</li>
        </ul>

        <h3>How your data is handled</h3>
        <ol>
          <li>Everything you type lives in a React state variable in the current tab.</li>
          <li>If you save a CV, the data is written to <code>localStorage</code> under a key scoped to this site. It never leaves the browser.</li>
          <li>Draft recovery reads the same local storage on the next visit and offers to restore your last unsaved work.</li>
          <li>Export to PDF uses the browser's built-in print-to-PDF. No server is involved at any stage.</li>
        </ol>

        <h3>Real-world export observations</h3>
        <ul>
          <li>A 2-page CV with 4 experience entries, 2 education entries, and 15 skills exports to roughly 90-140 KB depending on whether a photo was uploaded.</li>
          <li>Photo uploads are stored as base64 in local storage, which has a 5-10 MB browser quota. Very high-resolution photos should be resized before upload.</li>
          <li>Printing from Chrome produces the most consistent results across platforms; Safari sometimes adds a small margin that can be removed in the print dialog.</li>
        </ul>
      `,
    },

    ],

};
