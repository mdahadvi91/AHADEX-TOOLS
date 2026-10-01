import { useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { X, Home, Wrench, Info, Mail, Image, FileText, QrCode, Type, Code2, Calculator } from "lucide-react";
import { cn } from "@lib/cn";

interface LeftSidebarProps {
  mobileOpen: boolean;
  onMobileClose: () => void;
}

const CATEGORIES = [
  { slug: "image", name: "Image Tools", Icon: Image, count: 12 },
  { slug: "pdf", name: "PDF Tools", Icon: FileText, count: 8 },
  { slug: "qr", name: "QR & Barcode", Icon: QrCode, count: 8 },
  { slug: "text", name: "Text Tools", Icon: Type, count: 6 },
  { slug: "developer", name: "Developer", Icon: Code2, count: 3 },
  { slug: "calculators", name: "Calculators", Icon: Calculator, count: 5 },
];

const MAIN = [
  { to: "/", label: "Home", Icon: Home },
  { to: "/tools", label: "All Tools", Icon: Wrench },
  { to: "/about", label: "About", Icon: Info },
  { to: "/contact", label: "Contact", Icon: Mail },
];

function SidebarContent({ onLinkClick }: { onLinkClick?: () => void }) {
  const location = useLocation();

  return (
    <div className="flex flex-col h-full">
      {/* Brand (mobile only) */}
      <div className="lg:hidden flex items-center justify-between px-5 h-16 border-b border-silk-rose/15 shrink-0">
        <span className="font-display font-black text-xl text-silk-gradient dark:text-silk-gradient-dark">
          AHADEX
        </span>
        <button
          type="button"
          onClick={onLinkClick}
          aria-label="Close menu"
          className="w-9 h-9 rounded-lg flex items-center justify-center text-silk-wine dark:text-silk-rose hover:bg-silk-rose/10"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Main nav */}
      <div className="p-4 space-y-1 shrink-0">
        {MAIN.map(({ to, label, Icon }) => {
          const active = to === "/" ? location.pathname === "/" : location.pathname.startsWith(to);
          return (
            <NavLink
              key={to}
              to={to}
              onClick={onLinkClick}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all",
                active
                  ? "bg-silk-rose/15 text-silk-wine dark:text-silk-rose shadow-silk-soft"
                  : "text-light-textSecondary dark:text-dark-textSecondary hover:text-silk-rose hover:bg-silk-rose/8"
              )}
            >
              <Icon className="w-4 h-4 shrink-0" />
              {label}
            </NavLink>
          );
        })}
      </div>

      {/* Divider */}
      <div className="mx-4 h-px bg-silk-rose/15 shrink-0" />

      {/* Categories */}
      <div className="p-4 flex-1 overflow-y-auto">
        <p className="px-3 mb-3 text-[11px] uppercase tracking-[0.15em] text-silk-wine/60 dark:text-silk-rose/50 font-semibold">
          Categories
        </p>
        <div className="space-y-1">
          {CATEGORIES.map((cat) => {
            const to = `/categories/${cat.slug}`;
            const active = location.pathname === to;
            return (
              <NavLink
                key={cat.slug}
                to={to}
                onClick={onLinkClick}
                className={cn(
                  "flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-all",
                  active
                    ? "bg-silk-rose/12 text-silk-wine dark:text-silk-rose"
                    : "text-light-textSecondary dark:text-dark-textSecondary hover:text-silk-rose hover:bg-silk-rose/8"
                )}
              >
                <cat.Icon className="w-4 h-4 shrink-0" />
                <span className="flex-1 truncate">{cat.name}</span>
                <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-silk-rose/10 text-silk-rose">
                  {cat.count}
                </span>
              </NavLink>
            );
          })}
        </div>
      </div>

      {/* Footer note */}
      <div className="p-4 shrink-0">
        <div className="p-3 rounded-xl bg-silk-rose/5 border border-silk-rose/15">
          <p className="text-xs text-light-textSecondary dark:text-dark-textSecondary leading-relaxed">
            <span className="text-silk-wine dark:text-silk-rose font-medium">100% Private.</span>{" "}
            Runs in your browser.
          </p>
        </div>
      </div>
    </div>
  );
}

export function LeftSidebar({ mobileOpen, onMobileClose }: LeftSidebarProps) {
  useEffect(() => {
    if (!mobileOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onMobileClose();
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [mobileOpen, onMobileClose]);

  return (
    <>
      {/* DESKTOP — fixed left sidebar */}
      <aside
        className="hidden lg:block fixed top-20 left-0 bottom-0 w-64 border-r border-silk-rose/15 bg-silk-cream/50 dark:bg-dark-bg/50 backdrop-blur-xl overflow-y-auto z-30"
        aria-label="Tools navigation"
      >
        <SidebarContent />
      </aside>

      {/* MOBILE — slide-in drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={onMobileClose}
              className="fixed inset-0 z-[60] bg-silk-plum/60 backdrop-blur-sm lg:hidden"
            />
            <motion.aside
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", stiffness: 380, damping: 34 }}
              className="fixed top-0 left-0 bottom-0 z-[61] w-[85vw] max-w-sm bg-silk-cream dark:bg-dark-bg shadow-2xl lg:hidden"
            >
              <SidebarContent onLinkClick={onMobileClose} />
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
