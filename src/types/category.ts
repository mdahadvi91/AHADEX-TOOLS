/**
 * Category types for AHADEX TOOLS.
 * Supports extensible category architecture scaled for hundreds of tools.
 */

export type ToolCategoryId =
  | 'image'
  | 'pdf'
  | 'qr'
  | 'text'
  | 'developer'
  | 'converters'
  | 'utilities'
  | (string & {});

export type CategoryStatus = 'active' | 'coming-soon' | 'hidden';

export interface Category {
  id: ToolCategoryId;
  slug: string;
  name: string;
  description: string;
  icon: string;
  order: number;
  status: CategoryStatus;
}
