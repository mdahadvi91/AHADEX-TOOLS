import { Download, Settings2, Layers } from "lucide-react";
import { useLanguage } from "@contexts/LanguageContext";
import { cn } from "@lib/cn";
import { ToolButton } from "@components/workspace";
import type { Position, QrBackground } from "./types";
import {
  PLATFORMS,
  POSITIONS,
  QR_BACKGROUNDS,
  SIZE_RANGE,
  PADDING_RANGE,
} from "./options";

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
  const bn = language === "bn";
  const platform =
    PLATFORMS.find((p) => p.id === platformId) ?? PLATFORMS[0];

  return (
    <aside className="flex flex-col rounded-2xl sm:rounded-3xl bg-white/70 dark:bg-dark-surface/70 backdrop-blur-xl border border-silk-rose/20 p-4 sm:p-5 space-y-5 h-full">
      {/* ── Platform selector ── */}
      <div>
        <div className="flex items-center gap-2 mb-3">
          <span className="w-7 h-7 rounded-lg bg-silk-rose/15 border border-silk-rose/25 flex items-center justify-center">
            <Layers className="w-3.5 h-3.5 text-silk-rose" />
          </span>
          <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-silk-wine/70 dark:text-silk-rose/60">
            {bn ? "প্ল্যাটফর্ম" : "Platform"}
          </span>
        </div>
        <div className="grid grid-cols-3 gap-1.5 sm:gap-2">
          {PLATFORMS.map((p) => {
            const active = p.id === platformId;
            const PIcon = p.Icon;
            return (
              <button
                key={p.id}
                type="button"
                onClick={() => onPlatformChange(p.id)}
                title={bn ? p.nameBn : p.name}
                className={cn(
                  "flex flex-col items-center gap-1.5 p-2 rounded-xl border transition-all duration-200 min-w-0",
                  active
                    ? "bg-gradient-to-br from-silk-rose/15 via-silk-rose/8 to-silk-gold/10 border-silk-rose/50 shadow-[0_8px_20px_-10px_rgba(139,58,79,0.4)]"
                    : "bg-silk-rose/5 border-silk-rose/15 hover:border-silk-rose/40 hover:bg-silk-rose/8"
                )}
              >
                <span
                  className="w-8 h-8 rounded-lg flex items-center justify-center text-lg sm:text-xl"
                  style={{ backgroundColor: `${p.color}20`, color: p.color }}
                >
                  <PIcon />
                </span>
                <span className="text-[9px] sm:text-[10px] font-bold text-light-text dark:text-dark-text text-center leading-tight line-clamp-2 w-full">
                  {bn ? p.nameBn : p.name}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* ── Fields ── */}
      <div>
        <div className="flex items-center gap-2 mb-3">
          <span className="w-7 h-7 rounded-lg bg-silk-rose/15 border border-silk-rose/25 flex items-center justify-center">
            <Settings2 className="w-3.5 h-3.5 text-silk-rose" />
          </span>
          <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-silk-wine/70 dark:text-silk-rose/60">
            {bn ? "তথ্য" : "Details"}
          </span>
        </div>
        <div className="space-y-2.5">
          {platform.fields.map((field) => (
            <div key={field.key}>
              <label
                htmlFor={`field-${field.key}`}
                className="block text-[11px] font-bold text-light-text dark:text-dark-text mb-1.5 leading-snug"
              >
                {bn ? field.labelBn : field.label}
              </label>
              <input
                id={`field-${field.key}`}
                type={field.type}
                value={values[field.key] ?? ""}
                onChange={(e) => onValueChange(field.key, e.target.value)}
                placeholder={bn ? field.placeholderBn : field.placeholder}
                className={cn(
                  "w-full h-10 px-3 rounded-xl text-[13px]",
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

      {/* ── Position ── */}
      <div>
        <div className="flex items-center gap-2 mb-3">
          <span className="w-7 h-7 rounded-lg bg-silk-rose/15 border border-silk-rose/25 flex items-center justify-center">
            <span className="text-xs">📍</span>
          </span>
          <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-silk-wine/70 dark:text-silk-rose/60">
            {bn ? "কোণা" : "Position"}
          </span>
        </div>
        <div className="grid grid-cols-2 gap-1.5">
          {POSITIONS.map((pos) => {
            const active = position === pos.id;
            return (
              <button
                key={pos.id}
                type="button"
                onClick={() => onPositionChange(pos.id)}
                className={cn(
                  "h-9 rounded-xl border text-[11px] font-bold transition-all px-1 truncate",
                  active
                    ? "bg-silk-rose/15 border-silk-rose/50 text-silk-wine dark:text-silk-rose-soft"
                    : "bg-silk-rose/5 border-silk-rose/15 text-light-textSecondary dark:text-dark-textSecondary hover:border-silk-rose/40"
                )}
              >
                {bn ? pos.labelBn : pos.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* ── Size ── */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-silk-wine/70 dark:text-silk-rose/60">
            {bn ? "সাইজ" : "Size"}
          </span>
          <span className="text-[12px] font-mono font-bold text-silk-rose px-2 py-0.5 rounded-md bg-silk-rose/10">
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
          className="w-full accent-silk-rose cursor-pointer"
        />
      </div>

      {/* ── Padding ── */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-silk-wine/70 dark:text-silk-rose/60">
            {bn ? "প্যাডিং" : "Padding"}
          </span>
          <span className="text-[12px] font-mono font-bold text-silk-rose px-2 py-0.5 rounded-md bg-silk-rose/10">
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
          className="w-full accent-silk-rose cursor-pointer"
        />
      </div>

      {/* ── QR Background ── */}
      <div>
        <div className="flex items-center gap-2 mb-3">
          <span className="w-7 h-7 rounded-lg bg-silk-rose/15 border border-silk-rose/25 flex items-center justify-center">
            <span className="text-xs">🎨</span>
          </span>
          <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-silk-wine/70 dark:text-silk-rose/60">
            {bn ? "ব্যাকগ্রাউন্ড" : "Background"}
          </span>
        </div>
        <div className="grid grid-cols-3 gap-1.5">
          {QR_BACKGROUNDS.map(({ id, Icon, label, labelBn }) => {
            const active = qrBackground === id;
            return (
              <button
                key={id}
                type="button"
                onClick={() => onQrBackgroundChange(id)}
                className={cn(
                  "flex items-center justify-center gap-1 h-9 rounded-xl border text-[11px] font-bold transition-all px-1",
                  active
                    ? "bg-silk-rose/15 border-silk-rose/50 text-silk-wine dark:text-silk-rose-soft"
                    : "bg-silk-rose/5 border-silk-rose/15 text-light-textSecondary dark:text-dark-textSecondary hover:border-silk-rose/40"
                )}
              >
                <Icon className="w-3.5 h-3.5 shrink-0" />
                <span className="truncate">{bn ? labelBn : label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* ── Error ── */}
      {error && (
        <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-[12px] font-medium text-red-600 dark:text-red-400">
          {error}
        </div>
      )}

      {/* ── Download button ── */}
      <div className="mt-auto pt-3 border-t border-silk-rose/10">
        <ToolButton
          variant="primary"
          size="lg"
          className="w-full"
          loading={generating}
          disabled={!canDownload || generating}
          icon={<Download className="w-4 h-4" />}
          onClick={onDownload}
        >
          {generating
            ? bn
              ? "তৈরি হচ্ছে..."
              : "Generating..."
            : bn
              ? "PNG ডাউনলোড"
              : "Download PNG"}
        </ToolButton>
      </div>
    </aside>
  );
}
