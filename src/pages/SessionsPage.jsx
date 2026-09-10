import React, { useState } from 'react';
import { PageHeader } from '../components/layout/PageHeader';
import { SessionCard } from '../components/sessions/SessionCard';
import { SessionDetailModal } from '../components/sessions/SessionDetailModal';
import { EmptyState } from '../components/common/EmptyState';
import { useSwap } from '../context/SwapContext';
import { CalendarCheck, CalendarDays, History } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export function SessionsPage() {
  const [activeTab, setActiveTab] = useState('upcoming'); // 'upcoming' | 'completed'
  const [selectedSession, setSelectedSession] = useState(null);
  const { sessions, markSessionComplete } = useSwap();
  const navigate = useNavigate();

  const upcomingSessions = sessions.filter((s) => s.status === 'Upcoming');
  const completedSessions = sessions.filter((s) => s.status === 'Completed');

  const currentList = activeTab === 'upcoming' ? upcomingSessions : completedSessions;

  return (
    <div className="space-y-6 text-left">
      <PageHeader
        eyebrow="Academic Schedule"
        title="Sessions"
        subtitle="Manage scheduled peer exchanges, confirm session agendas, and track verified study hours."
      />

      {/* Tabs */}
      <div className="flex items-center justify-between border-b border-[#E4E7EC] pb-3">
        <div className="inline-flex rounded-lg border border-[#E4E7EC] p-0.5 bg-[#FBFBFA]">
          <button
            type="button"
            onClick={() => setActiveTab('upcoming')}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-md text-xs font-medium transition-colors cursor-pointer ${
              activeTab === 'upcoming'
                ? 'bg-white text-[#1B365D] font-semibold shadow-xs'
                : 'text-[#5C6479] hover:text-[#111625]'
            }`}
          >
            <CalendarCheck className="w-3.5 h-3.5" />
            <span>Upcoming Sessions ({upcomingSessions.length})</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('completed')}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-md text-xs font-medium transition-colors cursor-pointer ${
              activeTab === 'completed'
                ? 'bg-white text-[#1B365D] font-semibold shadow-xs'
                : 'text-[#5C6479] hover:text-[#111625]'
            }`}
          >
            <History className="w-3.5 h-3.5" />
            <span>Completed Archive ({completedSessions.length})</span>
          </button>
        </div>
      </div>

      {/* Sessions Grid */}
      {currentList.length === 0 ? (
        <EmptyState
          icon={CalendarDays}
          title={
            activeTab === 'upcoming'
              ? 'No sessions scheduled'
              : 'No completed sessions on record'
          }
          description={
            activeTab === 'upcoming'
              ? 'Once a swap request is accepted by you or a peer, your scheduled study sessions will appear here.'
              : 'Finished sessions that have been marked complete will appear here along with earned skill credit verifications.'
          }
          actionLabel={activeTab === 'upcoming' ? 'Browse Compatible Peers' : null}
          onAction={() => navigate('/matches')}
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {currentList.map((sess) => (
            <SessionCard
              key={sess.id}
              session={sess}
              onMarkComplete={markSessionComplete}
              onViewDetails={(s) => setSelectedSession(s)}
            />
          ))}
        </div>
      )}

      {/* Detail modal */}
      <SessionDetailModal
        isOpen={!!selectedSession}
        onClose={() => setSelectedSession(null)}
        session={selectedSession}
        onMarkComplete={markSessionComplete}
      />
    </div>
  );
}
