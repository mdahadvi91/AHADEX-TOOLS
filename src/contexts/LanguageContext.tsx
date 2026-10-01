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
import type { Language } from "@types/common";

const SUPPORTED: Language[] = ["en", "bn", "ar"];
const RTL: Language[] = ["ar"];

interface LanguageContextValue {
  language: Language;
  isRTL: boolean;
  setLanguage: (lang: Language) => void;
  supportedLanguages: Language[];
}

const LanguageContext = createContext<LanguageContextValue | null>(null);

export function useLanguage(): LanguageContextValue {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used within LanguageProvider");
  return ctx;
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
  document.documentElement.setAttribute("dir", RTL.includes(lang) ? "rtl" : "ltr");
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>(DEFAULT_LANGUAGE);

  useEffect(() => {
    const stored = getStored();
    setLanguageState(stored);
    apply(stored);
  }, []);

  const setLanguage = useCallback((lang: Language) => {
    if (!SUPPORTED.includes(lang)) return;
    setLanguageState(lang);
    apply(lang);
    try { localStorage.setItem(STORAGE_KEYS.language, lang); } catch {}
  }, []);

  const value = useMemo(
    () => ({
      language,
      isRTL: RTL.includes(language),
      setLanguage,
      supportedLanguages: SUPPORTED,
    }),
    [language, setLanguage]
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}
