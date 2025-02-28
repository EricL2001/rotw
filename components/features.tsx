import { Music, Shirt, Zap, Ticket } from "lucide-react"

const features = [
  {
    name: "Booking",
    description: "We work with local and touring musicians to book them across breweries and small venues in Charlotte, NC and Denver, CO.",
    icon: Music,
  },
  {
    name: "Promotion",
    description: "While we heavily promote all the shows we're part of, partner with us on any shows you have coming up.  We'd love to work with you to get the word out.  Contact us for more info.",
    icon: Zap,
  },
  {
    name: "Ticketing",
    description: "We run our own ticketing solution for shows at Heist Brewery and Heist Barrel Arts",
    icon: Ticket,
  },
  {
    name: "Merch Store",
    description: "This is getting a massive upgrade.  We will be partnering with local artists in the scene to create some killer merch",
    icon: Shirt,
  },
]

export default function Features() {
  return (
    <section className="container space-y-16 py-24 md:py-32">
      <div className="mx-auto max-w-[58rem] text-center">
        <h2 className="font-bold text-3xl leading-[1.1] sm:text-3xl md:text-5xl">Top-Flight Talent</h2>
        <p className="mt-4 text-muted-foreground sm:text-lg">
          We&apos;ve booked and promoted hundreds of shows over the years.  Come partner with us on an upcoming event
        </p>
      </div>
      <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 md:grid-cols-2">
        {features.map((feature) => (
          <div key={feature.name} className="relative overflow-hidden rounded-lg border bg-background p-8">
            <div className="flex items-center gap-4">
              <feature.icon className="h-8 w-8" />
              <h3 className="font-bold">{feature.name}</h3>
            </div>
            <p className="mt-2 text-muted-foreground">{feature.description}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

