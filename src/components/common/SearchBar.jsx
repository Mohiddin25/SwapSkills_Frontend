import React from 'react';
import { Search, X } from 'lucide-react';

export function SearchBar({
  value,
  onChange,
  onClear,
  placeholder = 'Search skills or students...',
  className = ''
}) {
  return (
    <div className={`relative w-full ${className}`}>
      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#5C6479]">
        <Search className="w-4 h-4" />
      </div>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full bg-white text-[#111625] placeholder-[#5C6479]/60 text-sm rounded-lg border border-[#E4E7EC] pl-10 pr-9 py-2.5 outline-none focus:border-[#1B365D] focus:ring-1 focus:ring-[#1B365D] transition-colors"
      />
      {value && onClear && (
        <button
          type="button"
          onClick={onClear}
          className="absolute inset-y-0 right-0 pr-3 flex items-center text-[#5C6479] hover:text-[#111625]"
          aria-label="Clear search input"
        >
          <X className="w-4 h-4" />
        </button>
      )}
    </div>
  );
}
