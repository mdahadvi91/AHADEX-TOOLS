import { useLanguage } from "@contexts/LanguageContext";
import { cn } from "@lib/cn";
import type { CVPersonal } from "../types";
import { isValidEmail } from "../logic/stateHelpers";

interface PersonalFormProps {
  personal: CVPersonal;
  onChange: (patch: Partial<CVPersonal>) => void;
}

interface FieldDef {
  key: keyof CVPersonal;
  labelEn: string;
  labelBn: string;
  placeholder: string;
  type?: "text" | "email" | "tel" | "url";
  spanFull?: boolean;
}

const FIELDS: FieldDef[] = [
  { key: "fullName", labelEn: "Full Name", labelBn: "পুরো নাম", placeholder: "Imran Hossain", spanFull: true },
  { key: "jobTitle", labelEn: "Job Title", labelBn: "পদবি", placeholder: "Software Engineer", spanFull: true },
  { key: "email", labelEn: "Email", labelBn: "ইমেইল", placeholder: "you@example.com", type: "email" },
  { key: "phone", labelEn: "Phone", labelBn: "ফোন", placeholder: "+880 1700 000000", type: "tel" },
  { key: "location", labelEn: "Location", labelBn: "ঠিকানা", placeholder: "Dhaka, Bangladesh" },
  { key: "website", labelEn: "Website", labelBn: "ওয়েবসাইট", placeholder: "example.com", type: "url" },
  { key: "linkedin", labelEn: "LinkedIn", labelBn: "লিংকডইন", placeholder: "linkedin.com/in/you", type: "url" },
  { key: "github", labelEn: "GitHub", labelBn: "গিটহাব", placeholder: "github.com/you", type: "url" },
];

export function PersonalForm({ personal, onChange }: PersonalFormProps) {
  const { language } = useLanguage();

  return (
    <div className="space-y-3">
      {FIELDS.map((f) => {
        const value = (personal[f.key] as string) ?? "";
        const invalid =
          f.type === "email" && value && !isValidEmail(value);

        return (
          <div key={f.key} className={cn(f.spanFull && "col-span-2")}>
            <label
              htmlFor={`cv-field-${f.key}`}
              className="block text-[11px] font-medium text-light-text dark:text-dark-text mb-1"
            >
              {language === "bn" ? f.labelBn : f.labelEn}
            </label>
            <input
              id={`cv-field-${f.key}`}
              type={f.type ?? "text"}
              value={value}
              onChange={(e) => onChange({ [f.key]: e.target.value })}
              placeholder={f.placeholder}
              className={cn(
                "w-full h-9 px-3 rounded-lg text-[13px]",
                "bg-white/80 dark:bg-dark-surface/80",
                "border transition-all outline-none",
                invalid
                  ? "border-red-400 focus:border-red-500"
                  : "border-silk-rose/20 focus:border-silk-rose/50",
                "text-light-text dark:text-dark-text"
              )}
            />
            {invalid && (
              <p className="text-[10px] text-red-500 mt-1">
                {language === "bn"
                  ? "সঠিক ইমেইল দিন।"
                  : "Please enter a valid email."}
              </p>
            )}
          </div>
        );
      })}
    </div>
  );
}
