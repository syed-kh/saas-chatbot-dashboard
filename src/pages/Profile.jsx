import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { useStore } from '@/store/useStore';
import { motion } from 'framer-motion';
import {
  Camera, Edit3, Shield, Star, Mail, MapPin, Calendar,
  GitBranch, Link2, Globe, MessageSquare, Zap, Clock, Check
} from 'lucide-react';

const containerVariants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.07 } }
};
const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
};

const PLAN_BADGES = {
  Pro: 'bg-primary/20 text-primary border border-primary/30',
  Free: 'bg-secondary text-text-muted border border-secondary',
  Enterprise: 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30',
};

const activityLog = [
  { action: 'Chat started', detail: 'Build SaaS Dashboard', time: '10:42 AM', icon: MessageSquare, color: 'text-primary' },
  { action: 'Model switched', detail: 'GPT-4o → Claude 3.5', time: '09:30 AM', icon: Zap, color: 'text-blue-400' },
  { action: 'Chat started', detail: 'API Integration Help', time: '09:15 AM', icon: MessageSquare, color: 'text-primary' },
  { action: 'Settings updated', detail: 'Notifications enabled', time: 'Yesterday', icon: Shield, color: 'text-emerald-400' },
  { action: 'Chat started', detail: 'Database Schema Design', time: 'Yesterday', icon: MessageSquare, color: 'text-primary' },
];

export default function Profile() {
  const { userProfile, updateUserProfile } = useStore();
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: userProfile.name,
    email: userProfile.email,
    avatarUrl: userProfile.avatarUrl,
    bio: 'Full-stack developer building AI-powered products.',
    location: 'San Francisco, CA',
    website: 'arjundev.io',
    github: 'arjundev',
    social: 'arjundev_',
  });
  const [saved, setSaved] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    updateUserProfile({ name: formData.name, email: formData.email, avatarUrl: formData.avatarUrl });
    setSaved(true);
    setEditing(false);
    setTimeout(() => setSaved(false), 3000);
  };

  const stats = [
    { label: 'Total Chats', value: '48', icon: MessageSquare },
    { label: 'Tokens Used', value: '1.42M', icon: Zap },
    { label: 'Avg Session', value: '12m', icon: Clock },
    { label: 'Pro Since', value: 'Jan 24', icon: Star },
  ];

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="show"
      className="p-6 lg:p-8 max-w-5xl mx-auto w-full space-y-6"
    >
      <motion.div variants={itemVariants}>
        <h1 className="text-3xl font-bold text-text-main tracking-tight">Your Profile</h1>
        <p className="text-text-muted mt-1">Manage your personal information and account details.</p>
      </motion.div>

      {/* Profile Hero Card */}
      <motion.div variants={itemVariants}>
        <Card className="bg-card border-secondary overflow-hidden">
          {/* Banner */}
          <div className="h-28 bg-gradient-to-r from-primary/60 via-accent/60 to-blue-600/60 relative">
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-card/50" />
          </div>
          <div className="px-6 pb-6 -mt-12 relative">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
              {/* Avatar */}
              <div className="relative w-20 h-20">
                <img
                  src={formData.avatarUrl || `https://ui-avatars.com/api/?name=${formData.name}&background=6D28D9&color=fff`}
                  alt="Avatar"
                  className="w-20 h-20 rounded-2xl object-cover border-4 border-card shadow-xl"
                />
                <button className="absolute -bottom-1 -right-1 w-7 h-7 bg-primary rounded-lg flex items-center justify-center shadow-lg hover:bg-primary/90 transition-colors">
                  <Camera className="w-3.5 h-3.5 text-white" />
                </button>
              </div>
              {/* Actions */}
              <div className="flex items-center gap-2">
                {saved && (
                  <span className="text-sm text-emerald-400 flex items-center gap-1">
                    <Check className="w-4 h-4" /> Saved!
                  </span>
                )}
                <button
                  onClick={() => setEditing(!editing)}
                  className="flex items-center gap-2 px-4 py-2 text-sm border border-secondary rounded-lg text-text-muted hover:bg-secondary hover:text-text-main transition-colors"
                >
                  <Edit3 className="w-4 h-4" />
                  {editing ? 'Cancel' : 'Edit Profile'}
                </button>
              </div>
            </div>

            {/* Info */}
            <div className="mt-3">
              <div className="flex items-center gap-2 flex-wrap">
                <h2 className="text-xl font-bold text-text-main">{formData.name}</h2>
                <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${PLAN_BADGES[userProfile.plan] || PLAN_BADGES.Free}`}>
                  {userProfile.plan}
                </span>
              </div>
              <p className="text-sm text-text-muted mt-1">{formData.bio}</p>
              <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 mt-3 text-xs text-text-muted">
                <span className="flex items-center gap-1"><Mail className="w-3.5 h-3.5" />{formData.email}</span>
                <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5" />{formData.location}</span>
                <span className="flex items-center gap-1"><Globe className="w-3.5 h-3.5" />{formData.website}</span>
                <span className="flex items-center gap-1"><GitBranch className="w-3.5 h-3.5" />@{formData.github}</span>
                <span className="flex items-center gap-1"><Link2 className="w-3.5 h-3.5" />@{formData.social}</span>
              </div>
            </div>
          </div>
        </Card>
      </motion.div>

      {/* Stats */}
      <motion.div variants={itemVariants}>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {stats.map(({ label, value, icon: Icon }) => (
            <Card key={label} className="bg-card border-secondary">
              <CardContent className="pt-5 pb-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs text-text-muted">{label}</span>
                  <Icon className="w-4 h-4 text-primary opacity-70" />
                </div>
                <div className="text-2xl font-bold text-text-main">{value}</div>
              </CardContent>
            </Card>
          ))}
        </div>
      </motion.div>

      {/* Edit Form + Activity Log */}
      <motion.div variants={itemVariants} className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Edit Form */}
        <Card className="bg-card border-secondary">
          <CardHeader>
            <CardTitle className="text-text-main">
              {editing ? 'Edit Profile' : 'Profile Details'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {[
                { key: 'name', label: 'Full Name', type: 'text', disabled: false },
                { key: 'email', label: 'Email Address', type: 'email', disabled: true },
                { key: 'bio', label: 'Bio', type: 'text', disabled: false },
                { key: 'location', label: 'Location', type: 'text', disabled: false },
                { key: 'website', label: 'Website', type: 'url', disabled: false },
                { key: 'github', label: 'GitHub / Social Handle', type: 'text', disabled: false },
              ].map(({ key, label, type, disabled }) => (
                <div key={key}>
                  <label className="block text-xs font-medium text-text-muted mb-1.5">{label}</label>
                  <input
                    type={type}
                    value={formData[key]}
                    onChange={(e) => setFormData({ ...formData, [key]: e.target.value })}
                    disabled={!editing || disabled}
                    className={`w-full bg-secondary border border-secondary text-sm rounded-lg px-4 py-2.5 focus:outline-none focus:ring-1 focus:ring-primary text-text-main placeholder-text-muted transition-all ${
                      !editing || disabled ? 'opacity-60 cursor-not-allowed' : ''
                    }`}
                  />
                  {key === 'email' && <p className="text-xs text-text-muted mt-1">Email cannot be changed directly.</p>}
                </div>
              ))}
              {editing && (
                <button
                  type="submit"
                  className="w-full bg-primary hover:bg-primary/90 text-white font-medium py-2.5 rounded-lg transition-colors shadow-lg shadow-primary/20"
                >
                  Save Changes
                </button>
              )}
            </form>
          </CardContent>
        </Card>

        {/* Activity Log */}
        <Card className="bg-card border-secondary">
          <CardHeader>
            <CardTitle className="text-text-main">Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-1">
              {activityLog.map((item, i) => (
                <div key={i} className="flex items-start gap-3 py-3 border-b border-secondary/50 last:border-0">
                  <div className={`w-8 h-8 rounded-lg bg-secondary flex items-center justify-center flex-shrink-0 ${item.color}`}>
                    <item.icon className="w-4 h-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm text-text-main font-medium">{item.action}</div>
                    <div className="text-xs text-text-muted truncate">{item.detail}</div>
                  </div>
                  <div className="text-xs text-text-muted whitespace-nowrap flex items-center gap-1">
                    <Calendar className="w-3 h-3" /> {item.time}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Plan Card */}
      <motion.div variants={itemVariants}>
        <Card className="bg-card border-secondary overflow-hidden relative">
          <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-accent/5 pointer-events-none" />
          <CardContent className="p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                <Star className="w-6 h-6 text-primary" />
              </div>
              <div>
                <div className="text-sm font-semibold text-text-main flex items-center gap-2">
                  Nova AI Pro <span className={`text-xs px-2 py-0.5 rounded-full ${PLAN_BADGES.Pro}`}>Active</span>
                </div>
                <div className="text-xs text-text-muted mt-0.5">2M tokens/month · Priority support · All models</div>
              </div>
            </div>
            <button className="px-5 py-2.5 bg-primary text-white text-sm font-medium rounded-lg hover:bg-primary/90 transition-colors shadow-lg shadow-primary/20">
              Manage Plan
            </button>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  );
}
