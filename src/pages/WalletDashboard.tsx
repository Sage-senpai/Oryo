
//Location: src/pages/WalletDashboard.tsx
 

import { useState } from 'react';
import { 
  Send, 
  Download, 
  Repeat, 
  QrCode,
  ArrowUpRight,
  ArrowDownLeft,
  TrendingUp,
  TrendingDown 
} from 'lucide-react';

// Types
interface Asset {
  id: string;
  name: string;
  symbol: string;
  icon: string;
  balance: string;
  usdValue: string;
  change24h: number;
  color: 'orange' | 'blue' | 'green';
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
  // Mock data - replace with real wallet data
  const [totalBalance] = useState<number>(1247.82);
  const [assets] = useState<Asset[]>([
    {
      id: '1',
      name: 'Polkadot',
      symbol: 'DOT',
      icon: '⚫',
      balance: '145.23',
      usdValue: '$891.41',
      change24h: 5.2,
      color: 'orange'
    },
    {
      id: '2',
      name: 'ORYO Token',
      symbol: 'ORYO',
      icon: '🔥',
      balance: '2,450',
      usdValue: '$245.00',
      change24h: -2.1,
      color: 'blue'
    },
    {
      id: '3',
      name: 'USDT',
      symbol: 'USDT',
      icon: '💵',
      balance: '111.41',
      usdValue: '$111.41',
      change24h: 0.0,
      color: 'green'
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

  const getActivityIcon = (type: Activity['type']) => {
    switch (type) {
      case 'sent':
        return <ArrowUpRight />;
      case 'received':
        return <ArrowDownLeft />;
      case 'swap':
        return <Repeat />;
    }
  };

  const getAssetColorClass = (color: Asset['color']) => {
    switch (color) {
      case 'blue':
        return 'asset-card__icon--blue';
      case 'green':
        return 'asset-card__icon--green';
      default:
        return '';
    }
  };

  return (
    <div className="wallet-dashboard">
      {/* Header Section - "Your Hearth Balance" */}
      <div className="wallet-dashboard__header">
        <div className="wallet-dashboard__greeting">Your Hearth Balance</div>
        <div className="wallet-dashboard__balance">
          ${totalBalance.toLocaleString('en-US', { minimumFractionDigits: 2 })}
        </div>
        <div className="wallet-dashboard__usd">≈ {(totalBalance / 6.13).toFixed(2)} DOT</div>

        {/* Quick Actions */}
        <div className="wallet-dashboard__actions">
          <button 
            className="wallet-dashboard__action-btn"
            onClick={() => handleActionClick('send')}
          >
            <Send />
            <span>Send</span>
          </button>
          <button 
            className="wallet-dashboard__action-btn"
            onClick={() => handleActionClick('receive')}
          >
            <Download />
            <span>Receive</span>
          </button>
          <button 
            className="wallet-dashboard__action-btn"
            onClick={() => handleActionClick('swap')}
          >
            <Repeat />
            <span>Swap</span>
          </button>
          <button 
            className="wallet-dashboard__action-btn"
            onClick={() => handleActionClick('qr')}
          >
            <QrCode />
            <span>QR Code</span>
          </button>
        </div>
      </div>

      {/* Content Section */}
      <div className="wallet-dashboard__content">
        {/* Assets Section */}
        <div className="wallet-dashboard__assets">
          <h2 className="wallet-dashboard__section-title">
            Your Assets
            <a href="#" className="wallet-dashboard__view-all">View All</a>
          </h2>

          <div className="wallet-dashboard__assets-list">
            {assets.map((asset) => (
              <div key={asset.id} className="asset-card">
                <div className={`asset-card__icon ${getAssetColorClass(asset.color)}`}>
                  {asset.icon}
                </div>
                <div className="asset-card__info">
                  <div className="asset-card__name">{asset.name}</div>
                  <div className="asset-card__amount">{asset.balance} {asset.symbol}</div>
                </div>
                <div className="asset-card__value">
                  <div className="asset-card__price">{asset.usdValue}</div>
                  <div className={`asset-card__change ${asset.change24h >= 0 ? 'asset-card__change--up' : 'asset-card__change--down'}`}>
                    {asset.change24h >= 0 ? <TrendingUp className="inline w-3 h-3" /> : <TrendingDown className="inline w-3 h-3" />}
                    {' '}{Math.abs(asset.change24h)}%
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Activity Section */}
        <div className="wallet-dashboard__assets">
          <h2 className="wallet-dashboard__section-title">
            Recent Activity
            <a href="#" className="wallet-dashboard__view-all">View All</a>
          </h2>

          <div className="wallet-dashboard__activity-list">
            {recentActivity.map((activity) => (
              <div key={activity.id} className="activity-card">
                <div className={`activity-card__icon activity-card__icon--${activity.type}`}>
                  {getActivityIcon(activity.type)}
                </div>
                <div className="activity-card__info">
                  <div className="activity-card__title">{activity.title}</div>
                  <div className="activity-card__time">{activity.timestamp}</div>
                </div>
                <div className="activity-card__amount">
                  <div className={`activity-card__value activity-card__value--${activity.type === 'sent' ? 'sent' : 'received'}`}>
                    {activity.amount}
                  </div>
                  <div className="activity-card__usd">{activity.usdValue}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}