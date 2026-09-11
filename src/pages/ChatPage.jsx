import React, { useState, useEffect, useRef } from 'react';
import { PageHeader } from '../components/layout/PageHeader';
import { Avatar } from '../components/common/Avatar';
import { Button } from '../components/common/Button';
import { chatService } from '../services/chatService';
import { socketService } from '../services/socketService';
import { useAuth } from '../context/AuthContext';
import { MessageSquare, Send, User, Sparkles, CheckCircle2 } from 'lucide-react';

export function ChatPage() {
  const { user } = useAuth();
  const [conversations, setConversations] = useState([]);
  const [activeConv, setActiveConv] = useState(null);
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // Load conversations on mount
  useEffect(() => {
    let isMounted = true;
    const loadConvs = async () => {
      try {
        setIsLoading(true);
        const data = await chatService.getConversations();
        if (isMounted) {
          setConversations(data);
          if (data.length > 0 && !activeConv) {
            setActiveConv(data[0]);
          }
        }
      } catch (err) {
        console.error('Failed to load conversations', err);
      } finally {
        if (isMounted) setIsLoading(false);
      }
    };
    if (user) {
      loadConvs();
      socketService.getSocket(user.id || user._id);
    }
    return () => {
      isMounted = false;
    };
  }, [user]);

  // Load messages and listen for Socket.IO real-time messages when active conversation changes
  useEffect(() => {
    if (!activeConv || !user) return;

    let isMounted = true;
    const loadMsgs = async () => {
      try {
        const msgs = await chatService.getMessages(activeConv._id);
        if (isMounted) {
          setMessages(msgs);
        }
      } catch (err) {
        console.error('Failed to load messages', err);
      }
    };

    loadMsgs();
    socketService.joinConversation(activeConv._id);

    const cleanup = socketService.onMessageReceive((newMsg) => {
      const convId = newMsg.conversation?._id || newMsg.conversation;
      if (convId === activeConv._id) {
        setMessages((prev) => {
          if (prev.some((m) => m._id === newMsg._id)) return prev;
          return [...prev, newMsg];
        });
      }
    });

    return () => {
      isMounted = false;
      cleanup();
    };
  }, [activeConv, user]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!text.trim() || !activeConv || !user) return;

    const messageText = text.trim();
    setText('');

    try {
      socketService.sendMessage({
        conversationId: activeConv._id,
        senderId: user.id || user._id,
        text: messageText
      });

      const sentMsg = await chatService.sendMessage(activeConv._id, messageText);
      if (sentMsg) {
        setMessages((prev) => {
          if (prev.some((m) => m._id === sentMsg._id)) return prev;
          return [...prev, sentMsg];
        });
      }
    } catch (err) {
      console.error('Error sending message:', err);
    }
  };

  const getPartner = (conv) => {
    if (!conv?.participants || !user) return null;
    return (
      conv.participants.find(
        (p) => (p._id || p.id) !== (user.id || user._id)
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
                const isSelected = activeConv?._id === conv._id;
                return (
                  <button
                    key={conv._id}
                    type="button"
                    onClick={() => setActiveConv(conv)}
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
        <div className="md:col-span-8 flex flex-col bg-white">
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
                <div className="inline-flex items-center gap-1.5 text-[11px] text-[#1B365D] bg-[#F0F4F8] px-2.5 py-1 rounded-full font-medium">
                  <span className="w-2 h-2 rounded-full bg-[#10B981] animate-pulse" />
                  <span>Real-Time Socket Active</span>
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
                    const isMine =
                      (msg.sender?._id || msg.sender) === (user.id || user._id);
                    return (
                      <div
                        key={msg._id || msg.id || Math.random()}
                        className={`flex ${isMine ? 'justify-end' : 'justify-start'}`}
                      >
                        <div
                          className={`max-w-[75%] rounded-xl px-4 py-2.5 text-xs leading-relaxed shadow-2xs ${
                            isMine
                              ? 'bg-[#1B365D] text-white rounded-br-none'
                              : 'bg-[#F0F4F8] text-[#111625] rounded-bl-none border border-[#E4E7EC]'
                          }`}
                        >
                          <p>{msg.text}</p>
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
        </div>
      </div>
    </div>
  );
}
