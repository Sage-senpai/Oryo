/**
 * ============================================================================
 * Ekene - Home Feed (Village Hearth)
 * ============================================================================
 * Location: src/pages/HomeFeed.tsx
 * 
 * Main community feed - warm, communal, Afrocentric
 * "Nnoo" greeting with stories carousel and tip cards
 * ============================================================================
 */

import { useState } from 'react';
import { Flame, Heart, MessageCircle, Share2, Users, Gift } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { TipFlowModal } from '@/components/TipFlowModal';

// ============================================================================
// MOCK DATA
// ============================================================================

const MOCK_COMMUNITIES = [
  { id: '1', name: 'Artists', icon: '🎨', color: '#E5A039', members: 234 },
  { id: '2', name: 'Musicians', icon: '🎵', color: '#2B6E3E', members: 189 },
  { id: '3', name: 'Writers', icon: '✍️', color: '#D96B3C', members: 156 },
  { id: '4', name: 'Developers', icon: '💻', color: '#8B4513', members: 312 },
  { id: '5', name: 'Speakers', icon: '🎤', color: '#CB4154', members: 98 },
];

const MOCK_FEED = [
  {
    id: '1',
    type: 'tip',
    from: { name: 'Amina K.', avatar: '🌺', username: '@amina' },
    to: { name: 'Kwame O.', avatar: '🎨', username: '@kwame' },
    amount: 5.0,
    token: 'DOT',
    message: 'Your art speaks to my soul! 🔥',
    timestamp: '2 hours ago',
  },
  {
    id: '2',
    type: 'milestone',
    creator: { name: 'Zuri M.', avatar: '🎵', username: '@zuri' },
    milestone: '100 supporters reached!',
    totalTips: 523.8,
    timestamp: '5 hours ago',
  },
  {
    id: '3',
    type: 'post',
    creator: { name: 'Jabari T.', avatar: '✍️', username: '@jabari' },
    content: 'New story dropping tomorrow. It\'s about a calabash that holds memories... 📖✨',
    likes: 45,
    comments: 12,
    timestamp: '1 day ago',
  },
];

// ============================================================================
// COMPONENT
// ============================================================================

export function HomeFeed() {
  const [showTipModal, setShowTipModal] = useState(false);
  const [selectedCreator, setSelectedCreator] = useState<any>(null);
  const [likedPosts, setLikedPosts] = useState<Set<string>>(new Set());
  const userName = 'Ade'; // TODO: Get from auth context

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
    <div className="home-feed">
      {/* Animated Background Pattern */}
      <div className="home-feed__bg-pattern" aria-hidden="true">
        <div className="pattern-orb pattern-orb--1" />
        <div className="pattern-orb pattern-orb--2" />
        <div className="pattern-orb pattern-orb--3" />
      </div>

      {/* Top Bar */}
      <header className="home-feed__header">
        <div className="home-feed__greeting">
          <div className="home-feed__avatar">
            <div className="avatar-glow">🌟</div>
          </div>
          <div>
            <h1 className="home-feed__title">
              Nnọọ, {userName}
            </h1>
            <p className="home-feed__subtitle">
              The village thrives today ✨
            </p>
          </div>
        </div>

        {/* Wallet Badge */}
        <div className="home-feed__balance">
          <span className="balance-label">Appreciation</span>
          <span className="balance-amount">24.5 DOT</span>
        </div>
      </header>

      {/* Communities Carousel */}
      <section className="home-feed__communities">
        <h2 className="section-label">
          <Users className="w-4 h-4" />
          Your Circles
        </h2>
        <div className="communities-carousel">
          {MOCK_COMMUNITIES.map((community, index) => (
            <motion.button
              key={community.id}
              className="community-orb"
              style={{ 
                background: `linear-gradient(135deg, ${community.color}40 0%, ${community.color}60 100%)`,
                borderColor: `${community.color}60`
              }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="community-icon">{community.icon}</span>
              <span className="community-name">{community.name}</span>
              <span className="community-members">{community.members}</span>
            </motion.button>
          ))}
        </div>
      </section>

      {/* Feed */}
      <section className="home-feed__feed">
        <AnimatePresence>
          {MOCK_FEED.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ delay: index * 0.1 }}
            >
              {item.type === 'tip' && (
                <TipCard 
                  item={item} 
                  onTipClick={handleTipClick} 
                />
              )}
              {item.type === 'milestone' && (
                <MilestoneCard item={item} />
              )}
              {item.type === 'post' && (
                <PostCard 
                  item={item} 
                  onTipClick={handleTipClick}
                  onLike={handleLike}
                  isLiked={likedPosts.has(item.id)}
                />
              )}
            </motion.div>
          ))}
        </AnimatePresence>
      </section>

      {/* Tip Modal */}
      {showTipModal && selectedCreator && (
        <TipFlowModal
          isOpen={showTipModal}
          onClose={() => setShowTipModal(false)}
          creator={selectedCreator}
        />
      )}
    </div>
  );
}

// ============================================================================
// SUB-COMPONENTS
// ============================================================================

function TipCard({ item, onTipClick }: any) {
  return (
    <div className="feed-card feed-card--tip">
      <div className="feed-card__header">
        <div className="feed-card__avatar">{item.from.avatar}</div>
        <div className="feed-card__info">
          <div className="tip-flow">
            <Flame className="w-4 h-4 text-sunrise-gold" />
            <span className="tip-text">
              <strong>{item.from.name}</strong> tipped{' '}
              <strong>{item.to.name}</strong>
            </span>
          </div>
          <div className="tip-amount">
            {item.amount} {item.token}
          </div>
        </div>
      </div>

      {item.message && (
        <p className="feed-card__message">"{item.message}"</p>
      )}

      <div className="feed-card__footer">
        <span className="feed-card__time">{item.timestamp}</span>
        <button 
          className="btn btn-sm btn-tip"
          onClick={() => onTipClick(item.to)}
        >
          <Flame className="w-4 h-4" />
          Tip
        </button>
      </div>
    </div>
  );
}

function MilestoneCard({ item }: any) {
  return (
    <div className="feed-card feed-card--milestone">
      <div className="milestone-glow" />
      <div className="feed-card__header">
        <div className="milestone-icon">
          <Gift className="w-6 h-6" />
        </div>
        <div className="feed-card__info">
          <strong>{item.creator.name}</strong>
          <p className="milestone-text">{item.milestone}</p>
          <p className="milestone-total">
            Total: {item.totalTips} DOT
          </p>
        </div>
      </div>
      <span className="feed-card__time">{item.timestamp}</span>
    </div>
  );
}

function PostCard({ item, onTipClick, onLike, isLiked }: any) {
  return (
    <div className="feed-card feed-card--post">
      <div className="feed-card__header">
        <div className="feed-card__avatar">{item.creator.avatar}</div>
        <div className="feed-card__info">
          <strong>{item.creator.name}</strong>
          <span className="feed-card__username">{item.creator.username}</span>
        </div>
      </div>

      <p className="feed-card__content">{item.content}</p>

      <div className="feed-card__actions">
        <button 
          className={`action-btn ${isLiked ? 'action-btn--active' : ''}`}
          onClick={() => onLike(item.id)}
        >
          <Heart className={`w-5 h-5 ${isLiked ? 'fill-current' : ''}`} />
          <span>{item.likes + (isLiked ? 1 : 0)}</span>
        </button>

        <button className="action-btn">
          <MessageCircle className="w-5 h-5" />
          <span>{item.comments}</span>
        </button>

        <button className="action-btn">
          <Share2 className="w-5 h-5" />
        </button>

        <button 
          className="btn btn-sm btn-tip ml-auto"
          onClick={() => onTipClick(item.creator)}
        >
          <Flame className="w-4 h-4" />
          Tip
        </button>
      </div>

      <span className="feed-card__time">{item.timestamp}</span>
    </div>
  );
}

// ============================================================================
// DATA FETCHING HOOKS (TODO)
// ============================================================================

/*
// TODO: Implement these hooks
async function fetchFeed() {
  // GET /api/feed
  // Requires: Authentication header
  // Returns: Array of feed items
}

async function fetchCommunities() {
  // GET /api/communities/my
  // Requires: Authentication header
  // Returns: Array of user's communities
}

async function fetchWalletBalance() {
  // GET /api/wallet/balance
  // Requires: Authentication header
  // Returns: { balance: number, token: string }
}
*/