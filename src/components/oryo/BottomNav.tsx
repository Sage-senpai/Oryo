/**
 * ============================================================================
 * ORYO - Enhanced Bottom Navigation (Vibrant)
 * ============================================================================
 * Location: src/components/oryo/BottomNav.tsx
 * 
 * Colorful, animated navigation with floating action button feel
 * ============================================================================
 */

import { Home, Compass, Wallet, Users, User } from 'lucide-react';
import { motion } from 'framer-motion';

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
      icon: Home,
      color: '#F2A541',
      gradient: 'linear-gradient(135deg, #FF8C42 0%, #F2A541 100%)'
    },
    {
      id: 'discover' as NavItem,
      label: 'Discover',
      icon: Compass,
      color: '#1A9BA8',
      gradient: 'linear-gradient(135deg, #1A9BA8 0%, #6ED1C5 100%)'
    },
    {
      id: 'wallet' as NavItem,
      label: 'Wallet',
      icon: Wallet,
      color: '#0E4D5F',
      gradient: 'linear-gradient(135deg, #0E4D5F 0%, #1A9BA8 100%)'
    },
    {
      id: 'communities' as NavItem,
      label: 'Communities',
      icon: Users,
      color: '#FF686B',
      gradient: 'linear-gradient(135deg, #FF686B 0%, #FF8C42 100%)'
    },
    {
      id: 'profile' as NavItem,
      label: 'Profile',
      icon: User,
      color: '#6ED1C5',
      gradient: 'linear-gradient(135deg, #6ED1C5 0%, #1A9BA8 100%)'
    }
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50">
      {/* Background with gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-white via-white to-transparent backdrop-blur-xl"></div>
      
      {/* Top border glow */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-orange-400/30 to-transparent"></div>
      
      <div className="relative flex items-center justify-around px-4 py-2 safe-bottom">
        {navItems.map((item, index) => {
          const Icon = item.icon;
          const isActive = active === item.id;

          return (
            <motion.button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`relative flex flex-col items-center justify-center gap-1 py-2 px-3 rounded-2xl transition-all duration-300 ${
                isActive ? '' : 'active:scale-95'
              }`}
              whileTap={{ scale: 0.9 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              {/* Active background */}
              {isActive && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute inset-0 rounded-2xl"
                  style={{
                    background: item.gradient,
                    boxShadow: `0 4px 12px ${item.color}40`
                  }}
                  transition={{
                    type: "spring",
                    stiffness: 500,
                    damping: 30
                  }}
                />
              )}

              {/* Icon container */}
              <div className="relative z-10">
                <div className={`relative transition-transform duration-300 ${
                  isActive ? 'scale-110' : ''
                }`}>
                  <Icon 
                    className={`w-6 h-6 transition-all duration-300 ${
                      isActive 
                        ? 'text-white' 
                        : 'text-gray-400'
                    }`}
                    strokeWidth={isActive ? 2.5 : 2}
                  />
                  
                  {/* Glow effect for active icon */}
                  {isActive && (
                    <motion.div
                      className="absolute inset-0 rounded-full blur-md"
                      style={{
                        background: item.color,
                        opacity: 0.3
                      }}
                      animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.3, 0.5, 0.3]
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                    />
                  )}
                </div>
              </div>

              {/* Label */}
              <span 
                className={`relative z-10 text-xs font-medium transition-all duration-300 ${
                  isActive 
                    ? 'text-white opacity-100' 
                    : 'text-gray-400 opacity-80'
                }`}
              >
                {item.label}
              </span>

              {/* Active indicator dot */}
              {isActive && (
                <motion.div
                  className="absolute -top-1 w-1.5 h-1.5 rounded-full bg-white"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  style={{
                    boxShadow: `0 0 8px ${item.color}`
                  }}
                />
              )}
            </motion.button>
          );
        })}
      </div>

      {/* Safe area for iPhone notch */}
      <div className="h-safe-bottom bg-white"></div>
    </nav>
  );
}