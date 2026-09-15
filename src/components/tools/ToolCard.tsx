import React from 'react';
import { Link } from 'react-router-dom';
import type { Tool } from '@/src/types/tool';
import { useLanguage, type TranslationKey } from '@/src/hooks';
import {
  FileImage,
  FileText,
  RefreshCw,
  Minimize2,
  QrCode,
  Wrench,
  ArrowRight,
  Clock,
  Sparkles,
  LucideIcon,
} from 'lucide-react';

const ICON_MAP: Record<string, LucideIcon> = {
  FileImage,
  FileText,
  RefreshCw,
  Minimize2,
  QrCode,
  Wrench,
};

const TOOL_I18N_MAP: Record<string, { nameKey: TranslationKey; descKey: TranslationKey }> = {
  'jpg-to-pdf': { nameKey: 'tool_jpgToPdf_name', descKey: 'tool_jpgToPdf_desc' },
  'pdf-to-jpg': { nameKey: 'tool_pdfToJpg_name', descKey: 'tool_pdfToJpg_desc' },
  'image-converter': { nameKey: 'tool_imageConverter_name', descKey: 'tool_imageConverter_desc' },
  'image-compressor': { nameKey: 'tool_imageCompressor_name', descKey: 'tool_imageCompressor_desc' },
  'qr-code-generator': { nameKey: 'tool_qrGenerator_name', descKey: 'tool_qrGenerator_desc' },
};

export interface ToolCardProps {
  tool: Tool;
  className?: string;
  showCategoryBadge?: boolean;
  onClick?: () => void;
}

/**
 * Reusable ToolCard component.
 * Displays metadata, icon, category, and real status badge.
 * Navigates directly to the tool route.
 */
export default function ToolCard({
  tool,
  className = '',
  showCategoryBadge = true,
  onClick,
}: ToolCardProps) {
  const { t } = useLanguage();
  const IconComponent = ICON_MAP[tool.icon] || Wrench;
  const isComingSoon = tool.status === 'coming-soon';

  const i18nEntry = TOOL_I18N_MAP[tool.id];
  const toolName = i18nEntry ? t(i18nEntry.nameKey, tool.name) : tool.name;
  const toolDescription = i18nEntry ? t(i18nEntry.descKey, tool.shortDescription) : tool.shortDescription;
  const categoryLabel = t(`cat_${tool.category}` as TranslationKey, tool.category);

  return (
    <Link
      to={tool.route}
      id={`tool-card-${tool.id}`}
      aria-label={`${toolName} - ${toolDescription}`}
      onClick={onClick}
      className={`group relative flex flex-col justify-between p-5 rounded-2xl glass-panel-interactive border border-slate-200/80 dark:border-slate-800/80 bg-white/70 dark:bg-slate-900/60 hover:bg-white dark:hover:bg-slate-900/90 transition-all hover:border-sky-500/40 dark:hover:border-sky-500/40 hover:shadow-lg hover:-translate-y-0.5 ${className}`}
    >
      <div>
        {/* Top bar: Icon & Badges */}
        <div className="flex items-start justify-between gap-3 mb-4">
          <div className="w-11 h-11 rounded-xl bg-gradient-to-tr from-sky-500/10 to-indigo-500/10 border border-sky-500/20 dark:border-sky-400/20 flex items-center justify-center text-sky-600 dark:text-sky-400 group-hover:scale-105 group-hover:bg-sky-500/20 transition-all">
            <IconComponent className="w-5 h-5" aria-hidden="true" />
          </div>

          <div className="flex items-center gap-1.5 flex-wrap justify-end">
            {tool.isFeatured && (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold uppercase tracking-wider bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20">
                <Sparkles className="w-2.5 h-2.5" />
                Featured
              </span>
            )}
            {isComingSoon ? (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold uppercase tracking-wider bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-700">
                <Clock className="w-2.5 h-2.5" />
                {t('comingSoon')}
              </span>
            ) : (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold uppercase tracking-wider bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                {t('freeBadge')}
              </span>
            )}
          </div>
        </div>

        {/* Tool Name */}
        <h3 className="text-base font-bold text-slate-900 dark:text-white group-hover:text-sky-600 dark:group-hover:text-sky-400 transition-colors mb-1.5 line-clamp-1">
          {toolName}
        </h3>

        {/* Tool Short Description */}
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 line-clamp-2 leading-relaxed mb-4">
          {toolDescription}
        </p>
      </div>

      {/* Bottom Bar: Category & Action */}
      <div className="pt-3 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-xs">
        {showCategoryBadge && (
          <span className="uppercase tracking-wider font-semibold text-[10px] text-slate-400 dark:text-slate-500">
            {categoryLabel}
          </span>
        )}

        <span className="ml-auto inline-flex items-center gap-1 font-semibold text-sky-600 dark:text-sky-400 group-hover:translate-x-0.5 transition-transform">
          <span>{t('openTool')}</span>
          <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
        </span>
      </div>
    </Link>
  );
}
