import { Link } from "react-router-dom";
import { Zap, ArrowRight, CheckCircle2, AlertTriangle } from "lucide-react";

export function SmartInsights({ totalResized, width, height }: { totalResized: number, width: number, height: number }) {
  const sizeInMB = totalResized / (1024 * 1024);
  const isWebReady = totalResized < 500 * 1024; // under 500KB

  return (
    <div className="mt-6 rounded-2xl border border-silk-rose/20 bg-gradient-to-br from-silk-rose/5 to-transparent p-5 sm:p-6 shadow-sm">
      <div className="flex items-center gap-2 mb-4">
        <Zap className="w-5 h-5 text-silk-gold" />
        <h3 className="font-serif font-black text-lg text-light-text dark:text-dark-text">
          AHADEX Smart Insights
        </h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        {/* Dimension Insight */}
        <div className="bg-white/60 dark:bg-dark-surface/60 rounded-xl p-4 border border-silk-rose/10">
          <p className="text-xs uppercase tracking-wider font-bold text-light-textSecondary dark:text-dark-textSecondary mb-1">
            New Dimensions
          </p>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-black font-mono text-silk-rose">{width} × {height}</span>
            <span className="text-xs text-light-textSecondary dark:text-dark-textSecondary">pixels</span>
          </div>
          <p className="text-[11px] mt-2 text-light-textSecondary dark:text-dark-textSecondary leading-relaxed">
            Output size: <strong>{sizeInMB > 1 ? sizeInMB.toFixed(1) + " MB" : (totalResized / 1024).toFixed(0) + " KB"}</strong>
          </p>
        </div>

        {/* Suitability Insight */}
        <div className="bg-white/60 dark:bg-dark-surface/60 rounded-xl p-4 border border-silk-rose/10">
          <p className="text-xs uppercase tracking-wider font-bold text-light-textSecondary dark:text-dark-textSecondary mb-2">
            Web Performance Check
          </p>
          <div className="flex items-center gap-2 text-sm">
            {isWebReady ? (
              <>
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                <span className="text-light-text dark:text-dark-text">Size is good for Web.</span>
              </>
            ) : (
              <>
                <AlertTriangle className="w-4 h-4 text-amber-500 shrink-0" />
                <span className="text-amber-600 dark:text-amber-400">File size is a bit large for fast loading.</span>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Next Actions */}
      {!isWebReady && (
        <div>
          <p className="text-xs font-bold text-light-textSecondary dark:text-dark-textSecondary mb-2 uppercase tracking-wider">
            Recommended Next Step
          </p>
          <div className="flex flex-wrap gap-2">
            <Link to="/tools/image-compressor" className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-silk-rose/10 hover:bg-silk-rose/20 text-silk-rose text-xs font-bold transition-colors">
              Compress this Image <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
