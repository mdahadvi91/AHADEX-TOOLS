/* ============================================================
 * Tool Translations (Bangla)
 * ------------------------------------------------------------
 * ONLY includes translations for tools currently registered in
 * src/data/tools.ts.
 *
 * For tools in src/data/plannedTools.ts, see:
 *   src/i18n/plannedToolTranslations.ts
 *
 * When you add a new working tool, add its BN translation here
 * IN THE SAME COMMIT.
 * ============================================================ */

export interface ToolTranslation {
  name: string;
  description: string;
}

export const toolTranslationsBn: Record<string, ToolTranslation> = {
  "photo-qr": {
    name: "ফটো QR কোড",
    description:
      "যেকোনো ছবিতে সত্যিকারের স্ক্যানযোগ্য QR ব্যাজ যোগ করুন — WhatsApp, Facebook, WiFi এবং আরও।",
  },
  "visiting-card": {
    name: "ভিজিটিং কার্ড মেকার",
    description:
      "সেকেন্ডের মধ্যে প্রিন্ট-রেডি ভিজিটিং কার্ড ডিজাইন করুন। ২০টি প্রিমিয়াম টেমপ্লেট — সামনে ও পিছনে। ফ্রি, প্রাইভেট, PNG/JPG এক্সপোর্ট।",
  },
};

/* ============================================================
 * Lookup helper — falls back to English when no BN exists
 * ============================================================ */

export function getToolTranslation(
  toolId: string,
  lang: "en" | "bn",
  fallback: { name: string; description: string }
): { name: string; description: string } {
  if (lang === "bn") {
    const tr = toolTranslationsBn[toolId];
    if (tr) return tr;
  }
  return fallback;
}
