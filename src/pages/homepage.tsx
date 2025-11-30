import { CreatorGrid } from "@/components/creatorGrid"

export default function HomePage() {
  return (
    <div className="">
      <main className="container mx-auto px-4 py-8 md:py-12 h-full">
        <div className="mb-8 md:mb-12 text-center h-2/4">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 text-balance  bg-linear-to-r from-pink-500 via-secondary to-yellow-500 bg-clip-text text-transparent">
            Support Your Favorite Creators
          </h1>
          <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto text-pretty">
            Send micro-donations with DOT tokens. Fast, secure, and transparent on the Polkadot network.
          </p>
        </div>
        <CreatorGrid />
      </main>
    </div>
  )
}
