import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  Users,
  GitPullRequest,
  CalendarCheck,
  MessageSquare,
  Clock,
  User,
  Settings,
  GraduationCap,
  Coins,
  LogOut
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useSwap } from '../../context/SwapContext';
import { Avatar } from '../common/Avatar';

export function Sidebar() {
  const { user, logout } = useAuth();
  const { requests, sessions } = useSwap();
  const navigate = useNavigate();

  const pendingRequestsCount = requests.filter(
    (r) => r.status === 'Pending' && r.direction === 'received'
  ).length;

  const upcomingSessionsCount = sessions.filter(
    (s) => s.status === 'Upcoming'
  ).length;

  const navItems = [
    { label: 'Overview', to: '/dashboard', icon: LayoutDashboard },
    { label: 'Find Matches', to: '/matches', icon: Users },
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
    { label: 'Peer Chat', to: '/chat', icon: MessageSquare },
    { label: 'Availability', to: '/availability', icon: Clock }
  ];

  const bottomItems = [
    { label: 'Profile', to: '/profile', icon: User },
    { label: 'Settings', to: '/settings', icon: Settings }
  ];

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  return (
    <aside className="w-64 h-screen sticky top-0 bg-white border-r border-[#E4E7EC] flex flex-col justify-between select-none z-30">
      {/* Top section */}
      <div>
        {/* Brand Header */}
        <div className="h-16 flex items-center gap-2.5 px-6 border-b border-[#E4E7EC]">
          <div className="w-8 h-8 rounded-lg bg-[#1B365D] text-white flex items-center justify-center font-bold text-sm tracking-widest">
            SS
          </div>
          <div>
            <span className="text-sm font-bold tracking-tight text-[#111625] block leading-none">
              SKILL SWAP
            </span>
            <span className="text-[10px] uppercase tracking-wider text-[#5C6479] font-medium block mt-1">
              Campus Platform
            </span>
          </div>
        </div>

        {/* Navigation list */}
        <nav className="p-3 space-y-1">
          <div className="px-3 py-1.5 text-[10px] font-semibold uppercase tracking-wider text-[#5C6479]">
            Navigation
          </div>
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  `flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium transition-colors ${
                    isActive
                      ? 'bg-[#F0F4F8] text-[#1B365D] font-semibold border-l-2 border-[#1B365D]'
                      : 'text-[#5C6479] hover:text-[#111625] hover:bg-[#FBFBFA]'
                  }`
                }
              >
                <div className="flex items-center gap-2.5">
                  <Icon className="w-4 h-4 shrink-0" />
                  <span>{item.label}</span>
                </div>
                {item.badge && (
                  <span className="text-[10px] font-semibold px-1.5 py-0.5 rounded bg-[#1B365D] text-white">
                    {item.badge}
                  </span>
                )}
              </NavLink>
            );
          })}
        </nav>
      </div>

      {/* Bottom section: User, Profile, Settings */}
      <div className="p-3 border-t border-[#E4E7EC] space-y-2 bg-[#FBFBFA]/50">
        {/* Skill Credits Badge */}
        <div className="px-3 py-2 bg-white border border-[#E4E7EC] rounded-lg flex items-center justify-between">
          <div className="flex items-center gap-1.5 text-xs text-[#5C6479]">
            <Coins className="w-3.5 h-3.5 text-[#1B365D]" />
            <span>Skill Credits</span>
          </div>
          <span className="text-xs font-bold text-[#1B365D]">
            {user?.credits || 0}
          </span>
        </div>

        <div className="space-y-0.5">
          {bottomItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  `flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-medium transition-colors ${
                    isActive
                      ? 'bg-[#F0F4F8] text-[#1B365D] font-semibold'
                      : 'text-[#5C6479] hover:text-[#111625] hover:bg-white'
                  }`
                }
              >
                <Icon className="w-4 h-4 shrink-0" />
                <span>{item.label}</span>
              </NavLink>
            );
          })}

          <button
            type="button"
            onClick={handleLogout}
            className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-medium text-[#5C6479] hover:text-[#991B1B] hover:bg-[#FEE2E2]/40 transition-colors text-left cursor-pointer"
          >
            <LogOut className="w-4 h-4 shrink-0" />
            <span>Log out</span>
          </button>
        </div>

        {/* User Mini Bar */}
        {user && (
          <div className="pt-2 border-t border-[#E4E7EC] flex items-center gap-2.5 px-2">
            <Avatar name={user.name} size="sm" />
            <div className="min-w-0 text-left">
              <div className="text-xs font-semibold text-[#111625] truncate">
                {user.name}
              </div>
              <div className="text-[10px] text-[#5C6479] truncate">
                {user.department?.split(' ')[0]} · {user.year}
              </div>
            </div>
          </div>
        )}
      </div>
    </aside>
  );
}
