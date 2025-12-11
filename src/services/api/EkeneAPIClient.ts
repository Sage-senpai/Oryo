// File: src/services/api/EkeneAPIClient.ts
// Production-ready API client with proper error handling, retries, and caching
// Handles all backend communication for Ekene

import type {
  EkeneAccount,
  AssetBalance,
  TipTransaction
} from '../wallet/WalletService';

// ============================================================================
// TYPE DEFINITIONS
// ============================================================================

export interface UserProfile {
  address: string;
  username: string;
  displayName: string;
  bio?: string;
  avatar?: string;
  
  twitter?: string;
  telegram?: string;
  website?: string;
  
  followersCount: number;
  followingCount: number;
  tipsReceived: string;
  tipsSent: string;
  supportersCount: number;
  
  badges: Badge[];
  culturalBadge?: string;
  verifiedCreator: boolean;
  
  circles: Circle[];
  createdAt: Date;
}

export interface Circle {
  id: string;
  name: string;
  description: string;
  bannerUrl?: string;
  avatar?: string;
  memberCount: number;
  
  isPrivate: boolean;
  joinRequirement?: {
    tokenRequired?: string;
    minimumAmount?: string;
    nftRequired?: string;
  };
  
  creator: string;
  admins: string[];
  
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
  
  tipsReceived: string;
  tipsCount: number;
  commentsCount: number;
  sharesCount: number;
  
  circleId?: string;
  eventId?: string;
  
  createdAt: Date;
}

export interface Event {
  id: string;
  title: string;
  description: string;
  venue: string;
  date: Date;
  endDate?: Date;
  bannerUrl?: string;
  
  hosts: EventHost[];
  isActive: boolean;
  requiresTicket: boolean;
  
  attendeeCount: number;
  totalTipsReceived: string;
}

export interface EventHost {
  address: string;
  name: string;
  role: string;
  avatar?: string;
  tipsReceived: string;
  supporterCount: number;
}

export interface LeaderboardEntry {
  rank: number;
  user: UserProfile;
  value: string;
  change?: number;
}

export interface APIResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  pageSize: number;
  hasMore: boolean;
}

// ============================================================================
// API CLIENT CLASS
// ============================================================================

export class EkeneAPIClient {
  private baseUrl: string;
  private authToken?: string;
  private cache: Map<string, { data: any; timestamp: number }>;
  private readonly CACHE_TTL = 60000; // 1 minute
  private readonly MAX_RETRIES = 3;
  private readonly RETRY_DELAY = 1000; // 1 second

  constructor(baseUrl: string = import.meta.env.VITE_API_URL || 'https://api.ekene.app') {
    this.baseUrl = baseUrl;
    this.cache = new Map();
    this.loadAuthToken();
  }

  // --------------------------------------------------------------------------
  // AUTHENTICATION & TOKEN MANAGEMENT
  // --------------------------------------------------------------------------

  private loadAuthToken(): void {
    this.authToken = localStorage.getItem('ekene_auth_token') || undefined;
  }

  setAuthToken(token: string): void {
    this.authToken = token;
    localStorage.setItem('ekene_auth_token', token);
  }

  clearAuth(): void {
    this.authToken = undefined;
    localStorage.removeItem('ekene_auth_token');
    this.cache.clear();
  }

  // --------------------------------------------------------------------------
  // HTTP REQUEST HANDLER WITH RETRY LOGIC
  // --------------------------------------------------------------------------

  private async request<T>(
    endpoint: string,
    options: RequestInit = {},
    retryCount = 0
  ): Promise<APIResponse<T>> {
    const url = `${this.baseUrl}${endpoint}`;
    
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
      ...(this.authToken && { Authorization: `Bearer ${this.authToken}` }),
      ...options.headers
    };

    try {
      const response = await fetch(url, {
        ...options,
        headers,
        signal: AbortSignal.timeout(30000) // 30 second timeout
      });

      if (!response.ok) {
        // Handle specific HTTP errors
        if (response.status === 401) {
          this.clearAuth();
          throw new Error('Authentication required. Please log in again.');
        }
        
        if (response.status === 403) {
          throw new Error('Access forbidden. You do not have permission.');
        }
        
        if (response.status === 404) {
          throw new Error('Resource not found.');
        }
        
        if (response.status === 429) {
          // Rate limit - retry with exponential backoff
          if (retryCount < this.MAX_RETRIES) {
            const delay = this.RETRY_DELAY * Math.pow(2, retryCount);
            await this.sleep(delay);
            return this.request<T>(endpoint, options, retryCount + 1);
          }
          throw new Error('Too many requests. Please try again later.');
        }

        if (response.status >= 500) {
          // Server error - retry
          if (retryCount < this.MAX_RETRIES) {
            const delay = this.RETRY_DELAY * Math.pow(2, retryCount);
            await this.sleep(delay);
            return this.request<T>(endpoint, options, retryCount + 1);
          }
          throw new Error('Server error. Please try again later.');
        }

        const errorData = await response.json().catch(() => ({ message: 'Request failed' }));
        throw new Error(errorData.message || `HTTP ${response.status}`);
      }

      const data = await response.json();
      
      return {
        success: true,
        data: data as T
      };

    } catch (error: any) {
      // Network error - retry
      if (error.name === 'TypeError' || error.name === 'NetworkError') {
        if (retryCount < this.MAX_RETRIES) {
          const delay = this.RETRY_DELAY * Math.pow(2, retryCount);
          await this.sleep(delay);
          return this.request<T>(endpoint, options, retryCount + 1);
        }
      }

      console.error(`API Error [${endpoint}]:`, error);
      
      return {
        success: false,
        error: error.message || 'An unexpected error occurred'
      };
    }
  }

  private sleep(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  // --------------------------------------------------------------------------
  // CACHE MANAGEMENT
  // --------------------------------------------------------------------------

  private getCached<T>(key: string): T | null {
    const cached = this.cache.get(key);
    if (!cached) return null;
    
    const age = Date.now() - cached.timestamp;
    if (age > this.CACHE_TTL) {
      this.cache.delete(key);
      return null;
    }
    
    return cached.data as T;
  }

  private setCache(key: string, data: any): void {
    this.cache.set(key, {
      data,
      timestamp: Date.now()
    });
  }

  clearCache(): void {
    this.cache.clear();
  }

  // --------------------------------------------------------------------------
  // USER PROFILE ENDPOINTS
  // --------------------------------------------------------------------------

  async getProfile(identifier: string): Promise<UserProfile | null> {
    const cacheKey = `profile:${identifier}`;
    const cached = this.getCached<UserProfile>(cacheKey);
    if (cached) return cached;

    const response = await this.request<UserProfile>(`/users/${identifier}`);
    
    if (response.success && response.data) {
      this.setCache(cacheKey, response.data);
      return response.data;
    }
    
    return null;
  }

  async updateProfile(updates: Partial<UserProfile>): Promise<UserProfile | null> {
    const response = await this.request<UserProfile>('/users/me', {
      method: 'PATCH',
      body: JSON.stringify(updates)
    });
    
    if (response.success && response.data) {
      this.clearCache(); // Clear all cache on profile update
      return response.data;
    }
    
    throw new Error(response.error || 'Failed to update profile');
  }

  async followUser(address: string): Promise<void> {
    const response = await this.request(`/users/${address}/follow`, {
      method: 'POST'
    });
    
    if (!response.success) {
      throw new Error(response.error || 'Failed to follow user');
    }
    
    this.clearCache();
  }

  async unfollowUser(address: string): Promise<void> {
    const response = await this.request(`/users/${address}/follow`, {
      method: 'DELETE'
    });
    
    if (!response.success) {
      throw new Error(response.error || 'Failed to unfollow user');
    }
    
    this.clearCache();
  }

  async getFollowers(address: string, page = 1): Promise<PaginatedResponse<UserProfile>> {
    const cacheKey = `followers:${address}:${page}`;
    const cached = this.getCached<PaginatedResponse<UserProfile>>(cacheKey);
    if (cached) return cached;

    const response = await this.request<PaginatedResponse<UserProfile>>(
      `/users/${address}/followers?page=${page}`
    );
    
    if (response.success && response.data) {
      this.setCache(cacheKey, response.data);
      return response.data;
    }
    
    return { items: [], total: 0, page, pageSize: 20, hasMore: false };
  }

  // --------------------------------------------------------------------------
  // FEED & DISCOVERY
  // --------------------------------------------------------------------------

  async getFeed(page = 1): Promise<PaginatedResponse<Post>> {
    const cacheKey = `feed:${page}`;
    const cached = this.getCached<PaginatedResponse<Post>>(cacheKey);
    if (cached) return cached;

    const response = await this.request<PaginatedResponse<Post>>(
      `/feed?page=${page}`
    );
    
    if (response.success && response.data) {
      this.setCache(cacheKey, response.data);
      return response.data;
    }
    
    return { items: [], total: 0, page, pageSize: 20, hasMore: false };
  }

  async getTrending(timeframe: '24h' | '7d' | '30d' = '24h'): Promise<Post[]> {
    const cacheKey = `trending:${timeframe}`;
    const cached = this.getCached<Post[]>(cacheKey);
    if (cached) return cached;

    const response = await this.request<Post[]>(
      `/posts/trending?timeframe=${timeframe}`
    );
    
    if (response.success && response.data) {
      this.setCache(cacheKey, response.data);
      return response.data;
    }
    
    return [];
  }

  async searchUsers(query: string): Promise<UserProfile[]> {
    if (!query.trim()) return [];
    
    const response = await this.request<UserProfile[]>(
      `/search/users?q=${encodeURIComponent(query)}`
    );
    
    return response.success && response.data ? response.data : [];
  }

  async searchCircles(query: string): Promise<Circle[]> {
    if (!query.trim()) return [];
    
    const response = await this.request<Circle[]>(
      `/search/circles?q=${encodeURIComponent(query)}`
    );
    
    return response.success && response.data ? response.data : [];
  }

  // --------------------------------------------------------------------------
  // CIRCLES (COMMUNITIES)
  // --------------------------------------------------------------------------

  async getCircle(circleId: string): Promise<Circle | null> {
    const cacheKey = `circle:${circleId}`;
    const cached = this.getCached<Circle>(cacheKey);
    if (cached) return cached;

    const response = await this.request<Circle>(`/circles/${circleId}`);
    
    if (response.success && response.data) {
      this.setCache(cacheKey, response.data);
      return response.data;
    }
    
    return null;
  }

  async createCircle(data: {
    name: string;
    description: string;
    isPrivate?: boolean;
    bannerUrl?: string;
  }): Promise<Circle | null> {
    const response = await this.request<Circle>('/circles', {
      method: 'POST',
      body: JSON.stringify(data)
    });
    
    if (response.success && response.data) {
      this.clearCache();
      return response.data;
    }
    
    throw new Error(response.error || 'Failed to create circle');
  }

  async joinCircle(circleId: string): Promise<void> {
    const response = await this.request(`/circles/${circleId}/join`, {
      method: 'POST'
    });
    
    if (!response.success) {
      throw new Error(response.error || 'Failed to join circle');
    }
    
    this.clearCache();
  }

  async leaveCircle(circleId: string): Promise<void> {
    const response = await this.request(`/circles/${circleId}/leave`, {
      method: 'POST'
    });
    
    if (!response.success) {
      throw new Error(response.error || 'Failed to leave circle');
    }
    
    this.clearCache();
  }

  // --------------------------------------------------------------------------
  // POSTS & CONTENT
  // --------------------------------------------------------------------------

  async createPost(data: {
    content: string;
    mediaUrls?: string[];
    circleId?: string;
  }): Promise<Post | null> {
    const response = await this.request<Post>('/posts', {
      method: 'POST',
      body: JSON.stringify(data)
    });
    
    if (response.success && response.data) {
      this.clearCache();
      return response.data;
    }
    
    throw new Error(response.error || 'Failed to create post');
  }

  async getPost(postId: string): Promise<Post | null> {
    const response = await this.request<Post>(`/posts/${postId}`);
    
    return response.success && response.data ? response.data : null;
  }

  async deletePost(postId: string): Promise<void> {
    const response = await this.request(`/posts/${postId}`, {
      method: 'DELETE'
    });
    
    if (!response.success) {
      throw new Error(response.error || 'Failed to delete post');
    }
    
    this.clearCache();
  }

  // --------------------------------------------------------------------------
  // TRANSACTIONS & TIPS
  // --------------------------------------------------------------------------

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
    const response = await this.request('/transactions/tips', {
      method: 'POST',
      body: JSON.stringify(data)
    });
    
    if (!response.success) {
      console.error('Failed to record tip:', response.error);
    }
  }

  async getTransactionHistory(
    address: string,
    type?: 'sent' | 'received',
    page = 1
  ): Promise<PaginatedResponse<TipTransaction>> {
    const params = new URLSearchParams({ page: page.toString() });
    if (type) params.append('type', type);
    
    const response = await this.request<PaginatedResponse<TipTransaction>>(
      `/transactions/${address}?${params}`
    );
    
    if (response.success && response.data) {
      return response.data;
    }
    
    return { items: [], total: 0, page, pageSize: 20, hasMore: false };
  }

  async getTipLeaderboard(
    timeframe: '24h' | '7d' | '30d' | 'all' = '7d',
    type: 'received' | 'sent' = 'received'
  ): Promise<LeaderboardEntry[]> {
    const cacheKey = `leaderboard:${timeframe}:${type}`;
    const cached = this.getCached<LeaderboardEntry[]>(cacheKey);
    if (cached) return cached;

    const response = await this.request<LeaderboardEntry[]>(
      `/leaderboard/tips?timeframe=${timeframe}&type=${type}`
    );
    
    if (response.success && response.data) {
      this.setCache(cacheKey, response.data);
      return response.data;
    }
    
    return [];
  }

  // --------------------------------------------------------------------------
  // EVENTS
  // --------------------------------------------------------------------------

  async getEvent(eventId: string): Promise<Event | null> {
    const cacheKey = `event:${eventId}`;
    const cached = this.getCached<Event>(cacheKey);
    if (cached) return cached;

    const response = await this.request<Event>(`/events/${eventId}`);
    
    if (response.success && response.data) {
      this.setCache(cacheKey, response.data);
      return response.data;
    }
    
    return null;
  }

  async getUpcomingEvents(): Promise<Event[]> {
    const cacheKey = 'events:upcoming';
    const cached = this.getCached<Event[]>(cacheKey);
    if (cached) return cached;

    const response = await this.request<Event[]>('/events/upcoming');
    
    if (response.success && response.data) {
      this.setCache(cacheKey, response.data);
      return response.data;
    }
    
    return [];
  }

  async registerForEvent(eventId: string): Promise<void> {
    const response = await this.request(`/events/${eventId}/register`, {
      method: 'POST'
    });
    
    if (!response.success) {
      throw new Error(response.error || 'Failed to register for event');
    }
    
    this.clearCache();
  }

  // --------------------------------------------------------------------------
  // REWARDS & WARMTH
  // --------------------------------------------------------------------------

  async getWarmth(address: string): Promise<number> {
    const response = await this.request<{ warmth: number }>(
      `/users/${address}/warmth`
    );
    
    return response.success && response.data ? response.data.warmth : 0;
  }

  async claimDailyWarmth(): Promise<number> {
    const response = await this.request<{ warmth: number }>('/rewards/daily', {
      method: 'POST'
    });
    
    if (response.success && response.data) {
      return response.data.warmth;
    }
    
    throw new Error(response.error || 'Failed to claim daily warmth');
  }

  async getClaimableRewards(): Promise<any[]> {
    const response = await this.request<any[]>('/rewards/claimable');
    
    return response.success && response.data ? response.data : [];
  }

  // --------------------------------------------------------------------------
  // HEALTH CHECK
  // --------------------------------------------------------------------------

  async healthCheck(): Promise<boolean> {
    try {
      const response = await this.request('/health');
      return response.success;
    } catch {
      return false;
    }
  }
}

// ============================================================================
// SINGLETON INSTANCE
// ============================================================================

export const ekeneAPI = new EkeneAPIClient();

export default ekeneAPI;