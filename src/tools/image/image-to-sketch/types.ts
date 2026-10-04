export interface LoadedImage {
  id: string;
  name: string;
  size: number;
  dataUrl: string;
  naturalWidth: number;
  naturalHeight: number;
  element: HTMLImageElement;
}

export interface SketchOptions {
  intensity: number; // 0.3 - 2.5, higher = darker strokes
  detail: number; // 1 - 15, blur radius (line thickness)
}

export interface SketchResult {
  dataUrl: string;
  width: number;
  height: number;
  size: number;
}
