import { Link } from "react-router-dom";
import { Zap, ArrowRight, AlertTriangle, CheckCircle2 } from "lucide-react";
import { formatBytes } from "../logic";

export function SmartInsights({ totalSize }: { totalSize: number }) {
  const isEmailReady = totalSize < 20 * 1024 * 1024; // 20MB limit for email
  const sizeStr = formatBytes(totalSize);

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
          {isEmailReady ? (
            <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
          ) : (
            <AlertTriangle className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
          )}
          <div>
            <p className="text-sm font-bold text-light-text dark:text-dark-text">
              {isEmailReady ? "Ready for Email" : "Too large for Email"}
            </p>
            <p className="text-xs text-light-textSecondary dark:text-dark-textSecondary mt-1">
              Your combined PDF is {sizeStr}. {isEmailReady ? "This is safe to send via Gmail or Outlook." : "Most email providers block attachments over 20MB."}
            </p>
          </div>
        </div>

        {!isEmailReady && (
          <Link to="/tools/split-pdf" className="shrink-0 inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-silk-rose/10 hover:bg-silk-rose/20 text-silk-rose text-xs font-bold transition-colors">
            Split PDF Instead <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        )}
      </div>
    </div>
  );
}
