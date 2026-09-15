import React from 'react';
import { Link } from 'react-router-dom';
import { AlertTriangle, CheckCircle, ShieldAlert, FileCheck, HelpCircle } from 'lucide-react';
import { AnimatedBackButton } from '@/src/components/common';
import { useSEO } from '@/src/lib/seo';
import { SITE_CONFIG } from '@/src/data/site';

/**
 * Production Disclaimer Page for AHADEX TOOLS.
 * Clarifies limits of automated software outputs, emphasizes user verification responsibility,
 * and explicitly disclaims professional, financial, and legal advice.
 */
export default function DisclaimerPage() {
  useSEO({
    title: 'Disclaimer',
    description: 'Read the AHADEX TOOLS legal disclaimer regarding automated software output verification, fitness for purpose, and user responsibility.',
    path: '/disclaimer',
    breadcrumbs: [
      { name: 'Home', path: '/' },
      { name: 'Disclaimer', path: '/disclaimer' },
    ],
  });

  return (
    <article
      id="ahadex-disclaimer-page"
      className="w-full max-w-4xl mx-auto py-6 sm:py-10 px-4 sm:px-6 flex flex-col gap-10 animate-fade-in"
    >
      {/* Top Breadcrumb / Back Bar */}
      <div className="flex items-center justify-between gap-4">
        <AnimatedBackButton fallbackPath="/" label="Back to Tools" />
        <span className="text-xs font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500">
          Legal Disclaimer
        </span>
      </div>

      {/* Header */}
      <header className="flex flex-col gap-3 pb-6 border-b border-slate-200/80 dark:border-slate-800/80">
        <div className="inline-flex items-center gap-2 text-xs font-semibold text-amber-600 dark:text-amber-400 uppercase tracking-wider">
          <AlertTriangle className="w-4 h-4" aria-hidden="true" />
          <span>Notice & Limitations</span>
        </div>
        <h1
          id="disclaimer-title"
          className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white"
        >
          Platform <span className="text-amber-600 dark:text-amber-400">Disclaimer</span>
        </h1>
        <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed max-w-2xl">
          Information and software outputs provided by AHADEX TOOLS are intended strictly for general informational and utility purposes.
        </p>
      </header>

      {/* 1. General Utility Purposes */}
      <section aria-labelledby="general-utility-heading" className="flex flex-col gap-4">
        <h2
          id="general-utility-heading"
          className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white"
        >
          1. Automated Utility Purposes
        </h2>
        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
          The utilities available on AHADEX TOOLS (including file converters, image compressors, PDF assemblers, and QR generators) operate via automated algorithmic processing. While we engineer our tools to adhere rigorously to standard technical specifications, no automated software tool can guarantee 100% precision across every variation of corrupted, non-standard, or highly complex file formats.
        </p>
      </section>

      {/* 2. Output Verification Requirement */}
      <section aria-labelledby="verification-heading" className="flex flex-col gap-4">
        <h2
          id="verification-heading"
          className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2"
        >
          <FileCheck className="w-5 h-5 text-indigo-500" aria-hidden="true" />
          <span>2. User Obligation to Verify Critical Outputs</span>
        </h2>
        <div className="p-5 rounded-xl bg-amber-50 dark:bg-amber-950/20 border border-amber-200/80 dark:border-amber-800/40 text-xs sm:text-sm text-amber-900 dark:text-amber-200 flex flex-col gap-2.5 leading-relaxed">
          <strong className="font-semibold text-sm">Always Verify Before Crucial Usage:</strong>
          <p>
            Users are explicitly advised to review and verify all generated outputs, including converted images, merged PDF pages, compressed files, and rendered QR codes, prior to printing, sending to clients, submitting for legal filings, or committing to production environments.
          </p>
          <p>
            AHADEX TOOLS is not responsible for any typographical anomalies, compression artifacts, missing layers, formatting discrepancies, or barcode scan failures that may arise during browser-native conversion.
          </p>
        </div>
      </section>

      {/* 3. No Professional or Certified Advice */}
      <section aria-labelledby="no-advice-heading" className="flex flex-col gap-4">
        <h2
          id="no-advice-heading"
          className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2"
        >
          <ShieldAlert className="w-5 h-5 text-rose-500" aria-hidden="true" />
          <span>3. No Professional Advice</span>
        </h2>
        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
          Nothing contained on AHADEX TOOLS or generated through its tools constitutes legal, accounting, tax, financial, medical, engineering, or other professional advice. If you require expert advice on legal documentation or certified archiving standards, you should consult with a licensed professional in the appropriate jurisdiction.
        </p>
      </section>

      {/* 4. Fitness for a Particular Purpose */}
      <section aria-labelledby="fitness-heading" className="flex flex-col gap-3">
        <h2
          id="fitness-heading"
          className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white"
        >
          4. No Warranty of Fitness
        </h2>
        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
          All utilities are made available on an &quot;as is&quot; and &quot;as available&quot; basis without warranties of any kind. We make no guarantees that our tools will fulfill your specific operational requirements, that our website will be uninterrupted or immune to system latency, or that defects will be immediately rectified.
        </p>
      </section>

      {/* 5. User Responsibility */}
      <section aria-labelledby="responsibility-heading" className="flex flex-col gap-3">
        <h2
          id="responsibility-heading"
          className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white"
        >
          5. Responsibility for Decisions & Content
        </h2>
        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
          You assume complete responsibility and all risks arising from your choice to use AHADEX TOOLS and your application of any generated outputs. In no event shall the platform, its developers, or its hosting infrastructure be liable for damages of any nature resulting from reliance on our tools.
        </p>
      </section>

      {/* Cross Links Footer */}
      <footer className="pt-8 border-t border-slate-200/80 dark:border-slate-800/80 flex flex-col gap-4">
        <h2 className="text-sm font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
          Related Institutional Pages
        </h2>
        <div className="flex flex-wrap gap-3">
          <Link
            to="/about"
            className="px-3.5 py-2 rounded-lg text-xs font-semibold text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 hover:bg-sky-50 dark:hover:bg-sky-950/40 hover:text-sky-600 dark:hover:text-sky-400 transition-colors"
          >
            About
          </Link>
          <Link
            to="/privacy"
            className="px-3.5 py-2 rounded-lg text-xs font-semibold text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 hover:bg-sky-50 dark:hover:bg-sky-950/40 hover:text-sky-600 dark:hover:text-sky-400 transition-colors"
          >
            Privacy Policy
          </Link>
          <Link
            to="/terms"
            className="px-3.5 py-2 rounded-lg text-xs font-semibold text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 hover:bg-sky-50 dark:hover:bg-sky-950/40 hover:text-sky-600 dark:hover:text-sky-400 transition-colors"
          >
            Terms of Service
          </Link>
          <Link
            to="/cookies"
            className="px-3.5 py-2 rounded-lg text-xs font-semibold text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 hover:bg-sky-50 dark:hover:bg-sky-950/40 hover:text-sky-600 dark:hover:text-sky-400 transition-colors"
          >
            Cookie Policy
          </Link>
          <Link
            to="/accessibility"
            className="px-3.5 py-2 rounded-lg text-xs font-semibold text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 hover:bg-sky-50 dark:hover:bg-sky-950/40 hover:text-sky-600 dark:hover:text-sky-400 transition-colors"
          >
            Accessibility Statement
          </Link>
          <Link
            to="/contact"
            className="px-3.5 py-2 rounded-lg text-xs font-semibold text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 hover:bg-sky-50 dark:hover:bg-sky-950/40 hover:text-sky-600 dark:hover:text-sky-400 transition-colors"
          >
            Contact
          </Link>
        </div>
      </footer>
    </article>
  );
}
