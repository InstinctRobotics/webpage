'use client'

import { useState } from 'react'
import { Globe, ArrowLeft, Download } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import company from '@/data/company.json'
import Contact from '@/components/Contact'
import Footer from '@/components/Footer'

export default function RaptOS() {
  const [lang, setLang] = useState<'it' | 'en'>('en')

  return (
    <main className="min-h-screen md:h-screen md:max-h-screen bg-bg text-text selection:bg-brand selection:text-white flex flex-col justify-between md:overflow-hidden">
      {/* Header / Nav */}
      <nav className="w-full z-50 bg-bg/80 backdrop-blur-md border-b border-white/5 py-4 flex-shrink-0">
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          <Link href="/" className="flex items-center gap-3 relative cursor-pointer group">
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[100%] h-[100%] bg-[#3C5366]/35 blur-[5px] squareed-full z-[-1]" />
            <div className="w-8 h-8 flex items-center justify-center relative overflow-hidden transition-transform group-hover:scale-105">
              <Image
                src={company.logo}
                alt="Instinct Robotics Logo"
                width={32}
                height={32}
                className="object-contain brightness-0 invert"
                referrerPolicy="no-referrer"
              />
            </div>
            <span className="text-2xl md:text-3xl font-display font-bold tracking-tighter text-white whitespace-nowrap drop-shadow-[0_0_10px_rgba(255,255,255,0.05)]">
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

      {/* Installer download */}
      <section className="w-full flex-shrink-0 px-6 pt-8">
        <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 rounded-2xl border border-white/10 bg-white/5 px-6 py-5">
          <div className="text-center md:text-left">
            <h2 className="text-lg font-display font-bold text-white">{company.contact.download.title[lang]}</h2>
            <p className="text-sm text-text/60 max-w-xl">{company.contact.download.description[lang]}</p>
          </div>
          <a
            href={company.contact.download.url}
            className="flex items-center gap-2 rounded-full bg-brand px-6 py-3 text-xs font-bold uppercase tracking-widest text-white hover:opacity-90 transition-opacity whitespace-nowrap"
          >
            <Download size={14} />
            {company.contact.download.cta[lang]}
          </a>
        </div>
      </section>

      {/* Main Hero Contact Section */}
      <div className="flex-1 w-full flex flex-col">
        <Contact
          lang={lang}
          title={company.contact.raptOsForm.title}
          cta={company.contact.raptOsForm.cta}
          className="w-full h-full flex-1 flex flex-col justify-center py-4"
          cardClassName="max-w-4xl"
        />
      </div>

      {/* Footer */}
      <div className="flex-shrink-0">
        <Footer lang={lang} />
      </div>
    </main>
  )
}
