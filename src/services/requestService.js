import api from './api';

const getSkillText = (skillsArray, directField, fallbackText) => {
  if (directField && directField !== 'Skill Offered' && directField !== 'Skill Requested') {
    return directField;
  }
  if (Array.isArray(skillsArray) && skillsArray.length > 0) {
    const names = skillsArray.map(s => (typeof s === 'string' ? s : s?.name || s?.title || '')).filter(Boolean);
    if (names.length > 0) return names.join(', ');
  }
  return fallbackText;
};

export const requestService = {
  async getRequests() {
    try {
      const [recRes, sentRes] = await Promise.all([
        api.get('/requests/received'),
        api.get('/requests/sent')
      ]);

      const rawRec = Array.isArray(recRes.data) ? recRes.data : recRes.data?.data || [];
      const rawSent = Array.isArray(sentRes.data) ? sentRes.data : sentRes.data?.data || [];

      const received = rawRec.map((r) => this.normalizeRequest(r, 'received'));
      const sent = rawSent.map((r) => this.normalizeRequest(r, 'sent'));

      return [...received, ...sent];
    } catch (err) {
      console.warn('Backend requests fetch fallback:', err.message);
      return [];
    }
  },

  normalizeRequest(r, direction = 'sent') {
    if (!r) return null;
    const raw = r.data || r;
    const senderName = raw.sender?.name || raw.senderName || (direction === 'sent' ? 'Me' : 'Student');
    const receiverName = raw.receiver?.name || raw.receiverName || (direction === 'sent' ? 'Peer' : 'Me');

    const defaultTeach = direction === 'sent' ? 'Python' : 'UI/UX Design';
    const defaultLearn = direction === 'sent' ? 'UI/UX Design' : 'Python';

    return {
      id: raw._id || raw.id,
      senderId: raw.sender?._id || raw.sender,
      senderName,
      senderDepartment: raw.sender?.department || raw.senderDepartment || 'Computer Science & Engineering',
      senderYear: raw.sender?.year || raw.senderYear || '2nd Year',
      receiverId: raw.receiver?._id || raw.receiver,
      receiverName,
      receiverDepartment: raw.receiver?.department || raw.receiverDepartment || 'Computer Science & Engineering',
      receiverYear: raw.receiver?.year || raw.receiverYear || '3rd Year',
      skillYouTeach: getSkillText(raw.skillsOffered, raw.skillYouTeach, defaultTeach),
      skillTheyTeach: getSkillText(raw.skillsRequested, raw.skillTheyTeach, defaultLearn),
      compatibility: raw.matchScore || raw.compatibility || 85,
      suggestedTime: (raw.proposedTimeSlots || []).map(s => `${s.dayOfWeek} ${s.startTime}-${s.endTime}`).join(', ') || raw.suggestedTime || 'Campus Hours',
      message: raw.message || '',
      status: raw.status === 'accepted' ? 'Accepted' : raw.status === 'rejected' ? 'Declined' : raw.status === 'pending' ? 'Pending' : (raw.status || 'Pending'),
      createdAt: raw.createdAt || new Date().toISOString(),
      direction: raw.direction || direction
    };
  },

  async createRequest(newReqData) {
    try {
      const res = await api.post('/requests', {
        receiverId: newReqData.receiverId,
        message: newReqData.message || ''
      });
      const payload = res.data || res;
      const norm = this.normalizeRequest(payload, 'sent');
      if (newReqData.skillYouTeach) norm.skillYouTeach = newReqData.skillYouTeach;
      if (newReqData.skillTheyTeach) norm.skillTheyTeach = newReqData.skillTheyTeach;
      return norm;
    } catch (err) {
      throw err;
    }
  },

  async acceptRequest(requestId) {
    try {
      const res = await api.patch(`/requests/${requestId}/accept`);
      const payload = res.data?.data || res.data || res;
      const rawReq = payload.request || payload;
      const rawSession = payload.session;
      return {
        request: this.normalizeRequest(rawReq, 'received'),
        session: rawSession
      };
    } catch (err) {
      throw err;
    }
  },


  async declineRequest(requestId) {
    try {
      const res = await api.patch(`/requests/${requestId}/reject`);
      const payload = res.data || res;
      return this.normalizeRequest(payload, 'received');
    } catch (err) {
      throw err;
    }
  },

  async cancelRequest(requestId) {
    try {
      const res = await api.patch(`/requests/${requestId}/cancel`);
      const payload = res.data || res;
      return this.normalizeRequest(payload, 'sent');
    } catch (err) {
      throw err;
    }
  }
};
