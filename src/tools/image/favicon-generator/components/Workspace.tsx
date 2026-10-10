import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Download,
  X,
  Loader2,
  Image as ImageIcon,
  Sparkles,
  RotateCcw,
  Settings2,
  DownloadCloud,
  Star,
} from "lucide-react";
import { useLanguage } from "@contexts/LanguageContext";
import { cn } from "@lib/cn";
import {
  WorkspacePanel,
  DropZone,
  ToolButton,
  ResultStat,
} from "@components/workspace";
import {
  loadImageFile,
  generateAll,
  downloadFile,
  downloadManifest,
  revokeFiles,
  formatBytes,
  DEFAULT_OPTIONS,
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
        if (!cancelled) {
          setFiles(res.files);
          setManifest(res.manifest);
        }
      } catch (e) {
        if (!cancelled)
          setError(e instanceof Error ? e.message : "Generation failed");
      } finally {
        if (!cancelled) setBusy(false);
      }
    }, 150);
    return () => {
      cancelled = true;
      clearTimeout(t);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [image, opts]);

  const handleFile = async (file: File) => {
    setError(null);
    const loaded = await loadImageFile(file, setError);
    if (loaded) {
      setImage(loaded);
      
    }
  };

  const clearAll = () => {
    revokeFiles(files);
    setFiles([]);
    setManifest("");
    setImage(null);
    setError(null);
    setOpts(DEFAULT_OPTIONS);
    if (inputRef.current) inputRef.current.value = "";
  };

  const downloadAll = () => {
    files.forEach((f, i) =>
      setTimeout(() => downloadFile(f), i * 200)
    );
    
  };

  const totalSize = files.reduce((s, f) => s + f.size, 0);

  return (
    <section className="pb-12 space-y-4 sm:space-y-5">
      <input
        ref={inputRef}
        type="file"
        accept="image/jpeg,image/jpg,image/png,image/webp,image/svg+xml"
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
          accept="image/jpeg,image/jpg,image/png,image/webp,image/svg+xml"
          busy={busy}
          drag={drag}
          onDragChange={setDrag}
          title={bn ? "ছবি ড্রপ করুন" : "Drop your image"}
          subtitle={
            bn
              ? "JPG · PNG · WebP · SVG · ১০ MB পর্যন্ত"
              : "JPG · PNG · WebP · SVG · Up to 10 MB"
          }
          icon={<Star className="w-7 h-7 sm:w-9 sm:h-9 text-silk-rose" />}
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
          {/* ── Source image card ── */}
          <WorkspacePanel className="p-3.5 sm:p-4">
            <div className="flex items-center gap-3">
              <div className="w-14 h-14 rounded-xl overflow-hidden bg-white border border-silk-rose/15 flex items-center justify-center shrink-0">
                <img
                  src={image.dataUrl}
                  alt={image.name}
                  className="max-w-full max-h-full object-contain"
                />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[13px] sm:text-sm font-bold text-light-text dark:text-dark-text truncate">
                  {image.name}
                </p>
                <p className="text-[10px] sm:text-[11px] text-light-textSecondary dark:text-dark-textSecondary mt-0.5 font-mono">
                  {image.width}×{image.height} · {formatBytes(totalSize)} total
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
              label={bn ? "ফাইল" : "Files"}
              value={String(files.length)}
              accent="rose"
            />
            <ResultStat
              label={bn ? "মোট মাপ" : "Total size"}
              value={formatBytes(totalSize)}
              accent="rose"
            />
            <ResultStat
              label={bn ? "প্যাডিং" : "Padding"}
              value={`${opts.padding}%`}
              accent="rose"
            />
            <ResultStat
              label={bn ? "ব্যাকগ্রাউন্ড" : "Background"}
              value={opts.background}
              accent="emerald"
            />
          </div>

          {/* ── Controls ── */}
          <WorkspacePanel className="p-4 sm:p-5 space-y-4">
            <div className="flex items-center gap-2">
              <span className="w-7 h-7 rounded-lg bg-silk-rose/15 border border-silk-rose/25 flex items-center justify-center">
                <Settings2 className="w-3.5 h-3.5 text-silk-rose" />
              </span>
              <span className="text-[12px] sm:text-sm font-bold text-light-text dark:text-dark-text">
                {bn ? "সেটিংস" : "Settings"}
              </span>
            </div>

            {/* Padding + Radius */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-[11px] font-bold uppercase tracking-wider text-light-textSecondary dark:text-dark-textSecondary">
                    {bn ? "প্যাডিং" : "Padding"}
                  </label>
                  <span className="text-[12px] font-mono font-bold text-silk-rose px-2 py-0.5 rounded-md bg-silk-rose/10">
                    {opts.padding}%
                  </span>
                </div>
                <input
                  type="range"
                  min={0}
                  max={40}
                  step={1}
                  value={opts.padding}
                  onChange={(e) =>
                    setOpts((p) => ({
                      ...p,
                      padding: parseInt(e.target.value),
                    }))
                  }
                  className="w-full accent-silk-rose cursor-pointer"
                />
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-[11px] font-bold uppercase tracking-wider text-light-textSecondary dark:text-dark-textSecondary">
                    {bn ? "রেডিয়াস" : "Corner radius"}
                  </label>
                  <span className="text-[12px] font-mono font-bold text-silk-rose px-2 py-0.5 rounded-md bg-silk-rose/10">
                    {opts.rounded ? `${opts.radius}%` : "off"}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() =>
                      setOpts((p) => ({ ...p, rounded: !p.rounded }))
                    }
                    className={cn(
                      "h-9 px-3 rounded-xl border text-[11px] font-bold transition-all",
                      opts.rounded
                        ? "bg-silk-rose/15 border-silk-rose/50 text-silk-wine dark:text-silk-rose-soft"
                        : "bg-silk-rose/5 border-silk-rose/15 text-light-textSecondary dark:text-dark-textSecondary"
                    )}
                  >
                    {opts.rounded ? "ON" : "OFF"}
                  </button>
                  <input
                    type="range"
                    min={0}
                    max={50}
                    step={1}
                    disabled={!opts.rounded}
                    value={opts.radius}
                    onChange={(e) =>
                      setOpts((p) => ({
                        ...p,
                        radius: parseInt(e.target.value),
                      }))
                    }
                    className="flex-1 accent-silk-rose disabled:opacity-40 cursor-pointer"
                  />
                </div>
              </div>
            </div>

            {/* Background */}
            <div className="pt-3 border-t border-silk-rose/10">
              <p className="text-[10px] uppercase tracking-[0.2em] font-bold text-silk-wine/70 dark:text-silk-rose/60 mb-2.5">
                {bn ? "ব্যাকগ্রাউন্ড" : "Background"}
              </p>
              <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
                {(
                  ["auto", "transparent", "white", "black", "custom"] as const
                ).map((bg) => (
                  <button
                    key={bg}
                    type="button"
                    onClick={() =>
                      setOpts((p) => ({ ...p, background: bg }))
                    }
                    className={cn(
                      "h-10 rounded-xl border text-[11px] font-bold transition-all capitalize",
                      opts.background === bg
                        ? "bg-silk-rose/15 border-silk-rose/50 text-silk-wine dark:text-silk-rose-soft shadow-[0_6px_16px_-8px_rgba(139,58,79,0.35)]"
                        : "bg-silk-rose/5 border-silk-rose/15 text-light-textSecondary dark:text-dark-textSecondary hover:border-silk-rose/40"
                    )}
                  >
                    {bg}
                  </button>
                ))}
              </div>

              {opts.background === "custom" && (
                <div className="flex items-center gap-2 mt-3">
                  <input
                    type="color"
                    value={opts.customBackground}
                    onChange={(e) =>
                      setOpts((p) => ({
                        ...p,
                        customBackground: e.target.value,
                      }))
                    }
                    className="w-10 h-10 rounded-xl border border-silk-rose/20 cursor-pointer bg-transparent shrink-0"
                  />
                  <input
                    type="text"
                    value={opts.customBackground}
                    onChange={(e) =>
                      setOpts((p) => ({
                        ...p,
                        customBackground: e.target.value,
                      }))
                    }
                    className="flex-1 h-10 px-3 rounded-xl text-[11px] font-mono font-bold bg-white/80 dark:bg-dark-surface/80 border border-silk-rose/20 focus:border-silk-rose/50 text-light-text dark:text-dark-text outline-none uppercase"
                  />
                </div>
              )}
            </div>

            {/* Actions row */}
            <div className="flex items-center gap-2 flex-wrap pt-3 border-t border-silk-rose/10">
              <ToolButton
                size="sm"
                variant="secondary"
                icon={<RotateCcw className="w-3.5 h-3.5" />}
                onClick={() => setOpts(DEFAULT_OPTIONS)}
              >
                {bn ? "রিসেট" : "Reset"}
              </ToolButton>
              <ToolButton
                size="sm"
                variant="secondary"
                icon={<ImageIcon className="w-3.5 h-3.5" />}
                onClick={() => inputRef.current?.click()}
              >
                {bn ? "অন্য ছবি" : "Another image"}
              </ToolButton>
              <ToolButton
                size="sm"
                variant="primary"
                className="ml-auto"
                loading={busy}
                disabled={files.length === 0}
                icon={<DownloadCloud className="w-3.5 h-3.5" />}
                onClick={downloadAll}
              >
                {bn ? "সব ডাউনলোড" : "Download all"}
              </ToolButton>
            </div>
          </WorkspacePanel>

          {/* ── Preview grid ── */}
          <AnimatePresence>
            {files.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 16 }}
              >
                <WorkspacePanel className="p-4 sm:p-5" animate={false}>
                  <div className="flex items-center gap-2 mb-4">
                    <span className="w-6 h-6 rounded-md bg-silk-rose/15 border border-silk-rose/25 flex items-center justify-center">
                      <Sparkles className="w-3 h-3 text-silk-rose" />
                    </span>
                    <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-silk-wine/70 dark:text-silk-rose/60">
                      {bn ? "প্রিভিউ" : "Preview"}
                    </span>
                    {busy && (
                      <span className="ml-auto inline-flex items-center gap-1.5 text-[10px] font-bold text-silk-rose">
                        <Loader2 className="w-3 h-3 animate-spin" />
                        {bn ? "তৈরি হচ্ছে" : "generating"}
                      </span>
                    )}
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
                    {files.map((f, i) => (
                      <motion.div
                        key={f.filename}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{
                          duration: 0.35,
                          delay: Math.min(i * 0.04, 0.4),
                        }}
                        className="group flex flex-col items-center gap-2 p-2.5 rounded-xl bg-silk-rose/5 border border-silk-rose/15 hover:border-silk-rose/40 transition-colors"
                      >
                        <div className="w-16 h-16 rounded-lg bg-white dark:bg-[#1A1114] flex items-center justify-center overflow-hidden border border-silk-rose/10 group-hover:scale-105 transition-transform">
                          <img
                            src={f.url}
                            alt={f.filename}
                            className="max-w-full max-h-full"
                            style={{
                              imageRendering:
                                f.width <= 48 ? "pixelated" : "auto",
                            }}
                          />
                        </div>
                        <div className="text-center w-full">
                          <p className="text-[9px] font-mono font-bold text-light-text dark:text-dark-text truncate">
                            {f.filename}
                          </p>
                          <p className="text-[9px] text-lightTextSecondary dark:text-dark-textSecondary font-mono">
                            {formatBytes(f.size)}
                          </p>
                        </div>
                        <button
                          type="button"
                          onClick={() => downloadFile(f)}
                          className="text-[10px] font-bold text-silk-rose hover:underline"
                        >
                          {bn ? "ডাউনলোড" : "Download"}
                        </button>
                      </motion.div>
                    ))}
                  </div>

                  {/* Manifest download */}
                  <div className="mt-5 pt-4 border-t border-silk-rose/15 flex items-center justify-between gap-3 flex-wrap">
                    <div className="flex items-center gap-2 text-[11px] sm:text-[12px] text-light-textSecondary dark:text-dark-textSecondary">
                      <Sparkles className="w-3.5 h-3.5 text-silk-rose" />
                      <span className="font-mono">site.webmanifest</span>
                    </div>
                    <ToolButton
                      size="sm"
                      variant="secondary"
                      icon={<Download className="w-3 h-3" />}
                      onClick={() => downloadManifest(manifest)}
                    >
                      {bn ? "ডাউনলোড" : "Download"}
                    </ToolButton>
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
