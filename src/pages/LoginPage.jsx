import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '../components/common/Button';
import { Input } from '../components/common/Input';
import { useAuth } from '../context/AuthContext';
import { ArrowRight, Lock, Mail, Sparkles } from 'lucide-react';

export function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) {
      setError('Please enter your college email address');
      return;
    }
    setError('');
    setIsSubmitting(true);
    try {
      await login(email, password);
      navigate('/dashboard');
    } catch (err) {
      setError(err.message || 'Authentication failed');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDemoLogin = async () => {
    setIsSubmitting(true);
    try {
      await login('alex.johnson@campus.edu', 'demo123');
      navigate('/dashboard');
    } catch (err) {
      setError(err.message);
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
          Welcome back
        </h2>
        <p className="mt-1 text-xs text-[#5C6479]">
          Sign in using your verified college credentials
        </p>
      </div>

      {/* Main card */}
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md px-4 sm:px-0">
        <div className="bg-white py-8 px-6 sm:px-8 border border-[#E4E7EC] rounded-xl shadow-none space-y-6 text-left">
          {error && (
            <div className="p-3 bg-[#FEE2E2] border border-[#FECACA] rounded-lg text-xs text-[#991B1B]">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              label="College Email"
              type="email"
              icon={Mail}
              placeholder="student@campus.edu"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <Input
              label="Password"
              type="password"
              icon={Lock}
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <div className="flex items-center justify-between text-xs pt-1">
              <label className="flex items-center gap-2 text-[#5C6479] cursor-pointer">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="rounded border-[#E4E7EC] text-[#1B365D] focus:ring-[#1B365D]"
                />
                <span>Remember me</span>
              </label>

              <button
                type="button"
                onClick={() => alert('Password reset link sent to registered email.')}
                className="text-[#1B365D] hover:underline font-medium cursor-pointer"
              >
                Forgot password?
              </button>
            </div>

            <Button
              type="submit"
              variant="primary"
              size="lg"
              className="w-full mt-2"
              isLoading={isSubmitting}
            >
              Log in
            </Button>
          </form>

          {/* Quick Demo Login Option */}
          <div className="pt-4 border-t border-[#E4E7EC]">
            <button
              type="button"
              onClick={handleDemoLogin}
              disabled={isSubmitting}
              className="w-full flex items-center justify-center gap-2 p-2.5 rounded-lg border border-[#D0DCE7] bg-[#F0F4F8] text-[#1B365D] text-xs font-semibold hover:bg-[#E4ECF4] transition-colors cursor-pointer"
            >
              <span>Instant Demo Access (Alex Johnson)</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Footer link */}
          <div className="text-center pt-2 text-xs text-[#5C6479]">
            New to Skill Swap?{' '}
            <Link
              to="/signup"
              className="text-[#1B365D] font-semibold hover:underline"
            >
              Create an account
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
