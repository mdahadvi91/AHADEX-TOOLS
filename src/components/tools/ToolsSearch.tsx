import { Search, X } from "lucide-react";
import { cn } from "@lib/cn";

interface ToolsSearchProps {
  value: string;
  onChange: (v: string) => void;
}

export function ToolsSearch({ value, onChange }: ToolsSearchProps) {
  return (
    <div className="relative max-w-md w-full">
      <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-silk-rose pointer-events-none" />
      <input
        type="search"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search tools..."
        className={cn(
          "w-full h-12 pl-11 pr-11 rounded-full",
          "bg-white/70 dark:bg-dark-surface/70 backdrop-blur-xl",
          "border border-silk-rose/20 focus:border-silk-rose/50",
          "text-sm text-light-text dark:text-dark-text",
          "placeholder:text-light-textSecondary/60 dark:placeholder:text-dark-textSecondary/50",
          "outline-none transition-all"
        )}
      />
      {value && (
        <button
          type="button"
          onClick={() => onChange("")}
          aria-label="Clear search"
          className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 rounded-full bg-silk-rose/20 flex items-center justify-center text-silk-wine dark:text-silk-rose-soft hover:bg-silk-rose/30 transition-colors"
        >
          <X className="w-3 h-3" />
        </button>
      )}
    </div>
  );
}
