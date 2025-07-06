export interface ShowPayment {
  id: number;
  show_id: string;
  show_title: string;
  venue: string;
  show_date: string;
  price: number;
  dos_price?: number;
  stripe_payment_id: string;
  ticket_quantity: number;
  amount_paid: number;
  fee_amount: number;
  payment_status: string;
  created_at: string;
  updated_at: string;
}

export interface PaymentsSummary {
  totalPayments: number;
  totalTicketsSold: number;
  totalRevenue: number;
  totalFees: number;
  uniqueShows: number;
  uniqueVenues: number;
}

export interface RecentActivity {
  paymentsLast7Days: number;
  ticketsLast7Days: number;
  revenueLast7Days: number;
}

export interface PaymentsResponse {
  success: boolean;
  data: {
    payments: ShowPayment[];
    summary: PaymentsSummary;
    recentActivity: RecentActivity;
  };
}