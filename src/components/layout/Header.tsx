import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { Menu, Search, Sliders, X, Command } from "lucide-react";
import { cn } from "@lib/cn";
import { Logo } from "@components/common/Logo";

interface HeaderProps {
  onLeftMenuClick: () => void;
  onRightMenuClick: () => void;
}

const NAV_LINKS = [
  { to: "/tools", label: "Tools" },
  { to: "/blog", label: "Blog" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
];

export function Header({ onLeftMenuClick, onRightMenuClick }: HeaderProps) {
  const [searchOpen, setSearchOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setSearchOpen(false);
  }, [location.pathname]);

  // Cmd+K shortcut
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setSearchOpen(true);
      }
      if (e.key === "Escape") setSearchOpen(false);
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 pt-3 lg:pt-5">
      <div className="mx-auto max-w-[1600px] px-3 sm:px-5 lg:px-6">
        {/* Floating glass bar - Static */}
        <div
          className={cn(
            "relative flex items-center justify-between gap-3",
            "rounded-2xl lg:rounded-[24px]",
            "h-16 lg:h-20 px-4 lg:px-6 bg-silk-cream/70 dark:bg-[#1A1114]/70 backdrop-blur-md border border-silk-rose/15 shadow-silk-soft"
          )}
        >
          {/* Top rose accent line - Static */}
          <span
            aria-hidden="true"
            className="absolute top-0 left-1/2 -translate-x-1/2 rounded-full bg-gradient-to-r from-transparent via-silk-rose to-transparent h-[2px] w-16"
          />

          {/* ── LEFT: menu (mobile) + logo ── */}
          <div className="flex items-center gap-2 sm:gap-3 min-w-0">
            <button
              type="button"
              onClick={onLeftMenuClick}
              aria-label="Open menu"
              className={cn(
                "lg:hidden inline-flex items-center justify-center w-10 h-10 rounded-xl shrink-0",
                "bg-silk-rose/10 border border-silk-rose/25 text-silk-wine dark:text-silk-rose-soft"
              )}
            >
              <Menu className="w-5 h-5" />
            </button>

            <Logo size="md" showText />
          </div>

          {/* ── CENTER (desktop): nav ── */}
          <nav className="hidden lg:flex items-center gap-1 absolute left-1/2 -translate-x-1/2">
            {NAV_LINKS.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) =>
                  cn(
                    "relative px-4 py-2 rounded-xl text-sm font-medium",
                    isActive
                      ? "text-silk-wine dark:text-silk-rose-soft"
                      : "text-light-textSecondary dark:text-dark-textSecondary"
                  )
                }
              >
                {({ isActive }) => (
                  <>
                    <span>{link.label}</span>
                    {isActive && (
                      <span className="absolute -bottom-0.5 left-3 right-3 h-[2px] bg-gradient-to-r from-silk-rose to-silk-gold rounded-full" />
                    )}
                  </>
                )}
              </NavLink>
            ))}
          </nav>

          {/* ── RIGHT: search + settings + version ── */}
          <div className="flex items-center gap-2">
            {/* Search trigger with ⌘K badge */}
            <button
              type="button"
              onClick={() => setSearchOpen((v) => !v)}
              aria-label={searchOpen ? "Close search" : "Open search"}
              className={cn(
                "group hidden sm:inline-flex items-center gap-2 pl-3 pr-2 py-2 rounded-xl",
                "bg-silk-rose/8 border border-silk-rose/20",
                "text-light-textSecondary dark:text-dark-textSecondary",
                searchOpen && "bg-silk-rose/20 border-silk-rose/50 text-silk-wine dark:text-silk-rose-soft"
              )}
            >
              <Search className="w-3.5 h-3.5" />
              <span className="text-xs font-medium">Search</span>
              <kbd className="flex items-center gap-0.5 px-1.5 py-0.5 rounded-md bg-silk-rose/15 text-silk-wine dark:text-silk-rose-soft text-[10px] font-mono border border-silk-rose/20">
                <Command className="w-2.5 h-2.5" />K
              </kbd>
            </button>

            {/* Mobile search icon */}
            <button
              type="button"
              onClick={() => setSearchOpen((v) => !v)}
              aria-label={searchOpen ? "Close search" : "Open search"}
              className={cn(
                "sm:hidden inline-flex items-center justify-center w-10 h-10 rounded-xl",
                "bg-silk-rose/10 border border-silk-rose/25 text-silk-wine dark:text-silk-rose-soft",
                searchOpen && "bg-silk-rose/25 border-silk-rose/45"
              )}
            >
              {searchOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Search className="w-5 h-5" />
              )}
            </button>

            {/* Version pill (desktop only) */}
            <Link
              to="/about"
              className="hidden xl:inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-full bg-silk-rose/8 border border-silk-rose/20"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-silk-rose" />
              <span className="text-[10px] font-mono font-medium text-silk-wine dark:text-silk-rose-soft tracking-wider">
                v1.0
              </span>
            </Link>

            {/* Settings */}
            <button
              type="button"
              onClick={onRightMenuClick}
              aria-label="Open settings"
              className={cn(
                "inline-flex items-center justify-center w-10 h-10 rounded-xl",
                "bg-silk-rose/10 border border-silk-rose/25 text-silk-wine dark:text-silk-rose-soft"
              )}
            >
              <Sliders className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Search panel */}
        {searchOpen && (
          <div className="mt-2">
            <div
              className={cn(
                "relative rounded-2xl overflow-hidden",
                "bg-silk-cream/95 dark:bg-[#1A1114]/95 backdrop-blur-md",
                "border border-silk-rose/25 shadow-[0_8px_30px_-8px_rgba(139,58,79,0.25)]"
              )}
            >
              <span
                aria-hidden="true"
                className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-silk-rose to-transparent"
              />
              <div className="flex items-center gap-3 px-5 py-4">
                <Search className="w-5 h-5 text-silk-rose shrink-0" />
                <input
                  type="text"
                  placeholder="Search tools — try 'JPG', 'PDF merge', 'QR'..."
                  autoFocus
                  className="flex-1 bg-transparent outline-none text-light-text dark:text-dark-text placeholder:text-light-textSecondary/60 dark:placeholder:text-dark-textSecondary/60"
                />
                <kbd className="hidden sm:inline-flex items-center px-2 py-1 rounded-md text-[10px] font-mono bg-silk-rose/10 text-silk-rose border border-silk-rose/20">
                  ESC
                </kbd>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
