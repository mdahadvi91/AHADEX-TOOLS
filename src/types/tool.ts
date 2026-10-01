import type { CategoryId } from "./category";

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
  category: CategoryId;
  keywords: string[];
  path: string;
  icon?: string;
  popular?: boolean;
  newTool?: boolean;
  features: ToolFeature[];
  howTo: ToolHowToStep[];
  faq: ToolFAQ[];
  relatedTools: string[];
  seo: ToolSEO;
}
