import { useRef, useState } from "react";
import { Upload, X, Download, Loader2, CheckCircle2, FileImage, Lock, Unlock } from "lucide-react";
import { useLanguage } from "@contexts/LanguageContext";
import { cn } from "@lib/cn";
import { resizeImage, downloadFile, downloadAll, formatBytes, revokeUrls } from "../logic";
import type { ResizedFile } from "../types";

const PRESETS = [
  { labelEn: "Instagram Post", labelBn: "ইনস্টাগ্রাম পোস্ট", w: 1080, h: 1080 },
  { labelEn: "Instagram Story", labelBn: "ইনস্টাগ্রাম স্টোরি", w: 1080, h: 1920 },
  { labelEn: "Facebook Cover", labelBn: "ফেসবুক কভার", w: 820, h: 312 },
  { labelEn: "Twitter Header", labelBn: "টুইটার হেডার", w: 1500, h: 500 },
  { labelEn: "YouTube Thumbnail", labelBn: "ইউটিউব থাম্বনেইল", w: 1280, h: 720 },
  { labelEn: "HD (1920)", labelBn: "HD (১৯২০)", w: 1920, h: 1080 },
];

export function Workspace() {
  const { language } = useLanguage();
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
      const item = await resizeImage(files[i], { width, height, lockAspect, quality }, setError);
      if (item) newItems.push(item);
    }
    setItems((prev) => [...prev, ...newItems]);
    setBusy(false);
    if (inputRef.current) inputRef.current.value = "";
  };

  const onDrop = (e: React.DragEvent) => { e.preventDefault(); setDrag(false); void handleFiles(e.dataTransfer.files); };
  const remove = (id: string) => { setItems((prev) => { const f = prev.find((i) => i.id === id); if (f) revokeUrls(f); return prev.filter((i) => i.id !== id); }); };
  const clearAll = () => { items.forEach(revokeUrls); setItems([]); setError(null); if (inputRef.current) inputRef.current.value = ""; };

  return (
    <section className="pb-12 space-y-4">
      <input ref={inputRef} type="file" accept="image/jpeg,image/jpg,image/png,image/webp" multiple onChange={(e) => void handleFiles(e.target.files)} className="hidden" />

      {/* Dimensions */}
      <div className="rounded-2xl bg-white/70 dark:bg-dark-surface/70 backdrop-blur-xl border border-silk-rose/20 p-4 space-y-3">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <div>
            <label className="block text-[11px] font-medium text-light-text dark:text-dark-text mb-1.5">{bn ? "প্রস্থ (px)" : "Width (px)"}</label>
            <input type="number" min={1} max={10000} value={width} onChange={(e) => setWidth(Math.max(1, parseInt(e.target.value) || 1))} className="w-full h-9 px-3 rounded-lg text-[13px] bg-white/80 dark:bg-dark-surface/80 border border-silk-rose/20 focus:border-silk-rose/50 text-light-text dark:text-dark-text outline-none transition-all" />
          </div>
          <div>
            <label className="block text-[11px] font-medium text-light-text dark:text-dark-text mb-1.5">{bn ? "উচ্চতা (px)" : "Height (px)"}</label>
            <input type="number" min={1} max={10000} value={height} onChange={(e) => setHeight(Math.max(1, parseInt(e.target.value) || 1))} className="w-full h-9 px-3 rounded-lg text-[13px] bg-white/80 dark:bg-dark-surface/80 border border-silk-rose/20 focus:border-silk-rose/50 text-light-text dark:text-dark-text outline-none transition-all" />
          </div>
          <div>
            <label className="block text-[11px] font-medium text-light-text dark:text-dark-text mb-1.5">{bn ? "Aspect" : "Aspect"}</label>
            <button type="button" onClick={() => setLockAspect((v) => !v)} className={cn("w-full h-9 rounded-lg border text-[12px] font-medium inline-flex items-center justify-center gap-1.5 transition-all", lockAspect ? "bg-silk-rose/15 border-silk-rose/50 text-silk-wine dark:text-silk-rose-soft" : "bg-silk-rose/5 border-silk-rose/15 text-light-textSecondary dark:text-dark-textSecondary hover:border-silk-rose/40")}>
              {lockAspect ? <Lock className="w-3.5 h-3.5" /> : <Unlock className="w-3.5 h-3.5" />}
              {lockAspect ? (bn ? "লকড" : "Locked") : (bn ? "ফ্রি" : "Free")}
            </button>
          </div>
          <div>
            <label className="block text-[11px] font-medium text-light-text dark:text-dark-text mb-1.5">{bn ? "কোয়ালিটি" : "Quality"} ({quality}%)</label>
            <input type="range" min={40} max={100} step={2} value={quality} onChange={(e) => setQuality(parseInt(e.target.value))} className="w-full mt-3 accent-silk-rose" />
          </div>
        </div>

        {/* Presets */}
        <div>
          <p className="text-[10px] uppercase tracking-wider font-semibold text-silk-wine/70 dark:text-silk-rose/60 mb-2">{bn ? "প্রিসেট" : "Presets"}</p>
          <div className="flex flex-wrap gap-1.5">
            {PRESETS.map((p) => (
              <button key={p.labelEn} type="button" onClick={() => { setWidth(p.w); setHeight(p.h); }} className={cn("px-2.5 py-1 rounded-full text-[10px] font-medium transition-all", width === p.w && height === p.h ? "bg-silk-rose text-white" : "bg-silk-rose/8 border border-silk-rose/25 text-light-textSecondary dark:text-dark-textSecondary hover:border-silk-rose/50")}>
                {bn ? p.labelBn : p.labelEn} · {p.w}×{p.h}
              </button>
            ))}
          </div>
        </div>
      </div>

      {items.length === 0 && (
        <div onDragOver={(e) => { e.preventDefault(); setDrag(true); }} onDragLeave={() => setDrag(false)} onDrop={onDrop} onClick={() => inputRef.current?.click()} role="button" tabIndex={0} onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") inputRef.current?.click(); }} className={cn("flex flex-col items-center justify-center gap-4 p-8 sm:p-16 rounded-3xl cursor-pointer", "bg-white/70 dark:bg-dark-surface/70 backdrop-blur-xl", "border-2 border-dashed transition-all duration-300", drag ? "border-silk-rose/70 bg-silk-rose/10 scale-[1.01]" : "border-silk-rose/25 hover:border-silk-rose/50")}>
          <div className={cn("w-16 h-16 sm:w-20 sm:h-20 rounded-2xl flex items-center justify-center transition-all", "bg-gradient-to-br from-silk-rose/20 to-silk-gold/10 border border-silk-rose/25", drag && "scale-110")}>
            {busy ? <Loader2 className="w-7 h-7 sm:w-9 sm:h-9 text-silk-rose animate-spin" /> : <Upload className="w-7 h-7 sm:w-9 sm:h-9 text-silk-rose" />}
          </div>
          <div className="text-center px-3">
            <p className="font-display font-bold text-[15px] sm:text-lg text-light-text dark:text-dark-text mb-1.5">{busy ? (bn ? "রিসাইজ হচ্ছে..." : "Resizing...") : (bn ? "ছবি ড্রপ করুন" : "Drop your images")}</p>
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
              <span className="font-semibold">{items.length} {bn ? "ফাইল রিসাইজড" : "file(s) resized"}</span>
            </div>
            <div className="flex items-center gap-2">
              <button type="button" onClick={() => inputRef.current?.click()} className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-silk-rose/10 border border-silk-rose/25 text-[11px] sm:text-xs font-medium text-silk-rose hover:bg-silk-rose/20 transition-all"><Upload className="w-3.5 h-3.5" />{bn ? "আরও" : "Add more"}</button>
              <button type="button" onClick={() => downloadAll(items)} className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gradient-to-r from-silk-rose to-silk-wine-deep text-white text-[11px] sm:text-xs font-semibold shadow-silk-soft hover:shadow-silk-deep transition-all"><Download className="w-3.5 h-3.5" />{bn ? "সব ডাউনলোড" : "Download all"}</button>
              <button type="button" onClick={clearAll} className="w-7 h-7 rounded-lg flex items-center justify-center text-red-500 hover:bg-red-500/10 transition-colors" aria-label="Clear all"><X className="w-3.5 h-3.5" /></button>
            </div>
          </div>
          <div className="space-y-2.5">
            {items.map((item) => (
              <div key={item.id} className="flex items-center gap-3 p-3 rounded-2xl bg-white/70 dark:bg-dark-surface/70 backdrop-blur-xl border border-silk-rose/20">
                <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-xl overflow-hidden bg-silk-rose/5 border border-silk-rose/15 flex items-center justify-center shrink-0"><img src={item.resizedUrl} alt={item.originalName} className="w-full h-full object-cover" /></div>
                <div className="flex-1 min-w-0">
                  <p className="text-[12px] sm:text-sm font-semibold text-light-text dark:text-dark-text truncate">{item.originalName}</p>
                  <p className="text-[10px] sm:text-[11px] text-light-textSecondary dark:text-dark-textSecondary mt-0.5">
                    {item.originalWidth} × {item.originalHeight} px → <span className="text-silk-rose font-semibold">{item.newWidth} × {item.newHeight} px</span>
                  </p>
                  <p className="text-[10px] sm:text-[11px] text-light-textSecondary dark:text-dark-textSecondary mt-0.5">{formatBytes(item.originalSize)} → <span className="text-silk-rose font-semibold">{formatBytes(item.resizedSize)}</span></p>
                </div>
                <button type="button" onClick={() => downloadFile(item)} className="inline-flex items-center justify-center gap-1.5 h-9 px-3 sm:px-4 rounded-xl bg-gradient-to-r from-silk-rose to-silk-wine-deep text-white text-[11px] sm:text-xs font-semibold shadow-silk-soft hover:shadow-silk-deep transition-all shrink-0"><Download className="w-3.5 h-3.5" /><span className="hidden sm:inline">{bn ? "ডাউনলোড" : "Download"}</span></button>
                <button type="button" onClick={() => remove(item.id)} className="w-7 h-7 rounded-lg flex items-center justify-center text-red-500 hover:bg-red-500/10 transition-colors shrink-0" aria-label="Remove"><X className="w-3.5 h-3.5" /></button>
              </div>
            ))}
          </div>
        </>
      )}

      {items.length === 0 && (
        <div className="flex items-center justify-center gap-2 text-[11px] sm:text-xs text-lightTextSecondary dark:text-dark-textSecondary">
          <FileImage className="w-3.5 h-3.5 text-silk-rose" />
          {bn ? "সব ফাইল আপনার ব্রাউজারেই প্রসেস হয়" : "All files are processed in your browser"}
        </div>
      )}
    </section>
  );
}
