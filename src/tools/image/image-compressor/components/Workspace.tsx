import { useRef, useState } from "react";
import { Upload, X, Download, Loader2, CheckCircle2, FileImage, Settings } from "lucide-react";
import { useLanguage } from "@contexts/LanguageContext";
import { cn } from "@lib/cn";
import { compressImage, downloadFile, downloadAll, formatBytes, revokeUrls } from "../logic";
import type { CompressedFile } from "../types";

export function Workspace() {
  const { language } = useLanguage();
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
      const item = await compressImage(files[i], quality / 100, maxWidth, setError);
      if (item) newItems.push(item);
    }
    setItems((prev) => [...prev, ...newItems]);
    setBusy(false);
    if (inputRef.current) inputRef.current.value = "";
  };

  const onDrop = (e: React.DragEvent) => { e.preventDefault(); setDrag(false); void handleFiles(e.dataTransfer.files); };
  const remove = (id: string) => { setItems((prev) => { const f = prev.find((i) => i.id === id); if (f) revokeUrls(f); return prev.filter((i) => i.id !== id); }); };
  const clearAll = () => { items.forEach(revokeUrls); setItems([]); setError(null); if (inputRef.current) inputRef.current.value = ""; };
  const totalSaved = items.reduce((s, i) => s + (i.originalSize - i.compressedSize), 0);

  return (
    <section className="pb-12 space-y-4">
      <input ref={inputRef} type="file" accept="image/jpeg,image/jpg,image/png,image/webp" multiple onChange={(e) => void handleFiles(e.target.files)} className="hidden" />

      <div className="rounded-2xl bg-white/70 dark:bg-dark-surface/70 backdrop-blur-xl border border-silk-rose/20 p-4 space-y-3">
        <div className="flex items-center gap-2 text-[12px] font-semibold text-light-text dark:text-dark-text">
          <Settings className="w-4 h-4 text-silk-rose" />
          {bn ? "সেটিংস" : "Settings"}
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-[11px] font-medium text-light-text dark:text-dark-text">{bn ? "কোয়ালিটি" : "Quality"}</label>
              <span className="text-[11px] font-mono text-silk-rose font-semibold">{quality}%</span>
            </div>
            <input type="range" min={10} max={100} step={5} value={quality} onChange={(e) => setQuality(parseInt(e.target.value))} className="w-full accent-silk-rose" />
          </div>
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-[11px] font-medium text-light-text dark:text-dark-text">{bn ? "সর্বোচ্চ প্রস্থ" : "Max width"}</label>
              <span className="text-[11px] font-mono text-silk-rose font-semibold">{maxWidth}px</span>
            </div>
            <input type="range" min={640} max={4000} step={160} value={maxWidth} onChange={(e) => setMaxWidth(parseInt(e.target.value))} className="w-full accent-silk-rose" />
          </div>
        </div>
      </div>

      {items.length === 0 && (
        <div onDragOver={(e) => { e.preventDefault(); setDrag(true); }} onDragLeave={() => setDrag(false)} onDrop={onDrop} onClick={() => inputRef.current?.click()} role="button" tabIndex={0} onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") inputRef.current?.click(); }} className={cn("flex flex-col items-center justify-center gap-4 p-8 sm:p-16 rounded-3xl cursor-pointer", "bg-white/70 dark:bg-dark-surface/70 backdrop-blur-xl", "border-2 border-dashed transition-all duration-300", drag ? "border-silk-rose/70 bg-silk-rose/10 scale-[1.01]" : "border-silk-rose/25 hover:border-silk-rose/50")}>
          <div className={cn("w-16 h-16 sm:w-20 sm:h-20 rounded-2xl flex items-center justify-center transition-all", "bg-gradient-to-br from-silk-rose/20 to-silk-gold/10 border border-silk-rose/25", drag && "scale-110")}>
            {busy ? <Loader2 className="w-7 h-7 sm:w-9 sm:h-9 text-silk-rose animate-spin" /> : <Upload className="w-7 h-7 sm:w-9 sm:h-9 text-silk-rose" />}
          </div>
          <div className="text-center px-3">
            <p className="font-display font-bold text-[15px] sm:text-lg text-light-text dark:text-dark-text mb-1.5">{busy ? (bn ? "কমপ্রেস হচ্ছে..." : "Compressing...") : (bn ? "ছবি ড্রপ করুন" : "Drop your images")}</p>
            <p className="text-[12px] sm:text-sm text-light-textSecondary dark:text-dark-textSecondary leading-relaxed">{bn ? "JPG · PNG · WebP · ৫০ MB পর্যন্ত" : "JPG · PNG · WebP · Up to 50 MB"}</p>
          </div>
        </div>
      )}

      {error && <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-[12px] text-red-600 dark:text-red-400">{error}</div>}

      {items.length > 0 && (
        <>
          <div className="flex items-center justify-between gap-3 flex-wrap p-3 rounded-2xl bg-white/70 dark:bg-dark-surface/70 backdrop-blur-xl border border-silk-rose/20">
            <div className="flex items-center gap-2 text-[12px] sm:text-sm text-light-text dark:text-dark-text">
              <CheckCircle2 className="w-4 h-4 text-emerald-500" />
              <span className="font-semibold">{items.length} {bn ? "ফাইল" : "file(s)"}</span>
              {totalSaved > 0 && <span className="text-emerald-600 dark:text-emerald-400 font-semibold">· {bn ? "সেভ" : "saved"} {formatBytes(totalSaved)}</span>}
            </div>
            <div className="flex items-center gap-2">
              <button type="button" onClick={() => inputRef.current?.click()} className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-silk-rose/10 border border-silk-rose/25 text-[11px] sm:text-xs font-medium text-silk-rose hover:bg-silk-rose/20 transition-all"><Upload className="w-3.5 h-3.5" />{bn ? "আরও" : "Add more"}</button>
              <button type="button" onClick={() => downloadAll(items)} className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gradient-to-r from-silk-rose to-silk-wine-deep text-white text-[11px] sm:text-xs font-semibold shadow-silk-soft hover:shadow-silk-deep transition-all"><Download className="w-3.5 h-3.5" />{bn ? "সব ডাউনলোড" : "Download all"}</button>
              <button type="button" onClick={clearAll} className="w-7 h-7 rounded-lg flex items-center justify-center text-red-500 hover:bg-red-500/10 transition-colors" aria-label="Clear all"><X className="w-3.5 h-3.5" /></button>
            </div>
          </div>
          <div className="space-y-2.5">
            {items.map((item) => {
              const savedPct = item.originalSize > item.compressedSize ? Math.round(((item.originalSize - item.compressedSize) / item.originalSize) * 100) : 0;
              return (
                <div key={item.id} className="flex items-center gap-3 p-3 rounded-2xl bg-white/70 dark:bg-dark-surface/70 backdrop-blur-xl border border-silk-rose/20">
                  <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-xl overflow-hidden bg-silk-rose/5 border border-silk-rose/15 flex items-center justify-center shrink-0"><img src={item.compressedUrl} alt={item.originalName} className="w-full h-full object-cover" /></div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[12px] sm:text-sm font-semibold text-light-text dark:text-dark-text truncate">{item.originalName}</p>
                    <p className="text-[10px] sm:text-[11px] text-light-textSecondary dark:text-dark-textSecondary mt-0.5">{item.width} × {item.height} px</p>
                    <div className="flex items-center gap-2 mt-1 text-[10px] sm:text-[11px]">
                      <span className="text-light-textSecondary dark:text-dark-textSecondary">{formatBytes(item.originalSize)}</span>
                      <span className="text-silk-rose">→</span>
                      <span className="text-silk-rose font-semibold">{formatBytes(item.compressedSize)}</span>
                      {savedPct > 0 && <span className="text-[9px] px-1.5 py-0.5 rounded bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 font-semibold">-{savedPct}%</span>}
                    </div>
                  </div>
                  <button type="button" onClick={() => downloadFile(item)} className="inline-flex items-center justify-center gap-1.5 h-9 px-3 sm:px-4 rounded-xl bg-gradient-to-r from-silk-rose to-silk-wine-deep text-white text-[11px] sm:text-xs font-semibold shadow-silk-soft hover:shadow-silk-deep transition-all shrink-0"><Download className="w-3.5 h-3.5" /><span className="hidden sm:inline">{bn ? "ডাউনলোড" : "Download"}</span></button>
                  <button type="button" onClick={() => remove(item.id)} className="w-7 h-7 rounded-lg flex items-center justify-center text-red-500 hover:bg-red-500/10 transition-colors shrink-0" aria-label="Remove"><X className="w-3.5 h-3.5" /></button>
                </div>
              );
            })}
          </div>
        </>
      )}

      {items.length === 0 && (
        <div className="flex items-center justify-center gap-2 text-[11px] sm:text-xs text-light-textSecondary dark:text-dark-textSecondary">
          <FileImage className="w-3.5 h-3.5 text-silk-rose" />
          {bn ? "সব ফাইল আপনার ব্রাউজারেই প্রসেস হয়" : "All files are processed in your browser"}
        </div>
      )}
    </section>
  );
}
