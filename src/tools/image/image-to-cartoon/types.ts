export interface LoadedImage {
  id: string;
  name: string;
  size: number;
  dataUrl: string;
  naturalWidth: number;
  naturalHeight: number;
  element: HTMLImageElement;
}

export interface CartoonOptions {
  levels: number; // posterize levels per channel (4-16)
  edgeStrength: number; // 0 - 2, how dark the outlines
  smoothness: number; // 0 - 4, blur radius before posterize
}

export interface CartoonResult {
  dataUrl: string;
  width: number;
  height: number;
  size: number;
}
