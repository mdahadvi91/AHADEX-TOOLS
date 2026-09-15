import React, { createContext, useContext, useEffect, useState } from 'react';
import type { SupportedLanguage } from '@/src/types/common';

export interface LanguageInfo {
  code: SupportedLanguage;
  name: string;
  nativeName: string;
  direction: 'ltr' | 'rtl';
}

export const SUPPORTED_LANGUAGES: LanguageInfo[] = [
  { code: 'en', name: 'English', nativeName: 'English', direction: 'ltr' },
  { code: 'bn', name: 'Bengali', nativeName: 'বাংলা', direction: 'ltr' },
  { code: 'ar', name: 'Arabic', nativeName: 'العربية', direction: 'rtl' },
];

export interface LanguageContextValue {
  language: SupportedLanguage;
  setLanguage: (lang: SupportedLanguage) => void;
  direction: 'ltr' | 'rtl';
  isRTL: boolean;
  supportedLanguages: LanguageInfo[];
}

const LanguageContext = createContext<LanguageContextValue | undefined>(undefined);

const LANG_STORAGE_KEY = 'ahadex_tools_lang';

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<SupportedLanguage>(() => {
    if (typeof window === 'undefined') return 'en';
    try {
      const stored = localStorage.getItem(LANG_STORAGE_KEY);
      if (stored === 'en' || stored === 'bn' || stored === 'ar') {
        return stored;
      }
    } catch {
      // Storage access may fail in private browser modes
    }
    return 'en';
  });

  const direction: 'ltr' | 'rtl' = language === 'ar' ? 'rtl' : 'ltr';
  const isRTL = direction === 'rtl';

  useEffect(() => {
    document.documentElement.lang = language;
    document.documentElement.dir = direction;
  }, [language, direction]);

  const setLanguage = (lang: SupportedLanguage) => {
    setLanguageState(lang);
    try {
      localStorage.setItem(LANG_STORAGE_KEY, lang);
    } catch {
      // Storage access may fail in private browser modes
    }
  };

  return (
    <LanguageContext.Provider
      value={{
        language,
        setLanguage,
        direction,
        isRTL,
        supportedLanguages: SUPPORTED_LANGUAGES,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage(): LanguageContextValue {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
