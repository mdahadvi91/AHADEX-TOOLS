import React from 'react';
import { Link } from 'react-router-dom';
import { Eye, CheckCircle2, Sliders, Smartphone, Globe, MessageSquare, ShieldCheck } from 'lucide-react';
import { AnimatedBackButton } from '@/src/components/common';
import { useSEO } from '@/src/lib/seo';
import { SITE_CONFIG } from '@/src/data/site';

/**
 * Production Accessibility Statement Page for AHADEX TOOLS.
 * Outlines our accessibility architecture, keyboard controls, contrast guidelines,
 * motion preferences, and ongoing usability evaluation methods.
 */
export default function AccessibilityPage() {
  useSEO({
    title: 'Accessibility Statement',
    description: 'Learn about our commitment to digital accessibility, keyboard navigation, contrast standards, and inclusive usability on AHADEX TOOLS.',
    path: '/accessibility',
    breadcrumbs: [
      { name: 'Home', path: '/' },
      { name: 'Accessibility Statement', path: '/accessibility' },
    ],
  });

  return (
    <article
      id="ahadex-accessibility-page"
      className="w-full max-w-4xl mx-auto py-6 sm:py-10 px-4 sm:px-6 flex flex-col gap-10 animate-fade-in"
    >
      {/* Top Breadcrumb / Back Bar */}
      <div className="flex items-center justify-between gap-4">
        <AnimatedBackButton fallbackPath="/" label="Back to Tools" />
        <span className="text-xs font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500">
          Inclusion & Standards
        </span>
      </div>

      {/* Header */}
      <header className="flex flex-col gap-3 pb-6 border-b border-slate-200/80 dark:border-slate-800/80">
        <div className="inline-flex items-center gap-2 text-xs font-semibold text-sky-600 dark:text-sky-400 uppercase tracking-wider">
          <Eye className="w-4 h-4" aria-hidden="true" />
          <span>Statement of Commitment</span>
        </div>
        <h1
          id="accessibility-title"
          className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white"
        >
          Accessibility <span className="text-sky-600 dark:text-sky-400">Statement</span>
        </h1>
        <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed max-w-2xl">
          AHADEX TOOLS is committed to ensuring digital accessibility for people with disabilities. We continually refine the user experience to ensure our software utilities are inclusive, clear, and easy to operate for everyone.
        </p>
      </header>

      {/* 1. Core Principles */}
      <section aria-labelledby="principles-heading" className="flex flex-col gap-4">
        <h2
          id="principles-heading"
          className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2"
        >
          <ShieldCheck className="w-5 h-5 text-emerald-500" aria-hidden="true" />
          <span>1. Our Accessibility Principles</span>
        </h2>
        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
          We believe that utilities like file converters and document processors should be equally accessible to all individuals, regardless of ability, device type, or assistive technology. We align our design and engineering practices with the Web Content Accessibility Guidelines (WCAG) 2.1 Level AA recommendations.
        </p>
      </section>

      {/* 2. Key Accessible Features Implemented */}
      <section aria-labelledby="features-heading" className="flex flex-col gap-4">
        <h2
          id="features-heading"
          className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white"
        >
          2. Built-in Accessibility Features
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="p-5 rounded-xl glass-panel border border-slate-200/80 dark:border-slate-800/80 flex flex-col gap-2">
            <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-sky-500" />
              <span>Full Keyboard Navigation</span>
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
              Every interactive element—including navigation links, buttons, file dropzones, and modal dialogs—is reachable and operable using standard Tab, Shift+Tab, Enter, Space, and Escape keys.
            </p>
          </div>

          <div className="p-5 rounded-xl glass-panel border border-slate-200/80 dark:border-slate-800/80 flex flex-col gap-2">
            <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-500" />
              <span>Visible Focus Indicators</span>
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
              We provide prominent, high-contrast outline focus rings on focused controls, ensuring that keyboard and switch-device users can always pinpoint their current screen position.
            </p>
          </div>

          <div className="p-5 rounded-xl glass-panel border border-slate-200/80 dark:border-slate-800/80 flex flex-col gap-2">
            <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-indigo-500" />
              <span>Contrast & Dual Themes</span>
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
              Both Light and Dark modes are engineered to provide strong contrast ratios that meet or exceed WCAG AA requirements for body text and interactive controls. Information is never conveyed by color alone.
            </p>
          </div>

          <div className="p-5 rounded-xl glass-panel border border-slate-200/80 dark:border-slate-800/80 flex flex-col gap-2">
            <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-purple-500" />
              <span>Semantic Landmark Structure</span>
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
              Pages are structured using standard HTML5 landmarks (<code className="text-xs bg-slate-100 dark:bg-slate-800 px-1 py-0.5 rounded">&lt;header&gt;</code>, <code className="text-xs bg-slate-100 dark:bg-slate-800 px-1 py-0.5 rounded">&lt;main&gt;</code>, <code className="text-xs bg-slate-100 dark:bg-slate-800 px-1 py-0.5 rounded">&lt;nav&gt;</code>, <code className="text-xs bg-slate-100 dark:bg-slate-800 px-1 py-0.5 rounded">&lt;footer&gt;</code>) and hierarchical heading levels for screen reader navigability.
            </p>
          </div>

          <div className="p-5 rounded-xl glass-panel border border-slate-200/80 dark:border-slate-800/80 flex flex-col gap-2">
            <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Smartphone className="w-4 h-4 text-pink-500" />
              <span>Touch Target Sizing</span>
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
              Touch targets on mobile viewports are sized to at least 44x44 pixels with generous surrounding padding to prevent accidental activations.
            </p>
          </div>

          <div className="p-5 rounded-xl glass-panel border border-slate-200/80 dark:border-slate-800/80 flex flex-col gap-2">
            <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Globe className="w-4 h-4 text-cyan-500" />
              <span>RTL & Internationalization</span>
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
              Support for right-to-left scripts (such as Arabic) includes mirrored layouts and dynamic <code className="text-xs bg-slate-100 dark:bg-slate-800 px-1 py-0.5 rounded">dir=&quot;rtl&quot;</code> attributes to ensure natural reading flow.
            </p>
          </div>
        </div>
      </section>

      {/* 3. Reduced Motion Support */}
      <section aria-labelledby="motion-heading" className="flex flex-col gap-4">
        <h2
          id="motion-heading"
          className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2"
        >
          <Sliders className="w-5 h-5 text-indigo-500" aria-hidden="true" />
          <span>3. Reduced Motion Considerations</span>
        </h2>
        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
          For users who experience vestibular discomfort or motion sensitivity, our application honors the system-level <code className="text-xs bg-slate-100 dark:bg-slate-800 px-1.5 py-0.5 rounded">prefers-reduced-motion</code> setting, disabling or substituting decorative animations with immediate transitions.
        </p>
      </section>

      {/* 4. Continual Testing & Feedback */}
      <section aria-labelledby="feedback-heading" className="flex flex-col gap-4 p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200/80 dark:border-slate-800">
        <h2
          id="feedback-heading"
          className="text-base sm:text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2"
        >
          <MessageSquare className="w-5 h-5 text-sky-500" aria-hidden="true" />
          <span>4. Reporting Accessibility Barriers</span>
        </h2>
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
          We actively test our application with modern browsers and assistive technologies. Despite our efforts, certain dynamic operations (such as canvas image manipulation or drag-and-drop file reordering) may present occasional hurdles on specific assistive tools.
        </p>
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
          If you encounter any accessibility barrier or have recommendations for improving accessibility on AHADEX TOOLS, please visit our{' '}
          <Link to="/contact" className="text-sky-600 dark:text-sky-400 underline underline-offset-2 hover:text-sky-500">
            Contact Guidance
          </Link>{' '}
          page to let us know. Please specify the webpage or tool and the assistive technology you were using.
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
