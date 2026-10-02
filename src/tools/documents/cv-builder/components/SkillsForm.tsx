import { useLanguage } from "@contexts/LanguageContext";
import { cn } from "@lib/cn";
import { Plus, Trash2, GripVertical } from "lucide-react";
import type { CVSkill } from "../types";
import { addItem, removeItem, updateItem, moveItem } from "../logic/repeatableHelpers";

interface SkillsFormProps {
  items: CVSkill[];
  onChange: (next: CVSkill[]) => void;
}

const EMPTY_SKILL: Omit<CVSkill, "id"> = {
  name: "",
  level: 0,
};

export function SkillsForm({ items, onChange }: SkillsFormProps) {
  const { language } = useLanguage();
  const bn = language === "bn";

  return (
    <div className="space-y-3">
      {items.length === 0 && (
        <div className="text-center py-6 px-4 rounded-xl bg-silk-rose/5 border border-dashed border-silk-rose/30">
          <p className="text-[12px] text-lightTextSecondary dark:text-dark-textSecondary">
            {bn ? "কোনো স্কিল নেই। নিচে যোগ করুন।" : "No skills yet. Add one below."}
          </p>
        </div>
      )}

      {items.map((s, idx) => (
        <div
          key={s.id}
          className="flex items-center gap-2 p-2 rounded-xl bg-white/60 dark:bg-dark-surface/60 border border-silk-rose/20"
        >
          {/* Reorder handles */}
          <div className="flex flex-col gap-0.5">
            <button
              type="button"
              onClick={() => onChange(moveItem(items, s.id, "up"))}
              disabled={idx === 0}
              className="w-5 h-4 flex items-center justify-center text-silk-rose disabled:opacity-20 hover:bg-silk-rose/10 rounded text-[8px]"
              aria-label="Move up"
            >
              ▲
            </button>
            <button
              type="button"
              onClick={() => onChange(moveItem(items, s.id, "down"))}
              disabled={idx === items.length - 1}
              className="w-5 h-4 flex items-center justify-center text-silk-rose disabled:opacity-20 hover:bg-silk-rose/10 rounded text-[8px]"
              aria-label="Move down"
            >
              ▼
            </button>
          </div>

          {/* Name input */}
          <input
            type="text"
            value={s.name}
            onChange={(e) =>
              onChange(updateItem(items, s.id, { name: e.target.value }))
            }
            placeholder={bn ? "স্কিলের নাম" : "Skill name"}
            className={cn(
              "flex-1 h-8 px-2.5 rounded-md text-[12px]",
              "bg-white/80 dark:bg-dark-surface/80",
              "border border-silk-rose/20 focus:border-silk-rose/50",
              "text-light-text dark:text-dark-text",
              "placeholder:text-light-textSecondary/40",
              "outline-none transition-all"
            )}
          />

          {/* Level dots */}
          <div className="flex items-center gap-1" title={bn ? "লেভেল" : "Level"}>
            {[1, 2, 3, 4, 5].map((lvl) => (
              <button
                key={lvl}
                type="button"
                onClick={() =>
                  onChange(
                    updateItem(items, s.id, { level: s.level === lvl ? 0 : lvl })
                  )
                }
                aria-label={`Level ${lvl}`}
                className={cn(
                  "w-3 h-3 rounded-full transition-all",
                  s.level >= lvl
                    ? "bg-silk-rose"
                    : "bg-silk-rose/15 hover:bg-silk-rose/30"
                )}
              />
            ))}
          </div>

          {/* Remove */}
          <button
            type="button"
            onClick={() => onChange(removeItem(items, s.id))}
            className="w-7 h-7 rounded-md flex items-center justify-center text-red-500 hover:bg-red-500/10"
            aria-label="Remove skill"
          >
            <Trash2 className="w-3.5 h-3.5" />
          </button>
        </div>
      ))}

      <button
        type="button"
        onClick={() => onChange(addItem(items, EMPTY_SKILL, "sk"))}
        className={cn(
          "w-full inline-flex items-center justify-center gap-1.5 h-10 rounded-xl",
          "bg-silk-rose/10 border border-dashed border-silk-rose/40",
          "text-silk-rose text-[12px] font-medium",
          "hover:bg-silk-rose/20 hover:border-silk-rose/60 transition-all"
        )}
      >
        <Plus className="w-4 h-4" />
        {bn ? "স্কিল যোগ করুন" : "Add skill"}
      </button>
    </div>
  );
}

/* reserved for future drag-and-drop */
void GripVertical;
