import React, { useState, useEffect } from 'react';
import {
  FileImage,
  FileText,
  FileCode,
  File as GenericFileIcon,
  ZoomIn,
  ZoomOut,
  Maximize2,
  RefreshCw,
  Eye,
} from 'lucide-react';
import type { WorkspaceFile } from '@/src/types/workspace';
import { formatFileSize } from '@/src/lib/validation';

export interface ToolPreviewProps {
  file?: WorkspaceFile | null;
  textPreview?: string | null;
  customPreview?: React.ReactNode;
  title?: string;
  className?: string;
  id?: string;
}

/**
 * Reusable, safe preview component for AHADEX TOOLS.
 * Supports image inspection, safe text/code displays, document metadata cards,
 * and custom preview injection without risky HTML evaluation.
 */
export default function ToolPreview({
  file,
  textPreview,
  customPreview,
  title = 'Preview',
  className = '',
  id = 'tool-preview',
}: ToolPreviewProps) {
  const [zoomLevel, setZoomLevel] = useState<number>(1);
  const [fitMode, setFitMode] = useState<'contain' | 'cover'>('contain');

  // Reset zoom when active file changes
  useEffect(() => {
    setZoomLevel(1);
  }, [file?.id]);

  if (customPreview) {
    return (
      <div id={id} className={`w-full ${className}`}>
        {customPreview}
      </div>
    );
  }

  if (!file && !textPreview) {
    return (
      <div
        id={id}
        className={`w-full min-h-[220px] rounded-2xl glass-panel bg-white/40 dark:bg-slate-900/40 border border-dashed border-slate-300 dark:border-slate-800 flex flex-col items-center justify-center p-8 text-center text-slate-400 dark:text-slate-600 ${className}`}
      >
        <Eye className="w-8 h-8 mb-2 opacity-50" aria-hidden="true" />
        <p className="text-xs sm:text-sm font-medium">No item selected for preview</p>
      </div>
    );
  }

  const isImage = file?.type.startsWith('image/') || !!file?.previewUrl;
  const isPdf = file?.type === 'application/pdf' || file?.extension === 'pdf';
  const isText = file?.type.startsWith('text/') || file?.extension === 'txt' || !!textPreview;

  return (
    <div
      id={id}
      className={`w-full rounded-2xl glass-panel bg-white/80 dark:bg-slate-900/70 border border-slate-200/80 dark:border-slate-800/80 overflow-hidden flex flex-col shadow-sm ${className}`}
    >
      {/* Preview Header / Action Bar */}
      <div className="flex items-center justify-between gap-3 px-4 py-3 border-b border-slate-200/70 dark:border-slate-800/80 bg-slate-50/70 dark:bg-slate-850/50">
        <div className="flex items-center gap-2 min-w-0">
          <Eye className="w-4 h-4 text-sky-500 shrink-0" aria-hidden="true" />
          <h4 className="text-xs sm:text-sm font-semibold text-slate-900 dark:text-white truncate">
            {file ? file.name : title}
          </h4>
          {file && (
            <span className="text-[11px] text-slate-500 dark:text-slate-400 font-mono shrink-0">
              ({formatFileSize(file.size)})
            </span>
          )}
        </div>

        {/* Optical Image Zoom / Fit Controls */}
        {isImage && file?.previewUrl && (
          <div className="flex items-center gap-1 shrink-0">
            <button
              type="button"
              onClick={() => setZoomLevel((z) => Math.max(0.5, z - 0.25))}
              disabled={zoomLevel <= 0.5}
              aria-label="Zoom out preview"
              className="p-1 rounded-lg text-slate-500 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200/60 dark:hover:bg-slate-800 disabled:opacity-30 transition-colors"
            >
              <ZoomOut className="w-3.5 h-3.5" />
            </button>
            <span className="text-[10px] font-mono w-9 text-center text-slate-600 dark:text-slate-400">
              {Math.round(zoomLevel * 100)}%
            </span>
            <button
              type="button"
              onClick={() => setZoomLevel((z) => Math.min(3, z + 0.25))}
              disabled={zoomLevel >= 3}
              aria-label="Zoom in preview"
              className="p-1 rounded-lg text-slate-500 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200/60 dark:hover:bg-slate-800 disabled:opacity-30 transition-colors"
            >
              <ZoomIn className="w-3.5 h-3.5" />
            </button>
            <button
              type="button"
              onClick={() => setFitMode((m) => (m === 'contain' ? 'cover' : 'contain'))}
              aria-label={`Toggle fit mode (current: ${fitMode})`}
              title={`Toggle fit mode (${fitMode})`}
              className="p-1 ml-1 rounded-lg text-slate-500 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200/60 dark:hover:bg-slate-800 transition-colors text-[10px] font-medium"
            >
              {fitMode === 'contain' ? 'Fit' : 'Fill'}
            </button>
          </div>
        )}
      </div>

      {/* Preview Viewport Canvas */}
      <div className="relative w-full min-h-[260px] sm:min-h-[320px] max-h-[460px] flex items-center justify-center p-4 bg-slate-900/5 dark:bg-black/30 overflow-auto">
        {/* Case 1: Image Preview */}
        {isImage && file?.previewUrl ? (
          <div className="overflow-hidden flex items-center justify-center w-full h-full transition-transform duration-150">
            <img
              src={file.previewUrl}
              alt={file.name}
              className={`max-w-full max-h-[420px] rounded-lg shadow-md transition-all duration-150 ${
                fitMode === 'contain' ? 'object-contain' : 'object-cover w-full h-full'
              }`}
              style={{ transform: `scale(${zoomLevel})`, transformOrigin: 'center center' }}
              loading="lazy"
            />
          </div>
        ) : null}

        {/* Case 2: PDF Document Metadata Card (PDF rendering library not added in this phase) */}
        {isPdf && (
          <div className="flex flex-col items-center justify-center text-center p-6 max-w-sm">
            <div className="w-16 h-16 rounded-2xl bg-rose-500/10 border border-rose-500/20 text-rose-600 dark:text-rose-400 flex items-center justify-center mb-3">
              <FileText className="w-8 h-8" aria-hidden="true" />
            </div>
            <h5 className="text-sm font-bold text-slate-900 dark:text-white truncate max-w-xs">
              {file?.name}
            </h5>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              PDF Document · {file && formatFileSize(file.size)}
            </p>
            <div className="mt-4 px-3 py-1 rounded-full text-[11px] font-medium bg-slate-200/70 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
              Ready for client-side processing
            </div>
          </div>
        )}

        {/* Case 3: Text / Code Preview (Safe rendering, strictly no dangerouslySetInnerHTML) */}
        {isText && (
          <div className="w-full h-full max-h-[380px] overflow-auto rounded-xl bg-slate-950 p-4 text-slate-200 font-mono text-xs leading-relaxed border border-slate-800">
            <pre className="whitespace-pre-wrap break-all select-text font-mono">
              {textPreview || 'Text content preview'}
            </pre>
          </div>
        )}

        {/* Case 4: Generic Document */}
        {!isImage && !isPdf && !isText && file && (
          <div className="flex flex-col items-center justify-center text-center p-6 max-w-sm">
            <div className="w-16 h-16 rounded-2xl bg-sky-500/10 border border-sky-500/20 text-sky-600 dark:text-sky-400 flex items-center justify-center mb-3">
              <GenericFileIcon className="w-8 h-8" aria-hidden="true" />
            </div>
            <h5 className="text-sm font-bold text-slate-900 dark:text-white truncate max-w-xs">
              {file.name}
            </h5>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              {file.type || 'Generic file'} · {formatFileSize(file.size)}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
