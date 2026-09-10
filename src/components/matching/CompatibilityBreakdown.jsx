import React from 'react';

export function CompatibilityBreakdown({ breakdown, className = '' }) {
  if (!breakdown) return null;

  const items = [
    {
      label: 'Skill compatibility',
      score: breakdown.skillCompatibility,
      max: breakdown.skillMax || 50,
      pct: (breakdown.skillCompatibility / (breakdown.skillMax || 50)) * 100
    },
    {
      label: 'Availability overlap',
      score: breakdown.availabilityOverlap,
      max: breakdown.availabilityMax || 25,
      pct: (breakdown.availabilityOverlap / (breakdown.availabilityMax || 25)) * 100
    },
    {
      label: 'Skill-level compatibility',
      score: breakdown.skillLevelCompatibility,
      max: breakdown.skillLevelMax || 15,
      pct: (breakdown.skillLevelCompatibility / (breakdown.skillLevelMax || 15)) * 100
    },
    {
      label: 'Campus proximity',
      score: breakdown.locationProximity,
      max: breakdown.locationMax || 10,
      pct: (breakdown.locationProximity / (breakdown.locationMax || 10)) * 100
    }
  ];

  return (
    <div className={`space-y-2.5 text-left ${className}`}>
      <div className="flex items-center justify-between">
        <h4 className="text-xs font-semibold uppercase tracking-wider text-[#111625]">
          Transparent Score Breakdown
        </h4>
        <span className="text-[11px] text-[#5C6479]">Algorithmic weights</span>
      </div>

      <div className="space-y-2">
        {items.map((item, idx) => (
          <div key={idx} className="space-y-1">
            <div className="flex items-center justify-between text-xs">
              <span className="text-[#5C6479]">{item.label}</span>
              <span className="font-medium text-[#111625]">
                {item.score} <span className="text-[#5C6479] font-normal">/ {item.max}</span>
              </span>
            </div>
            {/* Fine hairline progress track */}
            <div className="w-full h-1.5 bg-[#F0F4F8] rounded-full overflow-hidden border border-[#E4E7EC]">
              <div
                className="h-full bg-[#1B365D] rounded-full transition-all duration-300"
                style={{ width: `${Math.min(100, Math.max(5, item.pct))}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
