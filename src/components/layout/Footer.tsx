import React from 'react';
import { Link } from 'react-router-dom';
import { Layers, ShieldCheck, Heart } from 'lucide-react';
import { CATEGORIES } from '@/src/data/categories';
import { COMPANY_NAV_ITEMS, LEGAL_NAV_ITEMS, ACCESSIBILITY_NAV_ITEMS } from '@/src/data/navigation';

/**
 * Global Footer Component for AHADEX TOOLS.
 * Establishes category index, company references, legal compliance links, and copyright statement.
 */
export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      id="ahadex-global-footer"
      className="w-full mt-auto border-t border-slate-200/80 dark:border-slate-800/80 bg-white/60 dark:bg-slate-900/60 backdrop-blur-md"
    >
      <div className="layout-container py-12">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-12">
          {/* Column 1: Brand & Philosophy */}
          <div className="col-span-2 flex flex-col gap-4">
            <Link
              to="/"
              className="flex items-center gap-2.5 group"
              aria-label="AHADEX TOOLS Home"
            >
              <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-sky-600 to-indigo-500 flex items-center justify-center text-white shadow-sm">
                <Layers className="w-4 h-4" aria-hidden="true" />
              </div>
              <span className="text-lg font-bold text-slate-900 dark:text-white">
                AHADEX<span className="text-sky-600 dark:text-sky-400 ml-1">TOOLS</span>
              </span>
            </Link>

            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 max-w-sm leading-relaxed">
              Fast, privacy-centric browser-native tools for images, PDFs, QR codes, and developer tasks.
              Zero file uploads required for client-side processing.
            </p>

            <div className="inline-flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
              <ShieldCheck className="w-4 h-4 text-emerald-500" aria-hidden="true" />
              <span>Client-side security and data privacy guaranteed</span>
            </div>
          </div>

          {/* Column 2: Tools / Categories */}
          <div className="flex flex-col gap-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white">
              Tools
            </h3>
            <ul className="flex flex-col gap-2 list-none p-0 m-0">
              {CATEGORIES.slice(0, 6).map((cat) => (
                <li key={cat.id}>
                  <Link
                    to={`/category/${cat.slug}`}
                    className="text-xs text-slate-600 dark:text-slate-400 hover:text-sky-600 dark:hover:text-sky-400 transition-colors"
                  >
                    {cat.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Company */}
          <div className="flex flex-col gap-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white">
              Company
            </h3>
            <ul className="flex flex-col gap-2 list-none p-0 m-0">
              {COMPANY_NAV_ITEMS.map((item) => (
                <li key={item.href}>
                  <Link
                    to={item.href}
                    className="text-xs text-slate-600 dark:text-slate-400 hover:text-sky-600 dark:hover:text-sky-400 transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Legal & Accessibility */}
          <div className="flex flex-col gap-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white">
              Legal & Standards
            </h3>
            <ul className="flex flex-col gap-2 list-none p-0 m-0">
              {LEGAL_NAV_ITEMS.map((item) => (
                <li key={item.href}>
                  <Link
                    to={item.href}
                    className="text-xs text-slate-600 dark:text-slate-400 hover:text-sky-600 dark:hover:text-sky-400 transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
              {ACCESSIBILITY_NAV_ITEMS.map((item) => (
                <li key={item.href}>
                  <Link
                    to={item.href}
                    className="text-xs text-slate-600 dark:text-slate-400 hover:text-sky-600 dark:hover:text-sky-400 transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar: Copyright */}
        <div className="pt-8 border-t border-slate-200/80 dark:border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 dark:text-slate-400">
          <p>© {currentYear} AHADEX TOOLS. All rights reserved.</p>
          <p className="flex items-center gap-1">
            <span>Built with precision for the modern web</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
