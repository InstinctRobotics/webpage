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

export const metadata = {
  title: 'Instinct Robotics | Computer Vision & Robotics',
  description: 'Innovative computer vision solutions for industrial robotics.',
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
