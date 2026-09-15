import React, { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

const FAQ_ITEMS: FaqItem[] = [
  {
    id: 'faq-free',
    question: 'Are the tools on AHADEX TOOLS free to use?',
    answer:
      'Yes. The tools provided on AHADEX TOOLS are completely free for both personal and professional use, with no required paywalls or hidden trial periods.',
  },
  {
    id: 'faq-account',
    question: 'Do I need an account or software installation?',
    answer:
      'No account registration or desktop software installation is required. All utilities operate directly inside standard modern web browsers on mobile, tablet, and desktop devices.',
  },
  {
    id: 'faq-processing',
    question: 'Where is my data processed?',
    answer:
      'Our primary utilities are architected for client-side processing, meaning the calculations and transformations run directly inside your browser session. If any future utility requires remote processing, that distinction will be clearly communicated on the tool workspace.',
  },
  {
    id: 'faq-limits',
    question: 'What are the file size limits?',
    answer:
      'To prevent browser memory crashes and ensure smooth processing on lower-powered devices, individual file limits typically range between 30MB and 50MB. Specific limits are noted on each tool page.',
  },
  {
    id: 'faq-coming-soon',
    question: 'What does the "Coming Soon" label mean?',
    answer:
      'Tools marked "Coming Soon" are actively in development according to our release schedule. Their interfaces and capabilities will become fully interactive once their processing engines pass quality and security testing.',
  },
];

export interface FaqSectionProps {
  className?: string;
}

/**
 * FAQ section for homepage.
 * Features realistic, transparent Q&As with accessible disclosure interactions.
 */
export default function FaqSection({ className = '' }: FaqSectionProps) {
  const [openIds, setOpenIds] = useState<Set<string>>(new Set(['faq-free']));

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
          <span>Frequently Asked Questions</span>
        </div>
        <h2
          id="faq-section-heading"
          className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-3"
        >
          Common Questions
        </h2>
        <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
          Clear answers about how AHADEX TOOLS operates, data processing, and platform usage.
        </p>
      </div>

      <div className="max-w-3xl mx-auto flex flex-col gap-3">
        {FAQ_ITEMS.map((item) => {
          const isOpen = openIds.has(item.id);
          return (
            <div
              key={item.id}
              className="rounded-2xl glass-panel border border-slate-200/80 dark:border-slate-800/80 bg-white/70 dark:bg-slate-900/60 overflow-hidden transition-colors"
            >
              <button
                type="button"
                id={`faq-btn-${item.id}`}
                aria-expanded={isOpen}
                aria-controls={`faq-ans-${item.id}`}
                onClick={() => toggleItem(item.id)}
                className="w-full flex items-center justify-between gap-4 p-4 sm:p-5 text-left font-bold text-sm sm:text-base text-slate-900 dark:text-white hover:text-sky-600 dark:hover:text-sky-400 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500"
              >
                <span>{item.question}</span>
                <ChevronDown
                  className={`w-4 h-4 shrink-0 text-slate-400 transition-transform duration-200 ${
                    isOpen ? 'rotate-180 text-sky-600 dark:text-sky-400' : ''
                  }`}
                  aria-hidden="true"
                />
              </button>

              {isOpen && (
                <div
                  id={`faq-ans-${item.id}`}
                  role="region"
                  aria-labelledby={`faq-btn-${item.id}`}
                  className="px-4 sm:px-5 pb-5 pt-1 text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed border-t border-slate-100 dark:border-slate-800/80"
                >
                  <p>{item.answer}</p>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
