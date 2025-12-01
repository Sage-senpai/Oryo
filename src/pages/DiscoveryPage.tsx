// Location: src/pages/DiscoveryPage.tsx


import { useState } from 'react';
import { Search, SlidersHorizontal, Flame, Users, Sparkles, Star } from 'lucide-react';

// Types
interface Creator {
  id: string;
  name: string;
  username: string;
  avatar: string;
  followers: number;
  tips: number;
  isFollowing: boolean;
  category?: string;
}

interface Category {
  id: string;
  name: string;
  icon: React.ReactNode;
}

export function DiscoveryPage() {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const categories: Category[] = [
    { id: 'all', name: 'All', icon: <Sparkles className="w-4 h-4" /> },
    { id: 'trending', name: 'Trending', icon: <Flame className="w-4 h-4" /> },
    { id: 'artists', name: 'Artists', icon: '🎨' },
    { id: 'musicians', name: 'Musicians', icon: '🎵' },
    { id: 'creators', name: 'Creators', icon: '📹' },
    { id: 'writers', name: 'Writers', icon: '✍️' },
    { id: 'developers', name: 'Developers', icon: '💻' }
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
      category: 'artists'
    },
    {
      id: '2',
      name: 'Alex Rivera',
      username: '@alex_dev',
      avatar: '💻',
      followers: 1820,
      tips: 945,
      isFollowing: true,
      category: 'developers'
    },
    {
      id: '3',
      name: 'Maya Johnson',
      username: '@maya_music',
      avatar: '🎵',
      followers: 3200,
      tips: 2105,
      isFollowing: false,
      category: 'musicians'
    },
    {
      id: '4',
      name: 'Leo Park',
      username: '@leo_writes',
      avatar: '✍️',
      followers: 890,
      tips: 567,
      isFollowing: false,
      category: 'writers'
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
      category: 'artists'
    },
    {
      id: '6',
      name: 'Jake Wilson',
      username: '@jake_codes',
      avatar: '⚡',
      followers: 2900,
      tips: 1850,
      isFollowing: true,
      category: 'developers'
    },
    {
      id: '7',
      name: 'Olivia Davis',
      username: '@olivia_sings',
      avatar: '🎤',
      followers: 5200,
      tips: 4100,
      isFollowing: false,
      category: 'musicians'
    },
    {
      id: '8',
      name: 'Ryan Martinez',
      username: '@ryan_films',
      avatar: '🎬',
      followers: 3600,
      tips: 2400,
      isFollowing: false,
      category: 'creators'
    }
  ]);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    // TODO: Implement search functionality
  };

  const handleCategoryClick = (categoryId: string) => {
    setActiveCategory(categoryId);
    // TODO: Filter creators by category
  };

  const handleFollowToggle = (creatorId: string) => {
    console.log(`Toggle follow for creator ${creatorId}`);
    // TODO: Implement follow/unfollow
  };

  const handleCreatorClick = (creatorId: string) => {
    console.log(`Navigate to creator ${creatorId}`);
    // TODO: Navigate to creator profile
  };

  return (
    <div className="discovery-page">
      {/* Header with Search */}
      <div className="discovery-page__header">
        <div className="discovery-page__search">
          <input
            type="text"
            placeholder="Search creators, communities..."
            value={searchQuery}
            onChange={(e) => handleSearch(e.target.value)}
          />
          <button className="discovery-page__filter-btn">
            <SlidersHorizontal />
          </button>
        </div>

        {/* Category Pills */}
        <div className="discovery-page__categories">
          {categories.map((category) => (
            <button
              key={category.id}
              className={`category-pill ${activeCategory === category.id ? 'category-pill--active' : ''}`}
              onClick={() => handleCategoryClick(category.id)}
            >
              {typeof category.icon === 'string' ? (
                <span className="mr-1">{category.icon}</span>
              ) : (
                category.icon
              )}
              {category.name}
            </button>
          ))}
        </div>
      </div>

      {/* Content Sections */}
      <div className="discovery-page__content">
        {/* Featured Creators */}
        <section className="discovery-page__section">
          <div className="discovery-page__section-header">
            <h2 className="discovery-page__section-title">
              <Star className="inline w-5 h-5 mr-2 text-[#F2A541]" />
              Featured Creators
            </h2>
            <a href="#" className="discovery-page__see-all">See All</a>
          </div>

          <div className="discovery-page__grid">
            {featuredCreators.map((creator) => (
              <CreatorCard
                key={creator.id}
                creator={creator}
                onFollow={handleFollowToggle}
                onClick={handleCreatorClick}
              />
            ))}
          </div>
        </section>

        {/* Trending Now */}
        <section className="discovery-page__section">
          <div className="discovery-page__section-header">
            <h2 className="discovery-page__section-title">
              <Flame className="inline w-5 h-5 mr-2 text-[#FF686B]" />
              Trending Now
            </h2>
            <a href="#" className="discovery-page__see-all">See All</a>
          </div>

          <div className="discovery-page__grid">
            {trendingCreators.map((creator) => (
              <CreatorCard
                key={creator.id}
                creator={creator}
                onFollow={handleFollowToggle}
                onClick={handleCreatorClick}
              />
            ))}
          </div>
        </section>

        {/* New This Week */}
        <section className="discovery-page__section">
          <div className="discovery-page__section-header">
            <h2 className="discovery-page__section-title">
              <Sparkles className="inline w-5 h-5 mr-2 text-[#6ED1C5]" />
              New This Week
            </h2>
            <a href="#" className="discovery-page__see-all">See All</a>
          </div>

          <div className="discovery-page__grid">
            {featuredCreators.slice(0, 4).map((creator) => (
              <CreatorCard
                key={creator.id}
                creator={creator}
                onFollow={handleFollowToggle}
                onClick={handleCreatorClick}
              />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

// Creator Card Sub-Component
interface CreatorCardProps {
  creator: Creator;
  onFollow: (id: string) => void;
  onClick: (id: string) => void;
}

function CreatorCard({ creator, onFollow, onClick }: CreatorCardProps) {
  return (
    <div 
      className="creator-discovery-card"
      onClick={() => onClick(creator.id)}
    >
      <div className="creator-discovery-card__avatar">
        {creator.avatar}
      </div>
      <div className="creator-discovery-card__name">{creator.name}</div>
      <div className="creator-discovery-card__username">{creator.username}</div>

      <div className="creator-discovery-card__stats">
        <div className="creator-discovery-card__stat">
          <strong>{(creator.followers / 1000).toFixed(1)}K</strong>
          <span>Followers</span>
        </div>
        <div className="creator-discovery-card__stat">
          <strong>{creator.tips}</strong>
          <span>Tips</span>
        </div>
      </div>

      <button
        className={`creator-discovery-card__follow-btn ${creator.isFollowing ? 'creator-discovery-card__follow-btn--following' : ''}`}
        onClick={(e) => {
          e.stopPropagation();
          onFollow(creator.id);
        }}
      >
        {creator.isFollowing ? 'Following' : 'Follow'}
      </button>
    </div>
  );
}