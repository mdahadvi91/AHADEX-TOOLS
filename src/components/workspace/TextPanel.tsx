import { useRef, type ReactNode } from "react";
import { Copy, ClipboardCheck, Trash2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@contexts/LanguageContext";
import { cn } from "@lib/cn";

interface TextPanelProps {
  label: string;
  value: string;
  onChange?: (v: string) => void;
  placeholder?: string;
  readOnly?: boolean;
  mono?: boolean;
  minHeight?: string;
  copied?: boolean;
  onCopy?: () => void;
  onClear?: () => void;
  meta?: ReactNode;
  children?: ReactNode;
  className?: string;
}

export function TextPanel({
  label,
  value,
  onChange,
  placeholder,
  readOnly = false,
  mono = true,
  minHeight = "min-h-[140px]",
  copied = false,
  onCopy,
  onClear,
  meta,
  children,
  className,
}: TextPanelProps) {
  const { language } = useLanguage();
  const bn = language === "bn";
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  return (
    <div
      className={cn(
        "relative rounded-2xl overflow-hidden",
        "bg-white/70 dark:bg-dark-surface/70 backdrop-blur-xl",
        "border border-silk-rose/20",
        "transition-colors duration-300",
        "focus-within:border-silk-rose/45",
        className
      )}
    >
      {/* Header */}
      <div className="flex items-center justify-between gap-2 px-4 py-2.5 border-b border-silk-rose/15 flex-wrap">
        <span className="text-[11px] font-bold uppercase tracking-wider text-light-text dark:text-dark-text">
          {label}
        </span>

        <div className="flex items-center gap-2">
          {meta && (
            <span className="text-[10px] text-light-textSecondary dark:text-dark-textSecondary font-mono">
              {meta}
            </span>
          )}

          {onCopy && (
            <button
              type="button"
              onClick={() => {
                if (!value) return;
                
                onCopy();
              }}
              disabled={!value}
              className={cn(
                "inline-flex items-center gap-1.5 h-7 px-2.5 rounded-lg text-[10px] font-bold transition-all",
                "bg-silk-rose/10 border border-silk-rose/25 text-silk-rose",
                "hover:bg-silk-rose/20 hover:border-silk-rose/45",
                "disabled:opacity-40 disabled:cursor-not-allowed"
              )}
            >
              <AnimatePresence mode="wait" initial={false}>
                {copied ? (
                  <motion.span
                    key="check"
                    initial={{ scale: 0.7, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.7, opacity: 0 }}
                    className="inline-flex items-center gap-1"
                  >
                    <ClipboardCheck className="w-3 h-3" />
                    {bn ? "কপি হয়েছে" : "Copied"}
                  </motion.span>
                ) : (
                  <motion.span
                    key="copy"
                    initial={{ scale: 0.7, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.7, opacity: 0 }}
                    className="inline-flex items-center gap-1"
                  >
                    <Copy className="w-3 h-3" />
                    {bn ? "কপি" : "Copy"}
                  </motion.span>
                )}
              </AnimatePresence>
            </button>
          )}

          {onClear && value && (
            <button
              type="button"
              onClick={onClear}
              aria-label="Clear"
              className="inline-flex items-center justify-center w-7 h-7 rounded-lg text-red-500 bg-red-500/5 border border-red-500/15 hover:bg-red-500/15 transition-all"
            >
              <Trash2 className="w-3 h-3" />
            </button>
          )}
        </div>
      </div>

      {/* Textarea */}
      <textarea
        ref={textareaRef}
        value={value}
        onChange={onChange ? (e) => onChange(e.target.value) : undefined}
        readOnly={readOnly}
        placeholder={placeholder}
        spellCheck={false}
        className={cn(
          "w-full p-4 resize-y bg-transparent",
          minHeight,
          mono ? "text-[12.5px] sm:text-[13px] font-mono" : "text-[13px] sm:text-[14px]",
          "leading-relaxed text-light-text dark:text-dark-text",
          "placeholder:text-lightTextSecondary/50 dark:placeholder:text-darkTextSecondary/40",
          "outline-none"
        )}
      />

      {children}

      {/* Bottom accent */}
      <span
        aria-hidden="true"
        className="absolute bottom-0 left-1/2 -translate-x-1/2 h-[2px] w-24 rounded-full bg-gradient-to-r from-transparent via-silk-rose to-transparent opacity-0 focus-within:opacity-100 transition-opacity"
      />
    </div>
  );
}
