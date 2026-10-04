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
  howTo: ToolHowToStep[];
  faq: ToolFAQ[];
  relatedTools: string[];
  seo: ToolSEO;
}
