import Marquee from "react-fast-marquee";
import { cn } from "@/lib/utils"
import { localArtists } from "@/marquee-data"




export default function MarqueeRev() {
  return (
    <section>
        <div className={cn(
          "container flex flex-col items-center gap-4 py-24 text-center",
        )}
        >
          <Marquee 
            gradient={false} 
            speed={80}
            direction="right">
            {localArtists.map((artist, index) => (
              <div key={index} className="mx-12">
                <h3 className="text-medium md:text-lg font-bold text-white mt-2 mb-2">
                  {artist.artist}
                </h3>
              </div>
            ))}
          </Marquee>
        </div>
    </section>
  )
}