// File: src/components/Notifications/NotificationsPanel.tsx
// Real-time notifications - CORRECTED THEME VERSION
// Uses official Ekene Afrocentric palette from _variables.scss

import React, { useState, useEffect } from 'react';
import { 
  Bell, Flame, Users, Calendar, Award, MessageCircle,
  X, Check, Trash2, Settings
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
};

// ============================================================================
// TYPE DEFINITIONS
// ============================================================================

interface Notification {
  id: string;
  type: 'tip_received' | 'tip_sent' | 'follow' | 'comment' | 'event' | 'achievement' | 'circle';
  title: string;
  message: string;
  timestamp: Date;
  read: boolean;
  actionable: boolean;
  actionUrl?: string;
  actor?: {
    name: string;
    avatar: string;
  };
  metadata?: {
    amount?: string;
    asset?: string;
  };
}

interface NotificationSettings {
  tips: boolean;
  follows: boolean;
  comments: boolean;
  events: boolean;
  achievements: boolean;
  circles: boolean;
  sound: boolean;
  push: boolean;
}

// ============================================================================
// NOTIFICATIONS PANEL COMPONENT
// ============================================================================

const NotificationsPanel: React.FC<{ onClose?: () => void }> = ({ onClose }) => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [filter, setFilter] = useState<'all' | 'unread'>('all');
  const [showSettings, setShowSettings] = useState(false);
  const [settings, setSettings] = useState<NotificationSettings>({
    tips: true,
    follows: true,
    comments: true,
    events: true,
    achievements: true,
    circles: true,
    sound: true,
    push: false
  });

  useEffect(() => {
    loadNotifications();
  }, []);

  const loadNotifications = () => {
    setNotifications([
      {
        id: '1',
        type: 'tip_received',
        title: 'Ekene Received!',
        message: 'Adewale sent you a tip',
        timestamp: new Date(Date.now() - 5 * 60 * 1000),
        read: false,
        actionable: true,
        actor: {
          name: 'Adewale Ojo',
          avatar: '👨🏿‍💻'
        },
        metadata: {
          amount: '2.5',
          asset: 'DOT'
        }
      },
      {
        id: '2',
        type: 'follow',
        title: 'New Follower',
        message: 'Chioma started following you',
        timestamp: new Date(Date.now() - 30 * 60 * 1000),
        read: false,
        actionable: true,
        actor: {
          name: 'Chioma Nwankwo',
          avatar: '👩🏿‍🎨'
        }
      },
      {
        id: '3',
        type: 'achievement',
        title: 'Achievement Unlocked!',
        message: 'You earned "Generous Giver" badge',
        timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
        read: false,
        actionable: true
      },
      {
        id: '4',
        type: 'event',
        title: 'Event Reminder',
        message: 'Lagos Blockchain Festival starts in 2 days',
        timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000),
        read: true,
        actionable: true,
        actionUrl: '/events/lagos-blockchain-fest'
      },
      {
        id: '5',
        type: 'circle',
        title: 'Circle Invitation',
        message: 'You were invited to join "Web3 Builders"',
        timestamp: new Date(Date.now() - 8 * 60 * 60 * 1000),
        read: true,
        actionable: true
      },
      {
        id: '6',
        type: 'comment',
        title: 'New Comment',
        message: 'Tunde commented on your post',
        timestamp: new Date(Date.now() - 12 * 60 * 60 * 1000),
        read: true,
        actionable: true,
        actor: {
          name: 'Tunde Bakare',
          avatar: '👨🏿‍💼'
        }
      }
    ]);
  };

  const markAsRead = (id: string) => {
    setNotifications(prev =>
      prev.map(n => n.id === id ? { ...n, read: true } : n)
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev =>
      prev.map(n => ({ ...n, read: true }))
    );
  };

  const deleteNotification = (id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  const clearAll = () => {
    setNotifications([]);
  };

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'tip_received':
      case 'tip_sent':
        return <Flame className="w-5 h-5" style={{ color: COLORS.sunriseGold }} />;
      case 'follow':
        return <Users className="w-5 h-5" style={{ color: COLORS.palmGreen }} />;
      case 'event':
        return <Calendar className="w-5 h-5" style={{ color: COLORS.terracottaClay }} />;
      case 'achievement':
        return <Award className="w-5 h-5" style={{ color: COLORS.ochreYellow }} />;
      case 'comment':
        return <MessageCircle className="w-5 h-5" style={{ color: COLORS.palmGreen }} />;
      case 'circle':
        return <Users className="w-5 h-5" style={{ color: COLORS.palmGreen }} />;
      default:
        return <Bell className="w-5 h-5" style={{ color: COLORS.warmSand }} />;
    }
  };

  const formatTimeAgo = (date: Date): string => {
    const seconds = Math.floor((Date.now() - date.getTime()) / 1000);
    
    if (seconds < 60) return 'just now';
    if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
    if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`;
    return `${Math.floor(seconds / 86400)}d ago`;
  };

  const filteredNotifications = notifications.filter(n => 
    filter === 'all' || (filter === 'unread' && !n.read)
  );

  const unreadCount = notifications.filter(n => !n.read).length;

  // ============================================================================
  // SUB-COMPONENTS
  // ============================================================================

  const NotificationHeader = () => (
    <div className="flex items-center justify-between p-4"
         style={{ borderBottom: `1px solid ${COLORS.warmSand}20` }}>
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full flex items-center justify-center relative"
             style={{ background: `linear-gradient(135deg, ${COLORS.sunriseGold} 0%, ${COLORS.terracottaClay} 100%)` }}>
          <Bell className="w-5 h-5 text-white" />
          {unreadCount > 0 && (
            <div className="absolute -top-1 -right-1 w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold text-white"
                 style={{ 
                   backgroundColor: COLORS.terracottaClay,
                   border: `2px solid ${COLORS.deepEarthBrown}`
                 }}>
              {unreadCount}
            </div>
          )}
        </div>
        <div>
          <h2 className="font-bold text-lg" style={{ color: COLORS.warmWhite }}>Notifications</h2>
          <p className="text-sm" style={{ color: COLORS.warmSand }}>{unreadCount} unread</p>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <button
          onClick={() => setShowSettings(!showSettings)}
          className="w-9 h-9 rounded-lg flex items-center justify-center transition-all"
          style={{ backgroundColor: `${COLORS.warmSand}20` }}
        >
          <Settings className="w-4 h-4" style={{ color: COLORS.warmWhite }} />
        </button>
        {onClose && (
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-lg flex items-center justify-center transition-all"
            style={{ backgroundColor: `${COLORS.warmSand}20` }}
          >
            <X className="w-4 h-4" style={{ color: COLORS.warmWhite }} />
          </button>
        )}
      </div>
    </div>
  );

  const FilterTabs = () => (
    <div className="flex gap-2 p-3" style={{ borderBottom: `1px solid ${COLORS.warmSand}20` }}>
      <button
        onClick={() => setFilter('all')}
        className="flex-1 px-4 py-2 rounded-lg font-medium text-sm transition-all"
        style={filter === 'all' ? {
          background: `linear-gradient(135deg, ${COLORS.sunriseGold} 0%, ${COLORS.terracottaClay} 100%)`,
          color: COLORS.white
        } : {
          backgroundColor: `${COLORS.warmSand}10`,
          color: COLORS.warmSand
        }}
      >
        All ({notifications.length})
      </button>
      <button
        onClick={() => setFilter('unread')}
        className="flex-1 px-4 py-2 rounded-lg font-medium text-sm transition-all"
        style={filter === 'unread' ? {
          background: `linear-gradient(135deg, ${COLORS.sunriseGold} 0%, ${COLORS.terracottaClay} 100%)`,
          color: COLORS.white
        } : {
          backgroundColor: `${COLORS.warmSand}10`,
          color: COLORS.warmSand
        }}
      >
        Unread ({unreadCount})
      </button>
    </div>
  );

  const ActionsBar = () => (
    <div className="flex gap-2 p-3" style={{ borderBottom: `1px solid ${COLORS.warmSand}20` }}>
      <button
        onClick={markAllAsRead}
        disabled={unreadCount === 0}
        className="flex-1 px-4 py-2 rounded-lg text-sm font-medium transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        style={{ 
          backgroundColor: `${COLORS.warmSand}10`,
          color: COLORS.warmWhite
        }}
      >
        <Check className="w-4 h-4" />
        Mark All Read
      </button>
      <button
        onClick={clearAll}
        disabled={notifications.length === 0}
        className="flex-1 px-4 py-2 rounded-lg text-sm font-medium transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        style={{ 
          backgroundColor: `${COLORS.warmSand}10`,
          color: COLORS.warmWhite
        }}
      >
        <Trash2 className="w-4 h-4" />
        Clear All
      </button>
    </div>
  );

  const NotificationItem = ({ notification }: { notification: Notification }) => (
    <div
      onClick={() => !notification.read && markAsRead(notification.id)}
      className="p-4 cursor-pointer transition-all"
      style={{ 
        borderBottom: `1px solid ${COLORS.warmSand}20`,
        backgroundColor: !notification.read ? `${COLORS.sunriseGold}10` : 'transparent'
      }}
    >
      <div className="flex gap-3">
        <div className="flex-shrink-0">
          {notification.actor ? (
            <div className="w-12 h-12 rounded-full flex items-center justify-center text-xl"
                 style={{ background: `linear-gradient(135deg, ${COLORS.sunriseGold} 0%, ${COLORS.terracottaClay} 100%)` }}>
              {notification.actor.avatar}
            </div>
          ) : (
            <div className="w-12 h-12 rounded-full flex items-center justify-center"
                 style={{ backgroundColor: `${COLORS.warmSand}20` }}>
              {getNotificationIcon(notification.type)}
            </div>
          )}
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between mb-1">
            <h4 className="font-semibold text-sm" style={{ color: COLORS.warmWhite }}>{notification.title}</h4>
            {!notification.read && (
              <div className="w-2 h-2 rounded-full flex-shrink-0 mt-1" style={{ backgroundColor: COLORS.sunriseGold }} />
            )}
          </div>
          
          <p className="text-sm mb-2" style={{ color: COLORS.warmSand }}>{notification.message}</p>
          
          {notification.metadata && (
            <div className="mb-2">
              <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold"
                    style={{ 
                      backgroundColor: `${COLORS.sunriseGold}30`,
                      color: COLORS.sunriseGold,
                      border: `1px solid ${COLORS.sunriseGold}50`
                    }}>
                <Flame className="w-3 h-3" />
                {notification.metadata.amount} {notification.metadata.asset}
              </span>
            </div>
          )}

          <div className="flex items-center justify-between">
            <span className="text-xs" style={{ color: COLORS.warmSand }}>
              {formatTimeAgo(notification.timestamp)}
            </span>
            
            <button
              onClick={(e) => {
                e.stopPropagation();
                deleteNotification(notification.id);
              }}
              className="transition-colors"
              style={{ color: COLORS.warmSand }}
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const SettingsPanel = () => (
    <div className="p-4 space-y-4"
         style={{ 
           borderTop: `1px solid ${COLORS.warmSand}20`,
           backgroundColor: `${COLORS.warmSand}08`
         }}>
      <h3 className="font-bold mb-3" style={{ color: COLORS.warmWhite }}>Notification Settings</h3>
      
      {Object.entries(settings).map(([key, value]) => (
        <label key={key} className="flex items-center justify-between cursor-pointer">
          <span className="text-sm capitalize" style={{ color: COLORS.warmSand }}>
            {key.replace('_', ' ')}
          </span>
          <button
            onClick={() => setSettings({ ...settings, [key]: !value })}
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
  );

  const EmptyState = () => (
    <div className="flex flex-col items-center justify-center p-12 text-center">
      <div className="w-20 h-20 rounded-full flex items-center justify-center mb-4"
           style={{ backgroundColor: `${COLORS.warmSand}20` }}>
        <Bell className="w-10 h-10" style={{ color: COLORS.warmSand }} />
      </div>
      <h3 className="font-bold text-lg mb-2" style={{ color: COLORS.warmWhite }}>All caught up!</h3>
      <p className="text-sm" style={{ color: COLORS.warmSand }}>
        You don't have any notifications right now
      </p>
    </div>
  );

  // ============================================================================
  // MAIN RENDER
  // ============================================================================

  return (
    <div className="h-full flex flex-col rounded-2xl overflow-hidden"
         style={{ 
           backgroundColor: COLORS.deepEarthBrown,
           border: `1px solid ${COLORS.warmSand}20`
         }}>
      <NotificationHeader />
      <FilterTabs />
      <ActionsBar />

      <div className="flex-1 overflow-y-auto">
        {filteredNotifications.length > 0 ? (
          filteredNotifications.map(notification => (
            <NotificationItem key={notification.id} notification={notification} />
          ))
        ) : (
          <EmptyState />
        )}
      </div>

      {showSettings && <SettingsPanel />}
    </div>
  );
};

export default NotificationsPanel;