import { useLanguage } from "@contexts/LanguageContext";
import { cn } from "@lib/cn";
import type { CVSettings } from "../types";
import { ACCENT_COLORS, FONT_FAMILIES, PAGE_SIZES } from "../constants";
import { PhotoUploader } from "./PhotoUploader";
import type { CVData } from "../types";

interface DesignPanelProps {
  data: CVData;
  onSettingsChange: (patch: Partial<CVSettings>) => void;
  onPersonalPhotoChange: (photoDataUrl: string | null) => void;
  onError?: (msg: string) => void;
}

export function DesignPanel({
  data,
  onSettingsChange,
  onPersonalPhotoChange,
  onError,
}: DesignPanelProps) {
  const { language } = useLanguage();
  const bn = language === "bn";
  const s = data.settings;

  return (
    <div className="space-y-4">
      {/* Photo */}
      <Section title={bn ? "ছবি" : "Photo"}>
        <PhotoUploader
          photoDataUrl={data.personal.photoDataUrl}
          onPhotoChange={onPersonalPhotoChange}
          settings={s}
          onSettingsChange={onSettingsChange}
          onError={onError}
        />
      </Section>

      {/* Accent color */}
      <Section title={bn ? "অ্যাকসেন্ট রঙ" : "Accent color"}>
        <div className="grid grid-cols-4 gap-2">
          {ACCENT_COLORS.map((c) => (
            <button
              key={c.id}
              type="button"
              onClick={() => onSettingsChange({ accentColor: c.value })}
              className={cn(
                "aspect-square rounded-lg border-2 transition-all relative",
                s.accentColor === c.value
                  ? "border-silk-rose shadow-silk-soft scale-105"
                  : "border-silk-rose/20 hover:border-silk-rose/50"
              )}
              style={{ backgroundColor: c.value }}
              title={c.label}
              aria-label={c.label}
            >
              {s.accentColor === c.value && (
                <span className="absolute inset-0 flex items-center justify-center text-white text-sm font-bold">
                  ✓
                </span>
              )}
            </button>
          ))}
        </div>
      </Section>

      {/* Font family */}
      <Section title={bn ? "ফন্ট" : "Font"}>
        <select
          value={s.fontFamily}
          onChange={(e) => onSettingsChange({ fontFamily: e.target.value })}
          className={cn(
            "w-full h-9 px-3 rounded-lg text-[12px]",
            "bg-white/80 dark:bg-dark-surface/80",
            "border border-silk-rose/20 focus:border-silk-rose/50",
            "text-light-text dark:text-dark-text",
            "outline-none transition-all"
          )}
        >
          {FONT_FAMILIES.map((f) => (
            <option key={f.id} value={f.id}>
              {f.label}
            </option>
          ))}
        </select>
      </Section>

      {/* Font size */}
      <Slider
        label={bn ? "ফন্ট সাইজ" : "Font size"}
        value={s.fontSize}
        min={8}
        max={14}
        step={0.5}
        suffix="pt"
        onChange={(v) => onSettingsChange({ fontSize: v })}
      />

      {/* Section spacing */}
      <Slider
        label={bn ? "সেকশন স্পেসিং" : "Section spacing"}
        value={s.sectionSpacing}
        min={2}
        max={12}
        step={0.5}
        suffix="mm"
        onChange={(v) => onSettingsChange({ sectionSpacing: v })}
      />

      {/* Page margin */}
      <Slider
        label={bn ? "পেজ মার্জিন" : "Page margin"}
        value={s.pageMargin}
        min={8}
        max={25}
        step={1}
        suffix="mm"
        onChange={(v) => onSettingsChange({ pageMargin: v })}
      />

      {/* Page size */}
      <Section title={bn ? "পেজ সাইজ" : "Page size"}>
        <div className="grid grid-cols-2 gap-2">
          {(["A4", "Letter"] as const).map((size) => (
            <button
              key={size}
              type="button"
              onClick={() => onSettingsChange({ pageSize: size })}
              className={cn(
                "py-2 rounded-lg border text-[11px] font-semibold transition-all",
                s.pageSize === size
                  ? "bg-silk-rose/15 border-silk-rose/50 text-silk-wine dark:text-silk-rose-soft"
                  : "bg-silk-rose/5 border-silk-rose/15 text-light-textSecondary dark:text-dark-textSecondary hover:border-silk-rose/40"
              )}
            >
              {size}
              <span className="block text-[9px] font-normal opacity-70 mt-0.5">
                {PAGE_SIZES[size].widthMm} × {PAGE_SIZES[size].heightMm} mm
              </span>
            </button>
          ))}
        </div>
      </Section>

      {/* Icons toggle */}
      <Section title={bn ? "আইকন" : "Icons"}>
        <label className="flex items-center gap-2 text-[12px] text-light-text dark:text-dark-text cursor-pointer select-none">
          <input
            type="checkbox"
            checked={s.showIcons}
            onChange={(e) => onSettingsChange({ showIcons: e.target.checked })}
            className="accent-silk-rose"
          />
          {bn ? "কনট্যাক্ট আইকন দেখান" : "Show contact icons"}
        </label>
      </Section>
    </div>
  );
}

/* ─── Subs ─── */

function Section({
  title, children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <h3 className="text-[10px] uppercase tracking-[0.2em] font-semibold text-silk-wine/70 dark:text-silk-rose/60 mb-2">
        {title}
      </h3>
      {children}
    </div>
  );
}

function Slider({
  label, value, min, max, step, suffix, onChange,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  suffix: string;
  onChange: (v: number) => void;
}) {
  return (
    <div>
      <div className="flex items-center justify-between mb-1">
        <label className="text-[10px] uppercase tracking-[0.2em] font-semibold text-silk-wine/70 dark:text-silk-rose/60">
          {label}
        </label>
        <span className="text-[10px] font-mono text-silk-rose">
          {value}{suffix}
        </span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(parseFloat(e.target.value))}
        className="w-full accent-silk-rose"
      />
    </div>
  );
}
