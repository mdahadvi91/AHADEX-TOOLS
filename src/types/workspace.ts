/**
 * Shared Tool Workspace types and contracts for AHADEX TOOLS.
 * Decouples the shared workspace UI shell from individual tool processors.
 */

import type { Tool } from './tool';

export type WorkspaceState =
  | 'idle'
  | 'input'
  | 'preview'
  | 'configuring'
  | 'processing'
  | 'success'
  | 'error';

export interface WorkspaceFile {
  id: string;
  file: File;
  name: string;
  size: number;
  type: string;
  extension: string;
  previewUrl?: string;
  lastModified: number;
  status?: 'valid' | 'invalid';
  error?: string;
}

export interface FileValidationOptions {
  maxFileSizeMb?: number;
  maxFileCount?: number;
  acceptedMimeTypes?: string[];
  acceptedExtensions?: string[];
  allowEmptyFiles?: boolean;
}

export type FileValidationErrorCode =
  | 'FILE_TOO_LARGE'
  | 'TOO_MANY_FILES'
  | 'INVALID_TYPE'
  | 'EMPTY_FILE'
  | 'VALIDATION_ERROR';

export interface FileValidationError {
  file?: File;
  fileName?: string;
  code: FileValidationErrorCode;
  message: string;
}

export interface FileValidationResult {
  validFiles: File[];
  errors: FileValidationError[];
}

export interface WorkspaceProgress {
  isIndeterminate?: boolean;
  percentage?: number; // 0 to 100
  statusMessage?: string;
  currentStep?: string;
  totalSteps?: number;
  currentStepIndex?: number;
  cancelable?: boolean;
}

export interface WorkspaceOutputItem {
  id: string;
  fileName: string;
  fileSize?: number;
  mimeType?: string;
  downloadUrl?: string;
  blob?: Blob;
  previewUrl?: string;
  metrics?: Record<string, string | number>;
}

export interface WorkspaceResult {
  title?: string;
  message?: string;
  items: WorkspaceOutputItem[];
}

export interface WorkspaceError {
  title?: string;
  message: string;
  code?: string;
  details?: string;
  recoverable?: boolean;
}

export interface HowToUseStep {
  stepNumber: number;
  title: string;
  description: string;
}

export interface ToolFAQItem {
  question: string;
  answer: string;
}

export interface ToolSEOContentData {
  introduction?: string;
  useCases?: string[];
  supportedFormats?: string[];
  limitations?: string[];
  privacyInfo?: string;
  tips?: string[];
}

export type ToolInputMode = 'files' | 'text' | 'url' | 'custom';

export interface ToolConfiguration {
  id: string;
  name?: string;
  inputMode: ToolInputMode;
  supportsDropzone?: boolean;
  dropzoneTitle?: string;
  dropzoneSubtitle?: string;
  acceptedMimeTypes?: string[];
  acceptedExtensions?: string[];
  maxFiles?: number;
  maxFileSizeMb?: number;
  allowMultiple?: boolean;
  howToUseSteps?: HowToUseStep[];
  faqs?: ToolFAQItem[];
  seoContent?: ToolSEOContentData;
}
