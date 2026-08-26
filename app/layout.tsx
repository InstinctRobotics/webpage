import type { Metadata } from 'next'
import { Inter, Orbitron } from 'next/font/google'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
})

const orbitron = Orbitron({
  subsets: ['latin'],
  variable: '--font-display',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://instinctrobotics.ai'),
  title: 'Instinct Robotics',
  description: 'Innovative computer vision solutions for industrial robotics.',
  verification: {
    google: 'So7ichSa38bUEiF4sx16pD3PHNpTe-wAwkPQZF5MFKg',
  },
  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/icon-48.png', type: 'image/png', sizes: '48x48' },
      { url: '/icon-192.png', type: 'image/png', sizes: '192x192' },
      { url: '/icon.svg', type: 'image/svg+xml' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180' },
    ],
  },
  openGraph: {
    title: 'Instinct Robotics',
    description: '3D Vision for Industrial Robotics.',
    siteName: 'Instinct Robotics',
    images: [
      {
        url: '/logo.png',
        width: 1200,
        height: 1200,
        alt: 'Instinct Robotics Logo',
      },
    ],
    type: 'website',
  },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Instinct Robotics',
  url: 'https://instinctrobotics.ai',
  logo: 'https://instinctrobotics.ai/logo.png',
  image: 'https://instinctrobotics.ai/logo.png',
  description: 'Innovative computer vision solutions for industrial robotics.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} ${orbitron.variable} scroll-smooth`} suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="bg-black text-slate-50 antialiased" suppressHydrationWarning>
        {children}
      </body>
    </html>
  )
}
