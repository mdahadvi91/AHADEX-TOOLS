/**
 * File metadata and processing status contracts for client-side tool execution.
 */

export type SupportedImageMimeType =
  | 'image/jpeg'
  | 'image/png'
  | 'image/webp'
  | 'image/avif'
  | 'image/gif'
  | 'image/svg+xml';

export type SupportedDocumentMimeType =
  | 'application/pdf'
  | 'text/plain'
  | 'application/json';

export type SupportedFileMimeType = SupportedImageMimeType | SupportedDocumentMimeType | (string & {});

export interface FileMetadata {
  id: string;
  name: string;
  size: number;
  type: string;
  lastModified: number;
  extension: string;
}

export type ProcessingState = 'idle' | 'queued' | 'processing' | 'completed' | 'error';

export interface ProcessedOutput {
  id: string;
  fileName: string;
  fileSize: number;
  mimeType: string;
  blobUrl?: string;
  downloadUrl?: string;
  createdAt: number;
}
