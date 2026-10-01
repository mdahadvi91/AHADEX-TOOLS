import { useState, useMemo, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Search, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { tools } from "@data/tools";
import { cn } from "@lib/cn";

export function HeroSearch() {
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];
    return tools
      .filter((t) =>
        [t.name, t.description, t.category, ...t.keywords]
          .join(" ")
          .toLowerCase()
          .includes(q)
      )
      .slice(0, 6);
  }, [query]);

  useEffect(() => {
    const onClickOut = (e: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", onClickOut);
    return () => document.removeEventListener("mousedown", onClickOut);
  }, []);

  const handleSelect = (path: string) => {
    navigate(path);
    setQuery("");
    setOpen(false);
  };

  const onKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!open || results.length === 0) return;
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIndex((i) => (i + 1) % results.length);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex((i) => (i - 1 + results.length) % results.length);
    } else if (e.key === "Enter") {
      e.preventDefault();
      const r = results[activeIndex];
      if (r) handleSelect(r.path);
    } else if (e.key === "Escape") {
      setOpen(false);
      (e.target as HTMLInputElement).blur();
    }
  };

  return (
    <div ref={wrapperRef} className="relative w-full max-w-2xl mx-auto">
      <div
        className={cn(
          "flex items-center gap-3 px-5 h-14 lg:h-16 rounded-full",
          "bg-white/80 dark:bg-dark-surface/80 backdrop-blur-2xl",
          "border border-silk-rose/25 dark:border-silk-rose/20",
          "shadow-[0_8px_30px_-8px_rgba(139,58,79,0.2)]",
          "transition-all duration-300",
          "focus-within:border-silk-rose/60 focus-within:shadow-[0_12px_40px_-8px_rgba(139,58,79,0.35)]"
        )}
      >
        <Search className="w-5 h-5 text-silk-rose shrink-0" />
        <input
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setOpen(true);
            setActiveIndex(0);
          }}
          onFocus={() => setOpen(true)}
          onKeyDown={onKey}
          placeholder="Try 'JPG to PNG', 'PDF merge', 'QR code'..."
          className="flex-1 bg-transparent outline-none text-base text-light-text dark:text-dark-text placeholder:text-light-textSecondary/60 dark:placeholder:text-dark-textSecondary/50"
        />
        <kbd className="hidden sm:inline-flex items-center gap-1 px-2 py-1 rounded-md text-[10px] font-mono bg-silk-rose/10 text-silk-rose border border-silk-rose/20">
          ⌘K
        </kbd>
      </div>

      <AnimatePresence>
        {open && results.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className={cn(
              "absolute top-full left-0 right-0 mt-3 py-2 z-30",
              "bg-white/95 dark:bg-dark-surface/95 backdrop-blur-2xl",
              "border border-silk-rose/25 rounded-3xl",
              "shadow-[0_20px_60px_-15px_rgba(139,58,79,0.3)]",
              "overflow-hidden"
            )}
          >
            {results.map((tool, i) => (
              <button
                key={tool.id}
                type="button"
                onMouseEnter={() => setActiveIndex(i)}
                onClick={() => handleSelect(tool.path)}
                className={cn(
                  "w-full flex items-center gap-3 px-5 py-3 text-left transition-colors",
                  i === activeIndex ? "bg-silk-rose/10" : "hover:bg-silk-rose/5"
                )}
              >
                <span className="w-9 h-9 rounded-xl bg-silk-rose/15 flex items-center justify-center shrink-0">
                  <span className="text-silk-wine dark:text-silk-rose font-display font-bold text-sm">
                    {tool.name.charAt(0)}
                  </span>
                </span>
                <span className="flex-1 min-w-0">
                  <span className="block text-sm font-medium text-light-text dark:text-dark-text truncate">
                    {tool.name}
                  </span>
                  <span className="block text-xs text-light-textSecondary dark:text-dark-textSecondary truncate">
                    {tool.description}
                  </span>
                </span>
                <ArrowRight className="w-4 h-4 text-silk-rose opacity-0 group-hover:opacity-100 transition-opacity shrink-0" />
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
