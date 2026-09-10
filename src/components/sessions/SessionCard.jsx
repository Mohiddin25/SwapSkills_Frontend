import React from 'react';
import { Calendar, Clock, MapPin, CheckCircle2, FileText } from 'lucide-react';
import { Avatar } from '../common/Avatar';
import { Button } from '../common/Button';
import { Badge } from '../common/Badge';

export function SessionCard({
  session,
  onMarkComplete,
  onViewDetails
}) {
  const {
    id,
    topic,
    partnerName,
    partnerDepartment,
    partnerYear,
    youTeach,
    theyTeach,
    date,
    time,
    location,
    status,
    notes
  } = session;

  const isUpcoming = status === 'Upcoming';

  return (
    <div
      className={`bg-white border rounded-xl p-5 text-left transition-all duration-150 ${
        isUpcoming
          ? 'border-[#E4E7EC] hover:border-[#1B365D]/30'
          : 'border-[#E4E7EC] bg-[#FBFBFA]/60 opacity-90'
      }`}
    >
      {/* Header */}
      <div className="flex items-start justify-between gap-3 pb-3 border-b border-[#E4E7EC]">
        <div className="flex items-center gap-3 min-w-0">
          <Avatar name={partnerName} size="md" />
          <div className="min-w-0">
            <h3 className="text-base font-semibold text-[#111625] truncate">
              {topic || `${youTeach} ? ${theyTeach}`}
            </h3>
            <p className="text-xs text-[#5C6479] truncate">
              Partner: <span className="font-medium text-[#111625]">{partnerName}</span> · {partnerDepartment}
            </p>
          </div>
        </div>
        <Badge variant={isUpcoming ? 'oxford' : 'completed'}>
          {status}
        </Badge>
      </div>

      {/* Date, Time & Location Details */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 py-3.5 text-xs text-[#111625]">
        <div className="flex items-center gap-2">
          <Calendar className="w-3.5 h-3.5 text-[#1B365D] shrink-0" />
          <span className="text-[#5C6479]">Schedule:</span>
          <span className="font-medium text-[#111625]">{date} · {time}</span>
        </div>
        <div className="flex items-center gap-2">
          <MapPin className="w-3.5 h-3.5 text-[#1B365D] shrink-0" />
          <span className="text-[#5C6479]">Location:</span>
          <span className="font-medium text-[#111625] truncate">{location}</span>
        </div>
      </div>

      {/* Agenda / Notes */}
      {notes && (
        <div className="py-2 px-3 bg-[#FBFBFA] border border-[#E4E7EC] rounded-lg text-xs text-[#5C6479] mb-3 flex items-start gap-2">
          <FileText className="w-3.5 h-3.5 text-[#5C6479] mt-0.5 shrink-0" />
          <span className="line-clamp-2">{notes}</span>
        </div>
      )}

      {/* Actions */}
      <div className="pt-2 border-t border-[#E4E7EC] flex items-center justify-end gap-2.5">
        <Button
          variant="outline"
          size="sm"
          onClick={() => onViewDetails(session)}
        >
          View Details
        </Button>
        {isUpcoming && (
          <Button
            variant="primary"
            size="sm"
            icon={CheckCircle2}
            onClick={() => onMarkComplete(id)}
          >
            Mark Complete
          </Button>
        )}
      </div>
    </div>
  );
}
