import { Shield } from "lucide-react";
import { useLanguage } from "@contexts/LanguageContext";
import { mergePdfContent } from "../content";

export function PrivacyNote() {
  const { language } = useLanguage();
  const c = mergePdfContent[language];
  return (
    <div className="rounded-2xl bg-silk-rose/5 border border-silk-rose/20 p-4 sm:p-5 flex items-start gap-3 max-w-3xl mx-auto my-8">
      <Shield className="w-4 h-4 sm:w-5 sm:h-5 text-silk-rose shrink-0 mt-0.5" />
      <p className="text-[12px] sm:text-[13px] text-light-textSecondary dark:text-dark-textSecondary leading-relaxed">{c.privacyNote}</p>
    </div>
  );
}
