# AHADEX Tools — Tool Development Rules

> **Permanent policy.** Every new tool MUST follow these. No exceptions.

---

## Rule 1 — Registry Entry Comes LAST

Add a tool to `src/data/tools.ts` **ONLY** when EVERYTHING is ready:

- [ ] Working implementation in `src/tools/<category>/<tool-name>/`
- [ ] Route registered in `src/App.tsx`
- [ ] Full functionality tested
- [ ] `SEO.tsx` with structured data
- [ ] Bilingual `content.ts` (EN + BN)
- [ ] Bangla translation in `src/i18n/toolTranslations.ts`
- [ ] FAQ, HowTo, Features sections
- [ ] RelatedTools linking to working tools
- [ ] OG image in `public/images/og/tools/`

**Never** add a tool to the registry before implementation.

---

## Rule 2 — Every Tool is a Mini-Website

```

tool-name/
├── index.tsx
├── Hero.tsx
├── Intro.tsx
├── Workspace.tsx
├── logic.ts
├── types.ts
├── data.ts
├── content.ts
├── SEO.tsx
├── Features.tsx
├── HowTo.tsx
├── FAQ.tsx
├── RelatedTools.tsx
├── PrivacyNote.tsx
└── ... (as needed)

```

File count reflects complexity — nothing more, nothing less.

---

## Rule 3 — Do NOT Touch Global UI

Never modify:
- `Header.tsx`, `Footer.tsx`, `LeftSidebar.tsx`, `RightSidebar.tsx`
- `MainLayout.tsx`, `PageTransition.tsx`
- `src/components/background/*`
- `src/contexts/ThemeContext.tsx`
- `src/styles/*.css`

The tool plugs into `<Outlet />` and provides only its own content.

---

## Rule 4 — Content Must Be Tool-Specific and Genuine

**Forbidden:** mass-produced AI filler, generic intros, copy-pasted content.

**Required:** what it does, how it works, supported formats, privacy, limitations, use cases, step-by-step, FAQ, related tools.

---

## Rule 5 — Claims Must Be Code-Verified

Before shipping, verify every dimension, format, feature, and number against actual code. If you cannot test it, do not claim it.

---

## Rule 6 — Naming Conventions

- Tool IDs: `kebab-case`
- Categories: `kebab-case`
- Components: `PascalCase.tsx`
- Utilities: `camelCase.ts`
- Folders: `kebab-case`

## Rule 7 — Bilingual by Default

Every tool ships with EN + BN. No English-only tools.

## Rule 8 — No Fake Downloads, No Watermarks, No Popups

## Rule 9 — AdSense Integration is Global

Tools never add their own ads.

## Rule 10 — Separate Working from Planned

- Working → `src/data/tools.ts`
- Planned → `src/data/plannedTools.ts`

---

*Last updated: 2026-10-02*
