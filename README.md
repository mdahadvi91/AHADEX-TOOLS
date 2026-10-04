<div align="center">

# AHADEX Tools

**Free, fast, and private online tools for everyday digital tasks.**

Every tool runs entirely in your browser. Nothing is uploaded. Nothing is stored. Nothing is tracked.

[**ahadex.fun**](https://ahadex.fun) · [Report a bug](https://github.com/mdahadvi91/AHADEX-TOOLS/issues) · [Suggest a tool](https://github.com/mdahadvi91/AHADEX-TOOLS/issues)

</div>

---

## ✨ What is AHADEX?

AHADEX Tools is a growing collection of **35+ free online utilities** — QR codes, PDF tools, image converters, text helpers, and developer utilities — that all run **entirely inside your browser**.

No uploads to a server. No accounts. No watermarks. No daily quotas. Nothing leaves your device.

## 🛠 Tools

| Category | Tools |
|---|---|
| **QR & Barcode** | Photo QR Code, Visiting Card Maker, QR Code Generator, Barcode Generator |
| **PDF** | JPG to PDF, PNG to PDF, Merge PDF, Split PDF, PDF to JPG, PDF to PNG, PDF to Text, PDF Rotator, PDF Page Extractor |
| **Image** | JPG↔PNG, JPG↔WebP, PNG↔WebP, WebP→JPG, WebP→PNG, Image Compressor, Image Resizer, Image Cropper, Image to PDF, Image Metadata Viewer, Image to Sketch, Image to Cartoon |
| **Documents** | CV Builder |
| **Text** | Word Counter, Text Case Converter |
| **Developer** | JSON Formatter, URL Encoder / Decoder, UUID Generator, Base64 Encoder / Decoder, Password Generator |

## 🔒 Privacy First

Every tool processes data **locally** using modern browser APIs:

- File API · Canvas API · Web Crypto API · pdf-lib · pdf.js · qrcode · jsbarcode · exifr

Nothing is uploaded to a server. **You can turn off Wi-Fi and every tool still works.**

## 🚀 Tech Stack

- **React 18** + **TypeScript 5** (strict)
- **Vite 5** — fast dev server and build
- **Tailwind CSS 3** — custom silk palette
- **React Router 6** — SPA routing
- **Framer Motion** — animations
- **pdf-lib** + **pdf.js** — PDF processing
- **qrcode** + **jsbarcode** — code generation

## 🧑‍💻 Local Development

```bash
git clone https://github.com/mdahadvi91/AHADEX-TOOLS.git
cd AHADEX-TOOLS
npm install
cp .env.example .env
npm run dev
```

Open http://localhost:5173.

Scripts

Command What it does
npm run dev Start Vite dev server
npm run build Regenerate sitemap + type-check + production build
npm run preview Serve the production build locally
npm run sitemap Regenerate public/sitemap.xml from the tool registry
npm run lint Run TypeScript type-check (no ESLint)

📁 Project Structure

```
src/
├── components/        Shared UI (layout, ads, consent, tools grid)
├── constants/         App config, routes, feature flags
├── contexts/          Theme, Language, Sound
├── data/              tools.ts, plannedTools.ts, navigation.ts, faqs.ts
├── hooks/             Custom React hooks
├── i18n/              English + Bangla translations
├── lib/               Utilities (analytics, consent, seo)
├── pages/             Route-level pages (home, tools, legal)
├── tools/             Each tool is a mini-website
│   ├── qr/
│   ├── pdf/
│   ├── image/
│   ├── text/
│   ├── documents/
│   └── developer/
└── types/             Shared TypeScript types

public/
├── images/            OG images, backgrounds, logo
├── sitemap.xml        Auto-generated
├── robots.txt
└── ads.txt
```

See docs/ARCHITECTURE.md for the full picture.

🤝 Contributing

Want to add a tool, fix a bug, or improve the site?

· Read docs/TOOL_RULES.md — the permanent policy for every tool
· Read CONTRIBUTING.md — dev setup and PR guidelines
· Open an issue before starting large changes

🛡 Security

Found a vulnerability? Please read SECURITY.md for responsible disclosure.

📄 License

MIT © 2026 AHADEX Tools

---

<div align="center">

Made with care in Bangladesh 🇧🇩

</div>

## 🧑‍💻 Local Development

```bash
git clone https://github.com/mdahadvi91/AHADEX-TOOLS.git
cd AHADEX-TOOLS
npm install
cp .env.example .env
npm run dev
```

Open http://localhost:5173.

Scripts

Command What it does
npm run dev Start Vite dev server
npm run build Regenerate sitemap + type-check + production build
npm run preview Serve the production build locally
npm run sitemap Regenerate public/sitemap.xml from the tool registry
npm run lint Run TypeScript type-check (no ESLint)

📁 Project Structure

```
src/
├── components/        Shared UI (layout, ads, consent, tools grid)
├── constants/         App config, routes, feature flags
├── contexts/          Theme, Language, Sound
├── data/              tools.ts, plannedTools.ts, navigation.ts, faqs.ts
├── hooks/             Custom React hooks
├── i18n/              English + Bangla translations
├── lib/               Utilities (analytics, consent, seo)
├── pages/             Route-level pages (home, tools, legal)
├── tools/             Each tool is a mini-website
│   ├── qr/
│   ├── pdf/
│   ├── image/
│   ├── text/
│   ├── documents/
│   └── developer/
└── types/             Shared TypeScript types

public/
├── images/            OG images, backgrounds, logo
├── sitemap.xml        Auto-generated
├── robots.txt
└── ads.txt
```

See docs/ARCHITECTURE.md for the full picture.

🤝 Contributing

Want to add a tool, fix a bug, or improve the site?

· Read docs/TOOL_RULES.md — the permanent policy for every tool
· Read CONTRIBUTING.md — dev setup and PR guidelines
· Open an issue before starting large changes

🛡 Security

Found a vulnerability? Please read SECURITY.md for responsible disclosure.

📄 License

MIT © 2026 AHADEX Tools

---

<div align="center">

Made with care in Bangladesh 🇧🇩

</div>
