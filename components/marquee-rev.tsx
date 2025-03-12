import Marquee from "react-fast-marquee";
import { cn } from "@/lib/utils"
import { artists } from "@/marquee-data"


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
            {artists.map((band, index) => (
              <div key={index} className="mx-16">
                <h3 className="text-l font-semibold text-white mt-2 mb-2">
                  {band.artist}
                </h3>
              </div>
            ))}
          </Marquee>
        </div>
    </section>
  )
}