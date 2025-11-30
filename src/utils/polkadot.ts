import { ApiPromise, WsProvider } from '@polkadot/api';
import { web3Accounts, web3Enable } from '@polkadot/extension-dapp';

export const initPolkadotAPI = async () => {
  try {
    // Initialize the provider to connect to the local node
    const provider = new WsProvider('wss://rpc.polkadot.io');
    const api = await ApiPromise.create({ provider });
    
    // Wait for the API to be ready
    await api.isReady;
    
    return api;
  } catch (error) {
    console.error('Error initializing Polkadot API:', error);
    throw error;
  }
};

export const connectWallet = async () => {
  try {
    // This will trigger the extension popup
    const extensions = await web3Enable('Polka Donation App');
    
    if (extensions.length === 0) {
      throw new Error('No extension installed');
    }

    // Get all accounts from the extension
    const accounts = await web3Accounts();
    
    return accounts;
  } catch (error) {
    console.error('Error connecting wallet:', error);
    throw error;
  }
};