import { useMemo } from "react";
import { useParams, Navigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { tools } from "@data/tools";
import { categories } from "@data/categories";
import { useLanguage } from "@contexts/LanguageContext";
import { useFavorites } from "@hooks/useFavorites";
import { ToolIcon } from "@components/common/ToolIcon";
import { SmallToolCard } from "@components/tools/SmallToolCard";
import { GridBackground } from "@components/tools/GridBackground";

export default function CategoryPage() {
  const { slug } = useParams<{ slug: string }>();
  const { t } = useLanguage();
  const { isFavorite, toggle } = useFavorites();

  const category = useMemo(
    () => categories.find((c) => c.slug === slug),
    [slug]
  );

  const categoryTools = useMemo(() => {
    if (!category) return [];
    const list = tools.filter((tool) => tool.category === category.id);
    return [...list].sort((a, b) => {
      const af = isFavorite(a.id) ? 1 : 0;
      const bf = isFavorite(b.id) ? 1 : 0;
      return bf - af;
    });
  }, [category, isFavorite]);

  if (!category) {
    return <Navigate to="/404" replace />;
  }

  const localizedName =
    t.categories[category.id as keyof typeof t.categories] ?? category.name;

  return (
    <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8">
      {/* HERO */}
      <section className="relative overflow-hidden pt-12 pb-14 sm:pt-16 sm:pb-16">
        <div aria-hidden="true" className="absolute inset-0 pointer-events-none">
          <div
            className="absolute -top-40 -left-40 w-[600px] h-[600px] rounded-full opacity-40"
            style={{
              background:
                "radial-gradient(circle, rgba(216,139,154,0.35) 0%, transparent 65%)",
              filter: "blur(70px)",
            }}
          />
          <div
            className="absolute -bottom-40 -right-40 w-[600px] h-[600px] rounded-full opacity-30"
            style={{
              background:
                "radial-gradient(circle, rgba(201,150,103,0.35) 0%, transparent 65%)",
              filter: "blur(70px)",
            }}
          />
        </div>

        <div className="relative max-w-4xl">
          {/* Back link */}
          <motion.div
            initial={{ opacity: 0, x: -12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-6"
          >
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-sm font-medium text-light-textSecondary dark:text-dark-textSecondary hover:text-silk-rose transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              {t.common.home}
            </Link>
          </motion.div>

          {/* Icon + eyebrow */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="flex items-center gap-3 mb-6"
          >
            <span className="w-12 h-12 rounded-2xl bg-silk-rose/15 border border-silk-rose/25 flex items-center justify-center">
              <ToolIcon category={category.id} size={24} />
            </span>
            <span className="text-[11px] uppercase tracking-[0.3em] text-silk-wine/70 dark:text-silk-rose/60 font-semibold">
              {t.sidebar.categories}
            </span>
          </motion.div>

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="font-display font-bold tracking-tight leading-[1.05] text-light-text dark:text-dark-text text-[clamp(2.25rem,5vw,4rem)]"
          >
            {localizedName}
          </motion.h1>

          {/* Count + description */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.35 }}
            className="mt-5 flex flex-wrap items-center gap-3"
          >
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-silk-rose/15 text-silk-wine dark:text-silk-rose-soft text-xs font-mono font-bold">
              {categoryTools.length} {t.common.tools.toLowerCase()}
            </span>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.45 }}
            className="mt-4 text-base sm:text-lg text-light-textSecondary dark:text-dark-textSecondary leading-relaxed max-w-2xl"
          >
            {category.description}
          </motion.p>
        </div>
      </section>

      {/* Divider */}
      <div
        aria-hidden="true"
        className="h-px w-full bg-gradient-to-r from-transparent via-silk-rose/40 to-transparent"
      />

      {/* TOOLS GRID */}
      <section className="relative py-12 pb-24">
        <GridBackground />

        <div className="relative">
          {categoryTools.length === 0 ? (
            <div className="flex flex-col items-center justify-center text-center py-20">
              <div className="w-20 h-20 rounded-3xl bg-silk-rose/10 border border-silk-rose/25 flex items-center justify-center mb-6">
                <ToolIcon category={category.id} size={32} />
              </div>
              <h3 className="font-display font-bold text-xl text-light-text dark:text-dark-text mb-2">
                {t.tools.noResults}
              </h3>
              <p className="text-sm text-light-textSecondary dark:text-dark-textSecondary max-w-sm mb-6">
                {t.tools.noResultsDesc}
              </p>
              <Link
                to="/"
                className="px-6 py-3 rounded-full bg-gradient-to-r from-silk-rose to-silk-wine-deep text-white text-sm font-medium shadow-silk-medium hover:shadow-silk-deep transition-all"
              >
                {t.common.home}
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 lg:gap-4">
              {categoryTools.map((tool, i) => (
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
      </section>
    </div>
  );
}
