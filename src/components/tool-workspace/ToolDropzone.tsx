import React, { useRef, useState, useCallback } from 'react';
import { UploadCloud, FileCheck, AlertCircle } from 'lucide-react';
import { formatFileSize } from '@/src/lib/validation';

export interface ToolDropzoneProps {
  onFilesSelected: (files: File[]) => void;
  acceptedExtensions?: string[];
  acceptedMimeTypes?: string[];
  maxFileSizeMb?: number;
  allowMultiple?: boolean;
  disabled?: boolean;
  isProcessing?: boolean;
  title?: string;
  subtitle?: string;
  className?: string;
  id?: string;
}

/**
 * Reusable, accessible Tool Dropzone for AHADEX TOOLS.
 * Supports drag-and-drop, manual file browsing, and keyboard activation.
 * Purely client-side: passes selected files to parent without any network transfer.
 */
export default function ToolDropzone({
  onFilesSelected,
  acceptedExtensions = [],
  acceptedMimeTypes = [],
  maxFileSizeMb = 50,
  allowMultiple = true,
  disabled = false,
  isProcessing = false,
  title = 'Drag & drop your files here',
  subtitle = 'or click to browse from your device',
  className = '',
  id = 'tool-dropzone',
}: ToolDropzoneProps) {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [isDragOver, setIsDragOver] = useState(false);

  // Construct HTML accept string (e.g. ".jpg,.png,image/jpeg")
  const acceptAttribute = [
    ...acceptedExtensions.map((ext) => (ext.startsWith('.') ? ext : `.${ext}`)),
    ...acceptedMimeTypes,
  ].join(',');

  const handleDragEnter = useCallback(
    (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      e.stopPropagation();
      if (disabled || isProcessing) return;
      setIsDragOver(true);
    },
    [disabled, isProcessing]
  );

  const handleDragOver = useCallback(
    (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      e.stopPropagation();
      if (disabled || isProcessing) return;
      if (!isDragOver) setIsDragOver(true);
    },
    [disabled, isProcessing, isDragOver]
  );

  const handleDragLeave = useCallback(
    (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      e.stopPropagation();
      // Only reset when leaving the dropzone container itself
      if (e.currentTarget.contains(e.relatedTarget as Node)) return;
      setIsDragOver(false);
    },
    []
  );

  const handleDrop = useCallback(
    (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      e.stopPropagation();
      setIsDragOver(false);

      if (disabled || isProcessing) return;

      const droppedFiles = Array.from(e.dataTransfer.files || []);
      if (droppedFiles.length > 0) {
        onFilesSelected(allowMultiple ? droppedFiles : [droppedFiles[0]]);
      }
    },
    [disabled, isProcessing, allowMultiple, onFilesSelected]
  );

  const handleFileInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const selected = Array.from(e.target.files || []);
      if (selected.length > 0) {
        onFilesSelected(allowMultiple ? selected : [selected[0]]);
      }
      // Reset input value so selecting the same file again triggers change
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    },
    [allowMultiple, onFilesSelected]
  );

  const handleTriggerClick = () => {
    if (disabled || isProcessing) return;
    fileInputRef.current?.click();
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleTriggerClick();
    }
  };

  return (
    <div
      id={id}
      role="button"
      tabIndex={disabled || isProcessing ? -1 : 0}
      aria-label={`${title}. ${subtitle}.`}
      aria-disabled={disabled || isProcessing}
      onClick={handleTriggerClick}
      onKeyDown={handleKeyDown}
      onDragEnter={handleDragEnter}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      className={`relative w-full rounded-2xl p-6 sm:p-10 text-center transition-all duration-200 cursor-pointer select-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 focus-visible:ring-offset-2 ${
        disabled || isProcessing
          ? 'opacity-60 cursor-not-allowed bg-slate-100/50 dark:bg-slate-900/40 border-2 border-dashed border-slate-300 dark:border-slate-800'
          : isDragOver
          ? 'bg-sky-500/10 dark:bg-sky-500/15 border-2 border-dashed border-sky-500 scale-[1.008] shadow-lg shadow-sky-500/10'
          : 'bg-white/60 dark:bg-slate-900/50 hover:bg-white/80 dark:hover:bg-slate-900/70 border-2 border-dashed border-slate-300/90 dark:border-slate-700/90 hover:border-sky-500/60 dark:hover:border-sky-500/60 shadow-sm'
      } ${className}`}
    >
      {/* Hidden Accessible File Input */}
      <input
        ref={fileInputRef}
        type="file"
        multiple={allowMultiple}
        accept={acceptAttribute || undefined}
        disabled={disabled || isProcessing}
        onChange={handleFileInputChange}
        className="sr-only"
        tabIndex={-1}
        aria-hidden="true"
      />

      <div className="flex flex-col items-center justify-center pointer-events-none max-w-lg mx-auto">
        {/* Animated Icon Target */}
        <div
          className={`w-14 h-14 sm:w-16 sm:h-16 rounded-2xl flex items-center justify-center mb-4 transition-transform duration-200 ${
            isDragOver
              ? 'bg-sky-500 text-white scale-110 shadow-lg shadow-sky-500/30'
              : 'bg-gradient-to-tr from-sky-500/15 to-indigo-500/15 border border-sky-500/20 text-sky-600 dark:text-sky-400'
          }`}
        >
          <UploadCloud className="w-7 h-7 sm:w-8 sm:h-8" aria-hidden="true" />
        </div>

        {/* Action Title & Subtitle */}
        <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white tracking-tight mb-1">
          {isDragOver ? 'Drop files to add' : title}
        </h3>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mb-5 max-w-sm">
          {subtitle}
        </p>

        {/* Visual Browse Pill (for explicit optical affordance) */}
        <span
          className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all shadow-sm ${
            isDragOver
              ? 'bg-sky-600 text-white'
              : 'bg-sky-600 hover:bg-sky-500 text-white shadow-sky-600/20'
          }`}
        >
          <FileCheck className="w-4 h-4" aria-hidden="true" />
          <span>Browse Files</span>
        </span>

        {/* Accepted Formats & File Size Caps Notice */}
        <div className="mt-5 flex items-center justify-center gap-2 flex-wrap text-[11px] text-slate-500 dark:text-slate-400">
          {acceptedExtensions.length > 0 && (
            <span className="font-mono bg-slate-200/70 dark:bg-slate-800/80 px-2 py-0.5 rounded-md text-slate-700 dark:text-slate-300">
              {acceptedExtensions.map((e) => e.replace(/^\./, '').toUpperCase()).join(', ')}
            </span>
          )}
          {maxFileSizeMb && (
            <span className="inline-flex items-center gap-1 text-slate-500 dark:text-slate-400">
              Max: <strong className="text-slate-700 dark:text-slate-300">{maxFileSizeMb} MB</strong> per file
            </span>
          )}
          {allowMultiple && (
            <span className="text-slate-400 dark:text-slate-500">· Batch processing supported</span>
          )}
        </div>
      </div>
    </div>
  );
}
