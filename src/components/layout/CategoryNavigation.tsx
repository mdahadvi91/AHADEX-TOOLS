import React from 'react';
import { NavLink } from 'react-router-dom';
import { CATEGORIES } from '@/src/data/categories';
import type { CategoryDefinition } from '@/src/types/common';
import { useLanguage, type TranslationKey } from '@/src/hooks';
import {
  Image,
  FileText,
  QrCode,
  Type,
  Code2,
  RefreshCw,
  Wrench,
  LucideIcon,
} from 'lucide-react';

const CATEGORY_ICON_MAP: Record<string, LucideIcon> = {
  image: Image,
  pdf: FileText,
  qr: QrCode,
  text: Type,
  developer: Code2,
  converters: RefreshCw,
  utilities: Wrench,
};

export interface CategoryNavigationProps {
  categories?: CategoryDefinition[];
  className?: string;
  onItemClick?: () => void;
}

/**
 * Reusable Category Navigation.
 * Dynamically binds to category data with active routing indicators.
 */
export default function CategoryNavigation({
  categories = CATEGORIES,
  className = '',
  onItemClick,
}: CategoryNavigationProps) {
  const { t } = useLanguage();

  return (
    <nav aria-label="Tool Categories Navigation" className={`flex flex-col gap-1 ${className}`}>
      {categories.map((category) => {
        const IconComponent = CATEGORY_ICON_MAP[category.id] || Wrench;
        const categoryLabel = t(`cat_${category.id}` as TranslationKey, category.name);
        return (
          <NavLink
            key={category.id}
            to={`/category/${category.slug}`}
            onClick={onItemClick}
            className={({ isActive }) =>
              `group flex items-center gap-3 px-3 py-2.5 rounded-lg text-xs sm:text-sm font-medium transition-all ${
                isActive
                  ? 'bg-sky-500/10 text-sky-600 dark:text-sky-400 border border-sky-500/20 font-semibold'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 hover:bg-slate-100/60 dark:hover:bg-slate-800/60'
              }`
            }
          >
            <span className="p-1.5 rounded-md bg-slate-100 dark:bg-slate-800/80 text-slate-500 dark:text-slate-400 group-hover:text-sky-600 dark:group-hover:text-sky-400 transition-colors">
              <IconComponent className="w-4 h-4" aria-hidden="true" />
            </span>
            <span className="truncate flex-1">{categoryLabel}</span>
          </NavLink>
        );
      })}
    </nav>
  );
}
