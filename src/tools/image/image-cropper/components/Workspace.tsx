import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Download,
  X,
  RotateCcw,
  Crop as CropIcon,
  Settings2,
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
  cropImage,
  downloadFile,
  formatBytes,
  revokeUrls,
  ASPECT_PRESETS,
  fitAspect,
} from "../logic";
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

  const handleFile = async (f: File) => {
    if (result) {
      revokeUrls(result);
      setResult(null);
    }
    if (!f.type.startsWith("image/")) {
      setError(bn ? "শুধু ছবি দিন।" : "Please select an image.");
      return;
    }
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
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", update);
    };
  }, [imgDims]);

  const applyPreset = (id: string) => {
    setPreset(id);
    const p = ASPECT_PRESETS.find((x) => x.id === id);
    if (!p || p.ratio === null) return;
    setCrop((c) => fitAspect(c, p.ratio as number, imgDims.w, imgDims.h));
  };

  const updateNum = (key: keyof CropRect, val: number) => {
    setCrop((c) => {
      const next = {
        ...c,
        [key]: Math.max(key === "w" || key === "h" ? 1 : 0, val),
      };
      next.x = Math.min(next.x, imgDims.w - 1);
      next.y = Math.min(next.y, imgDims.h - 1);
      next.w = Math.min(next.w, imgDims.w - next.x);
      next.h = Math.min(next.h, imgDims.h - next.y);
      return next;
    });
    setPreset("free");
  };

  const dragState = useRef<{
    mode: "move" | "se" | null;
    startX: number;
    startY: number;
    orig: CropRect;
  } | null>(null);

  const onPointerDown = (mode: "move" | "se", e: React.PointerEvent) => {
    e.preventDefault();
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
    dragState.current = {
      mode,
      startX: e.clientX,
      startY: e.clientY,
      orig: { ...crop },
    };
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

  const onPointerUp = () => {
    dragState.current = null;
  };

  const handleCrop = async () => {
    if (!file) return;
    setBusy(true);
    setError(null);
    try {
      if (result) revokeUrls(result);
      const r = await cropImage(file, crop, setError);
      if (r) {
        setResult(r);
        
      }
    } finally {
      setBusy(false);
    }
  };

  const resetCrop = () => {
    setCrop({ x: 0, y: 0, w: imgDims.w, h: imgDims.h });
    setPreset("free");
  };

  const clearAll = () => {
    if (imgUrl) URL.revokeObjectURL(imgUrl);
    if (result) revokeUrls(result);
    setFile(null);
    setImgUrl(null);
    setResult(null);
    setError(null);
    setImgDims({ w: 0, h: 0 });
    if (inputRef.current) inputRef.current.value = "";
  };

  const scale = previewBox.w && imgDims.w ? previewBox.w / imgDims.w : 0;

  return (
    <section className="pb-12 space-y-4 sm:space-y-5">
      <input
        ref={inputRef}
        type="file"
        accept="image/jpeg,image/jpg,image/png,image/webp"
        onChange={(e) => {
          const f = e.target.files?.[0];
          if (f) void handleFile(f);
        }}
        className="hidden"
      />

      {/* ── Empty state: Drop zone ── */}
      {!file && (
        <DropZone
          onFiles={(list) => {
            const f = list?.[0];
            if (f) void handleFile(f);
          }}
          accept="image/jpeg,image/jpg,image/png,image/webp"
          busy={busy}
          drag={drag}
          onDragChange={setDrag}
          title={bn ? "ছবি ড্রপ করুন" : "Drop your image"}
          subtitle={
            bn
              ? "JPG · PNG · WebP · ৫০ MB পর্যন্ত"
              : "JPG · PNG · WebP · Up to 50 MB"
          }
          icon={<CropIcon className="w-7 h-7 sm:w-9 sm:h-9 text-silk-rose" />}
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

      {file && imgUrl && (
        <>
          {/* ── Aspect presets ── */}
          <WorkspacePanel className="p-3.5 sm:p-4" animate={false}>
            <div className="flex items-center gap-2 mb-3">
              <span className="w-7 h-7 rounded-lg bg-silk-rose/15 border border-silk-rose/25 flex items-center justify-center">
                <Settings2 className="w-3.5 h-3.5 text-silk-rose" />
              </span>
              <span className="text-[12px] sm:text-sm font-bold text-light-text dark:text-dark-text">
                {bn ? "অ্যাসপেক্ট রেশিও" : "Aspect ratio"}
              </span>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {ASPECT_PRESETS.map((p) => {
                const active = preset === p.id;
                return (
                  <button
                    key={p.id}
                    type="button"
                    onClick={() => applyPreset(p.id)}
                    className={cn(
                      "px-3 py-1.5 rounded-full text-[10px] font-bold transition-all",
                      active
                        ? "bg-gradient-to-r from-silk-rose to-silk-wine-deep text-white shadow-[0_6px_16px_-8px_rgba(139,58,79,0.5)]"
                        : "bg-silk-rose/8 border border-silk-rose/25 text-silk-wine dark:text-silk-rose-soft hover:bg-silk-rose/15 hover:border-silk-rose/45"
                    )}
                  >
                    {bn ? p.labelBn : p.labelEn}
                  </button>
                );
              })}
            </div>
          </WorkspacePanel>

          {/* ── Crop preview ── */}
          <WorkspacePanel className="p-3 sm:p-4" animate={false}>
            <div ref={previewRef} className="flex justify-center">
              <div
                className="relative select-none rounded-lg overflow-hidden shadow-[0_12px_40px_-16px_rgba(139,58,79,0.35)]"
                style={{ width: previewBox.w, height: previewBox.h }}
              >
                <img
                  src={imgUrl}
                  alt="preview"
                  className="block w-full h-full select-none pointer-events-none"
                  draggable={false}
                />
                <div
                  className="absolute inset-0 bg-black/50 pointer-events-none"
                  style={{
                    clipPath: `polygon(0 0, 100% 0, 100% 100%, 0 100%, 0 0, ${crop.x * scale}px ${crop.y * scale}px, ${crop.x * scale}px ${(crop.y + crop.h) * scale}px, ${(crop.x + crop.w) * scale}px ${(crop.y + crop.h) * scale}px, ${(crop.x + crop.w) * scale}px ${crop.y * scale}px, ${crop.x * scale}px ${crop.y * scale}px)`,
                  }}
                />
                <div
                  onPointerDown={(e) => onPointerDown("move", e)}
                  onPointerMove={onPointerMove}
                  onPointerUp={onPointerUp}
                  className="absolute border-2 border-silk-rose cursor-move"
                  style={{
                    left: crop.x * scale,
                    top: crop.y * scale,
                    width: crop.w * scale,
                    height: crop.h * scale,
                  }}
                >
                  <div className="absolute inset-0 grid grid-cols-3 grid-rows-3 pointer-events-none">
                    {Array.from({ length: 9 }).map((_, i) => (
                      <div key={i} className="border border-white/30" />
                    ))}
                  </div>
                  <div
                    onPointerDown={(e) => {
                      e.stopPropagation();
                      onPointerDown("se", e);
                    }}
                    onPointerMove={onPointerMove}
                    onPointerUp={onPointerUp}
                    className="absolute -bottom-2 -right-2 w-5 h-5 bg-silk-rose rounded-full cursor-se-resize shadow-[0_6px_16px_-4px_rgba(139,58,79,0.5)] border-2 border-white"
                  />
                </div>
              </div>
            </div>
          </WorkspacePanel>

          {/* ── Numeric inputs ── */}
          <WorkspacePanel className="p-3.5 sm:p-4" animate={false}>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              <NumField
                label="X"
                value={crop.x}
                max={imgDims.w}
                onChange={(v) => updateNum("x", v)}
              />
              <NumField
                label="Y"
                value={crop.y}
                max={imgDims.h}
                onChange={(v) => updateNum("y", v)}
              />
              <NumField
                label="W"
                value={crop.w}
                max={imgDims.w}
                onChange={(v) => updateNum("w", v)}
              />
              <NumField
                label="H"
                value={crop.h}
                max={imgDims.h}
                onChange={(v) => updateNum("h", v)}
              />
            </div>
            <div className="mt-3 flex items-center justify-between text-[10px] sm:text-[11px] text-light-textSecondary dark:text-dark-textSecondary pt-3 border-t border-silk-rose/10">
              <span className="font-mono">
                {bn ? "মূল মাপ" : "Original"}: {imgDims.w} × {imgDims.h} px
              </span>
              <button
                type="button"
                onClick={resetCrop}
                className="inline-flex items-center gap-1.5 text-silk-rose hover:text-silk-wine dark:hover:text-silk-rose-soft font-bold transition-colors"
              >
                <RotateCcw className="w-3 h-3" />
                {bn ? "রিসেট" : "Reset"}
              </button>
            </div>
          </WorkspacePanel>

          {/* ── Stats ── */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 sm:gap-3">
            <ResultStat
              label={bn ? "ক্রপ প্রস্থ" : "Crop W"}
              value={`${crop.w}px`}
              accent="rose"
            />
            <ResultStat
              label={bn ? "ক্রপ উচ্চতা" : "Crop H"}
              value={`${crop.h}px`}
              accent="rose"
            />
            <ResultStat
              label={bn ? "অনুপাত" : "Ratio"}
              value={
                crop.h > 0
                  ? (crop.w / crop.h).toFixed(2).replace(/\.00$/, "")
                  : "—"
              }
              accent="emerald"
            />
          </div>

          {/* ── Action bar ── */}
          <WorkspacePanel className="p-3.5 sm:p-4" animate={false}>
            <div className="flex items-center justify-between gap-3 flex-wrap">
              <div className="flex items-center gap-2 text-[12px] sm:text-[13px] text-light-text dark:text-dark-text">
                <CropIcon className="w-4 h-4 text-silk-rose shrink-0" />
                <span className="font-bold">
                  {bn
                    ? `ক্রপ: ${crop.w} × ${crop.h}`
                    : `Crop: ${crop.w} × ${crop.h}`}
                </span>
              </div>

              <div className="flex items-center gap-2 flex-wrap">
                <ToolButton
                  size="sm"
                  variant="secondary"
                  onClick={() => inputRef.current?.click()}
                >
                  {bn ? "নতুন ছবি" : "New image"}
                </ToolButton>

                <ToolButton
                  size="sm"
                  variant="primary"
                  loading={busy}
                  icon={<CropIcon className="w-3.5 h-3.5" />}
                  onClick={() => void handleCrop()}
                >
                  {bn ? "ক্রপ করুন" : "Apply crop"}
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

          {/* ── Result ── */}
          <AnimatePresence>
            {result && (
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 16 }}
                transition={{ duration: 0.4 }}
                className="flex items-center gap-3 p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30"
              >
                <div className="w-16 h-16 rounded-xl overflow-hidden bg-white border border-emerald-500/20 flex items-center justify-center shrink-0">
                  <img
                    src={result.croppedUrl}
                    alt="cropped"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[12px] sm:text-sm font-bold text-emerald-700 dark:text-emerald-300 truncate">
                    {result.originalName}
                  </p>
                  <p className="text-[10px] sm:text-[11px] text-emerald-700/80 dark:text-emerald-300/80 mt-0.5 font-mono">
                    {result.cropW} × {result.cropH} px ·{" "}
                    {formatBytes(result.croppedSize)}
                  </p>
                </div>
                <ToolButton
                  size="sm"
                  variant="primary"
                  icon={<Download className="w-3.5 h-3.5" />}
                  onClick={() => downloadFile(result)}
                >
                  {bn ? "ডাউনলোড" : "Download"}
                </ToolButton>
              </motion.div>
            )}
          </AnimatePresence>
        </>
      )}
    </section>
  );
}

function NumField({
  label,
  value,
  max,
  onChange,
}: {
  label: string;
  value: number;
  max: number;
  onChange: (v: number) => void;
}) {
  return (
    <div>
      <label className="block text-[10px] font-bold uppercase tracking-wider text-silk-wine/70 dark:text-silk-rose/60 mb-1.5">
        {label}{" "}
        <span className="text-light-textSecondary dark:text-dark-textSecondary font-normal">
          (0–{max})
        </span>
      </label>
      <input
        type="number"
        min={0}
        max={max}
        value={value}
        onChange={(e) => onChange(parseInt(e.target.value) || 0)}
        className="w-full h-9 px-2.5 rounded-lg text-[12px] font-mono font-bold bg-white/80 dark:bg-dark-surface/80 border border-silk-rose/20 focus:border-silk-rose/50 text-light-text dark:text-dark-text outline-none transition-all"
      />
    </div>
  );
}
