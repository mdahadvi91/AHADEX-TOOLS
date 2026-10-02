import { useRef, useState } from "react";
import { Upload, X, Download, Loader2, FileText, ChevronUp, ChevronDown, Layers, CheckCircle2 } from "lucide-react";
import { useLanguage } from "@contexts/LanguageContext";
import { cn } from "@lib/cn";
import { readPdfInput, mergePdfs, downloadMerged, formatBytes, revokeMerged, MAX_FILES } from "../logic";
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
      setError(bn ? `সর্বোচ্চ ${MAX_FILES} ফাইল।` : `Max ${MAX_FILES} files.`);
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

  const onDrop = (e: React.DragEvent) => { e.preventDefault(); setDrag(false); void handleFiles(e.dataTransfer.files); };
  const remove = (id: string) => { setFiles((prev) => prev.filter((f) => f.id !== id)); if (result) { revokeMerged(result); setResult(null); } };
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
    if (result) { revokeMerged(result); setResult(null); }
  };
  const clearAll = () => { setFiles([]); setError(null); if (result) revokeMerged(result); setResult(null); if (inputRef.current) inputRef.current.value = ""; };

  const handleMerge = async () => {
    if (files.length < 2) { setError(bn ? "কমপক্ষে ২টি PDF দিন।" : "Add at least two PDFs."); return; }
    setBusy(true);
    setError(null);
    try {
      if (result) revokeMerged(result);
      const res = await mergePdfs(files);
      setResult(res);
      downloadMerged(res, `merged-${Date.now()}.pdf`);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Merge failed");
    } finally { setBusy(false); }
  };

  const totalPages = files.reduce((s, f) => s + f.pageCount, 0);
  const totalSize = files.reduce((s, f) => s + f.size, 0);

  return (
    <section className="pb-12 space-y-4">
      <input ref={inputRef} type="file" accept="application/pdf,.pdf" multiple onChange={(e) => void handleFiles(e.target.files)} className="hidden" />

      {files.length === 0 && (
        <div onDragOver={(e) => { e.preventDefault(); setDrag(true); }} onDragLeave={() => setDrag(false)} onDrop={onDrop} onClick={() => inputRef.current?.click()} role="button" tabIndex={0} onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") inputRef.current?.click(); }} className={cn("flex flex-col items-center justify-center gap-4 p-8 sm:p-16 rounded-3xl cursor-pointer", "bg-white/70 dark:bg-dark-surface/70 backdrop-blur-xl", "border-2 border-dashed transition-all duration-300", drag ? "border-silk-rose/70 bg-silk-rose/10 scale-[1.01]" : "border-silk-rose/25 hover:border-silk-rose/50")}>
          <div className={cn("w-16 h-16 sm:w-20 sm:h-20 rounded-2xl flex items-center justify-center transition-all", "bg-gradient-to-br from-silk-rose/20 to-silk-gold/10 border border-silk-rose/25", drag && "scale-110")}>
            {busy ? <Loader2 className="w-7 h-7 sm:w-9 sm:h-9 text-silk-rose animate-spin" /> : <Upload className="w-7 h-7 sm:w-9 sm:h-9 text-silk-rose" />}
          </div>
          <div className="text-center px-3">
            <p className="font-display font-bold text-[15px] sm:text-lg text-light-text dark:text-dark-text mb-1.5">{busy ? (bn ? "লোড হচ্ছে..." : "Loading...") : (bn ? "PDF ফাইল ড্রপ করুন" : "Drop your PDF files")}</p>
            <p className="text-[12px] sm:text-sm text-light-textSecondary dark:text-darkTextSecondary leading-relaxed">{bn ? "কমপক্ষে ২টি · সর্বোচ্চ ২০টি · প্রতি ফাইল ১০০ MB" : "At least 2 · Up to 20 files · 100 MB each"}</p>
          </div>
        </div>
      )}

      {error && <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-[12px] text-red-600 dark:text-red-400">{error}</div>}

      {files.length > 0 && (
        <>
          <div className="flex items-center justify-between gap-3 flex-wrap p-3 rounded-2xl bg-white/70 dark:bg-dark-surface/70 backdrop-blur-xl border border-silk-rose/20">
            <div className="flex items-center gap-2 text-[12px] sm:text-sm text-light-text dark:text-dark-text">
              <Layers className="w-4 h-4 text-silk-rose" />
              <span className="font-semibold">{files.length} {bn ? "ফাইল" : "file(s)"} · {totalPages} {bn ? "পেজ" : "pages"} · {formatBytes(totalSize)}</span>
              {result && <span className="text-emerald-600 dark:text-emerald-400 font-semibold">· merged: {formatBytes(result.size)}</span>}
            </div>
            <div className="flex items-center gap-2">
              <button type="button" onClick={() => inputRef.current?.click()} className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-silk-rose/10 border border-silk-rose/25 text-[11px] sm:text-xs font-medium text-silk-rose hover:bg-silk-rose/20 transition-all"><Upload className="w-3.5 h-3.5" />{bn ? "আরও" : "Add more"}</button>
              <button type="button" onClick={() => void handleMerge()} disabled={busy || files.length < 2} className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gradient-to-r from-silk-rose to-silk-wine-deep text-white text-[11px] sm:text-xs font-semibold shadow-silk-soft hover:shadow-silk-deep transition-all disabled:opacity-50">
                {busy ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Download className="w-3.5 h-3.5" />}
                {bn ? "মার্জ করে ডাউনলোড" : "Merge & Download"}
              </button>
              <button type="button" onClick={clearAll} className="w-7 h-7 rounded-lg flex items-center justify-center text-red-500 hover:bg-red-500/10 transition-colors" aria-label="Clear"><X className="w-3.5 h-3.5" /></button>
            </div>
          </div>

          <div className="space-y-2">
            {files.map((f, i) => (
              <div key={f.id} className="flex items-center gap-3 p-3 rounded-2xl bg-white/70 dark:bg-dark-surface/70 backdrop-blur-xl border border-silk-rose/20">
                <span className="w-6 h-6 rounded-md bg-silk-rose/15 text-silk-wine dark:text-silk-rose-soft text-[10px] font-bold flex items-center justify-center shrink-0">{i + 1}</span>
                <span className="w-10 h-10 rounded-xl bg-silk-rose/10 border border-silk-rose/25 flex items-center justify-center shrink-0"><FileText className="w-5 h-5 text-silk-rose" /></span>
                <div className="flex-1 min-w-0">
                  <p className="text-[12px] sm:text-sm font-semibold text-light-text dark:text-dark-text truncate">{f.name}</p>
                  <p className="text-[10px] sm:text-[11px] text-light-textSecondary dark:text-darkTextSecondary mt-0.5">{f.pageCount} {bn ? "পেজ" : "pages"} · {formatBytes(f.size)}</p>
                </div>
                <button type="button" onClick={() => move(f.id, "up")} disabled={i === 0} className="w-7 h-7 rounded-md flex items-center justify-center text-silk-rose disabled:opacity-20 hover:bg-silk-rose/10 transition-colors shrink-0" aria-label="Move up"><ChevronUp className="w-3.5 h-3.5" /></button>
                <button type="button" onClick={() => move(f.id, "down")} disabled={i === files.length - 1} className="w-7 h-7 rounded-md flex items-center justify-center text-silk-rose disabled:opacity-20 hover:bg-silk-rose/10 transition-colors shrink-0" aria-label="Move down"><ChevronDown className="w-3.5 h-3.5" /></button>
                <button type="button" onClick={() => remove(f.id)} className="w-7 h-7 rounded-lg flex items-center justify-center text-red-500 hover:bg-red-500/10 transition-colors shrink-0" aria-label="Remove"><X className="w-3.5 h-3.5" /></button>
              </div>
            ))}
          </div>

          {result && (
            <div className="flex items-center gap-3 p-3 rounded-2xl bg-emerald-500/10 border border-emerald-500/30">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0" />
              <div className="flex-1 min-w-0">
                <p className="text-[12px] sm:text-sm font-semibold text-emerald-700 dark:text-emerald-300">{bn ? "মার্জ সফল" : "Merge complete"}</p>
                <p className="text-[10px] sm:text-[11px] text-emerald-700/70 dark:text-emerald-300/70 mt-0.5">{result.fileCount} {bn ? "ফাইল" : "files"} → {result.totalPages} {bn ? "পেজ" : "pages"} · {formatBytes(result.size)}</p>
              </div>
              <button type="button" onClick={() => downloadMerged(result, `merged-${Date.now()}.pdf`)} className="inline-flex items-center gap-1.5 h-9 px-3 rounded-xl bg-emerald-600 text-white text-[11px] font-semibold hover:bg-emerald-700 transition-colors shrink-0"><Download className="w-3.5 h-3.5" />{bn ? "ডাউনলোড" : "Download"}</button>
            </div>
          )}
        </>
      )}

      {files.length === 0 && (
        <div className="flex items-center justify-center gap-2 text-[11px] sm:text-xs text-lightTextSecondary dark:text-dark-textSecondary">
          <FileText className="w-3.5 h-3.5 text-silk-rose" />
          {bn ? "সব ফাইল আপনার ব্রাউজারে প্রসেস হয়" : "All files are processed in your browser"}
        </div>
      )}
    </section>
  );
}
