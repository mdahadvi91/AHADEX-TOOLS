import React from 'react';
import { AlertTriangle, RotateCcw, RefreshCw, HelpCircle } from 'lucide-react';
import type { WorkspaceError } from '@/src/types/workspace';

export interface ToolErrorProps {
  error: WorkspaceError | string;
  onReset?: () => void;
  onRetry?: () => void;
  className?: string;
  id?: string;
}

/**
 * Reusable Error Presentation for AHADEX TOOLS.
 * Provides accessible explanations, helpful recovery guidance, and action triggers
 * without leaking raw system stack traces to users.
 */
export default function ToolError({
  error,
  onReset,
  onRetry,
  className = '',
  id = 'tool-error',
}: ToolErrorProps) {
  const errorObj: WorkspaceError =
    typeof error === 'string'
      ? { message: error, title: 'Processing Could Not Be Completed' }
      : error;

  const {
    title = 'Unable to Process File',
    message,
    code,
    details,
    recoverable = true,
  } = errorObj;

  return (
    <div
      id={id}
      role="alert"
      aria-live="assertive"
      className={`w-full p-6 sm:p-8 rounded-2xl glass-panel-elevated bg-rose-50/90 dark:bg-rose-950/40 border border-rose-300 dark:border-rose-900/60 text-slate-900 dark:text-slate-100 shadow-md ${className}`}
    >
      <div className="flex flex-col sm:flex-row items-start gap-4">
        {/* Error Icon */}
        <div className="w-12 h-12 rounded-2xl bg-rose-500/15 border border-rose-500/30 text-rose-600 dark:text-rose-400 flex items-center justify-center shrink-0">
          <AlertTriangle className="w-6 h-6" aria-hidden="true" />
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <h3 className="text-base sm:text-lg font-bold text-rose-950 dark:text-rose-100">
              {title}
            </h3>
            {code && (
              <span className="font-mono text-[10px] uppercase bg-rose-200/60 dark:bg-rose-900/60 px-2 py-0.5 rounded text-rose-900 dark:text-rose-200 font-semibold">
                {code}
              </span>
            )}
          </div>

          <p className="text-xs sm:text-sm text-rose-800 dark:text-rose-300 leading-relaxed mb-3">
            {message}
          </p>

          {/* Optional non-sensitive detail guidance */}
          {details && (
            <div className="p-3 rounded-xl bg-white/60 dark:bg-black/30 border border-rose-200/60 dark:border-rose-900/40 text-xs text-rose-900 dark:text-rose-200 mb-4 font-mono leading-relaxed">
              {details}
            </div>
          )}

          {/* Recovery Tips Box */}
          <div className="p-3.5 rounded-xl bg-white/70 dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800/80 text-xs text-slate-600 dark:text-slate-400 mb-4">
            <div className="flex items-center gap-1.5 font-semibold text-slate-800 dark:text-slate-200 mb-1">
              <HelpCircle className="w-3.5 h-3.5 text-sky-500" />
              <span>Recommended Next Steps:</span>
            </div>
            <ul className="list-disc list-inside space-y-1 pl-1">
              <li>Verify your file is not password-protected or corrupted.</li>
              <li>Ensure the file format matches the accepted tool inputs.</li>
              <li>Try reducing the file size if it exceeds maximum limits.</li>
            </ul>
          </div>

          {/* Action Recovery Buttons */}
          <div className="flex items-center gap-2 flex-wrap">
            {onRetry && recoverable && (
              <button
                type="button"
                onClick={onRetry}
                className="px-4 py-2 rounded-xl text-xs sm:text-sm font-bold text-white bg-rose-600 hover:bg-rose-500 active:bg-rose-700 shadow-sm transition-all inline-flex items-center gap-1.5 active:scale-98"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Retry</span>
              </button>
            )}

            {onReset && (
              <button
                type="button"
                onClick={onReset}
                className="px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold text-slate-700 dark:text-slate-200 bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 transition-all inline-flex items-center gap-1.5 active:scale-98"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Start Over</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
