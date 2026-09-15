import React, { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';
import { useLanguage } from '@/src/hooks';

export interface FaqSectionProps {
  className?: string;
}

/**
 * FAQ section for homepage.
 * Features realistic, transparent Q&As with accessible disclosure interactions.
 */
export default function FaqSection({ className = '' }: FaqSectionProps) {
  const { t } = useLanguage();
  const [openIds, setOpenIds] = useState<Set<string>>(new Set(['faq-free']));

  const faqItems = [
    {
      id: 'faq-free',
      question: t('faq1Q'),
      answer: t('faq1A'),
    },
    {
      id: 'faq-account',
      question: t('faq2Q'),
      answer: t('faq2A'),
    },
    {
      id: 'faq-processing',
      question: t('faq3Q'),
      answer: t('faq3A'),
    },
    {
      id: 'faq-limits',
      question: t('faq4Q'),
      answer: t('faq4A'),
    },
    {
      id: 'faq-coming-soon',
      question: t('faq5Q'),
      answer: t('faq5A'),
    },
  ];

  const toggleItem = (id: string) => {
    setOpenIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  return (
    <section aria-labelledby="faq-section-heading" className={`w-full ${className}`}>
      <div className="text-center max-w-2xl mx-auto mb-10">
        <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-sky-600 dark:text-sky-400 mb-2">
          <HelpCircle className="w-3.5 h-3.5" aria-hidden="true" />
          <span>{t('faqBadge')}</span>
        </div>
        <h2
          id="faq-section-heading"
          className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-3"
        >
          {t('faqTitle')}
        </h2>
        <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
          {t('faqDesc')}
        </p>
      </div>

      <div className="max-w-3xl mx-auto flex flex-col gap-3">
        {faqItems.map((item) => {
          const isOpen = openIds.has(item.id);
          return (
            <div
              key={item.id}
              className="rounded-2xl glass-panel border border-slate-200/80 dark:border-slate-800/80 bg-white/70 dark:bg-slate-900/60 overflow-hidden transition-colors"
            >
              <button
                type="button"
                onClick={() => toggleItem(item.id)}
                aria-expanded={isOpen}
                className="w-full p-5 text-left flex items-center justify-between gap-4 font-bold text-slate-900 dark:text-white hover:text-sky-600 dark:hover:text-sky-400 transition-colors"
              >
                <span className="text-sm sm:text-base">{item.question}</span>
                <ChevronDown
                  className={`w-4 h-4 text-slate-400 shrink-0 transition-transform duration-200 ${
                    isOpen ? 'rotate-180 text-sky-500' : ''
                  }`}
                  aria-hidden="true"
                />
              </button>
              {isOpen && (
                <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed border-t border-slate-100 dark:border-slate-800/80">
                  {item.answer}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
