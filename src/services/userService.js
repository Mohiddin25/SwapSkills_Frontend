import api from './api';
import { normalizeUserData } from './authService';

const STORAGE_KEY_USER = 'skillswap_current_user';

export const userService = {
  async getProfile() {
    try {
      const res = await api.get('/users/me');
      const user = normalizeUserData(res.data);
      if (user) {
        localStorage.setItem(STORAGE_KEY_USER, JSON.stringify(user));
      }
      return user;
    } catch (err) {
      return this.getCurrentStored();
    }
  },

  async updateProfile(updates) {
    try {
      const res = await api.put('/users/me', updates);
      const user = normalizeUserData(res.data);
      if (user) {
        localStorage.setItem(STORAGE_KEY_USER, JSON.stringify(user));
      }
      return user;
    } catch (err) {
      const current = this.getCurrentStored();
      const updated = { ...current, ...updates };
      localStorage.setItem(STORAGE_KEY_USER, JSON.stringify(updated));
      return updated;
    }
  },

  async addTeachSkill(skillName, skillLevel = 'Intermediate') {
    try {
      const res = await api.post('/users/me/skills/teach', { skillName, skillLevel });
      const user = normalizeUserData(res.data);
      if (user) localStorage.setItem(STORAGE_KEY_USER, JSON.stringify(user));
      return user;
    } catch (err) {
      throw err;
    }
  },

  async removeTeachSkill(skillId) {
    try {
      const res = await api.delete(`/users/me/skills/teach/${skillId}`);
      const user = normalizeUserData(res.data);
      if (user) localStorage.setItem(STORAGE_KEY_USER, JSON.stringify(user));
      return user;
    } catch (err) {
      throw err;
    }
  },

  async addLearnSkill(skillName, desiredLevel = 'Beginner') {
    try {
      const res = await api.post('/users/me/skills/learn', { skillName, desiredLevel });
      const user = normalizeUserData(res.data);
      if (user) localStorage.setItem(STORAGE_KEY_USER, JSON.stringify(user));
      return user;
    } catch (err) {
      throw err;
    }
  },

  async removeLearnSkill(skillId) {
    try {
      const res = await api.delete(`/users/me/skills/learn/${skillId}`);
      const user = normalizeUserData(res.data);
      if (user) localStorage.setItem(STORAGE_KEY_USER, JSON.stringify(user));
      return user;
    } catch (err) {
      throw err;
    }
  },

  async addAvailabilitySlot(dayOfWeek, startTime, endTime) {
    try {
      await api.post('/availability', { dayOfWeek, startTime, endTime });
      return await this.getProfile();
    } catch (err) {
      throw err;
    }
  },

  getCurrentStored() {
    try {
      const data = localStorage.getItem(STORAGE_KEY_USER);
      if (data) return JSON.parse(data);
    } catch (e) {}
    return null;
  }
};
