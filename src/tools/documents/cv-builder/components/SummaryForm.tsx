import { useLanguage } from "@contexts/LanguageContext";
import { cn } from "@lib/cn";

interface SummaryFormProps {
  value: string;
  onChange: (v: string) => void;
}

export function SummaryForm({ value, onChange }: SummaryFormProps) {
  const { language } = useLanguage();

  return (
    <div>
      <label
        htmlFor="cv-summary"
        className="block text-[11px] font-medium text-light-text dark:text-dark-text mb-1"
      >
        {language === "bn" ? "পেশাদার সারাংশ" : "Professional Summary"}
      </label>
      <textarea
        id="cv-summary"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        rows={5}
        placeholder={
          language === "bn"
            ? "২-৪ বাক্যে আপনার পেশাদার পরিচয় লিখুন..."
            : "Write a 2-4 sentence summary of your professional background..."
        }
        className={cn(
          "w-full px-3 py-2 rounded-lg text-[13px] resize-none",
          "bg-white/80 dark:bg-dark-surface/80",
          "border border-silk-rose/20 focus:border-silk-rose/50",
          "text-light-text dark:text-dark-text",
          "placeholder:text-light-textSecondary/50 dark:placeholder:text-dark-textSecondary/40",
          "outline-none transition-all"
        )}
      />
      <p className="text-[10px] text-light-textSecondary dark:text-dark-textSecondary mt-1">
        {value.length} / 500
      </p>
    </div>
  );
}
