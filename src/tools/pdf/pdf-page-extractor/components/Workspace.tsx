import { useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Download,
  X,
  FileText,
  CheckCircle2,
  FileOutput,
  Layers,
  Settings2,
  ListOrdered,
} from "lucide-react";
import { useLanguage } from "@contexts/LanguageContext";
import { cn } from "@lib/cn";
import { WorkspacePanel, DropZone, ToolButton, ResultStat } from "@components/workspace";
import {
  loadPdfFile,
  extractPages,
  parseCustomPageList,
  downloadFile,
  revokeFile,
  formatBytes,
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
    results.forEach(revokeFile);
    setResults([]);
    setError(null);
    const loaded = await loadPdfFile(file, setError);
    if (loaded) setPdf(loaded);
  };

  const handleExtract = async () => {
    if (!pdf) return;
    const pages = parseCustomPageList(pageList, pdf.pageCount, setError);
    if (pages.length === 0) {
      setError(
        bn ? "কোনো পেজ নির্বাচিত হয়নি।" : "No valid pages selected."
      );
      return;
    }
    setBusy(true);
    setError(null);
    try {
      results.forEach(revokeFile);
      setResults([]);
      const res = await extractPages(pdf, pages, mode);
      setResults(res);
      
    } catch (e) {
      setError(e instanceof Error ? e.message : "Extraction failed");
    } finally {
      setBusy(false);
    }
  };

  const downloadAll = () => {
    results.forEach((r, i) =>
      setTimeout(() => downloadFile(r), i * 300)
    );
    
  };

  const clearAll = () => {
    results.forEach(revokeFile);
    setResults([]);
    setPdf(null);
    setPageList("");
    setError(null);
    if (inputRef.current) inputRef.current.value = "";
  };

  const parsedCount = pdf
    ? parseCustomPageList(pageList, pdf.pageCount).length
    : 0;

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
              label={bn ? "নির্বাচিত" : "Selected"}
              value={String(parsedCount)}
              accent="rose"
            />
            <ResultStat
              label={bn ? "মোড" : "Mode"}
              value={
                mode === "combined"
                  ? bn
                    ? "এক"
                    : "1 file"
                  : bn
                    ? "আলাদা"
                    : "Separate"
              }
              accent="rose"
            />
            <ResultStat
              label={bn ? "আউটপুট" : "Output"}
              value={
                results.length > 0
                  ? `${results.length} ${bn ? "টি" : ""}`
                  : "—"
              }
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
                {bn ? "এক্সট্রাক্ট সেটিংস" : "Extraction settings"}
              </span>
            </div>

            {/* Page list */}
            <div>
              <label className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-light-textSecondary dark:text-dark-textSecondary mb-2">
                <ListOrdered className="w-3 h-3" />
                {bn
                  ? "পেজ লিস্ট (নিজের ক্রম, ডুপ্লিকেট চলে)"
                  : "Page list (custom order, duplicates ok)"}
              </label>
              <input
                type="text"
                value={pageList}
                onChange={(e) => setPageList(e.target.value)}
                placeholder={bn ? "উদা: 3, 1, 5-7, 3" : "e.g. 3, 1, 5-7, 3"}
                className="w-full h-11 px-3.5 rounded-xl text-[13px] font-mono bg-white/80 dark:bg-dark-surface/80 border border-silk-rose/20 focus:border-silk-rose/50 text-light-text dark:text-dark-text outline-none transition-all"
              />
            </div>

            {/* Mode */}
            <div className="pt-3 border-t border-silk-rose/10">
              <p className="text-[10px] uppercase tracking-[0.2em] font-bold text-silk-wine/70 dark:text-silk-rose/60 mb-2.5">
                {bn ? "আউটপুট মোড" : "Output mode"}
              </p>
              <div className="grid grid-cols-2 gap-2">
                <ModeBtn
                  active={mode === "combined"}
                  onClick={() => setMode("combined")}
                  icon={<Layers className="w-4 h-4" />}
                  label={bn ? "একটি PDF" : "Combined PDF"}
                />
                <ModeBtn
                  active={mode === "separate"}
                  onClick={() => setMode("separate")}
                  icon={<FileOutput className="w-4 h-4" />}
                  label={bn ? "আলাদা ফাইল" : "Separate files"}
                />
              </div>
            </div>

            {/* Info */}
            {parsedCount > 0 && (
              <div className="flex items-center justify-between pt-3 border-t border-silk-rose/10 text-[10px] sm:text-[11px]">
                <span className="text-light-textSecondary dark:text-dark-textSecondary">
                  {bn ? `${pdf.pageCount} পেজ থেকে` : `From ${pdf.pageCount} pages`}
                </span>
                <span className="text-silk-rose font-bold font-mono">
                  {parsedCount}{" "}
                  {mode === "combined"
                    ? bn
                      ? "→ ১টি ফাইল"
                      : "→ 1 file"
                    : bn
                      ? "→ আলাদা ফাইল"
                      : "→ separate"}
                </span>
              </div>
            )}
          </WorkspacePanel>

          {/* ── Action bar ── */}
          <WorkspacePanel className="p-3.5 sm:p-4" animate={false}>
            <div className="flex items-center justify-between gap-3 flex-wrap">
              <div className="flex items-center gap-2 text-[12px] sm:text-[13px] text-light-text dark:text-dark-text">
                <FileOutput className="w-4 h-4 text-silk-rose shrink-0" />
                <span className="font-bold">
                  {bn ? "পেজ বের করার জন্য রেডি" : "Ready to extract"}
                </span>
              </div>

              <ToolButton
                size="md"
                variant="primary"
                loading={busy}
                disabled={parsedCount === 0}
                icon={<FileOutput className="w-3.5 h-3.5" />}
                onClick={() => void handleExtract()}
              >
                {bn ? "পেজ বের করুন" : "Extract pages"}
              </ToolButton>
            </div>
          </WorkspacePanel>

          {/* ── Results ── */}
          <AnimatePresence>
            {results.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 16 }}
              >
                <WorkspacePanel className="p-4 space-y-3" animate={false}>
                  <div className="flex items-center justify-between gap-3 flex-wrap">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0" />
                      <p className="text-[13px] sm:text-sm font-bold text-emerald-700 dark:text-emerald-300">
                        {results.length}{" "}
                        {bn ? "টি ফাইল তৈরি" : "files created"}
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
                    <AnimatePresence>
                      {results.map((r, i) => (
                        <motion.div
                          key={r.filename}
                          initial={{ opacity: 0, x: -8 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{
                            duration: 0.25,
                            delay: Math.min(i * 0.04, 0.4),
                          }}
                          className="flex items-center gap-2.5 p-2.5 rounded-lg bg-white/70 dark:bg-dark-surface/70 border border-emerald-500/10"
                        >
                          <FileText className="w-3.5 h-3.5 text-silk-rose shrink-0" />
                          <span className="flex-1 text-[11px] text-light-text dark:text-dark-text truncate font-medium">
                            {r.filename}
                          </span>
                          <span className="text-[10px] text-light-textSecondary dark:text-dark-textSecondary shrink-0 font-mono">
                            {formatBytes(r.size)}
                          </span>
                          <button
                            type="button"
                            onClick={() => downloadFile(r)}
                            aria-label="Download"
                            className="w-7 h-7 rounded-md flex items-center justify-center text-silk-rose bg-silk-rose/10 hover:bg-silk-rose/20 transition-colors shrink-0"
                          >
                            <Download className="w-3.5 h-3.5" />
                          </button>
                        </motion.div>
                      ))}
                    </AnimatePresence>
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

function ModeBtn({
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
