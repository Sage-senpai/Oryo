/**
 * ============================================================================
 * ORYO - Vibrant Communities Page
 * ============================================================================
 * Location: src/pages/CommunitiesPage.tsx
 * ============================================================================
 */

import { useState } from 'react';
import { Plus, X, Users, Sparkles, TrendingUp } from 'lucide-react';

interface Community {
  id: string;
  name: string;
  description: string;
  icon: string;
  members: number;
  totalTipped: string;
  color: string;
  gradient: string;
  tags?: string[];
  isJoined?: boolean;
  badge?: string;
}

export function CommunitiesPage() {
  const [activeTab, setActiveTab] = useState<'my' | 'discover'>('my');
  const [showCreateModal, setShowCreateModal] = useState(false);

  const [myCommunities] = useState<Community[]>([
    {
      id: '1',
      name: 'Digital Artists Hub',
      description: 'A community for digital artists to share, learn, and support each other',
      icon: '🎨',
      members: 1243,
      totalTipped: '2,450 DOT',
      color: '#FF8C42',
      gradient: 'linear-gradient(135deg, #FF8C42 0%, #F2A541 100%)',
      isJoined: true,
      badge: 'Active'
    },
    {
      id: '2',
      name: 'Web3 Developers',
      description: 'Building the decentralized future together',
      icon: '💻',
      members: 892,
      totalTipped: '1,820 DOT',
      color: '#0E4D5F',
      gradient: 'linear-gradient(135deg, #0E4D5F 0%, #1A9BA8 100%)',
      isJoined: true
    }
  ]);

  const [discoverCommunities] = useState<Community[]>([
    {
      id: '3',
      name: 'Music Creators',
      description: 'Independent musicians supporting each other',
      icon: '🎵',
      members: 2105,
      totalTipped: '3,200 DOT',
      color: '#1A9BA8',
      gradient: 'linear-gradient(135deg, #1A9BA8 0%, #6ED1C5 100%)',
      tags: ['Music', 'Audio', 'Production'],
      isJoined: false
    },
    {
      id: '4',
      name: 'Content Creators',
      description: 'YouTubers, streamers, and video creators',
      icon: '📹',
      members: 1567,
      totalTipped: '2,100 DOT',
      color: '#6ED1C5',
      gradient: 'linear-gradient(135deg, #6ED1C5 0%, #1A9BA8 100%)',
      tags: ['Video', 'Streaming'],
      isJoined: false
    },
    {
      id: '5',
      name: 'Writers Circle',
      description: 'Authors, poets, and writers sharing their craft',
      icon: '✍️',
      members: 745,
      totalTipped: '890 DOT',
      color: '#FF686B',
      gradient: 'linear-gradient(135deg, #FF686B 0%, #FF8C42 100%)',
      tags: ['Writing', 'Books'],
      isJoined: false
    }
  ]);

  const handleJoinCommunity = (communityId: string) => {
    console.log('Joining community:', communityId);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FFF5E8] via-[#FEFCF8] to-[#E6F7F9] pb-24">
      {/* Animated Background */}
      <div className="fixed inset-0 opacity-20 pointer-events-none">
        <div className="absolute top-20 right-10 w-96 h-96 bg-gradient-to-br from-[#F2A541]/30 to-[#FF686B]/30 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 left-10 w-96 h-96 bg-gradient-to-br from-[#0E4D5F]/30 to-[#1A9BA8]/30 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
      </div>

      {/* Header */}
      <div className="relative bg-gradient-to-br from-[#0E4D5F] via-[#1A9BA8] to-[#0E4D5F] border-b border-white/10">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-white to-transparent rounded-full blur-3xl"></div>
        </div>
        
        <div className="relative container mx-auto px-4 py-6">
          <h1 className="text-3xl font-bold text-white mb-2 flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-[#FF8C42] to-[#F2A541] flex items-center justify-center shadow-lg">
              <Users className="w-6 h-6 text-white" />
            </div>
            Communities
          </h1>
          <p className="text-sm text-white/80 mb-6">Connect, collaborate, and support together</p>

          {/* Tabs */}
          <div className="flex gap-2">
            {['my', 'discover'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab as 'my' | 'discover')}
                className={`flex-1 py-3 px-4 rounded-xl font-semibold text-sm transition-all duration-300 ${
                  activeTab === tab
                    ? 'bg-white/20 backdrop-blur-sm text-white border-2 border-white/40'
                    : 'bg-white/5 text-white/70 border-2 border-white/10 hover:bg-white/10'
                }`}
              >
                {tab === 'my' ? `My Communities (${myCommunities.length})` : 'Discover'}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="relative container mx-auto px-4 py-6">
        {activeTab === 'my' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {myCommunities.map((community, index) => (
              <CommunityCard
                key={community.id}
                community={community}
                index={index}
              />
            ))}
          </div>
        ) : (
          <>
            <section className="mb-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold bg-gradient-to-r from-[#FF8C42] to-[#F2A541] bg-clip-text text-transparent flex items-center gap-2">
                  <TrendingUp className="w-6 h-6 text-[#FF686B]" />
                  Trending Communities
                </h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {discoverCommunities.slice(0, 2).map((community, index) => (
                  <TrendingCommunityCard
                    key={community.id}
                    community={community}
                    onJoin={handleJoinCommunity}
                    index={index}
                  />
                ))}
              </div>
            </section>

            <section>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold bg-gradient-to-r from-[#0E4D5F] to-[#1A9BA8] bg-clip-text text-transparent flex items-center gap-2">
                  <Sparkles className="w-6 h-6 text-[#F2A541]" />
                  All Communities
                </h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {discoverCommunities.map((community, index) => (
                  <DiscoverCommunityCard
                    key={community.id}
                    community={community}
                    onJoin={handleJoinCommunity}
                    index={index}
                  />
                ))}
              </div>
            </section>
          </>
        )}
      </div>

      {/* Create FAB */}
      <button
        onClick={() => setShowCreateModal(true)}
        className="fixed bottom-24 right-4 w-16 h-16 rounded-2xl bg-gradient-to-br from-[#FF8C42] to-[#F2A541] text-white shadow-2xl hover:shadow-3xl transition-all duration-300 flex items-center justify-center z-40 hover:scale-110 active:scale-95 group"
      >
        <Plus className="w-7 h-7 group-hover:rotate-90 transition-transform duration-300" />
      </button>

      {/* Create Modal */}
      {showCreateModal && (
        <CreateCommunityModal
          onClose={() => setShowCreateModal(false)}
          onCreate={(data) => {
            console.log('Creating:', data);
            setShowCreateModal(false);
          }}
        />
      )}

      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}

// Community Card
function CommunityCard({ community, index }: any) {
  return (
    <div
      className="group bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border-2 border-gray-100 hover:border-[#F2A541]/50 cursor-pointer hover:-translate-y-2"
      style={{
        animation: `fadeInUp 0.5s ease-out ${index * 0.1}s backwards`
      }}
    >
      <div 
        className="h-24 relative overflow-hidden"
        style={{ background: community.gradient }}
      >
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 right-0 w-32 h-32 bg-white rounded-full blur-2xl"></div>
        </div>
        {community.badge && (
          <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full">
            <span className="text-xs font-bold text-gray-900">{community.badge}</span>
          </div>
        )}
      </div>
      
      <div className="p-5 relative">
        <div 
          className="w-16 h-16 rounded-2xl flex items-center justify-center text-3xl -mt-12 mb-4 shadow-lg border-4 border-white group-hover:scale-110 transition-transform"
          style={{ background: community.gradient }}
        >
          {community.icon}
        </div>

        <h3 className="text-xl font-bold text-gray-900 mb-2">{community.name}</h3>
        <p className="text-sm text-gray-600 mb-4 line-clamp-2">{community.description}</p>

        <div className="flex gap-6 pt-4 border-t-2 border-gray-100">
          <div>
            <p className="font-bold text-gray-900">{(community.members / 1000).toFixed(1)}K</p>
            <p className="text-xs text-gray-500">Members</p>
          </div>
          <div>
            <p className="font-bold text-[#F2A541]">{community.totalTipped}</p>
            <p className="text-xs text-gray-500">Tipped</p>
          </div>
        </div>
      </div>
    </div>
  );
}

// Trending Community Card
function TrendingCommunityCard({ community, onJoin, index }: any) {
  return (
    <div
      className="group bg-white rounded-3xl p-5 shadow-lg hover:shadow-2xl transition-all duration-300 border-2 border-gray-100 hover:border-[#F2A541]/50 hover:-translate-y-2"
      style={{
        animation: `fadeInUp 0.5s ease-out ${index * 0.1}s backwards`
      }}
    >
      <div className="flex gap-4">
        <div 
          className="w-16 h-16 flex-shrink-0 rounded-2xl flex items-center justify-center text-3xl shadow-lg group-hover:scale-110 transition-transform"
          style={{ background: community.gradient }}
        >
          {community.icon}
        </div>
        
        <div className="flex-1 min-w-0">
          <h3 className="font-bold text-gray-900 mb-1">{community.name}</h3>
          <p className="text-sm text-gray-500 mb-3">{(community.members / 1000).toFixed(1)}K members</p>
          
          {community.tags && (
            <div className="flex gap-2 flex-wrap mb-3">
              {community.tags.map((tag, i) => (
                <span
                  key={i}
                  className="px-3 py-1 bg-gray-100 rounded-full text-xs font-medium text-gray-700"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>

        <button
          onClick={() => onJoin(community.id)}
          className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#FF8C42] to-[#F2A541] text-white font-semibold text-sm shadow-lg hover:shadow-xl transition-all hover:scale-105 active:scale-95"
        >
          Join
        </button>
      </div>
    </div>
  );
}

// Discover Community Card
function DiscoverCommunityCard({ community, onJoin, index }: any) {
  return (
    <div
      className="group bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border-2 border-gray-100 hover:border-[#F2A541]/50 cursor-pointer hover:-translate-y-2"
      style={{
        animation: `fadeInUp 0.5s ease-out ${index * 0.1}s backwards`
      }}
    >
      <div 
        className="h-20 relative overflow-hidden"
        style={{ background: community.gradient }}
      >
        <div className="absolute inset-0 opacity-20">
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-white rounded-full blur-2xl"></div>
        </div>
      </div>
      
      <div className="p-5 relative">
        <div 
          className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl -mt-12 mb-3 shadow-lg border-4 border-white group-hover:scale-110 transition-transform"
          style={{ background: community.gradient }}
        >
          {community.icon}
        </div>

        <h3 className="font-bold text-gray-900 mb-2">{community.name}</h3>
        <p className="text-sm text-gray-600 mb-4 line-clamp-2">{community.description}</p>

        <div className="flex gap-4 mb-4 text-sm">
          <div>
            <p className="font-bold text-gray-900">{(community.members / 1000).toFixed(1)}K</p>
            <p className="text-xs text-gray-500">Members</p>
          </div>
          <div>
            <p className="font-bold text-[#F2A541]">{community.totalTipped}</p>
            <p className="text-xs text-gray-500">Tipped</p>
          </div>
        </div>

        <button
          onClick={(e) => {
            e.stopPropagation();
            onJoin(community.id);
          }}
          className="w-full py-2.5 rounded-xl bg-gradient-to-r from-[#FF8C42] to-[#F2A541] text-white font-semibold text-sm shadow-lg hover:shadow-xl transition-all hover:scale-105 active:scale-95"
        >
          Join Community
        </button>
      </div>
    </div>
  );
}

// Create Modal
function CreateCommunityModal({ onClose, onCreate }: any) {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    icon: '🔥'
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white rounded-3xl max-w-md w-full shadow-2xl animate-scaleIn">
        <div className="p-6 border-b border-gray-100">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold bg-gradient-to-r from-[#0E4D5F] to-[#1A9BA8] bg-clip-text text-transparent">
              Create Community
            </h2>
            <button
              onClick={onClose}
              className="w-10 h-10 rounded-xl bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-all active:scale-95"
            >
              <X className="w-5 h-5 text-gray-600" />
            </button>
          </div>
        </div>

        <div className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Community Name</label>
            <input
              type="text"
              placeholder="e.g. Digital Artists Hub"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-100 rounded-xl focus:border-[#F2A541] focus:ring-4 focus:ring-[#F2A541]/10 outline-none transition-all"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Description</label>
            <textarea
              placeholder="Describe your community..."
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-100 rounded-xl focus:border-[#F2A541] focus:ring-4 focus:ring-[#F2A541]/10 outline-none transition-all resize-none h-24"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Icon Emoji</label>
            <input
              type="text"
              placeholder="🔥"
              value={formData.icon}
              onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
              maxLength={2}
              className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-100 rounded-xl focus:border-[#F2A541] focus:ring-4 focus:ring-[#F2A541]/10 outline-none transition-all text-center text-3xl"
            />
          </div>

          <button
            onClick={() => onCreate(formData)}
            disabled={!formData.name.trim() || !formData.description.trim()}
            className="w-full py-4 rounded-xl bg-gradient-to-r from-[#FF8C42] to-[#F2A541] text-white font-bold shadow-lg hover:shadow-xl transition-all hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
          >
            Create Community
          </button>
        </div>
      </div>
    </div>
  );
}