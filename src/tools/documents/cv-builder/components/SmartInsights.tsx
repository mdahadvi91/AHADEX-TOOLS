import { Link } from "react-router-dom";
import { Zap, AlertTriangle, CheckCircle2, ArrowRight } from "lucide-react";

export function SmartInsights({ photoDataUrl }: { photoDataUrl?: string | null }) {
  // If there is no photo, we don't need to show this warning
  if (!photoDataUrl) return null;

  // Calculate approximate size of base64 image in KB
  // Base64 string length is ~4/3 of the actual bytes.
  const base64Length = photoDataUrl.length;
  const sizeInBytes = (base64Length * 3) / 4;
  const sizeInKB = sizeInBytes / 1024;

  // If the photo is under 150KB, it's very safe.
  const isSafe = sizeInKB < 150;

  return (
    <div className={`mt-4 rounded-2xl border ${isSafe ? 'border-emerald-500/30 bg-emerald-500/5' : 'border-amber-500/30 bg-amber-500/5'} p-4 shadow-sm`}>
      <div className="flex items-center gap-2 mb-2">
        <Zap className={`w-4 h-4 ${isSafe ? 'text-emerald-500' : 'text-silk-gold'}`} />
        <h3 className="font-serif font-black text-sm text-light-text dark:text-dark-text">
          AHADEX Smart Insights
        </h3>
      </div>

      <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between">
        <div className="flex items-start gap-2">
          {isSafe ? (
            <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
          ) : (
            <AlertTriangle className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
          )}
          <div>
            <p className="text-xs font-bold text-light-text dark:text-dark-text">
              {isSafe ? "Photo size is perfect" : "Uploaded photo is quite large"}
            </p>
            <p className="text-[11px] text-light-textSecondary dark:text-dark-textSecondary mt-0.5">
              {isSafe 
                ? "Your PDF will be small and easy to upload to job portals." 
                : "This might make your PDF too large for some job portals (which often have a 2MB limit)."}
            </p>
          </div>
        </div>

        {!isSafe && (
          <Link to="/tools/image-compressor" className="shrink-0 inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-amber-500/10 hover:bg-amber-500/20 text-amber-600 dark:text-amber-400 text-[11px] font-bold transition-colors">
            Compress Photo <ArrowRight className="w-3 h-3" />
          </Link>
        )}
      </div>
    </div>
  );
}
