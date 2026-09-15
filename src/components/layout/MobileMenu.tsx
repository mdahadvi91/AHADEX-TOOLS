import React, { useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { X, Layers, Sun, Moon, Laptop, Globe } from 'lucide-react';
import CategoryNavigation from './CategoryNavigation';
import { ToolSearch } from '@/src/components/tools';
import { useTheme, useLanguage } from '@/src/hooks';
import type { ThemeMode, SupportedLanguage } from '@/src/types/common';
import { COMPANY_NAV_ITEMS, LEGAL_NAV_ITEMS, ACCESSIBILITY_NAV_ITEMS } from '@/src/data/navigation';

export interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

/**
 * Accessible Mobile Navigation Drawer.
 * Supports touch gestures, keyboard Escape dismiss, focus containment, and safe scroll locking.
 */
export default function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  const navigate = useNavigate();
  const { theme, setTheme } = useTheme();
  const { language, setLanguage, supportedLanguages, t } = useLanguage();
  const closeButtonRef = useRef<HTMLButtonElement | null>(null);

  // Keyboard accessibility: Escape to dismiss
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
      // Auto focus close button for accessibility
      setTimeout(() => closeButtonRef.current?.focus(), 50);
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      id="ahadex-mobile-drawer"
      role="dialog"
      aria-modal="true"
      aria-label="Navigation Menu"
      className="fixed inset-0 z-50 flex flex-col justify-end sm:justify-start"
    >
      {/* Dimmed Backdrop */}
      <div
        className="fixed inset-0 glass-backdrop bg-slate-950/60 transition-opacity animate-fade-in"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Slide-out Sheet */}
      <div className="relative z-10 w-full sm:max-w-md ml-auto h-full max-h-screen flex flex-col bg-white dark:bg-slate-900 border-l border-slate-200 dark:border-slate-800 shadow-2xl overflow-y-auto animate-slide-up">
        {/* Header with Brand & Close Button */}
        <div className="p-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between sticky top-0 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md z-20">
          <Link
            to="/"
            onClick={onClose}
            className="flex items-center gap-2.5"
            aria-label="AHADEX TOOLS Home"
          >
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-sky-600 to-indigo-500 flex items-center justify-center text-white shadow-sm">
              <Layers className="w-4 h-4" aria-hidden="true" />
            </div>
            <span className="text-base font-bold text-slate-900 dark:text-white">
              AHADEX<span className="text-sky-600 dark:text-sky-400 ml-1">TOOLS</span>
            </span>
          </Link>

          <button
            ref={closeButtonRef}
            type="button"
            onClick={onClose}
            aria-label="Close navigation menu"
            className="w-11 h-11 flex items-center justify-center rounded-xl text-slate-500 hover:text-slate-900 dark:hover:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" aria-hidden="true" />
          </button>
        </div>

        {/* Scrollable Navigation Body */}
        <div className="p-4 flex flex-col gap-6 flex-1">
          {/* Mobile Search Foundation */}
          <div>
            <ToolSearch
              isCompact={true}
              placeholder={t('searchPlaceholder')}
              onSelectTool={(tool) => {
                onClose();
                navigate(tool.route);
              }}
            />
          </div>

          {/* Tool Categories Navigation */}
          <div className="flex flex-col gap-2">
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
              {t('toolCategories')}
            </h2>
            <CategoryNavigation onItemClick={onClose} />
          </div>

          {/* Appearance Preference */}
          <div className="flex flex-col gap-2 pt-4 border-t border-slate-200 dark:border-slate-800">
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
              {t('interfaceAppearance')}
            </h2>
            <div className="grid grid-cols-3 gap-2">
              {[
                { mode: 'light', label: t('light'), icon: <Sun className="w-4 h-4" /> },
                { mode: 'dark', label: t('dark'), icon: <Moon className="w-4 h-4" /> },
                { mode: 'system', label: t('auto'), icon: <Laptop className="w-4 h-4" /> },
              ].map((opt) => (
                <button
                  key={opt.mode}
                  type="button"
                  onClick={() => setTheme(opt.mode as ThemeMode)}
                  className={`min-h-[44px] flex items-center justify-center gap-1.5 rounded-xl text-xs font-medium border transition-colors ${
                    theme === opt.mode
                      ? 'bg-sky-500/10 border-sky-500/30 text-sky-600 dark:text-sky-400 font-semibold'
                      : 'border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400'
                  }`}
                >
                  {opt.icon}
                  <span>{opt.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Language Selection */}
          <div className="flex flex-col gap-2">
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 flex items-center gap-1.5">
              <Globe className="w-3.5 h-3.5" aria-hidden="true" />
              <span>{t('language')}</span>
            </h2>
            <div className="grid grid-cols-3 gap-2">
              {supportedLanguages.map((lang) => (
                <button
                  key={lang.code}
                  type="button"
                  onClick={() => setLanguage(lang.code as SupportedLanguage)}
                  className={`min-h-[44px] flex flex-col items-center justify-center rounded-xl text-xs font-medium border transition-colors ${
                    language === lang.code
                      ? 'bg-sky-500/10 border-sky-500/30 text-sky-600 dark:text-sky-400 font-semibold'
                      : 'border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400'
                  }`}
                >
                  <span>{lang.name}</span>
                  <span className="text-[10px] text-slate-400">{lang.nativeName}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Platform Links */}
          <div className="pt-4 border-t border-slate-200 dark:border-slate-800 flex flex-wrap gap-x-4 gap-y-2 text-xs text-slate-500 dark:text-slate-400">
            {[...COMPANY_NAV_ITEMS, ...LEGAL_NAV_ITEMS, ...ACCESSIBILITY_NAV_ITEMS].map((item) => (
              <Link
                key={item.href}
                to={item.href}
                onClick={onClose}
                className="hover:text-slate-900 dark:hover:text-slate-100"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
