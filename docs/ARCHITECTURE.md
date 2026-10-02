# AHADEX Tools — Architecture

## Structure

```

src/
├── components/          # Shared UI
├── contexts/            # Theme, Language, Sound
├── data/
│   ├── tools.ts         # WORKING tools only
│   └── plannedTools.ts  # Coming Soon tools
├── i18n/
│   ├── en.ts
│   ├── bn.ts
│   ├── toolTranslations.ts
│   └── plannedToolTranslations.ts
├── tools/               # Each tool is a mini-website
└── styles/              # Global CSS

public/
├── images/og/tools/     # Per-tool OG images (SVG)
├── sitemap.xml          # Auto-generated
├── robots.txt
└── ads.txt              # Awaiting AdSense approval

scripts/
└── generate-sitemap.ts  # tools.ts → sitemap.xml

```

## Principles

1. Working ≠ Planned (separate registries)
2. Data-driven renderers
3. Client-side only
4. Bilingual (EN + BN)
5. Global UI is sacred
6. Claims are verifiable

## Pipeline

```

npm run dev      → Vite dev server
npm run sitemap  → regenerate sitemap.xml
npm run build    → sitemap → tsc → vite build
npm run preview  → serve production

```

## Adding Tools

See [TOOL_RULES.md](./TOOL_RULES.md).
