export interface ShowPayment {
  id: number;
  show_id: string;
  show_title: string;
  venue: string;
  show_date: string;
  ticket_price: number;
  is_dos_price?: boolean;
  ticket_quantity: number;
  total_ticket_price?: number;
  customer_name?: string;
  customer_email?: string;
  total_amount_paid: number;
  tax_total?: number;
  fee_amount: number;
  stripe_payment_id?: string;
  created_at: string;
  updated_at: string;
}

export interface PaymentsSummary {
  totalPayments: number;
  totalTicketsSold: number;
  totalRevenue: number;
  grossTicketRevenue: number;
  totalFees: number;
  uniqueShows: number;
  uniqueVenues: number;
}

export interface RecentActivity {
  paymentsLast7Days: number;
  ticketsLast7Days: number;
  revenueLast7Days: number;
}

// complete API response structure from app/api/dashboard/route.ts
export interface PaymentsResponse {
  success: boolean;
  data: {
    payments: ShowPayment[];
    summary: PaymentsSummary;
    recentActivity: RecentActivity;
  };
}