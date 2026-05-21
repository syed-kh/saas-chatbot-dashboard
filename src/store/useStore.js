import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { ref, push, set } from 'firebase/database'
import { database } from '../lib/firebase'

export const useStore = create(
  persist(
    (set) => ({
      sidebarOpen: true,
      toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),
      
      activeModel: 'GPT-4o',
      setActiveModel: (model) => set({ activeModel: model }),
      
      authUser: null,
      setAuthUser: (user) => set({ authUser: user }),
      
      userProfile: {
        name: 'Arjun Dev',
        email: 'arjun.dev@example.com',
        avatarUrl: 'https://i.pravatar.cc/150?u=arjun',
        plan: 'Pro'
      },
      updateUserProfile: (updates) => set((state) => ({ userProfile: { ...state.userProfile, ...updates } })),
      
      chats: [
        { id: '1', title: 'Build SaaS Dashboard', date: '10:42 AM', group: 'Today' },
        { id: '2', title: 'API Integration Help', date: '09:15 AM', group: 'Today' },
        { id: '3', title: 'Code Review Request', date: '08:47 AM', group: 'Today' },
        { id: '4', title: 'Database Schema Design', date: 'Yesterday', group: 'Yesterday' },
        { id: '5', title: 'Authentication Flow', date: 'Yesterday', group: 'Yesterday' },
        { id: '6', title: 'UI/UX Feedback', date: '3 days ago', group: 'Previous 7 Days' },
        { id: '7', title: 'Performance Optimization', date: '5 days ago', group: 'Previous 7 Days' },
        { id: '8', title: 'Websocket Implementation', date: '7 days ago', group: 'Previous 7 Days' },
      ],
      activeChatId: '1',
      setActiveChat: (id) => set({ activeChatId: id }),

      messages: [
        {
          id: 'm1',
          chatId: '1',
          role: 'user',
          content: 'I want you to build a modern SaaS dashboard using React and Tailwind.',
          timestamp: '10:42 AM'
        },
        {
          id: 'm2',
          chatId: '1',
          role: 'assistant',
          content: `I'll help you build a modern SaaS dashboard using React and Tailwind CSS.
Here's a complete example with a beautiful, responsive design.

\`\`\`jsx
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'Mon', users: 400, revenue: 2400},
  { name: 'Tue', users: 300, revenue: 1398},
  { name: 'Wed', users: 200, revenue: 9800},
  { name: 'Thu', users: 278, revenue: 3908},
  { name: 'Fri', users: 189, revenue: 4800},
  { name: 'Sat', users: 239, revenue: 3800},
  { name: 'Sun', users: 349, revenue: 4300},
];

export default function Dashboard() {
  return (
    <div className="p-6 space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3">
        <Card className="b">
          <CardHeader>
            <CardTitle className="text-3xl font-bold text-white">12,450</CardTitle>
          </CardHeader>
        </Card>
        {/* More cards... */}
      </div>
    </div>
  );
}
\`\`\`

This dashboard includes modern components, charts, and a responsive design.
Would you like me to add authentication and API integration as well?`,
          timestamp: '10:42 AM'
        }
      ],
      
      addMessage: (message) => set((state) => {
        // Push message to Firebase RTDB in the background
        const messagesRef = ref(database, `chats/${message.chatId}/messages/${message.id}`);
        set(messagesRef, message).catch(err => console.error("Firebase sync error:", err));
        
        return { messages: [...state.messages, message] };
      }),
      
      updateStreamingMessage: (id, chunk) => set((state) => ({
        messages: state.messages.map(msg => 
          msg.id === id ? { ...msg, content: msg.content + chunk } : msg
        )
      })),

      isTyping: false,
      setIsTyping: (typing) => set({ isTyping: typing }),
    }),
    {
      name: 'saas-chat-storage',
    }
  )
)
