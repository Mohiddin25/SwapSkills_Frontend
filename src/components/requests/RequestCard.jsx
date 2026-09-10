import React from 'react';
import { Calendar, MessageSquare, ArrowRight } from 'lucide-react';
import { Avatar } from '../common/Avatar';
import { Button } from '../common/Button';
import { Badge } from '../common/Badge';
import { MatchScore } from '../matching/MatchScore';

export function RequestCard({
  request,
  onAccept,
  onDecline,
  onCancel,
  type = 'received' // 'received' | 'sent'
}) {
  const {
    id,
    senderName,
    senderDepartment,
    senderYear,
    receiverName,
    receiverDepartment,
    receiverYear,
    skillYouTeach,
    skillTheyTeach,
    compatibility,
    suggestedTime,
    message,
    status
  } = request;

  const partnerName = type === 'received' ? senderName : receiverName;
  const partnerDept = type === 'received' ? senderDepartment : receiverDepartment;
  const partnerYear = type === 'received' ? senderYear : receiverYear;

  const isPending = status === 'Pending';

  const statusVariantMap = {
    Pending: 'pending',
    Accepted: 'accepted',
    Declined: 'declined',
    Cancelled: 'neutral'
  };

  return (
    <div className="bg-white border border-[#E4E7EC] rounded-xl p-5 text-left space-y-4">
      {/* Header */}
      <div className="flex items-start justify-between gap-3 pb-3 border-b border-[#E4E7EC]">
        <div className="flex items-center gap-3 min-w-0">
          <Avatar name={partnerName} size="md" />
          <div className="min-w-0">
            <h3 className="text-base font-semibold text-[#111625] truncate">
              {partnerName}
            </h3>
            <p className="text-xs text-[#5C6479] truncate">
              {partnerDept} · {partnerYear}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {compatibility && (
            <MatchScore score={compatibility} size="sm" />
          )}
          <Badge variant={statusVariantMap[status] || 'neutral'}>
            {status}
          </Badge>
        </div>
      </div>

      {/* Exchange Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 py-1">
        <div className="p-2.5 bg-[#FBFBFA] border border-[#E4E7EC] rounded-lg">
          <span className="block text-[10px] uppercase font-semibold tracking-wider text-[#5C6479] mb-1">
            {type === 'received' ? 'You Teach' : 'They Will Teach You'}
          </span>
          <span className="text-sm font-semibold text-[#111625]">
            {type === 'received' ? skillYouTeach : skillTheyTeach}
          </span>
        </div>
        <div className="p-2.5 bg-[#FBFBFA] border border-[#E4E7EC] rounded-lg">
          <span className="block text-[10px] uppercase font-semibold tracking-wider text-[#5C6479] mb-1">
            {type === 'received' ? 'They Teach' : 'You Will Teach Them'}
          </span>
          <span className="text-sm font-semibold text-[#111625]">
            {type === 'received' ? skillTheyTeach : skillYouTeach}
          </span>
        </div>
      </div>

      {/* Suggested Meeting Time */}
      {suggestedTime && (
        <div className="flex items-center gap-2 text-xs text-[#111625]">
          <Calendar className="w-3.5 h-3.5 text-[#1B365D]" />
          <span className="text-[#5C6479]">Suggested Time:</span>
          <span className="font-medium text-[#111625]">{suggestedTime}</span>
        </div>
      )}

      {/* Message */}
      {message && (
        <div className="p-3 bg-[#F0F4F8]/60 border border-[#E4E7EC] rounded-lg text-xs text-[#5C6479] leading-relaxed">
          <div className="flex items-center gap-1.5 font-semibold text-[#111625] mb-1 text-[11px] uppercase tracking-wider">
            <MessageSquare className="w-3 h-3 text-[#1B365D]" />
            <span>Note from {partnerName.split(' ')[0]}</span>
          </div>
          "{message}"
        </div>
      )}

      {/* Action Buttons */}
      {isPending && (
        <div className="pt-2 border-t border-[#E4E7EC] flex items-center justify-end gap-2.5">
          {type === 'received' ? (
            <>
              <Button
                variant="outline"
                size="sm"
                onClick={() => onDecline(id)}
              >
                Decline
              </Button>
              <Button
                variant="primary"
                size="sm"
                onClick={() => onAccept(id)}
              >
                Accept Swap
              </Button>
            </>
          ) : (
            <Button
              variant="outline"
              size="sm"
              onClick={() => onCancel(id)}
            >
              Cancel Request
            </Button>
          )}
        </div>
      )}
    </div>
  );
}
