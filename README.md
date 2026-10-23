# AHADEX Tools

Welcome to the official repository for **AHADEX Tools** — a suite of 3 free, fast, and privacy-first browser-based tools for everyday digital tasks.

## ✨ Features
- **100% Privacy-First**: All tools process files locally in your browser using HTML5 Canvas API and modern Web APIs. Your files never touch our servers.
- **No Signup Required**: Instantly use any tool without creating an account.
- **Free Forever**: No hidden fees, no watermarks, no premium tiers.
- **Production-Grade SEO**: Built with Vite static generation, verified sitemaps, structured data (JSON-LD), and comprehensive content depth.
- **Bilingual Support**: Full English and Bengali (bn) localization.

## 🛠️ Tool Categories

### 🖼️ Image Tools
- [Image Compressor](/tools/image-compressor)
- [Image Resizer](/tools/image-resizer)
- [Image Cropper](/tools/image-cropper)
- [Image Converter](/tools/image-converter)
- [Image to PDF](/tools/image-to-pdf)
- [SVG to PNG](/tools/svg-to-png)
- [Image Metadata Viewer](/tools/image-metadata-viewer)
- [Image to Sketch](/tools/image-to-sketch)
- [Image to Cartoon](/tools/image-to-cartoon)
- [Favicon Generator](/tools/favicon-generator)

### 📄 PDF Tools
- [Merge PDF](/tools/merge-pdf)
- [Split PDF](/tools/split-pdf)
- [PDF to Text](/tools/pdf-to-text)
- [PDF to Image](/tools/pdf-to-image)
- [PDF Rotator](/tools/pdf-rotator)

### 💻 Developer Tools
- [JSON Formatter](/tools/json-formatter)
- [Base64 Encoder](/tools/base64-encoder)
- [URL Encoder](/tools/url-encoder)
- [UUID Generator](/tools/uuid-generator)
- [Password Generator](/tools/password-generator)

### ✍️ Text & QR Tools
- [Word Counter](/tools/word-counter)
- [Character Counter](/tools/character-counter)
- [Text Case Converter](/tools/text-case-converter)
- [Photo QR Code](/tools/photo-qr)
- [Barcode Generator](/tools/barcode-generator)

### 🎨 Design Tools
- [Visiting Card Maker](/tools/visiting-card)
- [CV Builder](/tools/cv-builder)

## 🚀 Development & Build

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Generate content, build, and verify (Production pipeline)
npm run build

# Verify local build + live production HTTP status
npm run verify:all
``

📈 SEO & Verification Architecture

This project uses a zero-compromise build pipeline:

1. generate:content - Generates sitemaps, RSS, OG images, SSR HTML, and JSON-LD schema.
2. vite build - Compiles the React application.
3. build:route-html - Generates static HTML for all routes for perfect SEO.
4. verify:sitemap - Verifies every sitemap URL against final dist/ HTML (title, canonical, JSON-LD, OG tags).
5. verify:content - Audits tool content depth (fails build if any tool lacks FAQs, use cases, or benchmarks).
6. verify:production - Checks live HTTP status, content-type, and JSON-LD on ahadex.fun.

📄 License

This project is licensed under the MIT License.
