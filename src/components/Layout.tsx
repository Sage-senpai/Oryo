import { useState } from 'react';
import { BottomNav } from './oryo/BottomNav';
import { useNavigate, useLocation } from 'react-router-dom';

type NavItem = 'home' | 'discover' | 'wallet' | 'communities' | 'profile';

export function Layout({ children }: { children: React.ReactNode }) {
  const navigate = useNavigate();
  const location = useLocation();

  // Determine active nav item based on current route
  const getActiveNav = (): NavItem => {
    const path = location.pathname;
    if (path === '/') return 'home';
    if (path.startsWith('/discover')) return 'discover';
    if (path.startsWith('/wallet')) return 'wallet';
    if (path.startsWith('/communities')) return 'communities';
    if (path.startsWith('/profile')) return 'profile';
    return 'home';
  };

  const handleNavigate = (item: NavItem) => {
    const routes: Record<NavItem, string> = {
      home: '/',
      discover: '/discover',
      wallet: '/wallet',
      communities: '/communities',
      profile: '/profile'
    };
    navigate(routes[item]);
  };

  return (
    <div className="oryo-layout">
      <main>{children}</main>
      <BottomNav 
        active={getActiveNav()} 
        onNavigate={handleNavigate} 
      />
    </div>
  );
}