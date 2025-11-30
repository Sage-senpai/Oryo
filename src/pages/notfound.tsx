import { Link } from "react-router"

export default function NotFound() {
  return (
    <div className="p-8 text-center">
      <h1 className="text-3xl font-bold mb-2">404</h1>
      <p className="mb-4">Creator not found</p>
      <Link to="/" className="text-blue-600">Back to creators</Link>
    </div>
  )
}
