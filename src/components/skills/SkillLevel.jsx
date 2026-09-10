import React from 'react';
import { SKILL_LEVELS } from '../../constants/skills';

export function SkillLevel({ value, onChange, className = '' }) {
  return (
    <div className={`inline-flex rounded-lg border border-[#E4E7EC] p-0.5 bg-[#FBFBFA] ${className}`}>
      {SKILL_LEVELS.map((level) => {
        const isSelected = value === level;
        return (
          <button
            key={level}
            type="button"
            onClick={() => onChange(level)}
            className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors cursor-pointer ${
              isSelected
                ? 'bg-[#1B365D] text-white'
                : 'text-[#5C6479] hover:text-[#111625] hover:bg-white/60'
            }`}
          >
            {level}
          </button>
        );
      })}
    </div>
  );
}
