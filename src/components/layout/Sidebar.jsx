import { MessageSquare, Search, Plus, BarChart2, Activity, Settings, ChevronDown, User, Home } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { useStore } from '@/store/useStore';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

export default function Sidebar() {
  const { sidebarOpen, chats, activeChatId, setActiveChat, userProfile } = useStore();
  const location = useLocation();

  if (!sidebarOpen) return null;

  const groupedChats = chats.reduce((acc, chat) => {
    if (!acc[chat.group]) acc[chat.group] = [];
    acc[chat.group].push(chat);
    return acc;
  }, {});

  return (
    <motion.div 
      initial={{ x: -300 }}
      animate={{ x: 0 }}
      exit={{ x: -300 }}
      className="w-64 h-full bg-card border-r border-secondary flex flex-col flex-shrink-0"
    >
      {/* Header */}
      <div className="p-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
            <div className="w-4 h-4 bg-white rounded-sm transform rotate-45" />
          </div>
          <span className="font-semibold text-lg text-text-main">Nova AI <span className="text-xs bg-primary/20 text-primary px-1.5 py-0.5 rounded ml-1">Pro</span></span>
        </div>
        <button className="text-text-muted hover:text-text-main">
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>

      {/* New Chat Button */}
      <div className="px-4 mb-4">
        <button className="w-full bg-primary hover:bg-primary/90 text-white rounded-lg py-2.5 px-4 flex items-center justify-between transition-colors shadow-lg shadow-primary/20">
          <div className="flex items-center gap-2">
            <Plus className="w-5 h-5" />
            <span className="font-medium">New Chat</span>
          </div>
          <span className="text-xs text-white/70 bg-white/10 px-1.5 py-0.5 rounded">⌘ K</span>
        </button>
      </div>

      {/* Search */}
      <div className="px-4 mb-4">
        <div className="relative">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" />
          <input 
            type="text" 
            placeholder="Search chats..." 
            className="w-full bg-secondary border border-secondary text-sm rounded-lg pl-9 pr-4 py-2 focus:outline-none focus:ring-1 focus:ring-primary text-text-main placeholder-text-muted transition-shadow"
          />
        </div>
      </div>

      {/* Chat History List */}
      <div className="flex-1 overflow-y-auto px-2 space-y-4">
        {Object.entries(groupedChats).map(([group, groupChats]) => (
          <div key={group}>
            <div className="px-3 mb-2 text-xs font-medium text-text-muted uppercase tracking-wider">{group}</div>
            <div className="space-y-0.5">
              {groupChats.map(chat => (
                <button
                  key={chat.id}
                  onClick={() => setActiveChat(chat.id)}
                  className={cn(
                    "w-full flex items-start gap-3 p-3 rounded-lg text-left transition-colors",
                    activeChatId === chat.id 
                      ? "bg-primary/10 text-primary" 
                      : "text-text-muted hover:bg-secondary hover:text-text-main"
                  )}
                >
                  <MessageSquare className="w-4 h-4 mt-0.5 flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <div className={cn("text-sm truncate", activeChatId === chat.id && "font-medium")}>
                      {chat.title}
                    </div>
                    <div className="text-xs mt-1 opacity-70">
                      {chat.title.substring(0, 25)}...
                    </div>
                  </div>
                  <div className="text-xs opacity-50 whitespace-nowrap">
                    {chat.date}
                  </div>
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Bottom Nav */}
      <div className="p-2 border-t border-secondary mt-auto space-y-1">
        <Link to="/" className={cn("w-full flex items-center gap-3 p-2 rounded-lg transition-colors text-sm", location.pathname === '/' ? "bg-secondary text-text-main" : "text-text-muted hover:bg-secondary hover:text-text-main")}>
          <Home className="w-4 h-4" />
          Chat
        </Link>
        <Link to="/analytics" className={cn("w-full flex items-center gap-3 p-2 rounded-lg transition-colors text-sm", location.pathname === '/analytics' ? "bg-secondary text-text-main" : "text-text-muted hover:bg-secondary hover:text-text-main")}>
          <BarChart2 className="w-4 h-4" />
          Analytics
        </Link>
        <Link to="/api-usage" className={cn("w-full flex items-center gap-3 p-2 rounded-lg transition-colors text-sm", location.pathname === '/api-usage' ? "bg-secondary text-text-main" : "text-text-muted hover:bg-secondary hover:text-text-main")}>
          <Activity className="w-4 h-4" />
          API Usage
        </Link>
        <Link to="/settings" className={cn("w-full flex items-center gap-3 p-2 rounded-lg transition-colors text-sm", location.pathname === '/settings' ? "bg-secondary text-text-main" : "text-text-muted hover:bg-secondary hover:text-text-main")}>
          <Settings className="w-4 h-4" />
          Settings
        </Link>
        <Link to="/profile" className={cn("w-full flex items-center gap-3 p-2 rounded-lg transition-colors text-sm", location.pathname === '/profile' ? "bg-secondary text-text-main" : "text-text-muted hover:bg-secondary hover:text-text-main")}>
          <User className="w-4 h-4" />
          Profile
        </Link>
      </div>

      {/* User Profile */}
      <Link to="/profile" className={cn("p-4 border-t border-secondary flex items-center justify-between cursor-pointer transition-colors block w-full text-left", location.pathname === '/profile' ? "bg-secondary/50" : "hover:bg-secondary/50")}>
        <div className="flex items-center gap-3">
          <img src={userProfile.avatarUrl} alt="User" className="w-8 h-8 rounded-full object-cover" />
          <div className="flex flex-col">
            <span className="text-sm font-medium text-text-main flex items-center gap-1">
              {userProfile.name} <span className="text-[10px] bg-primary/20 text-primary px-1 rounded">{userProfile.plan}</span>
            </span>
            <span className="text-xs text-text-muted">{userProfile.email}</span>
          </div>
        </div>
        <ChevronDown className="w-4 h-4 text-text-muted" />
      </Link>

    </motion.div>
  );
}
