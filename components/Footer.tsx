'use client'

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Linkedin, Mail } from 'lucide-react'
import company from '@/data/company.json'

export default function Footer({ lang }: { lang: 'it' | 'en' }) {
  return (
    <section className="py-12 border-t border-white/5 bg-bg scroll-snap-align-end">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-8">
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-3">
            <Image
              src={company.logo}
              alt="Instinct Robotics Logo"
              width={24}
              height={24}
              className="brightness-0 invert opacity-80"
              referrerPolicy="no-referrer"
            />
            <span className="text-xl font-display font-bold tracking-tighter text-white uppercase transition-opacity opacity-80 hover:opacity-100">INSTINCT ROBOTICS</span>
          </div>
          <div className="text-[10px] text-text/30 leading-relaxed max-w-xs">
            <p>{company.legal.address}</p>
            <p>
              {company.contact.footer.vatLabel[lang]}: {company.legal.vat} | REA: {company.legal.rea}
            </p>
            <p>{company.legal.capital}</p>
          </div>
        </div>

        <div className="flex flex-col md:flex-row items-center gap-4">
          <p className="text-text/50 text-sm" suppressHydrationWarning>
            © {new Date().getFullYear()} Instinct Robotics. {company.contact.footer.rights[lang]}
          </p>
          <span className="hidden md:inline text-white/10">|</span>
          <Link
            href="/privacy"
            className="text-text/30 hover:text-brand text-xs transition-colors uppercase tracking-widest font-bold"
          >
            {company.contact.footer.privacy[lang]}
          </Link>
        </div>

        <div className="flex gap-8 items-center">
          <a
            href="https://linkedin.com/company/instinctrobotics"
            target="_blank"
            className="flex items-center gap-3 group"
          >
            <div className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-text/50 group-hover:bg-brand group-hover:text-white transition-all">
              <Linkedin size={16} />
            </div>
            <span className="text-sm font-bold text-text/50 group-hover:text-white transition-colors">LinkedIn</span>
          </a>
          <a
            href="mailto:info@instinctrobotics.ai"
            className="flex items-center gap-3 group"
          >
            <div className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-text/50 group-hover:bg-brand group-hover:text-white transition-all">
              <Mail size={16} />
            </div>
            <span className="text-sm font-bold text-text/50 group-hover:text-white transition-colors">Email</span>
          </a>
        </div>
      </div>
    </section>
  )
}
