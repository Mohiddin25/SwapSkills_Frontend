import React, { forwardRef } from 'react';

export const Textarea = forwardRef(function Textarea(
  {
    label,
    sublabel,
    error,
    helperText,
    rows = 3,
    className = '',
    id,
    ...props
  },
  ref
) {
  const textareaId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);

  return (
    <div className="w-full space-y-1.5 text-left">
      {label && (
        <div className="flex justify-between items-baseline">
          <label
            htmlFor={textareaId}
            className="block text-xs font-semibold uppercase tracking-wider text-[#111625]"
          >
            {label}
          </label>
          {sublabel && (
            <span className="text-xs text-[#5C6479]">{sublabel}</span>
          )}
        </div>
      )}
      <textarea
        ref={ref}
        id={textareaId}
        rows={rows}
        className={`w-full bg-white text-[#111625] placeholder-[#5C6479]/60 text-sm rounded-lg border transition-colors px-3 py-2 outline-none focus:border-[#1B365D] focus:ring-1 focus:ring-[#1B365D] resize-y ${
          error ? 'border-[#991B1B]' : 'border-[#E4E7EC]'
        } ${className}`}
        {...props}
      />
      {error && <p className="text-xs text-[#991B1B]">{error}</p>}
      {!error && helperText && <p className="text-xs text-[#5C6479]">{helperText}</p>}
    </div>
  );
});
