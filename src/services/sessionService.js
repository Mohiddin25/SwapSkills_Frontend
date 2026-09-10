import api from './api';
import { userService } from './userService';

export const sessionService = {
  async getSessions() {
    try {
      const res = await api.get('/sessions/me');
      const backendSessions = res.data || [];
      const user = userService.getCurrentStored();

      return backendSessions.map((s) => {
        const isTeacher = s.teacher?._id === user?.id || s.teacher === user?.id;
        const partner = isTeacher ? s.learner : s.teacher;
        return {
          id: s._id,
          topic: `${s.skill?.name || 'Skill Swap'} Session`,
          partnerId: partner?._id || partner,
          partnerName: partner?.name || 'Peer',
          partnerDepartment: partner?.department || 'Department',
          partnerYear: partner?.year || 'Student',
          youTeach: isTeacher ? (s.skill?.name || 'Skill') : 'Partner Skill',
          theyTeach: isTeacher ? 'Partner Skill' : (s.skill?.name || 'Skill'),
          date: new Date(s.scheduledStart).toLocaleDateString(),
          time: new Date(s.scheduledStart).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          location: s.location || 'Campus Library Commons',
          status: s.status === 'completed' ? 'Completed' : s.status === 'scheduled' ? 'Upcoming' : s.status,
          notes: s.notes || 'Peer learning session'
        };
      });
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
