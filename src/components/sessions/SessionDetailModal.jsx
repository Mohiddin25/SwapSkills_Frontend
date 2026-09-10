import React from 'react';
import { Calendar, Clock, MapPin, CheckCircle2, User, BookOpen } from 'lucide-react';
import { Modal } from '../common/Modal';
import { Button } from '../common/Button';
import { Badge } from '../common/Badge';
import { Avatar } from '../common/Avatar';

export function SessionDetailModal({
  isOpen,
  onClose,
  session,
  onMarkComplete
}) {
  if (!session) return null;

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
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Scheduled Peer Session"
      subtitle={topic}
      maxWidth="max-w-lg"
      footer={
        <>
          <Button variant="outline" size="sm" onClick={onClose}>
            Close
          </Button>
          {isUpcoming && (
            <Button
              variant="primary"
              size="sm"
              icon={CheckCircle2}
              onClick={() => {
                onMarkComplete(id);
                onClose();
              }}
            >
              Mark Complete (+1 Credit)
            </Button>
          )}
        </>
      }
    >
      <div className="space-y-5 text-left">
        {/* Partner Header */}
        <div className="flex items-center justify-between p-3.5 bg-[#FBFBFA] border border-[#E4E7EC] rounded-xl">
          <div className="flex items-center gap-3">
            <Avatar name={partnerName} size="md" />
            <div>
              <div className="text-sm font-semibold text-[#111625]">{partnerName}</div>
              <div className="text-xs text-[#5C6479]">{partnerDepartment} · {partnerYear}</div>
            </div>
          </div>
          <Badge variant={isUpcoming ? 'oxford' : 'completed'}>
            {status}
          </Badge>
        </div>

        {/* Exchange Breakdown */}
        <div className="grid grid-cols-2 gap-3">
          <div className="p-3 bg-white border border-[#111625] rounded-lg">
            <span className="block text-[10px] uppercase font-semibold tracking-wider text-[#5C6479] mb-1">
              You Are Teaching
            </span>
            <span className="text-sm font-semibold text-[#111625]">{youTeach}</span>
          </div>
          <div className="p-3 bg-[#E4E7EC] rounded-lg">
            <span className="block text-[10px] uppercase font-semibold tracking-wider text-[#5C6479] mb-1">
              You Are Learning
            </span>
            <span className="text-sm font-semibold text-[#111625]">{theyTeach}</span>
          </div>
        </div>

        {/* Logistics */}
        <div className="space-y-2.5 p-3.5 bg-[#F0F4F8]/50 border border-[#E4E7EC] rounded-xl text-xs">
          <div className="flex items-center gap-2.5 text-[#111625]">
            <Calendar className="w-4 h-4 text-[#1B365D]" />
            <span className="text-[#5C6479]">Date & Time:</span>
            <span className="font-semibold">{date} · {time}</span>
          </div>
          <div className="flex items-center gap-2.5 text-[#111625]">
            <MapPin className="w-4 h-4 text-[#1B365D]" />
            <span className="text-[#5C6479]">Meeting Spot:</span>
            <span className="font-semibold">{location}</span>
          </div>
        </div>

        {/* Syllabus / Notes */}
        <div>
          <h4 className="text-xs font-semibold uppercase tracking-wider text-[#5C6479] mb-1.5 flex items-center gap-1.5">
            <BookOpen className="w-3.5 h-3.5 text-[#1B365D]" />
            <span>Curriculum & Notes</span>
          </h4>
          <p className="text-xs text-[#111625] leading-relaxed p-3 bg-[#FBFBFA] border border-[#E4E7EC] rounded-lg">
            {notes || 'No specific agenda submitted. Recommended structure: 25 minutes teaching, 25 minutes receiving instruction, 10 minutes practice exercise.'}
          </p>
        </div>
      </div>
    </Modal>
  );
}
