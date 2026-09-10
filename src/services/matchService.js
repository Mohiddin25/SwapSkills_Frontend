import api from './api';

export const matchService = {
  async getMatches(filters = {}, currentUser = null) {
    try {
      const res = await api.get('/matches', {
        params: {
          minScore: filters.minScore || 0,
          skill: filters.skill && filters.skill !== 'All Skills' ? filters.skill : filters.search || undefined,
          department: filters.department && filters.department !== 'All Departments' ? filters.department : undefined,
          year: filters.year && filters.year !== 'All Years' ? filters.year : undefined,
          skillLevel: filters.skillLevel && filters.skillLevel !== 'All Levels' ? filters.skillLevel : undefined,
          availabilityDay: filters.availability && filters.availability !== 'Any Day' ? filters.availability : undefined
        }
      });

      const backendMatches = res.data?.matches || [];

      // Format backend candidate response into UI student card structure
      return backendMatches.map((m) => {
        const c = m.candidate || {};
        return {
          id: c._id || c.id,
          name: c.name,
          email: c.email,
          avatar: c.profileImage || `https://api.dicebear.com/7.x/avataaars/svg?seed=${c.name || 'Student'}`,
          department: c.department,
          year: c.year,
          campus: c.campus || 'Main Campus',
          rating: c.rating || 5.0,
          totalRatings: c.totalRatings || 0,
          contributorLevel: `Level ${c.contributorLevel || 1} Contributor`,
          credits: c.skillCredits || 5,
          sessionsCompleted: c.sessionsCompleted || 0,
          studentsHelped: c.teachingSessionsCompleted || 0,
          bio: c.bio || '',
          compatibility: m.matchScore,
          breakdown: {
            skillCompatibility: m.skillScore,
            availabilityOverlap: m.availabilityScore,
            skillLevelCompatibility: m.levelScore,
            locationProximity: m.locationScore
          },
          explanation: `High score: ${m.matchScore}% compatible skills and schedules.`,
          skillsTeach: (c.skillsToTeach || []).map((s) => ({
            name: s.skill?.name || 'Skill',
            level: s.skillLevel || 'Intermediate',
            category: s.skill?.category || 'Academic'
          })),
          skillsLearn: (c.skillsToLearn || []).map((s) => ({
            name: s.skill?.name || 'Skill',
            level: s.desiredLevel || 'Beginner',
            category: s.skill?.category || 'Academic'
          })),
          sharedAvailability: (m.commonAvailability || []).map((slot) => ({
            day: slot.dayOfWeek,
            time: `${slot.startTime}–${slot.endTime}`
          }))
        };
      });
    } catch (err) {
      console.warn('Backend match search fallback:', err.message);
      return [];
    }
  },

  async getMatchById(id, currentUser = null) {
    const matches = await matchService.getMatches({}, currentUser);
    return matches.find((m) => m.id === id) || null;
  }
};
