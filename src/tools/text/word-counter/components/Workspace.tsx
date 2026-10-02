import { useMemo, useState } from "react";
import { X, Type, Clock, Mic2, KeyRound } from "lucide-react";
import { useLanguage } from "@contexts/LanguageContext";
import { cn } from "@lib/cn";
import { countStats, formatNumber, MAX_CHARS } from "../logic";

export function Workspace() {
  const { language } = useLanguage();
  const bn = language === "bn";
  const [text, setText] = useState("");

  const stats = useMemo(() => countStats(text), [text]);
  const overLimit = text.length > MAX_CHARS;

  return (
    <section className="pb-12 grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-4 lg:gap-5 items-start">
      {/* Editor */}
      <div className="rounded-2xl bg-white/70 dark:bg-dark-surface/70 backdrop-blur-xl border border-silk-rose/20 overflow-hidden">
        <div className="flex items-center justify-between gap-2 px-4 py-2.5 border-b border-silk-rose/15">
          <div className="flex items-center gap-2 text-[11px] font-semibold text-light-text dark:text-dark-text">
            <Type className="w-3.5 h-3.5 text-silk-rose" />
            {bn ? "আপনার টেক্সট" : "Your text"}
          </div>
          {text.length > 0 && (
            <button type="button" onClick={() => setText("")} className="inline-flex items-center gap-1 text-[11px] text-red-500 hover:bg-red-500/10 px-2 py-1 rounded-md transition-colors">
              <X className="w-3 h-3" />
              {bn ? "মুছুন" : "Clear"}
            </button>
          )}
        </div>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder={bn ? "এখানে আপনার টেক্সট পেস্ট বা টাইপ করুন..." : "Paste or type your text here..."}
          spellCheck={false}
          className={cn(
            "w-full min-h-[380px] sm:min-h-[480px] p-4 resize-y",
            "bg-transparent text-[14px] sm:text-[15px] leading-relaxed",
            "text-light-text dark:text-dark-text",
            "placeholder:text-lightTextSecondary/50 dark:placeholder:text-darkTextSecondary/40",
            "outline-none"
          )}
        />
        {overLimit && (
          <div className="px-4 py-2 text-[11px] text-red-500 border-t border-red-500/20 bg-red-500/5">
            {bn ? `সর্বোচ্চ ${formatNumber(MAX_CHARS)} অক্ষর।` : `Max ${formatNumber(MAX_CHARS)} characters.`}
          </div>
        )}
      </div>

      {/* Stats */}
      <aside className="space-y-3">
        {/* Primary counters */}
        <div className="grid grid-cols-2 gap-2">
          <Stat label={bn ? "শব্দ" : "Words"} value={formatNumber(stats.words)} highlight />
          <Stat label={bn ? "অক্ষর" : "Characters"} value={formatNumber(stats.characters)} highlight />
          <Stat label={bn ? "স্পেস ছাড়া" : "No spaces"} value={formatNumber(stats.charactersNoSpaces)} />
          <Stat label={bn ? "বাক্য" : "Sentences"} value={formatNumber(stats.sentences)} />
          <Stat label={bn ? "অনুচ্ছেদ" : "Paragraphs"} value={formatNumber(stats.paragraphs)} />
          <Stat label={bn ? "লাইন" : "Lines"} value={formatNumber(stats.lines)} />
        </div>

        {/* Time estimates */}
        <div className="rounded-2xl bg-white/70 dark:bg-dark-surface/70 backdrop-blur-xl border border-silk-rose/20 p-3 space-y-2">
          <div className="flex items-center gap-1.5 text-[10px] uppercase tracking-wider font-semibold text-silk-wine/70 dark:text-silk-rose/60">
            <Clock className="w-3 h-3" />
            {bn ? "সময়" : "Time"}
          </div>
          <div className="flex items-center justify-between text-[12px] text-light-text dark:text-dark-text">
            <span className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5 text-silk-rose" />{bn ? "পড়া" : "Reading"}</span>
            <span className="font-mono font-semibold">{stats.readingTimeMin} {bn ? "মিনিট" : "min"}</span>
          </div>
          <div className="flex items-center justify-between text-[12px] text-light-text dark:text-dark-text">
            <span className="flex items-center gap-1.5"><Mic2 className="w-3.5 h-3.5 text-silk-rose" />{bn ? "বলা" : "Speaking"}</span>
            <span className="font-mono font-semibold">{stats.speakingTimeMin} {bn ? "মিনিট" : "min"}</span>
          </div>
        </div>

        {/* Extra info */}
        <div className="rounded-2xl bg-white/70 dark:bg-dark-surface/70 backdrop-blur-xl border border-silk-rose/20 p-3 space-y-2">
          <div className="flex items-center justify-between text-[12px]">
            <span className="text-lightTextSecondary dark:text-dark-textSecondary">{bn ? "গড় শব্দ-দৈর্ঘ্য" : "Avg word length"}</span>
            <span className="font-mono font-semibold text-light-text dark:text-dark-text">{stats.avgWordLength.toFixed(1)}</span>
          </div>
          {stats.longestWord && (
            <div className="flex items-center justify-between gap-2 text-[12px]">
              <span className="text-lightTextSecondary dark:text-dark-textSecondary">{bn ? "দীর্ঘতম শব্দ" : "Longest word"}</span>
              <span className="font-mono font-semibold text-light-text dark:text-dark-text truncate max-w-[160px]">{stats.longestWord}</span>
            </div>
          )}
        </div>

        {/* Keyword density */}
        {stats.keywordDensity.length > 0 && (
          <div className="rounded-2xl bg-white/70 dark:bg-dark-surface/70 backdrop-blur-xl border border-silk-rose/20 p-3 space-y-2">
            <div className="flex items-center gap-1.5 text-[10px] uppercase tracking-wider font-semibold text-silk-wine/70 dark:text-silk-rose/60">
              <KeyRound className="w-3 h-3" />
              {bn ? "শীর্ষ কীওয়ার্ড" : "Top keywords"}
            </div>
            <div className="space-y-1.5">
              {stats.keywordDensity.map((k) => (
                <div key={k.word} className="flex items-center gap-2 text-[11px]">
                  <span className="flex-1 truncate text-light-text dark:text-dark-text">{k.word}</span>
                  <span className="font-mono text-lightTextSecondary dark:text-dark-textSecondary">{k.count}</span>
                  <span className="w-12 text-right font-mono text-silk-rose">{k.percent.toFixed(1)}%</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </aside>
    </section>
  );
}

function Stat({ label, value, highlight = false }: { label: string; value: string; highlight?: boolean }) {
  return (
    <div className={cn("rounded-xl border p-2.5 sm:p-3", highlight ? "bg-gradient-to-br from-silk-rose/15 to-silk-gold/10 border-silk-rose/30" : "bg-white/70 dark:bg-dark-surface/70 backdrop-blur-xl border-silk-rose/20")}>
      <p className={cn("font-display font-black text-lg sm:text-xl leading-none", highlight ? "text-silk-rose" : "text-light-text dark:text-dark-text")}>{value}</p>
      <p className="text-[9px] sm:text-[10px] uppercase tracking-wider text-lightTextSecondary dark:text-dark-textSecondary mt-1">{label}</p>
    </div>
  );
}
