import { useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Download,
  CheckCircle2,
  Settings2,
  Image as ImageIcon,
  Plus,
  Trash2,
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
  compressImage,
  downloadFile,
  downloadAll,
  formatBytes,
  revokeUrls,
} from "../logic";
import type { CompressedFile } from "../types";

export function Workspace() {
  const { language } = useLanguage();
  const { play } = useSound();
  const bn = language === "bn";

  const inputRef = useRef<HTMLInputElement>(null);
  const [items, setItems] = useState<CompressedFile[]>([]);
  const [busy, setBusy] = useState(false);
  const [drag, setDrag] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [quality, setQuality] = useState(80);
  const [maxWidth, setMaxWidth] = useState(1920);

  const handleFiles = async (files: FileList | null) => {
    if (!files || files.length === 0) return;
    setBusy(true);
    setError(null);
    const newItems: CompressedFile[] = [];
    for (let i = 0; i < files.length; i++) {
      const item = await compressImage(
        files[i],
        quality / 100,
        maxWidth,
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

  const totalSaved = items.reduce(
    (s, i) => s + (i.originalSize - i.compressedSize),
    0
  );
  const totalOriginal = items.reduce((s, i) => s + i.originalSize, 0);
  const totalCompressed = items.reduce((s, i) => s + i.compressedSize, 0);

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
      <WorkspacePanel className="p-4 sm:p-5">
        <div className="flex items-center gap-2 mb-4">
          <span className="w-7 h-7 rounded-lg bg-silk-rose/15 border border-silk-rose/25 flex items-center justify-center">
            <Settings2 className="w-3.5 h-3.5 text-silk-rose" />
          </span>
          <span className="text-[12px] sm:text-sm font-bold text-light-text dark:text-dark-text">
            {bn ? "সেটিংস" : "Settings"}
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {/* Quality slider */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-[11px] font-bold uppercase tracking-wider text-light-textSecondary dark:text-dark-textSecondary">
                {bn ? "কোয়ালিটি" : "Quality"}
              </label>
              <span className="text-[12px] font-mono font-bold text-silk-rose px-2 py-0.5 rounded-md bg-silk-rose/10">
                {quality}%
              </span>
            </div>
            <input
              type="range"
              min={10}
              max={100}
              step={5}
              value={quality}
              onChange={(e) => setQuality(parseInt(e.target.value))}
              className="w-full accent-silk-rose cursor-pointer"
            />
          </div>

          {/* Max width slider */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-[11px] font-bold uppercase tracking-wider text-light-textSecondary dark:text-dark-textSecondary">
                {bn ? "সর্বোচ্চ প্রস্থ" : "Max width"}
              </label>
              <span className="text-[12px] font-mono font-bold text-silk-rose px-2 py-0.5 rounded-md bg-silk-rose/10">
                {maxWidth}px
              </span>
            </div>
            <input
              type="range"
              min={640}
              max={4000}
              step={160}
              value={maxWidth}
              onChange={(e) => setMaxWidth(parseInt(e.target.value))}
              className="w-full accent-silk-rose cursor-pointer"
            />
          </div>
        </div>
      </WorkspacePanel>

      {/* ── Drop zone (empty state) ── */}
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
                ? "কমপ্রেস হচ্ছে..."
                : "Compressing..."
              : bn
                ? "ছবি ড্রপ করুন"
                : "Drop your images"
          }
          subtitle={
            bn
              ? "JPG · PNG · WebP · ৫০ MB পর্যন্ত · একাধিক ফাইল"
              : "JPG · PNG · WebP · Up to 50 MB · Multiple files"
          }
          icon={<ImageIcon className="w-7 h-7 sm:w-9 sm:h-9 text-silk-rose" />}
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
          {/* Summary stats */}
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
              value={formatBytes(totalCompressed)}
              accent="rose"
            />
            <ResultStat
              label={bn ? "সেভ" : "Saved"}
              value={`−${Math.round((totalSaved / totalOriginal) * 100) || 0}%`}
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
                const savedPct =
                  item.originalSize > item.compressedSize
                    ? Math.round(
                        ((item.originalSize - item.compressedSize) /
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
                    {/* Preview */}
                    <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-xl overflow-hidden bg-silk-rose/5 border border-silk-rose/15 flex items-center justify-center shrink-0">
                      <img
                        src={item.compressedUrl}
                        alt={item.originalName}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {/* Info */}
                    <div className="flex-1 min-w-0">
                      <p className="text-[12px] sm:text-sm font-bold text-light-text dark:text-dark-text truncate">
                        {item.originalName}
                      </p>
                      <div className="flex items-center gap-1.5 sm:gap-2 mt-1 text-[10px] sm:text-[11px]">
                        <span className="text-light-textSecondary dark:text-dark-textSecondary font-mono">
                          {formatBytes(item.originalSize)}
                        </span>
                        <span className="text-silk-rose">→</span>
                        <span className="text-silk-rose font-mono font-bold">
                          {formatBytes(item.compressedSize)}
                        </span>
                        {savedPct > 0 && (
                          <span className="px-1.5 py-0.5 rounded-md bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 font-bold text-[9px]">
                            −{savedPct}%
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Actions */}
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
                        <X className="w-3.5 h-3.5" />
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
