import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Wallet, AlertCircle } from "lucide-react"
import { useState } from "react"
// import { useRouter } from "next/navigation"
import { useWallet } from "@/utils/walletContext"
import { useNavigate } from "react-router"

interface TipModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  creator: {
    name: string
    username: string
    avatar: string
  }
  amount: number
}

const NETWORK_FEE = 0.001 // Mock network fee

export function TipModal({ open, onOpenChange, creator, amount }: TipModalProps) {
  const [isProcessing, setIsProcessing] = useState(false)
  // const router = useRouter()
  const navigate = useNavigate()
  const { account, connect } = useWallet()

  const total = amount + NETWORK_FEE

  const handleConfirm = async () => {
    if (!account) {
      onOpenChange(false)
      await connect()
      return
    }

    setIsProcessing(true)
    // Simulate transaction processing
    await new Promise((resolve) => setTimeout(resolve, 2000))
    setIsProcessing(false)
    onOpenChange(false)
    navigate(`/success?amount=${amount}&creator=${encodeURIComponent(creator.name)}`)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Confirm Your Tip</DialogTitle>
          <DialogDescription>Review the details before confirming your transaction</DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          <div className="flex items-center gap-4 p-4 bg-muted rounded-lg">
            <Avatar className="w-12 h-12">
              <AvatarImage src={creator.avatar || "/placeholder.svg"} alt={creator.name} />
              <AvatarFallback>{creator.name.slice(0, 2).toUpperCase()}</AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <p className="font-semibold truncate">{creator.name}</p>
              <p className="text-sm text-muted-foreground truncate">{creator.username}</p>
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between py-2">
              <span className="text-muted-foreground">Tip Amount</span>
              <span className="font-semibold">{amount.toFixed(3)} DOT</span>
            </div>
            <div className="flex items-center justify-between py-2">
              <span className="text-muted-foreground">Network Fee</span>
              <span className="font-semibold">{NETWORK_FEE.toFixed(3)} DOT</span>
            </div>
            <div className="border-t border-border pt-3">
              <div className="flex items-center justify-between">
                <span className="font-semibold">Total</span>
                <span className="text-xl font-bold text-primary">{total.toFixed(3)} DOT</span>
              </div>
            </div>
          </div>

          <div className="flex items-start gap-3 p-4 bg-primary/5 border border-primary/20 rounded-lg">
            <AlertCircle className="w-5 h-5 text-primary shrink-0 mt-0.5" />
            <p className="text-sm text-foreground leading-relaxed">
              {account
                ? "This transaction will be processed on the Polkadot network. Make sure your wallet has sufficient balance."
                : "You need to connect your wallet first to complete this transaction."}
            </p>
          </div>
        </div>

        <DialogFooter className="gap-2 sm:gap-0">
          <Button variant="outline" onClick={() => onOpenChange(false)} disabled={isProcessing}>
            Cancel
          </Button>
          <Button
            onClick={handleConfirm}
            disabled={isProcessing}
            className="bg-gradient-to-r from-primary to-secondary hover:opacity-90 transition-opacity gap-2"
          >
            {isProcessing ? (
              <>
                <div className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                Processing...
              </>
            ) : (
              <>
                <Wallet className="w-4 h-4" />
                {account ? "Confirm with Wallet" : "Connect Wallet"}
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
