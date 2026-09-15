import api from './api';
import { TRENDING_SKILLS } from '../data/mockData';

export const skillService = {
  async getTrendingSkills() {
    try {
      const res = await api.get('/analytics/trending-skills');
      const rawList = Array.isArray(res.data?.data)
        ? res.data.data
        : Array.isArray(res.data)
        ? res.data
        : Array.isArray(res)
        ? res
        : [];

      if (rawList.length === 0) {
        return TRENDING_SKILLS;
      }

      return rawList.map((s) => ({
        id: s.skillId || s._id || s.name || s.skill,
        name: s.skill || s.name || 'Skill',
        category: s.category || 'Software Development',
        count: s.count || s.learners || s.learnersCount || 10,
        learnersCount: s.learners || s.count || 0,
        teachersCount: s.teachers || 0,
        unmetDemand: s.unmetDemand || 0,
        demandScore: s.demandScore || 0
      }));
    } catch (err) {
      console.warn('Backend trending skills fetch fallback:', err.message);
      return TRENDING_SKILLS;
    }
  },

  async getAllSkills() {
    try {
      const res = await api.get('/skills');
      return res.data?.skills || res.data || [];
    } catch (err) {
      return [];
    }
  }
};
