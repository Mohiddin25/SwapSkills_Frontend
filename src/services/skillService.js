import api from './api';

export const skillService = {
  async getTrendingSkills() {
    try {
      const res = await api.get('/analytics/trending-skills');
      const data = res.data || [];
      return data.map((s) => ({
        id: s.skillId || s._id,
        name: s.skill,
        category: s.category,
        learnersCount: s.learners || 0,
        teachersCount: s.teachers || 0,
        unmetDemand: s.unmetDemand || 0,
        demandScore: s.demandScore || 0
      }));
    } catch (err) {
      console.warn('Backend trending skills fetch fallback:', err.message);
      return [];
    }
  },

  async getAllSkills() {
    try {
      const res = await api.get('/skills');
      return res.data?.skills || [];
    } catch (err) {
      return [];
    }
  }
};
