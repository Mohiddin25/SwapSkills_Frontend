import React from 'react';

export function MatchScore({ score, size = 'md', showLabel = true, className = '' }) {
  const isHigh = score >= 80;

  // Strict Ivy Editorial semantic colors:
  // High Match: #0E6245 on #E6F4EA
  // Partial Match: #1B365D on #F0F4F8
  const colorStyles = isHigh
    ? 'text-[#0E6245] bg-[#E6F4EA] border-[#C2E7D1]'
    : 'text-[#1B365D] bg-[#F0F4F8] border-[#D0DCE7]';

  const sizeStyles = {
    sm: 'text-xs px-2 py-0.5 font-medium',
    md: 'text-xs sm:text-sm px-2.5 py-1 font-semibold',
    lg: 'text-base sm:text-lg px-3 py-1.5 font-bold tracking-tight'
  };

  return (
    <span
      className={`inline-flex items-center gap-1 rounded-md border tracking-tight select-none ${
        sizeStyles[size] || sizeStyles.md
      } ${colorStyles} ${className}`}
    >
      <span>{Math.round(score)}%</span>
      {showLabel && <span className="font-normal opacity-90 text-[85%]">Match</span>}
    </span>
  );
}
