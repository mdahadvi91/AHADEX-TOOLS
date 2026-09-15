import React from 'react';
import { ShieldCheck, Info, CheckCircle2, AlertCircle } from 'lucide-react';
import type { ToolSEOContentData } from '@/src/types/workspace';

export interface ToolSEOContentProps {
  toolName: string;
  data?: ToolSEOContentData;
  className?: string;
  id?: string;
}

/**
 * Semantic informative content container for AHADEX TOOLS.
 * Provides transparent technical details, supported formats, limitations,
 * and privacy guarantees without marketing hyperbole or keyword stuffing.
 */
export default function ToolSEOContent({
  toolName,
  data,
  className = '',
  id = 'tool-seo-content',
}: ToolSEOContentProps) {
  const intro =
    data?.introduction ||
    `${toolName} is a high-performance browser utility engineered for client-side execution. Files remain protected inside your local device sandbox without remote server storage.`;

  const useCases = data?.useCases || [
    'Quick transformations without installing desktop software',
    'Private handling of sensitive personal or business documents',
    'Mobile-friendly workflows when on the go',
  ];

  const formats = data?.supportedFormats || ['Standard web formats', 'Document PDFs', 'Raster images'];
  const limitations = data?.limitations || [
    'Subject to available system memory in your web browser',
    'Maximum recommended file size is 50 MB per item',
  ];

  return (
    <article
      id={id}
      aria-label={`About ${toolName}`}
      className={`w-full p-6 sm:p-8 rounded-3xl glass-panel bg-white/60 dark:bg-slate-900/50 border border-slate-200/80 dark:border-slate-800/80 space-y-6 text-slate-700 dark:text-slate-300 ${className}`}
    >
      {/* Introduction */}
      <div>
        <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white mb-2">
          About {toolName}
        </h3>
        <p className="text-xs sm:text-sm leading-relaxed text-slate-600 dark:text-slate-400">
          {intro}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-slate-200/70 dark:border-slate-800/80">
        {/* Use Cases */}
        <div>
          <h4 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white flex items-center gap-1.5 mb-3">
            <CheckCircle2 className="w-4 h-4 text-emerald-500" />
            <span>Common Use Cases</span>
          </h4>
          <ul className="space-y-1.5 text-xs text-slate-600 dark:text-slate-400 list-disc list-inside">
            {useCases.map((uc, i) => (
              <li key={i}>{uc}</li>
            ))}
          </ul>
        </div>

        {/* Supported Formats */}
        <div>
          <h4 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white flex items-center gap-1.5 mb-3">
            <Info className="w-4 h-4 text-sky-500" />
            <span>Supported Formats & Specs</span>
          </h4>
          <ul className="space-y-1.5 text-xs text-slate-600 dark:text-slate-400 list-disc list-inside">
            {formats.map((fmt, i) => (
              <li key={i}>{fmt}</li>
            ))}
          </ul>
        </div>
      </div>

      {/* Privacy & Technical Boundaries */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-slate-200/70 dark:border-slate-800/80">
        {/* Privacy architecture */}
        <div className="p-4 rounded-xl bg-emerald-50/50 dark:bg-emerald-950/20 border border-emerald-500/20">
          <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-800 dark:text-emerald-300 mb-1.5">
            <ShieldCheck className="w-4 h-4" />
            <span>Privacy Architecture</span>
          </div>
          <p className="text-[11px] sm:text-xs text-emerald-900/80 dark:text-emerald-300/80 leading-relaxed">
            {data?.privacyInfo ||
              'Processing occurs entirely within your browser runtime using standard Web APIs. No network payload containing your files is dispatched.'}
          </p>
        </div>

        {/* Limitations disclosure */}
        <div className="p-4 rounded-xl bg-amber-50/50 dark:bg-amber-950/20 border border-amber-500/20">
          <div className="flex items-center gap-1.5 text-xs font-bold text-amber-800 dark:text-amber-300 mb-1.5">
            <AlertCircle className="w-4 h-4" />
            <span>Known Technical Limitations</span>
          </div>
          <ul className="text-[11px] sm:text-xs text-amber-900/80 dark:text-amber-300/80 list-disc list-inside space-y-1">
            {limitations.map((lim, i) => (
              <li key={i}>{lim}</li>
            ))}
          </ul>
        </div>
      </div>
    </article>
  );
}
