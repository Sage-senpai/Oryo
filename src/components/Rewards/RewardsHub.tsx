// File: src/components/Rewards/RewardsHub.tsx


import React, { useState, useEffect } from 'react';
import { 
  Sparkles, Flame, TrendingUp, Award, Gift, 
  Zap, Target, Clock, CheckCircle, Star
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

interface WarmthBalance {
  total: number;
  claimable: number;
  lifetime: number;
}

interface DailyReward {
  day: number;
  warmth: number;
  claimed: boolean;
  bonus?: boolean;
}

interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  warmth: number;
  progress: number;
  target: number;
  completed: boolean;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
}

interface Claimable {
  id: string;
  type: 'daily' | 'achievement' | 'event' | 'referral';
  title: string;
  warmth: number;
  expiresAt?: Date;
}

// ============================================================================
// REWARDS HUB COMPONENT
// ============================================================================

const RewardsHub: React.FC = () => {
  const [warmth, setWarmth] = useState<WarmthBalance>({
    total: 245,
    claimable: 45,
    lifetime: 1240
  });
  const [currentStreak, setCurrentStreak] = useState(7);
  const [dailyRewards, setDailyRewards] = useState<DailyReward[]>([]);
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [claimables, setClaimables] = useState<Claimable[]>([]);
  const [selectedTab, setSelectedTab] = useState<'daily' | 'achievements' | 'leaderboard'>('daily');

  useEffect(() => {
    loadRewardsData();
  }, []);

  const loadRewardsData = () => {
    setDailyRewards([
      { day: 1, warmth: 5, claimed: true },
      { day: 2, warmth: 5, claimed: true },
      { day: 3, warmth: 10, claimed: true, bonus: true },
      { day: 4, warmth: 5, claimed: true },
      { day: 5, warmth: 5, claimed: true },
      { day: 6, warmth: 10, claimed: true, bonus: true },
      { day: 7, warmth: 20, claimed: false, bonus: true }
    ]);

    setAchievements([
      {
        id: '1',
        title: 'First Ekene',
        description: 'Send your first tip',
        icon: '🔥',
        warmth: 10,
        progress: 1,
        target: 1,
        completed: true,
        rarity: 'common'
      },
      {
        id: '2',
        title: 'Generous Giver',
        description: 'Send 50 tips',
        icon: '💝',
        warmth: 50,
        progress: 23,
        target: 50,
        completed: false,
        rarity: 'rare'
      },
      {
        id: '3',
        title: 'Community Builder',
        description: 'Join 10 circles',
        icon: '🏘️',
        warmth: 30,
        progress: 5,
        target: 10,
        completed: false,
        rarity: 'rare'
      },
      {
        id: '4',
        title: 'Village Elder',
        description: 'Reach 1000 warmth',
        icon: '👑',
        warmth: 100,
        progress: 245,
        target: 1000,
        completed: false,
        rarity: 'epic'
      },
      {
        id: '5',
        title: 'Event Host',
        description: 'Host your first event',
        icon: '🎪',
        warmth: 75,
        progress: 0,
        target: 1,
        completed: false,
        rarity: 'epic'
      }
    ]);

    setClaimables([
      {
        id: '1',
        type: 'daily',
        title: 'Daily Login Bonus',
        warmth: 20,
        expiresAt: new Date(Date.now() + 6 * 60 * 60 * 1000)
      },
      {
        id: '2',
        type: 'achievement',
        title: 'First Ekene Achievement',
        warmth: 10
      },
      {
        id: '3',
        type: 'event',
        title: 'Lagos Blockchain Festival Attendance',
        warmth: 15,
        expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000)
      }
    ]);
  };

  const claimReward = (claimableId: string) => {
    const claimable = claimables.find(c => c.id === claimableId);
    if (!claimable) return;

    setWarmth(prev => ({
      ...prev,
      total: prev.total + claimable.warmth,
      claimable: prev.claimable - claimable.warmth
    }));

    setClaimables(prev => prev.filter(c => c.id !== claimableId));
  };

  const claimAllRewards = () => {
    const totalWarmth = claimables.reduce((sum, c) => sum + c.warmth, 0);
    
    setWarmth(prev => ({
      ...prev,
      total: prev.total + totalWarmth,
      claimable: 0
    }));

    setClaimables([]);
  };

  // ============================================================================
  // SUB-COMPONENTS
  // ============================================================================

  // Warmth balance header
  const WarmthHeader = () => (
    <div className="relative overflow-hidden rounded-3xl p-8 mb-6"
         style={{ 
           background: `linear-gradient(135deg, ${COLORS.sunriseGold}30 0%, ${COLORS.terracottaClay}20 100%)`,
           border: `2px solid ${COLORS.ochreYellow}50`
         }}>
      {/* Animated background pattern */}
      <div className="absolute inset-0 opacity-10">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="warmth-pattern" x="0" y="0" width="60" height="60" patternUnits="userSpaceOnUse">
              <circle cx="30" cy="30" r="2" fill={COLORS.ochreYellow} className="animate-pulse" />
              <circle cx="15" cy="15" r="1.5" fill={COLORS.sunriseGold} className="animate-pulse" style={{ animationDelay: '0.5s' }} />
              <circle cx="45" cy="15" r="1.5" fill={COLORS.terracottaClay} className="animate-pulse" style={{ animationDelay: '1s' }} />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#warmth-pattern)" />
        </svg>
      </div>

      <div className="relative z-10">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-16 h-16 rounded-full flex items-center justify-center shadow-lg"
                 style={{ background: `linear-gradient(135deg, ${COLORS.sunriseGold} 0%, ${COLORS.ochreYellow} 100%)` }}>
              <Sparkles className="w-8 h-8 text-white" />
            </div>
            <div>
              <h2 style={{ color: COLORS.warmWhite }} className="text-xl font-bold">Your Warmth</h2>
              <p style={{ color: COLORS.warmSand }} className="text-sm">Community energy points</p>
            </div>
          </div>

          {currentStreak > 0 && (
            <div className="text-center">
              <div className="flex items-center gap-2 px-4 py-2 rounded-full"
                   style={{ 
                     backgroundColor: `${COLORS.terracottaClay}30`,
                     border: `1px solid ${COLORS.terracottaClay}`
                   }}>
                <Flame className="w-5 h-5" style={{ color: COLORS.terracottaClay }} />
                <div>
                  <div className="text-2xl font-bold" style={{ color: COLORS.warmWhite }}>{currentStreak}</div>
                  <div className="text-xs" style={{ color: COLORS.warmSand }}>Day Streak</div>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="text-center p-4 rounded-xl backdrop-blur-sm"
               style={{ backgroundColor: `${COLORS.warmSand}15` }}>
            <div className="text-3xl font-bold mb-1" style={{ color: COLORS.warmWhite }}>{warmth.total}</div>
            <div className="text-sm" style={{ color: COLORS.warmSand }}>Current</div>
          </div>
          <div className="text-center p-4 rounded-xl"
               style={{ 
                 background: `linear-gradient(135deg, ${COLORS.ochreYellow}30 0%, ${COLORS.sunriseGold}20 100%)`,
                 border: `1px solid ${COLORS.sunriseGold}50`
               }}>
            <div className="text-3xl font-bold mb-1" style={{ color: COLORS.sunriseGold }}>{warmth.claimable}</div>
            <div className="text-sm" style={{ color: COLORS.warmSand }}>Claimable</div>
          </div>
          <div className="text-center p-4 rounded-xl backdrop-blur-sm"
               style={{ backgroundColor: `${COLORS.warmSand}15` }}>
            <div className="text-3xl font-bold mb-1" style={{ color: COLORS.warmWhite }}>{warmth.lifetime}</div>
            <div className="text-sm" style={{ color: COLORS.warmSand }}>Lifetime</div>
          </div>
        </div>

        {warmth.claimable > 0 && (
          <button
            onClick={claimAllRewards}
            className="w-full py-4 rounded-xl text-white font-bold transition-all shadow-lg flex items-center justify-center gap-2"
            style={{ background: `linear-gradient(135deg, ${COLORS.sunriseGold} 0%, ${COLORS.terracottaClay} 100%)` }}
          >
            <Gift className="w-5 h-5" />
            Claim All ({warmth.claimable} Warmth)
          </button>
        )}
      </div>
    </div>
  );

  // Tabs navigation
  const TabsNav = () => (
    <div className="flex gap-2 p-1 rounded-xl backdrop-blur-sm mb-6"
         style={{ 
           backgroundColor: `${COLORS.warmSand}08`,
           border: `1px solid ${COLORS.warmSand}20`
         }}>
      {[
        { id: 'daily', label: 'Daily', icon: Clock },
        { id: 'achievements', label: 'Achievements', icon: Award },
        { id: 'leaderboard', label: 'Leaderboard', icon: TrendingUp }
      ].map((tab) => (
        <button
          key={tab.id}
          onClick={() => setSelectedTab(tab.id as any)}
          className="flex-1 px-4 py-3 rounded-lg font-medium text-sm transition-all flex items-center justify-center gap-2"
          style={selectedTab === tab.id ? {
            background: `linear-gradient(135deg, ${COLORS.sunriseGold} 0%, ${COLORS.terracottaClay} 100%)`,
            color: COLORS.white
          } : {
            color: COLORS.warmSand
          }}
        >
          <tab.icon className="w-4 h-4" />
          {tab.label}
        </button>
      ))}
    </div>
  );

  // Daily rewards content
  const DailyRewardsContent = () => (
    <div className="space-y-6">
      <div className="rounded-2xl p-6 backdrop-blur-sm"
           style={{ 
             backgroundColor: `${COLORS.warmSand}08`,
             border: `1px solid ${COLORS.warmSand}20`
           }}>
        <h3 style={{ color: COLORS.warmWhite }} className="font-bold text-lg mb-4 flex items-center gap-2">
          <Flame className="w-5 h-5" style={{ color: COLORS.terracottaClay }} />
          Daily Login Streak
        </h3>
        <p style={{ color: COLORS.warmSand }} className="text-sm mb-6">
          Log in every day to claim rewards and build your streak. Day 7 gives a bonus!
        </p>

        <div className="grid grid-cols-7 gap-2 mb-4">
          {dailyRewards.map((reward) => (
            <div
              key={reward.day}
              className="aspect-square rounded-xl flex flex-col items-center justify-center transition-all"
              style={reward.claimed ? {
                backgroundColor: `${COLORS.palmGreen}30`,
                border: `2px solid ${COLORS.palmGreen}`
              } : reward.day === currentStreak + 1 ? {
                background: `linear-gradient(135deg, ${COLORS.sunriseGold}40 0%, ${COLORS.terracottaClay}30 100%)`,
                border: `2px solid ${COLORS.sunriseGold}`
              } : {
                backgroundColor: `${COLORS.warmSand}10`,
                border: `2px solid ${COLORS.warmSand}20`
              }}
            >
              {reward.claimed ? (
                <CheckCircle className="w-6 h-6 mb-1" style={{ color: COLORS.palmGreen }} />
              ) : (
                <Gift className="w-6 h-6 mb-1" style={{ color: COLORS.warmWhite }} />
              )}
              <div className="text-xs font-bold" style={{ color: COLORS.warmWhite }}>Day {reward.day}</div>
              <div className="text-xs font-bold" style={{ color: COLORS.sunriseGold }}>+{reward.warmth}</div>
            </div>
          ))}
        </div>

        <div className="text-center text-sm" style={{ color: COLORS.warmSand }}>
          Come back tomorrow to continue your streak! 🔥
        </div>
      </div>

      {/* Claimable rewards */}
      {claimables.length > 0 && (
        <div className="space-y-3">
          <h3 style={{ color: COLORS.warmWhite }} className="font-bold text-lg">Ready to Claim</h3>
          {claimables.map((claimable) => (
            <div
              key={claimable.id}
              className="rounded-2xl p-4 backdrop-blur-sm transition-all"
              style={{ 
                backgroundColor: `${COLORS.warmSand}08`,
                border: `1px solid ${COLORS.warmSand}20`
              }}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full flex items-center justify-center"
                       style={{ background: `linear-gradient(135deg, ${COLORS.sunriseGold} 0%, ${COLORS.ochreYellow} 100%)` }}>
                    <Gift className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h4 style={{ color: COLORS.warmWhite }} className="font-semibold">{claimable.title}</h4>
                    <div className="flex items-center gap-2 text-sm">
                      <span style={{ color: COLORS.sunriseGold }} className="font-bold">+{claimable.warmth} Warmth</span>
                      {claimable.expiresAt && (
                        <>
                          <span style={{ color: COLORS.warmSand }}>•</span>
                          <span style={{ color: COLORS.warmSand }}>
                            Expires in {Math.floor((claimable.expiresAt.getTime() - Date.now()) / (1000 * 60 * 60))}h
                          </span>
                        </>
                      )}
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => claimReward(claimable.id)}
                  className="px-6 py-2 rounded-lg text-white font-bold transition-all"
                  style={{ background: `linear-gradient(135deg, ${COLORS.sunriseGold} 0%, ${COLORS.terracottaClay} 100%)` }}
                >
                  Claim
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );

  // Achievements content
  const AchievementsContent = () => {
    const getRarityColor = (rarity: string) => {
      switch (rarity) {
        case 'legendary': return COLORS.ochreYellow;
        case 'epic': return COLORS.sunriseGold;
        case 'rare': return COLORS.palmGreen;
        default: return COLORS.warmSand;
      }
    };

    return (
      <div className="space-y-4">
        {achievements.map((achievement) => (
          <div
            key={achievement.id}
            className="rounded-2xl p-6 backdrop-blur-sm transition-all"
            style={achievement.completed ? {
              backgroundColor: `${COLORS.palmGreen}20`,
              border: `1px solid ${COLORS.palmGreen}`
            } : {
              backgroundColor: `${COLORS.warmSand}08`,
              border: `1px solid ${COLORS.warmSand}20`
            }}
          >
            <div className="flex items-start gap-4 mb-4">
              <div className="w-16 h-16 rounded-full flex items-center justify-center text-3xl flex-shrink-0 shadow-lg"
                   style={{ 
                     backgroundColor: getRarityColor(achievement.rarity),
                     opacity: achievement.completed ? 1 : 0.5,
                     filter: achievement.completed ? 'none' : 'grayscale(100%)'
                   }}>
                {achievement.icon}
              </div>
              <div className="flex-1">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h3 style={{ color: COLORS.warmWhite }} className="font-bold text-lg">{achievement.title}</h3>
                    <p style={{ color: COLORS.warmSand }} className="text-sm">{achievement.description}</p>
                  </div>
                  <div className="text-right">
                    <div style={{ color: COLORS.sunriseGold }} className="font-bold">+{achievement.warmth}</div>
                    <div style={{ color: COLORS.warmSand }} className="text-xs capitalize">{achievement.rarity}</div>
                  </div>
                </div>

                {!achievement.completed && (
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span style={{ color: COLORS.warmSand }}>Progress</span>
                      <span style={{ color: COLORS.warmWhite }} className="font-semibold">
                        {achievement.progress}/{achievement.target}
                      </span>
                    </div>
                    <div className="h-2 rounded-full overflow-hidden"
                         style={{ backgroundColor: `${COLORS.warmSand}20` }}>
                      <div
                        className="h-full transition-all duration-500"
                        style={{ 
                          width: `${(achievement.progress / achievement.target) * 100}%`,
                          backgroundColor: getRarityColor(achievement.rarity)
                        }}
                      />
                    </div>
                  </div>
                )}

                {achievement.completed && (
                  <div className="flex items-center gap-2 text-sm font-semibold"
                       style={{ color: COLORS.palmGreen }}>
                    <CheckCircle className="w-4 h-4" />
                    Completed!
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  };

  // Leaderboard content
  const LeaderboardContent = () => {
    const leaderboard = [
      { rank: 1, name: 'Adewale', avatar: '👨🏿‍💻', warmth: 5420, change: 2 },
      { rank: 2, name: 'Chioma', avatar: '👩🏿‍🎨', warmth: 4876, change: -1 },
      { rank: 3, name: 'Tunde', avatar: '👨🏿‍💼', warmth: 4123, change: 1 },
      { rank: 4, name: 'You', avatar: '👤', warmth: 245, change: 3 }
    ];

    return (
      <div className="space-y-4">
        <div className="rounded-2xl p-6"
             style={{ 
               background: `linear-gradient(135deg, ${COLORS.sunriseGold}30 0%, ${COLORS.terracottaClay}20 100%)`,
               border: `2px solid ${COLORS.sunriseGold}50`
             }}>
          <h3 style={{ color: COLORS.warmWhite }} className="font-bold text-lg mb-2">Weekly Competition</h3>
          <p style={{ color: COLORS.warmSand }} className="text-sm mb-4">
            Top 10 earners this week get bonus warmth rewards!
          </p>
          <div className="flex items-center gap-2 text-sm" style={{ color: COLORS.sunriseGold }}>
            <Clock className="w-4 h-4" />
            Resets in 3 days
          </div>
        </div>

        {leaderboard.map((user) => (
          <div
            key={user.rank}
            className="rounded-2xl p-4 backdrop-blur-sm transition-all"
            style={user.name === 'You' ? {
              backgroundColor: `${COLORS.sunriseGold}20`,
              border: `2px solid ${COLORS.sunriseGold}`
            } : {
              backgroundColor: `${COLORS.warmSand}08`,
              border: `1px solid ${COLORS.warmSand}20`
            }}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full flex items-center justify-center font-bold"
                     style={{
                       backgroundColor: user.rank === 1 ? COLORS.ochreYellow :
                                      user.rank === 2 ? COLORS.warmSand :
                                      user.rank === 3 ? COLORS.burntSienna :
                                      `${COLORS.warmSand}20`,
                       color: user.rank <= 3 ? COLORS.white : COLORS.warmSand
                     }}>
                  {user.rank}
                </div>
                <div className="w-12 h-12 rounded-full flex items-center justify-center text-xl"
                     style={{ background: `linear-gradient(135deg, ${COLORS.sunriseGold} 0%, ${COLORS.terracottaClay} 100%)` }}>
                  {user.avatar}
                </div>
                <div>
                  <div style={{ color: COLORS.warmWhite }} className="font-semibold">{user.name}</div>
                  <div style={{ color: COLORS.sunriseGold }} className="text-sm font-bold">{user.warmth.toLocaleString()} warmth</div>
                </div>
              </div>

              <div className="text-sm font-semibold"
                   style={{ 
                     color: user.change > 0 ? COLORS.palmGreen : 
                           user.change < 0 ? COLORS.terracottaClay : 
                           COLORS.warmSand
                   }}>
                {user.change > 0 ? '↑' : user.change < 0 ? '↓' : '→'}
                {Math.abs(user.change)}
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  };

  // ============================================================================
  // MAIN RENDER
  // ============================================================================

  return (
    <div className="space-y-6">
      <WarmthHeader />
      <TabsNav />

      {selectedTab === 'daily' && <DailyRewardsContent />}
      {selectedTab === 'achievements' && <AchievementsContent />}
      {selectedTab === 'leaderboard' && <LeaderboardContent />}
    </div>
  );
};

export default RewardsHub;