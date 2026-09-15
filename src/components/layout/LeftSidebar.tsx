import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, Compass, Sparkles } from 'lucide-react';
import { useLanguage } from '@/src/hooks';
import CategoryNavigation from './CategoryNavigation';

export interface LeftSidebarProps {
  className?: string;
  onItemClick?: () => void;
}

/**
 * Reusable Left Navigation Sidebar.
 * Stable, desktop-accessible navigation docking category trees and primary anchors.
 */
export default function LeftSidebar({ className = '', onItemClick }: LeftSidebarProps) {
  const { t } = useLanguage();

  return (
    <aside
      id="ahadex-left-sidebar"
      aria-label="Platform Sidebar Navigation"
      className={`w-64 shrink-0 flex flex-col gap-6 p-4 glass-panel border border-slate-200/80 dark:border-slate-800/80 bg-white/60 dark:bg-slate-900/60 backdrop-blur-md rounded-2xl ${className}`}
    >
      {/* Primary Links */}
      <div className="flex flex-col gap-1">
        <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 px-3 py-1">
          {t('explore')}
        </div>
        <NavLink
          to="/"
          onClick={onItemClick}
          className={({ isActive }) =>
            `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
              isActive
                ? 'bg-sky-500/10 text-sky-600 dark:text-sky-400 border border-sky-500/20 font-semibold'
                : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100/70 dark:hover:bg-slate-800/70'
            }`
          }
        >
          <Home className="w-4 h-4 text-sky-600 dark:text-sky-400" aria-hidden="true" />
          <span>{t('home')}</span>
        </NavLink>
      </div>

      {/* Tool Categories Section */}
      <div className="flex flex-col gap-1 flex-1">
        <div className="flex items-center justify-between px-3 py-1">
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
            {t('toolCategories')}
          </span>
          <Compass className="w-3.5 h-3.5 text-slate-400" aria-hidden="true" />
        </div>
        <CategoryNavigation onItemClick={onItemClick} />
      </div>

      {/* Privacy Notice Pill / Badge */}
      <div className="pt-2 border-t border-slate-200/60 dark:border-slate-800/60">
        <div className="p-3 rounded-xl bg-sky-50/70 dark:bg-sky-950/40 border border-sky-200/50 dark:border-sky-800/50 flex items-start gap-2.5">
          <Sparkles className="w-4 h-4 text-sky-600 dark:text-sky-400 shrink-0 mt-0.5" aria-hidden="true" />
          <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
            <strong className="text-slate-800 dark:text-slate-100 font-semibold">{t('brandSubtext')}:</strong>{' '}
            {t('clientSideNotice')}
          </p>
        </div>
      </div>
    </aside>
  );
}
