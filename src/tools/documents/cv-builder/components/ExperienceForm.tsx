import { useLanguage } from "@contexts/LanguageContext";
import { cn } from "@lib/cn";
import {
  Plus, Trash2, Copy, ChevronUp, ChevronDown, X,
} from "lucide-react";
import type { CVExperience } from "../types";
import {
  addItem, removeItem, duplicateItem, updateItem, moveItem,
} from "../logic/repeatableHelpers";

interface ExperienceFormProps {
  items: CVExperience[];
  onChange: (next: CVExperience[]) => void;
}

const EMPTY_EXP: Omit<CVExperience, "id"> = {
  company: "",
  position: "",
  location: "",
  startDate: "",
  endDate: "",
  current: false,
  bullets: [""],
};

export function ExperienceForm({ items, onChange }: ExperienceFormProps) {
  const { language } = useLanguage();
  const bn = language === "bn";

  return (
    <div className="space-y-4">
      {items.length === 0 && (
        <div className="text-center py-6 px-4 rounded-xl bg-silk-rose/5 border border-dashed border-silk-rose/30">
          <p className="text-[12px] text-light-textSecondary dark:text-dark-textSecondary">
            {bn
              ? "কোনো অভিজ্ঞতা নেই। নিচে যোগ করুন।"
              : "No experience entries yet. Add one below."}
          </p>
        </div>
      )}

      {items.map((exp, idx) => (
        <div
          key={exp.id}
          className="rounded-xl border border-silk-rose/20 bg-white/60 dark:bg-dark-surface/60 p-3 space-y-2.5"
        >
          {/* Header: index + controls */}
          <div className="flex items-center justify-between gap-2">
            <span className="text-[10px] uppercase tracking-wider font-bold text-silk-rose">
              #{idx + 1}
            </span>
            <div className="flex items-center gap-1">
              <IconBtn
                onClick={() => onChange(moveItem(items, exp.id, "up"))}
                disabled={idx === 0}
                label="Move up"
              >
                <ChevronUp className="w-3.5 h-3.5" />
              </IconBtn>
              <IconBtn
                onClick={() => onChange(moveItem(items, exp.id, "down"))}
                disabled={idx === items.length - 1}
                label="Move down"
              >
                <ChevronDown className="w-3.5 h-3.5" />
              </IconBtn>
              <IconBtn
                onClick={() => onChange(duplicateItem(items, exp.id, "exp"))}
                label="Duplicate"
              >
                <Copy className="w-3.5 h-3.5" />
              </IconBtn>
              <IconBtn
                onClick={() => onChange(removeItem(items, exp.id))}
                label="Remove"
                danger
              >
                <Trash2 className="w-3.5 h-3.5" />
              </IconBtn>
            </div>
          </div>

          {/* Inputs */}
          <div className="grid grid-cols-2 gap-2">
            <Field
              label={bn ? "পদবি" : "Position"}
              value={exp.position}
              onChange={(v) => onChange(updateItem(items, exp.id, { position: v }))}
              placeholder="Software Engineer"
              span={2}
            />
            <Field
              label={bn ? "প্রতিষ্ঠান" : "Company"}
              value={exp.company}
              onChange={(v) => onChange(updateItem(items, exp.id, { company: v }))}
              placeholder="CloudBridge"
              span={2}
            />
            <Field
              label={bn ? "এলাকা" : "Location"}
              value={exp.location}
              onChange={(v) => onChange(updateItem(items, exp.id, { location: v }))}
              placeholder="Dhaka"
              span={2}
            />
            <Field
              label={bn ? "শুরু" : "Start"}
              type="month"
              value={exp.startDate}
              onChange={(v) => onChange(updateItem(items, exp.id, { startDate: v }))}
            />
            <Field
              label={bn ? "শেষ" : "End"}
              type="month"
              value={exp.endDate}
              disabled={exp.current}
              onChange={(v) => onChange(updateItem(items, exp.id, { endDate: v }))}
            />
          </div>

          {/* Current toggle */}
          <label className="flex items-center gap-2 text-[11px] text-light-text dark:text-dark-text cursor-pointer select-none">
            <input
              type="checkbox"
              checked={exp.current}
              onChange={(e) =>
                onChange(
                  updateItem(items, exp.id, {
                    current: e.target.checked,
                    endDate: e.target.checked ? "" : exp.endDate,
                  })
                )
              }
              className="accent-silk-rose"
            />
            {bn ? "এখনো এই পদে আছি" : "I currently work here"}
          </label>

          {/* Bullets editor */}
          <BulletsEditor
            bullets={exp.bullets}
            onChange={(bullets) =>
              onChange(updateItem(items, exp.id, { bullets }))
            }
            bn={bn}
          />
        </div>
      ))}

      <button
        type="button"
        onClick={() => onChange(addItem(items, EMPTY_EXP, "exp"))}
        className={cn(
          "w-full inline-flex items-center justify-center gap-1.5 h-10 rounded-xl",
          "bg-silk-rose/10 border border-dashed border-silk-rose/40",
          "text-silk-rose text-[12px] font-medium",
          "hover:bg-silk-rose/20 hover:border-silk-rose/60 transition-all"
        )}
      >
        <Plus className="w-4 h-4" />
        {bn ? "নতুন অভিজ্ঞতা যোগ করুন" : "Add experience"}
      </button>
    </div>
  );
}

/* ─── Sub: IconBtn ─── */
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

/* ─── Sub: Field ─── */
function Field({
  label, value, onChange, placeholder, type = "text", disabled, span,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  type?: string;
  disabled?: boolean;
  span?: 1 | 2;
}) {
  return (
    <div className={cn(span === 2 && "col-span-2")}>
      <label className="block text-[10px] font-medium text-light-text dark:text-dark-text mb-1">
        {label}
      </label>
      <input
        type={type}
        value={value}
        disabled={disabled}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className={cn(
          "w-full h-8 px-2.5 rounded-md text-[12px]",
          "bg-white/80 dark:bg-dark-surface/80",
          "border border-silk-rose/20 focus:border-silk-rose/50",
          "text-light-text dark:text-dark-text",
          "placeholder:text-light-textSecondary/40",
          "outline-none transition-all",
          disabled && "opacity-40 cursor-not-allowed"
        )}
      />
    </div>
  );
}

/* ─── Sub: BulletsEditor ─── */
function BulletsEditor({
  bullets, onChange, bn,
}: {
  bullets: string[];
  onChange: (next: string[]) => void;
  bn: boolean;
}) {
  const update = (i: number, v: string) => {
    const next = [...bullets];
    next[i] = v;
    onChange(next);
  };
  const remove = (i: number) => {
    onChange(bullets.filter((_, idx) => idx !== i));
  };
  const add = () => onChange([...bullets, ""]);

  return (
    <div>
      <p className="text-[10px] font-medium text-light-text dark:text-dark-text mb-1">
        {bn ? "বুলেট পয়েন্ট" : "Bullets"}
      </p>
      <div className="space-y-1.5">
        {bullets.map((b, i) => (
          <div key={i} className="flex gap-1.5 items-start">
            <span className="text-silk-rose text-xs mt-2 shrink-0">•</span>
            <textarea
              value={b}
              onChange={(e) => update(i, e.target.value)}
              rows={2}
              placeholder={
                bn ? "একটি অর্জন লিখুন..." : "Describe an achievement..."
              }
              className={cn(
                "flex-1 px-2 py-1.5 rounded-md text-[12px] resize-none",
                "bg-white/80 dark:bg-dark-surface/80",
                "border border-silk-rose/20 focus:border-silk-rose/50",
                "text-light-text dark:text-dark-text",
                "outline-none transition-all"
              )}
            />
            <button
              type="button"
              onClick={() => remove(i)}
              className="w-6 h-6 rounded-md flex items-center justify-center text-red-500 hover:bg-red-500/10 shrink-0 mt-1"
              aria-label="Remove bullet"
            >
              <X className="w-3 h-3" />
            </button>
          </div>
        ))}
      </div>
      <button
        type="button"
        onClick={add}
        className="mt-1.5 inline-flex items-center gap-1 text-[11px] font-medium text-silk-rose hover:underline"
      >
        <Plus className="w-3 h-3" />
        {bn ? "বুলেট যোগ করুন" : "Add bullet"}
      </button>
    </div>
  );
}
