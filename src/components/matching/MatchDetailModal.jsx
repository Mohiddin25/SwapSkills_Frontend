import React from 'react';
import { Calendar, MapPin, Award, CheckCircle } from 'lucide-react';
import { Modal } from '../common/Modal';
import { Button } from '../common/Button';
import { Avatar } from '../common/Avatar';
import { SkillTag } from '../skills/SkillTag';
import { MatchScore } from './MatchScore';
import { CompatibilityBreakdown } from './CompatibilityBreakdown';

export function MatchDetailModal({
  isOpen,
  onClose,
  match,
  onRequestSwap
}) {
  if (!match) return null;

  const {
    name,
    department,
    year,
    bio,
    contributorLevel,
    compatibility,
    breakdown,
    explanation,
    skillsTeach = [],
    skillsLearn = [],
    sharedAvailability,
    locationPreference,
    commonTeachLearn
  } = match;

  const youTeach = commonTeachLearn?.youTeach || (skillsLearn[0]?.name || 'Python');
  const theyTeach = commonTeachLearn?.theyTeach || (skillsTeach[0]?.name || 'UI/UX Design');

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Student Match Dossier"
      subtitle={`${department} · ${year}`}
      maxWidth="max-w-2xl"
      footer={
        <>
          <Button variant="outline" size="sm" onClick={onClose}>
            Close
          </Button>
          <Button
            variant="primary"
            size="sm"
            onClick={() => {
              onClose();
              onRequestSwap(match);
            }}
          >
            Send Swap Request
          </Button>
        </>
      }
    >
      <div className="space-y-6 text-left">
        {/* Profile Summary Header */}
        <div className="flex items-start justify-between gap-4 pb-4 border-b border-[#E4E7EC]">
          <div className="flex items-center gap-3.5">
            <Avatar name={name} size="lg" />
            <div>
              <h2 className="text-xl font-semibold text-[#111625] tracking-tight">
                {name}
              </h2>
              <p className="text-xs text-[#5C6479] mt-0.5">
                {department} · {year}
              </p>
              {contributorLevel && (
                <div className="inline-flex items-center gap-1 text-[11px] text-[#1B365D] bg-[#F0F4F8] border border-[#D0DCE7] px-2 py-0.5 rounded mt-1.5 font-medium">
                  <Award className="w-3 h-3" />
                  <span>{contributorLevel}</span>
                </div>
              )}
            </div>
          </div>
          <div className="text-right">
            <div className="text-xs text-[#5C6479] mb-1">Compatibility Score</div>
            <MatchScore score={compatibility} size="lg" />
          </div>
        </div>

        {/* Bio */}
        {bio && (
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-[#5C6479] mb-1">
              About Student
            </h4>
            <p className="text-sm text-[#111625] leading-relaxed">
              {bio}
            </p>
          </div>
        )}

        {/* Skill Exchange Reciprocity Box */}
        <div className="bg-[#FBFBFA] border border-[#E4E7EC] rounded-xl p-4">
          <div className="text-xs font-semibold uppercase tracking-wider text-[#111625] mb-3 pb-2 border-b border-[#E4E7EC]">
            Proposed Skill Exchange
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <span className="block text-[11px] uppercase tracking-wider text-[#5C6479] font-medium mb-1.5">
                You Teach
              </span>
              <div className="inline-flex items-center gap-2 p-2 bg-white border border-[#111625] rounded-lg">
                <span className="text-sm font-semibold text-[#111625]">{youTeach}</span>
              </div>
            </div>
            <div>
              <span className="block text-[11px] uppercase tracking-wider text-[#5C6479] font-medium mb-1.5">
                They Teach
              </span>
              <div className="inline-flex items-center gap-2 p-2 bg-[#E4E7EC] rounded-lg">
                <span className="text-sm font-semibold text-[#111625]">{theyTeach}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Full Skills Catalog */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-[#5C6479]">
              Skills {name.split(' ')[0]} Can Teach
            </h4>
            <div className="flex flex-wrap gap-1.5">
              {skillsTeach.map((s, idx) => (
                <SkillTag key={idx} skill={s} type="teach" size="sm" />
              ))}
            </div>
          </div>
          <div className="space-y-2">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-[#5C6479]">
              Skills {name.split(' ')[0]} Wants to Learn
            </h4>
            <div className="flex flex-wrap gap-1.5">
              {skillsLearn.map((s, idx) => (
                <SkillTag key={idx} skill={s} type="learn" size="sm" />
              ))}
            </div>
          </div>
        </div>

        {/* Schedule & Location */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-[#E4E7EC]">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-[#5C6479] block mb-1">
              Mutual Availability
            </span>
            <div className="flex items-center gap-2 text-sm text-[#111625]">
              <Calendar className="w-4 h-4 text-[#1B365D]" />
              <span>{sharedAvailability || 'Flexible peer hours'}</span>
            </div>
          </div>
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-[#5C6479] block mb-1">
              Campus Location
            </span>
            <div className="flex items-center gap-2 text-sm text-[#111625]">
              <MapPin className="w-4 h-4 text-[#1B365D]" />
              <span>{locationPreference || 'Central Library Study Commons'}</span>
            </div>
          </div>
        </div>

        {/* Transparent Compatibility Breakdown */}
        <div className="pt-2 border-t border-[#E4E7EC]">
          <CompatibilityBreakdown breakdown={breakdown} />
        </div>
      </div>
    </Modal>
  );
}
