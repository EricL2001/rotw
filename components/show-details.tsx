"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { ArrowLeft, Users, Calendar, MapPin } from "lucide-react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"

interface CustomerTicket {
  id: number;
  customer_name: string;
  customer_email: string;
  ticket_quantity: number;
  total_amount_paid: number;
  created_at: string;
}

interface ShowDetails {
  show_title: string;
  venue: string;
  show_date: string;
  customers: CustomerTicket[];
}

interface ShowDetailsResponse {
  success: boolean;
  data: ShowDetails;
}

interface ShowDetailsProps {
  slug: string;
}

export default function ShowDetailsComponent({ slug }: ShowDetailsProps) {
  const [data, setData] = useState<ShowDetails | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  useEffect(() => {
    const fetchShowDetails = async () => {
      try {
        const response = await fetch(`/api/dashboard/${slug}`)
        const result: ShowDetailsResponse = await response.json()

        if (result.success) {
          setData(result.data)
        } else {
          setError('Failed to load show details')
        }
      } catch {
        setError('Network error')
      } finally {
        setLoading(false)
      }
    }

    fetchShowDetails()
  }, [slug])

  if (loading) {
    return (
      <div className="container mx-auto p-6">
        <div className="animate-pulse space-y-6">
          <div className="h-8 bg-gray-200 rounded w-1/4"></div>
          <div className="h-64 bg-gray-200 rounded"></div>
        </div>
      </div>
    )
  }

  if (error || !data) {
    return (
      <div className="container mx-auto p-6">
        <Card>
          <CardContent className="pt-6">
            <div className="text-center text-red-500">
              <p>Error loading show details: {error}</p>
              <Button 
                onClick={() => router.push('/dashboard')} 
                className="mt-4"
                variant="outline"
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Dashboard
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="container mx-auto p-6 space-y-6">
      {/* Header with Back Button */}
      <div className="flex items-center gap-4">
        <Button 
          onClick={() => router.push('/dashboard')} 
          variant="outline"
          size="sm"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Dashboard
        </Button>
        <div>
          <h1 className="text-3xl font-semibold">{data.show_title}</h1>
          <div className="flex items-center gap-4 text-muted-foreground mt-1">
            <div className="flex items-center gap-1">
              <MapPin className="h-4 w-4" />
              {data.venue}
            </div>
            <div className="flex items-center gap-1">
              <Calendar className="h-4 w-4" />
              {new Date(data.show_date).toLocaleDateString('en-US', { 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Customer Details Table */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5" />
            Customer Details ({data.customers.length} customers)
          </CardTitle>
          <CardDescription>
            All customers who purchased tickets for this show
          </CardDescription>
        </CardHeader>
        <CardContent>
          {data.customers.length > 0 ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Customer Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead className="text-center">Tickets</TableHead>
                  <TableHead className="text-right">Amount Paid</TableHead>
                  <TableHead className="text-right">Purchase Date</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {data.customers.map((customer) => (
                  <TableRow key={customer.id}>
                    <TableCell className="font-medium">
                      {customer.customer_name || 'N/A'}
                    </TableCell>
                    <TableCell>{customer.customer_email || 'N/A'}</TableCell>
                    <TableCell className="text-center">
                      {customer.ticket_quantity}
                    </TableCell>
                    <TableCell className="text-right font-semibold text-green-600">
                      ${customer.total_amount_paid.toLocaleString('en-US', { 
                        minimumFractionDigits: 2, 
                        maximumFractionDigits: 2 
                      })}
                    </TableCell>
                    <TableCell className="text-right">
                      {new Date(customer.created_at).toLocaleDateString('en-US')}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <div className="text-center py-8 text-muted-foreground">
              No customers found for this show.
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}