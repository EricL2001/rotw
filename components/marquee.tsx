import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export default function Marquee() {

  return (
    <section>
      <div
        className={cn(
          "container flex flex-col items-center gap-4 py-24 text-center md:py-32",
        )}
      >
        <h2 className="font-bold text-3xl leading-[1.1] sm:text-3xl md:text-5xl">
          Marquee
        </h2>
        <p className="max-w-[42rem] leading-normal text-muted-foreground sm:text-xl sm:leading-8">
          auto scrolling marquee of bands we worked with
        </p>
        <Button size="lg" className="mt-4">
          Get Started Today
        </Button>
      </div>
    </section>
  )
}