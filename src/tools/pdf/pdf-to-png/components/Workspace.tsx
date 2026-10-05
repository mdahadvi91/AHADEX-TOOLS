import { useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Download,
  FileText,
  Image as ImageIcon,
  CheckCircle2,
  Trash2,
} from "lucide-react";
import { useLanguage } from "@contexts/LanguageContext";
import { useSound } from "@contexts/SoundContext";
import { cn } from "@lib/cn";
import {
  WorkspacePanel,
  DropZone,
  ToolButton,
  ResultStat,
} from "@components/workspace";
import {
  loadPdfFile,
  parsePageRanges,
  renderPagesToPng,
  downloadPng,
  revokePng,
  formatBytes,
} from "../logic";
import type { LoadedPdf, PngPageResult, DpiOption } from "../types";

export function Workspace() {
  const { language } = useLanguage();
  const { play } = useSound();
  const bn = language === "bn";

  const inputRef = useRef<HTMLInputElement>(null);
  const [pdf, setPdf] = useState<LoadedPdf | null>(null);
  const [ranges, setRanges] = useState("");
  const [dpi, setDpi] = useState<DpiOption>(150);
  const [busy, setBusy] = useState(false);
  const [drag, setDrag] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [results, setResults] = useState<PngPageResult[]>([]);

  const handleFile = async (file: File) => {
    results.forEach(revokePng);
    setResults([]);
    setError(null);
    const loaded = await loadPdfFile(file, setError);
    if (loaded) setPdf(loaded);
  };

  const handleConvert = async () => {
    if (!pdf) return;
    const pages = ranges.trim()
      ? parsePageRanges(ranges, pdf.pageCount)
      : Array.from({ length: pdf.pageCount }, (_, i) => i);
    if (pages.length === 0) {
      setError(
        bn ? "কোনো পেজ নির্বাচিত হয়নি।" : "No valid pages selected."
      );
      return;
    }
    setBusy(true);
    setError(null);
    try {
      results.forEach(revokePng);
      setResults([]);
      const res = await renderPagesToPng(pdf, pages, dpi);
      setResults(res);
      play("success");
    } catch (e) {
      setError(e instanceof Error ? e.message : "Conversion failed");
    } finally {
      setBusy(false);
    }
  };

  const downloadAll = () => {
    results.forEach((r, i) =>
      setTimeout(() => downloadPng(r), i * 300)
    );
  };

  const clearAll = () => {
    results.forEach(revokePng);
    setResults([]);
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

  const totalSize = results.reduce((s, r) => s + r.size, 0);

  const dpiOptions: { value: DpiOption; label: string; sub: string }[] = [
    { value: 72, label: "72 DPI", sub: bn ? "স্ক্রিন" : "screen" },
    { value: 150, label: "150 DPI", sub: bn ? "ওয়েব" : "web" },
    { value: 300, label: "300 DPI", sub: bn ? "প্রিন্ট" : "print" },
  ];

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
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          </WorkspacePanel>

          <WorkspacePanel className="p-3.5 sm:p-4 space-y-4" animate={false}>
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-light-textSecondary dark:text-dark-textSecondary mb-2">
                {bn
                  ? "পেজ রেঞ্জ (খালি = সব পেজ)"
                  : "Page ranges (empty = all)"}
              </label>
              <input
                type="text"
                value={ranges}
                onChange={(e) => setRanges(e.target.value)}
                placeholder={bn ? "উদা: 1-3, 5, 7-9" : "e.g. 1-3, 5, 7-9"}
                className="w-full h-11 px-3.5 rounded-xl text-[13px] font-mono bg-white/80 dark:bg-dark-surface/80 border border-silk-rose/20 focus:border-silk-rose/50 text-light-text dark:text-dark-text outline-none transition-all"
              />
            </div>

            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-light-textSecondary dark:text-dark-textSecondary mb-2">
                {bn ? "রেজোলিউশন" : "Resolution"}
              </label>
              <div className="grid grid-cols-3 gap-2">
                {dpiOptions.map((opt) => (
                  <button
                    key={opt.value}
                    type="button"
                    onClick={() => setDpi(opt.value)}
                    className={cn(
                      "flex flex-col items-center justify-center gap-0.5 h-14 rounded-xl border transition-all",
                      dpi === opt.value
                        ? "bg-silk-rose/15 border-silk-rose/50 shadow-[0_6px_16px_-8px_rgba(139,58,79,0.35)]"
                        : "bg-silk-rose/5 border-silk-rose/15 hover:border-silk-rose/40"
                    )}
                  >
                    <span
                      className={cn(
                        "text-[12px] font-bold",
                        dpi === opt.value
                          ? "text-silk-wine dark:text-silk-rose-soft"
                          : "text-light-text dark:text-dark-text"
                      )}
                    >
                      {opt.label}
                    </span>
                    <span className="text-[9px] uppercase tracking-wider text-light-textSecondary dark:text-dark-textSecondary">
                      {opt.sub}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-silk-rose/10 text-[10px] sm:text-[11px] text-light-textSecondary dark:text-dark-textSecondary">
              <span>
                {bn ? `মোট পেজ: ${pdf.pageCount}` : `Total: ${pdf.pageCount}`}
              </span>
              {parsedCount > 0 && (
                <span className="text-silk-rose font-bold">
                  {parsedCount} {bn ? "পেজ হবে" : "will convert"}
                </span>
              )}
            </div>
          </WorkspacePanel>

          <WorkspacePanel className="p-3.5 sm:p-4" animate={false}>
            <div className="flex items-center justify-end gap-3 flex-wrap">
              <ToolButton
                variant="primary"
                loading={busy}
                disabled={parsedCount === 0}
                icon={<ImageIcon className="w-3.5 h-3.5" />}
                onClick={() => void handleConvert()}
              >
                {bn ? "PNG-তে রূপান্তর" : "Convert to PNG"}
              </ToolButton>
            </div>
          </WorkspacePanel>

          <AnimatePresence>
            {results.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 16 }}
                className="space-y-3"
              >
                <div className="grid grid-cols-3 gap-2.5">
                  <ResultStat
                    label={bn ? "ফাইল" : "Files"}
                    value={String(results.length)}
                    accent="emerald"
                  />
                  <ResultStat
                    label={bn ? "সাইজ" : "Size"}
                    value={formatBytes(totalSize)}
                    accent="emerald"
                  />
                  <ResultStat
                    label={bn ? "DPI" : "DPI"}
                    value={String(dpi)}
                    accent="emerald"
                  />
                </div>

                <div className="rounded-2xl bg-emerald-500/10 border border-emerald-500/30 p-4 space-y-3">
                  <div className="flex items-center justify-between gap-3 flex-wrap">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0" />
                      <p className="text-[13px] sm:text-sm font-bold text-emerald-700 dark:text-emerald-300">
                        {results.length}{" "}
                        {bn ? "টি PNG তৈরি" : "PNG files created"}
                      </p>
                    </div>
                    <ToolButton
                      size="sm"
                      variant="primary"
                      icon={<Download className="w-3.5 h-3.5" />}
                      onClick={downloadAll}
                    >
                      {bn ? "সব ডাউনলোড" : "Download all"}
                    </ToolButton>
                  </div>

                  <div className="max-h-72 overflow-y-auto space-y-1.5 pr-1">
                    {results.map((r) => (
                      <div
                        key={r.filename}
                        className="flex items-center gap-2.5 p-2.5 rounded-lg bg-white/70 dark:bg-dark-surface/70 border border-emerald-500/10"
                      >
                        <ImageIcon className="w-3.5 h-3.5 text-silk-rose shrink-0" />
                        <span className="flex-1 text-[11px] text-light-text dark:text-dark-text truncate font-medium">
                          {r.filename}
                        </span>
                        <span className="text-[10px] text-light-textSecondary dark:text-dark-textSecondary shrink-0 font-mono">
                          {r.width}×{r.height}
                        </span>
                        <span className="text-[10px] text-light-textSecondary dark:text-dark-textSecondary shrink-0 font-mono">
                          {formatBytes(r.size)}
                        </span>
                        <button
                          type="button"
                          onClick={() => downloadPng(r)}
                          aria-label="Download"
                          className="w-7 h-7 rounded-md flex items-center justify-center text-silk-rose bg-silk-rose/10 hover:bg-silk-rose/20 transition-colors shrink-0"
                        >
                          <Download className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </>
      )}
    </section>
  );
}
