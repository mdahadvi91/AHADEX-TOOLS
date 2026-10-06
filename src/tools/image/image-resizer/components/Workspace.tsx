import { useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Download,
  CheckCircle2,
  Lock,
  Unlock,
  Trash2,
  Plus,
  Settings2,
  Maximize2,
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
  resizeImage,
  downloadFile,
  downloadAll,
  formatBytes,
  revokeUrls,
} from "../logic";
import type { ResizedFile } from "../types";

const PRESETS = [
  { labelEn: "Instagram Post", labelBn: "ইনস্টাগ্রাম পোস্ট", w: 1080, h: 1080 },
  { labelEn: "Instagram Story", labelBn: "ইনস্টাগ্রাম স্টোরি", w: 1080, h: 1920 },
  { labelEn: "Facebook Cover", labelBn: "ফেসবুক কভার", w: 820, h: 312 },
  { labelEn: "Twitter Header", labelBn: "টুইটার হেডার", w: 1500, h: 500 },
  { labelEn: "YouTube Thumb", labelBn: "ইউটিউব থাম্ব", w: 1280, h: 720 },
  { labelEn: "HD", labelBn: "HD", w: 1920, h: 1080 },
];

export function Workspace() {
  const { language } = useLanguage();
  const { play } = useSound();
  const bn = language === "bn";

  const inputRef = useRef<HTMLInputElement>(null);
  const [items, setItems] = useState<ResizedFile[]>([]);
  const [busy, setBusy] = useState(false);
  const [drag, setDrag] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [width, setWidth] = useState(1080);
  const [height, setHeight] = useState(1080);
  const [lockAspect, setLockAspect] = useState(false);
  const [quality, setQuality] = useState(92);

  const handleFiles = async (files: FileList | null) => {
    if (!files || files.length === 0) return;
    setBusy(true);
    setError(null);
    const newItems: ResizedFile[] = [];
    for (let i = 0; i < files.length; i++) {
      const item = await resizeImage(
        files[i],
        { width, height, lockAspect, quality },
        setError
      );
      if (item) newItems.push(item);
    }
    setItems((prev) => [...prev, ...newItems]);
    setBusy(false);
    if (inputRef.current) inputRef.current.value = "";
    if (newItems.length > 0) play("success");
  };

  const remove = (id: string) => {
    setItems((prev) => {
      const f = prev.find((i) => i.id === id);
      if (f) revokeUrls(f);
      return prev.filter((i) => i.id !== id);
    });
  };

  const clearAll = () => {
    items.forEach(revokeUrls);
    setItems([]);
    setError(null);
    if (inputRef.current) inputRef.current.value = "";
  };

  const totalOriginal = items.reduce((s, i) => s + i.originalSize, 0);
  const totalResized = items.reduce((s, i) => s + i.resizedSize, 0);
  const totalSaved = totalOriginal - totalResized;

  return (
    <section className="pb-12 space-y-4 sm:space-y-5">
      <input
        ref={inputRef}
        type="file"
        accept="image/jpeg,image/jpg,image/png,image/webp"
        multiple
        onChange={(e) => void handleFiles(e.target.files)}
        className="hidden"
      />

      {/* ── Settings panel ── */}
      <WorkspacePanel className="p-4 sm:p-5 space-y-4">
        {/* Header */}
        <div className="flex items-center gap-2">
          <span className="w-7 h-7 rounded-lg bg-silk-rose/15 border border-silk-rose/25 flex items-center justify-center">
            <Settings2 className="w-3.5 h-3.5 text-silk-rose" />
          </span>
          <span className="text-[12px] sm:text-sm font-bold text-light-text dark:text-dark-text">
            {bn ? "ডাইমেনশন ও সেটিংস" : "Dimensions & settings"}
          </span>
        </div>

        {/* Dimension inputs */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <div>
            <label className="block text-[11px] font-bold uppercase tracking-wider text-light-textSecondary dark:text-dark-textSecondary mb-2">
              {bn ? "প্রস্থ (px)" : "Width (px)"}
            </label>
            <input
              type="number"
              min={1}
              max={10000}
              value={width}
              onChange={(e) =>
                setWidth(Math.max(1, parseInt(e.target.value) || 1))
              }
              className="w-full h-10 px-3 rounded-xl text-[13px] font-mono font-bold bg-white/80 dark:bg-dark-surface/80 border border-silk-rose/20 focus:border-silk-rose/50 text-light-text dark:text-dark-text outline-none transition-all"
            />
          </div>

          <div>
            <label className="block text-[11px] font-bold uppercase tracking-wider text-light-textSecondary dark:text-dark-textSecondary mb-2">
              {bn ? "উচ্চতা (px)" : "Height (px)"}
            </label>
            <input
              type="number"
              min={1}
              max={10000}
              value={height}
              onChange={(e) =>
                setHeight(Math.max(1, parseInt(e.target.value) || 1))
              }
              className="w-full h-10 px-3 rounded-xl text-[13px] font-mono font-bold bg-white/80 dark:bg-dark-surface/80 border border-silk-rose/20 focus:border-silk-rose/50 text-light-text dark:text-dark-text outline-none transition-all"
            />
          </div>

          <div>
            <label className="block text-[11px] font-bold uppercase tracking-wider text-light-textSecondary dark:text-dark-textSecondary mb-2">
              {bn ? "অ্যাসপেক্ট" : "Aspect"}
            </label>
            <button
              type="button"
              onClick={() => setLockAspect((v) => !v)}
              className={cn(
                "w-full h-10 rounded-xl border text-[12px] font-bold inline-flex items-center justify-center gap-1.5 transition-all",
                lockAspect
                  ? "bg-silk-rose/15 border-silk-rose/50 text-silk-wine dark:text-silk-rose-soft shadow-[0_6px_16px_-8px_rgba(139,58,79,0.35)]"
                  : "bg-silk-rose/5 border-silk-rose/15 text-light-textSecondary dark:text-dark-textSecondary hover:border-silk-rose/40"
              )}
            >
              {lockAspect ? (
                <Lock className="w-3.5 h-3.5" />
              ) : (
                <Unlock className="w-3.5 h-3.5" />
              )}
              {lockAspect ? (bn ? "লকড" : "Locked") : bn ? "ফ্রি" : "Free"}
            </button>
          </div>

          <div>
            <label className="block text-[11px] font-bold uppercase tracking-wider text-light-textSecondary dark:text-dark-textSecondary mb-2">
              {bn ? "কোয়ালিটি" : "Quality"}{" "}
              <span className="text-silk-rose font-mono">{quality}%</span>
            </label>
            <input
              type="range"
              min={40}
              max={100}
              step={2}
              value={quality}
              onChange={(e) => setQuality(parseInt(e.target.value))}
              className="w-full mt-3.5 accent-silk-rose cursor-pointer"
            />
          </div>
        </div>

        {/* Presets */}
        <div className="pt-3 border-t border-silk-rose/10">
          <p className="text-[10px] uppercase tracking-[0.2em] font-bold text-silk-wine/70 dark:text-silk-rose/60 mb-2.5">
            {bn ? "প্রিসেট" : "Presets"}
          </p>
          <div className="flex flex-wrap gap-1.5">
            {PRESETS.map((p) => {
              const active = width === p.w && height === p.h;
              return (
                <button
                  key={p.labelEn}
                  type="button"
                  onClick={() => {
                    setWidth(p.w);
                    setHeight(p.h);
                  }}
                  className={cn(
                    "px-3 py-1.5 rounded-full text-[10px] font-bold transition-all",
                    active
                      ? "bg-gradient-to-r from-silk-rose to-silk-wine-deep text-white shadow-[0_6px_16px_-8px_rgba(139,58,79,0.5)]"
                      : "bg-silk-rose/8 border border-silk-rose/25 text-silk-wine dark:text-silk-rose-soft hover:bg-silk-rose/15 hover:border-silk-rose/45"
                  )}
                >
                  {bn ? p.labelBn : p.labelEn} · {p.w}×{p.h}
                </button>
              );
            })}
          </div>
        </div>
      </WorkspacePanel>

      {/* ── Drop zone ── */}
      {items.length === 0 && (
        <DropZone
          onFiles={handleFiles}
          accept="image/jpeg,image/jpg,image/png,image/webp"
          multiple
          busy={busy}
          drag={drag}
          onDragChange={setDrag}
          title={
            busy
              ? bn
                ? "রিসাইজ হচ্ছে..."
                : "Resizing..."
              : bn
                ? "ছবি ড্রপ করুন"
                : "Drop your images"
          }
          subtitle={
            bn
              ? "JPG · PNG · WebP · ৫০ MB পর্যন্ত · একাধিক"
              : "JPG · PNG · WebP · Up to 50 MB · Multiple"
          }
          icon={<Maximize2 className="w-7 h-7 sm:w-9 sm:h-9 text-silk-rose" />}
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

      {/* ── Results ── */}
      {items.length > 0 && (
        <>
          {/* Stats */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-3">
            <ResultStat
              label={bn ? "ফাইল" : "Files"}
              value={String(items.length)}
              accent="rose"
            />
            <ResultStat
              label={bn ? "আগে" : "Before"}
              value={formatBytes(totalOriginal)}
              accent="rose"
            />
            <ResultStat
              label={bn ? "এখন" : "After"}
              value={formatBytes(totalResized)}
              accent="rose"
            />
            <ResultStat
              label={bn ? "সেভ" : "Saved"}
              value={
                totalSaved > 0
                  ? `−${Math.round((totalSaved / totalOriginal) * 100)}%`
                  : "0%"
              }
              accent="emerald"
            />
          </div>

          {/* Action bar */}
          <WorkspacePanel className="p-3.5 sm:p-4" animate={false}>
            <div className="flex items-center justify-between gap-3 flex-wrap">
              <div className="flex items-center gap-2 text-[12px] sm:text-[13px] text-light-text dark:text-dark-text">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                <span className="font-bold">
                  {items.length} {bn ? "টি ফাইল রেডি" : "files ready"}
                </span>
                <span className="text-[10px] sm:text-[11px] font-mono text-light-textSecondary dark:text-dark-textSecondary">
                  ({width}×{height})
                </span>
              </div>

              <div className="flex items-center gap-2 flex-wrap">
                <ToolButton
                  size="sm"
                  variant="secondary"
                  icon={<Plus className="w-3.5 h-3.5" />}
                  onClick={() => inputRef.current?.click()}
                >
                  {bn ? "আরও যোগ" : "Add more"}
                </ToolButton>

                <ToolButton
                  size="sm"
                  variant="primary"
                  icon={<Download className="w-3.5 h-3.5" />}
                  onClick={() => downloadAll(items)}
                >
                  {bn ? "সব ডাউনলোড" : "Download all"}
                </ToolButton>

                <button
                  type="button"
                  onClick={clearAll}
                  aria-label="Clear all"
                  className="w-8 h-8 rounded-xl flex items-center justify-center text-red-500 bg-red-500/10 border border-red-500/25 hover:bg-red-500/20 transition-all"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </WorkspacePanel>

          {/* File list */}
          <div className="space-y-2.5">
            <AnimatePresence>
              {items.map((item, i) => {
                const saved =
                  item.originalSize > item.resizedSize
                    ? Math.round(
                        ((item.originalSize - item.resizedSize) /
                          item.originalSize) *
                          100
                      )
                    : 0;
                return (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{
                      duration: 0.35,
                      delay: Math.min(i * 0.04, 0.3),
                    }}
                    className={cn(
                      "group flex items-center gap-3 p-3 sm:p-3.5 rounded-2xl",
                      "bg-white/70 dark:bg-dark-surface/70 backdrop-blur-xl",
                      "border border-silk-rose/20 hover:border-silk-rose/40",
                      "transition-colors duration-300"
                    )}
                  >
                    <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-xl overflow-hidden bg-silk-rose/5 border border-silk-rose/15 flex items-center justify-center shrink-0">
                      <img
                        src={item.resizedUrl}
                        alt={item.originalName}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    <div className="flex-1 min-w-0">
                      <p className="text-[12px] sm:text-sm font-bold text-light-text dark:text-dark-text truncate">
                        {item.originalName}
                      </p>
                      <p className="text-[10px] sm:text-[11px] text-light-textSecondary dark:text-dark-textSecondary mt-0.5 font-mono">
                        {item.originalWidth}×{item.originalHeight} →{" "}
                        <span className="text-silk-rose font-bold">
                          {item.newWidth}×{item.newHeight}
                        </span>
                      </p>
                      <div className="flex items-center gap-1.5 sm:gap-2 mt-1 text-[10px] sm:text-[11px]">
                        <span className="text-light-textSecondary dark:text-dark-textSecondary font-mono">
                          {formatBytes(item.originalSize)}
                        </span>
                        <span className="text-silk-rose">→</span>
                        <span className="text-silk-rose font-mono font-bold">
                          {formatBytes(item.resizedSize)}
                        </span>
                        {saved > 0 && (
                          <span className="px-1.5 py-0.5 rounded-md bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 font-bold text-[9px]">
                            −{saved}%
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center gap-1.5 shrink-0">
                      <button
                        type="button"
                        onClick={() => downloadFile(item)}
                        aria-label="Download"
                        className="w-9 h-9 rounded-xl flex items-center justify-center bg-silk-rose/10 border border-silk-rose/25 text-silk-rose hover:bg-silk-rose/20 hover:border-silk-rose/50 hover:-translate-y-0.5 transition-all"
                      >
                        <Download className="w-3.5 h-3.5" />
                      </button>
                      <button
                        type="button"
                        onClick={() => remove(item.id)}
                        aria-label="Remove"
                        className="w-9 h-9 rounded-xl flex items-center justify-center text-red-500 bg-red-500/5 border border-red-500/15 hover:bg-red-500/15 transition-all"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        </>
      )}
    </section>
  );
}
