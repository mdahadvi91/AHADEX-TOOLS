import { useState, useMemo } from "react";
import { Search, X } from "lucide-react";
import { motion } from "framer-motion";
import { tools } from "@data/tools";
import { categories } from "@data/categories";
import { ToolCard } from "./ToolCard";
import { ToolsHero } from "@components/tools/ToolsHero";
import { cn } from "@lib/cn";

export function ToolGrid() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<string>("all");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return tools.filter((tool) => {
      if (category !== "all" && tool.category !== category) return false;
      if (!q) return true;
      return [tool.name, tool.description, tool.category, ...tool.keywords]
        .join(" ")
        .toLowerCase()
        .includes(q);
    });
  }, [query, category]);

  const hasFilters = query.length > 0 || category !== "all";

  return (
    <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8">
      {/* Hero — beautiful intro */}
      <ToolsHero totalCount={tools.length} />

      {/* Filter section */}
      <div className="py-10 lg:py-12">
        <div className="flex flex-col gap-5">
          {/* Search */}
          <div className="relative max-w-md">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-silk-rose" />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search tools..."
              className={cn(
                "w-full h-12 pl-11 pr-11 rounded-full",
                "bg-white/70 dark:bg-dark-surface/70 backdrop-blur-xl",
                "border border-silk-rose/20 focus:border-silk-rose/50",
                "text-sm text-light-text dark:text-dark-text",
                "placeholder:text-light-textSecondary/60 dark:placeholder:text-dark-textSecondary/50",
                "outline-none transition-all"
              )}
            />
            {query && (
              <button
                type="button"
                onClick={() => setQuery("")}
                aria-label="Clear search"
                className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 rounded-full bg-silk-rose/20 flex items-center justify-center text-silk-wine dark:text-silk-rose hover:bg-silk-rose/30"
              >
                <X className="w-3 h-3" />
              </button>
            )}
          </div>

          {/* Category pills */}
          <div className="flex flex-wrap gap-2">
            <CategoryPill
              active={category === "all"}
              onClick={() => setCategory("all")}
            >
              All
              <span className="ml-1.5 opacity-60 text-[10px]">{tools.length}</span>
            </CategoryPill>

            {categories.map((cat) => (
              <CategoryPill
                key={cat.id}
                active={category === cat.id}
                onClick={() => setCategory(cat.id)}
              >
                {cat.name.replace(" Tools", "")}
                <span className="ml-1.5 opacity-60 text-[10px]">{cat.count}</span>
              </CategoryPill>
            ))}
          </div>
        </div>
      </div>

      {/* Results count */}
      {hasFilters && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mb-6 text-sm text-light-textSecondary dark:text-dark-textSecondary"
        >
          {filtered.length} of {tools.length} tools match your filters
        </motion.p>
      )}

      {/* Grid */}
      {filtered.length === 0 ? (
        <EmptyState onClear={() => { setQuery(""); setCategory("all"); }} />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 pb-16">
          {filtered.map((tool, i) => (
            <ToolCard key={tool.id} tool={tool} index={i} />
          ))}
        </div>
      )}
    </div>
  );
}

function CategoryPill({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "relative px-4 py-2 rounded-full text-xs font-medium transition-all duration-300",
        active
          ? "bg-gradient-to-r from-silk-rose to-silk-wine-deep text-white shadow-[0_8px_20px_-6px_rgba(139,58,79,0.4)]"
          : "bg-white/60 dark:bg-dark-surface/60 backdrop-blur-xl border border-silk-rose/20 text-light-textSecondary dark:text-dark-textSecondary hover:border-silk-rose/50 hover:text-silk-wine dark:hover:text-silk-rose"
      )}
    >
      {children}
    </button>
  );
}

function EmptyState({ onClear }: { onClear: () => void }) {
  return (
    <div className="flex flex-col items-center justify-center text-center py-20">
      <div className="w-20 h-20 rounded-3xl bg-silk-rose/10 border border-silk-rose/25 flex items-center justify-center mb-6">
        <Search className="w-8 h-8 text-silk-rose/60" />
      </div>
      <h3 className="font-display font-bold text-xl text-light-text dark:text-dark-text mb-2">
        No tools found
      </h3>
      <p className="text-sm text-light-textSecondary dark:text-dark-textSecondary max-w-sm mb-6">
        Try a different keyword or clear the filters.
      </p>
      <button
        type="button"
        onClick={onClear}
        className="px-6 py-3 rounded-full bg-gradient-to-r from-silk-rose to-silk-wine-deep text-white text-sm font-medium shadow-silk-medium hover:shadow-silk-deep transition-all"
      >
        Clear filters
      </button>
    </div>
  );
}
