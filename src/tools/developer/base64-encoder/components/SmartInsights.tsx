import { Zap, AlertTriangle, ShieldAlert } from "lucide-react";

export function SmartInsights({ mode, inputBytes, outputBytes, bn }: { mode: string, inputBytes: string, outputBytes: string, bn: boolean }) {
  if (inputBytes === "0 B" && outputBytes === "0 B") return null;

  const isEncoding = mode === "encode";

  return (
    <div className="mt-4 mb-2 rounded-2xl border border-amber-500/30 bg-amber-500/5 p-4 shadow-sm">
      <div className="flex items-center gap-2 mb-3">
        <Zap className="w-4 h-4 text-silk-gold" />
        <h3 className="font-serif font-black text-sm text-light-text dark:text-dark-text">
          AHADEX Smart Insights
        </h3>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div className="flex items-start gap-3">
          <AlertTriangle className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-bold text-light-text dark:text-dark-text">
              {isEncoding 
                ? (bn ? "সাইজ প্রায় ৩৩% বেড়ে যাবে" : "Size increases by ~33%") 
                : (bn ? "ডিকোডিং সফল" : "Decoding successful")}
            </p>
            <p className="text-xs text-light-textSecondary dark:text-dark-textSecondary mt-1 leading-relaxed">
              {isEncoding
                ? (bn 
                    ? `ইনপুট: ${inputBytes} ➔ আউটপুট: ${outputBytes}। Base64 এনকোডিং ডেটাকে টেক্সটে রূপান্তর করে, যা সাইজ বাড়িয়ে দেয়।`
                    : `Input: ${inputBytes} ➔ Output: ${outputBytes}. Base64 encodes binary data into text, which increases the size by ~33%.`)
                : (bn
                    ? `আপনার ডিকোড করা ডেটা সফলভাবে তৈরি হয়েছে।`
                    : `Your decoded data has been generated successfully.`)}
            </p>
          </div>
        </div>

        {isEncoding && (
          <div className="shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-red-500/10 border border-red-500/20">
            <ShieldAlert className="w-4 h-4 text-red-500" />
            <span className="text-[10px] font-bold text-red-600 dark:text-red-400 uppercase tracking-wider">
              {bn ? "এনক্রিপশন নয়" : "Not Encryption"}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
