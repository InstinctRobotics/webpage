'use client'

import { useState } from 'react'
import { Globe, ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import company from '@/data/company.json'
import Contact from '@/components/Contact'
import Footer from '@/components/Footer'

export default function RaptOS() {
  const [lang, setLang] = useState<'it' | 'en'>('en')

  return (
    <main className="min-h-screen bg-bg text-text selection:bg-brand selection:text-white flex flex-col justify-between">
      {/* Header / Nav */}
      <nav className="fixed top-0 w-full z-50 bg-bg/80 backdrop-blur-md border-b border-white/5 py-4">
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          <Link href="/" className="flex items-center gap-3">
            <Image
              src={company.logo}
              alt="Instinct Robotics Logo"
              width={24}
              height={24}
              className="brightness-0 invert opacity-80"
              referrerPolicy="no-referrer"
            />
            <span className="text-xl font-display font-bold tracking-tighter text-white uppercase transition-opacity opacity-80 hover:opacity-100">
              INSTINCT ROBOTICS
            </span>
          </Link>

          <div className="flex items-center gap-6">
            <button
              onClick={() => setLang(lang === 'it' ? 'en' : 'it')}
              className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-text/70 hover:text-white transition-colors"
            >
              <Globe size={14} />
              {lang === 'it' ? 'EN' : 'IT'}
            </button>
            <Link
              href="/"
              className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-text/70 hover:text-brand transition-colors"
            >
              <ArrowLeft size={14} />
              {lang === 'it' ? 'Home' : 'Home'}
            </Link>
          </div>
        </div>
      </nav>

      {/* Main Contact Section */}
      <div className="pt-20 flex-grow flex flex-col justify-center">
        <Contact lang={lang} />
      </div>

      {/* Footer */}
      <Footer lang={lang} />
    </main>
  )
}
