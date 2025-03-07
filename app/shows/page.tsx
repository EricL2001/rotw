import Image from "next/image"
import { Button } from "@/components/ui/button"
import { shows } from "@/test-data"


export default function ShowsPage() {
  return (
    <div className="container mx-auto px-4">
      <h1 className="text-xl font-bold m-4">Upcoming Shows PAGE</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {shows.map((work, index) => (
          <div
            key={index}
            className="shrink-0 bg-background p-6 rounded-lg border-[0.5px] border-white"
          >
            <Image
              src={work.art}
              alt={work.imageAlt}
              width={300}
              height={200}
              className="rounded object-cover"
            />
            <h3 className="text-l font-semibold text-white mt-2 mb-2">{work.artist}</h3>
            <p className="text-white text-sm">{work.venue}</p>
            <p className="text-white mb-3 text-sm">{work.date}</p>
            <Button variant="outline" className="border-yellow-400 text-yellow-400 hover:bg-gray-800 hover:text-white">
              Info & Tickets
            </Button>
          </div>
        ))}
      </div>
    </div>
  )
}