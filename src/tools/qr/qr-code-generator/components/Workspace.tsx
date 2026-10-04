import { useEffect, useState } from "react";
import { Download, Copy, ClipboardCheck, Loader2, FileCode2, ImageIcon } from "lucide-react";
import { useLanguage } from "@contexts/LanguageContext";
import { cn } from "@lib/cn";
import {
  buildPayload, generateQrDataUrl, generateQrSvg,
  downloadDataUrl, downloadSvg, DEFAULT_OPTIONS, PAYLOAD_PLACEHOLDER,
} from "../logic";
import type {
  QrType, QrOptions, WifiData, VCardData, LocationData, ErrorLevel, SizeOption,
} from "../types";

const TYPES: { value: QrType; en: string; bn: string; emoji: string }[] = [
  { value: "url", en: "URL", bn: "URL", emoji: "🔗" },
  { value: "text", en: "Text", bn: "টেক্সট", emoji: "📝" },
  { value: "wifi", en: "Wi-Fi", bn: "Wi-Fi", emoji: "📶" },
  { value: "vcard", en: "Contact", bn: "যোগাযোগ", emoji: "👤" },
  { value: "email", en: "Email", bn: "ইমেইল", emoji: "✉️" },
  { value: "phone", en: "Phone", bn: "ফোন", emoji: "📞" },
  { value: "sms", en: "SMS", bn: "SMS", emoji: "💬" },
  { value: "location", en: "Location", bn: "লোকেশন", emoji: "📍" },
];

const ERROR_LEVELS: ErrorLevel[] = ["L", "M", "Q", "H"];
const SIZES: SizeOption[] = [128, 256, 512, 1024];

export function Workspace() {
  const { language } = useLanguage();
  const bn = language === "bn";

  const [type, setType] = useState<QrType>("url");
  const [simple, setSimple] = useState("");
  const [wifi, setWifi] = useState<WifiData>({ ssid: "", password: "", encryption: "WPA", hidden: false });
  const [vcard, setVcard] = useState<VCardData>({ firstName: "", lastName: "", phone: "", email: "", organization: "", title: "", website: "" });
  const [location, setLocation] = useState<LocationData>({ latitude: "", longitude: "" });
  const [opts, setOpts] = useState<QrOptions>(DEFAULT_OPTIONS);

  const [dataUrl, setDataUrl] = useState("");
  const [busy, setBusy] = useState(false);
  const [copied, setCopied] = useState(false);

  const payload = buildPayload(type, simple, wifi, vcard, location);

  useEffect(() => {
    let cancelled = false;
    if (!payload.trim()) { setDataUrl(""); return; }
    setBusy(true);
    const t = setTimeout(async () => {
      try {
        const url = await generateQrDataUrl(payload, opts);
        if (!cancelled) setDataUrl(url);
      } catch { /* ignore */ }
      finally { if (!cancelled) setBusy(false); }
    }, 200);
    return () => { cancelled = true; clearTimeout(t); };
  }, [payload, opts]);

  const handleDownloadPng = () => {
    if (!dataUrl) return;
    downloadDataUrl(dataUrl, `qr-${type}-${Date.now()}.png`);
  };

  const handleDownloadSvg = async () => {
    if (!payload.trim()) return;
    try {
      const svg = await generateQrSvg(payload, opts);
      downloadSvg(svg, `qr-${type}-${Date.now()}.svg`);
    } catch { /* ignore */ }
  };

  const handleCopyPayload = async () => {
    if (!payload) return;
    try {
      await navigator.clipboard.writeText(payload);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch { /* ignore */ }
  };

  return (
    <section className="pb-12 space-y-4">
      {/* Type selector */}
      <div className="rounded-2xl bg-white/70 dark:bg-dark-surface/70 backdrop-blur-xl border border-silk-rose/20 p-3">
        <p className="text-[10px] uppercase tracking-wider font-semibold text-silk-wine/70 dark:text-silk-rose/60 mb-2">
          {bn ? "QR ধরন" : "QR type"}
        </p>
        <div className="grid grid-cols-4 sm:grid-cols-8 gap-1.5">
          {TYPES.map((t) => (
            <button
              key={t.value}
              type="button"
              onClick={() => setType(t.value)}
              className={cn(
                "h-14 rounded-lg border text-[10px] sm:text-[11px] font-medium transition-all flex flex-col items-center justify-center gap-0.5",
                type === t.value
                  ? "bg-silk-rose/15 border-silk-rose/50 text-silk-wine dark:text-silk-rose-soft"
                  : "bg-silk-rose/5 border-silk-rose/15 text-light-textSecondary dark:text-dark-textSecondary hover:border-silk-rose/40"
              )}
            >
              <span className="text-base">{t.emoji}</span>
              <span className="truncate">{bn ? t.bn : t.en}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-4">
        {/* Input panel */}
        <div className="space-y-3">
          <div className="rounded-2xl bg-white/70 dark:bg-dark-surface/70 backdrop-blur-xl border border-silk-rose/20 p-4 space-y-3">
            {(type === "text" || type === "url" || type === "email" || type === "phone" || type === "sms") && (
              <div>
                <label className="block text-[11px] font-medium text-light-text dark:text-dark-text mb-1.5">
                  {bn ? "কনটেন্ট" : "Content"}
                </label>
                <textarea
                  value={simple}
                  onChange={(e) => setSimple(e.target.value)}
                  placeholder={PAYLOAD_PLACEHOLDER[type][language]}
                  rows={type === "text" ? 4 : 2}
                  spellCheck={false}
                  className="w-full p-3 resize-y bg-white/80 dark:bg-dark-surface/80 border border-silk-rose/20 focus:border-silk-rose/50 rounded-lg text-[13px] text-light-text dark:text-dark-text placeholder:text-lightTextSecondary/50 dark:placeholder:text-darkTextSecondary/40 outline-none transition-all"
                />
              </div>
            )}

            {type === "wifi" && (
              <>
                <div>
                  <label className="block text-[11px] font-medium text-light-text dark:text-dark-text mb-1.5">
                    {bn ? "নেটওয়ার্কের নাম (SSID)" : "Network name (SSID)"}
                  </label>
                  <input
                    type="text"
                    value={wifi.ssid}
                    onChange={(e) => setWifi((p) => ({ ...p, ssid: e.target.value }))}
                    className="w-full h-10 px-3 rounded-lg text-[13px] bg-white/80 dark:bg-dark-surface/80 border border-silk-rose/20 focus:border-silk-rose/50 text-light-text dark:text-dark-text outline-none transition-all"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-medium text-light-text dark:text-dark-text mb-1.5">
                    {bn ? "পাসওয়ার্ড" : "Password"}
                  </label>
                  <input
                    type="text"
                    value={wifi.password}
                    onChange={(e) => setWifi((p) => ({ ...p, password: e.target.value }))}
                    disabled={wifi.encryption === "nopass"}
                    className="w-full h-10 px-3 rounded-lg text-[13px] bg-white/80 dark:bg-dark-surface/80 border border-silk-rose/20 focus:border-silk-rose/50 text-light-text dark:text-dark-text outline-none transition-all disabled:opacity-40"
                  />
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-[11px] font-medium text-light-text dark:text-dark-text mb-1.5">
                      {bn ? "Encryption" : "Encryption"}
                    </label>
                    <select
                      value={wifi.encryption}
                      onChange={(e) => setWifi((p) => ({ ...p, encryption: e.target.value as WifiData["encryption"] }))}
                      className="w-full h-10 px-3 rounded-lg text-[13px] bg-white/80 dark:bg-dark-surface/80 border border-silk-rose/20 focus:border-silk-rose/50 text-light-text dark:text-dark-text outline-none"
                    >
                      <option value="WPA">WPA/WPA2</option>
                      <option value="WEP">WEP</option>
                      <option value="nopass">None</option>
                    </select>
                  </div>
                  <div className="flex items-end">
                    <label className="flex items-center gap-2 text-[12px] text-light-text dark:text-dark-text cursor-pointer h-10">
                      <input type="checkbox" checked={wifi.hidden} onChange={(e) => setWifi((p) => ({ ...p, hidden: e.target.checked }))} className="w-4 h-4 accent-silk-rose" />
                      {bn ? "লুকানো নেটওয়ার্ক" : "Hidden network"}
                    </label>
                  </div>
                </div>
              </>
            )}

            {type === "vcard" && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {([
                  ["firstName", bn ? "নাম" : "First name"],
                  ["lastName", bn ? "পদবি" : "Last name"],
                  ["phone", bn ? "ফোন" : "Phone"],
                  ["email", bn ? "ইমেইল" : "Email"],
                  ["organization", bn ? "প্রতিষ্ঠান" : "Organization"],
                  ["title", bn ? "পদ" : "Job title"],
                  ["website", bn ? "ওয়েবসাইট" : "Website"],
                ] as const).map(([key, label]) => (
                  <div key={key} className={key === "website" ? "sm:col-span-2" : ""}>
                    <label className="block text-[11px] font-medium text-light-text dark:text-dark-text mb-1.5">{label}</label>
                    <input
                      type="text"
                      value={vcard[key]}
                      onChange={(e) => setVcard((p) => ({ ...p, [key]: e.target.value }))}
                      className="w-full h-10 px-3 rounded-lg text-[13px] bg-white/80 dark:bg-dark-surface/80 border border-silk-rose/20 focus:border-silk-rose/50 text-light-text dark:text-dark-text outline-none transition-all"
                    />
                  </div>
                ))}
              </div>
            )}

            {type === "location" && (
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-medium text-light-text dark:text-dark-text mb-1.5">
                    {bn ? "অক্ষাংশ" : "Latitude"}
                  </label>
                  <input
                    type="text"
                    value={location.latitude}
                    onChange={(e) => setLocation((p) => ({ ...p, latitude: e.target.value }))}
                    placeholder="23.8103"
                    className="w-full h-10 px-3 rounded-lg text-[13px] bg-white/80 dark:bg-dark-surface/80 border border-silk-rose/20 focus:border-silk-rose/50 text-light-text dark:text-dark-text outline-none transition-all"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-medium text-light-text dark:text-dark-text mb-1.5">
                    {bn ? "দ্রাঘিমাংশ" : "Longitude"}
                  </label>
                  <input
                    type="text"
                    value={location.longitude}
                    onChange={(e) => setLocation((p) => ({ ...p, longitude: e.target.value }))}
                    placeholder="90.4125"
                    className="w-full h-10 px-3 rounded-lg text-[13px] bg-white/80 dark:bg-dark-surface/80 border border-silk-rose/20 focus:border-silk-rose/50 text-light-text dark:text-dark-text outline-none transition-all"
                  />
                </div>
              </div>
            )}
          </div>

          {/* Options */}
          <div className="rounded-2xl bg-white/70 dark:bg-dark-surface/70 backdrop-blur-xl border border-silk-rose/20 p-4 space-y-3">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="block text-[11px] font-medium text-light-text dark:text-dark-text mb-1.5">
                  {bn ? "Error level" : "Error level"}
                </label>
                <div className="grid grid-cols-4 gap-1.5">
                  {ERROR_LEVELS.map((lv) => (
                    <button key={lv} type="button" onClick={() => setOpts((p) => ({ ...p, errorLevel: lv }))} className={cn("h-9 rounded-lg border text-[11px] font-medium transition-all", opts.errorLevel === lv ? "bg-silk-rose/15 border-silk-rose/50 text-silk-wine dark:text-silk-rose-soft" : "bg-silk-rose/5 border-silk-rose/15 text-light-textSecondary dark:text-dark-textSecondary hover:border-silk-rose/40")}>
                      {lv}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="block text-[11px] font-medium text-light-text dark:text-dark-text mb-1.5">
                  {bn ? "সাইজ" : "Size"}
                </label>
                <div className="grid grid-cols-4 gap-1.5">
                  {SIZES.map((s) => (
                    <button key={s} type="button" onClick={() => setOpts((p) => ({ ...p, size: s }))} className={cn("h-9 rounded-lg border text-[10px] font-medium transition-all", opts.size === s ? "bg-silk-rose/15 border-silk-rose/50 text-silk-wine dark:text-silk-rose-soft" : "bg-silk-rose/5 border-silk-rose/15 text-light-textSecondary dark:text-dark-textSecondary hover:border-silk-rose/40")}>
                      {s}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="block text-[11px] font-medium text-light-text dark:text-dark-text mb-1.5">
                  {bn ? "মার্জিন" : "Margin"}
                </label>
                <input
                  type="number"
                  min={0}
                  max={10}
                  value={opts.margin}
                  onChange={(e) => setOpts((p) => ({ ...p, margin: Math.max(0, Math.min(10, parseInt(e.target.value) || 0)) }))}
                  className="w-full h-9 px-3 rounded-lg text-[12px] bg-white/80 dark:bg-dark-surface/80 border border-silk-rose/20 focus:border-silk-rose/50 text-light-text dark:text-dark-text outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] font-medium text-light-text dark:text-dark-text mb-1.5">
                  {bn ? "Foreground" : "Foreground"}
                </label>
                <div className="flex items-center gap-2">
                  <input type="color" value={opts.foreground} onChange={(e) => setOpts((p) => ({ ...p, foreground: e.target.value }))} className="w-10 h-10 rounded-lg border border-silk-rose/20 cursor-pointer bg-transparent" />
                  <input type="text" value={opts.foreground} onChange={(e) => setOpts((p) => ({ ...p, foreground: e.target.value }))} className="flex-1 h-10 px-3 rounded-lg text-[12px] font-mono bg-white/80 dark:bg-dark-surface/80 border border-silk-rose/20 focus:border-silk-rose/50 text-light-text dark:text-dark-text outline-none" />
                </div>
              </div>
              <div>
                <label className="block text-[11px] font-medium text-light-text dark:text-dark-text mb-1.5">
                  {bn ? "Background" : "Background"}
                </label>
                <div className="flex items-center gap-2">
                  <input type="color" value={opts.background} onChange={(e) => setOpts((p) => ({ ...p, background: e.target.value }))} className="w-10 h-10 rounded-lg border border-silk-rose/20 cursor-pointer bg-transparent" />
                  <input type="text" value={opts.background} onChange={(e) => setOpts((p) => ({ ...p, background: e.target.value }))} className="flex-1 h-10 px-3 rounded-lg text-[12px] font-mono bg-white/80 dark:bg-dark-surface/80 border border-silk-rose/20 focus:border-silk-rose/50 text-light-text dark:text-dark-text outline-none" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Preview panel */}
        <div className="lg:sticky lg:top-4 space-y-3">
          <div className="rounded-2xl bg-white/70 dark:bg-dark-surface/70 backdrop-blur-xl border border-silk-rose/20 p-4">
            <div className="flex items-center justify-between mb-3">
              <span className="text-[10px] uppercase tracking-wider font-semibold text-silk-wine/70 dark:text-silk-rose/60">
                {bn ? "প্রিভিউ" : "Preview"}
              </span>
              {busy && <Loader2 className="w-3.5 h-3.5 text-silk-rose animate-spin" />}
            </div>
            <div className="aspect-square rounded-xl bg-white border border-silk-rose/15 flex items-center justify-center overflow-hidden">
              {dataUrl ? (
                <img src={dataUrl} alt="QR code" className="w-full h-full object-contain" />
              ) : (
                <div className="text-center text-lightTextSecondary dark:text-dark-textSecondary p-4">
                  <ImageIcon className="w-10 h-10 text-silk-rose/40 mx-auto mb-2" />
                  <p className="text-[11px]">{bn ? "কনটেন্ট লিখুন" : "Enter content to preview"}</p>
                </div>
              )}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <button type="button" onClick={handleDownloadPng} disabled={!dataUrl} className="inline-flex items-center justify-center gap-1.5 h-11 rounded-lg bg-gradient-to-r from-silk-rose to-silk-wine-deep text-white text-[11px] sm:text-xs font-semibold shadow-silk-soft hover:shadow-silk-deep transition-all disabled:opacity-40">
              <Download className="w-3.5 h-3.5" /> PNG
            </button>
            <button type="button" onClick={() => void handleDownloadSvg()} disabled={!payload.trim()} className="inline-flex items-center justify-center gap-1.5 h-11 rounded-lg bg-silk-rose/10 border border-silk-rose/25 text-[11px] sm:text-xs font-semibold text-silk-rose hover:bg-silk-rose/20 transition-all disabled:opacity-40">
              <FileCode2 className="w-3.5 h-3.5" /> SVG
            </button>
          </div>

          <button type="button" onClick={() => void handleCopyPayload()} disabled={!payload.trim()} className="w-full inline-flex items-center justify-center gap-1.5 h-10 rounded-lg bg-white/70 dark:bg-dark-surface/70 backdrop-blur-xl border border-silk-rose/20 text-[11px] font-medium text-silk-rose hover:bg-silk-rose/10 transition-all disabled:opacity-40">
            {copied ? <ClipboardCheck className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
            {copied ? (bn ? "কপি হয়েছে" : "Copied") : (bn ? "লিংক কপি" : "Copy link")}
          </button>
        </div>
      </div>
    </section>
  );
}
