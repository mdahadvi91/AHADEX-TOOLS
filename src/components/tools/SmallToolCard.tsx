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
        "bg-white dark:bg-dark-surface",
        "border",
        isFavorite
          ? "border-silk-gold/50 shadow-[0_6px_20px_-8px_rgba(201,150,103,0.35)]"
          : "border-silk-rose/15 hover:border-silk-rose/50",
        "shadow-[0_2px_10px_-6px_rgba(139,58,79,0.10)]",
        "hover:shadow-[0_14px_32px_-14px_rgba(139,58,79,0.35)]",
        "hover:-translate-y-1",
        "transition-all duration-300"
      )}
    >
      <div className="relative flex items-start justify-between gap-2 mb-3 sm:mb-4">
        <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-silk-rose/15 border border-silk-rose/25 flex items-center justify-center text-2xl sm:text-3xl leading-none">
          {emoji}
        </div>
        {onToggleFavorite && (
          <FavoriteButton
            active={isFavorite}
            onToggle={() => onToggleFavorite(tool.id)}
          />
        )}
      </div>

      {(tool.popular || tool.newTool) && (
        <div className="absolute top-[68px] sm:top-[80px] right-4 flex gap-1">
          {tool.popular && (
            <span className="px-1.5 py-0.5 rounded-full bg-gradient-to-r from-silk-rose to-silk-gold text-white text-[8px] font-bold tracking-wider uppercase leading-none">
              Top
            </span>
          )}
          {tool.newTool && (
            <span className="px-1.5 py-0.5 rounded-full bg-silk-wine/15 text-silk-wine text-[8px] font-bold tracking-wider uppercase border border-silk-wine/25 leading-none">
              New
            </span>
          )}
        </div>
      )}

      <h3 className="relative font-display font-bold leading-tight mb-1.5 sm:mb-2 text-[15px] text-[#2B1810] group-hover:text-silk-wine transition-colors">
        {translated.name}
      </h3>

      <p className="relative leading-relaxed line-clamp-2 flex-1 text-[12px] sm:text-[11.5px] text-[#7A5E52]">
        {translated.description}
      </p>

      <div className="relative flex items-center justify-end pt-3 mt-3 border-t border-silk-rose/10">
        <ArrowUpRight className="w-3.5 h-3.5 text-silk-rose opacity-60 group-hover:opacity-100 transition-all duration-300" />
      </div>
    </Link>
  );
}
