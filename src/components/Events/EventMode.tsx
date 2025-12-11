// File: src/components/Events/EventMode.tsx
// Live event experience with QR scanning, speaker tipping, and networking
// Includes attendance badges, live feed, and warmth tracking

import React, { useState, useEffect } from 'react';
import { 
  Flame, QrCode, Users, Calendar, MapPin, Award, 
  Sparkles, TrendingUp, Share2, Zap, Clock
} from 'lucide-react';

// ============================================================================
// TYPE DEFINITIONS
// ============================================================================

interface Event {
  id: string;
  title: string;
  description: string;
  venue: string;
  date: Date;
  bannerUrl: string;
  
  hosts: Speaker[];
  currentSession?: Session;
  upcomingSessions: Session[];
  
  stats: {
    attendees: number;
    totalTips: string;
    warmthPool: number;
  };
}

interface Speaker {
  address: string;
  name: string;
  role: string;
  avatar: string;
  bio: string;
  tipsReceived: string;
  supportersCount: number;
}

interface Session {
  id: string;
  title: string;
  speaker: Speaker;
  startTime: Date;
  endTime: Date;
  isLive: boolean;
}

interface LiveTip {
  from: string;
  to: string;
  toName: string;
  amount: string;
  timestamp: Date;
}

// ============================================================================
// EVENT MODE COMPONENT
// ============================================================================

const EventMode: React.FC = () => {
  const [event, setEvent] = useState<Event | null>(null);
  const [activeTab, setActiveTab] = useState<'feed' | 'speakers' | 'agenda' | 'badge'>('feed');
  const [liveFeed, setLiveFeed] = useState<LiveTip[]>([]);
  const [warmthEarned, setWarmthEarned] = useState(8);

  useEffect(() => {
    loadEvent();
    startLiveFeed();
  }, []);

  const loadEvent = () => {
    // Mock event data
    setEvent({
      id: '1',
      title: 'Lagos Blockchain Festival 2024',
      description: 'Join us for a day of learning, networking, and building the future of Web3 in Africa',
      venue: 'Innovation Hub Lagos',
      date: new Date('2024-12-15T14:00:00'),
      bannerUrl: 'https://via.placeholder.com/800x300',
      hosts: [
        {
          address: '5FHne...',
          name: 'Adewale Ojo',
          role: 'Keynote Speaker',
          avatar: '👨🏿‍💻',
          bio: 'Web3 Developer & Educator',
          tipsReceived: '45.5',
          supportersCount: 23
        },
        {
          address: '5Grwv...',
          name: 'Chioma Nwankwo',
          role: 'Workshop Leader',
          avatar: '👩🏿‍🎨',
          bio: 'NFT Artist & Creator',
          tipsReceived: '32.8',
          supportersCount: 18
        },
        {
          address: '5Dxz2...',
          name: 'Tunde Bakare',
          role: 'Panelist',
          avatar: '👨🏿‍💼',
          bio: 'Blockchain Investor',
          tipsReceived: '28.3',
          supportersCount: 15
        }
      ],
      currentSession: {
        id: '1',
        title: 'Building the Future of DeFi in Africa',
        speaker: {
          address: '5FHne...',
          name: 'Adewale Ojo',
          role: 'Keynote Speaker',
          avatar: '👨🏿‍💻',
          bio: 'Web3 Developer & Educator',
          tipsReceived: '45.5',
          supportersCount: 23
        },
        startTime: new Date(Date.now() - 15 * 60 * 1000),
        endTime: new Date(Date.now() + 30 * 60 * 1000),
        isLive: true
      },
      upcomingSessions: [],
      stats: {
        attendees: 156,
        totalTips: '234.8',
        warmthPool: 1240
      }
    });
  };

  const startLiveFeed = () => {
    // Simulate live feed updates
    const interval = setInterval(() => {
      const newTip: LiveTip = {
        from: 'Anonymous',
        to: '5FHne...',
        toName: 'Adewale',
        amount: (Math.random() * 5).toFixed(2),
        timestamp: new Date()
      };
      
      setLiveFeed(prev => [newTip, ...prev].slice(0, 20));
    }, 5000);

    return () => clearInterval(interval);
  };

  // ============================================================================
  // SUB-COMPONENTS
  // ============================================================================

  // Event hero banner
  const EventHero = () => {
    if (!event) return null;

    return (
      <div className="relative overflow-hidden rounded-3xl mb-6">
        {/* Animated background */}
        <div className="absolute inset-0 bg-gradient-to-br from-amber-500 to-orange-600" />
        <svg className="absolute inset-0 w-full h-full opacity-20" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="event-pattern" x="0" y="0" width="80" height="80" patternUnits="userSpaceOnUse">
              <circle cx="40" cy="40" r="3" fill="white" className="animate-pulse" />
              <circle cx="20" cy="20" r="2" fill="white" className="animate-pulse" style={{ animationDelay: '0.5s' }} />
              <circle cx="60" cy="20" r="2" fill="white" className="animate-pulse" style={{ animationDelay: '1s' }} />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#event-pattern)" />
        </svg>

        {/* Content */}
        <div className="relative z-10 p-8">
          {/* Live indicator */}
          <div className="flex items-center gap-2 mb-4">
            <div className="px-4 py-2 rounded-full bg-red-500 text-white text-sm font-bold flex items-center gap-2 animate-pulse">
              <div className="w-2 h-2 rounded-full bg-white" />
              LIVE NOW
            </div>
            <div className="px-4 py-2 rounded-full bg-white/20 backdrop-blur-sm text-white text-sm font-semibold">
              {event.stats.attendees} Attendees
            </div>
          </div>

          {/* Event info */}
          <h1 className="text-4xl font-bold text-white mb-4">{event.title}</h1>
          <div className="flex flex-wrap gap-4 text-white/90 mb-6">
            <div className="flex items-center gap-2">
              <Calendar className="w-5 h-5" />
              <span>Dec 15, 2024</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5" />
              <span>2:00 PM - 8:00 PM</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="w-5 h-5" />
              <span>{event.venue}</span>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
              <div className="text-2xl font-bold text-white mb-1">{event.stats.totalTips}</div>
              <div className="text-white/70 text-sm">DOT Shared</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
              <div className="text-2xl font-bold text-white mb-1">{event.stats.warmthPool}</div>
              <div className="text-white/70 text-sm">Warmth Pool</div>
            </div>
            <div className="bg-purple-500/30 backdrop-blur-sm rounded-xl p-4 border border-purple-400/50">
              <div className="text-2xl font-bold text-white mb-1">{warmthEarned}</div>
              <div className="text-white/70 text-sm flex items-center gap-1">
                <Sparkles className="w-4 h-4" />
                You Earned
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Current session card
  const CurrentSession = () => {
    if (!event?.currentSession) return null;

    const session = event.currentSession;
    const progress = 35; // Mock progress

    return (
      <div className="rounded-2xl p-6 bg-gradient-to-br from-purple-900/30 to-pink-900/30 border border-purple-500/30 mb-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <div className="text-purple-400 text-sm font-semibold mb-2 flex items-center gap-2">
              <Zap className="w-4 h-4" />
              NOW SPEAKING
            </div>
            <h3 className="text-xl font-bold text-white mb-2">{session.title}</h3>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-400 to-orange-600 flex items-center justify-center text-xl">
                {session.speaker.avatar}
              </div>
              <div>
                <div className="text-white font-semibold">{session.speaker.name}</div>
                <div className="text-gray-400 text-sm">{session.speaker.role}</div>
              </div>
            </div>
          </div>
          
          <button className="px-6 py-3 rounded-xl bg-gradient-to-r from-amber-500 to-orange-600 text-white font-bold hover:from-amber-600 hover:to-orange-700 transition-all shadow-lg flex items-center gap-2">
            <Flame className="w-5 h-5" />
            Tip Speaker
          </button>
        </div>

        {/* Progress bar */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm text-gray-400">
            <span>Session Progress</span>
            <span>{progress}%</span>
          </div>
          <div className="h-2 bg-white/10 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-purple-500 to-pink-500 transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </div>
    );
  };

  // Tabs navigation
  const TabsNav = () => (
    <div className="flex gap-2 p-1 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 mb-6">
      {[
        { id: 'feed', label: 'Live Feed', icon: TrendingUp },
        { id: 'speakers', label: 'Speakers', icon: Users },
        { id: 'agenda', label: 'Agenda', icon: Calendar },
        { id: 'badge', label: 'My Badge', icon: Award }
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
          <tab.icon className="w-4 h-4" />
          {tab.label}
        </button>
      ))}
    </div>
  );

  // Live feed content
  const LiveFeedContent = () => (
    <div className="space-y-3">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-white font-semibold">Live Gratitude Stream</h3>
        <div className="flex items-center gap-2 text-amber-400 text-sm">
          <div className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
          Live
        </div>
      </div>

      {liveFeed.map((tip, i) => (
        <div key={i} className="rounded-xl p-4 bg-white/5 border border-white/10 flex items-center justify-between animate-fadeIn">
          <div className="flex items-center gap-3">
            <Flame className="w-5 h-5 text-amber-400" />
            <div>
              <div className="text-white text-sm">
                <span className="font-semibold">{tip.from}</span>
                <span className="text-gray-400"> sent Ekene to </span>
                <span className="font-semibold">{tip.toName}</span>
              </div>
              <div className="text-gray-400 text-xs">
                {new Date(tip.timestamp).toLocaleTimeString()}
              </div>
            </div>
          </div>
          <div className="text-amber-400 font-bold">{tip.amount} DOT</div>
        </div>
      ))}
    </div>
  );

  // Speakers content
  const SpeakersContent = () => (
    <div className="space-y-4">
      {event?.hosts.map((speaker) => (
        <div key={speaker.address} className="rounded-2xl p-6 bg-white/5 border border-white/10 hover:border-amber-500/30 transition-all">
          <div className="flex items-start gap-4 mb-4">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-purple-400 to-pink-500 flex items-center justify-center text-2xl">
              {speaker.avatar}
            </div>
            <div className="flex-1">
              <h4 className="text-white font-bold text-lg mb-1">{speaker.name}</h4>
              <p className="text-amber-400 text-sm mb-2">{speaker.role}</p>
              <p className="text-gray-300 text-sm">{speaker.bio}</p>
            </div>
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-white/10">
            <div className="flex gap-4 text-sm">
              <div>
                <div className="text-amber-400 font-bold">{speaker.tipsReceived} DOT</div>
                <div className="text-gray-400">Received</div>
              </div>
              <div>
                <div className="text-white font-bold">{speaker.supportersCount}</div>
                <div className="text-gray-400">Supporters</div>
              </div>
            </div>
            
            <button className="px-6 py-2 rounded-lg bg-gradient-to-r from-amber-500 to-orange-600 text-white font-semibold hover:from-amber-600 hover:to-orange-700 transition-all flex items-center gap-2">
              <Flame className="w-4 h-4" />
              Tip
            </button>
          </div>
        </div>
      ))}
    </div>
  );

  // My badge content
  const BadgeContent = () => (
    <div className="text-center space-y-6">
      <div className="rounded-3xl p-8 bg-gradient-to-br from-amber-500/20 to-orange-600/20 border-2 border-amber-500/30">
        <div className="w-32 h-32 mx-auto rounded-full bg-gradient-to-br from-amber-400 to-orange-600 flex items-center justify-center text-6xl mb-4 shadow-2xl">
          🎖️
        </div>
        <h3 className="text-2xl font-bold text-white mb-2">Event Attendance</h3>
        <p className="text-amber-200">Lagos Blockchain Festival 2024</p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="rounded-xl p-4 bg-white/5 border border-white/10">
          <div className="text-2xl font-bold text-white mb-1">{warmthEarned}</div>
          <div className="text-gray-400 text-sm">Warmth Earned</div>
        </div>
        <div className="rounded-xl p-4 bg-white/5 border border-white/10">
          <div className="text-2xl font-bold text-amber-400 mb-1">3</div>
          <div className="text-gray-400 text-sm">Sessions Attended</div>
        </div>
      </div>

      <button className="w-full py-4 rounded-xl bg-gradient-to-r from-purple-500 to-pink-600 text-white font-bold hover:from-purple-600 hover:to-pink-700 transition-all flex items-center justify-center gap-2">
        <Share2 className="w-5 h-5" />
        Share My Badge
      </button>
    </div>
  );

  // ============================================================================
  // MAIN RENDER
  // ============================================================================

  if (!event) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-stone-900 via-amber-950 to-stone-900 flex items-center justify-center">
        <div className="text-white">Loading event...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-stone-900 via-amber-950 to-stone-900 pb-8">
      <div className="max-w-4xl mx-auto p-4 sm:p-6">
        <EventHero />
        <CurrentSession />
        <TabsNav />
        
        {activeTab === 'feed' && <LiveFeedContent />}
        {activeTab === 'speakers' && <SpeakersContent />}
        {activeTab === 'badge' && <BadgeContent />}
      </div>
    </div>
  );
};

export default EventMode;