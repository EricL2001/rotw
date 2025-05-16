"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { ShoppingCart, Plus, Minus } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { loadStripe } from '@stripe/stripe-js'
import { createCheckoutSession } from '@/lib/actions/stripeCheckout'

interface TicketSelectorProps {
  show: {
    title: string
    price: number
    promoPrice: number
    dosPrice: number
    venue: string
    showDate: Date | string
    showType: string
  }
}

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!)

function isSameDay(dateA: Date, dateB: Date) {
  return (
    dateA.getFullYear() === dateB.getFullYear() &&
    dateA.getMonth() === dateB.getMonth() &&
    dateA.getDate() === dateB.getDate()
  );
}

export function TicketSelector({ show }: TicketSelectorProps) {
  const [quantity, setQuantity] = useState(1)
  const [isLoading, setIsLoading] = useState(false)
  const subtotal = quantity * show.price
  //const promoSubtotal = quantity * show.promoPrice
  const dosSubtotal = quantity * show.dosPrice
  const shDate = new Date(show.showDate)  // this is the correct date for the show

  const handleCheckout = async () => {
    try {
      setIsLoading(true)
      const { sessionId } = await createCheckoutSession(
        show.title,
        show.price,
        show.dosPrice,
        quantity,
        typeof show.showDate === "string" ? show.showDate : show.showDate.toISOString(),
      )

      const stripe = await stripePromise
      if (!stripe) throw new Error('Stripe failed to initialize')

      // Add more logging
      // console.log('Redirecting to checkout with session ID:', sessionId);

      const result = await stripe.redirectToCheckout({
        sessionId
      })

      if (result.error) {
        console.error('Stripe redirect error:', result.error);
        throw new Error(result.error.message)
      }
    } catch (error) {
      console.error('Checkout error:', error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between p-4 border border-gray-700 rounded-lg">
        <div className="flex items-center gap-4">
          <Button
            variant="outline"
            size="icon"
            onClick={() => setQuantity(Math.max(0, quantity - 1))}
            disabled={quantity <= 0}
          >
            <Minus className="h-4 w-4" />
          </Button>
          <span className="text-xl font-mono">{quantity}</span>
          <Button
            variant="outline"
            size="icon"
            onClick={() => setQuantity(Math.min(8, quantity + 1))} // <-- Set max to 8
            disabled={quantity >= 8} // <-- Disable if at max
          >
            <Plus className="h-4 w-4" />
          </Button>
        </div>
        <div className="text-right">
          <p className="text-sm text-gray-400">Subtotal</p>
          <p className="text-xl font-mono">
            {(() => {
              const today = new Date();
              const isDosDay = isSameDay(shDate, today);
              return `$${(isDosDay ? dosSubtotal : subtotal).toFixed(2)}`;
            })()}
          </p>
          <p className="text-xs text-gray-400">plus tax and fee</p>
        </div>
      </div>

      <Dialog>
        <DialogTrigger asChild>
          <Button
            className="w-fit text-lg px-6 py-3 text-white/80 font-semibold"
            variant="orange"
            disabled={quantity === 0 || isLoading}
          >
            {isLoading ? 'Processing...' : 'BUY TIX'}
          </Button>
        </DialogTrigger>
        <DialogContent className="w-[400px] sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Ticket Cart</DialogTitle>
            <DialogDescription>
              Review your order before checkout
            </DialogDescription>
          </DialogHeader>
          <div className="flex items-center space-x-2 py-4">
            <div>
              <h4 className="font-medium">
                {show.title} on {new Date(show.showDate).toLocaleDateString(undefined, {
                  weekday: 'short',
                  month: 'short',
                  day: 'numeric',
                })}
              </h4>
              <p className="text-sm text-muted-foreground">
                {(() => {
                  const today = new Date();
                  const isDosDay = isSameDay(shDate, today);
                  const price = isDosDay ? show.dosPrice : show.price;
                  const total = isDosDay ? dosSubtotal : subtotal;
                  return `${quantity} × $${price} = $${total.toFixed(2)}`;
                })()}
              </p>
              <p className="text-sm text-muted-foreground">
                Sales Tax
              </p>
              <p className="text-sm text-muted-foreground">
                Fee
              </p>
            </div>
          </div>
          <DialogFooter>
            <Button
              onClick={handleCheckout}
              disabled={isLoading}
            >
              <ShoppingCart className="h-4 w-4 mr-2" />
              {isLoading ? 'Processing...' : 'Proceed to Checkout'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}