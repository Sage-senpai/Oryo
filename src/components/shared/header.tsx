import { Wallet, User, LogOut } from "lucide-react"
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
      // setUser(user);
      if (isNewUser) {
        // e.g., redirect to the “creator onboarding” or “donor profile” flow
        // your donation app logic: maybe ask user to choose “creator” or “donor”
        navigate("/OAuth/callback")
      } else {
        // e.g., redirect to dashboard
        navigate("/")
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
  console.log("Header - ready:", ready, "authenticated:", authenticated, "user:", user);

  return (
    <header className="bg-white/80 backdrop-blur-sm border-b border-[#E6DCD2] sticky top-0 z-50">
      <div className="container mx-auto px-4 pr-0 py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
          <div className="w-8 h-8 rounded-full bg-linear-to-br from-pink-500  to-yellow-500" />
          <span className="text-xl font-bold">ORYO</span>
        </Link>
        <div className="flex items-center justify-between gap-8">
          {account ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="gap-2 bg-linear-to-r from-pink-500 via-secondary to-yellow-500 text-white">
                  <Wallet className="w-4 h-4" />
                  <span className="hidden sm:inline">{formatAddress(account.address)}</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56 bg-gray-100">
                <div className="px-2 py-1.5">
                  <p className="text-sm font-medium">{account.name || "My Wallet"}</p>
                  <p className="text-xs text-gray-400">{formatAddress(account.address, 8)}</p>
                </div>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link to="/profile" className="cursor-pointer">
                    <User className="w-4 h-4 mr-2" />
                    My Profile
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
            <Button variant="outline" className="gap-2 bg-linear-to-r from-pink-500 via-secondary to-yellow-500 text-white" onClick={connect} disabled={isConnecting}>
              <Wallet className="w-4 h-4" />
              <span className="hidden sm:inline">{isConnecting ? "Connecting..." : "Connect Wallet"}</span>
            </Button>
          )}
          {
            user ? (
              <div className="flex items-center gap-4">
                <Link to="/profile">
                  <img src={user.twitter?.profilePictureUrl ?? undefined} alt="Profile" className="w-8 h-8 rounded-full" />
                </Link>
                <p className="text-sm">Hello, {user.twitter?.name?.split(" ")[0] || 'User'}</p>
              </div>
            ) : (
              <Button onClick={handleTwitterLogin} disabled={loading} className="cursor-pointer">
                Connect X {/* check first if user is logged in */}
              </Button>
            )
          }
          
        </div>
      </div>
    </header>
  )
}
