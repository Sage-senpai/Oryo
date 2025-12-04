import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

interface WalletAccount {
  address: string
  name?: string
}

interface WalletContextType {
  account: WalletAccount | null
  isConnecting: boolean
  connect: () => Promise<void>
  disconnect: () => void
}

const WalletContext = createContext<WalletContextType | undefined>(undefined)

export function WalletProvider({ children }: { children: ReactNode }) {
    const [account, setAccount] = useState<WalletAccount | null>(null)
    const [isConnecting, setIsConnecting] = useState(false)
  
    useEffect(() => {
      // Check if wallet was previously connected
      const savedAddress = localStorage.getItem("wallet_address")
      const savedName = localStorage.getItem("wallet_name")
      if (savedAddress) {
        setAccount({ address: savedAddress, name: savedName || undefined })
      }
    }, [])
  
    const connect = async () => {
      setIsConnecting(true)
      try {
        // Check if polkadot.js extension is available
        const { web3Enable, web3Accounts } = await import("@polkadot/extension-dapp")
  
        const extensions = await web3Enable("Ekene App")
        if (extensions.length === 0) {
          alert("Please install Polkadot.js extension to connect your wallet")
          setIsConnecting(false)
          return
        }
  
        const accounts = await web3Accounts()
        if (accounts.length === 0) {
          alert("No accounts found. Please create an account in your Polkadot.js extension")
          setIsConnecting(false)
          return
        }
  
        // Use the first account
        const selectedAccount = accounts[0]
        const walletAccount = {
          address: selectedAccount.address,
          name: selectedAccount.meta.name,
        }
  
        setAccount(walletAccount)
        localStorage.setItem("wallet_address", walletAccount.address)
        if (walletAccount.name) {
          localStorage.setItem("wallet_name", walletAccount.name)
        }
      } catch (error) {
        console.error("Failed to connect wallet:", error)
        alert("Failed to connect wallet. Please try again.")
      } finally {
        setIsConnecting(false)
      }
    }
  
    const disconnect = () => {
      setAccount(null)
      localStorage.removeItem("wallet_address")
      localStorage.removeItem("wallet_name")
    }
  
    return (
      <WalletContext.Provider value={{ account, isConnecting, connect, disconnect }}>{children}</WalletContext.Provider>
    )
  }
  
  export function useWallet() {
    const context = useContext(WalletContext)
    if (context === undefined) {
      throw new Error("useWallet must be used within a WalletProvider")
    }
    return context
  }
  