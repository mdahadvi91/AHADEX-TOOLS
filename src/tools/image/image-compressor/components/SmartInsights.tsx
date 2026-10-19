import { Link } from "react-router-dom";
import { CheckCircle2, AlertTriangle, Zap, ArrowRight } from "lucide-react";
import type { CompressedFile } from "../types";

export function SmartInsights({ file }: { file: CompressedFile }) {
  // 1. Calculate metrics
  const savedBytes = file.originalSize - file.compressedSize;
  const savedMB = savedBytes / (1024 * 1024);
  
  // Estimate: Slow 4G is roughly 1.25 MB/s (10 Mbps)
  const timeSavedSeconds = savedMB / 1.25;
  const timeSaved = timeSavedSeconds > 0 ? timeSavedSeconds.toFixed(1) : "0";
  
  const format = file.compressedBlob.type.split("/")[1]?.toUpperCase() || "WEBP";

  // 2. Determine suitability
  const isEmailReady = file.compressedSize < 25 * 1024 * 1024; // Gmail limit 25MB
  const isWebReady = file.compressedSize < 500 * 1024; // < 500KB is great for web

  return (
    <div className="mt-6 rounded-2xl border border-silk-rose/20 bg-gradient-to-br from-silk-rose/5 to-transparent p-5 sm:p-6 shadow-sm">
      <div className="flex items-center gap-2 mb-4">
        <Zap className="w-5 h-5 text-silk-gold" />
        <h3 className="font-serif font-black text-lg text-light-text dark:text-dark-text">
          AHADEX Smart Insights
        </h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        {/* Performance Insight */}
        <div className="bg-white/60 dark:bg-dark-surface/60 rounded-xl p-4 border border-silk-rose/10">
          <p className="text-xs uppercase tracking-wider font-bold text-light-textSecondary dark:text-dark-textSecondary mb-1">
            Estimated Load Time Saved
          </p>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-black font-mono text-emerald-500">~{timeSaved}s</span>
            <span className="text-xs text-light-textSecondary dark:text-dark-textSecondary">on slow 4G</span>
          </div>
          <p className="text-[11px] mt-2 text-light-textSecondary dark:text-dark-textSecondary leading-relaxed">
            Output: <strong>{format}</strong> • {file.width} × {file.height} px
          </p>
        </div>

        {/* Suitability Insight */}
        <div className="bg-white/60 dark:bg-dark-surface/60 rounded-xl p-4 border border-silk-rose/10">
          <p className="text-xs uppercase tracking-wider font-bold text-light-textSecondary dark:text-dark-textSecondary mb-2">
            Suitability Check
          </p>
          <div className="space-y-1.5">
            <div className="flex items-center gap-2 text-sm">
              {isWebReady ? (
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
              ) : (
                <AlertTriangle className="w-4 h-4 text-amber-500 shrink-0" />
              )}
              <span className={isWebReady ? "text-light-text dark:text-dark-text" : "text-amber-600 dark:text-amber-400"}>
                {isWebReady ? "Perfect for Website" : "Still large for Web"}
              </span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              {isEmailReady ? (
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
              ) : (
                <AlertTriangle className="w-4 h-4 text-red-500 shrink-0" />
              )}
              <span className={isEmailReady ? "text-light-text dark:text-dark-text" : "text-red-600 dark:text-red-400"}>
                {isEmailReady ? "Good for Email" : "Too large for Email"}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Next Actions */}
      <div>
        <p className="text-xs font-bold text-light-textSecondary dark:text-dark-textSecondary mb-2 uppercase tracking-wider">
          Need it even smaller?
        </p>
        <div className="flex flex-wrap gap-2">
          <Link to="/tools/image-resizer" className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-silk-rose/10 hover:bg-silk-rose/20 text-silk-rose text-xs font-bold transition-colors">
            Resize Image <ArrowRight className="w-3 h-3" />
          </Link>
          <Link to="/tools/image-converter" className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-silk-rose/10 hover:bg-silk-rose/20 text-silk-rose text-xs font-bold transition-colors">
            Convert Format <ArrowRight className="w-3 h-3" />
          </Link>
        </div>
      </div>
    </div>
  );
}
