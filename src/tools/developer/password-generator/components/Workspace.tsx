import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  RefreshCw,
  Copy,
  ClipboardCheck,
  Download,
  Eye,
  EyeOff,
  Trash2,
  KeyRound,
} from "lucide-react";
import { useLanguage } from "@contexts/LanguageContext";
import { useSound } from "@contexts/SoundContext";
import { cn } from "@lib/cn";
import {
  WorkspacePanel,
  ToolButton,
  ResultStat,
} from "@components/workspace";
import {
  generateBatch,
  copyText,
  downloadText,
  DEFAULT_OPTIONS,
  MIN_LENGTH,
  MAX_LENGTH,
  MAX_BATCH,
} from "../logic";
import type { PasswordOptions, GeneratedPassword } from "../types";

export function Workspace() {
  const { language } = useLanguage();
  const { play } = useSound();
  const bn = language === "bn";

  const [opts, setOpts] = useState<PasswordOptions>(DEFAULT_OPTIONS);
  const [batch, setBatch] = useState(5);
  const [passwords, setPasswords] = useState<GeneratedPassword[]>([]);
  const [showAll, setShowAll] = useState(true);
  const [shownIds, setShownIds] = useState<Set<string>>(new Set());
  const [copiedAll, setCopiedAll] = useState(false);
  const [copiedOne, setCopiedOne] = useState<string | null>(null);

  useEffect(() => {
    setPasswords(generateBatch(opts, batch));
  }, [opts, batch]);

  const regenerate = () => {
    setPasswords(generateBatch(opts, batch));
    play("success");
  };

  const handleCopyOne = async (p: GeneratedPassword) => {
    try {
      await copyText(p.value);
      setCopiedOne(p.id);
      play("click");
      setTimeout(() => setCopiedOne(null), 1500);
    } catch {
      /* ignore */
    }
  };

  const handleCopyAll = async () => {
    try {
      await copyText(passwords.map((p) => p.value).join("\n"));
      setCopiedAll(true);
      play("success");
      setTimeout(() => setCopiedAll(false), 2000);
    } catch {
      /* ignore */
    }
  };

  const handleDownload = () => {
    downloadText(
      passwords.map((p) => p.value).join("\n"),
      "passwords.txt"
    );
  };

  const clearAll = () => setPasswords([]);

  const toggleSet = (key: keyof PasswordOptions) => {
    setOpts((p) => ({ ...p, [key]: !p[key] }));
  };

  const toggleShow = (id: string) => {
    setShownIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const noSetsSelected =
    !opts.lowercase && !opts.uppercase && !opts.numbers && !opts.symbols;

  const sets: {
    key: keyof PasswordOptions;
    label: string;
    labelBn: string;
  }[] = [
    { key: "lowercase", label: "abc", labelBn: "abc" },
    { key: "uppercase", label: "ABC", labelBn: "ABC" },
    { key: "numbers", label: "123", labelBn: "123" },
    { key: "symbols", label: "!@#", labelBn: "!@#" },
  ];

  return (
    <section className="pb-12 space-y-4 sm:space-y-5">
      {/* Controls */}
      <WorkspacePanel className="p-4 space-y-4">
        {/* Length slider */}
        <div>
          <div className="flex items-center justify-between mb-2.5">
            <label className="text-[11px] font-bold uppercase tracking-wider text-light-textSecondary dark:text-dark-textSecondary">
              {bn ? "দৈর্ঘ্য" : "Length"}
            </label>
            <span className="text-[13px] font-mono font-bold text-silk-rose bg-silk-rose/10 px-2.5 py-0.5 rounded-md">
              {opts.length}
            </span>
          </div>
          <input
            type="range"
            min={MIN_LENGTH}
            max={MAX_LENGTH}
            step={1}
            value={opts.length}
            onChange={(e) =>
              setOpts((p) => ({ ...p, length: parseInt(e.target.value) }))
            }
            className="w-full accent-silk-rose cursor-pointer"
          />
          <div className="flex justify-between text-[9px] text-light-textSecondary dark:text-dark-textSecondary mt-1 font-mono">
            <span>{MIN_LENGTH}</span>
            <span>{MAX_LENGTH}</span>
          </div>
        </div>

        {/* Character sets */}
        <div>
          <p className="text-[10px] uppercase tracking-[0.2em] font-bold text-silk-wine/70 dark:text-silk-rose/60 mb-2.5">
            {bn ? "ক্যারেক্টার সেট" : "Character sets"}
          </p>
          <div className="grid grid-cols-4 gap-2">
            {sets.map((s) => (
              <button
                key={s.key}
                type="button"
                onClick={() => toggleSet(s.key)}
                className={cn(
                  "h-11 rounded-xl border text-[13px] font-mono font-bold transition-all",
                  opts[s.key]
                    ? "bg-silk-rose/15 border-silk-rose/50 text-silk-wine dark:text-silk-rose-soft shadow-[0_6px_16px_-8px_rgba(139,58,79,0.35)]"
                    : "bg-silk-rose/5 border-silk-rose/15 text-light-textSecondary dark:text-dark-textSecondary hover:border-silk-rose/40"
                )}
              >
                {bn ? s.labelBn : s.label}
              </button>
            ))}
          </div>
        </div>

        {/* Batch + Options */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div>
            <p className="text-[10px] uppercase tracking-[0.2em] font-bold text-silk-wine/70 dark:text-silk-rose/60 mb-2.5">
              {bn ? `ব্যাচ (1-${MAX_BATCH})` : `Batch (1-${MAX_BATCH})`}
            </p>
            <input
              type="number"
              min={1}
              max={MAX_BATCH}
              value={batch}
              onChange={(e) =>
                setBatch(
                  Math.max(
                    1,
                    Math.min(MAX_BATCH, parseInt(e.target.value) || 1)
                  )
                )
              }
              className="w-full h-10 px-3 rounded-xl text-[13px] font-mono font-bold bg-white/80 dark:bg-dark-surface/80 border border-silk-rose/20 focus:border-silk-rose/50 text-light-text dark:text-dark-text outline-none transition-all"
            />
          </div>

          <div>
            <p className="text-[10px] uppercase tracking-[0.2em] font-bold text-silk-wine/70 dark:text-silk-rose/60 mb-2.5">
              {bn ? "অ্যাম্বিগুইটি" : "Ambiguity"}
            </p>
            <button
              type="button"
              onClick={() =>
                setOpts((p) => ({
                  ...p,
                  excludeAmbiguous: !p.excludeAmbiguous,
                }))
              }
              className={cn(
                "h-10 w-full rounded-xl border text-[11px] font-bold transition-all",
                opts.excludeAmbiguous
                  ? "bg-silk-rose/15 border-silk-rose/50 text-silk-wine dark:text-silk-rose-soft"
                  : "bg-silk-rose/5 border-silk-rose/15 text-light-textSecondary dark:text-dark-textSecondary hover:border-silk-rose/40"
              )}
            >
              {opts.excludeAmbiguous
                ? bn
                  ? "বাদ দেওয়া"
                  : "Excluded"
                : bn
                  ? "রাখা"
                  : "Included"}
            </button>
          </div>

          <div>
            <p className="text-[10px] uppercase tracking-[0.2em] font-bold text-silk-wine/70 dark:text-silk-rose/60 mb-2.5">
              {bn ? "প্রতিটি চাই" : "Require each"}
            </p>
            <button
              type="button"
              onClick={() =>
                setOpts((p) => ({ ...p, requireEach: !p.requireEach }))
              }
              className={cn(
                "h-10 w-full rounded-xl border text-[11px] font-bold transition-all",
                opts.requireEach
                  ? "bg-silk-rose/15 border-silk-rose/50 text-silk-wine dark:text-silk-rose-soft"
                  : "bg-silk-rose/5 border-silk-rose/15 text-light-textSecondary dark:text-dark-textSecondary hover:border-silk-rose/40"
              )}
            >
              {opts.requireEach
                ? bn
                  ? "চালু"
                  : "Enabled"
                : bn
                  ? "বন্ধ"
                  : "Disabled"}
            </button>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2 flex-wrap pt-2 border-t border-silk-rose/10">
          <ToolButton
            variant="primary"
            icon={<RefreshCw className="w-3.5 h-3.5" />}
            onClick={regenerate}
            disabled={noSetsSelected}
          >
            {bn ? "রিজেনারেট" : "Regenerate"}
          </ToolButton>

          <ToolButton
            variant="secondary"
            size="md"
            icon={
              showAll ? (
                <EyeOff className="w-3.5 h-3.5" />
              ) : (
                <Eye className="w-3.5 h-3.5" />
              )
            }
            onClick={() => setShowAll((v) => !v)}
          >
            {showAll
              ? bn
                ? "লুকান"
                : "Hide"
              : bn
                ? "দেখান"
                : "Show"}
          </ToolButton>

          {passwords.length > 0 && (
            <>
              <ToolButton
                variant="secondary"
                icon={
                  copiedAll ? (
                    <ClipboardCheck className="w-3.5 h-3.5" />
                  ) : (
                    <Copy className="w-3.5 h-3.5" />
                  )
                }
                onClick={() => void handleCopyAll()}
              >
                {copiedAll
                  ? bn
                    ? "কপি হয়েছে"
                    : "Copied"
                  : bn
                    ? "সব কপি"
                    : "Copy all"}
              </ToolButton>

              <ToolButton
                variant="primary"
                icon={<Download className="w-3.5 h-3.5" />}
                onClick={handleDownload}
              >
                .txt
              </ToolButton>

              <ToolButton
                variant="danger"
                icon={<Trash2 className="w-3.5 h-3.5" />}
                onClick={clearAll}
                className="ml-auto"
              >
                {bn ? "মুছুন" : "Clear"}
              </ToolButton>
            </>
          )}
        </div>

        {noSetsSelected && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-[12px] text-red-600 dark:text-red-400 font-medium"
          >
            {bn
              ? "অন্তত একটি character set নির্বাচন করুন।"
              : "Select at least one character set."}
          </motion.div>
        )}
      </WorkspacePanel>

      {/* Passwords list */}
      {passwords.length > 0 && (
        <>
          <div className="grid grid-cols-3 gap-2.5 sm:gap-3">
            <ResultStat
              label={bn ? "সংখ্যা" : "Count"}
              value={String(passwords.length)}
              accent="rose"
            />
            <ResultStat
              label={bn ? "দৈর্ঘ্য" : "Length"}
              value={String(opts.length)}
              accent="rose"
            />
            <ResultStat
              label={bn ? "স্ট্রেংথ" : "Strength"}
              value={
                passwords[0]?.strength.label ||
                (bn ? "শক্তিশালী" : "Strong")
              }
              accent="emerald"
            />
          </div>

          <WorkspacePanel className="overflow-hidden" animate={false}>
            <div className="px-4 py-2.5 border-b border-silk-rose/15 flex items-center justify-between">
              <span className="text-[11px] font-bold uppercase tracking-wider text-light-text dark:text-dark-text">
                {passwords.length}{" "}
                {passwords.length === 1 ? "password" : "passwords"}
              </span>
              <span className="text-[10px] font-mono text-light-textSecondary dark:text-dark-textSecondary">
                {opts.length} chars
              </span>
            </div>

            <ul className="divide-y divide-silk-rose/10 max-h-[560px] overflow-y-auto">
              {passwords.map((p) => {
                const visible = showAll || shownIds.has(p.id);
                const isCopied = copiedOne === p.id;
                return (
                  <li key={p.id} className="p-3 sm:p-4 space-y-2">
                    <div className="flex items-center gap-2">
                      <code
                        className={cn(
                          "flex-1 min-w-0 text-[12px] sm:text-[13px] font-mono font-bold text-light-text dark:text-dark-text break-all",
                          !visible && "blur-[5px] select-none"
                        )}
                      >
                        {p.value}
                      </code>
                      <button
                        type="button"
                        onClick={() => toggleShow(p.id)}
                        aria-label="Toggle visibility"
                        className="shrink-0 w-8 h-8 rounded-lg flex items-center justify-center text-silk-rose bg-silk-rose/5 border border-silk-rose/15 hover:bg-silk-rose/15 transition-colors"
                      >
                        {visible ? (
                          <EyeOff className="w-3.5 h-3.5" />
                        ) : (
                          <Eye className="w-3.5 h-3.5" />
                        )}
                      </button>
                      <button
                        type="button"
                        onClick={() => void handleCopyOne(p)}
                        aria-label="Copy"
                        className="shrink-0 w-8 h-8 rounded-lg flex items-center justify-center text-silk-rose bg-silk-rose/5 border border-silk-rose/15 hover:bg-silk-rose/15 transition-colors"
                      >
                        {isCopied ? (
                          <ClipboardCheck className="w-3.5 h-3.5" />
                        ) : (
                          <Copy className="w-3.5 h-3.5" />
                        )}
                      </button>
                    </div>

                    <div className="flex items-center gap-2 flex-wrap">
                      <div className="flex-1 h-1.5 rounded-full bg-silk-rose/10 overflow-hidden min-w-[80px]">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{
                            width: `${((p.strength.score + 1) / 5) * 100}%`,
                          }}
                          transition={{ duration: 0.6, ease: "easeOut" }}
                          className="h-full rounded-full"
                          style={{ backgroundColor: p.strength.color }}
                        />
                      </div>
                      <span
                        className="text-[10px] font-bold"
                        style={{ color: p.strength.color }}
                      >
                        {bn ? p.strength.labelBn : p.strength.label}
                      </span>
                      <span className="text-[10px] text-light-textSecondary dark:text-dark-textSecondary font-mono">
                        {p.strength.entropy} bits
                      </span>
                      <span className="text-[10px] text-light-textSecondary dark:text-dark-textSecondary">
                        ·{" "}
                        {bn
                          ? p.strength.crackTimeBn
                          : p.strength.crackTime}
                      </span>
                    </div>
                  </li>
                );
              })}
            </ul>
          </WorkspacePanel>
        </>
      )}

      {passwords.length === 0 && !noSetsSelected && (
        <div className="flex items-center justify-center gap-2 text-[11px] sm:text-xs text-light-textSecondary dark:text-dark-textSecondary">
          <KeyRound className="w-3.5 h-3.5 text-silk-rose" />
          {bn ? "রিজেনারেট চেপে শুরু করুন" : "Click Regenerate to start"}
        </div>
      )}
    </section>
  );
}
