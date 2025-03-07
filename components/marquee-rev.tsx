import Marquee from "react-fast-marquee";
import { cn } from "@/lib/utils"
import Image from "next/image";

export default function MarqueeRev() {

  return (
    <section>
      <div className={cn(
          "container flex flex-col items-center gap-4 py-24 text-center md:py-32",
        )}
      >
        <Marquee 
          gradient={false} 
          speed={80}
          direction="right"
        >
            <div className="mx-16">
              <Image
                src="/rotw-logo-512.jpg"
                alt="Records On The Wall Logo"
                width={150}
                height={150}
              >
              </Image>
            </div>
            <div className="mx-16">
              <Image
                src="/logo-white-clear.png"
                alt="Records On The Wall Logo"
                width={150}
                height={150}
              >
              </Image>
            </div>
            <div className="mx-16">
              <Image
                src="/logo-white-solid.png"
                alt="Records On The Wall Logo"
                width={150}
                height={150}
              >
              </Image>
            </div>
            <div className="mx-16">
              <Image
                src="/rotw-logo-512.jpg"
                alt="Records On The Wall Logo"
                width={150}
                height={150}
              >
              </Image>
            </div>
        </Marquee>
      </div>
    </section>
  )
}