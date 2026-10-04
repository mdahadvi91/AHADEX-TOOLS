import { useMemo, useState } from "react";
import { Copy, ClipboardCheck, ArrowLeftRight, AlertCircle, Trash2 } from "lucide-react";
import { useLanguage } from "@contexts/LanguageContext";
import { cn } from "@lib/cn";
import { transform, formatBytes, SAMPLES } from "../logic";
import type { Mode, Scope } from "../types";

export function Workspace() {
  const { language } = useLanguage();
  const bn = language === "bn";
  const [input, setInput] = useState("");
  const [mode, setMode] = useState<Mode>("encode");
  const [scope, setScope] = useState<Scope>("component");
  const [copied, setCopied] = useState(false);

  const result = useMemo(() => transform(input, mode, scope), [input, mode, scope]);

  const handleCopy = async () => {
    if (!result.output) return;
    try {
      await navigator.clipboard.writeText(result.output);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch { /* ignore */ }
  };

  const swap = () => {
    setInput(result.output);
    setMode(mode === "encode" ? "decode" : "encode");
  };

  const loadSample = () => {
    const s = SAMPLES[language];
    setInput(mode === "encode" ? (scope === "component" ? s.component : s.url) : s.encoded);
  };

  const delta = result.byteDelta;
  const deltaLabel =
    delta === 0
      ? bn ? "পরিবর্তন নেই" : "no change"
      : delta > 0
        ? `+${delta} B`
        : `${delta} B`;

  return (
    <section className="pb-12 space-y-4">
      {/* Controls */}
      <div className="rounded-2xl bg-white/70 dark:bg-dark-surface/70 backdrop-blur-xl border border-silk-rose/20 p-3 space-y-3">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <p className="text-[10px] uppercase tracking-wider font-semibold text-silk-wine/70 dark:text-silk-rose/60 mb-2">{bn ? "মোড" : "Mode"}</p>
            <div className="grid grid-cols-2 gap-2">
              <button type="button" onClick={() => setMode("encode")} className={cn("h-10 rounded-lg border text-[12px] font-medium transition-all", mode === "encode" ? "bg-silk-rose/15 border-silk-rose/50 text-silk-wine dark:text-silk-rose-soft" : "bg-silk-rose/5 border-silk-rose/15 text-light-textSecondary dark:text-dark-textSecondary hover:border-silk-rose/40")}>
                {bn ? "Encode" : "Encode"}
              </button>
              <button type="button" onClick={() => setMode("decode")} className={cn("h-10 rounded-lg border text-[12px] font-medium transition-all", mode === "decode" ? "bg-silk-rose/15 border-silk-rose/50 text-silk-wine dark:text-silk-rose-soft" : "bg-silk-rose/5 border-silk-rose/15 text-light-textSecondary dark:text-dark-textSecondary hover:border-silk-rose/40")}>
                {bn ? "Decode" : "Decode"}
              </button>
            </div>
          </div>

          <div>
            <p className="text-[10px] uppercase tracking-wider font-semibold text-silk-wine/70 dark:text-silk-rose/60 mb-2">{bn ? "Scope" : "Scope"}</p>
            <div className="grid grid-cols-2 gap-2">
              <button type="button" onClick={() => setScope("component")} className={cn("h-10 rounded-lg border text-[12px] font-medium transition-all", scope === "component" ? "bg-silk-rose/15 border-silk-rose/50 text-silk-wine dark:text-silk-rose-soft" : "bg-silk-rose/5 border-silk-rose/15 text-light-textSecondary dark:text-dark-textSecondary hover:border-silk-rose/40")}>
                {bn ? "Component" : "Component"}
              </button>
              <button type="button" onClick={() => setScope("fullUri")} className={cn("h-10 rounded-lg border text-[12px] font-medium transition-all", scope === "fullUri" ? "bg-silk-rose/15 border-silk-rose/50 text-silk-wine dark:text-silk-rose-soft" : "bg-silk-rose/5 border-silk-rose/15 text-light-textSecondary dark:text-dark-textSecondary hover:border-silk-rose/40")}>
                {bn ? "Full URI" : "Full URI"}
              </button>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          <button type="button" onClick={swap} disabled={!result.output} className="inline-flex items-center gap-1.5 h-8 px-3 rounded-lg bg-silk-rose/10 border border-silk-rose/25 text-[11px] font-medium text-silk-rose hover:bg-silk-rose/20 transition-all disabled:opacity-40">
            <ArrowLeftRight className="w-3.5 h-3.5" />
            {bn ? "Swap" : "Swap"}
          </button>
          <button type="button" onClick={loadSample} className="inline-flex items-center gap-1.5 h-8 px-3 rounded-lg bg-silk-rose/10 border border-silk-rose/25 text-[11px] font-medium text-silk-rose hover:bg-silk-rose/20 transition-all">
            {bn ? "নমুনা" : "Sample"}
          </button>
          {input.length > 0 && (
            <button type="button" onClick={() => setInput("")} className="inline-flex items-center gap-1.5 h-8 px-3 rounded-lg text-[11px] font-medium text-red-500 hover:bg-red-500/10 transition-colors">
              <Trash2 className="w-3.5 h-3.5" />
              {bn ? "মুছুন" : "Clear"}
            </button>
          )}
          <span className="ml-auto text-[10px] text-lightTextSecondary dark:text-dark-textSecondary font-mono">
            {deltaLabel}
          </span>
        </div>
      </div>

      {/* Input */}
      <div className="rounded-2xl bg-white/70 dark:bg-dark-surface/70 backdrop-blur-xl border border-silk-rose/20 overflow-hidden">
        <div className="px-4 py-2.5 border-b border-silk-rose/15">
          <span className="text-[11px] font-semibold text-light-text dark:text-dark-text">
            {mode === "encode" ? (bn ? "Raw input" : "Raw input") : (bn ? "Encoded input" : "Encoded input")}
          </span>
        </div>
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={mode === "encode" ? (bn ? "যা encode করতে চান লিখুন বা paste করুন..." : "Paste or type text to encode...") : (bn ? "%20 à¦ à¦ªà¦°à¦¿ à¦¹à§ à¦ à¦à¦¨ à¦à¦à¦¨ à¦ªà§ à¦¸à§ à¦ à¦à¦à¦¨ à¦à¦°à§ à¦¨..." : "Paste a URL-encoded string...")}
          spellCheck={false}
          className="w-full min-h-[140px] p-4 resize-y bg-transparent text-[13px] font-mono leading-relaxed text-light-text dark:text-dark-text placeholder:text-lightTextSecondary/50 dark:placeholder:text-darkTextSecondary/40 outline-none"
        />
      </div>

      {/* Error */}
      {result.error && (
        <div className="flex items-start gap-2 p-3 rounded-2xl bg-red-500/10 border border-red-500/30 text-[12px] text-red-600 dark:text-red-400">
          <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
          <span>{result.error}</span>
        </div>
      )}

      {/* Output */}
      {result.output && (
        <div className="rounded-2xl bg-white/70 dark:bg-dark-surface/70 backdrop-blur-xl border border-silk-rose/20 overflow-hidden">
          <div className="flex items-center justify-between gap-2 px-4 py-2.5 border-b border-silk-rose/15 flex-wrap">
            <span className="text-[11px] font-semibold text-light-text dark:text-dark-text">
              {mode === "encode" ? (bn ? "Encoded output" : "Encoded output") : (bn ? "Decoded output" : "Decoded output")} · {formatBytes(new Blob([result.output]).size)}
            </span>
            <button type="button" onClick={() => void handleCopy()} className="inline-flex items-center gap-1.5 h-8 px-2.5 rounded-lg bg-silk-rose/10 border border-silk-rose/25 text-[11px] font-medium text-silk-rose hover:bg-silk-rose/20 transition-all">
              {copied ? <ClipboardCheck className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              {copied ? (bn ? "কপি হয়েছে" : "Copied") : (bn ? "কপি" : "Copy")}
            </button>
          </div>
          <pre className="p-4 max-h-[300px] overflow-auto text-[12px] font-mono leading-relaxed text-light-text dark:text-dark-text whitespace-pre-wrap break-all">
            {result.output}
          </pre>
        </div>
      )}

      {!input && (
        <div className="flex items-center justify-center gap-2 text-[11px] sm:text-xs text-lightTextSecondary dark:text-dark-textSecondary">
          <ArrowLeftRight className="w-3.5 h-3.5 text-silk-rose" />
          {bn ? "আপনার URL ব্রাউজারেই process হয়" : "Your URL is processed in your browser"}
        </div>
      )}
    </section>
  );
}
