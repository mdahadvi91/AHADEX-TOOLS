import { useLanguage } from "@contexts/LanguageContext";
import { cn } from "@lib/cn";
import type { UserData } from "../../types";

interface TextPanelProps {
  userData: UserData;
  onChange: (next: UserData) => void;
}

const FIELDS: Array<{ key: keyof UserData; label: string; labelBn: string }> = [
  { key: "brand", label: "Brand", labelBn: "ব্র্যান্ড" },
  { key: "tagline", label: "Tagline", labelBn: "ট্যাগলাইন" },
  { key: "name", label: "Full Name", labelBn: "পুরো নাম" },
  { key: "title", label: "Job Title", labelBn: "পদবি" },
  { key: "phone", label: "Phone", labelBn: "ফোন" },
  { key: "email", label: "Email", labelBn: "ইমেইল" },
  { key: "website", label: "Website", labelBn: "ওয়েবসাইট" },
  { key: "location", label: "Location", labelBn: "ঠিকানা" },
  { key: "qrLabel", label: "QR Label", labelBn: "QR লেবেল" },
  { key: "qrPayload", label: "QR URL", labelBn: "QR লিঙ্ক" },
];

export function TextPanel({ userData, onChange }: TextPanelProps) {
  const { language } = useLanguage();

  return (
    <div className="space-y-3">
      {FIELDS.map((f) => (
        <div key={f.key}>
          <label
            htmlFor={`field-${f.key}`}
            className="block text-[11px] font-medium text-light-text dark:text-dark-text mb-1"
          >
            {language === "bn" ? f.labelBn : f.label}
          </label>
          <input
            id={`field-${f.key}`}
            type="text"
            value={String(userData[f.key] ?? "")}
            onChange={(e) =>
              onChange({ ...userData, [f.key]: e.target.value })
            }
            className={cn(
              "w-full h-9 px-3 rounded-lg text-[13px]",
              "bg-white/80 dark:bg-dark-surface/80",
              "border border-silk-rose/20 focus:border-silk-rose/50",
              "text-light-text dark:text-dark-text",
              "outline-none transition-all"
            )}
          />
        </div>
      ))}
    </div>
  );
}
