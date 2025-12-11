// File: src/services/events/EventService.ts
// Event mode service for QR scanning, NFC tapping, and live event experiences
// Handles event entry, speaker tipping, networking, and collectible minting

import { walletService } from '../wallet/WalletService';

// ============================================================================
// TYPE DEFINITIONS
// ============================================================================

export interface EkeneEvent {
  id: string;
  title: string;
  description: string;
  venue: string;
  date: Date;
  endDate?: Date;
  bannerUrl?: string;
  
  // Host information
  hosts: EventHost[];
  
  // Event settings
  isActive: boolean;
  requiresTicket: boolean;
  ticketPrice?: string;
  ticketAsset?: string;
  
  // Attendance tracking
  attendeeCount: number;
  totalTipsReceived: string;
  
  // Collectibles
  attendanceBadge?: EventBadge;
  sessionBadges?: EventBadge[];
  
  // Social
  socialLinks?: {
    twitter?: string;
    telegram?: string;
    discord?: string;
  };
}

export interface EventHost {
  address: string;
  name: string;
  role: string; // Speaker, Organizer, Sponsor
  bio?: string;
  avatar?: string;
  twitterHandle?: string;
  
  // Stats for this event
  tipsReceived: string;
  supporterCount: number;
}

export interface EventBadge {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
  issuedCount: number;
}

export interface EventSession {
  id: string;
  eventId: string;
  title: string;
  speaker: EventHost;
  startTime: Date;
  endTime: Date;
  description?: string;
  isLive: boolean;
}

export interface AttendanceRecord {
  eventId: string;
  userAddress: string;
  entryTime: Date;
  sessionsAttended: string[];
  tipsSent: string;
  badgesCollected: string[];
  warmthEarned: number;
}

export interface LiveTipActivity {
  from: string;
  fromName?: string;
  to: string;
  toName: string;
  amount: string;
  asset: string;
  timestamp: Date;
  message?: string;
}

// ============================================================================
// EVENT SERVICE CLASS
// ============================================================================

export class EkeneEventService {
  private activeEvent: EkeneEvent | null = null;
  private attendanceRecord: AttendanceRecord | null = null;
  private liveTipFeed: LiveTipActivity[] = [];
  private websocket: WebSocket | null = null;

  // --------------------------------------------------------------------------
  // EVENT SCANNING & ENTRY
  // --------------------------------------------------------------------------

  /**
   * Scan QR code at event venue to enter
   */
  async scanEventQR(qrData: string): Promise<EkeneEvent> {
    try {
      const eventData = JSON.parse(qrData);
      
      if (eventData.type !== 'ekene-event') {
        throw new Error('Invalid Ekene event QR code');
      }

      // Fetch full event details from backend
      const event = await this.fetchEventDetails(eventData.eventId);
      
      // Auto-enter the event
      await this.enterEvent(event);
      
      return event;
    } catch (error) {
      console.error('❌ Failed to scan event QR:', error);
      throw new Error('Failed to scan event QR code');
    }
  }

  /**
   * Enter event and start tracking attendance
   */
  async enterEvent(event: EkeneEvent): Promise<void> {
    const account = walletService.getCurrentAccount();
    if (!account) {
      throw new Error('Please connect wallet to enter event');
    }

    try {
      this.activeEvent = event;
      
      // Create attendance record
      this.attendanceRecord = {
        eventId: event.id,
        userAddress: account.address,
        entryTime: new Date(),
        sessionsAttended: [],
        tipsSent: '0',
        badgesCollected: [],
        warmthEarned: 1 // Base warmth for attendance
      };

      // Mint attendance badge if available
      if (event.attendanceBadge) {
        await this.mintBadge(event.attendanceBadge);
      }

      // Connect to live feed websocket
      this.connectLiveFeed(event.id);

      console.log('🎉 Entered event:', event.title);
    } catch (error) {
      console.error('❌ Failed to enter event:', error);
      throw error;
    }
  }

  /**
   * Fetch event details from backend
   */
  private async fetchEventDetails(eventId: string): Promise<EkeneEvent> {
    // TODO: Replace with actual API call
    const response = await fetch(`/api/events/${eventId}`);
    if (!response.ok) throw new Error('Event not found');
    return response.json();
  }

  /**
   * NFC tap to enter event (for mobile)
   */
  async tapNFC(nfcData: any): Promise<EkeneEvent> {
    // NFC typically contains same data as QR
    const qrEquivalent = JSON.stringify(nfcData);
    return this.scanEventQR(qrEquivalent);
  }

  /**
   * Enter via short URL (ekene.app/@event-name)
   */
  async enterViaUrl(eventSlug: string): Promise<EkeneEvent> {
    try {
      const response = await fetch(`/api/events/slug/${eventSlug}`);
      if (!response.ok) throw new Error('Event not found');
      
      const event = await response.json();
      await this.enterEvent(event);
      
      return event;
    } catch (error) {
      console.error('❌ Failed to enter via URL:', error);
      throw error;
    }
  }

  // --------------------------------------------------------------------------
  // SPEAKER TIPPING
  // --------------------------------------------------------------------------

  /**
   * Tip a speaker at the event
   */
  async tipSpeaker(params: {
    speaker: EventHost;
    amount: string;
    asset: string;
    message?: string;
  }): Promise<void> {
    if (!this.activeEvent) {
      throw new Error('No active event');
    }

    try {
      // Send tip via wallet service
      await walletService.sendTip({
        to: params.speaker.address,
        asset: params.asset,
        amount: params.amount,
        message: params.message
      });

      // Update attendance record
      if (this.attendanceRecord) {
        const currentTips = BigInt(this.attendanceRecord.tipsSent);
        const newTip = BigInt(params.amount);
        this.attendanceRecord.tipsSent = (currentTips + newTip).toString();
        this.attendanceRecord.warmthEarned += 3; // +3 warmth for tipping
      }

      // Broadcast to live feed
      this.broadcastTipActivity({
        from: walletService.getCurrentAccount()?.address || '',
        to: params.speaker.address,
        toName: params.speaker.name,
        amount: params.amount,
        asset: params.asset,
        message: params.message,
        timestamp: new Date()
      });

      console.log('🔥 Speaker tipped:', params.speaker.name);
    } catch (error) {
      console.error('❌ Failed to tip speaker:', error);
      throw error;
    }
  }

  /**
   * Quick tip with preset amounts
   */
  async quickTipSpeaker(speaker: EventHost, preset: number): Promise<void> {
    const account = walletService.getCurrentAccount();
    if (!account) throw new Error('No account connected');

    // Use DOT as default asset
    const decimals = 10;
    const amount = (preset * Math.pow(10, decimals)).toString();

    await this.tipSpeaker({
      speaker,
      amount,
      asset: 'DOT',
      message: 'Ekene! 🔥'
    });
  }

  // --------------------------------------------------------------------------
  // SESSION TRACKING
  // --------------------------------------------------------------------------

  /**
   * Check into a session
   */
  async checkIntoSession(session: EventSession): Promise<void> {
    if (!this.attendanceRecord) {
      throw new Error('Not registered for event');
    }

    try {
      // Add session to attendance record
      if (!this.attendanceRecord.sessionsAttended.includes(session.id)) {
        this.attendanceRecord.sessionsAttended.push(session.id);
        this.attendanceRecord.warmthEarned += 2; // +2 warmth per session
      }

      // Mint session badge if available
      const sessionBadge = this.activeEvent?.sessionBadges?.find(
        b => b.id === session.id
      );
      if (sessionBadge) {
        await this.mintBadge(sessionBadge);
      }

      console.log('✅ Checked into session:', session.title);
    } catch (error) {
      console.error('❌ Failed to check into session:', error);
      throw error;
    }
  }

  /**
   * Get current live session
   */
  getCurrentSession(): EventSession | null {
    if (!this.activeEvent) return null;

    // TODO: Fetch from API based on current time
    return null;
  }

  // --------------------------------------------------------------------------
  // LIVE FEED & NETWORKING
  // --------------------------------------------------------------------------

  /**
   * Connect to live event feed via WebSocket
   */
  private connectLiveFeed(eventId: string): void {
    try {
      this.websocket = new WebSocket(`wss://api.ekene.app/events/${eventId}/live`);

      this.websocket.onmessage = (event) => {
        const activity: LiveTipActivity = JSON.parse(event.data);
        this.liveTipFeed.unshift(activity);
        
        // Keep only last 50 tips
        if (this.liveTipFeed.length > 50) {
          this.liveTipFeed = this.liveTipFeed.slice(0, 50);
        }
      };

      this.websocket.onerror = (error) => {
        console.error('❌ WebSocket error:', error);
      };

      console.log('📡 Connected to live feed');
    } catch (error) {
      console.error('❌ Failed to connect to live feed:', error);
    }
  }

  /**
   * Broadcast tip activity to live feed
   */
  private broadcastTipActivity(activity: LiveTipActivity): void {
    if (this.websocket?.readyState === WebSocket.OPEN) {
      this.websocket.send(JSON.stringify(activity));
    }
  }

  /**
   * Get live tip feed
   */
  getLiveFeed(): LiveTipActivity[] {
    return this.liveTipFeed;
  }

  /**
   * Share your badge with nearby attendees (NFC/QR)
   */
  async shareNetworkingCard(): Promise<string> {
    const account = walletService.getCurrentAccount();
    if (!account) throw new Error('No account connected');

    return JSON.stringify({
      type: 'ekene-networking',
      address: account.address,
      name: account.name,
      eventId: this.activeEvent?.id,
      badges: this.attendanceRecord?.badgesCollected || []
    });
  }

  /**
   * Scan another attendee's networking card
   */
  async scanNetworkingCard(qrData: string): Promise<void> {
    try {
      const cardData = JSON.parse(qrData);
      
      if (cardData.type !== 'ekene-networking') {
        throw new Error('Invalid networking card');
      }

      // TODO: Save contact, send connection request
      console.log('🤝 Scanned:', cardData.name);
    } catch (error) {
      console.error('❌ Failed to scan networking card:', error);
      throw error;
    }
  }

  // --------------------------------------------------------------------------
  // BADGES & COLLECTIBLES
  // --------------------------------------------------------------------------

  /**
   * Mint event badge as NFT
   */
  private async mintBadge(badge: EventBadge): Promise<void> {
    if (!this.attendanceRecord) return;

    try {
      // TODO: Actual NFT minting on Polkadot
      // For now, just track locally
      this.attendanceRecord.badgesCollected.push(badge.id);
      this.attendanceRecord.warmthEarned += this.getBadgeWarmth(badge.rarity);

      console.log('🎖️ Badge minted:', badge.name);
    } catch (error) {
      console.error('❌ Failed to mint badge:', error);
    }
  }

  /**
   * Get warmth value for badge rarity
   */
  private getBadgeWarmth(rarity: string): number {
    switch (rarity) {
      case 'legendary': return 10;
      case 'epic': return 5;
      case 'rare': return 3;
      case 'common': return 1;
      default: return 1;
    }
  }

  /**
   * Get all collectibles for current user
   */
  getMyCollectibles(): EventBadge[] {
    if (!this.attendanceRecord) return [];

    // TODO: Fetch actual badge details
    return [];
  }

  // --------------------------------------------------------------------------
  // REWARDS & WARMTH
  // --------------------------------------------------------------------------

  /**
   * Get total warmth earned at event
   */
  getWarmthEarned(): number {
    return this.attendanceRecord?.warmthEarned || 0;
  }

  /**
   * Claim event rewards
   */
  async claimRewards(): Promise<void> {
    if (!this.attendanceRecord) {
      throw new Error('No attendance record');
    }

    const warmth = this.attendanceRecord.warmthEarned;
    
    try {
      // TODO: Actual reward distribution
      // Could be tokens, NFTs, or other perks
      
      console.log('🎁 Claimed rewards for', warmth, 'warmth');
    } catch (error) {
      console.error('❌ Failed to claim rewards:', error);
      throw error;
    }
  }

  // --------------------------------------------------------------------------
  // STATE MANAGEMENT
  // --------------------------------------------------------------------------

  /**
   * Get active event
   */
  getActiveEvent(): EkeneEvent | null {
    return this.activeEvent;
  }

  /**
   * Get attendance record
   */
  getAttendanceRecord(): AttendanceRecord | null {
    return this.attendanceRecord;
  }

  /**
   * Leave event and cleanup
   */
  leaveEvent(): void {
    if (this.websocket) {
      this.websocket.close();
      this.websocket = null;
    }

    this.activeEvent = null;
    this.attendanceRecord = null;
    this.liveTipFeed = [];

    console.log('👋 Left event');
  }

  /**
   * Check if currently at an event
   */
  isAtEvent(): boolean {
    return this.activeEvent !== null;
  }
}

// ============================================================================
// SINGLETON EXPORT
// ============================================================================

export const eventService = new EkeneEventService();

// ============================================================================
// USAGE EXAMPLE
// ============================================================================

/*
// Scan QR code at event entrance
const qrData = "...scanned QR data...";
const event = await eventService.scanEventQR(qrData);

// Or enter via URL
const event = await eventService.enterViaUrl('lagos-blockchain-fest');

// Tip a speaker
await eventService.tipSpeaker({
  speaker: event.hosts[0],
  amount: '5000000000', // 0.5 DOT
  asset: 'DOT',
  message: 'Amazing talk! 🔥'
});

// Check into a session
const session = eventService.getCurrentSession();
if (session) {
  await eventService.checkIntoSession(session);
}

// Get live feed
const liveFeed = eventService.getLiveFeed();

// Share your networking card
const cardQR = await eventService.shareNetworkingCard();

// Check warmth earned
const warmth = eventService.getWarmthEarned();

// Leave event
eventService.leaveEvent();
*/