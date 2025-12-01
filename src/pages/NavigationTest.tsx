/**
 * ============================================================================
 * NAVIGATION TEST PAGE
 * ============================================================================
 * Location: src/pages/NavigationTest.tsx
 * 
 * Use this page to test all routes and ensure everything is connected
 * Add this to your router temporarily to verify all links work
 */

import { Link } from 'react-router-dom';
import { Home, Compass, Wallet, Users, User, QrCode, Trophy, Calendar } from 'lucide-react';

export function NavigationTest() {
  const routes = [
    { path: '/', name: 'Home Feed', icon: Home },
    { path: '/discover', name: 'Discover', icon: Compass },
    { path: '/wallet', name: 'Wallet Dashboard', icon: Wallet },
    { path: '/communities', name: 'Communities', icon: Users },
    { path: '/collectibles', name: 'Collectibles', icon: Trophy },
    { path: '/events', name: 'Event Mode', icon: Calendar },
    { path: '/profile', name: 'Profile', icon: User },
    { path: '/creator/1', name: 'Creator Page (Alex Rivera)', icon: User },
    { path: '/creator/2', name: 'Creator Page (Sarah Chen)', icon: User },
  ];

  return (
    <div className="min-h-screen bg-[#FFF8F0] p-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-2xl p-8 shadow-lg">
          <h1 className="text-3xl font-bold text-[#0E4D5F] mb-2">
            🔥 Oryo Navigation Test
          </h1>
          <p className="text-[#646470] mb-8">
            Test all routes to ensure everything is connected properly
          </p>

          <div className="grid gap-4 md:grid-cols-2">
            {routes.map((route) => {
              const Icon = route.icon;
              return (
                <Link
                  key={route.path}
                  to={route.path}
                  className="flex items-center gap-4 p-4 bg-gradient-to-r from-[#FFF8F0] to-[#FFE8D6] rounded-xl border-2 border-[#E6DCD2] hover:border-[#F2A541] transition-all duration-300 hover:shadow-lg hover:scale-105"
                >
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#F2A541] to-[#FF686B] flex items-center justify-center flex-shrink-0">
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-[#0E4D5F]">{route.name}</h3>
                    <p className="text-sm text-[#646470]">{route.path}</p>
                  </div>
                </Link>
              );
            })}
          </div>

          <div className="mt-8 p-4 bg-[#FFF8F0] rounded-xl border-2 border-[#F2A541]/30">
            <h2 className="font-semibold text-[#0E4D5F] mb-2">✅ Checklist</h2>
            <ul className="space-y-2 text-sm text-[#646470]">
              <li>✓ All routes should load without errors</li>
              <li>✓ Bottom navigation should highlight active page</li>
              <li>✓ Header should be visible on all pages</li>
              <li>✓ Styles should be consistent across pages</li>
              <li>✓ No overlapping components or hidden text</li>
            </ul>
          </div>

          <div className="mt-6 p-4 bg-gradient-to-r from-[#F2A541]/10 to-[#FF686B]/10 rounded-xl">
            <p className="text-sm text-[#0E4D5F]">
              💡 <strong>Tip:</strong> Once you've verified all routes work correctly,
              remove this test page and update the home route to point to the main feed.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}