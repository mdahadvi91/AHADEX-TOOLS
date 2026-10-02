import { useEffect, useRef, useState } from "react";
import { Upload, X, Download, Loader2, RotateCcw, Crop as CropIcon } from "lucide-react";
import { useLanguage } from "@contexts/LanguageContext";
import { cn } from "@lib/cn";
import { cropImage, downloadFile, formatBytes, revokeUrls, ASPECT_PRESETS, fitAspect } from "../logic";
import type { CroppedFile, CropRect } from "../types";

export function Workspace() {
  const { language } = useLanguage();
  const bn = language === "bn";
  const inputRef = useRef<HTMLInputElement>(null);
  const previewRef = useRef<HTMLDivElement>(null);

  const [file, setFile] = useState<File | null>(null);
  const [imgUrl, setImgUrl] = useState<string | null>(null);
  const [imgDims, setImgDims] = useState({ w: 0, h: 0 });
  const [crop, setCrop] = useState<CropRect>({ x: 0, y: 0, w: 0, h: 0 });
  const [preset, setPreset] = useState<string>("free");
  const [result, setResult] = useState<CroppedFile | null>(null);
  const [busy, setBusy] = useState(false);
  const [drag, setDrag] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [previewBox, setPreviewBox] = useState({ w: 0, h: 0 });

  /* Load file into preview */
  const handleFile = async (f: File) => {
    if (result) { revokeUrls(result); setResult(null); }
    if (!f.type.startsWith("image/")) { setError(bn ? "শুধু ছবি দিন।" : "Please select an image."); return; }
    setError(null);
    setFile(f);
    const url = URL.createObjectURL(f);
    setImgUrl(url);
    const img = new Image();
    img.onload = () => {
      const { naturalWidth: w, naturalHeight: h } = img;
      setImgDims({ w, h });
      setCrop({ x: 0, y: 0, w, h });
    };
    img.src = url;
  };

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault(); setDrag(false);
    const f = e.dataTransfer.files?.[0];
    if (f) void handleFile(f);
  };

  /* Recompute preview box size when image loads */
  useEffect(() => {
    if (!imgDims.w || !imgDims.h || !previewRef.current) return;
    const update = () => {
      const el = previewRef.current;
      if (!el) return;
      const availW = el.clientWidth;
      const availH = Math.min(520, window.innerHeight * 0.6);
      const scale = Math.min(availW / imgDims.w, availH / imgDims.h, 1);
      setPreviewBox({ w: imgDims.w * scale, h: imgDims.h * scale });
    };
    update();
    const ro = new ResizeObserver(update);
    ro.observe(previewRef.current);
    window.addEventListener("resize", update);
    return () => { ro.disconnect(); window.removeEventListener("resize", update); };
  }, [imgDims]);

  const applyPreset = (id: string) => {
    setPreset(id);
    const p = ASPECT_PRESETS.find((x) => x.id === id);
    if (!p || p.ratio === null) return;
    setCrop((c) => fitAspect(c, p.ratio as number, imgDims.w, imgDims.h));
  };

  const updateNum = (key: keyof CropRect, val: number) => {
    setCrop((c) => {
      const next = { ...c, [key]: Math.max(key === "w" || key === "h" ? 1 : 0, val) };
      next.x = Math.min(next.x, imgDims.w - 1);
      next.y = Math.min(next.y, imgDims.h - 1);
      next.w = Math.min(next.w, imgDims.w - next.x);
      next.h = Math.min(next.h, imgDims.h - next.y);
      return next;
    });
    setPreset("free");
  };

  /* Interactive drag on crop box */
  const dragState = useRef<{ mode: "move" | "se" | null; startX: number; startY: number; orig: CropRect } | null>(null);

  const onPointerDown = (mode: "move" | "se", e: React.PointerEvent) => {
    e.preventDefault();
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
    dragState.current = { mode, startX: e.clientX, startY: e.clientY, orig: { ...crop } };
  };

  const onPointerMove = (e: React.PointerEvent) => {
    if (!dragState.current || !previewBox.w) return;
    const scaleX = imgDims.w / previewBox.w;
    const scaleY = imgDims.h / previewBox.h;
    const dx = (e.clientX - dragState.current.startX) * scaleX;
    const dy = (e.clientY - dragState.current.startY) * scaleY;
    const orig = dragState.current.orig;

    setCrop(() => {
      if (dragState.current?.mode === "move") {
        const nx = Math.max(0, Math.min(imgDims.w - orig.w, orig.x + dx));
        const ny = Math.max(0, Math.min(imgDims.h - orig.h, orig.y + dy));
        return { ...orig, x: nx, y: ny };
      }
      const nw = Math.max(20, Math.min(imgDims.w - orig.x, orig.w + dx));
      const nh = Math.max(20, Math.min(imgDims.h - orig.y, orig.h + dy));
      const p = ASPECT_PRESETS.find((x) => x.id === preset);
      if (p?.ratio) {
        const finalH = nw / p.ratio;
        return { ...orig, w: nw, h: Math.min(finalH, imgDims.h - orig.y) };
      }
      return { ...orig, w: nw, h: nh };
    });
  };

  const onPointerUp = () => { dragState.current = null; };

  const handleCrop = async () => {
    if (!file) return;
    setBusy(true);
    setError(null);
    try {
      if (result) revokeUrls(result);
      const r = await cropImage(file, crop, setError);
      if (r) setResult(r);
    } finally { setBusy(false); }
  };

  const resetCrop = () => {
    setCrop({ x: 0, y: 0, w: imgDims.w, h: imgDims.h });
    setPreset("free");
  };

  const clearAll = () => {
    if (imgUrl) URL.revokeObjectURL(imgUrl);
    if (result) revokeUrls(result);
    setFile(null); setImgUrl(null); setResult(null); setError(null);
    setImgDims({ w: 0, h: 0 });
    if (inputRef.current) inputRef.current.value = "";
  };

  /* Scale helper for crop box on preview */
  const scale = previewBox.w && imgDims.w ? previewBox.w / imgDims.w : 0;

  return (
    <section className="pb-12 space-y-4">
      <input ref={inputRef} type="file" accept="image/jpeg,image/jpg,image/png,image/webp" onChange={(e) => { const f = e.target.files?.[0]; if (f) void handleFile(f); }} className="hidden" />

      {!file && (
        <div onDragOver={(e) => { e.preventDefault(); setDrag(true); }} onDragLeave={() => setDrag(false)} onDrop={onDrop} onClick={() => inputRef.current?.click()} role="button" tabIndex={0} onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") inputRef.current?.click(); }} className={cn("flex flex-col items-center justify-center gap-4 p-8 sm:p-16 rounded-3xl cursor-pointer", "bg-white/70 dark:bg-dark-surface/70 backdrop-blur-xl", "border-2 border-dashed transition-all duration-300", drag ? "border-silk-rose/70 bg-silk-rose/10 scale-[1.01]" : "border-silk-rose/25 hover:border-silk-rose/50")}>
          <div className={cn("w-16 h-16 sm:w-20 sm:h-20 rounded-2xl flex items-center justify-center transition-all", "bg-gradient-to-br from-silk-rose/20 to-silk-gold/10 border border-silk-rose/25", drag && "scale-110")}>
            <Upload className="w-7 h-7 sm:w-9 sm:h-9 text-silk-rose" />
          </div>
          <div className="text-center px-3">
            <p className="font-display font-bold text-[15px] sm:text-lg text-light-text dark:text-dark-text mb-1.5">{bn ? "ছবি ড্রপ করুন" : "Drop your image"}</p>
            <p className="text-[12px] sm:text-sm text-light-textSecondary dark:text-dark-textSecondary leading-relaxed">{bn ? "JPG · PNG · WebP · ৫০ MB পর্যন্ত" : "JPG · PNG · WebP · Up to 50 MB"}</p>
          </div>
        </div>
      )}

      {error && <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-[12px] text-red-600 dark:text-red-400">{error}</div>}

      {file && imgUrl && (
        <>
          {/* Aspect presets */}
          <div className="rounded-2xl bg-white/70 dark:bg-dark-surface/70 backdrop-blur-xl border border-silk-rose/20 p-3">
            <p className="text-[10px] uppercase tracking-wider font-semibold text-silk-wine/70 dark:text-silk-rose/60 mb-2">{bn ? "Aspect ratio" : "Aspect ratio"}</p>
            <div className="flex flex-wrap gap-1.5">
              {ASPECT_PRESETS.map((p) => (
                <button key={p.id} type="button" onClick={() => applyPreset(p.id)} className={cn("px-2.5 py-1 rounded-full text-[10px] font-medium transition-all", preset === p.id ? "bg-silk-rose text-white" : "bg-silk-rose/8 border border-silk-rose/25 text-light-textSecondary dark:text-dark-textSecondary hover:border-silk-rose/50")}>
                  {bn ? p.labelBn : p.labelEn}
                </button>
              ))}
            </div>
          </div>

          {/* Crop preview */}
          <div className="rounded-2xl bg-silk-rose/5 border border-silk-rose/15 p-3 sm:p-4">
            <div ref={previewRef} className="flex justify-center">
              <div className="relative select-none" style={{ width: previewBox.w, height: previewBox.h }}>
                <img src={imgUrl} alt="preview" className="block w-full h-full select-none pointer-events-none" draggable={false} />
                <div className="absolute inset-0 bg-black/40 pointer-events-none" style={{ clipPath: `polygon(0 0, 100% 0, 100% 100%, 0 100%, 0 0, ${crop.x * scale}px ${crop.y * scale}px, ${crop.x * scale}px ${(crop.y + crop.h) * scale}px, ${(crop.x + crop.w) * scale}px ${(crop.y + crop.h) * scale}px, ${(crop.x + crop.w) * scale}px ${crop.y * scale}px, ${crop.x * scale}px ${crop.y * scale}px)` }} />
                <div onPointerDown={(e) => onPointerDown("move", e)} onPointerMove={onPointerMove} onPointerUp={onPointerUp} className="absolute border-2 border-silk-rose cursor-move" style={{ left: crop.x * scale, top: crop.y * scale, width: crop.w * scale, height: crop.h * scale }}>
                  <div className="absolute inset-0 grid grid-cols-3 grid-rows-3 pointer-events-none">
                    {Array.from({ length: 9 }).map((_, i) => (<div key={i} className="border border-white/30" />))}
                  </div>
                  <div onPointerDown={(e) => { e.stopPropagation(); onPointerDown("se", e); }} onPointerMove={onPointerMove} onPointerUp={onPointerUp} className="absolute -bottom-2 -right-2 w-4 h-4 bg-silk-rose rounded-full cursor-se-resize shadow-silk-medium" />
                </div>
              </div>
            </div>
          </div>

          {/* Numeric inputs */}
          <div className="rounded-2xl bg-white/70 dark:bg-dark-surface/70 backdrop-blur-xl border border-silk-rose/20 p-3">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              <NumField label="X" value={crop.x} max={imgDims.w} onChange={(v) => updateNum("x", v)} />
              <NumField label="Y" value={crop.y} max={imgDims.h} onChange={(v) => updateNum("y", v)} />
              <NumField label="W" value={crop.w} max={imgDims.w} onChange={(v) => updateNum("w", v)} />
              <NumField label="H" value={crop.h} max={imgDims.h} onChange={(v) => updateNum("h", v)} />
            </div>
            <div className="mt-2 flex items-center justify-between text-[10px] text-light-textSecondary dark:text-dark-textSecondary">
              <span>{bn ? "মূল মাপ" : "Original"}: {imgDims.w} × {imgDims.h} px</span>
              <button type="button" onClick={resetCrop} className="inline-flex items-center gap-1 text-silk-rose hover:underline"><RotateCcw className="w-3 h-3" />{bn ? "রিসেট" : "Reset"}</button>
            </div>
          </div>

          {/* Action bar */}
          <div className="flex items-center justify-between gap-3 flex-wrap p-3 rounded-2xl bg-white/70 dark:bg-dark-surface/70 backdrop-blur-xl border border-silk-rose/20">
            <div className="flex items-center gap-2 text-[12px] text-light-text dark:text-dark-text">
              <CropIcon className="w-4 h-4 text-silk-rose" />
              <span className="font-semibold">{bn ? `ক্রপ: ${crop.w}×${crop.h}` : `Crop: ${crop.w}×${crop.h}`}</span>
            </div>
            <div className="flex items-center gap-2">
              <button type="button" onClick={() => inputRef.current?.click()} className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-silk-rose/10 border border-silk-rose/25 text-[11px] sm:text-xs font-medium text-silk-rose hover:bg-silk-rose/20 transition-all"><Upload className="w-3.5 h-3.5" />{bn ? "নতুন ছবি" : "New image"}</button>
              <button type="button" onClick={() => void handleCrop()} disabled={busy} className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gradient-to-r from-silk-rose to-silk-wine-deep text-white text-[11px] sm:text-xs font-semibold shadow-silk-soft hover:shadow-silk-deep transition-all disabled:opacity-50">
                {busy ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <CropIcon className="w-3.5 h-3.5" />}
                {bn ? "ক্রপ করুন" : "Apply crop"}
              </button>
              <button type="button" onClick={clearAll} className="w-7 h-7 rounded-lg flex items-center justify-center text-red-500 hover:bg-red-500/10 transition-colors" aria-label="Clear"><X className="w-3.5 h-3.5" /></button>
            </div>
          </div>

          {/* Result */}
          {result && (
            <div className="flex items-center gap-3 p-3 rounded-2xl bg-white/70 dark:bg-dark-surface/70 backdrop-blur-xl border border-silk-rose/20">
              <div className="w-16 h-16 rounded-xl overflow-hidden bg-silk-rose/5 border border-silk-rose/15 flex items-center justify-center shrink-0">
                <img src={result.croppedUrl} alt="cropped" className="w-full h-full object-cover" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[12px] sm:text-sm font-semibold text-light-text dark:text-dark-text truncate">{result.originalName}</p>
                <p className="text-[10px] sm:text-[11px] text-light-textSecondary dark:text-dark-textSecondary mt-0.5">{result.cropW} × {result.cropH} px · {formatBytes(result.croppedSize)}</p>
              </div>
              <button type="button" onClick={() => downloadFile(result)} className="inline-flex items-center justify-center gap-1.5 h-9 px-3 sm:px-4 rounded-xl bg-gradient-to-r from-silk-rose to-silk-wine-deep text-white text-[11px] sm:text-xs font-semibold shadow-silk-soft hover:shadow-silk-deep transition-all shrink-0"><Download className="w-3.5 h-3.5" /><span className="hidden sm:inline">{bn ? "ডাউনলোড" : "Download"}</span></button>
            </div>
          )}
        </>
      )}

      {!file && (
        <div className="flex items-center justify-center gap-2 text-[11px] sm:text-xs text-light-textSecondary dark:text-dark-textSecondary">
          <CropIcon className="w-3.5 h-3.5 text-silk-rose" />
          {bn ? "সব ফাইল আপনার ব্রাউজারে প্রসেস হয়" : "All files are processed in your browser"}
        </div>
      )}
    </section>
  );
}

function NumField({ label, value, max, onChange }: { label: string; value: number; max: number; onChange: (v: number) => void }) {
  return (
    <div>
      <label className="block text-[10px] font-medium text-light-text dark:text-dark-text mb-1">{label} <span className="text-light-textSecondary dark:text-dark-textSecondary">(0–{max})</span></label>
      <input type="number" min={0} max={max} value={value} onChange={(e) => onChange(parseInt(e.target.value) || 0)} className="w-full h-9 px-2 rounded-lg text-[12px] bg-white/80 dark:bg-dark-surface/80 border border-silk-rose/20 focus:border-silk-rose/50 text-light-text dark:text-dark-text outline-none transition-all" />
    </div>
  );
}
