import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Menu, Search, Settings } from "lucide-react";
import { cn } from "@lib/cn";

interface HeaderProps {
  onLeftMenuClick: () => void;
  onRightMenuClick: () => void;
}

export function Header({ onLeftMenuClick, onRightMenuClick }: HeaderProps) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-40 transition-all duration-500",
        scrolled
          ? "bg-silk-cream/85 dark:bg-dark-bg/85 backdrop-blur-xl border-b border-silk-rose/15"
          : "bg-transparent"
      )}
    >
      <div className="mx-auto max-w-[1600px] px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20 gap-4">
          {/* LEFT: Menu button (mobile) / Nav link (desktop) */}
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={onLeftMenuClick}
              aria-label="Open menu"
              className="lg:hidden inline-flex items-center justify-center w-10 h-10 rounded-xl bg-silk-rose/10 border border-silk-rose/20 text-silk-wine dark:text-silk-rose hover:bg-silk-rose/20 transition-colors"
            >
              <Menu className="w-5 h-5" />
            </button>

            <Link
              to="/tools"
              className="hidden lg:inline-flex text-sm font-medium text-light-textSecondary dark:text-dark-textSecondary hover:text-silk-rose transition-colors tracking-wide"
            >
              TOOLS
            </Link>
          </div>

          {/* CENTER: Brand text (styled) */}
          <Link
            to="/"
            aria-label="AHADEX Tools — Home"
            className="group flex flex-col items-center focus-visible:outline-none"
          >
            <span className="relative flex items-baseline gap-2">
              <span className="font-display font-black text-2xl lg:text-3xl tracking-tight text-silk-gradient dark:text-silk-gradient-dark transition-all duration-500 group-hover:tracking-normal">
                AHADEX
              </span>
              <span className="font-script text-silk-rose text-lg lg:text-xl opacity-80 group-hover:opacity-100 transition-opacity">
                Tools
              </span>
            </span>
            <span
              aria-hidden="true"
              className="h-[1.5px] w-0 group-hover:w-full bg-gradient-to-r from-silk-rose to-silk-gold transition-all duration-500 ease-out mt-0.5"
            />
          </Link>

          {/* RIGHT: Search + Settings */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              aria-label="Search"
              className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-silk-rose/10 border border-silk-rose/20 text-silk-wine dark:text-silk-rose hover:bg-silk-rose/20 transition-colors"
            >
              <Search className="w-5 h-5" />
            </button>

            <button
              type="button"
              onClick={onRightMenuClick}
              aria-label="Settings"
              className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-silk-rose/10 border border-silk-rose/20 text-silk-wine dark:text-silk-rose hover:bg-silk-rose/20 transition-colors"
            >
              <Settings className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
