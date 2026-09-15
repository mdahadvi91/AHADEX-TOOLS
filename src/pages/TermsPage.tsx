import React from 'react';
import { Link } from 'react-router-dom';
import { Scale, CheckCircle, AlertTriangle, FileText, Ban, ShieldAlert } from 'lucide-react';
import { AnimatedBackButton } from '@/src/components/common';
import { useSEO } from '@/src/lib/seo';
import { SITE_CONFIG } from '@/src/data/site';

/**
 * Production Terms & Conditions Page for AHADEX TOOLS.
 * Provides balanced, truthful, and enforceable terms governing platform usage,
 * output responsibility, intellectual property, and limitations of liability.
 */
export default function TermsPage() {
  useSEO({
    title: 'Terms of Service',
    description: 'Read the terms and conditions governing your access and usage of the utilities provided by AHADEX TOOLS.',
    path: '/terms',
    breadcrumbs: [
      { name: 'Home', path: '/' },
      { name: 'Terms of Service', path: '/terms' },
    ],
  });

  return (
    <article
      id="ahadex-terms-page"
      className="w-full max-w-4xl mx-auto py-6 sm:py-10 px-4 sm:px-6 flex flex-col gap-10 animate-fade-in"
    >
      {/* Top Breadcrumb / Back Bar */}
      <div className="flex items-center justify-between gap-4">
        <AnimatedBackButton fallbackPath="/" label="Back to Tools" />
        <span className="text-xs font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500">
          Legal Agreement
        </span>
      </div>

      {/* Header */}
      <header className="flex flex-col gap-3 pb-6 border-b border-slate-200/80 dark:border-slate-800/80">
        <div className="inline-flex items-center gap-2 text-xs font-semibold text-sky-600 dark:text-sky-400 uppercase tracking-wider">
          <Scale className="w-4 h-4" aria-hidden="true" />
          <span>Effective Date: September 2026</span>
        </div>
        <h1
          id="terms-title"
          className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white"
        >
          Terms of <span className="text-sky-600 dark:text-sky-400">Service</span>
        </h1>
        <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed max-w-2xl">
          Please review these Terms of Service carefully before utilizing the software utilities provided on AHADEX TOOLS.
        </p>
      </header>

      {/* 1. Acceptance of Terms */}
      <section aria-labelledby="acceptance-heading" className="flex flex-col gap-3">
        <h2
          id="acceptance-heading"
          className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white"
        >
          1. Acceptance of Terms
        </h2>
        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
          By accessing or using AHADEX TOOLS (the &quot;Platform&quot;), you acknowledge that you have read, understood, and agreed to be bound by these Terms of Service. If you do not agree with any part of these terms, you should immediately discontinue use of our utilities.
        </p>
      </section>

      {/* 2. Permitted & Acceptable Use */}
      <section aria-labelledby="acceptable-use-heading" className="flex flex-col gap-4">
        <h2
          id="acceptable-use-heading"
          className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2"
        >
          <CheckCircle className="w-5 h-5 text-emerald-500" aria-hidden="true" />
          <span>2. Permitted & Acceptable Use</span>
        </h2>
        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
          AHADEX TOOLS grants you a personal, worldwide, non-exclusive, revocable license to use our web-based tools for lawful personal, educational, research, and professional purposes.
        </p>
        <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/80 dark:border-slate-800 flex flex-col gap-2">
          <strong className="text-sm font-semibold text-slate-900 dark:text-white">You agree NOT to:</strong>
          <ul className="flex flex-col gap-1.5 text-xs sm:text-sm text-slate-600 dark:text-slate-300 list-disc pl-5">
            <li>Engage in automated abuse, denial of service attacks, or excessive script automation that degrades platform availability for other users.</li>
            <li>Use the tools to process, generate, or distribute malicious files, viruses, malware, or unlawful content.</li>
            <li>Attempt to bypass, defeat, or tamper with security controls or client-side validation logic.</li>
            <li>Misrepresent outputs produced by automated tools as certified, licensed professional evaluations.</li>
          </ul>
        </div>
      </section>

      {/* 3. User Content & Output Responsibility */}
      <section aria-labelledby="content-responsibility-heading" className="flex flex-col gap-4">
        <h2
          id="content-responsibility-heading"
          className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2"
        >
          <FileText className="w-5 h-5 text-indigo-500" aria-hidden="true" />
          <span>3. User Content & Output Verification</span>
        </h2>
        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
          You retain 100% ownership and intellectual property rights over any documents, images, data, or text you select, convert, or generate using the platform.
        </p>
        <div className="p-4 rounded-xl bg-amber-50 dark:bg-amber-950/20 border border-amber-200/80 dark:border-amber-800/40 text-xs sm:text-sm text-amber-900 dark:text-amber-200 flex flex-col gap-2">
          <strong className="font-semibold flex items-center gap-1.5">
            <AlertTriangle className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0" />
            <span>Sole Responsibility for Verification:</span>
          </strong>
          <p>
            Automated software algorithms (including image codecs, compression routines, and PDF engines) can produce unexpected alterations, lossy compressions, or rendering discrepancies. You are solely responsible for inspecting and verifying all output files before relying on them for legal, financial, architectural, academic, or business purposes.
          </p>
        </div>
      </section>

      {/* 4. Intellectual Property of the Platform */}
      <section aria-labelledby="ip-heading" className="flex flex-col gap-3">
        <h2
          id="ip-heading"
          className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white"
        >
          4. Platform Intellectual Property
        </h2>
        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
          All interface designs, component layouts, stylesheets, branding, logos, software logic, and documentation comprising AHADEX TOOLS are the exclusive property of AHADEX TOOLS and its authors, protected under international copyright, trademark, and intellectual property laws. You may not scrape, clone, or redistribute the platform codebase without prior authorization.
        </p>
      </section>

      {/* 5. Service Availability & Changes */}
      <section aria-labelledby="availability-heading" className="flex flex-col gap-3">
        <h2
          id="availability-heading"
          className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white"
        >
          5. Service Availability & Modifications
        </h2>
        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
          We continually enhance our suite of tools. We reserve the right to introduce new tools, modify existing utilities, or temporarily suspend access for scheduled maintenance or infrastructure updates at any time, without prior notice or liability.
        </p>
      </section>

      {/* 6. Disclaimer of Warranties */}
      <section aria-labelledby="warranties-heading" className="flex flex-col gap-3">
        <h2
          id="warranties-heading"
          className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white"
        >
          6. Disclaimer of Warranties (&quot;As Is&quot;)
        </h2>
        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed uppercase text-xs tracking-wider font-semibold">
          THE PLATFORM AND ALL UTILITIES ARE PROVIDED ON AN &quot;AS IS&quot; AND &quot;AS AVAILABLE&quot; BASIS WITHOUT WARRANTIES OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, TITLE, OR NON-INFRINGEMENT. WE DO NOT WARRANT THAT TOOLS WILL BE UNINTERRUPTED, COMPLETELY ERROR-FREE, OR COMPATIBLE WITH EVERY ARBITRARY FILE FORMAT OR DEVICE.
        </p>
      </section>

      {/* 7. Limitation of Liability */}
      <section aria-labelledby="liability-heading" className="flex flex-col gap-3">
        <h2
          id="liability-heading"
          className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2"
        >
          <ShieldAlert className="w-5 h-5 text-rose-500" aria-hidden="true" />
          <span>7. Limitation of Liability</span>
        </h2>
        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
          To the maximum extent permitted by applicable law, AHADEX TOOLS, its operators, contributors, and hosting affiliates shall not be liable for any direct, indirect, incidental, special, consequential, or punitive damages, including but not limited to loss of data, loss of business profits, computer malfunction, or reliance on incorrect calculations, arising out of or related to your use of the platform.
        </p>
      </section>

      {/* 8. Governing Inquiries & Contact */}
      <section aria-labelledby="inquiries-heading" className="flex flex-col gap-3">
        <h2
          id="inquiries-heading"
          className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white"
        >
          8. Questions & Contact
        </h2>
        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
          For any formal inquiries or clarifications regarding these terms, please consult our{' '}
          <Link to="/contact" className="text-sky-600 dark:text-sky-400 underline underline-offset-2 hover:text-sky-500">
            Contact Guidance
          </Link>{' '}
          page.
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
            to="/disclaimer"
            className="px-3.5 py-2 rounded-lg text-xs font-semibold text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 hover:bg-sky-50 dark:hover:bg-sky-950/40 hover:text-sky-600 dark:hover:text-sky-400 transition-colors"
          >
            Disclaimer
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
