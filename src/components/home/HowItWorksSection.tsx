import React from 'react';
import { Search, UploadCloud, Sliders, Download, HelpCircle } from 'lucide-react';
import { useLanguage } from '@/src/hooks';

export interface HowItWorksSectionProps {
  className?: string;
}

/**
 * How AHADEX TOOLS Works section.
 * Explains general platform interaction flow honestly without overgeneralizing.
 */
export default function HowItWorksSection({ className = '' }: HowItWorksSectionProps) {
  const { t } = useLanguage();

  const steps = [
    {
      number: '01',
      title: t('step1Title'),
      description: t('step1Desc'),
      icon: Search,
    },
    {
      number: '02',
      title: t('step2Title'),
      description: t('step2Desc'),
      icon: UploadCloud,
    },
    {
      number: '03',
      title: t('step3Title'),
      description: t('step3Desc'),
      icon: Sliders,
    },
    {
      number: '04',
      title: t('step4Title'),
      description: t('step4Desc'),
      icon: Download,
    },
  ];

  return (
    <section aria-labelledby="how-it-works-heading" className={`w-full ${className}`}>
      <div className="text-center max-w-2xl mx-auto mb-10">
        <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-sky-600 dark:text-sky-400 mb-2">
          <HelpCircle className="w-3.5 h-3.5" aria-hidden="true" />
          <span>{t('simpleWorkflow')}</span>
        </div>
        <h2 id="how-it-works-heading" className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-3">
          {t('howItWorksTitle')}
        </h2>
        <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
          {t('howItWorksDesc')}
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {steps.map((step) => {
          const Icon = step.icon;
          return (
            <div
              key={step.number}
              className="relative flex flex-col p-6 rounded-2xl glass-panel border border-slate-200/80 dark:border-slate-800/80 bg-white/70 dark:bg-slate-900/60"
            >
              {/* Step counter badge */}
              <div className="flex items-center justify-between mb-4">
                <div className="w-10 h-10 rounded-xl bg-sky-500/10 text-sky-600 dark:text-sky-400 flex items-center justify-center">
                  <Icon className="w-5 h-5" aria-hidden="true" />
                </div>
                <span className="text-xs font-mono font-bold text-slate-400 dark:text-slate-500">
                  {step.number}
                </span>
              </div>

              <h3 className="text-base font-bold text-slate-900 dark:text-white mb-2">
                {step.title}
              </h3>

              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                {step.description}
              </p>
            </div>
          );
        })}
      </div>

      <p className="text-center text-xs text-slate-400 dark:text-slate-500 mt-6">
        {t('workflowNote')}
      </p>
    </section>
  );
}
