import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  Users,
  GitPullRequest,
  CalendarCheck,
  Clock,
  User,
  Settings,
  Menu,
  X,
  Coins,
  LogOut
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useSwap } from '../../context/SwapContext';
import { Avatar } from '../common/Avatar';

export function MobileNav() {
  const { user, logout } = useAuth();
  const { requests, sessions } = useSwap();
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const pendingRequestsCount = requests.filter(
    (r) => r.status === 'Pending' && r.direction === 'received'
  ).length;

  const upcomingSessionsCount = sessions.filter(
    (s) => s.status === 'Upcoming'
  ).length;

  const navItems = [
    { label: 'Overview', to: '/dashboard', icon: LayoutDashboard },
    { label: 'Matches', to: '/matches', icon: Users },
    {
      label: 'Requests',
      to: '/requests',
      icon: GitPullRequest,
      badge: pendingRequestsCount > 0 ? pendingRequestsCount : null
    },
    {
      label: 'Sessions',
      to: '/sessions',
      icon: CalendarCheck,
      badge: upcomingSessionsCount > 0 ? upcomingSessionsCount : null
    },
    { label: 'Schedule', to: '/availability', icon: Clock }
  ];

  const handleLogout = async () => {
    setIsOpen(false);
    await logout();
    navigate('/');
  };

  return (
    <>
      {/* Top Mobile Bar */}
      <header className="md:hidden sticky top-0 z-40 bg-white border-b border-[#E4E7EC] px-4 h-14 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-md bg-[#1B365D] text-white flex items-center justify-center font-bold text-xs tracking-wider">
            SS
          </div>
          <span className="text-xs font-bold tracking-tight text-[#111625]">
            SKILL SWAP
          </span>
        </div>

        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1 text-xs font-semibold text-[#1B365D] bg-[#F0F4F8] border border-[#D0DCE7] px-2 py-0.5 rounded">
            <Coins className="w-3 h-3" />
            <span>{user?.credits || 0}</span>
          </div>

          <button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            className="p-1.5 text-[#5C6479] hover:text-[#111625] rounded-md hover:bg-[#F0F4F8]"
            aria-label="Toggle navigation menu"
          >
            {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </header>

      {/* Slide-out Menu for Mobile */}
      {isOpen && (
        <div className="md:hidden fixed inset-0 top-14 z-40 bg-white/95 backdrop-blur-sm p-4 space-y-4 overflow-y-auto text-left">
          {user && (
            <div className="p-3 bg-[#FBFBFA] border border-[#E4E7EC] rounded-xl flex items-center gap-3">
              <Avatar name={user.name} size="md" />
              <div>
                <div className="text-sm font-semibold text-[#111625]">{user.name}</div>
                <div className="text-xs text-[#5C6479]">{user.department} · {user.year}</div>
              </div>
            </div>
          )}

          <nav className="space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.to}
                  to={item.to}
                  onClick={() => setIsOpen(false)}
                  className={({ isActive }) =>
                    `flex items-center justify-between p-3 rounded-lg text-sm font-medium transition-colors ${
                      isActive
                        ? 'bg-[#F0F4F8] text-[#1B365D] font-semibold'
                        : 'text-[#5C6479] hover:text-[#111625]'
                    }`
                  }
                >
                  <div className="flex items-center gap-3">
                    <Icon className="w-4 h-4" />
                    <span>{item.label}</span>
                  </div>
                  {item.badge && (
                    <span className="text-xs font-semibold px-2 py-0.5 rounded bg-[#1B365D] text-white">
                      {item.badge}
                    </span>
                  )}
                </NavLink>
              );
            })}
          </nav>

          <div className="pt-3 border-t border-[#E4E7EC] space-y-1">
            <NavLink
              to="/profile"
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-3 p-3 rounded-lg text-sm font-medium text-[#5C6479] hover:text-[#111625]"
            >
              <User className="w-4 h-4" />
              <span>Profile</span>
            </NavLink>
            <NavLink
              to="/settings"
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-3 p-3 rounded-lg text-sm font-medium text-[#5C6479] hover:text-[#111625]"
            >
              <Settings className="w-4 h-4" />
              <span>Settings</span>
            </NavLink>
            <button
              type="button"
              onClick={handleLogout}
              className="w-full flex items-center gap-3 p-3 rounded-lg text-sm font-medium text-[#991B1B] hover:bg-[#FEE2E2]/50 text-left"
            >
              <LogOut className="w-4 h-4" />
              <span>Log out</span>
            </button>
          </div>
        </div>
      )}

      {/* Bottom Navigation Bar for Mobile */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-[#E4E7EC] flex items-center justify-around h-14 px-2 safe-bottom">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `flex flex-col items-center justify-center flex-1 h-full relative transition-colors ${
                  isActive ? 'text-[#1B365D]' : 'text-[#5C6479] hover:text-[#111625]'
                }`
              }
            >
              <div className="relative">
                <Icon className="w-4 h-4" />
                {item.badge && (
                  <span className="absolute -top-1 -right-2 text-[9px] font-bold px-1 rounded-full bg-[#1B365D] text-white">
                    {item.badge}
                  </span>
                )}
              </div>
              <span className="text-[10px] mt-1 font-medium leading-none">
                {item.label}
              </span>
            </NavLink>
          );
        })}
      </nav>
    </>
  );
}
