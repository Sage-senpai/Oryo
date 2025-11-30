import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Heart, Users } from "lucide-react"
import { Link } from "react-router"

interface Creator {
  id: string
  name: string
  username: string
  bio: string
  avatar: string
  totalTips: number
  supporters: number
}

interface CreatorCardProps {
  creator: Creator
}

export function CreatorCard({ creator }: CreatorCardProps) {
  return (
    <Card className="overflow-hidden hover:shadow-lg bg-white transition-shadow duration-300 border-gray-200/50">
      <CardContent className="p-6">
        <div className="flex items-start gap-4 mb-4">
          <Avatar className="w-16 h-16 border-2 border-gray-400/20">
            <AvatarImage src={creator.avatar || "/placeholder.svg"} alt={creator.name} />
            <AvatarFallback>{creator.name.slice(0, 2).toUpperCase()}</AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-lg truncate">{creator.name}</h3>
            <p className="text-sm text-gray-400 truncate">{creator.username}</p>
          </div>
        </div>
        <p className="text-sm text-gray-400 mb-4 line-clamp-2">{creator.bio}</p>
        <div className="flex items-center gap-4 text-sm text-gray-400">
          <div className="flex items-center gap-1">
            <Heart className="w-4 h-4" />
            <span>{creator.totalTips.toFixed(1)} DOT</span>
          </div>
          <div className="flex items-center gap-1">
            <Users className="w-4 h-4" />
            <span>{creator.supporters}</span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="p-6 pt-0">
        <Link to={`/creator/${creator.id}`} className="w-full ">
          <Button className="w-full bg-linear-to-r from-pink-500 to-yellow-500 hover:opacity-90 transition-opacity text-white cursor-pointer rounded-xl">
            Tip Creator
          </Button>
        </Link>
      </CardFooter>
    </Card>
  )
}
