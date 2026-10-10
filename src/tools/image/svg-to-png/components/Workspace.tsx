import { useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Download,
  CheckCircle2,
  FileImage,
  Image as ImageIcon,
  Settings2,
  Trash2,
} from "lucide-react";
import { useLanguage } from "@contexts/LanguageContext";
import { cn } from "@lib/cn";
import { WorkspacePanel, DropZone, ToolButton, ResultStat } from "@components/workspace";
import { loadSvgFile, renderToPng, downloadPng, revokePng, revokeSvg, formatBytes } from "../logic";
import type { SvgInfo, PngResult, RenderOptions } from "../types";

const SCALES: RenderOptions["scale"][] = [1, 2, 4, 8];
const BACKGROUNDS: { value: RenderOptions["background"]; label: string }[] = [
  { value: "transparent", label: "Transparent" },
  { value: "white", label: "White" },
  { value: "black", label: "Black" },
];

export function Workspace() {
  const { language } = useLanguage();
  const bn = language === "bn";

  const inputRef = useRef<HTMLInputElement>(null);
  const [svg, setSvg] = useState<SvgInfo | null>(null);
  const [scale, setScale] = useState<RenderOptions["scale"]>(2);
  const [background, setBackground] = useState<RenderOptions["background"]>("transparent");
  const [busy, setBusy] = useState(false);
  const [drag, setDrag] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<PngResult | null>(null);

  const handleFile = async (file: File) => {
    if (svg) revokeSvg(svg);
    if (result) revokePng(result);
    setResult(null);
    setError(null);
    const loaded = await loadSvgFile(file, setError);
    if (loaded) {
      setSvg(loaded);
      
    }
  };

  const handleConvert = async () => {
    if (!svg) return;
    setBusy(true);
    setError(null);
    try {
      if (result) revokePng(result);
      const res = await renderToPng(svg, { scale, background });
      setResult(res);
      downloadPng(res);
      
    } catch (e) {
      setError(e instanceof Error ? e.message : "Conversion failed");
    } finally {
      setBusy(false);
    }
  };

  const clearAll = () => {
    if (svg) revokeSvg(svg);
    if (result) revokePng(result);
    setSvg(null);
    setResult(null);
    setError(null);
    if (inputRef.current) inputRef.current.value = "";
  };

  const targetW = svg ? Math.min(4096, Math.round(svg.width * scale)) : 0;
  const targetH = svg ? Math.min(4096, Math.round(svg.height * scale)) : 0;

  return (
    <section className="pb-12 space-y-4 sm:space-y-5">
      <input
        ref={inputRef}
        type="file"
        accept=".svg,image/svg+xml"
        onChange={(e) => {
          const f = e.target.files?.[0];
          if (f) void handleFile(f);
        }}
        className="hidden"
      />

      {!svg && (
        <DropZone
          onFiles={(list) => {
            const f = list?.[0];
            if (f) void handleFile(f);
          }}
          accept=".svg,image/svg+xml"
          busy={busy}
          drag={drag}
          onDragChange={setDrag}
          title={bn ? "SVG ফাইল ড্রপ করুন" : "Drop your SVG file"}
          subtitle={bn ? "একটি SVG · ২০ MB পর্যন্ত" : "One SVG · Up to 20 MB"}
          icon={<FileImage className="w-7 h-7 sm:w-9 sm:h-9 text-silk-rose" />}
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

      {svg && (
        <>
          {/* Stats */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-3">
            <ResultStat label={bn ? "মূল প্রস্থ" : "Width"} value={`${svg.width}px`} accent="rose" />
            <ResultStat label={bn ? "মূল উচ্চতা" : "Height"} value={`${svg.height}px`} accent="rose" />
            <ResultStat label={bn ? "স্কেল" : "Scale"} value={`${scale}×`} accent="rose" />
            <ResultStat label={bn ? "ইনপুট" : "Input"} value={formatBytes(svg.size)} accent="emerald" />
          </div>

          {/* Settings + Preview */}
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_260px] gap-4">
            <WorkspacePanel className="p-4 sm:p-5 space-y-4">
              <div className="flex items-center gap-2">
                <span className="w-7 h-7 rounded-lg bg-silk-rose/15 border border-silk-rose/25 flex items-center justify-center">
                  <Settings2 className="w-3.5 h-3.5 text-silk-rose" />
                </span>
                <span className="text-[12px] sm:text-sm font-bold text-light-text dark:text-dark-text">
                  {bn ? "রেন্ডার সেটিংস" : "Render settings"}
                </span>
              </div>

              {/* Scale */}
              <div>
                <p className="text-[10px] uppercase tracking-[0.2em] font-bold text-silk-wine/70 dark:text-silk-rose/60 mb-2.5">
                  {bn ? "স্কেল" : "Scale"}
                </p>
                <div className="grid grid-cols-4 gap-2">
                  {SCALES.map((s) => {
                    const active = scale === s;
                    return (
                      <button
                        key={s}
                        type="button"
                        onClick={() => setScale(s)}
                        className={cn(
                          "h-11 rounded-xl border text-[12px] font-bold font-mono transition-all",
                          active
                            ? "bg-gradient-to-br from-silk-rose/20 to-silk-gold/10 border-silk-rose/50 text-silk-wine dark:text-silk-rose-soft shadow-[0_6px_16px_-8px_rgba(139,58,79,0.4)]"
                            : "bg-silk-rose/5 border-silk-rose/15 text-light-textSecondary dark:text-dark-textSecondary hover:border-silk-rose/40"
                        )}
                      >
                        {s}×
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Background */}
              <div className="pt-3 border-t border-silk-rose/10">
                <p className="text-[10px] uppercase tracking-[0.2em] font-bold text-silk-wine/70 dark:text-silk-rose/60 mb-2.5">
                  {bn ? "ব্যাকগ্রাউন্ড" : "Background"}
                </p>
                <div className="grid grid-cols-3 gap-2">
                  {BACKGROUNDS.map((b) => {
                    const active = background === b.value;
                    return (
                      <button
                        key={b.value}
                        type="button"
                        onClick={() => setBackground(b.value)}
                        className={cn(
                          "h-11 rounded-xl border text-[11px] font-bold transition-all capitalize",
                          active
                            ? "bg-silk-rose/15 border-silk-rose/50 text-silk-wine dark:text-silk-rose-soft"
                            : "bg-silk-rose/5 border-silk-rose/15 text-light-textSecondary dark:text-dark-textSecondary hover:border-silk-rose/40"
                        )}
                      >
                        {b.label}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Output info */}
              <div className="flex items-center gap-2 pt-3 border-t border-silk-rose/10 text-[11px] font-mono text-light-textSecondary dark:text-dark-textSecondary">
                <ImageIcon className="w-3.5 h-3.5 text-silk-rose" />
                {bn ? "আউটপুট:" : "Output:"} {targetW}×{targetH} px
              </div>
            </WorkspacePanel>

            {/* Preview */}
            <WorkspacePanel className="p-4 space-y-3" animate={false}>
              <div className="flex items-center justify-between">
                <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-silk-wine/70 dark:text-silk-rose/60">
                  {bn ? "প্রিভিউ" : "Preview"}
                </span>
                <button
                  type="button"
                  onClick={clearAll}
                  aria-label="Clear"
                  className="w-7 h-7 rounded-lg flex items-center justify-center text-red-500 bg-red-500/5 border border-red-500/15 hover:bg-red-500/15 transition-all"
                >
                  <Trash2 className="w-3 h-3" />
                </button>
              </div>
              <div
                className="rounded-xl border border-silk-rose/15 flex items-center justify-center p-4 min-h-[180px] overflow-hidden"
                style={{
                  backgroundImage:
                    "conic-gradient(at top left, rgba(216,139,154,0.15) 25%, transparent 25% 50%, rgba(216,139,154,0.15) 50% 75%, transparent 75%)",
                  backgroundSize: "16px 16px",
                }}
              >
                <img
                  src={svg.dataUrl}
                  alt={svg.name}
                  className="max-w-full max-h-[180px] object-contain"
                />
              </div>
              <p className="text-[11px] font-mono text-light-textSecondary dark:text-dark-textSecondary truncate text-center">
                {svg.name}
              </p>
            </WorkspacePanel>
          </div>

          {/* Action bar */}
          <WorkspacePanel className="p-3.5 sm:p-4" animate={false}>
            <div className="flex items-center justify-between gap-3 flex-wrap">
              <div className="flex items-center gap-2 text-[12px] sm:text-[13px] text-light-text dark:text-dark-text">
                <FileImage className="w-4 h-4 text-silk-rose shrink-0" />
                <span className="font-bold">
                  {bn ? "SVG রেডি" : "SVG ready"}
                </span>
              </div>

              <div className="flex items-center gap-2 flex-wrap">
                <ToolButton
                  size="sm"
                  variant="secondary"
                  onClick={() => inputRef.current?.click()}
                >
                  {bn ? "নতুন SVG" : "New SVG"}
                </ToolButton>

                <ToolButton
                  size="sm"
                  variant="primary"
                  loading={busy}
                  icon={<Download className="w-3.5 h-3.5" />}
                  onClick={() => void handleConvert()}
                >
                  {bn ? "PNG ডাউনলোড" : "Convert & Download"}
                </ToolButton>
              </div>
            </div>
          </WorkspacePanel>

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
                    {bn ? "PNG তৈরি হয়েছে!" : "PNG created!"}
                  </p>
                  <p className="text-[10px] sm:text-[11px] text-emerald-700/80 dark:text-emerald-300/80 mt-0.5 font-mono truncate">
                    {result.filename} · {result.width}×{result.height} · {formatBytes(result.size)}
                  </p>
                </div>
                <ToolButton
                  size="sm"
                  variant="primary"
                  icon={<Download className="w-3.5 h-3.5" />}
                  onClick={() => downloadPng(result)}
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
