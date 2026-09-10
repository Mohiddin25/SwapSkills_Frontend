import React from 'react';
import { X } from 'lucide-react';

export function SkillTag({
  skill,
  type = 'teach', // 'teach' | 'learn'
  onRemove,
  size = 'md',
  className = ''
}) {
  const name = typeof skill === 'string' ? skill : skill.name;
  const level = typeof skill === 'object' && skill.level ? skill.level : null;

  const sizeClasses = {
    sm: 'text-xs px-2 py-0.5 gap-1',
    md: 'text-xs sm:text-sm px-2.5 py-1 gap-1.5'
  };

  // Strict Ivy Editorial distinction:
  // Teach: White/transparent bg, 1px solid #111625, #111625 text
  // Learn: #E4E7EC background, #111625 text
  const typeStyles = type === 'teach'
    ? 'bg-white border border-[#111625] text-[#111625] font-medium'
    : 'bg-[#E4E7EC] border border-transparent text-[#111625] font-normal';

  return (
    <span
      className={`inline-flex items-center rounded-md transition-colors leading-tight select-none ${
        sizeClasses[size] || sizeClasses.md
      } ${typeStyles} ${className}`}
    >
      <span>{name}</span>
      {level && (
        <span className="opacity-70 text-[11px] font-normal">
          · {level}
        </span>
      )}
      {onRemove && (
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onRemove();
          }}
          className="hover:opacity-75 p-0.5 -mr-1 rounded cursor-pointer"
          aria-label={`Remove ${name}`}
        >
          <X className="w-3 h-3" />
        </button>
      )}
    </span>
  );
}
