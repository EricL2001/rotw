"use client"

import { use } from "react"
import ShowDetailsComponent from "@/components/show-details"

export default function ShowDetailsPage({ params }: { params: Promise<{ slug: string }> }) {
  // Unwrap the params Promise
  const resolvedParams = use(params)

  return <ShowDetailsComponent slug={resolvedParams.slug} />
}