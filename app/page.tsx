'use client'

import React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import emailjs from '@emailjs/browser'
import {
  Play,
  Mail,
  Linkedin,
  ChevronRight,
  Cpu,
  ShieldCheck,
  Zap,
  Menu,
  X,
  ArrowRight,
  Globe
} from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import dynamic from 'next/dynamic'
import Contact from '@/components/Contact'
import Footer from '@/components/Footer'
import MagneticButton from '@/components/MagneticButton'

const HeroScene = dynamic(() => import('@/components/HeroScene'), { ssr: false })
const SolutionScene = dynamic(() => import('@/components/SolutionScene'), { ssr: false })
const HowItWorksScene = dynamic(() => import('@/components/HowItWorksScene'), { ssr: false })


// Unified Data
import company from '@/data/company.json'
// --- Components ---

const Navbar = ({ lang, setLang }: { lang: 'it' | 'en', setLang: (l: 'it' | 'en') => void }) => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navLinks = lang === 'it' ? [
    { name: 'Home', href: '#' },
    { name: 'Soluzione', href: '#solution' },
    { name: 'Come Funziona', href: '#how-it-works' },
    { name: 'Contatti', href: '#contact' },
  ] : [
    { name: 'Home', href: '#' },
    { name: 'Solution', href: '#solution' },
    { name: 'How it Works', href: '#how-it-works' },
    { name: 'Contact', href: '#contact' },
  ]

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-500 border-none ${isScrolled ? 'bg-bg/90 backdrop-blur-md shadow-2xl shadow-black/80 py-2' : 'bg-transparent py-4'}`}>
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="flex items-center gap-3 relative cursor-pointer group">
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
          <span className="text-2xl md:text-3xl font-display font-bold tracking-tighter text-white whitespace-nowrap drop-shadow-[0_0_10px_rgba(255,255,255,0.05)] cursor-default">INSTINCT ROBOTICS</span>
        </button>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-[10px] font-bold text-text/70 hover:text-white transition-all relative group uppercase tracking-[0.2em]"
            >
              {link.name}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-brand transition-all group-hover:w-full" />
            </a>
          ))}

          {/* Language Switcher */}
          <button
            onClick={() => setLang(lang === 'it' ? 'en' : 'it')}
            className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-text/70 hover:text-white transition-colors group"
          >
            <Globe size={14} className="group-hover:rotate-12 transition-transform" />
            {lang === 'it' ? 'EN' : 'IT'}
          </button>

          <a
            href="#contact"
            className="px-6 py-2.5 bg-brand text-text hover:bg-accent transition-all rounded-full text-[10px] font-bold uppercase tracking-widest shadow-xl shadow-brand/10 active:scale-95 whitespace-nowrap flex items-center justify-center"
          >
            {lang === 'it' ? 'Richiedi una Demo' : 'Demo Request'}
          </a>
        </div>

        {/* Mobile Toggle */}
        <button className="md:hidden text-slate-50" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
          {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[-1]"
              onClick={() => setIsMobileMenuOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, x: '100%' }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="absolute top-0 right-0 h-screen w-[80%] max-w-sm bg-zinc-950 border-l border-white/5 p-10 flex flex-col gap-8 md:hidden shadow-2xl"
            >
              <div className="flex justify-end mb-4">
                <button onClick={() => setIsMobileMenuOpen(false)} className="text-slate-400 hover:text-white">
                  <X size={32} />
                </button>
              </div>
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.name}
                  href={link.href}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="text-2xl font-bold text-slate-100 hover:text-brand transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.name}
                </motion.a>
              ))}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="mt-auto pt-10 border-t border-white/5"
              >
                <button
                  onClick={() => { setLang(lang === 'it' ? 'en' : 'it'); setIsMobileMenuOpen(false); }}
                  className="flex items-center gap-3 text-lg font-bold text-brand uppercase tracking-widest"
                >
                  <Globe size={20} />
                  {lang === 'it' ? 'English' : 'Italiano'}
                </button>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </nav>
  )
}

const Hero = ({ lang }: { lang: 'it' | 'en' }) => {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      }
    }
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" as const } }
  }

  return (
    <section className="relative min-h-[90vh] flex flex-col justify-center pt-32 pb-20 overflow-hidden bg-bg">
      <HeroScene />

      {/* Background Elements */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(60,83,102,0.1)_0%,transparent_70%)] pointer-events-none" />


      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-brand/10 rounded-full blur-[120px] animate-pulse pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-accent/10 rounded-full blur-[120px] animate-pulse pointer-events-none" style={{ animationDelay: '1s' }} />

      <div className="max-w-7xl mx-auto px-6 relative z-10 flex-grow flex items-center justify-center text-center pb-[25vh]">
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="max-w-4xl flex flex-col items-center"
        >


          <motion.h1 variants={item} className="whitespace-pre-line text-4xl md:text-6xl lg:text-7xl font-display font-bold leading-[1.05] tracking-tighter mb-8 text-text cursor-default drop-shadow-2xl">
            {company.tagline[lang]}
          </motion.h1>

          <motion.p variants={item} className="text-xl md:text-2xl text-text/70 mb-12 max-w-2xl leading-relaxed drop-shadow-md">
            {company.subheadline[lang]}
          </motion.p>

          <motion.div variants={item} className="flex flex-wrap gap-5 justify-center">
            <MagneticButton href="#contact" className="px-10 py-5 bg-brand text-text rounded-full font-bold uppercase tracking-widest flex items-center gap-3 transition-all active:scale-95 shadow-[0_0_30px_rgba(60,83,102,0.4)] hover:shadow-[0_0_50px_rgba(122,140,152,0.6)] text-xs border border-brand/50">
              {lang === 'it' ? 'Richiedi una Demo' : 'Request Demo'} <ArrowRight className="group-hover:translate-x-1 transition-transform" />
            </MagneticButton>
            <MagneticButton href="#how-it-works" className="px-10 py-5 bg-surface/80 border border-white/20 hover:border-white/40 rounded-full font-bold uppercase tracking-widest transition-all backdrop-blur-md text-xs text-text flex items-center justify-center active:scale-95">
              {lang === 'it' ? 'Scopri come' : 'Discover How'}
            </MagneticButton>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

import { useScroll, useTransform } from 'motion/react'

const ProblemAndOutcome = ({ lang }: { lang: 'it' | 'en' }) => {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] })
  const yText = useTransform(scrollYProgress, [0, 1], [50, -50])
  const yBox = useTransform(scrollYProgress, [0, 1], [100, -100])

  return (
    <section id="solution" ref={ref} className="py-32 bg-surface/20 flex flex-col justify-center relative overflow-hidden">
      <SolutionScene />
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="flex flex-col gap-12 max-w-4xl mx-auto items-start">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-sm font-bold text-brand uppercase tracking-widest mb-4">{lang === 'it' ? 'La Sfida' : 'The Challenge'}</h2>
            <h3 className="text-4xl md:text-5xl font-display font-bold mb-8 leading-tight text-text">
              {lang === 'it' ? "I sistemi di visione tradizionali non bastano." : "Traditional Vision Systems are not enough."}
            </h3>
            <div className="flex flex-col gap-3 text-xl text-text/70 leading-relaxed">
              {company.problem[lang].split('\n').map((text, i) => (
                <motion.p
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + (i * 0.1) }}
                >
                  {text}
                </motion.p>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="w-full p-px rounded-[2rem] bg-gradient-to-b from-brand/50 to-transparent shadow-[0_0_50px_rgba(60,83,102,0.1)] group relative"
          >
            <div className="absolute -inset-1 bg-brand opacity-5 blur-2xl transition-opacity group-hover:opacity-10" />
            <div className="relative p-10 md:p-14 bg-surface/90 backdrop-blur-xl rounded-[2rem] overflow-hidden h-full border border-white/5">
              <h3 className="text-3xl font-display font-bold mb-8 text-white">
                {lang === 'it' ? 'La Nostra Soluzione' : 'Our Solution'}
              </h3>
              <div className="flex flex-col gap-6 text-xl text-text leading-relaxed font-medium">
                {company.outcome[lang].split('\n').map((text, i) => (
                  <motion.p
                    key={i}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 + (i * 0.1) }}
                  >
                    {text}
                  </motion.p>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

const HowItWorks = ({ lang }: { lang: 'it' | 'en' }) => {
  const steps = [
    { icon: <Cpu />, step: company.features.step1 },
    { icon: <Zap />, step: company.features.step2 },
    { icon: <ShieldCheck />, step: company.features.step3 },
  ]
  return (
    <section id="how-it-works" className="py-32 bg-bg overflow-hidden relative flex flex-col justify-center">
      <HowItWorksScene />
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-sm font-bold text-brand uppercase tracking-widest mb-4"
          >
            {lang === 'it' ? 'Come Funziona' : 'How It Works'}
          </motion.h2>
          <motion.h3
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl font-bold text-text mb-6"
          >
            {company.contact.howItWorks.title[lang]}
          </motion.h3>
          <p className="text-text/70 max-w-2xl mx-auto">
            {company.contact.howItWorks.sub[lang]}
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 relative">
          {/* Connecting Line */}
          <div className="hidden md:block absolute top-[40px] left-[10%] w-[80%] h-[2px] bg-white/5 z-0" />

          {steps.map((f, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.2 }}
              className="relative z-10 p-8 bg-surface/80 backdrop-blur-sm rounded-2xl border border-white/5 transition-all overflow-hidden"
            >
              <div className="w-16 h-16 rounded-2xl bg-bg border border-white/10 flex items-center justify-center mb-8 mx-auto transition-all text-brand">
                {f.icon}
              </div>
              <h4 className="text-lg font-display font-bold mb-4 text-center transition-colors text-text">
                {f.step.title[lang]}
              </h4>
              <p className="text-text/60 text-center leading-relaxed text-sm">
                {f.step.desc[lang]}
              </p>
            </motion.div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <MagneticButton href="#contact" magnetic={false} className="px-8 py-4 bg-brand text-text rounded-full font-bold uppercase tracking-widest active:scale-95 shadow-2xl shadow-brand/20 text-xs flex items-center gap-3">
            {lang === 'it' ? 'Inizia Ora' : 'Start Now'} <ArrowRight size={16} />
          </MagneticButton>
        </div>
      </div>
    </section>
  )
}



export default function Home() {
  const [lang, setLang] = useState<'it' | 'en'>('en')

  return (
    <main className="relative">
      <Navbar lang={lang} setLang={setLang} />
      <Hero lang={lang} />
      <ProblemAndOutcome lang={lang} />
      <HowItWorks lang={lang} />
      <Contact lang={lang} />
      <Footer lang={lang} />
    </main>
  )
}
