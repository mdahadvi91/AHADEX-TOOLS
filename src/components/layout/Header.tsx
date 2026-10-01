import { Link } from "react-router-dom";
import { Logo } from "@components/common/Logo";

export function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-silk-cream/80 dark:bg-dark-bg/80 backdrop-blur-xl border-b border-silk-rose/15">
      <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          <Logo size="md" />

          <nav className="hidden md:flex items-center gap-8">
            <Link
              to="/"
              className="text-sm font-medium text-light-textSecondary dark:text-dark-textSecondary hover:text-silk-rose transition-colors"
            >
              Home
            </Link>
            <Link
              to="/tools"
              className="text-sm font-medium text-light-textSecondary dark:text-dark-textSecondary hover:text-silk-rose transition-colors"
            >
              Tools
            </Link>
            <Link
              to="/about"
              className="text-sm font-medium text-light-textSecondary dark:text-dark-textSecondary hover:text-silk-rose transition-colors"
            >
              About
            </Link>
            <Link
              to="/contact"
              className="text-sm font-medium text-light-textSecondary dark:text-dark-textSecondary hover:text-silk-rose transition-colors"
            >
              Contact
            </Link>
          </nav>

          <Link
            to="/tools"
            className="hidden sm:inline-flex px-5 py-2.5 rounded-full bg-gradient-to-r from-silk-rose to-silk-wine-deep text-white text-sm font-medium shadow-silk-soft hover:shadow-silk-medium transition-all"
          >
            Browse Tools
          </Link>
        </div>
      </div>
    </header>
  );
}
