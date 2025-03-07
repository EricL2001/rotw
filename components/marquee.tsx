import Marquee from "react-fast-marquee";
import { cn } from "@/lib/utils"

export default function GetMarquee() {

  return (
    <section>
      <div className={cn(
          "container flex flex-col items-center gap-4 py-24 text-center md:py-32",
        )}
      >
        <Marquee 
          gradient={false} 
          speed={80}>
            <h1> TESTING </h1>
            <h1> THIS </h1>
            <h1> MARQUEE </h1>
            <h1> THINGY </h1>
            <h1> OUT </h1>
        </Marquee>
      </div>
    </section>
  )
}


