export type Mode = "encode" | "decode";
export type InputKind = "text" | "file";

export interface FileInfo {
  name: string;
  size: number;
  type: string;
  base64: string;
  dataUrl: string;
  isImage: boolean;
}

export interface TransformResult {
  output: string;
  error?: string;
  byteDelta: number;
}
