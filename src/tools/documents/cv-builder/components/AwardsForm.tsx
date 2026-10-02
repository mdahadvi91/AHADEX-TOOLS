import { useLanguage } from "@contexts/LanguageContext";
import { cn } from "@lib/cn";
import { Plus, Trash2, Copy, ChevronUp, ChevronDown } from "lucide-react";
import type { CVAward } from "../types";
import { addItem, removeItem, duplicateItem, updateItem, moveItem } from "../logic/repeatableHelpers";

interface Props {
  items: CVAward[];
  onChange: (next: CVAward[]) => void;
}

const EMPTY: Omit<CVAward, "id"> = { title: "", issuer: "", date: "", description: "" };

export function AwardsForm({ items, onChange }: Props) {
  const { language } = useLanguage();
  const bn = language === "bn";

  return (
    <div className="space-y-3">
      {items.length === 0 && (
        <div className="text-center py-6 px-4 rounded-xl bg-silk-rose/5 border border-dashed border-silk-rose/30">
          <p className="text-[12px] text-lightTextSecondary dark:text-dark-textSecondary">
            {bn ? "কোনো পুরস্কার নেই।" : "No awards yet."}
          </p>
        </div>
      )}

      {items.map((a, idx) => (
        <div key={a.id} className="rounded-xl border border-silk-rose/20 bg-white/60 dark:bg-dark-surface/60 p-3 space-y-2.5">
          <div className="flex items-center justify-between gap-2">
            <span className="text-[10px] uppercase tracking-wider font-bold text-silk-rose">#{idx + 1}</span>
            <div className="flex items-center gap-1">
              <IconBtn onClick={() => onChange(moveItem(items, a.id, "up"))} disabled={idx === 0} label="Up"><ChevronUp className="w-3.5 h-3.5" /></IconBtn>
              <IconBtn onClick={() => onChange(moveItem(items, a.id, "down"))} disabled={idx === items.length - 1} label="Down"><ChevronDown className="w-3.5 h-3.5" /></IconBtn>
              <IconBtn onClick={() => onChange(duplicateItem(items, a.id, "award"))} label="Dup"><Copy className="w-3.5 h-3.5" /></IconBtn>
              <IconBtn onClick={() => onChange(removeItem(items, a.id))} label="Del" danger><Trash2 className="w-3.5 h-3.5" /></IconBtn>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <Field label={bn ? "শিরোনাম" : "Title"} value={a.title} onChange={(v) => onChange(updateItem(items, a.id, { title: v }))} placeholder="Employee of the Year" span={2} />
            <Field label={bn ? "প্রদানকারী" : "Issuer"} value={a.issuer} onChange={(v) => onChange(updateItem(items, a.id, { issuer: v }))} placeholder="Company" />
            <Field label={bn ? "তারিখ" : "Date"} value={a.date} onChange={(v) => onChange(updateItem(items, a.id, { date: v }))} placeholder="2024" />
          </div>
          <div>
            <label className="block text-[10px] font-medium text-light-text dark:text-dark-text mb-1">{bn ? "বর্ণনা" : "Description"}</label>
            <textarea value={a.description} onChange={(e) => onChange(updateItem(items, a.id, { description: e.target.value }))} rows={2} placeholder={bn ? "সংক্ষিপ্ত বর্ণনা..." : "Brief description..."} className={cn("w-full px-2.5 py-1.5 rounded-md text-[12px] resize-none", "bg-white/80 dark:bg-dark-surface/80", "border border-silk-rose/20 focus:border-silk-rose/50", "text-light-text dark:text-dark-text outline-none transition-all")} />
          </div>
        </div>
      ))}

      <button type="button" onClick={() => onChange(addItem(items, EMPTY, "award"))} className={cn("w-full inline-flex items-center justify-center gap-1.5 h-10 rounded-xl", "bg-silk-rose/10 border border-dashed border-silk-rose/40", "text-silk-rose text-[12px] font-medium", "hover:bg-silk-rose/20 hover:border-silk-rose/60 transition-all")}>
        <Plus className="w-4 h-4" />
        {bn ? "পুরস্কার যোগ করুন" : "Add award"}
      </button>
    </div>
  );
}

function IconBtn({ children, onClick, disabled, danger, label }: { children: React.ReactNode; onClick: () => void; disabled?: boolean; danger?: boolean; label: string }) {
  return (
    <button type="button" onClick={onClick} disabled={disabled} aria-label={label} className={cn("w-7 h-7 rounded-md flex items-center justify-center transition-colors", "disabled:opacity-30 disabled:cursor-not-allowed", danger ? "text-red-500 hover:bg-red-500/10" : "text-silk-rose hover:bg-silk-rose/10")}>{children}</button>
  );
}

function Field({ label, value, onChange, placeholder, span }: { label: string; value: string; onChange: (v: string) => void; placeholder?: string; span?: 1 | 2 }) {
  return (
    <div className={cn(span === 2 && "col-span-2")}>
      <label className="block text-[10px] font-medium text-light-text dark:text-dark-text mb-1">{label}</label>
      <input type="text" value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder} className={cn("w-full h-8 px-2.5 rounded-md text-[12px]", "bg-white/80 dark:bg-dark-surface/80", "border border-silk-rose/20 focus:border-silk-rose/50", "text-light-text dark:text-dark-text placeholder:text-light-textSecondary/40 outline-none transition-all")} />
    </div>
  );
}
