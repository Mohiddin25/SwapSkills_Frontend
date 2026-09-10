import React from 'react';
import { formatInitials } from '../../utils/formatters';

export function Avatar({
  name = '',
  size = 'md',
  src = null,
  department = '',
  className = ''
}) {
  const sizeMap = {
    sm: 'w-7 h-7 text-xs',
    md: 'w-10 h-10 text-sm font-medium',
    lg: 'w-14 h-14 text-base font-semibold',
    xl: 'w-20 h-20 text-xl font-bold'
  };

  const initials = formatInitials(name);

  return (
    <div
      className={`relative inline-flex items-center justify-center shrink-0 rounded-full border border-[#E4E7EC] bg-[#F0F4F8] text-[#1B365D] uppercase tracking-wider select-none ${
        sizeMap[size] || sizeMap.md
      } ${className}`}
      title={name}
    >
      {src ? (
        <img
          src={src}
          alt={name}
          className="w-full h-full object-cover rounded-full"
        />
      ) : (
        <span>{initials}</span>
      )}
    </div>
  );
}
