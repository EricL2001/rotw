import Image from "next/image"
import { Button } from "@/components/ui/button"
import { shows } from "@/test-data"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"

export default function Upcoming() {
  return (
    <section className="container space-y-10 py-24 md:py-32">
      <h2 className="font-bold text-3xl leading-[1..1] text-center">Upcoming Shows</h2>
        <ScrollArea className="w-full whitespace-nowrap rounded-md border">
          <div className="flex space-x-4 p-4 gap-8">
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
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
    </section>
  )
}