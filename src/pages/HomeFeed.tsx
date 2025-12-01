/**
 * ============================================================================
 * ORYO - Vibrant Home Feed (Enhanced)
 * ============================================================================
 * Location: src/pages/HomeFeed.tsx
 * 
 * Colorful, engaging feed with working interactions
 * ============================================================================
 */

import { useState } from 'react';
import { Flame, Heart, MessageCircle, Share2, Users, Sparkles, TrendingUp, Gift, Calendar, Send } from 'lucide-react';
import { TipFlowModal } from '../components/TipFlowModal';

// Mock data
const MOCK_FEED_ITEMS = [
  {
    id: '1',
    type: 'tip',
    from: { name: 'Sarah Chen', avatar: '🎨', username: '@sarahchen' },
    to: { name: 'Alex Rivera', avatar: '🎭', username: '@alexrivera' },
    amount: 5.0,
    token: 'DOT',
    message: 'Amazing work on the latest piece! 🔥',
    timestamp: '2 hours ago',
  },
  {
    id: '2',
    type: 'milestone',
    creator: { name: 'Marcus Johnson', avatar: '🎮', username: '@marcusj' },
    milestone: '100 supporters reached!',
    totalTips: 2103.8,
    timestamp: '5 hours ago',
  },
  {
    id: '3',
    type: 'post',
    creator: { name: 'Luna Park', avatar: '🎵', username: '@lunapark' },
    content: 'New track dropping tomorrow! Been working on this for months. Stay tuned 🎶✨',
    likes: 45,
    comments: 12,
    timestamp: '1 day ago',
  },
  {
    id: '4',
    type: 'event',
    event: { name: 'Polkadot Connect Nairobi', emoji: '🌍' },
    host: { name: 'David Kim', avatar: '📸', username: '@davidkim' },
    attendees: 127,
    liveTips: 892.3,
    timestamp: 'Live now',
    isLive: true,
  },
];

const COMMUNITIES = [
  { id: '1', name: 'Web3 Artists', emoji: '🎨', members: 1234, color: '#FF8C42' },
  { id: '2', name: 'Music Creators', emoji: '🎵', members: 892, color: '#F2A541' },
  { id: '3', name: 'Dev Circle', emoji: '💻', members: 2341, color: '#0E4D5F' },
  { id: '4', name: 'Event Hosts', emoji: '🎪', members: 567, color: '#1A9BA8' },
];

export function OryoHomeFeed() {
  const [activeTab, setActiveTab] = useState('all');
  const [showTipModal, setShowTipModal] = useState(false);
  const [selectedCreator, setSelectedCreator] = useState<any>(null);
  const [likedPosts, setLikedPosts] = useState<Set<string>>(new Set());

  const handleTipClick = (creator: any) => {
    setSelectedCreator(creator);
    setShowTipModal(true);
  };

  const handleLike = (postId: string) => {
    setLikedPosts(prev => {
      const newSet = new Set(prev);
      if (newSet.has(postId)) {
        newSet.delete(postId);
      } else {
        newSet.add(postId);
      }
      return newSet;
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FFF5E8] via-[#FEFCF8] to-[#E6F7F9] pb-24">
      {/* Animated Background Pattern */}
      <div className="fixed inset-0 opacity-30 pointer-events-none">
        <div className="absolute top-20 right-10 w-64 h-64 bg-gradient-to-br from-[#F2A541]/20 to-[#FF686B]/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-40 left-10 w-96 h-96 bg-gradient-to-br from-[#0E4D5F]/20 to-[#1A9BA8]/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
      </div>

      {/* Header */}
      <div className="relative bg-gradient-to-r from-[#0E4D5F] via-[#1A9BA8] to-[#0E4D5F] border-b border-white/10 sticky top-0 z-40 backdrop-blur-xl">
        <div className="absolute inset-0 bg-white/5"></div>
        <div className="relative container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-white flex items-center gap-3 mb-1">
                <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-[#FF8C42] to-[#F2A541] flex items-center justify-center shadow-lg animate-pulse">
                  <Flame className="w-6 h-6 text-white" />
                </div>
                The Hearth
              </h1>
              <p className="text-sm text-white/80">Your community is thriving today ✨</p>
            </div>
          </div>
        </div>
      </div>

      {/* Communities Row */}
      <div className="relative container mx-auto px-4 py-6">
        <h2 className="text-sm font-semibold text-gray-700 uppercase tracking-wide mb-4 flex items-center gap-2">
          <Users className="w-4 h-4 text-[#F2A541]" />
          Your Communities
        </h2>
        <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide -mx-4 px-4">
          {COMMUNITIES.map((community, index) => (
            <button
              key={community.id}
              className="flex-shrink-0 group"
              style={{
                animation: `fadeInUp 0.5s ease-out ${index * 0.1}s backwards`
              }}
            >
              <div 
                className="w-20 h-20 rounded-2xl flex items-center justify-center text-3xl transition-all duration-300 group-hover:scale-110 shadow-lg group-hover:shadow-2xl relative overflow-hidden"
                style={{ 
                  background: `linear-gradient(135deg, ${community.color}40 0%, ${community.color}60 100%)`,
                  border: `2px solid ${community.color}60`
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <span className="relative z-10 transform group-hover:rotate-12 transition-transform duration-300">
                  {community.emoji}
                </span>
              </div>
              <div className="text-center mt-2">
                <p className="text-xs font-semibold text-gray-800 max-w-[80px] truncate">
                  {community.name}
                </p>
                <p className="text-xs text-gray-500">{(community.members / 1000).toFixed(1)}K</p>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="relative container mx-auto px-4 mb-6">
        <div className="flex gap-2 bg-white rounded-2xl p-1.5 shadow-xl border border-gray-100">
          {['all', 'tips', 'posts', 'events'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-1 py-3 px-4 rounded-xl text-sm font-semibold transition-all duration-300 ${
                activeTab === tab
                  ? 'bg-gradient-to-r from-[#FF8C42] to-[#F2A541] text-white shadow-lg scale-105'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Feed Items */}
      <div className="relative container mx-auto px-4 space-y-4">
        {MOCK_FEED_ITEMS.map((item, index) => (
          <div
            key={item.id}
            style={{
              animation: `fadeInUp 0.5s ease-out ${index * 0.1}s backwards`
            }}
          >
            <FeedCard 
              item={item} 
              onTipClick={handleTipClick}
              onLike={handleLike}
              isLiked={likedPosts.has(item.id)}
            />
          </div>
        ))}
      </div>

      {/* Tip Modal */}
      {showTipModal && selectedCreator && (
        <TipFlowModal
          isOpen={showTipModal}
          onClose={() => setShowTipModal(false)}
          creator={selectedCreator}
        />
      )}

      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
}

// Feed Card Component
function FeedCard({ item, onTipClick, onLike, isLiked }: any) {
  if (item.type === 'tip') return <TipCard item={item} onTipClick={onTipClick} />;
  if (item.type === 'milestone') return <MilestoneCard item={item} />;
  if (item.type === 'post') return <PostCard item={item} onTipClick={onTipClick} onLike={onLike} isLiked={isLiked} />;
  if (item.type === 'event') return <EventCard item={item} />;
  return null;
}

// Tip Card
function TipCard({ item, onTipClick }: any) {
  return (
    <div className="bg-white rounded-3xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 border-l-4 border-[#F2A541] group hover:-translate-y-1">
      <div className="flex items-start gap-4">
        <div className="text-4xl group-hover:scale-110 transition-transform">{item.from.avatar}</div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-2">
            <Flame className="w-4 h-4 text-[#F2A541] animate-pulse" />
            <p className="text-sm text-gray-700">
              <span className="font-bold text-gray-900">{item.from.name}</span>
              <span> tipped </span>
              <span className="font-bold text-gray-900">{item.to.name}</span>
            </p>
          </div>
          <div className="flex items-center gap-2 mb-3">
            <span className="text-3xl font-black bg-gradient-to-r from-[#FF8C42] to-[#F2A541] bg-clip-text text-transparent">
              {item.amount} {item.token}
            </span>
          </div>
          {item.message && (
            <p className="text-sm text-gray-600 italic mb-3 bg-gradient-to-r from-[#FFF5E8] to-transparent p-3 rounded-xl">
              "{item.message}"
            </p>
          )}
          <p className="text-xs text-gray-400">{item.timestamp}</p>
        </div>
        <button 
          onClick={() => onTipClick(item.to)}
          className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#FF8C42] to-[#F2A541] hover:from-[#F2A541] hover:to-[#FF686B] text-white text-sm font-semibold transition-all duration-300 flex items-center gap-2 shadow-lg hover:shadow-xl hover:scale-105 active:scale-95"
        >
          <Flame className="w-4 h-4" />
          Tip
        </button>
      </div>
    </div>
  );
}

// Milestone Card
function MilestoneCard({ item }: any) {
  return (
    <div className="bg-gradient-to-br from-[#FF8C42]/10 via-[#F2A541]/10 to-[#FF686B]/10 rounded-3xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 border border-[#F2A541]/30 group hover:-translate-y-1">
      <div className="flex items-start gap-4">
        <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#FF8C42] to-[#F2A541] flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform">
          <Sparkles className="w-7 h-7 animate-pulse" />
        </div>
        <div className="flex-1">
          <p className="text-sm text-gray-700 mb-2">
            <span className="font-bold text-gray-900">{item.creator.name}</span>
            <span> reached a milestone!</span>
          </p>
          <p className="text-xl font-bold bg-gradient-to-r from-[#FF8C42] to-[#F2A541] bg-clip-text text-transparent mb-1">
            {item.milestone}
          </p>
          <p className="text-sm text-gray-600">Total tips: {item.totalTips} DOT</p>
          <p className="text-xs text-gray-400 mt-2">{item.timestamp}</p>
        </div>
      </div>
    </div>
  );
}

// Post Card
function PostCard({ item, onTipClick, onLike, isLiked }: any) {
  const [showComments, setShowComments] = useState(false);
  
  return (
    <div className="bg-white rounded-3xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 group hover:-translate-y-1">
      <div className="flex items-start gap-4 mb-4">
        <div className="text-4xl group-hover:scale-110 transition-transform">{item.creator.avatar}</div>
        <div className="flex-1 min-w-0">
          <p className="font-bold text-gray-900">{item.creator.name}</p>
          <p className="text-xs text-gray-500">{item.creator.username}</p>
        </div>
      </div>
      <p className="text-gray-800 leading-relaxed mb-4">{item.content}</p>
      <div className="flex items-center gap-6 text-sm">
        <button 
          onClick={() => onLike(item.id)}
          className={`flex items-center gap-2 transition-all duration-300 group/like ${
            isLiked ? 'text-red-500' : 'text-gray-500 hover:text-red-500'
          }`}
        >
          <Heart 
            className={`w-5 h-5 transition-all duration-300 ${
              isLiked ? 'fill-current scale-110' : 'group-hover/like:scale-110'
            }`}
          />
          <span className="font-semibold">{item.likes + (isLiked ? 1 : 0)}</span>
        </button>
        <button 
          onClick={() => setShowComments(!showComments)}
          className="flex items-center gap-2 text-gray-500 hover:text-[#0E4D5F] transition-colors group/comment"
        >
          <MessageCircle className="w-5 h-5 group-hover/comment:scale-110 transition-transform" />
          <span className="font-semibold">{item.comments}</span>
        </button>
        <button className="flex items-center gap-2 text-gray-500 hover:text-[#1A9BA8] transition-colors group/share">
          <Share2 className="w-5 h-5 group-hover/share:scale-110 transition-transform" />
        </button>
        <button 
          onClick={() => onTipClick(item.creator)}
          className="ml-auto px-4 py-2 rounded-xl bg-gradient-to-r from-[#FF8C42]/10 to-[#F2A541]/10 hover:from-[#FF8C42] hover:to-[#F2A541] text-[#F2A541] hover:text-white transition-all duration-300 flex items-center gap-2 font-semibold hover:shadow-lg hover:scale-105 active:scale-95"
        >
          <Flame className="w-4 h-4" />
          Tip
        </button>
      </div>
      <p className="text-xs text-gray-400 mt-3">{item.timestamp}</p>
    </div>
  );
}

// Event Card
function EventCard({ item }: any) {
  return (
    <div className="bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border-2 border-[#F2A541]/50 group hover:-translate-y-1">
      {item.isLive && (
        <div className="bg-gradient-to-r from-[#FF686B] to-[#F2A541] px-6 py-3 flex items-center gap-2">
          <div className="w-2.5 h-2.5 bg-white rounded-full animate-pulse shadow-lg"></div>
          <span className="text-white text-sm font-bold uppercase tracking-wide">LIVE NOW</span>
        </div>
      )}
      <div className="p-6">
        <div className="flex items-start gap-4">
          <div className="text-5xl group-hover:scale-110 transition-transform">{item.event.emoji}</div>
          <div className="flex-1">
            <h3 className="font-bold text-xl text-gray-900 mb-2">{item.event.name}</h3>
            <p className="text-sm text-gray-600 mb-4">
              Hosted by <span className="font-semibold">{item.host.name}</span>
            </p>
            <div className="flex items-center gap-6 text-sm mb-4">
              <div className="flex items-center gap-2 text-[#0E4D5F]">
                <Users className="w-5 h-5" />
                <span className="font-semibold">{item.attendees} attending</span>
              </div>
              <div className="flex items-center gap-2">
                <Gift className="w-5 h-5 text-[#F2A541]" />
                <span className="font-bold bg-gradient-to-r from-[#FF8C42] to-[#F2A541] bg-clip-text text-transparent">
                  {item.liveTips} DOT
                </span>
              </div>
            </div>
            <button className="w-full py-3 rounded-xl bg-gradient-to-r from-[#0E4D5F] to-[#1A9BA8] text-white font-bold hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2 group/btn hover:scale-105 active:scale-95">
              <Calendar className="w-5 h-5 group-hover/btn:rotate-12 transition-transform" />
              Join Event
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}