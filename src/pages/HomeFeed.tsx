
// Location: src/pages/HomeFeed.tsx


import React, { useState } from 'react';
import { Flame, Heart, Users, Sparkles, TrendingUp, Gift, Calendar } from 'lucide-react';

// ============================================================================
// MOCK DATA - Replace with actual API calls
// ============================================================================
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
  { id: '1', name: 'Web3 Artists', emoji: '🎨', members: 1234, color: '#FF686B' },
  { id: '2', name: 'Music Creators', emoji: '🎵', members: 892, color: '#F2A541' },
  { id: '3', name: 'Dev Circle', emoji: '💻', members: 2341, color: '#0E4D5F' },
  { id: '4', name: 'Event Hosts', emoji: '🎪', members: 567, color: '#6ED1C5' },
];

// ============================================================================
// MAIN COMPONENT
// ============================================================================
export function OryoHomeFeed() {
  const [activeTab, setActiveTab] = useState('all');

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#FAF6F2] to-[#FFF8F0]">
      {/* ===== TOP GREETING ===== */}
      <div className="bg-white/80 backdrop-blur-sm border-b border-[#E6DCD2] sticky top-16 z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-[#1E1E23] flex items-center gap-2">
                <Flame className="w-6 h-6 text-[#F2A541]" />
                Welcome to the Hearth
              </h1>
              <p className="text-sm text-[#646470]">See what your community is up to</p>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6 max-w-4xl">
        {/* ===== COMMUNITIES ROW - Stories-style horizontal ===== */}
        <div className="mb-6">
          <h2 className="text-sm font-semibold text-[#646470] uppercase tracking-wide mb-3">
            Your Communities
          </h2>
          <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
            {COMMUNITIES.map((community) => (
              <button
                key={community.id}
                className="flex-shrink-0 flex flex-col items-center gap-2 group"
              >
                <div 
                  className="w-16 h-16 rounded-full flex items-center justify-center text-2xl transition-transform duration-300 group-hover:scale-110 shadow-md"
                  style={{ 
                    background: `linear-gradient(135deg, ${community.color}20 0%, ${community.color}40 100%)`,
                    border: `3px solid ${community.color}40`
                  }}
                >
                  {community.emoji}
                </div>
                <div className="text-center">
                  <p className="text-xs font-medium text-[#1E1E23] max-w-[80px] truncate">
                    {community.name}
                  </p>
                  <p className="text-xs text-[#646470]">{community.members}</p>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* ===== FILTER TABS ===== */}
        <div className="flex gap-2 mb-6 bg-white rounded-2xl p-1 shadow-sm">
          {['all', 'tips', 'posts', 'events'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-1 py-2 px-4 rounded-xl text-sm font-medium transition-all duration-300 ${
                activeTab === tab
                  ? 'bg-gradient-to-r from-[#F2A541] to-[#FF686B] text-white shadow-md'
                  : 'text-[#646470] hover:bg-[#F5F0EB]'
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>

        {/* ===== FEED ITEMS ===== */}
        <div className="space-y-4">
          {MOCK_FEED_ITEMS.map((item) => (
            <FeedCard key={item.id} item={item} />
          ))}
        </div>
      </div>

      {/* ===== BOTTOM NAVIGATION ===== */}
      <BottomNav />
    </div>
  );
}

// ============================================================================
// FEED CARD COMPONENT - Different types of feed items
// ============================================================================
function FeedCard({ item }: { item: any }) {
  if (item.type === 'tip') {
    return <TipCard item={item} />;
  }
  if (item.type === 'milestone') {
    return <MilestoneCard item={item} />;
  }
  if (item.type === 'post') {
    return <PostCard item={item} />;
  }
  if (item.type === 'event') {
    return <EventCard item={item} />;
  }
  return null;
}

// ===== TIP CARD =====
function TipCard({ item }: { item: any }) {
  return (
    <div className="bg-white rounded-2xl p-5 shadow-sm hover:shadow-md transition-all duration-300 border-l-4 border-[#F2A541]">
      <div className="flex items-start gap-4">
        <div className="text-3xl">{item.from.avatar}</div>
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <Flame className="w-4 h-4 text-[#F2A541]" />
            <p className="text-sm">
              <span className="font-semibold text-[#1E1E23]">{item.from.name}</span>
              <span className="text-[#646470]"> tipped </span>
              <span className="font-semibold text-[#1E1E23]">{item.to.name}</span>
            </p>
          </div>
          <div className="flex items-center gap-2 mb-2">
            <span className="text-2xl font-bold bg-gradient-to-r from-[#F2A541] to-[#FF686B] bg-clip-text text-transparent">
              {item.amount} {item.token}
            </span>
          </div>
          {item.message && (
            <p className="text-sm text-[#646470] italic mb-2">"{item.message}"</p>
          )}
          <p className="text-xs text-[#646470]">{item.timestamp}</p>
        </div>
        <button className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#F2A541]/10 to-[#FF686B]/10 hover:from-[#F2A541]/20 hover:to-[#FF686B]/20 text-[#F2A541] text-sm font-medium transition-all duration-300 flex items-center gap-2">
          <Flame className="w-4 h-4" />
          Tip
        </button>
      </div>
    </div>
  );
}

// ===== MILESTONE CARD =====
function MilestoneCard({ item }: { item: any }) {
  return (
    <div className="bg-gradient-to-r from-[#F2A541]/10 via-[#0E4D5F]/10 to-[#FF686B]/10 rounded-2xl p-5 shadow-sm hover:shadow-md transition-all duration-300 border border-[#F2A541]/20">
      <div className="flex items-start gap-4">
        <div className="w-12 h-12 rounded-full bg-gradient-to-r from-[#F2A541] to-[#FF686B] flex items-center justify-center text-white text-xl">
          <Sparkles className="w-6 h-6" />
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <p className="text-sm">
              <span className="font-semibold text-[#1E1E23]">{item.creator.name}</span>
              <span className="text-[#646470]"> reached a milestone!</span>
            </p>
          </div>
          <p className="text-lg font-bold text-[#1E1E23] mb-1">{item.milestone}</p>
          <p className="text-sm text-[#646470]">Total tips: {item.totalTips} DOT</p>
          <p className="text-xs text-[#646470] mt-2">{item.timestamp}</p>
        </div>
      </div>
    </div>
  );
}

// ===== POST CARD =====
function PostCard({ item }: { item: any }) {
  return (
    <div className="bg-white rounded-2xl p-5 shadow-sm hover:shadow-md transition-all duration-300">
      <div className="flex items-start gap-4">
        <div className="text-3xl">{item.creator.avatar}</div>
        <div className="flex-1">
          <div className="mb-2">
            <p className="font-semibold text-[#1E1E23]">{item.creator.name}</p>
            <p className="text-xs text-[#646470]">{item.creator.username}</p>
          </div>
          <p className="text-[#1E1E23] mb-3 leading-relaxed">{item.content}</p>
          <div className="flex items-center gap-6 text-sm text-[#646470]">
            <button className="flex items-center gap-1 hover:text-[#F2A541] transition-colors">
              <Heart className="w-4 h-4" />
              {item.likes}
            </button>
            <button className="flex items-center gap-1 hover:text-[#F2A541] transition-colors">
              <span>💬</span>
              {item.comments}
            </button>
            <button className="ml-auto px-3 py-1 rounded-lg bg-gradient-to-r from-[#F2A541]/10 to-[#FF686B]/10 text-[#F2A541] hover:from-[#F2A541]/20 hover:to-[#FF686B]/20 transition-all flex items-center gap-1">
              <Flame className="w-3 h-3" />
              Tip
            </button>
          </div>
          <p className="text-xs text-[#646470] mt-2">{item.timestamp}</p>
        </div>
      </div>
    </div>
  );
}

// ===== EVENT CARD =====
function EventCard({ item }: { item: any }) {
  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 border-2 border-[#F2A541]/30">
      {item.isLive && (
        <div className="bg-gradient-to-r from-[#F2A541] to-[#FF686B] px-4 py-2 flex items-center gap-2">
          <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
          <span className="text-white text-sm font-semibold">LIVE NOW</span>
        </div>
      )}
      <div className="p-5">
        <div className="flex items-start gap-4">
          <div className="text-4xl">{item.event.emoji}</div>
          <div className="flex-1">
            <h3 className="font-bold text-lg text-[#1E1E23] mb-1">{item.event.name}</h3>
            <p className="text-sm text-[#646470] mb-3">
              Hosted by <span className="font-semibold">{item.host.name}</span>
            </p>
            <div className="flex items-center gap-4 text-sm mb-3">
              <div className="flex items-center gap-1">
                <Users className="w-4 h-4 text-[#0E4D5F]" />
                <span className="text-[#646470]">{item.attendees} attending</span>
              </div>
              <div className="flex items-center gap-1">
                <Gift className="w-4 h-4 text-[#F2A541]" />
                <span className="font-semibold bg-gradient-to-r from-[#F2A541] to-[#FF686B] bg-clip-text text-transparent">
                  {item.liveTips} DOT
                </span>
              </div>
            </div>
            <button className="w-full py-2 rounded-xl bg-gradient-to-r from-[#F2A541] to-[#FF686B] text-white font-semibold hover:shadow-lg transition-all duration-300">
              Join Event
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ============================================================================
// BOTTOM NAVIGATION - Mobile-first
// ============================================================================
function BottomNav() {
  const navItems = [
    { icon: Flame, label: 'Home', active: true },
    { icon: TrendingUp, label: 'Explore' },
    { icon: Gift, label: 'Wallet' },
    { icon: Users, label: 'Communities' },
    { icon: Calendar, label: 'Events' },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-[#E6DCD2] shadow-lg md:hidden z-50">
      <div className="flex items-center justify-around py-2">
        {navItems.map((item) => (
          <button
            key={item.label}
            className={`flex flex-col items-center gap-1 p-2 rounded-xl transition-all duration-300 ${
              item.active
                ? 'text-[#F2A541]'
                : 'text-[#646470] hover:text-[#F2A541]'
            }`}
          >
            <item.icon className="w-6 h-6" />
            <span className="text-xs font-medium">{item.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}