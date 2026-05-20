import { useEffect, useRef } from 'react';
import { ChevronDown, MoreHorizontal } from 'lucide-react';
import { useStore } from '@/store/useStore';
import ChatMessage from './ChatMessage';
import ChatInput from './ChatInput';

export default function ChatArea() {
  const { messages, activeChatId, activeModel } = useStore();
  const messagesEndRef = useRef(null);

  const activeMessages = messages.filter(m => m.chatId === activeChatId);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [activeMessages]);

  return (
    <div className="flex-1 flex flex-col h-full bg-background relative overflow-hidden">
      {/* Header */}
      <div className="h-16 border-b border-secondary/50 flex items-center justify-between px-6 bg-background/80 backdrop-blur-md sticky top-0 z-10">
        <div className="flex items-center gap-4">
          <h1 className="text-lg font-semibold text-text-main flex items-center gap-2">
            Build SaaS Dashboard
            <button className="text-text-muted hover:text-text-main">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
              </svg>
            </button>
          </h1>
        </div>
        
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-secondary bg-card text-sm text-text-main hover:bg-secondary transition-colors">
            <div className="w-2 h-2 rounded-full bg-green-500"></div>
            {activeModel}
            <ChevronDown className="w-4 h-4 text-text-muted ml-2" />
          </button>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-6 py-8 custom-scrollbar">
        <div className="space-y-8 max-w-4xl mx-auto">
          {activeMessages.map((msg) => (
            <ChatMessage key={msg.id} message={msg} />
          ))}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Input */}
      <ChatInput />
    </div>
  );
}
