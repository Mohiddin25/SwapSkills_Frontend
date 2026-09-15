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

  const extractSkillNames = (skillsArr, fallbackDefault = []) => {
    if (!skillsArr || !Array.isArray(skillsArr) || skillsArr.length === 0) {
      return fallbackDefault;
    }
    const names = skillsArr.map((s) => {
      if (typeof s === 'string') return s;
      return s?.name || s?.skill?.name || s?.title || '';
    }).filter(Boolean);
    return names.length > 0 ? Array.from(new Set(names)) : fallbackDefault;
  };

  const userTeachSkills = extractSkillNames(
    currentUser?.skillsTeach?.length ? currentUser.skillsTeach : currentUser?.skillsToTeach,
    ['Python', 'Java', 'C++', 'React', 'UI/UX Design', 'System Design']
  );

  const candidateTeachSkills = extractSkillNames(
    match?.skillsTeach?.length ? match.skillsTeach : match?.skillsToTeach,
    ['UI/UX Design', 'Figma', 'React', 'Python', 'C++', 'Data Analysis']
  );

  useEffect(() => {
    if (match && currentUser) {
      const defaultTeach = match.commonTeachLearn?.youTeach ||
        userTeachSkills[0] ||
        'Python';

      const defaultWant = match.commonTeachLearn?.theyTeach ||
        candidateTeachSkills[0] ||
        'UI/UX Design';

      setYouTeach((prev) => prev || defaultTeach);
      setYouWant((prev) => prev || defaultWant);
      setSuggestedTime(match.sharedAvailability || 'Saturday · 4:00–5:00 PM');
      setMessage(`Hi ${match.name.split(' ')[0]}, I would love to schedule a regular peer session to exchange ${defaultTeach} and ${defaultWant}.`);
    }
  }, [match, currentUser, userTeachSkills, candidateTeachSkills]);

  if (!match) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await onSendRequest({
        candidate: match,
        skillYouTeach: youTeach || userTeachSkills[0],
        skillTheyTeach: youWant || candidateTeachSkills[0],
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
