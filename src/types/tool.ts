/**
 * Central Tool type definitions for AHADEX TOOLS.
 * Designed to scale from initial tools to 100+ utilities without framework rewrites.
 */

import type { ToolCategoryId } from './category';

export type ToolStatus = 'active' | 'coming-soon' | 'disabled';

export type ToolProcessingMode = 'client-side' | 'server-side' | 'hybrid';

export type ToolInputType =
  | 'image'
  | 'pdf'
  | 'text'
  | 'url'
  | 'file'
  | 'qr-content'
  | (string & {});

export type ToolOutputType =
  | 'image'
  | 'pdf'
  | 'text'
  | 'file'
  | 'qr'
  | (string & {});

export interface Tool {
  id: string;
  slug: string;
  name: string;
  shortDescription: string;
  longDescription?: string;
  category: ToolCategoryId;
  categoryId: ToolCategoryId;
  icon: string;
  route: string;
  keywords: string[];
  aliases: string[];
  tags: string[];
  isFeatured: boolean;
  isPopular: boolean;
  status: ToolStatus;
  processingMode: ToolProcessingMode;
  supportedInputs: ToolInputType[];
  supportedOutputs: ToolOutputType[];
  maxFileSizeMb?: number;
  version?: string;
}
