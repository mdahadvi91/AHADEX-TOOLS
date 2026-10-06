import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Download,
  X,
  Palette,
  RotateCcw,
  Settings2,
  Image as ImageIcon,
} from "lucide-react";
import { useLanguage } from "@contexts/LanguageContext";
import { useSound } from "@contexts/SoundContext";
import {
  WorkspacePanel,
  DropZone,
  ToolButton,
  ResultStat,
} from "@components/workspace";
import {
  loadImageFile,
  renderCartoon,
  downloadCartoon,
  formatBytes,
  DEFAULT_OPTIONS,
} from "../logic";
import type {
  LoadedImage,
  CartoonResult,
  CartoonOptions,
} from "../types";

export function Workspace() {
  const { language } = useLanguage();
  const { play } = useSound();
  const bn = language === "bn";

  const inputRef = useRef<HTMLInputElement>(null);
  const [image, setImage] = useState<LoadedImage | null>(null);
  const [opts, setOpts] = useState<CartoonOptions>(DEFAULT_OPTIONS);
  const [result, setResult] = useState<CartoonResult | null>(null);
  const [busy, setBusy] = useState(false);
  const [drag, setDrag] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!image) return;
    let cancelled = false;
    setBusy(true);
    const t = setTimeout(async () => {
      try {
        const res = await renderCartoon(image, opts);
        if (!cancelled) setResult(res);
      } catch (e) {
        if (!cancelled)
          setError(e instanceof Error ? e.message : "Render failed");
      } finally {
        if (!cancelled) setBusy(false);
      }
    }, 100);
    return () => {
      cancelled = true;
      clearTimeout(t);
    };
  }, [image, opts]);

  const handleFile = async (file: File) => {
    setError(null);
    setResult(null);
    const loaded = await loadImageFile(file, setError);
    if (loaded) {
      setImage(loaded);
      setOpts(DEFAULT_OPTIONS);
    }
  };

  const clearAll = () => {
    setImage(null);
    setResult(null);
    setError(null);
    setOpts(DEFAULT_OPTIONS);
    if (inputRef.current) inputRef.current.value = "";
  };

  const resetOpts = () => setOpts(DEFAULT_OPTIONS);

  const handleDownload = () => {
    if (!image || !result) return;
    downloadCartoon(result, image.name);
    play("success");
  };

  return (
    <section className="pb-12 space-y-4 sm:space-y-5">
      <input
        ref={inputRef}
        type="file"
        accept="image/jpeg,image/jpg,image/png,image/webp"
        onChange={(e) => {
          const f = e.target.files?.[0];
          if (f) void handleFile(f);
        }}
        className="hidden"
      />

      {/* ── Empty state ── */}
      {!image && (
        <DropZone
          onFiles={(list) => {
            const f = list?.[0];
            if (f) void handleFile(f);
          }}
          accept="image/jpeg,image/jpg,image/png,image/webp"
          busy={busy}
          drag={drag}
          onDragChange={setDrag}
          title={bn ? "ছবি ড্রপ করুন" : "Drop your photo"}
          subtitle={
            bn
              ? "JPG · PNG · WebP · ২৫ MB পর্যন্ত"
              : "JPG · PNG · WebP · Up to 25 MB"
          }
          icon={<Palette className="w-7 h-7 sm:w-9 sm:h-9 text-silk-rose" />}
        />
      )}

      {/* ── Error ── */}
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

      {image && (
        <>
          {/* ── Settings ── */}
          <WorkspacePanel className="p-4 sm:p-5 space-y-4">
            <div className="flex items-center gap-2">
              <span className="w-7 h-7 rounded-lg bg-silk-rose/15 border border-silk-rose/25 flex items-center justify-center">
                <Settings2 className="w-3.5 h-3.5 text-silk-rose" />
              </span>
              <span className="text-[12px] sm:text-sm font-bold text-light-text dark:text-dark-text">
                {bn ? "কার্টুন সেটিংস" : "Cartoon settings"}
              </span>
            </div>

            {/* Color levels */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-[11px] font-bold uppercase tracking-wider text-light-textSecondary dark:text-dark-textSecondary">
                  {bn ? "রঙের লেভেল" : "Color levels"}
                </label>
                <span className="text-[12px] font-mono font-bold text-silk-rose px-2 py-0.5 rounded-md bg-silk-rose/10">
                  {opts.levels}
                </span>
              </div>
              <input
                type="range"
                min={4}
                max={16}
                step={1}
                value={opts.levels}
                onChange={(e) =>
                  setOpts((o) => ({
                    ...o,
                    levels: parseInt(e.target.value),
                  }))
                }
                className="w-full accent-silk-rose cursor-pointer"
              />
              <div className="flex justify-between text-[9px] text-light-textSecondary dark:text-dark-textSecondary mt-1 font-mono">
                <span>{bn ? "কম রঙ" : "less color"}</span>
                <span>{bn ? "বেশি রঙ" : "more color"}</span>
              </div>
            </div>

            {/* Edge strength */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-[11px] font-bold uppercase tracking-wider text-light-textSecondary dark:text-dark-textSecondary">
                  {bn ? "আউটলাইন স্ট্রেংথ" : "Outline strength"}
                </label>
                <span className="text-[12px] font-mono font-bold text-silk-rose px-2 py-0.5 rounded-md bg-silk-rose/10">
                  {opts.edgeStrength.toFixed(1)}×
                </span>
              </div>
              <input
                type="range"
                min={0}
                max={2}
                step={0.1}
                value={opts.edgeStrength}
                onChange={(e) =>
                  setOpts((o) => ({
                    ...o,
                    edgeStrength: parseFloat(e.target.value),
                  }))
                }
                className="w-full accent-silk-rose cursor-pointer"
              />
              <div className="flex justify-between text-[9px] text-light-textSecondary dark:text-dark-textSecondary mt-1 font-mono">
                <span>{bn ? "নরম" : "soft"}</span>
                <span>{bn ? "গাঢ়" : "bold"}</span>
              </div>
            </div>

            {/* Smoothness */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-[11px] font-bold uppercase tracking-wider text-light-textSecondary dark:text-dark-textSecondary">
                  {bn ? "স্মুথনেস" : "Smoothness"}
                </label>
                <span className="text-[12px] font-mono font-bold text-silk-rose px-2 py-0.5 rounded-md bg-silk-rose/10">
                  {opts.smoothness}
                </span>
              </div>
              <input
                type="range"
                min={0}
                max={4}
                step={1}
                value={opts.smoothness}
                onChange={(e) =>
                  setOpts((o) => ({
                    ...o,
                    smoothness: parseInt(e.target.value),
                  }))
                }
                className="w-full accent-silk-rose cursor-pointer"
              />
              <div className="flex justify-between text-[9px] text-lightTextSecondary dark:text-dark-textSecondary mt-1 font-mono">
                <span>{bn ? "শার্প" : "sharp"}</span>
                <span>{bn ? "স্মুথ" : "smooth"}</span>
              </div>
            </div>

            <div className="flex items-center justify-end pt-2 border-t border-silk-rose/10">
              <button
                type="button"
                onClick={resetOpts}
                className="inline-flex items-center gap-1.5 text-[11px] font-bold text-silk-rose hover:text-silk-wine dark:hover:text-silk-rose-soft transition-colors"
              >
                <RotateCcw className="w-3 h-3" />
                {bn ? "ডিফল্টে ফিরুন" : "Reset to default"}
              </button>
            </div>
          </WorkspacePanel>

          {/* ── Preview side-by-side ── */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 sm:gap-4">
            {/* Original */}
            <WorkspacePanel className="p-3 sm:p-4" animate={false}>
              <div className="flex items-center gap-2 mb-3">
                <span className="w-6 h-6 rounded-md bg-silk-rose/10 border border-silk-rose/20 flex items-center justify-center">
                  <ImageIcon className="w-3 h-3 text-silk-rose" />
                </span>
                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-silk-wine/70 dark:text-silk-rose/60">
                  {bn ? "আসল" : "Original"}
                </span>
              </div>
              <div className="rounded-xl overflow-hidden border border-silk-rose/15 bg-silk-rose/5">
                <img
                  src={image.dataUrl}
                  alt={image.name}
                  className="block w-full h-auto max-h-[420px] object-contain"
                />
              </div>
              <div className="mt-3 flex items-center justify-between text-[10px] sm:text-[11px] font-mono text-light-textSecondary dark:text-dark-textSecondary">
                <span>
                  {image.naturalWidth} × {image.naturalHeight}
                </span>
                <span>{formatBytes(image.size)}</span>
              </div>
            </WorkspacePanel>

            {/* Cartoon */}
            <WorkspacePanel className="p-3 sm:p-4" animate={false}>
              <div className="flex items-center gap-2 mb-3">
                <span className="w-6 h-6 rounded-md bg-silk-rose/15 border border-silk-rose/30 flex items-center justify-center">
                  <Palette className="w-3 h-3 text-silk-rose" />
                </span>
                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-silk-rose">
                  {bn ? "কার্টুন" : "Cartoon"}
                </span>
                {busy && (
                  <span className="ml-auto inline-flex items-center gap-1 text-[10px] font-bold text-silk-rose">
                    <span className="w-1.5 h-1.5 rounded-full bg-silk-rose animate-pulse" />
                    {bn ? "রেন্ডার হচ্ছে" : "rendering"}
                  </span>
                )}
              </div>
              <div className="rounded-xl overflow-hidden border border-silk-rose/20 bg-white relative">
                {result ? (
                  <img
                    src={result.dataUrl}
                    alt="cartoon"
                    className="block w-full h-auto max-h-[420px] object-contain"
                  />
                ) : (
                  <div className="aspect-square flex items-center justify-center text-[12px] text-light-textSecondary dark:text-dark-textSecondary">
                    <span className="inline-flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-silk-rose animate-pulse" />
                      {bn ? "রেন্ডার হচ্ছে..." : "Rendering..."}
                    </span>
                  </div>
                )}
              </div>
              {result && (
                <div className="mt-3 flex items-center justify-between text-[10px] sm:text-[11px] font-mono text-light-textSecondary dark:text-dark-textSecondary">
                  <span>
                    {result.width} × {result.height}
                  </span>
                  <span>{formatBytes(result.size)}</span>
                </div>
              )}
            </WorkspacePanel>
          </div>

          {/* ── Stats ── */}
          {result && (
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-3">
              <ResultStat
                label={bn ? "মাপ" : "Size"}
                value={formatBytes(result.size)}
                accent="rose"
              />
              <ResultStat
                label={bn ? "রঙের লেভেল" : "Colors"}
                value={String(opts.levels)}
                accent="rose"
              />
              <ResultStat
                label={bn ? "আউটলাইন" : "Outline"}
                value={`${opts.edgeStrength.toFixed(1)}×`}
                accent="rose"
              />
              <ResultStat
                label={bn ? "স্মুথ" : "Smooth"}
                value={String(opts.smoothness)}
                accent="emerald"
              />
            </div>
          )}

          {/* ── Action bar ── */}
          <WorkspacePanel className="p-3.5 sm:p-4" animate={false}>
            <div className="flex items-center justify-between gap-3 flex-wrap">
              <div className="flex items-center gap-2 text-[12px] sm:text-[13px] text-light-text dark:text-dark-text">
                <Palette className="w-4 h-4 text-silk-rose shrink-0" />
                <span className="font-bold">
                  {bn ? "কার্টুন রেডি" : "Cartoon ready"}
                </span>
              </div>

              <div className="flex items-center gap-2 flex-wrap">
                <ToolButton
                  size="sm"
                  variant="secondary"
                  onClick={() => inputRef.current?.click()}
                >
                  {bn ? "নতুন ছবি" : "New photo"}
                </ToolButton>

                <ToolButton
                  size="sm"
                  variant="primary"
                  icon={<Download className="w-3.5 h-3.5" />}
                  onClick={handleDownload}
                  disabled={!result || busy}
                >
                  {bn ? "ডাউনলোড" : "Download"}
                </ToolButton>

                <button
                  type="button"
                  onClick={clearAll}
                  aria-label="Clear"
                  className="w-8 h-8 rounded-xl flex items-center justify-center text-red-500 bg-red-500/10 border border-red-500/25 hover:bg-red-500/20 transition-all"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </WorkspacePanel>
        </>
      )}
    </section>
  );
}
