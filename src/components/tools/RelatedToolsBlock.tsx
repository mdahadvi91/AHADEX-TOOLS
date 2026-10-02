import { useMemo } from "react";
import { Link } from "react-router-dom";
import { useLanguage } from "@contexts/LanguageContext";
import { cn } from "@lib/cn";
import { tools } from "@data/tools";
import { getToolEmoji } from "@components/common/toolEmojis";
import { getToolTranslation } from "@i18n/toolTranslations";

interface RelatedToolsBlockProps {
  /** The tool currently being viewed — will be excluded from results */
  currentToolId: string;
  /** How many tools to show. Default: 3 */
  count?: number;
  /** Optional custom title */
  titleEn?: string;
  titleBn?: string;
}

/**
 * Auto-populated Related Tools section.
 *
 * Rules:
 *   1. Never include the current tool.
 *   2. Prefer tools with overlapping keywords.
 *   3. Prefer popular tools on ties.
 *   4. Stable: preserves original registry order for equal scores.
 *
 * When a new tool is added to `src/data/tools.ts`, it automatically
 * becomes eligible to appear in every other tool's related section.
 */
export function RelatedToolsBlock({
  currentToolId,
  count = 3,
  titleEn = "Other tools you may like",
  titleBn = "অন্য যেসব টুল ভালো লাগতে পারে",
}: RelatedToolsBlockProps) {
  const { language } = useLanguage();
  const bn = language === "bn";

  const related = useMemo(() => {
    const current = tools.find((t) => t.id === currentToolId);
    const candidates = tools.filter((t) => t.id !== currentToolId);

    // Score each candidate
    const scored = candidates.map((t, idx) => {
      let score = 0;

      // Keyword overlap (main signal)
      if (current) {
        const overlap = t.keywords.filter((k) =>
          current.keywords.includes(k)
        ).length;
        score += overlap * 10;
      }

      // Popular bonus
      if (t.popular) score += 5;

      // New tool slight boost
      if (t.newTool) score += 2;

      // Stable order tie-break
      return { tool: t, score, idx };
    });

    scored.sort((a, b) => {
      if (b.score !== a.score) return b.score - a.score;
      return a.idx - b.idx;
    });

    return scored.slice(0, count).map((s) => s.tool);
  }, [currentToolId, count]);

  if (related.length === 0) return null;

  return (
    <section className="py-10 sm:py-14 pb-20">
      <div className="max-w-3xl mx-auto">
        <h2 className="font-display font-black text-xl sm:text-2xl text-light-text dark:text-dark-text mb-6 text-center">
          {bn ? titleBn : titleEn}
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {related.map((t) => {
            const translated = getToolTranslation(t.id, language, {
              name: t.name,
              description: t.description,
            });
            return (
              <Link
                key={t.id}
                to={t.path}
                className={cn(
                  "group flex items-center gap-3 p-3.5 rounded-2xl",
                  "bg-white/70 dark:bg-dark-surface/70 backdrop-blur-xl",
                  "border border-silk-rose/15 hover:border-silk-rose/50",
                  "hover:-translate-y-0.5 transition-all"
                )}
              >
                <span className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 border text-xl bg-silk-rose/10 border-silk-rose/25">
                  {getToolEmoji(t.id)}
                </span>
                <div className="flex-1 min-w-0">
                  <p className="font-display font-semibold text-[12px] text-light-text dark:text-dark-text leading-tight truncate">
                    {translated.name}
                  </p>
                  <p className="text-[10px] text-light-textSecondary dark:text-dark-textSecondary mt-0.5 line-clamp-1">
                    {translated.description}
                  </p>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
