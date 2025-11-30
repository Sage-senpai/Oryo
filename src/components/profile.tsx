import { useWallet } from "@/utils/walletContext"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Wallet, Copy, Check, User, Mail, Globe } from "lucide-react"
import { useState, useEffect } from "react"
import { useNavigate } from "react-router"

export default function ProfilePage() {
  const { account } = useWallet()
  const navigate = useNavigate()
  // const router = useRouter()
  const [copied, setCopied] = useState(false)
  const [isSaving, setIsSaving] = useState(false)

  // Profile form state
  const [name, setName] = useState("")
  const [bio, setBio] = useState("")
  const [email, setEmail] = useState("")
  const [website, setWebsite] = useState("")
  const [avatar, setAvatar] = useState("")

  useEffect(() => {
    if (!account) {
      // router.push("/")
      navigate("/")
      return
    }

    // Load saved profile data from localStorage
    const savedProfile = localStorage.getItem(`profile_${account.address}`)
    if (savedProfile) {
      const profile = JSON.parse(savedProfile)
      setName(profile.name || "")
      setBio(profile.bio || "")
      setEmail(profile.email || "")
      setWebsite(profile.website || "")
      setAvatar(profile.avatar || "")
    }
  }, [account, navigate])

  const copyAddress = () => {
    if (account) {
      navigator.clipboard.writeText(account.address)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  const handleSave = async () => {
    if (!account) return

    setIsSaving(true)
    // Simulate save delay
    await new Promise((resolve) => setTimeout(resolve, 1000))

    const profile = { name, bio, email, website, avatar }
    localStorage.setItem(`profile_${account.address}`, JSON.stringify(profile))

    setIsSaving(false)
  }

  if (!account) {
    return null
  }

  return (
    <div className="min-h-screen bg-background">
      {/* <Header /> */}
      <main className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">My Profile</h1>
          <p className="text-muted-foreground">Manage your creator profile and wallet information</p>
        </div>

        <div className="grid gap-6">
          {/* Wallet Info Card */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Wallet className="w-5 h-5" />
                Wallet Information
              </CardTitle>
              <CardDescription>Your connected Polkadot wallet details</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-muted-foreground mb-1">Wallet Address</p>
                  <p className="font-mono text-sm truncate">{account.address}</p>
                </div>
                <Button variant="ghost" size="sm" onClick={copyAddress} className="shrink-0 ml-2">
                  {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                </Button>
              </div>
              {account.name && (
                <div className="p-4 bg-muted rounded-lg">
                  <p className="text-sm text-muted-foreground mb-1">Wallet Name</p>
                  <p className="font-medium">{account.name}</p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Profile Settings Card */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="w-5 h-5" />
                Profile Settings
              </CardTitle>
              <CardDescription>Update your public creator profile information</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center gap-6">
                <Avatar className="w-20 h-20">
                  <AvatarImage src={avatar || "/placeholder.svg"} alt={name || "Profile"} />
                  <AvatarFallback className="text-2xl">{name ? name.slice(0, 2).toUpperCase() : "ME"}</AvatarFallback>
                </Avatar>
                <div className="flex-1 space-y-2">
                  <Label htmlFor="avatar">Avatar URL</Label>
                  <Input
                    id="avatar"
                    placeholder="https://example.com/avatar.jpg"
                    value={avatar}
                    onChange={(e) => setAvatar(e.target.value)}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="name">Display Name</Label>
                <Input id="name" placeholder="Your name" value={name} onChange={(e) => setName(e.target.value)} />
              </div>

              <div className="space-y-2">
                <Label htmlFor="bio">Bio</Label>
                <Textarea
                  id="bio"
                  placeholder="Tell people about yourself..."
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  rows={4}
                  className="resize-none"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="website" className="flex items-center gap-2">
                  <Globe className="w-4 h-4" />
                  Website
                </Label>
                <Input
                  id="website"
                  type="url"
                  placeholder="https://yourwebsite.com"
                  value={website}
                  onChange={(e) => setWebsite(e.target.value)}
                />
              </div>

              <Button
                onClick={handleSave}
                disabled={isSaving}
                className="w-full bg-gradient-to-r from-primary to-secondary hover:opacity-90 transition-opacity"
              >
                {isSaving ? "Saving..." : "Save Profile"}
              </Button>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
