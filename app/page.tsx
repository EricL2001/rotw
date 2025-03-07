import Navbar from "@/components/navbar"
import Hero from "@/components/hero"
import Marquee from "@/components/marquee"
import MarqueeRev from "@/components/marquee-rev"
import Features from "@/components/features"
import CTA from "@/components/cta"
import Upcoming from "@/components/upcoming"
import Venues from "@/components/venues"
import Footer from "@/components/footer"

export default function Home() {
  return (
    <div className="relative min-h-screen">
      <div className="relative z-10">
        <Navbar />
        <Hero />
        <Features />
        <CTA />
        <Marquee />
        <MarqueeRev />
        <Upcoming />
        <Venues />
        <Footer />
      </div>
    </div>
  )
}

