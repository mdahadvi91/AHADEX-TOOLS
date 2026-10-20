/* ============================================================
 * Recent Tools Tracker
 * Stores the last 4 tools the user visited in localStorage.
 * Used by the homepage to show a "Recently Used" widget.
 * ============================================================ */

const STORAGE_KEY = "ahadex-recent-tools";
const MAX_ITEMS = 4;

export interface RecentTool {
  path: string;
  name: string;
  emoji: string;
  visitedAt: number;
}

export function trackRecentTool(tool: { path: string; name: string; emoji?: string }) {
  if (typeof window === "undefined") return;
  try {
    const existing: RecentTool[] = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
    // Remove this tool if it already exists (we'll re-add it to the top)
    const filtered = existing.filter((t) => t.path !== tool.path);
    const updated: RecentTool[] = [
      { path: tool.path, name: tool.name, emoji: tool.emoji || "🔧", visitedAt: Date.now() },
      ...filtered,
    ].slice(0, MAX_ITEMS);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  } catch {
    /* ignore */
  }
}

export function getRecentTools(): RecentTool[] {
  if (typeof window === "undefined") return [];
  try {
    const data: RecentTool[] = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
    // Filter out entries older than 30 days
    const cutoff = Date.now() - 30 * 24 * 60 * 60 * 1000;
    return data.filter((t) => t.visitedAt > cutoff);
  } catch {
    return [];
  }
}
