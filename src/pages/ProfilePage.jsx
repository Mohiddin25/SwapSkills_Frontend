import React, { useState } from 'react';
import { PageHeader } from '../components/layout/PageHeader';
import { Avatar } from '../components/common/Avatar';
import { Button } from '../components/common/Button';
import { SkillTag } from '../components/skills/SkillTag';
import { SkillSelector } from '../components/skills/SkillSelector';
import { StatBlock } from '../components/common/StatBlock';
import { Modal } from '../components/common/Modal';
import { Input } from '../components/common/Input';
import { Textarea } from '../components/common/Textarea';
import { Select } from '../components/common/Select';
import { useAuth } from '../context/AuthContext';
import {
  Award,
  Calendar,
  Coins,
  CheckCircle2,
  Users,
  Edit3,
  GraduationCap
} from 'lucide-react';
import { DEPARTMENTS, YEARS } from '../constants/skills';

export function ProfilePage() {
  const { user, updateProfile } = useAuth();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  // Edit form state
  const [name, setName] = useState(user?.name || '');
  const [bio, setBio] = useState(user?.bio || '');
  const [department, setDepartment] = useState(user?.department || '');
  const [year, setYear] = useState(user?.year || '');
  const [skillsTeach, setSkillsTeach] = useState(user?.skillsTeach || []);
  const [skillsLearn, setSkillsLearn] = useState(user?.skillsLearn || []);
  const [isSaving, setIsSaving] = useState(false);

  const openEditModal = () => {
    setName(user?.name || '');
    setBio(user?.bio || '');
    setDepartment(user?.department || '');
    setYear(user?.year || '');
    setSkillsTeach(user?.skillsTeach || []);
    setSkillsLearn(user?.skillsLearn || []);
    setIsEditModalOpen(true);
  };

  const handleSaveProfile = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      await updateProfile({
        name,
        bio,
        department,
        year,
        skillsTeach,
        skillsLearn
      });
      setIsEditModalOpen(false);
    } catch (err) {
      console.error(err);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="space-y-8 text-left">
      <PageHeader
        eyebrow="Academic Identity"
        title="Student Profile"
        subtitle="Manage your campus credentials, verified capabilities, and educational contributions."
        actions={
          <Button
            variant="outline"
            size="md"
            icon={Edit3}
            onClick={openEditModal}
          >
            Edit Profile
          </Button>
        }
      />

      {/* Main Profile Header Box */}
      <div className="bg-white border border-[#E4E7EC] rounded-2xl p-6 sm:p-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 pb-6 border-b border-[#E4E7EC]">
          <div className="flex items-center gap-4">
            <Avatar name={user?.name || 'Alex Johnson'} size="xl" />
            <div>
              <h2 className="text-2xl font-bold tracking-tight text-[#111625]">
                {user?.name || 'Alex Johnson'}
              </h2>
              <p className="text-xs sm:text-sm text-[#5C6479] mt-0.5">
                {user?.department || 'Computer Science & Engineering'} · {user?.year || '2nd Year'}
              </p>
              <div className="inline-flex items-center gap-1.5 text-xs text-[#1B365D] bg-[#F0F4F8] border border-[#D0DCE7] px-2.5 py-1 rounded-md mt-2 font-medium">
                <Award className="w-3.5 h-3.5" />
                <span>{user?.contributorLevel || 'Level 3 Contributor'}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bio */}
        <div className="py-5 border-b border-[#E4E7EC]">
          <h4 className="text-xs font-semibold uppercase tracking-wider text-[#5C6479] mb-1.5">
            Academic Biography & Interests
          </h4>
          <p className="text-sm text-[#111625] leading-relaxed max-w-3xl">
            {user?.bio || 'Undergraduate researcher focused on distributed systems and full-stack engineering. Always curious to explore intuitive product design and interactive frontends.'}
          </p>
        </div>

        {/* Skills Breakdown */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-5">
          {/* Skills I Teach: Outlined */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-[#111625]">
              Skills I Teach
            </h4>
            <div className="flex flex-wrap gap-2">
              {(user?.skillsTeach || []).map((skill, idx) => (
                <SkillTag key={idx} skill={skill} type="teach" size="md" />
              ))}
            </div>
          </div>

          {/* Skills I Want to Learn: Muted filled */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-[#111625]">
              Skills I Want to Learn
            </h4>
            <div className="flex flex-wrap gap-2">
              {(user?.skillsLearn || []).map((skill, idx) => (
                <SkillTag key={idx} skill={skill} type="learn" size="md" />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Contribution Metrics */}
      <div className="space-y-3">
        <h3 className="text-sm font-semibold uppercase tracking-wider text-[#5C6479]">
          Contribution Statistics
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <StatBlock
            label="Sessions Completed"
            value={user?.sessionsCompleted || 18}
            subtext="Peer exchanges conducted"
            icon={CheckCircle2}
          />
          <StatBlock
            label="Students Helped"
            value={user?.studentsHelped || 14}
            subtext="Unique peers mentored"
            icon={Users}
          />
          <StatBlock
            label="Skill Credits"
            value={user?.credits || 8}
            subtext="Available exchange balance"
            icon={Coins}
          />
        </div>
      </div>

      {/* Declared Availability Schedule */}
      <div className="bg-white border border-[#E4E7EC] rounded-xl p-5 space-y-3">
        <h3 className="text-xs font-semibold uppercase tracking-wider text-[#5C6479]">
          Weekly Schedule
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {(user?.availability || []).map((slot) => (
            <div
              key={slot.id}
              className="p-3 bg-[#FBFBFA] border border-[#E4E7EC] rounded-lg text-xs"
            >
              <div className="font-semibold text-[#111625] flex items-center gap-1.5 mb-0.5">
                <Calendar className="w-3.5 h-3.5 text-[#1B365D]" />
                <span>{slot.day}</span>
              </div>
              <div className="text-[#5C6479]">{slot.time}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Edit Profile Modal */}
      <Modal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        title="Edit Academic Profile"
        subtitle="Update your student details and listed competencies"
        maxWidth="max-w-xl"
        footer={
          <>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsEditModalOpen(false)}
              disabled={isSaving}
            >
              Cancel
            </Button>
            <Button
              variant="primary"
              size="sm"
              onClick={handleSaveProfile}
              isLoading={isSaving}
            >
              Save Changes
            </Button>
          </>
        }
      >
        <form onSubmit={handleSaveProfile} className="space-y-4 text-left">
          <Input
            label="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <Select
              label="Department"
              options={DEPARTMENTS}
              value={department}
              onChange={(e) => setDepartment(e.target.value)}
            />
            <Select
              label="Academic Year"
              options={YEARS}
              value={year}
              onChange={(e) => setYear(e.target.value)}
            />
          </div>

          <Textarea
            label="Biography"
            sublabel="Academic focus and background"
            rows={3}
            value={bio}
            onChange={(e) => setBio(e.target.value)}
          />

          <div className="pt-2 border-t border-[#E4E7EC]">
            <SkillSelector
              label="Skills You Can Teach"
              skills={skillsTeach}
              onChange={setSkillsTeach}
              type="teach"
            />
          </div>

          <div className="pt-2 border-t border-[#E4E7EC]">
            <SkillSelector
              label="Skills You Want to Learn"
              skills={skillsLearn}
              onChange={setSkillsLearn}
              type="learn"
            />
          </div>
        </form>
      </Modal>
    </div>
  );
}
