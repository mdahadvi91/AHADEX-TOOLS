import { useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Download,
  X,
  FileText,
  RotateCw,
  RotateCcw,
  CheckCircle2,
  Settings2,
} from "lucide-react";
import { useLanguage } from "@contexts/LanguageContext";
import { cn } from "@lib/cn";
import { WorkspacePanel, DropZone, ToolButton, ResultStat } from "@components/workspace";
import {
  loadPdfFile,
  rotatePdf,
  downloadResult,
  revokeResult,
  formatBytes,
  parsePageRanges,
} from "../logic";
import type {
  LoadedPdf,
  RotateResult,
  RotationDelta,
  RotateTarget,
} from "../types";

export function Workspace() {
  const { language } = useLanguage();
  const bn = language === "bn";

  const inputRef = useRef<HTMLInputElement>(null);
  const [pdf, setPdf] = useState<LoadedPdf | null>(null);
  const [ranges, setRanges] = useState("");
  const [target, setTarget] = useState<RotateTarget>("all");
  const [delta, setDelta] = useState<RotationDelta | null>(null);
  const [busy, setBusy] = useState(false);
  const [drag, setDrag] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<RotateResult | null>(null);

  const handleFile = async (file: File) => {
    if (result) {
      revokeResult(result);
      setResult(null);
    }
    setError(null);
    setDelta(null);
    const loaded = await loadPdfFile(file, setError);
    if (loaded) setPdf(loaded);
  };

  const handleRotate = async () => {
    if (!pdf || delta == null) return;
    const pages =
      target === "all"
        ? Array.from({ length: pdf.pageCount }, (_, i) => i)
        : parsePageRanges(ranges, pdf.pageCount);
    if (pages.length === 0) {
      setError(
        bn ? "কোনো পেজ নির্বাচিত হয়নি।" : "No valid pages selected."
      );
      return;
    }
    setBusy(true);
    setError(null);
    try {
      if (result) revokeResult(result);
      const res = await rotatePdf(pdf, pages, delta);
      setResult(res);
      downloadResult(res);
      
    } catch (e) {
      setError(e instanceof Error ? e.message : "Rotation failed");
    } finally {
      setBusy(false);
    }
  };

  const clearAll = () => {
    if (result) revokeResult(result);
    setResult(null);
    setPdf(null);
    setRanges("");
    setDelta(null);
    setError(null);
    if (inputRef.current) inputRef.current.value = "";
  };

  const targetCount = pdf
    ? target === "all"
      ? pdf.pageCount
      : parsePageRanges(ranges, pdf.pageCount).length
    : 0;

  const deltaLabel =
    delta === 90
      ? "90° →"
      : delta === 180
        ? "180°"
        : delta === 270
          ? "← 90°"
          : "—";

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

          {/* ── Stats ── */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-3">
            <ResultStat
              label={bn ? "মোট পেজ" : "Total pages"}
              value={String(pdf.pageCount)}
              accent="rose"
            />
            <ResultStat
              label={bn ? "টার্গেট" : "Target"}
              value={String(targetCount)}
              accent="rose"
            />
            <ResultStat
              label={bn ? "রোটেশন" : "Rotation"}
              value={deltaLabel}
              accent="rose"
            />
            <ResultStat
              label={bn ? "আউটপুট" : "Output"}
              value={result ? formatBytes(result.size) : "—"}
              accent="emerald"
            />
          </div>

          {/* ── Settings ── */}
          <WorkspacePanel className="p-4 sm:p-5 space-y-4">
            <div className="flex items-center gap-2">
              <span className="w-7 h-7 rounded-lg bg-silk-rose/15 border border-silk-rose/25 flex items-center justify-center">
                <Settings2 className="w-3.5 h-3.5 text-silk-rose" />
              </span>
              <span className="text-[12px] sm:text-sm font-bold text-light-text dark:text-dark-text">
                {bn ? "রোটেশন সেটিংস" : "Rotation settings"}
              </span>
            </div>

            {/* Target */}
            <div>
              <p className="text-[10px] uppercase tracking-[0.2em] font-bold text-silk-wine/70 dark:text-silk-rose/60 mb-2.5">
                {bn ? "কোন পেজ" : "Which pages"}
              </p>
              <div className="grid grid-cols-2 gap-2">
                <ToggleBtn
                  active={target === "all"}
                  onClick={() => setTarget("all")}
                >
                  {bn
                    ? `সব পেজ (${pdf.pageCount})`
                    : `All pages (${pdf.pageCount})`}
                </ToggleBtn>
                <ToggleBtn
                  active={target === "selected"}
                  onClick={() => setTarget("selected")}
                >
                  {bn ? "নির্দিষ্ট পেজ" : "Selected pages"}
                </ToggleBtn>
              </div>
            </div>

            {/* Range input */}
            <AnimatePresence>
              {target === "selected" && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="overflow-hidden"
                >
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-light-textSecondary dark:text-dark-textSecondary mb-2">
                    {bn ? "পেজ রেঞ্জ" : "Page ranges"}
                  </label>
                  <input
                    type="text"
                    value={ranges}
                    onChange={(e) => setRanges(e.target.value)}
                    placeholder={bn ? "উদা: 1-3, 5, 7-9" : "e.g. 1-3, 5, 7-9"}
                    className="w-full h-11 px-3.5 rounded-xl text-[13px] font-mono bg-white/80 dark:bg-dark-surface/80 border border-silk-rose/20 focus:border-silk-rose/50 text-light-text dark:text-dark-text outline-none transition-all"
                  />
                </motion.div>
              )}
            </AnimatePresence>

            {/* Rotation */}
            <div className="pt-3 border-t border-silk-rose/10">
              <p className="text-[10px] uppercase tracking-[0.2em] font-bold text-silk-wine/70 dark:text-silk-rose/60 mb-2.5">
                {bn ? "রোটেশন" : "Rotation"}
              </p>
              <div className="grid grid-cols-3 gap-2">
                <RotateBtn
                  active={delta === 270}
                  onClick={() => setDelta(270)}
                  icon={<RotateCcw className="w-4 h-4" />}
                  label={bn ? "৯০° বামে" : "90° left"}
                />
                <RotateBtn
                  active={delta === 90}
                  onClick={() => setDelta(90)}
                  icon={<RotateCw className="w-4 h-4" />}
                  label={bn ? "৯০° ডানে" : "90° right"}
                />
                <RotateBtn
                  active={delta === 180}
                  onClick={() => setDelta(180)}
                  icon={<RotateCw className="w-4 h-4" />}
                  label="180°"
                />
              </div>
            </div>
          </WorkspacePanel>

          {/* ── Action bar ── */}
          <WorkspacePanel className="p-3.5 sm:p-4" animate={false}>
            <div className="flex items-center justify-between gap-3 flex-wrap">
              <div className="flex items-center gap-2 text-[12px] sm:text-[13px] text-light-text dark:text-dark-text">
                <RotateCw className="w-4 h-4 text-silk-rose shrink-0" />
                <span className="font-bold">
                  {target === "all"
                    ? bn
                      ? "সব পেজ rotate হবে"
                      : "All pages will rotate"
                    : `${targetCount} ${bn ? "পেজ rotate হবে" : "page(s) will rotate"}`}
                </span>
              </div>

              <ToolButton
                size="md"
                variant="primary"
                loading={busy}
                disabled={delta == null || targetCount === 0}
                icon={<RotateCw className="w-3.5 h-3.5" />}
                onClick={() => void handleRotate()}
              >
                {bn ? "রোটেট ও ডাউনলোড" : "Rotate & Download"}
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
                className="flex items-center gap-3 p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30"
              >
                <CheckCircle2 className="w-6 h-6 text-emerald-600 dark:text-emerald-400 shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="text-[13px] sm:text-sm font-bold text-emerald-700 dark:text-emerald-300">
                    {bn ? "রোটেশন সম্পন্ন!" : "Rotation complete!"}
                  </p>
                  <p className="text-[10px] sm:text-[11px] text-emerald-700/80 dark:text-emerald-300/80 mt-0.5 font-mono truncate">
                    {result.filename} · {formatBytes(result.size)}
                  </p>
                </div>
                <ToolButton
                  size="sm"
                  variant="primary"
                  icon={<Download className="w-3.5 h-3.5" />}
                  onClick={() => downloadResult(result)}
                >
                  {bn ? "আবার ডাউনলোড" : "Download again"}
                </ToolButton>
              </motion.div>
            )}
          </AnimatePresence>
        </>
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
        "h-11 rounded-xl border text-[12px] font-bold transition-all",
        active
          ? "bg-silk-rose/15 border-silk-rose/50 text-silk-wine dark:text-silk-rose-soft shadow-[0_6px_16px_-8px_rgba(139,58,79,0.35)]"
          : "bg-silk-rose/5 border-silk-rose/15 text-light-textSecondary dark:text-dark-textSecondary hover:border-silk-rose/40"
      )}
    >
      {children}
    </button>
  );
}

function RotateBtn({
  active,
  onClick,
  icon,
  label,
}: {
  active: boolean;
  onClick: () => void;
  icon: React.ReactNode;
  label: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "h-14 rounded-xl border text-[11px] font-bold transition-all flex flex-col items-center justify-center gap-1",
        active
          ? "bg-silk-rose/15 border-silk-rose/50 text-silk-wine dark:text-silk-rose-soft shadow-[0_6px_16px_-8px_rgba(139,58,79,0.35)]"
          : "bg-silk-rose/5 border-silk-rose/15 text-light-textSecondary dark:text-dark-textSecondary hover:border-silk-rose/40"
      )}
    >
      {icon}
      <span>{label}</span>
    </button>
  );
}
