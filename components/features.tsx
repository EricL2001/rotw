import { Music, Shirt, Zap, Ticket } from "lucide-react"

const features = [
  {
    name: "Booking",
    description: "Vivamus arcu odio, eleifend ut libero ut, vulputate tristique leo.",
    icon: Music,
  },
  {
    name: "Promotion",
    description: "Vivamus arcu odio, eleifend ut libero ut, vulputate tristique leo.",
    icon: Zap,
  },
  {
    name: "Ticketing",
    description: "Vivamus arcu odio, eleifend ut libero ut, vulputate tristique leo.",
    icon: Ticket,
  },
  {
    name: "Merch Store",
    description: "Vivamus arcu odio, eleifend ut libero ut, vulputate tristique leo.",
    icon: Shirt,
  },
]

export default function Features() {
  return (
    <section className="container space-y-16 py-24">
      <div className="mx-auto max-w-[58rem] text-center">
        <h2 className="font-bold text-3xl leading-[1.1] md:text-4xl lg:text-5xl">Welcome to the new ROTW</h2>
        <p className="mt-4 text-muted-foreground sm:text-lg">
          Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.
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

