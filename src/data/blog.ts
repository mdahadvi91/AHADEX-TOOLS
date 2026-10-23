/* ============================================================
 * Blog posts data — Starting fresh
 * ============================================================ */

export interface BlogBlock {
  type: "h2" | "h3" | "ol" | "p" | "ul" | "quote" | "tip" | "cta" | "field-note" | "image";
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

export const blogPosts: BlogPost[] = [];

export const blogCategories: string[] = [
  "Image Tools",
  "PDF Tools",
  "Developer Tools",
  "Security"
];

export function getPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find((p) => p.slug === slug);
}

export function getRelatedPosts(slug: string, limit = 3): BlogPost[] {
  return blogPosts.filter((p) => p.slug !== slug).slice(0, limit);
}
