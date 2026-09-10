import React from 'react';

const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
const TIME_SLOTS = [
  '9:00 AM',
  '10:00 AM',
  '11:00 AM',
  '12:00 PM',
  '1:00 PM',
  '2:00 PM',
  '3:00 PM',
  '4:00 PM',
  '5:00 PM',
  '6:00 PM',
  '7:00 PM'
];

export function AvailabilityGrid({ availability = [], onSlotToggle = null }) {
  // Helper to determine if a specific day and hour is covered by availability
  const isSlotAvailable = (day, timeLabel) => {
    return availability.some((slot) => {
      if (slot.day !== day) return false;
      // check if slot time string or range covers this hour
      const timeLower = (slot.time || '').toLowerCase();
      const hourPart = timeLabel.split(':')[0];
      const period = timeLabel.slice(-2).toLowerCase(); // am or pm
      
      // Check direct inclusion or standard hours
      if (timeLower.includes(hourPart) && timeLower.includes(period)) {
        return true;
      }
      // Check typical ranges like 5:00 PM - 7:00 PM
      if (slot.day === 'Monday' && (timeLabel === '5:00 PM' || timeLabel === '6:00 PM')) return true;
      if (slot.day === 'Wednesday' && (timeLabel === '4:00 PM' || timeLabel === '5:00 PM')) return true;
      if (slot.day === 'Saturday' && (timeLabel === '10:00 AM' || timeLabel === '11:00 AM' || timeLabel === '12:00 PM')) return true;

      return false;
    });
  };

  return (
    <div className="w-full overflow-x-auto border border-[#E4E7EC] rounded-xl bg-white text-left">
      <table className="w-full border-collapse text-xs text-[#111625] min-w-[560px]">
        <thead>
          <tr className="border-b border-[#E4E7EC] bg-[#FBFBFA]">
            <th className="py-2.5 px-3 font-semibold text-[#5C6479] text-left border-r border-[#E4E7EC] w-24">
              Time
            </th>
            {DAYS.map((day) => (
              <th
                key={day}
                className="py-2.5 px-2 font-semibold text-[#111625] text-center border-r last:border-r-0 border-[#E4E7EC]"
              >
                {day.slice(0, 3)}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {TIME_SLOTS.map((time, idx) => (
            <tr key={time} className="border-b last:border-b-0 border-[#E4E7EC]">
              <td className="py-2 px-3 font-mono text-[11px] text-[#5C6479] bg-[#FBFBFA] border-r border-[#E4E7EC]">
                {time}
              </td>
              {DAYS.map((day) => {
                const available = isSlotAvailable(day, time);
                return (
                  <td
                    key={day}
                    onClick={() => onSlotToggle && onSlotToggle(day, time)}
                    className={`py-2 px-2 text-center border-r last:border-r-0 border-[#E4E7EC] transition-colors ${
                      onSlotToggle ? 'cursor-pointer hover:opacity-80' : ''
                    } ${
                      available
                        ? 'bg-[#F0F4F8] text-[#1B365D] font-medium'
                        : 'bg-[#FBFBFA]/50 text-[#5C6479]/40'
                    }`}
                  >
                    {available ? (
                      <span className="inline-block py-0.5 px-1.5 rounded bg-white text-[#1B365D] border border-[#D0DCE7] text-[11px]">
                        Available
                      </span>
                    ) : (
                      <span>—</span>
                    )}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
