/**
 * Core application types for AHADEX TOOLS platform.
 * Provides scalable type contracts for themes, i18n, routes, and shared utilities.
 */

import type { Category, ToolCategoryId } from './category';
import type { Tool } from './tool';

export type ThemeMode = 'light' | 'dark' | 'system';

export type SupportedLanguage = 'en' | 'bn' | 'ar';

export type ToolCategory = ToolCategoryId;

export interface BaseMetadata {
  title: string;
  description: string;
  keywords?: string[];
}

/**
 * Re-export & alias for backwards compatibility with earlier phase foundations.
 */
export type ToolDefinition = Tool;
export type CategoryDefinition = Category;

export interface ToastMessage {
  id: string;
  type: 'info' | 'success' | 'warning' | 'error';
  title?: string;
  message: string;
  durationMs?: number;
}
