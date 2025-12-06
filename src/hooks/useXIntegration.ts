import { useState, useEffect } from 'react';
import { usePrivy } from '@privy-io/react-auth';

export function useXIntegration() {
  const { user } = usePrivy();
  const [xProfile, setXProfile] = useState<any>(null);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    if (user?.twitter) {
      setXProfile({
        username: user.twitter.username,
        name: user.twitter.name,
        profilePictureUrl: user.twitter.profilePictureUrl,
        userId: user.twitter.subject,
      });
      setIsConnected(true);
    }
  }, [user]);

  const connectX = async () => {
    // This is handled by Privy's OAuth flow in your header
    console.log('Redirecting to X login...');
  };

  const disconnectX = async () => {
    // TODO: Implement disconnect logic
    setXProfile(null);
    setIsConnected(false);
  };

  return {
    xProfile,
    isConnected,
    connectX,
    disconnectX,
  };
}