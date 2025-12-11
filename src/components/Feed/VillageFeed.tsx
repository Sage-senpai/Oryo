// File: src/components/Feed/VillageFeed.tsx
// Main home feed - The Village Circle
// Shows posts, gratitude exchanges, milestones, and community updates

import React, { useState, useEffect } from 'react';
import { Flame, MessageCircle, Share2, MoreHorizontal, Heart, Sparkles } from 'lucide-react';

// ============================================================================
// TYPE DEFINITIONS
// ============================================================================

interface Post {
  id: string;
  author: {
    address: string;
    name: string;
    avatar: string;
    badge?: string;
    verified: boolean;
  };
  content: string;
  mediaUrls?: string[];
  timestamp: Date;
  
  // Engagement
  tipsReceived: string;
  tipsCount: number;
  commentsCount: number;
  sharesCount: number;
  
  // Context
  circleId?: string;
  circleName?: string;
  eventId?: string;
  eventName?: string;
  
  // User interaction
  hasUserTipped: boolean;
}

interface Circle {
  id: string;
  name: string;
  avatar: string;
  gradient: string;
}

// ============================================================================
// VILLAGE FEED COMPONENT
// ============================================================================

const VillageFeed: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [circles, setCircles] = useState<Circle[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'circles' | 'following'>('all');

  useEffect(() => {
    loadFeed();
    loadCircles();
  }, [selectedFilter]);

  const loadFeed = async () => {
    setIsLoading(true);
    // TODO: Load from API
    await new Promise(r => setTimeout(r, 1000));
    
    setPosts([
      {
        id: '1',
        author: {
          address: '5FHne...',
          name: 'Adewale Ojo',
          avatar: '👨🏿‍💻',
          badge: 'Griot',
          verified: true
        },
        content: 'Just launched our new Web3 education platform for African developers! Building the future of decentralized tech, one line of code at a time. 🚀\n\nCheck it out and let me know what you think!',
        mediaUrls: ['https://via.placeholder.com/600x300'],
        timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
        tipsReceived: '5.5',
        tipsCount: 12,
        commentsCount: 8,
        sharesCount: 3,
        circleName: 'Lagos Blockchain',
        hasUserTipped: false
      },
      {
        id: '2',
        author: {
          address: '5Grwv...',
          name: 'Chioma Nwankwo',
          avatar: '👩🏿‍🎨',
          badge: 'Umu Oha',
          verified: true
        },
        content: 'Grateful for all the support on my latest NFT collection! The village has shown so much love. Ekene! 🔥✨',
        timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000),
        tipsReceived: '12.3',
        tipsCount: 24,
        commentsCount: 15,
        sharesCount: 7,
        hasUserTipped: true
      },
      {
        id: '3',
        author: {
          address: '5Dxz2...',
          name: 'Blockchain Lagos',
          avatar: '🏛️',
          verified: true
        },
        content: 'Join us this Saturday for our monthly meetup! We\'ll be discussing Polkadot parachains and the future of cross-chain communication.\n\n📍 Location: Innovation Hub\n🕐 Time: 2PM WAT',
        timestamp: new Date(Date.now() - 8 * 60 * 60 * 1000),
        tipsReceived: '8.7',
        tipsCount: 18,
        commentsCount: 12,
        sharesCount: 5,
        eventName: 'Lagos Blockchain Meetup',
        hasUserTipped: false
      }
    ]);
    
    setIsLoading(false);
  };

  const loadCircles = () => {
    setCircles([
      { id: '1', name: 'Communities', avatar: '🏘️', gradient: 'from-blue-500 to-cyan-600' },
      { id: '2', name: 'Events', avatar: '🎉', gradient: 'from-purple-500 to-pink-600' },
      { id: '3', name: 'Creators', avatar: '🎨', gradient: 'from-amber-500 to-orange-600' },
      { id: '4', name: 'Following', avatar: '💫', gradient: 'from-green-500 to-emerald-600' },
      { id: '5', name: 'Tech', avatar: '⚡', gradient: 'from-indigo-500 to-purple-600' }
    ]);
  };

  // Format time ago
  const formatTimeAgo = (date: Date): string => {
    const seconds = Math.floor((Date.now() - date.getTime()) / 1000);
    
    if (seconds < 60) return 'just now';
    if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
    if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`;
    return `${Math.floor(seconds / 86400)}d ago`;
  };

  // ============================================================================
  // SUB-COMPONENTS
  // ============================================================================

  // Stories/Circles horizontal scroll
  const CirclesRow = () => (
    <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
      {circles.map((circle) => (
        <button
          key={circle.id}
          className="flex-shrink-0 flex flex-col items-center gap-2 group"
        >
          <div className={`w-20 h-20 rounded-full bg-gradient-to-br ${circle.gradient} border-4 border-amber-500/50 flex items-center justify-center text-2xl transform transition-all group-hover:scale-110 group-hover:border-amber-400`}>
            {circle.avatar}
          </div>
          <span className="text-xs text-white font-medium text-center max-w-[80px] truncate">
            {circle.name}
          </span>
        </button>
      ))}
    </div>
  );

  // Filter tabs
  const FilterTabs = () => (
    <div className="flex gap-2 p-1 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10">
      {[
        { id: 'all', label: 'All Posts' },
        { id: 'circles', label: 'Circles' },
        { id: 'following', label: 'Following' }
      ].map((filter) => (
        <button
          key={filter.id}
          onClick={() => setSelectedFilter(filter.id as any)}
          className={`flex-1 px-4 py-2 rounded-lg font-medium text-sm transition-all ${
            selectedFilter === filter.id
              ? 'bg-gradient-to-r from-amber-500 to-orange-600 text-white'
              : 'text-gray-400 hover:text-white'
          }`}
        >
          {filter.label}
        </button>
      ))}
    </div>
  );

  // Individual post card
  const PostCard = ({ post }: { post: Post }) => {
    const [showTipModal, setShowTipModal] = useState(false);

    return (
      <div className="rounded-2xl p-6 bg-white/5 backdrop-blur-sm border border-white/10 hover:border-amber-500/30 transition-all space-y-4">
        {/* Post header */}
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-400 to-pink-500 border-2 border-white/30 flex items-center justify-center text-xl relative">
              {post.author.avatar}
              {post.author.verified && (
                <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-amber-500 border-2 border-stone-900 flex items-center justify-center">
                  <Sparkles className="w-3 h-3 text-white" />
                </div>
              )}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-white font-semibold">{post.author.name}</span>
                {post.author.badge && (
                  <span className="px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-400 text-xs font-medium border border-amber-500/30">
                    {post.author.badge}
                  </span>
                )}
              </div>
              <div className="flex items-center gap-2 text-gray-400 text-sm">
                <span>{formatTimeAgo(post.timestamp)}</span>
                {(post.circleName || post.eventName) && (
                  <>
                    <span>•</span>
                    <span className="text-amber-400">{post.circleName || post.eventName}</span>
                  </>
                )}
              </div>
            </div>
          </div>
          
          <button className="w-8 h-8 rounded-full hover:bg-white/10 flex items-center justify-center transition-all">
            <MoreHorizontal className="w-5 h-5 text-gray-400" />
          </button>
        </div>

        {/* Post content */}
        <div className="text-gray-200 whitespace-pre-line">
          {post.content}
        </div>

        {/* Post media */}
        {post.mediaUrls && post.mediaUrls.length > 0 && (
          <div className="rounded-xl overflow-hidden">
            <img 
              src={post.mediaUrls[0]} 
              alt="Post media"
              className="w-full object-cover"
            />
          </div>
        )}

        {/* Tip summary */}
        {parseFloat(post.tipsReceived) > 0 && (
          <div className="flex items-center gap-2 p-3 rounded-xl bg-gradient-to-r from-amber-500/10 to-orange-600/10 border border-amber-500/30">
            <Flame className="w-5 h-5 text-amber-400" />
            <span className="text-white font-semibold">
              {post.tipsReceived} DOT received from {post.tipsCount} supporters
            </span>
          </div>
        )}

        {/* Action buttons */}
        <div className="flex gap-2 pt-2 border-t border-white/10">
          <button
            onClick={() => setShowTipModal(true)}
            className={`flex-1 py-3 rounded-xl font-semibold transition-all flex items-center justify-center gap-2 ${
              post.hasUserTipped
                ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                : 'bg-white/5 hover:bg-white/10 text-white'
            }`}
          >
            <Flame className="w-5 h-5" />
            {post.hasUserTipped ? 'Tipped' : 'Send Ekene'}
          </button>
          
          <button className="px-4 py-3 rounded-xl bg-white/5 hover:bg-white/10 text-gray-300 transition-all flex items-center gap-2">
            <MessageCircle className="w-5 h-5" />
            <span className="text-sm">{post.commentsCount}</span>
          </button>
          
          <button className="px-4 py-3 rounded-xl bg-white/5 hover:bg-white/10 text-gray-300 transition-all flex items-center gap-2">
            <Share2 className="w-5 h-5" />
            <span className="text-sm">{post.sharesCount}</span>
          </button>
        </div>
      </div>
    );
  };

  // Loading skeleton
  const LoadingSkeleton = () => (
    <div className="space-y-6">
      {[1, 2, 3].map((i) => (
        <div key={i} className="rounded-2xl p-6 bg-white/5 backdrop-blur-sm border border-white/10 space-y-4 animate-pulse">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-white/10" />
            <div className="flex-1 space-y-2">
              <div className="h-4 bg-white/10 rounded w-1/3" />
              <div className="h-3 bg-white/10 rounded w-1/4" />
            </div>
          </div>
          <div className="space-y-2">
            <div className="h-4 bg-white/10 rounded w-full" />
            <div className="h-4 bg-white/10 rounded w-5/6" />
          </div>
        </div>
      ))}
    </div>
  );

  // ============================================================================
  // MAIN RENDER
  // ============================================================================

  return (
    <div className="space-y-6">
      {/* Welcome header */}
      <div className="rounded-2xl p-6 bg-gradient-to-br from-amber-500/20 to-orange-600/20 border-2 border-amber-500/30">
        <h2 className="text-2xl font-bold text-white mb-2">Ekene, Chioma.</h2>
        <p className="text-amber-200">The village acknowledges you.</p>
      </div>

      {/* Circles/Stories row */}
      <CirclesRow />

      {/* Filter tabs */}
      <FilterTabs />

      {/* Feed content */}
      {isLoading ? (
        <LoadingSkeleton />
      ) : (
        <div className="space-y-6">
          {posts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      )}

      {/* Load more */}
      {!isLoading && posts.length > 0 && (
        <button className="w-full py-4 rounded-xl bg-white/5 hover:bg-white/10 text-white font-semibold transition-all">
          Load More Posts
        </button>
      )}
    </div>
  );
};

export default VillageFeed;