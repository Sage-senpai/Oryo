/**
 * ============================================================================
 * Ekene - Header Component
 * ============================================================================
 * Location: src/components/shared/header.tsx
 * 
 * Navigation header with Afrocentric branding
 * ============================================================================
 */

import { Wallet, User, LogOut, Settings } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useWallet } from "@/utils/walletContext"
import { formatAddress } from "@/lib/utils"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Link, useNavigate } from "react-router"
import { useLoginWithOAuth, usePrivy } from '@privy-io/react-auth';

export function Header() {
  const { account, isConnecting, connect, disconnect } = useWallet()
  const navigate = useNavigate();
  const { ready, authenticated, user } = usePrivy()

  const { loading, initOAuth } = useLoginWithOAuth({
    onComplete: ({ user, isNewUser }) => {
      console.log("Logged in via X:", user, "isNewUser:", isNewUser);
      if (isNewUser) {
        navigate("/oauth/callback")
      } else {
        navigate("/app")
      }
    },
    onError: (err) => {
      console.log("Oauth login err: ", err)
    }
  });

  const handleTwitterLogin = async () => {
    try {
      await initOAuth({ provider: 'twitter' });
    } catch (err) {
      console.error('OAuth login error:', err);
    }
  };

  return (
    <header className="ekene-header">
      <div className="ekene-header__container">
        {/* Logo */}
        <Link to="/app" className="ekene-header__logo">
          <div className="ekene-header__logo-icon">
            {/* Calabash emblem */}
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
              <circle cx="16" cy="16" r="14" stroke="currentColor" strokeWidth="2" opacity="0.6"/>
              <circle cx="16" cy="16" r="6" fill="currentColor"/>
            </svg>
          </div>
          <span className="ekene-header__logo-text">Ekene</span>
        </Link>

        {/* Actions */}
        <div className="ekene-header__actions">
          {/* Wallet Connection */}
          {account ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="ekene-header__wallet-btn">
                  <Wallet className="w-4 h-4" />
                  <span className="hidden sm:inline">{formatAddress(account.address)}</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56 ekene-dropdown">
                <div className="px-2 py-1.5">
                  <p className="text-sm font-medium">{account.name || "My Wallet"}</p>
                  <p className="text-xs text-gray-400">{formatAddress(account.address, 8)}</p>
                </div>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link to="/app/profile" className="cursor-pointer">
                    <User className="w-4 h-4 mr-2" />
                    My Profile
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/app/wallet" className="cursor-pointer">
                    <Wallet className="w-4 h-4 mr-2" />
                    Ekene Vault
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={disconnect} className="cursor-pointer text-destructive">
                  <LogOut className="w-4 h-4 mr-2" />
                  Disconnect
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button 
              variant="outline" 
              className="ekene-header__wallet-btn ekene-header__wallet-btn--connect" 
              onClick={connect} 
              disabled={isConnecting}
            >
              <Wallet className="w-4 h-4" />
              <span className="hidden sm:inline">
                {isConnecting ? "Connecting..." : "Connect Wallet"}
              </span>
            </Button>
          )}

          {/* X/Twitter Connection */}
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="ekene-header__user-btn">
                  <img 
                    src={user.twitter?.profilePictureUrl ?? undefined} 
                    alt="Profile" 
                    className="ekene-header__avatar"
                  />
                  <span className="hidden md:inline">
                    {user.twitter?.name?.split(" ")[0] || 'User'}
                  </span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56 ekene-dropdown">
                <div className="px-2 py-1.5">
                  <p className="text-sm font-medium">{user.twitter?.name}</p>
                  <p className="text-xs text-gray-400">@{user.twitter?.username}</p>
                </div>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link to="/app/profile" className="cursor-pointer">
                    <Settings className="w-4 h-4 mr-2" />
                    Settings
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button 
              onClick={handleTwitterLogin} 
              disabled={loading}
              className="ekene-header__x-btn"
              variant="outline"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
              </svg>
              <span className="hidden sm:inline">Connect X</span>
            </Button>
          )}
        </div>
      </div>
    </header>
  )
}
