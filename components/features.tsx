import { Music, Shirt, Zap, Ticket } from "lucide-react"

const features = [
  {
    name: "Booking",
    description: "We handle talent buying for free and ticketed live music events in NC and CO.",
    icon: Music,
  },
  {
    name: "Promotion",
    description: "We partner with the venues to promote all shows across available social media channels, email lists and media outlets.",
    icon: Zap,
  },
  {
    name: "Ticketing",
    description: "We run tickets for our own shows where permitted through our custom ticketing app.",
    icon: Ticket,
  },
  {
    name: "Merch Store",
    description: "Coming soon...",
    icon: Shirt,
  },
]

export default function Features() {
  return (
    <section className="container space-y-16 py-20">
      <div className="mx-auto max-w-[58rem] text-center">
        <h2 className="font-bold text-3xl leading-tight md:text-4xl">Welcome To The New Website</h2>
        <p className="mt-4 leading-normal text-muted-foreground sm:text-xl sm:leading-8">
          Records On The Wall is focused on booking the best local and national talent at venues located in Charlotte, NC and Denver, CO.
        </p>
        <p className="mt-4 leading-normal text-muted-foreground sm:text-xl sm:leading-8">
          We tend to book a diverse range of acts, from up-and-coming artists to established names in the areas of bluegrass, jam, funk, rock and beyond.
        </p>
      </div>
      <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 md:grid-cols-2">
        {features.map((feature) => (
          <div key={feature.name} className="relative overflow-hidden rounded-lg border-[0.5px] border-white bg-background p-8">
            <div className="flex items-center gap-4">
              <feature.icon className="h-8 w-8 stroke-orange-500" />
              <h3 className="font-bold">{feature.name}</h3>
            </div>
            <p className="mt-2 text-muted-foreground">{feature.description}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

