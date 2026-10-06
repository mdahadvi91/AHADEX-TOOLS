import { useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Download,
  X,
  FileText,
  Type,
  CheckCircle2,
  Copy,
  ClipboardCheck,
  Settings2,
} from "lucide-react";
import { useLanguage } from "@contexts/LanguageContext";
import { useSound } from "@contexts/SoundContext";
import { cn } from "@lib/cn";
import { WorkspacePanel, DropZone, ToolButton, ResultStat } from "@components/workspace";
import {
  loadPdfFile,
  extractText,
  downloadTxt,
  revokeTxt,
  formatBytes,
  parsePageRanges,
} from "../logic";
import type { LoadedPdf, ExtractResult } from "../types";

export function Workspace() {
  const { language } = useLanguage();
  const { play } = useSound();
  const bn = language === "bn";

  const inputRef = useRef<HTMLInputElement>(null);
  const [pdf, setPdf] = useState<LoadedPdf | null>(null);
  const [ranges, setRanges] = useState("");
  const [preserveLineBreaks, setPreserve] = useState(true);
  const [pageSeparator, setPageSep] = useState(false);
  const [busy, setBusy] = useState(false);
  const [drag, setDrag] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<ExtractResult | null>(null);
  const [copied, setCopied] = useState(false);

  const handleFile = async (file: File) => {
    if (result) {
      revokeTxt(result);
      setResult(null);
    }
    setError(null);
    const loaded = await loadPdfFile(file, setError);
    if (loaded) setPdf(loaded);
  };

  const handleExtract = async () => {
    if (!pdf) return;
    setBusy(true);
    setError(null);
    try {
      if (result) revokeTxt(result);
      const res = await extractText(pdf, {
        pageRanges: ranges,
        preserveLineBreaks,
        pageSeparator,
      });
      if (res.totalChars === 0) {
        setError(
          bn
            ? "কোনো টেক্সট পাওয়া যায়নি — PDF সম্ভবত স্ক্যান করা।"
            : "No text found — this PDF is probably a scan."
        );
        revokeTxt(res);
      } else {
        setResult(res);
        play("success");
      }
    } catch (e) {
      setError(e instanceof Error ? e.message : "Extraction failed");
    } finally {
      setBusy(false);
    }
  };

  const handleCopy = async () => {
    if (!result) return;
    try {
      const text = result.pages.map((p) => p.text).join("\n\n");
      await navigator.clipboard.writeText(text);
      setCopied(true);
      play("success");
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* ignore */
    }
  };

  const clearAll = () => {
    if (result) revokeTxt(result);
    setResult(null);
    setPdf(null);
    setRanges("");
    setError(null);
    if (inputRef.current) inputRef.current.value = "";
  };

  const parsedCount = pdf
    ? ranges.trim()
      ? parsePageRanges(ranges, pdf.pageCount).length
      : pdf.pageCount
    : 0;

  const previewText = result
    ? result.pages
        .map((p) => p.text)
        .join("\n\n")
        .slice(0, 5000)
    : "";

  return (
    <section className="pb-12 space-y-4 sm:space-y-5">
      <input
        ref={inputRef}
        type="file"
        accept="application/pdf,.pdf"
        onChange={(e) => {
          const f = e.target.files?.[0];
          if (f) void handleFile(f);
        }}
        className="hidden"
      />

      {!pdf && (
        <DropZone
          onFiles={(list) => {
            const f = list?.[0];
            if (f) void handleFile(f);
          }}
          accept="application/pdf,.pdf"
          busy={busy}
          drag={drag}
          onDragChange={setDrag}
          title={bn ? "PDF ফাইল ড্রপ করুন" : "Drop your PDF file"}
          subtitle={bn ? "একটি PDF · ১০০ MB পর্যন্ত" : "One PDF · Up to 100 MB"}
          icon={<FileText className="w-7 h-7 sm:w-9 sm:h-9 text-silk-rose" />}
        />
      )}

      <AnimatePresence>
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="p-3.5 rounded-xl bg-red-500/10 border border-red-500/30 text-[12px] sm:text-[13px] text-red-600 dark:text-red-400 font-medium"
          >
            {error}
          </motion.div>
        )}
      </AnimatePresence>

      {pdf && (
        <>
          {/* ── File info ── */}
          <WorkspacePanel className="p-3.5 sm:p-4">
            <div className="flex items-center gap-3">
              <span className="w-11 h-11 rounded-xl bg-silk-rose/10 border border-silk-rose/25 flex items-center justify-center shrink-0">
                <FileText className="w-5 h-5 text-silk-rose" />
              </span>
              <div className="flex-1 min-w-0">
                <p className="text-[13px] sm:text-sm font-bold text-light-text dark:text-dark-text truncate">
                  {pdf.name}
                </p>
                <p className="text-[10px] sm:text-[11px] text-light-textSecondary dark:text-dark-textSecondary mt-0.5 font-mono">
                  {pdf.pageCount} {bn ? "পেজ" : "pages"} · {formatBytes(pdf.size)}
                </p>
              </div>
              <button
                type="button"
                onClick={clearAll}
                aria-label="Clear"
                className="w-8 h-8 rounded-lg flex items-center justify-center text-red-500 bg-red-500/5 border border-red-500/15 hover:bg-red-500/15 transition-all shrink-0"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          </WorkspacePanel>

          {/* ── Settings ── */}
          <WorkspacePanel className="p-4 sm:p-5 space-y-4">
            <div className="flex items-center gap-2">
              <span className="w-7 h-7 rounded-lg bg-silk-rose/15 border border-silk-rose/25 flex items-center justify-center">
                <Settings2 className="w-3.5 h-3.5 text-silk-rose" />
              </span>
              <span className="text-[12px] sm:text-sm font-bold text-light-text dark:text-dark-text">
                {bn ? "এক্সট্রাক্ট সেটিংস" : "Extraction settings"}
              </span>
            </div>

            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-light-textSecondary dark:text-dark-textSecondary mb-2">
                {bn ? "পেজ রেঞ্জ (খালি = সব পেজ)" : "Page ranges (empty = all)"}
              </label>
              <input
                type="text"
                value={ranges}
                onChange={(e) => setRanges(e.target.value)}
                placeholder={bn ? "উদা: 1-3, 5, 7-9" : "e.g. 1-3, 5, 7-9"}
                className="w-full h-11 px-3.5 rounded-xl text-[13px] font-mono bg-white/80 dark:bg-dark-surface/80 border border-silk-rose/20 focus:border-silk-rose/50 text-light-text dark:text-dark-text outline-none transition-all"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-3 border-t border-silk-rose/10">
              <ToggleOption
                label={bn ? "লাইন ব্রেক সংরক্ষণ" : "Preserve line breaks"}
                active={preserveLineBreaks}
                onToggle={() => setPreserve((v) => !v)}
              />
              <ToggleOption
                label={bn ? "পেজ সেপারেটর" : "Page separators"}
                active={pageSeparator}
                onToggle={() => setPageSep((v) => !v)}
              />
            </div>

            <div className="flex items-center justify-between pt-3 border-t border-silk-rose/10 text-[10px] sm:text-[11px] text-light-textSecondary dark:text-dark-textSecondary">
              <span>
                {bn ? `মোট পেজ: ${pdf.pageCount}` : `Total: ${pdf.pageCount}`}
              </span>
              {parsedCount > 0 && (
                <span className="text-silk-rose font-bold">
                  {parsedCount} {bn ? "পেজ হবে" : "will extract"}
                </span>
              )}
            </div>
          </WorkspacePanel>

          {/* ── Action bar ── */}
          <WorkspacePanel className="p-3.5 sm:p-4" animate={false}>
            <div className="flex items-center justify-between gap-3 flex-wrap">
              <div className="flex items-center gap-2 text-[12px] sm:text-[13px] text-light-text dark:text-dark-text">
                <Type className="w-4 h-4 text-silk-rose shrink-0" />
                <span className="font-bold">
                  {bn ? "টেক্সট বের করার জন্য রেডি" : "Ready to extract"}
                </span>
              </div>

              <ToolButton
                size="md"
                variant="primary"
                loading={busy}
                disabled={parsedCount === 0}
                icon={<Type className="w-3.5 h-3.5" />}
                onClick={() => void handleExtract()}
              >
                {bn ? "টেক্সট বের করুন" : "Extract text"}
              </ToolButton>
            </div>
          </WorkspacePanel>

          {/* ── Result ── */}
          <AnimatePresence>
            {result && (
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 16 }}
                className="space-y-3"
              >
                <div className="grid grid-cols-3 gap-2.5 sm:gap-3">
                  <ResultStat
                    label={bn ? "পেজ" : "Pages"}
                    value={String(result.pages.length)}
                    accent="emerald"
                  />
                  <ResultStat
                    label={bn ? "শব্দ" : "Words"}
                    value={result.totalWords.toLocaleString()}
                    accent="emerald"
                  />
                  <ResultStat
                    label={bn ? "অক্ষর" : "Chars"}
                    value={result.totalChars.toLocaleString()}
                    accent="emerald"
                  />
                </div>

                <WorkspacePanel className="p-4 space-y-3" animate={false}>
                  <div className="flex items-center justify-between gap-3 flex-wrap">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0" />
                      <p className="text-[13px] sm:text-sm font-bold text-emerald-700 dark:text-emerald-300">
                        {bn ? "টেক্সট বের করা হয়েছে" : "Text extracted"}
                      </p>
                    </div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <ToolButton
                        size="sm"
                        variant="secondary"
                        icon={copied ? <ClipboardCheck className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                        onClick={() => void handleCopy()}
                      >
                        {copied ? (bn ? "কপি হয়েছে" : "Copied") : bn ? "কপি" : "Copy"}
                      </ToolButton>
                      <ToolButton
                        size="sm"
                        variant="primary"
                        icon={<Download className="w-3.5 h-3.5" />}
                        onClick={() => downloadTxt(result)}
                      >
                        .txt
                      </ToolButton>
                    </div>
                  </div>

                  <div className="max-h-80 overflow-y-auto rounded-xl bg-white/80 dark:bg-dark-surface/80 border border-silk-rose/15 p-3.5">
                    <pre className="text-[11px] sm:text-[12px] text-light-text dark:text-dark-text whitespace-pre-wrap break-words font-mono leading-relaxed">
                      {previewText}
                      {result.totalChars > 5000
                        ? "\n\n… (preview truncated)"
                        : ""}
                    </pre>
                  </div>
                </WorkspacePanel>
              </motion.div>
            )}
          </AnimatePresence>
        </>
      )}
    </section>
  );
}

function ToggleOption({
  label,
  active,
  onToggle,
}: {
  label: string;
  active: boolean;
  onToggle: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onToggle}
      className={cn(
        "flex items-center justify-between gap-3 h-11 px-3.5 rounded-xl border text-left transition-all",
        active
          ? "bg-silk-rose/15 border-silk-rose/50"
          : "bg-silk-rose/5 border-silk-rose/15 hover:border-silk-rose/40"
      )}
    >
      <span
        className={cn(
          "text-[11px] sm:text-[12px] font-bold",
          active
            ? "text-silk-wine dark:text-silk-rose-soft"
            : "text-light-textSecondary dark:text-dark-textSecondary"
        )}
      >
        {label}
      </span>
      <span
        className={cn(
          "relative w-9 h-5 rounded-full transition-all shrink-0",
          active ? "bg-silk-rose" : "bg-silk-rose/20"
        )}
      >
        <span
          className={cn(
            "absolute top-0.5 w-4 h-4 rounded-full bg-white shadow-sm transition-all",
            active ? "left-[18px]" : "left-0.5"
          )}
        />
      </span>
    </button>
  );
}
