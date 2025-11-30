export interface Creator {
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

export const MOCK_CREATORS: Creator[] = [
  {
    id: "1",
    name: "Alex Rivera",
    username: "@alexrivera",
    bio: "Digital artist creating surreal landscapes and abstract compositions. Passionate about exploring the boundaries between reality and imagination through digital mediums.",
    avatar: "/digital-artist-portrait.png",
    banner: "/abstract-digital-banner.png",
    totalTips: 1247.5,
    supporters: 342,
    walletAddress: "5GrwvaEF5zXb26Fz9rcQpDWS57CtERHpNehXCPcNoHGKutQY",
  },
  {
    id: "2",
    name: "Sarah Chen",
    username: "@sarahchen",
    bio: "Tech educator sharing web3 tutorials and blockchain insights. Making complex technology accessible to everyone.",
    avatar: "/tech-educator-portrait.png",
    banner: "/technology-education-banner.jpg",
    totalTips: 892.3,
    supporters: 218,
    walletAddress: "5FHneW46xGXgs5mUiveU4sbTyGBzmstUspZC92UhjJM694ty",
  },
  {
    id: "3",
    name: "Marcus Johnson",
    username: "@marcusj",
    bio: "Indie game developer building the future of decentralized gaming. Creating immersive experiences on the blockchain.",
    avatar: "/game-developer-portrait.png",
    banner: "/gaming-development-banner.jpg",
    totalTips: 2103.8,
    supporters: 567,
    walletAddress: "5DAAnrj7VHTznn2AWBemMuyBwZWs6FNFjdyVXUeYum3PTXFy",
  },
]
