import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { PageHeader } from '../components/layout/PageHeader';
import { SearchBar } from '../components/common/SearchBar';
import { FilterBar } from '../components/common/FilterBar';
import { MatchCard } from '../components/matching/MatchCard';
import { MatchDetailModal } from '../components/matching/MatchDetailModal';
import { SwapRequestModal } from '../components/requests/SwapRequestModal';
import { EmptyState } from '../components/common/EmptyState';
import { POPULAR_SKILLS } from '../constants/skills';
import { useAuth } from '../context/AuthContext';
import { useSwap } from '../context/SwapContext';
import { Users, SearchX, Sparkles } from 'lucide-react';

export function FindMatchesPage() {
  const { user } = useAuth();
  const { matches, isLoadingMatches, filterMatches, sendSwapRequest } = useSwap();
  const [searchParams, setSearchParams] = useSearchParams();

  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({
    skill: searchParams.get('skill') || 'All Skills',
    skillLevel: 'All Levels',
    availability: 'Any Day',
    department: 'All Departments',
    year: 'All Years',
    sortBy: 'Best Match'
  });

  const [selectedMatch, setSelectedMatch] = useState(null);
  const [requestTargetMatch, setRequestTargetMatch] = useState(null);

  // Sync url param if skill param exists
  useEffect(() => {
    const urlSkill = searchParams.get('skill');
    if (urlSkill) {
      setFilters((prev) => ({ ...prev, skill: urlSkill }));
    }
  }, [searchParams]);

  // Run filtering whenever search or filters change
  useEffect(() => {
    filterMatches({ ...filters, search: searchQuery });
  }, [filters, searchQuery, filterMatches]);

  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const handleResetFilters = () => {
    setSearchQuery('');
    setFilters({
      skill: 'All Skills',
      skillLevel: 'All Levels',
      availability: 'Any Day',
      department: 'All Departments',
      year: 'All Years',
      sortBy: 'Best Match'
    });
    setSearchParams({});
  };

  return (
    <div className="space-y-6 text-left">
      {/* Page Header */}
      <PageHeader
        eyebrow="Campus Directory"
        title="Find your next learning partner"
        subtitle="Matches are ranked by transparent skill compatibility, availability overlap, and skill level."
      />

      {/* Search Input */}
      <SearchBar
        value={searchQuery}
        onChange={setSearchQuery}
        onClear={() => setSearchQuery('')}
        placeholder="Search by skill name, student name, or academic department..."
      />

      {/* Multi-Criteria Filters Bar */}
      <FilterBar
        filters={filters}
        onFilterChange={handleFilterChange}
        onReset={handleResetFilters}
        availableSkills={POPULAR_SKILLS}
        totalCount={matches.length}
      />

      {/* Matches Grid */}
      {isLoadingMatches ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {[1, 2, 3, 4, 5, 6].map((n) => (
            <div
              key={n}
              className="bg-white border border-[#E4E7EC] rounded-xl p-5 space-y-4 animate-pulse"
            >
              <div className="h-10 bg-[#E4E7EC] rounded-md w-3/4" />
              <div className="h-4 bg-[#E4E7EC] rounded w-1/2" />
              <div className="h-16 bg-[#FBFBFA] rounded-md" />
              <div className="h-8 bg-[#E4E7EC] rounded-md" />
            </div>
          ))}
        </div>
      ) : matches.length === 0 ? (
        <EmptyState
          icon={SearchX}
          title="No strong matches found"
          description="No students match all your selected filters. Try clearing some criteria or expanding your declared weekly availability."
          actionLabel="Reset Filters"
          onAction={handleResetFilters}
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {matches.map((match) => (
            <MatchCard
              key={match.id}
              match={match}
              onViewDetails={(m) => setSelectedMatch(m)}
              onRequestSwap={(m) => setRequestTargetMatch(m)}
            />
          ))}
        </div>
      )}

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
