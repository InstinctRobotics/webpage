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
  title: 'Instinct Robotics',
  description: 'Innovative computer vision solutions for industrial robotics.',
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
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} ${orbitron.variable} scroll-smooth`} suppressHydrationWarning>
      <body className="bg-black text-slate-50 antialiased" suppressHydrationWarning>
        {children}
      </body>
    </html>
  )
}
