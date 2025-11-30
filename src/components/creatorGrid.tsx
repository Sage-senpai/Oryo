import { CreatorCard } from "@/components/creatorCard"

const MOCK_CREATORS = [
  {
    id: "1",
    name: "Alex Rivera",
    username: "@alexrivera",
    bio: "Digital artist creating surreal landscapes and abstract compositions",
    avatar: "/digital-artist-portrait.png",
    totalTips: 1247.5,
    supporters: 342,
  },
  {
    id: "2",
    name: "Sarah Chen",
    username: "@sarahchen",
    bio: "Tech educator sharing web3 tutorials and blockchain insights",
    avatar: "/tech-educator-portrait.png",
    totalTips: 892.3,
    supporters: 218,
  },
  {
    id: "3",
    name: "Marcus Johnson",
    username: "@marcusj",
    bio: "Indie game developer building the future of decentralized gaming",
    avatar: "/game-developer-portrait.png",
    totalTips: 2103.8,
    supporters: 567,
  },
  {
    id: "4",
    name: "Luna Park",
    username: "@lunapark",
    bio: "Music producer crafting ambient soundscapes and electronic beats",
    avatar: "/music-producer-portrait.jpg",
    totalTips: 1456.2,
    supporters: 423,
  },
  {
    id: "5",
    name: "David Kim",
    username: "@davidkim",
    bio: "Writer exploring the intersection of technology and humanity",
    avatar: "/writer-portrait.png",
    totalTips: 678.9,
    supporters: 156,
  },
  {
    id: "6",
    name: "Emma Watson",
    username: "@emmawatson",
    bio: "Photographer capturing moments of beauty in everyday life",
    avatar: "/photographer-portrait.png",
    totalTips: 934.1,
    supporters: 289,
  },
]

export function CreatorGrid() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {MOCK_CREATORS.map((creator) => (
        <CreatorCard key={creator.id} creator={creator} />
      ))}
    </div>
  )
}
