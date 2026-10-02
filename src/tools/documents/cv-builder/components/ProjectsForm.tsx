import { useLanguage } from "@contexts/LanguageContext";
import { cn } from "@lib/cn";
import {
  Plus, Trash2, Copy, ChevronUp, ChevronDown,
} from "lucide-react";
import type { CVProject } from "../types";
import {
  addItem, removeItem, duplicateItem, updateItem, moveItem,
} from "../logic/repeatableHelpers";

interface ProjectsFormProps {
  items: CVProject[];
  onChange: (next: CVProject[]) => void;
}

const EMPTY_PROJECT: Omit<CVProject, "id"> = {
  name: "",
  role: "",
  description: "",
  url: "",
  tech: "",
};

export function ProjectsForm({ items, onChange }: ProjectsFormProps) {
  const { language } = useLanguage();
  const bn = language === "bn";

  return (
    <div className="space-y-4">
      {items.length === 0 && (
        <div className="text-center py-6 px-4 rounded-xl bg-silk-rose/5 border border-dashed border-silk-rose/30">
          <p className="text-[12px] text-light-textSecondary dark:text-dark-textSecondary">
            {bn ? "কোনো প্রজেক্ট নেই।" : "No projects yet."}
          </p>
        </div>
      )}

      {items.map((p, idx) => (
        <div
          key={p.id}
          className="rounded-xl border border-silk-rose/20 bg-white/60 dark:bg-dark-surface/60 p-3 space-y-2.5"
        >
          <div className="flex items-center justify-between gap-2">
            <span className="text-[10px] uppercase tracking-wider font-bold text-silk-rose">
              #{idx + 1}
            </span>
            <div className="flex items-center gap-1">
              <IconBtn
                onClick={() => onChange(moveItem(items, p.id, "up"))}
                disabled={idx === 0}
                label="Move up"
              >
                <ChevronUp className="w-3.5 h-3.5" />
              </IconBtn>
              <IconBtn
                onClick={() => onChange(moveItem(items, p.id, "down"))}
                disabled={idx === items.length - 1}
                label="Move down"
              >
                <ChevronDown className="w-3.5 h-3.5" />
              </IconBtn>
              <IconBtn
                onClick={() => onChange(duplicateItem(items, p.id, "pr"))}
                label="Duplicate"
              >
                <Copy className="w-3.5 h-3.5" />
              </IconBtn>
              <IconBtn
                onClick={() => onChange(removeItem(items, p.id))}
                label="Remove"
                danger
              >
                <Trash2 className="w-3.5 h-3.5" />
              </IconBtn>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <Field
              label={bn ? "নাম" : "Name"}
              value={p.name}
              onChange={(v) => onChange(updateItem(items, p.id, { name: v }))}
              placeholder="Atlas Dashboard"
              span={2}
            />
            <Field
              label={bn ? "ভূমিকা" : "Role"}
              value={p.role}
              onChange={(v) => onChange(updateItem(items, p.id, { role: v }))}
              placeholder="Lead Developer"
              span={2}
            />
            <Field
              label={bn ? "URL" : "URL"}
              value={p.url}
              onChange={(v) => onChange(updateItem(items, p.id, { url: v }))}
              placeholder="github.com/you/project"
              span={2}
            />
            <Field
              label={bn ? "টেক" : "Tech"}
              value={p.tech}
              onChange={(v) => onChange(updateItem(items, p.id, { tech: v }))}
              placeholder="React · TypeScript"
              span={2}
            />
          </div>

          <div>
            <label className="block text-[10px] font-medium text-light-text dark:text-dark-text mb-1">
              {bn ? "বর্ণনা" : "Description"}
            </label>
            <textarea
              value={p.description}
              onChange={(e) =>
                onChange(updateItem(items, p.id, { description: e.target.value }))
              }
              rows={2}
              placeholder={
                bn ? "সংক্ষেপে প্রজেক্ট বর্ণনা করুন..." : "Brief description..."
              }
              className={cn(
                "w-full px-2.5 py-1.5 rounded-md text-[12px] resize-none",
                "bg-white/80 dark:bg-dark-surface/80",
                "border border-silk-rose/20 focus:border-silk-rose/50",
                "text-light-text dark:text-dark-text",
                "outline-none transition-all"
              )}
            />
          </div>
        </div>
      ))}

      <button
        type="button"
        onClick={() => onChange(addItem(items, EMPTY_PROJECT, "pr"))}
        className={cn(
          "w-full inline-flex items-center justify-center gap-1.5 h-10 rounded-xl",
          "bg-silk-rose/10 border border-dashed border-silk-rose/40",
          "text-silk-rose text-[12px] font-medium",
          "hover:bg-silk-rose/20 hover:border-silk-rose/60 transition-all"
        )}
      >
        <Plus className="w-4 h-4" />
        {bn ? "প্রজেক্ট যোগ করুন" : "Add project"}
      </button>
    </div>
  );
}

/* ─── Subs ─── */

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
