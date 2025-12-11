// File: src/components/Wallet/BalanceCard.tsx
// Afrocentric wallet balance display with The Gift House aesthetic
// Shows multi-asset balances with cultural design elements

import React, { useState } from 'react';
import { Wallet, Eye, EyeOff, TrendingUp, Plus, Send, Download, Sparkles } from 'lucide-react';

// Mock wallet hook (replace with actual import)
const useWallet = () => ({
  balances: [
    { symbol: 'DOT', formattedBalance: '12.5428', decimals: 10, usdValue: 87.89 },
    { symbol: 'USDC', formattedBalance: '100.00', decimals: 6, usdValue: 100.00 },
    { symbol: 'EKENE', formattedBalance: '50.2500', decimals: 4, usdValue: 25.13 }
  ],
  totalUsdValue: 213.02,
  isLoadingBalances: false
});

const BalanceCard = () => {
  const { balances, totalUsdValue, isLoadingBalances } = useWallet();
  const [hideBalances, setHideBalances] = useState(false);
  const [selectedAsset, setSelectedAsset] = useState<string | null>(null);

  // Render individual asset card
  const AssetCard = ({ balance }) => {
    const getAssetColor = (symbol: string) => {
      switch (symbol) {
        case 'DOT':
          return 'from-pink-500 to-purple-600';
        case 'USDC':
          return 'from-blue-500 to-cyan-600';
        case 'EKENE':
          return 'from-amber-500 to-orange-600';
        default:
          return 'from-gray-500 to-gray-700';
      }
    };

    const getAssetIcon = (symbol: string) => {
      switch (symbol) {
        case 'DOT':
          return '●';
        case 'USDC':
          return '$';
        case 'EKENE':
          return '✦';
        default:
          return '◆';
      }
    };

    return (
      <div
        onClick={() => setSelectedAsset(balance.symbol)}
        className="relative overflow-hidden rounded-2xl p-5 cursor-pointer transition-all hover:scale-[1.02] group"
        style={{
          background: 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255,255,255,0.2)'
        }}
      >
        {/* Animated background pattern */}
        <div className="absolute inset-0 opacity-10">
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id={`pattern-${balance.symbol}`} x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
                <circle cx="20" cy="20" r="1.5" fill="white" opacity="0.5" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill={`url(#pattern-${balance.symbol})`} />
          </svg>
        </div>

        {/* Content */}
        <div className="relative z-10">
          <div className="flex items-start justify-between mb-4">
            <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${getAssetColor(balance.symbol)} flex items-center justify-center text-white text-2xl font-bold shadow-lg`}>
              {getAssetIcon(balance.symbol)}
            </div>
            <div className="text-right">
              <div className="text-xs text-gray-400 mb-1">{balance.symbol}</div>
              {!hideBalances && (
                <div className="text-sm font-semibold text-gray-300">
                  ${balance.usdValue.toFixed(2)}
                </div>
              )}
            </div>
          </div>

          <div className="space-y-1">
            <div className="text-2xl font-bold text-white">
              {hideBalances ? '••••' : balance.formattedBalance}
            </div>
            <div className="text-xs text-gray-400">
              Available Balance
            </div>
          </div>

          {/* Quick actions */}
          <div className="flex gap-2 mt-4 pt-4 border-t border-white/10">
            <button className="flex-1 py-2 rounded-lg bg-white/5 hover:bg-white/10 transition-all text-xs text-white font-medium flex items-center justify-center gap-1">
              <Send className="w-3 h-3" />
              Send
            </button>
            <button className="flex-1 py-2 rounded-lg bg-white/5 hover:bg-white/10 transition-all text-xs text-white font-medium flex items-center justify-center gap-1">
              <Download className="w-3 h-3" />
              Receive
            </button>
          </div>
        </div>

        {/* Glow effect on hover */}
        <div className={`absolute inset-0 bg-gradient-to-br ${getAssetColor(balance.symbol)} opacity-0 group-hover:opacity-5 transition-opacity pointer-events-none`} />
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-stone-900 via-amber-950 to-stone-900 p-6">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header with total balance */}
        <div className="relative overflow-hidden rounded-3xl p-8" style={{
          background: 'linear-gradient(135deg, rgba(251,191,36,0.2) 0%, rgba(245,158,11,0.1) 100%)',
          backdropFilter: 'blur(20px)',
          border: '2px solid rgba(251,191,36,0.3)'
        }}>
          {/* Animated tribal pattern background */}
          <div className="absolute inset-0 opacity-5">
            <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern id="tribal-pattern" x="0" y="0" width="60" height="60" patternUnits="userSpaceOnUse">
                  <circle cx="30" cy="30" r="2" fill="white" />
                  <circle cx="15" cy="15" r="1.5" fill="white" />
                  <circle cx="45" cy="15" r="1.5" fill="white" />
                  <circle cx="15" cy="45" r="1.5" fill="white" />
                  <circle cx="45" cy="45" r="1.5" fill="white" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#tribal-pattern)" />
            </svg>
          </div>

          <div className="relative z-10">
            {/* Header row */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-amber-400 to-orange-600 flex items-center justify-center shadow-lg">
                  <Wallet className="w-7 h-7 text-white" />
                </div>
                <div>
                  <h2 className="text-white text-xl font-bold">Your Village Purse</h2>
                  <p className="text-amber-200 text-sm">The Gift House</p>
                </div>
              </div>

              <button
                onClick={() => setHideBalances(!hideBalances)}
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-all"
              >
                {hideBalances ? (
                  <EyeOff className="w-5 h-5 text-white" />
                ) : (
                  <Eye className="w-5 h-5 text-white" />
                )}
              </button>
            </div>

            {/* Total balance */}
            <div className="space-y-2">
              <div className="text-amber-200 text-sm font-medium">Total Balance</div>
              <div className="flex items-baseline gap-3">
                <div className="text-5xl font-bold text-white">
                  {hideBalances ? '••••••' : `$${totalUsdValue.toFixed(2)}`}
                </div>
                {!hideBalances && (
                  <div className="flex items-center gap-1 text-green-400 text-sm font-semibold">
                    <TrendingUp className="w-4 h-4" />
                    +12.5%
                  </div>
                )}
              </div>
            </div>

            {/* Quick actions */}
            <div className="grid grid-cols-3 gap-3 mt-6">
              <button className="py-3 px-4 rounded-xl bg-gradient-to-r from-amber-500 to-orange-600 text-white font-semibold hover:from-amber-600 hover:to-orange-700 transition-all shadow-lg flex items-center justify-center gap-2">
                <Send className="w-4 h-4" />
                Send
              </button>
              <button className="py-3 px-4 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold transition-all flex items-center justify-center gap-2">
                <Download className="w-4 h-4" />
                Receive
              </button>
              <button className="py-3 px-4 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold transition-all flex items-center justify-center gap-2">
                <Plus className="w-4 h-4" />
                Add Funds
              </button>
            </div>
          </div>

          {/* Floating ember particles */}
          <div className="absolute top-1/4 left-1/4 w-2 h-2 rounded-full bg-amber-400 opacity-60 animate-pulse" />
          <div className="absolute top-1/3 right-1/3 w-1.5 h-1.5 rounded-full bg-orange-400 opacity-40 animate-pulse" style={{ animationDelay: '1s' }} />
          <div className="absolute bottom-1/4 right-1/4 w-2.5 h-2.5 rounded-full bg-yellow-400 opacity-50 animate-pulse" style={{ animationDelay: '2s' }} />
        </div>

        {/* Asset cards */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-white text-lg font-semibold">Your Assets</h3>
            {isLoadingBalances && (
              <div className="flex items-center gap-2 text-amber-200 text-sm">
                <div className="w-4 h-4 border-2 border-amber-400 border-t-transparent rounded-full animate-spin" />
                Refreshing...
              </div>
            )}
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {balances.map((balance) => (
              <AssetCard key={balance.symbol} balance={balance} />
            ))}
          </div>
        </div>

        {/* Rewards section */}
        <div className="rounded-2xl p-6 bg-gradient-to-r from-purple-900/30 to-pink-900/30 border border-purple-500/30">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-400 to-pink-500 flex items-center justify-center">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <div>
                <div className="text-white font-semibold">Warmth Rewards</div>
                <div className="text-purple-200 text-sm">45 warmth points earned</div>
              </div>
            </div>
            <button className="px-6 py-2 rounded-full bg-gradient-to-r from-purple-500 to-pink-600 text-white font-semibold hover:from-purple-600 hover:to-pink-700 transition-all">
              Claim
            </button>
          </div>
        </div>

        {/* Recent activity preview */}
        <div className="rounded-2xl p-6 bg-white/5 backdrop-blur-sm border border-white/10">
          <h3 className="text-white font-semibold mb-4">Recent Activity</h3>
          <div className="space-y-3">
            {[
              { type: 'received', from: 'Adewale', amount: '0.5 DOT', time: '2h ago' },
              { type: 'sent', to: 'Chioma', amount: '1.0 EKENE', time: '5h ago' },
              { type: 'received', from: 'Blockchain Lagos', amount: '2.5 DOT', time: '1d ago' }
            ].map((activity, i) => (
              <div key={i} className="flex items-center justify-between py-2">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    activity.type === 'received' ? 'bg-green-500/20 text-green-400' : 'bg-orange-500/20 text-orange-400'
                  }`}>
                    {activity.type === 'received' ? <Download className="w-5 h-5" /> : <Send className="w-5 h-5" />}
                  </div>
                  <div>
                    <div className="text-white text-sm font-medium">
                      {activity.type === 'received' ? `From ${activity.from}` : `To ${activity.to}`}
                    </div>
                    <div className="text-gray-400 text-xs">{activity.time}</div>
                  </div>
                </div>
                <div className="text-white font-semibold">{activity.amount}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BalanceCard;