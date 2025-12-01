import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Heart, Users, Copy, Check } from "lucide-react"
import { useState } from "react"
import {TipFlowModal} from "@/components/TipFlowModal"

interface Creator {
  id: string
  name: string
  username: string
  bio: string
  avatar: string
  banner: string
  totalTips: number
  supporters: number
  walletAddress: string
}

interface CreatorProfileProps {
  creator: Creator
}

const QUICK_AMOUNTS = [0.1, 0.5, 1, 5]

export function CreatorProfile({ creator }: CreatorProfileProps) {
  const [customAmount, setCustomAmount] = useState("")
  // const [selectedAmount, setSelectedAmount] = useState<number | null>(null)
  const [copied, setCopied] = useState(false)
  const [showTipModal, setShowTipModal] = useState(false)
  const [tipAmount, setTipAmount] = useState(0)
  
  const handleCopyAddress = async () => {
    await navigator.clipboard.writeText(creator.walletAddress)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleQuickTip = (amount: number) => {
    // setSelectedAmount(amount)
    setCustomAmount("")
    setTipAmount(amount)
    setShowTipModal(true)
  }

  const handleCustomTip = () => {
    const amount = Number.parseFloat(customAmount)
    if (amount > 0) {
      // setSelectedAmount(null)
      setTipAmount(amount)
      setShowTipModal(true)
    }
  }

  return (
    <>
      <div className="relative">
        <div className="h-48 md:h-64 bg-linear-to-r from-primary/20 via-secondary/20 to-accent/20 relative overflow-hidden">
          <img src={creator.banner || "/placeholder.svg"} alt="" className="w-full h-full object-cover opacity-50" />
        </div>
        <div className="container mx-auto px-4">
          <div className="relative -mt-16 md:-mt-20 mb-6">
            <Avatar className="w-32 h-32 md:w-40 md:h-40 border-4 border-background shadow-xl">
              <AvatarImage src={creator.avatar || "/placeholder.svg"} alt={creator.name} />
              <AvatarFallback className="text-3xl">{creator.name.slice(0, 2).toUpperCase()}</AvatarFallback>
            </Avatar>
          </div>
        </div>
      </div>

      <main className="container mx-auto px-4 pb-12">
        <div className="grid lg:grid-cols-3  gap-8">
          <div className="lg:col-span-2 space-y-6">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold mb-2">{creator.name}</h1>
              <p className="text-lg text-muted-foreground mb-4">{creator.username}</p>
              <p className="text-foreground leading-relaxed">{creator.bio}</p>
            </div>

            <Card className="border-border/50">
              <CardContent className="p-6">
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <div className="flex items-center gap-2 text-muted-foreground mb-2">
                      <Heart className="w-5 h-5" />
                      <span className="text-sm font-medium">Total Tips</span>
                    </div>
                    <p className="text-2xl font-bold text-primary">{creator.totalTips.toFixed(1)} DOT</p>
                  </div>
                  <div>
                    <div className="flex items-center gap-2 text-muted-foreground mb-2">
                      <Users className="w-5 h-5" />
                      <span className="text-sm font-medium">Supporters</span>
                    </div>
                    <p className="text-2xl font-bold">{creator.supporters}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-border/50">
              <CardContent className="p-6">
                <h3 className="font-semibold mb-2">Wallet Address</h3>
                <div className="flex items-center gap-2">
                  <code className="flex-1 text-xs md:text-sm bg-muted px-3 py-2 rounded-lg truncate font-mono">
                    {creator.walletAddress}
                  </code>
                  <Button variant="outline" size="icon" onClick={handleCopyAddress} className="shrink-0 bg-transparent">
                    {copied ? <Check className="w-4 h-4 text-primary" /> : <Copy className="w-4 h-4" />}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="lg:col-span-1">
            <Card className="border-border/50 sticky top-24">
              <CardContent className="p-6 space-y-6">
                <div>
                  <h3 className="font-semibold mb-4">Quick Tip Amounts</h3>
                  <div className="grid grid-cols-2 gap-3">
                    {QUICK_AMOUNTS.map((amount) => (
                      <Button
                        key={amount}
                        variant="outline"
                        className="h-auto py-4 flex flex-col gap-1 hover:bg-primary/10 hover:border-primary transition-colors bg-transparent"
                        onClick={() => handleQuickTip(amount)}
                      >
                        <span className="text-2xl font-bold">{amount}</span>
                        <span className="text-xs text-muted-foreground">DOT</span>
                      </Button>
                    ))}
                  </div>
                </div>

                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t border-border" />
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-card px-2 text-muted-foreground">Or</span>
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold mb-4">Custom Amount</h3>
                  <div className="space-y-3">
                    <div className="relative">
                      <Input
                        type="number"
                        placeholder="0.00"
                        value={customAmount}
                        onChange={(e) => setCustomAmount(e.target.value)}
                        className="pr-12"
                        step="0.01"
                        min="0"
                      />
                      <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground font-medium">
                        DOT
                      </span>
                    </div>
                    <Button
                      className="w-full bg-gradient-to-r from-primary to-secondary hover:opacity-90 transition-opacity"
                      onClick={handleCustomTip}
                      disabled={!customAmount || Number.parseFloat(customAmount) <= 0}
                    >
                      Send Tip
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      <TipFlowModal isOpen={showTipModal} onClose={() => setShowTipModal(false)} creator={creator} amount={tipAmount} />
    </>
  )
}
