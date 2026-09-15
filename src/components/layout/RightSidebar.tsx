import React from 'react';
import { NavLink } from 'react-router-dom';
import { useTheme, useLanguage } from '@/src/hooks';
import type { ThemeMode, SupportedLanguage } from '@/src/types/common';
import { Sun, Moon, Laptop, Globe, Shield, HelpCircle, ExternalLink } from 'lucide-react';
import { COMPANY_NAV_ITEMS, LEGAL_NAV_ITEMS, ACCESSIBILITY_NAV_ITEMS } from '@/src/data/navigation';

export interface RightSidebarProps {
  className?: string;
  onItemClick?: () => void;
}

/**
 * Reusable Right Utility Sidebar.
 * Houses platform settings (Theme, Language) and institutional documentation anchors.
 */
export default function RightSidebar({ className = '', onItemClick }: RightSidebarProps) {
  const { theme, setTheme } = useTheme();
  const { language, setLanguage, supportedLanguages } = useLanguage();

  const themeOptions: { mode: ThemeMode; label: string; icon: React.ReactNode }[] = [
    { mode: 'light', label: 'Light', icon: <Sun className="w-3.5 h-3.5" /> },
    { mode: 'dark', label: 'Dark', icon: <Moon className="w-3.5 h-3.5" /> },
    { mode: 'system', label: 'Auto', icon: <Laptop className="w-3.5 h-3.5" /> },
  ];

  return (
    <aside
      id="ahadex-right-sidebar"
      aria-label="Platform Utilities & Settings"
      className={`w-64 shrink-0 flex flex-col gap-5 p-4 glass-panel border border-slate-200/80 dark:border-slate-800/80 bg-white/60 dark:bg-slate-900/60 backdrop-blur-md rounded-2xl ${className}`}
    >
      {/* Theme Preference */}
      <section aria-labelledby="theme-heading" className="flex flex-col gap-2">
        <h2 id="theme-heading" className="text-[11px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 px-1">
          Interface Appearance
        </h2>
        <div className="grid grid-cols-3 gap-1 p-1 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700/60" role="radiogroup" aria-label="Theme selector">
          {themeOptions.map((opt) => {
            const isSelected = theme === opt.mode;
            return (
              <button
                key={opt.mode}
                type="button"
                role="radio"
                aria-checked={isSelected}
                onClick={() => setTheme(opt.mode)}
                className={`flex items-center justify-center gap-1.5 py-1.5 px-2 rounded-lg text-xs font-medium transition-all ${
                  isSelected
                    ? 'bg-white dark:bg-slate-900 text-sky-600 dark:text-sky-400 shadow-sm font-semibold'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
                }`}
              >
                {opt.icon}
                <span>{opt.label}</span>
              </button>
            );
          })}
        </div>
      </section>

      {/* Language Preference */}
      <section aria-labelledby="language-heading" className="flex flex-col gap-2">
        <div className="flex items-center justify-between px-1">
          <h2 id="language-heading" className="text-[11px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
            Language
          </h2>
          <Globe className="w-3.5 h-3.5 text-slate-400" aria-hidden="true" />
        </div>
        <div className="flex flex-col gap-1">
          {supportedLanguages.map((lang) => {
            const isSelected = language === lang.code;
            return (
              <button
                key={lang.code}
                type="button"
                onClick={() => setLanguage(lang.code as SupportedLanguage)}
                className={`flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium transition-all ${
                  isSelected
                    ? 'bg-sky-500/10 text-sky-600 dark:text-sky-400 border border-sky-500/20 font-semibold'
                    : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100/60 dark:hover:bg-slate-800/60 hover:text-slate-900 dark:hover:text-slate-200'
                }`}
              >
                <span>{lang.name}</span>
                <span className="text-[10px] text-slate-400 dark:text-slate-500">{lang.nativeName}</span>
              </button>
            );
          })}
        </div>
      </section>

      {/* Quick Institutional Anchors */}
      <section aria-labelledby="institutional-heading" className="flex flex-col gap-2 pt-2 border-t border-slate-200/60 dark:border-slate-800/60">
        <h2 id="institutional-heading" className="text-[11px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 px-1">
          Platform Info
        </h2>
        <nav aria-label="Platform information links" className="flex flex-col gap-1">
          {[...COMPANY_NAV_ITEMS, ...LEGAL_NAV_ITEMS, ...ACCESSIBILITY_NAV_ITEMS].map((item) => (
            <NavLink
              key={item.href}
              to={item.href}
              onClick={onItemClick}
              className={({ isActive }) =>
                `text-xs py-1.5 px-2 rounded-md transition-colors ${
                  isActive
                    ? 'text-sky-600 dark:text-sky-400 font-medium bg-sky-50 dark:bg-sky-950/40'
                    : 'text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200'
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
      </section>
    </aside>
  );
}
