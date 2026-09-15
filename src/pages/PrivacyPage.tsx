import React from 'react';
import { Link } from 'react-router-dom';
import { Shield, Lock, Eye, Server, RefreshCw, AlertCircle } from 'lucide-react';
import { AnimatedBackButton } from '@/src/components/common';
import { useSEO } from '@/src/lib/seo';
import { SITE_CONFIG } from '@/src/data/site';

/**
 * Production Privacy Policy Page for AHADEX TOOLS.
 * Rigorously differentiates client-side memory execution from server communications,
 * outlines analytics boundaries, and avoids ungrounded or fictitious regulatory claims.
 */
export default function PrivacyPage() {
  useSEO({
    title: 'Privacy Policy',
    description: 'Learn how AHADEX TOOLS handles your data, prioritizes client-side browser processing, and safeguards your privacy with zero file retention.',
    path: '/privacy',
    breadcrumbs: [
      { name: 'Home', path: '/' },
      { name: 'Privacy Policy', path: '/privacy' },
    ],
  });

  return (
    <article
      id="ahadex-privacy-page"
      className="w-full max-w-4xl mx-auto py-6 sm:py-10 px-4 sm:px-6 flex flex-col gap-10 animate-fade-in"
    >
      {/* Top Breadcrumb / Back Bar */}
      <div className="flex items-center justify-between gap-4">
        <AnimatedBackButton fallbackPath="/" label="Back to Tools" />
        <span className="text-xs font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500">
          Legal & Privacy
        </span>
      </div>

      {/* Header */}
      <header className="flex flex-col gap-3 pb-6 border-b border-slate-200/80 dark:border-slate-800/80">
        <div className="inline-flex items-center gap-2 text-xs font-semibold text-sky-600 dark:text-sky-400 uppercase tracking-wider">
          <Shield className="w-4 h-4" aria-hidden="true" />
          <span>Last Updated: September 2026</span>
        </div>
        <h1
          id="privacy-title"
          className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white"
        >
          Privacy <span className="text-sky-600 dark:text-sky-400">Policy</span>
        </h1>
        <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed max-w-2xl">
          This Privacy Policy explains how AHADEX TOOLS handles data, how our browser-native processing architecture safeguards your content, and the strict limits of our data collection.
        </p>
      </header>

      {/* 1. Core Architectural Distinction */}
      <section aria-labelledby="architecture-heading" className="flex flex-col gap-4">
        <h2
          id="architecture-heading"
          className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2"
        >
          <Lock className="w-5 h-5 text-emerald-500" aria-hidden="true" />
          <span>1. In-Browser Client-Side Processing</span>
        </h2>
        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
          The core architectural philosophy of AHADEX TOOLS is to eliminate unnecessary file transmission. Our tools are built using modern web standards—such as the HTML5 Canvas API, Web Workers, and WebAssembly—which enable computation directly within your local web browser session.
        </p>
        <div className="p-5 rounded-xl glass-panel border border-slate-200/80 dark:border-slate-800/80 flex flex-col gap-3">
          <h3 className="text-sm font-bold text-slate-900 dark:text-white">What this means for your files:</h3>
          <ul className="flex flex-col gap-2 text-xs sm:text-sm text-slate-600 dark:text-slate-300 list-disc pl-5">
            <li>
              When you select or drop a file into a browser-native tool (e.g. image converters, PDF tools, QR generators), your file is read into your device&apos;s local volatile RAM.
            </li>
            <li>
              The processing code executes on your CPU/GPU inside your browser&apos;s security sandbox.
            </li>
            <li>
              <strong className="text-slate-900 dark:text-white font-semibold">Your file contents are NOT uploaded to our servers</strong>, logged in a central database, or transferred to third parties.
            </li>
            <li>
              When you reset the workspace, refresh, or close the browser tab, the local memory allocation is discarded by your browser.
            </li>
          </ul>
        </div>
      </section>

      {/* 2. Potential Server-Assisted Tools Distinction */}
      <section aria-labelledby="server-distinction-heading" className="flex flex-col gap-4">
        <h2
          id="server-distinction-heading"
          className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2"
        >
          <Server className="w-5 h-5 text-indigo-500" aria-hidden="true" />
          <span>2. Future or Server-Assisted Tools</span>
        </h2>
        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
          While our default is client-side execution, certain specialized computational tasks (such as deep Optical Character Recognition or heavyweight document parsing) may require server-side computing resources in future platform phases.
        </p>
        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
          <strong className="text-slate-900 dark:text-white font-semibold">Our commitment:</strong> Any utility that requires server-side communication will clearly declare its processing architecture directly on that tool&apos;s interface prior to file selection. We will never silently re-route client-side tools to remote servers.
        </p>
      </section>

      {/* 3. Technical Connection & Hosting Data */}
      <section aria-labelledby="technical-data-heading" className="flex flex-col gap-4">
        <h2
          id="technical-data-heading"
          className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white"
        >
          3. Technical Connection Data
        </h2>
        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
          When you access AHADEX TOOLS over the internet, standard web server requests are handled by our cloud hosting infrastructure (e.g. Vercel and global Edge CDN networks). This infrastructure automatically processes transient technical connection logs, which typically include:
        </p>
        <ul className="flex flex-col gap-1.5 text-xs sm:text-sm text-slate-600 dark:text-slate-300 list-disc pl-5">
          <li>Your IP address (used strictly for network routing and DDoS security mitigation)</li>
          <li>Requested web resource path (e.g., <code className="text-xs bg-slate-100 dark:bg-slate-800 px-1 py-0.5 rounded">/tools/jpg-to-pdf</code>)</li>
          <li>Browser user-agent string and operating system identifiers</li>
          <li>Referrer URL and HTTP timestamp</li>
        </ul>
        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
          These operational logs are maintained by our hosting providers for security, edge caching, and service uptime. They are never paired with user identity profiles.
        </p>
      </section>

      {/* 4. Local Storage Usage */}
      <section aria-labelledby="storage-heading" className="flex flex-col gap-4">
        <h2
          id="storage-heading"
          className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white"
        >
          4. Browser Local Storage & Preference Keys
        </h2>
        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
          AHADEX TOOLS utilizes HTML5 <code className="text-xs bg-slate-100 dark:bg-slate-800 px-1.5 py-0.5 rounded">localStorage</code> solely to remember your immediate user interface preferences between visits:
        </p>
        <ul className="flex flex-col gap-1.5 text-xs sm:text-sm text-slate-600 dark:text-slate-300 list-disc pl-5">
          <li>
            <strong className="text-slate-900 dark:text-white font-medium">Theme Mode:</strong> Stores your chosen visual appearance (light, dark, or system preference).
          </li>
          <li>
            <strong className="text-slate-900 dark:text-white font-medium">Interface Language:</strong> Stores your chosen display language (English, Bangla, Arabic).
          </li>
          <li>
            <strong className="text-slate-900 dark:text-white font-medium">Analytics Consent:</strong> Stores your opt-in or opt-out status for telemetry tracking.
          </li>
        </ul>
        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
          These keys reside exclusively on your machine, are not accessible by other websites, and can be cleared at any time through your browser settings.
        </p>
      </section>

      {/* 5. Google Analytics & Metrics */}
      <section aria-labelledby="analytics-heading" className="flex flex-col gap-4">
        <h2
          id="analytics-heading"
          className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2"
        >
          <Eye className="w-5 h-5 text-sky-500" aria-hidden="true" />
          <span>5. Analytics & Usage Telemetry</span>
        </h2>
        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
          To measure which utilities are popular, diagnose software errors, and plan performance improvements, we may load Google Analytics 4 (GA4) if configured.
        </p>
        <div className="p-4 rounded-xl bg-amber-50 dark:bg-amber-950/20 border border-amber-200/80 dark:border-amber-800/40 text-xs sm:text-sm text-amber-900 dark:text-amber-200 flex flex-col gap-2">
          <strong className="font-semibold flex items-center gap-1.5">
            <AlertCircle className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0" />
            <span>Strict Privacy Constraints on Analytics:</span>
          </strong>
          <p>
            Our analytics code is programmatically restricted. It captures ONLY coarse metadata: tool identifiers, file count, total byte size, execution duration in milliseconds, and high-level error codes.
          </p>
          <p>
            <strong className="underline">We NEVER send:</strong> your file contents, filenames, personal documents, email addresses, extracted text, QR payloads, or sensitive search queries.
          </p>
        </div>
      </section>

      {/* 6. Advertising Networks */}
      <section aria-labelledby="ads-heading" className="flex flex-col gap-4">
        <h2
          id="ads-heading"
          className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white"
        >
          6. Advertising Policy
        </h2>
        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
          AHADEX TOOLS currently runs zero commercial advertising networks, ad banners, or behavioural tracking beacons. Should advertising ever be introduced to support infrastructure hosting in future phases, this policy will be updated with explicit notice and transparent disclosure of ad technologies.
        </p>
      </section>

      {/* 7. Data Retention & Erasure */}
      <section aria-labelledby="retention-heading" className="flex flex-col gap-4">
        <h2
          id="retention-heading"
          className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white"
        >
          7. Data Retention & Erasure
        </h2>
        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
          Because browser-native processing does not upload your files to our servers, <strong className="text-slate-900 dark:text-white font-semibold">there is no server database of your files to delete</strong>. Your files exist in volatile browser memory only for the duration of your active task. Clicking the &quot;Reset&quot; button immediately cleans and unmounts the file references from your browser memory.
        </p>
      </section>

      {/* 8. Children's Privacy */}
      <section aria-labelledby="children-heading" className="flex flex-col gap-3">
        <h2
          id="children-heading"
          className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white"
        >
          8. Children&apos;s Privacy
        </h2>
        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
          Our website provides general-purpose computational utilities and is not directed to children under the age of 13. We do not knowingly collect, request, or retain personal data from children.
        </p>
      </section>

      {/* 9. Policy Updates */}
      <section aria-labelledby="updates-heading" className="flex flex-col gap-3">
        <h2
          id="updates-heading"
          className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white"
        >
          9. Changes to this Privacy Policy
        </h2>
        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
          We may revise this Privacy Policy periodically to reflect enhancements in tool capabilities or regulatory changes. Any updates will be posted to this URL with an updated &quot;Last Updated&quot; timestamp.
        </p>
      </section>

      {/* 10. Privacy Inquiries */}
      <section aria-labelledby="inquiries-heading" className="flex flex-col gap-3">
        <h2
          id="inquiries-heading"
          className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white"
        >
          10. Contacting Us Regarding Privacy
        </h2>
        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
          If you have questions about this policy or the technical boundaries of our browser execution, please refer to our{' '}
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
