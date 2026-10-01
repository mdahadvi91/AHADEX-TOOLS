export type Theme = "light" | "dark" | "system";
export type Language = "en" | "bn" | "ar";
export type ToastType = "success" | "error" | "info" | "warning";

export interface NavItem {
  label: string;
  to: string;
  external?: boolean;
}

export interface NavSection {
  title: string;
  items: NavItem[];
}
