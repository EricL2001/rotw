import Link from "next/link"
import { getAllShows } from "@/lib/actions/getAllShows"
import { ShowsFilter } from "@/components/shows-filter"

export default async function ShowsPage() {
  const posts = await getAllShows();

  return (
    <div className="container mx-auto px-8 mb-6">
      <Link href="/" className="text-sm text-muted-foreground hover:text-primary mt-8 inline-block text-center w-full">
          ← Back to Home
        </Link>
      <h1 className="font-semibold text-xl sm:text-2xl md:text-3xl mt-4 mb-8 text-center">Upcoming Shows</h1>
      <ShowsFilter shows={posts} />
    </div>
  )
}