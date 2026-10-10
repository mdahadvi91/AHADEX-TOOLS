import { useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Download,
  FileText,
  ChevronUp,
  ChevronDown,
  Layers,
  CheckCircle2,
  Plus,
  Trash2,
} from "lucide-react";
import { useLanguage } from "@contexts/LanguageContext";
import { cn } from "@lib/cn";
import {
  WorkspacePanel,
  DropZone,
  ToolButton,
  ResultStat,
} from "@components/workspace";
import {
  readPdfInput,
  mergePdfs,
  downloadMerged,
  formatBytes,
  revokeMerged,
  MAX_FILES,
} from "../logic";
import type { PdfInput, MergedPdf } from "../types";

export function Workspace() {
  const { language } = useLanguage();
  const bn = language === "bn";

  const inputRef = useRef<HTMLInputElement>(null);
  const [files, setFiles] = useState<PdfInput[]>([]);
  const [busy, setBusy] = useState(false);
  const [drag, setDrag] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<MergedPdf | null>(null);

  const handleFiles = async (list: FileList | null) => {
    if (!list || list.length === 0) return;
    if (files.length + list.length > MAX_FILES) {
      setError(
        bn ? `সর্বোচ্চ ${MAX_FILES} ফাইল।` : `Max ${MAX_FILES} files.`
      );
      return;
    }
    setBusy(true);
    setError(null);
    const next: PdfInput[] = [];
    for (let i = 0; i < list.length; i++) {
      const f = await readPdfInput(list[i], setError);
      if (f) next.push(f);
    }
    setFiles((prev) => [...prev, ...next]);
    setBusy(false);
    if (inputRef.current) inputRef.current.value = "";
  };

  const remove = (id: string) => {
    setFiles((prev) => prev.filter((f) => f.id !== id));
    if (result) {
      revokeMerged(result);
      setResult(null);
    }
  };

  const move = (id: string, dir: "up" | "down") => {
    setFiles((prev) => {
      const i = prev.findIndex((f) => f.id === id);
      if (i < 0) return prev;
      const t = dir === "up" ? i - 1 : i + 1;
      if (t < 0 || t >= prev.length) return prev;
      const next = [...prev];
      [next[i], next[t]] = [next[t], next[i]];
      return next;
    });
    if (result) {
      revokeMerged(result);
      setResult(null);
    }
  };

  const clearAll = () => {
    setFiles([]);
    setError(null);
    if (result) revokeMerged(result);
    setResult(null);
    if (inputRef.current) inputRef.current.value = "";
  };

  const handleMerge = async () => {
    if (files.length < 2) {
      setError(bn ? "কমপক্ষে ২টি PDF দিন।" : "Add at least two PDFs.");
      return;
    }
    setBusy(true);
    setError(null);
    try {
      if (result) revokeMerged(result);
      const res = await mergePdfs(files);
      setResult(res);
      downloadMerged(res, `merged-${Date.now()}.pdf`);
      
    } catch (e) {
      setError(e instanceof Error ? e.message : "Merge failed");
    } finally {
      setBusy(false);
    }
  };

  const totalPages = files.reduce((s, f) => s + f.pageCount, 0);
  const totalSize = files.reduce((s, f) => s + f.size, 0);

  return (
    <section className="pb-12 space-y-4 sm:space-y-5">
      <input
        ref={inputRef}
        type="file"
        accept="application/pdf,.pdf"
        multiple
        onChange={(e) => void handleFiles(e.target.files)}
        className="hidden"
      />

      {files.length === 0 && (
        <DropZone
          onFiles={handleFiles}
          accept="application/pdf,.pdf"
          multiple
          busy={busy}
          drag={drag}
          onDragChange={setDrag}
          title={
            busy
              ? bn
                ? "লোড হচ্ছে..."
                : "Loading..."
              : bn
                ? "PDF ফাইল ড্রপ করুন"
                : "Drop your PDF files"
          }
          subtitle={
            bn
              ? "কমপক্ষে ২টি · সর্বোচ্চ ২০টি · প্রতি ফাইল ১০০ MB"
              : "At least 2 · Up to 20 files · 100 MB each"
          }
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

      {files.length > 0 && (
        <>
          {/* Stats */}
          <div className="grid grid-cols-3 gap-2.5 sm:gap-3">
            <ResultStat
              label={bn ? "ফাইল" : "Files"}
              value={String(files.length)}
              accent="rose"
            />
            <ResultStat
              label={bn ? "মোট পেজ" : "Pages"}
              value={String(totalPages)}
              accent="rose"
            />
            <ResultStat
              label={bn ? "সাইজ" : "Size"}
              value={formatBytes(totalSize)}
              accent="rose"
            />
          </div>

          {/* Action bar */}
          <WorkspacePanel className="p-3.5 sm:p-4" animate={false}>
            <div className="flex items-center justify-between gap-3 flex-wrap">
              <div className="flex items-center gap-2 text-[12px] sm:text-[13px] text-light-text dark:text-dark-text">
                <Layers className="w-4 h-4 text-silk-rose shrink-0" />
                <span className="font-bold">
                  {files.length} {bn ? "টি ফাইল" : "files"}
                </span>
              </div>

              <div className="flex items-center gap-2 flex-wrap">
                <ToolButton
                  size="sm"
                  variant="secondary"
                  icon={<Plus className="w-3.5 h-3.5" />}
                  onClick={() => inputRef.current?.click()}
                >
                  {bn ? "আরও যোগ" : "Add more"}
                </ToolButton>

                <ToolButton
                  size="sm"
                  variant="primary"
                  loading={busy}
                  disabled={files.length < 2}
                  icon={<Download className="w-3.5 h-3.5" />}
                  onClick={() => void handleMerge()}
                >
                  {bn ? "মার্জ ও ডাউনলোড" : "Merge & Download"}
                </ToolButton>

                <button
                  type="button"
                  onClick={clearAll}
                  aria-label="Clear all"
                  className="w-8 h-8 rounded-xl flex items-center justify-center text-red-500 bg-red-500/10 border border-red-500/25 hover:bg-red-500/20 transition-all"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </WorkspacePanel>

          {/* File list */}
          <div className="space-y-2.5">
            <AnimatePresence>
              {files.map((f, i) => (
                <motion.div
                  key={f.id}
                  layout
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{
                    duration: 0.35,
                    delay: Math.min(i * 0.04, 0.3),
                    layout: { duration: 0.25 },
                  }}
                  className={cn(
                    "flex items-center gap-2.5 sm:gap-3 p-3 sm:p-3.5 rounded-2xl",
                    "bg-white/70 dark:bg-dark-surface/70 backdrop-blur-xl",
                    "border border-silk-rose/20 hover:border-silk-rose/40",
                    "transition-colors duration-300"
                  )}
                >
                  {/* Order number */}
                  <span className="w-6 h-6 rounded-md bg-silk-rose/15 text-silk-wine dark:text-silk-rose-soft text-[10px] font-bold flex items-center justify-center shrink-0 font-mono">
                    {i + 1}
                  </span>

                  {/* PDF icon */}
                  <span className="hidden sm:flex w-10 h-10 rounded-xl bg-silk-rose/10 border border-silk-rose/25 items-center justify-center shrink-0">
                    <FileText className="w-5 h-5 text-silk-rose" />
                  </span>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <p className="text-[12px] sm:text-sm font-bold text-light-text dark:text-dark-text truncate">
                      {f.name}
                    </p>
                    <p className="text-[10px] sm:text-[11px] text-light-textSecondary dark:text-dark-textSecondary mt-0.5 font-mono">
                      {f.pageCount} {bn ? "পেজ" : "pages"} · {formatBytes(f.size)}
                    </p>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-1 shrink-0">
                    <button
                      type="button"
                      onClick={() => move(f.id, "up")}
                      disabled={i === 0}
                      aria-label="Move up"
                      className="w-8 h-8 rounded-lg flex items-center justify-center text-silk-rose bg-silk-rose/5 border border-silk-rose/15 hover:bg-silk-rose/15 disabled:opacity-20 disabled:cursor-not-allowed transition-all"
                    >
                      <ChevronUp className="w-3.5 h-3.5" />
                    </button>
                    <button
                      type="button"
                      onClick={() => move(f.id, "down")}
                      disabled={i === files.length - 1}
                      aria-label="Move down"
                      className="w-8 h-8 rounded-lg flex items-center justify-center text-silk-rose bg-silk-rose/5 border border-silk-rose/15 hover:bg-silk-rose/15 disabled:opacity-20 disabled:cursor-not-allowed transition-all"
                    >
                      <ChevronDown className="w-3.5 h-3.5" />
                    </button>
                    <button
                      type="button"
                      onClick={() => remove(f.id)}
                      aria-label="Remove"
                      className="w-8 h-8 rounded-lg flex items-center justify-center text-red-500 bg-red-500/5 border border-red-500/15 hover:bg-red-500/15 transition-all"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* Result success card */}
          <AnimatePresence>
            {result && (
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 16 }}
                transition={{ duration: 0.4 }}
                className="flex items-center gap-3 p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30"
              >
                <CheckCircle2 className="w-6 h-6 text-emerald-600 dark:text-emerald-400 shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="text-[13px] sm:text-sm font-bold text-emerald-700 dark:text-emerald-300">
                    {bn ? "মার্জ সফল হয়েছে!" : "Merge complete!"}
                  </p>
                  <p className="text-[10px] sm:text-[11px] text-emerald-700/80 dark:text-emerald-300/80 mt-0.5 font-mono">
                    {result.fileCount} {bn ? "ফাইল" : "files"} →{" "}
                    {result.totalPages} {bn ? "পেজ" : "pages"} ·{" "}
                    {formatBytes(result.size)}
                  </p>
                </div>
                <ToolButton
                  size="sm"
                  variant="primary"
                  icon={<Download className="w-3.5 h-3.5" />}
                  onClick={() =>
                    downloadMerged(result, `merged-${Date.now()}.pdf`)
                  }
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
