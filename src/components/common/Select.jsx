import React, { forwardRef } from 'react';

export const Select = forwardRef(function Select(
  {
    label,
    options = [],
    error,
    helperText,
    className = '',
    id,
    ...props
  },
  ref
) {
  const selectId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);

  return (
    <div className="w-full space-y-1.5 text-left">
      {label && (
        <label
          htmlFor={selectId}
          className="block text-xs font-semibold uppercase tracking-wider text-[#111625]"
        >
          {label}
        </label>
      )}
      <select
        ref={ref}
        id={selectId}
        className={`w-full bg-white text-[#111625] text-sm rounded-lg border transition-colors px-3 py-2 outline-none focus:border-[#1B365D] focus:ring-1 focus:ring-[#1B365D] cursor-pointer ${
          error ? 'border-[#991B1B]' : 'border-[#E4E7EC]'
        } ${className}`}
        {...props}
      >
        {options.map((opt) => {
          if (typeof opt === 'string') {
            return (
              <option key={opt} value={opt}>
                {opt}
              </option>
            );
          }
          return (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          );
        })}
      </select>
      {error && <p className="text-xs text-[#991B1B]">{error}</p>}
      {!error && helperText && <p className="text-xs text-[#5C6479]">{helperText}</p>}
    </div>
  );
});
