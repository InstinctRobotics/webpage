import { Inter, Space_Grotesk } from 'next/font/google'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
})

const spaceGrotesk = Space_Grotesk({
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
    <html lang="it" className={`${inter.variable} ${spaceGrotesk.variable} scroll-smooth`}>
      <body className="bg-slate-950 text-slate-50 antialiased" suppressHydrationWarning>
        {children}
      </body>
    </html>
  )
}
