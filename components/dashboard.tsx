"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { PaymentsResponse, ShowPayment } from "@/lib/types/payments"
import { format } from "date-fns"
import { DollarSign, Ticket, Calendar, MapPin, Users } from "lucide-react"

export default function Dashboard() {
  const [data, setData] = useState<PaymentsResponse | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/dashboard')
        const result = await response.json()
        
        if (result.success) {
          setData(result)
        } else {
          setError(result.error || 'Failed to load data')
        }
      } catch {
        setError('Network error')
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  if (loading) {
    return (
      <div className="container mx-auto p-6">
        <div className="animate-pulse space-y-6">
          <div className="h-8 bg-gray-200 rounded w-1/4"></div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-24 bg-gray-200 rounded"></div>
            ))}
          </div>
          <div className="h-96 bg-gray-200 rounded"></div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="container mx-auto p-6">
        <Card>
          <CardContent className="pt-6">
            <div className="text-center text-red-500">
              <p>Error loading dashboard: {error}</p>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  const { summary, recentActivity, payments } = data!.data

  return (
    <div className="container mx-auto p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-semibold">Sales Dashboard</h1>
        <p className="text-muted-foreground">Records On The Wall ticket sales overview</p>
      </div>

      {/* Summary Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 pb-8">
        <Card className="border border-green-200 dark:border-green-800">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium"> YTD Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">${summary.totalRevenue.toFixed(2)}</div>
            <p className="text-xs text-muted-foreground">
              +${recentActivity.revenueLast7Days.toFixed(2)} last 7 days
            </p>
          </CardContent>
        </Card>

        <Card className="border border-blue-200 dark:border-blue-800">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">YTD Tickets Sold</CardTitle>
            <Ticket className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{summary.totalTicketsSold}</div>
            <p className="text-xs text-muted-foreground">
              +{recentActivity.ticketsLast7Days} last 7 days
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Shows</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{summary.uniqueShows}</div>
            <p className="text-xs text-muted-foreground">
              {summary.uniqueVenues} venues
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Payments</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{summary.totalPayments}</div>
            <p className="text-xs text-muted-foreground">
              +{recentActivity.paymentsLast7Days} last 7 days
            </p>
          </CardContent>
        </Card>
      </div> 

      <hr className="border-t border-gray-600 my-8 py-4" />
      
      {/* Individual Show Performance */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            Show Performance
          </CardTitle>
          <CardDescription>
            Revenue and ticket sales by show
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {Object.entries(
              payments.reduce((acc: Record<string, {
                venue: string;
                totalRevenue: number;
                totalTickets: number;
                showDate: string;
              }>, payment: ShowPayment) => {
                const key = payment.show_title;
                if (!acc[key]) {
                  acc[key] = {
                    venue: payment.venue,
                    totalRevenue: 0,
                    totalTickets: 0,
                    showDate: payment.show_date
                  };
                }
                acc[key].totalRevenue += Number(payment.total_amount_paid);
                acc[key].totalTickets += Number(payment.ticket_quantity);
                return acc;
              }, {})
            )
            .sort(([, a], [, b]) => new Date(a.showDate).getTime() - new Date(b.showDate).getTime())
            .map(([showTitle, data]) => (
              <Card key={showTitle} className="border-gray-600 border-l-4 border-l-orange-600 border-r-4 border-r-orange-600">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg">{showTitle}</CardTitle>
                  <CardDescription className="flex items-center gap-1">
                    <MapPin className="h-3 w-3" />
                    {data.venue}
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Total Revenue</span>
                      <span className="font-semibold text-green-600">${data.totalRevenue.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Tickets Sold</span>
                      <span className="font-semibold text-blue-600">{data.totalTickets}</span>
                    </div>
                    <div className="flex justify-between items-center pt-3 border-t">
                      <span className="text-xs text-muted-foreground">Show Date</span>
                      <span className="text-xs font-medium">{format(new Date(data.showDate), 'MMM dd, yyyy')}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}