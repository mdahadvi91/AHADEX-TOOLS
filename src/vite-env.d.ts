/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_GA_MEASUREMENT_ID?: string;
  readonly APP_URL?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

// Optional lazy-loadable animation runtime module declarations
declare module 'lottie-web';
declare module '@rive-app/canvas';
declare module '@splinetool/runtime';
