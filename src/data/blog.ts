export interface BlogBlock {
  type: string;
  content?: string;
  items?: string[];
  url?: string;
  caption?: string;
  toolId?: string;
}

export interface BlogPost {
  coverImage?: string;
  slug: string;
  title: string;
  titleBn: string;
  excerpt: string;
  excerptBn: string;
  emoji: string;
  category: string;
  authorId: string;
  relatedTool?: string;
  publishedAt: string;
  updatedAt?: string;
  readTime: number;
  blocks: BlogBlock[];
}

// 🚨 ব্লগ সিস্টেম বন্ধ, তাই ডাটা খালি রাখা হলো
export const blogPosts: BlogPost[] = [];
export const blogCategories: string[] = [];

export function getPostBySlug(_slug: string): BlogPost | undefined {
  return undefined;
}

export function getRelatedPosts(_slug: string, _limit = 3): BlogPost[] {
  return [];
}
