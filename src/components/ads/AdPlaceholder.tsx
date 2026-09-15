import React from 'react';
import { EyeOff, Radio } from 'lucide-react';
import type { AdPlacement, AdProvider } from '@/src/types/ads';

export interface AdPlaceholderProps {
  placement: AdPlacement;
  provider?: AdProvider | null;
  reason?: string;
  minHeightPx?: number;
  className?: string;
}

/**
 * Developer Inspection & Debug Placeholder for Ad Slots.
 * 
 * Rules:
 * - Rendered strictly in development or when explicitly enabled in debug mode.
 * - NEVER renders fake advertisements, mock banners, or deceptive copy.
 * - Helps developers and designers verify responsive slot dimensions, margins, and layout stability.
 * - Meets accessibility standards (role="region", clear labeling).
 */
export default function AdPlaceholder({
  placement,
  provider,
  reason = 'provider_not_configured',
  minHeightPx = 90,
  className = '',
}: AdPlaceholderProps) {
  return (
    <aside
      role="region"
      aria-label={`Developer Preview: Ad Slot ${placement}`}
      style={{ minHeight: `${minHeightPx}px` }}
      className={`w-full my-4 p-4 rounded-xl border border-dashed border-slate-300 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-900/30 flex flex-col items-center justify-center text-center select-none transition-all ${className}`}
    >
      <div className="flex items-center gap-2 mb-1.5">
        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-mono font-semibold uppercase tracking-wider bg-slate-200/80 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
          <Radio className="w-3 h-3 text-amber-500" aria-hidden="true" />
          AdSlot Preview ({placement})
        </span>
        <span className="text-[10px] font-mono text-slate-400 dark:text-slate-500">
          Target: {provider || 'unassigned'}
        </span>
      </div>

      <p className="text-xs text-slate-500 dark:text-slate-400 max-w-md flex items-center gap-1.5 justify-center">
        <EyeOff className="w-3.5 h-3.5 text-slate-400 shrink-0" aria-hidden="true" />
        <span>
          {reason === 'provider_not_configured'
            ? 'Inactive: No ad network credentials configured.'
            : `Slot idle (${reason}). Real ads will render once valid credentials are provided.`}
        </span>
      </p>

      <div className="mt-2 text-[10px] font-mono text-slate-400 dark:text-slate-500">
        Reserved Height: {minHeightPx}px • CLS Protected
      </div>
    </aside>
  );
}
