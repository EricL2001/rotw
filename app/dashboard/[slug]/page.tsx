import { Suspense } from "react"
import ShowDetailsComponent from "@/components/show-details"

async function ShowDetails({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  return <ShowDetailsComponent slug={slug} />
}

function ShowDetailsLoading() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="animate-pulse space-y-4">
        <div className="h-8 w-64 bg-gray-200 rounded" />
        <div className="h-4 w-full bg-gray-200 rounded" />
        <div className="h-4 w-3/4 bg-gray-200 rounded" />
      </div>
    </div>
  )
}

export default function ShowDetailsPage({ params }: { params: Promise<{ slug: string }> }) {
  return (
    <Suspense fallback={<ShowDetailsLoading />}>
      <ShowDetails params={params} />
    </Suspense>
  )
}