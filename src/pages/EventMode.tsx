/**
 * ============================================================================
 * Ekene - Event Mode Component
 * ============================================================================
 * Location: src/pages/EventMode.tsx
 * 
 * QR scanning and live tipping for events
 * 
 * Styles: src/styles/components/_event-mode.scss
 */

import { useState } from 'react';
import { 
  QrCode, 
  Users, 
  Camera, 
  Upload, 
  Share2,
  X 
} from 'lucide-react';

// Types
interface RecentScan {
  id: string;
  name: string;
  username: string;
  avatar: string;
  amount: string;
  timestamp: string;
}

export function EventMode() {
  const [isScanning, setIsScanning] = useState<boolean>(false);
  const [showMyQR, setShowMyQR] = useState<boolean>(false);
  
  // Mock recent scans data
  const [recentScans] = useState<RecentScan[]>([
    {
      id: '1',
      name: 'Sarah Chen',
      username: '@sarah_creates',
      avatar: '🎨',
      amount: '+5.0 DOT',
      timestamp: '2 min ago'
    },
    {
      id: '2',
      name: 'Alex Rivera',
      username: '@alex_dev',
      avatar: '💻',
      amount: '+3.5 DOT',
      timestamp: '5 min ago'
    },
    {
      id: '3',
      name: 'Maya Johnson',
      username: '@maya_music',
      avatar: '🎵',
      amount: '+10.0 DOT',
      timestamp: '12 min ago'
    }
  ]);

  const handleScanQR = () => {
    setIsScanning(true);
    // TODO: Implement QR scanner
    console.log('Starting QR scanner...');
  };

  const handleUploadQR = () => {
    // TODO: Implement QR upload from gallery
    console.log('Upload QR from gallery...');
  };

  const handleShowMyQR = () => {
    setShowMyQR(true);
  };

  const handleShareQR = () => {
    // TODO: Implement share functionality
    console.log('Sharing QR code...');
  };

  return (
    <div className="event-mode">
      <div className="event-mode__content">
        {/* Header */}
        <div className="event-mode__header">
          <div className="event-mode__badge">
            <Users />
            Event Mode
          </div>
          <h1 className="event-mode__title">Scan & Tip</h1>
          <p className="event-mode__subtitle">
            Tip creators instantly at events
          </p>
        </div>

        {/* QR Scanner */}
        <div className="event-mode__scanner-wrapper">
          <div className="event-mode__scanner">
            <div className="event-mode__scanner-frame">
              <div className="event-mode__scanner-corners"></div>
              {isScanning && <div className="event-mode__scan-line"></div>}
              <div className="event-mode__qr-icon">
                <QrCode />
              </div>
            </div>
          </div>

          <div className="event-mode__instructions">
            <p>Position QR code within the frame</p>
            <small>Or upload from your gallery</small>
          </div>

          {/* Actions */}
          <div className="event-mode__actions">
            <button 
              className="event-mode__action-btn event-mode__action-btn--primary"
              onClick={handleScanQR}
            >
              <Camera />
              <span>Scan QR</span>
            </button>
            <button 
              className="event-mode__action-btn"
              onClick={handleUploadQR}
            >
              <Upload />
              <span>Upload</span>
            </button>
            <button 
              className="event-mode__action-btn"
              onClick={handleShowMyQR}
            >
              <QrCode />
              <span>My QR</span>
            </button>
          </div>

          {/* Recent Scans */}
          {recentScans.length > 0 && (
            <div className="event-mode__recent">
              <h3 className="event-mode__recent-title">Recent Scans</h3>
              <div className="event-mode__recent-list">
                {recentScans.map((scan) => (
                  <div key={scan.id} className="recent-scan-item">
                    <div className="recent-scan-item__avatar">
                      {scan.avatar}
                    </div>
                    <div className="recent-scan-item__info">
                      <div className="recent-scan-item__name">{scan.name}</div>
                      <div className="recent-scan-item__time">{scan.timestamp}</div>
                    </div>
                    <div className="recent-scan-item__amount">
                      {scan.amount}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* My QR Code Modal */}
      {showMyQR && (
        <MyQRModal 
          onClose={() => setShowMyQR(false)}
          onShare={handleShareQR}
        />
      )}
    </div>
  );
}

// ============================================================================
// MY QR CODE MODAL SUB-COMPONENT
// ============================================================================

interface MyQRModalProps {
  onClose: () => void;
  onShare: () => void;
}

function MyQRModal({ onClose, onShare }: MyQRModalProps) {
  // TODO: Replace with actual user data
  const username = '@yourusername';

  return (
    <div className="my-qr-modal__overlay" onClick={onClose}>
      <div 
        className="my-qr-modal__content"
        onClick={(e) => e.stopPropagation()}
      >
        <button className="my-qr-modal__close" onClick={onClose}>
          <X />
        </button>

        <h2 className="my-qr-modal__title">Your QR Code</h2>
        <p className="my-qr-modal__subtitle">
          Others can scan this to tip you
        </p>

        <div className="my-qr-modal__qr-container">
          <div className="my-qr-modal__qr-code">
            {/* TODO: Replace with actual QR code generation */}
            <QrCode />
          </div>
          <div className="my-qr-modal__username">{username}</div>
        </div>

        <button className="my-qr-modal__share-btn" onClick={onShare}>
          <Share2 />
          Share QR Code
        </button>
      </div>
    </div>
  );
}