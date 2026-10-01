import { Link } from "react-router-dom";
import { Logo } from "@components/common/Logo";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative mt-24 border-t border-silk-rose/20 bg-gradient-to-b from-transparent to-silk-sand/20 dark:to-dark-surface/40">
      <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          <div className="md:col-span-2">
            <Logo size="md" />
            <p className="mt-5 max-w-sm text-sm text-light-textSecondary dark:text-dark-textSecondary leading-relaxed">
              Free, fast and private online tools for everyday digital tasks.
              Everything runs in your browser.
            </p>
          </div>

          <div>
            <h3 className="font-display text-sm uppercase tracking-widest font-semibold text-silk-wine dark:text-silk-rose mb-4">
              Tools
            </h3>
            <ul className="space-y-2.5">
              <li><Link to="/tools" className="text-sm text-light-textSecondary dark:text-dark-textSecondary hover:text-silk-rose transition-colors">All Tools</Link></li>
              <li><Link to="/categories/image" className="text-sm text-light-textSecondary dark:text-dark-textSecondary hover:text-silk-rose transition-colors">Image Tools</Link></li>
              <li><Link to="/categories/pdf" className="text-sm text-light-textSecondary dark:text-dark-textSecondary hover:text-silk-rose transition-colors">PDF Tools</Link></li>
              <li><Link to="/categories/qr" className="text-sm text-light-textSecondary dark:text-dark-textSecondary hover:text-silk-rose transition-colors">QR & Barcode</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-display text-sm uppercase tracking-widest font-semibold text-silk-wine dark:text-silk-rose mb-4">
              Company
            </h3>
            <ul className="space-y-2.5">
              <li><Link to="/about" className="text-sm text-light-textSecondary dark:text-dark-textSecondary hover:text-silk-rose transition-colors">About</Link></li>
              <li><Link to="/contact" className="text-sm text-light-textSecondary dark:text-dark-textSecondary hover:text-silk-rose transition-colors">Contact</Link></li>
              <li><Link to="/privacy" className="text-sm text-light-textSecondary dark:text-dark-textSecondary hover:text-silk-rose transition-colors">Privacy</Link></li>
              <li><Link to="/terms" className="text-sm text-light-textSecondary dark:text-dark-textSecondary hover:text-silk-rose transition-colors">Terms</Link></li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-silk-rose/15 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-light-textSecondary/70 dark:text-dark-textSecondary/70">
            © {year} AHADEX Tools. Made with care.
          </p>
          <p className="text-xs text-light-textSecondary/70 dark:text-dark-textSecondary/70">
            ahadex.fun
          </p>
        </div>
      </div>
    </footer>
  );
}
