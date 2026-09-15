import React from 'react';
import {
  CheckCircle2,
  Download,
  RotateCcw,
  FileCheck,
  FileText,
  FileImage,
  ExternalLink,
  Sparkles,
} from 'lucide-react';
import type { WorkspaceResult, WorkspaceOutputItem } from '@/src/types/workspace';
import { formatFileSize } from '@/src/lib/validation';
import { trackFileDownload } from '@/src/lib/analytics';
import { AdSlot } from '@/src/components/common';

export interface ToolResultProps {
  result: WorkspaceResult;
  toolId?: string;
  onReset?: () => void;
  onDownloadItem?: (item: WorkspaceOutputItem) => void;
  onDownloadAll?: () => void;
  className?: string;
  id?: string;
}

/**
 * Reusable Success / Result Presentation for AHADEX TOOLS.
 * Shows processed file outputs, file size metrics, and provides accessible download controls.
 */
export default function ToolResult({
  result,
  toolId = '',
  onReset,
  onDownloadItem,
  onDownloadAll,
  className = '',
  id = 'tool-result',
}: ToolResultProps) {
  const { items, title = 'Processing Complete', message = 'Your files are ready to download.' } = result;

  const handleDownload = (item: WorkspaceOutputItem) => {
    trackFileDownload(toolId, item.mimeType, item.fileSize);

    if (onDownloadItem) {
      onDownloadItem(item);
      return;
    }

    // Default download action if downloadUrl is present
    if (item.downloadUrl) {
      const link = document.createElement('a');
      link.href = item.downloadUrl;
      link.download = item.fileName || 'download';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  const handleDownloadAllClick = () => {
    trackFileDownload(toolId, 'all_files', undefined);
    onDownloadAll?.();
  };

  return (
    <div
      id={id}
      className={`w-full p-6 sm:p-8 rounded-2xl glass-panel-elevated bg-white/95 dark:bg-slate-900/95 border border-emerald-500/30 dark:border-emerald-500/30 shadow-xl ${className}`}
    >
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200/70 dark:border-slate-800/80 mb-6">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
            <CheckCircle2 className="w-6 h-6" aria-hidden="true" />
          </div>
          <div>
            <h3 className="text-lg sm:text-xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              {title}
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
              {message}
            </p>
          </div>
        </div>

        {/* Global actions: Download All (for batch) or Reset */}
        <div className="flex items-center gap-2">
          {items.length > 1 && onDownloadAll && (
            <button
              type="button"
              onClick={handleDownloadAllClick}
              className="px-4 py-2 rounded-xl text-xs sm:text-sm font-bold text-white bg-emerald-600 hover:bg-emerald-500 shadow-md shadow-emerald-600/20 transition-all inline-flex items-center gap-2 active:scale-98"
            >
              <Download className="w-4 h-4" />
              <span>Download All ({items.length})</span>
            </button>
          )}

          {onReset && (
            <button
              type="button"
              onClick={onReset}
              className="px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold text-slate-700 dark:text-slate-200 bg-slate-100 hover:bg-slate-200/80 dark:bg-slate-800 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 transition-all inline-flex items-center gap-1.5 active:scale-98"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Start Again</span>
            </button>
          )}
        </div>
      </div>

      {/* Output Items List */}
      <div className="space-y-3">
        {items.map((item) => {
          const isImage = item.mimeType?.startsWith('image/') || !!item.previewUrl;
          const isPdf = item.mimeType === 'application/pdf';

          return (
            <div
              key={item.id}
              className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-xl bg-slate-50/80 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/80"
            >
              <div className="flex items-center gap-3 min-w-0 flex-1">
                {/* Visual Thumbnail or Document Icon */}
                <div className="w-12 h-12 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 flex items-center justify-center overflow-hidden shrink-0">
                  {item.previewUrl ? (
                    <img
                      src={item.previewUrl}
                      alt={`Preview of ${item.fileName}`}
                      className="w-full h-full object-cover"
                    />
                  ) : isImage ? (
                    <FileImage className="w-6 h-6 text-sky-500" />
                  ) : isPdf ? (
                    <FileText className="w-6 h-6 text-rose-500" />
                  ) : (
                    <FileCheck className="w-6 h-6 text-emerald-500" />
                  )}
                </div>

                {/* File Details */}
                <div className="min-w-0 flex-1">
                  <h4
                    className="text-sm font-bold text-slate-900 dark:text-white truncate"
                    title={item.fileName}
                  >
                    {item.fileName}
                  </h4>
                  <div className="flex items-center gap-2 flex-wrap text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                    {item.fileSize !== undefined && (
                      <span>{formatFileSize(item.fileSize)}</span>
                    )}
                    {item.mimeType && (
                      <span className="font-mono text-[10px] uppercase bg-slate-200/60 dark:bg-slate-700/60 px-1.5 py-0.5 rounded text-slate-700 dark:text-slate-300">
                        {item.mimeType.split('/')[1] || item.mimeType}
                      </span>
                    )}
                    {/* Custom metrics such as compression saved */}
                    {item.metrics &&
                      Object.entries(item.metrics).map(([key, value]) => (
                        <span
                          key={key}
                          className="inline-flex items-center gap-1 font-semibold text-emerald-600 dark:text-emerald-400"
                        >
                          <Sparkles className="w-3 h-3" />
                          {key}: {value}
                        </span>
                      ))}
                  </div>
                </div>
              </div>

              {/* Single Item Action */}
              <div className="shrink-0 flex items-center gap-2 sm:justify-end">
                <button
                  type="button"
                  onClick={() => handleDownload(item)}
                  className="w-full sm:w-auto px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold text-white bg-emerald-600 hover:bg-emerald-500 shadow-sm shadow-emerald-600/20 transition-all inline-flex items-center justify-center gap-2 active:scale-98"
                >
                  <Download className="w-4 h-4" />
                  <span>Download</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Safe Post-Result / Download Ad Placement */}
      <AdSlot placement="tool-result" className="mt-6" />
    </div>
  );
}
