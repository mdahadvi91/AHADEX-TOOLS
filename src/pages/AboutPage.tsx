import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, Zap, Cpu, Eye, ArrowRight, Layers, FileText, Lock } from 'lucide-react';
import { AnimatedBackButton } from '@/src/components/common';
import { useSEO } from '@/src/lib/seo';
import { SITE_CONFIG } from '@/src/data/site';

/**
 * Production About Page for AHADEX TOOLS.
 * Provides transparent, honest institutional information regarding platform capabilities,
 * architectural focus, data handling commitments, and accessibility principles.
 */
export default function AboutPage() {
  useSEO({
    title: 'About',
    description: 'Learn about AHADEX TOOLS, our privacy-centric browser-native utilities, performance philosophy, and responsible data processing architecture.',
    path: '/about',
    breadcrumbs: [
      { name: 'Home', path: '/' },
      { name: 'About', path: '/about' },
    ],
  });

  return (
    <article
      id="ahadex-about-page"
      className="w-full max-w-4xl mx-auto py-6 sm:py-10 px-4 sm:px-6 flex flex-col gap-10 animate-fade-in"
    >
      {/* Top Breadcrumb / Back Bar */}
      <div className="flex items-center justify-between gap-4">
        <AnimatedBackButton fallbackPath="/" label="Back to Tools" />
        <span className="text-xs font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500">
          Platform Overview
        </span>
      </div>

      {/* Page Header */}
      <header className="flex flex-col gap-3 pb-6 border-b border-slate-200/80 dark:border-slate-800/80">
        <h1
          id="about-title"
          className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white"
        >
          About <span className="text-sky-600 dark:text-sky-400">AHADEX TOOLS</span>
        </h1>
        <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed max-w-2xl">
          Practical, high-performance web utilities built for everyday document, image, and data tasks—designed to run responsibly without friction, hidden paywalls, or unnecessary data exposure.
        </p>
      </header>

      {/* Section 1: Core Mission & Purpose */}
      <section aria-labelledby="mission-heading" className="flex flex-col gap-4">
        <h2
          id="mission-heading"
          className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2"
        >
          <Zap className="w-5 h-5 text-sky-500" aria-hidden="true" />
          <span>Purpose & Motivation</span>
        </h2>
        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
          Modern computing frequently demands simple digital adjustments: converting an image format for a web upload, merging two PDF contracts, generating a standard QR code, or formatting configuration snippets. Historically, users have faced an unpleasant choice: either install bloated desktop programs with confusing installers or upload confidential files to third-party web portals that log, queue, and retain personal data.
        </p>
        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
          <strong className="text-slate-900 dark:text-white font-semibold">AHADEX TOOLS</strong> was created to eliminate this compromise. We harness modern web standards—including client-side Canvas APIs, Web Workers, and WebAssembly—to execute computational tasks directly inside your local web browser whenever technically possible.
        </p>
      </section>

      {/* Section 2: What We Offer */}
      <section aria-labelledby="offerings-heading" className="flex flex-col gap-4">
        <h2
          id="offerings-heading"
          className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2"
        >
          <Layers className="w-5 h-5 text-indigo-500" aria-hidden="true" />
          <span>What the Platform Provides</span>
        </h2>
        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
          The platform organizes functional utilities across core domains:
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-2">
          <div className="p-5 rounded-xl glass-panel border border-slate-200/80 dark:border-slate-800/80 flex flex-col gap-2">
            <h3 className="text-base font-bold text-slate-900 dark:text-white">Document & PDF Tools</h3>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
              Fast manipulation of documents including PDF merging, splitting, page extraction, image-to-PDF conversion, and client-side document structuring.
            </p>
          </div>

          <div className="p-5 rounded-xl glass-panel border border-slate-200/80 dark:border-slate-800/80 flex flex-col gap-2">
            <h3 className="text-base font-bold text-slate-900 dark:text-white">Image & Graphic Utilities</h3>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
              Format conversion across JPEG, PNG, WebP, and SVG, lossless/lossy compression, dimension scaling, and canvas-based optimizations.
            </p>
          </div>

          <div className="p-5 rounded-xl glass-panel border border-slate-200/80 dark:border-slate-800/80 flex flex-col gap-2">
            <h3 className="text-base font-bold text-slate-900 dark:text-white">Everyday Productive Helpers</h3>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
              Customizable QR code generation, unit conversions, text case formatting, and everyday calculation tools designed for immediate utility.
            </p>
          </div>

          <div className="p-5 rounded-xl glass-panel border border-slate-200/80 dark:border-slate-800/80 flex flex-col gap-2">
            <h3 className="text-base font-bold text-slate-900 dark:text-white">Developer & Technical Aids</h3>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
              Data parsers, code formatters, hash generation, and encoding utilities designed to run with instant feedback and zero latency.
            </p>
          </div>
        </div>
      </section>

      {/* Section 3: Responsible Data Handling & Architecture */}
      <section aria-labelledby="privacy-heading" className="flex flex-col gap-4">
        <h2
          id="privacy-heading"
          className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2"
        >
          <Lock className="w-5 h-5 text-emerald-500" aria-hidden="true" />
          <span>Responsible Data Handling</span>
        </h2>
        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
          We maintain a clear standard regarding user data:
        </p>
        <ul className="flex flex-col gap-2.5 text-sm sm:text-base text-slate-600 dark:text-slate-300 list-disc pl-5">
          <li>
            <strong className="text-slate-900 dark:text-white font-semibold">Client-Side by Default:</strong> For all browser-native tools, your files remain strictly inside your device&apos;s volatile memory. Processing happens locally via your browser&apos;s JavaScript engine.
          </li>
          <li>
            <strong className="text-slate-900 dark:text-white font-semibold">Transparent Architecture:</strong> We do not make sweeping unsupported claims. If a future tool requires external server computational capabilities (such as heavy OCR or machine translation models), that specific utility will clearly state its processing nature.
          </li>
          <li>
            <strong className="text-slate-900 dark:text-white font-semibold">No File Harvesting:</strong> We do not collect, archive, sell, or analyze your uploaded documents, images, or payloads.
          </li>
          <li>
            <strong className="text-slate-900 dark:text-white font-semibold">Zero Persistent Tracking of Content:</strong> Analytics on our platform track only anonymous usage counts and error codes. We never log file contents, filenames, or personal details.
          </li>
        </ul>
      </section>

      {/* Section 4: Accessibility & Engineering Standards */}
      <section aria-labelledby="accessibility-heading" className="flex flex-col gap-4">
        <h2
          id="accessibility-heading"
          className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2"
        >
          <Eye className="w-5 h-5 text-purple-500" aria-hidden="true" />
          <span>Accessibility & Usability Focus</span>
        </h2>
        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
          Software should be inclusive and straightforward. AHADEX TOOLS is engineered with:
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/60 dark:border-slate-800">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-1">Keyboard Navigation</h3>
            <p className="text-xs text-slate-600 dark:text-slate-400">
              Complete tab traversal, logical focus order, and visible focus rings on all interactive elements.
            </p>
          </div>
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/60 dark:border-slate-800">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-1">Contrast & Theming</h3>
            <p className="text-xs text-slate-600 dark:text-slate-400">
              High-contrast text tokens across both Light and Dark modes to reduce eye strain in any lighting condition.
            </p>
          </div>
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/60 dark:border-slate-800">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-1">Lightweight Footprint</h3>
            <p className="text-xs text-slate-600 dark:text-slate-400">
              Minimal external dependencies, no bloated tracking libraries, and instant client-side responses.
            </p>
          </div>
        </div>
      </section>

      {/* Section 5: Trust & Legal Links */}
      <footer className="pt-8 border-t border-slate-200/80 dark:border-slate-800/80 flex flex-col gap-4">
        <h2 className="text-sm font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
          Related Institutional Pages
        </h2>
        <div className="flex flex-wrap gap-3">
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
