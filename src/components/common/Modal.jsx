import React, { useEffect } from 'react';
import { X } from 'lucide-react';

export function Modal({
  isOpen,
  onClose,
  title,
  subtitle,
  children,
  footer,
  maxWidth = 'max-w-lg'
}) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* Subtle backdrop */}
      <div
        className="fixed inset-0 bg-[#111625]/40 transition-opacity backdrop-blur-[1px]"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal Dialog */}
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby={title ? 'modal-title' : undefined}
        className={`relative w-full ${maxWidth} bg-white rounded-xl border border-[#E4E7EC] shadow-md z-10 overflow-hidden my-8`}
      >
        {/* Header */}
        <div className="flex items-start justify-between px-6 py-4 border-b border-[#E4E7EC] bg-[#FBFBFA]">
          <div>
            {title && (
              <h3 id="modal-title" className="text-base sm:text-lg font-semibold text-[#111625]">
                {title}
              </h3>
            )}
            {subtitle && (
              <p className="text-xs sm:text-sm text-[#5C6479] mt-0.5">
                {subtitle}
              </p>
            )}
          </div>
          <button
            type="button"
            onClick={onClose}
            className="text-[#5C6479] hover:text-[#111625] p-1.5 -mr-2 rounded-md hover:bg-[#E4E7EC]/50 transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="px-6 py-5 max-h-[75vh] overflow-y-auto">
          {children}
        </div>

        {/* Footer */}
        {footer && (
          <div className="flex items-center justify-end gap-3 px-6 py-3.5 border-t border-[#E4E7EC] bg-[#FBFBFA]">
            {footer}
          </div>
        )}
      </div>
    </div>
  );
}
