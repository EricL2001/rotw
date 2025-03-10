import Image from "next/image"

const partners = [
  {
    name: "Jack's Live",
    src: "/hba-stage-alt.jpg",
  },
  {
    name: "Heist Brewery and Barrel Arts",
    src: "/hba-stage-alt.jpg",
  },
  {
    name: "Divine Barrel Brewing",
    src: "/hba-stage-alt.jpg",
  },
  {
    name: "Triple C Brewing",
    src: "/hba-stage-alt.jpg",
  },
  {
    name: "Cactus Jack's Saloon & Grill",
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
            className="relative h-[200px] overflow-hidden rounded-lg border"
          >
            <Image
              src={partner.src}
              alt={partner.name}
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-black/50 flex items-end">
              <h3 className="font-bold text-xl text-white p-6">{partner.name}</h3>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}