import React from 'react';
import { Link } from 'react-router-dom';
import { Search, Menu, Layers, Sun, Moon, Globe, Compass } from 'lucide-react';
import { ToolSearch } from '@/src/components/tools';
import { useTheme, useLanguage } from '@/src/hooks';
import type { SupportedLanguage } from '@/src/types/common';

export interface HeaderProps {
  onOpenMobileMenu: () => void;
  isMobileMenuOpen?: boolean;
}

/**
 * Global Header Component for AHADEX TOOLS.
 * Sticky, responsive, liquid-glass backdrop with brand mark, search trigger,
 * quick theme toggle, language switcher, and navigation drawer triggers.
 */
export default function Header({ onOpenMobileMenu, isMobileMenuOpen = false }: HeaderProps) {
  const { theme, resolvedTheme, setTheme } = useTheme();
  const { language, setLanguage, t } = useLanguage();

  const handleToggleTheme = () => {
    if (resolvedTheme === 'dark') {
      setTheme('light');
    } else {
      setTheme('dark');
    }
  };

  const nextLangMap: Record<SupportedLanguage, SupportedLanguage> = {
    en: 'bn',
    bn: 'ar',
    ar: 'en',
  };

  const langBadgeText: Record<SupportedLanguage, string> = {
    en: 'EN',
    bn: 'বাং',
    ar: 'ع',
  };

  return (
    <header
      id="ahadex-global-header"
      className="sticky top-0 z-40 w-full glass-panel-elevated rounded-none border-t-0 border-x-0 border-b border-slate-200/80 dark:border-slate-800/80 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md"
    >
      <div className="layout-container h-16 flex items-center justify-between gap-3">
        {/* Left: Brand Identity */}
        <div className="flex items-center gap-3">
          <Link
            to="/"
            className="flex items-center gap-2.5 group focus-visible:rounded-lg"
            aria-label="AHADEX TOOLS Home"
          >
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-sky-600 to-indigo-500 flex items-center justify-center text-white shadow-sm shadow-sky-500/20 group-hover:scale-105 transition-transform">
              <Layers className="w-5 h-5" aria-hidden="true" />
            </div>
            <div className="flex flex-col">
              <span className="text-base sm:text-lg font-bold tracking-tight text-slate-900 dark:text-white leading-none">
                AHADEX<span className="text-sky-600 dark:text-sky-400 font-extrabold ml-1">TOOLS</span>
              </span>
              <span className="text-[10px] uppercase font-semibold tracking-wider text-slate-500 dark:text-slate-400 leading-tight">
                {t('brandTagline')}
              </span>
            </div>
          </Link>
        </div>

        {/* Center: Global Search Trigger Foundation */}
        <div className="flex-1 max-w-md mx-auto hidden md:block">
          <ToolSearch isCompact={true} placeholder={t('searchPlaceholder')} />
        </div>

        {/* Right: Quick Controls (Theme, Language, Menu) */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          {/* Quick Header Language Switcher */}
          <div className="flex items-center bg-slate-100/90 dark:bg-slate-800/90 rounded-lg p-0.5 border border-slate-200 dark:border-slate-700/60">
            <button
              type="button"
              onClick={() => setLanguage('en')}
              className={`px-2 py-1 text-xs font-semibold rounded-md transition-colors ${
                language === 'en'
                  ? 'bg-white dark:bg-slate-900 text-sky-600 dark:text-sky-400 shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
              }`}
              aria-label="Switch language to English"
            >
              EN
            </button>
            <button
              type="button"
              onClick={() => setLanguage('bn')}
              className={`px-2 py-1 text-xs font-semibold rounded-md transition-colors ${
                language === 'bn'
                  ? 'bg-white dark:bg-slate-900 text-sky-600 dark:text-sky-400 shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
              }`}
              aria-label="Switch language to Bengali (বাংলা)"
            >
              বাংলা
            </button>
            <button
              type="button"
              onClick={() => setLanguage('ar')}
              className={`px-2 py-1 text-xs font-semibold rounded-md transition-colors ${
                language === 'ar'
                  ? 'bg-white dark:bg-slate-900 text-sky-600 dark:text-sky-400 shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
              }`}
              aria-label="Switch language to Arabic (العربية)"
            >
              عربي
            </button>
          </div>

          {/* Quick Theme Toggle (1-click Sun/Moon) */}
          <button
            type="button"
            onClick={handleToggleTheme}
            aria-label={`Switch to ${resolvedTheme === 'dark' ? 'light' : 'dark'} mode`}
            title={`Current: ${resolvedTheme} mode (click to toggle)`}
            className="p-2 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200/60 dark:border-slate-700/60 transition-colors"
          >
            {resolvedTheme === 'dark' ? (
              <Sun className="w-4.5 h-4.5 text-amber-400" aria-hidden="true" />
            ) : (
              <Moon className="w-4.5 h-4.5 text-slate-700" aria-hidden="true" />
            )}
          </button>

          {/* Mobile Search Button trigger */}
          <button
            type="button"
            className="md:hidden p-2 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            onClick={onOpenMobileMenu}
            aria-label="Open search and navigation"
          >
            <Search className="w-5 h-5" aria-hidden="true" />
          </button>

          {/* Mobile Menu Trigger Button */}
          <button
            type="button"
            id="ahadex-mobile-menu-trigger"
            onClick={onOpenMobileMenu}
            aria-label={isMobileMenuOpen ? 'Close navigation' : 'Open navigation'}
            aria-expanded={isMobileMenuOpen}
            aria-controls="ahadex-mobile-drawer"
            className="lg:hidden p-2 rounded-lg text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <Menu className="w-5 h-5" aria-hidden="true" />
          </button>
        </div>
      </div>
    </header>
  );
}
