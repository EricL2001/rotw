import { neon } from '@neondatabase/serverless';
import { connection } from 'next/server';

// Initialize Neon client
const sql = neon(process.env.DATABASE_URL!);

export async function GET() {
  // Signal that this route uses dynamic data
  await connection();
  
  try {
    // Fetch all payment records
    const payments = await sql`
      SELECT 
        id,
        show_id,
        show_title,
        venue,
        show_date,
        ticket_price,
        is_dos_price,
        ticket_quantity,
        total_ticket_price,
        customer_name,
        customer_email,
        total_amount_paid,
        tax_total,
        fee_amount,
        stripe_payment_id,
        created_at,
        updated_at
      FROM show_payments_final
      ORDER BY created_at DESC
      LIMIT 100
    `;

    // Calculate summary statistics
    const [summary] = await sql`
      SELECT 
        COUNT(*) as total_payments,
        SUM(ticket_quantity) as total_tickets_sold,
        SUM(total_amount_paid) as total_revenue,
        SUM(total_ticket_price) as gross_ticket_revenue,
        SUM(fee_amount) as total_fees,
        COUNT(DISTINCT show_id) as unique_shows,
        COUNT(DISTINCT venue) as unique_venues
      FROM show_payments_final
    `;

    // Recent activity (last 7 days)
    const [recentActivity] = await sql`
      SELECT 
        COUNT(*) as recent_payments,
        SUM(ticket_quantity) as recent_tickets,
        SUM(total_amount_paid) as recent_revenue
      FROM show_payments_final
      WHERE created_at >= NOW() - INTERVAL '7 days'
    `;

    // Aggregated per-show performance (no LIMIT — always accurate)
    const showPerformanceRows = await sql`
      SELECT
        show_id,
        MAX(show_title) as show_title,
        MAX(venue) as venue,
        MAX(show_date) as show_date,
        SUM(total_amount_paid) as total_revenue,
        SUM(total_ticket_price) as gross_ticket_revenue,
        SUM(ticket_quantity) as total_tickets
      FROM show_payments_final
      GROUP BY show_id
      ORDER BY MAX(show_date) ASC
    `;

    const showPerformance = showPerformanceRows.map((row) => ({
      showId: row.show_id,
      showTitle: row.show_title,
      venue: row.venue,
      showDate: row.show_date,
      totalRevenue: parseFloat(row.total_revenue || 0),
      grossTicketRevenue: parseFloat(row.gross_ticket_revenue || 0),
      totalTickets: parseInt(row.total_tickets || 0),
    }));

    return Response.json({
      success: true,
      data: {
        payments,
        summary: {
          totalPayments: parseInt(summary.total_payments || 0),
          totalTicketsSold: parseInt(summary.total_tickets_sold || 0),
          totalRevenue: parseFloat(summary.total_revenue || 0),
          grossTicketRevenue: parseFloat(summary.gross_ticket_revenue || 0),
          totalFees: parseFloat(summary.total_fees || 0),
          uniqueShows: parseInt(summary.unique_shows || 0),
          uniqueVenues: parseInt(summary.unique_venues || 0),
        },
        recentActivity: {
          paymentsLast7Days: parseInt(recentActivity.recent_payments || 0),
          ticketsLast7Days: parseInt(recentActivity.recent_tickets || 0),
          revenueLast7Days: parseFloat(recentActivity.recent_revenue || 0),
        },
        showPerformance,
      }
    });

  } catch (error) {
    console.error('Sales API error:', error);
    
    return Response.json(
      { 
        success: false,
        error: 'Failed to fetch payment data',
        message: 'Internal server error'
      },
      { status: 500 }
    );
  }
}