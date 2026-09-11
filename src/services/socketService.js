import { io } from 'socket.io-client';

let socket = null;
let currentUserId = null;
let currentConvId = null;

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
    if (userId) currentUserId = userId;

    if (!socket) {
      const url = getSocketUrl();
      socket = io(url, {
        transports: ['websocket', 'polling'],
        withCredentials: true,
        autoConnect: true
      });

      socket.on('connect', () => {
        if (currentUserId) {
          socket.emit('join_user', currentUserId);
        }
        if (currentConvId) {
          socket.emit('join_conversation', currentConvId);
        }
      });
    }

    if (socket && !socket.connected) {
      socket.connect();
    }

    if (socket && currentUserId) {
      socket.emit('join_user', currentUserId);
    }

    return socket;
  },

  joinConversation(conversationId) {
    if (!conversationId) return;
    currentConvId = conversationId;
    if (socket) {
      socket.emit('join_conversation', conversationId);
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
      currentUserId = null;
      currentConvId = null;
    }
  }
};
