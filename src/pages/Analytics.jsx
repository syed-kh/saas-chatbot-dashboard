import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, LineChart, Line, AreaChart, Area, PieChart, Pie, Cell, Legend
} from 'recharts';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Activity, Users, MessageSquare, Clock, TrendingUp, TrendingDown, Zap, DollarSign } from 'lucide-react';
import { motion } from 'framer-motion';
import { useState } from 'react';

const weeklyTokens = [
  { name: 'Mon', tokens: 42000, requests: 312 },
  { name: 'Tue', tokens: 31000, requests: 278 },
  { name: 'Wed', tokens: 98000, requests: 541 },
  { name: 'Thu', tokens: 39000, requests: 389 },
  { name: 'Fri', tokens: 48000, requests: 421 },
  { name: 'Sat', tokens: 38000, requests: 302 },
  { name: 'Sun', tokens: 43000, requests: 356 },
];

const monthlyTokens = [
  { name: 'Jan', tokens: 320000, requests: 2100 },
  { name: 'Feb', tokens: 420000, requests: 2800 },
  { name: 'Mar', tokens: 380000, requests: 2500 },
  { name: 'Apr', tokens: 510000, requests: 3200 },
  { name: 'May', tokens: 620000, requests: 3900 },
  { name: 'Jun', tokens: 480000, requests: 3100 },
];

const latencyData = [
  { time: '10:00', ms: 240 }, { time: '11:00', ms: 139 }, { time: '12:00', ms: 320 },
  { time: '13:00', ms: 390 }, { time: '14:00', ms: 280 }, { time: '15:00', ms: 180 },
  { time: '16:00', ms: 430 }, { time: '17:00', ms: 210 }, { time: '18:00', ms: 150 },
];

const modelUsage = [
  { name: 'GPT-4o', value: 4200000, color: '#3B82F6' },
  { name: 'Claude 3.5', value: 1800000, color: '#8B5CF6' },
  { name: 'Gemini Pro', value: 500000, color: '#10B981' },
];

const costTrend = [
  { day: '1', cost: 2.1 }, { day: '5', cost: 3.2 }, { day: '10', cost: 5.8 },
  { day: '15', cost: 8.4 }, { day: '20', cost: 12.1 }, { day: '25', cost: 18.7 },
  { day: '30', cost: 23.45 },
];

const TOOLTIP_STYLE = {
  contentStyle: { backgroundColor: '#111827', border: '1px solid #1F2937', borderRadius: '8px', color: '#F3F4F6' },
  itemStyle: { color: '#E0E0E0' },
  cursor: { fill: 'rgba(255,255,255,0.04)' },
};

const containerVariants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.07 } }
};
const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
};

function StatCard({ label, value, sub, subPositive, icon: Icon, iconColor, gradient }) {
  return (
    <motion.div variants={itemVariants}>
      <Card className={`bg-card border-secondary relative overflow-hidden`}>
        {gradient && (
          <div className={`absolute inset-0 opacity-5 ${gradient}`} />
        )}
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium text-text-muted">{label}</CardTitle>
          <div className={`w-9 h-9 rounded-lg flex items-center justify-center ${iconColor}`}>
            <Icon className="w-4 h-4" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-text-main">{value}</div>
          <p className={`text-xs mt-1 flex items-center gap-1 ${subPositive ? 'text-emerald-400' : 'text-red-400'}`}>
            {subPositive ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
            {sub}
          </p>
        </CardContent>
      </Card>
    </motion.div>
  );
}

export default function Analytics() {
  const [range, setRange] = useState('week');

  const chartData = range === 'week' ? weeklyTokens : monthlyTokens;
  const chartKey = range === 'week' ? 'name' : 'name';

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="show"
      className="p-6 lg:p-8 space-y-8 max-w-7xl mx-auto w-full"
    >
      {/* Header */}
      <motion.div variants={itemVariants} className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-text-main tracking-tight">Analytics Dashboard</h1>
          <p className="text-text-muted mt-1">Track your AI usage, costs, and performance.</p>
        </div>
        <div className="flex items-center gap-2 bg-secondary/60 p-1 rounded-lg border border-secondary">
          {['week', 'month'].map((r) => (
            <button
              key={r}
              onClick={() => setRange(r)}
              className={`px-4 py-1.5 rounded-md text-sm font-medium capitalize transition-all ${
                range === r
                  ? 'bg-primary text-white shadow-lg shadow-primary/20'
                  : 'text-text-muted hover:text-text-main'
              }`}
            >
              {r === 'week' ? 'This Week' : 'This Month'}
            </button>
          ))}
        </div>
      </motion.div>

      {/* Stat Cards */}
      <motion.div variants={containerVariants} className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
        <StatCard
          label="Total Messages" value="1,234" sub="+12% from last month" subPositive
          icon={MessageSquare} iconColor="bg-primary/10 text-primary"
        />
        <StatCard
          label="Tokens Used" value="1.42M" sub="+18% from last month" subPositive
          icon={Zap} iconColor="bg-blue-500/10 text-blue-400"
        />
        <StatCard
          label="Avg. Latency" value="342ms" sub="+2% slower this week" subPositive={false}
          icon={Clock} iconColor="bg-yellow-500/10 text-yellow-400"
        />
        <StatCard
          label="API Cost (MTD)" value="$23.45" sub="-5.2% vs last month" subPositive
          icon={DollarSign} iconColor="bg-emerald-500/10 text-emerald-400"
        />
      </motion.div>

      {/* Charts Row 1 */}
      <motion.div variants={containerVariants} className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div variants={itemVariants}>
          <Card className="bg-card border-secondary">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-text-main">Token Usage</CardTitle>
              <span className="text-xs text-text-muted bg-secondary px-2 py-1 rounded">Tokens / Requests</span>
            </CardHeader>
            <CardContent className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData} barGap={4}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1F2937" vertical={false} />
                  <XAxis dataKey={chartKey} stroke="#6b7280" fontSize={11} tickLine={false} axisLine={false} />
                  <YAxis stroke="#6b7280" fontSize={11} tickLine={false} axisLine={false} tickFormatter={(v) => v >= 1000 ? `${v/1000}k` : v} />
                  <Tooltip {...TOOLTIP_STYLE} formatter={(v, name) => [name === 'tokens' ? `${(v/1000).toFixed(1)}k` : v, name === 'tokens' ? 'Tokens' : 'Requests']} />
                  <Bar dataKey="tokens" fill="#6D28D9" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="requests" fill="#3B82F6" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div variants={itemVariants}>
          <Card className="bg-card border-secondary">
            <CardHeader>
              <CardTitle className="text-text-main">API Latency (ms)</CardTitle>
            </CardHeader>
            <CardContent className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={latencyData}>
                  <defs>
                    <linearGradient id="colorMs" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10B981" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#10B981" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1F2937" vertical={false} />
                  <XAxis dataKey="time" stroke="#6b7280" fontSize={11} tickLine={false} axisLine={false} />
                  <YAxis stroke="#6b7280" fontSize={11} tickLine={false} axisLine={false} />
                  <Tooltip {...TOOLTIP_STYLE} formatter={(v) => [`${v}ms`, 'Latency']} />
                  <Area type="monotone" dataKey="ms" stroke="#10B981" strokeWidth={2} fillOpacity={1} fill="url(#colorMs)" />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>

      {/* Charts Row 2 */}
      <motion.div variants={containerVariants} className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Model Usage Pie */}
        <motion.div variants={itemVariants}>
          <Card className="bg-card border-secondary h-full">
            <CardHeader>
              <CardTitle className="text-text-main">Usage by Model</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-52">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={modelUsage} cx="50%" cy="50%" innerRadius={55} outerRadius={80} dataKey="value" paddingAngle={3}>
                      {modelUsage.map((entry, i) => <Cell key={i} fill={entry.color} />)}
                    </Pie>
                    <Tooltip
                      contentStyle={{ backgroundColor: '#111827', border: '1px solid #1F2937', borderRadius: '8px' }}
                      formatter={(v) => [`${(v/1000000).toFixed(1)}M tokens`]}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="space-y-3 mt-2">
                {modelUsage.map((m) => (
                  <div key={m.name} className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: m.color }} />
                      <span className="text-text-main">{m.name}</span>
                    </div>
                    <span className="text-text-muted">{(m.value / 1000000).toFixed(1)}M</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Cost Trend */}
        <motion.div variants={itemVariants} className="lg:col-span-2">
          <Card className="bg-card border-secondary h-full">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-text-main">API Cost Trend (This Month)</CardTitle>
              <span className="text-2xl font-bold text-text-main">$23.45</span>
            </CardHeader>
            <CardContent className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={costTrend}>
                  <defs>
                    <linearGradient id="colorCost" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.25} />
                      <stop offset="95%" stopColor="#3B82F6" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1F2937" vertical={false} />
                  <XAxis dataKey="day" stroke="#6b7280" fontSize={11} tickLine={false} axisLine={false} label={{ value: 'Day', position: 'insideBottomRight', offset: -5, fill: '#6b7280', fontSize: 10 }} />
                  <YAxis stroke="#6b7280" fontSize={11} tickLine={false} axisLine={false} tickFormatter={(v) => `$${v}`} />
                  <Tooltip {...TOOLTIP_STYLE} formatter={(v) => [`$${v.toFixed(2)}`, 'Cumulative Cost']} />
                  <Area type="monotone" dataKey="cost" stroke="#3B82F6" strokeWidth={2} fillOpacity={1} fill="url(#colorCost)" />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>

      {/* Top Endpoints Table */}
      <motion.div variants={itemVariants}>
        <Card className="bg-card border-secondary">
          <CardHeader>
            <CardTitle className="text-text-main">Top API Endpoints</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-secondary text-text-muted">
                    <th className="text-left py-3 pr-4 font-medium">Endpoint</th>
                    <th className="text-right py-3 px-4 font-medium">Requests</th>
                    <th className="text-right py-3 px-4 font-medium">Avg Latency</th>
                    <th className="text-right py-3 px-4 font-medium">Error Rate</th>
                    <th className="text-left py-3 pl-4 font-medium w-32">Traffic</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-secondary/50">
                  {[
                    { path: '/api/chat/completions', requests: '1.24M', latency: '342ms', error: '0.12%', pct: 85, color: 'bg-primary' },
                    { path: '/api/embeddings', requests: '145K', latency: '89ms', error: '0.02%', pct: 35, color: 'bg-blue-500' },
                    { path: '/api/models', requests: '32K', latency: '45ms', error: '0.00%', pct: 15, color: 'bg-emerald-500' },
                    { path: '/api/images/generations', requests: '18K', latency: '2.1s', error: '0.55%', pct: 8, color: 'bg-yellow-500' },
                  ].map((row) => (
                    <tr key={row.path} className="hover:bg-secondary/30 transition-colors">
                      <td className="py-3 pr-4 font-mono text-xs text-text-main">{row.path}</td>
                      <td className="py-3 px-4 text-right text-text-muted">{row.requests}</td>
                      <td className="py-3 px-4 text-right text-text-muted">{row.latency}</td>
                      <td className="py-3 px-4 text-right text-text-muted">{row.error}</td>
                      <td className="py-3 pl-4">
                        <div className="h-1.5 bg-secondary rounded-full">
                          <div className={`h-full rounded-full ${row.color}`} style={{ width: `${row.pct}%` }} />
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  );
}
