import { useEffect, useRef, useState } from "react";
import { Upload, X, Download, Loader2, Image as ImageIcon, Sparkles, RotateCcw } from "lucide-react";
import { useLanguage } from "@contexts/LanguageContext";
import { cn } from "@lib/cn";
import {
  loadImageFile, generateAll, downloadFile, downloadManifest,
  revokeFiles, formatBytes, DEFAULT_OPTIONS,
} from "../logic";
import type { LoadedImage, FaviconOptions, GeneratedFile } from "../types";

export function Workspace() {
  const { language } = useLanguage();
  const bn = language === "bn";
  const inputRef = useRef<HTMLInputElement>(null);

  const [image, setImage] = useState<LoadedImage | null>(null);
  const [opts, setOpts] = useState<FaviconOptions>(DEFAULT_OPTIONS);
  const [files, setFiles] = useState<GeneratedFile[]>([]);
  const [manifest, setManifest] = useState("");
  const [busy, setBusy] = useState(false);
  const [drag, setDrag] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!image) return;
    let cancelled = false;
    setBusy(true);
    const t = setTimeout(async () => {
      try {
        revokeFiles(files);
        const res = await generateAll(image, opts, true);
        if (!cancelled) { setFiles(res.files); setManifest(res.manifest); }
      } catch (e) {
        if (!cancelled) setError(e instanceof Error ? e.message : "Generation failed");
      } finally {
        if (!cancelled) setBusy(false);
      }
    }, 150);
    return () => { cancelled = true; clearTimeout(t); };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [image, opts]);

  const handleFile = async (file: File) => {
    setError(null);
    const loaded = await loadImageFile(file, setError);
    if (loaded) setImage(loaded);
  };

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault(); setDrag(false);
    const f = e.dataTransfer.files?.[0];
    if (f) void handleFile(f);
  };

  const clearAll = () => {
    revokeFiles(files);
    setFiles([]); setManifest("");
    setImage(null); setError(null);
    setOpts(DEFAULT_OPTIONS);
    if (inputRef.current) inputRef.current.value = "";
  };

  const downloadAll = () => {
    files.forEach((f, i) => setTimeout(() => downloadFile(f), i * 200));
  };

  return (
    <section className="pb-12 space-y-4">
      <input ref={inputRef} type="file" accept="image/jpeg,image/jpg,image/png,image/webp,image/svg+xml" onChange={(e) => { const f = e.target.files?.[0]; if (f) void handleFile(f); }} className="hidden" />

      {!image && (
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
            <p className="font-display font-bold text-[15px] sm:text-lg text-light-text dark:text-dark-text mb-1.5">{bn ? "ছবি ড্রপ করুন" : "Drop your image"}</p>
            <p className="text-[12px] sm:text-sm text-lightTextSecondary dark:text-dark-textSecondary leading-relaxed">{bn ? "JPG · PNG · WebP · SVG · ১০ MB পর্যন্ত" : "JPG · PNG · WebP · SVG · Up to 10 MB"}</p>
          </div>
        </div>
      )}

      {error && <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-[12px] text-red-600 dark:text-red-400">{error}</div>}

      {image && (
        <>
          <div className="flex items-center gap-3 p-3 rounded-2xl bg-white/70 dark:bg-dark-surface/70 backdrop-blur-xl border border-silk-rose/20">
            <span className="w-10 h-10 rounded-xl bg-silk-rose/10 border border-silk-rose/25 flex items-center justify-center shrink-0"><ImageIcon className="w-5 h-5 text-silk-rose" /></span>
            <div className="flex-1 min-w-0">
              <p className="text-[12px] sm:text-sm font-semibold text-light-text dark:text-dark-text truncate">{image.name}</p>
              <p className="text-[10px] sm:text-[11px] text-lightTextSecondary dark:text-dark-textSecondary mt-0.5">{image.width}×{image.height} · {formatBytes(files.reduce((s, f) => s + f.size, 0))} total</p>
            </div>
            <button type="button" onClick={clearAll} className="w-7 h-7 rounded-lg flex items-center justify-center text-red-500 hover:bg-red-500/10 transition-colors shrink-0"><X className="w-3.5 h-3.5" /></button>
          </div>

          {/* Controls */}
          <div className="rounded-2xl bg-white/70 dark:bg-dark-surface/70 backdrop-blur-xl border border-silk-rose/20 p-4 space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="text-[11px] font-medium text-light-text dark:text-dark-text">{bn ? "প্যাডিং" : "Padding"}</label>
                  <span className="text-[11px] font-mono text-silk-rose">{opts.padding}%</span>
                </div>
                <input type="range" min={0} max={40} step={1} value={opts.padding} onChange={(e) => setOpts((p) => ({ ...p, padding: parseInt(e.target.value) }))} className="w-full accent-silk-rose" />
              </div>
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="text-[11px] font-medium text-light-text dark:text-dark-text">{bn ? "রেডিয়াস" : "Corner radius"}</label>
                  <span className="text-[11px] font-mono text-silk-rose">{opts.rounded ? `${opts.radius}%` : "off"}</span>
                </div>
                <div className="flex items-center gap-2">
                  <button type="button" onClick={() => setOpts((p) => ({ ...p, rounded: !p.rounded }))} className={cn("h-8 px-3 rounded-lg border text-[11px] font-medium transition-all", opts.rounded ? "bg-silk-rose/15 border-silk-rose/50 text-silk-wine dark:text-silk-rose-soft" : "bg-silk-rose/5 border-silk-rose/15 text-light-textSecondary dark:text-dark-textSecondary")}>
                    {opts.rounded ? "on" : "off"}
                  </button>
                  <input type="range" min={0} max={50} step={1} disabled={!opts.rounded} value={opts.radius} onChange={(e) => setOpts((p) => ({ ...p, radius: parseInt(e.target.value) }))} className="flex-1 accent-silk-rose disabled:opacity-40" />
                </div>
              </div>
            </div>

            <div>
              <p className="text-[10px] uppercase tracking-wider font-semibold text-silk-wine/70 dark:text-silk-rose/60 mb-2">{bn ? "ব্যাকগ্রাউন্ড" : "Background"}</p>
              <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
                {(["auto", "transparent", "white", "black", "custom"] as const).map((bg) => (
                  <button key={bg} type="button" onClick={() => setOpts((p) => ({ ...p, background: bg }))} className={cn("h-9 rounded-lg border text-[11px] font-medium transition-all capitalize", opts.background === bg ? "bg-silk-rose/15 border-silk-rose/50 text-silk-wine dark:text-silk-rose-soft" : "bg-silk-rose/5 border-silk-rose/15 text-light-textSecondary dark:text-dark-textSecondary hover:border-silk-rose/40")}>
                    {bg}
                  </button>
                ))}
              </div>
              {opts.background === "custom" && (
                <div className="flex items-center gap-2 mt-2">
                  <input type="color" value={opts.customBackground} onChange={(e) => setOpts((p) => ({ ...p, customBackground: e.target.value }))} className="w-9 h-9 rounded-lg border border-silk-rose/20 cursor-pointer bg-transparent" />
                  <input type="text" value={opts.customBackground} onChange={(e) => setOpts((p) => ({ ...p, customBackground: e.target.value }))} className="flex-1 h-9 px-3 rounded-lg text-[11px] font-mono bg-white/80 dark:bg-dark-surface/80 border border-silk-rose/20 focus:border-silk-rose/50 text-light-text dark:text-dark-text outline-none" />
                </div>
              )}
            </div>

            <div className="flex items-center gap-2 flex-wrap">
              <button type="button" onClick={() => setOpts(DEFAULT_OPTIONS)} className="inline-flex items-center gap-1.5 h-9 px-3 rounded-lg bg-silk-rose/10 border border-silk-rose/25 text-[11px] font-medium text-silk-rose hover:bg-silk-rose/20 transition-all">
                <RotateCcw className="w-3.5 h-3.5" />{bn ? "রিসেট" : "Reset"}
              </button>
              <button type="button" onClick={() => inputRef.current?.click()} className="inline-flex items-center gap-1.5 h-9 px-3 rounded-lg bg-silk-rose/10 border border-silk-rose/25 text-[11px] font-medium text-silk-rose hover:bg-silk-rose/20 transition-all">
                <ImageIcon className="w-3.5 h-3.5" />{bn ? "অন্য ছবি" : "Another image"}
              </button>
              <button type="button" onClick={downloadAll} disabled={files.length === 0 || busy} className="ml-auto inline-flex items-center gap-1.5 h-9 px-4 rounded-lg bg-gradient-to-r from-silk-rose to-silk-wine-deep text-white text-[11px] sm:text-xs font-semibold shadow-silk-soft hover:shadow-silk-deep transition-all disabled:opacity-40">
                {busy ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Download className="w-3.5 h-3.5" />}
                {bn ? "সব ডাউনলোড" : "Download all"}
              </button>
            </div>
          </div>

          {/* Preview grid */}
          {files.length > 0 && (
            <div className="rounded-2xl bg-white/70 dark:bg-dark-surface/70 backdrop-blur-xl border border-silk-rose/20 p-4">
              <div className="flex items-center gap-2 mb-3">
                <Sparkles className="w-3.5 h-3.5 text-silk-rose" />
                <span className="text-[10px] uppercase tracking-wider font-semibold text-silk-wine/70 dark:text-silk-rose/60">{bn ? "প্রিভিউ" : "Preview"}</span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {files.map((f) => (
                  <div key={f.filename} className="flex flex-col items-center gap-2 p-2 rounded-xl bg-silk-rose/5 border border-silk-rose/15">
                    <div className="w-16 h-16 rounded-lg bg-white dark:bg-[#1A1114] flex items-center justify-center overflow-hidden border border-silk-rose/10">
                      <img src={f.url} alt={f.filename} className="max-w-full max-h-full" style={{ imageRendering: f.width <= 48 ? "pixelated" : "auto" }} />
                    </div>
                    <div className="text-center">
                      <p className="text-[9px] font-mono text-light-text dark:text-dark-text truncate max-w-[100px]">{f.filename}</p>
                      <p className="text-[9px] text-lightTextSecondary dark:text-dark-textSecondary">{formatBytes(f.size)}</p>
                    </div>
                    <button type="button" onClick={() => downloadFile(f)} className="text-[10px] font-medium text-silk-rose hover:underline">
                      {bn ? "ডাউনলোড" : "Download"}
                    </button>
                  </div>
                ))}
              </div>

              <div className="mt-4 pt-4 border-t border-silk-rose/15 flex items-center gap-3 flex-wrap">
                <span className="text-[11px] text-lightTextSecondary dark:text-dark-textSecondary">{bn ? "webmanifest" : "site.webmanifest"}</span>
                <button type="button" onClick={() => downloadManifest(manifest)} className="inline-flex items-center gap-1.5 h-8 px-3 rounded-lg bg-silk-rose/10 border border-silk-rose/25 text-[11px] font-medium text-silk-rose hover:bg-silk-rose/20 transition-all">
                  <Download className="w-3 h-3" />{bn ? "ডাউনলোড" : "Download"}
                </button>
              </div>
            </div>
          )}
        </>
      )}

      {!image && (
        <div className="flex items-center justify-center gap-2 text-[11px] sm:text-xs text-lightTextSecondary dark:text-dark-textSecondary">
          <ImageIcon className="w-3.5 h-3.5 text-silk-rose" />
          {bn ? "আপনার ছবি ব্রাউজারেই প্রসেস হয়" : "Your image is processed in your browser"}
        </div>
      )}
    </section>
  );
}
