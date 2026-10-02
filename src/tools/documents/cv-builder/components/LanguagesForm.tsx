import { useLanguage } from "@contexts/LanguageContext";
import { cn } from "@lib/cn";
import { Plus, Trash2 } from "lucide-react";
import type { CVLanguage } from "../types";
import { addItem, removeItem, updateItem, moveItem } from "../logic/repeatableHelpers";

interface Props {
  items: CVLanguage[];
  onChange: (next: CVLanguage[]) => void;
}

const EMPTY: Omit<CVLanguage, "id"> = { name: "", level: "" };

const LEVELS = ["Native", "Fluent", "Advanced", "Intermediate", "Basic"];

export function LanguagesForm({ items, onChange }: Props) {
  const { language } = useLanguage();
  const bn = language === "bn";

  return (
    <div className="space-y-3">
      {items.length === 0 && (
        <div className="text-center py-6 px-4 rounded-xl bg-silk-rose/5 border border-dashed border-silk-rose/30">
          <p className="text-[12px] text-lightTextSecondary dark:text-dark-textSecondary">
            {bn ? "কোনো ভাষা নেই।" : "No languages yet."}
          </p>
        </div>
      )}

      {items.map((l, idx) => (
        <div key={l.id} className="flex items-center gap-2 p-2 rounded-xl bg-white/60 dark:bg-dark-surface/60 border border-silk-rose/20">
          <div className="flex flex-col gap-0.5">
            <button type="button" onClick={() => onChange(moveItem(items, l.id, "up"))} disabled={idx === 0} className="w-5 h-4 flex items-center justify-center text-silk-rose disabled:opacity-20 hover:bg-silk-rose/10 rounded text-[8px]" aria-label="Up">▲</button>
            <button type="button" onClick={() => onChange(moveItem(items, l.id, "down"))} disabled={idx === items.length - 1} className="w-5 h-4 flex items-center justify-center text-silk-rose disabled:opacity-20 hover:bg-silk-rose/10 rounded text-[8px]" aria-label="Down">▼</button>
          </div>
          <input
            type="text"
            value={l.name}
            onChange={(e) => onChange(updateItem(items, l.id, { name: e.target.value }))}
            placeholder={bn ? "ভাষা" : "Language"}
            className={cn("flex-1 h-8 px-2.5 rounded-md text-[12px]", "bg-white/80 dark:bg-dark-surface/80", "border border-silk-rose/20 focus:border-silk-rose/50", "text-light-text dark:text-dark-text placeholder:text-light-textSecondary/40 outline-none transition-all")}
          />
          <select
            value={l.level}
            onChange={(e) => onChange(updateItem(items, l.id, { level: e.target.value }))}
            className={cn("w-28 h-8 px-2 rounded-md text-[11px]", "bg-white/80 dark:bg-dark-surface/80", "border border-silk-rose/20 focus:border-silk-rose/50", "text-light-text dark:text-dark-text outline-none transition-all")}
          >
            <option value="">—</option>
            {LEVELS.map((lv) => <option key={lv} value={lv}>{lv}</option>)}
          </select>
          <button type="button" onClick={() => onChange(removeItem(items, l.id))} className="w-7 h-7 rounded-md flex items-center justify-center text-red-500 hover:bg-red-500/10" aria-label="Remove">
            <Trash2 className="w-3.5 h-3.5" />
          </button>
        </div>
      ))}

      <button type="button" onClick={() => onChange(addItem(items, EMPTY, "lang"))} className={cn("w-full inline-flex items-center justify-center gap-1.5 h-10 rounded-xl", "bg-silk-rose/10 border border-dashed border-silk-rose/40", "text-silk-rose text-[12px] font-medium", "hover:bg-silk-rose/20 hover:border-silk-rose/60 transition-all")}>
        <Plus className="w-4 h-4" />
        {bn ? "ভাষা যোগ করুন" : "Add language"}
      </button>
    </div>
  );
}
