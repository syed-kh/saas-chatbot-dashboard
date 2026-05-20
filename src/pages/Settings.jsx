import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Palette, Bell, Shield, Cpu, Key, Trash2, ChevronRight,
  Sun, Moon, Monitor, Check, Save, RotateCcw
} from 'lucide-react';
import { useStore } from '@/store/useStore';

const containerVariants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.07 } }
};
const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
};

function Toggle({ checked, onChange }) {
  return (
    <button
      onClick={() => onChange(!checked)}
      className={`w-11 h-6 rounded-full relative transition-colors duration-200 ${checked ? 'bg-primary' : 'bg-secondary'}`}
    >
      <span
        className={`w-4 h-4 bg-white rounded-full absolute top-1 transition-all duration-200 shadow ${checked ? 'right-1' : 'left-1'}`}
      />
    </button>
  );
}

function SettingRow({ label, description, children }) {
  return (
    <div className="flex items-center justify-between py-3 border-b border-secondary/50 last:border-0">
      <div className="flex-1 pr-4">
        <div className="text-sm font-medium text-text-main">{label}</div>
        {description && <div className="text-xs text-text-muted mt-0.5">{description}</div>}
      </div>
      <div className="flex-shrink-0">{children}</div>
    </div>
  );
}

const MODELS = ['GPT-4o', 'GPT-4o mini', 'Claude 3.5 Sonnet', 'Claude 3 Haiku', 'Gemini 1.5 Pro', 'Gemini Flash'];

export default function Settings() {
  const { activeModel, setActiveModel } = useStore();

  const [notifications, setNotifications] = useState({
    emailAlerts: true,
    productUpdates: true,
    usageWarnings: true,
    weeklyDigest: false,
  });
  const [security, setSecurity] = useState({
    twoFactor: false,
    sessionLogs: true,
    ipWhitelist: false,
  });
  const [appearance, setAppearance] = useState({
    theme: 'dark',
    compactMode: false,
    codeLineNumbers: true,
    streamResponses: true,
    soundEffects: false,
  });
  const [apiKey, setApiKey] = useState('sk-•••••••••••••••••••••••••••••••••••••••••••••••');
  const [saved, setSaved] = useState(false);
  const [activeSection, setActiveSection] = useState('appearance');

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  const sections = [
    { id: 'appearance', label: 'Appearance', icon: Palette },
    { id: 'model', label: 'Model & AI', icon: Cpu },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'security', label: 'Security', icon: Shield },
    { id: 'api', label: 'API Keys', icon: Key },
    { id: 'danger', label: 'Danger Zone', icon: Trash2 },
  ];

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="show"
      className="p-6 lg:p-8 max-w-5xl mx-auto w-full"
    >
      {/* Header */}
      <motion.div variants={itemVariants} className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-text-main tracking-tight">Settings</h1>
          <p className="text-text-muted mt-1">Manage your preferences, model, and security.</p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => {}}
            className="flex items-center gap-2 px-4 py-2 text-sm text-text-muted border border-secondary rounded-lg hover:bg-secondary transition-colors"
          >
            <RotateCcw className="w-4 h-4" /> Reset
          </button>
          <button
            onClick={handleSave}
            className="flex items-center gap-2 px-4 py-2 text-sm bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors shadow-lg shadow-primary/20"
          >
            <Save className="w-4 h-4" />
            {saved ? <><Check className="w-4 h-4" /> Saved!</> : 'Save Changes'}
          </button>
        </div>
      </motion.div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Sidebar Nav */}
        <motion.div variants={itemVariants} className="lg:w-52 flex-shrink-0">
          <nav className="space-y-1">
            {sections.map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                onClick={() => setActiveSection(id)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all ${
                  activeSection === id
                    ? 'bg-primary/10 text-primary font-medium'
                    : 'text-text-muted hover:bg-secondary hover:text-text-main'
                } ${id === 'danger' ? '!text-red-400 hover:!bg-red-500/10' : ''}`}
              >
                <Icon className="w-4 h-4 flex-shrink-0" />
                {label}
                {activeSection === id && <ChevronRight className="w-3 h-3 ml-auto" />}
              </button>
            ))}
          </nav>
        </motion.div>

        {/* Content */}
        <motion.div variants={itemVariants} className="flex-1 space-y-5">
          <AnimatePresence mode="wait">
            {activeSection === 'appearance' && (
              <motion.div key="appearance" initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -10 }}>
                <Card className="bg-card border-secondary">
                  <CardHeader>
                    <CardTitle className="text-text-main">Appearance</CardTitle>
                    <CardDescription className="text-text-muted">Customize the look and feel of Nova AI.</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-1">
                    {/* Theme Picker */}
                    <SettingRow label="Theme" description="Choose your preferred color mode.">
                      <div className="flex gap-2">
                        {[
                          { id: 'light', icon: Sun },
                          { id: 'dark', icon: Moon },
                          { id: 'system', icon: Monitor }
                        ].map(({ id, icon: Icon }) => (
                          <button
                            key={id}
                            onClick={() => setAppearance(a => ({ ...a, theme: id }))}
                            className={`w-9 h-9 rounded-lg flex items-center justify-center border transition-all capitalize ${
                              appearance.theme === id
                                ? 'border-primary bg-primary/10 text-primary'
                                : 'border-secondary text-text-muted hover:border-primary/50'
                            }`}
                          >
                            <Icon className="w-4 h-4" />
                          </button>
                        ))}
                      </div>
                    </SettingRow>
                    <SettingRow label="Compact Mode" description="Reduce spacing to fit more messages.">
                      <Toggle checked={appearance.compactMode} onChange={(v) => setAppearance(a => ({ ...a, compactMode: v }))} />
                    </SettingRow>
                    <SettingRow label="Code Line Numbers" description="Show line numbers in code blocks.">
                      <Toggle checked={appearance.codeLineNumbers} onChange={(v) => setAppearance(a => ({ ...a, codeLineNumbers: v }))} />
                    </SettingRow>
                    <SettingRow label="Stream Responses" description="Show AI responses as they are generated.">
                      <Toggle checked={appearance.streamResponses} onChange={(v) => setAppearance(a => ({ ...a, streamResponses: v }))} />
                    </SettingRow>
                    <SettingRow label="Sound Effects" description="Play sounds on message send/receive.">
                      <Toggle checked={appearance.soundEffects} onChange={(v) => setAppearance(a => ({ ...a, soundEffects: v }))} />
                    </SettingRow>
                  </CardContent>
                </Card>
              </motion.div>
            )}

            {activeSection === 'model' && (
              <motion.div key="model" initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -10 }}>
                <Card className="bg-card border-secondary">
                  <CardHeader>
                    <CardTitle className="text-text-main">Model & AI Settings</CardTitle>
                    <CardDescription className="text-text-muted">Choose your default model and AI behavior.</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <label className="text-sm font-medium text-text-muted block mb-2">Default Model</label>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                          {MODELS.map((m) => (
                            <button
                              key={m}
                              onClick={() => setActiveModel(m)}
                              className={`flex items-center justify-between px-4 py-3 rounded-lg border text-sm transition-all ${
                                activeModel === m
                                  ? 'border-primary bg-primary/10 text-primary'
                                  : 'border-secondary text-text-muted hover:border-primary/40 hover:text-text-main'
                              }`}
                            >
                              {m}
                              {activeModel === m && <Check className="w-4 h-4" />}
                            </button>
                          ))}
                        </div>
                      </div>
                      <div className="pt-4 border-t border-secondary space-y-1">
                        <SettingRow label="Temperature" description="Controls randomness. Higher = more creative.">
                          <div className="flex items-center gap-3">
                            <input type="range" min="0" max="2" step="0.1" defaultValue="0.7"
                              className="w-24 accent-primary" />
                            <span className="text-sm text-text-main w-8">0.7</span>
                          </div>
                        </SettingRow>
                        <SettingRow label="Max Tokens" description="Maximum tokens per response.">
                          <select className="bg-secondary border border-secondary text-sm rounded-lg px-3 py-1.5 focus:outline-none focus:ring-1 focus:ring-primary text-text-main">
                            <option>1,024</option>
                            <option>2,048</option>
                            <option selected>4,096</option>
                            <option>8,192</option>
                          </select>
                        </SettingRow>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )}

            {activeSection === 'notifications' && (
              <motion.div key="notifications" initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -10 }}>
                <Card className="bg-card border-secondary">
                  <CardHeader>
                    <CardTitle className="text-text-main">Notifications</CardTitle>
                    <CardDescription className="text-text-muted">Choose what updates you want to receive.</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <SettingRow label="Email Alerts" description="Get notified when your API limit is near.">
                      <Toggle checked={notifications.emailAlerts} onChange={(v) => setNotifications(n => ({ ...n, emailAlerts: v }))} />
                    </SettingRow>
                    <SettingRow label="Product Updates" description="News about the latest AI models and features.">
                      <Toggle checked={notifications.productUpdates} onChange={(v) => setNotifications(n => ({ ...n, productUpdates: v }))} />
                    </SettingRow>
                    <SettingRow label="Usage Warnings" description="Alert when you reach 80% of your token limit.">
                      <Toggle checked={notifications.usageWarnings} onChange={(v) => setNotifications(n => ({ ...n, usageWarnings: v }))} />
                    </SettingRow>
                    <SettingRow label="Weekly Digest" description="A weekly summary of your AI usage.">
                      <Toggle checked={notifications.weeklyDigest} onChange={(v) => setNotifications(n => ({ ...n, weeklyDigest: v }))} />
                    </SettingRow>
                  </CardContent>
                </Card>
              </motion.div>
            )}

            {activeSection === 'security' && (
              <motion.div key="security" initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -10 }}>
                <Card className="bg-card border-secondary">
                  <CardHeader>
                    <CardTitle className="text-text-main">Security</CardTitle>
                    <CardDescription className="text-text-muted">Manage your account security and access.</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <SettingRow label="Two-Factor Authentication" description="Add an extra layer of security to your account.">
                      <Toggle checked={security.twoFactor} onChange={(v) => setSecurity(s => ({ ...s, twoFactor: v }))} />
                    </SettingRow>
                    <SettingRow label="Session Activity Logs" description="Track all login activity on your account.">
                      <Toggle checked={security.sessionLogs} onChange={(v) => setSecurity(s => ({ ...s, sessionLogs: v }))} />
                    </SettingRow>
                    <SettingRow label="IP Whitelist" description="Restrict API access to specific IP addresses.">
                      <Toggle checked={security.ipWhitelist} onChange={(v) => setSecurity(s => ({ ...s, ipWhitelist: v }))} />
                    </SettingRow>
                    <div className="pt-4">
                      <button className="w-full py-2.5 border border-secondary rounded-lg text-sm text-text-muted hover:text-text-main hover:bg-secondary transition-colors">
                        Change Password
                      </button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )}

            {activeSection === 'api' && (
              <motion.div key="api" initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -10 }}>
                <Card className="bg-card border-secondary">
                  <CardHeader>
                    <CardTitle className="text-text-main">API Keys</CardTitle>
                    <CardDescription className="text-text-muted">Manage your OpenRouter / OpenAI API credentials.</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <label className="text-sm font-medium text-text-muted block mb-2">OpenRouter API Key</label>
                      <div className="flex gap-2">
                        <input
                          type="text"
                          value={apiKey}
                          onChange={(e) => setApiKey(e.target.value)}
                          className="flex-1 bg-secondary border border-secondary text-sm rounded-lg px-4 py-2.5 focus:outline-none focus:ring-1 focus:ring-primary text-text-main font-mono"
                        />
                        <button className="px-4 py-2.5 border border-secondary rounded-lg text-sm text-text-muted hover:bg-secondary transition-colors">
                          Show
                        </button>
                      </div>
                      <p className="text-xs text-text-muted mt-1.5">Your key is stored locally and never sent to our servers.</p>
                    </div>
                    <div className="p-3 bg-emerald-500/10 border border-emerald-500/20 rounded-lg flex items-center gap-3">
                      <Check className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                      <span className="text-sm text-emerald-400">API key is valid and connected.</span>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )}

            {activeSection === 'danger' && (
              <motion.div key="danger" initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -10 }}>
                <Card className="bg-card border-red-900/50">
                  <CardHeader>
                    <CardTitle className="text-red-400">Danger Zone</CardTitle>
                    <CardDescription className="text-text-muted">These actions are permanent and cannot be undone.</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {[
                      { label: 'Clear Chat History', desc: 'Delete all your local chat conversations.', btn: 'Clear All' },
                      { label: 'Reset Settings', desc: 'Restore all settings to their default values.', btn: 'Reset' },
                      { label: 'Delete Account', desc: 'Permanently delete your account and all data.', btn: 'Delete Account' },
                    ].map((item) => (
                      <div key={item.label} className="flex items-center justify-between py-3 border-b border-secondary/50 last:border-0">
                        <div>
                          <div className="text-sm font-medium text-text-main">{item.label}</div>
                          <div className="text-xs text-text-muted mt-0.5">{item.desc}</div>
                        </div>
                        <button className="px-4 py-2 text-sm text-red-400 border border-red-900/50 rounded-lg hover:bg-red-500/10 transition-colors">
                          {item.btn}
                        </button>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </motion.div>
  );
}
