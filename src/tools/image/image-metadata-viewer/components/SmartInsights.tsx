import { Link } from "react-router-dom";
import { Zap, ArrowRight, ShieldAlert, ShieldCheck } from "lucide-react";

export function SmartInsights({ groups }: { groups: any[] }) {
  if (!groups || groups.length === 0) return null;

  // Check if GPS or Location data exists in the metadata
  const hasGps = groups.some((g) => 
    g.items?.some((i: any) => 
      (i.key && i.key.toLowerCase().match(/gps|location|latitude|longitude/)) ||
      (i.label && i.label.toLowerCase().match(/gps|location|latitude|longitude/))
    )
  );

  const hasExif = groups.length > 0; // If there are groups, it has metadata

  if (!hasExif) return null;

  return (
    <div className={`mt-6 mb-4 rounded-2xl border ${hasGps ? 'border-red-500/30 bg-red-500/5' : 'border-emerald-500/30 bg-emerald-500/5'} p-5 shadow-sm`}>
      <div className="flex items-center gap-2 mb-3">
        <Zap className={`w-5 h-5 ${hasGps ? 'text-red-500' : 'text-emerald-500'}`} />
        <h3 className="font-serif font-black text-lg text-light-text dark:text-dark-text">
          AHADEX Smart Privacy Insights
        </h3>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div className="flex items-start gap-3">
          {hasGps ? (
            <ShieldAlert className="w-6 h-6 text-red-500 shrink-0 mt-0.5" />
          ) : (
            <ShieldCheck className="w-6 h-6 text-emerald-500 shrink-0 mt-0.5" />
          )}
          <div>
            <p className={`text-sm font-bold ${hasGps ? 'text-red-600 dark:text-red-400' : 'text-emerald-600 dark:text-emerald-400'}`}>
              {hasGps ? "GPS Location Detected!" : "No GPS Data Found"}
            </p>
            <p className="text-xs text-light-textSecondary dark:text-dark-textSecondary mt-1">
              {hasGps 
                ? "This image contains your exact location (latitude/longitude). Sharing it publicly can reveal where you live or work." 
                : "This image does not contain GPS coordinates, but it might still have other camera metadata."}
            </p>
          </div>
        </div>

        {hasGps && (
          <Link to="/tools/image-compressor" className="shrink-0 inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-600 dark:text-red-400 text-xs font-bold transition-colors border border-red-500/20">
            Strip Metadata <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        )}
      </div>
    </div>
  );
}
