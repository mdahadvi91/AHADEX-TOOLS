import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Clock, ArrowRight } from "lucide-react";
import { getRecentTools, type RecentTool } from "@lib/recentTools";
import { useLanguage } from "@contexts/LanguageContext";

export function RecentlyUsed() {
  const [recent, setRecent] = useState<RecentTool[]>([]);
  const { language } = useLanguage();
  const bn = language === "bn";

  useEffect(() => {
    setRecent(getRecentTools());
  }, []);

  if (recent.length === 0) return null;

  return (
    <section className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8 py-8 sm:py-10 min-h-[180px]">
      <div className="flex items-center gap-2 mb-5">
        <Clock className="w-4 h-4 text-silk-rose" />
        <h2 className="font-serif font-black text-xl sm:text-2xl text-light-text dark:text-dark-text">
          {bn ? "সাম্প্রতিক ব্যবহার" : "Recently Used Tools"}
        </h2>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {recent.map((t) => (
          <div
            key={t.path}
            >
            <Link
              to={t.path}
              className="group flex items-center gap-3 p-3.5 rounded-xl border border-silk-rose/20 bg-white/70 dark:bg-dark-surface/70 hover:border-silk-rose/50 hover:shadow-md transition-all"
            >
              <span className="text-2xl shrink-0">{t.emoji}</span>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-bold text-light-text dark:text-dark-text truncate capitalize">
                  {t.name}
                </p>
              </div>
              <ArrowRight className="w-3.5 h-3.5 text-silk-rose shrink-0 group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
}
