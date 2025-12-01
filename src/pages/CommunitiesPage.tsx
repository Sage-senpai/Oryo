/**

 * Location: src/pages/CommunitiesPage.tsx
Styles: src/styles/components/_communities.scss
 */

import { useState } from 'react';
import { Plus, X } from 'lucide-react';

// Types
interface Community {
  id: string;
  name: string;
  description: string;
  icon: string;
  members: number;
  totalTipped: string;
  color: 'orange' | 'blue' | 'green' | 'purple';
  tags?: string[];
  isJoined?: boolean;
  badge?: string;
}

type TabType = 'my' | 'discover';

export function CommunitiesPage() {
  const [activeTab, setActiveTab] = useState<TabType>('my');
  const [showCreateModal, setShowCreateModal] = useState<boolean>(false);

  // Mock communities data
  const [myCommunities] = useState<Community[]>([
    {
      id: '1',
      name: 'Digital Artists Hub',
      description: 'A community for digital artists to share, learn, and support each other through creative collaborations.',
      icon: '🎨',
      members: 1243,
      totalTipped: '2,450 DOT',
      color: 'orange',
      isJoined: true,
      badge: 'Active'
    },
    {
      id: '2',
      name: 'Web3 Developers',
      description: 'Building the decentralized future together. Share code, tips, and collaborate on projects.',
      icon: '💻',
      members: 892,
      totalTipped: '1,820 DOT',
      color: 'blue',
      isJoined: true
    }
  ]);

  const [discoverCommunities] = useState<Community[]>([
    {
      id: '3',
      name: 'Music Creators',
      description: 'Independent musicians supporting each other through the journey of creating amazing music.',
      icon: '🎵',
      members: 2105,
      totalTipped: '3,200 DOT',
      color: 'purple',
      tags: ['Music', 'Audio', 'Production'],
      isJoined: false
    },
    {
      id: '4',
      name: 'Content Creators',
      description: 'YouTubers, streamers, and video creators building audience and supporting each other.',
      icon: '📹',
      members: 1567,
      totalTipped: '2,100 DOT',
      color: 'green',
      tags: ['Video', 'Streaming', 'Content'],
      isJoined: false
    },
    {
      id: '5',
      name: 'Writers Circle',
      description: 'Authors, poets, and writers sharing their craft and supporting literary excellence.',
      icon: '✍️',
      members: 745,
      totalTipped: '890 DOT',
      color: 'orange',
      tags: ['Writing', 'Books', 'Poetry'],
      isJoined: false
    },
    {
      id: '6',
      name: 'Photographers',
      description: 'Capture the world through your lens and share your vision with fellow photographers.',
      icon: '📷',
      members: 1890,
      totalTipped: '1,650 DOT',
      color: 'blue',
      tags: ['Photography', 'Visual', 'Art'],
      isJoined: false
    }
  ]);

  const handleCreateCommunity = (data: CreateCommunityData) => {
    console.log('Creating community:', data);
    // TODO: Implement community creation
    setShowCreateModal(false);
  };

  const handleJoinCommunity = (communityId: string) => {
    console.log('Joining community:', communityId);
    // TODO: Implement join functionality
  };

  const handleCommunityClick = (communityId: string) => {
    console.log('Navigate to community:', communityId);
    // TODO: Navigate to community detail page
  };

  const getColorClass = (color: Community['color']) => {
    switch (color) {
      case 'blue':
        return 'community-card__banner--blue';
      case 'green':
        return 'community-card__banner--green';
      case 'purple':
        return 'community-card__banner--purple';
      default:
        return '';
    }
  };

  return (
    <div className="communities-page">
      {/* Header */}
      <div className="communities-page__header">
        <h1 className="communities-page__title">Communities</h1>
        <p className="communities-page__subtitle">
          Connect, collaborate, and support together
        </p>

        {/* Tabs */}
        <div className="communities-page__tabs">
          <button
            className={`communities-page__tab ${activeTab === 'my' ? 'communities-page__tab--active' : ''}`}
            onClick={() => setActiveTab('my')}
          >
            My Communities
          </button>
          <button
            className={`communities-page__tab ${activeTab === 'discover' ? 'communities-page__tab--active' : ''}`}
            onClick={() => setActiveTab('discover')}
          >
            Discover
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="communities-page__content">
        {activeTab === 'my' ? (
          // My Communities
          <section className="communities-page__section">
            <h2 className="communities-page__section-title">
              Your Communities ({myCommunities.length})
            </h2>
            <div className="communities-page__grid">
              {myCommunities.map((community) => (
                <div
                  key={community.id}
                  className="community-card"
                  onClick={() => handleCommunityClick(community.id)}
                >
                  <div className={`community-card__banner ${getColorClass(community.color)}`}></div>
                  <div className="community-card__content">
                    {community.badge && (
                      <div className="community-card__badge">{community.badge}</div>
                    )}
                    <div className="community-card__icon">{community.icon}</div>
                    <h3 className="community-card__name">{community.name}</h3>
                    <p className="community-card__description">{community.description}</p>
                    <div className="community-card__stats">
                      <div className="community-card__stat">
                        <strong>{(community.members / 1000).toFixed(1)}K</strong>
                        <span>Members</span>
                      </div>
                      <div className="community-card__stat">
                        <strong>{community.totalTipped}</strong>
                        <span>Total Tipped</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        ) : (
          // Discover Communities
          <>
            <section className="communities-page__section">
              <h2 className="communities-page__section-title">Trending Communities</h2>
              <div className="communities-page__grid">
                {discoverCommunities.slice(0, 2).map((community) => (
                  <TrendingCommunityCard
                    key={community.id}
                    community={community}
                    onJoin={handleJoinCommunity}
                    onClick={handleCommunityClick}
                  />
                ))}
              </div>
            </section>

            <section className="communities-page__section">
              <h2 className="communities-page__section-title">All Communities</h2>
              <div className="communities-page__grid">
                {discoverCommunities.map((community) => (
                  <div
                    key={community.id}
                    className="community-card"
                    onClick={() => handleCommunityClick(community.id)}
                  >
                    <div className={`community-card__banner ${getColorClass(community.color)}`}></div>
                    <div className="community-card__content">
                      <div className="community-card__icon">{community.icon}</div>
                      <h3 className="community-card__name">{community.name}</h3>
                      <p className="community-card__description">{community.description}</p>
                      <div className="community-card__stats">
                        <div className="community-card__stat">
                          <strong>{(community.members / 1000).toFixed(1)}K</strong>
                          <span>Members</span>
                        </div>
                        <div className="community-card__stat">
                          <strong>{community.totalTipped}</strong>
                          <span>Tipped</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </>
        )}
      </div>

      {/* Create Community FAB */}
      <button
        className="communities-page__create-btn"
        onClick={() => setShowCreateModal(true)}
        aria-label="Create Community"
      >
        <Plus />
      </button>

      {/* Create Community Modal */}
      {showCreateModal && (
        <CreateCommunityModal
          onClose={() => setShowCreateModal(false)}
          onCreate={handleCreateCommunity}
        />
      )}
    </div>
  );
}

// ============================================================================
// TRENDING COMMUNITY CARD SUB-COMPONENT
// ============================================================================

interface TrendingCommunityCardProps {
  community: Community;
  onJoin: (id: string) => void;
  onClick: (id: string) => void;
}

function TrendingCommunityCard({ community, onJoin, onClick }: TrendingCommunityCardProps) {
  return (
    <div
      className="trending-community"
      onClick={() => onClick(community.id)}
    >
      <div className="trending-community__icon">{community.icon}</div>
      <div className="trending-community__info">
        <div className="trending-community__name">{community.name}</div>
        <div className="trending-community__members">
          {(community.members / 1000).toFixed(1)}K members
        </div>
        {community.tags && (
          <div className="trending-community__tags">
            {community.tags.map((tag, index) => (
              <span key={index} className="trending-community__tag">
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>
      <button
        className={`trending-community__action ${community.isJoined ? 'trending-community__action--joined' : ''}`}
        onClick={(e) => {
          e.stopPropagation();
          onJoin(community.id);
        }}
      >
        {community.isJoined ? 'Joined' : 'Join'}
      </button>
    </div>
  );
}

// ============================================================================
// CREATE COMMUNITY MODAL SUB-COMPONENT
// ============================================================================

interface CreateCommunityData {
  name: string;
  description: string;
  icon: string;
}

interface CreateCommunityModalProps {
  onClose: () => void;
  onCreate: (data: CreateCommunityData) => void;
}

function CreateCommunityModal({ onClose, onCreate }: CreateCommunityModalProps) {
  const [formData, setFormData] = useState<CreateCommunityData>({
    name: '',
    description: '',
    icon: '🔥'
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.name.trim() && formData.description.trim()) {
      onCreate(formData);
    }
  };

  return (
    <div className="create-community-modal__overlay" onClick={onClose}>
      <div
        className="create-community-modal__content"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="create-community-modal__header">
          <h2 className="create-community-modal__title">Create Community</h2>
          <button className="create-community-modal__close" onClick={onClose}>
            <X />
          </button>
        </div>

        <form className="create-community-modal__form" onSubmit={handleSubmit}>
          <div className="create-community-modal__field">
            <label className="create-community-modal__label">Community Name</label>
            <input
              type="text"
              className="create-community-modal__input"
              placeholder="e.g. Digital Artists Hub"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
            />
          </div>

          <div className="create-community-modal__field">
            <label className="create-community-modal__label">Description</label>
            <textarea
              className="create-community-modal__textarea"
              placeholder="Describe what your community is about..."
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              required
            />
          </div>

          <div className="create-community-modal__field">
            <label className="create-community-modal__label">Icon Emoji</label>
            <input
              type="text"
              className="create-community-modal__input"
              placeholder="🔥"
              value={formData.icon}
              onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
              maxLength={2}
            />
          </div>

          <button
            type="submit"
            className="create-community-modal__submit"
            disabled={!formData.name.trim() || !formData.description.trim()}
          >
            Create Community
          </button>
        </form>
      </div>
    </div>
  );
}