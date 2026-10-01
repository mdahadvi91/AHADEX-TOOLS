import { en, type TranslationKeys } from "./en";
import { bn } from "./bn";
import type { Language } from "@types/common";

export const translations: Record<Language, TranslationKeys> = {
  en,
  bn,
};

export function getTranslations(lang: Language): TranslationKeys {
  return translations[lang] ?? translations.en;
}

export type { TranslationKeys };
