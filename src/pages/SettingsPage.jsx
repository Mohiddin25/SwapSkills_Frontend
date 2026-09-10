import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PageHeader } from '../components/layout/PageHeader';
import { Button } from '../components/common/Button';
import { Input } from '../components/common/Input';
import { Select } from '../components/common/Select';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import {
  User,
  Bell,
  Shield,
  KeyRound,
  LogOut,
  CheckCircle2
} from 'lucide-react';
import { DEPARTMENTS, YEARS } from '../constants/skills';

export function SettingsPage() {
  const { user, updateProfile, logout } = useAuth();
  const { addToast } = useToast();
  const navigate = useNavigate();

  const [name, setName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');
  const [department, setDepartment] = useState(user?.department || 'Computer Science & Engineering');
  const [year, setYear] = useState(user?.year || '2nd Year');

  // Preferences
  const [notifEmail, setNotifEmail] = useState(true);
  const [notifSwap, setNotifSwap] = useState(true);
  const [notifReminder, setNotifReminder] = useState(true);

  // Privacy
  const [visibility, setVisibility] = useState('Campus Wide');
  const [showAvailability, setShowAvailability] = useState(true);

  // Password
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  const handleSaveAccount = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      await updateProfile({
        name,
        email,
        department,
        year
      });
    } catch (err) {
      console.error(err);
    } finally {
      setIsSaving(false);
    }
  };

  const handleSavePreferences = async () => {
    addToast({
      title: 'Preferences Updated',
      description: 'Your notification and privacy preferences have been saved.',
      variant: 'success'
    });
  };

  const handleChangePassword = (e) => {
    e.preventDefault();
    if (!currentPassword || !newPassword) {
      addToast({
        title: 'Error',
        description: 'Please fill in both password fields.',
        variant: 'error'
      });
      return;
    }
    setCurrentPassword('');
    setNewPassword('');
    addToast({
      title: 'Security Updated',
      description: 'Password changed successfully.',
      variant: 'success'
    });
  };

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  return (
    <div className="space-y-8 text-left max-w-4xl">
      <PageHeader
        eyebrow="Account Administration"
        title="Settings"
        subtitle="Manage your student account credentials, notification rules, privacy controls, and security."
      />

      {/* 1. Account Settings */}
      <div className="bg-white border border-[#E4E7EC] rounded-2xl p-6 space-y-5">
        <div className="flex items-center gap-2 border-b border-[#E4E7EC] pb-3">
          <User className="w-4 h-4 text-[#1B365D]" />
          <h3 className="text-sm font-semibold uppercase tracking-wider text-[#111625]">
            Account Credentials
          </h3>
        </div>

        <form onSubmit={handleSaveAccount} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <Input
              label="College Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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

          <div className="flex justify-end pt-2">
            <Button
              type="submit"
              variant="primary"
              size="sm"
              isLoading={isSaving}
            >
              Save Account Changes
            </Button>
          </div>
        </form>
      </div>

      {/* 2. Preferences */}
      <div className="bg-white border border-[#E4E7EC] rounded-2xl p-6 space-y-5">
        <div className="flex items-center gap-2 border-b border-[#E4E7EC] pb-3">
          <Bell className="w-4 h-4 text-[#1B365D]" />
          <h3 className="text-sm font-semibold uppercase tracking-wider text-[#111625]">
            Notification Preferences
          </h3>
        </div>

        <div className="space-y-3.5">
          <label className="flex items-center justify-between p-3 rounded-lg hover:bg-[#FBFBFA] transition-colors cursor-pointer border border-[#E4E7EC]">
            <div>
              <div className="text-xs font-semibold text-[#111625]">
                Email Notifications
              </div>
              <div className="text-xs text-[#5C6479]">
                Receive periodic digests of new matching peers on campus
              </div>
            </div>
            <input
              type="checkbox"
              checked={notifEmail}
              onChange={(e) => setNotifEmail(e.target.checked)}
              className="rounded border-[#E4E7EC] text-[#1B365D] focus:ring-[#1B365D]"
            />
          </label>

          <label className="flex items-center justify-between p-3 rounded-lg hover:bg-[#FBFBFA] transition-colors cursor-pointer border border-[#E4E7EC]">
            <div>
              <div className="text-xs font-semibold text-[#111625]">
                Swap Request Alerts
              </div>
              <div className="text-xs text-[#5C6479]">
                Immediate alerts when a peer requests or accepts a skill swap
              </div>
            </div>
            <input
              type="checkbox"
              checked={notifSwap}
              onChange={(e) => setNotifSwap(e.target.checked)}
              className="rounded border-[#E4E7EC] text-[#1B365D] focus:ring-[#1B365D]"
            />
          </label>

          <label className="flex items-center justify-between p-3 rounded-lg hover:bg-[#FBFBFA] transition-colors cursor-pointer border border-[#E4E7EC]">
            <div>
              <div className="text-xs font-semibold text-[#111625]">
                Upcoming Session Reminders
              </div>
              <div className="text-xs text-[#5C6479]">
                Reminders 2 hours prior to scheduled study sessions
              </div>
            </div>
            <input
              type="checkbox"
              checked={notifReminder}
              onChange={(e) => setNotifReminder(e.target.checked)}
              className="rounded border-[#E4E7EC] text-[#1B365D] focus:ring-[#1B365D]"
            />
          </label>
        </div>

        <div className="flex justify-end pt-2">
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={handleSavePreferences}
          >
            Save Preferences
          </Button>
        </div>
      </div>

      {/* 3. Privacy */}
      <div className="bg-white border border-[#E4E7EC] rounded-2xl p-6 space-y-5">
        <div className="flex items-center gap-2 border-b border-[#E4E7EC] pb-3">
          <Shield className="w-4 h-4 text-[#1B365D]" />
          <h3 className="text-sm font-semibold uppercase tracking-wider text-[#111625]">
            Privacy & Directory Visibility
          </h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Select
            label="Profile Visibility"
            options={['Campus Wide', 'Department Only', 'Invited Peers Only']}
            value={visibility}
            onChange={(e) => setVisibility(e.target.value)}
          />

          <div className="space-y-1.5">
            <label className="block text-xs font-semibold uppercase tracking-wider text-[#111625]">
              Availability Transparency
            </label>
            <div className="pt-2">
              <label className="flex items-center gap-2 text-xs text-[#111625] cursor-pointer">
                <input
                  type="checkbox"
                  checked={showAvailability}
                  onChange={(e) => setShowAvailability(e.target.checked)}
                  className="rounded border-[#E4E7EC] text-[#1B365D] focus:ring-[#1B365D]"
                />
                <span>Display availability blocks publicly on match dossier</span>
              </label>
            </div>
          </div>
        </div>
      </div>

      {/* 4. Security */}
      <div className="bg-white border border-[#E4E7EC] rounded-2xl p-6 space-y-5">
        <div className="flex items-center gap-2 border-b border-[#E4E7EC] pb-3">
          <KeyRound className="w-4 h-4 text-[#1B365D]" />
          <h3 className="text-sm font-semibold uppercase tracking-wider text-[#111625]">
            Security
          </h3>
        </div>

        <form onSubmit={handleChangePassword} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="Current Password"
              type="password"
              placeholder="••••••••"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
            />
            <Input
              label="New Password"
              type="password"
              placeholder="••••••••"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
          </div>

          <div className="flex items-center justify-between pt-2">
            <Button
              type="button"
              variant="danger"
              size="sm"
              icon={LogOut}
              onClick={handleLogout}
            >
              Sign Out of Session
            </Button>

            <Button
              type="submit"
              variant="outline"
              size="sm"
            >
              Update Password
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
