"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Loader2 } from "lucide-react"

interface ShowButtonProps {
  slug: string
  showType: string
}

export function ShowButton({ slug, showType }: ShowButtonProps) {
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  // Reset loading state when component mounts (e.g., when navigating back)
  useEffect(() => {
    setIsLoading(false)
  }, [])

  const handleNavigation = async () => {
    setIsLoading(true)
    router.push(`/shows/${slug}`)
  }

  return (
    <Button 
      variant="outline" 
      className="border-orange-500 hover:bg-orange-500 text-white"
      onClick={handleNavigation}
      disabled={isLoading}
    >
      {isLoading ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Loading...
        </>
      ) : (
        showType === 'Free' ? 'More Info' : 'Info & Tickets'
      )}
    </Button>
  )
}