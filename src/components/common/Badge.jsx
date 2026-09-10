import React from 'react';

export function Badge({
  children,
  variant = 'neutral',
  size = 'md',
  className = ''
}) {
  const sizeStyles = {
    sm: 'text-[11px] px-2 py-0.5',
    md: 'text-xs px-2.5 py-1'
  };

  const variantStyles = {
    neutral: 'bg-[#FBFBFA] text-[#5C6479] border border-[#E4E7EC]',
    oxford: 'bg-[#F0F4F8] text-[#1B365D] border border-[#D0DCE7] font-medium',
    pending: 'bg-[#FEF3C7] text-[#92400E] border border-[#FDE68A]',
    accepted: 'bg-[#E6F4EA] text-[#0E6245] border border-[#C2E7D1]',
    declined: 'bg-[#FEE2E2] text-[#991B1B] border border-[#FECACA]',
    completed: 'bg-[#F0F4F8] text-[#1B365D] border border-[#D0DCE7]',
    highMatch: 'bg-[#E6F4EA] text-[#0E6245] border border-[#C2E7D1] font-semibold'
  };

  return (
    <span
      className={`inline-flex items-center rounded-md font-sans leading-none tracking-tight ${
        sizeStyles[size] || sizeStyles.md
      } ${variantStyles[variant] || variantStyles.neutral} ${className}`}
    >
      {children}
    </span>
  );
}
