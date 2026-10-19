import { Link } from "react-router-dom";
import { Zap, ArrowRight, AlertTriangle, CheckCircle2 } from "lucide-react";
import { formatBytes } from "../logic";

export function SmartInsights({ size, width, height }: { size: number, width: number, height: number }) {
  if (!size) return null;

  const isWebReady = size < 500 * 1024; // < 500KB
  const sizeStr = formatBytes(size);

  return (
    <div className="mt-4 mb-2 rounded-2xl border border-silk-rose/20 bg-gradient-to-br from-silk-rose/5 to-transparent p-5 shadow-sm">
      <div className="flex items-center gap-2 mb-3">
        <Zap className="w-5 h-5 text-silk-gold" />
        <h3 className="font-serif font-black text-lg text-light-text dark:text-dark-text">
          AHADEX Smart Insights
        </h3>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div className="flex items-start gap-3">
          {isWebReady ? (
            <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
          ) : (
            <AlertTriangle className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
          )}
          <div>
            <p className="text-sm font-bold text-light-text dark:text-dark-text">
              {isWebReady ? "Perfect for Web" : "Large File Size"}
            </p>
            <p className="text-xs text-light-textSecondary dark:text-dark-textSecondary mt-1">
              Your cropped image ({width}×{height}px) is {sizeStr}. {isWebReady ? "This is safe and fast for websites." : "Consider compressing it for faster page loads."}
            </p>
          </div>
        </div>

        {!isWebReady && (
          <Link to="/tools/image-compressor" className="shrink-0 inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-silk-rose/10 hover:bg-silk-rose/20 text-silk-rose text-xs font-bold transition-colors">
            Compress Image <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        )}
      </div>
    </div>
  );
}
