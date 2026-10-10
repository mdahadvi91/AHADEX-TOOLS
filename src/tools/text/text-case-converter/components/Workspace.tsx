import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Type,
  Sparkles,
} from "lucide-react";
import { useLanguage } from "@contexts/LanguageContext";
import { cn } from "@lib/cn";
import { TextPanel, WorkspacePanel } from "@components/workspace";
import { convert, formatNumber, MAX_CHARS } from "../logic";
import type { CaseType, CaseDefinition } from "../types";

const CASES: CaseDefinition[] = [
  { id: "upper", label: "UPPERCASE", labelBn: "UPPERCASE", example: "HELLO WORLD" },
  { id: "lower", label: "lowercase", labelBn: "lowercase", example: "hello world" },
  { id: "title", label: "Title Case", labelBn: "Title Case", example: "Hello World" },
  { id: "sentence", label: "Sentence case", labelBn: "Sentence case", example: "Hello world" },
  { id: "camel", label: "camelCase", labelBn: "camelCase", example: "helloWorld" },
  { id: "pascal", label: "PascalCase", labelBn: "PascalCase", example: "HelloWorld" },
  { id: "snake", label: "snake_case", labelBn: "snake_case", example: "hello_world" },
  { id: "kebab", label: "kebab-case", labelBn: "kebab-case", example: "hello-world" },
  { id: "constant", label: "CONSTANT_CASE", labelBn: "CONSTANT_CASE", example: "HELLO_WORLD" },
  { id: "dot", label: "dot.case", labelBn: "dot.case", example: "hello.world" },
  { id: "alternating", label: "aLtErNaTiNg", labelBn: "aLtErNaTiNg", example: "hElLo WoRlD" },
  { id: "inverse", label: "iNVERSE", labelBn: "iNVERSE", example: "hELLO wORLD" },
];

export function Workspace() {
  const { language } = useLanguage();
  const bn = language === "bn";

  const [input, setInput] = useState("");
  const [active, setActive] = useState<CaseType>("upper");
  const [copied, setCopied] = useState(false);

  const output = useMemo(() => convert(input, active), [input, active]);
  const overLimit = input.length > MAX_CHARS;

  const handleCopy = async () => {
    if (!output) return;
    try {
      await navigator.clipboard.writeText(output);
      setCopied(true);
      
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* ignore */
    }
  };

  const clear = () => {
    setInput("");
    setCopied(false);
  };

  const activeCase = CASES.find((c) => c.id === active);

  return (
    <section className="pb-12 space-y-4 sm:space-y-5">
      {/* ── Case style grid ── */}
      <WorkspacePanel className="p-3.5 sm:p-4 space-y-3">
        <div className="flex items-center gap-2">
          <span className="w-7 h-7 rounded-lg bg-silk-rose/15 border border-silk-rose/25 flex items-center justify-center">
            <Sparkles className="w-3.5 h-3.5 text-silk-rose" />
          </span>
          <span className="text-[12px] sm:text-sm font-bold text-light-text dark:text-dark-text">
            {bn ? "কেস স্টাইল" : "Case style"}
          </span>
          {activeCase && (
            <span className="ml-auto text-[10px] font-mono font-bold text-silk-rose bg-silk-rose/10 px-2 py-0.5 rounded-md">
              {activeCase.label}
            </span>
          )}
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2">
          {CASES.map((c, i) => {
            const isActive = active === c.id;
            return (
              <motion.button
                key={c.id}
                type="button"
                onClick={() => {
                  setActive(c.id);
                  
                }}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: Math.min(i * 0.03, 0.3) }}
                className={cn(
                  "relative h-[58px] rounded-xl border text-left px-3 overflow-hidden transition-all duration-300",
                  isActive
                    ? "bg-gradient-to-br from-silk-rose/20 via-silk-rose/10 to-silk-gold/10 border-silk-rose/50 shadow-[0_10px_24px_-12px_rgba(139,58,79,0.5)]"
                    : "bg-silk-rose/5 border-silk-rose/15 hover:border-silk-rose/40 hover:bg-silk-rose/8"
                )}
              >
                {isActive && (
                  <span
                    aria-hidden="true"
                    className="absolute -top-6 -right-6 w-16 h-16 rounded-full bg-silk-rose/25 blur-2xl pointer-events-none"
                  />
                )}
                <div
                  className={cn(
                    "relative text-[11px] sm:text-[12px] font-bold",
                    isActive
                      ? "text-silk-wine dark:text-silk-rose-soft"
                      : "text-light-text dark:text-dark-text"
                  )}
                >
                  {c.label}
                </div>
                <div className="relative text-[9px] sm:text-[10px] font-mono mt-0.5 opacity-60 truncate text-light-textSecondary dark:text-dark-textSecondary">
                  {c.example}
                </div>
              </motion.button>
            );
          })}
        </div>
      </WorkspacePanel>

      {/* ── Input ── */}
      <TextPanel
        label={bn ? "ইনপুট" : "Input"}
        value={input}
        onChange={setInput}
        placeholder={
          bn
            ? "এখানে আপনার টেক্সট পেস্ট বা টাইপ করুন..."
            : "Paste or type your text here..."
        }
        minHeight="min-h-[160px]"
        mono={false}
        onClear={input.length > 0 ? clear : undefined}
        meta={
          input.length > 0
            ? `${formatNumber(input.length)} / ${formatNumber(MAX_CHARS)}`
            : undefined
        }
      >
        {overLimit && (
          <div className="mx-4 mb-4 px-3.5 py-2.5 rounded-lg text-[11px] font-bold text-red-600 dark:text-red-400 bg-red-500/10 border border-red-500/30">
            {bn
              ? `সর্বোচ্চ ${formatNumber(MAX_CHARS)} অক্ষর।`
              : `Max ${formatNumber(MAX_CHARS)} characters.`}
          </div>
        )}
      </TextPanel>

      {/* ── Arrow indicator ── */}
      {input && (
        <div className="flex justify-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            className="w-8 h-8 rounded-full bg-silk-rose/15 border border-silk-rose/30 flex items-center justify-center"
          >
            <ArrowRight className="w-4 h-4 text-silk-rose rotate-90" />
          </motion.div>
        </div>
      )}

      {/* ── Output ── */}
      {output && (
        <TextPanel
          label={`${bn ? "আউটপুট" : "Output"} · ${activeCase?.label ?? ""}`}
          value={output}
          readOnly
          copied={copied}
          onCopy={handleCopy}
          minHeight="min-h-[120px]"
          mono={false}
        />
      )}

      {/* ── Empty state ── */}
      {!input && (
        <div className="flex items-center justify-center gap-2 text-[11px] sm:text-xs text-lightTextSecondary dark:text-dark-textSecondary">
          <Type className="w-3.5 h-3.5 text-silk-rose" />
          {bn
            ? "আপনার টেক্সট ব্রাউজারেই প্রসেস হয়"
            : "Your text is processed in your browser"}
        </div>
      )}
    </section>
  );
}
