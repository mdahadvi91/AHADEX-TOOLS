import { useState } from "react";
import { Printer, FileDown, Loader2, Info } from "lucide-react";
import { useLanguage } from "@contexts/LanguageContext";
import { cn } from "@lib/cn";
import type { CVData } from "../types";
import { triggerPrint } from "../logic/print";

interface ExportPanelProps {
  data: CVData;
}

export function ExportPanel({ data }: ExportPanelProps) {
  const { language } = useLanguage();
  const bn = language === "bn";
  const [busy, setBusy] = useState(false);

  const handleExport = () => {
    setBusy(true);
    try {
      triggerPrint(data.settings.pageSize);
    } finally {
      // Give the browser time to open the dialog
      setTimeout(() => setBusy(false), 1200);
    }
  };

  return (
    <div className="space-y-3">
      <div className="rounded-xl bg-white/70 dark:bg-dark-surface/70 backdrop-blur-xl border border-silk-rose/20 p-3 sm:p-4">
        <h3 className="text-[10px] uppercase tracking-[0.2em] font-semibold text-silk-wine/70 dark:text-silk-rose/60 mb-2">
          {bn ? "পেজ সাইজ" : "Page size"}
        </h3>
        <div className="grid grid-cols-2 gap-2">
          {(["A4", "Letter"] as const).map((s) => (
            <div
              key={s}
              className={cn(
                "py-2 rounded-lg border text-[11px] font-semibold text-center",
                data.settings.pageSize === s
                  ? "bg-silk-rose/15 border-silk-rose/50 text-silk-wine dark:text-silk-rose-soft"
                  : "bg-silk-rose/5 border-silk-rose/15 text-light-textSecondary dark:text-dark-textSecondary"
              )}
            >
              {s}
            </div>
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
          "disabled:opacity-50 disabled:cursor-not-allowed",
          "transition-all duration-300"
        )}
      >
        {busy ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" />
            <span>{bn ? "হচ্ছে..." : "Preparing..."}</span>
          </>
        ) : (
          <>
            <Printer className="w-4 h-4" />
            <span>{bn ? "প্রিন্ট / PDF" : "Print / Save as PDF"}</span>
          </>
        )}
      </button>

      <div className="flex items-start gap-2 p-3 rounded-xl bg-silk-rose/5 border border-silk-rose/15">
        <Info className="w-3.5 h-3.5 text-silk-rose shrink-0 mt-0.5" />
        <div className="text-[10px] text-light-textSecondary dark:text-dark-textSecondary leading-relaxed">
          {bn
            ? "প্রিন্ট ডায়ালগে 'Save as PDF' বেছে নিন। টেক্সট selectable থাকবে, ছবি নয়। মার্জিন ও পেজ ব্রেক নিখুঁত।"
            : "In the print dialog, choose 'Save as PDF'. Text stays selectable, page breaks are accurate, and margins match the print size."}
        </div>
      </div>

      <div className="text-[10px] text-light-textSecondary dark:text-dark-textSecondary flex items-center gap-1.5">
        <FileDown className="w-3 h-3" />
        {bn
          ? `আউটপুট: ${data.settings.pageSize} · টেক্সট selectable`
          : `Output: ${data.settings.pageSize} · selectable text`}
      </div>
    </div>
  );
}
