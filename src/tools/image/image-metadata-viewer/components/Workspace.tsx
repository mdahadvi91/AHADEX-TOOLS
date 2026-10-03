import { useRef, useState } from "react";
import { Upload, X, Loader2, FileText, ExternalLink, Info } from "lucide-react";
import { useLanguage } from "@contexts/LanguageContext";
import { cn } from "@lib/cn";
import { readMetadata, revokeResult, formatBytes } from "../logic";
import type { MetadataResult } from "../types";

export function Workspace() {
  const { language } = useLanguage();
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
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to read file");
    } finally {
      setBusy(false);
      if (inputRef.current) inputRef.current.value = "";
    }
  };

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDrag(false);
    const file = e.dataTransfer.files?.[0];
    void handleFile(file);
  };

  const clearAll = () => {
    if (result) revokeResult(result);
    setResult(null);
    setError(null);
  };

  return (
    <section className="pb-12 space-y-4">
      <input
        ref={inputRef}
        type="file"
        accept="image/jpeg,image/jpg,image/png,image/webp,image/heic,image/heif,image/tiff"
        onChange={(e) => void handleFile(e.target.files?.[0])}
        className="hidden"
      />

      {!result && (
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
            drag ? "border-silk-rose/70 bg-silk-rose/10 scale-[1.01]" : "border-silk-rose/25 hover:border-silk-rose/50"
          )}
        >
          <div className={cn("w-16 h-16 sm:w-20 sm:h-20 rounded-2xl flex items-center justify-center transition-all", "bg-gradient-to-br from-silk-rose/20 to-silk-gold/10 border border-silk-rose/25", drag && "scale-110")}>
            {busy ? <Loader2 className="w-7 h-7 sm:w-9 sm:h-9 text-silk-rose animate-spin" /> : <Upload className="w-7 h-7 sm:w-9 sm:h-9 text-silk-rose" />}
          </div>
          <div className="text-center px-3">
            <p className="font-display font-bold text-[15px] sm:text-lg text-light-text dark:text-dark-text mb-1.5">
              {busy ? (bn ? "পড়া হচ্ছে..." : "Reading...") : (bn ? "ছবি ড্রপ করুন" : "Drop an image")}
            </p>
            <p className="text-[12px] sm:text-sm text-lightTextSecondary dark:text-dark-textSecondary leading-relaxed">
              {bn ? "JPG · PNG · WebP · HEIC · TIFF · ৫০ MB পর্যন্ত" : "JPG · PNG · WebP · HEIC · TIFF · Up to 50 MB"}
            </p>
          </div>
        </div>
      )}

      {error && <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-[12px] text-red-600 dark:text-red-400">{error}</div>}

      {result && (
        <>
          <div className="flex items-center justify-between gap-3 flex-wrap p-3 rounded-2xl bg-white/70 dark:bg-dark-surface/70 backdrop-blur-xl border border-silk-rose/20">
            <div className="flex items-center gap-2 text-[12px] sm:text-sm text-light-text dark:text-dark-text">
              <FileText className="w-4 h-4 text-silk-rose" />
              <span className="font-semibold truncate max-w-[220px] sm:max-w-none">{result.fileInfo.name}</span>
            </div>
            <div className="flex items-center gap-2">
              <button type="button" onClick={() => inputRef.current?.click()} className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-silk-rose/10 border border-silk-rose/25 text-[11px] sm:text-xs font-medium text-silk-rose hover:bg-silk-rose/20 transition-all">
                <Upload className="w-3.5 h-3.5" />
                {bn ? "অন্য ছবি" : "Another"}
              </button>
              <button type="button" onClick={clearAll} className="w-7 h-7 rounded-lg flex items-center justify-center text-red-500 hover:bg-red-500/10 transition-colors" aria-label="Clear">
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-4 items-start">
            <div className="rounded-2xl bg-white/70 dark:bg-dark-surface/70 backdrop-blur-xl border border-silk-rose/20 p-3 lg:sticky lg:top-4">
              <div className="rounded-xl overflow-hidden bg-silk-rose/5 border border-silk-rose/15 flex items-center justify-center">
                <img src={result.fileInfo.previewUrl} alt={result.fileInfo.name} className="max-w-full max-h-[320px] object-contain" />
              </div>
              <p className="mt-2 text-[11px] text-lightTextSecondary dark:text-dark-textSecondary text-center">
                {result.fileInfo.width} × {result.fileInfo.height} px · {formatBytes(result.fileInfo.size)}
              </p>
            </div>

            <div className="space-y-3">
              {!result.hasExif && (
                <div className="flex items-start gap-2 p-3 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-[12px] text-amber-700 dark:text-amber-400">
                  <Info className="w-4 h-4 shrink-0 mt-0.5" />
                  <span>{bn ? "এই ছবিতে কোনো EXIF বা GPS ডেটা নেই। শুধু বেসিক ফাইল তথ্য দেখানো হচ্ছে।" : "No EXIF or GPS data found in this image. Only basic file info is shown."}</span>
                </div>
              )}
              {result.groups.map((g) => (
                <div key={g.title} className="rounded-2xl bg-white/70 dark:bg-dark-surface/70 backdrop-blur-xl border border-silk-rose/20 p-4">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-lg">{g.icon}</span>
                    <h3 className="font-display font-bold text-[13px] sm:text-sm uppercase tracking-wider text-silk-wine dark:text-silk-rose">
                      {g.title}
                    </h3>
                  </div>
                  <div className="space-y-1.5">
                    {g.items.map((item) => (
                      <div key={item.label} className="flex items-start gap-3 text-[12px] sm:text-[13px]">
                        <span className="w-[110px] sm:w-[140px] shrink-0 text-lightTextSecondary dark:text-dark-textSecondary">{item.label}</span>
                        {item.href ? (
                          <a href={item.href} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-silk-rose hover:underline break-all">
                            {item.value}
                            <ExternalLink className="w-3 h-3 shrink-0" />
                          </a>
                        ) : (
                          <span className="text-light-text dark:text-dark-text break-all">{item.value}</span>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      )}

      {!result && !busy && (
        <div className="flex items-center justify-center gap-2 text-[11px] sm:text-xs text-lightTextSecondary dark:text-dark-textSecondary">
          <FileText className="w-3.5 h-3.5 text-silk-rose" />
          {bn ? "সব ফাইল আপনার ব্রাউজারেই প্রসেস হয়" : "All files are processed in your browser"}
        </div>
      )}
    </section>
  );
}
