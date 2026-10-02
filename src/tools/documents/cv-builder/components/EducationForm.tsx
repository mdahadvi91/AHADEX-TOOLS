import { useLanguage } from "@contexts/LanguageContext";
import { cn } from "@lib/cn";
import {
  Plus, Trash2, Copy, ChevronUp, ChevronDown,
} from "lucide-react";
import type { CVEducation } from "../types";
import {
  addItem, removeItem, duplicateItem, updateItem, moveItem,
} from "../logic/repeatableHelpers";

interface EducationFormProps {
  items: CVEducation[];
  onChange: (next: CVEducation[]) => void;
}

const EMPTY_EDU: Omit<CVEducation, "id"> = {
  institution: "",
  degree: "",
  field: "",
  location: "",
  startDate: "",
  endDate: "",
  description: "",
};

export function EducationForm({ items, onChange }: EducationFormProps) {
  const { language } = useLanguage();
  const bn = language === "bn";

  return (
    <div className="space-y-4">
      {items.length === 0 && (
        <div className="text-center py-6 px-4 rounded-xl bg-silk-rose/5 border border-dashed border-silk-rose/30">
          <p className="text-[12px] text-light-textSecondary dark:text-dark-textSecondary">
            {bn ? "কোনো শিক্ষাগত যোগ্যতা নেই।" : "No education entries yet."}
          </p>
        </div>
      )}

      {items.map((edu, idx) => (
        <div
          key={edu.id}
          className="rounded-xl border border-silk-rose/20 bg-white/60 dark:bg-dark-surface/60 p-3 space-y-2.5"
        >
          <div className="flex items-center justify-between gap-2">
            <span className="text-[10px] uppercase tracking-wider font-bold text-silk-rose">
              #{idx + 1}
            </span>
            <div className="flex items-center gap-1">
              <IconBtn
                onClick={() => onChange(moveItem(items, edu.id, "up"))}
                disabled={idx === 0}
                label="Move up"
              >
                <ChevronUp className="w-3.5 h-3.5" />
              </IconBtn>
              <IconBtn
                onClick={() => onChange(moveItem(items, edu.id, "down"))}
                disabled={idx === items.length - 1}
                label="Move down"
              >
                <ChevronDown className="w-3.5 h-3.5" />
              </IconBtn>
              <IconBtn
                onClick={() => onChange(duplicateItem(items, edu.id, "edu"))}
                label="Duplicate"
              >
                <Copy className="w-3.5 h-3.5" />
              </IconBtn>
              <IconBtn
                onClick={() => onChange(removeItem(items, edu.id))}
                label="Remove"
                danger
              >
                <Trash2 className="w-3.5 h-3.5" />
              </IconBtn>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <Field
              label={bn ? "ডিগ্রি" : "Degree"}
              value={edu.degree}
              onChange={(v) => onChange(updateItem(items, edu.id, { degree: v }))}
              placeholder="BSc"
            />
            <Field
              label={bn ? "বিষয়" : "Field"}
              value={edu.field}
              onChange={(v) => onChange(updateItem(items, edu.id, { field: v }))}
              placeholder="Computer Science"
            />
            <Field
              label={bn ? "প্রতিষ্ঠান" : "Institution"}
              value={edu.institution}
              onChange={(v) => onChange(updateItem(items, edu.id, { institution: v }))}
              placeholder="Dhaka University"
              span={2}
            />
            <Field
              label={bn ? "এলাকা" : "Location"}
              value={edu.location}
              onChange={(v) => onChange(updateItem(items, edu.id, { location: v }))}
              placeholder="Dhaka"
              span={2}
            />
            <Field
              label={bn ? "শুরু" : "Start"}
              value={edu.startDate}
              onChange={(v) => onChange(updateItem(items, edu.id, { startDate: v }))}
              placeholder="2015"
            />
            <Field
              label={bn ? "শেষ" : "End"}
              value={edu.endDate}
              onChange={(v) => onChange(updateItem(items, edu.id, { endDate: v }))}
              placeholder="2019"
            />
          </div>
        </div>
      ))}

      <button
        type="button"
        onClick={() => onChange(addItem(items, EMPTY_EDU, "edu"))}
        className={cn(
          "w-full inline-flex items-center justify-center gap-1.5 h-10 rounded-xl",
          "bg-silk-rose/10 border border-dashed border-silk-rose/40",
          "text-silk-rose text-[12px] font-medium",
          "hover:bg-silk-rose/20 hover:border-silk-rose/60 transition-all"
        )}
      >
        <Plus className="w-4 h-4" />
        {bn ? "শিক্ষা যোগ করুন" : "Add education"}
      </button>
    </div>
  );
}

/* ─── Sub components ─── */

function IconBtn({
  children, onClick, disabled, danger, label,
}: {
  children: React.ReactNode;
  onClick: () => void;
  disabled?: boolean;
  danger?: boolean;
  label: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={label}
      className={cn(
        "w-7 h-7 rounded-md flex items-center justify-center transition-colors",
        "disabled:opacity-30 disabled:cursor-not-allowed",
        danger
          ? "text-red-500 hover:bg-red-500/10"
          : "text-silk-rose hover:bg-silk-rose/10"
      )}
    >
      {children}
    </button>
  );
}

function Field({
  label, value, onChange, placeholder, span,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  span?: 1 | 2;
}) {
  return (
    <div className={cn(span === 2 && "col-span-2")}>
      <label className="block text-[10px] font-medium text-light-text dark:text-dark-text mb-1">
        {label}
      </label>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className={cn(
          "w-full h-8 px-2.5 rounded-md text-[12px]",
          "bg-white/80 dark:bg-dark-surface/80",
          "border border-silk-rose/20 focus:border-silk-rose/50",
          "text-light-text dark:text-dark-text",
          "placeholder:text-light-textSecondary/40",
          "outline-none transition-all"
        )}
      />
    </div>
  );
}
