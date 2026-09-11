import { io } from 'socket.io-client';

let socket = null;

const getSocketUrl = () => {
  const envUrl = import.meta.env.VITE_API_URL || 'https://skillswap-gyjl.onrender.com';
  let base = envUrl.replace(/\/+api\/?$/, '').replace(/\/+$/, '');
  if (!base.startsWith('http://') && !base.startsWith('https://')) {
    base = 'https://skillswap-gyjl.onrender.com';
  }
  return base;
};

export const socketService = {
  getSocket(userId) {
    if (!socket) {
      const url = getSocketUrl();
      socket = io(url, {
        transports: ['websocket', 'polling'],
        withCredentials: true,
        autoConnect: true
      });
    }

    if (socket && !socket.connected) {
      socket.connect();
    }

    if (userId) {
      socket.emit('join_user', userId);
    }

    return socket;
  },

  joinConversation(conversationId) {
    if (socket && conversationId) {
      socket.emit('join_conversation', conversationId);
    }
  },

  sendMessage({ conversationId, senderId, text }) {
    if (socket && conversationId) {
      socket.emit('message:send', { conversationId, senderId, text });
    }
  },

  onMessageReceive(callback) {
    if (!socket) return () => {};
    socket.on('message:receive', callback);
    return () => {
      socket.off('message:receive', callback);
    };
  },

  onRequestReceived(callback) {
    if (!socket) return () => {};
    socket.on('request:created', callback);
    return () => {
      socket.off('request:created', callback);
    };
  },

  onRequestAccepted(callback) {
    if (!socket) return () => {};
    socket.on('request:accepted', callback);
    return () => {
      socket.off('request:accepted', callback);
    };
  },

  disconnect() {
    if (socket) {
      socket.disconnect();
      socket = null;
    }
  }
};
