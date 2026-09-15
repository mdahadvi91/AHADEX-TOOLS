import React from 'react';
import { getFeaturedTools } from '@/src/data/tools';
import ToolGrid from './ToolGrid';
import { Sparkles } from 'lucide-react';

export interface FeaturedToolsProps {
  className?: string;
}

/**
 * Featured Tools section component.
 * Derives data exclusively from getFeaturedTools() in src/data/tools.ts.
 */
export default function FeaturedTools({ className = '' }: FeaturedToolsProps) {
  const featuredTools = getFeaturedTools();

  if (featuredTools.length === 0) return null;

  return (
    <section aria-labelledby="featured-tools-heading" className={`w-full ${className}`}>
      <div className="flex items-center justify-between gap-4 mb-6">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400 mb-1">
            <Sparkles className="w-3.5 h-3.5" aria-hidden="true" />
            <span>Spotlight</span>
          </div>
          <h2 id="featured-tools-heading" className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Featured Tools
          </h2>
        </div>
      </div>

      <ToolGrid tools={featuredTools} />
    </section>
  );
}
