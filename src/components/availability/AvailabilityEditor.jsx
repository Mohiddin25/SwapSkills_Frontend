import React, { useState } from 'react';
import { Plus, Trash2, Clock, Calendar } from 'lucide-react';
import { Button } from '../common/Button';

const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

export function AvailabilityEditor({ availability = [], onSave, isSaving = false }) {
  const [slots, setSlots] = useState(availability);
  const [selectedDay, setSelectedDay] = useState('Monday');
  const [startTime, setStartTime] = useState('17:00');
  const [endTime, setEndTime] = useState('19:00');

  // Format 24h string to 12h AM/PM
  const format12h = (time24) => {
    if (!time24) return '';
    const [h, m] = time24.split(':');
    const hour = parseInt(h, 10);
    const period = hour >= 12 ? 'PM' : 'AM';
    const displayHour = hour % 12 || 12;
    return `${displayHour}:${m} ${period}`;
  };

  const handleAddSlot = () => {
    const formatted = `${format12h(startTime)} – ${format12h(endTime)}`;
    const newSlot = {
      id: 'av-' + Date.now(),
      day: selectedDay,
      time: formatted,
      start: startTime,
      end: endTime
    };

    const updated = [...slots, newSlot];
    setSlots(updated);
    if (onSave) onSave(updated);
  };

  const handleDeleteSlot = (id) => {
    const updated = slots.filter((s) => s.id !== id);
    setSlots(updated);
    if (onSave) onSave(updated);
  };

  const handleApplyPreset = (presetType) => {
    let presetSlots = [];
    if (presetType === 'weekday-evenings') {
      presetSlots = [
        { id: 'av-1', day: 'Monday', time: '5:00 PM – 7:00 PM', start: '17:00', end: '19:00' },
        { id: 'av-2', day: 'Wednesday', time: '5:00 PM – 7:00 PM', start: '17:00', end: '19:00' },
        { id: 'av-3', day: 'Thursday', time: '5:00 PM – 7:00 PM', start: '17:00', end: '19:00' }
      ];
    } else if (presetType === 'weekend-mornings') {
      presetSlots = [
        { id: 'av-4', day: 'Saturday', time: '10:00 AM – 1:00 PM', start: '10:00', end: '13:00' },
        { id: 'av-5', day: 'Sunday', time: '11:00 AM – 2:00 PM', start: '11:00', end: '14:00' }
      ];
    }
    const combined = [...slots, ...presetSlots];
    setSlots(combined);
    if (onSave) onSave(combined);
  };

  return (
    <div className="space-y-5 text-left">
      {/* Add New Availability Row */}
      <div className="p-4 bg-white border border-[#E4E7EC] rounded-xl space-y-3">
        <h4 className="text-xs font-semibold uppercase tracking-wider text-[#111625] flex items-center gap-1.5">
          <Clock className="w-3.5 h-3.5 text-[#1B365D]" />
          <span>Add Weekly Study Window</span>
        </h4>
        
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
          <div>
            <label className="block text-[11px] font-medium text-[#5C6479] mb-1">
              Day of the Week
            </label>
            <select
              value={selectedDay}
              onChange={(e) => setSelectedDay(e.target.value)}
              className="w-full text-xs bg-white text-[#111625] border border-[#E4E7EC] rounded-lg px-2.5 py-2 outline-none focus:border-[#1B365D]"
            >
              {DAYS.map((day) => (
                <option key={day} value={day}>{day}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-[11px] font-medium text-[#5C6479] mb-1">
              Start Time
            </label>
            <input
              type="time"
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
              className="w-full text-xs bg-white text-[#111625] border border-[#E4E7EC] rounded-lg px-2.5 py-2 outline-none focus:border-[#1B365D]"
            />
          </div>

          <div>
            <label className="block text-[11px] font-medium text-[#5C6479] mb-1">
              End Time
            </label>
            <input
              type="time"
              value={endTime}
              onChange={(e) => setEndTime(e.target.value)}
              className="w-full text-xs bg-white text-[#111625] border border-[#E4E7EC] rounded-lg px-2.5 py-2 outline-none focus:border-[#1B365D]"
            />
          </div>

          <div className="flex items-end">
            <Button
              variant="primary"
              size="md"
              icon={Plus}
              onClick={handleAddSlot}
              className="w-full"
            >
              Add Window
            </Button>
          </div>
        </div>

        {/* Quick Presets */}
        <div className="pt-2 border-t border-[#E4E7EC] flex flex-wrap items-center gap-2">
          <span className="text-[11px] text-[#5C6479] font-medium">Quick Presets:</span>
          <button
            type="button"
            onClick={() => handleApplyPreset('weekday-evenings')}
            className="text-xs px-2.5 py-1 rounded bg-[#FBFBFA] border border-[#E4E7EC] text-[#1B365D] hover:bg-[#F0F4F8] transition-colors cursor-pointer"
          >
            + Weekday Evenings (5–7 PM)
          </button>
          <button
            type="button"
            onClick={() => handleApplyPreset('weekend-mornings')}
            className="text-xs px-2.5 py-1 rounded bg-[#FBFBFA] border border-[#E4E7EC] text-[#1B365D] hover:bg-[#F0F4F8] transition-colors cursor-pointer"
          >
            + Weekend Blocks (10 AM–1 PM)
          </button>
        </div>
      </div>

      {/* Active Slots List */}
      <div>
        <h4 className="text-xs font-semibold uppercase tracking-wider text-[#5C6479] mb-2.5">
          Declared Available Windows ({slots.length})
        </h4>

        {slots.length === 0 ? (
          <div className="p-6 text-center border border-dashed border-[#E4E7EC] rounded-xl text-xs text-[#5C6479]">
            No weekly time slots added yet. Declare your availability above to calculate accurate compatibility scores.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5">
            {slots.map((slot) => (
              <div
                key={slot.id}
                className="p-3 bg-white border border-[#E4E7EC] rounded-lg flex items-center justify-between gap-2"
              >
                <div>
                  <div className="text-xs font-semibold text-[#111625] flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-[#1B365D]" />
                    <span>{slot.day}</span>
                  </div>
                  <div className="text-xs text-[#5C6479] mt-0.5">
                    {slot.time}
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => handleDeleteSlot(slot.id)}
                  className="p-1 text-[#5C6479] hover:text-[#991B1B] rounded hover:bg-[#FEE2E2] transition-colors cursor-pointer"
                  title="Remove time window"
                  aria-label="Remove time window"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
