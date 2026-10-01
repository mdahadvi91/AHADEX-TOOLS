import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Sun, Moon, Monitor, Volume2, VolumeX, Globe, Github, Mail } from "lucide-react";
import { cn } from "@lib/cn";
import { useSound } from "@contexts/SoundContext";
import { useTheme } from "@contexts/ThemeContext";
import { useLanguage } from "@contexts/LanguageContext";
import { APP_CONFIG } from "@constants/config";

interface RightSidebarProps {
  mobileOpen: boolean;
  onMobileClose: () => void;
}

const THEMES = [
  { value: "light", label: "Light", Icon: Sun },
  { value: "dark", label: "Dark", Icon: Moon },
  { value: "system", label: "System", Icon: Monitor },
] as const;

const LANGS = [
  { code: "en", native: "English", flag: "🇬🇧" },
  { code: "bn", native: "বাংলা", flag: "🇧🇩" },
  { code: "ar", native: "العربية", flag: "🇸🇦" },
] as const;

function PanelContent({ onClose }: { onClose?: () => void }) {
  const { soundEnabled, toggleSound } = useSound();
  const { theme, setTheme } = useTheme();
  const { language, setLanguage } = useLanguage();

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between px-5 h-16 border-b border-silk-rose/15 shrink-0">
        <span className="font-display font-bold text-lg text-silk-wine dark:text-silk-rose">
          Settings
        </span>
        {onClose && (
          <button
            type="button"
            onClick={onClose}
            aria-label="Close settings"
            className="lg:hidden w-9 h-9 rounded-lg flex items-center justify-center text-silk-wine dark:text-silk-rose hover:bg-silk-rose/10"
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      <div className="p-5 space-y-7 overflow-y-auto flex-1">
        {/* Theme */}
        <section>
          <p className="text-[11px] uppercase tracking-[0.15em] text-silk-wine/60 dark:text-silk-rose/50 font-semibold mb-3">
            Theme
          </p>
          <div className="grid grid-cols-3 gap-2">
            {THEMES.map(({ value, label, Icon }) => (
              <button
                key={value}
                type="button"
                onClick={() => setTheme(value)}
                className={cn(
                  "flex flex-col items-center gap-1.5 py-3 rounded-xl border transition-all",
                  theme === value
                    ? "bg-silk-rose/15 border-silk-rose/50 text-silk-wine dark:text-silk-rose shadow-silk-soft"
                    : "bg-silk-rose/5 border-silk-rose/15 text-light-textSecondary dark:text-dark-textSecondary hover:border-silk-rose/30"
                )}
              >
                <Icon className="w-4 h-4" />
                <span className="text-[10px] font-medium">{label}</span>
              </button>
            ))}
          </div>
        </section>

        {/* Language */}
        <section>
          <p className="text-[11px] uppercase tracking-[0.15em] text-silk-wine/60 dark:text-silk-rose/50 font-semibold mb-3">
            Language
          </p>
          <div className="space-y-2">
            {LANGS.map(({ code, native, flag }) => (
              <button
                key={code}
                type="button"
                onClick={() => setLanguage(code)}
                className={cn(
                  "w-full flex items-center gap-3 px-4 py-3 rounded-xl border transition-all text-left",
                  language === code
                    ? "bg-silk-rose/15 border-silk-rose/50"
                    : "bg-silk-rose/5 border-silk-rose/15 hover:border-silk-rose/30"
                )}
              >
                <span className="text-lg">{flag}</span>
                <span className="flex-1 text-sm font-medium text-light-text dark:text-dark-text">
                  {native}
                </span>
                {language === code && (
                  <span className="w-2 h-2 rounded-full bg-silk-rose" />
                )}
              </button>
            ))}
          </div>
        </section>

        {/* Sound */}
        <section>
          <p className="text-[11px] uppercase tracking-[0.15em] text-silk-wine/60 dark:text-silk-rose/50 font-semibold mb-3">
            Sound
          </p>
          <button
            type="button"
            onClick={toggleSound}
            className={cn(
              "w-full flex items-center gap-3 px-4 py-3 rounded-xl border transition-all",
              "bg-silk-rose/5 border-silk-rose/15 hover:border-silk-rose/30"
            )}
          >
            {soundEnabled ? (
              <Volume2 className="w-4 h-4 text-silk-rose" />
            ) : (
              <VolumeX className="w-4 h-4 text-light-textSecondary dark:text-dark-textSecondary" />
            )}
            <span className="flex-1 text-sm font-medium text-light-text dark:text-dark-text text-left">
              Sound Effects
            </span>
            <span
              className={cn(
                "relative w-10 h-6 rounded-full transition-colors",
                soundEnabled ? "bg-silk-rose" : "bg-silk-rose/20"
              )}
            >
              <span
                className={cn(
                  "absolute top-0.5 w-5 h-5 rounded-full bg-white shadow transition-transform",
                  soundEnabled ? "translate-x-4" : "translate-x-0.5"
                )}
              />
            </span>
          </button>
        </section>

        {/* Links */}
        <section>
          <p className="text-[11px] uppercase tracking-[0.15em] text-silk-wine/60 dark:text-silk-rose/50 font-semibold mb-3">
            More
          </p>
          <div className="space-y-2">
            <a
              href={APP_CONFIG.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 px-4 py-3 rounded-xl bg-silk-rose/5 border border-silk-rose/15 hover:border-silk-rose/30 transition-all text-light-textSecondary dark:text-dark-textSecondary hover:text-silk-rose"
            >
              <Github className="w-4 h-4" />
              <span className="text-sm">GitHub</span>
            </a>
            <a
              href={`mailto:${APP_CONFIG.email}`}
              className="flex items-center gap-3 px-4 py-3 rounded-xl bg-silk-rose/5 border border-silk-rose/15 hover:border-silk-rose/30 transition-all text-light-textSecondary dark:text-dark-textSecondary hover:text-silk-rose"
            >
              <Mail className="w-4 h-4" />
              <span className="text-sm">Contact</span>
            </a>
          </div>
        </section>
      </div>

      <div className="p-4 border-t border-silk-rose/15 shrink-0">
        <p className="text-xs text-center text-light-textSecondary/60 dark:text-dark-textSecondary/60">
          AHADEX Tools v1.0
        </p>
      </div>
    </div>
  );
}

export function RightSidebar({ mobileOpen, onMobileClose }: RightSidebarProps) {
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
      {/* DESKTOP — fixed right sidebar */}
      <aside
        className="hidden lg:block fixed top-20 right-0 bottom-0 w-72 border-l border-silk-rose/15 bg-silk-cream/50 dark:bg-dark-bg/50 backdrop-blur-xl overflow-y-auto z-30"
        aria-label="Settings"
      >
        <PanelContent />
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
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 380, damping: 34 }}
              className="fixed top-0 right-0 bottom-0 z-[61] w-[85vw] max-w-sm bg-silk-cream dark:bg-dark-bg shadow-2xl lg:hidden"
            >
              <PanelContent onClose={onMobileClose} />
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
