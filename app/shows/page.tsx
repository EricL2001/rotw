import Image from "next/image"
import { Button } from "@/components/ui/button"

import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"

export interface Artwork {
  artist: string
  venue: string
  date: string
  art: string
  imageAlt: string
}

export const works: Artwork[] = [
  {
    artist: "Phish",
    venue: "Madison Square Garden",
    date: "Wed, Mar 25",
    art: "/card-placeholder.jpg",
    imageAlt: "Artwork by Ornella Binni",
  },
  {
    artist: "AC/DC",
    venue: "Wembley Stadium",
    date: "Wed, Mar 25",
    art: "/card-placeholder.jpg",
    imageAlt: "Artwork by Ornella Binni"
  },
  {
    artist: "Billy Strings",
    venue: "Red Rocks Amphitheater",
    date: "Wed, Mar 25",
    art: "/card-placeholder.jpg",
    imageAlt: "Artwork by Ornella Binni"
  },
  {
    artist: "Dizgo",
    venue: "The Mousetrap",
    date: "Wed, Mar 25",
    art: "/card-placeholder.jpg",
    imageAlt: "Artwork by Ornella Binni",
  },
  {
    artist: "Kitchen Dwellers",
    venue: "The Fox Theater",
    date: "Wed, Mar 25",
    art: "/card-placeholder.jpg",
    imageAlt: "Artwork by Ornella Binni"
  },
  {
    artist: "Polyrhythmics",
    venue: "The Bluebird",
    date: "Wed, Mar 25",
    art: "/card-placeholder.jpg",
    imageAlt: "Artwork by Ornella Binni"
  },
]

export default function ShowsPage() {
  return (
    <div className="relative h-screen w-full">
      <ScrollArea className="w-full whitespace-nowrap rounded-md border">
        <div className="flex space-x-4 p-4">
          {works.map((work, index) => (
            <div
              key={index}
              className="shrink-0 bg-gray-800 p-6 rounded-lg border-[0.5px] border-white"
            >
              <Image
                src={work.art}
                alt={work.imageAlt}
                width={400}
                height={200}
                className="rounded object-cover"
              />
              <h3 className="text-l font-semibold text-white mt-4">{work.artist}</h3>
              <p className="text-white text-sm mb-1">{work.venue}</p>
              <p className="text-white mb-2 text-sm">{work.date}</p>
              <Button variant="outline" className="border-yellow-400 text-yellow-400 hover:bg-gray-800 hover:text-white">
                Info & Tickets
              </Button>
            </div>
          ))}
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </div>
  )
}