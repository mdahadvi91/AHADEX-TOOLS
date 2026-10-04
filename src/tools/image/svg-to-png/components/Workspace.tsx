import { useRef, useState } from "react";
import { Upload, X, Download, Loader2, FileImage, ImageIcon, CheckCircle2 } from "lucide-react";
import { useLanguage } from "@contexts/LanguageContext";
import { cn } from "@lib/cn";
import {
  loadSvgFile, renderToPng, downloadPng, revokePng, revokeSvg, formatBytes,
} from "../logic";
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
    if (loaded) setSvg(loaded);
  };

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault(); setDrag(false);
    const f = e.dataTransfer.files?.[0];
    if (f) void handleFile(f);
  };

  const handleConvert = async () => {
    if (!svg) return;
    setBusy(true); setError(null);
    try {
      if (result) revokePng(result);
      const res = await renderToPng(svg, { scale, background });
      setResult(res);
      downloadPng(res);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Conversion failed");
    } finally { setBusy(false); }
  };

  const clearAll = () => {
    if (svg) revokeSvg(svg);
    if (result) revokePng(result);
    setSvg(null); setResult(null); setError(null);
    if (inputRef.current) inputRef.current.value = "";
  };

  const targetW = svg ? Math.min(4096, Math.round(svg.width * scale)) : 0;
  const targetH = svg ? Math.min(4096, Math.round(svg.height * scale)) : 0;

  return (
    <section className="pb-12 space-y-4">
      <input ref={inputRef} type="file" accept=".svg,image/svg+xml" onChange={(e) => { const f = e.target.files?.[0]; if (f) void handleFile(f); }} className="hidden" />

      {!svg && (
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
            <p className="font-display font-bold text-[15px] sm:text-lg text-light-text dark:text-dark-text mb-1.5">{bn ? "SVG ফাইল ড্রপ করুন" : "Drop your SVG file"}</p>
            <p className="text-[12px] sm:text-sm text-lightTextSecondary dark:text-dark-textSecondary leading-relaxed">{bn ? "একটি SVG · ২০ MB পর্যন্ত" : "One SVG · Up to 20 MB"}</p>
          </div>
        </div>
      )}

      {error && <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-[12px] text-red-600 dark:text-red-400">{error}</div>}

      {svg && (
        <>
          <div className="rounded-2xl bg-white/70 dark:bg-dark-surface/70 backdrop-blur-xl border border-silk-rose/20 p-4 space-y-4">
            <div className="flex items-center gap-3">
              <span className="w-10 h-10 rounded-xl bg-silk-rose/10 border border-silk-rose/25 flex items-center justify-center shrink-0">
                <FileImage className="w-5 h-5 text-silk-rose" />
              </span>
              <div className="flex-1 min-w-0">
                <p className="text-[12px] sm:text-sm font-semibold text-light-text dark:text-dark-text truncate">{svg.name}</p>
                <p className="text-[10px] sm:text-[11px] text-lightTextSecondary dark:text-dark-textSecondary mt-0.5">
                  {svg.width}×{svg.height} · {formatBytes(svg.size)}
                </p>
              </div>
              <button type="button" onClick={clearAll} className="w-7 h-7 rounded-lg flex items-center justify-center text-red-500 hover:bg-red-500/10 transition-colors shrink-0" aria-label="Clear">
                <X className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-[200px_1fr] gap-4">
              {/* Preview */}
              <div className="rounded-xl overflow-hidden bg-[conic-gradient(at_top_left,_#f0f0f0_25%,_#ffffff_25%_50%,_#f0f0f0_50%_75%,_#ffffff_75%)] bg-[length:16px_16px] border border-silk-rose/15 flex items-center justify-center p-3">
                <img src={svg.dataUrl} alt={svg.name} className="max-w-full max-h-[160px] object-contain" />
              </div>

              {/* Controls */}
              <div className="space-y-3">
                <div>
                  <p className="text-[10px] uppercase tracking-wider font-semibold text-silk-wine/70 dark:text-silk-rose/60 mb-2">{bn ? "স্কেল" : "Scale"}</p>
                  <div className="grid grid-cols-4 gap-2">
                    {SCALES.map((s) => (
                      <button key={s} type="button" onClick={() => setScale(s)} className={cn("h-10 rounded-lg border text-[12px] font-medium transition-all", scale === s ? "bg-silk-rose/15 border-silk-rose/50 text-silk-wine dark:text-silk-rose-soft" : "bg-silk-rose/5 border-silk-rose/15 text-light-textSecondary dark:text-dark-textSecondary hover:border-silk-rose/40")}>
                        {s}×
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <p className="text-[10px] uppercase tracking-wider font-semibold text-silk-wine/70 dark:text-silk-rose/60 mb-2">{bn ? "ব্যাকগ্রাউন্ড" : "Background"}</p>
                  <div className="grid grid-cols-3 gap-2">
                    {BACKGROUNDS.map((b) => (
                      <button key={b.value} type="button" onClick={() => setBackground(b.value)} className={cn("h-10 rounded-lg border text-[11px] font-medium transition-all", background === b.value ? "bg-silk-rose/15 border-silk-rose/50 text-silk-wine dark:text-silk-rose-soft" : "bg-silk-rose/5 border-silk-rose/15 text-light-textSecondary dark:text-dark-textSecondary hover:border-silk-rose/40")}>
                        {b.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex items-center gap-2 text-[10px] text-lightTextSecondary dark:text-dark-textSecondary">
                  <ImageIcon className="w-3.5 h-3.5 text-silk-rose" />
                  {bn ? `আউটপুট: ${targetW}×${targetH} px` : `Output: ${targetW}×${targetH} px`}
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-end gap-3 flex-wrap p-3 rounded-2xl bg-white/70 dark:bg-dark-surface/70 backdrop-blur-xl border border-silk-rose/20">
            <button type="button" onClick={() => void handleConvert()} disabled={busy} className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-gradient-to-r from-silk-rose to-silk-wine-deep text-white text-[11px] sm:text-xs font-semibold shadow-silk-soft hover:shadow-silk-deep transition-all disabled:opacity-50">
              {busy ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Download className="w-3.5 h-3.5" />}
              {bn ? "PNG ডাউনলোড" : "Convert & Download"}
            </button>
          </div>

          {result && (
            <div className="flex items-center gap-3 p-3 rounded-2xl bg-emerald-500/10 border border-emerald-500/30">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0" />
              <div className="flex-1 min-w-0">
                <p className="text-[12px] sm:text-sm font-semibold text-emerald-700 dark:text-emerald-300">
                  {bn ? "PNG তৈরি হয়েছে" : "PNG created"}
                </p>
                <p className="text-[10px] sm:text-[11px] text-emerald-700/70 dark:text-emerald-300/70 mt-0.5 truncate">
                  {result.filename} · {result.width}×{result.height} · {formatBytes(result.size)}
                </p>
              </div>
              <button type="button" onClick={() => downloadPng(result)} className="inline-flex items-center gap-1.5 h-9 px-3 rounded-xl bg-emerald-600 text-white text-[11px] font-semibold hover:bg-emerald-700 transition-colors shrink-0">
                <Download className="w-3.5 h-3.5" />
                {bn ? "ডাউনলোড" : "Download"}
              </button>
            </div>
          )}
        </>
      )}

      {!svg && (
        <div className="flex items-center justify-center gap-2 text-[11px] sm:text-xs text-lightTextSecondary dark:text-dark-textSecondary">
          <FileImage className="w-3.5 h-3.5 text-silk-rose" />
          {bn ? "আপনার SVG ব্রাউজারেই প্রসেস হয়" : "Your SVG is processed in your browser"}
        </div>
      )}
    </section>
  );
}
