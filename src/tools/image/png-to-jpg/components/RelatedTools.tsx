import { Link } from "react-router-dom";
import { useLanguage } from "@contexts/LanguageContext";
import { cn } from "@lib/cn";
import { getToolEmoji } from "@components/common/toolEmojis";
import { pngToJpgContent } from "../content";

const TOOLS = [
  { to: "/tools/jpg-to-png", toolId: "jpg-to-png", titleEn: "JPG to PNG", titleBn: "JPG থেকে PNG", descEn: "Convert JPG to lossless PNG", descBn: "JPG থেকে lossless PNG", accent: "#D88B9A" },
  { to: "/tools/visiting-card", toolId: "visiting-card", titleEn: "Visiting Card Maker", titleBn: "ভিজিটিং কার্ড মেকার", descEn: "Design print-ready business cards", descBn: "প্রিন্ট-রেডি ভিজিটিং কার্ড", accent: "#C99667" },
  { to: "/tools/cv-builder", toolId: "cv-builder", titleEn: "CV / Resume Builder", titleBn: "সিভি / রেজুমে বিল্ডার", descEn: "Build a professional CV in minutes", descBn: "মিনিটেই পেশাদার সিভি", accent: "#8B9DC7" },
];

export function RelatedTools() {
  const { language } = useLanguage();
  const c = pngToJpgContent[language];
  const bn = language === "bn";
  return (
    <section className="py-10 sm:py-14 pb-20">
      <div className="max-w-3xl mx-auto">
        <h2 className="font-display font-black text-xl sm:text-2xl text-light-text dark:text-dark-text mb-6 text-center">{c.relatedTitle}</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {TOOLS.map((t) => (
            <Link key={t.to} to={t.to} className={cn("group flex items-center gap-3 p-3.5 rounded-2xl", "bg-white/70 dark:bg-dark-surface/70 backdrop-blur-xl", "border border-silk-rose/15 hover:border-silk-rose/50", "hover:-translate-y-0.5 transition-all")}>
              <span className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 border text-xl" style={{ backgroundColor: `${t.accent}15`, borderColor: `${t.accent}40` }}>{getToolEmoji(t.toolId)}</span>
              <div className="flex-1 min-w-0">
                <p className="font-display font-semibold text-[12px] text-light-text dark:text-dark-text leading-tight truncate">{bn ? t.titleBn : t.titleEn}</p>
                <p className="text-[10px] text-lightTextSecondary dark:text-darkTextSecondary mt-0.5 truncate">{bn ? t.descBn : t.descEn}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
