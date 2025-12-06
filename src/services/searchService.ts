import { User, Post } from '@/types/search';

// This would connect to your backend API
export class SearchService {
  private static readonly API_BASE = '/api';

  // Search users
  static async searchUsers(query: string, filters?: any): Promise<User[]> {
    // TODO: Replace with actual API call
    const response = await fetch(`${this.API_BASE}/users/search?q=${encodeURIComponent(query)}`);
    return response.json();
  }

  // Get user by ID
  static async getUserById(userId: string): Promise<User> {
    const response = await fetch(`${this.API_BASE}/users/${userId}`);
    return response.json();
  }

  // Follow/unfollow user
  static async toggleFollow(userId: string, currentlyFollowing: boolean): Promise<void> {
    await fetch(`${this.API_BASE}/users/${userId}/follow`, {
      method: currentlyFollowing ? 'DELETE' : 'POST',
    });
  }

  // Get activity feed
  static async getActivityFeed(following?: boolean): Promise<Post[]> {
    const endpoint = following ? '/posts/following' : '/posts/feed';
    const response = await fetch(`${this.API_BASE}${endpoint}`);
    return response.json();
  }

  // Sync X account posts
  static async syncXPosts(userId: string): Promise<Post[]> {
    const response = await fetch(`${this.API_BASE}/users/${userId}/sync-x-posts`, {
      method: 'POST',
    });
    return response.json();
  }
}