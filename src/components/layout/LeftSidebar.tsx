import { useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { X, Home, Wrench, Info, Mail } from "lucide-react";
import { cn } from "@lib/cn";
import { ToolIcon } from "@components/common/ToolIcon";
import { categories } from "@data/categories";

interface LeftSidebarProps {
  mobileOpen: boolean;
  onMobileClose: () => void;
}

const MAIN_LINKS = [
  { to: "/", label: "Home", Icon: Home },
  { to: "/tools", label: "All Tools", Icon: Wrench },
  { to: "/about", label: "About", Icon: Info },
  { to: "/contact", label: "Contact", Icon: Mail },
];

function SidebarBody({ onClose }: { onClose?: () => void }) {
  const location = useLocation();

  return (
    <div className="flex flex-col h-full bg-silk-cream dark:bg-dark-bg">
      {/* Close bar — visible on mobile */}
      {onClose && (
        <div className="flex items-center justify-between px-5 h-16 border-b border-silk-rose/20 shrink-0">
          <span className="font-display font-black text-xl text-silk-gradient dark:text-silk-gradient-dark">
            AHADEX
          </span>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close menu"
            className="w-10 h-10 rounded-xl flex items-center justify-center bg-silk-rose/10 text-silk-wine dark:text-silk-rose hover:bg-silk-rose/20 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      )}

      {/* Main links */}
      <div className="p-4 space-y-1 shrink-0">
        {MAIN_LINKS.map(({ to, label, Icon }) => {
          const active =
            to === "/"
              ? location.pathname === "/"
              : location.pathname.startsWith(to);
          return (
            <NavLink
              key={to}
              to={to}
              onClick={onClose}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all",
                active
                  ? "bg-silk-rose/15 text-silk-wine dark:text-silk-rose-soft"
                  : "text-light-textSecondary dark:text-dark-textSecondary hover:text-silk-wine dark:hover:text-silk-rose-soft hover:bg-silk-rose/8"
              )}
            >
              <Icon className="w-4 h-4 shrink-0" />
              {label}
            </NavLink>
          );
        })}
      </div>

      <div className="mx-4 h-px bg-silk-rose/20 shrink-0" />

      {/* Categories */}
      <div className="p-4 flex-1 overflow-y-auto">
        <p className="px-3 mb-3 text-[11px] uppercase tracking-[0.2em] text-silk-wine/60 dark:text-silk-rose/50 font-semibold">
          Categories
        </p>
        <div className="space-y-1">
          {categories.map((cat) => {
            const to = `/categories/${cat.slug}`;
            const active = location.pathname === to;
            return (
              <NavLink
                key={cat.id}
                to={to}
                onClick={onClose}
                className={cn(
                  "flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-all",
                  active
                    ? "bg-silk-rose/15 text-silk-wine dark:text-silk-rose-soft"
                    : "text-light-textSecondary dark:text-dark-textSecondary hover:text-silk-wine dark:hover:text-silk-rose-soft hover:bg-silk-rose/8"
                )}
              >
                <span className="w-5 h-5 flex items-center justify-center shrink-0">
                  <ToolIcon category={cat.id} size={16} />
                </span>
                <span className="flex-1 truncate">{cat.name}</span>
                <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-silk-rose/12 text-silk-wine dark:text-silk-rose-soft">
                  {cat.count}
                </span>
              </NavLink>
            );
          })}
        </div>
      </div>

      <div className="p-4 shrink-0">
        <div className="p-3 rounded-xl bg-silk-rose/8 border border-silk-rose/20">
          <p className="text-xs text-light-textSecondary dark:text-dark-textSecondary leading-relaxed">
            <span className="text-silk-wine dark:text-silk-rose-soft font-medium">
              100% Private.
            </span>{" "}
            Runs in your browser.
          </p>
        </div>
      </div>
    </div>
  );
}

export function LeftSidebar({ mobileOpen, onMobileClose }: LeftSidebarProps) {
  // Body scroll lock
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  // Escape key
  useEffect(() => {
    if (!mobileOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onMobileClose();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [mobileOpen, onMobileClose]);

  return (
    <>
      {/* DESKTOP — always visible sidebar (lg+) */}
      <aside className="hidden lg:flex fixed top-0 left-0 bottom-0 w-64 border-r border-silk-rose/15 bg-silk-cream/70 dark:bg-dark-bg/70 backdrop-blur-xl overflow-y-auto z-30 pt-24 flex-col">
        <SidebarBody />
      </aside>

      {/* MOBILE — conditional render, no AnimatePresence */}
      {mobileOpen && (
        <div className="lg:hidden">
          {/* Backdrop — click to close */}
          <button
            type="button"
            aria-label="Close menu"
            onClick={onMobileClose}
            className="fixed inset-0 z-[80] bg-silk-plum/60 backdrop-blur-sm cursor-default"
          />

          {/* Drawer */}
          <div
            className="fixed top-0 left-0 bottom-0 z-[81] w-[85vw] max-w-sm shadow-2xl bg-silk-cream dark:bg-dark-bg"
            role="dialog"
            aria-modal="true"
            aria-label="Menu"
          >
            <SidebarBody onClose={onMobileClose} />
          </div>
        </div>
      )}
    </>
  );
}
