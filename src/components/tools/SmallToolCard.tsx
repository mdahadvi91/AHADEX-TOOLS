import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { getToolEmoji } from "@components/common/toolEmojis";
import { FavoriteButton } from "./FavoriteButton";
import { useLanguage } from "@contexts/LanguageContext";
import { useSound } from "@contexts/SoundContext";
import { getToolTranslation } from "@i18n/toolTranslations";
import { cn } from "@lib/cn";
import type { Tool } from "@/types/tool";

interface SmallToolCardProps {
  tool: Tool;
  index?: number;
  isFavorite?: boolean;
  onToggleFavorite?: (id: string) => void;
}

/* ── Category detection for badge ── */
function getCategory(tool: Tool): string {
  const p = tool.path.toLowerCase();
  const id = tool.id.toLowerCase();
  if (p.includes("/pdf/") || id.includes("pdf")) return "PDF";
  if (p.includes("/image/") || id.includes("image") || id.includes("jpg") || id.includes("png") || id.includes("webp") || id.includes("svg") || id.includes("favicon")) return "IMAGE";
  if (p.includes("/text/") || id.includes("word") || id.includes("character") || id.includes("case")) return "TEXT";
  if (p.includes("/developer/") || id.includes("json") || id.includes("url") || id.includes("uuid") || id.includes("base64") || id.includes("password")) return "DEV";
  if (id.includes("qr") || id.includes("barcode")) return "QR";
  if (id.includes("cv") || id.includes("visiting") || id.includes("photo-qr")) return "DESIGN";
  return "TOOL";
}

export function SmallToolCard({
  tool,
  isFavorite = false,
  onToggleFavorite,
}: SmallToolCardProps) {
  const emoji = getToolEmoji(tool.id);
  const { language } = useLanguage();
  const { play } = useSound();
  const category = getCategory(tool);

  const translated = getToolTranslation(tool.id, language, {
    name: tool.name,
    description: tool.description,
  });

  const openLabel = language === "bn" ? "টুল খুলুন" : "Open tool";

  return (
    <Link
      to={tool.path}
      onMouseEnter={() => play("hover")}
      onClick={() => play("click")}
      className="group relative block min-h-[180px] sm:min-h-[200px] rounded-[22px] focus:outline-none focus-visible:ring-2 focus-visible:ring-silk-rose/60"
    >
      {/* Animated gradient border — appears on hover */}
      <span
        aria-hidden="true"
        className="absolute -inset-[1px] rounded-[23px] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{
          background:
            "linear-gradient(135deg, #D88B9A 0%, #C99667 45%, #8B3A4F 100%)",
        }}
      />

      <div
        className={cn(
          "relative flex flex-col h-full p-4 sm:p-5 rounded-[22px] overflow-hidden",
          "bg-white dark:bg-[#251820]",
          "border",
          isFavorite
            ? "border-silk-gold/50"
            : "border-silk-rose/15 group-hover:border-transparent",
          "shadow-[0_2px_12px_-6px_rgba(139,58,79,0.08)]",
          "group-hover:shadow-[0_24px_48px_-20px_rgba(139,58,79,0.4)]",
          "group-hover:-translate-y-1",
          "transition-all duration-300 ease-out"
        )}
      >
        {/* Background dot-grid — appears on hover */}
        <span
          aria-hidden="true"
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
          style={{
            backgroundImage:
              "radial-gradient(circle at 1px 1px, rgba(216,139,154,0.18) 1px, transparent 0)",
            backgroundSize: "18px 18px",
          }}
        />

        {/* Corner radial glow */}
        <span
          aria-hidden="true"
          className="absolute -top-24 -right-24 w-48 h-48 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
          style={{
            background:
              "radial-gradient(circle, rgba(216,139,154,0.55) 0%, transparent 70%)",
            filter: "blur(32px)",
          }}
        />

        {/* ── Header: Icon + Favorite + Category ── */}
        <div className="relative flex items-start justify-between gap-2 mb-4">
          <div className="relative shrink-0">
            {/* Icon glow */}
            <span
              aria-hidden="true"
              className="absolute inset-0 rounded-2xl bg-silk-rose/30 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
            />
            <div
              className={cn(
                "relative w-12 h-12 sm:w-14 sm:h-14 rounded-2xl",
                "bg-gradient-to-br from-silk-rose/20 via-silk-rose/10 to-silk-gold/15",
                "border border-silk-rose/25",
                "flex items-center justify-center text-2xl sm:text-3xl leading-none",
                "shadow-[inset_0_1px_0_rgba(255,255,255,0.4)]",
                "transition-all duration-500",
                "group-hover:scale-[1.06] group-hover:border-silk-rose/50"
              )}
            >
              <span className="drop-shadow-sm">{emoji}</span>
            </div>
          </div>

          <div className="flex flex-col items-end gap-2">
            {onToggleFavorite && (
              <FavoriteButton
                active={isFavorite}
                onToggle={() => onToggleFavorite(tool.id)}
              />
            )}
            <span
              className={cn(
                "text-[8px] sm:text-[9px] font-bold uppercase tracking-[0.18em]",
                "text-silk-rose/45 dark:text-silk-rose-soft/45",
                "transition-colors duration-300",
                "group-hover:text-silk-rose/80 dark:group-hover:text-silk-rose-soft/80"
              )}
            >
              {category}
            </span>
          </div>
        </div>

        {/* ── Title ── */}
        <h3
          className={cn(
            "relative font-serif font-bold leading-[1.2] mb-2",
            "text-[15px] sm:text-[17px] tracking-[-0.015em]",
            "bg-gradient-to-r from-silk-wine via-silk-rose to-silk-gold",
            "bg-clip-text text-transparent",
            "group-hover:from-silk-rose group-hover:via-silk-gold group-hover:to-silk-wine",
            "transition-all duration-500"
          )}
        >
          {translated.name}
        </h3>

        {/* ── Free accent ── */}
        <div className="relative flex items-center gap-2 mb-2.5">
          <span className="h-[1.5px] w-5 rounded-full bg-gradient-to-r from-silk-rose to-silk-gold/60" />
          <span className="font-script text-[10px] text-silk-rose/70 dark:text-silk-rose-soft/70 tracking-wide leading-none">
            free
          </span>
        </div>

        {/* ── Description ── */}
        <p
          className={cn(
            "relative leading-relaxed line-clamp-2 flex-1",
            "text-[11.5px] sm:text-[12px]",
            "text-[#7A5E52] dark:text-[#C4A89E]"
          )}
        >
          {translated.description}
        </p>

        {/* ── Footer: Open label + Arrow ── */}
        <div className="relative flex items-center justify-between pt-3 mt-3 border-t border-silk-rose/10">
          <span
            className={cn(
              "text-[10px] font-semibold tracking-wide uppercase",
              "text-silk-rose/0 group-hover:text-silk-rose/80",
              "transition-colors duration-300"
            )}
          >
            {openLabel}
          </span>
          <ArrowUpRight
            className={cn(
              "w-3.5 h-3.5 text-silk-rose",
              "opacity-60 group-hover:opacity-100",
              "-translate-x-1 group-hover:translate-x-0",
              "transition-all duration-300"
            )}
          />
        </div>
      </div>
    </Link>
  );
}
