/**
 * Client-side file validation utilities for AHADEX TOOLS.
 * Operates entirely in-browser. Treats File.type as a useful signal combined with extension checks.
 */

import type {
  FileValidationOptions,
  FileValidationResult,
  FileValidationError,
} from '@/src/types/workspace';

/**
 * Format bytes to human-readable string (e.g. "1.2 MB").
 */
export function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 B';
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB', 'TB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  const value = parseFloat((bytes / Math.pow(k, i)).toFixed(2));
  return `${value} ${sizes[i]}`;
}

/**
 * Normalizes file extension for comparison (e.g. ".JPG" -> "jpg").
 */
export function getFileExtension(filename: string): string {
  const parts = filename.split('.');
  if (parts.length <= 1) return '';
  return parts.pop()?.toLowerCase() || '';
}

/**
 * Validates whether a file matches the allowed extensions or MIME types.
 */
export function isFileTypeAllowed(
  file: File,
  allowedMimeTypes?: string[],
  allowedExtensions?: string[]
): boolean {
  // If no filters are provided, all types are allowed
  if (
    (!allowedMimeTypes || allowedMimeTypes.length === 0) &&
    (!allowedExtensions || allowedExtensions.length === 0)
  ) {
    return true;
  }

  const ext = getFileExtension(file.name);
  const mime = (file.type || '').toLowerCase();

  // Check extension match
  if (allowedExtensions && allowedExtensions.length > 0) {
    const normalizedAllowedExts = allowedExtensions.map((e) =>
      e.replace(/^\./, '').toLowerCase()
    );
    if (ext && normalizedAllowedExts.includes(ext)) {
      return true;
    }
  }

  // Check MIME match
  if (allowedMimeTypes && allowedMimeTypes.length > 0) {
    for (const allowedMime of allowedMimeTypes) {
      const lowerMime = allowedMime.toLowerCase();
      // Handle wildcard mime e.g. "image/*"
      if (lowerMime.endsWith('/*')) {
        const prefix = lowerMime.slice(0, -1);
        if (mime.startsWith(prefix)) {
          return true;
        }
      } else if (mime === lowerMime) {
        return true;
      }
    }
  }

  return false;
}

/**
 * Validates a list of selected/dropped files against tool constraints.
 */
export function validateFiles(
  incomingFiles: File[],
  options: FileValidationOptions = {},
  existingFileCount: number = 0
): FileValidationResult {
  const validFiles: File[] = [];
  const errors: FileValidationError[] = [];

  const {
    maxFileSizeMb = 50,
    maxFileCount = 20,
    acceptedMimeTypes,
    acceptedExtensions,
    allowEmptyFiles = false,
  } = options;

  const maxSizeBytes = maxFileSizeMb * 1024 * 1024;
  const availableSlots = Math.max(0, maxFileCount - existingFileCount);

  // Check file count limit
  if (incomingFiles.length > availableSlots) {
    errors.push({
      code: 'TOO_MANY_FILES',
      message: `Cannot add ${incomingFiles.length} files. Maximum allowed is ${maxFileCount} (${availableSlots} slot${availableSlots === 1 ? '' : 's'} remaining).`,
    });
  }

  // Process only files that fit in remaining slots
  const filesToEvaluate = incomingFiles.slice(0, availableSlots);

  for (const file of filesToEvaluate) {
    // 1. Check empty file
    if (!allowEmptyFiles && file.size === 0) {
      errors.push({
        file,
        fileName: file.name,
        code: 'EMPTY_FILE',
        message: `File "${file.name}" is empty (0 bytes).`,
      });
      continue;
    }

    // 2. Check maximum size
    if (file.size > maxSizeBytes) {
      errors.push({
        file,
        fileName: file.name,
        code: 'FILE_TOO_LARGE',
        message: `File "${file.name}" (${formatFileSize(file.size)}) exceeds the maximum limit of ${maxFileSizeMb} MB.`,
      });
      continue;
    }

    // 3. Check allowed types
    if (!isFileTypeAllowed(file, acceptedMimeTypes, acceptedExtensions)) {
      const expectedNotice = [
        acceptedExtensions?.map((e) => `.${e.replace(/^\./, '')}`).join(', '),
        acceptedMimeTypes?.join(', '),
      ]
        .filter(Boolean)
        .join(' or ');

      errors.push({
        file,
        fileName: file.name,
        code: 'INVALID_TYPE',
        message: `File "${file.name}" is not a supported format. Expected: ${expectedNotice || 'compatible files'}.`,
      });
      continue;
    }

    // Valid
    validFiles.push(file);
  }

  return { validFiles, errors };
}
