import React from 'react';
import { Calendar, ArrowRight, UserCheck } from 'lucide-react';
import { Avatar } from '../common/Avatar';
import { Button } from '../common/Button';
import { SkillTag } from '../skills/SkillTag';
import { MatchScore } from './MatchScore';

export function MatchCard({
  match,
  onRequestSwap,
  onViewDetails
}) {
  const {
    name,
    department,
    year,
    compatibility,
    skillsTeach = [],
    skillsLearn = [],
    sharedAvailability,
    explanation
  } = match;

  return (
    <div className="bg-white border border-[#E4E7EC] rounded-xl p-5 flex flex-col justify-between transition-all duration-200 hover:border-[#1B365D]/40 text-left">
      <div>
        {/* Header: Avatar, Name, Dept, MatchScore */}
        <div className="flex items-start justify-between gap-3 pb-3.5 border-b border-[#E4E7EC]">
          <div className="flex items-center gap-3 min-w-0">
            <Avatar name={name} size="md" />
            <div className="min-w-0">
              <h3 className="text-base font-semibold text-[#111625] truncate">
                {name}
              </h3>
              <p className="text-xs text-[#5C6479] truncate">
                {department} · {year}
              </p>
            </div>
          </div>
          <MatchScore score={compatibility} />
        </div>

        {/* Skills Section */}
        <div className="py-3.5 space-y-3">
          {/* Can teach */}
          <div>
            <span className="block text-[11px] font-semibold uppercase tracking-wider text-[#5C6479] mb-1.5">
              Can teach
            </span>
            <div className="flex flex-wrap gap-1.5">
              {skillsTeach.slice(0, 3).map((skill, idx) => (
                <SkillTag key={idx} skill={skill} type="teach" size="sm" />
              ))}
            </div>
          </div>

          {/* Wants to learn */}
          <div>
            <span className="block text-[11px] font-semibold uppercase tracking-wider text-[#5C6479] mb-1.5">
              Wants to learn
            </span>
            <div className="flex flex-wrap gap-1.5">
              {skillsLearn.slice(0, 3).map((skill, idx) => (
                <SkillTag key={idx} skill={skill} type="learn" size="sm" />
              ))}
            </div>
          </div>
        </div>

        {/* Shared availability */}
        {sharedAvailability && (
          <div className="py-2.5 px-3 bg-[#FBFBFA] border border-[#E4E7EC] rounded-lg text-xs text-[#111625] flex items-center gap-2 mb-3">
            <Calendar className="w-3.5 h-3.5 text-[#1B365D] shrink-0" />
            <span className="text-[#5C6479]">Shared availability:</span>
            <span className="font-medium text-[#111625]">{sharedAvailability}</span>
          </div>
        )}

        {/* Why this is a strong match */}
        {explanation && (
          <div className="py-2.5 px-3 bg-[#F0F4F8]/60 border-l-2 border-[#1B365D] rounded-r-lg mb-4">
            <span className="block text-[10px] font-semibold uppercase tracking-wider text-[#1B365D] mb-0.5">
              Why this is a strong match
            </span>
            <p className="text-xs text-[#5C6479] leading-relaxed italic">
              "{explanation}"
            </p>
          </div>
        )}
      </div>

      {/* Action buttons */}
      <div className="pt-3 border-t border-[#E4E7EC] flex items-center justify-between gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => onViewDetails(match)}
          className="flex-1"
        >
          View Profile
        </Button>
        <Button
          variant="primary"
          size="sm"
          onClick={() => onRequestSwap(match)}
          className="flex-1"
        >
          Request Swap
        </Button>
      </div>
    </div>
  );
}
