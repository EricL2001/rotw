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
  }
}

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!)

export function TicketSelector({ show }: TicketSelectorProps) {
  const [quantity, setQuantity] = useState(1)
  const [isLoading, setIsLoading] = useState(false)
  const subtotal = quantity * show.price

  const handleCheckout = async () => {
    try {
      setIsLoading(true)
      const { clientSecret } = await createCheckoutSession(
        show.title,
        show.price,
        quantity,
        'price_1N1YbaGcf98b29zSdb4cDVhe' // should be the ticket fee of $2.50
      )

      const stripe = await stripePromise
      if (!stripe) throw new Error('Stripe failed to initialize')

      const result = await stripe.redirectToCheckout({
        sessionId: clientSecret || (() => { throw new Error('Client secret is null') })()
      })

      if (result.error) {
        throw new Error(result.error.message)
      }
    } catch (error) {
      console.error('Error:', error)
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
            onClick={() => setQuantity(quantity + 1)}
          >
            <Plus className="h-4 w-4" />
          </Button>
        </div>
        <div className="text-right">
          <p className="text-sm text-gray-400">Subtotal</p>
          <p className="text-xl font-mono">${(subtotal).toFixed(2)}</p>
        </div>
      </div>

      <Dialog>
        <DialogTrigger asChild>
          <Button
            className="w-fit text-lg px-6 py-3 text-white/80 font-semibold"
            variant="orange"
            disabled={quantity === 0 || isLoading}
            onClick={handleCheckout}
          >
            {isLoading ? 'Processing...' : 'BUY TIX'}
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Tickets</DialogTitle>
            <DialogDescription>
              Review your order before checkout
            </DialogDescription>
          </DialogHeader>
          <div className="flex items-center space-x-2 py-4">
            <div>
              <h4 className="font-medium">{show.title}</h4>
              <p className="text-sm text-muted-foreground">
                {quantity} × ${show.price} = ${subtotal.toFixed(2)}
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