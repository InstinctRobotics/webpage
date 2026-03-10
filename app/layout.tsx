import { Inter, Outfit } from 'next/font/google'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
})

const outfit = Outfit({
  subsets: ['latin'],
  variable: '--font-display',
})

export const metadata = {
  title: 'Velaxys | Computer Vision & Robotics',
  description: 'Innovative computer vision solutions for industrial robotics.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="it" className={`${inter.variable} ${outfit.variable} scroll-smooth`}>
      <body className="bg-black text-slate-50 antialiased" suppressHydrationWarning>
        {children}
      </body>
    </html>
  )
}
