export interface GuideSection {
  heading: string;
  body: string;
}

export interface GuideFAQ {
  question: string;
  answer: string;
}

export interface Guide {
  slug: string;
  title: string;
  titleBn: string;
  excerpt: string;
  excerptBn: string;
  emoji: string;
  category: string;
  readTime: number;
  publishedAt: string;
  updatedAt?: string;
  authorId: string; // 🚨 যোগ করা হলো
  relatedTools: string[];
  sections: GuideSection[];
  faq: GuideFAQ[];
}

// 🚨 FIX: Array is empty to prevent fake guides, but types are preserved so existing UI components do not crash.
export const guides: Guide[] = [];

export function getGuideBySlug(slug: string): Guide | undefined {
  return guides.find(g => g.slug === slug);
}
