import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { useLanguage } from "@contexts/LanguageContext";
import { cn } from "@lib/cn";
import { getToolIcon } from "@components/common/toolIcons";
import { cvBuilderContent } from "../content";

const TOOLS = [
  {
    to: "/tools/visiting-card",
    toolId: "visiting-card",
    titleEn: "Visiting Card Maker",
    titleBn: "ভিজিটিং কার্ড মেকার",
    descEn: "Design print-ready business cards",
    descBn: "প্রিন্ট-রেডি ভিজিটিং কার্ড",
    accent: "#D88B9A",
  },
  {
    to: "/tools/photo-qr",
    toolId: "photo-qr",
    titleEn: "Photo QR Code",
    titleBn: "ফটো QR কোড",
    descEn: "Add a scannable QR to any photo",
    descBn: "যেকোনো ছবিতে QR যোগ করুন",
    accent: "#C99667",
  },
];

export function CVBuilderRelatedTools() {
  const { language } = useLanguage();
  const c = cvBuilderContent[language];
  const bn = language === "bn";

  return (
    <section className="py-10 sm:py-14">
      <div className="max-w-3xl mx-auto">
        <h2 className="font-display font-black text-xl sm:text-2xl text-light-text dark:text-dark-text mb-6 text-center">
          {c.relatedTitle}
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {TOOLS.map((t) => {
            const Icon = getToolIcon(t.toolId);
            return (
              <Link
                key={t.to}
                to={t.to}
                className={cn(
                  "group flex items-center gap-3 p-4 rounded-2xl",
                  "bg-white/70 dark:bg-dark-surface/70 backdrop-blur-xl",
                  "border border-silk-rose/15 hover:border-silk-rose/50",
                  "hover:-translate-y-0.5 transition-all"
                )}
              >
                <span
                  className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0 border"
                  style={{
                    backgroundColor: `${t.accent}15`,
                    borderColor: `${t.accent}40`,
                    color: t.accent,
                  }}
                >
                  <Icon size={22} strokeWidth={1.8} />
                </span>
                <div className="flex-1 min-w-0">
                  <p className="font-display font-semibold text-sm text-light-text dark:text-dark-text leading-tight">
                    {bn ? t.titleBn : t.titleEn}
                  </p>
                  <p className="text-[11px] text-lightTextSecondary dark:text-darkTextSecondary mt-0.5">
                    {bn ? t.descBn : t.descEn}
                  </p>
                </div>
                <ArrowRight className="w-4 h-4 text-silk-rose shrink-0 group-hover:translate-x-0.5 transition-transform" />
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
