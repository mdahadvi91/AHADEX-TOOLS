import React from 'react';
import { getPopularTools } from '@/src/data/tools';
import ToolGrid from './ToolGrid';
import { Flame } from 'lucide-react';

export interface PopularToolsProps {
  className?: string;
}

/**
 * Popular Tools section component.
 * Derives data exclusively from getPopularTools() in src/data/tools.ts.
 */
export default function PopularTools({ className = '' }: PopularToolsProps) {
  const popularTools = getPopularTools();

  if (popularTools.length === 0) return null;

  return (
    <section aria-labelledby="popular-tools-heading" className={`w-full ${className}`}>
      <div className="flex items-center justify-between gap-4 mb-6">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-sky-600 dark:text-sky-400 mb-1">
            <Flame className="w-3.5 h-3.5" aria-hidden="true" />
            <span>Trending Utilities</span>
          </div>
          <h2 id="popular-tools-heading" className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Popular Tools
          </h2>
        </div>
      </div>

      <ToolGrid tools={popularTools} />
    </section>
  );
}
