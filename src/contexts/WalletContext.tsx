// File: src/contexts/WalletContext.tsx
// React Context Provider - FIXED IMPORTS
// Properly imports all types from WalletService

import React, { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';

// Import types and service
import type {
  EkeneAccount,
  AssetBalance,
  TipTransaction
} from '../services/wallet/WalletService';

import { walletService } from '../services/wallet/WalletService';

// ============================================================================
// CONTEXT TYPE DEFINITIONS
// ============================================================================

export interface WalletContextState {
  // Account State
  account: EkeneAccount | null;
  isConnected: boolean;
  isInitializing: boolean;
  
  // Balance State
  balances: AssetBalance[];
  isLoadingBalances: boolean;
  totalUsdValue: number;
  
  // Transaction State
  pendingTx: TipTransaction | null;
  recentTips: TipTransaction[];
  
  // Connection Methods
  createTemporaryAccount: (userName?: string) => Promise<void>;
  connectTalisman: () => Promise<void>;
  connectSubwallet: () => Promise<void>;
  connectPolkadotJs: () => Promise<void>;
  connectNova: () => Promise<void>;
  connectBitget: () => Promise<void>;
  disconnect: () => void;
  
  // Transaction Methods
  sendTip: (params: SendTipParams) => Promise<TipTransaction>;
  refreshBalances: () => Promise<void>;
  
  // Receive Methods
  getReceiveQR: () => string;
  getReceiveLink: () => string;
  
  // Error State
  error: string | null;
  clearError: () => void;
}

export interface SendTipParams {
  to: string;
  asset: string;
  amount: string;
  message?: string;
}

const WalletContext = createContext<WalletContextState | undefined>(undefined);

// ============================================================================
// WALLET PROVIDER COMPONENT
// ============================================================================

interface WalletProviderProps {
  children: ReactNode;
}

export const WalletProvider: React.FC<WalletProviderProps> = ({ children }) => {
  // State
  const [account, setAccount] = useState<EkeneAccount | null>(null);
  const [isInitializing, setIsInitializing] = useState(true);
  const [balances, setBalances] = useState<AssetBalance[]>([]);
  const [isLoadingBalances, setIsLoadingBalances] = useState(false);
  const [pendingTx, setPendingTx] = useState<TipTransaction | null>(null);
  const [recentTips, setRecentTips] = useState<TipTransaction[]>([]);
  const [error, setError] = useState<string | null>(null);
  
  // Computed values
  const isConnected = account !== null;
  
  const totalUsdValue = balances.reduce((sum, balance) => {
    return sum + (balance.usdValue || 0);
  }, 0);
  
  // Initialize wallet service
  useEffect(() => {
    initializeWallet();
  }, []);
  
  const initializeWallet = async () => {
    try {
      setIsInitializing(true);
      
      await walletService.initialize();
      
      // Check for existing temporary account
      const storedAccount = localStorage.getItem('ekene_temp_account');
      if (storedAccount) {
        const { account: tempAccount } = JSON.parse(storedAccount);
        setAccount(tempAccount);
        await loadBalances(tempAccount.address);
      }
      
      console.log('🎉 Wallet provider initialized');
    } catch (err) {
      console.error('❌ Failed to initialize wallet:', err);
      setError('Failed to initialize wallet. Please refresh.');
    } finally {
      setIsInitializing(false);
    }
  };
  
  // Load balances
  const loadBalances = async (address?: string) => {
    try {
      setIsLoadingBalances(true);
      const fetchedBalances = await walletService.getBalances(address);
      setBalances(fetchedBalances);
    } catch (err) {
      console.error('❌ Failed to load balances:', err);
      setError('Failed to load balances');
    } finally {
      setIsLoadingBalances(false);
    }
  };
  
  const refreshBalances = useCallback(async () => {
    if (!account) return;
    await loadBalances(account.address);
  }, [account]);
  
  // Auto-refresh balances every 30 seconds
  useEffect(() => {
    if (!account) return;
    
    const interval = setInterval(() => {
      loadBalances(account.address);
    }, 30000);
    
    return () => clearInterval(interval);
  }, [account]);
  
  // Connection methods
  const createTemporaryAccount = useCallback(async (userName?: string) => {
    try {
      setError(null);
      const newAccount = await walletService.createTemporaryAccount(userName);
      setAccount(newAccount);
      await loadBalances(newAccount.address);
      
      console.log('📊 Account created:', { type: 'temporary', source: 'ekene' });
    } catch (err: any) {
      console.error('❌ Failed to create account:', err);
      setError(err.message || 'Failed to create account');
      throw err;
    }
  }, []);
  
  const connectTalisman = useCallback(async () => {
    try {
      setError(null);
      const connectedAccount = await walletService.connectTalisman();
      setAccount(connectedAccount);
      await loadBalances(connectedAccount.address);
      
      console.log('📊 Wallet connected:', { type: 'talisman' });
    } catch (err: any) {
      console.error('❌ Failed to connect Talisman:', err);
      setError(err.message || 'Failed to connect Talisman wallet');
      throw err;
    }
  }, []);
  
  const connectSubwallet = useCallback(async () => {
    try {
      setError(null);
      const connectedAccount = await walletService.connectSubwallet();
      setAccount(connectedAccount);
      await loadBalances(connectedAccount.address);
      
      console.log('📊 Wallet connected:', { type: 'subwallet' });
    } catch (err: any) {
      console.error('❌ Failed to connect SubWallet:', err);
      setError(err.message || 'Failed to connect SubWallet');
      throw err;
    }
  }, []);
  
  const connectPolkadotJs = useCallback(async () => {
    try {
      setError(null);
      const connectedAccount = await walletService.connectPolkadotJs();
      setAccount(connectedAccount);
      await loadBalances(connectedAccount.address);
      
      console.log('📊 Wallet connected:', { type: 'polkadot-js' });
    } catch (err: any) {
      console.error('❌ Failed to connect Polkadot.js:', err);
      setError(err.message || 'Failed to connect Polkadot.js wallet');
      throw err;
    }
  }, []);
  
  const connectNova = useCallback(async () => {
    try {
      setError(null);
      const connectedAccount = await walletService.connectNova();
      setAccount(connectedAccount);
      await loadBalances(connectedAccount.address);
      
      console.log('📊 Wallet connected:', { type: 'nova' });
    } catch (err: any) {
      console.error('❌ Failed to connect Nova:', err);
      setError(err.message || 'Nova Wallet support coming soon');
      throw err;
    }
  }, []);
  
  const connectBitget = useCallback(async () => {
    try {
      setError(null);
      const connectedAccount = await walletService.connectBitget();
      setAccount(connectedAccount);
      await loadBalances(connectedAccount.address);
      
      console.log('📊 Wallet connected:', { type: 'bitget' });
    } catch (err: any) {
      console.error('❌ Failed to connect Bitget:', err);
      setError(err.message || 'Bitget Wallet support coming soon');
      throw err;
    }
  }, []);
  
  const disconnect = useCallback(() => {
    walletService.disconnect();
    setAccount(null);
    setBalances([]);
    setRecentTips([]);
    setPendingTx(null);
    
    console.log('📊 Wallet disconnected');
  }, []);
  
  // Transaction methods
  const sendTip = useCallback(async (params: SendTipParams): Promise<TipTransaction> => {
    if (!account) {
      throw new Error('No account connected');
    }
    
    try {
      setError(null);
      
      const pendingTransaction: TipTransaction = {
        from: account.address,
        to: params.to,
        asset: params.asset,
        amount: params.amount,
        message: params.message,
        timestamp: Date.now(),
        status: 'pending'
      };
      
      setPendingTx(pendingTransaction);
      
      const completedTx = await walletService.sendTip(params);
      
      setRecentTips(prev => [completedTx, ...prev].slice(0, 20));
      
      setPendingTx(null);
      await refreshBalances();
      
      console.log('📊 Tip sent:', {
        asset: params.asset,
        amount: params.amount,
        hasMessage: !!params.message
      });
      
      return completedTx;
    } catch (err: any) {
      console.error('❌ Failed to send tip:', err);
      setError(err.message || 'Failed to send tip');
      setPendingTx(null);
      throw err;
    }
  }, [account, refreshBalances]);
  
  // Receive methods
  const getReceiveQR = useCallback((): string => {
    if (!account) throw new Error('No account connected');
    return walletService.generateReceiveQR();
  }, [account]);
  
  const getReceiveLink = useCallback((): string => {
    if (!account) throw new Error('No account connected');
    return walletService.generateReceiveLink();
  }, [account]);
  
  // Error handling
  const clearError = useCallback(() => {
    setError(null);
  }, []);
  
  // Context value
  const value: WalletContextState = {
    account,
    isConnected,
    isInitializing,
    balances,
    isLoadingBalances,
    totalUsdValue,
    pendingTx,
    recentTips,
    error,
    
    createTemporaryAccount,
    connectTalisman,
    connectSubwallet,
    connectPolkadotJs,
    connectNova,
    connectBitget,
    disconnect,
    sendTip,
    refreshBalances,
    getReceiveQR,
    getReceiveLink,
    clearError
  };
  
  return (
    <WalletContext.Provider value={value}>
      {children}
    </WalletContext.Provider>
  );
};

// ============================================================================
// CUSTOM HOOK
// ============================================================================

export const useWallet = (): WalletContextState => {
  const context = useContext(WalletContext);
  
  if (context === undefined) {
    throw new Error('useWallet must be used within a WalletProvider');
  }
  
  return context;
};

// ============================================================================
// UTILITY HOOKS
// ============================================================================

export const useHasSufficientBalance = (asset: string, amount: string): boolean => {
  const { balances } = useWallet();
  
  const assetBalance = balances.find(b => b.symbol === asset);
  if (!assetBalance) return false;
  
  const balance = BigInt(assetBalance.balance);
  const required = BigInt(amount);
  
  return balance >= required;
};

export const useAssetBalance = (asset: string): string => {
  const { balances } = useWallet();
  
  const assetBalance = balances.find(b => b.symbol === asset);
  return assetBalance?.formattedBalance || '0.0000';
};

export const useIsTemporaryAccount = (): boolean => {
  const { account } = useWallet();
  return account?.isTemporary || false;
};