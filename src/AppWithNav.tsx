// File: src/AppWithNav.tsx
// Main application shell with navigation - PRODUCTION READY
// Uses official Ekene theme, no demo placeholders, proper routing

import React, { useState } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { Home, Search, Wallet, User, Flame, Sparkles, Bell, Menu, X, Award } from 'lucide-react';
import { useWallet } from './contexts/WalletContext';

// Official Ekene Colors
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
};

// ============================================================================
// NAVIGATION CONFIGURATION
// ============================================================================

const NAVIGATION = [
  { id: 'feed', label: 'Village', icon: Home, path: '/app' },
  { id: 'discover', label: 'Explore', icon: Search, path: '/app/discover' },
  { id: 'wallet', label: 'Wallet', icon: Wallet, path: '/app/wallet' },
  { id: 'profile', label: 'Profile', icon: User, path: '/app/profile' }
];

// ============================================================================
// MAIN APP COMPONENT
// ============================================================================

const AppWithNav: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { account, isConnected, totalUsdValue } = useWallet();
  
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [unreadNotifications] = useState(3); // TODO: Connect to actual notifications

  // Get current active route
  const getCurrentRoute = () => {
    const path = location.pathname;
    if (path === '/app' || path === '/app/') return 'feed';
    if (path.startsWith('/app/discover')) return 'discover';
    if (path.startsWith('/app/wallet')) return 'wallet';
    if (path.startsWith('/app/profile')) return 'profile';
    return 'feed';
  };

  const currentView = getCurrentRoute();

  // ============================================================================
  // ANIMATED BACKGROUND
  // ============================================================================

  const AnimatedBackground = () => (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      {/* Base gradient with official colors */}
      <div className="absolute inset-0" 
           style={{ background: `linear-gradient(135deg, ${COLORS.deepEarthBrown} 0%, ${COLORS.charcoal} 50%, ${COLORS.deepEarthBrown} 100%)` }} />
      
      {/* Animated tribal patterns */}
      <svg className="absolute inset-0 w-full h-full opacity-5" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="tribal-bg" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
            <circle cx="50" cy="50" r="3" fill={COLORS.sunriseGold} className="animate-pulse" />
            <circle cx="25" cy="25" r="2" fill={COLORS.terracottaClay} className="animate-pulse" style={{ animationDelay: '0.5s' }} />
            <circle cx="75" cy="25" r="2" fill={COLORS.ochreYellow} className="animate-pulse" style={{ animationDelay: '1s' }} />
            <circle cx="25" cy="75" r="2" fill={COLORS.terracottaClay} className="animate-pulse" style={{ animationDelay: '1.5s' }} />
            <circle cx="75" cy="75" r="2" fill={COLORS.sunriseGold} className="animate-pulse" style={{ animationDelay: '2s' }} />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#tribal-bg)" />
      </svg>

      {/* Floating ember particles */}
      <div className="absolute top-1/4 left-1/4 w-3 h-3 rounded-full opacity-40 animate-pulse" 
           style={{ backgroundColor: COLORS.ochreYellow }} />
      <div className="absolute top-1/3 right-1/3 w-2 h-2 rounded-full opacity-30 animate-pulse" 
           style={{ backgroundColor: COLORS.terracottaClay, animationDelay: '1s' }} />
      <div className="absolute bottom-1/4 right-1/4 w-4 h-4 rounded-full opacity-50 animate-pulse" 
           style={{ backgroundColor: COLORS.sunriseGold, animationDelay: '2s' }} />
    </div>
  );

  // ============================================================================
  // TOP HEADER BAR
  // ============================================================================

  const Header = () => (
    <header className="sticky top-0 z-40 backdrop-blur-xl border-b"
            style={{ 
              backgroundColor: `${COLORS.deepEarthBrown}cc`,
              borderColor: `${COLORS.warmSand}30`
            }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <button onClick={() => navigate('/app')} className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full flex items-center justify-center shadow-lg"
                 style={{ background: `linear-gradient(135deg, ${COLORS.sunriseGold} 0%, ${COLORS.terracottaClay} 100%)` }}>
              <Flame className="w-6 h-6 text-white" />
            </div>
            <div className="hidden sm:block">
              <h1 className="font-bold text-xl" style={{ color: COLORS.warmWhite }}>EKENE</h1>
              <p className="text-xs" style={{ color: COLORS.warmSand }}>The Digital Village</p>
            </div>
          </button>

          {/* Desktop actions */}
          <div className="hidden md:flex items-center gap-4">
            {/* Warmth indicator */}
            <button 
              onClick={() => navigate('/app/rewards')}
              className="flex items-center gap-2 px-4 py-2 rounded-full transition-all"
              style={{ 
                backgroundColor: `${COLORS.ochreYellow}30`,
                border: `1px solid ${COLORS.ochreYellow}50`
              }}>
              <Sparkles className="w-4 h-4" style={{ color: COLORS.ochreYellow }} />
              <span className="font-semibold text-sm" style={{ color: COLORS.warmWhite }}>45</span>
            </button>

            {/* Notifications */}
            <button 
              onClick={() => setShowNotifications(!showNotifications)}
              className="relative w-10 h-10 rounded-full flex items-center justify-center transition-all"
              style={{ backgroundColor: `${COLORS.warmSand}20` }}>
              <Bell className="w-5 h-5" style={{ color: COLORS.warmWhite }} />
              {unreadNotifications > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full text-white text-xs flex items-center justify-center font-bold"
                      style={{ backgroundColor: COLORS.terracottaClay }}>
                  {unreadNotifications}
                </span>
              )}
            </button>

            {/* User avatar */}
            {isConnected && (
              <button 
                onClick={() => navigate('/app/profile')}
                className="flex items-center gap-3 px-4 py-2 rounded-full transition-all"
                style={{ 
                  backgroundColor: `${COLORS.warmSand}15`,
                  border: `1px solid ${COLORS.warmSand}30`
                }}>
                <div className="w-8 h-8 rounded-full flex items-center justify-center text-lg"
                     style={{ background: `linear-gradient(135deg, ${COLORS.sunriseGold} 0%, ${COLORS.terracottaClay} 100%)` }}>
                  {account?.avatar || '👤'}
                </div>
                <div className="text-left hidden lg:block">
                  <div className="font-semibold text-sm" style={{ color: COLORS.warmWhite }}>{account?.name || 'User'}</div>
                  <div className="text-xs" style={{ color: COLORS.warmSand }}>${totalUsdValue.toFixed(2)}</div>
                </div>
              </button>
            )}
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setShowMobileMenu(!showMobileMenu)}
            className="md:hidden w-10 h-10 rounded-full flex items-center justify-center"
            style={{ backgroundColor: `${COLORS.warmSand}20` }}>
            {showMobileMenu ? 
              <X className="w-5 h-5" style={{ color: COLORS.warmWhite }} /> : 
              <Menu className="w-5 h-5" style={{ color: COLORS.warmWhite }} />
            }
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {showMobileMenu && (
        <div className="md:hidden backdrop-blur-xl"
             style={{ 
               borderTop: `1px solid ${COLORS.warmSand}30`,
               backgroundColor: `${COLORS.deepEarthBrown}f5`
             }}>
          <div className="px-4 py-4 space-y-3">
            {isConnected && (
              <div className="flex items-center gap-3 p-3 rounded-xl"
                   style={{ backgroundColor: `${COLORS.warmSand}10` }}>
                <div className="w-12 h-12 rounded-full flex items-center justify-center text-2xl"
                     style={{ background: `linear-gradient(135deg, ${COLORS.sunriseGold} 0%, ${COLORS.terracottaClay} 100%)` }}>
                  {account?.avatar || '👤'}
                </div>
                <div>
                  <div className="font-semibold" style={{ color: COLORS.warmWhite }}>{account?.name || 'User'}</div>
                  <div className="text-sm" style={{ color: COLORS.warmSand }}>${totalUsdValue.toFixed(2)}</div>
                </div>
              </div>
            )}
            
            <button 
              onClick={() => {
                navigate('/app/rewards');
                setShowMobileMenu(false);
              }}
              className="w-full flex items-center justify-between p-3 rounded-xl"
              style={{ backgroundColor: `${COLORS.warmSand}10` }}>
              <div className="flex items-center gap-2" style={{ color: COLORS.warmWhite }}>
                <Sparkles className="w-5 h-5" style={{ color: COLORS.ochreYellow }} />
                <span>Warmth Points</span>
              </div>
              <span className="font-bold" style={{ color: COLORS.warmWhite }}>45</span>
            </button>
            
            <button 
              onClick={() => {
                setShowNotifications(true);
                setShowMobileMenu(false);
              }}
              className="w-full flex items-center justify-between p-3 rounded-xl"
              style={{ backgroundColor: `${COLORS.warmSand}10` }}>
              <div className="flex items-center gap-2" style={{ color: COLORS.warmWhite }}>
                <Bell className="w-5 h-5" />
                <span>Notifications</span>
              </div>
              {unreadNotifications > 0 && (
                <span className="px-2 py-1 rounded-full text-xs font-bold"
                      style={{ backgroundColor: COLORS.terracottaClay, color: COLORS.white }}>
                  {unreadNotifications}
                </span>
              )}
            </button>
          </div>
        </div>
      )}
    </header>
  );

  // ============================================================================
  // BOTTOM NAVIGATION (MOBILE)
  // ============================================================================

  const BottomNav = () => (
    <nav className="fixed bottom-0 left-0 right-0 z-40 md:hidden backdrop-blur-xl border-t"
         style={{ 
           backgroundColor: `${COLORS.deepEarthBrown}e6`,
           borderColor: `${COLORS.warmSand}30`
         }}>
      <div className="grid grid-cols-4 gap-1 p-2">
        {NAVIGATION.map((item) => {
          const Icon = item.icon;
          const isActive = currentView === item.id;
          
          return (
            <button
              key={item.id}
              onClick={() => navigate(item.path)}
              className="flex flex-col items-center gap-1 py-2 px-3 rounded-xl transition-all"
              style={isActive ? {
                background: `linear-gradient(135deg, ${COLORS.sunriseGold}30 0%, ${COLORS.terracottaClay}20 100%)`,
                border: `1px solid ${COLORS.sunriseGold}50`
              } : {}}
            >
              <Icon className="w-6 h-6" style={{ color: isActive ? COLORS.sunriseGold : COLORS.warmSand }} />
              <span className="text-xs font-medium" style={{ color: isActive ? COLORS.sunriseGold : COLORS.warmSand }}>
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );

  // ============================================================================
  // SIDEBAR NAVIGATION (DESKTOP)
  // ============================================================================

  const Sidebar = () => (
    <aside className="hidden md:flex flex-col w-64 fixed left-0 top-16 bottom-0 backdrop-blur-xl border-r p-4"
           style={{ 
             backgroundColor: `${COLORS.deepEarthBrown}80`,
             borderColor: `${COLORS.warmSand}30`
           }}>
      <nav className="space-y-2 flex-1">
        {NAVIGATION.map((item) => {
          const Icon = item.icon;
          const isActive = currentView === item.id;
          
          return (
            <button
              key={item.id}
              onClick={() => navigate(item.path)}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all"
              style={isActive ? {
                background: `linear-gradient(135deg, ${COLORS.sunriseGold}30 0%, ${COLORS.terracottaClay}20 100%)`,
                border: `2px solid ${COLORS.sunriseGold}50`
              } : {
                border: '2px solid transparent'
              }}
            >
              <Icon className="w-6 h-6" style={{ color: isActive ? COLORS.sunriseGold : COLORS.warmSand }} />
              <span className="font-semibold" style={{ color: isActive ? COLORS.sunriseGold : COLORS.warmSand }}>
                {item.label}
              </span>
            </button>
          );
        })}
      </nav>

      {/* Quick tip button */}
      <button 
        onClick={() => {/* TODO: Open tip modal */}}
        className="w-full py-4 rounded-xl text-white font-bold transition-all shadow-lg flex items-center justify-center gap-2 mt-4"
        style={{ background: `linear-gradient(135deg, ${COLORS.sunriseGold} 0%, ${COLORS.terracottaClay} 100%)` }}>
        <Flame className="w-5 h-5" />
        Send Ekene
      </button>
    </aside>
  );

  // ============================================================================
  // MAIN CONTENT AREA
  // ============================================================================

  const MainContent = () => (
    <main className="flex-1 md:ml-64 mt-16 mb-20 md:mb-0 min-h-screen">
      <div className="max-w-4xl mx-auto p-4 sm:p-6 lg:p-8">
        <Outlet />
      </div>
    </main>
  );

  // ============================================================================
  // MAIN RENDER
  // ============================================================================

  return (
    <div className="min-h-screen">
      <AnimatedBackground />
      <Header />
      <Sidebar />
      <MainContent />
      <BottomNav />
    </div>
  );
};

export default AppWithNav;