import { useRef, useState } from "react";
import { Upload, X, Loader2, Circle, Square } from "lucide-react";
import { useLanguage } from "@contexts/LanguageContext";
import { cn } from "@lib/cn";
import type { CVSettings } from "../types";
import { fileToDataUrl, cropSquare } from "../logic/photoHelpers";

interface PhotoUploaderProps {
  photoDataUrl: string | null;
  onPhotoChange: (dataUrl: string | null) => void;
  settings: CVSettings;
  onSettingsChange: (patch: Partial<CVSettings>) => void;
  onError?: (msg: string) => void;
}

const MAX_SIZE = 5 * 1024 * 1024;

type ShapeId = "circle" | "square" | "rounded";

const SHAPES: { id: ShapeId; icon: typeof Circle; labelEn: string; labelBn: string }[] = [
  { id: "circle", icon: Circle, labelEn: "Circle", labelBn: "গোল" },
  { id: "square", icon: Square, labelEn: "Square", labelBn: "বর্গ" },
  { id: "rounded", icon: Square, labelEn: "Rounded", labelBn: "গোলকোণা" },
];

export function PhotoUploader({
  photoDataUrl,
  onPhotoChange,
  settings,
  onSettingsChange,
  onError,
}: PhotoUploaderProps) {
  const { language } = useLanguage();
  const bn = language === "bn";
  const inputRef = useRef<HTMLInputElement>(null);
  const [busy, setBusy] = useState(false);

  const currentShape: ShapeId = settings.photoShape ?? "circle";

  const handleFile = async (file: File) => {
    if (!file.type.startsWith("image/")) {
      onError?.(bn ? "শুধু ছবি ফাইল দিন।" : "Please choose an image file.");
      return;
    }
    if (file.size > MAX_SIZE) {
      onError?.(bn ? "সর্বোচ্চ ৫ MB।" : "Max 5 MB.");
      return;
    }
    setBusy(true);
    try {
      const raw = await fileToDataUrl(file);
      const cropped = await cropSquare(raw, 480);
      onPhotoChange(cropped);
      if (!settings.photoEnabled) {
        onSettingsChange({ photoEnabled: true });
      }
    } catch {
      onError?.(bn ? "ছবি পড়তে সমস্যা।" : "Could not process image.");
    } finally {
      setBusy(false);
    }
  };

  const clear = () => {
    onPhotoChange(null);
    onSettingsChange({ photoEnabled: false });
    if (inputRef.current) inputRef.current.value = "";
  };

  const setShape = (shape: ShapeId) => {
    onSettingsChange({ photoShape: shape });
  };

  return (
    <div className="space-y-3">
      <input
        ref={inputRef}
        type="file"
        accept="image/png,image/jpeg,image/webp"
        onChange={(e) => {
          const f = e.target.files?.[0];
          if (f) void handleFile(f);
        }}
        className="hidden"
      />

      {photoDataUrl ? (
        <div className="flex items-start gap-3">
          <div className="w-20 h-20 rounded-xl overflow-hidden bg-silk-rose/10 border border-silk-rose/25 flex items-center justify-center shrink-0">
            <img
              src={photoDataUrl}
              alt="CV photo"
              className={cn(
                "w-full h-full object-cover",
                settings.photoEnabled ? "opacity-100" : "opacity-40"
              )}
              style={{ borderRadius: currentShape === "circle" ? "50%" : currentShape === "rounded" ? "20%" : "0" }}
            />
          </div>
          <div className="flex-1 min-w-0 space-y-1.5">
            <button
              type="button"
              onClick={() => inputRef.current?.click()}
              className="text-[11px] font-medium text-silk-rose hover:underline"
            >
              {bn ? "ছবি বদলান" : "Change photo"}
            </button>
            <button
              type="button"
              onClick={clear}
              className="block text-[11px] font-medium text-red-500 hover:underline"
            >
              {bn ? "ছবি সরান" : "Remove photo"}
            </button>
            <label className="flex items-center gap-1.5 text-[11px] text-light-text dark:text-dark-text cursor-pointer select-none pt-1">
              <input
                type="checkbox"
                checked={settings.photoEnabled}
                onChange={(e) => onSettingsChange({ photoEnabled: e.target.checked })}
                className="accent-silk-rose"
              />
              {bn ? "CV-তে ছবি দেখান" : "Show photo on CV"}
            </label>
          </div>
        </div>
      ) : (
        <button
          type="button"
          disabled={busy}
          onClick={() => inputRef.current?.click()}
          className={cn(
            "w-full flex flex-col items-center justify-center gap-1.5 h-24 rounded-xl",
            "bg-silk-rose/5 border border-dashed border-silk-rose/30",
            "hover:border-silk-rose/60 transition-all disabled:opacity-50"
          )}
        >
          {busy ? (
            <Loader2 className="w-5 h-5 text-silk-rose animate-spin" />
          ) : (
            <Upload className="w-5 h-5 text-silk-rose" />
          )}
          <span className="text-[11px] font-medium text-silk-rose">
            {bn ? "ছবি আপলোড করুন (ঐচ্ছিক)" : "Upload photo (optional)"}
          </span>
        </button>
      )}

      {/* Shape selector */}
      {photoDataUrl && (
        <div className="pt-1">
          <p className="text-[10px] uppercase tracking-wider font-semibold text-silk-wine/70 dark:text-silk-rose/60 mb-1.5">
            {bn ? "ফ্রেম স্টাইল" : "Frame style"}
          </p>
          <div className="grid grid-cols-3 gap-1.5">
            {SHAPES.map((s) => {
              const Icon = s.icon;
              const active = currentShape === s.id;
              return (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => setShape(s.id)}
                  className={cn(
                    "flex flex-col items-center gap-1 p-2 rounded-lg border transition-all",
                    active
                      ? "bg-silk-rose/15 border-silk-rose/50 shadow-silk-soft"
                      : "bg-silk-rose/5 border-silk-rose/15 hover:border-silk-rose/40"
                  )}
                  title={bn ? s.labelBn : s.labelEn}
                >
                  <Icon className="w-4 h-4 text-silk-rose" />
                  <span className={cn("text-[9px] font-medium", active ? "text-silk-rose" : "text-light-textSecondary dark:text-dark-textSecondary")}>
                    {bn ? s.labelBn : s.labelEn}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      )}

      <p className="text-[10px] text-lightTextSecondary dark:text-dark-textSecondary leading-relaxed">
        {bn
          ? "ছবি সম্পূর্ণ ব্রাউজারেই প্রসেস হয় — কোথাও আপলোড হয় না।"
          : "Photos are processed entirely in your browser — nothing is uploaded."}
      </p>

      <X className="hidden" aria-hidden="true" />
    </div>
  );
}
