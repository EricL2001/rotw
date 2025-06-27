"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Check, AlertCircle, Mail } from "lucide-react"
import { useState } from "react"

interface EmailSignupProps {
  onSuccess?: () => void;
  className?: string;
}

export default function EmailSignup({ onSuccess, className }: EmailSignupProps) {
  const [email, setEmail] = useState('')
  const [firstName, setFirstName] = useState('')
  const [loading, setLoading] = useState(false)
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [message, setMessage] = useState('')
  const [emailFocused, setEmailFocused] = useState(false)
  const [firstNameFocused, setFirstNameFocused] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setStatus('idle')

    try {
      const response = await fetch('/api/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email.trim(),
          firstName: firstName.trim(),
        }),
      })

      const data = await response.json()

      if (response.ok) {
        setStatus('success')
        setMessage(data.message)
        // Clear form fields and focus states
        setEmail('')
        setFirstName('')
        setEmailFocused(false)
        setFirstNameFocused(false)
        onSuccess?.()
        
        // Auto-hide success message after 5 seconds
        setTimeout(() => {
          setStatus('idle')
          setMessage('')
        }, 5000)
      } else {
        setStatus('error')
        setMessage(data.error)
      }
    } catch {
      setStatus('error')
      setMessage('Network error. Please check your connection and try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className={`bg-background border border-border rounded-lg p-8 ${className}`}>
      {/* Header */}
      <div className="text-center mb-8">
        <Mail className="h-8 w-8 mx-auto mb-2 text-orange-500" />
        <h3 className="font-medium text-xl mb-2">Join Our Email List</h3>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="email" className="text-sm font-medium">
            Email Address *
          </Label>
          <Input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onFocus={() => setEmailFocused(true)}
            onBlur={() => setEmailFocused(false)}
            placeholder={emailFocused ? "" : "your@email.com"}
            required
            disabled={loading}
            className="w-full"
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="firstName" className="text-sm font-medium">
            First Name (Optional)
          </Label>
          <Input
            id="firstName"
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            onFocus={() => setFirstNameFocused(true)}
            onBlur={() => setFirstNameFocused(false)}
            placeholder={firstNameFocused ? "" : "Your first name"}
            disabled={loading}
            className="w-full"
          />
        </div>

        {/* Submit Button */}
        <Button 
          type="submit" 
          className="w-full" 
          disabled={loading}
          variant="orange"
          size="lg"
        >
          {loading ? 'Subscribing...' : 'Subscribe'}
        </Button>
      </form>

      {/* Success Message */}
      {status === 'success' && (
        <div className="flex items-center gap-2 text-green-600 text-sm bg-green-50 dark:bg-green-950/20 p-3 rounded-md border border-green-200 dark:border-green-800 mt-4">
          <Check className="h-4 w-4 flex-shrink-0" />
          <span>Successfully subscribed! Welcome to the list.</span>
        </div>
      )}

      {/* Error Message */}
      {status === 'error' && (
        <div className="flex items-center gap-2 text-red-500 text-sm bg-red-50 dark:bg-red-950/20 p-3 rounded-md border border-red-200 dark:border-red-800 mt-4">
          <AlertCircle className="h-4 w-4 flex-shrink-0" />
          <span>{message}</span>
        </div>
      )}

      {/* Footer Text */}
      <p className="text-xs text-muted-foreground text-center mt-4">
        We respect your privacy. Unsubscribe at any time.
      </p>
    </div>
  )
}