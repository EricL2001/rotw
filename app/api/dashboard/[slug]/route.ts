import { NextRequest, NextResponse } from 'next/server'
import { pool } from '../../../../lib/db'

interface CustomerTicket {
    id: number;
    customer_name: string;
    ticket_quantity: number;
    customer_email: string;
    total_amount_paid: number;
    created_at: string;
}

interface ShowDetails {
    show_title: string;
    venue: string;
    show_date: string;
    customers: CustomerTicket[];
}

export async function GET(
    request: NextRequest,
    { params }: { params: { slug: string } }
) {
    try {
        const { slug } = await params
        const showId = slug

        // First, get the show details
        const showResult = await pool.query(`
      SELECT DISTINCT show_title, venue, show_date 
      FROM show_payments_final
      WHERE show_id = $1
    `, [showId])

        if (showResult.rows.length === 0) {
            return NextResponse.json({
                success: false,
                error: 'Show not found'
            }, { status: 404 })
        }

        // Get all customers for this show
        const customerResult = await pool.query(`
      SELECT 
        id,
        customer_name,
        ticket_quantity,
        customer_email,
        total_amount_paid,
        created_at
      FROM show_payments_final 
      WHERE show_id = $1
      ORDER BY created_at DESC
    `, [showId])

        const result: ShowDetails = {
            show_title: showResult.rows[0].show_title,
            venue: showResult.rows[0].venue,
            show_date: showResult.rows[0].show_date,
            customers: customerResult.rows
        }

        return NextResponse.json({
            success: true,
            data: result
        })

    } catch (error) {
        console.error('Database error:', error)
        return NextResponse.json({
            success: false,
            error: 'Internal server error'
        }, { status: 500 })
    }
}