import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { motion } from 'framer-motion';
import {
  AreaChart, Area, ResponsiveContainer, Tooltip, XAxis, YAxis, CartesianGrid,
  PieChart, Pie, Cell
} from 'recharts';
import { Zap, TrendingUp, AlertCircle, RefreshCcw, Download, CheckCircle } from 'lucide-react';

const containerVariants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.07 } }
};
const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
};

const TOOLTIP_STYLE = {
  contentStyle: { backgroundColor: '#111827', border: '1px solid #1F2937', borderRadius: '8px' },
  itemStyle: { color: '#E0E0E0' },
};

const dailyCostData = [
  { day: 'Mon', cost: 2.1 }, { day: 'Tue', cost: 3.4 }, { day: 'Wed', cost: 5.8 },
  { day: 'Thu', cost: 4.2 }, { day: 'Fri', cost: 6.1 }, { day: 'Sat', cost: 1.8 },
  { day: 'Sun', cost: 3.0 },
];

const modelData = [
  { name: 'GPT-4o', tokens: 4200000, cost: 14.70, color: '#3B82F6', pct: 64 },
  { name: 'Claude 3.5 Sonnet', tokens: 1800000, cost: 7.02, color: '#8B5CF6', pct: 28 },
  { name: 'Gemini 1.5 Pro', tokens: 500000, cost: 1.73, color: '#10B981', pct: 8 },
];

const invoices = [
  { date: 'May 1, 2026', amount: '$23.45', status: 'Current', tokens: '1.42M' },
  { date: 'Apr 1, 2026', amount: '$31.20', status: 'Paid', tokens: '2.01M' },
  { date: 'Mar 1, 2026', amount: '$18.90', status: 'Paid', tokens: '1.18M' },
  { date: 'Feb 1, 2026', amount: '$27.60', status: 'Paid', tokens: '1.74M' },
];

export default function ApiUsage() {
  const usagePercentage = 71;
  const [billingCycle] = useState('May 1 – May 31, 2026');

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="show"
      className="p-6 lg:p-8 max-w-5xl mx-auto w-full space-y-6"
    >
      {/* Header */}
      <motion.div variants={itemVariants} className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-text-main tracking-tight">API Usage & Billing</h1>
          <p className="text-text-muted mt-1">Cycle: {billingCycle}</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 text-sm border border-secondary rounded-lg text-text-muted hover:bg-secondary hover:text-text-main transition-colors self-start">
          <RefreshCcw className="w-4 h-4" /> Refresh
        </button>
      </motion.div>

      {/* Token Quota */}
      <motion.div variants={itemVariants}>
        <Card className="bg-card border-secondary overflow-hidden">
          <CardContent className="p-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
              <div>
                <div className="text-sm text-text-muted mb-1">Monthly Token Quota</div>
                <div className="flex items-end gap-3">
                  <span className="text-3xl font-bold text-text-main">1.42M</span>
                  <span className="text-text-muted mb-1">/ 2M tokens</span>
                  <span className={`text-sm font-semibold mb-1 ${usagePercentage > 80 ? 'text-red-400' : 'text-primary'}`}>
                    {usagePercentage}%
                  </span>
                </div>
              </div>
              <div className="text-right">
                <div className="text-xs text-text-muted">Resets in</div>
                <div className="text-lg font-bold text-text-main">12 days</div>
              </div>
            </div>

            {/* Progress */}
            <div className="h-3 w-full bg-secondary rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${usagePercentage}%` }}
                transition={{ duration: 1.2, ease: 'easeOut' }}
                className={`h-full rounded-full ${usagePercentage > 80 ? 'bg-red-500' : 'bg-gradient-to-r from-primary to-accent'}`}
              />
            </div>
            <div className="flex justify-between text-xs text-text-muted mt-2">
              <span>0</span>
              <span>500K</span>
              <span>1M</span>
              <span>1.5M</span>
              <span>2M</span>
            </div>

            {usagePercentage > 70 && (
              <div className="mt-4 p-3 bg-yellow-500/10 border border-yellow-500/20 rounded-lg flex items-center gap-3">
                <AlertCircle className="w-4 h-4 text-yellow-400 flex-shrink-0" />
                <span className="text-sm text-yellow-300">You've used {usagePercentage}% of your monthly quota. Consider upgrading your plan.</span>
              </div>
            )}
          </CardContent>
        </Card>
      </motion.div>

      {/* Cost + Model breakdown */}
      <motion.div variants={itemVariants} className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Daily Cost Chart */}
        <Card className="bg-card border-secondary">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-text-main">Daily Spend</CardTitle>
            <span className="text-xl font-bold text-text-main">$26.45</span>
          </CardHeader>
          <CardContent className="h-52">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={dailyCostData}>
                <defs>
                  <linearGradient id="colorCostG" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6D28D9" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#6D28D9" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#1F2937" vertical={false} />
                <XAxis dataKey="day" stroke="#6b7280" fontSize={11} tickLine={false} axisLine={false} />
                <YAxis stroke="#6b7280" fontSize={11} tickLine={false} axisLine={false} tickFormatter={(v) => `$${v}`} />
                <Tooltip {...TOOLTIP_STYLE} formatter={(v) => [`$${v.toFixed(2)}`, 'Cost']} />
                <Area type="monotone" dataKey="cost" stroke="#6D28D9" strokeWidth={2} fillOpacity={1} fill="url(#colorCostG)" />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Usage by Model */}
        <Card className="bg-card border-secondary">
          <CardHeader>
            <CardTitle className="text-text-main">Usage by Model</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-4 mb-4">
              <div className="w-24 h-24">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={modelData} cx="50%" cy="50%" innerRadius={28} outerRadius={45} dataKey="pct" paddingAngle={3}>
                      {modelData.map((entry, i) => <Cell key={i} fill={entry.color} />)}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="flex-1 space-y-3">
                {modelData.map((m) => (
                  <div key={m.name}>
                    <div className="flex items-center justify-between text-xs mb-1">
                      <span className="flex items-center gap-1.5 text-text-main">
                        <span className="w-2 h-2 rounded-full" style={{ backgroundColor: m.color }} />
                        {m.name}
                      </span>
                      <span className="text-text-muted">{m.pct}%</span>
                    </div>
                    <div className="h-1.5 bg-secondary rounded-full overflow-hidden">
                      <div className="h-full rounded-full" style={{ width: `${m.pct}%`, backgroundColor: m.color }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="pt-4 border-t border-secondary space-y-2">
              {modelData.map((m) => (
                <div key={m.name} className="flex items-center justify-between text-sm">
                  <span className="text-text-muted">{m.name}</span>
                  <div className="flex items-center gap-4">
                    <span className="text-text-muted text-xs">{(m.tokens / 1000000).toFixed(1)}M tokens</span>
                    <span className="text-text-main font-medium w-14 text-right">${m.cost.toFixed(2)}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Rate Limits */}
      <motion.div variants={itemVariants}>
        <Card className="bg-card border-secondary">
          <CardHeader>
            <CardTitle className="text-text-main">Rate Limits</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {[
                { label: 'Requests / minute', used: 42, limit: 60, color: 'bg-emerald-500' },
                { label: 'Tokens / minute', used: 68000, limit: 100000, color: 'bg-primary' },
                { label: 'Requests / day', used: 356, limit: 1000, color: 'bg-blue-500' },
              ].map((item) => {
                const pct = Math.round((item.used / item.limit) * 100);
                return (
                  <div key={item.label} className="bg-secondary/40 rounded-xl p-4">
                    <div className="text-xs text-text-muted mb-2">{item.label}</div>
                    <div className="flex items-end justify-between mb-2">
                      <span className="text-lg font-semibold text-text-main">
                        {item.used >= 1000 ? `${(item.used / 1000).toFixed(0)}K` : item.used}
                      </span>
                      <span className="text-xs text-text-muted">
                        / {item.limit >= 1000 ? `${(item.limit / 1000).toFixed(0)}K` : item.limit}
                      </span>
                    </div>
                    <div className="h-1.5 bg-secondary rounded-full overflow-hidden">
                      <div className={`h-full rounded-full ${item.color}`} style={{ width: `${pct}%` }} />
                    </div>
                    <div className="text-xs text-text-muted mt-1.5 text-right">{pct}% used</div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Invoices */}
      <motion.div variants={itemVariants}>
        <Card className="bg-card border-secondary">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-text-main">Billing History</CardTitle>
            <button className="flex items-center gap-1.5 text-sm text-text-muted hover:text-text-main transition-colors">
              <Download className="w-4 h-4" /> Export
            </button>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-secondary text-text-muted">
                    <th className="text-left py-3 pr-4 font-medium">Date</th>
                    <th className="text-right py-3 px-4 font-medium">Tokens</th>
                    <th className="text-right py-3 px-4 font-medium">Amount</th>
                    <th className="text-right py-3 pl-4 font-medium">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-secondary/50">
                  {invoices.map((inv) => (
                    <tr key={inv.date} className="hover:bg-secondary/30 transition-colors">
                      <td className="py-3 pr-4 text-text-main">{inv.date}</td>
                      <td className="py-3 px-4 text-right text-text-muted">{inv.tokens}</td>
                      <td className="py-3 px-4 text-right text-text-main font-medium">{inv.amount}</td>
                      <td className="py-3 pl-4 text-right">
                        <span className={`inline-flex items-center gap-1 text-xs px-2 py-0.5 rounded-full ${
                          inv.status === 'Paid'
                            ? 'bg-emerald-500/10 text-emerald-400'
                            : 'bg-primary/10 text-primary'
                        }`}>
                          {inv.status === 'Paid' && <CheckCircle className="w-3 h-3" />}
                          {inv.status}
                        </span>
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
