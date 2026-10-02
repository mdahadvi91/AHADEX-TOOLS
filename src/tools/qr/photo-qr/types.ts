export type Position = "top-left" | "top-right" | "bottom-left" | "bottom-right";
export type QrBackground = "white" | "rounded" | "none";

export interface RenderOptions {
  photoFile: File;
  platform: PlatformConfig;
  values: Record<string, string>;
  position: Position;
  sizePercent: number;
  padding: number;
  qrBackground: QrBackground;
}

export interface PlatformConfig {
  id: string;
  name: string;
  nameBn: string;
  color: string;
  Icon: React.ComponentType<{
    size?: number;
    color?: string;
    className?: string;
  }>;
  fields: PlatformField[];
  buildPayload: (values: Record<string, string>) => string;
}

export interface PlatformField {
  key: string;
  label: string;
  labelBn: string;
  placeholder: string;
  placeholderBn: string;
  type: "text" | "url" | "tel" | "email" | "password";
}
