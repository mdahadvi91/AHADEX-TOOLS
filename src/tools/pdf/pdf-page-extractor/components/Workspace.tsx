import { useRef, useState } from "react";
import { Upload, X, Download, Loader2, FileText, CheckCircle2, FileOutput, Layers } from "lucide-react";
import { useLanguage } from "@contexts/LanguageContext";
import { cn } from "@lib/cn";
import {
  loadPdfFile, extractPages, parseCustomPageList,
  downloadFile, revokeFile, formatBytes,
} from "../logic";
import type { LoadedPdf, ExtractedFile, ExtractMode } from "../types";

export function Workspace() {
  const { language } = useLanguage();
  const bn = language === "bn";
  const inputRef = useRef<HTMLInputElement>(null);
  const [pdf, setPdf] = useState<LoadedPdf | null>(null);
  const [pageList, setPageList] = useState("");
  const [mode, setMode] = useState<ExtractMode>("combined");
  const [busy, setBusy] = useState(false);
  const [drag, setDrag] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [results, setResults] = useState<ExtractedFile[]>([]);

  const handleFile = async (file: File) => {
    results.forEach(revokeFile); setResults([]);
    setError(null);
    const loaded = await loadPdfFile(file, setError);
    if (loaded) setPdf(loaded);
  };

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault(); setDrag(false);
    const f = e.dataTransfer.files?.[0];
    if (f) void handleFile(f);
  };

  const handleExtract = async () => {
    if (!pdf) return;
    const pages = parseCustomPageList(pageList, pdf.pageCount, setError);
    if (pages.length === 0) { setError(bn ? "কোনো পেজ নির্বাচিত হয়নি।" : "No valid pages selected."); return; }
    setBusy(true); setError(null);
    try {
      results.forEach(revokeFile); setResults([]);
      const res = await extractPages(pdf, pages, mode);
      setResults(res);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Extraction failed");
    } finally { setBusy(false); }
  };

  const downloadAll = () => {
    results.forEach((r, i) => setTimeout(() => downloadFile(r), i * 300));
  };

  const clearAll = () => {
    results.forEach(revokeFile); setResults([]);
    setPdf(null); setPageList(""); setError(null);
    if (inputRef.current) inputRef.current.value = "";
  };

  const parsedCount = pdf ? parseCustomPageList(pageList, pdf.pageCount).length : 0;

  return (
    <section className="pb-12 space-y-4">
      <input ref={inputRef} type="file" accept="application/pdf,.pdf" onChange={(e) => { const f = e.target.files?.[0]; if (f) void handleFile(f); }} className="hidden" />

      {!pdf && (
        <div
          onDragOver={(e) => { e.preventDefault(); setDrag(true); }}
          onDragLeave={() => setDrag(false)}
          onDrop={onDrop}
          onClick={() => inputRef.current?.click()}
          role="button" tabIndex={0}
          onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") inputRef.current?.click(); }}
          className={cn("flex flex-col items-center justify-center gap-4 p-8 sm:p-16 rounded-3xl cursor-pointer", "bg-white/70 dark:bg-dark-surface/70 backdrop-blur-xl", "border-2 border-dashed transition-all duration-300", drag ? "border-silk-rose/70 bg-silk-rose/10 scale-[1.01]" : "border-silk-rose/25 hover:border-silk-rose/50")}
        >
          <div className={cn("w-16 h-16 sm:w-20 sm:h-20 rounded-2xl flex items-center justify-center transition-all", "bg-gradient-to-br from-silk-rose/20 to-silk-gold/10 border border-silk-rose/25", drag && "scale-110")}>
            <Upload className="w-7 h-7 sm:w-9 sm:h-9 text-silk-rose" />
          </div>
          <div className="text-center px-3">
            <p className="font-display font-bold text-[15px] sm:text-lg text-light-text dark:text-dark-text mb-1.5">{bn ? "PDF ফাইল ড্রপ করুন" : "Drop your PDF file"}</p>
            <p className="text-[12px] sm:text-sm text-lightTextSecondary dark:text-dark-textSecondary leading-relaxed">{bn ? "একটি PDF · ১০০ MB পর্যন্ত" : "One PDF · Up to 100 MB"}</p>
          </div>
        </div>
      )}

      {error && <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-[12px] text-red-600 dark:text-red-400">{error}</div>}

      {pdf && (
        <>
          <div className="flex items-center gap-3 p-3 rounded-2xl bg-white/70 dark:bg-dark-surface/70 backdrop-blur-xl border border-silk-rose/20">
            <span className="w-10 h-10 rounded-xl bg-silk-rose/10 border border-silk-rose/25 flex items-center justify-center shrink-0"><FileText className="w-5 h-5 text-silk-rose" /></span>
            <div className="flex-1 min-w-0">
              <p className="text-[12px] sm:text-sm font-semibold text-light-text dark:text-dark-text truncate">{pdf.name}</p>
              <p className="text-[10px] sm:text-[11px] text-lightTextSecondary dark:text-dark-textSecondary mt-0.5">{pdf.pageCount} {bn ? "পেজ" : "pages"} · {formatBytes(pdf.size)}</p>
            </div>
            <button type="button" onClick={clearAll} className="w-7 h-7 rounded-lg flex items-center justify-center text-red-500 hover:bg-red-500/10 transition-colors shrink-0" aria-label="Clear"><X className="w-3.5 h-3.5" /></button>
          </div>

          <div className="rounded-2xl bg-white/70 dark:bg-dark-surface/70 backdrop-blur-xl border border-silk-rose/20 p-3 space-y-3">
            <div>
              <label className="block text-[11px] font-medium text-light-text dark:text-dark-text mb-1.5">{bn ? "পেজ লিস্ট (নিজের ক্রমে, duplicate চলে)" : "Page list (custom order, duplicates allowed)"}</label>
              <input type="text" value={pageList} onChange={(e) => setPageList(e.target.value)} placeholder={bn ? "উদা: 3, 1, 5-7, 3" : "e.g. 3, 1, 5-7, 3"} className="w-full h-10 px-3 rounded-lg text-[13px] bg-white/80 dark:bg-dark-surface/80 border border-silk-rose/20 focus:border-silk-rose/50 text-light-text dark:text-dark-text outline-none transition-all" />
            </div>

            <div>
              <p className="text-[10px] uppercase tracking-wider font-semibold text-silk-wine/70 dark:text-silk-rose/60 mb-2">{bn ? "আউটপুট মোড" : "Output mode"}</p>
              <div className="grid grid-cols-2 gap-2">
                <button type="button" onClick={() => setMode("combined")} className={cn("h-12 rounded-lg border text-[11px] font-medium transition-all flex flex-col items-center justify-center gap-0.5", mode === "combined" ? "bg-silk-rose/15 border-silk-rose/50 text-silk-wine dark:text-silk-rose-soft" : "bg-silk-rose/5 border-silk-rose/15 text-light-textSecondary dark:text-dark-textSecondary hover:border-silk-rose/40")}>
                  <Layers className="w-4 h-4" />
                  <span>{bn ? "এক PDF" : "Combined PDF"}</span>
                </button>
                <button type="button" onClick={() => setMode("separate")} className={cn("h-12 rounded-lg border text-[11px] font-medium transition-all flex flex-col items-center justify-center gap-0.5", mode === "separate" ? "bg-silk-rose/15 border-silk-rose/50 text-silk-wine dark:text-silk-rose-soft" : "bg-silk-rose/5 border-silk-rose/15 text-light-textSecondary dark:text-dark-textSecondary hover:border-silk-rose/40")}>
                  <FileOutput className="w-4 h-4" />
                  <span>{bn ? "আলাদা ফাইল" : "Separate files"}</span>
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between text-[10px] text-lightTextSecondary dark:text-dark-textSecondary">
              <span>{bn ? `মোট পেজ: ${pdf.pageCount}` : `Total pages: ${pdf.pageCount}`}</span>
              {parsedCount > 0 && <span className="text-silk-rose font-semibold">{parsedCount} {bn ? "পেজ" : "page(s)"} {mode === "combined" ? (bn ? "→ ১ ফাইল" : "→ 1 file") : (bn ? "→ আলাদা" : "→ separate")}</span>}
            </div>
          </div>

          <div className="flex items-center justify-end gap-3 flex-wrap p-3 rounded-2xl bg-white/70 dark:bg-dark-surface/70 backdrop-blur-xl border border-silk-rose/20">
            <button type="button" onClick={() => void handleExtract()} disabled={busy || parsedCount === 0} className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-gradient-to-r from-silk-rose to-silk-wine-deep text-white text-[11px] sm:text-xs font-semibold shadow-silk-soft hover:shadow-silk-deep transition-all disabled:opacity-50">
              {busy ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <FileOutput className="w-3.5 h-3.5" />}
              {bn ? "পেজ বের করুন" : "Extract pages"}
            </button>
          </div>

          {results.length > 0 && (
            <div className="rounded-2xl bg-emerald-500/10 border border-emerald-500/30 p-3 space-y-2">
              <div className="flex items-center justify-between gap-3 flex-wrap">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0" />
                  <p className="text-[12px] sm:text-sm font-semibold text-emerald-700 dark:text-emerald-300">{results.length} {bn ? "ফাইল তৈরি" : "file(s) created"}</p>
                </div>
                <button type="button" onClick={downloadAll} className="inline-flex items-center gap-1.5 h-9 px-3 rounded-xl bg-emerald-600 text-white text-[11px] font-semibold hover:bg-emerald-700 transition-colors">
                  <Download className="w-3.5 h-3.5" />{bn ? "সব ডাউনলোড" : "Download all"}
                </button>
              </div>
              <div className="max-h-72 overflow-y-auto space-y-1.5">
                {results.map((r) => (
                  <div key={r.filename} className="flex items-center gap-2 p-2 rounded-lg bg-white/60 dark:bg-dark-surface/60">
                    <FileText className="w-3.5 h-3.5 text-silk-rose shrink-0" />
                    <span className="flex-1 text-[11px] text-light-text dark:text-dark-text truncate">{r.filename}</span>
                    <span className="text-[10px] text-lightTextSecondary dark:text-dark-textSecondary shrink-0">{formatBytes(r.size)}</span>
                    <button type="button" onClick={() => downloadFile(r)} className="w-7 h-7 rounded-md flex items-center justify-center text-silk-rose hover:bg-silk-rose/10 shrink-0" aria-label="Download"><Download className="w-3.5 h-3.5" /></button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </>
      )}

      {!pdf && (
        <div className="flex items-center justify-center gap-2 text-[11px] sm:text-xs text-lightTextSecondary dark:text-dark-textSecondary">
          <FileText className="w-3.5 h-3.5 text-silk-rose" />
          {bn ? "আপনার PDF ব্রাউজারেই প্রসেস হয়" : "Your PDF is processed in your browser"}
        </div>
      )}
    </section>
  );
}
