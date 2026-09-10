import React, { forwardRef } from 'react';

export const Input = forwardRef(function Input(
  {
    label,
    sublabel,
    error,
    helperText,
    icon: Icon,
    className = '',
    id,
    ...props
  },
  ref
) {
  const inputId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);

  return (
    <div className="w-full space-y-1.5 text-left">
      {label && (
        <div className="flex justify-between items-baseline">
          <label
            htmlFor={inputId}
            className="block text-xs font-semibold uppercase tracking-wider text-[#111625]"
          >
            {label}
          </label>
          {sublabel && (
            <span className="text-xs text-[#5C6479]">{sublabel}</span>
          )}
        </div>
      )}
      <div className="relative rounded-lg">
        {Icon && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-[#5C6479]">
            <Icon className="w-4 h-4" />
          </div>
        )}
        <input
          ref={ref}
          id={inputId}
          className={`w-full bg-white text-[#111625] placeholder-[#5C6479]/60 text-sm rounded-lg border transition-colors px-3 py-2 outline-none focus:border-[#1B365D] focus:ring-1 focus:ring-[#1B365D] ${
            Icon ? 'pl-9' : ''
          } ${
            error ? 'border-[#991B1B] focus:border-[#991B1B] focus:ring-[#991B1B]' : 'border-[#E4E7EC]'
          } ${className}`}
          {...props}
        />
      </div>
      {error && (
        <p className="text-xs text-[#991B1B]">{error}</p>
      )}
      {!error && helperText && (
        <p className="text-xs text-[#5C6479]">{helperText}</p>
      )}
    </div>
  );
});
