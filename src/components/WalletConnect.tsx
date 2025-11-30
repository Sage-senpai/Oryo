import { useState } from 'react';
// import { ApiPromise } from '@polkadot/api';
import type { InjectedAccountWithMeta } from '@polkadot/extension-inject/types';
import { connectWallet } from '../utils/polkadot';

export function WalletConnect() {
//   const [api, setApi] = useState<ApiPromise | null>(null);
  const [accounts, setAccounts] = useState<InjectedAccountWithMeta[]>([]);

//   useEffect(() => {
//     const init = async () => {
//       const api = await initPolkadotAPI();
//       setApi(api);
//     };

//     init().catch(console.error);
//   }, []);

  const handleConnect = async () => {
    try {
      const accounts = await connectWallet();
      setAccounts(accounts);
    } catch (error) {
      console.error('Failed to connect wallet:', error);
    }
  };

  return (
    <div>
      <button onClick={handleConnect}>Connect Wallet</button>
      {accounts.map((account) => (
        <div key={account.address}>
          <p>Address: {account.address}</p>
          <p>Name: {account.meta.name}</p>
        </div>
      ))}
    </div>
  );
}