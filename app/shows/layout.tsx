import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Upcoming Shows • Records On The Wall",
  description: "View all upcoming shows",
  openGraph: {
    title: 'Upcoming Shows • Records On The Wall', // this is what shows up
    description: 'View all upcoming shows', // description for the shows page when shared on social media
    url: 'https://www.recordsonthewall.co/shows',
    siteName: 'Records On The Wall',
    images: [
      {
        url: '/og-shows.png', // You can create a specific image for shows
        width: 1200,
        height: 630,
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Upcoming Shows • Records On The Wall',
    description: 'View all upcoming shows.',
    images: ['/og-shows.png'],
  },
};

export default function ShowsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children;
}