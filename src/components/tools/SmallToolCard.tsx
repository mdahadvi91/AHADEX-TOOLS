import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { getToolEmoji } from "@components/common/toolEmojis";
import { FavoriteButton } from "./FavoriteButton";
import { useLanguage } from "@contexts/LanguageContext";
import { getToolTranslation } from "@i18n/toolTranslations";
import { cn } from "@lib/cn";
import type { Tool } from "@/types/tool";

interface SmallToolCardProps {
  tool: Tool;
  index?: number;
  isFavorite?: boolean;
  onToggleFavorite?: (id: string) => void;
}

export function SmallToolCard({
  tool,
  isFavorite = false,
  onToggleFavorite,
}: SmallToolCardProps) {
  const emoji = getToolEmoji(tool.id);
  const { language } = useLanguage();

  const translated = getToolTranslation(tool.id, language, {
    name: tool.name,
    description: tool.description,
  });

  return (
    <Link
      to={tool.path}
      className={cn(
        "group relative flex flex-col h-full p-4 sm:p-5 rounded-2xl overflow-hidden",
        "bg-white dark:bg-[#251820]",
        "border",
        isFavorite
          ? "border-silk-gold/50 shadow-[0_6px_20px_-8px_rgba(201,150,103,0.35)]"
          : "border-silk-rose/20 hover:border-silk-rose/55",
        "shadow-[0_2px_10px_-6px_rgba(139,58,79,0.10)]",
        "hover:shadow-[0_14px_32px_-14px_rgba(139,58,79,0.35)]",
        "hover:-translate-y-1",
        "transition-all duration-300"
      )}
    >
      {/* Soft rose glow (visible on hover) */}
      <span
        aria-hidden="true"
        className="absolute -top-12 -right-12 w-32 h-32 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(216,139,154,0.55) 0%, transparent 70%)",
          filter: "blur(22px)",
        }}
      />

      {/* Top row — emoji + favorite */}
      <div className="relative flex items-start justify-between gap-2 mb-4">
        <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-gradient-to-br from-silk-rose/20 via-silk-rose/10 to-silk-gold/15 border border-silk-rose/30 flex items-center justify-center text-3xl sm:text-4xl leading-none shadow-[inset_0_1px_0_rgba(255,255,255,0.4)] transition-all duration-400 group-hover:scale-105 group-hover:border-silk-rose/50">
          {emoji}
        </div>
        {onToggleFavorite && (
          <FavoriteButton
            active={isFavorite}
            onToggle={() => onToggleFavorite(tool.id)}
          />
        )}
      </div>

      {/* Badges */}
      {(tool.popular || tool.newTool) && (
        <div className="absolute top-[72px] sm:top-[82px] right-4 flex gap-1">
          {tool.popular && (
            <span className="px-1.5 py-0.5 rounded-full bg-gradient-to-r from-silk-rose to-silk-gold text-white text-[8px] font-bold tracking-wider uppercase leading-none">
              Top
            </span>
          )}
          {tool.newTool && (
            <span className="px-1.5 py-0.5 rounded-full bg-silk-wine/15 text-silk-wine dark:text-silk-rose-soft text-[8px] font-bold tracking-wider uppercase border border-silk-wine/25 leading-none">
              New
            </span>
          )}
        </div>
      )}

      {/* Title — Playfair Display + rose→wine→gold gradient */}
      <h3 className="relative font-serif font-bold leading-[1.15] mb-1.5 text-[17px] sm:text-[18px] tracking-[-0.015em] bg-gradient-to-r from-silk-wine via-silk-rose to-silk-gold bg-clip-text text-transparent group-hover:from-silk-rose group-hover:via-silk-gold group-hover:to-silk-wine transition-all duration-500">
        {translated.name}
      </h3>

      {/* Decorative divider — script accent */}
      <div className="relative flex items-center gap-2 mb-2">
        <span className="h-[1.5px] w-6 rounded-full bg-gradient-to-r from-silk-rose to-silk-gold/60" />
        <span className="font-script text-[11px] text-silk-rose/70 dark:text-silk-rose-soft/70 tracking-wide leading-none">
          free
        </span>
      </div>

      {/* Description */}
      <p className="relative leading-relaxed line-clamp-2 flex-1 text-[12px] sm:text-[11.5px] text-[#7A5E52] dark:text-[#C4A89E]">
        {translated.description}
      </p>

      {/* Bottom row — arrow */}
      <div className="relative flex items-center justify-end pt-3 mt-3 border-t border-silk-rose/10">
        <ArrowUpRight className="w-3.5 h-3.5 text-silk-rose opacity-60 group-hover:opacity-100 -translate-x-1 group-hover:translate-x-0 transition-all duration-300" />
      </div>
    </Link>
  );
}
