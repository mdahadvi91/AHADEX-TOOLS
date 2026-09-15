import React from 'react';
import { Link } from 'react-router-dom';
import {
  ChevronRight,
  ShieldCheck,
  Zap,
  Clock,
  Wrench,
  FileImage,
  FileText,
  RefreshCw,
  Minimize2,
  QrCode,
  Sparkles,
  LucideIcon,
} from 'lucide-react';
import type { Tool } from '@/src/types/tool';
import { CATEGORIES } from '@/src/data/categories';

const ICON_MAP: Record<string, LucideIcon> = {
  FileImage,
  FileText,
  RefreshCw,
  Minimize2,
  QrCode,
  Wrench,
};

export interface ToolHeaderProps {
  tool: Tool;
  className?: string;
  id?: string;
}

/**
 * Reusable Tool Header for AHADEX TOOLS.
 * Displays breadcrumb hierarchy, tool icon, canonical name, description,
 * and privacy/execution badges from the central tool registry.
 */
export default function ToolHeader({
  tool,
  className = '',
  id = 'tool-header',
}: ToolHeaderProps) {
  const IconComponent = ICON_MAP[tool.icon] || Wrench;
  const category = CATEGORIES.find(
    (cat) => cat.id === tool.categoryId || cat.id === tool.category
  );

  return (
    <header id={id} className={`w-full flex flex-col space-y-4 ${className}`}>
      {/* Breadcrumb Hierarchy Navigation */}
      <nav aria-label="Breadcrumbs" className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400 flex-wrap">
        <Link
          to="/"
          className="hover:text-sky-600 dark:hover:text-sky-400 transition-colors"
        >
          Home
        </Link>
        <ChevronRight className="w-3.5 h-3.5 text-slate-400 dark:text-slate-600" aria-hidden="true" />
        {category ? (
          <Link
            to={`/category/${category.id}`}
            className="hover:text-sky-600 dark:hover:text-sky-400 transition-colors"
          >
            {category.name}
          </Link>
        ) : (
          <span>Tools</span>
        )}
        <ChevronRight className="w-3.5 h-3.5 text-slate-400 dark:text-slate-600" aria-hidden="true" />
        <span className="font-semibold text-slate-800 dark:text-slate-200 truncate max-w-[200px]" aria-current="page">
          {tool.name}
        </span>
      </nav>

      {/* Main Title & Brand Presentation */}
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
        <div className="flex items-start gap-4">
          {/* Tool Icon Frame */}
          <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-gradient-to-tr from-sky-500/15 to-indigo-500/15 border border-sky-500/25 dark:border-sky-400/25 flex items-center justify-center text-sky-600 dark:text-sky-400 shrink-0 shadow-sm">
            <IconComponent className="w-6 h-6 sm:w-7 sm:h-7" aria-hidden="true" />
          </div>

          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              {tool.name}
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-1 max-w-2xl leading-relaxed">
              {tool.shortDescription}
            </p>
          </div>
        </div>

        {/* Status & Privacy Badges */}
        <div className="flex items-center gap-2 flex-wrap shrink-0">
          {/* Client-Side Execution Guarantee */}
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-emerald-500/10 border border-emerald-500/20 text-emerald-700 dark:text-emerald-400">
            <ShieldCheck className="w-3.5 h-3.5" aria-hidden="true" />
            <span>100% Client-Side</span>
          </span>

          {/* Tool Status */}
          {tool.status === 'coming-soon' ? (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-amber-500/10 border border-amber-500/20 text-amber-700 dark:text-amber-400">
              <Clock className="w-3.5 h-3.5" aria-hidden="true" />
              <span>Preview Mode</span>
            </span>
          ) : (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-sky-500/10 border border-sky-500/20 text-sky-700 dark:text-sky-400">
              <Zap className="w-3.5 h-3.5" aria-hidden="true" />
              <span>Instant</span>
            </span>
          )}
        </div>
      </div>
    </header>
  );
}
