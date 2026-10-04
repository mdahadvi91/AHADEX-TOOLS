export interface SvgInfo {
  id: string;
  name: string;
  size: number;
  dataUrl: string;
  svgText: string;
  width: number;
  height: number;
}

export interface PngResult {
  blob: Blob;
  url: string;
  size: number;
  filename: string;
  width: number;
  height: number;
}

export interface RenderOptions {
  scale: number;
  background: "transparent" | "white" | "black";
}
