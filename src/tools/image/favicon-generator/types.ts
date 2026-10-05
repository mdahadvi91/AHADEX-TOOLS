export interface LoadedImage {
  id: string;
  name: string;
  dataUrl: string;
  element: HTMLImageElement;
  width: number;
  height: number;
}

export interface FaviconOptions {
  padding: number;
  background: "transparent" | "auto" | "white" | "black" | "custom";
  customBackground: string;
  rounded: boolean;
  radius: number;
}

export interface GeneratedFile {
  filename: string;
  blob: Blob;
  url: string;
  size: number;
  width: number;
  height: number;
  label: string;
}

export interface GenerationResult {
  files: GeneratedFile[];
  manifest: string;
}
