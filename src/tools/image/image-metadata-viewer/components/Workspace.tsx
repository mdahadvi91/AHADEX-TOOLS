import { useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  FileText,
  ExternalLink,
  Info,
  Upload,
  Eye,
} from "lucide-react";
import { useLanguage } from "@contexts/LanguageContext";
import { useSound } from "@contexts/SoundContext";
import { cn } from "@lib/cn";
import { WorkspacePanel, DropZone, ToolButton, ResultStat } from "@components/workspace";
import { readMetadata, revokeResult, formatBytes } from "../logic";
import type { MetadataResult } from "../types";

export function Workspace() {
  const { language } = useLanguage();
  const { play } = useSound();
  const bn = language === "bn";

  const inputRef = useRef<HTMLInputElement>(null);
  const [busy, setBusy] = useState(false);
  const [drag, setDrag] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<MetadataResult | null>(null);

  const handleFile = async (file: File | null | undefined) => {
    if (!file) return;
    setBusy(true);
    setError(null);
    try {
      if (result) revokeResult(result);
      const res = await readMetadata(file);
      setResult(res);
      play("success");
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to read file");
    } finally {
      setBusy(false);
      if (inputRef.current) inputRef.current.value = "";
    }
  };

  const clearAll = () => {
    if (result) revokeResult(result);
    setResult(null);
    setError(null);
  };

  const totalItems = result
    ? result.groups.reduce((s, g) => s + g.items.length, 0)
    : 0;

  return (
    <section className="pb-12 space-y-4 sm:space-y-5">
      <input
        ref={inputRef}
        type="file"
        accept="image/jpeg,image/jpg,image/png,image/webp,image/heic,image/heif,image/tiff"
        onChange={(e) => void handleFile(e.target.files?.[0])}
        className="hidden"
      />

      {/* ── Empty state ── */}
      {!result && (
        <DropZone
          onFiles={(list) => void handleFile(list?.[0])}
          accept="image/jpeg,image/jpg,image/png,image/webp,image/heic,image/heif,image/tiff"
          busy={busy}
          drag={drag}
          onDragChange={setDrag}
          title={
            busy
              ? bn
                ? "পড়া হচ্ছে..."
                : "Reading..."
              : bn
                ? "ছবি ড্রপ করুন"
                : "Drop an image"
          }
          subtitle={
            bn
              ? "JPG · PNG · WebP · HEIC · TIFF · ৫০ MB পর্যন্ত"
              : "JPG · PNG · WebP · HEIC · TIFF · Up to 50 MB"
          }
          icon={<Eye className="w-7 h-7 sm:w-9 sm:h-9 text-silk-rose" />}
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

      {result && (
        <>
          {/* ── Stats ── */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-3">
            <ResultStat
              label={bn ? "প্রস্থ" : "Width"}
              value={`${result.fileInfo.width}px`}
              accent="rose"
            />
            <ResultStat
              label={bn ? "উচ্চতা" : "Height"}
              value={`${result.fileInfo.height}px`}
              accent="rose"
            />
            <ResultStat
              label={bn ? "সাইজ" : "Size"}
              value={formatBytes(result.fileInfo.size)}
              accent="rose"
            />
            <ResultStat
              label={bn ? "ডেটা পয়েন্ট" : "Data points"}
              value={String(totalItems)}
              accent={result.hasExif ? "emerald" : "rose"}
            />
          </div>

          {/* ── File info card ── */}
          <WorkspacePanel className="p-3.5 sm:p-4">
            <div className="flex items-center gap-3">
              <div className="w-14 h-14 rounded-xl overflow-hidden bg-silk-rose/5 border border-silk-rose/15 flex items-center justify-center shrink-0">
                <img
                  src={result.fileInfo.previewUrl}
                  alt={result.fileInfo.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[13px] sm:text-sm font-bold text-light-text dark:text-dark-text truncate">
                  {result.fileInfo.name}
                </p>
                <p className="text-[10px] sm:text-[11px] text-light-textSecondary dark:text-dark-textSecondary mt-0.5 font-mono">
                  {result.fileInfo.type || "unknown"} · {result.fileInfo.width}×{result.fileInfo.height}
                </p>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <ToolButton
                  size="sm"
                  variant="secondary"
                  icon={<Upload className="w-3.5 h-3.5" />}
                  onClick={() => inputRef.current?.click()}
                >
                  <span className="hidden sm:inline">
                    {bn ? "নতুন ছবি" : "New image"}
                  </span>
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

          {/* ── Privacy banner ── */}
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            className={cn(
              "flex items-start gap-2.5 p-3.5 rounded-xl text-[12px] font-medium border",
              result.hasExif
                ? "bg-amber-500/10 border-amber-500/30 text-amber-700 dark:text-amber-400"
                : "bg-emerald-500/10 border-emerald-500/30 text-emerald-700 dark:text-emerald-400"
            )}
          >
            <Info className="w-4 h-4 shrink-0 mt-0.5" />
            <span>
              {result.hasExif
                ? bn
                  ? "⚠️ এই ছবিতে EXIF/GPS ডেটা আছে — শেয়ার করার আগে চেক করুন কী প্রকাশ হচ্ছে।"
                  : "⚠️ This image contains EXIF/GPS data — review what it reveals before sharing."
                : bn
                  ? "এই ছবিতে কোনো EXIF বা GPS ডেটা নেই। শুধু বেসিক ফাইল তথ্য দেখানো হচ্ছে।"
                  : "No EXIF or GPS data found in this image. Only basic file info is shown."}
            </span>
          </motion.div>

          {/* ── Metadata groups ── */}
          <div className="space-y-3">
            <AnimatePresence>
              {result.groups.map((g, gi) => (
                <motion.div
                  key={g.title}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.4,
                    delay: Math.min(gi * 0.06, 0.4),
                  }}
                >
                  <WorkspacePanel className="p-4" animate={false}>
                    <div className="flex items-center gap-2.5 mb-4">
                      <span className="w-8 h-8 rounded-lg bg-silk-rose/15 border border-silk-rose/25 flex items-center justify-center text-base shrink-0">
                        {g.icon}
                      </span>
                      <h3 className="font-serif font-black text-[13px] sm:text-sm uppercase tracking-[0.15em] text-silk-wine dark:text-silk-rose">
                        {g.title}
                      </h3>
                      <span className="ml-auto text-[10px] font-mono font-bold text-silk-rose bg-silk-rose/10 px-2 py-0.5 rounded-md">
                        {g.items.length}
                      </span>
                    </div>

                    <div className="space-y-2">
                      {g.items.map((item, ii) => (
                        <motion.div
                          key={item.label}
                          initial={{ opacity: 0, x: 8 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{
                            duration: 0.25,
                            delay: Math.min(gi * 0.06 + ii * 0.02, 0.6),
                          }}
                          className="flex items-start gap-3 text-[12px] sm:text-[13px] py-1 border-b border-silk-rose/8 last:border-0"
                        >
                          <span className="w-[110px] sm:w-[140px] shrink-0 font-bold text-light-textSecondary dark:text-dark-textSecondary">
                            {item.label}
                          </span>
                          {item.href ? (
                            <a
                              href={item.href}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center gap-1 text-silk-rose hover:text-silk-wine dark:hover:text-silk-rose-soft hover:underline break-all font-medium"
                            >
                              {item.value}
                              <ExternalLink className="w-3 h-3 shrink-0" />
                            </a>
                          ) : (
                            <span className="text-light-text dark:text-dark-text break-all font-mono">
                              {item.value}
                            </span>
                          )}
                        </motion.div>
                      ))}
                    </div>
                  </WorkspacePanel>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* ── Empty EXIF notice ── */}
          {result.groups.length === 0 && (
            <div className="flex flex-col items-center gap-2 py-10 text-light-textSecondary dark:text-dark-textSecondary">
              <FileText className="w-10 h-10 text-silk-rose/40" />
              <p className="text-[13px]">
                {bn ? "কোনো মেটাডেটা পাওয়া যায়নি" : "No metadata found"}
              </p>
            </div>
          )}
        </>
      )}
    </section>
  );
}
