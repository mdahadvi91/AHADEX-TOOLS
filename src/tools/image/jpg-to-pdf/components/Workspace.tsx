import { useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Download,
  CheckCircle2,
  FileText,
  ChevronUp,
  ChevronDown,
  Plus,
  Trash2,
  Settings2,
  FileDown,
} from "lucide-react";
import { useLanguage } from "@contexts/LanguageContext";
import { cn } from "@lib/cn";
import { WorkspacePanel, DropZone, ToolButton, ResultStat } from "@components/workspace";
import { addJpgPage, buildPdf, downloadPdf, formatBytes, revokePdf, MAX_PAGES } from "../logic";
import type { PdfPage, PdfResult } from "../types";

type PdfBuildOptions = {
  pageSize: "auto" | "a4" | "letter";
  orientation: "auto" | "portrait" | "landscape";
  margin: number;
};

export function Workspace() {
  const { language } = useLanguage();
  const bn = language === "bn";

  const inputRef = useRef<HTMLInputElement>(null);
  const [pages, setPages] = useState<PdfPage[]>([]);
  const [busy, setBusy] = useState(false);
  const [drag, setDrag] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<PdfResult | null>(null);
  const [pageSize, setPageSize] = useState<PdfBuildOptions["pageSize"]>("a4");
  const [orientation, setOrientation] = useState<PdfBuildOptions["orientation"]>("auto");
  const [margin, setMargin] = useState(10);

  const handleFiles = async (files: FileList | null) => {
    if (!files || files.length === 0) return;
    if (pages.length + files.length > MAX_PAGES) {
      setError(bn ? `সর্বোচ্চ ${MAX_PAGES} পেজ।` : `Max ${MAX_PAGES} pages.`);
      return;
    }
    setBusy(true);
    setError(null);
    const next: PdfPage[] = [];
    for (let i = 0; i < files.length; i++) {
      const p = await addJpgPage(files[i], setError);
      if (p) next.push(p);
    }
    setPages((prev) => [...prev, ...next]);
    setBusy(false);
    if (inputRef.current) inputRef.current.value = "";
  };

  const remove = (id: string) => {
    setPages((prev) => prev.filter((p) => p.id !== id));
    if (result) { revokePdf(result); setResult(null); }
  };

  const move = (id: string, dir: "up" | "down") => {
    setPages((prev) => {
      const idx = prev.findIndex((p) => p.id === id);
      if (idx < 0) return prev;
      const t = dir === "up" ? idx - 1 : idx + 1;
      if (t < 0 || t >= prev.length) return prev;
      const next = [...prev];
      [next[idx], next[t]] = [next[t], next[idx]];
      return next;
    });
  };

  const clearAll = () => {
    setPages([]);
    setError(null);
    if (result) revokePdf(result);
    setResult(null);
    if (inputRef.current) inputRef.current.value = "";
  };

  const handleExport = async () => {
    if (pages.length === 0) return;
    setBusy(true);
    setError(null);
    try {
      if (result) revokePdf(result);
      const res = await buildPdf(pages, { pageSize, orientation, margin });
      setResult(res);
      downloadPdf(res, `jpgs-${Date.now()}.pdf`);
      
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to build PDF");
    } finally { setBusy(false); }
  };

  const totalOriginal = pages.reduce((s, p) => s + p.originalSize, 0);

  return (
    <section className="pb-12 space-y-4 sm:space-y-5">
      <input ref={inputRef} type="file" accept="image/jpeg,image/jpg" multiple
        onChange={(e) => void handleFiles(e.target.files)} className="hidden" />

      {pages.length === 0 && (
        <DropZone onFiles={handleFiles} accept="image/jpeg,image/jpg" multiple busy={busy}
          drag={drag} onDragChange={setDrag}
          title={busy ? (bn ? "লোড হচ্ছে..." : "Loading...") : (bn ? "JPG ড্রপ করুন" : "Drop your JPGs")}
          subtitle={bn ? "JPG · একাধিক · সর্বোচ্চ ৫০ পেজ" : "JPG · Multiple · Up to 50 pages"}
          icon={<FileText className="w-7 h-7 sm:w-9 sm:h-9 text-silk-rose" />} />
      )}

      <AnimatePresence>
        {error && (
          <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}
            className="p-3.5 rounded-xl bg-red-500/10 border border-red-500/30 text-[12px] sm:text-[13px] text-red-600 dark:text-red-400 font-medium">
            {error}
          </motion.div>
        )}
      </AnimatePresence>

      {pages.length > 0 && (
        <>
          <WorkspacePanel className="p-4 sm:p-5 space-y-4">
            <div className="flex items-center gap-2">
              <span className="w-7 h-7 rounded-lg bg-silk-rose/15 border border-silk-rose/25 flex items-center justify-center">
                <Settings2 className="w-3.5 h-3.5 text-silk-rose" />
              </span>
              <span className="text-[12px] sm:text-sm font-bold text-light-text dark:text-dark-text">
                {bn ? "PDF সেটিংস" : "PDF settings"}
              </span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-light-textSecondary dark:text-dark-textSecondary mb-2">
                  {bn ? "পেজ সাইজ" : "Page size"}
                </label>
                <select value={pageSize} onChange={(e) => setPageSize(e.target.value as PdfBuildOptions["pageSize"])}
                  className="w-full h-10 px-3 rounded-xl text-[13px] font-bold bg-white/80 dark:bg-dark-surface/80 border border-silk-rose/20 focus:border-silk-rose/50 text-light-text dark:text-dark-text outline-none transition-all">
                  <option value="auto">Auto</option>
                  <option value="a4">A4</option>
                  <option value="letter">Letter</option>
                </select>
              </div>
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-light-textSecondary dark:text-dark-textSecondary mb-2">
                  {bn ? "অরিয়েন্টেশন" : "Orientation"}
                </label>
                <select value={orientation} onChange={(e) => setOrientation(e.target.value as PdfBuildOptions["orientation"])}
                  className="w-full h-10 px-3 rounded-xl text-[13px] font-bold bg-white/80 dark:bg-dark-surface/80 border border-silk-rose/20 focus:border-silk-rose/50 text-light-text dark:text-dark-text outline-none transition-all">
                  <option value="auto">Auto</option>
                  <option value="portrait">Portrait</option>
                  <option value="landscape">Landscape</option>
                </select>
              </div>
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-light-textSecondary dark:text-dark-textSecondary mb-2">
                  {bn ? "মার্জিন (মিমি)" : "Margin (mm)"}
                </label>
                <input type="number" min={0} max={50} value={margin}
                  onChange={(e) => setMargin(Math.max(0, parseInt(e.target.value) || 0))}
                  className="w-full h-10 px-3 rounded-xl text-[13px] font-mono font-bold bg-white/80 dark:bg-dark-surface/80 border border-silk-rose/20 focus:border-silk-rose/50 text-light-text dark:text-dark-text outline-none transition-all" />
              </div>
            </div>
          </WorkspacePanel>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-3">
            <ResultStat label={bn ? "পেজ" : "Pages"} value={String(pages.length)} accent="rose" />
            <ResultStat label={bn ? "ইনপুট" : "Input"} value={formatBytes(totalOriginal)} accent="rose" />
            <ResultStat label={bn ? "পেজ" : "Page"} value={pageSize.toUpperCase()} accent="rose" />
            <ResultStat label={bn ? "আউটপুট" : "Output"} value={result ? formatBytes(result.size) : "—"} accent="emerald" />
          </div>

          <WorkspacePanel className="p-3.5 sm:p-4" animate={false}>
            <div className="flex items-center justify-between gap-3 flex-wrap">
              <div className="flex items-center gap-2 text-[12px] sm:text-[13px] text-light-text dark:text-dark-text">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                <span className="font-bold">{pages.length} {bn ? "টি পেজ রেডি" : "pages ready"}</span>
              </div>
              <div className="flex items-center gap-2 flex-wrap">
                <ToolButton size="sm" variant="secondary" icon={<Plus className="w-3.5 h-3.5" />}
                  onClick={() => inputRef.current?.click()}>
                  {bn ? "আরও" : "Add more"}
                </ToolButton>
                <ToolButton size="sm" variant="primary" loading={busy} icon={<FileDown className="w-3.5 h-3.5" />}
                  onClick={() => void handleExport()}>
                  {bn ? "PDF ডাউনলোড" : "Export PDF"}
                </ToolButton>
                <button type="button" onClick={clearAll} aria-label="Clear"
                  className="w-8 h-8 rounded-xl flex items-center justify-center text-red-500 bg-red-500/10 border border-red-500/25 hover:bg-red-500/20 transition-all">
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </WorkspacePanel>

          <div className="space-y-2.5">
            <AnimatePresence>
              {pages.map((p, idx) => (
                <motion.div key={p.id} layout
                  initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.35, delay: Math.min(idx * 0.03, 0.3), layout: { duration: 0.25 } }}
                  className={cn(
                    "group flex items-center gap-2.5 sm:gap-3 p-3 sm:p-3.5 rounded-2xl",
                    "bg-white/70 dark:bg-dark-surface/70 backdrop-blur-xl",
                    "border border-silk-rose/20 hover:border-silk-rose/40 transition-colors duration-300"
                  )}>
                  <span className="w-6 h-6 rounded-md bg-silk-rose/15 text-silk-wine dark:text-silk-rose-soft text-[10px] font-bold flex items-center justify-center shrink-0 font-mono">
                    {idx + 1}
                  </span>
                  <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl overflow-hidden bg-silk-rose/5 border border-silk-rose/15 flex items-center justify-center shrink-0">
                    <img src={p.dataUrl} alt={p.originalName} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[12px] sm:text-sm font-bold text-light-text dark:text-dark-text truncate">
                      {p.originalName}
                    </p>
                    <p className="text-[10px] sm:text-[11px] text-light-textSecondary dark:text-dark-textSecondary mt-0.5 font-mono">
                      {p.width} × {p.height} px · {formatBytes(p.originalSize)}
                    </p>
                  </div>
                  <div className="flex items-center gap-1 shrink-0">
                    <button type="button" onClick={() => move(p.id, "up")} disabled={idx === 0} aria-label="Move up"
                      className="w-8 h-8 rounded-lg flex items-center justify-center text-silk-rose bg-silk-rose/5 border border-silk-rose/15 hover:bg-silk-rose/15 disabled:opacity-20 disabled:cursor-not-allowed transition-all">
                      <ChevronUp className="w-3.5 h-3.5" />
                    </button>
                    <button type="button" onClick={() => move(p.id, "down")} disabled={idx === pages.length - 1} aria-label="Move down"
                      className="w-8 h-8 rounded-lg flex items-center justify-center text-silk-rose bg-silk-rose/5 border border-silk-rose/15 hover:bg-silk-rose/15 disabled:opacity-20 disabled:cursor-not-allowed transition-all">
                      <ChevronDown className="w-3.5 h-3.5" />
                    </button>
                    <button type="button" onClick={() => remove(p.id)} aria-label="Remove"
                      className="w-8 h-8 rounded-lg flex items-center justify-center text-red-500 bg-red-500/5 border border-red-500/15 hover:bg-red-500/15 transition-all">
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          <AnimatePresence>
            {result && (
              <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 16 }}
                className="flex items-center gap-3 p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30">
                <CheckCircle2 className="w-6 h-6 text-emerald-600 dark:text-emerald-400 shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="text-[13px] sm:text-sm font-bold text-emerald-700 dark:text-emerald-300">
                    {bn ? "PDF তৈরি হয়েছে!" : "PDF ready!"}
                  </p>
                  <p className="text-[10px] sm:text-[11px] text-emerald-700/80 dark:text-emerald-300/80 mt-0.5 font-mono">
                    {result.pageCount} {bn ? "পেজ" : "pages"} · {formatBytes(result.size)}
                  </p>
                </div>
                <ToolButton size="sm" variant="primary" icon={<Download className="w-3.5 h-3.5" />}
                  onClick={() => downloadPdf(result, `jpgs-${Date.now()}.pdf`)}>
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
