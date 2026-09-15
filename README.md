# AHADEX TOOLS

A scalable, high-performance web platform designed to host a wide catalog of client-side and cloud-assisted tools (image processing, PDF manipulation, QR utilities, and developer tools).

## Technology Stack

- **Framework**: React 19
- **Routing**: React Router
- **Language**: TypeScript (strict mode)
- **Styling**: Tailwind CSS
- **Build System**: Vite
- **Deployment**: Vercel ready

## Development

Install dependencies and start the local development server:

```bash
npm run dev
```

The application runs on `http://localhost:3000`.

## Production Build

Compile the production bundle and verify types:

```bash
npm run build
```

## Architecture

This project is organized into a modular structure to scale gracefully across 100+ tools:

- `src/app/`: Application root, provider composition, and centralized route declarations.
- `src/app/providers/`: Global application contexts (theme, language, toast notifications).
- `src/styles/`: Global styles and design system token foundations.
- `src/types/`: Core contracts and metadata schemas for tool modules and categories.
- `src/tools/`: Dedicated modular subdirectories for individual tool logic and interfaces.
