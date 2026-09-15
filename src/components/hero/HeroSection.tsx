import React from 'react';
import { Link } from 'react-router-dom';
import ToolSearch from '../tools/ToolSearch';
import HeroVisual from './HeroVisual';
import { Sparkles, Shield, Zap, ArrowDown } from 'lucide-react';
import { useLanguage } from '@/src/hooks';

export interface HeroSectionProps {
  className?: string;
}

/**
 * Homepage Hero Section.
 * Features platform value proposition, global tool search, and lightweight visual composition.
 * Strictly adheres to truthful, non-exaggerated communication.
 */
export default function HeroSection({ className = '' }: HeroSectionProps) {
  const { t } = useLanguage();

  return (
    <section
      aria-labelledby="hero-title"
      className={`relative pt-6 pb-12 sm:pt-10 sm:pb-16 lg:pt-14 lg:pb-20 overflow-hidden ${className}`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Left Column: Heading, Value Proposition & Search */}
          <div className="lg:col-span-7 flex flex-col items-start text-left">
            {/* Platform Tag */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold bg-sky-500/10 text-sky-700 dark:text-sky-300 border border-sky-500/20 mb-5">
              <Sparkles className="w-3.5 h-3.5 text-sky-600 dark:text-sky-400" aria-hidden="true" />
              <span>{t('heroBadge')}</span>
            </div>

            {/* Main Single H1 */}
            <h1
              id="hero-title"
              className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-[1.15] mb-4"
            >
              AHADEX TOOLS
              <span className="block text-xl sm:text-2xl lg:text-3xl font-bold text-slate-600 dark:text-slate-300 mt-1 font-normal">
                {t('heroTitle2')}
              </span>
            </h1>

            {/* Value description */}
            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 max-w-xl leading-relaxed mb-8">
              {t('heroDescription')}
            </p>

            {/* Central Tool Discovery Search */}
            <div className="w-full max-w-xl mb-4">
              <ToolSearch placeholder={t('searchPlaceholder')} />
            </div>

            {/* Quick action chips */}
            <div className="flex items-center gap-2 flex-wrap text-xs text-slate-500 dark:text-slate-400 mt-1">
              <span className="font-semibold text-slate-700 dark:text-slate-300">{t('quickAccess')}</span>
              <Link
                to="/tools/jpg-to-pdf"
                className="px-2.5 py-1 rounded-lg bg-white/70 dark:bg-slate-800/70 hover:bg-sky-500/10 hover:text-sky-600 dark:hover:text-sky-400 border border-slate-200/80 dark:border-slate-700/80 transition-colors"
              >
                {t('tool_jpgToPdf_name')}
              </Link>
              <Link
                to="/tools/image-compressor"
                className="px-2.5 py-1 rounded-lg bg-white/70 dark:bg-slate-800/70 hover:bg-sky-500/10 hover:text-sky-600 dark:hover:text-sky-400 border border-slate-200/80 dark:border-slate-700/80 transition-colors"
              >
                {t('tool_imageCompressor_name')}
              </Link>
              <Link
                to="/tools/qr-code-generator"
                className="px-2.5 py-1 rounded-lg bg-white/70 dark:bg-slate-800/70 hover:bg-sky-500/10 hover:text-sky-600 dark:hover:text-sky-400 border border-slate-200/80 dark:border-slate-700/80 transition-colors"
              >
                {t('tool_qrGenerator_name')}
              </Link>
            </div>

            {/* Trust feature points */}
            <div className="grid grid-cols-2 sm:grid-cols-2 gap-4 mt-8 pt-6 border-t border-slate-200/60 dark:border-slate-800/60 w-full max-w-xl">
              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-lg bg-sky-500/10 text-sky-600 dark:text-sky-400 flex items-center justify-center shrink-0">
                  <Zap className="w-4 h-4" />
                </div>
                <span className="text-xs font-medium text-slate-600 dark:text-slate-400">
                  {t('trustP2Title')}
                </span>
              </div>
              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
                  <Shield className="w-4 h-4" />
                </div>
                <span className="text-xs font-medium text-slate-600 dark:text-slate-400">
                  {t('trustP3Title')}
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: Hero Decorative Visual */}
          <div className="lg:col-span-5 hidden sm:flex items-center justify-center">
            <HeroVisual />
          </div>
        </div>
      </div>
    </section>
  );
}
