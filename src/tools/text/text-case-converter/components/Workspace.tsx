import { useMemo, useState } from "react";
import { Copy, ClipboardCheck, Trash2, ArrowRight } from "lucide-react";
import { useLanguage } from "@contexts/LanguageContext";
import { cn } from "@lib/cn";
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
    } catch { /* ignore */ }
  };

  const clear = () => {
    setInput("");
    setCopied(false);
  };

  return (
    <section className="pb-12 space-y-4">
      {/* Case buttons */}
      <div className="rounded-2xl bg-white/70 dark:bg-dark-surface/70 backdrop-blur-xl border border-silk-rose/20 p-3">
        <p className="text-[10px] uppercase tracking-wider font-semibold text-silk-wine/70 dark:text-silk-rose/60 mb-2">
          {bn ? "কেস স্টাইল" : "Case style"}
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2">
          {CASES.map((c) => (
            <button
              key={c.id}
              type="button"
              onClick={() => setActive(c.id)}
              className={cn(
                "h-14 rounded-lg border text-left px-3 transition-all",
                active === c.id
                  ? "bg-silk-rose/15 border-silk-rose/50 text-silk-wine dark:text-silk-rose-soft"
                  : "bg-silk-rose/5 border-silk-rose/15 text-light-textSecondary dark:text-dark-textSecondary hover:border-silk-rose/40"
              )}
            >
              <div className="text-[11px] sm:text-[12px] font-semibold text-light-text dark:text-dark-text">
                {c.label}
              </div>
              <div className="text-[9px] sm:text-[10px] font-mono mt-0.5 opacity-60 truncate">
                {c.example}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Input */}
      <div className="rounded-2xl bg-white/70 dark:bg-dark-surface/70 backdrop-blur-xl border border-silk-rose/20 overflow-hidden">
        <div className="flex items-center justify-between gap-2 px-4 py-2.5 border-b border-silk-rose/15">
          <span className="text-[11px] font-semibold text-light-text dark:text-dark-text">
            {bn ? "ইনপুট" : "Input"}
          </span>
          {input.length > 0 && (
            <button type="button" onClick={clear} className="inline-flex items-center gap-1 text-[11px] text-red-500 hover:bg-red-500/10 px-2 py-1 rounded-md transition-colors">
              <Trash2 className="w-3 h-3" />
              {bn ? "মুছুন" : "Clear"}
            </button>
          )}
        </div>
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={bn ? "এখানে আপনার টেক্সট পেস্ট বা টাইপ করুন..." : "Paste or type your text here..."}
          spellCheck={false}
          className="w-full min-h-[160px] p-4 resize-y bg-transparent text-[14px] leading-relaxed text-light-text dark:text-dark-text placeholder:text-lightTextSecondary/50 dark:placeholder:text-darkTextSecondary/40 outline-none"
        />
        {overLimit && (
          <div className="px-4 py-2 text-[11px] text-red-500 border-t border-red-500/20 bg-red-500/5">
            {bn ? `সর্বোচ্চ ${formatNumber(MAX_CHARS)} অক্ষর।` : `Max ${formatNumber(MAX_CHARS)} characters.`}
          </div>
        )}
      </div>

      {/* Arrow indicator */}
      {input && (
        <div className="flex justify-center">
          <ArrowRight className="w-4 h-4 text-silk-rose/60 rotate-90" />
        </div>
      )}

      {/* Output */}
      {output && (
        <div className="rounded-2xl bg-white/70 dark:bg-dark-surface/70 backdrop-blur-xl border border-silk-rose/20 overflow-hidden">
          <div className="flex items-center justify-between gap-2 px-4 py-2.5 border-b border-silk-rose/15">
            <span className="text-[11px] font-semibold text-light-text dark:text-dark-text">
              {bn ? "আউটপুট" : "Output"}
            </span>
            <button type="button" onClick={() => void handleCopy()} className="inline-flex items-center gap-1.5 h-8 px-2.5 rounded-lg bg-silk-rose/10 border border-silk-rose/25 text-[11px] font-medium text-silk-rose hover:bg-silk-rose/20 transition-all">
              {copied ? <ClipboardCheck className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              {copied ? (bn ? "কপি হয়েছে" : "Copied") : (bn ? "কপি" : "Copy")}
            </button>
          </div>
          <pre className="p-4 min-h-[120px] max-h-[360px] overflow-auto text-[14px] leading-relaxed text-light-text dark:text-dark-text whitespace-pre-wrap break-words">
            {output}
          </pre>
        </div>
      )}

      {!input && (
        <div className="flex items-center justify-center gap-2 text-[11px] sm:text-xs text-lightTextSecondary dark:text-dark-textSecondary">
          <Type className="w-3.5 h-3.5 text-silk-rose" />
          {bn ? "আপনার টেক্সট ব্রাউজারেই প্রসেস হয়" : "Your text is processed in your browser"}
        </div>
      )}
    </section>
  );
}
