import React from 'react';
import { Link } from 'react-router-dom';
import { Shield, Eye, Lock, FileCheck, ArrowRight } from 'lucide-react';
import { useLanguage } from '@/src/hooks';

export interface TrustSectionProps {
  className?: string;
}

/**
 * Trust & Privacy section.
 * Written with strictly factual, transparent, non-exaggerated claims.
 * Directs users to legal and contact information.
 */
export default function TrustSection({ className = '' }: TrustSectionProps) {
  const { t } = useLanguage();

  return (
    <section
      aria-labelledby="trust-section-heading"
      className={`w-full rounded-3xl glass-panel-elevated border border-slate-200/90 dark:border-slate-800/90 bg-white/80 dark:bg-slate-900/80 p-6 sm:p-10 lg:p-12 ${className}`}
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
        {/* Left Column: Mission statement */}
        <div className="lg:col-span-6 flex flex-col">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-sky-600 dark:text-sky-400 mb-3">
            <Shield className="w-4 h-4" aria-hidden="true" />
            <span>{t('trustBadge')}</span>
          </div>

          <h2
            id="trust-section-heading"
            className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-snug mb-4"
          >
            {t('trustTitle')}
          </h2>

          <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-6">
            {t('trustDesc')}
          </p>

          <div className="flex flex-wrap items-center gap-3 text-xs font-semibold">
            <Link
              to="/privacy"
              className="inline-flex items-center gap-1 text-sky-600 dark:text-sky-400 hover:underline"
            >
              <span>{t('privacyPolicy')}</span>
              <ArrowRight className="w-3 h-3" />
            </Link>
            <span className="text-slate-300 dark:text-slate-700">&bull;</span>
            <Link
              to="/terms"
              className="inline-flex items-center gap-1 text-sky-600 dark:text-sky-400 hover:underline"
            >
              <span>{t('termsOfService')}</span>
              <ArrowRight className="w-3 h-3" />
            </Link>
            <span className="text-slate-300 dark:text-slate-700">&bull;</span>
            <Link
              to="/disclaimer"
              className="inline-flex items-center gap-1 text-sky-600 dark:text-sky-400 hover:underline"
            >
              <span>{t('disclaimer')}</span>
              <ArrowRight className="w-3 h-3" />
            </Link>
            <span className="text-slate-300 dark:text-slate-700">&bull;</span>
            <Link
              to="/contact"
              className="inline-flex items-center gap-1 text-sky-600 dark:text-sky-400 hover:underline"
            >
              <span>{t('contactUs')}</span>
              <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
        </div>

        {/* Right Column: Key Commitments */}
        <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="p-4 rounded-xl bg-slate-50/80 dark:bg-slate-800/50 border border-slate-200/60 dark:border-slate-800/60">
            <div className="w-8 h-8 rounded-lg bg-sky-500/10 text-sky-600 dark:text-sky-400 flex items-center justify-center mb-2.5">
              <Lock className="w-4 h-4" />
            </div>
            <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-1">
              {t('trustP2Title')}
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              {t('trustP2Desc')}
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-50/80 dark:bg-slate-800/50 border border-slate-200/60 dark:border-slate-800/60">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mb-2.5">
              <Eye className="w-4 h-4" />
            </div>
            <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-1">
              {t('trustP3Title')}
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              {t('trustP3Desc')}
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-50/80 dark:bg-slate-800/50 border border-slate-200/60 dark:border-slate-800/60">
            <div className="w-8 h-8 rounded-lg bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center mb-2.5">
              <FileCheck className="w-4 h-4" />
            </div>
            <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-1">
              {t('trustP1Title')}
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              {t('trustP1Desc')}
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-50/80 dark:bg-slate-800/50 border border-slate-200/60 dark:border-slate-800/60">
            <div className="w-8 h-8 rounded-lg bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 flex items-center justify-center mb-2.5">
              <Shield className="w-4 h-4" />
            </div>
            <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-1">
              {t('trustP4Title')}
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              {t('trustP4Desc')}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
