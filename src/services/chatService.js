import api from './api';

export const chatService = {
  async getConversations() {
    try {
      const res = await api.get('/chat/conversations');
      return res.data || [];
    } catch (err) {
      console.warn('Failed to fetch chat conversations:', err.message);
      return [];
    }
  },

  async getMessages(conversationId) {
    try {
      const res = await api.get(`/chat/conversations/${conversationId}/messages`);
      return res.data || [];
    } catch (err) {
      console.warn('Failed to fetch messages:', err.message);
      return [];
    }
  },

  async sendMessage(conversationId, text) {
    try {
      const res = await api.post(`/chat/conversations/${conversationId}/messages`, { text });
      return res.data;
    } catch (err) {
      throw err;
    }
  },

  async deleteConversation(conversationId) {
    try {
      const res = await api.delete(`/chat/conversations/${conversationId}`);
      return res.data;
    } catch (err) {
      throw err;
    }
  },

  async deleteMessage(conversationId, messageId) {
    try {
      const res = await api.delete(`/chat/conversations/${conversationId}/messages/${messageId}`);
      return res.data;
    } catch (err) {
      throw err;
    }
  }
};

