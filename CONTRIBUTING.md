# Contributing to AHADEX Tools

Thanks for your interest! This document explains how to contribute tools, fixes, and improvements.

## Code of Conduct

By participating, you agree to follow our [Code of Conduct](./CODE_OF_CONDUCT.md).

## Before You Start

- **Read [docs/TOOL_RULES.md](./docs/TOOL_RULES.md)** — it's the permanent policy every new tool must follow
- **Read [docs/ARCHITECTURE.md](./docs/ARCHITECTURE.md)** — the full project layout
- **Open an issue first** for anything bigger than a typo fix — saves everyone time

## Local Development

Clone the repository, install dependencies, and start the dev server:

    git clone https://github.com/mdahadvi91/AHADEX-TOOLS.git
    cd AHADEX-TOOLS
    npm install
    cp .env.example .env
    npm run dev

The dev server runs at http://localhost:5173.

## The Golden Rules

1. **Client-side only.** Never add a server, an API call, or a database.
2. **Bilingual.** Every tool ships with English + Bangla content.
3. **No fake claims.** If you can't verify a number, don't write it.
4. **Registry comes last.** Add tools to src/data/tools.ts only when they work end-to-end.
5. **Don't touch global UI.** Tools plug into the shared layout; they don't rewrite it.

Full rules in [docs/TOOL_RULES.md](./docs/TOOL_RULES.md).

## Adding a Tool

1. Create src/tools/<category>/<tool-name>/
2. Follow the folder layout in docs/TOOL_RULES.md
3. Write real content — no AI filler
4. Register a route in src/App.tsx
5. Add an entry to src/data/tools.ts
6. Add Bangla translation to src/i18n/toolTranslations.ts
7. Run npm run build — sitemap regenerates automatically

## Coding Style

- **TypeScript strict mode** — no any unless unavoidable
- **Tailwind** for styling — no inline CSS unless dynamic
- **Framer Motion** for animation — respect prefers-reduced-motion
- **Filenames:** PascalCase.tsx for components, camelCase.ts for utilities
- **No emoji** in code comments

## Commit Messages

Short, imperative, capitalized:

    Add Barcode Generator tool (Tool 35)
    Fix Tailwind token in Word Counter
    Remove dead category system

## Pull Requests

- One logical change per PR
- Include a short description of what and why
- Reference the issue if one exists
- Make sure npm run build passes

## Questions?

Open a GitHub issue or email mdahadvi91@gmail.com.
