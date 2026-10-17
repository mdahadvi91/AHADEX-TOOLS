export interface ToolFAQ {
  question: string;
  answer: string;
}

export interface ToolHowToStep {
  step: number;
  title: string;
  description: string;
}

export interface ToolFeature {
  title: string;
  description: string;
}

export interface ToolSEO {
  title: string;
  description: string;
  ogImage: string;
}

/**
 * A "deep dive" section appears in the rendered tool page and in the
 * server-side-rendered HTML. Use it for technical explanations that go
 * beyond the FAQ — comparison tables, decision matrices, edge cases,
 * real-world examples. Each section is a small, self-contained block of
 * content with a heading and rich body.
 *
 * body supports a limited subset of HTML so tables, nested lists, and
 * links render correctly in both the React page and the SSR fallback:
 *   <p>, <ul>, <ol>, <li>, <table>, <thead>, <tbody>, <tr>, <th>, <td>,
 *   <strong>, <em>, <code>, <a href>.
 *
 * The generator strips nothing — write valid HTML. Content is trusted
 * because it is authored in this repo, not user input.
 */
export interface ToolDeepDive {
  heading: string;
  body: string;
}

/**
 * A single editorial section. Unlike features/howTo/FAQ which follow
 * a fixed template, editorial sections are free-form article content
 * written specifically for one tool. Used to break template uniformity
 * and make each page an independently useful resource.
 *
 * Rendered in the React page right after the hero, before features,
 * so the reader encounters unique editorial content first.
 */
export interface ToolEditorialSection {
  heading: string;
  body: string;
}

export interface Tool {
  id: string;
  slug: string;
  name: string;
  description: string;
  longDescription: string;
  keywords: string[];
  path: string;
  /** Monthly Google searches (rough, used for grid ordering).
   *  Higher = shown earlier in the tools grid.
   *  New tools MUST declare this — see docs/TOOL_RULES.md. */
  searchVolume?: number;
  icon?: string;
  popular?: boolean;
  newTool?: boolean;
  features: ToolFeature[];
  /** Unique editorial sections written specifically for this tool. */
  editorialContent?: ToolEditorialSection[];
  howTo: ToolHowToStep[];
  faq: ToolFAQ[];
  /** Optional deep-dive sections rendered after the FAQ in SSR and on the page. */
  deepDive?: ToolDeepDive[];
  relatedTools: string[];
  seo: ToolSEO;
}
