import { useRef, useState } from "react";
import { Upload, X, Download, Loader2, FileText, Type, CheckCircle2, Copy, ClipboardCheck } from "lucide-react";
import { useLanguage } from "@contexts/LanguageContext";
import { cn } from "@lib/cn";
import {
  loadPdfFile, extractText, downloadTxt, revokeTxt,
  formatBytes, parsePageRanges,
} from "../logic";
import type { LoadedPdf, ExtractResult } from "../types";

export function Workspace() {
  const { language } = useLanguage();
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
    if (result) { revokeTxt(result); setResult(null); }
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
    setBusy(true); setError(null);
    try {
      if (result) revokeTxt(result);
      const res = await extractText(pdf, { pageRanges: ranges, preserveLineBreaks, pageSeparator });
      if (res.totalChars === 0) {
        setError(bn ? "কোনো টেক্সট পাওয়া যায়নি — PDF সম্ভবত স্ক্যান করা।" : "No text found — this PDF is probably a scan.");
        revokeTxt(res);
      } else {
        setResult(res);
      }
    } catch (e) {
      setError(e instanceof Error ? e.message : "Extraction failed");
    } finally { setBusy(false); }
  };

  const handleCopy = async () => {
    if (!result) return;
    try {
      const text = result.pages.map((p) => p.text).join("\n\n");
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch { /* ignore */ }
  };

  const clearAll = () => {
    if (result) revokeTxt(result);
    setResult(null); setPdf(null); setRanges(""); setError(null);
    if (inputRef.current) inputRef.current.value = "";
  };

  const parsedCount = pdf ? (ranges.trim() ? parsePageRanges(ranges, pdf.pageCount).length : pdf.pageCount) : 0;

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
              <label className="block text-[11px] font-medium text-light-text dark:text-dark-text mb-1.5">{bn ? "পেজ রেঞ্জ (খালি = সব পেজ)" : "Page ranges (empty = all pages)"}</label>
              <input type="text" value={ranges} onChange={(e) => setRanges(e.target.value)} placeholder={bn ? "উদা: 1-3, 5, 7-9" : "e.g. 1-3, 5, 7-9"} className="w-full h-10 px-3 rounded-lg text-[13px] bg-white/80 dark:bg-dark-surface/80 border border-silk-rose/20 focus:border-silk-rose/50 text-light-text dark:text-dark-text outline-none transition-all" />
            </div>

            <label className="flex items-center justify-between gap-3 p-2 rounded-lg bg-silk-rose/5 border border-silk-rose/15 cursor-pointer">
              <span className="text-[12px] text-light-text dark:text-dark-text">{bn ? "লাইন ব্রেক সংরক্ষণ করুন" : "Preserve line breaks"}</span>
              <input type="checkbox" checked={preserveLineBreaks} onChange={(e) => setPreserve(e.target.checked)} className="w-4 h-4 accent-silk-rose" />
            </label>

            <label className="flex items-center justify-between gap-3 p-2 rounded-lg bg-silk-rose/5 border border-silk-rose/15 cursor-pointer">
              <span className="text-[12px] text-light-text dark:text-dark-text">{bn ? "পেজ সেপারেটর যোগ করুন" : "Add page separators"}</span>
              <input type="checkbox" checked={pageSeparator} onChange={(e) => setPageSep(e.target.checked)} className="w-4 h-4 accent-silk-rose" />
            </label>

            <div className="flex items-center justify-between text-[10px] text-lightTextSecondary dark:text-dark-textSecondary">
              <span>{bn ? `মোট পেজ: ${pdf.pageCount}` : `Total pages: ${pdf.pageCount}`}</span>
              {parsedCount > 0 && <span className="text-silk-rose font-semibold">{parsedCount} {bn ? "পেজ হবে" : "will be extracted"}</span>}
            </div>
          </div>

          <div className="flex items-center justify-end gap-3 flex-wrap p-3 rounded-2xl bg-white/70 dark:bg-dark-surface/70 backdrop-blur-xl border border-silk-rose/20">
            <button type="button" onClick={() => void handleExtract()} disabled={busy || parsedCount === 0} className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-gradient-to-r from-silk-rose to-silk-wine-deep text-white text-[11px] sm:text-xs font-semibold shadow-silk-soft hover:shadow-silk-deep transition-all disabled:opacity-50">
              {busy ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Type className="w-3.5 h-3.5" />}
              {bn ? "টেক্সট বের করুন" : "Extract text"}
            </button>
          </div>

          {result && (
            <div className="rounded-2xl bg-emerald-500/10 border border-emerald-500/30 p-3 space-y-3">
              <div className="flex items-center justify-between gap-3 flex-wrap">
                <div className="flex items-center gap-2 flex-wrap text-[12px] sm:text-sm">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0" />
                  <span className="font-semibold text-emerald-700 dark:text-emerald-300">
                    {result.pages.length} {bn ? "পেজ · " : "pages · "}{result.totalWords.toLocaleString()} {bn ? "শব্দ" : "words"} · {result.totalChars.toLocaleString()} {bn ? "অক্ষর" : "chars"}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <button type="button" onClick={() => void handleCopy()} className="inline-flex items-center gap-1.5 h-9 px-3 rounded-xl bg-silk-rose/10 border border-silk-rose/25 text-[11px] font-semibold text-silk-rose hover:bg-silk-rose/20 transition-all">
                    {copied ? <ClipboardCheck className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                    {copied ? (bn ? "কপি হয়েছে" : "Copied") : (bn ? "কপি" : "Copy")}
                  </button>
                  <button type="button" onClick={() => downloadTxt(result)} className="inline-flex items-center gap-1.5 h-9 px-3 rounded-xl bg-emerald-600 text-white text-[11px] font-semibold hover:bg-emerald-700 transition-colors">
                    <Download className="w-3.5 h-3.5" />{bn ? ".txt ডাউনলোড" : "Download .txt"}
                  </button>
                </div>
              </div>
              <div className="max-h-80 overflow-y-auto rounded-xl bg-white/80 dark:bg-dark-surface/80 border border-silk-rose/15 p-3">
                <pre className="text-[11px] sm:text-[12px] text-light-text dark:text-dark-text whitespace-pre-wrap break-words font-mono">
                  {result.pages.map((p) => p.text).join("\n\n").slice(0, 5000)}
                  {result.totalChars > 5000 ? "\n\n… (preview truncated)" : ""}
                </pre>
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
