import React from 'react';
import { HelpCircle, ChevronDown } from 'lucide-react';
import type { ToolFAQItem } from '@/src/types/workspace';

export interface ToolFAQProps {
  toolName?: string;
  faqs?: ToolFAQItem[];
  className?: string;
  id?: string;
}

const DEFAULT_TOOL_FAQS: ToolFAQItem[] = [
  {
    question: 'Are my files uploaded to any external server?',
    answer:
      'No. AHADEX TOOLS processes all data directly inside your browser using client-side Web APIs and WebAssembly. Your files never leave your device, ensuring complete confidentiality.',
  },
  {
    question: 'What is the maximum allowed file size?',
    answer:
      'File size caps depend on the specific tool and your browser’s available memory, typically up to 50 MB per file to maintain smooth and fast local performance without crashing your browser tab.',
  },
  {
    question: 'Can I use this tool offline or on mobile?',
    answer:
      'Yes. Once the web application is loaded in your browser, the processing engines run entirely on your local machine without needing an active internet connection for the conversion step.',
  },
  {
    question: 'Is there any cost, subscription, or watermark added?',
    answer:
      'No. All core utilities on AHADEX TOOLS are completely free to use without mandatory sign-ups, subscriptions, or intrusive watermarks on your generated outputs.',
  },
];

/**
 * Accessible FAQ section for AHADEX TOOLS.
 * Uses semantic details/summary disclosures for keyboard navigation and screen readers.
 */
export default function ToolFAQ({
  toolName = 'this tool',
  faqs = DEFAULT_TOOL_FAQS,
  className = '',
  id = 'tool-faq-section',
}: ToolFAQProps) {
  const activeFaqs = faqs && faqs.length > 0 ? faqs : DEFAULT_TOOL_FAQS;

  return (
    <section
      id={id}
      aria-labelledby="tool-faq-heading"
      className={`w-full flex flex-col space-y-6 ${className}`}
    >
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 rounded-xl bg-sky-500/10 border border-sky-500/20 text-sky-600 dark:text-sky-400 flex items-center justify-center">
          <HelpCircle className="w-4 h-4" aria-hidden="true" />
        </div>
        <div>
          <h2
            id="tool-faq-heading"
            className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white tracking-tight"
          >
            Frequently Asked Questions
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Answers to common questions regarding {toolName}.
          </p>
        </div>
      </div>

      <div className="space-y-3">
        {activeFaqs.map((faq, index) => (
          <details
            key={index}
            className="group rounded-2xl glass-panel bg-white/70 dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800/80 p-4 transition-all open:shadow-sm"
          >
            <summary className="flex items-center justify-between gap-3 cursor-pointer list-none text-left font-semibold text-xs sm:text-sm text-slate-900 dark:text-white select-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 rounded-lg p-1">
              <span>{faq.question}</span>
              <ChevronDown className="w-4 h-4 text-slate-400 dark:text-slate-500 group-open:rotate-180 transition-transform duration-200 shrink-0" />
            </summary>
            <p className="mt-3 text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed pl-1 pr-4">
              {faq.answer}
            </p>
          </details>
        ))}
      </div>
    </section>
  );
}
