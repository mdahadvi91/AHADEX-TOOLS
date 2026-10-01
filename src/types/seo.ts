export interface SEOProps {
  title: string;
  description: string;
  canonical?: string;
  ogImage?: string;
  ogType?: "website" | "article";
  noIndex?: boolean;
  keywords?: string[];
}

export interface BreadcrumbSchemaItem {
  name: string;
  url: string;
}

export interface FAQSchemaItem {
  question: string;
  answer: string;
}
