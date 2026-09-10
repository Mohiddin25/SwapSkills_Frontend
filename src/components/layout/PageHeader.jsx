import React from 'react';

export function PageHeader({
  eyebrow,
  title,
  subtitle,
  actions,
  className = ''
}) {
  return (
    <div className={`border-b border-[#E4E7EC] pb-6 mb-8 text-left ${className}`}>
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          {eyebrow && (
            <span className="text-[11px] font-semibold uppercase tracking-wider text-[#1B365D] block mb-1">
              {eyebrow}
            </span>
          )}
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#111625] leading-tight">
            {title}
          </h1>
          {subtitle && (
            <p className="text-sm text-[#5C6479] mt-1 leading-relaxed max-w-2xl">
              {subtitle}
            </p>
          )}
        </div>
        {actions && (
          <div className="flex items-center gap-2.5 shrink-0">
            {actions}
          </div>
        )}
      </div>
    </div>
  );
}
