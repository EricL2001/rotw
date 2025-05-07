import "./globals.css"
import { GeistSans } from 'geist/font/sans';
import type React from "react"
import type { Metadata, Viewport } from "next"
import Navbar from "@/components/navbar";


export const viewport: Viewport = {
  width: "device-width",
  themeColor: "black",
  initialScale: 1,
  maximumScale: 1,
}

export const metadata: Metadata = {
  title: "Boogie On",
  description: "Helping Charlotte Boogie Since 2018.  Live music booking, promotion and ticketing.",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Boogie On",
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
  metadataBase: new URL('https://recordsonthewall.co'),
  openGraph: {
    title: 'Records On The Wall',
    description: 'Helping Charlotte Boogie Since 2018.  Live music booking, promotion and ticketing.',
    url: 'https://recordsonthewall.co',
    siteName: 'Records On The Wall',
    images: [
      {
        url: '/card-placeholder.jpg', // Path to your open graph image
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
        <div className="relative z-10">
          <Navbar />
          {children}
        </div>
      </body>
    </html>
  )
}