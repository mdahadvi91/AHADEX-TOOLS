import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowLeftRight,
  AlertCircle,
  Sparkles,
} from "lucide-react";
import { useLanguage } from "@contexts/LanguageContext";
import { useSound } from "@contexts/SoundContext";
import { cn } from "@lib/cn";
import { TextPanel, ToolButton, WorkspacePanel } from "@components/workspace";
import { transform, formatBytes, SAMPLES } from "../logic";
import type { Mode, Scope } from "../types";

export function Workspace() {
  const { language } = useLanguage();
  const { play } = useSound();
  const bn = language === "bn";

  const [input, setInput] = useState("");
  const [mode, setMode] = useState<Mode>("encode");
  const [scope, setScope] = useState<Scope>("component");
  const [copied, setCopied] = useState(false);

  const result = useMemo(
    () => transform(input, mode, scope),
    [input, mode, scope]
  );

  const handleCopy = async () => {
    if (!result.output) return;
    try {
      await navigator.clipboard.writeText(result.output);
      setCopied(true);
      play("success");
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* ignore */
    }
  };

  const swap = () => {
    setInput(result.output);
    setMode(mode === "encode" ? "decode" : "encode");
  };

  const loadSample = () => {
    const s = SAMPLES[language];
    setInput(
      mode === "encode"
        ? scope === "component"
          ? s.component
          : s.url
        : s.encoded
    );
  };

  const delta = result.byteDelta;
  const deltaLabel =
    delta === 0
      ? bn
        ? "পরিবর্তন নেই"
        : "no change"
      : delta > 0
        ? `+${delta} B`
        : `${delta} B`;

  const inputBytes = formatBytes(new Blob([input]).size);
  const outputBytes = result.output
    ? formatBytes(new Blob([result.output]).size)
    : "0 B";

  return (
    <section className="pb-12 space-y-4 sm:space-y-5">
      {/* Controls */}
      <WorkspacePanel className="p-3.5 sm:p-4 space-y-3.5">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {/* Mode */}
          <div>
            <p className="text-[10px] uppercase tracking-[0.2em] font-bold text-silk-wine/70 dark:text-silk-rose/60 mb-2">
              {bn ? "মোড" : "Mode"}
            </p>
            <div className="grid grid-cols-2 gap-2">
              <ToggleBtn
                active={mode === "encode"}
                onClick={() => setMode("encode")}
              >
                Encode
              </ToggleBtn>
              <ToggleBtn
                active={mode === "decode"}
                onClick={() => setMode("decode")}
              >
                Decode
              </ToggleBtn>
            </div>
          </div>

          {/* Scope */}
          <div>
            <p className="text-[10px] uppercase tracking-[0.2em] font-bold text-silk-wine/70 dark:text-silk-rose/60 mb-2">
              {bn ? "স্কোপ" : "Scope"}
            </p>
            <div className="grid grid-cols-2 gap-2">
              <ToggleBtn
                active={scope === "component"}
                onClick={() => setScope("component")}
              >
                Component
              </ToggleBtn>
              <ToggleBtn
                active={scope === "fullUri"}
                onClick={() => setScope("fullUri")}
              >
                Full URI
              </ToggleBtn>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2 flex-wrap pt-2 border-t border-silk-rose/10">
          <ToolButton
            size="sm"
            variant="secondary"
            icon={<ArrowLeftRight className="w-3.5 h-3.5" />}
            onClick={swap}
            disabled={!result.output}
          >
            {bn ? "সোয়াপ" : "Swap"}
          </ToolButton>

          <ToolButton
            size="sm"
            variant="secondary"
            icon={<Sparkles className="w-3.5 h-3.5" />}
            onClick={loadSample}
          >
            {bn ? "নমুনা" : "Sample"}
          </ToolButton>

          <span className="ml-auto text-[10px] font-mono font-bold text-silk-rose bg-silk-rose/10 px-2.5 py-1 rounded-md">
            {deltaLabel}
          </span>
        </div>
      </WorkspacePanel>

      {/* Input */}
      <TextPanel
        label={
          mode === "encode"
            ? bn
              ? "র ইনপুট"
              : "Raw input"
            : bn
              ? "এনকোডেড ইনপুট"
              : "Encoded input"
        }
        value={input}
        onChange={setInput}
        placeholder={
          mode === "encode"
            ? bn
              ? "যা এনকোড করতে চান লিখুন বা পেস্ট করুন..."
              : "Paste or type text to encode..."
            : bn
              ? "URL-encoded স্ট্রিং পেস্ট করুন..."
              : "Paste a URL-encoded string..."
        }
        onClear={() => setInput("")}
        meta={inputBytes}
      />

      {/* Error */}
      {result.error && (
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-start gap-2.5 p-3.5 rounded-xl bg-red-500/10 border border-red-500/30 text-[12px] sm:text-[13px] text-red-600 dark:text-red-400 font-medium"
        >
          <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
          <span>{result.error}</span>
        </motion.div>
      )}

      {/* Output */}
      {result.output && (
        <TextPanel
          label={
            mode === "encode"
              ? bn
                ? "আউটপুট"
                : "Encoded output"
              : bn
                ? "ডিকোডেড আউটপুট"
                : "Decoded output"
          }
          value={result.output}
          readOnly
          copied={copied}
          onCopy={handleCopy}
          meta={outputBytes}
        >
          <pre className="sr-only">{result.output}</pre>
        </TextPanel>
      )}
    </section>
  );
}

function ToggleBtn({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "h-10 rounded-xl border text-[12px] font-bold transition-all",
        active
          ? "bg-silk-rose/15 border-silk-rose/50 text-silk-wine dark:text-silk-rose-soft shadow-[0_6px_16px_-8px_rgba(139,58,79,0.35)]"
          : "bg-silk-rose/5 border-silk-rose/15 text-light-textSecondary dark:text-dark-textSecondary hover:border-silk-rose/40"
      )}
    >
      {children}
    </button>
  );
}
