/* ============================================================
 * Tool → Blog Post mapping (Empty, starting fresh)
 * ============================================================ */

export const BLOG_FOR_TOOL: Record<string, string[]> = {};

export function getBlogForTool(toolId: string, max = 3): string[] {
  const slugs = BLOG_FOR_TOOL[toolId] || [];
  return slugs.slice(0, max);
}
