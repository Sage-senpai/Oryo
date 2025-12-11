// File: src/components/Explore/DiscoveryPage.tsx
// Discovery and exploration hub - CORRECTED THEME VERSION
// Uses official Ekene Afrocentric palette from _variables.scss

import React, { useState, useEffect } from 'react';
import { 
  Search, Filter, TrendingUp, Flame, Users, Calendar,
  MapPin, Star, Award, ExternalLink, ChevronRight
} from 'lucide-react';

// Official Ekene Colors (matching _variables.scss)
const COLORS = {
  deepEarthBrown: '#3A2A1A',
  palmGreen: '#2B6E3E',
  sunriseGold: '#E5A039',
  terracottaClay: '#D96B3C',
  warmSand: '#F3E7D3',
  ochreYellow: '#DAA520',
  burntSienna: '#8B4513',
  charcoal: '#2D2520',
  white: '#FFFFFF',
  warmWhite: '#FFFEF9',
  sageGreen: '#9CAF88',
};

// ============================================================================
// TYPE DEFINITIONS
// ============================================================================

interface SearchFilters {
  category: 'all' | 'creators' | 'circles' | 'events';
  location?: string;
  sortBy: 'trending' | 'new' | 'top';
}

interface Creator {
  address: string;
  name: string;
  username: string;
  avatar: string;
  bio: string;
  badge?: string;
  verified: boolean;
  category: string;
  followersCount: number;
  tipsReceived: string;
}

interface Circle {
  id: string;
  name: string;
  description: string;
  avatar: string;
  memberCount: number;
  category: string;
  isPrivate: boolean;
}

interface Event {
  id: string;
  title: string;
  date: Date;
  venue: string;
  attendees: number;
  banner: string;
}

// ============================================================================
// DISCOVERY PAGE COMPONENT
// ============================================================================

const DiscoveryPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState<SearchFilters>({
    category: 'all',
    sortBy: 'trending'
  });
  const [showFilters, setShowFilters] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const [creators, setCreators] = useState<Creator[]>([]);
  const [circles, setCircles] = useState<Circle[]>([]);
  const [events, setEvents] = useState<Event[]>([]);
  const [categories] = useState([
    { id: 'all', label: 'All', icon: '🌟' },
    { id: 'tech', label: 'Tech', icon: '⚡' },
    { id: 'art', label: 'Art', icon: '🎨' },
    { id: 'music', label: 'Music', icon: '🎵' },
    { id: 'education', label: 'Education', icon: '📚' },
    { id: 'community', label: 'Community', icon: '🏘️' }
  ]);

  useEffect(() => {
    loadDiscoveryData();
  }, [filters]);

  const loadDiscoveryData = async () => {
    setIsLoading(true);
    await new Promise(r => setTimeout(r, 1000));

    setCreators([
      {
        address: '5FHne...',
        name: 'Adewale Ojo',
        username: 'adewale',
        avatar: '👨🏿‍💻',
        bio: 'Web3 Developer & Educator',
        badge: 'Griot',
        verified: true,
        category: 'Tech',
        followersCount: 2847,
        tipsReceived: '234.5'
      },
      {
        address: '5Grwv...',
        name: 'Chioma Nwankwo',
        username: 'chioma',
        avatar: '👩🏿‍🎨',
        bio: 'NFT Artist & Creator',
        badge: 'Umu Oha',
        verified: true,
        category: 'Art',
        followersCount: 3421,
        tipsReceived: '456.8'
      },
      {
        address: '5Dxz2...',
        name: 'Tunde Bakare',
        username: 'tunde',
        avatar: '👨🏿‍💼',
        bio: 'Blockchain Investor',
        verified: false,
        category: 'Tech',
        followersCount: 1567,
        tipsReceived: '123.4'
      }
    ]);

    setCircles([
      {
        id: '1',
        name: 'Lagos Blockchain Builders',
        description: 'Building Web3 solutions in Lagos',
        avatar: '🏛️',
        memberCount: 234,
        category: 'Tech',
        isPrivate: false
      },
      {
        id: '2',
        name: 'African NFT Collective',
        description: 'Celebrating African art on-chain',
        avatar: '🎨',
        memberCount: 567,
        category: 'Art',
        isPrivate: false
      }
    ]);

    setEvents([
      {
        id: '1',
        title: 'Lagos Blockchain Festival',
        date: new Date('2024-12-15'),
        venue: 'Innovation Hub Lagos',
        attendees: 156,
        banner: 'https://via.placeholder.com/400x200'
      }
    ]);

    setIsLoading(false);
  };

  // ============================================================================
  // SUB-COMPONENTS
  // ============================================================================

  const SearchHeader = () => (
    <div className="space-y-4 mb-6">
      <h1 className="text-3xl font-bold" style={{ color: COLORS.warmWhite }}>Explore the Village</h1>
      <p style={{ color: COLORS.warmSand }}>Discover creators, communities, and events</p>

      {/* Search bar */}
      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5" style={{ color: COLORS.warmSand }} />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search creators, circles, events..."
          className="w-full pl-12 pr-12 py-4 rounded-xl backdrop-blur-sm outline-none"
          style={{
            backgroundColor: `${COLORS.warmSand}15`,
            border: `2px solid ${COLORS.warmSand}30`,
            color: COLORS.warmWhite
          }}
        />
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-lg flex items-center justify-center transition-all"
          style={{ backgroundColor: `${COLORS.warmSand}20` }}
        >
          <Filter className="w-5 h-5" style={{ color: COLORS.warmWhite }} />
        </button>
      </div>

      {/* Filter panel */}
      {showFilters && (
        <div className="rounded-xl p-4 backdrop-blur-sm space-y-4"
             style={{ 
               backgroundColor: `${COLORS.warmSand}08`,
               border: `1px solid ${COLORS.warmSand}20`
             }}>
          <div>
            <label style={{ color: COLORS.warmWhite }} className="font-semibold text-sm mb-2 block">Category</label>
            <div className="flex gap-2 flex-wrap">
              {['all', 'creators', 'circles', 'events'].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setFilters({ ...filters, category: cat as any })}
                  className="px-4 py-2 rounded-lg font-medium text-sm transition-all"
                  style={filters.category === cat ? {
                    background: `linear-gradient(135deg, ${COLORS.sunriseGold} 0%, ${COLORS.terracottaClay} 100%)`,
                    color: COLORS.white
                  } : {
                    backgroundColor: `${COLORS.warmSand}15`,
                    color: COLORS.warmSand
                  }}
                >
                  {cat.charAt(0).toUpperCase() + cat.slice(1)}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label style={{ color: COLORS.warmWhite }} className="font-semibold text-sm mb-2 block">Sort By</label>
            <div className="flex gap-2">
              {[
                { id: 'trending', label: 'Trending' },
                { id: 'new', label: 'New' },
                { id: 'top', label: 'Top' }
              ].map((sort) => (
                <button
                  key={sort.id}
                  onClick={() => setFilters({ ...filters, sortBy: sort.id as any })}
                  className="flex-1 px-4 py-2 rounded-lg font-medium text-sm transition-all"
                  style={filters.sortBy === sort.id ? {
                    background: `linear-gradient(135deg, ${COLORS.sunriseGold} 0%, ${COLORS.terracottaClay} 100%)`,
                    color: COLORS.white
                  } : {
                    backgroundColor: `${COLORS.warmSand}15`,
                    color: COLORS.warmSand
                  }}
                >
                  {sort.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );

  const CategoryChips = () => (
    <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide mb-6">
      {categories.map((cat) => (
        <button
          key={cat.id}
          className="flex-shrink-0 px-4 py-2 rounded-full font-medium text-sm transition-all flex items-center gap-2"
          style={{ 
            backgroundColor: `${COLORS.warmSand}15`,
            border: `1px solid ${COLORS.warmSand}30`,
            color: COLORS.warmWhite
          }}
        >
          <span>{cat.icon}</span>
          {cat.label}
        </button>
      ))}
    </div>
  );

  const TrendingSection = () => (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold flex items-center gap-2" style={{ color: COLORS.warmWhite }}>
          <TrendingUp className="w-6 h-6" style={{ color: COLORS.sunriseGold }} />
          Trending Now
        </h2>
        <button className="text-sm font-semibold flex items-center gap-1" style={{ color: COLORS.sunriseGold }}>
          View All
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {creators.slice(0, 3).map((creator) => (
          <CreatorCard key={creator.address} creator={creator} />
        ))}
      </div>
    </div>
  );

  const CreatorCard = ({ creator }: { creator: Creator }) => (
    <div className="rounded-2xl p-6 backdrop-blur-sm transition-all group cursor-pointer"
         style={{ 
           backgroundColor: `${COLORS.warmSand}08`,
           border: `1px solid ${COLORS.warmSand}20`
         }}>
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-14 h-14 rounded-full flex items-center justify-center text-2xl relative"
               style={{ 
                 background: `linear-gradient(135deg, ${COLORS.sunriseGold} 0%, ${COLORS.terracottaClay} 100%)`,
                 border: `2px solid ${COLORS.warmSand}50`
               }}>
            {creator.avatar}
            {creator.verified && (
              <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full flex items-center justify-center"
                   style={{ 
                     backgroundColor: COLORS.sunriseGold,
                     border: `2px solid ${COLORS.deepEarthBrown}`
                   }}>
                <Star className="w-3 h-3 text-white fill-white" />
              </div>
            )}
          </div>
          <div>
            <h3 className="font-bold" style={{ color: COLORS.warmWhite }}>{creator.name}</h3>
            <p className="text-sm" style={{ color: COLORS.warmSand }}>@{creator.username}</p>
          </div>
        </div>
      </div>

      {creator.badge && (
        <div className="mb-3">
          <span className="px-3 py-1 rounded-full text-xs font-semibold inline-flex items-center gap-1"
                style={{ 
                  backgroundColor: `${COLORS.sunriseGold}30`,
                  color: COLORS.sunriseGold,
                  border: `1px solid ${COLORS.sunriseGold}50`
                }}>
            <Award className="w-3 h-3" />
            {creator.badge}
          </span>
        </div>
      )}

      <p className="text-sm mb-4 line-clamp-2" style={{ color: COLORS.warmSand }}>{creator.bio}</p>

      <div className="flex items-center justify-between pt-4"
           style={{ borderTop: `1px solid ${COLORS.warmSand}20` }}>
        <div className="space-y-1">
          <div className="font-bold" style={{ color: COLORS.sunriseGold }}>{creator.tipsReceived} DOT</div>
          <div className="text-xs" style={{ color: COLORS.warmSand }}>{creator.followersCount.toLocaleString()} followers</div>
        </div>
        <button className="px-4 py-2 rounded-lg text-white font-semibold transition-all opacity-0 group-hover:opacity-100 flex items-center gap-2"
                style={{ background: `linear-gradient(135deg, ${COLORS.sunriseGold} 0%, ${COLORS.terracottaClay} 100%)` }}>
          <Flame className="w-4 h-4" />
          Tip
        </button>
      </div>
    </div>
  );

  const CirclesSection = () => (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold flex items-center gap-2" style={{ color: COLORS.warmWhite }}>
          <Users className="w-6 h-6" style={{ color: COLORS.palmGreen }} />
          Popular Circles
        </h2>
        <button className="text-sm font-semibold flex items-center gap-1" style={{ color: COLORS.sunriseGold }}>
          View All
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        {circles.map((circle) => (
          <div
            key={circle.id}
            className="rounded-2xl p-6 backdrop-blur-sm transition-all group cursor-pointer"
            style={{ 
              backgroundColor: `${COLORS.warmSand}08`,
              border: `1px solid ${COLORS.warmSand}20`
            }}
          >
            <div className="flex items-start gap-4 mb-4">
              <div className="w-16 h-16 rounded-full flex items-center justify-center text-3xl flex-shrink-0"
                   style={{ background: `linear-gradient(135deg, ${COLORS.palmGreen} 0%, ${COLORS.sageGreen} 100%)` }}>
                {circle.avatar}
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-lg mb-1" style={{ color: COLORS.warmWhite }}>{circle.name}</h3>
                <p className="text-sm" style={{ color: COLORS.warmSand }}>{circle.description}</p>
              </div>
            </div>

            <div className="flex items-center justify-between pt-4"
                 style={{ borderTop: `1px solid ${COLORS.warmSand}20` }}>
              <div className="flex items-center gap-2 text-sm" style={{ color: COLORS.warmSand }}>
                <Users className="w-4 h-4" />
                <span>{circle.memberCount.toLocaleString()} members</span>
              </div>
              <button className="px-4 py-2 rounded-lg font-semibold transition-all opacity-0 group-hover:opacity-100"
                      style={{ 
                        backgroundColor: `${COLORS.palmGreen}30`,
                        color: COLORS.palmGreen,
                        border: `1px solid ${COLORS.palmGreen}`
                      }}>
                Join
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const EventsSection = () => (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold flex items-center gap-2" style={{ color: COLORS.warmWhite }}>
          <Calendar className="w-6 h-6" style={{ color: COLORS.terracottaClay }} />
          Upcoming Events
        </h2>
        <button className="text-sm font-semibold flex items-center gap-1" style={{ color: COLORS.sunriseGold }}>
          View All
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      <div className="space-y-4">
        {events.map((event) => (
          <div
            key={event.id}
            className="rounded-2xl overflow-hidden backdrop-blur-sm transition-all group cursor-pointer"
            style={{ 
              backgroundColor: `${COLORS.warmSand}08`,
              border: `1px solid ${COLORS.warmSand}20`
            }}
          >
            <div className="h-40 relative overflow-hidden"
                 style={{ background: `linear-gradient(135deg, ${COLORS.terracottaClay} 0%, ${COLORS.sunriseGold} 100%)` }}>
              <div className="absolute inset-0 opacity-30">
                <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
                  <defs>
                    <pattern id="event-grid" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
                      <circle cx="20" cy="20" r="1.5" fill="white" />
                    </pattern>
                  </defs>
                  <rect width="100%" height="100%" fill="url(#event-grid)" />
                </svg>
              </div>
            </div>

            <div className="p-6">
              <h3 className="font-bold text-lg mb-2" style={{ color: COLORS.warmWhite }}>{event.title}</h3>
              <div className="space-y-2 mb-4">
                <div className="flex items-center gap-2 text-sm" style={{ color: COLORS.warmSand }}>
                  <Calendar className="w-4 h-4" />
                  {event.date.toLocaleDateString('en-US', { 
                    month: 'long', 
                    day: 'numeric',
                    year: 'numeric'
                  })}
                </div>
                <div className="flex items-center gap-2 text-sm" style={{ color: COLORS.warmSand }}>
                  <MapPin className="w-4 h-4" />
                  {event.venue}
                </div>
                <div className="flex items-center gap-2 text-sm" style={{ color: COLORS.warmSand }}>
                  <Users className="w-4 h-4" />
                  {event.attendees} registered
                </div>
              </div>

              <button className="w-full py-3 rounded-lg text-white font-bold transition-all"
                      style={{ background: `linear-gradient(135deg, ${COLORS.terracottaClay} 0%, ${COLORS.sunriseGold} 100%)` }}>
                Register for Event
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const LoadingSkeleton = () => (
    <div className="space-y-8">
      {[1, 2, 3].map((i) => (
        <div key={i} className="rounded-2xl p-6 animate-pulse"
             style={{ 
               backgroundColor: `${COLORS.warmSand}08`,
               border: `1px solid ${COLORS.warmSand}20`
             }}>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-14 h-14 rounded-full" style={{ backgroundColor: `${COLORS.warmSand}20` }} />
            <div className="flex-1 space-y-2">
              <div className="h-4 rounded" style={{ backgroundColor: `${COLORS.warmSand}20`, width: '33%' }} />
              <div className="h-3 rounded" style={{ backgroundColor: `${COLORS.warmSand}20`, width: '25%' }} />
            </div>
          </div>
          <div className="space-y-2">
            <div className="h-3 rounded" style={{ backgroundColor: `${COLORS.warmSand}20`, width: '100%' }} />
            <div className="h-3 rounded" style={{ backgroundColor: `${COLORS.warmSand}20`, width: '83%' }} />
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
      <SearchHeader />
      <CategoryChips />

      {isLoading ? (
        <LoadingSkeleton />
      ) : (
        <>
          {(filters.category === 'all' || filters.category === 'creators') && <TrendingSection />}
          {(filters.category === 'all' || filters.category === 'circles') && <CirclesSection />}
          {(filters.category === 'all' || filters.category === 'events') && <EventsSection />}
        </>
      )}
    </div>
  );
};

export default DiscoveryPage;