import { useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { X, Home, Info, Mail } from "lucide-react";
import { cn } from "@lib/cn";
import { ToolIcon } from "@components/common/ToolIcon";
import { categories } from "@data/categories";
import { useLanguage } from "@contexts/LanguageContext";

interface LeftSidebarProps {
  mobileOpen: boolean;
  onMobileClose: () => void;
}

const MAIN_ICONS = { home: Home, about: Info, contact: Mail };

function SidebarBody({ onClose }: { onClose?: () => void }) {
  const location = useLocation();
  const { t } = useLanguage();

  const mainLinks = [
    { to: "/", label: t.nav.home, Icon: MAIN_ICONS.home, key: "home" },
    { to: "/about", label: t.nav.about, Icon: MAIN_ICONS.about, key: "about" },
    { to: "/contact", label: t.nav.contact, Icon: MAIN_ICONS.contact, key: "contact" },
  ];

  return (
    <div className="flex flex-col h-full bg-silk-cream dark:bg-dark-bg transition-colors duration-500">
      {onClose && (
        <div className="flex items-center justify-between px-5 h-16 border-b border-silk-rose/20 shrink-0">
          <span className="font-display font-black text-xl text-silk-gradient dark:text-silk-gradient-dark">
            AHADEX
          </span>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="w-10 h-10 rounded-xl flex items-center justify-center bg-silk-rose/10 text-silk-wine dark:text-silk-rose hover:bg-silk-rose/20 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      )}

      <div className="p-4 space-y-1 shrink-0">
        {mainLinks.map(({ to, label, Icon }) => {
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

      <div className="p-4 flex-1 overflow-y-auto">
        <p className="px-3 mb-3 text-[11px] uppercase tracking-[0.2em] text-silk-wine/60 dark:text-silk-rose/50 font-semibold">
          {t.sidebar.categories}
        </p>
        <div className="space-y-1">
          {categories.map((cat) => {
            const to = `/categories/${cat.slug}`;
            const active = location.pathname === to;
            const localizedName = t.categories[cat.id as keyof typeof t.categories] ?? cat.name;
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
                <span className="flex-1 truncate">{localizedName}</span>
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
              {t.sidebar.private}
            </span>{" "}
            {t.sidebar.privateDesc}
          </p>
        </div>
      </div>
    </div>
  );
}

export function LeftSidebar({ mobileOpen, onMobileClose }: LeftSidebarProps) {
  useEffect(() => {
    if (mobileOpen) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

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
      <aside className="hidden lg:flex fixed top-0 left-0 bottom-0 w-64 border-r border-silk-rose/15 bg-silk-cream/70 dark:bg-dark-bg/70 backdrop-blur-xl overflow-y-auto z-30 pt-24 flex-col transition-colors duration-500">
        <SidebarBody />
      </aside>

      {mobileOpen && (
        <div className="lg:hidden">
          <button
            type="button"
            aria-label="Close"
            onClick={onMobileClose}
            className="fixed inset-0 z-[80] bg-silk-plum/60 backdrop-blur-sm cursor-default"
          />
          <div className="fixed top-0 left-0 bottom-0 z-[81] w-[85vw] max-w-sm shadow-2xl bg-silk-cream dark:bg-dark-bg transition-colors duration-500">
            <SidebarBody onClose={onMobileClose} />
          </div>
        </div>
      )}
    </>
  );
}
