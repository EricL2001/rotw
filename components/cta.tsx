import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export default function CTA() {

  return (
    <section>
      <div
        className={cn(
          "container flex flex-col items-center gap-4 py-16 text-center",
        )}
      >
        <h2 className="font-semibold text-3xl leading-[1.1] sm:text-3xl md:text-4xl">
          Stay Updated
        </h2>
        <p className="max-w-[42rem] leading-normal text-muted-foreground sm:text-xl sm:leading-8">
          Join the list and take the ride with 3,000+ other music freaks. Stay updated on shows, pre-sales, new merch and more.
        </p>
        <Button size="lg" className="mt-4 px-8 text-white/80" variant="orange">
          Join E-mail List
        </Button>
      </div>
    </section>
  )
}

