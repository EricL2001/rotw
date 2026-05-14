import "./globals.css"
import { GeistSans } from 'geist/font/sans';
import type React from "react"
import type { Metadata, Viewport } from "next"
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { Analytics } from '@vercel/analytics/next';


export const viewport: Viewport = {
  width: "device-width",
  themeColor: "black",
  initialScale: 1,
  maximumScale: 1,
}

export const metadata: Metadata = {
  title: "Records On The Wall | Booking, Promotion & Ticketing for Live Music Events",
  description: "Records On The Wall partners with independent venues and breweries to provide booking, promotion and ticketing services for live music events in Charlotte, NC and Denver, CO.",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Records On The Wall | Booking, Promotion & Ticketing for Live Music Events",
  },
  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/icon-android-192.jpg', sizes: '192x192', type: 'image/jpg' },
      { url: '/rotw-logo-512.jpg', sizes: '512x512', type: 'image/jpg' },
    ],
    apple: [
      { url: '/icon-ios-180.jpg', sizes: '180x180', type: 'image/jpg' },
    ],
  },
  manifest: '/manifest.json',
  applicationName: "Records On The Wall",
  metadataBase: new URL('https://www.recordsonthewall.co'),
  openGraph: {
    title: 'Records On The Wall',
    description: 'Records On The Wall partners with independent venues and breweries to provide booking, promotion and ticketing services for live music events.',
    url: 'https://www.recordsonthewall.co',
    siteName: 'Records On The Wall',
    images: [
      {
        url: 'https://www.recordsonthewall.co/og-shows.png', // Path to your open graph image
        width: 1200,
        height: 630,
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`dark ${GeistSans.className}`}>
        {/* Background gradients */}
        <div className="pointer-events-none fixed inset-0">
          <div className="absolute inset-0 bg-gradient-to-b from-background via-background/90 to-background" />
          <div className="absolute right-0 top-0 h-[500px] w-[500px] bg-amber-500/10 blur-[100px]" />
          <div className="absolute bottom-0 left-0 h-[500px] w-[500px] bg-amber-500/10 blur-[100px]" />
        </div>
        <div className="relative z-10 flex flex-col min-h-screen">
          <Navbar />
          <main className="flex-1">
            {children}
          </main>
          <Footer />
        </div>
        <Analytics />
      </body>
    </html>
  )
}