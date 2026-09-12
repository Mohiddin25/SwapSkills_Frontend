import api from './api';

const extractSkillInfo = (item, defaultLevel = 'Intermediate') => {

  if (!item) return null;
  let name = '';
  let level = item.skillLevel || item.desiredLevel || defaultLevel;
  let category = 'Academic';

  if (typeof item === 'string') {
    name = item;
  } else if (item.skill) {
    if (typeof item.skill === 'string') {
      name = item.skill;
    } else if (typeof item.skill === 'object') {
      name = item.skill.name || item.skill.normalizedName || item.skill.title || '';
      if (item.skill.category) category = item.skill.category;
    }
  } else if (item.name) {
    name = item.name;
    if (item.category) category = item.category;
  }

  if (!name || name.trim().toLowerCase() === 'skill') return null;

  return { name: name.trim(), level, category };
};

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

      const backendMatches = res.matches || res.data?.matches || (Array.isArray(res) ? res : []);

      // Format backend candidate response into UI student card structure
      return backendMatches.map((m) => {
        const c = m.candidate || m.user || m || {};
        const teachSkills = (c.skillsToTeach || c.teachSkills || c.canTeach || [])
          .map((s) => extractSkillInfo(s, 'Intermediate'))
          .filter(Boolean);
        const learnSkills = (c.skillsToLearn || c.learnSkills || c.wantsToLearn || [])
          .map((s) => extractSkillInfo(s, 'Beginner'))
          .filter(Boolean);

        return {
          id: c._id || c.id,
          name: c.name || 'Peer Learning Partner',
          email: c.email || '',
          avatar: c.profileImage || `https://api.dicebear.com/7.x/avataaars/svg?seed=${c.name || 'Student'}`,
          department: c.department || 'General',
          year: c.year || 'Student',
          campus: c.campus || 'Main Campus',
          rating: c.rating || 5.0,
          totalRatings: c.totalRatings || 0,
          contributorLevel: `Level ${c.contributorLevel || 1} Contributor`,
          credits: c.skillCredits || 5,
          sessionsCompleted: c.sessionsCompleted || 0,
          studentsHelped: c.teachingSessionsCompleted || 0,
          bio: c.bio || '',
          compatibility: m.matchScore || 85,
          breakdown: {
            skillCompatibility: m.skillScore || 60,
            availabilityOverlap: m.availabilityScore || 25,
            skillLevelCompatibility: m.levelScore || 15,
            locationProximity: m.locationScore || 10
          },
          explanation: m.matchScore ? `High score: ${m.matchScore}% compatible skills and schedules.` : 'Strong peer skill swap compatibility.',
          skillsTeach: teachSkills,
          skillsLearn: learnSkills,
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
