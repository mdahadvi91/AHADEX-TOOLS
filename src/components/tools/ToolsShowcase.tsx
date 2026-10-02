import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { SearchX } from "lucide-react";
import { tools } from "@data/tools";
import { useFavorites } from "@hooks/useFavorites";
import { useLanguage } from "@contexts/LanguageContext";
import { ToolsHero } from "./ToolsHero";
import { ToolsSearch } from "./ToolsSearch";
import { SmallToolCard } from "./SmallToolCard";
import { GridBackground } from "./GridBackground";

export function ToolsShowcase() {
  const [query, setQuery] = useState("");
  const isSearching = query.trim().length > 0;
  const { isFavorite, toggle } = useFavorites();
  const { t } = useLanguage();

  /** All tools, popular first, then favorites, then rest */
  const allToolsSorted = useMemo(() => {
    return [...tools].sort((a, b) => {
      // 1. Favorites first
      const af = isFavorite(a.id) ? 1 : 0;
      const bf = isFavorite(b.id) ? 1 : 0;
      if (af !== bf) return bf - af;
      // 2. Popular first
      const ap = a.popular ? 1 : 0;
      const bp = b.popular ? 1 : 0;
      if (ap !== bp) return bp - ap;
      // 3. New tools next
      const an = a.newTool ? 1 : 0;
      const bn = b.newTool ? 1 : 0;
      return bn - an;
    });
  }, [isFavorite]);

  /** Search-filtered list */
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];
    const matches = tools.filter((tool) =>
      [tool.name, tool.description, tool.category, ...tool.keywords]
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

  const listToRender = isSearching ? filtered : allToolsSorted;

  return (
    <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8">
      <ToolsHero />

      <div className="py-6 lg:py-8">
        <ToolsSearch value={query} onChange={setQuery} />
      </div>

      <div className="relative pb-20">
        <GridBackground />

        <div className="relative">
          {/* Result count (only when searching) */}
          {isSearching && (
            <p className="text-sm text-light-textSecondary dark:text-dark-textSecondary mb-5">
              {filtered.length}{" "}
              {filtered.length === 1 ? t.tools.resultFor : t.tools.resultsFor}{" "}
              <span className="font-medium text-light-text dark:text-dark-text">
                "{query}"
              </span>
            </p>
          )}

          {/* Empty state */}
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
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 lg:gap-4"
            >
              {listToRender.map((tool, i) => (
                <SmallToolCard
                  key={tool.id}
                  tool={tool}
                  index={i}
                  isFavorite={isFavorite(tool.id)}
                  onToggleFavorite={toggle}
                />
              ))}
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}
