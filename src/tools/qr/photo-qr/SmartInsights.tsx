import { Zap, AlertTriangle, CheckCircle2 } from "lucide-react";

export function SmartInsights({ sizePercent }: { sizePercent: number }) {
  const isGoodSize = sizePercent >= 15;

  return (
    <div className="mt-4 mb-6 rounded-2xl border border-silk-rose/20 bg-gradient-to-br from-silk-rose/5 to-transparent p-5 shadow-sm max-w-4xl mx-auto w-full">
      <div className="flex items-center gap-2 mb-3">
        <Zap className="w-5 h-5 text-silk-gold" />
        <h3 className="font-serif font-black text-lg text-light-text dark:text-dark-text">
          AHADEX Smart Insights
        </h3>
      </div>

      <div className="flex items-start gap-3">
        {isGoodSize ? (
          <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
        ) : (
          <AlertTriangle className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
        )}
        <div>
          <p className="text-sm font-bold text-light-text dark:text-dark-text">
            {isGoodSize ? "Good Size for Scanning" : "QR Code is Too Small"}
          </p>
          <p className="text-xs text-light-textSecondary dark:text-dark-textSecondary mt-1">
            Your QR code covers {sizePercent}% of the image width. {isGoodSize 
              ? "This is perfect for printing and scanning from a normal distance." 
              : "If you print this, scanners might struggle. Try increasing the size to 15-20% or more for better reliability."}
          </p>
        </div>
      </div>
    </div>
  );
}
