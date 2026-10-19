import { Link } from "react-router-dom";
import { Zap, AlertTriangle, CheckCircle2, ArrowRight, FileImage } from "lucide-react";

export function SmartInsights({ textLength, wordCount }: { textLength: number, wordCount: number }) {
  // If no text or very little text is found, it's likely a scanned PDF
  const isScanned = textLength < 20;

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
          {isScanned ? (
            <AlertTriangle className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
          ) : (
            <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
          )}
          <div>
            <p className="text-sm font-bold text-light-text dark:text-dark-text">
              {isScanned ? "Scanned PDF Detected" : "Extraction Successful"}
            </p>
            <p className="text-xs text-light-textSecondary dark:text-dark-textSecondary mt-1">
              {isScanned 
                ? "We couldn't find a digital text layer in this PDF. It is likely a scanned image or photo." 
                : `Successfully extracted ${wordCount.toLocaleString()} words and ${textLength.toLocaleString()} characters.`}
            </p>
          </div>
        </div>

        {isScanned && (
          <Link to="/tools/pdf-to-image" className="shrink-0 inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-silk-rose/10 hover:bg-silk-rose/20 text-silk-rose text-xs font-bold transition-colors">
            <FileImage className="w-3.5 h-3.5" />
            Convert to Images <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        )}
      </div>
    </div>
  );
}
