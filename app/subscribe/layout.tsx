import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Join Our Email List • Records On The Wall",
  description: "Join our email list to stay updated on shows, pre-sales, new merch and more.",
  openGraph: {
    title: 'Join Our Email List • Records On The Wall',
    description: 'Join our email list to stay updated on shows, pre-sales, new merch and more.',
    url: 'https://recordsonthewall.co/subscribe',
    siteName: 'Records On The Wall',
    images: [
      {
        url: '/open-graph.png', // You can create a specific image for shows
        width: 1200,
        height: 630,
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Join Our Email List • Records On The Wall',
    description: 'Stay updated on shows, pre-sales, new merch and more.',
    images: ['/open-graph.png'],
  },
};

export default function SubscribeLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children;
}