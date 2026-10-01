import type { ComponentType } from "react";

/* ============================================================
 * ICON COMPONENTS
 * ============================================================ */

interface IconProps {
  size?: number;
  className?: string;
}

function WhatsAppIcon({ size = 20, className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} fill="currentColor" className={className}>
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

function FacebookIcon({ size = 20, className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} fill="currentColor" className={className}>
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  );
}

function InstagramIcon({ size = 20, className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} fill="currentColor" className={className}>
      <path d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.899 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.899-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405a1.441 1.441 0 01-2.88 0 1.44 1.44 0 012.88 0z" />
    </svg>
  );
}

function TelegramIcon({ size = 20, className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} fill="currentColor" className={className}>
      <path d="M11.944 0A12 12 0 000 12a12 12 0 0012 12 12 12 0 0012-12A12 12 0 0012 0a12 12 0 00-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 01.171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
    </svg>
  );
}

function PhoneIcon({ size = 20, className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} fill="currentColor" className={className}>
      <path d="M19.23 15.26l-2.54-.29a1.99 1.99 0 00-1.64.57l-1.84 1.84a15.045 15.045 0 01-6.59-6.59l1.85-1.85c.43-.43.64-1.04.57-1.64L8.74 4.77A2 2 0 006.76 3H4.99c-1.13 0-2.07.94-2 2.07.53 8.54 7.4 15.41 15.94 15.94 1.13.06 2.07-.87 2.07-2v-1.77c0-1.02-.76-1.87-1.77-1.98z" />
    </svg>
  );
}

function EmailIcon({ size = 20, className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} fill="currentColor" className={className}>
      <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
    </svg>
  );
}

function WifiIcon({ size = 20, className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} fill="currentColor" className={className}>
      <path d="M1 9l2 2c4.97-4.97 13.03-4.97 18 0l2-2C16.93 2.93 7.08 2.93 1 9zm8 8l3 3 3-3a4.237 4.237 0 00-6 0zm-4-4l2 2a7.074 7.074 0 0110 0l2-2C15.14 9.14 8.87 9.14 5 13z" />
    </svg>
  );
}

function WebsiteIcon({ size = 20, className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} fill="currentColor" className={className}>
      <path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zm6.93 6h-2.95a15.65 15.65 0 00-1.38-3.56A8.03 8.03 0 0118.92 8zM12 4.04c.83 1.2 1.48 2.53 1.91 3.96h-3.82c.43-1.43 1.08-2.76 1.91-3.96zM4.26 14C4.1 13.36 4 12.69 4 12s.1-1.36.26-2h3.38c-.08.66-.14 1.32-.14 2s.06 1.34.14 2H4.26zm.82 2h2.95c.32 1.25.78 2.45 1.38 3.56A8.014 8.014 0 015.08 16zm2.95-8H5.08a8.014 8.014 0 014.33-3.56C8.81 5.55 8.35 6.75 8.03 8zM12 19.96c-.83-1.2-1.48-2.53-1.91-3.96h3.82c-.43 1.43-1.08 2.76-1.91 3.96zM14.34 14H9.66c-.09-.66-.16-1.32-.16-2s.07-1.35.16-2h4.68c.09.65.16 1.32.16 2s-.07 1.34-.16 2zm.25 5.56c.6-1.11 1.06-2.31 1.38-3.56h2.95a8.014 8.014 0 01-4.33 3.56zM16.36 14c.08-.66.14-1.32.14-2s-.06-1.34-.14-2h3.38c.16.64.26 1.31.26 2s-.1 1.36-.26 2h-3.38z" />
    </svg>
  );
}

function TextIcon({ size = 20, className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} fill="currentColor" className={className}>
      <path d="M5 4v3h5.5v12h3V7H19V4z" />
    </svg>
  );
}

function VCardIcon({ size = 20, className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} fill="currentColor" className={className}>
      <path d="M20 0H4C2.9 0 2 .9 2 2v20c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V2c0-1.1-.9-2-2-2zM8 6.75a2.25 2.25 0 110 4.5 2.25 2.25 0 010-4.5zM5 18v-1.5c0-1.5 2-2.5 4-2.5s4 1 4 2.5V18H5zm12 0h-3v-1.5h3V18zm0-3h-3v-1.5h3V15zm0-3h-3v-1.5h3V12zm0-3h-3V7.5h3V9z" />
    </svg>
  );
}

function SmsIcon({ size = 20, className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} fill="currentColor" className={className}>
      <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-2 12H6v-2h12v2zm0-3H6V9h12v2zm0-3H6V6h12v2z" />
    </svg>
  );
}

/* ============================================================
 * PLATFORM TYPES
 * ============================================================ */

export interface PlatformField {
  key: string;
  label: string;
  labelBn: string;
  placeholder: string;
  placeholderBn: string;
  type: "text" | "url" | "tel" | "email" | "password";
}

export interface Platform {
  id: string;
  name: string;
  nameBn: string;
  color: string;
  Icon: ComponentType<IconProps>;
  /** SVG path markup with white fill for embedding in QR codes */
  iconSvgPath: string;
  fields: PlatformField[];
  buildPayload: (values: Record<string, string>) => string;
}

/* SVG path markup — used for embedding in QR code generator */
const PATHS = {
  whatsapp:
    '<path fill="#FFFFFF" d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>',
  facebook:
    '<path fill="#FFFFFF" d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>',
  instagram:
    '<path fill="#FFFFFF" d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.899 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.899-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405a1.441 1.441 0 01-2.88 0 1.44 1.44 0 012.88 0z"/>',
  telegram:
    '<path fill="#FFFFFF" d="M11.944 0A12 12 0 000 12a12 12 0 0012 12 12 12 0 0012-12A12 12 0 0012 0a12 12 0 00-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 01.171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>',
  phone:
    '<path fill="#FFFFFF" d="M19.23 15.26l-2.54-.29a1.99 1.99 0 00-1.64.57l-1.84 1.84a15.045 15.045 0 01-6.59-6.59l1.85-1.85c.43-.43.64-1.04.57-1.64L8.74 4.77A2 2 0 006.76 3H4.99c-1.13 0-2.07.94-2 2.07.53 8.54 7.4 15.41 15.94 15.94 1.13.06 2.07-.87 2.07-2v-1.77c0-1.02-.76-1.87-1.77-1.98z"/>',
  email:
    '<path fill="#FFFFFF" d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>',
  wifi:
    '<path fill="#FFFFFF" d="M1 9l2 2c4.97-4.97 13.03-4.97 18 0l2-2C16.93 2.93 7.08 2.93 1 9zm8 8l3 3 3-3a4.237 4.237 0 00-6 0zm-4-4l2 2a7.074 7.074 0 0110 0l2-2C15.14 9.14 8.87 9.14 5 13z"/>',
  website:
    '<path fill="#FFFFFF" d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zm6.93 6h-2.95a15.65 15.65 0 00-1.38-3.56A8.03 8.03 0 0118.92 8zM12 4.04c.83 1.2 1.48 2.53 1.91 3.96h-3.82c.43-1.43 1.08-2.76 1.91-3.96zM4.26 14C4.1 13.36 4 12.69 4 12s.1-1.36.26-2h3.38c-.08.66-.14 1.32-.14 2s.06 1.34.14 2H4.26zm.82 2h2.95c.32 1.25.78 2.45 1.38 3.56A8.014 8.014 0 015.08 16zm2.95-8H5.08a8.014 8.014 0 014.33-3.56C8.81 5.55 8.35 6.75 8.03 8zM12 19.96c-.83-1.2-1.48-2.53-1.91-3.96h3.82c-.43 1.43-1.08 2.76-1.91 3.96zM14.34 14H9.66c-.09-.66-.16-1.32-.16-2s.07-1.35.16-2h4.68c.09.65.16 1.32.16 2s-.07 1.34-.16 2zm.25 5.56c.6-1.11 1.06-2.31 1.38-3.56h2.95a8.014 8.014 0 01-4.33 3.56zM16.36 14c.08-.66.14-1.32.14-2s-.06-1.34-.14-2h3.38c.16.64.26 1.31.26 2s-.1 1.36-.26 2h-3.38z"/>',
  text: '<path fill="#FFFFFF" d="M5 4v3h5.5v12h3V7H19V4z"/>',
  vcard:
    '<path fill="#FFFFFF" d="M20 0H4C2.9 0 2 .9 2 2v20c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V2c0-1.1-.9-2-2-2zM8 6.75a2.25 2.25 0 110 4.5 2.25 2.25 0 010-4.5zM5 18v-1.5c0-1.5 2-2.5 4-2.5s4 1 4 2.5V18H5zm12 0h-3v-1.5h3V18zm0-3h-3v-1.5h3V15zm0-3h-3v-1.5h3V12zm0-3h-3V7.5h3V9z"/>',
  sms: '<path fill="#FFFFFF" d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-2 12H6v-2h12v2zm0-3H6V9h12v2zm0-3H6V6h12v2z"/>',
};

/* ============================================================
 * PLATFORMS
 * ============================================================ */

export const PLATFORMS: Platform[] = [
  {
    id: "whatsapp",
    name: "WhatsApp",
    nameBn: "হোয়াটসঅ্যাপ",
    color: "#25D366",
    Icon: WhatsAppIcon,
    iconSvgPath: PATHS.whatsapp,
    fields: [
      {
        key: "phone",
        label: "Enter your WhatsApp number",
        labelBn: "আপনার হোয়াটসঅ্যাপ নম্বর লিখুন",
        placeholder: "+8801712345678",
        placeholderBn: "+৮৮০১৭১২৩৪৫৬৭৮",
        type: "tel",
      },
    ],
    buildPayload: (v) =>
      `https://wa.me/${(v.phone || "").replace(/[^\d]/g, "")}`,
  },
  {
    id: "facebook",
    name: "Facebook",
    nameBn: "ফেসবুক",
    color: "#1877F2",
    Icon: FacebookIcon,
    iconSvgPath: PATHS.facebook,
    fields: [
      {
        key: "url",
        label: "Enter your Facebook link",
        labelBn: "আপনার ফেসবুক লিংক লিখুন",
        placeholder: "https://facebook.com/username",
        placeholderBn: "https://facebook.com/username",
        type: "url",
      },
    ],
    buildPayload: (v) => v.url || "",
  },
  {
    id: "instagram",
    name: "Instagram",
    nameBn: "ইনস্টাগ্রাম",
    color: "#E4405F",
    Icon: InstagramIcon,
    iconSvgPath: PATHS.instagram,
    fields: [
      {
        key: "url",
        label: "Enter your Instagram link",
        labelBn: "আপনার ইনস্টাগ্রাম লিংক লিখুন",
        placeholder: "https://instagram.com/username",
        placeholderBn: "https://instagram.com/username",
        type: "url",
      },
    ],
    buildPayload: (v) => v.url || "",
  },
  {
    id: "telegram",
    name: "Telegram",
    nameBn: "টেলিগ্রাম",
    color: "#0088CC",
    Icon: TelegramIcon,
    iconSvgPath: PATHS.telegram,
    fields: [
      {
        key: "url",
        label: "Enter your Telegram link",
        labelBn: "আপনার টেলিগ্রাম লিংক লিখুন",
        placeholder: "https://t.me/username",
        placeholderBn: "https://t.me/username",
        type: "url",
      },
    ],
    buildPayload: (v) => v.url || "",
  },
  {
    id: "phone",
    name: "Phone Call",
    nameBn: "ফোন কল",
    color: "#4A2A3A",
    Icon: PhoneIcon,
    iconSvgPath: PATHS.phone,
    fields: [
      {
        key: "phone",
        label: "Enter phone number",
        labelBn: "ফোন নম্বর লিখুন",
        placeholder: "+971507975837",
        placeholderBn: "+৯৭১৫০৭৯৭৫৮৩৭",
        type: "tel",
      },
    ],
    buildPayload: (v) => `tel:${(v.phone || "").replace(/\s/g, "")}`,
  },
  {
    id: "email",
    name: "Email",
    nameBn: "ইমেইল",
    color: "#8B3A4F",
    Icon: EmailIcon,
    iconSvgPath: PATHS.email,
    fields: [
      {
        key: "email",
        label: "Enter email address",
        labelBn: "ইমেইল ঠিকানা লিখুন",
        placeholder: "you@example.com",
        placeholderBn: "you@example.com",
        type: "email",
      },
      {
        key: "subject",
        label: "Subject (optional)",
        labelBn: "বিষয় (ঐচ্ছিক)",
        placeholder: "Hello!",
        placeholderBn: "হ্যালো!",
        type: "text",
      },
    ],
    buildPayload: (v) => {
      const s = v.subject ? `?subject=${encodeURIComponent(v.subject)}` : "";
      return `mailto:${v.email}${s}`;
    },
  },
  {
    id: "wifi",
    name: "WiFi",
    nameBn: "ওয়াইফাই",
    color: "#C99667",
    Icon: WifiIcon,
    iconSvgPath: PATHS.wifi,
    fields: [
      {
        key: "ssid",
        label: "WiFi network name (SSID)",
        labelBn: "ওয়াইফাই নেটওয়ার্কের নাম",
        placeholder: "MyHomeWiFi",
        placeholderBn: "MyHomeWiFi",
        type: "text",
      },
      {
        key: "password",
        label: "WiFi password",
        labelBn: "ওয়াইফাই পাসওয়ার্ড",
        placeholder: "••••••••",
        placeholderBn: "••••••••",
        type: "password",
      },
    ],
    buildPayload: (v) => `WIFI:T:WPA;S:${v.ssid};P:${v.password};;`,
  },
  {
    id: "website",
    name: "Website",
    nameBn: "ওয়েবসাইট",
    color: "#8B9DC7",
    Icon: WebsiteIcon,
    iconSvgPath: PATHS.website,
    fields: [
      {
        key: "url",
        label: "Enter website URL",
        labelBn: "ওয়েবসাইট URL লিখুন",
        placeholder: "https://example.com",
        placeholderBn: "https://example.com",
        type: "url",
      },
    ],
    buildPayload: (v) => v.url || "",
  },
  {
    id: "sms",
    name: "SMS",
    nameBn: "এসএমএস",
    color: "#B36878",
    Icon: SmsIcon,
    iconSvgPath: PATHS.sms,
    fields: [
      {
        key: "phone",
        label: "Enter phone number",
        labelBn: "ফোন নম্বর লিখুন",
        placeholder: "+971507975837",
        placeholderBn: "+৯৭১৫০৭৯৭৫৮৩৭",
        type: "tel",
      },
      {
        key: "message",
        label: "Message (optional)",
        labelBn: "বার্তা (ঐচ্ছিক)",
        placeholder: "Hi there!",
        placeholderBn: "হ্যালো!",
        type: "text",
      },
    ],
    buildPayload: (v) =>
      `sms:${(v.phone || "").replace(/\s/g, "")}${
        v.message ? `?body=${encodeURIComponent(v.message)}` : ""
      }`,
  },
  {
    id: "vcard",
    name: "Contact",
    nameBn: "যোগাযোগ",
    color: "#D88B9A",
    Icon: VCardIcon,
    iconSvgPath: PATHS.vcard,
    fields: [
      {
        key: "name",
        label: "Your name",
        labelBn: "আপনার নাম",
        placeholder: "Jane Doe",
        placeholderBn: "করিম আহমেদ",
        type: "text",
      },
      {
        key: "phone",
        label: "Phone number",
        labelBn: "ফোন নম্বর",
        placeholder: "+971507975837",
        placeholderBn: "+৯৭১৫০৭৯৭৫৮৩৭",
        type: "tel",
      },
      {
        key: "email",
        label: "Email (optional)",
        labelBn: "ইমেইল (ঐচ্ছিক)",
        placeholder: "you@example.com",
        placeholderBn: "you@example.com",
        type: "email",
      },
    ],
    buildPayload: (v) => {
      const lines = ["BEGIN:VCARD", "VERSION:3.0", `FN:${v.name || ""}`];
      if (v.phone) lines.push(`TEL:${v.phone}`);
      if (v.email) lines.push(`EMAIL:${v.email}`);
      lines.push("END:VCARD");
      return lines.join("\n");
    },
  },
  {
    id: "text",
    name: "Plain Text",
    nameBn: "সাধারণ টেক্সট",
    color: "#4A2A3A",
    Icon: TextIcon,
    iconSvgPath: PATHS.text,
    fields: [
      {
        key: "text",
        label: "Enter text",
        labelBn: "টেক্সট লিখুন",
        placeholder: "Any text you want...",
        placeholderBn: "যেকোনো টেক্সট...",
        type: "text",
      },
    ],
    buildPayload: (v) => v.text || "",
  },
];

export function getPlatform(id: string): Platform | undefined {
  return PLATFORMS.find((p) => p.id === id);
}
