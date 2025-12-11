// File: src/services/api/EkeneAPI.ts
// Backend API integration for Ekene
// Handles user profiles, communities, events, transactions, and social features

// ============================================================================
// TYPE DEFINITIONS
// ============================================================================

export interface UserProfile {
  address: string;
  username: string;
  displayName: string;
  bio?: string;
  avatar?: string;
  
  // Social links
  twitter?: string;
  telegram?: string;
  website?: string;
  
  // Stats
  followersCount: number;
  followingCount: number;
  tipsReceived: string;
  tipsSent: string;
  supportersCount: number;
  
  // Badges & identity
  badges: Badge[];
  culturalBadge?: string; // Griot, Umu Oha, etc.
  verifiedCreator: boolean;
  
  // Community
  circles: Circle[];
  createdAt: Date;
}

export interface Circle {
  id: string;
  name: string;
  description: string;
  bannerUrl?: string;
  memberCount: number;
  
  // Access control
  isPrivate: boolean;
  joinRequirement?: {
    tokenRequired?: string;
    minimumAmount?: string;
    nftRequired?: string;
  };
  
  // Creator/admin
  creator: string;
  admins: string[];
  
  // Stats
  totalTips: string;
  createdAt: Date;
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
  earnedAt: Date;
}

export interface Post {
  id: string;
  author: UserProfile;
  content: string;
  mediaUrls?: string[];
  
  // Engagement
  tipsReceived: string;
  tipsCount: number;
  commentsCount: number;
  sharesCount: number;
  
  // Circle/event context
  circleId?: string;
  eventId?: string;
  
  createdAt: Date;
}

export interface LeaderboardEntry {
  rank: number;
  user: UserProfile;
  value: string; // Amount or count
  change?: number; // Position change
}

// ============================================================================
// API CLIENT CLASS
// ============================================================================

export class EkeneAPIClient {
  private baseUrl: string;
  private authToken?: string;

  constructor(baseUrl: string = 'https://api.ekene.app') {
    this.baseUrl = baseUrl;
  }

  // --------------------------------------------------------------------------
  // AUTHENTICATION
  // --------------------------------------------------------------------------

  /**
   * Set authentication token
   */
  setAuthToken(token: string): void {
    this.authToken = token;
    localStorage.setItem('ekene_auth_token', token);
  }

  /**
   * Get stored auth token
   */
  private getAuthToken(): string | null {
    return this.authToken || localStorage.getItem('ekene_auth_token');
  }

  /**
   * Clear authentication
   */
  clearAuth(): void {
    this.authToken = undefined;
    localStorage.removeItem('ekene_auth_token');
  }

  /**
   * Make authenticated request
   */
  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const token = this.getAuthToken();
    
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
      ...options.headers
    };

    const response = await fetch(`${this.baseUrl}${endpoint}`, {
      ...options,
      headers
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({ message: 'Request failed' }));
      throw new Error(error.message || `HTTP ${response.status}`);
    }

    return response.json();
  }

  // --------------------------------------------------------------------------
  // USER PROFILE
  // --------------------------------------------------------------------------

  /**
   * Get user profile by address or username
   */
  async getProfile(identifier: string): Promise<UserProfile> {
    return this.request<UserProfile>(`/users/${identifier}`);
  }

  /**
   * Update user profile
   */
  async updateProfile(updates: Partial<UserProfile>): Promise<UserProfile> {
    return this.request<UserProfile>('/users/me', {
      method: 'PATCH',
      body: JSON.stringify(updates)
    });
  }

  /**
   * Upload profile avatar
   */
  async uploadAvatar(file: File): Promise<string> {
    const formData = new FormData();
    formData.append('avatar', file);

    const token = this.getAuthToken();
    const response = await fetch(`${this.baseUrl}/users/me/avatar`, {
      method: 'POST',
      headers: {
        ...(token && { Authorization: `Bearer ${token}` })
      },
      body: formData
    });

    if (!response.ok) throw new Error('Failed to upload avatar');
    
    const { avatarUrl } = await response.json();
    return avatarUrl;
  }

  /**
   * Follow a user
   */
  async followUser(address: string): Promise<void> {
    await this.request(`/users/${address}/follow`, {
      method: 'POST'
    });
  }

  /**
   * Unfollow a user
   */
  async unfollowUser(address: string): Promise<void> {
    await this.request(`/users/${address}/follow`, {
      method: 'DELETE'
    });
  }

  /**
   * Get user's followers
   */
  async getFollowers(address: string, page = 1): Promise<UserProfile[]> {
    return this.request<UserProfile[]>(`/users/${address}/followers?page=${page}`);
  }

  /**
   * Get users that a user is following
   */
  async getFollowing(address: string, page = 1): Promise<UserProfile[]> {
    return this.request<UserProfile[]>(`/users/${address}/following?page=${page}`);
  }

  // --------------------------------------------------------------------------
  // FEED & DISCOVERY
  // --------------------------------------------------------------------------

  /**
   * Get personalized village feed
   */
  async getFeed(page = 1): Promise<Post[]> {
    return this.request<Post[]>(`/feed?page=${page}`);
  }

  /**
   * Get trending posts
   */
  async getTrending(timeframe: '24h' | '7d' | '30d' = '24h'): Promise<Post[]> {
    return this.request<Post[]>(`/posts/trending?timeframe=${timeframe}`);
  }

  /**
   * Search users
   */
  async searchUsers(query: string): Promise<UserProfile[]> {
    return this.request<UserProfile[]>(`/search/users?q=${encodeURIComponent(query)}`);
  }

  /**
   * Search circles
   */
  async searchCircles(query: string): Promise<Circle[]> {
    return this.request<Circle[]>(`/search/circles?q=${encodeURIComponent(query)}`);
  }

  /**
   * Get recommended creators
   */
  async getRecommendedCreators(): Promise<UserProfile[]> {
    return this.request<UserProfile[]>('/discover/creators');
  }

  /**
   * Get nearby users (location-based)
   */
  async getNearbyUsers(latitude: number, longitude: number): Promise<UserProfile[]> {
    return this.request<UserProfile[]>(`/discover/nearby?lat=${latitude}&lng=${longitude}`);
  }

  // --------------------------------------------------------------------------
  // CIRCLES (COMMUNITIES)
  // --------------------------------------------------------------------------

  /**
   * Get circle details
   */
  async getCircle(circleId: string): Promise<Circle> {
    return this.request<Circle>(`/circles/${circleId}`);
  }

  /**
   * Create a new circle
   */
  async createCircle(data: {
    name: string;
    description: string;
    isPrivate?: boolean;
    bannerUrl?: string;
  }): Promise<Circle> {
    return this.request<Circle>('/circles', {
      method: 'POST',
      body: JSON.stringify(data)
    });
  }

  /**
   * Join a circle
   */
  async joinCircle(circleId: string): Promise<void> {
    await this.request(`/circles/${circleId}/join`, {
      method: 'POST'
    });
  }

  /**
   * Leave a circle
   */
  async leaveCircle(circleId: string): Promise<void> {
    await this.request(`/circles/${circleId}/leave`, {
      method: 'POST'
    });
  }

  /**
   * Get circle members
   */
  async getCircleMembers(circleId: string, page = 1): Promise<UserProfile[]> {
    return this.request<UserProfile[]>(`/circles/${circleId}/members?page=${page}`);
  }

  /**
   * Get circle posts
   */
  async getCirclePosts(circleId: string, page = 1): Promise<Post[]> {
    return this.request<Post[]>(`/circles/${circleId}/posts?page=${page}`);
  }

  // --------------------------------------------------------------------------
  // POSTS & CONTENT
  // --------------------------------------------------------------------------

  /**
   * Create a post
   */
  async createPost(data: {
    content: string;
    mediaUrls?: string[];
    circleId?: string;
  }): Promise<Post> {
    return this.request<Post>('/posts', {
      method: 'POST',
      body: JSON.stringify(data)
    });
  }

  /**
   * Get post by ID
   */
  async getPost(postId: string): Promise<Post> {
    return this.request<Post>(`/posts/${postId}`);
  }

  /**
   * Delete a post
   */
  async deletePost(postId: string): Promise<void> {
    await this.request(`/posts/${postId}`, {
      method: 'DELETE'
    });
  }

  // --------------------------------------------------------------------------
  // TRANSACTIONS & TIPS
  // --------------------------------------------------------------------------

  /**
   * Record a tip transaction
   */
  async recordTip(data: {
    from: string;
    to: string;
    amount: string;
    asset: string;
    txHash: string;
    message?: string;
    postId?: string;
    eventId?: string;
  }): Promise<void> {
    await this.request('/transactions/tips', {
      method: 'POST',
      body: JSON.stringify(data)
    });
  }

  /**
   * Get transaction history
   */
  async getTransactionHistory(
    address: string,
    type?: 'sent' | 'received'
  ): Promise<any[]> {
    const params = type ? `?type=${type}` : '';
    return this.request(`/transactions/${address}${params}`);
  }

  /**
   * Get leaderboard for tips
   */
  async getTipLeaderboard(
    timeframe: '24h' | '7d' | '30d' | 'all' = '7d',
    type: 'received' | 'sent' = 'received'
  ): Promise<LeaderboardEntry[]> {
    return this.request<LeaderboardEntry[]>(
      `/leaderboard/tips?timeframe=${timeframe}&type=${type}`
    );
  }

  // --------------------------------------------------------------------------
  // EVENTS
  // --------------------------------------------------------------------------

  /**
   * Get event details
   */
  async getEvent(eventId: string): Promise<any> {
    return this.request(`/events/${eventId}`);
  }

  /**
   * Get event by slug
   */
  async getEventBySlug(slug: string): Promise<any> {
    return this.request(`/events/slug/${slug}`);
  }

  /**
   * Get upcoming events
   */
  async getUpcomingEvents(): Promise<any[]> {
    return this.request('/events/upcoming');
  }

  /**
   * Register for an event
   */
  async registerForEvent(eventId: string): Promise<void> {
    await this.request(`/events/${eventId}/register`, {
      method: 'POST'
    });
  }

  /**
   * Get event live feed
   */
  async getEventLiveFeed(eventId: string): Promise<any[]> {
    return this.request(`/events/${eventId}/live-feed`);
  }

  // --------------------------------------------------------------------------
  // BADGES & ACHIEVEMENTS
  // --------------------------------------------------------------------------

  /**
   * Get user badges
   */
  async getUserBadges(address: string): Promise<Badge[]> {
    return this.request<Badge[]>(`/users/${address}/badges`);
  }

  /**
   * Claim a badge
   */
  async claimBadge(badgeId: string): Promise<Badge> {
    return this.request<Badge>(`/badges/${badgeId}/claim`, {
      method: 'POST'
    });
  }

  // --------------------------------------------------------------------------
  // REWARDS & WARMTH
  // --------------------------------------------------------------------------

  /**
   * Get warmth balance
   */
  async getWarmth(address: string): Promise<number> {
    const { warmth } = await this.request<{ warmth: number }>(`/users/${address}/warmth`);
    return warmth;
  }

  /**
   * Claim daily warmth
   */
  async claimDailyWarmth(): Promise<number> {
    const { warmth } = await this.request<{ warmth: number }>('/rewards/daily', {
      method: 'POST'
    });
    return warmth;
  }

  /**
   * Get claimable rewards
   */
  async getClaimableRewards(): Promise<any[]> {
    return this.request('/rewards/claimable');
  }

  // --------------------------------------------------------------------------
  // NOTIFICATIONS
  // --------------------------------------------------------------------------

  /**
   * Get notifications
   */
  async getNotifications(page = 1): Promise<any[]> {
    return this.request(`/notifications?page=${page}`);
  }

  /**
   * Mark notification as read
   */
  async markNotificationRead(notificationId: string): Promise<void> {
    await this.request(`/notifications/${notificationId}/read`, {
      method: 'POST'
    });
  }

  /**
   * Mark all notifications as read
   */
  async markAllNotificationsRead(): Promise<void> {
    await this.request('/notifications/read-all', {
      method: 'POST'
    });
  }
}

// ============================================================================
// SINGLETON EXPORT
// ============================================================================

export const ekeneAPI = new EkeneAPIClient();

// ============================================================================
// USAGE EXAMPLE
// ============================================================================

/*
// Set auth token after wallet connection
ekeneAPI.setAuthToken('user_auth_token_here');

// Get user profile
const profile = await ekeneAPI.getProfile('5GrwvaEF...');

// Update profile
await ekeneAPI.updateProfile({
  displayName: 'Chioma',
  bio: 'Web3 creator & artist 🎨'
});

// Get personalized feed
const feed = await ekeneAPI.getFeed(1);

// Follow a user
await ekeneAPI.followUser('5FHneW46...');

// Create a circle
const circle = await ekeneAPI.createCircle({
  name: 'Lagos Blockchain Builders',
  description: 'Building Web3 solutions in Lagos',
  isPrivate: false
});

// Join a circle
await ekeneAPI.joinCircle(circle.id);

// Record a tip
await ekeneAPI.recordTip({
  from: '5GrwvaEF...',
  to: '5FHneW46...',
  amount: '5000000000',
  asset: 'DOT',
  txHash: '0x123...',
  message: 'Great work! 🔥'
});

// Get leaderboard
const leaderboard = await ekeneAPI.getTipLeaderboard('7d', 'received');

// Search users
const results = await ekeneAPI.searchUsers('Adewale');
*/