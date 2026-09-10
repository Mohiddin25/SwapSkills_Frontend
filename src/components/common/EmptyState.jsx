import React from 'react';
import { Button } from './Button';

export function EmptyState({
  icon: Icon,
  title,
  description,
  actionLabel,
  onAction,
  className = ''
}) {
  return (
    <div className={`py-12 px-6 text-center border border-dashed border-[#E4E7EC] rounded-xl bg-[#FBFBFA]/60 ${className}`}>
      {Icon && (
        <div className="w-11 h-11 mx-auto mb-3.5 flex items-center justify-center rounded-full bg-[#F0F4F8] text-[#1B365D] border border-[#D0DCE7]">
          <Icon className="w-5 h-5" />
        </div>
      )}
      <h3 className="text-base font-semibold text-[#111625] mb-1">
        {title}
      </h3>
      {description && (
        <p className="text-xs sm:text-sm text-[#5C6479] max-w-md mx-auto leading-relaxed mb-5">
          {description}
        </p>
      )}
      {actionLabel && onAction && (
        <Button variant="outline" size="sm" onClick={onAction}>
          {actionLabel}
        </Button>
      )}
    </div>
  );
}
