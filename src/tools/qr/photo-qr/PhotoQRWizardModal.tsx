import { useEffect, useMemo, useRef, useState } from "react";
import { ArrowLeft, ArrowRight, Download, Loader2, X } from "lucide-react";
import { useLanguage } from "@contexts/LanguageContext";
import { cn } from "@lib/cn";
import { getPlatform } from "./options";
import { composePhoto, generatePreview } from "./logic";
import { photoQrData } from "./data";
import { SettingsPanel } from "./SettingsPanel";
import { PreviewPanel } from "./PreviewPanel";
import type { Position, QrBackground } from "./types";

interface PhotoQRWizardModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function PhotoQRWizardModal({ isOpen, onClose }: PhotoQRWizardModalProps) {
  const { language } = useLanguage();
  const bn = language === "bn";
  const [step, setStep] = useState<1 | 2>(1);
  const [photoFile, setPhotoFile] = useState<File | null>(null);
  const [platformId, setPlatformId] = useState("whatsapp");
  const [values, setValues] = useState<Record<string, string>>({});
  const [position, setPosition] = useState<Position>("bottom-right");
  const [sizePercent, setSizePercent] = useState(20);
  const [padding, setPadding] = useState(10);
  const [qrBackground, setQrBackground] = useState<QrBackground>("rounded");
  const [preview, setPreview] = useState<string | null>(null);
  const [generating, setGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [downloading, setDownloading] = useState(false);
  const timerRef = useRef<number | null>(null);
  const requestRef = useRef(0);

  const platform = useMemo(() => getPlatform(platformId) ?? getPlatform("whatsapp")!, [platformId]);
  const payload = useMemo(() => {
    try { return platform.buildPayload(values).trim(); } catch { return ""; }
  }, [platform, values]);
  const canPreview = Boolean(photoFile && payload);

  useEffect(() => {
    if (isOpen) setStep(1);
  }, [isOpen]);

  useEffect(() => {
    const requestId = ++requestRef.current;
    if (timerRef.current !== null) {
      window.clearTimeout(timerRef.current);
      timerRef.current = null;
    }
    if (!isOpen || !photoFile || !payload) {
      setPreview(null);
      setGenerating(false);
      return;
    }
    setGenerating(true);
    timerRef.current = window.setTimeout(async () => {
      try {
        const nextPreview = await generatePreview({ photoFile, platform, values, position, sizePercent, padding, qrBackground });
        if (requestRef.current === requestId) {
          setPreview(nextPreview);
          setError(null);
        }
      } catch (cause) {
        if (requestRef.current === requestId) setError(cause instanceof Error ? cause.message : "Preview failed");
      } finally {
        if (requestRef.current === requestId) setGenerating(false);
      }
    }, 180);
    return () => {
      if (timerRef.current !== null) {
        window.clearTimeout(timerRef.current);
        timerRef.current = null;
      }
      if (requestRef.current === requestId) requestRef.current += 1;
    };
  }, [isOpen, photoFile, platform, values, position, sizePercent, padding, qrBackground, payload]);

  useEffect(() => {
    if (!isOpen) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        if (step === 2) setStep(1);
        else onClose();
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isOpen, step, onClose]);

  if (!isOpen) return null;

  const handleDownload = async () => {
    if (!photoFile || !payload || downloading) return;
    setDownloading(true);
    setError(null);
    try {
      const blob = await composePhoto({ photoFile, platform, values, position, sizePercent, padding, qrBackground });
      const url = URL.createObjectURL(blob);
      const anchor = document.createElement("a");
      anchor.href = url;
      anchor.download = `${photoQrData.slug}-${Date.now()}.png`;
      document.body.appendChild(anchor);
      anchor.click();
      anchor.remove();
      window.setTimeout(() => URL.revokeObjectURL(url), 1000);
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : "Download failed");
    } finally {
      setDownloading(false);
    }
  };

  const handlePlatformChange = (id: string) => {
    setPlatformId(id);
    setValues({});
    setError(null);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/65 backdrop-blur-sm sm:p-3" role="dialog" aria-modal="true" aria-labelledby="photoqr-wizard-title">
      <div className="flex h-full w-full flex-col overflow-hidden bg-light-bg dark:bg-dark-bg sm:h-auto sm:max-h-[96vh] sm:max-w-7xl sm:rounded-2xl sm:border sm:border-silk-rose/25 sm:shadow-2xl">
        <header className="flex shrink-0 items-center justify-between gap-3 border-b border-silk-rose/20 bg-white/90 px-4 py-3 dark:bg-dark-surface/90 sm:px-6">
          <div className="min-w-0">
            <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-silk-rose">{bn ? `ধাপ ${step}/2` : `STEP ${step}/2`}</p>
            <h2 id="photoqr-wizard-title" className="truncate text-base font-bold text-light-text dark:text-dark-text sm:text-lg">
              {step === 1 ? (bn ? "ছবি ও QR সম্পাদনা" : "Edit Photo QR") : (bn ? "লাইভ প্রিভিউ ও ডাউনলোড" : "Live Preview & Download")}
            </h2>
          </div>
          <button type="button" onClick={() => step === 2 ? setStep(1) : onClose()} className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-silk-rose/20 bg-silk-rose/5 text-light-text dark:text-dark-text" aria-label={step === 2 ? (bn ? "সম্পাদনায় ফিরে যান" : "Back to editing") : (bn ? "বন্ধ করুন" : "Close wizard")}>
            {step === 2 ? <ArrowLeft className="h-5 w-5" /> : <X className="h-5 w-5" />}
          </button>
        </header>

        <div className="min-h-0 flex-1 overflow-y-auto p-3 sm:p-5">
          {step === 1 ? (
            <div className="grid grid-cols-1 items-stretch gap-3 md:grid-cols-[minmax(280px,0.85fr)_minmax(0,1.15fr)] sm:gap-5">
              <SettingsPanel
                platformId={platformId}
                onPlatformChange={handlePlatformChange}
                values={values}
                onValueChange={(key, value) => setValues(current => ({ ...current, [key]: value }))}
                position={position}
                onPositionChange={setPosition}
                sizePercent={sizePercent}
                onSizeChange={setSizePercent}
                padding={padding}
                onPaddingChange={setPadding}
                qrBackground={qrBackground}
                onQrBackgroundChange={setQrBackground}
                onDownload={handleDownload}
                canDownload={canPreview}
                generating={generating || downloading}
                error={error}
              />
              <PreviewPanel
                photoFile={photoFile}
                onPhotoChange={file => { setPhotoFile(file); setError(null); }}
                onPhotoClear={() => { setPhotoFile(null); setPreview(null); setError(null); }}
                preview={preview}
                generating={generating}
                hasPayload={Boolean(payload)}
                platform={platform}
                onError={setError}
              />
            </div>
          ) : (
            <div className="mx-auto flex w-full max-w-4xl flex-col items-center gap-4">
              <div className={cn("relative flex min-h-[300px] w-full items-center justify-center overflow-hidden rounded-2xl border border-silk-rose/20 p-3 sm:min-h-[55vh] sm:p-6", "bg-[conic-gradient(at_top_left,_rgba(216,139,154,0.12)_25%,_transparent_25%_50%,_rgba(216,139,154,0.12)_50%_75%,_transparent_75%)] bg-[length:20px_20px]")}>
                {preview ? <img src={preview} alt={bn ? "ছবির QR কোডের লাইভ প্রিভিউ" : "Live preview of photo with QR code"} className={cn("max-h-[62vh] max-w-full object-contain shadow-lg", generating && "opacity-50")} /> : <p className="px-5 text-center text-sm text-light-textSecondary dark:text-dark-textSecondary">{bn ? "প্রিভিউ দেখতে ছবি ও প্রয়োজনীয় তথ্য যোগ করুন।" : "Upload a photo and complete the required details to see the preview."}</p>}
                {generating && <div className="absolute inset-0 flex items-center justify-center bg-white/55 backdrop-blur-[2px] dark:bg-black/35"><Loader2 className="h-8 w-8 animate-spin text-silk-rose" /></div>}
              </div>
              {error && <p role="alert" className="w-full rounded-xl border border-red-500/25 bg-red-500/10 p-3 text-sm text-red-600 dark:text-red-400">{error}</p>}
              <div className="flex w-full flex-col gap-3 sm:flex-row sm:justify-center">
                <button type="button" onClick={() => setStep(1)} className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border border-silk-rose/30 px-5 font-bold text-light-text transition hover:bg-silk-rose/5 dark:text-dark-text"><ArrowLeft className="h-4 w-4" />{bn ? "সম্পাদনায় ফিরে যান" : "Back to editing"}</button>
                <button type="button" onClick={handleDownload} disabled={!canPreview || generating || downloading} className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-silk-wine px-6 font-bold text-white shadow-lg transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50">{downloading ? <Loader2 className="h-5 w-5 animate-spin" /> : <Download className="h-5 w-5" />}{downloading ? (bn ? "তৈরি হচ্ছে..." : "Preparing PNG...") : (bn ? "PNG ডাউনলোড" : "Download PNG")}</button>
              </div>
              {!canPreview && <p className="text-center text-xs text-light-textSecondary dark:text-dark-textSecondary">{bn ? "আগে ছবি আপলোড করে QR-এর প্রয়োজনীয় তথ্য পূরণ করুন।" : "Upload a photo and fill in the required QR details first."}</p>}
            </div>
          )}
        </div>

        <footer className="flex shrink-0 items-center justify-between gap-3 border-t border-silk-rose/20 bg-white/90 px-4 py-3 dark:bg-dark-surface/90 sm:px-6">
          <span className="text-xs text-light-textSecondary dark:text-dark-textSecondary">{step === 1 ? (bn ? "১. সম্পাদনা" : "1. Edit") : (bn ? "২. প্রিভিউ" : "2. Preview")}</span>
          {step === 1 ? (
            <button type="button" onClick={() => setStep(2)} disabled={!canPreview} className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-silk-wine px-5 font-bold text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50">{bn ? "প্রিভিউ দেখুন" : "Review preview"}<ArrowRight className="h-4 w-4" /></button>
          ) : (
            <button type="button" onClick={onClose} className="rounded-xl px-4 py-2 font-semibold text-light-textSecondary transition hover:bg-silk-rose/10 dark:text-dark-textSecondary">{bn ? "বন্ধ করুন" : "Close"}</button>
          )}
        </footer>
      </div>
    </div>
  );
}
