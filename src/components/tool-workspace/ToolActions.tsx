import React from 'react';
import {
  Play,
  RotateCcw,
  Download,
  XCircle,
  Plus,
  Loader2,
  CheckCircle,
} from 'lucide-react';
import type { WorkspaceState } from '@/src/types/workspace';

export interface ToolActionsProps {
  state?: WorkspaceState;
  onProcess?: () => void;
  onReset?: () => void;
  onCancel?: () => void;
  onDownload?: () => void;
  onAddMore?: () => void;
  processButtonText?: string;
  resetButtonText?: string;
  downloadButtonText?: string;
  canProcess?: boolean;
  isProcessing?: boolean;
  canCancel?: boolean;
  hasResult?: boolean;
  className?: string;
  id?: string;
  customActions?: React.ReactNode;
}

/**
 * Reusable Action Dock for AHADEX TOOLS.
 * Provides accessible, high-contrast controls for processing, downloading,
 * cancelling, and restarting the workspace workflow.
 */
export default function ToolActions({
  state = 'idle',
  onProcess,
  onReset,
  onCancel,
  onDownload,
  onAddMore,
  processButtonText = 'Process',
  resetButtonText = 'Start Again',
  downloadButtonText = 'Download Result',
  canProcess = true,
  isProcessing = false,
  canCancel = false,
  hasResult = false,
  className = '',
  id = 'tool-actions',
  customActions,
}: ToolActionsProps) {
  const isCurrentlyProcessing = isProcessing || state === 'processing';
  const isSuccess = hasResult || state === 'success';
  const isError = state === 'error';

  return (
    <div
      id={id}
      role="toolbar"
      aria-label="Tool execution actions"
      className={`w-full flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 p-4 rounded-2xl glass-panel-elevated bg-white/90 dark:bg-slate-900/90 border border-slate-200/90 dark:border-slate-800/90 shadow-md ${className}`}
    >
      {/* Left / Secondary Action Group */}
      <div className="flex items-center gap-2 flex-wrap">
        {onReset && (isSuccess || isError || state === 'preview' || state === 'configuring') && (
          <button
            type="button"
            onClick={onReset}
            disabled={isCurrentlyProcessing}
            className="min-h-[44px] px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold text-slate-700 dark:text-slate-200 bg-slate-100 hover:bg-slate-200/80 dark:bg-slate-800 dark:hover:bg-slate-700/80 border border-slate-200 dark:border-slate-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all inline-flex items-center justify-center gap-2 active:scale-[0.98]"
          >
            <RotateCcw className="w-4 h-4" aria-hidden="true" />
            <span>{resetButtonText}</span>
          </button>
        )}

        {onAddMore && !isCurrentlyProcessing && !isSuccess && (
          <button
            type="button"
            onClick={onAddMore}
            className="min-h-[44px] px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold text-slate-700 dark:text-slate-200 bg-white/80 dark:bg-slate-800/70 hover:bg-slate-100 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 transition-all inline-flex items-center justify-center gap-2 active:scale-[0.98]"
          >
            <Plus className="w-4 h-4" aria-hidden="true" />
            <span>Add More</span>
          </button>
        )}

        {customActions}
      </div>

      {/* Right / Primary Action Group */}
      <div className="flex items-center gap-2 flex-wrap sm:justify-end">
        {/* Cancel Button during Processing */}
        {isCurrentlyProcessing && canCancel && onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="min-h-[44px] px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold text-rose-600 dark:text-rose-400 bg-rose-50 hover:bg-rose-100 dark:bg-rose-950/40 dark:hover:bg-rose-900/50 border border-rose-200 dark:border-rose-900/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-500 transition-all inline-flex items-center justify-center gap-2 active:scale-[0.98]"
          >
            <XCircle className="w-4 h-4" aria-hidden="true" />
            <span>Cancel</span>
          </button>
        )}

        {/* Download Button in Success State */}
        {isSuccess && onDownload && (
          <button
            type="button"
            onClick={onDownload}
            className="min-h-[44px] w-full sm:w-auto px-6 py-2.5 rounded-xl text-xs sm:text-sm font-semibold text-white bg-emerald-600 hover:bg-emerald-500 active:bg-emerald-700 shadow-md shadow-emerald-600/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2 transition-all inline-flex items-center justify-center gap-2 active:scale-[0.98]"
          >
            <Download className="w-4 h-4" aria-hidden="true" />
            <span>{downloadButtonText}</span>
          </button>
        )}

        {/* Main Processing Action Button */}
        {!isSuccess && onProcess && (
          <button
            type="button"
            onClick={onProcess}
            disabled={!canProcess || isCurrentlyProcessing}
            aria-busy={isCurrentlyProcessing}
            className="min-h-[44px] w-full sm:w-auto px-6 py-2.5 rounded-xl text-xs sm:text-sm font-bold text-white bg-sky-600 hover:bg-sky-500 active:bg-sky-700 shadow-md shadow-sky-600/25 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 focus-visible:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none transition-all inline-flex items-center justify-center gap-2 active:scale-[0.98]"
          >
            {isCurrentlyProcessing ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" aria-hidden="true" />
                <span>Processing...</span>
              </>
            ) : (
              <>
                <Play className="w-4 h-4 fill-current" aria-hidden="true" />
                <span>{processButtonText}</span>
              </>
            )}
          </button>
        )}
      </div>
    </div>
  );
}
