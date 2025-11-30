import { useEffect, useState } from "react"
import { useParams } from "react-router"
import { MOCK_CREATORS, type  Creator } from "../data/mockdata"
import NotFound from "./notfound"
import { CreatorProfile } from "./creatorProfile"

export default function CreatorPage() {
  const { id } = useParams<{ id: string }>()
  const [creator, setCreator] = useState<Creator | null>(null)
  // const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (!id) return

    // Example 1: use local mock data
    const found = MOCK_CREATORS.find((c) => c.id === id) ?? null
    setCreator(found)

    // Example 2: if you fetch from an API, do something like this
    // setLoading(true)
    // fetch(`/api/creators/${id}`)
    //   .then((r) => {
    //     if (!r.ok) throw new Error("not found")
    //     return r.json()
    //   })
    //   .then((data) => setCreator(data))
    //   .catch(() => setCreator(null))
    //   .finally(() => setLoading(false))

  }, [id])

  if (!id) {
    return <NotFound />
  }

  // if (loading) return <div className="p-6">Loading...</div>

  if (!creator) {
    // either render a 404 component or redirect
    // navigate("/404") // if you have a route for 404
    return <NotFound />
  }

  return (
    <div className="min-h-screen p-6">
      <CreatorProfile creator={creator} />
    </div>
  )
}
