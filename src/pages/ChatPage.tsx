import React, { useState, useEffect } from "react";
import { useApp } from "../context/AppContext";
import { 
  MessageSquare, 
  Send, 
  ShieldCheck, 
  Clock, 
  User as UserIcon,
  ShoppingBag,
  ExternalLink
} from "lucide-react";
import axios from "axios";
import { ChatMessage, Chat } from "../types";

export const ChatPage: React.FC = () => {
  const { currentUser, chats, fetchChats } = useApp();
  const [selectedChat, setSelectedChat] = useState<Chat | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [newMsgText, setNewMsgText] = useState("");

  useEffect(() => {
    fetchChats();
  }, [currentUser]);

  // If a chat is selected, load messages
  useEffect(() => {
    if (!selectedChat) return;
    const loadMessages = async () => {
      try {
        const res = await axios.get(`/api/chats/${selectedChat.id}/messages`);
        setMessages(res.data);
      } catch (err) {
        console.error("Failed to load messages", err);
      }
    };
    loadMessages();
    const interval = setInterval(loadMessages, 3000); // Polling for live effect
    return () => clearInterval(interval);
  }, [selectedChat]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedChat || !newMsgText.trim() || !currentUser) return;

    try {
      const res = await axios.post(`/api/chats/${selectedChat.id}/messages`, {
        senderId: currentUser.id,
        text: newMsgText
      });
      setMessages(prev => [...prev, res.data]);
      setNewMsgText("");
      // Refresh chats list to update preview text
      fetchChats();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 h-[calc(100vh-140px)] flex flex-col">
      <div className="flex-1 flex rounded-2xl overflow-hidden glass-panel border border-white/5 bg-[#02050f]/80 min-h-0">
        
        {/* Sidebar chats list */}
        <div className="w-80 border-r border-white/5 flex flex-col min-h-0">
          <div className="p-4 border-b border-white/5 shrink-0">
            <h3 className="text-sm font-bold tracking-wider text-slate-300 uppercase font-mono flex items-center gap-2">
              <MessageSquare className="h-4 w-4 text-cyan-400" />
              Direct Messages
            </h3>
          </div>

          <div className="flex-1 overflow-y-auto p-2 space-y-1">
            {chats.length > 0 ? (
              chats.map((chat) => {
                const isActive = selectedChat?.id === chat.id;
                return (
                  <button
                    key={chat.id}
                    onClick={() => setSelectedChat(chat)}
                    className={`w-full text-left p-3 rounded-xl transition-all flex items-center gap-3 border ${
                      isActive 
                        ? "bg-blue-500/10 border-cyan-500/20 text-white" 
                        : "border-transparent text-slate-400 hover:bg-white/5 hover:text-white"
                    }`}
                  >
                    <img 
                      src={chat.otherUser?.avatar} 
                      alt={chat.otherUser?.name} 
                      className="h-10 w-10 rounded-full object-cover border border-white/10 shrink-0"
                    />
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold truncate flex items-center gap-1">
                          {chat.otherUser?.name}
                          <ShieldCheck className="h-3.5 w-3.5 text-cyan-400" />
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-400 truncate mt-0.5">
                        {chat.product?.title}
                      </p>
                      <p className="text-[10px] text-slate-500 truncate mt-1 italic font-mono leading-none">
                        {chat.lastMessage || "No messages yet"}
                      </p>
                    </div>
                  </button>
                );
              })
            ) : (
              <div className="py-12 px-4 text-center space-y-2">
                <p className="text-xs text-slate-500">No active chats yet.</p>
                <p className="text-[10px] text-slate-600">Open a product details page and click 'Chat with Seller' to start trading!</p>
              </div>
            )}
          </div>
        </div>

        {/* Messaging Area */}
        <div className="flex-1 flex flex-col min-h-0 bg-[#030614]/50">
          {selectedChat ? (
            <>
              {/* Active Header */}
              <div className="p-4 border-b border-white/5 shrink-0 flex items-center justify-between bg-[#020510]">
                <div className="flex items-center gap-3">
                  <img 
                    src={selectedChat.otherUser?.avatar} 
                    alt={selectedChat.otherUser?.name} 
                    className="h-9 w-9 rounded-full object-cover border border-cyan-400"
                  />
                  <div>
                    <h4 className="text-xs font-bold text-white flex items-center gap-1">
                      {selectedChat.otherUser?.name}
                      <ShieldCheck className="h-3.5 w-3.5 text-cyan-400" />
                    </h4>
                    <p className="text-[10px] text-slate-400">{selectedChat.otherUser?.university} • {selectedChat.otherUser?.branch}</p>
                  </div>
                </div>

                {/* Listing Reference */}
                {selectedChat.product && (
                  <div className="flex items-center gap-2 border border-white/10 bg-white/5 rounded-xl px-3 py-1 text-xs">
                    <ShoppingBag className="h-3.5 w-3.5 text-cyan-300" />
                    <span className="text-slate-300 truncate max-w-xs">{selectedChat.product.title}</span>
                    <span className="text-cyan-300 font-bold font-mono ml-2">
                      {selectedChat.product.price > 0 ? `$${selectedChat.product.price}` : "Trade"}
                    </span>
                  </div>
                )}
              </div>

              {/* Chat Feed */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.map((m) => {
                  const isMe = m.senderId === currentUser?.id;
                  return (
                    <div 
                      key={m.id} 
                      className={`flex ${isMe ? "justify-end" : "justify-start"}`}
                    >
                      <div className={`max-w-md px-4 py-2.5 rounded-2xl text-xs shadow-md ${
                        isMe 
                          ? "bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-br-none" 
                          : "bg-white/5 border border-white/5 text-slate-200 rounded-bl-none"
                      }`}>
                        <p className="leading-relaxed">{m.text}</p>
                        <span className="text-[9px] text-white/40 block mt-1 text-right font-mono leading-none">
                          {new Date(m.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Message Input Form */}
              <form onSubmit={handleSendMessage} className="p-4 border-t border-white/5 shrink-0 flex gap-2">
                <input 
                  type="text" 
                  placeholder="Type a safe, collegiate message..." 
                  value={newMsgText}
                  onChange={(e) => setNewMsgText(e.target.value)}
                  className="flex-1 px-4 py-3 rounded-xl border border-white/5 bg-[#02050f] text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-cyan-500/30 transition-all"
                  required
                />
                <button 
                  type="submit" 
                  className="px-4 rounded-xl bg-gradient-to-r from-blue-500 to-cyan-500 hover:opacity-95 text-white flex items-center justify-center transition-all"
                >
                  <Send className="h-4 w-4" />
                </button>
              </form>
            </>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center text-center p-6 space-y-3">
              <MessageSquare className="h-12 w-12 text-slate-700" />
              <h3 className="text-sm font-bold text-slate-300 uppercase tracking-widest font-mono">Select a Chat</h3>
              <p className="text-xs text-slate-500 max-w-xs">Pick a campus discussion thread from the list to start exchanging deals safely.</p>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};
export default ChatPage;
