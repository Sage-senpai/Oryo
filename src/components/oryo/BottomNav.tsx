/**
 * ============================================================================
 * ORYO - Bottom Navigation Component
 * ============================================================================
 * Location: src/components/oryo/BottomNav.tsx
 * 
 * Mobile-first navigation bar with active state indicators
 * 
 * Styles: src/styles/components/_oryo-components.scss
 */

import { Home, Compass, Wallet, Users, User } from 'lucide-react';

// Types
type NavItem = 'home' | 'discover' | 'wallet' | 'communities' | 'profile';

interface BottomNavProps {
  active: NavItem;
  onNavigate: (item: NavItem) => void;
}

export function BottomNav({ active, onNavigate }: BottomNavProps) {
  const navItems = [
    {
      id: 'home' as NavItem,
      label: 'Home',
      icon: Home
    },
    {
      id: 'discover' as NavItem,
      label: 'Discover',
      icon: Compass
    },
    {
      id: 'wallet' as NavItem,
      label: 'Wallet',
      icon: Wallet
    },
    {
      id: 'communities' as NavItem,
      label: 'Communities',
      icon: Users
    },
    {
      id: 'profile' as NavItem,
      label: 'Profile',
      icon: User
    }
  ];

  return (
    <nav className="bottom-nav">
      {navItems.map((item) => {
        const Icon = item.icon;
        const isActive = active === item.id;

        return (
          <button
            key={item.id}
            className={`bottom-nav__item ${isActive ? 'bottom-nav__item--active' : ''}`}
            onClick={() => onNavigate(item.id)}
            aria-label={item.label}
            aria-current={isActive ? 'page' : undefined}
          >
            <div className="bottom-nav__icon">
              <Icon />
            </div>
            <span className="bottom-nav__label">{item.label}</span>
          </button>
        );
      })}
    </nav>
  );
}