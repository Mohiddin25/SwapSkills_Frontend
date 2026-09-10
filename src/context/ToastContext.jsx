import React, { createContext, useContext, useState, useCallback } from 'react';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

const ToastContext = createContext(null);

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  const addToast = useCallback(({ title, description, variant = 'info', duration = 4000 }) => {
    const id = 'toast-' + Date.now() + '-' + Math.random().toString(36).substr(2, 4);
    const newToast = { id, title, description, variant };

    setToasts((prev) => [...prev, newToast]);

    if (duration > 0) {
      setTimeout(() => {
        setToasts((prev) => prev.filter((t) => t.id !== id));
      }, duration);
    }
  }, []);

  const removeToast = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ addToast, removeToast }}>
      {children}
      {/* Toast container in bottom right */}
      <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-2 max-w-sm w-full pointer-events-none px-4 sm:px-0">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className="pointer-events-auto flex items-start gap-3 p-4 bg-white border border-[#E4E7EC] rounded-lg shadow-sm transition-all duration-200"
          >
            <div className="mt-0.5 shrink-0">
              {toast.variant === 'success' && (
                <CheckCircle2 className="w-5 h-5 text-[#0E6245]" />
              )}
              {toast.variant === 'error' && (
                <AlertCircle className="w-5 h-5 text-[#991B1B]" />
              )}
              {toast.variant === 'info' && (
                <Info className="w-5 h-5 text-[#1B365D]" />
              )}
            </div>
            <div className="flex-1 text-left min-w-0">
              <h4 className="text-sm font-semibold text-[#111625] leading-snug">
                {toast.title}
              </h4>
              {toast.description && (
                <p className="text-xs text-[#5C6479] mt-0.5 leading-relaxed">
                  {toast.description}
                </p>
              )}
            </div>
            <button
              onClick={() => removeToast(toast.id)}
              className="text-[#5C6479] hover:text-[#111625] p-1 -mr-1 -mt-1 transition-colors"
              aria-label="Close notification"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
}
