import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import { cn } from "@/lib/utils"
import logo from "@/public/logo-white-clear.png"
import Link from "next/link"

export default function Hero() {
  return (
    <section className="relative min-h-[calc(100vh-3.5rem)] flex items-center justify-center">
      <div className="absolute inset-0">
        <Image
          src="/hba-stage-alt.jpg"
          alt="Heist Barrel Arts outdoor stage"
          fill priority className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-black/60" />
      </div>
      <div className="container max-w-screen-2xl relative z-10 pt-6 pb-16 px-8">
        <div className="text-center space-y-8">
          <Image
            src={logo}
            alt="rotw logo"
            width={300}
            height={300}
            className={cn("mx-auto w-[250px] h-[250px] md:w-[300px] md:h-[300px]",
              "animate-in fade-in-5 slide-in-from-top-20 duration-1000",
            )}
          />
          <p
            className={cn(
              "mx-auto max-w-[42rem] leading-relaxed text-white",
              "text-[18px] md:text-lg lg:text-2xl font-medium", // Adjusted font sizes for different breakpoints
              "animate-in fade-in-5 slide-in-from-bottom-20 duration-1000",
            )}
          >
            Helping Charlotte Boogie Since 2018
            <br />
            Booking • Promo • Ticketing
          </p>
          <div
            className={cn(
              "flex justify-center gap-4",
              "animate-in fade-in-5 slide-in-from-bottom-10 duration-1000",
            )}
          >
            <Link href="/shows">
              <Button
                className="text-[0.9rem] md:text-lg lg:text-xl px-4 py-2 md:px-6 md:py-3 lg:px-8 lg:py-4 text-white/80"
                variant="orange"
              >
                Come see a show
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}

