/**
 * ============================================================================
 * ORYO - Vibrant Wallet Dashboard
 * ============================================================================
 * Location: src/pages/WalletDashboard.tsx
 * 
 * Colorful, animated wallet with working interactions
 * ============================================================================
 */

import { useState } from 'react';
import { 
  Send, 
  Download, 
  Repeat, 
  QrCode,
  ArrowUpRight,
  ArrowDownLeft,
  TrendingUp,
  TrendingDown,
  Sparkles,
  Zap,
  Eye,
  EyeOff
} from 'lucide-react';

interface Asset {
  id: string;
  name: string;
  symbol: string;
  icon: string;
  balance: string;
  usdValue: string;
  change24h: number;
  color: string;
  gradient: string;
}

interface Activity {
  id: string;
  type: 'sent' | 'received' | 'swap';
  title: string;
  amount: string;
  usdValue: string;
  timestamp: string;
}

export function WalletDashboard() {
  const [totalBalance] = useState<number>(1247.82);
  const [showBalance, setShowBalance] = useState(true);
  
  const [assets] = useState<Asset[]>([
    {
      id: '1',
      name: 'Polkadot',
      symbol: 'DOT',
      icon: '⚫',
      balance: '145.23',
      usdValue: '$891.41',
      change24h: 5.2,
      color: '#E6007A',
      gradient: 'linear-gradient(135deg, #E6007A 0%, #FF1A8C 100%)'
    },
    {
      id: '2',
      name: 'ORYO Token',
      symbol: 'ORYO',
      icon: '🔥',
      balance: '2,450',
      usdValue: '$245.00',
      change24h: -2.1,
      color: '#F2A541',
      gradient: 'linear-gradient(135deg, #FF8C42 0%, #F2A541 100%)'
    },
    {
      id: '3',
      name: 'USDT',
      symbol: 'USDT',
      icon: '💵',
      balance: '111.41',
      usdValue: '$111.41',
      change24h: 0.0,
      color: '#26A17B',
      gradient: 'linear-gradient(135deg, #26A17B 0%, #50AF95 100%)'
    }
  ]);

  const [recentActivity] = useState<Activity[]>([
    {
      id: '1',
      type: 'received',
      title: 'Tip from @sarah_creates',
      amount: '+5.0 DOT',
      usdValue: '$30.65',
      timestamp: '2 hours ago'
    },
    {
      id: '2',
      type: 'sent',
      title: 'Tipped @alex_dev',
      amount: '-2.5 DOT',
      usdValue: '$15.32',
      timestamp: '5 hours ago'
    },
    {
      id: '3',
      type: 'swap',
      title: 'Swapped DOT → ORYO',
      amount: '10.0 DOT',
      usdValue: '$61.30',
      timestamp: 'Yesterday'
    },
    {
      id: '4',
      type: 'received',
      title: 'Tip from @community',
      amount: '+1.2 DOT',
      usdValue: '$7.36',
      timestamp: '2 days ago'
    }
  ]);

  const handleActionClick = (action: string) => {
    console.log(`${action} clicked`);
    // TODO: Implement action handlers
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FFF5E8] via-[#FEFCF8] to-[#E6F7F9] pb-24">
      {/* Animated Background */}
      <div className="fixed inset-0 opacity-20 pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-[#F2A541]/30 to-[#FF686B]/30 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-br from-[#0E4D5F]/30 to-[#1A9BA8]/30 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
      </div>

      {/* Header with Balance */}
      <div className="relative bg-gradient-to-br from-[#0E4D5F] via-[#1A9BA8] to-[#0E4D5F] overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-white to-transparent rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-gradient-to-br from-white to-transparent rounded-full blur-3xl"></div>
        </div>

        <div className="relative container mx-auto px-4 py-8">
          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-2 mb-3">
              <Sparkles className="w-5 h-5 text-[#F2A541] animate-pulse" />
              <p className="text-sm text-white/80 font-medium">Your Hearth Balance</p>
            </div>
            
            <div className="flex items-center justify-center gap-3 mb-2">
              {showBalance ? (
                <h1 className="text-5xl font-black text-white drop-shadow-lg">
                  ${totalBalance.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                </h1>
              ) : (
                <h1 className="text-5xl font-black text-white drop-shadow-lg">
                  ••••••
                </h1>
              )}
              <button
                onClick={() => setShowBalance(!showBalance)}
                className="p-2 rounded-xl bg-white/10 hover:bg-white/20 transition-all duration-300 active:scale-95"
              >
                {showBalance ? (
                  <Eye className="w-5 h-5 text-white" />
                ) : (
                  <EyeOff className="w-5 h-5 text-white" />
                )}
              </button>
            </div>
            
            <p className="text-sm text-white/70">
              ≈ {(totalBalance / 6.13).toFixed(2)} DOT
            </p>
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-4 gap-3">
            {[
              { icon: Send, label: 'Send', action: 'send', color: '#FF8C42' },
              { icon: Download, label: 'Receive', action: 'receive', color: '#1A9BA8' },
              { icon: Repeat, label: 'Swap', action: 'swap', color: '#6ED1C5' },
              { icon: QrCode, label: 'QR Code', action: 'qr', color: '#F2A541' }
            ].map((item, index) => (
              <button
                key={item.action}
                onClick={() => handleActionClick(item.action)}
                className="group relative overflow-hidden bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-4 hover:bg-white/20 transition-all duration-300 active:scale-95"
                style={{
                  animation: `fadeInUp 0.5s ease-out ${index * 0.1}s backwards`
                }}
              >
                <div 
                  className="w-12 h-12 mx-auto mb-2 rounded-xl flex items-center justify-center transition-all duration-300 group-hover:scale-110"
                  style={{
                    background: `linear-gradient(135deg, ${item.color}40 0%, ${item.color}60 100%)`
                  }}
                >
                  <item.icon className="w-6 h-6 text-white drop-shadow-lg" />
                </div>
                <span className="text-xs font-semibold text-white">{item.label}</span>
                
                {/* Glow effect on hover */}
                <div 
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl"
                  style={{
                    background: `radial-gradient(circle at center, ${item.color}20 0%, transparent 70%)`
                  }}
                ></div>
              </button>
            ))}
          </div>
        </div>

        {/* Wave Divider */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
            <path d="M0 30C240 10 480 10 720 30C960 50 1200 50 1440 30V60H0V30Z" fill="#FFF5E8"/>
          </svg>
        </div>
      </div>

      {/* Assets Section */}
      <div className="relative container mx-auto px-4 -mt-6">
        <div className="bg-white rounded-3xl p-6 shadow-2xl border border-gray-100 mb-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold bg-gradient-to-r from-[#0E4D5F] to-[#1A9BA8] bg-clip-text text-transparent flex items-center gap-2">
              <Zap className="w-5 h-5 text-[#F2A541]" />
              Your Assets
            </h2>
            <button className="text-sm font-semibold text-[#F2A541] hover:text-[#FF8C42] transition-colors">
              View All →
            </button>
          </div>

          <div className="space-y-3">
            {assets.map((asset, index) => (
              <div
                key={asset.id}
                className="group relative bg-gradient-to-br from-gray-50 to-white hover:from-white hover:to-gray-50 rounded-2xl p-4 transition-all duration-300 border border-gray-100 hover:border-[#F2A541]/30 hover:shadow-lg cursor-pointer"
                style={{
                  animation: `fadeInUp 0.5s ease-out ${index * 0.1}s backwards`
                }}
              >
                <div className="flex items-center gap-4">
                  <div 
                    className="w-14 h-14 rounded-xl flex items-center justify-center text-2xl shadow-lg group-hover:scale-110 transition-transform"
                    style={{ background: asset.gradient }}
                  >
                    {asset.icon}
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-gray-900 mb-1">{asset.name}</h3>
                    <p className="text-sm text-gray-600">
                      {asset.balance} {asset.symbol}
                    </p>
                  </div>
                  
                  <div className="text-right">
                    <p className="font-bold text-gray-900 mb-1">{asset.usdValue}</p>
                    <div className={`flex items-center gap-1 text-sm font-semibold ${
                      asset.change24h >= 0 ? 'text-green-500' : 'text-red-500'
                    }`}>
                      {asset.change24h >= 0 ? (
                        <TrendingUp className="w-4 h-4" />
                      ) : (
                        <TrendingDown className="w-4 h-4" />
                      )}
                      {Math.abs(asset.change24h)}%
                    </div>
                  </div>
                </div>

                {/* Hover Glow */}
                <div 
                  className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
                  style={{
                    background: `radial-gradient(circle at center, ${asset.color}08 0%, transparent 70%)`
                  }}
                ></div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-3xl p-6 shadow-2xl border border-gray-100">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold bg-gradient-to-r from-[#0E4D5F] to-[#1A9BA8] bg-clip-text text-transparent flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-[#F2A541]" />
              Recent Activity
            </h2>
            <button className="text-sm font-semibold text-[#F2A541] hover:text-[#FF8C42] transition-colors">
              View All →
            </button>
          </div>

          <div className="space-y-3">
            {recentActivity.map((activity, index) => (
              <div
                key={activity.id}
                className="group flex items-center gap-4 p-4 bg-gradient-to-br from-gray-50 to-white hover:from-white hover:to-gray-50 rounded-2xl transition-all duration-300 border border-gray-100 hover:border-[#F2A541]/30 hover:shadow-lg cursor-pointer"
                style={{
                  animation: `fadeInUp 0.5s ease-out ${index * 0.1}s backwards`
                }}
              >
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center shadow-md group-hover:scale-110 transition-transform ${
                  activity.type === 'sent' 
                    ? 'bg-gradient-to-br from-red-100 to-red-50' 
                    : activity.type === 'received'
                    ? 'bg-gradient-to-br from-green-100 to-green-50'
                    : 'bg-gradient-to-br from-blue-100 to-blue-50'
                }`}>
                  {activity.type === 'sent' && <ArrowUpRight className="w-6 h-6 text-red-500" />}
                  {activity.type === 'received' && <ArrowDownLeft className="w-6 h-6 text-green-500" />}
                  {activity.type === 'swap' && <Repeat className="w-6 h-6 text-blue-500" />}
                </div>
                
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-gray-900 mb-1">{activity.title}</p>
                  <p className="text-sm text-gray-500">{activity.timestamp}</p>
                </div>
                
                <div className="text-right">
                  <p className={`font-bold mb-1 ${
                    activity.type === 'sent' ? 'text-red-500' : 'text-green-500'
                  }`}>
                    {activity.amount}
                  </p>
                  <p className="text-sm text-gray-500">{activity.usdValue}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}