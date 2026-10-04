import { useEffect, useRef, useState } from "react";
import { Upload, X, Download, Loader2, ImageIcon, Pencil, RotateCcw } from "lucide-react";
import { useLanguage } from "@contexts/LanguageContext";
import { cn } from "@lib/cn";
import {
  loadImageFile, renderSketch, downloadSketch, formatBytes,
  DEFAULT_OPTIONS,
} from "../logic";
import type { LoadedImage, SketchResult, SketchOptions } from "../types";

export function Workspace() {
  const { language } = useLanguage();
  const bn = language === "bn";
  const inputRef = useRef<HTMLInputElement>(null);

  const [image, setImage] = useState<LoadedImage | null>(null);
  const [opts, setOpts] = useState<SketchOptions>(DEFAULT_OPTIONS);
  const [result, setResult] = useState<SketchResult | null>(null);
  const [busy, setBusy] = useState(false);
  const [drag, setDrag] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Re-render sketch whenever image or options change (debounced)
  useEffect(() => {
    if (!image) return;
    let cancelled = false;
    setBusy(true);
    const t = setTimeout(async () => {
      try {
        const res = await renderSketch(image, opts);
        if (!cancelled) setResult(res);
      } catch (e) {
        if (!cancelled) setError(e instanceof Error ? e.message : "Render failed");
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

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDrag(false);
    const f = e.dataTransfer.files?.[0];
    if (f) void handleFile(f);
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
    downloadSketch(result, image.name);
  };

  return (
    <section className="pb-12 space-y-4">
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

      {!image && (
        <div
          onDragOver={(e) => { e.preventDefault(); setDrag(true); }}
          onDragLeave={() => setDrag(false)}
          onDrop={onDrop}
          onClick={() => inputRef.current?.click()}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") inputRef.current?.click(); }}
          className={cn(
            "flex flex-col items-center justify-center gap-4 p-8 sm:p-16 rounded-3xl cursor-pointer",
            "bg-white/70 dark:bg-dark-surface/70 backdrop-blur-xl",
            "border-2 border-dashed transition-all duration-300",
            drag
              ? "border-silk-rose/70 bg-silk-rose/10 scale-[1.01]"
              : "border-silk-rose/25 hover:border-silk-rose/50"
          )}
        >
          <div className={cn("w-16 h-16 sm:w-20 sm:h-20 rounded-2xl flex items-center justify-center transition-all", "bg-gradient-to-br from-silk-rose/20 to-silk-gold/10 border border-silk-rose/25", drag && "scale-110")}>
            <Upload className="w-7 h-7 sm:w-9 sm:h-9 text-silk-rose" />
          </div>
          <div className="text-center px-3">
            <p className="font-display font-bold text-[15px] sm:text-lg text-light-text dark:text-dark-text mb-1.5">
              {bn ? "ছবি ড্রপ করুন" : "Drop your photo"}
            </p>
            <p className="text-[12px] sm:text-sm text-lightTextSecondary dark:text-dark-textSecondary leading-relaxed">
              {bn ? "JPG · PNG · WebP · ২৫ MB পর্যন্ত" : "JPG · PNG · WebP · Up to 25 MB"}
            </p>
          </div>
        </div>
      )}

      {error && <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-[12px] text-red-600 dark:text-red-400">{error}</div>}

      {image && (
        <>
          {/* Header bar */}
          <div className="flex items-center gap-3 p-3 rounded-2xl bg-white/70 dark:bg-dark-surface/70 backdrop-blur-xl border border-silk-rose/20">
            <span className="w-10 h-10 rounded-xl bg-silk-rose/10 border border-silk-rose/25 flex items-center justify-center shrink-0">
              <ImageIcon className="w-5 h-5 text-silk-rose" />
            </span>
            <div className="flex-1 min-w-0">
              <p className="text-[12px] sm:text-sm font-semibold text-light-text dark:text-dark-text truncate">{image.name}</p>
              <p className="text-[10px] sm:text-[11px] text-lightTextSecondary dark:text-dark-textSecondary mt-0.5">
                {image.naturalWidth}×{image.naturalHeight} · {formatBytes(image.size)}
              </p>
            </div>
            <button type="button" onClick={clearAll} className="w-7 h-7 rounded-lg flex items-center justify-center text-red-500 hover:bg-red-500/10 transition-colors shrink-0" aria-label="Clear">
              <X className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Preview: original + sketch */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="rounded-2xl bg-white/70 dark:bg-dark-surface/70 backdrop-blur-xl border border-silk-rose/20 p-3">
              <p className="text-[10px] uppercase tracking-wider font-semibold text-silk-wine/70 dark:text-silk-rose/60 mb-2">
                {bn ? "মূল ছবি" : "Original"}
              </p>
              <div className="rounded-xl overflow-hidden bg-silk-rose/5 border border-silk-rose/15 flex items-center justify-center min-h-[220px]">
                <img src={image.dataUrl} alt={image.name} className="max-w-full max-h-[400px] object-contain" />
              </div>
            </div>

            <div className="rounded-2xl bg-white/70 dark:bg-dark-surface/70 backdrop-blur-xl border border-silk-rose/20 p-3 relative">
              <div className="flex items-center justify-between mb-2">
                <p className="text-[10px] uppercase tracking-wider font-semibold text-silk-wine/70 dark:text-silk-rose/60">
                  {bn ? "স্কেচ" : "Sketch"}
                </p>
                {busy && <Loader2 className="w-3.5 h-3.5 text-silk-rose animate-spin" />}
              </div>
              <div className="rounded-xl overflow-hidden bg-white border border-silk-rose/15 flex items-center justify-center min-h-[220px]">
                {result ? (
                  <img src={result.dataUrl} alt="Sketch" className="max-w-full max-h-[400px] object-contain" />
                ) : (
                  <Loader2 className="w-6 h-6 text-silk-rose animate-spin" />
                )}
              </div>
            </div>
          </div>

          {/* Controls */}
          <div className="rounded-2xl bg-white/70 dark:bg-dark-surface/70 backdrop-blur-xl border border-silk-rose/20 p-4 space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-[11px] font-medium text-light-text dark:text-dark-text">
                    {bn ? "Intensity (গাঢ়তা)" : "Intensity (stroke darkness)"}
                  </label>
                  <span className="text-[11px] font-mono text-silk-rose">{opts.intensity.toFixed(2)}×</span>
                </div>
                <input
                  type="range"
                  min={0.3}
                  max={2.5}
                  step={0.05}
                  value={opts.intensity}
                  onChange={(e) => setOpts((prev) => ({ ...prev, intensity: parseFloat(e.target.value) }))}
                  className="w-full accent-silk-rose"
                />
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-[11px] font-medium text-light-text dark:text-dark-text">
                    {bn ? "Detail (লাইনের মোটা)" : "Detail (line thickness)"}
                  </label>
                  <span className="text-[11px] font-mono text-silk-rose">{opts.detail}</span>
                </div>
                <input
                  type="range"
                  min={1}
                  max={15}
                  step={1}
                  value={opts.detail}
                  onChange={(e) => setOpts((prev) => ({ ...prev, detail: parseInt(e.target.value) }))}
                  className="w-full accent-silk-rose"
                />
              </div>
            </div>

            <div className="flex items-center gap-2 flex-wrap">
              <button
                type="button"
                onClick={resetOpts}
                className="inline-flex items-center gap-1.5 h-9 px-3 rounded-lg bg-silk-rose/10 border border-silk-rose/25 text-[11px] font-medium text-silk-rose hover:bg-silk-rose/20 transition-all"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                {bn ? "রিসেট" : "Reset"}
              </button>
              <button
                type="button"
                onClick={() => inputRef.current?.click()}
                className="inline-flex items-center gap-1.5 h-9 px-3 rounded-lg bg-silk-rose/10 border border-silk-rose/25 text-[11px] font-medium text-silk-rose hover:bg-silk-rose/20 transition-all"
              >
                <ImageIcon className="w-3.5 h-3.5" />
                {bn ? "অন্য ছবি" : "Another photo"}
              </button>
              <button
                type="button"
                onClick={handleDownload}
                disabled={!result || busy}
                className="ml-auto inline-flex items-center gap-1.5 h-9 px-4 rounded-lg bg-gradient-to-r from-silk-rose to-silk-wine-deep text-white text-[11px] sm:text-xs font-semibold shadow-silk-soft hover:shadow-silk-deep transition-all disabled:opacity-50"
              >
                {busy ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Download className="w-3.5 h-3.5" />}
                {bn ? "PNG ডাউনলোড" : "Download PNG"}
              </button>
            </div>
          </div>
        </>
      )}

      {!image && (
        <div className="flex items-center justify-center gap-2 text-[11px] sm:text-xs text-lightTextSecondary dark:text-dark-textSecondary">
          <Pencil className="w-3.5 h-3.5 text-silk-rose" />
          {bn ? "আপনার ছবি ব্রাউজারেই প্রসেস হয়" : "Your photo is processed in your browser"}
        </div>
      )}
    </section>
  );
}
