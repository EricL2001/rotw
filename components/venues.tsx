import Image from "next/image"
import { GeistMono } from 'geist/font/mono';

const partners = [
  {
    name: "Heist Brewery",
    city: "Charlotte, NC",
    src: "/hba-stage-alt.jpg",
  },
  {
    name: "Jack's Live",
    city: "Charlotte, NC",
    src: "/hba-stage-alt.jpg",
  },
  {
    name: "Heist Brewery and Barrel Arts",
    city: "Charlotte, NC",
    src: "/hba-stage-alt.jpg",
  },
  {
    name: "Cactus Jack's Saloon & Grill",
    city: "Evergreen, CO",
    src: "/hba-stage-alt.jpg",
  },
  {
    name: "Triple C Brewing",
    city: "Charlotte, NC",
    src: "/hba-stage-alt.jpg",
  },
  {
    name: "Divine Barrel Brewing",
    city: "Charlotte, NC",
    src: "/hba-stage-alt.jpg",
  },
]


export default function Venues() {
  return (
    <section className="container space-y-16 py-24 md:py-32">
      <h2 className="font-bold text-3xl leading-[1.1] text-center">Venue Partners</h2>
      <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 md:grid-cols-2">
        {partners.map((partner) => (
          <div
          key={partner.name}
          className="relative h-[200px] overflow-hidden rounded-lg border border-white"
        >
          <Image
            src={partner.src}
            alt={partner.name}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/50 flex flex-col justify-end p-6">
            <h3 className="font-bold text-xl text-white">{partner.name}</h3>
            <p className={`text-sm text-white/80 ${GeistMono.className}`}>{partner.city}</p>
          </div>
        </div>
        ))}
      </div>
    </section>
  )
}