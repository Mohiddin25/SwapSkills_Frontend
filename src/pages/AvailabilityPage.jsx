import React, { useState } from 'react';
import { PageHeader } from '../components/layout/PageHeader';
import { AvailabilityEditor } from '../components/availability/AvailabilityEditor';
import { AvailabilityGrid } from '../components/availability/AvailabilityGrid';
import { useAuth } from '../context/AuthContext';
import { Clock, Info } from 'lucide-react';

export function AvailabilityPage() {
  const { user, updateAvailability } = useAuth();
  const [availability, setAvailability] = useState(user?.availability || []);

  const handleUpdate = async (newAvailability) => {
    setAvailability(newAvailability);
    await updateAvailability(newAvailability);
  };

  return (
    <div className="space-y-8 text-left">
      <PageHeader
        eyebrow="Time Synchronization"
        title="Weekly Availability"
        subtitle="Manage the study blocks you have open for peer swaps. High schedule overlap directly elevates your rank in matching results."
      />

      {/* Editorial Note */}
      <div className="p-4 bg-[#F0F4F8] border border-[#D0DCE7] rounded-xl flex items-start gap-3 text-xs text-[#1B365D]">
        <Info className="w-4 h-4 shrink-0 mt-0.5" />
        <div className="leading-relaxed">
          <strong>Compatibility Impact:</strong> In our transparent scoring formula, 25% of each compatibility score is determined by weekly schedule overlap. Maintaining accurate availability ensures only feasible swap proposals are generated.
        </div>
      </div>

      {/* Editor component */}
      <AvailabilityEditor
        availability={availability}
        onSave={handleUpdate}
      />

      {/* Dense High-Information Weekly Scheduling Table */}
      <div className="space-y-3 pt-4 border-t border-[#E4E7EC]">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-sm font-semibold text-[#111625]">
              Dense Campus Schedule Grid
            </h3>
            <p className="text-xs text-[#5C6479]">
              Visual distribution across campus study hours
            </p>
          </div>
          <div className="flex items-center gap-3 text-xs">
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded bg-[#F0F4F8] border border-[#D0DCE7]" />
              <span className="text-[#1B365D] font-medium">Available</span>
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded bg-[#FBFBFA] border border-[#E4E7EC]" />
              <span className="text-[#5C6479]">Unavailable</span>
            </span>
          </div>
        </div>

        <AvailabilityGrid availability={availability} />
      </div>
    </div>
  );
}
