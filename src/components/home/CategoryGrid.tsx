import React from 'react';
import { Link } from 'react-router-dom';
import { CATEGORIES } from '@/src/data/categories';
import { getToolsByCategory } from '@/src/data/tools';
import {
  Image as ImageIcon,
  FileText,
  QrCode,
  Type,
  Code2,
  RefreshCw,
  Wrench,
  ArrowRight,
  LucideIcon,
  Layers,
} from 'lucide-react';

const CATEGORY_ICONS: Record<string, LucideIcon> = {
  Image: ImageIcon,
  FileText,
  QrCode,
  Type,
  Code2,
  RefreshCw,
  Wrench,
};

export interface CategoryGridProps {
  className?: string;
}

/**
 * Category Discovery Grid Component.
 * Purely data-driven from central categories registry (src/data/categories.ts).
 */
export default function CategoryGrid({ className = '' }: CategoryGridProps) {
  return (
    <section aria-labelledby="categories-heading" className={`w-full ${className}`}>
      <div className="flex items-center justify-between gap-4 mb-6">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-sky-600 dark:text-sky-400 mb-1">
            <Layers className="w-3.5 h-3.5" aria-hidden="true" />
            <span>Explore By Domain</span>
          </div>
          <h2 id="categories-heading" className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Tool Categories
          </h2>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5">
        {CATEGORIES.map((category) => {
          const IconComponent = CATEGORY_ICONS[category.icon] || Wrench;
          const tools = getToolsByCategory(category.id);
          const toolCount = tools.length;
          const isComingSoon = category.status === 'coming-soon';

          return (
            <Link
              key={category.id}
              to={`/category/${category.slug}`}
              id={`category-card-${category.id}`}
              className="group relative flex flex-col justify-between p-5 rounded-2xl glass-panel-interactive border border-slate-200/80 dark:border-slate-800/80 bg-white/70 dark:bg-slate-900/60 hover:bg-white dark:hover:bg-slate-900/90 transition-all hover:border-sky-500/40 dark:hover:border-sky-500/40 hover:shadow-md hover:-translate-y-0.5"
            >
              <div>
                <div className="flex items-center justify-between mb-3.5">
                  <div className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-sky-600 dark:text-sky-400 group-hover:bg-sky-500/10 group-hover:text-sky-500 transition-colors">
                    <IconComponent className="w-5 h-5" aria-hidden="true" />
                  </div>

                  {isComingSoon ? (
                    <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 border border-slate-200 dark:border-slate-700">
                      Coming Soon
                    </span>
                  ) : (
                    <span className="text-[11px] font-semibold text-slate-500 dark:text-slate-400">
                      {toolCount} {toolCount === 1 ? 'utility' : 'utilities'}
                    </span>
                  )}
                </div>

                <h3 className="text-base font-bold text-slate-900 dark:text-white group-hover:text-sky-600 dark:group-hover:text-sky-400 transition-colors mb-1">
                  {category.name}
                </h3>

                <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-2 leading-relaxed mb-4">
                  {category.description}
                </p>
              </div>

              <div className="pt-3 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-xs font-semibold text-sky-600 dark:text-sky-400">
                <span>Browse category</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
