/**
 * ============================================================================
 * Ekene - Vibrant Discovery Page
 * ============================================================================
 * Location: src/pages/DiscoveryPage.tsx
 * ============================================================================
 */

import { useState } from 'react';
import { Search, SlidersHorizontal, Flame, Sparkles, Star, TrendingUp } from 'lucide-react';

interface Creator {
  id: string;
  name: string;
  username: string;
  avatar: string;
  followers: number;
  tips: number;
  isFollowing: boolean;
  category?: string;
  gradient?: string;
}

export function DiscoveryPage() {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const categories = [
    { id: 'all', name: 'All', icon: '✨', color: '#F2A541' },
    { id: 'trending', name: 'Trending', icon: '🔥', color: '#FF686B' },
    { id: 'artists', name: 'Artists', icon: '🎨', color: '#FF8C42' },
    { id: 'musicians', name: 'Musicians', icon: '🎵', color: '#1A9BA8' },
    { id: 'creators', name: 'Creators', icon: '📹', color: '#6ED1C5' },
    { id: 'writers', name: 'Writers', icon: '✍️', color: '#0E4D5F' },
    { id: 'developers', name: 'Developers', icon: '💻', color: '#F2A541' }
  ];

  const [featuredCreators] = useState<Creator[]>([
    {
      id: '1',
      name: 'Sarah Chen',
      username: '@sarah_creates',
      avatar: '🎨',
      followers: 2450,
      tips: 1203,
      isFollowing: false,
      category: 'artists',
      gradient: 'linear-gradient(135deg, #FF8C42 0%, #F2A541 100%)'
    },
    {
      id: '2',
      name: 'Alex Rivera',
      username: '@alex_dev',
      avatar: '💻',
      followers: 1820,
      tips: 945,
      isFollowing: true,
      category: 'developers',
      gradient: 'linear-gradient(135deg, #0E4D5F 0%, #1A9BA8 100%)'
    },
    {
      id: '3',
      name: 'Maya Johnson',
      username: '@maya_music',
      avatar: '🎵',
      followers: 3200,
      tips: 2105,
      isFollowing: false,
      category: 'musicians',
      gradient: 'linear-gradient(135deg, #1A9BA8 0%, #6ED1C5 100%)'
    },
    {
      id: '4',
      name: 'Leo Park',
      username: '@leo_writes',
      avatar: '✍️',
      followers: 890,
      tips: 567,
      isFollowing: false,
      category: 'writers',
      gradient: 'linear-gradient(135deg, #FF686B 0%, #FF8C42 100%)'
    }
  ]);

  const [trendingCreators] = useState<Creator[]>([
    {
      id: '5',
      name: 'Emma Stone',
      username: '@emma_art',
      avatar: '🖼️',
      followers: 4100,
      tips: 3200,
      isFollowing: false,
      gradient: 'linear-gradient(135deg, #F2A541 0%, #FF686B 100%)'
    },
    {
      id: '6',
      name: 'Jake Wilson',
      username: '@jake_codes',
      avatar: '⚡',
      followers: 2900,
      tips: 1850,
      isFollowing: true,
      gradient: 'linear-gradient(135deg, #0E4D5F 0%, #1A9BA8 100%)'
    }
  ]);

  const [creators, setCreators] = useState(featuredCreators);

  const handleFollowToggle = (creatorId: string) => {
    setCreators(prev => prev.map(creator => 
      creator.id === creatorId 
        ? { ...creator, isFollowing: !creator.isFollowing }
        : creator
    ));
  };

  const handleCreatorClick = (creatorId: string) => {
    console.log(`Navigate to creator ${creatorId}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FFF5E8] via-[#FEFCF8] to-[#E6F7F9] pb-24">
      {/* Animated Background */}
      <div className="fixed inset-0 opacity-20 pointer-events-none">
        <div className="absolute top-20 left-10 w-96 h-96 bg-gradient-to-br from-[#F2A541]/30 to-[#FF686B]/30 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-br from-[#0E4D5F]/30 to-[#1A9BA8]/30 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
      </div>

      {/* Header */}
      <div className="relative bg-gradient-to-br from-[#0E4D5F] via-[#1A9BA8] to-[#0E4D5F] border-b border-white/10">
        <div className="container mx-auto px-4 py-6">
          <h1 className="text-3xl font-bold text-white mb-2 flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-[#FF8C42] to-[#F2A541] flex items-center justify-center shadow-lg">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            Discover
          </h1>
          <p className="text-sm text-white/80">Find amazing creators to support</p>
        </div>
      </div>

      <div className="relative container mx-auto px-4 py-6">
        {/* Search Bar */}
        <div className="mb-6">
          <div className="flex gap-3">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search creators, communities..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-4 bg-white border-2 border-gray-100 rounded-2xl focus:border-[#F2A541] focus:ring-4 focus:ring-[#F2A541]/10 outline-none transition-all shadow-lg"
              />
            </div>
            <button className="px-6 bg-white border-2 border-gray-100 rounded-2xl hover:border-[#F2A541] hover:bg-gradient-to-br hover:from-[#FF8C42]/10 hover:to-[#F2A541]/10 transition-all shadow-lg active:scale-95">
              <SlidersHorizontal className="w-5 h-5 text-gray-600" />
            </button>
          </div>
        </div>

        {/* Category Pills */}
        <div className="mb-8">
          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide -mx-4 px-4">
            {categories.map((category, index) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`flex-shrink-0 px-5 py-3 rounded-2xl font-semibold text-sm transition-all duration-300 ${
                  activeCategory === category.id
                    ? 'bg-gradient-to-r from-[#FF8C42] to-[#F2A541] text-white shadow-lg scale-105'
                    : 'bg-white text-gray-700 border-2 border-gray-100 hover:border-[#F2A541]/30'
                }`}
                style={{
                  animation: `fadeInUp 0.5s ease-out ${index * 0.05}s backwards`
                }}
              >
                <span className="mr-2">{category.icon}</span>
                {category.name}
              </button>
            ))}
          </div>
        </div>

        {/* Featured Creators */}
        <section className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold bg-gradient-to-r from-[#0E4D5F] to-[#1A9BA8] bg-clip-text text-transparent flex items-center gap-2">
              <Star className="w-6 h-6 text-[#F2A541]" />
              Featured Creators
            </h2>
            <button className="text-sm font-semibold text-[#F2A541] hover:text-[#FF8C42] transition-colors">
              See All →
            </button>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {creators.map((creator, index) => (
              <CreatorCard
                key={creator.id}
                creator={creator}
                onFollow={handleFollowToggle}
                onClick={handleCreatorClick}
                index={index}
              />
            ))}
          </div>
        </section>

        {/* Trending Now */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold bg-gradient-to-r from-[#FF8C42] to-[#F2A541] bg-clip-text text-transparent flex items-center gap-2">
              <Flame className="w-6 h-6 text-[#FF686B] animate-pulse" />
              Trending Now
            </h2>
            <button className="text-sm font-semibold text-[#F2A541] hover:text-[#FF8C42] transition-colors">
              See All →
            </button>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
            {trendingCreators.map((creator, index) => (
              <TrendingCard
                key={creator.id}
                creator={creator}
                onFollow={handleFollowToggle}
                onClick={handleCreatorClick}
                index={index}
              />
            ))}
          </div>
        </section>
      </div>

      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </div>
  );
}

// Creator Card Component
function CreatorCard({ creator, onFollow, onClick, index }: any) {
  return (
    <div
      onClick={() => onClick(creator.id)}
      className="group bg-white rounded-3xl p-5 shadow-lg hover:shadow-2xl transition-all duration-300 border-2 border-gray-100 hover:border-[#F2A541]/50 cursor-pointer hover:-translate-y-2"
      style={{
        animation: `fadeInUp 0.5s ease-out ${index * 0.1}s backwards`
      }}
    >
      <div 
        className="w-20 h-20 mx-auto mb-4 rounded-2xl flex items-center justify-center text-4xl shadow-lg group-hover:scale-110 transition-transform"
        style={{ background: creator.gradient }}
      >
        {creator.avatar}
      </div>
      
      <div className="text-center mb-4">
        <h3 className="font-bold text-gray-900 mb-1 truncate">{creator.name}</h3>
        <p className="text-sm text-gray-500 truncate">{creator.username}</p>
      </div>

      <div className="flex justify-center gap-4 mb-4 text-sm">
        <div className="text-center">
          <p className="font-bold text-gray-900">{(creator.followers / 1000).toFixed(1)}K</p>
          <p className="text-xs text-gray-500">Followers</p>
        </div>
        <div className="text-center">
          <p className="font-bold text-[#F2A541]">{creator.tips}</p>
          <p className="text-xs text-gray-500">Tips</p>
        </div>
      </div>

      <button
        onClick={(e) => {
          e.stopPropagation();
          onFollow(creator.id);
        }}
        className={`w-full py-2.5 rounded-xl font-semibold text-sm transition-all duration-300 active:scale-95 ${
          creator.isFollowing
            ? 'bg-gray-100 text-gray-700 border-2 border-gray-200 hover:bg-gray-200'
            : 'bg-gradient-to-r from-[#FF8C42] to-[#F2A541] text-white shadow-lg hover:shadow-xl'
        }`}
      >
        {creator.isFollowing ? 'Following' : 'Follow'}
      </button>
    </div>
  );
}

// Trending Card Component
function TrendingCard({ creator, onFollow, onClick, index }: any) {
  return (
    <div
      onClick={() => onClick(creator.id)}
      className="group bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border-2 border-gray-100 hover:border-[#F2A541]/50 cursor-pointer hover:-translate-y-2"
      style={{
        animation: `fadeInUp 0.5s ease-out ${index * 0.1}s backwards`
      }}
    >
      <div 
        className="h-32 flex items-center justify-center text-6xl relative overflow-hidden"
        style={{ background: creator.gradient }}
      >
        <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-full flex items-center gap-1 shadow-lg">
          <TrendingUp className="w-4 h-4 text-red-500" />
          <span className="text-xs font-bold text-gray-900">HOT</span>
        </div>
        <div className="group-hover:scale-110 transition-transform">
          {creator.avatar}
        </div>
      </div>
      
      <div className="p-5">
        <div className="mb-3">
          <h3 className="font-bold text-gray-900 mb-1 truncate">{creator.name}</h3>
          <p className="text-sm text-gray-500 truncate">{creator.username}</p>
        </div>

        <div className="flex justify-between mb-4 text-sm">
          <div>
            <p className="font-bold text-gray-900">{(creator.followers / 1000).toFixed(1)}K</p>
            <p className="text-xs text-gray-500">Followers</p>
          </div>
          <div className="text-right">
            <p className="font-bold text-[#F2A541]">{creator.tips}</p>
            <p className="text-xs text-gray-500">Tips</p>
          </div>
        </div>

        <button
          onClick={(e) => {
            e.stopPropagation();
            onFollow(creator.id);
          }}
          className={`w-full py-2.5 rounded-xl font-semibold text-sm transition-all duration-300 active:scale-95 ${
            creator.isFollowing
              ? 'bg-gray-100 text-gray-700 border-2 border-gray-200 hover:bg-gray-200'
              : 'bg-gradient-to-r from-[#FF8C42] to-[#F2A541] text-white shadow-lg hover:shadow-xl'
          }`}
        >
          {creator.isFollowing ? 'Following' : 'Follow'}
        </button>
      </div>
    </div>
  );
}