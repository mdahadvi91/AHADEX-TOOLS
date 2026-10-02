import type { TextStats } from "./types";

export const MAX_CHARS = 1_000_000;

const STOP_WORDS = new Set([
  "the","a","an","and","or","but","if","of","at","by","for","with","about","against",
  "between","into","through","during","before","after","above","below","to","from",
  "up","down","in","out","on","off","over","under","again","further","then","once",
  "here","there","when","where","why","how","all","any","both","each","few","more",
  "most","other","some","such","no","nor","not","only","own","same","so","than",
  "too","very","s","t","can","will","just","don","should","now","is","are","was",
  "were","be","been","being","have","has","had","do","does","did","i","you","he",
  "she","it","we","they","me","him","her","us","them","my","your","his","its","our",
  "their","this","that","these","those",
]);

export function countStats(text: string): TextStats {
  const trimmed = text.trim();
  const isEmpty = trimmed.length === 0;

  const words = isEmpty ? [] : trimmed.match(/\b[\p{L}\p{N}'-]+\b/gu) ?? [];
  const wordCount = words.length;

  const characters = text.length;
  const charactersNoSpaces = text.replace(/\s/g, "").length;
  const sentences = isEmpty
    ? 0
    : (trimmed.match(/[.!?…]+(?=\s|$)/g) ?? []).length ||
      (trimmed.length > 0 ? 1 : 0);
  const paragraphs = isEmpty
    ? 0
    : trimmed.split(/\n\s*\n/).filter((p) => p.trim().length > 0).length;
  const lines = isEmpty ? 0 : text.split("\n").length;

  const readingTimeMin = wordCount === 0 ? 0 : Math.ceil(wordCount / 225);
  const speakingTimeMin = wordCount === 0 ? 0 : Math.ceil(wordCount / 150);

  const longestWord =
    wordCount === 0
      ? ""
      : words.reduce((a, b) => (b.length > a.length ? b : a), "");

  const totalWordLen = words.reduce((s, w) => s + w.length, 0);
  const avgWordLength = wordCount === 0 ? 0 : totalWordLen / wordCount;

  // Keyword density (top 8, ignoring stop words and short words)
  const counts = new Map<string, number>();
  for (const w of words) {
    const lw = w.toLowerCase();
    if (lw.length < 3 || STOP_WORDS.has(lw)) continue;
    counts.set(lw, (counts.get(lw) ?? 0) + 1);
  }
  const keywordDensity = [...counts.entries()]
    .map(([word, count]) => ({
      word,
      count,
      percent: wordCount > 0 ? (count / wordCount) * 100 : 0,
    }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 8);

  return {
    words: wordCount,
    characters,
    charactersNoSpaces,
    sentences,
    paragraphs,
    lines,
    readingTimeMin,
    speakingTimeMin,
    longestWord,
    avgWordLength,
    keywordDensity,
  };
}

export function formatNumber(n: number): string {
  return n.toLocaleString("en-US");
}
