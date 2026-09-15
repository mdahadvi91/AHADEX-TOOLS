import React, { createContext, useCallback, useContext, useState } from 'react';
import type { ToastMessage } from '@/src/types/common';

export type ToastType = 'info' | 'success' | 'warning' | 'error';

export interface ShowToastOptions {
  type?: ToastType;
  title?: string;
  message: string;
  durationMs?: number;
}

export interface ToastContextValue {
  toasts: ToastMessage[];
  showToast: (options: ShowToastOptions) => string;
  dismissToast: (id: string) => void;
  success: (message: string, title?: string) => string;
  error: (message: string, title?: string) => string;
  warning: (message: string, title?: string) => string;
  info: (message: string, title?: string) => string;
}

const ToastContext = createContext<ToastContextValue | undefined>(undefined);

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const dismissToast = useCallback((id: string) => {
    setToasts((current) => current.filter((item) => item.id !== id));
  }, []);

  const showToast = useCallback(
    ({ type = 'info', title, message, durationMs = 4000 }: ShowToastOptions) => {
      const id = `${Date.now()}_${Math.random().toString(36).slice(2, 7)}`;
      const newToast: ToastMessage = { id, type, title, message, durationMs };

      setToasts((current) => [...current, newToast]);

      if (durationMs > 0) {
        setTimeout(() => {
          dismissToast(id);
        }, durationMs);
      }

      return id;
    },
    [dismissToast]
  );

  const success = useCallback(
    (message: string, title?: string) => showToast({ type: 'success', message, title }),
    [showToast]
  );

  const error = useCallback(
    (message: string, title?: string) => showToast({ type: 'error', message, title }),
    [showToast]
  );

  const warning = useCallback(
    (message: string, title?: string) => showToast({ type: 'warning', message, title }),
    [showToast]
  );

  const info = useCallback(
    (message: string, title?: string) => showToast({ type: 'info', message, title }),
    [showToast]
  );

  return (
    <ToastContext.Provider
      value={{
        toasts,
        showToast,
        dismissToast,
        success,
        error,
        warning,
        info,
      }}
    >
      {children}
      {toasts.length > 0 && (
        <aside
          aria-live="polite"
          aria-label="Notifications"
          className="fixed bottom-4 right-4 z-50 flex flex-col gap-2 max-w-sm w-full pointer-events-none"
        >
          {toasts.map((toast) => (
            <div
              key={toast.id}
              role="status"
              className="pointer-events-auto p-3 rounded-lg border text-sm shadow-md bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-900 dark:text-slate-100 flex items-start justify-between gap-3"
            >
              <div className="flex-1">
                {toast.title && <div className="font-semibold text-xs mb-0.5">{toast.title}</div>}
                <div className="text-xs leading-normal">{toast.message}</div>
              </div>
              <button
                type="button"
                onClick={() => dismissToast(toast.id)}
                aria-label="Close notification"
                className="text-xs text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
              >
                ✕
              </button>
            </div>
          ))}
        </aside>
      )}
    </ToastContext.Provider>
  );
}

export function useToast(): ToastContextValue {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
}
