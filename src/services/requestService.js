import api from './api';

export const requestService = {
  async getRequests() {
    try {
      const [recRes, sentRes] = await Promise.all([
        api.get('/requests/received'),
        api.get('/requests/sent')
      ]);

      const received = (recRes.data || []).map((r) => ({
        id: r._id,
        senderId: r.sender?._id || r.sender,
        senderName: r.sender?.name || 'Student',
        senderDepartment: r.sender?.department || 'Department',
        senderYear: r.sender?.year || 'Student',
        receiverId: r.receiver?._id || r.receiver,
        receiverName: r.receiver?.name || 'Me',
        receiverDepartment: r.receiver?.department || '',
        receiverYear: r.receiver?.year || '',
        skillYouTeach: (r.skillsOffered || []).map(s => s.name || s).join(', ') || 'Skill Offered',
        skillTheyTeach: (r.skillsRequested || []).map(s => s.name || s).join(', ') || 'Skill Requested',
        compatibility: r.matchScore || 85,
        suggestedTime: (r.proposedTimeSlots || []).map(s => `${s.dayOfWeek} ${s.startTime}-${s.endTime}`).join(', ') || 'Campus Hours',
        message: r.message || '',
        status: r.status === 'accepted' ? 'Accepted' : r.status === 'rejected' ? 'Declined' : r.status === 'pending' ? 'Pending' : r.status,
        createdAt: r.createdAt,
        direction: 'received'
      }));

      const sent = (sentRes.data || []).map((r) => ({
        id: r._id,
        senderId: r.sender?._id || r.sender,
        senderName: r.sender?.name || 'Me',
        senderDepartment: r.sender?.department || '',
        senderYear: r.sender?.year || '',
        receiverId: r.receiver?._id || r.receiver,
        receiverName: r.receiver?.name || 'Peer',
        receiverDepartment: r.receiver?.department || 'Department',
        receiverYear: r.receiver?.year || 'Student',
        skillYouTeach: (r.skillsOffered || []).map(s => s.name || s).join(', ') || 'Skill Offered',
        skillTheyTeach: (r.skillsRequested || []).map(s => s.name || s).join(', ') || 'Skill Requested',
        compatibility: r.matchScore || 85,
        suggestedTime: (r.proposedTimeSlots || []).map(s => `${s.dayOfWeek} ${s.startTime}-${s.endTime}`).join(', ') || 'Campus Hours',
        message: r.message || '',
        status: r.status === 'accepted' ? 'Accepted' : r.status === 'rejected' ? 'Declined' : r.status === 'pending' ? 'Pending' : r.status,
        createdAt: r.createdAt,
        direction: 'sent'
      }));

      return [...received, ...sent];
    } catch (err) {
      console.warn('Backend requests fetch fallback:', err.message);
      return [];
    }
  },

  normalizeRequest(r, direction = 'sent') {
    if (!r) return null;
    const raw = r.data || r;
    return {
      id: raw._id || raw.id,
      senderId: raw.sender?._id || raw.sender,
      senderName: raw.sender?.name || 'Peer',
      senderDepartment: raw.sender?.department || '',
      senderYear: raw.sender?.year || '',
      receiverId: raw.receiver?._id || raw.receiver,
      receiverName: raw.receiver?.name || 'Peer',
      receiverDepartment: raw.receiver?.department || 'Department',
      receiverYear: raw.receiver?.year || 'Student',
      skillYouTeach: (raw.skillsOffered || []).map(s => s.name || s).join(', ') || 'Skill Offered',
      skillTheyTeach: (raw.skillsRequested || []).map(s => s.name || s).join(', ') || 'Skill Requested',
      compatibility: raw.matchScore || 85,
      suggestedTime: (raw.proposedTimeSlots || []).map(s => `${s.dayOfWeek} ${s.startTime}-${s.endTime}`).join(', ') || 'Campus Hours',
      message: raw.message || '',
      status: raw.status === 'accepted' ? 'Accepted' : raw.status === 'rejected' ? 'Declined' : raw.status === 'pending' ? 'Pending' : raw.status,
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
      return this.normalizeRequest(payload, 'sent');
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
