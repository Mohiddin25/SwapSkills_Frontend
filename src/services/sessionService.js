import api from './api';
import { userService } from './userService';

export const sessionService = {
  normalizeSession(s, currentUser = null) {
    if (!s) return null;
    const user = currentUser || userService.getCurrentStored();
    const myId = String(user?._id || user?.id || '');
    const teacherId = String(s.teacher?._id || s.teacher?.id || s.teacher || '');
    const isTeacher = teacherId === myId;
    const partner = isTeacher ? s.learner : s.teacher;
    const startDate = s.scheduledStart ? new Date(s.scheduledStart) : new Date();
    const isCompleted = s.status === 'completed' || s.status === 'Completed';

    return {
      id: s._id || s.id,
      topic: `${s.skill?.name || 'Skill Swap'} Session`,
      partnerId: partner?._id || partner,
      partnerName: partner?.name || 'Peer Learning Partner',
      partnerDepartment: partner?.department || 'Department',
      partnerYear: partner?.year || 'Student',
      youTeach: isTeacher ? (s.skill?.name || 'Skill Offered') : 'Partner Skill',
      theyTeach: isTeacher ? 'Partner Skill' : (s.skill?.name || 'Skill Requested'),
      date: startDate.toLocaleDateString(),
      time: startDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      location: s.location || 'Campus Library Commons',
      status: isCompleted ? 'Completed' : 'Upcoming',
      notes: s.notes || 'Peer learning session'
    };
  },

  async getSessions() {
    try {
      const res = await api.get('/sessions/me');
      const backendSessions = Array.isArray(res)
        ? res
        : Array.isArray(res?.data)
        ? res.data
        : (res?.data?.data || []);
      const user = userService.getCurrentStored();
      return backendSessions.map((s) => this.normalizeSession(s, user)).filter(Boolean);
    } catch (err) {
      console.warn('Backend session fetch fallback:', err.message);
      return [];
    }
  },


  async createSessionFromRequest(request) {
    try {
      const res = await api.post('/sessions', {
        swapRequestId: request.id || request._id,
        teacherId: request.direction === 'received' ? request.senderId : request.receiverId,
        learnerId: request.direction === 'received' ? request.receiverId : request.senderId,
        skillId: request.skillsOffered?.[0]?._id || request.skillsOffered?.[0] || '660000000000000000000001',
        scheduledStart: new Date(Date.now() + 86400000), // Tomorrow
        scheduledEnd: new Date(Date.now() + 86400000 + 3600000) // 1 hour duration
      });
      return res.data;
    } catch (err) {
      throw err;
    }
  },

  async markSessionComplete(sessionId) {
    try {
      const res = await api.patch(`/sessions/${sessionId}/complete`);
      await userService.getProfile(); // Refresh profile credits
      return res.data;
    } catch (err) {
      throw err;
    }
  }
};
