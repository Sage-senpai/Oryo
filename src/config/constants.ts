// File: src/config/constants.ts
// Production constants and configuration
// Official Ekene theme colors and app settings

// ============================================================================
// OFFICIAL EKENE COLORS (from _variables.scss)
// ============================================================================

export const EKENE_COLORS = {
  // Core Earth Tones
  deepEarthBrown: '#3A2A1A',
  palmGreen: '#2B6E3E',
  sunriseGold: '#E5A039',
  terracottaClay: '#D96B3C',
  warmSand: '#F3E7D3',
  
  // Dark Mode
  midnightIndigo: '#0C0F26',
  
  // Supporting Tones
  ochreYellow: '#DAA520',
  burntSienna: '#8B4513',
  sageGreen: '#9CAF88',
  clayRed: '#CB4154',
  
  // Neutrals with Warmth
  white: '#FFFFFF',
  warmWhite: '#FFFEF9',
  cream: '#FAF8F3',
  lightSand: '#EDE8DF',
  mediumSand: '#D4C9B8',
  darkSand: '#9B8B7E',
  charcoal: '#2D2520',
  black: '#1A1410',
  
  // Semantic Colors
  success: '#4CAF50',
  warning: '#FFA726',
  error: '#E53935',
  info: '#2196F3'
} as const;

// ============================================================================
// GRADIENTS
// ============================================================================

export const EKENE_GRADIENTS = {
  fireFlow: `linear-gradient(135deg, ${EKENE_COLORS.sunriseGold} 0%, ${EKENE_COLORS.terracottaClay} 100%)`,
  emberGlow: `linear-gradient(135deg, ${EKENE_COLORS.ochreYellow} 0%, ${EKENE_COLORS.sunriseGold} 100%)`,
  villageNight: `linear-gradient(135deg, ${EKENE_COLORS.deepEarthBrown} 0%, ${EKENE_COLORS.charcoal} 50%, ${EKENE_COLORS.deepEarthBrown} 100%)`,
  palmLife: `linear-gradient(135deg, ${EKENE_COLORS.palmGreen} 0%, ${EKENE_COLORS.sageGreen} 100%)`,
  ceremonyGlow: `linear-gradient(135deg, rgba(229, 160, 57, 0.2) 0%, rgba(217, 107, 60, 0.1) 100%)`
} as const;

// ============================================================================
// API CONFIGURATION
// ============================================================================

export const API_CONFIG = {
  BASE_URL: import.meta.env.VITE_API_URL || 'https://api.ekene.app',
  TIMEOUT: 30000,
  MAX_RETRIES: 3,
  RETRY_DELAY: 1000,
  CACHE_TTL: 60000, // 1 minute
} as const;

// ============================================================================
// POLKADOT CONFIGURATION
// ============================================================================

export const POLKADOT_CONFIG = {
  RELAY_CHAIN_WS: import.meta.env.VITE_RELAY_CHAIN_WS || 'wss://rpc.polkadot.io',
  ASSET_HUB_WS: import.meta.env.VITE_ASSET_HUB_WS || 'wss://polkadot-asset-hub-rpc.polkadot.io',
  HYDRATION_WS: import.meta.env.VITE_HYDRATION_WS || 'wss://rpc.hydradx.cloud',
  SS58_FORMAT: 42,
  DECIMALS: {
    DOT: 10,
    USDC: 6,
    EKENE: 4
  }
} as const;

// ============================================================================
// CULTURAL BADGES
// ============================================================================

export const CULTURAL_BADGES = {
  GRIOT: {
    name: 'Griot',
    description: 'Storyteller and cultural keeper',
    icon: '📖',
    color: EKENE_COLORS.ochreYellow
  },
  UMU_OHA: {
    name: 'Umu Oha',
    description: 'Community Builder',
    icon: '🏘️',
    color: EKENE_COLORS.palmGreen
  },
  OZO_TIPPER: {
    name: 'Ọzọ Tipper',
    description: 'Top Supporter',
    icon: '🔥',
    color: EKENE_COLORS.sunriseGold
  },
  KPAKPANDO: {
    name: 'Kpakpando',
    description: 'Rising Star',
    icon: '⭐',
    color: EKENE_COLORS.terracottaClay
  },
  FIREKEEPER: {
    name: 'Firekeeper',
    description: 'Early Community Member',
    icon: '🔥',
    color: EKENE_COLORS.ochreYellow
  }
} as const;

// ============================================================================
// WARMTH REWARDS
// ============================================================================

export const WARMTH_CONFIG = {
  DAILY_LOGIN: 1,
  TIP_SENT: 3,
  TIP_RECEIVED: 2,
  POST_CREATED: 2,
  COMMENT: 1,
  EVENT_ATTENDANCE: 5,
  SESSION_CHECKIN: 2,
  CIRCLE_JOIN: 2,
  ACHIEVEMENT_COMPLETE: {
    common: 5,
    rare: 10,
    epic: 25,
    legendary: 50
  },
  STREAK_BONUS: {
    3: 5,
    7: 15,
    30: 50,
    100: 200
  }
} as const;

// ============================================================================
// ACHIEVEMENT TIERS
// ============================================================================

export const ACHIEVEMENT_TIERS = {
  FIRST_EKENE: {
    id: 'first_ekene',
    title: 'First Ekene',
    description: 'Send your first tip',
    target: 1,
    warmth: 10,
    rarity: 'common'
  },
  GENEROUS_GIVER: {
    id: 'generous_giver',
    title: 'Generous Giver',
    description: 'Send 50 tips',
    target: 50,
    warmth: 50,
    rarity: 'rare'
  },
  COMMUNITY_BUILDER: {
    id: 'community_builder',
    title: 'Community Builder',
    description: 'Join 10 circles',
    target: 10,
    warmth: 30,
    rarity: 'rare'
  },
  VILLAGE_ELDER: {
    id: 'village_elder',
    title: 'Village Elder',
    description: 'Reach 1000 warmth',
    target: 1000,
    warmth: 100,
    rarity: 'epic'
  },
  EVENT_HOST: {
    id: 'event_host',
    title: 'Event Host',
    description: 'Host your first event',
    target: 1,
    warmth: 75,
    rarity: 'epic'
  }
} as const;

// ============================================================================
// TIP PRESETS
// ============================================================================

export const TIP_PRESETS = {
  DOT: [0.5, 1, 5, 10, 25],
  USDC: [1, 5, 10, 25, 50],
  EKENE: [10, 25, 50, 100, 250]
} as const;

// ============================================================================
// PAGINATION
// ============================================================================

export const PAGINATION = {
  DEFAULT_PAGE_SIZE: 20,
  MAX_PAGE_SIZE: 100,
  FEED_PAGE_SIZE: 20,
  SEARCH_PAGE_SIZE: 15,
  LEADERBOARD_PAGE_SIZE: 50
} as const;

// ============================================================================
// VALIDATION RULES
// ============================================================================

export const VALIDATION = {
  USERNAME: {
    MIN_LENGTH: 3,
    MAX_LENGTH: 20,
    PATTERN: /^[a-zA-Z0-9_-]+$/,
    MESSAGE: 'Username must be 3-20 characters, letters, numbers, - and _ only'
  },
  DISPLAY_NAME: {
    MIN_LENGTH: 2,
    MAX_LENGTH: 50,
    MESSAGE: 'Display name must be 2-50 characters'
  },
  BIO: {
    MAX_LENGTH: 200,
    MESSAGE: 'Bio must be under 200 characters'
  },
  POST_CONTENT: {
    MIN_LENGTH: 1,
    MAX_LENGTH: 5000,
    MESSAGE: 'Post must be 1-5000 characters'
  },
  TIP_MESSAGE: {
    MAX_LENGTH: 200,
    MESSAGE: 'Tip message must be under 200 characters'
  },
  CIRCLE_NAME: {
    MIN_LENGTH: 3,
    MAX_LENGTH: 50,
    MESSAGE: 'Circle name must be 3-50 characters'
  },
  CIRCLE_DESCRIPTION: {
    MIN_LENGTH: 10,
    MAX_LENGTH: 500,
    MESSAGE: 'Circle description must be 10-500 characters'
  }
} as const;

// ============================================================================
// FILE UPLOAD LIMITS
// ============================================================================

export const UPLOAD_LIMITS = {
  MAX_FILE_SIZE: 10 * 1024 * 1024, // 10MB
  MAX_FILES_PER_POST: 4,
  ALLOWED_IMAGE_TYPES: ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'],
  ALLOWED_VIDEO_TYPES: ['video/mp4', 'video/webm'],
  MAX_IMAGE_SIZE: 5 * 1024 * 1024, // 5MB
  MAX_VIDEO_SIZE: 50 * 1024 * 1024 // 50MB
} as const;

// ============================================================================
// RATE LIMITS
// ============================================================================

export const RATE_LIMITS = {
  TIPS_PER_MINUTE: 10,
  POSTS_PER_HOUR: 20,
  FOLLOWS_PER_MINUTE: 30,
  API_REQUESTS_PER_MINUTE: 100
} as const;

// ============================================================================
// NOTIFICATION SETTINGS
// ============================================================================

export const NOTIFICATION_TYPES = {
  TIP_RECEIVED: 'tip_received',
  TIP_SENT: 'tip_sent',
  FOLLOW: 'follow',
  COMMENT: 'comment',
  EVENT: 'event',
  ACHIEVEMENT: 'achievement',
  CIRCLE_INVITE: 'circle_invite',
  CIRCLE_JOIN: 'circle_join'
} as const;

// ============================================================================
// LOCAL STORAGE KEYS
// ============================================================================

export const STORAGE_KEYS = {
  AUTH_TOKEN: 'ekene_auth_token',
  TEMP_ACCOUNT: 'ekene_temp_account',
  USER_PREFERENCES: 'ekene_user_preferences',
  RECENT_SEARCHES: 'ekene_recent_searches',
  DRAFT_POST: 'ekene_draft_post',
  NOTIFICATION_PREFS: 'ekene_notification_prefs',
  THEME: 'ekene_theme',
  LANGUAGE: 'ekene_language'
} as const;

// ============================================================================
// ROUTES
// ============================================================================

export const ROUTES = {
  HOME: '/',
  AUTH: '/auth',
  APP: '/app',
  FEED: '/app',
  DISCOVER: '/app/discover',
  WALLET: '/app/wallet',
  PROFILE: '/app/profile',
  SETTINGS: '/app/settings',
  CREATOR: (address: string) => `/app/creator/${address}`,
  EVENTS: '/app/events',
  EVENT: (id: string) => `/app/events/${id}`,
  REWARDS: '/app/rewards',
  NOTIFICATIONS: '/app/notifications'
} as const;

// ============================================================================
// SOCIAL LINKS
// ============================================================================

export const SOCIAL_LINKS = {
  TWITTER: 'https://twitter.com/ekeneapp',
  TELEGRAM: 'https://t.me/ekeneapp',
  DISCORD: 'https://discord.gg/ekene',
  GITHUB: 'https://github.com/ekene',
  DOCS: 'https://docs.ekene.app'
} as const;

// ============================================================================
// FEATURE FLAGS
// ============================================================================

export const FEATURES = {
  ENABLE_EVENTS: true,
  ENABLE_CIRCLES: true,
  ENABLE_REWARDS: true,
  ENABLE_NFT_BADGES: true,
  ENABLE_CROSS_CHAIN: true,
  ENABLE_NOTIFICATIONS: true,
  ENABLE_DARK_MODE: true,
  ENABLE_MULTI_LANGUAGE: false, // Coming soon
  ENABLE_VIDEO_POSTS: false // Coming soon
} as const;

// ============================================================================
// DEFAULT VALUES
// ============================================================================

export const DEFAULTS = {
  AVATAR: '👤',
  CURRENCY: 'USD',
  LANGUAGE: 'en',
  THEME: 'dark',
  TIMEZONE: 'UTC'
} as const;

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

/**
 * Get rarity color
 */
export function getRarityColor(rarity: 'common' | 'rare' | 'epic' | 'legendary'): string {
  switch (rarity) {
    case 'legendary':
      return EKENE_COLORS.ochreYellow;
    case 'epic':
      return EKENE_COLORS.sunriseGold;
    case 'rare':
      return EKENE_COLORS.palmGreen;
    default:
      return EKENE_COLORS.warmSand;
  }
}

/**
 * Format currency amount
 */
export function formatAmount(amount: number, decimals: number = 2): string {
  return amount.toLocaleString('en-US', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals
  });
}

/**
 * Truncate address
 */
export function truncateAddress(address: string, start: number = 6, end: number = 4): string {
  if (address.length <= start + end) {
    return address;
  }
  return `${address.slice(0, start)}...${address.slice(-end)}`;
}

/**
 * Format time ago
 */
export function formatTimeAgo(date: Date): string {
  const seconds = Math.floor((Date.now() - date.getTime()) / 1000);
  
  if (seconds < 60) return 'just now';
  if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
  if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`;
  if (seconds < 604800) return `${Math.floor(seconds / 86400)}d ago`;
  return date.toLocaleDateString();
}

/**
 * Validate username
 */
export function isValidUsername(username: string): boolean {
  return (
    username.length >= VALIDATION.USERNAME.MIN_LENGTH &&
    username.length <= VALIDATION.USERNAME.MAX_LENGTH &&
    VALIDATION.USERNAME.PATTERN.test(username)
  );
}

/**
 * Get asset decimals
 */
export function getAssetDecimals(symbol: string): number {
  return POLKADOT_CONFIG.DECIMALS[symbol as keyof typeof POLKADOT_CONFIG.DECIMALS] || 10;
}

// ============================================================================
// EXPORT ALL
// ============================================================================

export default {
  COLORS: EKENE_COLORS,
  GRADIENTS: EKENE_GRADIENTS,
  API: API_CONFIG,
  POLKADOT: POLKADOT_CONFIG,
  BADGES: CULTURAL_BADGES,
  WARMTH: WARMTH_CONFIG,
  ACHIEVEMENTS: ACHIEVEMENT_TIERS,
  TIP_PRESETS,
  PAGINATION,
  VALIDATION,
  UPLOAD_LIMITS,
  RATE_LIMITS,
  NOTIFICATION_TYPES,
  STORAGE_KEYS,
  ROUTES,
  SOCIAL_LINKS,
  FEATURES,
  DEFAULTS
};