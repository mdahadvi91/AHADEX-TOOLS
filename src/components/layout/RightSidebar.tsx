import { useEffect } from "react";
import { X, Sun, Moon, Monitor, Volume2, VolumeX, Github, Mail, Check } from "lucide-react";
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
  {
    value: "light" as const,
    label: "Light",
    Icon: Sun,
    description: "Bright",
    preview: "bg-gradient-to-br from-silk-cream to-silk-sand",
  },
  {
    value: "dark" as const,
    label: "Dark",
    Icon: Moon,
    description: "Dim",
    preview: "bg-gradient-to-br from-dark-bg to-dark-elevated",
  },
  {
    value: "system" as const,
    label: "Auto",
    Icon: Monitor,
    description: "System",
    preview: "bg-gradient-to-br from-silk-sand to-dark-bg",
  },
];

const LANGS = [
  { code: "en" as const, native: "English", flag: "🇬🇧" },
  { code: "bn" as const, native: "বাংলা", flag: "🇧🇩" },
  { code: "ar" as const, native: "العربية", flag: "🇸🇦" },
];

function PanelBody({ onClose }: { onClose?: () => void }) {
  const { soundEnabled, toggleSound } = useSound();
  const { theme, resolvedTheme, setTheme } = useTheme();
  const { language, setLanguage } = useLanguage();

  return (
    <div className="flex flex-col h-full bg-silk-cream dark:bg-dark-bg transition-colors duration-500">
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
        {/* Theme */}
        <section>
          <div className="flex items-center justify-between mb-3">
            <p className="text-[11px] uppercase tracking-[0.2em] text-silk-wine/60 dark:text-silk-rose/50 font-semibold">
              Theme
            </p>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-silk-rose/15 text-silk-wine dark:text-silk-rose-soft">
              {resolvedTheme === "dark" ? "🌙 Dark" : "☀️ Light"}
            </span>
          </div>

          <div className="grid grid-cols-3 gap-2">
            {THEMES.map(({ value, label, Icon, description, preview }) => {
              const active = theme === value;
              return (
                <button
                  key={value}
                  type="button"
                  onClick={() => setTheme(value)}
                  className={cn(
                    "group relative flex flex-col items-center gap-2 p-3 rounded-2xl border transition-all duration-300",
                    active
                      ? "bg-silk-rose/15 border-silk-rose/50 shadow-[0_6px_18px_-6px_rgba(216,139,154,0.5)]"
                      : "bg-silk-rose/5 border-silk-rose/15 hover:border-silk-rose/35 hover:-translate-y-0.5"
                  )}
                >
                  {/* Preview swatch */}
                  <div
                    className={cn(
                      "relative w-9 h-9 rounded-xl border border-silk-rose/20 overflow-hidden",
                      preview
                    )}
                  >
                    <Icon
                      className={cn(
                        "absolute inset-0 m-auto w-4 h-4",
                        value === "dark"
                          ? "text-silk-rose-soft"
                          : value === "light"
                            ? "text-silk-wine"
                            : "text-silk-rose"
                      )}
                    />
                  </div>

                  <div className="flex flex-col items-center leading-tight">
                    <span
                      className={cn(
                        "text-[10px] font-bold uppercase tracking-wider transition-colors",
                        active
                          ? "text-silk-wine dark:text-silk-rose-soft"
                          : "text-light-textSecondary dark:text-dark-textSecondary"
                      )}
                    >
                      {label}
                    </span>
                    <span className="text-[9px] text-light-textSecondary/70 dark:text-dark-textSecondary/70">
                      {description}
                    </span>
                  </div>

                  {/* Active check */}
                  {active && (
                    <span className="absolute top-1.5 right-1.5 w-4 h-4 rounded-full bg-silk-rose flex items-center justify-center">
                      <Check className="w-2.5 h-2.5 text-white" strokeWidth={3} />
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </section>

        {/* Language */}
        <section>
          <p className="text-[11px] uppercase tracking-[0.2em] text-silk-wine/60 dark:text-silk-rose/50 font-semibold mb-3">
            Language
          </p>
          <div className="space-y-2">
            {LANGS.map(({ code, native, flag }) => {
              const active = language === code;
              return (
                <button
                  key={code}
                  type="button"
                  onClick={() => setLanguage(code)}
                  className={cn(
                    "w-full flex items-center gap-3 px-4 py-3 rounded-xl border transition-all text-left",
                    active
                      ? "bg-silk-rose/15 border-silk-rose/50"
                      : "bg-silk-rose/5 border-silk-rose/15 hover:border-silk-rose/35 hover:-translate-y-0.5"
                  )}
                >
                  <span className="text-lg">{flag}</span>
                  <span className="flex-1 text-sm font-medium text-light-text dark:text-dark-text">
                    {native}
                  </span>
                  {active && (
                    <span className="w-2 h-2 rounded-full bg-silk-rose" />
                  )}
                </button>
              );
            })}
          </div>
        </section>

        {/* Sound */}
        <section>
          <p className="text-[11px] uppercase tracking-[0.2em] text-silk-wine/60 dark:text-silk-rose/50 font-semibold mb-3">
            Sound
          </p>
          <button
            type="button"
            onClick={toggleSound}
            className={cn(
              "w-full flex items-center gap-3 px-4 py-3 rounded-xl border transition-all",
              "bg-silk-rose/5 border-silk-rose/15 hover:border-silk-rose/35"
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

        {/* Links */}
        <section>
          <p className="text-[11px] uppercase tracking-[0.2em] text-silk-wine/60 dark:text-silk-rose/50 font-semibold mb-3">
            More
          </p>
          <div className="space-y-2">
            <a
              href={APP_CONFIG.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 px-4 py-3 rounded-xl bg-silk-rose/5 border border-silk-rose/15 hover:border-silk-rose/35 hover:-translate-y-0.5 transition-all text-light-textSecondary dark:text-dark-textSecondary hover:text-silk-rose"
            >
              <Github className="w-4 h-4" />
              <span className="text-sm">GitHub</span>
            </a>
            <a
              href={`mailto:${APP_CONFIG.email}`}
              className="flex items-center gap-3 px-4 py-3 rounded-xl bg-silk-rose/5 border border-silk-rose/15 hover:border-silk-rose/35 hover:-translate-y-0.5 transition-all text-light-textSecondary dark:text-dark-textSecondary hover:text-silk-rose"
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
      <aside className="hidden lg:flex fixed top-0 right-0 bottom-0 w-72 border-l border-silk-rose/15 bg-silk-cream/70 dark:bg-dark-bg/70 backdrop-blur-xl overflow-y-auto z-30 pt-24 flex-col transition-colors duration-500">
        <PanelBody />
      </aside>

      {mobileOpen && (
        <div className="lg:hidden">
          <button
            type="button"
            aria-label="Close settings"
            onClick={onMobileClose}
            className="fixed inset-0 z-[80] bg-silk-plum/60 backdrop-blur-sm cursor-default"
          />
          <div
            className="fixed top-0 right-0 bottom-0 z-[81] w-[85vw] max-w-sm shadow-2xl bg-silk-cream dark:bg-dark-bg transition-colors duration-500"
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
