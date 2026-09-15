import React from 'react';
import { Link } from 'react-router-dom';
import { Search, Menu, Layers } from 'lucide-react';
import { ToolSearch } from '@/src/components/tools';

export interface HeaderProps {
  onOpenMobileMenu: () => void;
  isMobileMenuOpen?: boolean;
}

/**
 * Global Header Component for AHADEX TOOLS.
 * Sticky, responsive, liquid-glass backdrop with brand mark, search trigger, and mobile navigation toggle.
 */
export default function Header({ onOpenMobileMenu, isMobileMenuOpen = false }: HeaderProps) {
  return (
    <header
      id="ahadex-global-header"
      className="sticky top-0 z-40 w-full glass-panel-elevated rounded-none border-t-0 border-x-0 border-b border-slate-200/80 dark:border-slate-800/80 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md"
    >
      <div className="layout-container h-16 flex items-center justify-between gap-4">
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
                Privacy-First Utilities
              </span>
            </div>
          </Link>
        </div>

        {/* Center: Global Search Trigger Foundation */}
        <div className="flex-1 max-w-md mx-auto hidden sm:block">
          <ToolSearch isCompact={true} placeholder="Search tools (e.g. compress, pdf, qr)..." />
        </div>

        {/* Right: Mobile Menu & Actions */}
        <div className="flex items-center gap-2">
          {/* Mobile Search Button trigger (small screens) */}
          <button
            type="button"
            className="sm:hidden p-2.5 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
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
            aria-label={isMobileMenuOpen ? 'Close main navigation' : 'Open main navigation'}
            aria-expanded={isMobileMenuOpen}
            aria-controls="ahadex-mobile-drawer"
            className="lg:hidden p-2.5 rounded-lg text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <Menu className="w-5 h-5" aria-hidden="true" />
          </button>
        </div>
      </div>
    </header>
  );
}
