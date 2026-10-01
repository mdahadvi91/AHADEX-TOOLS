export function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
}

export function isValidUrl(url: string): boolean {
  try { new URL(url); return true; } catch { return false; }
}

export function isNonEmpty(value: string): boolean {
  return value.trim().length > 0;
}

export function hasMinLength(value: string, min: number): boolean {
  return value.trim().length >= min;
}

export function hasMaxLength(value: string, max: number): boolean {
  return value.trim().length <= max;
}

export function isNumeric(value: string): boolean {
  return /^-?\d+(\.\d+)?$/.test(value.trim());
}

export interface FileValidationResult {
  valid: boolean;
  error?: string;
}

export function validateFile(
  file: File,
  options: {
    maxSize?: number;
    allowedTypes?: string[];
    allowedExtensions?: string[];
  } = {}
): FileValidationResult {
  const { maxSize, allowedTypes, allowedExtensions } = options;

  if (maxSize && file.size > maxSize) {
    return {
      valid: false,
      error: `File is too large (max ${Math.round(maxSize / 1024 / 1024)} MB)`,
    };
  }

  if (allowedTypes && allowedTypes.length > 0) {
    const matches = allowedTypes.some((t) =>
      t.endsWith("/*") ? file.type.startsWith(t.slice(0, -1)) : file.type === t
    );
    if (!matches) return { valid: false, error: "File type not allowed" };
  }

  if (allowedExtensions && allowedExtensions.length > 0) {
    const ext = file.name.split(".").pop()?.toLowerCase() ?? "";
    if (!allowedExtensions.map((e) => e.toLowerCase()).includes(ext)) {
      return { valid: false, error: "File extension not allowed" };
    }
  }

  return { valid: true };
}
