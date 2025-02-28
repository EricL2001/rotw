import "./globals.css"
import { Inter } from "next/font/google"
import type React from "react"
import type { Metadata, Viewport } from "next"

const inter = Inter({ subsets: ["latin"] })

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
  openGraph: {
    type: 'website',
    siteName: 'Records On The Wall',
    title: 'Records On The Wall',
    description: 'Helping Charlotte Boogie Since 2018.  Live music booking, promotion and ticketing.',
  },
};




export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.className} bg-background text-foreground antialiased`}>{children}</body>
    </html>
  )
}

