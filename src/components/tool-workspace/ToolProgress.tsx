import React from 'react';
import { Loader2, XCircle, Cpu } from 'lucide-react';
import type { WorkspaceProgress } from '@/src/types/workspace';

export interface ToolProgressProps {
  progress?: WorkspaceProgress;
  onCancel?: () => void;
  className?: string;
  id?: string;
}

/**
 * Reusable Progress Display for AHADEX TOOLS.
 * Supports both determinate percentages and honest indeterminate processing states.
 * Guarantees accessibility via ARIA roles and live status regions.
 */
export default function ToolProgress({
  progress,
  onCancel,
  className = '',
  id = 'tool-progress',
}: ToolProgressProps) {
  const isIndeterminate = progress?.isIndeterminate ?? progress?.percentage === undefined;
  const percentage = Math.min(100, Math.max(0, progress?.percentage ?? 0));
  const statusMessage = progress?.statusMessage || 'Processing in your browser...';

  return (
    <div
      id={id}
      className={`w-full p-6 sm:p-8 rounded-2xl glass-panel-elevated bg-white/90 dark:bg-slate-900/90 border border-slate-200/90 dark:border-slate-800/90 shadow-lg ${className}`}
    >
      <div className="flex items-start justify-between gap-4 mb-4">
        {/* Step indicator or processing header */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-sky-500/10 border border-sky-500/20 text-sky-600 dark:text-sky-400 flex items-center justify-center shrink-0">
            <Cpu className="w-5 h-5 animate-pulse" aria-hidden="true" />
          </div>
          <div>
            <div className="text-xs font-mono uppercase tracking-wider text-sky-600 dark:text-sky-400">
              {progress?.currentStep || 'Client-Side Execution'}
            </div>
            <h4
              role="status"
              aria-live="polite"
              className="text-sm sm:text-base font-bold text-slate-900 dark:text-white"
            >
              {statusMessage}
            </h4>
          </div>
        </div>

        {/* Percentage Counter or Cancel Action */}
        <div className="flex items-center gap-3 shrink-0">
          {!isIndeterminate && (
            <span className="text-sm sm:text-base font-mono font-extrabold text-sky-600 dark:text-sky-400">
              {Math.round(percentage)}%
            </span>
          )}

          {progress?.cancelable && onCancel && (
            <button
              type="button"
              onClick={onCancel}
              aria-label="Cancel processing"
              className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 dark:hover:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors"
            >
              <XCircle className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Progress Bar Container */}
      <div
        role="progressbar"
        aria-label={statusMessage}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={isIndeterminate ? undefined : Math.round(percentage)}
        className="w-full h-2.5 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden relative"
      >
        {isIndeterminate ? (
          /* Indeterminate animated gradient bar */
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-sky-500 to-transparent animate-shimmer" />
        ) : (
          /* Determinate progress bar */
          <div
            className="h-full bg-gradient-to-r from-sky-500 to-indigo-600 rounded-full transition-all duration-300 ease-out"
            style={{ width: `${percentage}%` }}
          />
        )}
      </div>

      {/* Subtext info */}
      <div className="flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400 mt-3">
        <span className="inline-flex items-center gap-1">
          <Loader2 className="w-3 h-3 animate-spin text-sky-500" />
          <span>Executing privately in local browser memory</span>
        </span>
        {progress?.totalSteps && progress.totalSteps > 1 && (
          <span className="font-mono">
            Step {progress.currentStepIndex || 1} of {progress.totalSteps}
          </span>
        )}
      </div>
    </div>
  );
}
