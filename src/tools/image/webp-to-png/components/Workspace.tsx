import { useRef, useState } from "react";
import { Download, CheckCircle2, Trash2, Plus, FileImage } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@contexts/LanguageContext";
import { cn } from "@lib/cn";
import {
  WorkspacePanel,
  DropZone,
  ToolButton,
  ResultStat,
} from "@components/workspace";
import {
  convertWebpToPng,
  downloadFile,
  downloadAll,
  formatBytes,
  revokeUrls,
} from "../logic";
import type { ConvertedFile } from "../types";

export function Workspace() {
  const { language } = useLanguage();
  const bn = language === "bn";

  const inputRef = useRef<HTMLInputElement>(null);
  const [items, setItems] = useState<ConvertedFile[]>([]);
  const [busy, setBusy] = useState(false);
  const [drag, setDrag] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFiles = async (files: FileList | null) => {
    if (!files || files.length === 0) return;
    setBusy(true);
    setError(null);
    const newItems: ConvertedFile[] = [];
    for (let i = 0; i < files.length; i++) {
      const item = await convertWebpToPng(files[i], setError);
      if (item) newItems.push(item);
    }
    setItems((prev) => [...prev, ...newItems]);
    setBusy(false);
    if (inputRef.current) inputRef.current.value = "";
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
  const totalConverted = items.reduce((s, i) => s + i.convertedSize, 0);

  return (
    <section className="pb-12 space-y-4 sm:space-y-5">
      <input
        ref={inputRef}
        type="file"
        accept="image/webp"
        multiple
        onChange={(e) => void handleFiles(e.target.files)}
        className="hidden"
      />

      {items.length === 0 && (
        <DropZone
          onFiles={handleFiles}
          accept="image/webp"
          multiple
          busy={busy}
          drag={drag}
          onDragChange={setDrag}
          title={
            busy
              ? bn
                ? "কনভার্ট হচ্ছে..."
                : "Converting..."
              : bn
                ? "WebP ফাইল ড্রপ করুন"
                : "Drop your WebP files"
          }
          subtitle={
            bn
              ? "ক্লিক করুন বা টেনে আনুন · একাধিক ফাইল · ৫০ MB পর্যন্ত"
              : "Click or drag · Multiple files · Up to 50 MB"
          }
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

      {items.length > 0 && (
        <>
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
              value={formatBytes(totalConverted)}
              accent="rose"
            />
            <ResultStat
              label={bn ? "রেডি" : "Ready"}
              value={`${items.length} ✓`}
              accent="emerald"
            />
          </div>

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

          <div className="space-y-2.5">
            <AnimatePresence>
              {items.map((item, i) => (
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
                      src={item.convertedUrl}
                      alt={item.originalName}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="flex-1 min-w-0">
                    <p className="text-[12px] sm:text-sm font-bold text-light-text dark:text-dark-text truncate">
                      {item.originalName.replace(/\.[webp]$/i, "")}.png
                    </p>
                    <p className="text-[10px] sm:text-[11px] text-light-textSecondary dark:text-dark-textSecondary mt-0.5 font-mono">
                      {item.width} × {item.height} px
                    </p>
                    <div className="flex items-center gap-1.5 sm:gap-2 mt-1 text-[10px] sm:text-[11px]">
                      <span className="text-light-textSecondary dark:text-dark-textSecondary font-mono">
                        {formatBytes(item.originalSize)}
                      </span>
                      <span className="text-silk-rose">→</span>
                      <span className="text-silk-rose font-mono font-bold">
                        {formatBytes(item.convertedSize)}
                      </span>
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
              ))}
            </AnimatePresence>
          </div>
        </>
      )}
    </section>
  );
}
