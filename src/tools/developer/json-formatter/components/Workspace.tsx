import { useMemo, useState } from "react";
import { Copy, ClipboardCheck, Download, X, Trash2, AlertCircle, CheckCircle2, Wand2, Minimize2 } from "lucide-react";
import { useLanguage } from "@contexts/LanguageContext";
import { cn } from "@lib/cn";
import { analyze, stringify, minify, formatBytes, formatNumber } from "../logic";
import type { IndentOption, OutputMode } from "../types";

const INDENTS: { value: IndentOption; label: string }[] = [
  { value: 2, label: "2 sp" },
  { value: 4, label: "4 sp" },
  { value: "tab", label: "Tab" },
];

export function Workspace() {
  const { language } = useLanguage();
  const bn = language === "bn";
  const [input, setInput] = useState("");
  const [indent, setIndent] = useState<IndentOption>(2);
  const [sortKeys, setSortKeys] = useState(false);
  const [mode, setMode] = useState<OutputMode>("formatted");
  const [copied, setCopied] = useState(false);

  const analysis = useMemo(() => analyze(input), [input]);

  const output = useMemo(() => {
    if (!analysis.valid || analysis.data === undefined) return "";
    try {
      return mode === "formatted"
        ? stringify(analysis.data, { indent, sortKeys })
        : minify(analysis.data);
    } catch {
      return "";
    }
  }, [analysis, indent, sortKeys, mode]);

  const handleCopy = async () => {
    if (!output) return;
    try {
      await navigator.clipboard.writeText(output);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch { /* ignore */ }
  };

  const handleDownload = () => {
    if (!output) return;
    const blob = new Blob([output], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "formatted.json";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const clearAll = () => {
    setInput("");
    setCopied(false);
  };

  return (
    <section className="pb-12 space-y-4">
      {/* Controls */}
      <div className="rounded-2xl bg-white/70 dark:bg-dark-surface/70 backdrop-blur-xl border border-silk-rose/20 p-3 space-y-3">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div>
            <p className="text-[10px] uppercase tracking-wider font-semibold text-silk-wine/70 dark:text-silk-rose/60 mb-2">{bn ? "ইন্ডেন্ট" : "Indent"}</p>
            <div className="grid grid-cols-3 gap-2">
              {INDENTS.map((i) => (
                <button key={String(i.value)} type="button" onClick={() => setIndent(i.value)} className={cn("h-9 rounded-lg border text-[11px] font-medium transition-all", indent === i.value ? "bg-silk-rose/15 border-silk-rose/50 text-silk-wine dark:text-silk-rose-soft" : "bg-silk-rose/5 border-silk-rose/15 text-light-textSecondary dark:text-dark-textSecondary hover:border-silk-rose/40")}>
                  {i.label}
                </button>
              ))}
            </div>
          </div>

          <div>
            <p className="text-[10px] uppercase tracking-wider font-semibold text-silk-wine/70 dark:text-silk-rose/60 mb-2">{bn ? "মোড" : "Mode"}</p>
            <div className="grid grid-cols-2 gap-2">
              <button type="button" onClick={() => setMode("formatted")} className={cn("h-9 rounded-lg border text-[11px] font-medium transition-all inline-flex items-center justify-center gap-1", mode === "formatted" ? "bg-silk-rose/15 border-silk-rose/50 text-silk-wine dark:text-silk-rose-soft" : "bg-silk-rose/5 border-silk-rose/15 text-light-textSecondary dark:text-dark-textSecondary hover:border-silk-rose/40")}>
                <Wand2 className="w-3 h-3" /> Format
              </button>
              <button type="button" onClick={() => setMode("minified")} className={cn("h-9 rounded-lg border text-[11px] font-medium transition-all inline-flex items-center justify-center gap-1", mode === "minified" ? "bg-silk-rose/15 border-silk-rose/50 text-silk-wine dark:text-silk-rose-soft" : "bg-silk-rose/5 border-silk-rose/15 text-light-textSecondary dark:text-dark-textSecondary hover:border-silk-rose/40")}>
                <Minimize2 className="w-3 h-3" /> Minify
              </button>
            </div>
          </div>

          <div>
            <p className="text-[10px] uppercase tracking-wider font-semibold text-silk-wine/70 dark:text-silk-rose/60 mb-2">{bn ? "অপশন" : "Options"}</p>
            <button type="button" onClick={() => setSortKeys((v) => !v)} className={cn("h-9 w-full rounded-lg border text-[11px] font-medium transition-all", sortKeys ? "bg-silk-rose/15 border-silk-rose/50 text-silk-wine dark:text-silk-rose-soft" : "bg-silk-rose/5 border-silk-rose/15 text-light-textSecondary dark:text-dark-textSecondary hover:border-silk-rose/40")}>
              {sortKeys ? "✓ " : ""}{bn ? "Sort keys" : "Sort keys"}
            </button>
          </div>
        </div>
      </div>

      {/* Input */}
      <div className="rounded-2xl bg-white/70 dark:bg-dark-surface/70 backdrop-blur-xl border border-silk-rose/20 overflow-hidden">
        <div className="flex items-center justify-between gap-2 px-4 py-2.5 border-b border-silk-rose/15">
          <span className="text-[11px] font-semibold text-light-text dark:text-dark-text">{bn ? "ইনপুট" : "Input"}</span>
          <div className="flex items-center gap-2">
            {analysis.valid && input.trim() && (
              <span className="inline-flex items-center gap-1 text-[10px] text-emerald-600 dark:text-emerald-400">
                <CheckCircle2 className="w-3 h-3" /> {bn ? "ভ্যালিড" : "Valid"}
              </span>
            )}
            {!analysis.valid && (
              <span className="inline-flex items-center gap-1 text-[10px] text-red-600 dark:text-red-400">
                <AlertCircle className="w-3 h-3" /> {bn ? "ভুল" : "Invalid"}
              </span>
            )}
            {input.length > 0 && (
              <button type="button" onClick={clearAll} className="inline-flex items-center gap-1 text-[11px] text-red-500 hover:bg-red-500/10 px-2 py-1 rounded-md transition-colors">
                <Trash2 className="w-3 h-3" /> {bn ? "মুছুন" : "Clear"}
              </button>
            )}
          </div>
        </div>
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={bn ? '{"hello": "world", "items": [1, 2, 3]}' : '{"hello": "world", "items": [1, 2, 3]}'}
          spellCheck={false}
          className="w-full min-h-[220px] p-4 resize-y bg-transparent text-[13px] font-mono leading-relaxed text-light-text dark:text-dark-text placeholder:text-lightTextSecondary/50 dark:placeholder:text-darkTextSecondary/40 outline-none"
        />
      </div>

      {/* Error */}
      {!analysis.valid && analysis.error && (
        <div className="flex items-start gap-2 p-3 rounded-2xl bg-red-500/10 border border-red-500/30 text-[12px] text-red-600 dark:text-red-400">
          <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
          <div className="flex-1 min-w-0">
            <p className="font-semibold">{analysis.error.message}</p>
            {analysis.error.line != null && (
              <p className="mt-0.5 text-[11px]">
                {bn ? "লাইন" : "Line"} {analysis.error.line}
                {analysis.error.column != null ? `, ${bn ? "কলাম" : "column"} ${analysis.error.column}` : ""}
              </p>
            )}
          </div>
        </div>
      )}

      {/* Stats */}
      {input.trim() && (
        <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
          <Stat label={bn ? "বাইট" : "Bytes"} value={formatNumber(analysis.stats.bytes)} />
          <Stat label={bn ? "লাইন" : "Lines"} value={formatNumber(analysis.stats.lines)} />
          <Stat label={bn ? "অক্ষর" : "Chars"} value={formatNumber(analysis.stats.chars)} />
          <Stat label={bn ? "Keys" : "Keys"} value={formatNumber(analysis.stats.keys)} />
          <Stat label={bn ? "Arrays" : "Arrays"} value={formatNumber(analysis.stats.arrays)} />
          <Stat label={bn ? "Depth" : "Depth"} value={formatNumber(analysis.stats.depth)} />
        </div>
      )}

      {/* Output */}
      {analysis.valid && output && (
        <div className="rounded-2xl bg-white/70 dark:bg-dark-surface/70 backdrop-blur-xl border border-silk-rose/20 overflow-hidden">
          <div className="flex items-center justify-between gap-2 px-4 py-2.5 border-b border-silk-rose/15 flex-wrap">
            <span className="text-[11px] font-semibold text-light-text dark:text-dark-text">
              {bn ? "আউটপুট" : "Output"} · {formatBytes(new Blob([output]).size)}
            </span>
            <div className="flex items-center gap-2">
              <button type="button" onClick={() => void handleCopy()} className="inline-flex items-center gap-1.5 h-8 px-2.5 rounded-lg bg-silk-rose/10 border border-silk-rose/25 text-[11px] font-medium text-silk-rose hover:bg-silk-rose/20 transition-all">
                {copied ? <ClipboardCheck className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                {copied ? (bn ? "কপি হয়েছে" : "Copied") : (bn ? "কপি" : "Copy")}
              </button>
              <button type="button" onClick={handleDownload} className="inline-flex items-center gap-1.5 h-8 px-2.5 rounded-lg bg-emerald-600 text-white text-[11px] font-semibold hover:bg-emerald-700 transition-colors">
                <Download className="w-3.5 h-3.5" /> .json
              </button>
            </div>
          </div>
          <pre className="p-4 max-h-[420px] overflow-auto text-[12px] font-mono leading-relaxed text-light-text dark:text-dark-text whitespace-pre">
            {output}
          </pre>
        </div>
      )}

      {!input && (
        <div className="flex items-center justify-center gap-2 text-[11px] sm:text-xs text-lightTextSecondary dark:text-dark-textSecondary">
          <X className="w-3.5 h-3.5 text-silk-rose" />
          {bn ? "আপনার JSON ব্রাউজারেই প্রসেস হয়" : "Your JSON is processed in your browser"}
        </div>
      )}
    </section>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl bg-white/70 dark:bg-dark-surface/70 backdrop-blur-xl border border-silk-rose/20 p-2.5">
      <p className="font-display font-black text-[15px] text-silk-rose leading-none">{value}</p>
      <p className="text-[9px] uppercase tracking-wider text-lightTextSecondary dark:text-dark-textSecondary mt-1">{label}</p>
    </div>
  );
}
