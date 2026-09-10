import React from 'react';
import { Outlet } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { MobileNav } from './MobileNav';

export function AppShell() {
  return (
    <div className="min-h-screen bg-[#FBFBFA] flex flex-col md:flex-row">
      {/* Persistent Desktop Sidebar */}
      <div className="hidden md:block shrink-0">
        <Sidebar />
      </div>

      {/* Mobile Top and Bottom Bar */}
      <MobileNav />

      {/* Main Content Viewport */}
      <main className="flex-1 min-w-0 w-full overflow-y-auto">
        <div className="max-w-6xl mx-auto p-4 sm:p-6 lg:p-8 pb-24 md:pb-12">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
