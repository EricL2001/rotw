"use client"

import { useState } from "react"
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

  const handleNavigation = async () => {
    setIsLoading(true)
    router.push(`/shows/${slug}`)
    // Loading state will persist until the new page loads
  }

  return (
    <Button 
      variant="outline" 
      className="border-orange-500 hover:bg-gray-800 hover:text-white"
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
