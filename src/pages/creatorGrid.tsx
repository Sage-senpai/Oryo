
import { CreatorCard } from "@/components/creatorCard"
import { MOCK_CREATORS } from "../data/mockdata"


export function CreatorGrid() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {MOCK_CREATORS.map((creator) => (
        <CreatorCard key={creator.id} creator={creator} />
      ))}
    </div>
  )
}
