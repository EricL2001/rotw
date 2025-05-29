import Image from "next/image"
import Link from "next/link"
import { GeistMono } from 'geist/font/mono';

const partners = [
  {
    name: "Heist Brewery",
    city: "Charlotte, NC",
    src: "/heist.jpeg",
    url: "https://www.heistbrewery.com",
  },
  {
    name: "Jack's Live",
    city: "Charlotte, NC",
    src: "/jacks-small.jpg",
    url: "https://www.jacksliveclt.com/",
  },
  {
    name: "Heist Brewery and Barrel Arts",
    city: "Charlotte, NC",
    src: "/hba-stage-alt.jpg",
    url: "https://heistbrewery.com/home/barrel-arts/", 
  },
  {
    name: "Cactus Jack's Saloon",
    city: "Evergreen, CO",
    src: "/cactus-jacks.jpg",
    url: "https://www.evergreenlivemusic.com",
  },
]

export default function Venues() {
  return (
    <section className="container py-16">
      <div className="space-y-4 mb-12">
        <h2 className="font-bold text-3xl md:text-4xl leading-[1.1] text-center">Venues</h2>
        <p className="leading-normal text-muted-foreground sm:text-xl sm:leading-8 text-center">Venue and brewery partners</p>
      </div>
      <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 md:grid-cols-2">
        {partners.map((partner) => (
          <Link
            href={partner.url}
            key={partner.name}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative h-[200px] overflow-hidden rounded-lg border-[0.5px] border-white transition-transform hover:scale-[1.01]"
          >
            <Image
              src={partner.src}
              alt={partner.name}
              fill
              className="object-cover transition-transform group-hover:scale-105"
              priority
            />
            <div className="absolute inset-0 bg-black/50 flex flex-col justify-end p-6">
              <h3 className="font-bold text-xl text-white">{partner.name}</h3>
              <p className={`text-sm text-white/80 ${GeistMono.className}`}>{partner.city}</p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  )
}