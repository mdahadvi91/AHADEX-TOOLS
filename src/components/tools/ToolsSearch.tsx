import { useEffect, useRef, useState } from "react";
import { Search, X } from "lucide-react";
import { useLanguage } from "@contexts/LanguageContext";
import { cn } from "@lib/cn";
import { analytics } from "@lib/analytics";

interface ToolsSearchProps {
  value: string;
  onChange: (v: string) => void;
}

export function ToolsSearch({ value, onChange }: ToolsSearchProps) {
  const { t } = useLanguage();
  const [local, setLocal] = useState(value);
  const timeoutRef = useRef<number | null>(null);
  const lastFiredRef = useRef<string>("");

  // Sync from parent (e.g. when query cleared externally)
  useEffect(() => {
    setLocal(value);
  }, [value]);

  // Debounced search analytics — fires once per 800ms of typing pause
  useEffect(() => {
    if (timeoutRef.current) window.clearTimeout(timeoutRef.current);

    const trimmed = local.trim();
    if (trimmed.length < 2) return; // ignore 1-char noise

    timeoutRef.current = window.setTimeout(() => {
      if (trimmed !== lastFiredRef.current) {
        analytics.search(trimmed);
        lastFiredRef.current = trimmed;
      }
    }, 800);

    return () => {
      if (timeoutRef.current) window.clearTimeout(timeoutRef.current);
    };
  }, [local]);

  const handleChange = (v: string) => {
    setLocal(v);
    onChange(v);
  };

  return (
    <div className="relative max-w-md w-full">
      <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-silk-rose pointer-events-none" />
      <input
        type="search"
        value={local}
        onChange={(e) => handleChange(e.target.value)}
        placeholder={t.tools.searchPlaceholder}
        className={cn(
          "w-full h-12 pl-11 pr-11 rounded-full",
          "bg-white/70 dark:bg-dark-surface/70 backdrop-blur-xl",
          "border border-silk-rose/20 focus:border-silk-rose/50",
          "text-sm text-light-text dark:text-dark-text",
          "placeholder:text-light-textSecondary/60 dark:placeholder:text-dark-textSecondary/50",
          "outline-none transition-all"
        )}
      />
      {local && (
        <button
          type="button"
          onClick={() => handleChange("")}
          aria-label={t.common.clear}
          className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 rounded-full bg-silk-rose/20 flex items-center justify-center text-silk-wine dark:text-silk-rose-soft hover:bg-silk-rose/30 transition-colors"
        >
          <X className="w-3 h-3" />
        </button>
      )}
    </div>
  );
}
