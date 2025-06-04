import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Buy Tickets to Upcoming Shows - Records On The Wall",
  description: "Purchase tickets to all our upcoming shows in Charlotte, NC and Denver, CO.",
  openGraph: {
    title: 'Upcoming Shows - Records On The Wall',
    description: 'Purchase tickets to all our upcoming shows in Charlotte, NC and Denver, CO.',
    url: 'https://recordsonthewall.co/shows',
    siteName: 'Records On The Wall',
    images: [
      {
        url: '/open-graph-2.png', // You can create a specific image for shows
        width: 1200,
        height: 630,
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Upcoming Shows - Records On The Wall',
    description: 'Browse all our upcoming free and ticketed shows in Charlotte, NC and Denver, CO.',
    images: ['/open-graph-shows.png'],
  },
};

export default function ShowsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children;
}