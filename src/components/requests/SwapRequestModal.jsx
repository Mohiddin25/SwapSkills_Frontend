import React, { useState, useEffect } from 'react';
import { Calendar, User } from 'lucide-react';
import { Modal } from '../common/Modal';
import { Button } from '../common/Button';
import { Input } from '../common/Input';
import { Textarea } from '../common/Textarea';
import { Avatar } from '../common/Avatar';
import { MatchScore } from '../matching/MatchScore';

export function SwapRequestModal({
  isOpen,
  onClose,
  match,
  currentUser,
  onSendRequest
}) {
  const [youTeach, setYouTeach] = useState('');
  const [youWant, setYouWant] = useState('');
  const [suggestedTime, setSuggestedTime] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (match && currentUser) {
      // Intelligently prefill based on common overlap
      const defaultTeach = match.commonTeachLearn?.youTeach ||
        currentUser.skillsTeach?.[0]?.name ||
        'Python';

      const defaultWant = match.commonTeachLearn?.theyTeach ||
        match.skillsTeach?.[0]?.name ||
        'UI/UX Design';

      setYouTeach(defaultTeach);
      setYouWant(defaultWant);
      setSuggestedTime(match.sharedAvailability || 'Saturday · 4:00–5:00 PM');
      setMessage(`Hi ${match.name.split(' ')[0]}, I would love to schedule a regular peer session to exchange ${defaultTeach} and ${defaultWant}.`);
    }
  }, [match, currentUser]);

  if (!match) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await onSendRequest({
        candidate: match,
        skillYouTeach: youTeach,
        skillTheyTeach: youWant,
        suggestedTime,
        message
      });
      onClose();
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const userTeachSkills = (currentUser?.skillsTeach || []).map((s) => (typeof s === 'string' ? s : s.name));
  const candidateTeachSkills = (match?.skillsTeach || []).map((s) => (typeof s === 'string' ? s : s.name));

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Request a skill swap"
      subtitle="Propose a reciprocal peer-learning arrangement"
      maxWidth="max-w-lg"
      footer={
        <>
          <Button variant="outline" size="sm" onClick={onClose} disabled={isSubmitting}>
            Cancel
          </Button>
          <Button
            variant="primary"
            size="sm"
            onClick={handleSubmit}
            isLoading={isSubmitting}
          >
            Send Request
          </Button>
        </>
      }
    >
      <form onSubmit={handleSubmit} className="space-y-4 text-left">
        {/* Matched student info header */}
        <div className="flex items-center justify-between p-3.5 bg-[#FBFBFA] border border-[#E4E7EC] rounded-xl">
          <div className="flex items-center gap-3">
            <Avatar name={match.name} size="md" />
            <div>
              <div className="text-xs text-[#5C6479]">Matched Student</div>
              <div className="text-sm font-semibold text-[#111625]">{match.name}</div>
              <div className="text-[11px] text-[#5C6479]">{match.department} · {match.year}</div>
            </div>
          </div>
          <MatchScore score={match.compatibility} size="sm" />
        </div>

        {/* You Teach */}
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-[#111625] mb-1">
            You Teach
          </label>
          <select
            value={youTeach}
            onChange={(e) => setYouTeach(e.target.value)}
            className="w-full text-sm bg-white text-[#111625] border border-[#E4E7EC] rounded-lg px-3 py-2 outline-none focus:border-[#1B365D]"
          >
            {userTeachSkills.map((skill) => (
              <option key={skill} value={skill}>{skill}</option>
            ))}
          </select>
        </div>

        {/* You Want */}
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-[#111625] mb-1">
            You Want to Learn
          </label>
          <select
            value={youWant}
            onChange={(e) => setYouWant(e.target.value)}
            className="w-full text-sm bg-white text-[#111625] border border-[#E4E7EC] rounded-lg px-3 py-2 outline-none focus:border-[#1B365D]"
          >
            {candidateTeachSkills.map((skill) => (
              <option key={skill} value={skill}>{skill}</option>
            ))}
          </select>
        </div>

        {/* Suggested Time */}
        <div>
          <Input
            label="Suggested Time"
            sublabel="Mutual availability"
            icon={Calendar}
            value={suggestedTime}
            onChange={(e) => setSuggestedTime(e.target.value)}
            placeholder="e.g. Saturday · 4:00–5:00 PM"
          />
        </div>

        {/* Optional Message */}
        <div>
          <Textarea
            label="Optional Message"
            sublabel="Introduce yourself"
            rows={3}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Introduce what topics or projects you'd like to work on..."
          />
        </div>
      </form>
    </Modal>
  );
}
