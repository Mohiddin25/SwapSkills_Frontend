import React from 'react';
import { SlidersHorizontal, RotateCcw } from 'lucide-react';
import { DEPARTMENTS, YEARS, SKILL_LEVELS } from '../../constants/skills';

export function FilterBar({
  filters,
  onFilterChange,
  onReset,
  availableSkills = [],
  totalCount = 0
}) {
  const days = ['Any Day', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

  const hasActiveFilters =
    (filters.skill && filters.skill !== 'All Skills') ||
    (filters.skillLevel && filters.skillLevel !== 'All Levels') ||
    (filters.department && filters.department !== 'All Departments') ||
    (filters.year && filters.year !== 'All Years') ||
    (filters.availability && filters.availability !== 'Any Day') ||
    (filters.sortBy && filters.sortBy !== 'Best Match');

  return (
    <div className="bg-white border border-[#E4E7EC] rounded-xl p-4 space-y-3.5 text-left">
      <div className="flex items-center justify-between gap-2 border-b border-[#E4E7EC] pb-2.5">
        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#111625]">
          <SlidersHorizontal className="w-3.5 h-3.5 text-[#1B365D]" />
          <span>Filter & Rank Candidates</span>
          <span className="text-[#5C6479] font-normal lowercase tracking-normal">
            ({totalCount} available)
          </span>
        </div>
        {hasActiveFilters && (
          <button
            type="button"
            onClick={onReset}
            className="inline-flex items-center gap-1 text-xs text-[#1B365D] hover:underline font-medium cursor-pointer"
          >
            <RotateCcw className="w-3 h-3" />
            <span>Reset filters</span>
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2.5">
        {/* Skill filter */}
        <div>
          <label className="block text-[10px] font-semibold uppercase tracking-wider text-[#5C6479] mb-1">
            Skill
          </label>
          <select
            value={filters.skill || 'All Skills'}
            onChange={(e) => onFilterChange('skill', e.target.value)}
            className="w-full text-xs bg-white text-[#111625] border border-[#E4E7EC] rounded-md px-2 py-1.5 outline-none focus:border-[#1B365D]"
          >
            <option value="All Skills">All Skills</option>
            {availableSkills.map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
        </div>

        {/* Skill level */}
        <div>
          <label className="block text-[10px] font-semibold uppercase tracking-wider text-[#5C6479] mb-1">
            Skill Level
          </label>
          <select
            value={filters.skillLevel || 'All Levels'}
            onChange={(e) => onFilterChange('skillLevel', e.target.value)}
            className="w-full text-xs bg-white text-[#111625] border border-[#E4E7EC] rounded-md px-2 py-1.5 outline-none focus:border-[#1B365D]"
          >
            <option value="All Levels">All Levels</option>
            {SKILL_LEVELS.map((lvl) => (
              <option key={lvl} value={lvl}>{lvl}</option>
            ))}
          </select>
        </div>

        {/* Availability */}
        <div>
          <label className="block text-[10px] font-semibold uppercase tracking-wider text-[#5C6479] mb-1">
            Availability
          </label>
          <select
            value={filters.availability || 'Any Day'}
            onChange={(e) => onFilterChange('availability', e.target.value)}
            className="w-full text-xs bg-white text-[#111625] border border-[#E4E7EC] rounded-md px-2 py-1.5 outline-none focus:border-[#1B365D]"
          >
            {days.map((d) => (
              <option key={d} value={d}>{d}</option>
            ))}
          </select>
        </div>

        {/* Department */}
        <div>
          <label className="block text-[10px] font-semibold uppercase tracking-wider text-[#5C6479] mb-1">
            Department
          </label>
          <select
            value={filters.department || 'All Departments'}
            onChange={(e) => onFilterChange('department', e.target.value)}
            className="w-full text-xs bg-white text-[#111625] border border-[#E4E7EC] rounded-md px-2 py-1.5 outline-none focus:border-[#1B365D]"
          >
            <option value="All Departments">All Departments</option>
            {DEPARTMENTS.map((dept) => (
              <option key={dept} value={dept}>{dept}</option>
            ))}
          </select>
        </div>

        {/* Year */}
        <div>
          <label className="block text-[10px] font-semibold uppercase tracking-wider text-[#5C6479] mb-1">
            Year
          </label>
          <select
            value={filters.year || 'All Years'}
            onChange={(e) => onFilterChange('year', e.target.value)}
            className="w-full text-xs bg-white text-[#111625] border border-[#E4E7EC] rounded-md px-2 py-1.5 outline-none focus:border-[#1B365D]"
          >
            <option value="All Years">All Years</option>
            {YEARS.map((yr) => (
              <option key={yr} value={yr}>{yr}</option>
            ))}
          </select>
        </div>

        {/* Sort By */}
        <div>
          <label className="block text-[10px] font-semibold uppercase tracking-wider text-[#5C6479] mb-1">
            Rank By
          </label>
          <select
            value={filters.sortBy || 'Best Match'}
            onChange={(e) => onFilterChange('sortBy', e.target.value)}
            className="w-full text-xs bg-white text-[#111625] border border-[#E4E7EC] rounded-md px-2 py-1.5 outline-none focus:border-[#1B365D] font-medium"
          >
            <option value="Best Match">Best Match</option>
            <option value="Availability">Availability Overlap</option>
            <option value="Skill Level">Skill Level</option>
          </select>
        </div>
      </div>
    </div>
  );
}
