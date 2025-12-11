// File: src/components/Settings/SettingsPage.tsx
// User settings and profile management - CORRECTED THEME VERSION
// Uses official Ekene Afrocentric palette from _variables.scss

import React, { useState } from 'react';
import { 
  User, Lock, Bell, Palette, Globe, Shield, 
  Smartphone, Key, Eye, EyeOff, Copy, Check,
  LogOut, Trash2, ExternalLink, AlertCircle
} from 'lucide-react';

// Official Ekene Colors (matching _variables.scss)
const COLORS = {
  deepEarthBrown: '#3A2A1A',
  palmGreen: '#2B6E3E',
  sunriseGold: '#E5A039',
  terracottaClay: '#D96B3C',
  warmSand: '#F3E7D3',
  ochreYellow: '#DAA520',
  burntSienna: '#8B4513',
  charcoal: '#2D2520',
  white: '#FFFFFF',
  warmWhite: '#FFFEF9',
  sageGreen: '#9CAF88',
  clayRed: '#CB4154',
};

// ============================================================================
// TYPE DEFINITIONS
// ============================================================================

interface UserSettings {
  profile: {
    displayName: string;
    username: string;
    bio: string;
    avatar: string;
    twitter?: string;
    website?: string;
  };
  privacy: {
    publicProfile: boolean;
    showBalance: boolean;
    showTransactions: boolean;
    allowDMs: boolean;
  };
  notifications: {
    tips: boolean;
    follows: boolean;
    comments: boolean;
    events: boolean;
    achievements: boolean;
    email: boolean;
    push: boolean;
  };
  appearance: {
    theme: 'dark' | 'light' | 'auto';
    language: string;
  };
}

// ============================================================================
// SETTINGS PAGE COMPONENT
// ============================================================================

const SettingsPage: React.FC = () => {
  const [activeSection, setActiveSection] = useState<'profile' | 'security' | 'privacy' | 'notifications' | 'appearance'>('profile');
  const [settings, setSettings] = useState<UserSettings>({
    profile: {
      displayName: 'Chioma Nwankwo',
      username: 'chioma',
      bio: 'Web3 enthusiast and community builder',
      avatar: '👩🏿‍🎨',
      twitter: '@chioma_web3',
      website: 'chioma.dev'
    },
    privacy: {
      publicProfile: true,
      showBalance: false,
      showTransactions: true,
      allowDMs: true
    },
    notifications: {
      tips: true,
      follows: true,
      comments: true,
      events: true,
      achievements: true,
      email: false,
      push: false
    },
    appearance: {
      theme: 'dark',
      language: 'en'
    }
  });

  const [showSeedPhrase, setShowSeedPhrase] = useState(false);
  const [seedPhraseCopied, setSeedPhraseCopied] = useState(false);
  const [isTemporaryAccount] = useState(true);

  const mockSeedPhrase = 'example seed phrase words here for demo purposes only not real';

  const copySeedPhrase = () => {
    navigator.clipboard.writeText(mockSeedPhrase);
    setSeedPhraseCopied(true);
    setTimeout(() => setSeedPhraseCopied(false), 2000);
  };

  const updateSettings = (section: keyof UserSettings, key: string, value: any) => {
    setSettings(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [key]: value
      }
    }));
  };

  // ============================================================================
  // SUB-COMPONENTS
  // ============================================================================

  const SectionNav = () => (
    <div className="space-y-2">
      {[
        { id: 'profile', label: 'Profile', icon: User },
        { id: 'security', label: 'Security', icon: Lock },
        { id: 'privacy', label: 'Privacy', icon: Shield },
        { id: 'notifications', label: 'Notifications', icon: Bell },
        { id: 'appearance', label: 'Appearance', icon: Palette }
      ].map((section) => (
        <button
          key={section.id}
          onClick={() => setActiveSection(section.id as any)}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all"
          style={activeSection === section.id ? {
            background: `linear-gradient(135deg, ${COLORS.sunriseGold} 0%, ${COLORS.terracottaClay} 100%)`,
            color: COLORS.white
          } : {
            backgroundColor: `${COLORS.warmSand}10`,
            color: COLORS.warmSand
          }}
        >
          <section.icon className="w-5 h-5" />
          <span className="font-medium">{section.label}</span>
        </button>
      ))}
    </div>
  );

  const ProfileSection = () => (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-2" style={{ color: COLORS.warmWhite }}>Profile Settings</h2>
        <p style={{ color: COLORS.warmSand }}>Manage your public profile information</p>
      </div>

      {/* Avatar */}
      <div>
        <label className="block font-semibold mb-3" style={{ color: COLORS.warmWhite }}>Avatar</label>
        <div className="flex items-center gap-4">
          <div className="w-20 h-20 rounded-full flex items-center justify-center text-4xl"
               style={{ background: `linear-gradient(135deg, ${COLORS.sunriseGold} 0%, ${COLORS.terracottaClay} 100%)` }}>
            {settings.profile.avatar}
          </div>
          <button className="px-4 py-2 rounded-lg font-medium transition-all"
                  style={{ 
                    backgroundColor: `${COLORS.warmSand}20`,
                    color: COLORS.warmWhite
                  }}>
            Change Avatar
          </button>
        </div>
      </div>

      {/* Display Name */}
      <div>
        <label className="block font-semibold mb-2" style={{ color: COLORS.warmWhite }}>Display Name</label>
        <input
          type="text"
          value={settings.profile.displayName}
          onChange={(e) => updateSettings('profile', 'displayName', e.target.value)}
          className="w-full px-4 py-3 rounded-xl outline-none"
          style={{
            backgroundColor: `${COLORS.warmSand}15`,
            border: `2px solid ${COLORS.warmSand}30`,
            color: COLORS.warmWhite
          }}
        />
      </div>

      {/* Username */}
      <div>
        <label className="block font-semibold mb-2" style={{ color: COLORS.warmWhite }}>Username</label>
        <div className="relative">
          <span className="absolute left-4 top-1/2 -translate-y-1/2" style={{ color: COLORS.warmSand }}>@</span>
          <input
            type="text"
            value={settings.profile.username}
            onChange={(e) => updateSettings('profile', 'username', e.target.value)}
            className="w-full pl-8 pr-4 py-3 rounded-xl outline-none"
            style={{
              backgroundColor: `${COLORS.warmSand}15`,
              border: `2px solid ${COLORS.warmSand}30`,
              color: COLORS.warmWhite
            }}
          />
        </div>
        <p className="text-sm mt-1" style={{ color: COLORS.warmSand }}>
          ekene.app/@{settings.profile.username}
        </p>
      </div>

      {/* Bio */}
      <div>
        <label className="block font-semibold mb-2" style={{ color: COLORS.warmWhite }}>Bio</label>
        <textarea
          value={settings.profile.bio}
          onChange={(e) => updateSettings('profile', 'bio', e.target.value)}
          rows={4}
          maxLength={200}
          className="w-full px-4 py-3 rounded-xl outline-none resize-none"
          style={{
            backgroundColor: `${COLORS.warmSand}15`,
            border: `2px solid ${COLORS.warmSand}30`,
            color: COLORS.warmWhite
          }}
        />
        <p className="text-sm mt-1" style={{ color: COLORS.warmSand }}>
          {settings.profile.bio.length}/200
        </p>
      </div>

      {/* Social Links */}
      <div className="space-y-3">
        <label className="block font-semibold" style={{ color: COLORS.warmWhite }}>Social Links</label>
        <input
          type="text"
          value={settings.profile.twitter || ''}
          onChange={(e) => updateSettings('profile', 'twitter', e.target.value)}
          placeholder="@username"
          className="w-full px-4 py-3 rounded-xl outline-none"
          style={{
            backgroundColor: `${COLORS.warmSand}15`,
            border: `2px solid ${COLORS.warmSand}30`,
            color: COLORS.warmWhite
          }}
        />
        <input
          type="text"
          value={settings.profile.website || ''}
          onChange={(e) => updateSettings('profile', 'website', e.target.value)}
          placeholder="your-website.com"
          className="w-full px-4 py-3 rounded-xl outline-none"
          style={{
            backgroundColor: `${COLORS.warmSand}15`,
            border: `2px solid ${COLORS.warmSand}30`,
            color: COLORS.warmWhite
          }}
        />
      </div>

      <button className="w-full py-3 rounded-xl text-white font-bold transition-all"
              style={{ background: `linear-gradient(135deg, ${COLORS.sunriseGold} 0%, ${COLORS.terracottaClay} 100%)` }}>
        Save Changes
      </button>
    </div>
  );

  const SecuritySection = () => (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-2" style={{ color: COLORS.warmWhite }}>Security</h2>
        <p style={{ color: COLORS.warmSand }}>Manage your account security</p>
      </div>

      {/* Account Type */}
      <div className="rounded-xl p-4 flex items-start gap-3"
           style={{ 
             backgroundColor: `${COLORS.ochreYellow}20`,
             border: `1px solid ${COLORS.ochreYellow}50`
           }}>
        <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: COLORS.ochreYellow }} />
        <div className="flex-1">
          <h4 className="font-semibold mb-1" style={{ color: COLORS.warmWhite }}>
            {isTemporaryAccount ? 'Temporary Account' : 'Full Wallet'}
          </h4>
          <p className="text-sm" style={{ color: COLORS.warmSand }}>
            {isTemporaryAccount 
              ? 'Upgrade to a full wallet for more security and features'
              : 'Your account is secured with your own wallet'}
          </p>
        </div>
      </div>

      {/* Seed Phrase */}
      {isTemporaryAccount && (
        <div className="rounded-xl p-6"
             style={{ 
               backgroundColor: `${COLORS.clayRed}20`,
               border: `2px solid ${COLORS.clayRed}50`
             }}>
          <div className="flex items-center gap-2 mb-4">
            <Key className="w-5 h-5" style={{ color: COLORS.clayRed }} />
            <h3 className="font-bold" style={{ color: COLORS.warmWhite }}>Recovery Phrase</h3>
          </div>
          <p className="text-sm mb-4" style={{ color: COLORS.warmSand }}>
            Save this phrase securely. You'll need it to recover your account.
          </p>
          
          {showSeedPhrase ? (
            <div className="rounded-lg p-4 mb-4"
                 style={{ backgroundColor: `${COLORS.warmSand}20` }}>
              <p className="font-mono text-sm break-all" style={{ color: COLORS.warmWhite }}>
                {mockSeedPhrase}
              </p>
            </div>
          ) : (
            <div className="rounded-lg p-4 mb-4 blur-sm"
                 style={{ backgroundColor: `${COLORS.warmSand}20` }}>
              <p className="font-mono text-sm" style={{ color: COLORS.warmWhite }}>
                ••• ••• ••• ••• ••• ••• ••• ••• ••• ••• ••• •••
              </p>
            </div>
          )}

          <div className="flex gap-3">
            <button
              onClick={() => setShowSeedPhrase(!showSeedPhrase)}
              className="flex-1 px-4 py-2 rounded-lg font-medium transition-all flex items-center justify-center gap-2"
              style={{ 
                backgroundColor: `${COLORS.warmSand}20`,
                color: COLORS.warmWhite
              }}
            >
              {showSeedPhrase ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              {showSeedPhrase ? 'Hide' : 'Reveal'}
            </button>
            <button
              onClick={copySeedPhrase}
              disabled={!showSeedPhrase}
              className="flex-1 px-4 py-2 rounded-lg font-medium transition-all disabled:opacity-50 flex items-center justify-center gap-2"
              style={{ 
                backgroundColor: `${COLORS.warmSand}20`,
                color: COLORS.warmWhite
              }}
            >
              {seedPhraseCopied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              {seedPhraseCopied ? 'Copied!' : 'Copy'}
            </button>
          </div>
        </div>
      )}

      {/* Upgrade Button */}
      {isTemporaryAccount && (
        <button className="w-full py-4 rounded-xl text-white font-bold transition-all flex items-center justify-center gap-2"
                style={{ background: `linear-gradient(135deg, ${COLORS.sunriseGold} 0%, ${COLORS.terracottaClay} 100%)` }}>
          <Shield className="w-5 h-5" />
          Upgrade to Full Wallet
        </button>
      )}

      {/* Connected Devices */}
      <div>
        <h3 className="font-bold mb-3 flex items-center gap-2" style={{ color: COLORS.warmWhite }}>
          <Smartphone className="w-5 h-5" />
          Connected Devices
        </h3>
        <div className="space-y-2">
          {[
            { device: 'Chrome on Windows', lastActive: '5 minutes ago', current: true },
            { device: 'Safari on iPhone', lastActive: '2 days ago', current: false }
          ].map((session, i) => (
            <div key={i} className="rounded-xl p-4 flex items-center justify-between"
                 style={{ 
                   backgroundColor: `${COLORS.warmSand}10`,
                   border: `1px solid ${COLORS.warmSand}20`
                 }}>
              <div>
                <div className="font-semibold" style={{ color: COLORS.warmWhite }}>{session.device}</div>
                <div className="text-sm" style={{ color: COLORS.warmSand }}>{session.lastActive}</div>
              </div>
              {session.current ? (
                <span className="px-3 py-1 rounded-full text-xs font-semibold"
                      style={{ 
                        backgroundColor: `${COLORS.palmGreen}30`,
                        color: COLORS.palmGreen
                      }}>
                  Current
                </span>
              ) : (
                <button className="text-sm font-semibold" style={{ color: COLORS.clayRed }}>
                  Remove
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const PrivacySection = () => (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-2" style={{ color: COLORS.warmWhite }}>Privacy</h2>
        <p style={{ color: COLORS.warmSand }}>Control who can see your information</p>
      </div>

      <div className="space-y-4">
        {Object.entries(settings.privacy).map(([key, value]) => (
          <label key={key} className="flex items-center justify-between p-4 rounded-xl cursor-pointer transition-all"
                 style={{ 
                   backgroundColor: `${COLORS.warmSand}10`,
                   border: `1px solid ${COLORS.warmSand}20`
                 }}>
            <div>
              <div className="font-semibold capitalize mb-1" style={{ color: COLORS.warmWhite }}>
                {key.replace(/([A-Z])/g, ' $1').trim()}
              </div>
              <div className="text-sm" style={{ color: COLORS.warmSand }}>
                {key === 'publicProfile' && 'Allow others to view your profile'}
                {key === 'showBalance' && 'Display your wallet balance on profile'}
                {key === 'showTransactions' && 'Show transaction history publicly'}
                {key === 'allowDMs' && 'Allow direct messages from others'}
              </div>
            </div>
            <button
              onClick={() => updateSettings('privacy', key, !value)}
              className="w-12 h-6 rounded-full transition-all"
              style={{ 
                background: value 
                  ? `linear-gradient(135deg, ${COLORS.sunriseGold} 0%, ${COLORS.terracottaClay} 100%)`
                  : `${COLORS.warmSand}30`
              }}
            >
              <div className="w-5 h-5 rounded-full bg-white transition-transform"
                   style={{ transform: value ? 'translateX(24px)' : 'translateX(2px)' }} />
            </button>
          </label>
        ))}
      </div>
    </div>
  );

  const NotificationsSection = () => (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-2" style={{ color: COLORS.warmWhite }}>Notifications</h2>
        <p style={{ color: COLORS.warmSand }}>Choose what updates you receive</p>
      </div>

      <div className="space-y-4">
        {Object.entries(settings.notifications).map(([key, value]) => (
          <label key={key} className="flex items-center justify-between p-4 rounded-xl cursor-pointer transition-all"
                 style={{ 
                   backgroundColor: `${COLORS.warmSand}10`,
                   border: `1px solid ${COLORS.warmSand}20`
                 }}>
            <div className="font-semibold capitalize" style={{ color: COLORS.warmWhite }}>
              {key === 'tips' && '🔥 Tips & Gratitude'}
              {key === 'follows' && '👥 Follows'}
              {key === 'comments' && '💬 Comments'}
              {key === 'events' && '📅 Events'}
              {key === 'achievements' && '🏆 Achievements'}
              {key === 'email' && '📧 Email Notifications'}
              {key === 'push' && '📱 Push Notifications'}
            </div>
            <button
              onClick={() => updateSettings('notifications', key, !value)}
              className="w-12 h-6 rounded-full transition-all"
              style={{ 
                background: value 
                  ? `linear-gradient(135deg, ${COLORS.sunriseGold} 0%, ${COLORS.terracottaClay} 100%)`
                  : `${COLORS.warmSand}30`
              }}
            >
              <div className="w-5 h-5 rounded-full bg-white transition-transform"
                   style={{ transform: value ? 'translateX(24px)' : 'translateX(2px)' }} />
            </button>
          </label>
        ))}
      </div>
    </div>
  );

  const AppearanceSection = () => (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-2" style={{ color: COLORS.warmWhite }}>Appearance</h2>
        <p style={{ color: COLORS.warmSand }}>Customize how Ekene looks</p>
      </div>

      {/* Theme */}
      <div>
        <label className="block font-semibold mb-3" style={{ color: COLORS.warmWhite }}>Theme</label>
        <div className="grid grid-cols-3 gap-3">
          {[
            { id: 'dark', label: 'Dark', icon: '🌙' },
            { id: 'light', label: 'Light', icon: '☀️' },
            { id: 'auto', label: 'Auto', icon: '🌓' }
          ].map((theme) => (
            <button
              key={theme.id}
              onClick={() => updateSettings('appearance', 'theme', theme.id)}
              className="p-4 rounded-xl transition-all"
              style={settings.appearance.theme === theme.id ? {
                backgroundColor: `${COLORS.sunriseGold}30`,
                border: `2px solid ${COLORS.sunriseGold}`
              } : {
                backgroundColor: `${COLORS.warmSand}10`,
                border: `2px solid ${COLORS.warmSand}20`
              }}
            >
              <div className="text-3xl mb-2">{theme.icon}</div>
              <div className="font-semibold text-sm" style={{ color: COLORS.warmWhite }}>{theme.label}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Language */}
      <div>
        <label className="block font-semibold mb-2" style={{ color: COLORS.warmWhite }}>Language</label>
        <select
          value={settings.appearance.language}
          onChange={(e) => updateSettings('appearance', 'language', e.target.value)}
          className="w-full px-4 py-3 rounded-xl outline-none"
          style={{
            backgroundColor: `${COLORS.warmSand}15`,
            border: `2px solid ${COLORS.warmSand}30`,
            color: COLORS.warmWhite
          }}
        >
          <option value="en">English</option>
          <option value="yo">Yoruba</option>
          <option value="ig">Igbo</option>
          <option value="ha">Hausa</option>
        </select>
      </div>
    </div>
  );

  const DangerZone = () => (
    <div className="rounded-xl p-6 space-y-4"
         style={{ 
           backgroundColor: `${COLORS.clayRed}20`,
           border: `2px solid ${COLORS.clayRed}50`
         }}>
      <h3 className="font-bold text-lg flex items-center gap-2" style={{ color: COLORS.warmWhite }}>
        <AlertCircle className="w-5 h-5" style={{ color: COLORS.clayRed }} />
        Danger Zone
      </h3>

      <button className="w-full py-3 rounded-lg font-semibold transition-all flex items-center justify-center gap-2"
              style={{ 
                backgroundColor: `${COLORS.clayRed}30`,
                color: COLORS.clayRed
              }}>
        <LogOut className="w-4 h-4" />
        Sign Out
      </button>

      <button className="w-full py-3 rounded-lg font-semibold transition-all flex items-center justify-center gap-2"
              style={{ 
                backgroundColor: `${COLORS.clayRed}30`,
                color: COLORS.clayRed
              }}>
        <Trash2 className="w-4 h-4" />
        Delete Account
      </button>
    </div>
  );

  // ============================================================================
  // MAIN RENDER
  // ============================================================================

  return (
    <div className="grid md:grid-cols-[250px_1fr] gap-6">
      <aside className="space-y-6">
        <SectionNav />
        <DangerZone />
      </aside>

      <main>
        {activeSection === 'profile' && <ProfileSection />}
        {activeSection === 'security' && <SecuritySection />}
        {activeSection === 'privacy' && <PrivacySection />}
        {activeSection === 'notifications' && <NotificationsSection />}
        {activeSection === 'appearance' && <AppearanceSection />}
      </main>
    </div>
  );
};

export default SettingsPage;