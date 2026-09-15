import React, { useState, useMemo } from 'react';
import { getAllTools } from '@/src/data/tools';
import { CATEGORIES } from '@/src/data/categories';
import ToolGrid from './ToolGrid';
import { Grid, Sparkles } from 'lucide-react';
import { useLanguage, type TranslationKey } from '@/src/hooks';

export interface AllToolsSectionProps {
  className?: string;
}

/**
 * All Tools Section.
 * Dynamically displays all registered utilities from tools.ts.
 * Supports category filtering without hardcoding tools.
 */
export default function AllToolsSection({ className = '' }: AllToolsSectionProps) {
  const { t } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const allTools = getAllTools();

  // Active category filter options that actually contain tools
  const categoryFilters = useMemo(() => {
    const activeCategories = CATEGORIES.filter((cat) =>
      allTools.some((tool) => tool.categoryId === cat.id || tool.category === cat.id)
    );

    return [
      { id: 'all', label: t('allTools'), count: allTools.length },
      ...activeCategories.map((cat) => ({
        id: cat.id,
        label: t(`cat_${cat.id}` as TranslationKey, cat.name),
        count: allTools.filter((t) => t.categoryId === cat.id || t.category === cat.id).length,
      })),
    ];
  }, [allTools, t]);

  const filteredTools = useMemo(() => {
    if (selectedCategory === 'all') return allTools;
    return allTools.filter(
      (tool) => tool.categoryId === selectedCategory || tool.category === selectedCategory
    );
  }, [allTools, selectedCategory]);

  return (
    <section id="tools" aria-labelledby="all-tools-heading" className={`w-full ${className}`}>
      {/* Header & Category Filters */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-sky-600 dark:text-sky-400 mb-1">
            <Grid className="w-3.5 h-3.5" aria-hidden="true" />
            <span>{t('completeDirectory')}</span>
          </div>
          <h2
            id="all-tools-heading"
            className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight"
          >
            {t('allOnlineUtilities')}
          </h2>
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-1.5 flex-wrap">
          {categoryFilters.map((filter) => {
            const isActive = selectedCategory === filter.id;
            return (
              <button
                key={filter.id}
                type="button"
                onClick={() => setSelectedCategory(filter.id)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                  isActive
                    ? 'bg-sky-600 text-white shadow-sm shadow-sky-600/30'
                    : 'bg-white/80 dark:bg-slate-800/80 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 border border-slate-200/80 dark:border-slate-700/80'
                }`}
              >
                <span>{filter.label}</span>
                <span
                  className={`ml-1.5 px-1.5 py-0.2 rounded-full text-[10px] ${
                    isActive
                      ? 'bg-sky-700 text-sky-100'
                      : 'bg-slate-200/60 dark:bg-slate-700/60 text-slate-600 dark:text-slate-400'
                  }`}
                >
                  {filter.count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Responsive Grid */}
      <ToolGrid
        tools={filteredTools}
        emptyMessage={t('noToolsFound')}
      />
    </section>
  );
}
