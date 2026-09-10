import React from 'react';

export function StatBlock({
  label,
  value,
  subtext,
  icon: Icon,
  className = ''
}) {
  return (
    <div className={`p-4 sm:p-5 bg-white border border-[#E4E7EC] rounded-xl flex flex-col justify-between text-left ${className}`}>
      <div className="flex items-center justify-between gap-2">
        <span className="text-xs font-semibold uppercase tracking-wider text-[#5C6479]">
          {label}
        </span>
        {Icon && (
          <Icon className="w-4 h-4 text-[#5C6479]" />
        )}
      </div>
      <div className="mt-2.5">
        <div className="text-2xl sm:text-3xl font-semibold tracking-tight text-[#111625]">
          {value}
        </div>
        {subtext && (
          <div className="text-xs text-[#5C6479] mt-1 font-normal">
            {subtext}
          </div>
        )}
      </div>
    </div>
  );
}
