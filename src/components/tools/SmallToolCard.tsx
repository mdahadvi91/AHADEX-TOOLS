import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";
import { LiveText } from "@components/common/LiveText";
import { getToolIcon } from "@components/common/toolIcons";
import { FavoriteButton } from "./FavoriteButton";
import { useLanguage } from "@contexts/LanguageContext";
import { getToolTranslation } from "@i18n/toolTranslations";
import { cn } from "@lib/cn";
import type { Tool } from "@types/tool";

interface SmallToolCardProps {
  tool: Tool;
  index?: number;
  isFavorite?: boolean;
  onToggleFavorite?: (id: string) => void;
}

const ICON_COLORS: Record<string, string> = {
  image: "text-silk-rose",
  pdf: "text-silk-wine dark:text-silk-rose-soft",
  qr: "text-silk-gold",
  text: "text-silk-rose-deep",
  developer: "text-silk-rose-soft",
  calculators: "text-silk-wine dark:text-silk-rose-soft",
};

export function SmallToolCard({
  tool,
  index = 0,
  isFavorite = false,
  onToggleFavorite,
}: SmallToolCardProps) {
  const Icon = getToolIcon(tool.id);
  const iconColor = ICON_COLORS[tool.category] ?? "text-silk-rose";
  const { language, t } = useLanguage();

  const translated = getToolTranslation(tool.id, language, {
    name: tool.name,
    description: tool.description,
  });

  const categoryLabel = t.categories[tool.category as keyof typeof t.categories] ?? tool.category;

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{
        duration: 0.4,
        delay: Math.min(index * 0.025, 0.2),
        ease: [0.16, 1, 0.3, 1],
      }}
      className="h-full"
    >
      <Link
        to={tool.path}
        className={cn(
          "group relative flex flex-col h-full p-5 rounded-2xl overflow-hidden",
          "bg-white/75 dark:bg-dark-surface/75 backdrop-blur-xl",
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
        <span
          aria-hidden="true"
          className="absolute -top-10 -right-10 w-28 h-28 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
          style={{
            background: "radial-gradient(circle, rgba(216,139,154,0.6) 0%, transparent 70%)",
            filter: "blur(20px)",
          }}
        />

        <div className="relative flex items-start justify-between gap-2 mb-4">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-silk-rose/15 via-silk-wine/8 to-silk-gold/10 border border-silk-rose/25 flex items-center justify-center group-hover:bg-silk-rose/25 group-hover:border-silk-rose/45 transition-all duration-400 overflow-hidden">
            <span
              aria-hidden="true"
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
              style={{
                background:
                  "conic-gradient(from 0deg, transparent, rgba(216,139,154,0.4), transparent 30%)",
                animation: "icon-glow-spin 3s linear infinite",
              }}
            />
            <motion.span
              animate={{ y: [0, -2, 0, -1, 0], rotate: [0, 2, 0, -2, 0] }}
              transition={{
                duration: 4 + (index % 5) * 0.3,
                repeat: Infinity,
                ease: "easeInOut",
                delay: index * 0.15,
              }}
              className="relative flex items-center justify-center"
            >
              <Icon
                size={26}
                strokeWidth={1.7}
                className={cn(iconColor, "group-hover:scale-110 transition-transform duration-400")}
                aria-hidden="true"
              />
            </motion.span>
          </div>

          {onToggleFavorite && (
            <FavoriteButton
              active={isFavorite}
              onToggle={() => onToggleFavorite(tool.id)}
            />
          )}
        </div>

        {(tool.popular || tool.newTool) && (
          <div className="absolute top-20 right-5 flex gap-1">
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

        <h3 className="relative font-display font-bold text-[15px] text-light-text dark:text-dark-text mb-2 group-hover:text-silk-wine dark:group-hover:text-silk-rose-soft transition-colors leading-tight">
          <LiveText
            text={translated.name}
            waveAmplitude={5}
            waveDuration={3.4}
            letterStagger={0.045}
          />
        </h3>

        <motion.p
          animate={{ y: [0, -1, 0, 1, 0], opacity: [0.85, 1, 0.85] }}
          transition={{
            duration: 6 + (index % 4) * 0.5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: index * 0.2,
          }}
          className="relative text-[11.5px] text-light-textSecondary dark:text-dark-textSecondary leading-relaxed line-clamp-2 flex-1"
        >
          {translated.description}
        </motion.p>

        <div className="relative flex items-center justify-between pt-3 mt-3 border-t border-silk-rose/10">
          <span className="text-[9px] uppercase tracking-[0.15em] text-silk-wine/50 dark:text-silk-rose/40 font-semibold">
            {categoryLabel}
          </span>
          <ArrowUpRight className="w-3.5 h-3.5 text-silk-rose opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
        </div>
      </Link>
    </motion.div>
  );
}
