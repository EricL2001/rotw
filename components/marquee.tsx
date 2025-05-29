import Marquee from "react-fast-marquee";
import { cn } from "@/lib/utils"
import { artists } from "@/marquee-data"
import { GeistMono } from 'geist/font/mono'


export default function GetMarquee() {
  return (
    <section>
      <div className="container flex flex-col items-center gap-4 py-16 text-center">
        <h2 className="font-bold text-3xl md:text-4xl text-center">Bands & Artists</h2>
        <p className="max-w-[42rem] leading-normal text-muted-foreground sm:text-xl sm:leading-8">
          Bands and artists we&#39;ve had the pleasure of working with.
        </p>
      </div>
      <div className={cn(
        "container flex flex-col items-center gap-4 py-2 text-center",
      )}
      >
        <Marquee
          gradient={false}
          speed={80}>
          {artists.map((band, index) => (
            <div key={index} className="mx-12">
              <h3 className={`text-lg font-semibold text-white mt-2 mb-2 ${GeistMono.className}`} >
                {band.artist}
              </h3>
            </div>
          ))}
        </Marquee>
      </div>
    </section>
  )
}