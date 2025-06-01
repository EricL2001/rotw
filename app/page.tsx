import Hero from "@/components/hero"
import Marquee from "@/components/marquee"
import MarqueeRev from "@/components/marquee-rev"
import Features from "@/components/features"
import CTA from "@/components/cta"
import Upcoming from "@/components/upcoming"
import Venues from "@/components/venues"

export default function Home() {
  return (
    <div className="relative min-h-screen">
      <div className="relative z-10">
        <Hero />
        <Features />
        <CTA />
        <Marquee />
        <MarqueeRev />
        <Upcoming />
        <Venues />
      </div>
    </div>
  )
}

