// File: src/components/Profile/CreatorProfile.tsx
// Creator/Community profile page - "Their Village Compound"
// Shows creator info, posts, events, perks, members, and wallet

import React, { useState } from 'react';
import { 
  Flame, Users, Calendar, Gift, Wallet, 
  Share2, MoreHorizontal, Check, ExternalLink,
  Twitter, Globe, Sparkles, Award
} from 'lucide-react';

// ============================================================================
// TYPE DEFINITIONS
// ============================================================================

interface Creator {
  address: string;
  username: string;
  displayName: string;
  avatar: string;
  bio: string;
  badge?: string;
  verified: boolean;
  
  // Social
  twitter?: string;
  website?: string;
  
  // Stats
  followersCount: number;
  membersCount: number;
  tipsReceived: string;
  supportersCount: number;
  
  // Circle info (if applicable)
  isCircle: boolean;
  circleDescription?: string;
}

// ============================================================================
// CREATOR PROFILE COMPONENT
// ============================================================================

const CreatorProfile: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'posts' | 'events' | 'perks' | 'members'>('posts');
  const [isFollowing, setIsFollowing] = useState(false);
  const [isMember, setIsMember] = useState(false);
  const [showTipModal, setShowTipModal] = useState(false);

  // Mock creator data
  const creator: Creator = {
    address: '5FHneW46...',
    username: 'adewale',
    displayName: 'Adewale Ojo',
    avatar: '👨🏿‍💻',
    bio: 'Web3 Developer & Educator | Building the future of decentralized tech in Africa | Passionate about blockchain education',
    badge: 'Griot',
    verified: true,
    twitter: '@adewale_dev',
    website: 'adewale.dev',
    followersCount: 2847,
    membersCount: 156,
    tipsReceived: '234.5',
    supportersCount: 89,
    isCircle: false
  };

  // ============================================================================
  // SUB-COMPONENTS
  // ============================================================================

  // Profile header
  const ProfileHeader = () => (
    <div className="relative">
      {/* Cover/Banner with animated pattern */}
      <div className="h-48 rounded-t-3xl overflow-hidden relative">
        <div className="absolute inset-0 bg-gradient-to-br from-amber-500 to-orange-600" />
        <svg className="absolute inset-0 w-full h-full opacity-20" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="banner-pattern" x="0" y="0" width="60" height="60" patternUnits="userSpaceOnUse">
              <circle cx="30" cy="30" r="2" fill="white" className="animate-pulse" />
              <circle cx="15" cy="15" r="1.5" fill="white" className="animate-pulse" style={{ animationDelay: '0.5s' }} />
              <circle cx="45" cy="15" r="1.5" fill="white" className="animate-pulse" style={{ animationDelay: '1s' }} />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#banner-pattern)" />
        </svg>
      </div>

      {/* Profile info overlay */}
      <div className="px-6 pb-6">
        {/* Avatar with glow ring */}
        <div className="relative -mt-16 mb-4">
          <div className="w-32 h-32 rounded-full bg-gradient-to-br from-purple-400 to-pink-500 border-4 border-stone-900 flex items-center justify-center text-6xl relative shadow-2xl">
            {creator.avatar}
            {creator.verified && (
              <div className="absolute -bottom-2 -right-2 w-10 h-10 rounded-full bg-amber-500 border-4 border-stone-900 flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
            )}
          </div>
        </div>

        {/* Name and badge */}
        <div className="mb-4">
          <div className="flex items-center gap-3 mb-2">
            <h1 className="text-3xl font-bold text-white">{creator.displayName}</h1>
            {creator.badge && (
              <span className="px-3 py-1 rounded-full bg-amber-500/20 text-amber-400 text-sm font-semibold border border-amber-500/40 flex items-center gap-1">
                <Award className="w-4 h-4" />
                {creator.badge}
              </span>
            )}
          </div>
          <p className="text-gray-400">@{creator.username}</p>
        </div>

        {/* Bio */}
        <p className="text-gray-200 mb-4 leading-relaxed">{creator.bio}</p>

        {/* Social links */}
        {(creator.twitter || creator.website) && (
          <div className="flex gap-3 mb-6">
            {creator.twitter && (
              <a 
                href={`https://twitter.com/${creator.twitter.replace('@', '')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 text-gray-300 transition-all"
              >
                <Twitter className="w-4 h-4" />
                <span className="text-sm">{creator.twitter}</span>
              </a>
            )}
            {creator.website && (
              <a 
                href={`https://${creator.website}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 text-gray-300 transition-all"
              >
                <Globe className="w-4 h-4" />
                <span className="text-sm">{creator.website}</span>
              </a>
            )}
          </div>
        )}

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="text-center p-4 rounded-xl bg-white/5 border border-white/10">
            <div className="text-2xl font-bold text-white mb-1">{creator.followersCount.toLocaleString()}</div>
            <div className="text-xs text-gray-400">Followers</div>
          </div>
          <div className="text-center p-4 rounded-xl bg-white/5 border border-white/10">
            <div className="text-2xl font-bold text-amber-400 mb-1">{creator.tipsReceived}</div>
            <div className="text-xs text-gray-400">DOT Received</div>
          </div>
          <div className="text-center p-4 rounded-xl bg-white/5 border border-white/10">
            <div className="text-2xl font-bold text-white mb-1">{creator.supportersCount}</div>
            <div className="text-xs text-gray-400">Supporters</div>
          </div>
        </div>

        {/* Action buttons */}
        <div className="flex gap-3">
          <button
            onClick={() => setShowTipModal(true)}
            className="flex-1 py-4 rounded-xl bg-gradient-to-r from-amber-500 to-orange-600 text-white font-bold hover:from-amber-600 hover:to-orange-700 transition-all shadow-lg flex items-center justify-center gap-2"
          >
            <Flame className="w-5 h-5" />
            Send Ekene
          </button>
          
          <button
            onClick={() => setIsFollowing(!isFollowing)}
            className={`flex-1 py-4 rounded-xl font-bold transition-all flex items-center justify-center gap-2 ${
              isFollowing
                ? 'bg-white/10 text-white border border-white/20'
                : 'bg-white text-stone-900 hover:bg-gray-100'
            }`}
          >
            {isFollowing ? (
              <>
                <Check className="w-5 h-5" />
                Following
              </>
            ) : (
              'Follow'
            )}
          </button>
          
          <button className="px-4 py-4 rounded-xl bg-white/10 hover:bg-white/20 transition-all">
            <Share2 className="w-5 h-5 text-white" />
          </button>
          
          <button className="px-4 py-4 rounded-xl bg-white/10 hover:bg-white/20 transition-all">
            <MoreHorizontal className="w-5 h-5 text-white" />
          </button>
        </div>
      </div>
    </div>
  );

  // Tabs navigation
  const TabsNav = () => (
    <div className="flex gap-2 p-1 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 mb-6">
      {[
        { id: 'posts', label: 'Posts', icon: null },
        { id: 'events', label: 'Events', icon: Calendar },
        { id: 'perks', label: 'Perks', icon: Gift },
        { id: 'members', label: 'Members', icon: Users }
      ].map((tab) => (
        <button
          key={tab.id}
          onClick={() => setActiveTab(tab.id as any)}
          className={`flex-1 px-4 py-3 rounded-lg font-medium text-sm transition-all flex items-center justify-center gap-2 ${
            activeTab === tab.id
              ? 'bg-gradient-to-r from-amber-500 to-orange-600 text-white'
              : 'text-gray-400 hover:text-white'
          }`}
        >
          {tab.icon && <tab.icon className="w-4 h-4" />}
          {tab.label}
        </button>
      ))}
    </div>
  );

  // Posts tab content
  const PostsContent = () => (
    <div className="space-y-4">
      {[1, 2, 3].map((i) => (
        <div key={i} className="rounded-2xl p-6 bg-white/5 backdrop-blur-sm border border-white/10 hover:border-amber-500/30 transition-all">
          <p className="text-gray-200 mb-4">
            Just wrapped up an amazing workshop on Polkadot development! So grateful for everyone who attended. The energy in the room was incredible! 🚀
          </p>
          <div className="flex items-center gap-4 text-sm text-gray-400">
            <span>2 hours ago</span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <Flame className="w-4 h-4 text-amber-400" />
              5.5 DOT received
            </span>
          </div>
        </div>
      ))}
    </div>
  );

  // Events tab content
  const EventsContent = () => (
    <div className="space-y-4">
      {[
        { title: 'Web3 Workshop', date: 'Dec 15, 2024', attendees: 45 },
        { title: 'Polkadot Deep Dive', date: 'Dec 22, 2024', attendees: 32 }
      ].map((event, i) => (
        <div key={i} className="rounded-2xl p-6 bg-white/5 backdrop-blur-sm border border-white/10 hover:border-amber-500/30 transition-all">
          <div className="flex items-start justify-between mb-3">
            <div>
              <h3 className="text-white font-semibold mb-1">{event.title}</h3>
              <p className="text-gray-400 text-sm">{event.date}</p>
            </div>
            <button className="px-4 py-2 rounded-lg bg-amber-500/20 text-amber-400 text-sm font-semibold border border-amber-500/30">
              Register
            </button>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-400">
            <Users className="w-4 h-4" />
            <span>{event.attendees} registered</span>
          </div>
        </div>
      ))}
    </div>
  );

  // Perks tab content
  const PerksContent = () => (
    <div className="space-y-4">
      {[
        { title: 'Early Access', description: 'Get early access to all workshops', price: '5 DOT' },
        { title: 'Exclusive Content', description: 'Access to premium tutorials', price: '10 DOT' },
        { title: 'Mentorship', description: '1-on-1 mentorship sessions', price: '25 DOT' }
      ].map((perk, i) => (
        <div key={i} className="rounded-2xl p-6 bg-white/5 backdrop-blur-sm border border-white/10 hover:border-amber-500/30 transition-all">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <h3 className="text-white font-semibold mb-2">{perk.title}</h3>
              <p className="text-gray-400 text-sm mb-3">{perk.description}</p>
              <div className="text-amber-400 font-bold">{perk.price}</div>
            </div>
            <button className="px-6 py-2 rounded-lg bg-gradient-to-r from-amber-500 to-orange-600 text-white font-semibold hover:from-amber-600 hover:to-orange-700 transition-all">
              Unlock
            </button>
          </div>
        </div>
      ))}
    </div>
  );

  // Members tab content
  const MembersContent = () => (
    <div className="space-y-3">
      {[
        { name: 'Chioma', avatar: '👩🏿', tips: '12.5' },
        { name: 'Tunde', avatar: '👨🏿‍💼', tips: '8.3' },
        { name: 'Amara', avatar: '👩🏿‍🎨', tips: '15.7' }
      ].map((member, i) => (
        <div key={i} className="rounded-xl p-4 bg-white/5 backdrop-blur-sm border border-white/10 hover:border-amber-500/30 transition-all">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-400 to-pink-500 flex items-center justify-center text-xl">
                {member.avatar}
              </div>
              <div>
                <div className="text-white font-semibold">{member.name}</div>
                <div className="text-gray-400 text-sm">Top Supporter</div>
              </div>
            </div>
            <div className="text-right">
              <div className="text-amber-400 font-bold">{member.tips} DOT</div>
              <div className="text-gray-400 text-xs">contributed</div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  // ============================================================================
  // MAIN RENDER
  // ============================================================================

  return (
    <div className="min-h-screen bg-gradient-to-br from-stone-900 via-amber-950 to-stone-900 pb-8">
      <div className="max-w-4xl mx-auto">
        {/* Profile card */}
        <div className="rounded-3xl bg-white/5 backdrop-blur-sm border border-white/10 overflow-hidden mb-6">
          <ProfileHeader />
        </div>

        {/* Tabs and content */}
        <div className="px-4 sm:px-0">
          <TabsNav />
          
          {activeTab === 'posts' && <PostsContent />}
          {activeTab === 'events' && <EventsContent />}
          {activeTab === 'perks' && <PerksContent />}
          {activeTab === 'members' && <MembersContent />}
        </div>
      </div>
    </div>
  );
};

export default CreatorProfile;