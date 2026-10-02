import { useState } from "react";
import { Download, Loader2 } from "lucide-react";
import { useLanguage } from "@contexts/LanguageContext";
import { cn } from "@lib/cn";
import type { ExportFormat, ExportDPI } from "../../types";
import { getCardSizeFromId } from "../../shared/sizes";
import type { CardSizeId, Template, UserData } from "../../types";
import { renderSide } from "../../shared/renderer";
import { downloadBlob, canvasToPngBlob, canvasToJpgBlob } from "../../shared/export";

interface ExportPanelProps {
  template: Template;
  sizeId: CardSizeId;
  userData: UserData;
}

const FORMATS: { id: ExportFormat; label: string }[] = [
  { id: "png", label: "PNG" },
  { id: "jpg", label: "JPG" },
];

const DPIS: ExportDPI[] = [150, 300, 600];

export function ExportPanel({
  template,
  sizeId,
  userData,
}: ExportPanelProps) {
  const { language } = useLanguage();
  const [format, setFormat] = useState<ExportFormat>("png");
  const [dpi, setDpi] = useState<ExportDPI>(300);
  const [busy, setBusy] = useState(false);

  const handleExport = async () => {
    setBusy(true);
    try {
      const size = getCardSizeFromId(sizeId);
      // DPI scale — baseline assumed 300
      const dpiScale = dpi / 300;

      for (const side of ["front", "back"] as const) {
        const canvas = document.createElement("canvas");
        canvas.width = Math.round(size.widthPx * dpiScale);
        canvas.height = Math.round(size.heightPx * dpiScale);
        const ctx = canvas.getContext("2d");
        if (!ctx) continue;

        // Draw at scaled dimensions
        ctx.save();
        ctx.scale(dpiScale, dpiScale);
        await renderSide({
          ctx,
          template,
          side,
          userData,
          W: size.widthPx,
          H: size.heightPx,
        });
        ctx.restore();

        const blob =
          format === "png"
            ? await canvasToPngBlob(canvas)
            : await canvasToJpgBlob(canvas);

        downloadBlob(blob, `${template.id}-${side}-${dpi}dpi.${format}`);
        await new Promise((r) => setTimeout(r, 350));
      }
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-[11px] uppercase tracking-[0.2em] text-silk-wine/70 dark:text-silk-rose/60 font-semibold mb-2">
          {language === "bn" ? "ফরম্যাট" : "Format"}
        </h3>
        <div className="grid grid-cols-2 gap-2">
          {FORMATS.map((f) => (
            <button
              key={f.id}
              type="button"
              onClick={() => setFormat(f.id)}
              className={cn(
                "py-2 rounded-lg border text-[11px] font-semibold transition-all",
                format === f.id
                  ? "bg-silk-rose/15 border-silk-rose/50 text-silk-wine dark:text-silk-rose-soft"
                  : "bg-silk-rose/5 border-silk-rose/15 text-light-textSecondary dark:text-dark-textSecondary hover:border-silk-rose/40"
              )}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-[11px] uppercase tracking-[0.2em] text-silk-wine/70 dark:text-silk-rose/60 font-semibold mb-2">
          {language === "bn" ? "প্রিন্ট কোয়ালিটি" : "Print quality"}
        </h3>
        <div className="grid grid-cols-3 gap-2">
          {DPIS.map((d) => (
            <button
              key={d}
              type="button"
              onClick={() => setDpi(d)}
              className={cn(
                "py-2 rounded-lg border text-[11px] font-medium transition-all",
                dpi === d
                  ? "bg-silk-rose/15 border-silk-rose/50 text-silk-wine dark:text-silk-rose-soft"
                  : "bg-silk-rose/5 border-silk-rose/15 text-light-textSecondary dark:text-dark-textSecondary hover:border-silk-rose/40"
              )}
            >
              {d} DPI
            </button>
          ))}
        </div>
      </div>

      <button
        type="button"
        onClick={handleExport}
        disabled={busy}
        className={cn(
          "w-full inline-flex items-center justify-center gap-2 h-11 rounded-full",
          "bg-gradient-to-r from-silk-rose to-silk-wine-deep text-white font-medium text-sm",
          "shadow-silk-medium hover:shadow-silk-deep",
          "disabled:opacity-40 disabled:cursor-not-allowed",
          "transition-all duration-300"
        )}
      >
        {busy ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" />
            <span>{language === "bn" ? "তৈরি হচ্ছে..." : "Generating..."}</span>
          </>
        ) : (
          <>
            <Download className="w-4 h-4" />
            <span>
              {language === "bn"
                ? `ডাউনলোড ${format.toUpperCase()}`
                : `Download ${format.toUpperCase()}`}
            </span>
          </>
        )}
      </button>

      <p className="text-[10px] text-light-textSecondary dark:text-dark-textSecondary leading-relaxed">
        {language === "bn"
          ? "সামনে ও পিছনে আলাদা ফাইল ডাউনলোড হবে।"
          : "Front and back export as separate files."}
      </p>
    </div>
  );
}
