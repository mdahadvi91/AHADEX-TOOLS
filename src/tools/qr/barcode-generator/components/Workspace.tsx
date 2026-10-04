import { useEffect, useRef, useState } from "react";
import { Copy, ClipboardCheck, AlertCircle, Barcode, FileCode2, ImageIcon } from "lucide-react";
import { useLanguage } from "@contexts/LanguageContext";
import { cn } from "@lib/cn";
import {
  FORMATS, DEFAULT_OPTIONS, renderBarcode, downloadSvg, downloadPng, copySvg, findFormat,
} from "../logic";
import type { BarcodeOptions, BarcodeFormat } from "../types";

export function Workspace() {
  const { language } = useLanguage();
  const bn = language === "bn";

  const svgRef = useRef<SVGSVGElement>(null);
  const [value, setValue] = useState("AHADEX-2026");
  const [opts, setOpts] = useState<BarcodeOptions>(DEFAULT_OPTIONS);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    if (!svgRef.current) return;
    const err = renderBarcode(svgRef.current, value, opts);
    setError(err);
  }, [value, opts]);

  const handleFormat = (fmt: BarcodeFormat) => {
    const def = findFormat(fmt);
    setOpts((p) => ({ ...p, format: fmt }));
    // Auto-fill example if value is empty
    if (!value.trim()) setValue(def.example);
  };

  const handleDownloadPng = async () => {
    if (!svgRef.current || !value.trim()) return;
    setBusy(true);
    try {
      await downloadPng(svgRef.current, `barcode-${opts.format}-${Date.now()}.png`, 3);
    } catch { /* ignore */ }
    finally { setBusy(false); }
  };

  const handleDownloadSvg = () => {
    if (!svgRef.current || !value.trim()) return;
    downloadSvg(svgRef.current, `barcode-${opts.format}-${Date.now()}.svg`);
  };

  const handleCopy = async () => {
    if (!svgRef.current || !value.trim()) return;
    try {
      await copySvg(svgRef.current);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch { /* ignore */ }
  };

  const current = findFormat(opts.format);

  return (
    <section className="pb-12 space-y-4">
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-4">
        {/* Controls */}
        <div className="space-y-3">
          {/* Format selector */}
          <div className="rounded-2xl bg-white/70 dark:bg-dark-surface/70 backdrop-blur-xl border border-silk-rose/20 p-3">
            <p className="text-[10px] uppercase tracking-wider font-semibold text-silk-wine/70 dark:text-silk-rose/60 mb-2">
              {bn ? "বারকোড ফরম্যাট" : "Barcode format"}
            </p>
            <div className="grid grid-cols-3 sm:grid-cols-5 lg:grid-cols-5 gap-1.5">
              {FORMATS.map((f) => (
                <button
                  key={f.value}
                  type="button"
                  onClick={() => handleFormat(f.value)}
                  className={cn(
                    "h-11 rounded-lg border text-[10px] sm:text-[11px] font-mono font-semibold transition-all",
                    opts.format === f.value
                      ? "bg-silk-rose/15 border-silk-rose/50 text-silk-wine dark:text-silk-rose-soft"
                      : "bg-silk-rose/5 border-silk-rose/15 text-light-textSecondary dark:text-dark-textSecondary hover:border-silk-rose/40"
                  )}
                >
                  {f.label}
                </button>
              ))}
            </div>
            <p className="mt-2 text-[10px] text-lightTextSecondary dark:text-dark-textSecondary">
              <strong className="text-silk-rose">{current.label}:</strong> {current.hint}
            </p>
          </div>

          {/* Value input */}
          <div className="rounded-2xl bg-white/70 dark:bg-dark-surface/70 backdrop-blur-xl border border-silk-rose/20 p-3">
            <label className="block text-[11px] font-medium text-light-text dark:text-dark-text mb-1.5">
              {bn ? "মান" : "Value"}
            </label>
            <input
              type="text"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              placeholder={current.example}
              spellCheck={false}
              className="w-full h-11 px-3 rounded-lg text-[13px] font-mono bg-white/80 dark:bg-dark-surface/80 border border-silk-rose/20 focus:border-silk-rose/50 text-light-text dark:text-dark-text outline-none transition-all"
            />
          </div>

          {/* Options */}
          <div className="rounded-2xl bg-white/70 dark:bg-dark-surface/70 backdrop-blur-xl border border-silk-rose/20 p-4 space-y-3">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="text-[11px] font-medium text-light-text dark:text-dark-text">
                    {bn ? "Bar width" : "Bar width"}
                  </label>
                  <span className="text-[11px] font-mono text-silk-rose">{opts.width}</span>
                </div>
                <input type="range" min={1} max={6} step={0.5} value={opts.width} onChange={(e) => setOpts((p) => ({ ...p, width: parseFloat(e.target.value) }))} className="w-full accent-silk-rose" />
              </div>
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="text-[11px] font-medium text-light-text dark:text-dark-text">
                    {bn ? "Height" : "Height"}
                  </label>
                  <span className="text-[11px] font-mono text-silk-rose">{opts.height}</span>
                </div>
                <input type="range" min={40} max={300} step={10} value={opts.height} onChange={(e) => setOpts((p) => ({ ...p, height: parseInt(e.target.value) }))} className="w-full accent-silk-rose" />
              </div>
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="text-[11px] font-medium text-light-text dark:text-dark-text">
                    {bn ? "Font size" : "Font size"}
                  </label>
                  <span className="text-[11px] font-mono text-silk-rose">{opts.fontSize}</span>
                </div>
                <input type="range" min={10} max={40} step={1} value={opts.fontSize} onChange={(e) => setOpts((p) => ({ ...p, fontSize: parseInt(e.target.value) }))} className="w-full accent-silk-rose" />
              </div>
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="text-[11px] font-medium text-light-text dark:text-dark-text">
                    {bn ? "Margin" : "Margin"}
                  </label>
                  <span className="text-[11px] font-mono text-silk-rose">{opts.margin}</span>
                </div>
                <input type="range" min={0} max={40} step={2} value={opts.margin} onChange={(e) => setOpts((p) => ({ ...p, margin: parseInt(e.target.value) }))} className="w-full accent-silk-rose" />
              </div>
            </div>

            <div className="grid grid-cols-3 gap-2">
              <button type="button" onClick={() => setOpts((p) => ({ ...p, displayValue: !p.displayValue }))} className={cn("h-9 rounded-lg border text-[11px] font-medium transition-all", opts.displayValue ? "bg-silk-rose/15 border-silk-rose/50 text-silk-wine dark:text-silk-rose-soft" : "bg-silk-rose/5 border-silk-rose/15 text-light-textSecondary dark:text-dark-textSecondary hover:border-silk-rose/40")}>
                {opts.displayValue ? (bn ? "✓ টেক্সট" : "✓ Text") : (bn ? "টেক্সট নেই" : "No text")}
              </button>
              <div className="flex items-center gap-1.5">
                <input type="color" value={opts.lineColor} onChange={(e) => setOpts((p) => ({ ...p, lineColor: e.target.value }))} className="w-9 h-9 rounded-lg border border-silk-rose/20 cursor-pointer bg-transparent shrink-0" />
                <input type="text" value={opts.lineColor} onChange={(e) => setOpts((p) => ({ ...p, lineColor: e.target.value }))} className="flex-1 min-w-0 h-9 px-2 rounded-lg text-[10px] font-mono bg-white/80 dark:bg-dark-surface/80 border border-silk-rose/20 focus:border-silk-rose/50 text-light-text dark:text-dark-text outline-none" />
              </div>
              <div className="flex items-center gap-1.5">
                <input type="color" value={opts.background} onChange={(e) => setOpts((p) => ({ ...p, background: e.target.value }))} className="w-9 h-9 rounded-lg border border-silk-rose/20 cursor-pointer bg-transparent shrink-0" />
                <input type="text" value={opts.background} onChange={(e) => setOpts((p) => ({ ...p, background: e.target.value }))} className="flex-1 min-w-0 h-9 px-2 rounded-lg text-[10px] font-mono bg-white/80 dark:bg-dark-surface/80 border border-silk-rose/20 focus:border-silk-rose/50 text-light-text dark:text-dark-text outline-none" />
              </div>
            </div>
          </div>
        </div>

        {/* Preview */}
        <div className="lg:sticky lg:top-4 space-y-3">
          <div className="rounded-2xl bg-white/70 dark:bg-dark-surface/70 backdrop-blur-xl border border-silk-rose/20 p-4">
            <div className="flex items-center justify-between mb-3">
              <span className="text-[10px] uppercase tracking-wider font-semibold text-silk-wine/70 dark:text-silk-rose/60">
                {bn ? "প্রিভিউ" : "Preview"}
              </span>
              <span className="text-[10px] font-mono text-lightTextSecondary dark:text-dark-textSecondary">{opts.format}</span>
            </div>
            <div className="rounded-xl bg-white border border-silk-rose/15 flex items-center justify-center p-3 min-h-[160px] overflow-hidden">
              {value.trim() && !error ? (
                <svg ref={svgRef} className="max-w-full h-auto" />
              ) : (
                <div className="text-center text-lightTextSecondary dark:text-dark-textSecondary p-4">
                  <Barcode className="w-10 h-10 text-silk-rose/40 mx-auto mb-2" />
                  <p className="text-[11px]">
                    {error ? (bn ? "অবৈধ মান" : "Invalid value") : (bn ? "মান লিখুন" : "Enter a value")}
                  </p>
                </div>
              )}
            </div>
            {/* Hidden SVG always mounted for rendering */}
            <div className="sr-only"><svg ref={svgRef} /></div>
          </div>

          {error && (
            <div className="flex items-start gap-2 p-3 rounded-2xl bg-red-500/10 border border-red-500/30 text-[12px] text-red-600 dark:text-red-400">
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          <div className="grid grid-cols-2 gap-2">
            <button type="button" onClick={() => void handleDownloadPng()} disabled={!value.trim() || !!error || busy} className="inline-flex items-center justify-center gap-1.5 h-11 rounded-lg bg-gradient-to-r from-silk-rose to-silk-wine-deep text-white text-[11px] sm:text-xs font-semibold shadow-silk-soft hover:shadow-silk-deep transition-all disabled:opacity-40">
              <ImageIcon className="w-3.5 h-3.5" /> PNG
            </button>
            <button type="button" onClick={handleDownloadSvg} disabled={!value.trim() || !!error} className="inline-flex items-center justify-center gap-1.5 h-11 rounded-lg bg-silk-rose/10 border border-silk-rose/25 text-[11px] sm:text-xs font-semibold text-silk-rose hover:bg-silk-rose/20 transition-all disabled:opacity-40">
              <FileCode2 className="w-3.5 h-3.5" /> SVG
            </button>
          </div>

          <button type="button" onClick={() => void handleCopy()} disabled={!value.trim() || !!error} className="w-full inline-flex items-center justify-center gap-1.5 h-10 rounded-lg bg-white/70 dark:bg-dark-surface/70 backdrop-blur-xl border border-silk-rose/20 text-[11px] font-medium text-silk-rose hover:bg-silk-rose/10 transition-all disabled:opacity-40">
            {copied ? <ClipboardCheck className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
            {copied ? (bn ? "কপি হয়েছে" : "Copied") : (bn ? "SVG কপি" : "Copy SVG")}
          </button>
        </div>
      </div>
    </section>
  );
}
