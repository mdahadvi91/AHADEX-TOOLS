import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
  useMemo,
  type ReactNode,
} from "react";
import { STORAGE_KEYS, DEFAULT_LANGUAGE } from "@constants/config";
import { getTranslations, type TranslationKeys } from "@i18n/index";
import type { Language } from "@/types/common";

const SUPPORTED: Language[] = ["en", "bn"];

interface LanguageContextValue {
  language: Language;
  setLanguage: (lang: Language) => void;
  supportedLanguages: Language[];
  t: TranslationKeys;
}

const LanguageContext = createContext<LanguageContextValue | null>(null);

export function useLanguage(): LanguageContextValue {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used within LanguageProvider");
  return ctx;
}

export function useTranslation() {
  const { t, language } = useLanguage();
  return { t, language };
}

function getStored(): Language {
  if (typeof window === "undefined") return DEFAULT_LANGUAGE;
  try {
    const stored = localStorage.getItem(STORAGE_KEYS.language) as Language | null;
    if (stored && SUPPORTED.includes(stored)) return stored;
    const browser = (navigator.language || "en").slice(0, 2) as Language;
    if (SUPPORTED.includes(browser)) return browser;
  } catch {}
  return DEFAULT_LANGUAGE;
}

function apply(lang: Language) {
  if (typeof document === "undefined") return;
  document.documentElement.setAttribute("lang", lang);
  document.documentElement.setAttribute("dir", "ltr");
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>(DEFAULT_LANGUAGE);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const stored = getStored();
    setLanguageState(stored);
    apply(stored);
    setMounted(true);
  }, []);

  const setLanguage = useCallback(
    (lang: Language) => {
      if (!SUPPORTED.includes(lang)) return;
      try {
        localStorage.setItem(STORAGE_KEYS.language, lang);
      } catch {}
      if (mounted) {
        window.location.reload();
      } else {
        setLanguageState(lang);
        apply(lang);
      }
    },
    [mounted]
  );

  const value = useMemo(
    () => ({
      language,
      setLanguage,
      supportedLanguages: SUPPORTED,
      t: getTranslations(language),
    }),
    [language, setLanguage]
  );

  return (
    <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
  );
}
