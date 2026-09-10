import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '../components/common/Button';
import { Input } from '../components/common/Input';
import { Select } from '../components/common/Select';
import { useAuth } from '../context/AuthContext';
import { Mail, Lock, User, GraduationCap, ArrowRight } from 'lucide-react';

export function SignupPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    department: 'Computer Science & Engineering',
    year: '2nd Year'
  });
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { signup } = useAuth();
  const navigate = useNavigate();

  const departments = [
    'Computer Science & Engineering',
    'Electronics & Communication',
    'Electrical & Electronics',
    'Mechanical Engineering',
    'Civil Engineering',
    'Other Engineering / Science'
  ];

  const years = ['1st Year', '2nd Year', '3rd Year', '4th Year'];

  const handleChange = (field, val) => {
    setFormData((prev) => ({ ...prev, [field]: val }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim()) {
      setError('Please provide your name and college email.');
      return;
    }
    if (formData.password && formData.password !== formData.confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    setError('');
    setIsSubmitting(true);
    try {
      await signup(formData);
      // Navigate to step onboarding
      navigate('/onboarding');
    } catch (err) {
      setError(err.message || 'Registration failed');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FBFBFA] flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
        <Link to="/" className="inline-flex items-center gap-2 mb-4">
          <div className="w-8 h-8 rounded-lg bg-[#1B365D] text-white flex items-center justify-center font-bold text-sm tracking-wider">
            SS
          </div>
          <span className="text-sm font-bold tracking-tight text-[#111625]">
            SKILL SWAP
          </span>
        </Link>
        <h2 className="text-2xl font-bold tracking-tight text-[#111625]">
          Create your Skill Swap profile
        </h2>
        <p className="mt-1 text-xs text-[#5C6479]">
          Join your university peer-learning network
        </p>
      </div>

      {/* Main card */}
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md px-4 sm:px-0">
        <div className="bg-white py-8 px-6 sm:px-8 border border-[#E4E7EC] rounded-xl shadow-none space-y-6 text-left">
          {/* Subtle Progress Bar */}
          <div className="space-y-1.5 pb-2 border-b border-[#E4E7EC]">
            <div className="flex justify-between text-[11px] font-semibold uppercase tracking-wider text-[#5C6479]">
              <span>Step 1 of 2: Registration</span>
              <span className="text-[#1B365D]">50%</span>
            </div>
            <div className="w-full h-1 bg-[#F0F4F8] rounded-full overflow-hidden">
              <div className="w-1/2 h-full bg-[#1B365D]" />
            </div>
          </div>

          {error && (
            <div className="p-3 bg-[#FEE2E2] border border-[#FECACA] rounded-lg text-xs text-[#991B1B]">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              label="Full Name"
              type="text"
              icon={User}
              placeholder="e.g. Alex Johnson"
              value={formData.name}
              onChange={(e) => handleChange('name', e.target.value)}
              required
            />

            <Input
              label="College Email"
              type="email"
              icon={Mail}
              placeholder="student@campus.edu"
              value={formData.email}
              onChange={(e) => handleChange('email', e.target.value)}
              required
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <Select
                label="Department"
                options={departments}
                value={formData.department}
                onChange={(e) => handleChange('department', e.target.value)}
              />

              <Select
                label="Academic Year"
                options={years}
                value={formData.year}
                onChange={(e) => handleChange('year', e.target.value)}
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <Input
                label="Password"
                type="password"
                icon={Lock}
                placeholder="••••••••"
                value={formData.password}
                onChange={(e) => handleChange('password', e.target.value)}
                required
              />

              <Input
                label="Confirm Password"
                type="password"
                placeholder="••••••••"
                value={formData.confirmPassword}
                onChange={(e) => handleChange('confirmPassword', e.target.value)}
                required
              />
            </div>

            <Button
              type="submit"
              variant="primary"
              size="lg"
              className="w-full mt-3"
              isLoading={isSubmitting}
              icon={ArrowRight}
            >
              Continue
            </Button>
          </form>

          {/* Footer link */}
          <div className="text-center pt-2 text-xs text-[#5C6479]">
            Already have an account?{' '}
            <Link
              to="/login"
              className="text-[#1B365D] font-semibold hover:underline"
            >
              Log in
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
