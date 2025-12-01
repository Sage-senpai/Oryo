/**

 * Location: src/pages/CollectiblesPage.tsx
  
 * Styles: src/styles/components/_collectibles.scss
 */

import { useState } from 'react';
import { Lock, Share2, X, Trophy, Award, Star } from 'lucide-react';

// Types
interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  isUnlocked: boolean;
  unlockedDate?: string;
  progress?: {
    current: number;
    total: number;
  };
  points: number;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
  isNew?: boolean;
}

type TabType = 'all' | 'unlocked' | 'locked';

export function CollectiblesPage() {
  const [activeTab, setActiveTab] = useState<TabType>('all');
  const [selectedBadge, setSelectedBadge] = useState<Badge | null>(null);

  // Mock badges data
  const [badges] = useState<Badge[]>([
    {
      id: '1',
      name: 'First Flame',
      description: 'Sent your very first tip on Oryo. Every journey begins with a single step!',
      icon: '🔥',
      isUnlocked: true,
      unlockedDate: 'Nov 15, 2024',
      points: 100,
      rarity: 'common',
      isNew: false
    },
    {
      id: '2',
      name: 'Generous Heart',
      description: 'Tipped 10 different creators. Your generosity is making a difference!',
      icon: '💝',
      isUnlocked: true,
      unlockedDate: 'Nov 20, 2024',
      points: 250,
      rarity: 'rare',
      isNew: false
    },
    {
      id: '3',
      name: 'Community Builder',
      description: 'Joined 5 communities. Building connections across the Oryo ecosystem!',
      icon: '🏛️',
      isUnlocked: false,
      progress: { current: 3, total: 5 },
      points: 300,
      rarity: 'rare'
    },
    {
      id: '4',
      name: 'Flame Keeper',
      description: 'Tip 50 times in total. Keep the fire burning bright!',
      icon: '🕯️',
      isUnlocked: false,
      progress: { current: 23, total: 50 },
      points: 500,
      rarity: 'epic'
    },
    {
      id: '5',
      name: 'Early Adopter',
      description: 'Joined Oryo in the first month of launch. A true pioneer!',
      icon: '🌟',
      isUnlocked: true,
      unlockedDate: 'Nov 1, 2024',
      points: 1000,
      rarity: 'legendary',
      isNew: true
    },
    {
      id: '6',
      name: 'Weekend Warrior',
      description: 'Tipped creators on 7 consecutive weekends. Consistency is key!',
      icon: '⚔️',
      isUnlocked: false,
      progress: { current: 4, total: 7 },
      points: 400,
      rarity: 'epic'
    },
    {
      id: '7',
      name: 'Social Butterfly',
      description: 'Follow 20 creators and engage with their content regularly.',
      icon: '🦋',
      isUnlocked: false,
      progress: { current: 12, total: 20 },
      points: 200,
      rarity: 'common'
    },
    {
      id: '8',
      name: 'Mega Tipper',
      description: 'Sent a single tip worth 100 DOT or more. Making waves!',
      icon: '💎',
      isUnlocked: false,
      points: 750,
      rarity: 'legendary'
    }
  ]);

  const totalBadges = badges.length;
  const unlockedBadges = badges.filter(b => b.isUnlocked).length;
  const totalPoints = badges.filter(b => b.isUnlocked).reduce((sum, b) => sum + b.points, 0);

  const filteredBadges = badges.filter(badge => {
    if (activeTab === 'all') return true;
    if (activeTab === 'unlocked') return badge.isUnlocked;
    if (activeTab === 'locked') return !badge.isUnlocked;
    return true;
  });

  const handleBadgeClick = (badge: Badge) => {
    if (badge.isUnlocked) {
      setSelectedBadge(badge);
    }
  };

  const handleShareBadge = () => {
    console.log('Sharing badge:', selectedBadge);
    // TODO: Implement share functionality
  };

  return (
    <div className="collectibles-page">
      {/* Header */}
      <div className="collectibles-page__header">
        <h1 className="collectibles-page__title">Your Collectibles</h1>
        <p className="collectibles-page__subtitle">
          Earn badges by being active in the Oryo community
        </p>

        {/* Stats */}
        <div className="collectibles-page__stats">
          <div className="collectibles-page__stat">
            <strong>{unlockedBadges}/{totalBadges}</strong>
            <span>Badges</span>
          </div>
          <div className="collectibles-page__stat">
            <strong>{totalPoints}</strong>
            <span>Points</span>
          </div>
          <div className="collectibles-page__stat">
            <strong>#{Math.floor(Math.random() * 500) + 1}</strong>
            <span>Rank</span>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="collectibles-page__content">
        {/* Tabs */}
        <div className="collectibles-page__tabs">
          <button
            className={`collectibles-page__tab ${activeTab === 'all' ? 'collectibles-page__tab--active' : ''}`}
            onClick={() => setActiveTab('all')}
          >
            All ({totalBadges})
          </button>
          <button
            className={`collectibles-page__tab ${activeTab === 'unlocked' ? 'collectibles-page__tab--active' : ''}`}
            onClick={() => setActiveTab('unlocked')}
          >
            Unlocked ({unlockedBadges})
          </button>
          <button
            className={`collectibles-page__tab ${activeTab === 'locked' ? 'collectibles-page__tab--active' : ''}`}
            onClick={() => setActiveTab('locked')}
          >
            Locked ({totalBadges - unlockedBadges})
          </button>
        </div>

        {/* Badges Grid */}
        <section className="collectibles-page__section">
          <div className="collectibles-page__grid">
            {filteredBadges.map((badge) => (
              <BadgeCard
                key={badge.id}
                badge={badge}
                onClick={handleBadgeClick}
              />
            ))}
          </div>
        </section>

        {/* Recent Achievements */}
        {badges.some(b => b.isUnlocked) && (
          <section className="collectibles-page__section">
            <h2 className="collectibles-page__section-title">
              <Trophy className="inline w-5 h-5 mr-2 text-[#F2A541]" />
              Recent Achievements
            </h2>
            <div className="collectibles-page__list">
              {badges
                .filter(b => b.isUnlocked)
                .slice(0, 3)
                .map((badge) => (
                  <AchievementRow
                    key={badge.id}
                    badge={badge}
                    onClick={handleBadgeClick}
                  />
                ))}
            </div>
          </section>
        )}
      </div>

      {/* Badge Detail Modal */}
      {selectedBadge && (
        <BadgeDetailModal
          badge={selectedBadge}
          onClose={() => setSelectedBadge(null)}
          onShare={handleShareBadge}
        />
      )}
    </div>
  );
}

// ============================================================================
// BADGE CARD SUB-COMPONENT
// ============================================================================

interface BadgeCardProps {
  badge: Badge;
  onClick: (badge: Badge) => void;
}

function BadgeCard({ badge, onClick }: BadgeCardProps) {
  return (
    <div
      className={`badge-card ${!badge.isUnlocked ? 'badge-card--locked' : ''}`}
      onClick={() => onClick(badge)}
    >
      {badge.isNew && <div className="badge-card__new-badge">New!</div>}
      
      <div className={`badge-card__icon-wrapper ${badge.isUnlocked ? 'badge-card__icon-wrapper--unlocked' : 'badge-card__icon-wrapper--locked'}`}>
        {badge.isUnlocked ? (
          <div className="badge-card__icon">{badge.icon}</div>
        ) : (
          <>
            <div className="badge-card__icon" style={{ filter: 'grayscale(100%) opacity(0.3)' }}>
              {badge.icon}
            </div>
            <div className="badge-card__lock">
              <Lock />
            </div>
          </>
        )}
      </div>

      <div className="badge-card__name">{badge.name}</div>
      <div className="badge-card__description">{badge.description}</div>

      {!badge.isUnlocked && badge.progress && (
        <div className="badge-card__progress">
          <div className="badge-card__progress-text">
            {badge.progress.current}/{badge.progress.total}
          </div>
          <div className="badge-card__progress-bar">
            <div
              className="badge-card__progress-fill"
              style={{ width: `${(badge.progress.current / badge.progress.total) * 100}%` }}
            />
          </div>
        </div>
      )}

      {badge.isUnlocked && badge.unlockedDate && (
        <div className="badge-card__date">Unlocked {badge.unlockedDate}</div>
      )}
    </div>
  );
}

// ============================================================================
// ACHIEVEMENT ROW SUB-COMPONENT
// ============================================================================

interface AchievementRowProps {
  badge: Badge;
  onClick: (badge: Badge) => void;
}

function AchievementRow({ badge, onClick }: AchievementRowProps) {
  return (
    <div
      className={`achievement-row ${!badge.isUnlocked ? 'achievement-row--locked' : ''}`}
      onClick={() => onClick(badge)}
    >
      <div className={`achievement-row__icon ${badge.isUnlocked ? 'achievement-row__icon--unlocked' : 'achievement-row__icon--locked'}`}>
        {badge.isUnlocked ? (
          badge.icon
        ) : (
          <>
            <span style={{ filter: 'grayscale(100%) opacity(0.3)' }}>{badge.icon}</span>
            <div className="achievement-row__lock">
              <Lock />
            </div>
          </>
        )}
      </div>

      <div className="achievement-row__info">
        <div className="achievement-row__header">
          <div className="achievement-row__name">{badge.name}</div>
          <div className="achievement-row__points">+{badge.points} pts</div>
        </div>
        <div className="achievement-row__description">{badge.description}</div>

        {!badge.isUnlocked && badge.progress && (
          <div className="achievement-row__progress">
            <div className="achievement-row__progress-text">
              Progress: {badge.progress.current}/{badge.progress.total}
            </div>
            <div className="achievement-row__progress-bar">
              <div
                className="achievement-row__progress-fill"
                style={{ width: `${(badge.progress.current / badge.progress.total) * 100}%` }}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// ============================================================================
// BADGE DETAIL MODAL SUB-COMPONENT
// ============================================================================

interface BadgeDetailModalProps {
  badge: Badge;
  onClose: () => void;
  onShare: () => void;
}

function BadgeDetailModal({ badge, onClose, onShare }: BadgeDetailModalProps) {
  return (
    <div className="badge-detail-modal__overlay" onClick={onClose}>
      <div
        className="badge-detail-modal__content"
        onClick={(e) => e.stopPropagation()}
      >
        <button className="badge-detail-modal__close" onClick={onClose}>
          <X />
        </button>

        <div className="badge-detail-modal__icon">{badge.icon}</div>
        <h2 className="badge-detail-modal__name">{badge.name}</h2>
        <p className="badge-detail-modal__description">{badge.description}</p>

        {badge.unlockedDate && (
          <div className="badge-detail-modal__date">
            Unlocked on {badge.unlockedDate}
          </div>
        )}

        <button className="badge-detail-modal__share-btn" onClick={onShare}>
          <Share2 />
          Share Achievement
        </button>
      </div>
    </div>
  );
}