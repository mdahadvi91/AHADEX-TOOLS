import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Copy,
  ClipboardCheck,
  AlertCircle,
  Barcode,
  FileCode2,
  Image as ImageIcon,
  Settings2,
  Hash,
} from "lucide-react";
import { useLanguage } from "@contexts/LanguageContext";
import { cn } from "@lib/cn";
import {
  WorkspacePanel,
  ToolButton,
} from "@components/workspace";
import {
  FORMATS,
  DEFAULT_OPTIONS,
  renderBarcode,
  downloadSvg,
  downloadPng,
  copySvg,
  findFormat,
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
    if (!value.trim()) setValue(def.example);
    
  };

  const handleDownloadPng = async () => {
    if (!svgRef.current || !value.trim()) return;
    setBusy(true);
    try {
      await downloadPng(
        svgRef.current,
        `barcode-${opts.format}-${Date.now()}.png`,
        3
      );
      
    } catch {
      /* ignore */
    } finally {
      setBusy(false);
    }
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
    } catch {
      /* ignore */
    }
  };

  const current = findFormat(opts.format);

  return (
    <section className="pb-12">
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-4">
        {/* ── Left: Controls ── */}
        <div className="space-y-4">
          {/* Format selector */}
          <WorkspacePanel className="p-4 space-y-3">
            <div className="flex items-center gap-2">
              <span className="w-7 h-7 rounded-lg bg-silk-rose/15 border border-silk-rose/25 flex items-center justify-center">
                <Barcode className="w-3.5 h-3.5 text-silk-rose" />
              </span>
              <span className="text-[12px] sm:text-sm font-bold text-light-text dark:text-dark-text">
                {bn ? "বারকোড ফরম্যাট" : "Barcode format"}
              </span>
              <span className="ml-auto text-[10px] font-mono font-bold text-silk-rose bg-silk-rose/10 px-2 py-0.5 rounded-md">
                {current.label}
              </span>
            </div>

            <div className="grid grid-cols-3 sm:grid-cols-5 gap-1.5">
              {FORMATS.map((f) => {
                const isActive = opts.format === f.value;
                return (
                  <button
                    key={f.value}
                    type="button"
                    onClick={() => handleFormat(f.value)}
                    className={cn(
                      "h-11 rounded-xl border text-[10px] sm:text-[11px] font-mono font-bold transition-all",
                      isActive
                        ? "bg-gradient-to-br from-silk-rose/20 to-silk-gold/10 border-silk-rose/50 text-silk-wine dark:text-silk-rose-soft shadow-[0_6px_16px_-8px_rgba(139,58,79,0.4)]"
                        : "bg-silk-rose/5 border-silk-rose/15 text-light-textSecondary dark:text-dark-textSecondary hover:border-silk-rose/40 hover:bg-silk-rose/8"
                    )}
                  >
                    {f.label}
                  </button>
                );
              })}
            </div>

            <p className="text-[11px] text-light-textSecondary dark:text-dark-textSecondary leading-relaxed pt-1 border-t border-silk-rose/10">
              <strong className="text-silk-rose font-bold">
                {current.label}:
              </strong>{" "}
              {current.hint}
            </p>
          </WorkspacePanel>

          {/* Value input */}
          <WorkspacePanel className="p-4 space-y-3">
            <div className="flex items-center gap-2">
              <span className="w-7 h-7 rounded-lg bg-silk-rose/15 border border-silk-rose/25 flex items-center justify-center">
                <Hash className="w-3.5 h-3.5 text-silk-rose" />
              </span>
              <span className="text-[12px] sm:text-sm font-bold text-light-text dark:text-dark-text">
                {bn ? "মান" : "Value"}
              </span>
            </div>

            <input
              type="text"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              placeholder={current.example}
              spellCheck={false}
              className="w-full h-12 px-4 rounded-xl text-[14px] font-mono font-bold bg-white/80 dark:bg-dark-surface/80 border border-silk-rose/20 focus:border-silk-rose/50 text-light-text dark:text-dark-text outline-none transition-all tracking-wide"
            />

            <p className="text-[10px] text-light-textSecondary dark:text-dark-textSecondary font-mono">
              {bn ? "উদা:" : "e.g."} {current.example}
            </p>
          </WorkspacePanel>

          {/* Options */}
          <WorkspacePanel className="p-4 space-y-4">
            <div className="flex items-center gap-2">
              <span className="w-7 h-7 rounded-lg bg-silk-rose/15 border border-silk-rose/25 flex items-center justify-center">
                <Settings2 className="w-3.5 h-3.5 text-silk-rose" />
              </span>
              <span className="text-[12px] sm:text-sm font-bold text-light-text dark:text-dark-text">
                {bn ? "সেটিংস" : "Settings"}
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <SliderRow
                label={bn ? "বার প্রস্থ" : "Bar width"}
                value={opts.width}
                min={1}
                max={6}
                step={0.5}
                onChange={(v) => setOpts((p) => ({ ...p, width: v }))}
              />
              <SliderRow
                label={bn ? "উচ্চতা" : "Height"}
                value={opts.height}
                min={40}
                max={300}
                step={10}
                onChange={(v) => setOpts((p) => ({ ...p, height: v }))}
              />
              <SliderRow
                label={bn ? "ফন্ট সাইজ" : "Font size"}
                value={opts.fontSize}
                min={10}
                max={40}
                step={1}
                onChange={(v) => setOpts((p) => ({ ...p, fontSize: v }))}
              />
              <SliderRow
                label={bn ? "মার্জিন" : "Margin"}
                value={opts.margin}
                min={0}
                max={40}
                step={2}
                onChange={(v) => setOpts((p) => ({ ...p, margin: v }))}
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-3 border-t border-silk-rose/10">
              <button
                type="button"
                onClick={() =>
                  setOpts((p) => ({
                    ...p,
                    displayValue: !p.displayValue,
                  }))
                }
                className={cn(
                  "h-10 rounded-xl border text-[11px] font-bold transition-all",
                  opts.displayValue
                    ? "bg-silk-rose/15 border-silk-rose/50 text-silk-wine dark:text-silk-rose-soft"
                    : "bg-silk-rose/5 border-silk-rose/15 text-light-textSecondary dark:text-dark-textSecondary hover:border-silk-rose/40"
                )}
              >
                {opts.displayValue
                  ? bn
                    ? "✓ টেক্সট দেখাবে"
                    : "✓ Show text"
                  : bn
                    ? "টেক্সট নেই"
                    : "No text"}
              </button>

              <ColorField
                label={bn ? "লাইন" : "Line"}
                value={opts.lineColor}
                onChange={(v) => setOpts((p) => ({ ...p, lineColor: v }))}
              />

              <ColorField
                label={bn ? "ব্যাকগ্রাউন্ড" : "Background"}
                value={opts.background}
                onChange={(v) => setOpts((p) => ({ ...p, background: v }))}
              />
            </div>
          </WorkspacePanel>
        </div>

        {/* ── Right: Preview + Actions ── */}
        <div className="lg:sticky lg:top-4 space-y-3 lg:h-fit">
          <WorkspacePanel className="p-4 space-y-3" animate={false}>
            <div className="flex items-center justify-between">
              <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-silk-wine/70 dark:text-silk-rose/60">
                {bn ? "প্রিভিউ" : "Preview"}
              </span>
              <span className="text-[10px] font-mono font-bold text-silk-rose bg-silk-rose/10 px-2 py-0.5 rounded-md">
                {opts.format}
              </span>
            </div>

            <div className="rounded-xl bg-white border border-silk-rose/15 flex items-center justify-center p-4 min-h-[180px] overflow-hidden">
              {value.trim() && !error ? (
                <svg
                  ref={svgRef}
                  className="max-w-full h-auto"
                  role="img"
                  aria-label="barcode preview"
                />
              ) : (
                <div className="text-center text-light-textSecondary dark:text-dark-textSecondary p-4">
                  <Barcode className="w-12 h-12 text-silk-rose/40 mx-auto mb-3" />
                  <p className="text-[12px] font-medium">
                    {error
                      ? bn
                        ? "অবৈধ মান"
                        : "Invalid value"
                      : bn
                        ? "মান লিখুন"
                        : "Enter a value"}
                  </p>
                </div>
              )}
            </div>

            {/* Hidden SVG always mounted for rendering */}
            <div className="sr-only">
              <svg ref={svgRef} />
            </div>
          </WorkspacePanel>

          <AnimatePresence>
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                className="flex items-start gap-2.5 p-3.5 rounded-xl bg-red-500/10 border border-red-500/30 text-[12px] font-medium text-red-600 dark:text-red-400"
              >
                <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                <span>{error}</span>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="grid grid-cols-2 gap-2">
            <ToolButton
              variant="primary"
              size="md"
              loading={busy}
              disabled={!value.trim() || !!error}
              icon={<ImageIcon className="w-3.5 h-3.5" />}
              onClick={() => void handleDownloadPng()}
            >
              PNG
            </ToolButton>
            <ToolButton
              variant="secondary"
              size="md"
              disabled={!value.trim() || !!error}
              icon={<FileCode2 className="w-3.5 h-3.5" />}
              onClick={handleDownloadSvg}
            >
              SVG
            </ToolButton>
          </div>

          <button
            type="button"
            onClick={() => void handleCopy()}
            disabled={!value.trim() || !!error}
            className={cn(
              "w-full inline-flex items-center justify-center gap-2 h-10 rounded-xl text-[12px] font-bold transition-all",
              copied
                ? "bg-emerald-500/15 border border-emerald-500/40 text-emerald-600 dark:text-emerald-400"
                : "bg-white/70 dark:bg-dark-surface/70 backdrop-blur-xl border border-silk-rose/20 text-silk-rose hover:bg-silk-rose/10 hover:border-silk-rose/40",
              (!value.trim() || !!error) && "opacity-40 cursor-not-allowed"
            )}
          >
            {copied ? (
              <ClipboardCheck className="w-4 h-4" />
            ) : (
              <Copy className="w-4 h-4" />
            )}
            {copied
              ? bn
                ? "কপি হয়েছে!"
                : "Copied!"
              : bn
                ? "SVG কপি করুন"
                : "Copy SVG"}
          </button>
        </div>
      </div>
    </section>
  );
}

function SliderRow({
  label,
  value,
  min,
  max,
  step,
  onChange,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  onChange: (v: number) => void;
}) {
  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <label className="text-[11px] font-bold uppercase tracking-wider text-light-textSecondary dark:text-dark-textSecondary">
          {label}
        </label>
        <span className="text-[12px] font-mono font-bold text-silk-rose px-2 py-0.5 rounded-md bg-silk-rose/10">
          {value}
        </span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(parseFloat(e.target.value))}
        className="w-full accent-silk-rose cursor-pointer"
      />
    </div>
  );
}

function ColorField({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div>
      <label className="block text-[10px] font-bold uppercase tracking-wider text-light-textSecondary dark:text-dark-textSecondary mb-1.5">
        {label}
      </label>
      <div className="flex items-center gap-1.5">
        <input
          type="color"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-9 h-9 rounded-lg border border-silk-rose/20 cursor-pointer bg-transparent shrink-0"
        />
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="flex-1 min-w-0 h-9 px-2 rounded-lg text-[10px] font-mono bg-white/80 dark:bg-dark-surface/80 border border-silk-rose/20 focus:border-silk-rose/50 text-light-text dark:text-dark-text outline-none uppercase"
        />
      </div>
    </div>
  );
}
