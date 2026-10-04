export type BarcodeFormat =
  | "CODE128"
  | "CODE39"
  | "EAN13"
  | "EAN8"
  | "UPC"
  | "ITF14"
  | "MSI"
  | "pharmacode"
  | "codabar";

export interface FormatDefinition {
  value: BarcodeFormat;
  label: string;
  hint: string;
  example: string;
}

export interface BarcodeOptions {
  format: BarcodeFormat;
  width: number;
  height: number;
  displayValue: boolean;
  fontSize: number;
  textMargin: number;
  margin: number;
  lineColor: string;
  background: string;
}
