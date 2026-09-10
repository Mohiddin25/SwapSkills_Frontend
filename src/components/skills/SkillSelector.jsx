import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import { POPULAR_SKILLS, SKILL_LEVELS } from '../../constants/skills';
import { Button } from '../common/Button';
import { SkillTag } from './SkillTag';

export function SkillSelector({
  skills = [],
  onChange,
  type = 'teach',
  label,
  sublabel,
  placeholder = 'Type skill or choose below...'
}) {
  const [query, setQuery] = useState('');
  const [level, setLevel] = useState('Intermediate');

  const handleAdd = (skillName) => {
    const trimmed = skillName.trim();
    if (!trimmed) return;

    // Check if already added
    const exists = skills.some(
      (s) => (typeof s === 'string' ? s : s.name).toLowerCase() === trimmed.toLowerCase()
    );
    if (exists) return;

    const newSkill = type === 'teach' ? { name: trimmed, level } : { name: trimmed, level };
    onChange([...skills, newSkill]);
    setQuery('');
  };

  const handleRemove = (indexToRemove) => {
    onChange(skills.filter((_, idx) => idx !== indexToRemove));
  };

  const suggestedSkills = POPULAR_SKILLS.filter(
    (ps) => !skills.some((s) => (typeof s === 'string' ? s : s.name).toLowerCase() === ps.toLowerCase())
  ).slice(0, 6);

  return (
    <div className="space-y-3 text-left">
      {label && (
        <div className="flex justify-between items-baseline">
          <label className="block text-xs font-semibold uppercase tracking-wider text-[#111625]">
            {label}
          </label>
          {sublabel && <span className="text-xs text-[#5C6479]">{sublabel}</span>}
        </div>
      )}

      {/* Input + Level + Add */}
      <div className="flex flex-col sm:flex-row gap-2">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault();
              handleAdd(query);
            }
          }}
          placeholder={placeholder}
          className="flex-1 bg-white text-[#111625] text-sm rounded-lg border border-[#E4E7EC] px-3 py-2 outline-none focus:border-[#1B365D]"
        />

        {type === 'teach' && (
          <select
            value={level}
            onChange={(e) => setLevel(e.target.value)}
            className="text-xs bg-white text-[#111625] border border-[#E4E7EC] rounded-lg px-2.5 py-2 outline-none focus:border-[#1B365D]"
          >
            {SKILL_LEVELS.map((lvl) => (
              <option key={lvl} value={lvl}>{lvl}</option>
            ))}
          </select>
        )}

        <Button
          type="button"
          size="md"
          variant="cream"
          icon={Plus}
          onClick={() => handleAdd(query)}
          disabled={!query.trim()}
        >
          Add
        </Button>
      </div>

      {/* Selected tags */}
      {skills.length > 0 && (
        <div className="flex flex-wrap gap-2 pt-1">
          {skills.map((skill, index) => (
            <SkillTag
              key={index}
              skill={skill}
              type={type}
              onRemove={() => handleRemove(index)}
            />
          ))}
        </div>
      )}

      {/* Quick Add Suggestions */}
      {suggestedSkills.length > 0 && (
        <div className="pt-1">
          <span className="text-[11px] uppercase tracking-wider font-medium text-[#5C6479] block mb-1.5">
            Quick Add:
          </span>
          <div className="flex flex-wrap gap-1.5">
            {suggestedSkills.map((ps) => (
              <button
                key={ps}
                type="button"
                onClick={() => handleAdd(ps)}
                className="text-xs px-2 py-1 rounded border border-[#E4E7EC] bg-white text-[#5C6479] hover:text-[#111625] hover:border-[#1B365D] transition-colors cursor-pointer"
              >
                + {ps}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
