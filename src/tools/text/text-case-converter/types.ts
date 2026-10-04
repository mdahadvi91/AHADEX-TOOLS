export type CaseType =
  | "upper"
  | "lower"
  | "title"
  | "sentence"
  | "camel"
  | "pascal"
  | "snake"
  | "kebab"
  | "constant"
  | "dot"
  | "alternating"
  | "inverse";

export interface CaseDefinition {
  id: CaseType;
  label: string;
  labelBn: string;
  example: string;
}
