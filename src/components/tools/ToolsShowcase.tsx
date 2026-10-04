import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { SearchX, Clock, ArrowRight } from "lucide-react";
import { tools } from "@data/tools";
import { plannedTools } from "@data/plannedTools";
import { useFavorites } from "@hooks/useFavorites";
import { useLanguage } from "@contexts/LanguageContext";
import { cn } from "@lib/cn";
import { ToolsHero } from "./ToolsHero";
import { ToolsSearch } from "./ToolsSearch";
import { SmallToolCard } from "./SmallToolCard";
import { GridBackground } from "./GridBackground";
import { getToolEmoji } from "@components/common/toolEmojis";
import { getPlannedToolTranslation } from "@i18n/plannedToolTranslations";


export function ToolsShowcase() {
  const [query, setQuery] = useState("");
  const isSearching = query.trim().length > 0;
  const { isFavorite, toggle } = useFavorites();
  const { t, language } = useLanguage();

  /** All working tools — favorites first, then by search volume desc */
  const sortedTools = useMemo(() => {
    return [...tools].sort((a, b) => {
      // 1. Favorites (user-starred) always first
      const af = isFavorite(a.id) ? 1 : 0;
      const bf = isFavorite(b.id) ? 1 : 0;
      if (af !== bf) return bf - af;

      // 2. Higher search volume first (see searchVolume in src/data/tools.ts)
      const asv = a.searchVolume ?? 0;
      const bsv = b.searchVolume ?? 0;
      if (asv !== bsv) return bsv - asv;

      // 3. New tools as tie-breaker
      const an = a.newTool ? 1 : 0;
      const bn = b.newTool ? 1 : 0;
      if (an !== bn) return bn - an;

      // 4. Alphabetical as final tie-breaker
      return a.name.localeCompare(b.name);
    });
  }, [isFavorite]);

  /** Search-filtered list (working tools only) */
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];
    const matches = tools.filter((tool) =>
      [tool.name, tool.description, ...tool.keywords]
        .join(" ")
        .toLowerCase()
        .includes(q)
    );
    return matches.sort((a, b) => {
      const af = isFavorite(a.id) ? 1 : 0;
      const bf = isFavorite(b.id) ? 1 : 0;
      return bf - af;
    });
  }, [query, isFavorite]);

  const listToRender = isSearching ? filtered : sortedTools;

  return (
    <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8">
      <ToolsHero />

      <div className="py-6 lg:py-8">
        <ToolsSearch value={query} onChange={setQuery} />
      </div>

      {/* ─── WORKING TOOLS ─── */}
      <div className="relative pb-12">
        <GridBackground />

        <div className="relative">
          {isSearching && (
            <p className="text-sm text-light-textSecondary dark:text-dark-textSecondary mb-5">
              {filtered.length}{" "}
              {filtered.length === 1 ? t.tools.resultFor : t.tools.resultsFor}{" "}
              <span className="font-medium text-light-text dark:text-dark-text">
                "{query}"
              </span>
            </p>
          )}

          {listToRender.length === 0 && isSearching ? (
            <div className="flex flex-col items-center justify-center text-center py-20">
              <div className="w-20 h-20 rounded-3xl bg-silk-rose/10 border border-silk-rose/25 flex items-center justify-center mb-6">
                <SearchX className="w-8 h-8 text-silk-rose/60" />
              </div>
              <h3 className="font-display font-bold text-xl text-light-text dark:text-dark-text mb-2">
                {t.tools.noResults}
              </h3>
              <p className="text-sm text-light-textSecondary dark:text-dark-textSecondary max-w-sm mb-6">
                {t.tools.noResultsDesc}
              </p>
              <button
                type="button"
                onClick={() => setQuery("")}
                className="px-6 py-3 rounded-full bg-gradient-to-r from-silk-rose to-silk-wine-deep text-white text-sm font-medium shadow-silk-medium hover:shadow-silk-deep transition-all"
              >
                {t.tools.clearSearch}
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 lg:gap-4">
              {listToRender.map((tool, i) => (
                <SmallToolCard
                  key={tool.id}
                  tool={tool}
                  index={i}
                  isFavorite={isFavorite(tool.id)}
                  onToggleFavorite={toggle}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* ─── COMING SOON ─── */}
      {!isSearching && plannedTools.length > 0 && (
        <section className="relative pb-20">
          <div className="flex items-center gap-3 mb-6 sm:mb-8">
            <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-silk-rose/8 border border-silk-rose/25 text-silk-wine dark:text-silk-rose-soft text-[10px] font-bold uppercase tracking-[0.2em]">
              <Clock className="w-3 h-3" />
              {language === "bn" ? "শীঘ্রই আসছে" : "Coming soon"}
            </span>
            <span className="flex-1 h-px bg-silk-rose/15" />
            <Link
              to="/tools"
              className="inline-flex items-center gap-1 text-xs text-light-textSecondary dark:text-dark-textSecondary hover:text-silk-rose transition-colors"
            >
              {language === "bn" ? "সব দেখুন" : "View all"}
              <ArrowRight className="w-3 h-3" />
            </Link>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 lg:gap-4">
            {plannedTools.map((pt) => (
              <ComingSoonCard key={pt.id} tool={pt} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}

/* ============================================================
 * Coming Soon Card
 * ============================================================ */

import type { PlannedTool } from "@data/plannedTools";

function ComingSoonCard({ tool }: { tool: PlannedTool }) {
  const { language } = useLanguage();

  return (
    <div
      className={cn(
        "relative flex flex-col p-4 rounded-2xl",
        "bg-white/50 dark:bg-dark-surface/50 backdrop-blur-xl",
        "border border-dashed border-silk-rose/20",
        "opacity-80"
      )}
      aria-disabled="true"
    >
      <div className="flex items-start justify-between gap-3 mb-4">
        <span
          className={cn(
            "w-10 h-10 rounded-xl flex items-center justify-center shrink-0",
            "bg-silk-rose/8 border border-silk-rose/20"
          )}
        >
          {getToolEmoji(tool.id)}
        </span>
        <span className="text-[9px] font-bold uppercase tracking-wider text-silk-rose/70 border border-silk-rose/25 px-2 py-0.5 rounded-full">
          {language === "bn" ? "শীঘ্রই" : "Soon"}
        </span>
      </div>

      <h3 className="font-display font-semibold text-sm text-light-text/80 dark:text-dark-text/80 mb-1">
        {getPlannedToolTranslation(tool.id, language, { name: tool.name, description: tool.description }).name}
      </h3>
      <p className="text-[11px] text-light-textSecondary/70 dark:text-dark-textSecondary/70 leading-relaxed line-clamp-2">
        {getPlannedToolTranslation(tool.id, language, { name: tool.name, description: tool.description }).description}
      </p>
    </div>
  );
}
