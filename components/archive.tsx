"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { PaymentsResponse, ShowPayment } from "@/lib/types/payments"
import { format } from "date-fns"
import { toZonedTime } from "date-fns-tz"
import { Calendar, MapPin } from "lucide-react"
import { useRouter } from "next/navigation"

// helper function to parse date strings as UTC
const parseLocalDate = (dateString: string) => {
    if (!dateString || typeof dateString !== 'string') {
        console.error('Invalid date string:', dateString)
        return new Date() // fallback to current date
    }

    // Create a date object from the string. This will be in the runtime's timezone
    // or UTC if the string is in ISO format.
    const date = new Date(dateString)

    if (isNaN(date.getTime())) {
        console.error('Invalid date created from string:', dateString)
        return new Date() // fallback to current date
    }

    // Convert the parsed date to a UTC date object. This effectively "removes" the timezone
    // offset, treating the local date parts (year, month, day) as if they were UTC.
    return toZonedTime(date, 'UTC')
}

export default function Archive() {
    const [data, setData] = useState<PaymentsResponse | null>(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
    const router = useRouter()

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

    const { payments } = data!.data

    return (
        <div className="container mx-auto p-6 space-y-6">
            {/* Header */}
            <div>
                <h1 className="text-2xl font-semibold">Show Archive</h1>
                <p className="text-muted-foreground">Record of all past shows</p>
            </div>

            {/* Individual Show Performance */}
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Calendar className="h-5 w-5" />
                        Show Performance
                    </CardTitle>
                    <CardDescription>
                        Revenue and ticket sales by show (click to view customers)
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                        {Object.entries(
                            payments.reduce((acc: Record<string, {
                                venue: string;
                                totalRevenue: number;
                                grossTicketRevenue?: number;
                                totalTickets: number;
                                showDate: string;
                                showId: string;
                            }>, payment: ShowPayment) => {
                                const key = payment.show_title;
                                if (!acc[key]) {
                                    acc[key] = {
                                        venue: payment.venue,
                                        totalRevenue: 0,
                                        grossTicketRevenue: 0,
                                        totalTickets: 0,
                                        showDate: payment.show_date,
                                        showId: payment.show_id
                                    };
                                }
                                acc[key].totalRevenue += Number(payment.total_amount_paid);
                                acc[key].grossTicketRevenue = (acc[key].grossTicketRevenue || 0) + Number(payment.total_ticket_price || 0);
                                acc[key].totalTickets += Number(payment.ticket_quantity);
                                return acc;
                            }, {})
                        )

                            // THIS SHOULD RETURN ALL SHOWS OLDER THAN 30 DAYS
                            .filter(([, data]) => {
                                const showDate = parseLocalDate(data.showDate);
                                const today = new Date();
                                today.setHours(0, 0, 0, 0); // Set to start of today

                                // Calculate the date 30 days ago
                                const thirtyDaysAgo = new Date(today);
                                thirtyDaysAgo.setDate(today.getDate() - 30);

                                // Return only shows older than 30 days
                                return showDate < thirtyDaysAgo;
                            })
                            .sort(([, a], [, b]) => parseLocalDate(b.showDate).getTime() - parseLocalDate(a.showDate).getTime()) // Sort descending (most recent past shows first)


                            // Map to render clickable cards
                            .map(([showTitle, data]) => (
                                <Card
                                    key={showTitle}
                                    className="border-gray-600 border-l-4 border-l-orange-600 border-r-4 border-r-orange-600 cursor-pointer hover:shadow-lg hover:shadow-orange-500/20 hover:scale-[1.02] hover:border-orange-500 transition-all duration-300 ease-in-out"
                                    onClick={() => router.push(`/dashboard/${data.showId}`)}
                                >
                                    <CardHeader className="pb-4 space-y-0.5">
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
                                                <span className="font-semibold text-green-600">${data.totalRevenue.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                                            </div>
                                            <div className="flex justify-between items-center">
                                                <span className="text-sm text-muted-foreground">Gross Ticket Revenue</span>
                                                <span className="font-semibold text-green-400">${(data.grossTicketRevenue ?? 0).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                                            </div>
                                            <div className="flex justify-between items-center">
                                                <span className="text-sm text-muted-foreground">Tickets Sold</span>
                                                <span className="font-semibold text-blue-600">{data.totalTickets}</span>
                                            </div>
                                            <div className="flex justify-between items-center pt-3 border-t">
                                                <span className="text-xs text-muted-foreground">Show Date</span>
                                                <span className="text-xs font-medium">
                                                    {format(parseLocalDate(data.showDate), 'MMM dd, yyyy')}
                                                </span>
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