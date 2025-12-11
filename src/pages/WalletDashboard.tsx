import React, { useState } from 'react';
import { 
  Flame, Eye, EyeOff, Send, Download, RefreshCw, QrCode, 
  TrendingUp, TrendingDown, ArrowUpRight, ArrowDownLeft, 
  Repeat, Gift, Crown, Zap 
} from 'lucide-react';

const EkeneWalletDashboard = () => {
  const [balanceVisible, setBalanceVisible] = useState(true);
  const [activeTab, setActiveTab] = useState('all'); // all, sent, received

  // Mock wallet data
  const walletData = {
    totalBalanceUSD: 892.41,
    totalBalanceDOT: 145.5,
    assets: [
      { 
        id: 'dot', 
        name: 'DOT', 
        fullName: 'Polkadot',
        icon: '🔴', 
        balance: 24.5, 
        usdPrice: 6.12, 
        change24h: 5.3,
        color: 'from-pink-500 to-pink-600' 
      },
      { 
        id: 'ekene', 
        name: 'EKENE', 
        fullName: 'Ekene Token',
        icon: '🔥', 
        balance: 1000, 
        usdPrice: 0.05, 
        change24h: 12.8,
        color: 'from-orange-500 to-amber-500' 
      },
      { 
        id: 'usdt', 
        name: 'USDT', 
        fullName: 'Tether USD',
        icon: '💵', 
        balance: 150.0, 
        usdPrice: 1.0, 
        change24h: 0.01,
        color: 'from-green-500 to-green-600' 
      },
      { 
        id: 'usdc', 
        name: 'USDC', 
        fullName: 'USD Coin',
        icon: '💠', 
        balance: 75.0, 
        usdPrice: 1.0, 
        change24h: -0.02,
        color: 'from-blue-500 to-blue-600' 
      },
    ],
    recentActivity: [
      {
        id: 1,
        type: 'sent',
        to: 'Amina Kwesi',
        toUsername: 'amina_creates',
        amount: 5,
        token: 'DOT',
        usdValue: 30.60,
        timestamp: '2 hours ago',
        message: 'Great workshop! 🔥'
      },
      {
        id: 2,
        type: 'received',
        from: 'Chidi Okafor',
        fromUsername: 'chidi_dev',
        amount: 2.5,
        token: 'DOT',
        usdValue: 15.30,
        timestamp: '5 hours ago',
        message: 'Thanks for the support! ✨'
      },
      {
        id: 3,
        type: 'swap',
        fromToken: 'USDT',
        toToken: 'DOT',
        amount: 50,
        received: 8.16,
        timestamp: '1 day ago'
      },
      {
        id: 4,
        type: 'received',
        from: 'Lagos Blockchain',
        fromUsername: 'lbc_events',
        amount: 100,
        token: 'EKENE',
        usdValue: 5.00,
        timestamp: '2 days ago',
        message: 'Event participation bonus 🎉'
      },
      {
        id: 5,
        type: 'sent',
        to: 'Web3 Africa',
        toUsername: 'web3_africa',
        amount: 10,
        token: 'DOT',
        usdValue: 61.20,
        timestamp: '3 days ago'
      }
    ],
    stats: {
      totalSent: 234,
      totalReceived: 312,
      weeklyStreak: 7,
      badges: 5
    }
  };

  const filteredActivity = walletData.recentActivity.filter(activity => {
    if (activeTab === 'all') return true;
    return activity.type === activeTab;
  });

  const formatNumber = (num) => {
    return new Intl.NumberFormat('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(num);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 pb-24">
      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 bg-orange-200/30 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-amber-200/30 rounded-full blur-3xl animate-float-delayed" />
      </div>

      {/* Header */}
      <div className="relative bg-gradient-to-br from-amber-900 to-orange-800 text-white pt-8 pb-20 px-4 rounded-b-[3rem] shadow-xl">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-2xl animate-pulse-slow" />
        
        <div className="relative z-10 max-w-2xl mx-auto">
          {/* Greeting */}
          <div className="flex items-center gap-2 mb-3">
            <Flame className="w-5 h-5 text-orange-300 animate-flicker" />
            <span className="text-sm font-medium text-orange-100">Nnọọ, Ekene User</span>
          </div>

          {/* Balance */}
          <div className="mb-6">
            <div className="flex items-center justify-center gap-3 mb-2">
              <h1 className="text-5xl font-black">
                {balanceVisible ? `$${formatNumber(walletData.totalBalanceUSD)}` : '••••••'}
              </h1>
              <button
                onClick={() => setBalanceVisible(!balanceVisible)}
                className="w-10 h-10 rounded-full bg-white/20 hover:bg-white/30 transition-colors flex items-center justify-center"
              >
                {balanceVisible ? <Eye className="w-5 h-5" /> : <EyeOff className="w-5 h-5" />}
              </button>
            </div>
            <p className="text-center text-orange-100 text-sm">
              {balanceVisible ? `${formatNumber(walletData.totalBalanceDOT)} DOT` : '•••• DOT'}
            </p>
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-4 gap-3">
            <QuickAction icon={<Send className="w-6 h-6" />} label="Send" color="from-orange-500 to-red-500" />
            <QuickAction icon={<Download className="w-6 h-6" />} label="Receive" color="from-green-500 to-emerald-500" />
            <QuickAction icon={<RefreshCw className="w-6 h-6" />} label="Swap" color="from-amber-500 to-yellow-500" />
            <QuickAction icon={<QrCode className="w-6 h-6" />} label="QR" color="from-purple-500 to-pink-500" />
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-2xl mx-auto px-4 -mt-12">
        {/* Stats Cards */}
        <div className="grid grid-cols-4 gap-3 mb-6">
          <StatCard icon={<ArrowUpRight className="w-4 h-4" />} value={walletData.stats.totalSent} label="Sent" />
          <StatCard icon={<ArrowDownLeft className="w-4 h-4" />} value={walletData.stats.totalReceived} label="Received" />
          <StatCard icon={<Flame className="w-4 h-4" />} value={`${walletData.stats.weeklyStreak}d`} label="Streak" />
          <StatCard icon={<Crown className="w-4 h-4" />} value={walletData.stats.badges} label="Badges" />
        </div>

        {/* Assets Section */}
        <div className="bg-white rounded-3xl shadow-lg p-6 mb-6 border border-orange-100">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-xl font-bold text-amber-900 flex items-center gap-2">
              <Zap className="w-5 h-5 text-orange-500" />
              Your Assets
            </h2>
            <button className="text-sm text-orange-600 font-semibold hover:text-orange-700">
              Manage
            </button>
          </div>

          <div className="space-y-3">
            {walletData.assets.map((asset) => (
              <AssetCard key={asset.id} asset={asset} balanceVisible={balanceVisible} />
            ))}
          </div>
        </div>

        {/* Activity Section */}
        <div className="bg-white rounded-3xl shadow-lg p-6 border border-orange-100">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-xl font-bold text-amber-900 flex items-center gap-2">
              <Gift className="w-5 h-5 text-orange-500" />
              Recent Activity
            </h2>
            <button className="text-sm text-orange-600 font-semibold hover:text-orange-700">
              View All
            </button>
          </div>

          {/* Tabs */}
          <div className="flex gap-2 mb-5 bg-amber-50 p-1 rounded-2xl">
            <TabButton active={activeTab === 'all'} onClick={() => setActiveTab('all')} label="All" />
            <TabButton active={activeTab === 'sent'} onClick={() => setActiveTab('sent')} label="Sent" />
            <TabButton active={activeTab === 'received'} onClick={() => setActiveTab('received')} label="Received" />
          </div>

          {/* Activity List */}
          <div className="space-y-3">
            {filteredActivity.length > 0 ? (
              filteredActivity.map((activity) => (
                <ActivityItem key={activity.id} activity={activity} />
              ))
            ) : (
              <div className="text-center py-8 text-gray-400">
                <p>No {activeTab} transactions yet</p>
              </div>
            )}
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translate(0, 0); }
          50% { transform: translate(30px, -30px); }
        }
        @keyframes float-delayed {
          0%, 100% { transform: translate(0, 0); }
          50% { transform: translate(-20px, 20px); }
        }
        @keyframes pulse-slow {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 0.5; }
        }
        @keyframes flicker {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.7; }
        }
        .animate-float { animation: float 15s ease-in-out infinite; }
        .animate-float-delayed { animation: float-delayed 15s ease-in-out infinite 5s; }
        .animate-pulse-slow { animation: pulse-slow 4s ease-in-out infinite; }
        .animate-flicker { animation: flicker 2s ease-in-out infinite; }
      `}</style>
    </div>
  );
};

// Quick Action Component
const QuickAction = ({ icon, label, color }) => (
  <button className="flex flex-col items-center gap-2 p-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl hover:bg-white/20 transition-all duration-200 hover:scale-105">
    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${color} flex items-center justify-center shadow-lg`}>
      {icon}
    </div>
    <span className="text-xs font-semibold">{label}</span>
  </button>
);

// Stat Card Component
const StatCard = ({ icon, value, label }) => (
  <div className="bg-white rounded-2xl p-4 shadow-md border border-orange-100">
    <div className="flex items-center justify-between mb-2">
      <div className="w-8 h-8 rounded-lg bg-orange-100 flex items-center justify-center text-orange-600">
        {icon}
      </div>
    </div>
    <div className="font-bold text-lg text-amber-900">{value}</div>
    <div className="text-xs text-gray-500">{label}</div>
  </div>
);

// Asset Card Component
const AssetCard = ({ asset, balanceVisible }) => {
  const usdValue = asset.balance * asset.usdPrice;
  const isPositive = asset.change24h > 0;

  return (
    <button className="w-full flex items-center gap-4 p-4 bg-gradient-to-r from-amber-50 to-orange-50 rounded-2xl border border-transparent hover:border-orange-300 transition-all duration-200 hover:shadow-md">
      <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${asset.color} flex items-center justify-center text-2xl shadow-sm`}>
        {asset.icon}
      </div>
      <div className="flex-1 text-left">
        <div className="font-bold text-amber-900">{asset.name}</div>
        <div className="text-sm text-gray-500">{asset.fullName}</div>
      </div>
      <div className="text-right">
        <div className="font-bold text-amber-900">
          {balanceVisible ? asset.balance.toFixed(2) : '••••'}
        </div>
        <div className="text-sm text-gray-500">
          {balanceVisible ? `$${usdValue.toFixed(2)}` : '$••••'}
        </div>
      </div>
      <div className={`flex items-center gap-1 text-sm font-semibold ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
        {isPositive ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
        {Math.abs(asset.change24h)}%
      </div>
    </button>
  );
};

// Tab Button Component
const TabButton = ({ active, onClick, label }) => (
  <button
    onClick={onClick}
    className={`flex-1 py-3 rounded-xl font-semibold text-sm transition-all duration-200 ${
      active
        ? 'bg-white text-amber-900 shadow-sm'
        : 'text-amber-700 hover:bg-amber-100'
    }`}
  >
    {label}
  </button>
);

// Activity Item Component
const ActivityItem = ({ activity }) => {
  const getIcon = () => {
    switch (activity.type) {
      case 'sent':
        return <ArrowUpRight className="w-5 h-5 text-orange-600" />;
      case 'received':
        return <ArrowDownLeft className="w-5 h-5 text-green-600" />;
      case 'swap':
        return <Repeat className="w-5 h-5 text-blue-600" />;
      default:
        return null;
    }
  };

  const getBackgroundColor = () => {
    switch (activity.type) {
      case 'sent':
        return 'bg-orange-100';
      case 'received':
        return 'bg-green-100';
      case 'swap':
        return 'bg-blue-100';
      default:
        return 'bg-gray-100';
    }
  };

  const getAmountColor = () => {
    switch (activity.type) {
      case 'sent':
        return 'text-orange-600';
      case 'received':
        return 'text-green-600';
      case 'swap':
        return 'text-blue-600';
      default:
        return 'text-gray-600';
    }
  };

  return (
    <div className="flex items-center gap-4 p-4 rounded-2xl border border-amber-100 hover:bg-amber-50 transition-colors">
      <div className={`w-12 h-12 rounded-xl ${getBackgroundColor()} flex items-center justify-center flex-shrink-0`}>
        {getIcon()}
      </div>
      <div className="flex-1 min-w-0">
        <div className="font-semibold text-amber-900 truncate">
          {activity.type === 'sent' && `Sent to ${activity.to}`}
          {activity.type === 'received' && `Received from ${activity.from}`}
          {activity.type === 'swap' && `Swapped ${activity.fromToken} → ${activity.toToken}`}
        </div>
        <div className="text-sm text-gray-500">{activity.timestamp}</div>
        {activity.message && (
          <div className="text-sm text-gray-600 italic mt-1 truncate">"{activity.message}"</div>
        )}
      </div>
      <div className="text-right">
        <div className={`font-bold ${getAmountColor()}`}>
          {activity.type === 'swap' 
            ? `${activity.received} ${activity.toToken}`
            : `${activity.type === 'sent' ? '-' : '+'}${activity.amount} ${activity.token}`
          }
        </div>
        {activity.usdValue && (
          <div className="text-sm text-gray-500">${activity.usdValue.toFixed(2)}</div>
        )}
      </div>
    </div>
  );
};

export default EkeneWalletDashboard;