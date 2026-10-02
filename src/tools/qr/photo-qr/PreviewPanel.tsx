import { X, Loader2 } from "lucide-react";
import { useLanguage } from "@contexts/LanguageContext";
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
  const PlatformIcon = platform.Icon;

  return (
    <main className="flex flex-col rounded-2xl sm:rounded-3xl bg-white/70 dark:bg-dark-surface/70 backdrop-blur-xl border border-silk-rose/20 overflow-hidden">
      {!photoFile ? (
        <UploadZone onPhotoChange={onPhotoChange} onError={onError} />
      ) : (
        <div className="p-3 sm:p-5 lg:p-6 h-full flex flex-col">
          {/* Header */}
          <div className="flex items-center justify-between mb-3 sm:mb-4 shrink-0">
            <div className="flex items-center gap-2 min-w-0">
              <PlatformIcon
                size={16}
                color={platform.color}
                className="shrink-0"
              />
              <p className="text-[11px] sm:text-xs uppercase tracking-[0.15em] text-silk-wine/70 dark:text-silk-rose/60 font-semibold truncate">
                {language === "bn" ? "প্রিভিউ" : "Preview"}
              </p>
            </div>
            <button
              type="button"
              onClick={onPhotoClear}
              className="inline-flex items-center gap-1 text-[11px] sm:text-xs text-silk-rose hover:text-silk-wine transition-colors shrink-0"
            >
              <X className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">
                {language === "bn" ? "ছবি বদলান" : "Change photo"}
              </span>
              <span className="sm:hidden">
                {language === "bn" ? "বদলান" : "Change"}
              </span>
            </button>
          </div>

          {/* Preview Area */}
          <div className="relative flex-1 rounded-xl sm:rounded-2xl overflow-hidden bg-dark-surface/30 flex items-center justify-center min-h-[240px] sm:min-h-[420px]">
            {preview ? (
              <img
                src={preview}
                alt="Preview"
                className="max-w-full max-h-[420px] sm:max-h-[600px] object-contain"
              />
            ) : (
              <div className="flex flex-col items-center gap-2 sm:gap-3 py-10 text-light-textSecondary dark:text-dark-textSecondary">
                <Loader2 className="w-5 h-5 sm:w-6 sm:h-6 animate-spin text-silk-rose" />
                <p className="text-[11px] sm:text-xs">
                  {language === "bn"
                    ? "তৈরি হচ্ছে..."
                    : "Generating preview..."}
                </p>
              </div>
            )}

            {generating && preview && (
              <div className="absolute top-2 right-2 sm:top-3 sm:right-3 px-2.5 py-1.5 rounded-full bg-silk-rose/90 text-white text-[10px] sm:text-xs font-medium flex items-center gap-1.5">
                <Loader2 className="w-3 h-3 animate-spin" />
              </div>
            )}
          </div>

          {/* Hint when no payload */}
          {!hasPayload && (
            <p className="mt-3 text-[11px] sm:text-xs text-center text-light-textSecondary dark:text-dark-textSecondary leading-tight shrink-0">
              {language === "bn"
                ? "বাম দিকে তথ্য লিখুন, QR দেখতে পাবেন"
                : "Fill in the fields to see the QR"}
            </p>
          )}
        </div>
      )}
    </main>
  );
}
