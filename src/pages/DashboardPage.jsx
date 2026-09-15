import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Users,
  Coins,
  CalendarCheck,
  Award,
  ArrowRight,
  TrendingUp,
  Clock,
  CheckCircle2,
  Calendar
} from 'lucide-react';
import { PageHeader } from '../components/layout/PageHeader';
import { StatBlock } from '../components/common/StatBlock';
import { Button } from '../components/common/Button';
import { MatchCard } from '../components/matching/MatchCard';
import { MatchDetailModal } from '../components/matching/MatchDetailModal';
import { SwapRequestModal } from '../components/requests/SwapRequestModal';
import { useAuth } from '../context/AuthContext';
import { useSwap } from '../context/SwapContext';

export function DashboardPage() {
  const { user } = useAuth();
  const {
    matches,
    requests,
    sessions,
    activity,
    trendingSkills,
    sendSwapRequest
  } = useSwap();
  const navigate = useNavigate();

  const [selectedMatch, setSelectedMatch] = useState(null);
  const [requestTargetMatch, setRequestTargetMatch] = useState(null);

  const firstName = user?.name ? user.name.split(' ')[0] : 'Alex';

  // Compact stats
  const pendingRequestsCount = requests.filter((r) => r.status === 'Pending').length;
  const upcomingSessionsCount = sessions.filter((s) => s.status === 'Upcoming').length;

  // Top 2 recommended matches
  const topMatches = matches.slice(0, 2);

  return (
    <div className="space-y-8 text-left">
      {/* Editorial Header */}
      <PageHeader
        eyebrow="Academic Dashboard"
        title={`Good morning, ${firstName}`}
        subtitle="Ready to learn something new? Here is your peer-exchange overview."
        actions={
          <Button
            variant="primary"
            size="md"
            icon={Users}
            onClick={() => navigate('/matches')}
          >
            Find Matches
          </Button>
        }
      />

      {/* Compact Statistics Grid: Typography & Hairline Dividers (No loud colorful cards) */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatBlock
          label="New Matches"
          value={matches.length || 5}
          subtext="Compatible campus peers"
          icon={Users}
        />
        <StatBlock
          label="Skill Credits"
          value={user?.credits || 8}
          subtext="Available for learning sessions"
          icon={Coins}
        />
        <StatBlock
          label="Upcoming Sessions"
          value={upcomingSessionsCount}
          subtext="Scheduled this month"
          icon={CalendarCheck}
        />
        <StatBlock
          label="Academic Rank"
          value={user?.contributorLevel?.replace(' Contributor', '') || 'Level 3'}
          subtext="Verified Contributor status"
          icon={Award}
        />
      </div>

      {/* Main Grid: Recommended Matches & Activity/Trending */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left 2 cols: Recommended Matches */}
        <div className="lg:col-span-2 space-y-5">
          <div className="flex items-center justify-between border-b border-[#E4E7EC] pb-3">
            <div>
              <h2 className="text-base font-semibold text-[#111625]">
                Recommended Matches
              </h2>
              <p className="text-xs text-[#5C6479]">
                Ranked by reciprocal skill match and mutual schedule alignment
              </p>
            </div>
            <Button
              variant="outline"
              size="sm"
              icon={ArrowRight}
              onClick={() => navigate('/matches')}
            >
              View All
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {topMatches.map((match) => (
              <MatchCard
                key={match.id}
                match={match}
                onViewDetails={(m) => setSelectedMatch(m)}
                onRequestSwap={(m) => setRequestTargetMatch(m)}
              />
            ))}
          </div>
        </div>

        {/* Right Col: Trending Skills & Recent Activity */}
        <div className="space-y-6">
          {/* Trending Skills */}
          <div className="bg-white border border-[#E4E7EC] rounded-xl p-5 space-y-4">
            <div className="flex items-center justify-between border-b border-[#E4E7EC] pb-2.5">
              <div className="flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-[#1B365D]" />
                <h3 className="text-xs font-semibold uppercase tracking-wider text-[#111625]">
                  Trending Skills
                </h3>
              </div>
              <span className="text-[11px] text-[#5C6479]">Campus Demand</span>
            </div>

            <div className="space-y-2.5">
              {(trendingSkills.length > 0 ? trendingSkills : [
                { name: 'React', count: 24 },
                { name: 'Python', count: 19 },
                { name: 'UI/UX Design', count: 16 },
                { name: 'Data Analysis', count: 12 },
                { name: 'System Design', count: 10 }
              ]).map((item) => (
                <div
                  key={item.name}
                  onClick={() => navigate(`/matches?skill=${encodeURIComponent(item.name)}`)}
                  className="flex items-center justify-between p-2 rounded-lg hover:bg-[#FBFBFA] transition-colors cursor-pointer text-xs"
                >
                  <span className="font-medium text-[#111625]">{item.name}</span>
                  <span className="text-[#5C6479] text-[11px]">
                    {item.count || item.learnersCount || 10} students want to learn
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-white border border-[#E4E7EC] rounded-xl p-5 space-y-4">
            <div className="flex items-center justify-between border-b border-[#E4E7EC] pb-2.5">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-[#1B365D]" />
                <h3 className="text-xs font-semibold uppercase tracking-wider text-[#111625]">
                  Recent Activity
                </h3>
              </div>
              <span className="text-[11px] text-[#5C6479]">Timeline</span>
            </div>

            <div className="space-y-3">
              {activity.slice(0, 4).map((act) => (
                <div key={act.id} className="text-xs space-y-0.5">
                  <div className="font-normal text-[#111625] leading-snug">
                    {act.text}
                  </div>
                  <div className="text-[10px] text-[#5C6479]">
                    {act.time}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Modals */}
      <MatchDetailModal
        isOpen={!!selectedMatch}
        onClose={() => setSelectedMatch(null)}
        match={selectedMatch}
        onRequestSwap={(m) => setRequestTargetMatch(m)}
      />

      <SwapRequestModal
        isOpen={!!requestTargetMatch}
        onClose={() => setRequestTargetMatch(null)}
        match={requestTargetMatch}
        currentUser={user}
        onSendRequest={sendSwapRequest}
      />
    </div>
  );
}
