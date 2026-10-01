import { useEffect } from "react";
import { X, Sun, Moon, Monitor, Volume2, VolumeX, Github, Mail } from "lucide-react";
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
  { value: "light" as const, label: "Light", Icon: Sun },
  { value: "dark" as const, label: "Dark", Icon: Moon },
  { value: "system" as const, label: "System", Icon: Monitor },
];

const LANGS = [
  { code: "en" as const, native: "English", flag: "🇬🇧" },
  { code: "bn" as const, native: "বাংলা", flag: "🇧🇩" },
  { code: "ar" as const, native: "العربية", flag: "🇸🇦" },
];

function PanelBody({ onClose }: { onClose?: () => void }) {
  const { soundEnabled, toggleSound } = useSound();
  const { theme, setTheme } = useTheme();
  const { language, setLanguage } = useLanguage();

  return (
    <div className="flex flex-col h-full bg-silk-cream dark:bg-dark-bg">
      {onClose && (
        <div className="flex items-center justify-between px-5 h-16 border-b border-silk-rose/20 shrink-0">
          <span className="font-display font-bold text-lg text-silk-wine dark:text-silk-rose-soft">
            Settings
          </span>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close settings"
            className="w-10 h-10 rounded-xl flex items-center justify-center bg-silk-rose/10 text-silk-wine dark:text-silk-rose hover:bg-silk-rose/20 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      )}

      <div className="p-5 space-y-7 overflow-y-auto flex-1">
        <section>
          <p className="text-[11px] uppercase tracking-[0.2em] text-silk-wine/60 dark:text-silk-rose/50 font-semibold mb-3">
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
                    ? "bg-silk-rose/15 border-silk-rose/50 text-silk-wine dark:text-silk-rose-soft"
                    : "bg-silk-rose/5 border-silk-rose/15 text-light-textSecondary dark:text-dark-textSecondary hover:border-silk-rose/30"
                )}
              >
                <Icon className="w-4 h-4" />
                <span className="text-[10px] font-medium">{label}</span>
              </button>
            ))}
          </div>
        </section>

        <section>
          <p className="text-[11px] uppercase tracking-[0.2em] text-silk-wine/60 dark:text-silk-rose/50 font-semibold mb-3">
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

        <section>
          <p className="text-[11px] uppercase tracking-[0.2em] text-silk-wine/60 dark:text-silk-rose/50 font-semibold mb-3">
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
                "relative w-10 h-6 rounded-full transition-colors shrink-0",
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

        <section>
          <p className="text-[11px] uppercase tracking-[0.2em] text-silk-wine/60 dark:text-silk-rose/50 font-semibold mb-3">
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

      <div className="p-4 border-t border-silk-rose/20 shrink-0">
        <p className="text-xs text-center text-light-textSecondary/60 dark:text-dark-textSecondary/60">
          AHADEX Tools v1.0
        </p>
      </div>
    </div>
  );
}

export function RightSidebar({ mobileOpen, onMobileClose }: RightSidebarProps) {
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
      <aside className="hidden lg:flex fixed top-0 right-0 bottom-0 w-72 border-l border-silk-rose/15 bg-silk-cream/70 dark:bg-dark-bg/70 backdrop-blur-xl overflow-y-auto z-30 pt-24 flex-col">
        <PanelBody />
      </aside>

      {/* MOBILE — conditional render */}
      {mobileOpen && (
        <div className="lg:hidden">
          <button
            type="button"
            aria-label="Close settings"
            onClick={onMobileClose}
            className="fixed inset-0 z-[80] bg-silk-plum/60 backdrop-blur-sm cursor-default"
          />

          <div
            className="fixed top-0 right-0 bottom-0 z-[81] w-[85vw] max-w-sm shadow-2xl bg-silk-cream dark:bg-dark-bg"
            role="dialog"
            aria-modal="true"
            aria-label="Settings"
          >
            <PanelBody onClose={onMobileClose} />
          </div>
        </div>
      )}
    </>
  );
}
