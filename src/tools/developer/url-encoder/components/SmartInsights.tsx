import { Zap, AlertTriangle, CheckCircle2 } from "lucide-react";

export function SmartInsights({ mode, inputBytes, outputBytes, outputLength, bn }: { mode: string, inputBytes: string, outputBytes: string, outputLength: number, bn: boolean }) {
  if (!outputLength) return null;

  const isTooLong = outputLength > 2000;

  if (isTooLong) {
    return (
      <div className="mt-4 mb-2 rounded-2xl border border-amber-500/30 bg-amber-500/5 p-4 shadow-sm">
        <div className="flex items-center gap-2 mb-3">
          <Zap className="w-4 h-4 text-silk-gold" />
          <h3 className="font-serif font-black text-sm text-light-text dark:text-dark-text">
            AHADEX Smart Insights
          </h3>
        </div>
        <div className="flex items-start gap-3">
          <AlertTriangle className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-bold text-light-text dark:text-dark-text">
              {bn ? "URL খুব বড় হয়ে গেছে" : "URL is Too Long"}
            </p>
            <p className="text-xs text-light-textSecondary dark:text-dark-textSecondary mt-1 leading-relaxed">
              {bn
                ? `আপনার আউটপুট ${outputLength} অক্ষরের। ব্রাউজার এবং সার্ভার সাধারণত ২০০০ অক্ষরের বেশি সমর্থন করে না। দয়া করে ইনপুট ছোট করুন।`
                : `Your output is ${outputLength} characters long. Browsers and servers typically limit URLs to ~2000 characters. Please shorten your input.`}
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="mt-4 mb-2 rounded-2xl border border-emerald-500/30 bg-emerald-500/5 p-4 shadow-sm">
      <div className="flex items-center gap-2 mb-3">
        <Zap className="w-4 h-4 text-silk-gold" />
        <h3 className="font-serif font-black text-sm text-light-text dark:text-dark-text">
          AHADEX Smart Insights
        </h3>
      </div>
      <div className="flex items-start gap-3">
        <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
        <div>
          <p className="text-sm font-bold text-light-text dark:text-dark-text">
            {mode === "encode" ? (bn ? "এনকোডিং সফল" : "Encoding Successful") : (bn ? "ডিকোডিং সফল" : "Decoding Successful")}
          </p>
          <p className="text-xs text-light-textSecondary dark:text-dark-textSecondary mt-1 leading-relaxed">
            {mode === "encode"
              ? (bn
                  ? `ইনপুট সাইজ ${inputBytes} থেকে আউটপুট ${outputBytes} হয়েছে।` 
                  : `Input size went from ${inputBytes} to ${outputBytes} (${outputLength} characters).`)
              : (bn
                  ? `আপনার ডিকোড করা ডেটা সফলভাবে তৈরি হয়েছে।`
                  : `Your decoded data has been generated successfully.`)}
          </p>
        </div>
      </div>
    </div>
  );
}
