import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { Menu, Search, Sliders, X, Command } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@lib/cn";
import { Logo } from "@components/common/Logo";
import { LiveText } from "@components/common/LiveText";

interface HeaderProps {
  onLeftMenuClick: () => void;
  onRightMenuClick: () => void;
}

const NAV_LINKS = [
  { to: "/", label: "Home" },
  { to: "/tools", label: "Tools" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
];

export function Header({ onLeftMenuClick, onRightMenuClick }: HeaderProps) {
  const [scrolled, setScrolled] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

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
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-silk",
        scrolled ? "pt-2 lg:pt-3" : "pt-3 lg:pt-5"
      )}
    >
      <div className="mx-auto max-w-[1600px] px-3 sm:px-5 lg:px-6">
        {/* Floating glass bar */}
        <div
          className={cn(
            "relative flex items-center justify-between gap-3 transition-all duration-500 ease-silk",
            "rounded-2xl lg:rounded-[24px]",
            scrolled
              ? "h-14 lg:h-16 px-3 lg:px-5 bg-silk-cream/85 dark:bg-dark-bg/85 backdrop-blur-2xl border border-silk-rose/25 shadow-[0_8px_30px_-8px_rgba(139,58,79,0.2)]"
              : "h-16 lg:h-[72px] px-4 lg:px-6 bg-silk-cream/60 dark:bg-dark-bg/60 backdrop-blur-xl border border-silk-rose/15 shadow-silk-soft"
          )}
        >
          {/* Top rose accent line */}
          <span
            aria-hidden="true"
            className={cn(
              "absolute top-0 left-1/2 -translate-x-1/2 rounded-full bg-gradient-to-r from-transparent via-silk-rose to-transparent transition-all duration-700",
              scrolled ? "h-[2px] w-32" : "h-[2px] w-16"
            )}
          />

          {/* ── LEFT: menu (mobile) + logo ── */}
          <div className="flex items-center gap-2 sm:gap-3 min-w-0">
            <button
              type="button"
              onClick={onLeftMenuClick}
              aria-label="Open menu"
              className={cn(
                "lg:hidden inline-flex items-center justify-center w-10 h-10 rounded-xl shrink-0",
                "bg-silk-rose/10 border border-silk-rose/25 text-silk-wine dark:text-silk-rose-soft",
                "hover:bg-silk-rose/20 hover:scale-105 active:scale-95 transition-all duration-300"
              )}
            >
              <Menu className="w-5 h-5" />
            </button>

            <Logo size={scrolled ? "sm" : "md"} showText />
          </div>

          {/* ── CENTER (desktop): nav ── */}
          <nav className="hidden lg:flex items-center gap-1 absolute left-1/2 -translate-x-1/2">
            {NAV_LINKS.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) =>
                  cn(
                    "relative px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300",
                    "hover:text-silk-wine dark:hover:text-silk-rose-soft",
                    isActive
                      ? "text-silk-wine dark:text-silk-rose-soft"
                      : "text-light-textSecondary dark:text-dark-textSecondary"
                  )
                }
              >
                {({ isActive }) => (
                  <>
                    <LiveText
                      text={link.label}
                      waveAmplitude={3}
                      waveDuration={3}
                      letterStagger={0.06}
                    />
                    {isActive && (
                      <motion.span
                        layoutId="header-nav-active"
                        className="absolute -bottom-0.5 left-3 right-3 h-[2px] bg-gradient-to-r from-silk-rose to-silk-gold rounded-full"
                        transition={{ type: "spring", stiffness: 500, damping: 32 }}
                      />
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
                "bg-silk-rose/8 border border-silk-rose/20 hover:border-silk-rose/45",
                "text-light-textSecondary dark:text-dark-textSecondary hover:text-silk-wine dark:hover:text-silk-rose-soft",
                "transition-all duration-300",
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
                "hover:bg-silk-rose/20 hover:scale-105 active:scale-95 transition-all duration-300",
                searchOpen && "bg-silk-rose/25 border-silk-rose/45"
              )}
            >
              <AnimatePresence mode="wait" initial={false}>
                {searchOpen ? (
                  <motion.span
                    key="x"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <X className="w-5 h-5" />
                  </motion.span>
                ) : (
                  <motion.span
                    key="s"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Search className="w-5 h-5" />
                  </motion.span>
                )}
              </AnimatePresence>
            </button>

            {/* Version pill (desktop only) */}
            <Link
              to="/about"
              className="hidden xl:inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-full bg-silk-rose/8 border border-silk-rose/20 hover:border-silk-rose/40 transition-colors"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-silk-rose animate-soft-pulse" />
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
                "bg-silk-rose/10 border border-silk-rose/25 text-silk-wine dark:text-silk-rose-soft",
                "hover:bg-silk-rose/20 hover:scale-105 active:scale-95 transition-all duration-300"
              )}
            >
              <Sliders className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Search panel — slides down */}
        <AnimatePresence>
          {searchOpen && (
            <motion.div
              initial={{ opacity: 0, y: -8, height: 0 }}
              animate={{ opacity: 1, y: 0, height: "auto" }}
              exit={{ opacity: 0, y: -8, height: 0 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="overflow-hidden mt-2"
            >
              <div
                className={cn(
                  "relative rounded-2xl overflow-hidden",
                  "bg-silk-cream/95 dark:bg-dark-bg/95 backdrop-blur-2xl",
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
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}
