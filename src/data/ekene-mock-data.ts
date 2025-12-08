/**
 * ============================================================================
 * Ekene - Mock Data Store
 * ============================================================================
 * Location: src/data/ekene-mock-data.ts
 * 
 * Afrocentric mock data with cultural names and authentic scenarios
 * ============================================================================
 */

// ============================================================================
// TYPES
// ============================================================================

export interface EkeneUser {
  id: string;
  name: string;
  username: string;
  avatar: string; // Emoji for now
  bio: string;
  walletAddress: string;
  followers: number;
  totalTipped: number;
  role: 'creator' | 'supporter' | 'community';
  badges: string[];
}

export interface EkeneCommunity {
  id: string;
  name: string;
  icon: string;
  description: string;
  members: number;
  totalTipped: number;
  color: string;
  gradient: string;
  tags: string[];
}

export interface EkeneTip {
  id: string;
  from: EkeneUser;
  to: EkeneUser;
  amount: number;
  token: 'DOT' | 'USDC' | 'Ekene';
  message?: string;
  timestamp: string;
}

export interface EkenePost {
  id: string;
  creator: EkeneUser;
  content: string;
  media?: string[];
  likes: number;
  comments: number;
  timestamp: string;
}

export interface EkeneMilestone {
  id: string;
  creator: EkeneUser;
  type: 'supporters' | 'tips' | 'community';
  milestone: string;
  value: number;
  timestamp: string;
}

// ============================================================================
// MOCK USERS (Afrocentric Names)
// ============================================================================

export const MOCK_CREATORS: EkeneUser[] = [
  {
    id: '1',
    name: 'Amina Kwesi',
    username: '@amina_creates',
    avatar: '🎨',
    bio: 'Visual artist weaving Adinkra symbols into digital art. Based in Accra, creating bridges between tradition and Web3.',
    walletAddress: '5GrwvaEF5zXb26Fz9rcQpDWS57CtERHpNehXCPcNoHGKutQY',
    followers: 1247,
    totalTipped: 342.5,
    role: 'creator',
    badges: ['Early Firekeeper', 'Umu Oha'],
  },
  {
    id: '2',
    name: 'Kwame Osei',
    username: '@kwame_drums',
    avatar: '🥁',
    bio: 'Traditional drummer bringing ancestral rhythms to modern beats. Teaching the language of talking drums.',
    walletAddress: '5FHneW46xGXgs5mUiveU4sbTyGBzmstUspZC92UhjJM694ty',
    followers: 892,
    totalTipped: 198.3,
    role: 'creator',
    badges: ['Ọzọ Tipper', 'Kpakpando'],
  },
  {
    id: '3',
    name: 'Zuri Mwangi',
    username: '@zuri_voice',
    avatar: '🎵',
    bio: 'Afrobeats artist & songwriter. Singing stories of our ancestors in modern melodies.',
    walletAddress: '5DAAnrj7VHTznn2AWBemMuyBwZWs6FNFjdyVXUeYum3PTXFy',
    followers: 2103,
    totalTipped: 567.8,
    role: 'creator',
    badges: ['Early Firekeeper', 'Ọzọ Tipper'],
  },
  {
    id: '4',
    name: 'Jabari Tanaka',
    username: '@jabari_writes',
    avatar: '✍️',
    bio: 'Storyteller crafting tales from Yoruba folklore. Words are my cowrie shells.',
    walletAddress: '5HGjWAeFDfFCWPsjFQdVV2Msvz2XtMktvgocEZcCj68kUMaw',
    followers: 745,
    totalTipped: 234.2,
    role: 'creator',
    badges: ['Kpakpando'],
  },
  {
    id: '5',
    name: 'Nia Okoye',
    username: '@nia_codes',
    avatar: '💻',
    bio: 'Blockchain developer building tools for African creators. Code with purpose.',
    walletAddress: '5FLSigC9HGRKVhB9FiEo4Y3koPsNmBmLJbpXg2mp1hXcS59Y',
    followers: 1456,
    totalTipped: 445.9,
    role: 'creator',
    badges: ['Umu Oha', 'Ọzọ Tipper'],
  },
];

// ============================================================================
// MOCK COMMUNITIES
// ============================================================================

export const MOCK_COMMUNITIES: EkeneCommunity[] = [
  {
    id: '1',
    name: 'Adinkra Artists',
    icon: '🎨',
    description: 'Visual artists preserving and evolving traditional symbols',
    members: 234,
    totalTipped: 1247.5,
    color: '#E5A039',
    gradient: 'linear-gradient(135deg, #E5A039 0%, #D96B3C 100%)',
    tags: ['Art', 'Culture', 'Design'],
  },
  {
    id: '2',
    name: 'Drum Circle',
    icon: '🥁',
    description: 'Musicians keeping ancestral rhythms alive',
    members: 189,
    totalTipped: 892.3,
    color: '#2B6E3E',
    gradient: 'linear-gradient(135deg, #2B6E3E 0%, #9CAF88 100%)',
    tags: ['Music', 'Tradition', 'Rhythm'],
  },
  {
    id: '3',
    name: 'Griots & Storytellers',
    icon: '📖',
    description: 'Keepers of oral tradition in the digital age',
    members: 156,
    totalTipped: 567.8,
    color: '#D96B3C',
    gradient: 'linear-gradient(135deg, #D96B3C 0%, #8B4513 100%)',
    tags: ['Stories', 'Writing', 'Culture'],
  },
  {
    id: '4',
    name: 'Web3 Builders',
    icon: '💻',
    description: 'Developers creating tools for African creators',
    members: 312,
    totalTipped: 2103.4,
    color: '#8B4513',
    gradient: 'linear-gradient(135deg, #8B4513 0%, #3A2A1A 100%)',
    tags: ['Tech', 'Blockchain', 'Innovation'],
  },
  {
    id: '5',
    name: 'Afrobeats Collective',
    icon: '🎵',
    description: 'Musicians blending tradition with modern sound',
    members: 445,
    totalTipped: 3456.2,
    color: '#CB4154',
    gradient: 'linear-gradient(135deg, #CB4154 0%, #D96B3C 100%)',
    tags: ['Music', 'Afrobeats', 'Culture'],
  },
];

// ============================================================================
// MOCK FEED ITEMS
// ============================================================================

export const MOCK_FEED_ITEMS: Array<EkeneTip | EkeneMilestone | EkenePost> = [
  // Tip
  {
    id: 'tip-1',
    from: MOCK_CREATORS[0],
    to: MOCK_CREATORS[1],
    amount: 5.0,
    token: 'DOT',
    message: 'Your drumming video touched my soul! Asante sana 🥁',
    timestamp: '2 hours ago',
  },
  
  // Milestone
  {
    id: 'milestone-1',
    creator: MOCK_CREATORS[2],
    type: 'supporters',
    milestone: '100 supporters reached!',
    value: 523.8,
    timestamp: '5 hours ago',
  },
  
  // Post
  {
    id: 'post-1',
    creator: MOCK_CREATORS[3],
    content: 'New folktale dropping tomorrow: "The Calabash That Remembered." A story about memory, ancestors, and digital immortality. 📖✨',
    likes: 45,
    comments: 12,
    timestamp: '1 day ago',
  },
  
  // Tip
  {
    id: 'tip-2',
    from: MOCK_CREATORS[4],
    to: MOCK_CREATORS[2],
    amount: 10.0,
    token: 'DOT',
    message: 'Your new single is 🔥🔥🔥 Keep blessing us!',
    timestamp: '1 day ago',
  },
  
  // Post
  {
    id: 'post-2',
    creator: MOCK_CREATORS[0],
    content: 'Just finished a new piece merging Nsibidi script with generative art. The ancestors speak through algorithms too. 🌍✨',
    likes: 78,
    comments: 23,
    timestamp: '2 days ago',
  },
];

// ============================================================================
// MOCK EVENTS
// ============================================================================

export interface EkeneEvent {
  id: string;
  name: string;
  icon: string;
  host: EkeneUser;
  attendees: number;
  liveTips: number;
  startTime: string;
  isLive: boolean;
}

export const MOCK_EVENTS: EkeneEvent[] = [
  {
    id: '1',
    name: 'Polkadot Connect Nairobi',
    icon: '🌍',
    host: MOCK_CREATORS[4],
    attendees: 127,
    liveTips: 892.3,
    startTime: 'Live now',
    isLive: true,
  },
  {
    id: '2',
    name: 'Adinkra Art Workshop',
    icon: '🎨',
    host: MOCK_CREATORS[0],
    attendees: 45,
    liveTips: 234.5,
    startTime: 'Tomorrow, 2 PM',
    isLive: false,
  },
];

// ============================================================================
// MOCK TIPS HISTORY
// ============================================================================

export const MOCK_TIPS_HISTORY: EkeneTip[] = [
  {
    id: 'hist-1',
    from: MOCK_CREATORS[0],
    to: MOCK_CREATORS[1],
    amount: 5.0,
    token: 'DOT',
    message: 'Beautiful work!',
    timestamp: '2 hours ago',
  },
  {
    id: 'hist-2',
    from: MOCK_CREATORS[4],
    to: MOCK_CREATORS[2],
    amount: 10.0,
    token: 'DOT',
    timestamp: '5 hours ago',
  },
  {
    id: 'hist-3',
    from: MOCK_CREATORS[3],
    to: MOCK_CREATORS[0],
    amount: 2.5,
    token: 'USDC',
    message: 'Keep creating! 🔥',
    timestamp: '1 day ago',
  },
];

// ============================================================================
// API CALL PLACEHOLDERS
// ============================================================================

// TODO: Replace with actual API calls

export async function fetchFeed() {
  // GET /api/feed
  // Headers: { Authorization: Bearer <token> }
  // Returns: Array<FeedItem>
  return new Promise(resolve => {
    setTimeout(() => resolve(MOCK_FEED_ITEMS), 500);
  });
}

export async function fetchCreators() {
  // GET /api/creators
  // Returns: Array<EkeneUser>
  return new Promise(resolve => {
    setTimeout(() => resolve(MOCK_CREATORS), 500);
  });
}

export async function fetchCommunities() {
  // GET /api/communities
  // Returns: Array<EkeneCommunity>
  return new Promise(resolve => {
    setTimeout(() => resolve(MOCK_COMMUNITIES), 500);
  });
}

export async function fetchUserCommunities() {
  // GET /api/communities/my
  // Headers: { Authorization: Bearer <token> }
  // Returns: Array<EkeneCommunity>
  return new Promise(resolve => {
    setTimeout(() => resolve(MOCK_COMMUNITIES.slice(0, 3)), 500);
  });
}

export async function fetchWalletBalance() {
  // GET /api/wallet/balance
  // Headers: { Authorization: Bearer <token> }
  // Returns: { balance: number, token: string }
  return new Promise(resolve => {
    setTimeout(() => resolve({ balance: 24.5, token: 'DOT' }), 500);
  });
}

export async function fetchTipsHistory() {
  // GET /api/tips/history
  // Headers: { Authorization: Bearer <token> }
  // Returns: Array<EkeneTip>
  return new Promise(resolve => {
    setTimeout(() => resolve(MOCK_TIPS_HISTORY), 500);
  });
}

export async function fetchEvents() {
  // GET /api/events
  // Returns: Array<EkeneEvent>
  return new Promise(resolve => {
    setTimeout(() => resolve(MOCK_EVENTS), 500);
  });
}