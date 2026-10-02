import { motion } from "framer-motion";
import {
  ChevronDown,
  Download,
  Loader2,
  Shield,
} from "lucide-react";
import { useLanguage } from "@contexts/LanguageContext";
import { cn } from "@lib/cn";
import type { Position, QrBackground } from "./types";
import { PLATFORMS, POSITIONS, QR_BACKGROUNDS, SIZE_RANGE, PADDING_RANGE } from "./options";

interface SettingsPanelProps {
  platformId: string;
  onPlatformChange: (id: string) => void;
  values: Record<string, string>;
  onValueChange: (key: string, value: string) => void;
  position: Position;
  onPositionChange: (pos: Position) => void;
  sizePercent: number;
  onSizeChange: (v: number) => void;
  padding: number;
  onPaddingChange: (v: number) => void;
  qrBackground: QrBackground;
  onQrBackgroundChange: (v: QrBackground) => void;
  onDownload: () => void;
  canDownload: boolean;
  generating: boolean;
  error: string | null;
}

export function SettingsPanel({
  platformId,
  onPlatformChange,
  values,
  onValueChange,
  position,
  onPositionChange,
  sizePercent,
  onSizeChange,
  padding,
  onPaddingChange,
  qrBackground,
  onQrBackgroundChange,
  onDownload,
  canDownload,
  generating,
  error,
}: SettingsPanelProps) {
  const { language } = useLanguage();
  const platform = PLATFORMS.find((p) => p.id === platformId) ?? PLATFORMS[0];

  return (
    <aside className="flex flex-col rounded-2xl sm:rounded-3xl bg-white/70 dark:bg-dark-surface/70 backdrop-blur-xl border border-silk-rose/20 p-3 sm:p-4 lg:p-5 space-y-4 sm:space-y-5">
      {/* Platform */}
      <div>
        <SectionHeader>
          {language === "bn" ? "প্ল্যাটফর্ম" : "Platform"}
        </SectionHeader>
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-1.5 sm:gap-2">
          {PLATFORMS.map((p) => {
            const active = p.id === platformId;
            const PIcon = p.Icon;
            return (
              <button
                key={p.id}
                type="button"
                onClick={() => onPlatformChange(p.id)}
                className={cn(
                  "flex flex-col items-center gap-1.5 p-2 sm:p-2.5 rounded-lg sm:rounded-xl border transition-all duration-200 min-w-0",
                  active
                    ? "bg-silk-rose/15 border-silk-rose/50 shadow-silk-soft"
                    : "bg-silk-rose/5 border-silk-rose/15 hover:border-silk-rose/40"
                )}
                title={language === "bn" ? p.nameBn : p.name}
              >
                <span
                  className="w-8 h-8 rounded-lg flex items-center justify-center text-lg sm:text-xl"
                  style={{ backgroundColor: `${p.color}20`, color: p.color }}
                >
                  <PIcon />
                </span>
                <span className="text-[10px] font-medium text-light-text dark:text-dark-text text-center leading-tight line-clamp-2 w-full">
                  {language === "bn" ? p.nameBn : p.name}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Fields */}
      <div>
        <SectionHeader>
          {language === "bn" ? "তথ্য" : "Details"}
        </SectionHeader>
        <div className="space-y-2.5 sm:space-y-3">
          {platform.fields.map((field) => (
            <div key={field.key}>
              <label
                htmlFor={`field-${field.key}`}
                className="block text-[11px] sm:text-xs font-medium text-light-text dark:text-dark-text mb-1.5 leading-snug"
              >
                {language === "bn" ? field.labelBn : field.label}
              </label>
              <input
                id={`field-${field.key}`}
                type={field.type}
                value={values[field.key] ?? ""}
                onChange={(e) => onValueChange(field.key, e.target.value)}
                placeholder={
                  language === "bn" ? field.placeholderBn : field.placeholder
                }
                className={cn(
                  "w-full h-10 px-3 rounded-xl text-[13px] sm:text-sm",
                  "bg-white/80 dark:bg-dark-surface/80",
                  "border border-silk-rose/20 focus:border-silk-rose/50",
                  "text-light-text dark:text-dark-text",
                  "placeholder:text-light-textSecondary/50 dark:placeholder:text-dark-textSecondary/40",
                  "outline-none transition-all"
                )}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Position */}
      <div>
        <SectionHeader>
          {language === "bn" ? "কোণা" : "Position"}
        </SectionHeader>
        <div className="grid grid-cols-2 gap-1.5 sm:gap-2">
          {POSITIONS.map((pos) => {
            const active = position === pos.id;
            return (
              <button
                key={pos.id}
                type="button"
                onClick={() => onPositionChange(pos.id)}
                className={cn(
                  "h-9 rounded-lg sm:rounded-xl border text-[11px] sm:text-xs font-medium transition-all px-1 truncate",
                  active
                    ? "bg-silk-rose/15 border-silk-rose/50 text-silk-wine dark:text-silk-rose-soft"
                    : "bg-silk-rose/5 border-silk-rose/15 text-light-textSecondary dark:text-dark-textSecondary hover:border-silk-rose/40"
                )}
              >
                {language === "bn" ? pos.labelBn : pos.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Size */}
      <div>
        <div className="flex items-center justify-between mb-1.5">
          <SectionHeader noMargin>
            {language === "bn" ? "সাইজ" : "Size"}
          </SectionHeader>
          <span className="text-[11px] sm:text-xs font-mono text-silk-rose font-semibold">
            {sizePercent}%
          </span>
        </div>
        <input
          type="range"
          min={SIZE_RANGE.min}
          max={SIZE_RANGE.max}
          step={SIZE_RANGE.step}
          value={sizePercent}
          onChange={(e) => onSizeChange(parseInt(e.target.value))}
          className="w-full"
        />
      </div>

      {/* Padding */}
      <div>
        <div className="flex items-center justify-between mb-1.5">
          <SectionHeader noMargin>
            {language === "bn" ? "প্যাডিং" : "Padding"}
          </SectionHeader>
          <span className="text-[11px] sm:text-xs font-mono text-silk-rose font-semibold">
            {padding}px
          </span>
        </div>
        <input
          type="range"
          min={PADDING_RANGE.min}
          max={PADDING_RANGE.max}
          step={PADDING_RANGE.step}
          value={padding}
          onChange={(e) => onPaddingChange(parseInt(e.target.value))}
          className="w-full"
        />
      </div>

      {/* QR Background */}
      <div>
        <SectionHeader>
          {language === "bn" ? "ব্যাকগ্রাউন্ড" : "Background"}
        </SectionHeader>
        <div className="grid grid-cols-3 gap-1.5 sm:gap-2">
          {QR_BACKGROUNDS.map(({ id, Icon, label, labelBn }) => {
            const active = qrBackground === id;
            return (
              <button
                key={id}
                type="button"
                onClick={() => onQrBackgroundChange(id)}
                className={cn(
                  "flex items-center justify-center gap-1 h-9 rounded-lg sm:rounded-xl border text-[11px] sm:text-xs font-medium transition-all px-1",
                  active
                    ? "bg-silk-rose/15 border-silk-rose/50 text-silk-wine dark:text-silk-rose-soft"
                    : "bg-silk-rose/5 border-silk-rose/15 text-light-textSecondary dark:text-dark-textSecondary hover:border-silk-rose/40"
                )}
              >
                <Icon className="w-3.5 h-3.5 shrink-0" />
                <span className="truncate">
                  {language === "bn" ? labelBn : label}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Download */}
      <button
        type="button"
        onClick={onDownload}
        disabled={!canDownload || generating}
        className={cn(
          "w-full inline-flex items-center justify-center gap-2 h-11 sm:h-12 rounded-full mt-1",
          "bg-gradient-to-r from-silk-rose to-silk-wine-deep text-white font-medium text-[13px] sm:text-sm",
          "shadow-silk-medium hover:shadow-silk-deep",
          "disabled:opacity-40 disabled:cursor-not-allowed",
          "transition-all duration-300"
        )}
      >
        {generating ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" />
            <span className="truncate">
              {language === "bn" ? "তৈরি হচ্ছে..." : "Generating..."}
            </span>
          </>
        ) : (
          <>
            <Download className="w-4 h-4 shrink-0" />
            <span className="truncate">
              {language === "bn" ? "ডাউনলোড PNG" : "Download PNG"}
            </span>
          </>
        )}
      </button>

      {error && (
        <p className="text-[11px] sm:text-xs text-silk-rose text-center leading-tight">
          {error}
        </p>
      )}
    </aside>
  );
}

function SectionHeader({
  children,
  noMargin = false,
}: {
  children: React.ReactNode;
  noMargin?: boolean;
}) {
  return (
    <h3
      className={cn(
        "text-[11px] sm:text-xs uppercase tracking-[0.12em] sm:tracking-[0.2em]",
        "text-silk-wine/70 dark:text-silk-rose/60 font-semibold",
        !noMargin && "mb-2.5 sm:mb-3"
      )}
    >
      {children}
    </h3>
  );
}

