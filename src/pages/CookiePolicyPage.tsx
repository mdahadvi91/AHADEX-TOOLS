import React from 'react';
import { Link } from 'react-router-dom';
import { Cookie, CheckCircle2, Sliders, ShieldCheck, HelpCircle } from 'lucide-react';
import { AnimatedBackButton } from '@/src/components/common';
import { useSEO } from '@/src/lib/seo';
import { SITE_CONFIG } from '@/src/data/site';

/**
 * Production Cookie Policy Page for AHADEX TOOLS.
 * Delineates functional HTML5 LocalStorage keys from optional GA4 analytical cookies,
 * confirms zero active advertising cookies, and provides clear user control guidance.
 */
export default function CookiePolicyPage() {
  useSEO({
    title: 'Cookie Policy',
    description: 'Learn about the functional browser storage and optional analytics cookies used on AHADEX TOOLS, and how you can manage them.',
    path: '/cookies',
    breadcrumbs: [
      { name: 'Home', path: '/' },
      { name: 'Cookie Policy', path: '/cookies' },
    ],
  });

  return (
    <article
      id="ahadex-cookie-policy-page"
      className="w-full max-w-4xl mx-auto py-6 sm:py-10 px-4 sm:px-6 flex flex-col gap-10 animate-fade-in"
    >
      {/* Top Breadcrumb / Back Bar */}
      <div className="flex items-center justify-between gap-4">
        <AnimatedBackButton fallbackPath="/" label="Back to Tools" />
        <span className="text-xs font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500">
          Storage & Privacy
        </span>
      </div>

      {/* Header */}
      <header className="flex flex-col gap-3 pb-6 border-b border-slate-200/80 dark:border-slate-800/80">
        <div className="inline-flex items-center gap-2 text-xs font-semibold text-sky-600 dark:text-sky-400 uppercase tracking-wider">
          <Cookie className="w-4 h-4" aria-hidden="true" />
          <span>Last Updated: September 2026</span>
        </div>
        <h1
          id="cookie-policy-title"
          className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white"
        >
          Cookie & <span className="text-sky-600 dark:text-sky-400">Storage Policy</span>
        </h1>
        <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed max-w-2xl">
          This policy explains how AHADEX TOOLS uses browser storage mechanisms—including HTTP cookies and HTML5 LocalStorage—and how you can control them.
        </p>
      </header>

      {/* 1. What Are Cookies and LocalStorage? */}
      <section aria-labelledby="what-is-storage-heading" className="flex flex-col gap-4">
        <h2
          id="what-is-storage-heading"
          className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white"
        >
          1. Understanding Cookies & LocalStorage
        </h2>
        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
          Cookies are small text files stored on your device by web browsers when you visit a website. HTML5 LocalStorage is a complementary web technology that enables websites to save data locally in your browser without automatically transmitting that data with every HTTP network request.
        </p>
        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
          AHADEX TOOLS prioritizes user privacy. We minimize tracking and rely primarily on non-invasive LocalStorage to remember your user interface preferences.
        </p>
      </section>

      {/* 2. Strictly Necessary Functional Storage */}
      <section aria-labelledby="functional-storage-heading" className="flex flex-col gap-4">
        <h2
          id="functional-storage-heading"
          className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2"
        >
          <Sliders className="w-5 h-5 text-indigo-500" aria-hidden="true" />
          <span>2. Strictly Necessary Functional Storage (LocalStorage)</span>
        </h2>
        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
          We use HTML5 <code className="text-xs bg-slate-100 dark:bg-slate-800 px-1.5 py-0.5 rounded">localStorage</code> strictly for functional settings that enhance your immediate user experience:
        </p>
        <div className="p-5 rounded-xl glass-panel border border-slate-200/80 dark:border-slate-800/80 flex flex-col gap-3">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="flex flex-col gap-1 p-3 rounded-lg bg-slate-50 dark:bg-slate-800/40 border border-slate-200/60 dark:border-slate-800">
              <span className="text-xs font-mono font-bold text-sky-600 dark:text-sky-400">ahadex_tools_theme</span>
              <p className="text-xs text-slate-600 dark:text-slate-400">
                Remembers your selected visual style (Light, Dark, or System automatic theme).
              </p>
            </div>
            <div className="flex flex-col gap-1 p-3 rounded-lg bg-slate-50 dark:bg-slate-800/40 border border-slate-200/60 dark:border-slate-800">
              <span className="text-xs font-mono font-bold text-sky-600 dark:text-sky-400">ahadex_tools_language</span>
              <p className="text-xs text-slate-600 dark:text-slate-400">
                Remembers your chosen interface language (English, Bangla, Arabic).
              </p>
            </div>
            <div className="flex flex-col gap-1 p-3 rounded-lg bg-slate-50 dark:bg-slate-800/40 border border-slate-200/60 dark:border-slate-800">
              <span className="text-xs font-mono font-bold text-sky-600 dark:text-sky-400">ahadex_tools_analytics_consent</span>
              <p className="text-xs text-slate-600 dark:text-slate-400">
                Records your telemetry choice so you are not repeatedly prompted.
              </p>
            </div>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            * These items do not track you across the web, do not identify your personal identity, and can be cleared at any time in your browser settings.
          </p>
        </div>
      </section>

      {/* 3. Analytics Cookies */}
      <section aria-labelledby="analytics-cookies-heading" className="flex flex-col gap-4">
        <h2
          id="analytics-cookies-heading"
          className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white"
        >
          3. Analytics Cookies (Google Analytics 4)
        </h2>
        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
          When Google Analytics 4 is enabled in production, Google Analytics sets first-party cookies (such as <code className="text-xs bg-slate-100 dark:bg-slate-800 px-1 py-0.5 rounded">_ga</code> and <code className="text-xs bg-slate-100 dark:bg-slate-800 px-1 py-0.5 rounded">_ga_*</code>) to distinguish unique visitor sessions and calculate anonymous aggregate traffic metrics.
        </p>
        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
          These cookies collect coarse statistical data (e.g. general geographic region, browser type, pages viewed). They <strong className="text-slate-900 dark:text-white font-semibold">never</strong> collect your uploaded files, personal documents, or sensitive data.
        </p>
      </section>

      {/* 4. Advertising Cookies */}
      <section aria-labelledby="ad-cookies-heading" className="flex flex-col gap-4">
        <h2
          id="ad-cookies-heading"
          className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2"
        >
          <ShieldCheck className="w-5 h-5 text-emerald-500" aria-hidden="true" />
          <span>4. Advertising Cookies</span>
        </h2>
        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
          AHADEX TOOLS does not deploy third-party advertising cookies, cross-site remarketing pixels, or commercial behavioral trackers. If advertising technologies are introduced in future platform versions, this policy will be revised with comprehensive management instructions.
        </p>
      </section>

      {/* 5. Managing Your Preferences */}
      <section aria-labelledby="controls-heading" className="flex flex-col gap-4">
        <h2
          id="controls-heading"
          className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white"
        >
          5. How You Can Control Cookies & Storage
        </h2>
        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
          You have multiple methods to manage or block storage technologies:
        </p>
        <ul className="flex flex-col gap-2 text-sm sm:text-base text-slate-600 dark:text-slate-300 list-disc pl-5">
          <li>
            <strong className="text-slate-900 dark:text-white font-semibold">Browser Settings:</strong> Most modern browsers (Chrome, Edge, Firefox, Safari) allow you to block third-party cookies, reject all cookies, or clear local browsing data on exit.
          </li>
          <li>
            <strong className="text-slate-900 dark:text-white font-semibold">Private / Incognito Browsing:</strong> Using a private window ensures all session cookies and LocalStorage items are automatically discarded once you close the window.
          </li>
          <li>
            <strong className="text-slate-900 dark:text-white font-semibold">Privacy Extensions & Signals:</strong> AHADEX TOOLS respects standard privacy features, including &quot;Do Not Track&quot; (DNT) and Global Privacy Control (GPC) signals supported by your browser or extensions.
          </li>
        </ul>
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
            to="/disclaimer"
            className="px-3.5 py-2 rounded-lg text-xs font-semibold text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 hover:bg-sky-50 dark:hover:bg-sky-950/40 hover:text-sky-600 dark:hover:text-sky-400 transition-colors"
          >
            Disclaimer
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
