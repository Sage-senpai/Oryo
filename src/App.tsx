// File: src/App.tsx
// Main application shell with routing, navigation, and layout
// Implements the 4 Village Zones: Village Circle, Creator Layer, Gift House, Discovery

import React, { useState, useEffect } from 'react';
import { Home, Search, Wallet, User, Flame, Sparkles, Bell, Menu, X } from 'lucide-react';

// Mock context (replace with actual imports)
const useWallet = () => ({
  account: { address: '5GrwvaEF...', name: 'Chioma', avatar: '👩🏿' },
  isConnected: true,
  balances: [
    { symbol: 'DOT', formattedBalance: '12.5428' },
    { symbol: 'EKENE', formattedBalance: '50.2500' }
  ],
  totalUsdValue: 213.02
});

// Navigation configuration
const NAVIGATION = [
  { id: 'home', label: 'Village', icon: Home, path: '/' },
  { id: 'explore', label: 'Explore', icon: Search, path: '/explore' },
  { id: 'wallet', label: 'Wallet', icon: Wallet, path: '/wallet' },
  { id: 'profile', label: 'Profile', icon: User, path: '/profile' }
];

const EkeneApp = () => {
  const { account, isConnected, totalUsdValue } = useWallet();
  const [currentView, setCurrentView] = useState('home');
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [notifications, setNotifications] = useState(3);

  // Animated background
  const AnimatedBackground = () => (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      {/* Base gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-stone-900 via-amber-950 to-stone-900" />
      
      {/* Animated tribal patterns */}
      <svg className="absolute inset-0 w-full h-full opacity-5" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="tribal-bg" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
            <circle cx="50" cy="50" r="3" fill="#f59e0b" className="animate-pulse" />
            <circle cx="25" cy="25" r="2" fill="#ea580c" className="animate-pulse" style={{ animationDelay: '0.5s' }} />
            <circle cx="75" cy="25" r="2" fill="#f59e0b" className="animate-pulse" style={{ animationDelay: '1s' }} />
            <circle cx="25" cy="75" r="2" fill="#ea580c" className="animate-pulse" style={{ animationDelay: '1.5s' }} />
            <circle cx="75" cy="75" r="2" fill="#f59e0b" className="animate-pulse" style={{ animationDelay: '2s' }} />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#tribal-bg)" />
      </svg>

      {/* Floating ember particles */}
      <div className="absolute top-1/4 left-1/4 w-3 h-3 rounded-full bg-amber-400 opacity-40 animate-pulse" />
      <div className="absolute top-1/3 right-1/3 w-2 h-2 rounded-full bg-orange-400 opacity-30 animate-pulse" style={{ animationDelay: '1s' }} />
      <div className="absolute bottom-1/4 right-1/4 w-4 h-4 rounded-full bg-yellow-400 opacity-50 animate-pulse" style={{ animationDelay: '2s' }} />
    </div>
  );

  // Top header bar
  const Header = () => (
    <header className="sticky top-0 z-40 backdrop-blur-xl bg-stone-900/80 border-b border-amber-900/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-400 to-orange-600 flex items-center justify-center shadow-lg">
              <Flame className="w-6 h-6 text-white" />
            </div>
            <div className="hidden sm:block">
              <h1 className="text-white font-bold text-xl">EKENE</h1>
              <p className="text-amber-200 text-xs">The Digital Village</p>
            </div>
          </div>

          {/* Desktop actions */}
          <div className="hidden md:flex items-center gap-4">
            {/* Warmth indicator */}
            <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-purple-900/30 border border-purple-500/30">
              <Sparkles className="w-4 h-4 text-purple-400" />
              <span className="text-white font-semibold text-sm">45</span>
            </div>

            {/* Notifications */}
            <button className="relative w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-all">
              <Bell className="w-5 h-5 text-white" />
              {notifications > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-red-500 text-white text-xs flex items-center justify-center font-bold">
                  {notifications}
                </span>
              )}
            </button>

            {/* User avatar */}
            {isConnected && (
              <button className="flex items-center gap-3 px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 transition-all border border-white/20">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-amber-400 to-orange-600 flex items-center justify-center text-lg">
                  {account.avatar}
                </div>
                <div className="text-left hidden lg:block">
                  <div className="text-white font-semibold text-sm">{account.name}</div>
                  <div className="text-amber-200 text-xs">${totalUsdValue.toFixed(2)}</div>
                </div>
              </button>
            )}
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setShowMobileMenu(!showMobileMenu)}
            className="md:hidden w-10 h-10 rounded-full bg-white/10 flex items-center justify-center"
          >
            {showMobileMenu ? <X className="w-5 h-5 text-white" /> : <Menu className="w-5 h-5 text-white" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {showMobileMenu && (
        <div className="md:hidden border-t border-amber-900/30 bg-stone-900/95 backdrop-blur-xl">
          <div className="px-4 py-4 space-y-3">
            <div className="flex items-center gap-3 p-3 rounded-xl bg-white/5">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-amber-400 to-orange-600 flex items-center justify-center text-2xl">
                {account.avatar}
              </div>
              <div>
                <div className="text-white font-semibold">{account.name}</div>
                <div className="text-amber-200 text-sm">${totalUsdValue.toFixed(2)}</div>
              </div>
            </div>
            <button className="w-full flex items-center justify-between p-3 rounded-xl bg-white/5 hover:bg-white/10">
              <div className="flex items-center gap-2 text-white">
                <Sparkles className="w-5 h-5 text-purple-400" />
                <span>Warmth Points</span>
              </div>
              <span className="text-white font-bold">45</span>
            </button>
            <button className="w-full flex items-center justify-between p-3 rounded-xl bg-white/5 hover:bg-white/10">
              <div className="flex items-center gap-2 text-white">
                <Bell className="w-5 h-5" />
                <span>Notifications</span>
              </div>
              {notifications > 0 && (
                <span className="px-2 py-1 rounded-full bg-red-500 text-white text-xs font-bold">
                  {notifications}
                </span>
              )}
            </button>
          </div>
        </div>
      )}
    </header>
  );

  // Bottom navigation (mobile)
  const BottomNav = () => (
    <nav className="fixed bottom-0 left-0 right-0 z-40 md:hidden backdrop-blur-xl bg-stone-900/90 border-t border-amber-900/30">
      <div className="grid grid-cols-4 gap-1 p-2">
        {NAVIGATION.map((item) => {
          const Icon = item.icon;
          const isActive = currentView === item.id;
          
          return (
            <button
              key={item.id}
              onClick={() => setCurrentView(item.id)}
              className={`flex flex-col items-center gap-1 py-2 px-3 rounded-xl transition-all ${
                isActive 
                  ? 'bg-gradient-to-r from-amber-500/20 to-orange-600/20 border border-amber-500/50' 
                  : 'hover:bg-white/5'
              }`}
            >
              <Icon className={`w-6 h-6 ${isActive ? 'text-amber-400' : 'text-gray-400'}`} />
              <span className={`text-xs font-medium ${isActive ? 'text-amber-400' : 'text-gray-400'}`}>
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );

  // Sidebar navigation (desktop)
  const Sidebar = () => (
    <aside className="hidden md:flex flex-col w-64 fixed left-0 top-16 bottom-0 backdrop-blur-xl bg-stone-900/50 border-r border-amber-900/30 p-4">
      <nav className="space-y-2 flex-1">
        {NAVIGATION.map((item) => {
          const Icon = item.icon;
          const isActive = currentView === item.id;
          
          return (
            <button
              key={item.id}
              onClick={() => setCurrentView(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                isActive
                  ? 'bg-gradient-to-r from-amber-500/20 to-orange-600/20 border-2 border-amber-500/50'
                  : 'hover:bg-white/5 border-2 border-transparent'
              }`}
            >
              <Icon className={`w-6 h-6 ${isActive ? 'text-amber-400' : 'text-gray-400'}`} />
              <span className={`font-semibold ${isActive ? 'text-amber-400' : 'text-gray-300'}`}>
                {item.label}
              </span>
            </button>
          );
        })}
      </nav>

      {/* Quick tip button */}
      <button className="w-full py-4 rounded-xl bg-gradient-to-r from-amber-500 to-orange-600 text-white font-bold hover:from-amber-600 hover:to-orange-700 transition-all shadow-lg flex items-center justify-center gap-2 mt-4">
        <Flame className="w-5 h-5" />
        Send Ekene
      </button>
    </aside>
  );

  // Main content area
  const MainContent = () => (
    <main className="flex-1 md:ml-64 mt-16 mb-20 md:mb-0 min-h-screen">
      <div className="max-w-4xl mx-auto p-4 sm:p-6 lg:p-8">
        {/* View-specific content */}
        {currentView === 'home' && <VillageFeedPlaceholder />}
        {currentView === 'explore' && <ExplorePlaceholder />}
        {currentView === 'wallet' && <WalletPlaceholder />}
        {currentView === 'profile' && <ProfilePlaceholder />}
      </div>
    </main>
  );

  // Placeholder components (to be replaced with actual components)
  const VillageFeedPlaceholder = () => (
    <div className="space-y-6">
      <div className="rounded-2xl p-6 bg-white/5 backdrop-blur-sm border border-white/10">
        <h2 className="text-2xl font-bold text-white mb-2">Ekene, {account.name}.</h2>
        <p className="text-amber-200">The village acknowledges you.</p>
      </div>
      
      {/* Stories/Circles row */}
      <div className="flex gap-3 overflow-x-auto pb-2">
        {['Communities', 'Events', 'Creators', 'Following'].map((item, i) => (
          <button key={i} className="flex-shrink-0 w-20 flex flex-col items-center gap-2">
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-amber-400 to-orange-600 border-4 border-amber-500/50 flex items-center justify-center">
              <span className="text-2xl">🔥</span>
            </div>
            <span className="text-xs text-white font-medium text-center">{item}</span>
          </button>
        ))}
      </div>

      {/* Feed posts */}
      {[1, 2, 3].map((i) => (
        <div key={i} className="rounded-2xl p-6 bg-white/5 backdrop-blur-sm border border-white/10 hover:border-amber-500/30 transition-all">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-400 to-pink-500">
              <div className="w-full h-full rounded-full flex items-center justify-center text-xl">👨🏿‍💻</div>
            </div>
            <div>
              <div className="text-white font-semibold">Adewale Ojo</div>
              <div className="text-gray-400 text-sm">2 hours ago</div>
            </div>
          </div>
          <p className="text-gray-200 mb-4">
            Just launched my new Web3 project! Excited to share this with the village. 🚀
          </p>
          <div className="flex gap-3">
            <button className="flex-1 py-2 rounded-lg bg-white/5 hover:bg-white/10 text-white flex items-center justify-center gap-2">
              <Flame className="w-4 h-4 text-amber-400" />
              <span className="text-sm">Send Ekene</span>
            </button>
          </div>
        </div>
      ))}
    </div>
  );

  const ExplorePlaceholder = () => (
    <div className="space-y-6">
      <div className="rounded-2xl p-6 bg-white/5 backdrop-blur-sm border border-white/10">
        <h2 className="text-2xl font-bold text-white mb-4">Explore the Village</h2>
        <input
          type="text"
          placeholder="Search creators, circles, events..."
          className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/20 text-white placeholder-gray-400 focus:border-amber-500 outline-none"
        />
      </div>
    </div>
  );

  const WalletPlaceholder = () => (
    <div className="space-y-6">
      <div className="rounded-2xl p-6 bg-white/5 backdrop-blur-sm border border-white/10">
        <h2 className="text-2xl font-bold text-white">The Gift House</h2>
        <p className="text-amber-200">Your village purse</p>
      </div>
    </div>
  );

  const ProfilePlaceholder = () => (
    <div className="space-y-6">
      <div className="rounded-2xl p-6 bg-white/5 backdrop-blur-sm border border-white/10 text-center">
        <div className="w-24 h-24 mx-auto rounded-full bg-gradient-to-br from-amber-400 to-orange-600 flex items-center justify-center text-4xl mb-4">
          {account.avatar}
        </div>
        <h2 className="text-2xl font-bold text-white mb-2">{account.name}</h2>
        <p className="text-amber-200">Your Village Identity</p>
      </div>
    </div>
  );

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

export default EkeneApp;