export type CategoryId =
  | "image"
  | "pdf"
  | "qr"
  | "text"
  | "developer"
  | "calculators"
  | "documents";

export interface Category {
  id: CategoryId;
  slug: string;
  name: string;
  description: string;
  icon: string;
  color: string;
  count: number;
}
