"use client"

import { useState } from "react"
import Image from "next/image"
import { GeistMono } from 'geist/font/mono'
import { Badge } from "@/components/ui/badge"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import { toZonedTime, format } from 'date-fns-tz'
import { ShowButton } from "@/components/show-button"
import { findVenueByName } from "@/lib/venue-maps"
import { type SanityDocument } from "next-sanity"

interface ShowsFilterProps {
  shows: SanityDocument[]
}

export function ShowsFilter({ shows }: ShowsFilterProps) {
  const [selectedVenue, setSelectedVenue] = useState<string | null>(null)

  const uniqueVenues = Array.from(
    new Set(shows.map((show) => show.venue).filter(Boolean))
  ).sort((a, b) => {
    const cityA = findVenueByName(a)?.city ?? a
    const cityB = findVenueByName(b)?.city ?? b
    if (cityA.startsWith("Charlotte")) return -1
    if (cityB.startsWith("Charlotte")) return 1
    return cityA.localeCompare(cityB)
  }) as string[]

  const filteredShows = selectedVenue
    ? shows.filter((show) => show.venue === selectedVenue)
    : shows

  const filterButtons = (
    <>
      <button
        className={`border border-orange-500 text-white text-sm font-medium rounded-md px-4 py-3 min-w-[80px] shrink-0 transition-colors touch-pan-x ${
          selectedVenue === null ? "bg-orange-500" : "bg-transparent hover:bg-orange-500"
        }`}
        onClick={() => setSelectedVenue(null)}
      >
        All
      </button>
      {uniqueVenues.map((venueName) => {
        const venueInfo = findVenueByName(venueName)
        const isSelected = selectedVenue === venueName
        return (
          <button
            key={venueName}
            className={`border border-orange-500 text-white text-sm font-medium rounded-md px-4 py-3 min-w-[80px] shrink-0 leading-none transition-colors touch-pan-x inline-flex flex-col items-center gap-1 ${
              isSelected ? "bg-orange-500" : "bg-transparent hover:bg-orange-500"
            }`}
            onClick={() => setSelectedVenue(venueName)}
          >
            <span className="whitespace-nowrap">{venueName}</span>
            {venueInfo && (
              <span className={`whitespace-nowrap text-xs opacity-75 ${GeistMono.className}`}>
                {venueInfo.city}
              </span>
            )}
          </button>
        )
      })}
    </>
  )

  return (
    <>
      {/* Mobile: horizontal scroll */}
      <div className="md:hidden mb-8">
        <ScrollArea className="w-full">
          <div className="flex gap-4 pb-3">
            {filterButtons}
          </div>
          <ScrollBar orientation="horizontal" className="opacity-0" />
        </ScrollArea>
      </div>

      {/* Desktop: wrapping layout */}
      <div className="hidden md:flex flex-wrap gap-4 justify-center mb-8">
        {filterButtons}
      </div>

      {/* Shows grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredShows.map((show, index) => {
          const venueCity = findVenueByName(show.venue)
          return (
            <div
              key={index}
              className="shrink-0 bg-background p-6 rounded-lg border-[0.5px] border-white"
            >
              {show.imageUrl ? (
                <Image
                  src={show.imageUrl}
                  alt={show.bandName || "Show image"}
                  width={300}
                  height={200}
                  className="rounded object-cover w-full h-[200px]"
                />
              ) : (
                <div className="w-full h-[200px] bg-gray-800 rounded flex items-center justify-center">
                  <span className="text-gray-400">No image available</span>
                </div>
              )}
              <div className="flex items-start justify-between mt-2">
                <h3 className="text-l font-semibold text-white mt-2 min-w-0">{show.title}</h3>
                {show.showType == "Free" && (
                  <Badge
                    variant="green"
                    className={`${GeistMono.className} whitespace-nowrap shrink-0 ml-2 mt-2`}
                  >
                    Free Show
                  </Badge>
                )}
              </div>
              <p className="text-sm sm:text-base text-gray-400 mb-2">{show.supportName}</p>
              <p className={`text-white text-sm ${GeistMono.className}`}>{show.venue}</p>
              <p className={`text-white text-sm ${GeistMono.className}`}>{venueCity?.city}</p>
              <p className={`text-white mb-3 text-sm ${GeistMono.className}`}>
                {format(
                  toZonedTime(show.showDate, "America/New_York"),
                  "EEE, MMMM d",
                  { timeZone: "America/New_York" }
                )}
              </p>
              <ShowButton slug={show.slug.current} showType={show.showType} />
            </div>
          )
        })}
      </div>
    </>
  )
}
