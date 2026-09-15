import React from 'react';
import { SearchX, RotateCcw } from 'lucide-react';

export interface EmptySearchStateProps {
  query: string;
  onClearQuery?: () => void;
  onSelectSuggestion?: (suggestion: string) => void;
  className?: string;
}

const COMMON_SUGGESTIONS = ['PDF', 'Image', 'Compress', 'QR', 'Converter'];

/**
 * Friendly empty state for search results.
 * Avoids error aesthetics; provides intuitive recovery suggestions.
 */
export default function EmptySearchState({
  query,
  onClearQuery,
  onSelectSuggestion,
  className = '',
}: EmptySearchStateProps) {
  return (
    <div
      role="status"
      aria-live="polite"
      className={`w-full p-8 rounded-2xl glass-panel border border-slate-200/80 dark:border-slate-800/80 text-center flex flex-col items-center justify-center ${className}`}
    >
      <div className="w-12 h-12 rounded-2xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-400 dark:text-slate-500 mb-3">
        <SearchX className="w-6 h-6" aria-hidden="true" />
      </div>

      <h3 className="text-base font-bold text-slate-900 dark:text-white mb-1">
        No tools found for &ldquo;{query}&rdquo;
      </h3>

      <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 max-w-sm mb-4 leading-relaxed">
        We couldn&apos;t find any tool matching your search. Try different keywords or check out suggested terms below.
      </p>

      {/* Suggested keywords */}
      <div className="flex items-center justify-center gap-1.5 flex-wrap max-w-md mb-4">
        <span className="text-xs font-semibold text-slate-400 dark:text-slate-500 mr-1">
          Suggestions:
        </span>
        {COMMON_SUGGESTIONS.map((suggestion) => (
          <button
            key={suggestion}
            type="button"
            onClick={() => onSelectSuggestion?.(suggestion)}
            className="px-2.5 py-1 rounded-lg text-xs font-medium bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-sky-500/10 hover:text-sky-600 dark:hover:text-sky-400 border border-slate-200/60 dark:border-slate-700/60 transition-colors"
          >
            {suggestion}
          </button>
        ))}
      </div>

      {onClearQuery && (
        <button
          type="button"
          onClick={onClearQuery}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-sky-600 dark:text-sky-400 hover:underline"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Clear search</span>
        </button>
      )}
    </div>
  );
}
