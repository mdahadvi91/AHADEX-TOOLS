import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Clock, Mic2, KeyRound, Trash2 } from "lucide-react";
import { useLanguage } from "@contexts/LanguageContext";
import { cn } from "@lib/cn";
import { TextPanel, WorkspacePanel } from "@components/workspace";
import { countStats, formatNumber, MAX_CHARS } from "../logic";

export function Workspace() {
  const { language } = useLanguage();
  const bn = language === "bn";

  const [text, setText] = useState("");
  const stats = useMemo(() => countStats(text), [text]);
  const overLimit = text.length > MAX_CHARS;

  const clearAll = () => {
    setText("");
    
  };

  return (
    <section className="pb-12 grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-4 lg:gap-5 items-start">
      {/* Editor */}
      <div className="space-y-4">
        <TextPanel
          label={bn ? "আপনার টেক্সট" : "Your text"}
          value={text}
          onChange={setText}
          placeholder={
            bn
              ? "এখানে আপনার টেক্সট পেস্ট বা টাইপ করুন..."
              : "Paste or type your text here..."
          }
          minHeight="min-h-[380px] sm:min-h-[480px]"
          mono={false}
          onClear={text.length > 0 ? clearAll : undefined}
          meta={
            text.length > 0
              ? `${formatNumber(text.length)} / ${formatNumber(MAX_CHARS)}`
              : undefined
          }
        >
          {overLimit && (
            <div className="mx-4 mb-4 px-3.5 py-2.5 rounded-lg text-[11px] font-bold text-red-600 dark:text-red-400 bg-red-500/10 border border-red-500/30">
              {bn
                ? `সর্বোচ্চ ${formatNumber(MAX_CHARS)} অক্ষর।`
                : `Max ${formatNumber(MAX_CHARS)} characters.`}
            </div>
          )}
        </TextPanel>
      </div>

      {/* Stats sidebar */}
      <aside className="space-y-3">
        {/* Primary counters */}
        <div className="grid grid-cols-2 gap-2.5">
          <BigStat
            label={bn ? "শব্দ" : "Words"}
            value={formatNumber(stats.words)}
            accent
          />
          <BigStat
            label={bn ? "অক্ষর" : "Characters"}
            value={formatNumber(stats.characters)}
            accent
          />
          <BigStat
            label={bn ? "স্পেস ছাড়া" : "No spaces"}
            value={formatNumber(stats.charactersNoSpaces)}
          />
          <BigStat
            label={bn ? "বাক্য" : "Sentences"}
            value={formatNumber(stats.sentences)}
          />
          <BigStat
            label={bn ? "অনুচ্ছেদ" : "Paragraphs"}
            value={formatNumber(stats.paragraphs)}
          />
          <BigStat
            label={bn ? "লাইন" : "Lines"}
            value={formatNumber(stats.lines)}
          />
        </div>

        {/* Time estimates */}
        <WorkspacePanel className="p-3.5 space-y-2.5" animate={false}>
          <div className="flex items-center gap-1.5 text-[10px] uppercase tracking-[0.2em] font-bold text-silk-wine/70 dark:text-silk-rose/60">
            <Clock className="w-3 h-3" />
            {bn ? "সময়" : "Time estimate"}
          </div>
          <div className="flex items-center justify-between text-[12px] text-light-text dark:text-dark-text">
            <span className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-silk-rose" />
              {bn ? "পড়া" : "Reading"}
            </span>
            <span className="font-mono font-bold">
              {stats.readingTimeMin} {bn ? "মিনিট" : "min"}
            </span>
          </div>
          <div className="flex items-center justify-between text-[12px] text-light-text dark:text-dark-text">
            <span className="flex items-center gap-1.5">
              <Mic2 className="w-3.5 h-3.5 text-silk-rose" />
              {bn ? "বলা" : "Speaking"}
            </span>
            <span className="font-mono font-bold">
              {stats.speakingTimeMin} {bn ? "মিনিট" : "min"}
            </span>
          </div>
        </WorkspacePanel>

        {/* Extra info */}
        <WorkspacePanel className="p-3.5 space-y-2.5" animate={false}>
          <div className="flex items-center justify-between text-[12px]">
            <span className="text-light-textSecondary dark:text-dark-textSecondary">
              {bn ? "গড় শব্দ-দৈর্ঘ্য" : "Avg word length"}
            </span>
            <span className="font-mono font-bold text-light-text dark:text-dark-text">
              {stats.avgWordLength.toFixed(1)}
            </span>
          </div>
          {stats.longestWord && (
            <div className="flex items-center justify-between gap-2 text-[12px]">
              <span className="text-light-textSecondary dark:text-dark-textSecondary">
                {bn ? "দীর্ঘতম শব্দ" : "Longest word"}
              </span>
              <span className="font-mono font-bold text-light-text dark:text-dark-text truncate max-w-[160px]">
                {stats.longestWord}
              </span>
            </div>
          )}
        </WorkspacePanel>

        {/* Keyword density */}
        {stats.keywordDensity.length > 0 && (
          <WorkspacePanel className="p-3.5 space-y-2.5" animate={false}>
            <div className="flex items-center gap-1.5 text-[10px] uppercase tracking-[0.2em] font-bold text-silk-wine/70 dark:text-silk-rose/60">
              <KeyRound className="w-3 h-3" />
              {bn ? "শীর্ষ কীওয়ার্ড" : "Top keywords"}
            </div>
            <div className="space-y-2">
              {stats.keywordDensity.map((k, i) => (
                <motion.div
                  key={k.word}
                  initial={{ opacity: 0, x: 8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: i * 0.04 }}
                  className="flex items-center gap-2 text-[11px]"
                >
                  <span className="flex-1 truncate text-light-text dark:text-dark-text font-medium">
                    {k.word}
                  </span>
                  <span className="font-mono text-light-textSecondary dark:text-dark-textSecondary shrink-0">
                    {k.count}
                  </span>
                  <span className="w-12 text-right font-mono font-bold text-silk-rose shrink-0">
                    {k.percent.toFixed(1)}%
                  </span>
                </motion.div>
              ))}
            </div>
          </WorkspacePanel>
        )}

        {/* Clear button mobile */}
        {text.length > 0 && (
          <button
            type="button"
            onClick={clearAll}
            className="lg:hidden w-full inline-flex items-center justify-center gap-2 h-11 rounded-xl text-[12px] font-bold text-red-600 dark:text-red-400 bg-red-500/10 border border-red-500/25 hover:bg-red-500/20 transition-all"
          >
            <Trash2 className="w-4 h-4" />
            {bn ? "সব মুছুন" : "Clear all"}
          </button>
        )}
      </aside>
    </section>
  );
}

function BigStat({
  label,
  value,
  accent = false,
}: {
  label: string;
  value: string;
  accent?: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      className={cn(
        "relative rounded-xl border p-2.5 sm:p-3 overflow-hidden",
        accent
          ? "bg-gradient-to-br from-silk-rose/15 via-silk-rose/8 to-silk-gold/10 border-silk-rose/35 shadow-[0_8px_20px_-10px_rgba(139,58,79,0.35)]"
          : "bg-white/70 dark:bg-dark-surface/70 backdrop-blur-xl border-silk-rose/20"
      )}
    >
      {accent && (
        <span
          aria-hidden="true"
          className="absolute -top-6 -right-6 w-16 h-16 rounded-full bg-silk-rose/20 blur-2xl pointer-events-none"
        />
      )}
      <p
        className={cn(
          "relative font-serif font-black text-lg sm:text-xl leading-none",
          accent ? "text-silk-rose" : "text-light-text dark:text-dark-text"
        )}
      >
        {value}
      </p>
      <p className="relative text-[9px] sm:text-[10px] uppercase tracking-[0.15em] font-bold text-light-textSecondary dark:text-dark-textSecondary mt-1.5">
        {label}
      </p>
    </motion.div>
  );
}
