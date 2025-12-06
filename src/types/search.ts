export interface User {
  id: string;
  name: string;
  username: string;
  avatar: string;
  bio: string;
  isFollowing: boolean;
  hasXAccount: boolean;
  xUsername?: string;
  xProfileUrl?: string;
  xUserId?: string;
  walletAddress: string;
  followers: number;
  totalTips: number;
  gradient: string;
  createdAt: string;
}

export interface Post {
  id: string;
  userId: string;
  userName: string;
  userAvatar: string;
  content: string;
  timestamp: string;
  isXPost: boolean;
  xPostUrl?: string;
  xPostId?: string;
  likes: number;
  hasXAccount: boolean;
  images?: string[];
}

export interface SearchFilters {
  hasXAccount?: boolean;
  minFollowers?: number;
  minTips?: number;
  categories?: string[];
}