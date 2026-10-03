export interface LoadedPdf {
  name: string;
  size: number;
  pageCount: number;
  bytes: ArrayBuffer;
  pageRotations: number[];
}

export interface RotateResult {
  blob: Blob;
  url: string;
  size: number;
  filename: string;
}

export type RotationDelta = 90 | 180 | 270;
export type RotateTarget = "all" | "selected";
