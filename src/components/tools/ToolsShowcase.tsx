import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { SearchX } from "lucide-react";
import { tools } from "@data/tools";
import { categories } from "@data/categories";
import { useFavorites } from "@hooks/useFavorites";
import { ToolsHero } from "./ToolsHero";
import { ToolsSearch } from "./ToolsSearch";
import { CategorySection } from "./CategorySection";
import { SmallToolCard } from "./SmallToolCard";
import { GridBackground } from "./GridBackground";

export function ToolsShowcase() {
  const [query, setQuery] = useState("");
  const isSearching = query.trim().length > 0;
  const { isFavorite, toggle } = useFavorites();

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];
    const matches = tools.filter((t) =>
      [t.name, t.description, t.category, ...t.keywords]
        .join(" ")
        .toLowerCase()
        .includes(q)
    );
    // Favorites first
    return matches.sort((a, b) => {
      const af = isFavorite(a.id) ? 1 : 0;
      const bf = isFavorite(b.id) ? 1 : 0;
      return bf - af;
    });
  }, [query, isFavorite]);

  const sections = useMemo(
    () =>
      categories
        .map((cat) => ({
          category: cat,
          tools: tools.filter((t) => t.category === cat.id),
        }))
        .filter((s) => s.tools.length > 0),
    []
  );

  return (
    <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8">
      <ToolsHero />

      <div className="py-6 lg:py-8">
        <ToolsSearch value={query} onChange={setQuery} />
      </div>

      {isSearching ? (
        <div className="pb-20">
          <p className="text-sm text-light-textSecondary dark:text-dark-textSecondary mb-5">
            {filtered.length} result{filtered.length === 1 ? "" : "s"} for "
            <span className="font-medium text-light-text dark:text-dark-text">{query}</span>"
          </p>

          {filtered.length === 0 ? (
            <div className="flex flex-col items-center justify-center text-center py-20">
              <div className="w-20 h-20 rounded-3xl bg-silk-rose/10 border border-silk-rose/25 flex items-center justify-center mb-6">
                <SearchX className="w-8 h-8 text-silk-rose/60" />
              </div>
              <h3 className="font-display font-bold text-xl text-light-text dark:text-dark-text mb-2">
                No tools found
              </h3>
              <p className="text-sm text-light-textSecondary dark:text-dark-textSecondary max-w-sm mb-6">
                Try a different keyword.
              </p>
              <button
                type="button"
                onClick={() => setQuery("")}
                className="px-6 py-3 rounded-full bg-gradient-to-r from-silk-rose to-silk-wine-deep text-white text-sm font-medium shadow-silk-medium hover:shadow-silk-deep transition-all"
              >
                Clear search
              </button>
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 lg:gap-4"
            >
              {filtered.map((tool, i) => (
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
      ) : (
        <div className="relative pb-20">
          <GridBackground />

          <div className="relative">
            {sections.map((section, i) => (
              <CategorySection
                key={section.category.id}
                category={section.category}
                tools={section.tools}
                index={i}
              />
            ))}
          </div>

          {sections.length === 0 && (
            <div className="text-center py-20 text-sm text-light-textSecondary dark:text-dark-textSecondary">
              Tools coming soon...
            </div>
          )}
        </div>
      )}
    </div>
  );
}
