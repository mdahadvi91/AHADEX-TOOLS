import React, { useState, useEffect, useCallback, useRef } from 'react';
import type {
  WorkspaceState,
  WorkspaceFile,
  WorkspaceProgress,
  WorkspaceResult,
  WorkspaceError,
  WorkspaceOutputItem,
  ToolInputMode,
  FileValidationOptions,
} from '@/src/types/workspace';
import { validateFiles, getFileExtension } from '@/src/lib/validation';
import ToolContent from './ToolContent';
import ToolDropzone from './ToolDropzone';
import ToolFileList from './ToolFileList';
import ToolPreview from './ToolPreview';
import ToolProgress from './ToolProgress';
import ToolResult from './ToolResult';
import ToolError from './ToolError';
import ToolActions from './ToolActions';

export interface ToolWorkspaceProps {
  /** Optional custom ID */
  id?: string;
  className?: string;

  /** Input mode: 'files' | 'text' | 'url' | 'custom' */
  inputMode?: ToolInputMode;

  /** Tool identifier for analytics and tracking */
  toolId?: string;

  /** File constraints */
  acceptedExtensions?: string[];
  acceptedMimeTypes?: string[];
  maxFileSizeMb?: number;
  maxFiles?: number;
  allowMultiple?: boolean;

  /** Text/custom Dropzone labels */
  dropzoneTitle?: string;
  dropzoneSubtitle?: string;

  /** Controlled state (if parent tool controls workflow directly) */
  state?: WorkspaceState;
  onStateChange?: (newState: WorkspaceState) => void;

  /** Controlled files (optional) */
  files?: WorkspaceFile[];
  onFilesChange?: (files: WorkspaceFile[]) => void;

  /** Active preview item */
  selectedFileId?: string;
  onSelectFileId?: (id: string) => void;

  /** Custom slots for non-file tools or specialized controls */
  customInput?: React.ReactNode;
  customControls?: React.ReactNode;
  customPreview?: React.ReactNode;
  customResult?: React.ReactNode;
  customActions?: React.ReactNode;

  /** Processing parameters */
  progress?: WorkspaceProgress;
  result?: WorkspaceResult | null;
  error?: WorkspaceError | string | null;

  /** Action callbacks */
  onProcess?: (files: WorkspaceFile[]) => void;
  onReset?: () => void;
  onCancel?: () => void;
  onDownloadItem?: (item: WorkspaceOutputItem) => void;
  onDownloadAll?: () => void;

  /** Custom Action button labels */
  processButtonText?: string;
  resetButtonText?: string;
  downloadButtonText?: string;
}

/**
 * Shared Tool Workspace Orchestration Shell for AHADEX TOOLS.
 * Decouples common file upload, preview, progress, error, and result UI
 * from tool-specific algorithms and processors.
 * Handles object URL creation and safe memory cleanup.
 */
export default function ToolWorkspace({
  id = 'tool-workspace-shell',
  className = '',
  inputMode = 'files',
  toolId,
  acceptedExtensions = [],
  acceptedMimeTypes = [],
  maxFileSizeMb = 50,
  maxFiles = 10,
  allowMultiple = true,
  dropzoneTitle,
  dropzoneSubtitle,
  state: controlledState,
  onStateChange,
  files: controlledFiles,
  onFilesChange,
  selectedFileId: controlledSelectedFileId,
  onSelectFileId,
  customInput,
  customControls,
  customPreview,
  customResult,
  customActions,
  progress,
  result: controlledResult,
  error: controlledError,
  onProcess,
  onReset,
  onCancel,
  onDownloadItem,
  onDownloadAll,
  processButtonText = 'Process',
  resetButtonText = 'Start Over',
  downloadButtonText = 'Download Result',
}: ToolWorkspaceProps) {
  // Internal fallback state when operating uncontrolled
  const [internalState, setInternalState] = useState<WorkspaceState>('idle');
  const [internalFiles, setInternalFiles] = useState<WorkspaceFile[]>([]);
  const [internalSelectedId, setInternalSelectedId] = useState<string | null>(null);
  const [validationErrors, setValidationErrors] = useState<string[]>([]);

  // Track created object URLs for deterministic memory cleanup
  const activeObjectUrls = useRef<Set<string>>(new Set());

  // Determine effective state & files (controlled vs uncontrolled)
  const currentState = controlledState !== undefined ? controlledState : internalState;
  const currentFiles = controlledFiles !== undefined ? controlledFiles : internalFiles;
  const activeFileId =
    controlledSelectedFileId !== undefined ? controlledSelectedFileId : internalSelectedId;

  const updateState = useCallback(
    (newState: WorkspaceState) => {
      if (onStateChange) {
        onStateChange(newState);
      } else {
        setInternalState(newState);
      }
    },
    [onStateChange]
  );

  const updateFiles = useCallback(
    (newFiles: WorkspaceFile[]) => {
      if (onFilesChange) {
        onFilesChange(newFiles);
      } else {
        setInternalFiles(newFiles);
      }
    },
    [onFilesChange]
  );

  // Safe object URL generator with registry tracking
  const createTrackedObjectUrl = useCallback((blobOrFile: Blob | File): string => {
    const url = URL.createObjectURL(blobOrFile);
    activeObjectUrls.current.add(url);
    return url;
  }, []);

  // Safe revoke helper
  const revokeTrackedObjectUrl = useCallback((url?: string) => {
    if (url && activeObjectUrls.current.has(url)) {
      URL.revokeObjectURL(url);
      activeObjectUrls.current.delete(url);
    }
  }, []);

  // Cleanup all object URLs when workspace unmounts
  useEffect(() => {
    const urls = activeObjectUrls.current;
    return () => {
      urls.forEach((url) => {
        URL.revokeObjectURL(url);
      });
      urls.clear();
    };
  }, []);

  // Handle incoming raw files from Dropzone
  const handleIncomingFiles = useCallback(
    (rawFiles: File[]) => {
      setValidationErrors([]);

      const validationOptions: FileValidationOptions = {
        maxFileSizeMb,
        maxFileCount: maxFiles,
        acceptedMimeTypes,
        acceptedExtensions,
      };

      const { validFiles, errors } = validateFiles(
        rawFiles,
        validationOptions,
        currentFiles.length
      );

      if (errors.length > 0) {
        setValidationErrors(errors.map((e) => e.message));
      }

      if (validFiles.length > 0) {
        const newWorkspaceFiles: WorkspaceFile[] = validFiles.map((file) => {
          const extension = getFileExtension(file.name);
          const isImage = file.type.startsWith('image/');
          const previewUrl = isImage ? createTrackedObjectUrl(file) : undefined;

          return {
            id: `${file.name}-${file.lastModified}-${Math.random().toString(36).slice(2, 8)}`,
            file,
            name: file.name,
            size: file.size,
            type: file.type || 'application/octet-stream',
            extension,
            previewUrl,
            lastModified: file.lastModified,
            status: 'valid',
          };
        });

        const mergedFiles = allowMultiple
          ? [...currentFiles, ...newWorkspaceFiles]
          : newWorkspaceFiles;

        updateFiles(mergedFiles);

        // Auto-select first file if none selected
        if (!activeFileId && mergedFiles.length > 0) {
          const firstId = mergedFiles[0].id;
          if (onSelectFileId) onSelectFileId(firstId);
          else setInternalSelectedId(firstId);
        }

        if (currentState === 'idle') {
          updateState('preview');
        }
      }
    },
    [
      maxFileSizeMb,
      maxFiles,
      acceptedMimeTypes,
      acceptedExtensions,
      currentFiles,
      allowMultiple,
      updateFiles,
      activeFileId,
      onSelectFileId,
      currentState,
      updateState,
      createTrackedObjectUrl,
    ]
  );

  // File removal handler with URL cleanup
  const handleRemoveFile = useCallback(
    (idToRemove: string) => {
      const target = currentFiles.find((f) => f.id === idToRemove);
      if (target?.previewUrl) {
        revokeTrackedObjectUrl(target.previewUrl);
      }

      const updated = currentFiles.filter((f) => f.id !== idToRemove);
      updateFiles(updated);

      if (activeFileId === idToRemove) {
        const nextId = updated.length > 0 ? updated[0].id : null;
        if (onSelectFileId) onSelectFileId(nextId || '');
        else setInternalSelectedId(nextId);
      }

      if (updated.length === 0) {
        updateState('idle');
      }
    },
    [currentFiles, activeFileId, updateFiles, onSelectFileId, updateState, revokeTrackedObjectUrl]
  );

  // Clear all files
  const handleClearAll = useCallback(() => {
    currentFiles.forEach((f) => {
      if (f.previewUrl) revokeTrackedObjectUrl(f.previewUrl);
    });
    updateFiles([]);
    if (onSelectFileId) onSelectFileId('');
    else setInternalSelectedId(null);
    setValidationErrors([]);
    updateState('idle');
  }, [currentFiles, updateFiles, onSelectFileId, updateState, revokeTrackedObjectUrl]);

  // Reorder files
  const handleMoveFile = useCallback(
    (fromIndex: number, toIndex: number) => {
      if (toIndex < 0 || toIndex >= currentFiles.length) return;
      const reordered = [...currentFiles];
      const [movedItem] = reordered.splice(fromIndex, 1);
      reordered.splice(toIndex, 0, movedItem);
      updateFiles(reordered);
    },
    [currentFiles, updateFiles]
  );

  // Master Reset
  const handleReset = useCallback(() => {
    handleClearAll();
    if (onReset) onReset();
  }, [handleClearAll, onReset]);

  // Active preview file lookup
  const activePreviewFile =
    currentFiles.find((f) => f.id === activeFileId) || currentFiles[0] || null;

  const isProcessing = currentState === 'processing';
  const isSuccess = currentState === 'success' && !!controlledResult;
  const isError = currentState === 'error' || !!controlledError;

  return (
    <ToolContent id={id} className={className} sidebar={customControls}>
      {/* 1. Validation Alerts */}
      {validationErrors.length > 0 && (
        <div
          role="alert"
          className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-900 dark:text-amber-200 text-xs space-y-1"
        >
          <div className="font-bold">Please check the following files:</div>
          <ul className="list-disc list-inside space-y-0.5">
            {validationErrors.map((msg, i) => (
              <li key={i}>{msg}</li>
            ))}
          </ul>
        </div>
      )}

      {/* 2. Processing State */}
      {isProcessing && (
        <ToolProgress progress={progress} onCancel={onCancel} />
      )}

      {/* 3. Error State */}
      {isError && controlledError && (
        <ToolError
          error={controlledError}
          onReset={handleReset}
          onRetry={onProcess ? () => onProcess(currentFiles) : undefined}
        />
      )}

      {/* 4. Result State */}
      {isSuccess && controlledResult && (
        customResult ? (
          <>{customResult}</>
        ) : (
          <ToolResult
            result={controlledResult}
            toolId={toolId}
            onReset={handleReset}
            onDownloadItem={onDownloadItem}
            onDownloadAll={onDownloadAll}
          />
        )
      )}

      {/* 5. Primary Workspace Inputs (Hidden during processing or success unless configuring) */}
      {!isProcessing && !isSuccess && (
        <div className="flex flex-col space-y-6">
          {/* Custom Input (for non-file tools like QR generator, JSON formatter, etc.) */}
          {customInput ? (
            <div className="w-full">{customInput}</div>
          ) : inputMode === 'files' ? (
            <>
              {/* Dropzone Area */}
              {currentFiles.length === 0 ? (
                <ToolDropzone
                  onFilesSelected={handleIncomingFiles}
                  acceptedExtensions={acceptedExtensions}
                  acceptedMimeTypes={acceptedMimeTypes}
                  maxFileSizeMb={maxFileSizeMb}
                  allowMultiple={allowMultiple}
                  title={dropzoneTitle}
                  subtitle={dropzoneSubtitle}
                />
              ) : null}

              {/* Uploaded File List */}
              {currentFiles.length > 0 && (
                <ToolFileList
                  files={currentFiles}
                  onRemoveFile={handleRemoveFile}
                  onClearAll={handleClearAll}
                  onMoveFile={handleMoveFile}
                  allowReorder={allowMultiple}
                />
              )}

              {/* Preview Area for uploaded files */}
              {currentFiles.length > 0 && (
                <ToolPreview
                  file={activePreviewFile}
                  customPreview={customPreview}
                />
              )}
            </>
          ) : null}
        </div>
      )}

      {/* 6. Tool Action Dock */}
      <ToolActions
        state={currentState}
        onProcess={
          onProcess
            ? () => onProcess(currentFiles)
            : undefined
        }
        onReset={handleReset}
        onCancel={onCancel}
        onAddMore={
          inputMode === 'files' && allowMultiple && currentFiles.length > 0
            ? () => {
                // Open file picker by clicking dropzone if available or trigger custom
                const dropzoneInput = document.querySelector(
                  '#tool-dropzone input[type="file"]'
                ) as HTMLInputElement | null;
                dropzoneInput?.click();
              }
            : undefined
        }
        canProcess={
          inputMode === 'files'
            ? currentFiles.length > 0
            : true
        }
        isProcessing={isProcessing}
        canCancel={!!progress?.cancelable}
        hasResult={isSuccess}
        processButtonText={processButtonText}
        resetButtonText={resetButtonText}
        downloadButtonText={downloadButtonText}
        customActions={customActions}
      />
    </ToolContent>
  );
}
