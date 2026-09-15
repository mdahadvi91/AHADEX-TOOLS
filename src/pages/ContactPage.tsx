import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, MessageSquare, AlertCircle, HelpCircle, FileCheck, CheckCircle2 } from 'lucide-react';
import { AnimatedBackButton } from '@/src/components/common';
import { useSEO } from '@/src/lib/seo';
import { SITE_CONFIG } from '@/src/data/site';

/**
 * Production Contact Page for AHADEX TOOLS.
 * Provides structured guidance for feedback, issue reporting, and legal inquiries.
 * Does not implement non-functional fake forms or invent fake corporate phone numbers.
 */
export default function ContactPage() {
  useSEO({
    title: 'Contact',
    description: 'Find guidance for reporting tool issues, submitting feedback, and inquiring about privacy or technical behavior on AHADEX TOOLS.',
    path: '/contact',
    breadcrumbs: [
      { name: 'Home', path: '/' },
      { name: 'Contact', path: '/contact' },
    ],
  });

  return (
    <article
      id="ahadex-contact-page"
      className="w-full max-w-4xl mx-auto py-6 sm:py-10 px-4 sm:px-6 flex flex-col gap-10 animate-fade-in"
    >
      {/* Top Breadcrumb / Back Bar */}
      <div className="flex items-center justify-between gap-4">
        <AnimatedBackButton fallbackPath="/" label="Back to Tools" />
        <span className="text-xs font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500">
          Support & Communications
        </span>
      </div>

      {/* Header */}
      <header className="flex flex-col gap-3 pb-6 border-b border-slate-200/80 dark:border-slate-800/80">
        <h1
          id="contact-title"
          className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white"
        >
          Contact & <span className="text-sky-600 dark:text-sky-400">Support Guidance</span>
        </h1>
        <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed max-w-2xl">
          We welcome bug reports, utility feature requests, and inquiries regarding data handling on AHADEX TOOLS.
        </p>
      </header>

      {/* Overview Notice */}
      <div className="p-4 rounded-xl bg-sky-50 dark:bg-sky-950/30 border border-sky-200/80 dark:border-sky-800/60 flex items-start gap-3">
        <HelpCircle className="w-5 h-5 text-sky-600 dark:text-sky-400 shrink-0 mt-0.5" aria-hidden="true" />
        <div className="text-xs sm:text-sm text-sky-900 dark:text-sky-200 leading-relaxed">
          <strong className="font-semibold">Direct Communication Channels:</strong> AHADEX TOOLS is maintained as an open, accessible suite of web utilities. To maintain communication integrity, we avoid collecting personal details through unencrypted web forms. Review the guidance below for reporting issues or directing technical inquiries.
        </div>
      </div>

      {/* Section 1: Reporting a Tool Issue / Bug */}
      <section aria-labelledby="issue-reporting-heading" className="flex flex-col gap-4">
        <h2
          id="issue-reporting-heading"
          className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2"
        >
          <AlertCircle className="w-5 h-5 text-amber-500" aria-hidden="true" />
          <span>Reporting a Tool Bug or Unexpected Output</span>
        </h2>
        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
          Because our tools execute in your local browser sandbox, tool issues are often related to specific browser versions, memory constraints, or unsupported file formats. To help us reproduce and resolve defects, please include:
        </p>
        <div className="p-5 rounded-xl glass-panel border border-slate-200/80 dark:border-slate-800/80 flex flex-col gap-3">
          <ul className="flex flex-col gap-2.5 text-xs sm:text-sm text-slate-600 dark:text-slate-300 list-disc pl-5">
            <li>
              <strong className="text-slate-900 dark:text-white font-medium">Tool Name:</strong> The specific utility you were using (e.g., &quot;JPG to PDF Converter&quot; or &quot;QR Code Generator&quot;).
            </li>
            <li>
              <strong className="text-slate-900 dark:text-white font-medium">Browser & Device:</strong> Your web browser name and version (e.g., Chrome 124, Safari 17, Firefox 125) and operating system (Windows, macOS, Linux, Android, iOS).
            </li>
            <li>
              <strong className="text-slate-900 dark:text-white font-medium">File Specifications:</strong> Approximate file size, original extension, and whether any error badge or status message appeared. (Please do NOT send confidential documents or sensitive files).
            </li>
            <li>
              <strong className="text-slate-900 dark:text-white font-medium">Observed Behavior:</strong> A brief description of what happened versus what you expected to happen.
            </li>
          </ul>
        </div>
      </section>

      {/* Section 2: Inquiry Categories */}
      <section aria-labelledby="categories-heading" className="flex flex-col gap-4">
        <h2
          id="categories-heading"
          className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2"
        >
          <MessageSquare className="w-5 h-5 text-sky-500" aria-hidden="true" />
          <span>Inquiry Categories</span>
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="p-5 rounded-xl glass-panel border border-slate-200/80 dark:border-slate-800/80 flex flex-col gap-2">
            <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-500" />
              <span>Feature & Tool Requests</span>
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
              If there is a repetitive file conversion or formatting task you wish AHADEX TOOLS supported, describe the desired input format, desired output format, and use case.
            </p>
          </div>

          <div className="p-5 rounded-xl glass-panel border border-slate-200/80 dark:border-slate-800/80 flex flex-col gap-2">
            <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <FileCheck className="w-4 h-4 text-purple-500" />
              <span>Privacy & Legal Inquiries</span>
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
              For questions regarding our terms of service, data processing clarification, or cookie management, please reference our documentation below or consult our legal overview.
            </p>
          </div>
        </div>
      </section>

      {/* Section 3: Before You Contact Us */}
      <section aria-labelledby="before-heading" className="flex flex-col gap-3">
        <h2
          id="before-heading"
          className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white"
        >
          Frequently Checked Solutions
        </h2>
        <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
          Many common questions are answered directly on the platform:
        </p>
        <ul className="flex flex-col gap-2 text-sm text-slate-600 dark:text-slate-300 list-disc pl-5">
          <li>
            Wondering where your uploaded files go? Review our{' '}
            <Link to="/privacy" className="text-sky-600 dark:text-sky-400 underline underline-offset-2 hover:text-sky-500">
              Privacy Policy
            </Link>{' '}
            for full transparency on client-side memory handling.
          </li>
          <li>
            Want to understand usage terms and output verification? Read our{' '}
            <Link to="/terms" className="text-sky-600 dark:text-sky-400 underline underline-offset-2 hover:text-sky-500">
              Terms of Service
            </Link>{' '}
            and{' '}
            <Link to="/disclaimer" className="text-sky-600 dark:text-sky-400 underline underline-offset-2 hover:text-sky-500">
              Disclaimer
            </Link>.
          </li>
          <li>
            Need step-by-step instructions for a specific tool? Each utility page features a dedicated &quot;How to Use&quot; guide and contextual FAQ below the workspace.
          </li>
        </ul>
      </section>

      {/* Section 4: Channel Information */}
      <section aria-labelledby="channel-heading" className="flex flex-col gap-4 p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200/80 dark:border-slate-800">
        <h2 id="channel-heading" className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <Mail className="w-4 h-4 text-sky-500" aria-hidden="true" />
          <span>Project Communications & Repository</span>
        </h2>
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
          Official project updates, release notes, and public discussions are published through our project repository and hosting dashboard. If you are an enterprise integrator or technical auditor requiring administrative assistance, please utilize the official repository issues or site deployment channels.
        </p>
      </section>

      {/* Related Links */}
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
        </div>
      </footer>
    </article>
  );
}
