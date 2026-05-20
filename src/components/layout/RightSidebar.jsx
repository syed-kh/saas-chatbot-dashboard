import { Bell, ChevronDown } from 'lucide-react';
import { LineChart, Line, BarChart, Bar, XAxis, ResponsiveContainer, Tooltip } from 'recharts';
import { useStore } from '@/store/useStore';

const tokenData = [
  { name: 'Mon', value: 40 },
  { name: 'Tue', value: 30 },
  { name: 'Wed', value: 80 },
  { name: 'Thu', value: 40 },
  { name: 'Fri', value: 60 },
  { name: 'Sat', value: 50 },
  { name: 'Sun', value: 90 },
];

const costData = [
  { name: '1', value: 20 },
  { name: '2', value: 25 },
  { name: '3', value: 22 },
  { name: '4', value: 30 },
  { name: '5', value: 28 },
  { name: '6', value: 35 },
  { name: '7', value: 33 },
];

export default function RightSidebar() {
  const { activeModel } = useStore();

  return (
    <div className="w-80 h-full bg-background border-l border-secondary flex flex-col overflow-y-auto hidden lg:flex">
      {/* Header */}
      <div className="p-4 flex items-center justify-end gap-4 border-b border-secondary/50">
        <button className="text-text-muted hover:text-text-main relative">
          <Bell className="w-5 h-5" />
          <span className="absolute top-0 right-0 w-2 h-2 bg-green-500 rounded-full"></span>
        </button>
        <img src="https://i.pravatar.cc/150?u=dev" alt="User" className="w-8 h-8 rounded-full border border-secondary" />
      </div>

      <div className="p-5 space-y-6">
        {/* Title & Status */}
        <div className="flex items-center justify-between">
          <h2 className="font-semibold text-text-main">Analytics Overview</h2>
          <div className="flex items-center gap-1.5 text-xs text-green-400 bg-green-400/10 px-2 py-1 rounded-full">
            <span className="w-1.5 h-1.5 bg-green-400 rounded-full"></span>
            Live
          </div>
        </div>

        {/* Active Model Card */}
        <div className="bg-card p-4 rounded-xl border border-secondary">
          <div className="text-sm text-text-muted mb-3">Active Model</div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center">
                <svg className="w-6 h-6 text-text-main" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
                </svg>
              </div>
              <div>
                <div className="font-medium text-text-main">{activeModel}</div>
                <div className="text-xs text-text-muted">128K context window</div>
              </div>
            </div>
            <div className="flex flex-col items-end gap-2">
              <button className="text-xs px-3 py-1.5 rounded-lg border border-secondary hover:bg-secondary transition-colors">
                Change
              </button>
              <span className="text-[10px] text-green-400 bg-green-400/10 px-1.5 py-0.5 rounded">Optimal</span>
            </div>
          </div>
        </div>

        {/* Token Usage Card */}
        <div className="bg-card p-4 rounded-xl border border-secondary">
          <div className="flex items-center justify-between mb-4">
            <div className="text-sm text-text-muted">Token Usage</div>
            <button className="text-xs flex items-center gap-1 text-text-muted hover:text-text-main">
              This Week <ChevronDown className="w-3 h-3" />
            </button>
          </div>
          
          <div className="mb-4">
            <div className="flex items-end gap-2 mb-1">
              <span className="text-2xl font-semibold text-text-main">1.42M</span>
              <span className="text-xs text-text-muted mb-1">/ 2M tokens</span>
              <span className="text-xs text-primary ml-auto mb-1">71%</span>
            </div>
            <div className="h-2 bg-secondary rounded-full overflow-hidden">
              <div className="h-full bg-primary rounded-full w-[71%] relative">
                 <div className="absolute top-0 right-0 bottom-0 left-0 bg-gradient-to-r from-transparent to-white/20"></div>
              </div>
            </div>
          </div>

          <div className="h-32 mt-4">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={tokenData}>
                <Tooltip 
                  cursor={{ fill: 'rgba(255,255,255,0.05)' }}
                  contentStyle={{ backgroundColor: '#111827', borderColor: '#1F2937' }}
                />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#9CA3AF' }} dy={10} />
                <Bar dataKey="value" fill="#6D28D9" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Small Stats Grid */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-card p-4 rounded-xl border border-secondary">
            <div className="text-xs text-text-muted mb-2">Avg. Response Time</div>
            <div className="flex items-end justify-between">
              <div className="text-lg font-semibold text-text-main">1.24s</div>
              <div className="text-xs text-green-400">-12%</div>
            </div>
            <div className="h-8 mt-2">
               <ResponsiveContainer width="100%" height="100%">
                <LineChart data={costData}>
                  <Line type="monotone" dataKey="value" stroke="#6D28D9" strokeWidth={2} dot={false} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
          
          <div className="bg-card p-4 rounded-xl border border-secondary">
            <div className="text-xs text-text-muted mb-2">Total Requests</div>
            <div className="flex items-end justify-between">
              <div className="text-lg font-semibold text-text-main">356</div>
              <div className="text-xs text-green-400">+8%</div>
            </div>
            <div className="h-8 mt-2">
               <ResponsiveContainer width="100%" height="100%">
                <LineChart data={costData.map(d => ({...d, value: 50 - d.value}))}>
                  <Line type="monotone" dataKey="value" stroke="#6D28D9" strokeWidth={2} dot={false} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* API Cost Card */}
        <div className="bg-card p-4 rounded-xl border border-secondary">
          <div className="text-sm text-text-muted mb-2">API Cost</div>
          <div className="flex items-end gap-3 mb-4">
            <div className="text-2xl font-semibold text-text-main">$23.45</div>
            <div className="text-xs text-green-400 mb-1">-5.2%</div>
          </div>
          <div className="h-16">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={costData}>
                <Line type="monotone" dataKey="value" stroke="#3B82F6" strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Top Endpoints */}
        <div className="bg-card p-4 rounded-xl border border-secondary">
          <div className="text-sm text-text-muted mb-4">Top Endpoints</div>
          <div className="space-y-4">
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs">
                <span className="text-text-main">/api/chat/completions</span>
                <span className="text-text-muted">1.24M</span>
              </div>
              <div className="h-1 bg-secondary rounded-full">
                <div className="h-full bg-primary rounded-full w-[85%]"></div>
              </div>
            </div>
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs">
                <span className="text-text-main">/api/embeddings</span>
                <span className="text-text-muted">145K</span>
              </div>
              <div className="h-1 bg-secondary rounded-full">
                <div className="h-full bg-primary/70 rounded-full w-[35%]"></div>
              </div>
            </div>
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs">
                <span className="text-text-main">/api/models</span>
                <span className="text-text-muted">32K</span>
              </div>
              <div className="h-1 bg-secondary rounded-full">
                <div className="h-full bg-primary/40 rounded-full w-[15%]"></div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
