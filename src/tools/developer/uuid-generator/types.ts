export type UuidVersion = "v4" | "v7";

export interface UuidItem {
  id: string;
  value: string;
  createdAt: number;
}

export interface GeneratorOptions {
  version: UuidVersion;
  count: number;
  uppercase: boolean;
  hyphens: boolean;
}
