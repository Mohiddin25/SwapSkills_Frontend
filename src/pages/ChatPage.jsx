import React, { useState, useEffect, useRef } from 'react';
import { PageHeader } from '../components/layout/PageHeader';
import { Avatar } from '../components/common/Avatar';
import { Button } from '../components/common/Button';
import { chatService } from '../services/chatService';
import { socketService } from '../services/socketService';
import { useAuth } from '../context/AuthContext';
import { MessageSquare, Send, User, Sparkles, CheckCircle2, Trash2, AlertTriangle } from 'lucide-react';

export function ChatPage() {
  const { user } = useAuth();
  const [conversations, setConversations] = useState([]);
  const [activeConv, setActiveConv] = useState(null);
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const messagesEndRef = useRef(null);

  const currentUserId = user?._id || user?.id;

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const getSenderId = (msg) => {
    if (!msg) return null;
    if (typeof msg.sender === 'object' && msg.sender !== null) {
      return msg.sender._id || msg.sender.id;
    }
    return msg.sender;
  };

  const isMessageFromMe = (msg) => {
    const sId = getSenderId(msg);
    if (!sId || !currentUserId) return false;
    return String(sId) === String(currentUserId);
  };

  const addMessageIfNew = (newMsg) => {
    if (!newMsg) return;
    const newId = newMsg._id || newMsg.id;
    setMessages((prev) => {
      if (newId && prev.some((m) => String(m._id || m.id) === String(newId))) {
        return prev;
      }
      return [...prev, newMsg];
    });
  };

  // Load conversations on mount & initialize socket connection
  useEffect(() => {
    let isMounted = true;
    const loadConvs = async () => {
      try {
        setIsLoading(true);
        const data = await chatService.getConversations();
        if (isMounted) {
          setConversations(data || []);
          if (data && data.length > 0 && !activeConv) {
            setActiveConv(data[0]);
          }
        }
      } catch (err) {
        console.error('Failed to load conversations', err);
      } finally {
        if (isMounted) setIsLoading(false);
      }
    };

    if (user && currentUserId) {
      loadConvs();
      socketService.getSocket(currentUserId);
    }
    return () => {
      isMounted = false;
    };
  }, [currentUserId]);

  // Load messages and listen for Socket.IO real-time messages when active conversation changes
  useEffect(() => {
    if (!activeConv || !user) return;

    let isMounted = true;
    const activeConvId = activeConv._id || activeConv.id;

    const loadMsgs = async () => {
      try {
        const msgs = await chatService.getMessages(activeConvId);
        if (isMounted) {
          setMessages(msgs || []);
        }
      } catch (err) {
        console.error('Failed to load messages', err);
      }
    };

    loadMsgs();
    socketService.joinConversation(activeConvId);

    const handleReceiveMessage = (newMsg) => {
      if (!newMsg) return;
      const msgConvId =
        typeof newMsg.conversation === 'object' && newMsg.conversation !== null
          ? newMsg.conversation._id || newMsg.conversation.id
          : newMsg.conversation;

      if (String(msgConvId) === String(activeConvId)) {
        addMessageIfNew(newMsg);
      }
    };

    const handleMessageDeleted = (data) => {
      if (data && String(data.conversationId) === String(activeConvId)) {
        setMessages((prev) => prev.filter((m) => String(m._id || m.id) !== String(data.messageId)));
      }
    };

    const handleConversationDeleted = (data) => {
      if (data) {
        setConversations((prev) => prev.filter((c) => String(c._id || c.id) !== String(data.conversationId)));
        if (String(activeConvId) === String(data.conversationId)) {
          setActiveConv(null);
          setMessages([]);
        }
      }
    };

    const cleanupMsg = socketService.onMessageReceive(handleReceiveMessage);
    const cleanupDelMsg = socketService.onMessageDeleted(handleMessageDeleted);
    const cleanupDelConv = socketService.onConversationDeleted(handleConversationDeleted);

    return () => {
      isMounted = false;
      cleanupMsg();
      cleanupDelMsg();
      cleanupDelConv();
    };
  }, [activeConv?._id, activeConv?.id, currentUserId]);


  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!text.trim() || !activeConv || !user) return;

    const messageText = text.trim();
    const activeConvId = activeConv._id || activeConv.id;
    setText('');

    try {
      const sentMsg = await chatService.sendMessage(activeConvId, messageText);
      if (sentMsg) {
        addMessageIfNew(sentMsg);
      }
    } catch (err) {
      console.error('Error sending message:', err);
    }
  };

  const handleDeleteConversation = async () => {
    if (!activeConv) return;
    const activeConvId = activeConv._id || activeConv.id;
    try {
      await chatService.deleteConversation(activeConvId);
      const updated = conversations.filter(
        (c) => String(c._id || c.id) !== String(activeConvId)
      );
      setConversations(updated);
      if (updated.length > 0) {
        setActiveConv(updated[0]);
      } else {
        setActiveConv(null);
        setMessages([]);
      }
      setShowDeleteConfirm(false);
    } catch (err) {
      console.error('Failed to delete conversation:', err);
    }
  };

  const handleDeleteMessage = async (messageId) => {
    if (!activeConv || !messageId) return;
    const activeConvId = activeConv._id || activeConv.id;
    try {
      await chatService.deleteMessage(activeConvId, messageId);
      setMessages((prev) => prev.filter((m) => String(m._id || m.id) !== String(messageId)));
    } catch (err) {
      console.error('Failed to delete message:', err);
    }
  };

  const getPartner = (conv) => {
    if (!conv?.participants || !user) return null;
    const myId = String(currentUserId);
    return (
      conv.participants.find(
        (p) => String(p._id || p.id) !== myId
      ) || conv.participants[0]
    );
  };

  return (
    <div className="space-y-6 text-left">
      <PageHeader
        eyebrow="Real-Time Messaging"
        title="Peer Chat Commons"
        subtitle="Direct real-time communication with matched study partners to coordinate peer sessions."
      />

      <div className="bg-white border border-[#E4E7EC] rounded-xl overflow-hidden grid grid-cols-1 md:grid-cols-12 min-h-[550px] shadow-xs">
        {/* Conversations Sidebar */}
        <div className="md:col-span-4 border-r border-[#E4E7EC] bg-[#FBFBFA] flex flex-col">
          <div className="p-4 border-b border-[#E4E7EC] font-semibold text-xs uppercase tracking-wider text-[#5C6479]">
            Active Matches ({conversations.length})
          </div>

          <div className="flex-1 overflow-y-auto p-2 space-y-1">
            {isLoading ? (
              <div className="p-6 text-center text-xs text-[#5C6479]">
                Loading conversation threads...
              </div>
            ) : conversations.length === 0 ? (
              <div className="p-6 text-center space-y-2">
                <MessageSquare className="w-8 h-8 text-[#5C6479] mx-auto opacity-50" />
                <p className="text-xs text-[#5C6479]">
                  No active match threads yet. Accept a swap request to start chatting!
                </p>
              </div>
            ) : (
              conversations.map((conv) => {
                const partner = getPartner(conv);
                const isSelected = String(activeConv?._id || activeConv?.id) === String(conv._id || conv.id);
                return (
                  <button
                    key={conv._id || conv.id}
                    type="button"
                    onClick={() => {
                      setActiveConv(conv);
                      setShowDeleteConfirm(false);
                    }}
                    className={`w-full flex items-center gap-3 p-3 rounded-lg text-left transition-colors cursor-pointer ${
                      isSelected
                        ? 'bg-[#1B365D] text-white'
                        : 'hover:bg-white text-[#111625]'
                    }`}
                  >
                    <Avatar name={partner?.name || 'Peer'} size="sm" />
                    <div className="min-w-0 flex-1">
                      <div className="text-xs font-semibold truncate">
                        {partner?.name || 'Peer Learning Partner'}
                      </div>
                      <div
                        className={`text-[11px] truncate mt-0.5 ${
                          isSelected ? 'text-white/80' : 'text-[#5C6479]'
                        }`}
                      >
                        {conv.lastMessage?.text || 'Start conversation'}
                      </div>
                    </div>
                  </button>
                );
              })
            )}
          </div>
        </div>

        {/* Message Thread Viewport */}
        <div className="md:col-span-8 flex flex-col bg-white relative">
          {activeConv ? (
            <>
              {/* Thread Header */}
              <div className="p-4 border-b border-[#E4E7EC] flex items-center justify-between bg-white">
                <div className="flex items-center gap-3">
                  <Avatar name={getPartner(activeConv)?.name || 'Peer'} size="sm" />
                  <div>
                    <h3 className="text-sm font-semibold text-[#111625]">
                      {getPartner(activeConv)?.name || 'Peer Learning Partner'}
                    </h3>
                    <p className="text-[11px] text-[#5C6479]">
                      {getPartner(activeConv)?.department || 'Campus Student'} · {getPartner(activeConv)?.year || ''}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="inline-flex items-center gap-1.5 text-[11px] text-[#1B365D] bg-[#F0F4F8] px-2.5 py-1 rounded-full font-medium">
                    <span className="w-2 h-2 rounded-full bg-[#10B981] animate-pulse" />
                    <span>Real-Time Socket Active</span>
                  </div>
                  <button
                    onClick={() => setShowDeleteConfirm(true)}
                    title="Delete Conversation"
                    className="inline-flex items-center gap-1 text-xs text-red-600 bg-red-50 hover:bg-red-100 border border-red-200 px-2.5 py-1 rounded-lg font-medium transition-colors cursor-pointer"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>Delete Chat</span>
                  </button>
                </div>
              </div>

              {/* Message Feed */}
              <div className="flex-1 overflow-y-auto p-4 space-y-3 min-h-[380px] max-h-[440px]">
                {messages.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-center p-6 text-[#5C6479] space-y-2">
                    <Sparkles className="w-6 h-6 text-[#1B365D]" />
                    <p className="text-xs">
                      Say hello! Send a message to coordinate your peer skill swap meeting time and location.
                    </p>
                  </div>
                ) : (
                  messages.map((msg) => {
                    const isMine = isMessageFromMe(msg);
                    const msgId = msg._id || msg.id;
                    return (
                      <div
                        key={msgId || Math.random()}
                        className={`flex ${isMine ? 'justify-end' : 'justify-start'}`}
                      >
                        <div
                          className={`max-w-[75%] rounded-xl px-4 py-2.5 text-xs leading-relaxed shadow-2xs relative group ${
                            isMine
                              ? 'bg-[#1B365D] text-white rounded-br-none'
                              : 'bg-[#F0F4F8] text-[#111625] rounded-bl-none border border-[#E4E7EC]'
                          }`}
                        >
                          <div className="flex items-start justify-between gap-2">
                            <p className="break-words">{msg.text}</p>
                            {isMine && msgId && (
                              <button
                                onClick={() => handleDeleteMessage(msgId)}
                                title="Delete message"
                                className="text-white/60 hover:text-white transition-colors p-0.5 rounded cursor-pointer shrink-0"
                              >
                                <Trash2 className="w-3 h-3" />
                              </button>
                            )}
                          </div>
                          <div
                            className={`text-[9px] mt-1 text-right ${
                              isMine ? 'text-white/70' : 'text-[#5C6479]'
                            }`}
                          >
                            {msg.createdAt
                              ? new Date(msg.createdAt).toLocaleTimeString([], {
                                  hour: '2-digit',
                                  minute: '2-digit'
                                })
                              : 'Just now'}
                          </div>
                        </div>
                      </div>
                    );
                  })
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Input Form */}
              <form
                onSubmit={handleSendMessage}
                className="p-3 border-t border-[#E4E7EC] bg-[#FBFBFA] flex items-center gap-2"
              >
                <input
                  type="text"
                  placeholder="Type your message..."
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  className="flex-1 bg-white border border-[#E4E7EC] rounded-lg px-3.5 py-2 text-xs outline-none focus:border-[#1B365D] text-[#111625]"
                />
                <Button
                  type="submit"
                  variant="primary"
                  size="sm"
                  disabled={!text.trim()}
                  icon={Send}
                >
                  Send
                </Button>
              </form>
            </>
          ) : (
            <div className="h-full flex flex-col items-center justify-center p-8 text-center text-[#5C6479] space-y-2">
              <MessageSquare className="w-10 h-10 text-[#5C6479] opacity-40" />
              <p className="text-sm font-medium">Select a Conversation</p>
              <p className="text-xs max-w-xs">
                Choose an active match thread from the sidebar to start real-time messaging.
              </p>
            </div>
          )}

          {/* Delete Conversation Confirmation Modal */}
          {showDeleteConfirm && (
            <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 z-50">
              <div className="bg-white border border-[#E4E7EC] rounded-xl p-6 max-w-sm w-full text-center shadow-lg space-y-4">
                <div className="w-12 h-12 rounded-full bg-red-100 text-red-600 flex items-center justify-center mx-auto">
                  <AlertTriangle className="w-6 h-6" />
                </div>
                <div className="space-y-1">
                  <h4 className="text-base font-bold text-[#111625]">Delete Chat Thread?</h4>
                  <p className="text-xs text-[#5C6479]">
                    Are you sure you want to delete this chat conversation and all its messages? This action cannot be undone.
                  </p>
                </div>
                <div className="flex gap-2 justify-center pt-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setShowDeleteConfirm(false)}
                  >
                    Cancel
                  </Button>
                  <button
                    onClick={handleDeleteConversation}
                    className="bg-red-600 hover:bg-red-700 text-white font-medium px-4 py-2 rounded-lg text-xs transition-colors cursor-pointer"
                  >
                    Yes, Delete Chat
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}


