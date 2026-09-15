import React from 'react';
import { ThemeProvider } from './ThemeProvider';
import { LanguageProvider } from './LanguageProvider';
import { ToastProvider } from './ToastProvider';

export { ThemeProvider, useTheme } from './ThemeProvider';
export { LanguageProvider, useLanguage } from './LanguageProvider';
export { ToastProvider, useToast } from './ToastProvider';

export function AppProviders({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <ToastProvider>{children}</ToastProvider>
      </LanguageProvider>
    </ThemeProvider>
  );
}
