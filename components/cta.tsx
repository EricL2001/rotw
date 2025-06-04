"use client"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Mail } from "lucide-react"
import { useState } from "react"

export default function CTA() {
  const [open, setOpen] = useState(false)

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
        
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button size="lg" className="mt-4 px-8 text-white/80" variant="orange">
              Join E-mail List
            </Button>
          </DialogTrigger>
          <DialogContent className="w-[350px] sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Join Our Email List</DialogTitle>
              <DialogDescription>
                Stay updated on shows, pre-sales, new merch and more
              </DialogDescription>
            </DialogHeader>
            <div className="flex items-center justify-center py-8">
              <div className="text-center">
                <Mail className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                <h4 className="font-medium mb-2">Coming Soon!</h4>
                <p className="text-sm text-muted-foreground">
                  We&#39;re working on our email signup. Check back soon for updates on shows and more.
                </p>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" className="w-full" onClick={() => setOpen(false)}>
                Close
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </section>
  )
}