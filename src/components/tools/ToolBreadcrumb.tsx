import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ChevronRight, Home } from "lucide-react";
import { useLanguage } from "@contexts/LanguageContext";
import { cn } from "@lib/cn";

interface ToolBreadcrumbProps {
  /** Tool display name (e.g. "Image Compressor") */
  toolName: string;
  /** Optional category label (e.g. "Image Tools") */
  category?: string;
  /** Optional category path (e.g. "/tools#image") */
  categoryHref?: string;
}

export function ToolBreadcrumb({
  toolName,
  category,
  categoryHref,
}: ToolBreadcrumbProps) {
  const { language } = useLanguage();
  const bn = language === "bn";

  const items: { label: string; to?: string }[] = [
    { label: bn ? "হোম" : "Home", to: "/" },
    { label: bn ? "টুলস" : "Tools", to: "/tools" },
  ];

  if (category) {
    items.push({ label: category, to: categoryHref });
  }

  items.push({ label: toolName });

  return (
    <motion.nav
      initial={{ opacity: 0, y: -6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      aria-label={bn ? "ব্রেডক্রাম্ব" : "Breadcrumb"}
      className="flex items-center gap-1.5 flex-wrap text-[11px] sm:text-[12px] py-1"
    >
      {items.map((item, i) => {
        const isLast = i === items.length - 1;
        return (
          <span key={i} className="flex items-center gap-1.5 min-w-0">
            {i > 0 && (
              <ChevronRight
                className="w-3 h-3 text-silk-rose/50 shrink-0"
                aria-hidden="true"
              />
            )}
            {i === 0 && (
              <Home
                className="w-3 h-3 text-silk-rose/70 shrink-0"
                aria-hidden="true"
              />
            )}
            {item.to && !isLast ? (
              <Link
                to={item.to}
                className={cn(
                  "font-medium text-light-textSecondary dark:text-dark-textSecondary",
                  "hover:text-silk-wine dark:hover:text-silk-rose-soft transition-colors",
                  "truncate max-w-[120px] sm:max-w-none"
                )}
              >
                {item.label}
              </Link>
            ) : (
              <span
                className={cn(
                  "font-bold truncate max-w-[180px] sm:max-w-none",
                  isLast
                    ? "text-silk-wine dark:text-silk-rose-soft"
                    : "text-light-textSecondary dark:text-dark-textSecondary"
                )}
                aria-current={isLast ? "page" : undefined}
              >
                {item.label}
              </span>
            )}
          </span>
        );
      })}
    </motion.nav>
  );
}
