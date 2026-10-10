import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Download,
  Trash2,
  AlertCircle,
  CheckCircle2,
  Wand2,
  Minimize2,
} from "lucide-react";
import { useLanguage } from "@contexts/LanguageContext";
import { cn } from "@lib/cn";
import {
  TextPanel,
  ToolButton,
  WorkspacePanel,
  ResultStat,
} from "@components/workspace";
import {
  analyze,
  stringify,
  minify,
  formatBytes,
  formatNumber,
} from "../logic";
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
    } catch {
      /* ignore */
    }
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

  const loadSample = () => {
    setInput(
      JSON.stringify(
        {
          name: "AHADEX Tools",
          version: "1.0.0",
          tools: ["image-compressor", "merge-pdf", "json-formatter"],
          features: { free: true, private: true, noUploads: true },
          stats: { users: 1000, rating: 4.9 },
        },
        null,
        2
      )
    );
  };

  const inputBytes = input ? formatBytes(new Blob([input]).size) : "0 B";
  const outputBytes = output ? formatBytes(new Blob([output]).size) : "0 B";

  return (
    <section className="pb-12 space-y-4 sm:space-y-5">
      {/* Controls */}
      <WorkspacePanel className="p-3.5 sm:p-4 space-y-3.5">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {/* Indent */}
          <div>
            <p className="text-[10px] uppercase tracking-[0.2em] font-bold text-silk-wine/70 dark:text-silk-rose/60 mb-2">
              {bn ? "ইন্ডেন্ট" : "Indent"}
            </p>
            <div className="grid grid-cols-3 gap-2">
              {INDENTS.map((i) => (
                <ToggleBtn
                  key={String(i.value)}
                  active={indent === i.value}
                  onClick={() => setIndent(i.value)}
                >
                  {i.label}
                </ToggleBtn>
              ))}
            </div>
          </div>

          {/* Mode */}
          <div>
            <p className="text-[10px] uppercase tracking-[0.2em] font-bold text-silk-wine/70 dark:text-silk-rose/60 mb-2">
              {bn ? "মোড" : "Mode"}
            </p>
            <div className="grid grid-cols-2 gap-2">
              <ToggleBtn
                active={mode === "formatted"}
                onClick={() => setMode("formatted")}
              >
                <Wand2 className="w-3.5 h-3.5" />
                Format
              </ToggleBtn>
              <ToggleBtn
                active={mode === "minified"}
                onClick={() => setMode("minified")}
              >
                <Minimize2 className="w-3.5 h-3.5" />
                Minify
              </ToggleBtn>
            </div>
          </div>

          {/* Options */}
          <div>
            <p className="text-[10px] uppercase tracking-[0.2em] font-bold text-silk-wine/70 dark:text-silk-rose/60 mb-2">
              {bn ? "অপশন" : "Options"}
            </p>
            <ToggleBtn
              active={sortKeys}
              onClick={() => setSortKeys((v) => !v)}
            >
              {sortKeys ? "✓ " : ""}
              {bn ? "কি সাজান" : "Sort keys"}
            </ToggleBtn>
          </div>
        </div>

        {/* Actions + Status */}
        <div className="flex items-center gap-2 flex-wrap pt-2 border-t border-silk-rose/10">
          <ToolButton
            size="sm"
            variant="secondary"
            icon={<Wand2 className="w-3.5 h-3.5" />}
            onClick={loadSample}
          >
            {bn ? "নমুনা" : "Sample"}
          </ToolButton>

          {input.trim() && (
            <ToolButton
              size="sm"
              variant="danger"
              icon={<Trash2 className="w-3.5 h-3.5" />}
              onClick={clearAll}
            >
              {bn ? "মুছুন" : "Clear"}
            </ToolButton>
          )}

          {input.trim() && (
            <span className="ml-auto inline-flex items-center gap-1.5 text-[10px] font-bold">
              {analysis.valid ? (
                <>
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                  <span className="text-emerald-600 dark:text-emerald-400">
                    {bn ? "ভ্যালিড JSON" : "Valid JSON"}
                  </span>
                </>
              ) : (
                <>
                  <AlertCircle className="w-3.5 h-3.5 text-red-500" />
                  <span className="text-red-600 dark:text-red-400">
                    {bn ? "ভুল JSON" : "Invalid JSON"}
                  </span>
                </>
              )}
            </span>
          )}
        </div>
      </WorkspacePanel>

      {/* Input */}
      <TextPanel
        label={bn ? "ইনপুট JSON" : "JSON input"}
        value={input}
        onChange={setInput}
        placeholder={'{\n  "hello": "world",\n  "items": [1, 2, 3]\n}'}
        minHeight="min-h-[220px]"
        onClear={input ? clearAll : undefined}
        meta={input ? inputBytes : undefined}
      />

      {/* Error */}
      <AnimatePresence>
        {!analysis.valid && analysis.error && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="flex items-start gap-2.5 p-3.5 rounded-xl bg-red-500/10 border border-red-500/30 text-[12px] sm:text-[13px] text-red-600 dark:text-red-400 font-medium"
          >
            <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
            <div className="flex-1 min-w-0">
              <p className="font-bold">{analysis.error.message}</p>
              {analysis.error.line != null && (
                <p className="mt-0.5 text-[11px] font-mono opacity-80">
                  {bn ? "লাইন" : "Line"} {analysis.error.line}
                  {analysis.error.column != null
                    ? `, ${bn ? "কলাম" : "column"} ${analysis.error.column}`
                    : ""}
                </p>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Stats */}
      {input.trim() && (
        <div className="grid grid-cols-3 sm:grid-cols-6 gap-2.5 sm:gap-3">
          <ResultStat
            label={bn ? "বাইট" : "Bytes"}
            value={formatNumber(analysis.stats.bytes)}
            accent="rose"
          />
          <ResultStat
            label={bn ? "লাইন" : "Lines"}
            value={formatNumber(analysis.stats.lines)}
            accent="rose"
          />
          <ResultStat
            label={bn ? "অক্ষর" : "Chars"}
            value={formatNumber(analysis.stats.chars)}
            accent="rose"
          />
          <ResultStat
            label={bn ? "Keys" : "Keys"}
            value={formatNumber(analysis.stats.keys)}
            accent="rose"
          />
          <ResultStat
            label={bn ? "Arrays" : "Arrays"}
            value={formatNumber(analysis.stats.arrays)}
            accent="rose"
          />
          <ResultStat
            label={bn ? "Depth" : "Depth"}
            value={formatNumber(analysis.stats.depth)}
            accent="rose"
          />
        </div>
      )}

      {/* Output */}
      {analysis.valid && output && (
        <TextPanel
          label={bn ? "ফরম্যাটেড JSON" : "Formatted JSON"}
          value={output}
          readOnly
          copied={copied}
          onCopy={handleCopy}
          meta={outputBytes}
        >
          <div className="flex items-center justify-end gap-2 px-4 pb-3">
            <ToolButton
              size="sm"
              variant="primary"
              icon={<Download className="w-3.5 h-3.5" />}
              onClick={handleDownload}
            >
              {bn ? "ডাউনলোড" : "Download .json"}
            </ToolButton>
          </div>
        </TextPanel>
      )}

      {/* Empty state */}
      {!input && (
        <div className="flex items-center justify-center gap-2 text-[11px] sm:text-xs text-lightTextSecondary dark:text-dark-textSecondary">
          <Wand2 className="w-3.5 h-3.5 text-silk-rose" />
          {bn
            ? "আপনার JSON ব্রাউজারেই প্রসেস হয়"
            : "Your JSON is processed in your browser"}
        </div>
      )}
    </section>
  );
}

function ToggleBtn({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "inline-flex items-center justify-center gap-1.5 h-9 rounded-xl border text-[11px] sm:text-[12px] font-bold transition-all px-2",
        active
          ? "bg-silk-rose/15 border-silk-rose/50 text-silk-wine dark:text-silk-rose-soft shadow-[0_6px_16px_-8px_rgba(139,58,79,0.35)]"
          : "bg-silk-rose/5 border-silk-rose/15 text-light-textSecondary dark:text-dark-textSecondary hover:border-silk-rose/40"
      )}
    >
      {children}
    </button>
  );
}
