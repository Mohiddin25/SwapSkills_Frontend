import api from './api';

const STORAGE_KEY_USER = 'skillswap_current_user';
const STORAGE_KEY_TOKEN = 'skillswap_token';

export const normalizeUserData = (u) => {
  if (!u) return null;
  const rawTeach = u.skillsToTeach?.length ? u.skillsToTeach : (u.skillsTeach || []);
  const rawLearn = u.skillsToLearn?.length ? u.skillsToLearn : (u.skillsLearn || []);

  const skillsTeach = rawTeach.map((s) => {
    if (typeof s === 'string') {
      return { id: s, name: s, category: 'Academic', level: 'Intermediate' };
    }
    const name = s.skill?.name || s.name || 'Skill';
    const category = s.skill?.category || s.category || 'Academic';
    const level = s.skillLevel || s.level || 'Intermediate';
    const id = s.skill?._id || s.skill || s._id || s.id || name;
    return { id, name, category, level };
  });

  const skillsLearn = rawLearn.map((s) => {
    if (typeof s === 'string') {
      return { id: s, name: s, category: 'Academic', level: 'Beginner' };
    }
    const name = s.skill?.name || s.name || 'Skill';
    const category = s.skill?.category || s.category || 'Academic';
    const level = s.desiredLevel || s.level || 'Beginner';
    const id = s.skill?._id || s.skill || s._id || s.id || name;
    return { id, name, category, level };
  });

  const availability = (u.availability || []).map((a) => {
    const day = a.dayOfWeek || a.day || 'Monday';
    const time = a.time || (a.startTime && a.endTime ? `${a.startTime}–${a.endTime}` : '5:00 PM – 7:00 PM');
    return {
      id: a._id || a.id || 'av-' + Math.random().toString(36).substring(2, 9),
      day,
      time,
      start: a.startTime || a.start || '17:00',
      end: a.endTime || a.end || '19:00'
    };
  });

  return {
    ...u,
    id: u._id || u.id,
    credits: u.skillCredits !== undefined ? u.skillCredits : (u.credits !== undefined ? u.credits : 5),
    contributorLevel: typeof u.contributorLevel === 'number'
      ? `Level ${u.contributorLevel} Contributor`
      : u.contributorLevel || 'Level 1 Contributor',
    studentsHelped: u.teachingSessionsCompleted !== undefined ? u.teachingSessionsCompleted : (u.studentsHelped || 0),
    sessionsCompleted: u.sessionsCompleted !== undefined ? u.sessionsCompleted : 0,
    skillsTeach,
    skillsLearn,
    availability
  };
};

export const authService = {
  // Login to real backend API
  async login(email, password) {
    try {
      const res = await api.post('/auth/login', { email, password });
      const token = res.data?.token;
      const user = normalizeUserData(res.data?.user);

      if (token) {
        localStorage.setItem(STORAGE_KEY_TOKEN, token);
        localStorage.setItem('token', token);
      }
      if (user) {
        localStorage.setItem(STORAGE_KEY_USER, JSON.stringify(user));
      }

      return { user, token };
    } catch (err) {
      throw err;
    }
  },

  // Signup to real backend API
  async signup(data) {
    try {
      const res = await api.post('/auth/register', {
        name: data.name,
        email: data.email,
        password: data.password || 'Password123!',
        department: data.department || 'Computer Science',
        year: data.year || '1st Year',
        campus: data.campus || 'Main Campus',
        bio: data.bio || ''
      });

      const token = res.data?.token;
      const user = normalizeUserData(res.data?.user);

      if (token) {
        localStorage.setItem(STORAGE_KEY_TOKEN, token);
        localStorage.setItem('token', token);
      }
      if (user) {
        localStorage.setItem(STORAGE_KEY_USER, JSON.stringify(user));
      }

      return { user, token };
    } catch (err) {
      throw err;
    }
  },

  // Get current user from backend
  async getMe() {
    try {
      const res = await api.get('/auth/me');
      const user = normalizeUserData(res.data);
      if (user) {
        localStorage.setItem(STORAGE_KEY_USER, JSON.stringify(user));
      }
      return user;
    } catch (err) {
      return this.getCurrentStored();
    }
  },

  // Get stored user from localStorage
  getCurrentUser() {
    return this.getCurrentStored();
  },

  getCurrentStored() {
    try {
      const data = localStorage.getItem(STORAGE_KEY_USER);
      if (data) return JSON.parse(data);
    } catch (e) {}
    return null;
  },

  // Logout
  async logout() {
    try {
      await api.post('/auth/logout');
    } catch (e) {
      // ignore
    } finally {
      localStorage.removeItem(STORAGE_KEY_TOKEN);
      localStorage.removeItem('token');
      localStorage.removeItem(STORAGE_KEY_USER);
    }
    return true;
  }
};
