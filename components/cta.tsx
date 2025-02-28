import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export default function CTA() {

  return (
    <section>
      <div
        className={cn(
          "container flex flex-col items-center gap-4 py-24 text-center md:py-32",
        )}
      >
        <h2 className="font-bold text-3xl leading-[1.1] sm:text-3xl md:text-5xl">
          Stay updated
        </h2>
        <p className="max-w-[42rem] leading-normal text-muted-foreground sm:text-xl sm:leading-8">
          Join 3,000+ other music lovers on our e-mail list who stay updated on events, pre-sales and more.
        </p>
        <Button size="lg" className="mt-4">
          Join E-mail List
        </Button>
      </div>
    </section>
  )
}

