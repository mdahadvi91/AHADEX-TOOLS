import { useRef, useState } from "react";
import { Upload, X, Download, Loader2, CheckCircle2, FileText, ChevronUp, ChevronDown } from "lucide-react";
import { useLanguage } from "@contexts/LanguageContext";
import { cn } from "@lib/cn";
import { addJpgPage, buildPdf, downloadPdf, formatBytes, revokePdf, MAX_PAGES, type PdfBuildOptions } from "../logic";
import type { PdfPage, PdfResult } from "../types";

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
    const newPages: PdfPage[] = [];
    for (let i = 0; i < files.length; i++) {
      const p = await addJpgPage(files[i], setError);
      if (p) newPages.push(p);
    }
    setPages((prev) => [...prev, ...newPages]);
    setBusy(false);
    if (inputRef.current) inputRef.current.value = "";
  };

  const onDrop = (e: React.DragEvent) => { e.preventDefault(); setDrag(false); void handleFiles(e.dataTransfer.files); };
  const remove = (id: string) => { setPages((prev) => prev.filter((p) => p.id !== id)); if (result) { revokePdf(result); setResult(null); } };
  const move = (id: string, dir: "up" | "down") => {
    setPages((prev) => {
      const idx = prev.findIndex((p) => p.id === id);
      if (idx < 0) return prev;
      const target = dir === "up" ? idx - 1 : idx + 1;
      if (target < 0 || target >= prev.length) return prev;
      const next = [...prev];
      [next[idx], next[target]] = [next[target], next[idx]];
      return next;
    });
  };
  const clearAll = () => { setPages([]); setError(null); if (result) revokePdf(result); setResult(null); if (inputRef.current) inputRef.current.value = ""; };

  const handleExport = async () => {
    if (pages.length === 0) return;
    setBusy(true);
    setError(null);
    try {
      if (result) revokePdf(result);
      const res = await buildPdf(pages, { pageSize, orientation, margin });
      setResult(res);
      downloadPdf(res, `images-${Date.now()}.pdf`);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to build PDF");
    } finally {
      setBusy(false);
    }
  };

  return (
    <section className="pb-12 space-y-4">
      <input ref={inputRef} type="file" accept="image/jpeg,image/jpg" multiple onChange={(e) => void handleFiles(e.target.files)} className="hidden" />

      {pages.length === 0 && (
        <div onDragOver={(e) => { e.preventDefault(); setDrag(true); }} onDragLeave={() => setDrag(false)} onDrop={onDrop} onClick={() => inputRef.current?.click()} role="button" tabIndex={0} onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") inputRef.current?.click(); }} className={cn("flex flex-col items-center justify-center gap-4 p-8 sm:p-16 rounded-3xl cursor-pointer", "bg-white/70 dark:bg-dark-surface/70 backdrop-blur-xl", "border-2 border-dashed transition-all duration-300", drag ? "border-silk-rose/70 bg-silk-rose/10 scale-[1.01]" : "border-silk-rose/25 hover:border-silk-rose/50")}>
          <div className={cn("w-16 h-16 sm:w-20 sm:h-20 rounded-2xl flex items-center justify-center transition-all", "bg-gradient-to-br from-silk-rose/20 to-silk-gold/10 border border-silk-rose/25", drag && "scale-110")}>
            {busy ? <Loader2 className="w-7 h-7 sm:w-9 sm:h-9 text-silk-rose animate-spin" /> : <Upload className="w-7 h-7 sm:w-9 sm:h-9 text-silk-rose" />}
          </div>
          <div className="text-center px-3">
            <p className="font-display font-bold text-[15px] sm:text-lg text-light-text dark:text-dark-text mb-1.5">{busy ? (bn ? "লোড হচ্ছে..." : "Loading...") : (bn ? "JPG ফাইল ড্রপ করুন" : "Drop your JPG files")}</p>
            <p className="text-[12px] sm:text-sm text-light-textSecondary dark:text-dark-textSecondary leading-relaxed">{bn ? "একাধিক ফাইল · ৫০ MB পর্যন্ত · ৫০ পেজ পর্যন্ত" : "Multiple files · Up to 50 MB · Up to 50 pages"}</p>
          </div>
        </div>
      )}

      {error && <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-[12px] text-red-600 dark:text-red-400">{error}</div>}

      {pages.length > 0 && (
        <>
          <div className="rounded-2xl bg-white/70 dark:bg-dark-surface/70 backdrop-blur-xl border border-silk-rose/20 p-4 space-y-3">
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              <div>
                <label className="block text-[11px] font-medium text-light-text dark:text-dark-text mb-1.5">{bn ? "পেজ সাইজ" : "Page size"}</label>
                <select value={pageSize} onChange={(e) => setPageSize(e.target.value as PdfBuildOptions["pageSize"])} className="w-full h-9 px-3 rounded-lg text-[12px] bg-white/80 dark:bg-dark-surface/80 border border-silk-rose/20 focus:border-silk-rose/50 text-light-text dark:text-dark-text outline-none transition-all">
                  <option value="auto">Auto</option>
                  <option value="a4">A4</option>
                  <option value="letter">Letter</option>
                </select>
              </div>
              <div>
                <label className="block text-[11px] font-medium text-light-text dark:text-dark-text mb-1.5">{bn ? "অরিয়েন্টেশন" : "Orientation"}</label>
                <select value={orientation} onChange={(e) => setOrientation(e.target.value as PdfBuildOptions["orientation"])} className="w-full h-9 px-3 rounded-lg text-[12px] bg-white/80 dark:bg-dark-surface/80 border border-silk-rose/20 focus:border-silk-rose/50 text-light-text dark:text-dark-text outline-none transition-all">
                  <option value="auto">Auto</option>
                  <option value="portrait">Portrait</option>
                  <option value="landscape">Landscape</option>
                </select>
              </div>
              <div>
                <label className="block text-[11px] font-medium text-light-text dark:text-dark-text mb-1.5">{bn ? "মার্জিন (মিমি)" : "Margin (mm)"}</label>
                <input type="number" min={0} max={50} value={margin} onChange={(e) => setMargin(Math.max(0, parseInt(e.target.value) || 0))} className="w-full h-9 px-3 rounded-lg text-[12px] bg-white/80 dark:bg-dark-surface/80 border border-silk-rose/20 focus:border-silk-rose/50 text-light-text dark:text-dark-text outline-none transition-all" />
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between gap-3 flex-wrap p-3 rounded-2xl bg-white/70 dark:bg-dark-surface/70 backdrop-blur-xl border border-silk-rose/20">
            <div className="flex items-center gap-2 text-[12px] sm:text-sm text-light-text dark:text-dark-text">
              <CheckCircle2 className="w-4 h-4 text-emerald-500" />
              <span className="font-semibold">{pages.length} {bn ? "পেজ" : "page(s)"}</span>
              {result && <span className="text-emerald-600 dark:text-emerald-400 font-semibold">· PDF: {formatBytes(result.size)}</span>}
            </div>
            <div className="flex items-center gap-2">
              <button type="button" onClick={() => inputRef.current?.click()} className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-silk-rose/10 border border-silk-rose/25 text-[11px] sm:text-xs font-medium text-silk-rose hover:bg-silk-rose/20 transition-all"><Upload className="w-3.5 h-3.5" />{bn ? "আরও" : "Add more"}</button>
              <button type="button" onClick={() => void handleExport()} disabled={busy} className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gradient-to-r from-silk-rose to-silk-wine-deep text-white text-[11px] sm:text-xs font-semibold shadow-silk-soft hover:shadow-silk-deep transition-all disabled:opacity-50">
                {busy ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Download className="w-3.5 h-3.5" />}
                {bn ? "PDF ডাউনলোড" : "Export PDF"}
              </button>
              <button type="button" onClick={clearAll} className="w-7 h-7 rounded-lg flex items-center justify-center text-red-500 hover:bg-red-500/10 transition-colors" aria-label="Clear all"><X className="w-3.5 h-3.5" /></button>
            </div>
          </div>

          <div className="space-y-2">
            {pages.map((p, idx) => (
              <div key={p.id} className="flex items-center gap-3 p-2.5 rounded-2xl bg-white/70 dark:bg-dark-surface/70 backdrop-blur-xl border border-silk-rose/20">
                <span className="w-6 h-6 rounded-md bg-silk-rose/15 text-silk-wine dark:text-silk-rose-soft text-[10px] font-bold flex items-center justify-center shrink-0">{idx + 1}</span>
                <div className="w-12 h-12 rounded-lg overflow-hidden bg-silk-rose/5 border border-silk-rose/15 flex items-center justify-center shrink-0">
                  <img src={p.dataUrl} alt={p.originalName} className="w-full h-full object-cover" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[12px] font-semibold text-light-text dark:text-dark-text truncate">{p.originalName}</p>
                  <p className="text-[10px] text-light-textSecondary dark:text-darkTextSecondary mt-0.5">{p.width} × {p.height} px · {formatBytes(p.originalSize)}</p>
                </div>
                <button type="button" onClick={() => move(p.id, "up")} disabled={idx === 0} className="w-7 h-7 rounded-md flex items-center justify-center text-silk-rose disabled:opacity-20 hover:bg-silk-rose/10 transition-colors shrink-0" aria-label="Move up"><ChevronUp className="w-3.5 h-3.5" /></button>
                <button type="button" onClick={() => move(p.id, "down")} disabled={idx === pages.length - 1} className="w-7 h-7 rounded-md flex items-center justify-center text-silk-rose disabled:opacity-20 hover:bg-silk-rose/10 transition-colors shrink-0" aria-label="Move down"><ChevronDown className="w-3.5 h-3.5" /></button>
                <button type="button" onClick={() => remove(p.id)} className="w-7 h-7 rounded-lg flex items-center justify-center text-red-500 hover:bg-red-500/10 transition-colors shrink-0" aria-label="Remove"><X className="w-3.5 h-3.5" /></button>
              </div>
            ))}
          </div>
        </>
      )}

      {pages.length === 0 && (
        <div className="flex items-center justify-center gap-2 text-[11px] sm:text-xs text-light-textSecondary dark:text-dark-textSecondary">
          <FileText className="w-3.5 h-3.5 text-silk-rose" />
          {bn ? "সব ফাইল আপনার ব্রাউজারেই প্রসেস হয়" : "All files are processed in your browser"}
        </div>
      )}
    </section>
  );
}
