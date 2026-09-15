import React from 'react';
import {
  FileText,
  FileImage,
  File as GenericFileIcon,
  Trash2,
  ArrowUp,
  ArrowDown,
  AlertCircle,
  CheckCircle2,
} from 'lucide-react';
import type { WorkspaceFile } from '@/src/types/workspace';
import { formatFileSize } from '@/src/lib/validation';

export interface ToolFileListProps {
  files: WorkspaceFile[];
  onRemoveFile: (id: string) => void;
  onClearAll?: () => void;
  onMoveFile?: (fromIndex: number, toIndex: number) => void;
  allowReorder?: boolean;
  disabled?: boolean;
  className?: string;
  id?: string;
}

/**
 * Reusable File List component for AHADEX TOOLS.
 * Displays uploaded files with optical thumbnails/icons, size stats, reorder capabilities,
 * and single/batch removal.
 */
export default function ToolFileList({
  files,
  onRemoveFile,
  onClearAll,
  onMoveFile,
  allowReorder = true,
  disabled = false,
  className = '',
  id = 'tool-file-list',
}: ToolFileListProps) {
  if (files.length === 0) {
    return null;
  }

  const totalSize = files.reduce((acc, f) => acc + f.size, 0);

  const getFileIcon = (file: WorkspaceFile) => {
    if (file.type.startsWith('image/')) {
      return <FileImage className="w-5 h-5 text-sky-500" aria-hidden="true" />;
    }
    if (file.type === 'application/pdf' || file.extension === 'pdf') {
      return <FileText className="w-5 h-5 text-rose-500" aria-hidden="true" />;
    }
    return <GenericFileIcon className="w-5 h-5 text-slate-400" aria-hidden="true" />;
  };

  return (
    <div id={id} className={`w-full flex flex-col space-y-3 ${className}`}>
      {/* List Header Bar */}
      <div className="flex items-center justify-between gap-2 px-1 text-xs text-slate-600 dark:text-slate-400">
        <div className="flex items-center gap-2 font-medium">
          <span className="font-semibold text-slate-900 dark:text-white">
            {files.length} {files.length === 1 ? 'file' : 'files'} selected
          </span>
          <span className="text-slate-400 dark:text-slate-600">·</span>
          <span>Total: {formatFileSize(totalSize)}</span>
        </div>

        {onClearAll && (
          <button
            type="button"
            onClick={onClearAll}
            disabled={disabled}
            className="inline-flex items-center gap-1 text-xs font-semibold text-rose-600 dark:text-rose-400 hover:text-rose-700 dark:hover:text-rose-300 disabled:opacity-50 disabled:cursor-not-allowed transition-colors py-1 px-2 rounded-lg hover:bg-rose-50 dark:hover:bg-rose-950/30"
          >
            <Trash2 className="w-3.5 h-3.5" aria-hidden="true" />
            <span>Clear All</span>
          </button>
        )}
      </div>

      {/* Files List Container */}
      <ul
        aria-label="Uploaded files list"
        className="divide-y divide-slate-200/70 dark:divide-slate-800/80 rounded-2xl glass-panel bg-white/70 dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800/80 overflow-hidden shadow-sm"
      >
        {files.map((fileItem, index) => {
          const isFirst = index === 0;
          const isLast = index === files.length - 1;
          const hasError = fileItem.status === 'invalid' || !!fileItem.error;

          return (
            <li
              key={fileItem.id}
              className={`flex items-center justify-between gap-3 p-3 sm:p-4 transition-colors ${
                hasError
                  ? 'bg-rose-50/60 dark:bg-rose-950/20'
                  : 'hover:bg-slate-50/70 dark:hover:bg-slate-850/50'
              }`}
            >
              {/* Left: Thumbnail / Icon & File Details */}
              <div className="flex items-center gap-3 min-w-0 flex-1">
                {/* Thumbnail or Fallback Icon */}
                <div className="w-10 h-10 sm:w-12 sm:h-12 shrink-0 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700/80 flex items-center justify-center overflow-hidden">
                  {fileItem.previewUrl ? (
                    <img
                      src={fileItem.previewUrl}
                      alt={`Thumbnail of ${fileItem.name}`}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  ) : (
                    getFileIcon(fileItem)
                  )}
                </div>

                {/* Metadata */}
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <p
                      className="text-xs sm:text-sm font-semibold text-slate-900 dark:text-white truncate"
                      title={fileItem.name}
                    >
                      {fileItem.name}
                    </p>
                    {fileItem.extension && (
                      <span className="uppercase text-[10px] font-mono px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 shrink-0">
                        {fileItem.extension}
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-2 text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                    <span>{formatFileSize(fileItem.size)}</span>
                    {hasError ? (
                      <span className="inline-flex items-center gap-1 text-rose-600 dark:text-rose-400 font-medium">
                        <AlertCircle className="w-3 h-3" />
                        {fileItem.error || 'Invalid file'}
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 text-emerald-600 dark:text-emerald-400 font-medium">
                        <CheckCircle2 className="w-3 h-3" /> Ready
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Right: Reorder & Remove Controls */}
              <div className="flex items-center gap-1 shrink-0">
                {allowReorder && onMoveFile && files.length > 1 && (
                  <div className="flex items-center gap-0.5 mr-1">
                    <button
                      type="button"
                      disabled={disabled || isFirst}
                      onClick={() => onMoveFile(index, index - 1)}
                      aria-label={`Move ${fileItem.name} up`}
                      title="Move up"
                      className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-200/60 dark:hover:bg-slate-800 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                    >
                      <ArrowUp className="w-4 h-4" aria-hidden="true" />
                    </button>
                    <button
                      type="button"
                      disabled={disabled || isLast}
                      onClick={() => onMoveFile(index, index + 1)}
                      aria-label={`Move ${fileItem.name} down`}
                      title="Move down"
                      className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-200/60 dark:hover:bg-slate-800 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                    >
                      <ArrowDown className="w-4 h-4" aria-hidden="true" />
                    </button>
                  </div>
                )}

                <button
                  type="button"
                  disabled={disabled}
                  onClick={() => onRemoveFile(fileItem.id)}
                  aria-label={`Remove ${fileItem.name}`}
                  title="Remove file"
                  className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 dark:hover:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/40 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                >
                  <Trash2 className="w-4 h-4" aria-hidden="true" />
                </button>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
