import type { Platform, TextStats } from "./types";

export const MAX_CHARS = 500_000;

export const PLATFORMS: Platform[] = [
  {
    id: "twitter",
    name: "X (Twitter)",
    nameBn: "X (টুইটার)",
    limit: 280,
    emoji: "🐦",
    note: "Per tweet",
    noteBn: "প্রতি টুইটে",
  },
  {
    id: "metaDescription",
    name: "Meta description",
    nameBn: "মেটা ডেসক্রিপশন",
    limit: 160,
    emoji: "🔍",
    note: "SEO snippet",
    noteBn: "SEO স্নিপেট",
  },
  {
    id: "sms",
    name: "SMS",
    nameBn: "SMS",
    limit: 160,
    emoji: "💬",
    note: "Single SMS",
    noteBn: "একটি SMS",
  },
  {
    id: "instagram",
    name: "Instagram caption",
    nameBn: "ইনস্টাগ্রাম ক্যাপশন",
    limit: 2200,
    emoji: "📷",
    note: "Caption length",
    noteBn: "ক্যাপশন দৈর্ঘ্য",
  },
  {
    id: "linkedin",
    name: "LinkedIn post",
    nameBn: "লিংকডইন পোস্ট",
    limit: 3000,
    emoji: "💼",
    note: "Post length",
    noteBn: "পোস্ট দৈর্ঘ্য",
  },
  {
    id: "titleTag",
    name: "SEO title",
    nameBn: "SEO টাইটেল",
    limit: 60,
    emoji: "🏷️",
    note: "Title tag",
    noteBn: "টাইটেল ট্যাগ",
  },
  {
    id: "facebook",
    name: "Facebook post",
    nameBn: "ফেসবুক পোস্ট",
    limit: 63206,
    emoji: "📘",
    note: "Maximum length",
    noteBn: "সর্বোচ্চ দৈর্ঘ্য",
  },
  {
    id: "youtubeTitle",
    name: "YouTube title",
    nameBn: "ইউটিউব টাইটেল",
    limit: 100,
    emoji: "▶️",
    note: "Title length",
    noteBn: "টাইটেল দৈর্ঘ্য",
  },
];

export function countStats(text: string): TextStats {
  const characters = text.length;
  const charactersNoSpaces = text.replace(/\s/g, "").length;
  const trimmed = text.trim();
  const words = trimmed ? (trimmed.match(/\b[\p{L}\p{N}'-]+\b/gu) ?? []).length : 0;
  const lines = text ? text.split("\n").length : 0;
  const paragraphs = trimmed
    ? trimmed.split(/\n\s*\n/).filter((p) => p.trim().length > 0).length
    : 0;

  const remaining: Record<string, number> = {};
  const overLimit: string[] = [];
  for (const p of PLATFORMS) {
    const left = p.limit - characters;
    remaining[p.id] = left;
    if (left < 0) overLimit.push(p.id);
  }

  return {
    characters,
    charactersNoSpaces,
    words,
    lines,
    paragraphs,
    remaining,
    overLimit,
  };
}

export function formatNumber(n: number): string {
  return n.toLocaleString("en-US");
}

export async function copyText(text: string): Promise<void> {
  await navigator.clipboard.writeText(text);
}

export function downloadText(text: string, filename = "text.txt"): void {
  const blob = new Blob([text], { type: "text/plain;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
