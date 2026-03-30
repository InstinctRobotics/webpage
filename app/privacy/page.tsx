'use client'
import { useState } from 'react'
import { motion } from 'motion/react'
import { ArrowLeft, Globe } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import company from '@/data/company.json'

export default function Privacy() {
  const [lang, setLang] = useState<'it' | 'en'>('en')

  return (
    <main className="min-h-screen bg-bg text-text selection:bg-brand selection:text-white">
      {/* Header */}
      <nav className="fixed top-0 w-full z-50 bg-bg/80 backdrop-blur-md border-b border-white/5 py-4">
        <div className="max-w-4xl mx-auto px-6 flex justify-between items-center">
          <Link href="/" className="flex items-center gap-3">
             <Image 
               src={company.logo} 
               alt="Logo" 
               width={24} 
               height={24} 
               className="brightness-0 invert" 
             />
             <span className="text-xl font-display font-bold tracking-tighter uppercase whitespace-nowrap hidden md:block">
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
              {lang === 'it' ? 'Indietro' : 'Home'}
            </Link>
          </div>
        </div>
      </nav>

      {/* Content */}
      <div className="pt-32 pb-24 max-w-4xl mx-auto px-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }}
          className="bg-surface/30 border border-white/5 rounded-3xl p-8 md:p-12 shadow-2xl"
        >
          <h1 className="text-4xl md:text-5xl font-display font-bold">
            {company.privacy.title[lang]}
          </h1>

          <div className="space-y-8 mt-4">
            <p className="text-lg text-text/60 leading-relaxed">
              {company.privacy.lead[lang]}
            </p>

            {company.privacy.sections.map((section: any, i: number) => (
              <div key={i} className="space-y-4">
                <h2 className="text-xl font-display font-bold text-brand uppercase tracking-widest">
                  {section.title[lang]}
                </h2>
                <p className="text-lg text-text/60 leading-relaxed">
                  {section.desc[lang]}
                </p>
              </div>
            ))}
          </div>

        </motion.div>
      </div>
    </main>
  )
}
