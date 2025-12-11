// File: src/services/wallet/WalletService.ts
// Core wallet service - FIXED EXPORTS
// All types properly exported for use in WalletContext

import { ApiPromise, WsProvider } from '@polkadot/api';
import { Keyring } from '@polkadot/keyring';
import { cryptoWaitReady } from '@polkadot/util-crypto';
import { u8aToHex } from '@polkadot/util';

// ============================================================================
// TYPE DEFINITIONS - ALL EXPORTED
// ============================================================================

export interface EkeneAccount {
  address: string;
  publicKey: string;
  name?: string;
  avatar?: string;
  isTemporary: boolean;
  createdAt: number;
  source: 'ekene' | 'talisman' | 'subwallet' | 'polkadot-js' | 'nova' | 'bitget';
}

export interface AssetBalance {
  symbol: string;
  chainId: string;
  balance: string;
  formattedBalance: string;
  decimals: number;
  usdValue?: number;
}

export interface TipTransaction {
  from: string;
  to: string;
  asset: string;
  amount: string;
  message?: string;
  timestamp: number;
  txHash?: string;
  status: 'pending' | 'confirmed' | 'failed';
}

export interface WalletConfig {
  relayChainWs: string;
  parachainEndpoints: Record<string, string>;
  defaultChainId: string;
}

// ============================================================================
// WALLET SERVICE CLASS
// ============================================================================

export class EkeneWalletService {
  private api: ApiPromise | null = null;
  private keyring: Keyring | null = null;
  private currentAccount: EkeneAccount | null = null;
  private config: WalletConfig;
  private parachainApis: Map<string, ApiPromise> = new Map();

  constructor(config: WalletConfig) {
    this.config = config;
  }

  // --------------------------------------------------------------------------
  // INITIALIZATION
  // --------------------------------------------------------------------------

  async initialize(): Promise<void> {
    try {
      await cryptoWaitReady();
      
      const provider = new WsProvider(this.config.relayChainWs);
      this.api = await ApiPromise.create({ provider });
      
      this.keyring = new Keyring({ type: 'sr25519', ss58Format: 42 });
      
      console.log('✅ Ekene Wallet Service initialized');
    } catch (error) {
      console.error('❌ Failed to initialize wallet service:', error);
      throw new Error('Wallet initialization failed');
    }
  }

  async connectToParachain(chainId: string): Promise<ApiPromise> {
    if (this.parachainApis.has(chainId)) {
      return this.parachainApis.get(chainId)!;
    }

    const endpoint = this.config.parachainEndpoints[chainId];
    if (!endpoint) {
      throw new Error(`No endpoint configured for chain ${chainId}`);
    }

    const provider = new WsProvider(endpoint);
    const api = await ApiPromise.create({ provider });
    this.parachainApis.set(chainId, api);
    
    return api;
  }

  // --------------------------------------------------------------------------
  // WALLETLESS ONBOARDING
  // --------------------------------------------------------------------------

  async createTemporaryAccount(userName?: string): Promise<EkeneAccount> {
    if (!this.keyring) {
      throw new Error('Wallet service not initialized');
    }

    try {
      const mnemonic = this.generateMnemonic();
      const pair = this.keyring.addFromMnemonic(mnemonic);
      
      const account: EkeneAccount = {
        address: pair.address,
        publicKey: u8aToHex(pair.publicKey),
        name: userName || 'Ekene User',
        avatar: '👤',
        isTemporary: true,
        createdAt: Date.now(),
        source: 'ekene'
      };

      this.storeTemporaryAccount(mnemonic, account);
      this.currentAccount = account;
      
      console.log('🎉 Temporary account created:', account.address);
      return account;
    } catch (error) {
      console.error('❌ Failed to create temporary account:', error);
      throw error;
    }
  }

  private generateMnemonic(): string {
    const { mnemonicGenerate } = require('@polkadot/util-crypto');
    return mnemonicGenerate(12);
  }

  private storeTemporaryAccount(mnemonic: string, account: EkeneAccount): void {
    const encrypted = this.simpleEncrypt(mnemonic);
    
    localStorage.setItem('ekene_temp_account', JSON.stringify({
      encrypted,
      account
    }));
  }

  private simpleEncrypt(data: string): string {
    return btoa(data);
  }

  private simpleDecrypt(encrypted: string): string {
    return atob(encrypted);
  }

  // --------------------------------------------------------------------------
  // WALLET CONNECTION
  // --------------------------------------------------------------------------

  async connectTalisman(): Promise<EkeneAccount> {
    const { web3Enable, web3Accounts } = await import('@polkadot/extension-dapp');
    
    const extensions = await web3Enable('Ekene');
    if (extensions.length === 0) {
      throw new Error('No Polkadot extension found. Please install Talisman.');
    }

    const accounts = await web3Accounts();
    if (accounts.length === 0) {
      throw new Error('No accounts found in Talisman');
    }

    const account: EkeneAccount = {
      address: accounts[0].address,
      publicKey: '',
      name: accounts[0].meta.name || 'Talisman Account',
      avatar: '👤',
      isTemporary: false,
      createdAt: Date.now(),
      source: 'talisman'
    };

    this.currentAccount = account;
    return account;
  }

  async connectSubwallet(): Promise<EkeneAccount> {
    return this.connectTalisman();
  }

  async connectPolkadotJs(): Promise<EkeneAccount> {
    return this.connectTalisman();
  }

  async connectNova(): Promise<EkeneAccount> {
    throw new Error('Nova Wallet connection not yet implemented');
  }

  async connectBitget(): Promise<EkeneAccount> {
    throw new Error('Bitget Wallet connection not yet implemented');
  }

  // --------------------------------------------------------------------------
  // BALANCE MANAGEMENT
  // --------------------------------------------------------------------------

  async getBalances(address?: string): Promise<AssetBalance[]> {
    if (!this.api) throw new Error('API not initialized');
    
    const targetAddress = address || this.currentAccount?.address;
    if (!targetAddress) throw new Error('No account selected');

    const balances: AssetBalance[] = [];

    try {
      const { data: relayBalance } = await this.api.query.system.account(targetAddress);
      balances.push({
        symbol: 'DOT',
        chainId: 'relay',
        balance: relayBalance.free.toString(),
        formattedBalance: this.formatBalance(relayBalance.free.toString(), 10),
        decimals: 10,
        usdValue: 0
      });

      return balances;
    } catch (error) {
      console.error('❌ Failed to fetch balances:', error);
      return [];
    }
  }

  private formatBalance(balance: string, decimals: number): string {
    const num = BigInt(balance);
    const divisor = BigInt(10 ** decimals);
    const integer = num / divisor;
    const fraction = num % divisor;
    
    return `${integer}.${fraction.toString().padStart(decimals, '0').slice(0, 4)}`;
  }

  // --------------------------------------------------------------------------
  // SENDING GRATITUDE
  // --------------------------------------------------------------------------

  async sendTip(params: {
    to: string;
    asset: string;
    amount: string;
    message?: string;
  }): Promise<TipTransaction> {
    if (!this.api) throw new Error('API not initialized');
    if (!this.currentAccount) throw new Error('No account connected');

    const tx: TipTransaction = {
      from: this.currentAccount.address,
      to: params.to,
      asset: params.asset,
      amount: params.amount,
      message: params.message,
      timestamp: Date.now(),
      status: 'pending'
    };

    try {
      const pair = await this.getSigningPair();
      
      const transfer = this.api.tx.balances.transfer(
        params.to,
        params.amount
      );

      const hash = await transfer.signAndSend(pair);
      
      tx.txHash = hash.toString();
      tx.status = 'confirmed';
      
      console.log('🔥 Ekene sent! Hash:', hash.toString());
      return tx;
    } catch (error) {
      console.error('❌ Failed to send tip:', error);
      tx.status = 'failed';
      throw error;
    }
  }

  private async getSigningPair(): Promise<any> {
    if (!this.keyring || !this.currentAccount) {
      throw new Error('No account available for signing');
    }

    if (this.currentAccount.isTemporary) {
      const stored = localStorage.getItem('ekene_temp_account');
      if (!stored) throw new Error('Temporary account not found');
      
      const { encrypted } = JSON.parse(stored);
      const mnemonic = this.simpleDecrypt(encrypted);
      return this.keyring.addFromMnemonic(mnemonic);
    } else {
      const { web3FromAddress } = await import('@polkadot/extension-dapp');
      const injector = await web3FromAddress(this.currentAccount.address);
      return injector.signer;
    }
  }

  // --------------------------------------------------------------------------
  // RECEIVING GRATITUDE
  // --------------------------------------------------------------------------

  generateReceiveQR(): string {
    if (!this.currentAccount) throw new Error('No account connected');
    
    return JSON.stringify({
      type: 'ekene-receive',
      address: this.currentAccount.address,
      name: this.currentAccount.name,
      version: '1.0'
    });
  }

  generateReceiveLink(): string {
    if (!this.currentAccount) throw new Error('No account connected');
    
    const username = this.currentAccount.name?.toLowerCase().replace(/\s+/g, '-');
    return `https://ekene.app/@${username}`;
  }

  // --------------------------------------------------------------------------
  // ACCOUNT MANAGEMENT
  // --------------------------------------------------------------------------

  getCurrentAccount(): EkeneAccount | null {
    return this.currentAccount;
  }

  disconnect(): void {
    this.currentAccount = null;
    console.log('👋 Account disconnected');
  }

  isConnected(): boolean {
    return this.currentAccount !== null;
  }

  // --------------------------------------------------------------------------
  // CLEANUP
  // --------------------------------------------------------------------------

  async cleanup(): Promise<void> {
    if (this.api) {
      await this.api.disconnect();
    }
    
    for (const [, api] of this.parachainApis) {
      await api.disconnect();
    }
    
    this.parachainApis.clear();
    this.currentAccount = null;
    
    console.log('🧹 Wallet service cleaned up');
  }
}

// ============================================================================
// SINGLETON INSTANCE EXPORT
// ============================================================================

export const walletService = new EkeneWalletService({
  relayChainWs: 'wss://rpc.polkadot.io',
  parachainEndpoints: {
    'asset-hub': 'wss://polkadot-asset-hub-rpc.polkadot.io',
    'hydration': 'wss://rpc.hydradx.cloud',
  },
  defaultChainId: 'relay'
});

// ============================================================================
// DEFAULT EXPORT
// ============================================================================

export default walletService;