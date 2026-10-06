import { X, Loader2, Image as ImageIcon, Eye } from "lucide-react";
import { useLanguage } from "@contexts/LanguageContext";
import { cn } from "@lib/cn";
import { UploadZone } from "./UploadZone";
import type { PlatformConfig } from "./types";

interface PreviewPanelProps {
  photoFile: File | null;
  onPhotoChange: (file: File) => void;
  onPhotoClear: () => void;
  preview: string | null;
  generating: boolean;
  hasPayload: boolean;
  platform: PlatformConfig;
  onError?: (msg: string) => void;
}

export function PreviewPanel({
  photoFile,
  onPhotoChange,
  onPhotoClear,
  preview,
  generating,
  hasPayload,
  platform,
  onError = () => {},
}: PreviewPanelProps) {
  const { language } = useLanguage();
  const bn = language === "bn";
  const PlatformIcon = platform.Icon;

  return (
    <main className="flex flex-col rounded-2xl sm:rounded-3xl bg-white/70 dark:bg-dark-surface/70 backdrop-blur-xl border border-silk-rose/20 overflow-hidden h-full">
      {!photoFile ? (
        <UploadZone onPhotoChange={onPhotoChange} onError={onError} />
      ) : (
        <div className="p-4 sm:p-5 lg:p-6 h-full flex flex-col">
          {/* ── Header ── */}
          <div className="flex items-center justify-between gap-3 mb-4 shrink-0">
            <div className="flex items-center gap-2.5 min-w-0">
              <span className="w-8 h-8 rounded-lg bg-silk-rose/15 border border-silk-rose/25 flex items-center justify-center shrink-0">
                <PlatformIcon
                  size={16}
                  color={platform.color}
                  className="shrink-0"
                />
              </span>
              <div className="min-w-0">
                <p className="text-[10px] uppercase tracking-[0.2em] font-bold text-silk-wine/70 dark:text-silk-rose/60">
                  {bn ? "প্রিভিউ" : "Preview"}
                </p>
                <p className="text-[11px] font-bold text-light-text dark:text-dark-text truncate">
                  {bn ? platform.nameBn : platform.name}
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={onPhotoClear}
              className="inline-flex items-center gap-1.5 h-8 px-2.5 rounded-lg text-[11px] font-bold text-silk-rose bg-silk-rose/10 border border-silk-rose/25 hover:bg-silk-rose/20 hover:border-silk-rose/45 transition-all shrink-0"
            >
              <X className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">
                {bn ? "ছবি বদলান" : "Change photo"}
              </span>
              <span className="sm:hidden">
                {bn ? "বদলান" : "Change"}
              </span>
            </button>
          </div>

          {/* ── Preview area ── */}
          <div
            className={cn(
              "relative flex-1 rounded-2xl overflow-hidden flex items-center justify-center min-h-[240px] sm:min-h-[440px]",
              "border border-silk-rose/15",
              "bg-[conic-gradient(at_top_left,_rgba(216,139,154,0.12)_25%,_transparent_25%_50%,_rgba(216,139,154,0.12)_50%_75%,_transparent_75%)] bg-[length:18px_18px]"
            )}
          >
            {preview ? (
              <img
                src={preview}
                alt="Preview"
                className="max-w-full max-h-[420px] sm:max-h-[600px] object-contain"
              />
            ) : (
              <div className="flex flex-col items-center gap-3 py-10 text-light-textSecondary dark:text-dark-textSecondary">
                <Loader2 className="w-6 h-6 animate-spin text-silk-rose" />
                <p className="text-[12px] font-medium">
                  {bn ? "তৈরি হচ্ছে..." : "Generating preview..."}
                </p>
              </div>
            )}

            {/* Generating badge */}
            {generating && preview && (
              <div className="absolute top-3 right-3 px-2.5 py-1.5 rounded-full bg-silk-rose/95 text-white text-[10px] font-bold flex items-center gap-1.5 shadow-[0_8px_20px_-6px_rgba(139,58,79,0.5)] backdrop-blur">
                <Loader2 className="w-3 h-3 animate-spin" />
                {bn ? "তৈরি হচ্ছে" : "Rendering"}
              </div>
            )}

            {/* Empty state watermark */}
            {!preview && !generating && (
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-30">
                <Eye className="w-16 h-16 text-silk-rose/40" />
              </div>
            )}
          </div>

          {/* ── Footer hint ── */}
          <div className="mt-4 shrink-0">
            {!hasPayload ? (
              <div className="flex items-center justify-center gap-2 p-3 rounded-xl bg-amber-500/10 border border-amber-500/25 text-[11px] font-bold text-amber-700 dark:text-amber-400">
                <ImageIcon className="w-3.5 h-3.5 shrink-0" />
                <span className="text-center leading-tight">
                  {bn
                    ? "বাম দিকে তথ্য লিখুন, QR দেখতে পাবেন"
                    : "Fill in the fields to see the QR"}
                </span>
              </div>
            ) : (
              <div className="flex items-center justify-center gap-2 p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/25 text-[11px] font-bold text-emerald-700 dark:text-emerald-400">
                <Eye className="w-3.5 h-3.5 shrink-0" />
                <span className="text-center leading-tight">
                  {bn
                    ? "প্রিভিউ রেডি — ডাউনলোড করুন"
                    : "Preview ready — download below"}
                </span>
              </div>
            )}
          </div>
        </div>
      )}
    </main>
  );
}
