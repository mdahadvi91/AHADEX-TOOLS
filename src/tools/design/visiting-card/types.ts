/* ============================================================
 * AHADEX Visiting Card — Data-Driven Type System
 * ============================================================ */

export type CardSideId = "front" | "back";
export type CardSizeId = "standard" | "square" | "slim" | "us";
export type FontKey = "display" | "sans" | "serif" | "script" | "mono";
export type TextAlign = "left" | "center" | "right";

export type TemplateCategory =
  | "luxury"
  | "corporate"
  | "minimal"
  | "creative"
  | "technology"
  | "elegant"
  | "dark"
  | "light"
  | "nature";

/* ============================================================
 * BACKGROUND
 * ============================================================ */

export type BackgroundType = "solid" | "gradient" | "pattern";

export interface Background {
  type: BackgroundType;
  color1: string;
  color2?: string;
  angle?: number;
  pattern?: "dots" | "grid" | "diagonal" | "waves" | "lines" | "noise";
}

/* ============================================================
 * ELEMENT BASE
 * ============================================================ */

interface BaseElement {
  id: string;
  visible: boolean;
  /** 0-1 relative to card width */
  x: number;
  /** 0-1 relative to card height */
  y: number;
  rotation?: number;
  opacity?: number;
}

/* ============================================================
 * TEXT ELEMENT
 * ============================================================ */

export type ContentKey =
  | "brand"
  | "tagline"
  | "name"
  | "title"
  | "phone"
  | "email"
  | "website"
  | "location"
  | "qrLabel";

export interface TextElement extends BaseElement {
  type: "text";
  contentKey: ContentKey;
  defaultValue: string;
  defaultValueBn?: string;
  fontFamily: FontKey;
  fontSize: number;
  fontWeight: number;
  color: string;
  align: TextAlign;
  letterSpacing?: number;
  uppercase?: boolean;
  italic?: boolean;
  lineHeight?: number;
  maxWidth?: number;
}

/* ============================================================
 * LOGO ELEMENT
 * ============================================================ */

export interface LogoElement extends BaseElement {
  type: "logo";
  size: number;
  align: TextAlign;
}

/* ============================================================
 * QR ELEMENT
 * ============================================================ */

export interface QRElement extends BaseElement {
  type: "qr";
  size: number;
  fgColor: string;
  bgColor: string;
  padding?: number;
}

/* ============================================================
 * SHAPE ELEMENT
 * ============================================================ */

export type ShapeKind =
  | "rect"
  | "circle"
  | "line"
  | "triangle"
  | "chevron"
  | "diagonal-stripe"
  | "corner";

export interface ShapeElement extends BaseElement {
  type: "shape";
  shape: ShapeKind;
  width: number;
  height: number;
  fill?: string;
  stroke?: string;
  strokeWidth?: number;
  cornerRadius?: number;
  direction?: "tl-br" | "tr-bl" | "l-r" | "t-b";
}

/* ============================================================
 * ICON ELEMENT
 * ============================================================ */

export type IconName =
  | "phone"
  | "email"
  | "website"
  | "location"
  | "instagram"
  | "linkedin"
  | "twitter"
  | "facebook";

export interface IconElement extends BaseElement {
  type: "icon";
  iconName: IconName;
  size: number;
  color: string;
}

/* ============================================================
 * ORNAMENT ELEMENT — decorative vector art
 * ============================================================ */

export type OrnamentKind =
  | "gold-corner"
  | "mandala"
  | "botanical-leaf"
  | "circuit-line"
  | "hexagon-frame"
  | "crown"
  | "wave"
  | "japanese-sun"
  | "marble-vein"
  | "carbon-fiber";

export interface OrnamentElement extends BaseElement {
  type: "ornament";
  ornament: OrnamentKind;
  size: number;
  colors: string[];
  strokeWidth?: number;
}

/* ============================================================
 * UNION
 * ============================================================ */

export type TemplateElement =
  | TextElement
  | LogoElement
  | QRElement
  | ShapeElement
  | IconElement
  | OrnamentElement;

/* ============================================================
 * SIDE
 * ============================================================ */

export interface Side {
  background: Background;
  elements: TemplateElement[];
  safeMargin?: number;
}

/* ============================================================
 * TEMPLATE
 * ============================================================ */

export interface Template {
  id: string;
  name: string;
  nameBn: string;
  category: TemplateCategory;
  front: Side;
  back: Side;
  palette: {
    primary: string;
    accent: string;
    text: string;
    subtext: string;
  };
}

/* ============================================================
 * USER DATA
 * ============================================================ */

export interface UserData {
  brand: string;
  tagline: string;
  name: string;
  title: string;
  phone: string;
  email: string;
  website: string;
  location: string;
  qrLabel: string;
  qrPayload: string;
  logoDataUrl: string | null;
}

export const DEFAULT_USER_DATA: UserData = {
  brand: "Ahadex Tools",
  tagline: "Tools for a Smarter Tomorrow",
  name: "Md. Ahadvi",
  title: "Founder & Developer",
  phone: "+880 123 456 789",
  email: "ahadvi@gmail.com",
  website: "www.ahadex.online",
  location: "Dhaka, Bangladesh",
  qrLabel: "Scan to visit",
  qrPayload: "https://ahadex.fun",
  logoDataUrl: null,
};

/* ============================================================
 * CARD STATE
 * ============================================================ */

export interface CardState {
  templateId: string;
  size: CardSizeId;
  userData: UserData;
  elementOverrides: Record<string, Partial<TemplateElement>>;
  backgroundOverrides: Partial<Record<CardSideId, Background>>;
}

/* ============================================================
 * CARD SIZE
 * ============================================================ */

export interface CardSize {
  id: CardSizeId;
  label: string;
  labelBn: string;
  widthMm: number;
  heightMm: number;
  widthPx: number;
  heightPx: number;
}

/* ============================================================
 * PRINT
 * ============================================================ */

export interface PrintSettings {
  widthMm: number;
  heightMm: number;
  dpi: 150 | 300 | 600;
  bleedMm: number;
  safeMarginMm: number;
}
