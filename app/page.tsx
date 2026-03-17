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

// Unified Data
import company from '@/data/company.json'
import expertise from '@/data/expertise.json'
import projects from '@/data/projects.json'
import founders from '@/data/founders.json'

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
    { name: 'Chi Siamo', href: '#about' },
    { name: 'Competenze', href: '#expertise' },
    { name: 'Progetti', href: '#projects' },
    { name: 'Team', href: '#team' },
    { name: 'Contatti', href: '#contact' },
  ] : [
    { name: 'Home', href: '#' },
    { name: 'About Us', href: '#about' },
    { name: 'Expertise', href: '#expertise' },
    { name: 'Projects', href: '#projects' },
    { name: 'Team', href: '#team' },
    { name: 'Contact', href: '#contact' },
  ]

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-500 border-none ${isScrolled ? 'bg-black/90 backdrop-blur-md shadow-2xl shadow-black/80 py-2' : 'bg-transparent py-4'}`}>
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <button onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})} className="flex items-center gap-3 group">
          <div className="relative w-8 h-8 flex items-center justify-center overflow-hidden transition-transform group-hover:scale-110">
             <Image 
               src={company.logo} 
               alt="Instinct Robotics Logo" 
               width={32} 
               height={32} 
               className="object-contain"
               referrerPolicy="no-referrer"
             />
          </div>
          <span className="text-xl font-display font-bold tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-brand to-accent whitespace-nowrap">Instinct Robotics</span>
        </button>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a 
              key={link.name} 
              href={link.href} 
              className="text-[10px] font-bold text-slate-400 hover:text-brand transition-all relative group uppercase tracking-[0.2em]"
            >
              {link.name}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-brand transition-all group-hover:w-full" />
            </a>
          ))}
          
          {/* Language Switcher */}
          <button 
            onClick={() => setLang(lang === 'it' ? 'en' : 'it')}
            className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-slate-400 hover:text-brand transition-colors group"
          >
            <Globe size={14} className="group-hover:rotate-12 transition-transform" />
            {lang === 'it' ? 'EN' : 'IT'}
          </button>

          <a 
            href="#contact" 
            className="px-6 py-2.5 bg-brand text-white hover:bg-accent transition-all rounded-full text-[10px] font-bold uppercase tracking-widest shadow-xl shadow-brand/10 active:scale-95"
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
                  className="text-2xl font-display font-bold text-slate-100 hover:text-brand transition-colors"
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
  const isVideo = (url: string) => /\.(mp4|webm|ogg)$/i.test(url);

  return (
    <section className="relative min-h-screen flex flex-col justify-center pt-20 overflow-hidden bg-black">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(74,93,78,0.05)_0%,transparent_70%)]" />
      
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-brand/5 rounded-full blur-[120px]" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-accent/5 rounded-full blur-[120px]" />
      
      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center relative z-10 flex-grow">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand/10 border border-brand/20 text-brand text-[10px] font-bold uppercase tracking-[0.2em] mb-8">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-brand"></span>
            </span>
            Organic Intelligence
          </div>
          <h1 className="text-5xl sm:text-6xl lg:text-8xl font-display font-bold leading-[0.95] tracking-tighter mb-8">
            {company.tagline[lang]}
          </h1>
          <p className="text-lg text-slate-400 mb-10 max-w-lg leading-relaxed border-l border-brand/20 pl-6">
            {lang === 'it' 
              ? 'Rendiamo i robot capaci di muoversi con la naturalezza e l\'intuito di una persona, adattandosi istantaneamente a ogni sfida.'
              : 'Enabling robots to move with the naturalness and intuition of a person, adapting instantly to every challenge.'}
          </p>
          <div className="flex flex-wrap gap-5">
            <a href="#projects" className="px-10 py-5 bg-brand text-white rounded-full font-bold uppercase tracking-widest flex items-center gap-3 transition-all group shadow-2xl shadow-brand/20 active:scale-95 text-xs">
              {lang === 'it' ? 'Vedi in Azione' : 'See in Action'} <ArrowRight className="group-hover:translate-x-1 transition-transform" />
            </a>
            <a href="#contact" className="px-10 py-5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-full font-bold uppercase tracking-widest transition-all backdrop-blur-md active:scale-95 text-xs">
              {lang === 'it' ? 'Contattaci' : 'Contact Us'}
            </a>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          className="relative hidden lg:block"
        >
          <div className="relative z-10 rounded-3xl overflow-hidden border border-white/10 shadow-2xl shadow-brand/5 group aspect-[4/5]">
            {isVideo(company.heroMedia) ? (
              <video 
                src={company.heroMedia}
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-full object-cover brightness-90 group-hover:brightness-100 transition-all duration-1000 ease-in-out scale-105 group-hover:scale-100"
              />
            ) : (
              <Image 
                src={company.heroMedia} 
                alt="Robot Vision" 
                fill
                className="object-cover brightness-90 group-hover:brightness-100 transition-all duration-1000 ease-in-out scale-105 group-hover:scale-100"
                referrerPolicy="no-referrer"
              />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
            
            <div className="absolute bottom-8 left-8 p-6 bg-black/40 backdrop-blur-md rounded-2xl border border-white/10">
              <p className="text-3xl font-display font-bold leading-none mb-1 text-brand">{company.stats[0].value}</p>
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/60">{company.stats[0].label[lang]}</p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Stats Row */}
      <div className="w-full bg-black/50 backdrop-blur-sm py-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {company.stats.map((stat, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-center group cursor-default"
              >
                <p className="text-4xl font-display font-bold text-white mb-1 group-hover:text-brand transition-all duration-300">{stat.value}</p>
                <p className="text-xs font-bold uppercase tracking-widest text-slate-500">{stat.label[lang]}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

const About = ({ lang }: { lang: 'it' | 'en' }) => {
  const features = [
    {
      icon: <Cpu className="text-brand" />,
      title: company.features.cuttingEdge.title[lang],
      desc: company.features.cuttingEdge.desc[lang]
    },
    {
      icon: <ShieldCheck className="text-accent" />,
      title: company.features.robustness.title[lang],
      desc: company.features.robustness.desc[lang]
    },
    {
      icon: <Zap className="text-brand" />,
      title: company.features.simulation.title[lang],
      desc: company.features.simulation.desc[lang]
    }
  ]

  return (
    <section id="about" className="py-24 bg-zinc-900/20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-xs font-bold text-brand uppercase tracking-widest mb-4">{lang === 'it' ? 'Chi Siamo' : 'About Us'}</h2>
            <h3 className="text-4xl md:text-5xl font-display font-bold mb-8 leading-tight">{lang === 'it' ? 'Innovazione Giovane, Risultati Solidi.' : 'Young Innovation, Solid Results.'}</h3>
            <p className="text-lg text-slate-400 mb-10 leading-relaxed">
              {company.story[lang]}
            </p>
            <div className="grid sm:grid-cols-2 gap-6 mt-12">
              <motion.div 
                whileHover={{ y: -5 }}
                className="p-8 bg-white/5 rounded-2xl border border-white/10 hover:border-brand/30 transition-all group"
              >
                <h4 className="text-sm font-bold mb-3 text-brand group-hover:translate-x-1 transition-transform uppercase tracking-[0.2em]">Mission</h4>
                <p className="text-sm text-slate-400 leading-relaxed">{company.mission[lang]}</p>
              </motion.div>
              <motion.div 
                whileHover={{ y: -5 }}
                className="p-8 bg-white/5 rounded-2xl border border-white/10 hover:border-accent/30 transition-all group"
              >
                <h4 className="text-sm font-bold mb-3 text-accent group-hover:translate-x-1 transition-transform uppercase tracking-[0.2em]">Vision</h4>
                <p className="text-sm text-slate-400 leading-relaxed">{company.vision[lang]}</p>
              </motion.div>
            </div>
          </motion.div>

          <div className="grid gap-6">
            {features.map((f, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="flex gap-6 p-6 bg-black rounded-none border border-white/5 hover:border-brand/30 transition-all group cursor-default"
              >
                <div className="w-12 h-12 shrink-0 rounded-none bg-white/5 flex items-center justify-center group-hover:scale-110 group-hover:bg-brand/10 transition-all">
                  {f.icon}
                </div>
                <div>
                  <h4 className="text-lg font-bold mb-2 group-hover:text-brand transition-colors uppercase tracking-tight">{f.title}</h4>
                  <p className="text-slate-400 text-sm leading-relaxed">{f.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

const Expertise = ({ lang }: { lang: 'it' | 'en' }) => {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768)
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  return (
    <section id="expertise" className="py-24 bg-black overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-xs font-bold text-brand uppercase tracking-widest mb-4"
          >
            {lang === 'it' ? 'Competenze' : 'Expertise'}
          </motion.h2>
          <motion.h3 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl font-display font-bold"
          >
            {lang === 'it' ? 'Aree di Specializzazione' : 'Specialization Areas'}
          </motion.h3>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-6 md:gap-10">
          {expertise.map((item, i) => (
            <motion.div
              key={item.id}
              initial="initial"
              whileInView={isMobile ? "active" : "initial"}
              whileHover="active"
              viewport={{ amount: 0.8, once: false }}
              className="flex flex-col items-center cursor-pointer"
            >
              <div className="relative overflow-hidden aspect-square w-full max-w-[280px] border border-white/10 rounded-3xl mb-6 group">
                <motion.div
                  variants={{
                    initial: { opacity: 0.7, scale: 1 },
                    active: { opacity: 1, scale: 1.05 }
                  }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                  className="w-full h-full relative"
                >
                  <Image 
                    src={item.image} 
                    alt={item.title[lang]} 
                    fill
                    className="object-cover"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-brand/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                </motion.div>
              </div>
              <motion.h4 
                variants={{
                  initial: { color: '#94a3b8' },
                  active: { color: '#4A5D4E' }
                }}
                className="text-[10px] md:text-sm font-bold uppercase tracking-[0.2em] text-center transition-all"
              >
                {item.title[lang]}
              </motion.h4>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

const Projects = ({ lang }: { lang: 'it' | 'en' }) => {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768)
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  return (
    <section id="projects" className="py-24 bg-black">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-sm font-bold text-brand uppercase tracking-widest mb-4"
          >
            Portfolio
          </motion.h2>
          <motion.h3 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl font-display font-bold"
          >
            {lang === 'it' ? 'I Nostri Progetti' : 'Our Projects'}
          </motion.h3>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, i) => (
            <motion.div
              key={project.id}
              initial="initial"
              whileInView={isMobile ? "active" : "initial"}
              whileHover="active"
              viewport={{ amount: 0.8, once: false }}
              transition={{ delay: i * 0.1 }}
              className="group relative bg-zinc-900/30 rounded-3xl overflow-hidden border border-white/5 hover:border-brand/30 transition-all duration-500"
            >
              <div className="aspect-video relative overflow-hidden bg-zinc-950">
                <motion.div
                  variants={{
                    initial: { opacity: 0 },
                    active: { opacity: 1 }
                  }}
                  className="absolute inset-0 z-10"
                >
                  <video 
                    src={project.videoUrl} 
                    className="w-full h-full object-cover"
                    autoPlay
                    loop
                    muted
                    playsInline
                  />
                </motion.div>
                <motion.div
                  variants={{
                    initial: { opacity: 1 },
                    active: { opacity: 0 }
                  }}
                  className="absolute inset-0"
                >
                  <Image 
                    src={project.thumbnail} 
                    alt={project.title[lang]} 
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700 grayscale group-hover:grayscale-0"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-black/40 group-hover:bg-black/10 transition-all" />
                </motion.div>
              </div>
              <div className="p-8">
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tags.map(tag => (
                    <span key={tag} className="text-[9px] font-bold uppercase tracking-wider px-2 py-1 bg-white/5 rounded-none text-slate-500 border border-white/5">
                      {tag}
                    </span>
                  ))}
                </div>
                <h4 className="text-xl font-bold mb-3 group-hover:text-brand transition-colors">{project.title[lang]}</h4>
                <p className="text-slate-400 text-sm leading-relaxed line-clamp-3">{project.description[lang]}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

const Founders = ({ lang }: { lang: 'it' | 'en' }) => {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768)
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  return (
    <section id="team" className="py-24 bg-zinc-900/10">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-sm font-bold text-brand uppercase tracking-widest mb-4"
          >
            {lang === 'it' ? 'Il Team' : 'The Team'}
          </motion.h2>
          <motion.h3 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl font-display font-bold"
          >
            {lang === 'it' ? 'I Fondatori' : 'The Founders'}
          </motion.h3>
        </div>

        <div className="grid md:grid-cols-2 gap-16 max-w-4xl mx-auto">
          {founders.map((founder, i) => (
            <motion.div
              key={founder.id}
              initial="initial"
              whileInView={isMobile ? "active" : "initial"}
              whileHover="active"
              viewport={{ amount: 0.8, once: false }}
              transition={{ delay: i * 0.2, duration: 0.8 }}
              className="group flex flex-col items-center text-center"
            >
              <div className="relative mb-8 overflow-hidden rounded-none w-48 h-48 md:w-64 md:h-64 border border-white/10 shadow-2xl shadow-black/50">
                <motion.div
                  variants={{
                    initial: { filter: 'grayscale(100%)', scale: 1 },
                    active: { filter: 'grayscale(0%)', scale: 1.1 }
                  }}
                  transition={{ duration: 1 }}
                  className="w-full h-full relative"
                >
                  <Image 
                    src={founder.image} 
                    alt={founder.name} 
                    fill
                    className="object-cover"
                    referrerPolicy="no-referrer"
                  />
                </motion.div>
                <motion.div 
                  variants={{
                    initial: { opacity: 0 },
                    active: { opacity: 1 }
                  }}
                  className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent transition-opacity duration-500" 
                />
              </div>
              <motion.h4 
                variants={{
                  initial: { color: '#ffffff' },
                  active: { color: '#4A5D4E' }
                }}
                className="text-2xl font-bold mb-1 transition-colors"
              >
                {founder.name}
              </motion.h4>
              <p className="text-brand font-medium mb-4 text-sm uppercase tracking-widest">{founder.role[lang]}</p>
              <p className="text-slate-400 text-sm leading-relaxed max-w-xs">{founder.bio[lang]}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

const Contact = ({ lang }: { lang: 'it' | 'en' }) => {
  const form = useRef<HTMLFormElement>(null)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    type: 'demo',
    message: ''
  })
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Support both prefixed and non-prefixed env vars for Vercel/Local compatibility
    const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID
    const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID
    const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY

    if (!serviceId || !templateId || !publicKey) {
      console.warn('EmailJS credentials missing. Mocking success.')
      setStatus('sending')
      setTimeout(() => {
        setStatus('success')
        setFormData({ name: '', email: '', type: 'demo', message: '' })
        setTimeout(() => setStatus('idle'), 5000)
      }, 1500)
      return
    }

    setStatus('sending')
    try {
      await emailjs.send(
        serviceId,
        templateId,
        {
          from_name: formData.name,
          from_email: formData.email,
          request_type: formData.type,
          message: formData.message,
          to_name: 'Instinct Robotics Team',
        },
        publicKey
      )
      setStatus('success')
      setFormData({ name: '', email: '', type: 'demo', message: '' })
      setTimeout(() => setStatus('idle'), 5000)
    } catch (error) {
      console.error('EmailJS Error:', error)
      setStatus('error')
      setTimeout(() => setStatus('idle'), 5000)
    }
  }

  return (
    <section id="contact" className="py-24 relative overflow-hidden bg-black">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-sm font-bold text-brand uppercase tracking-widest mb-4">{lang === 'it' ? 'Contatti' : 'Contact'}</h2>
            <h3 className="text-4xl font-display font-bold mb-8">{lang === 'it' ? 'Pronto a Innovare?' : 'Ready to Innovate?'}</h3>
            <p className="text-lg text-slate-400 mb-10">
              {lang === 'it' 
                ? 'Sia che tu stia cercando di ottimizzare la tua linea di produzione o che tu voglia unirti alla nostra missione, siamo pronti ad ascoltarti.'
                : 'Whether you are looking to optimize your production line or want to join our mission, we are ready to listen.'}
            </p>

            <div className="space-y-6">
              <div className="flex gap-4 items-center group cursor-pointer" onClick={() => window.open('https://linkedin.com/company/instinct-robotics', '_blank')}>
                <div className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-brand group-hover:bg-brand group-hover:text-white transition-all">
                  <Linkedin size={24} />
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">LinkedIn</p>
                  <p className="font-bold group-hover:text-brand transition-colors">Instinct Robotics</p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-zinc-900/50 p-8 md:p-12 rounded-none border border-white/10 relative shadow-2xl shadow-brand/5"
          >
            <form ref={form} onSubmit={handleSubmit} className="space-y-6" suppressHydrationWarning>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-bold mb-2 text-slate-300">{lang === 'it' ? 'Nome' : 'Name'}</label>
                  <input 
                    type="text" 
                    name="user_name"
                    required
                    value={formData.name}
                    onChange={e => setFormData({...formData, name: e.target.value})}
                    className="w-full bg-white/5 border border-white/10 rounded-none px-4 py-3 focus:outline-none focus:border-brand transition-colors"
                    placeholder={lang === 'it' ? 'Il tuo nome' : 'Your name'}
                    suppressHydrationWarning
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold mb-2 text-slate-300">Email</label>
                  <input 
                    type="email" 
                    name="user_email"
                    required
                    value={formData.email}
                    onChange={e => setFormData({...formData, email: e.target.value})}
                    className="w-full bg-white/5 border border-white/10 rounded-none px-4 py-3 focus:outline-none focus:border-brand transition-colors"
                    placeholder="email@example.com"
                    suppressHydrationWarning
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold mb-2 text-slate-300">{lang === 'it' ? 'Oggetto' : 'Subject'}</label>
                <div className="grid grid-cols-2 gap-4">
                  <button 
                    type="button"
                    onClick={() => setFormData({...formData, type: 'demo'})}
                    className={`py-3 rounded-full border font-bold text-sm transition-all active:scale-95 ${formData.type === 'demo' ? 'bg-brand border-brand text-white' : 'bg-white/5 border-white/10 text-slate-400 hover:border-brand/50'}`}
                  >
                    {lang === 'it' ? 'Richiedi Demo' : 'Request Demo'}
                  </button>
                  <button 
                    type="button"
                    onClick={() => setFormData({...formData, type: 'career'})}
                    className={`py-3 rounded-full border font-bold text-sm transition-all active:scale-95 ${formData.type === 'career' ? 'bg-brand border-brand text-white' : 'bg-white/5 border-white/10 text-slate-400 hover:border-brand/50'}`}
                  >
                    {lang === 'it' ? 'Lavora con noi' : 'Join the Team'}
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold mb-2 text-slate-300">{lang === 'it' ? 'Messaggio' : 'Message'}</label>
                <textarea 
                  name="message"
                  required
                  rows={4}
                  value={formData.message}
                  onChange={e => setFormData({...formData, message: e.target.value})}
                  className="w-full bg-white/5 border border-white/10 rounded-none px-4 py-3 focus:outline-none focus:border-brand transition-colors resize-none"
                  placeholder={lang === 'it' ? 'Come possiamo aiutarti?' : 'How can we help you?'}
                  suppressHydrationWarning
                />
              </div>

              <button 
                type="submit"
                disabled={status === 'sending'}
                className="w-full py-4 bg-brand hover:bg-accent text-white font-bold rounded-full transition-all transform active:scale-95 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {status === 'sending' ? (lang === 'it' ? 'Invio in corso...' : 'Sending...') : (lang === 'it' ? 'Invia Messaggio' : 'Send Message')}
                <ArrowRight size={18} />
              </button>

              {status === 'success' && (
                <p className="text-brand text-center font-bold animate-bounce">
                  {lang === 'it' ? 'Messaggio inviato con successo!' : 'Message sent successfully!'}
                </p>
              )}
              {status === 'error' && (
                <p className="text-red-400 text-center font-bold">
                  {lang === 'it' ? 'Errore durante l\'invio. Riprova più tardi.' : 'Error sending message. Please try again later.'}
                </p>
              )}
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

const Footer = ({ lang }: { lang: 'it' | 'en' }) => {
  return (
    <footer className="py-12 border-t border-white/5 bg-black">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-8">
        <div className="flex items-center gap-2">
          <Image 
            src={company.logo} 
            alt="Instinct Robotics Logo" 
            width={32} 
            height={32} 
            className="object-contain"
            referrerPolicy="no-referrer"
          />
          <span className="text-xl font-display font-bold tracking-tighter text-brand">Instinct Robotics</span>
        </div>
        
        <p className="text-slate-500 text-sm" suppressHydrationWarning>
          © {new Date().getFullYear()} Instinct Robotics. {lang === 'it' ? 'Tutti i diritti riservati.' : 'All rights reserved.'}
        </p>

        <div className="flex gap-6">
          <a href="#" className="text-slate-400 hover:text-brand transition-colors hover:scale-110 transition-transform"><Linkedin size={20} /></a>
          <a href="#" className="text-slate-400 hover:text-brand transition-colors hover:scale-110 transition-transform"><Mail size={20} /></a>
        </div>
      </div>
    </footer>
  )
}

export default function Home() {
  const [lang, setLang] = useState<'it' | 'en'>('it')

  return (
    <main className="relative">
      <Navbar lang={lang} setLang={setLang} />
      <Hero lang={lang} />
      <About lang={lang} />
      <Expertise lang={lang} />
      <Projects lang={lang} />
      <Founders lang={lang} />
      <Contact lang={lang} />
      <Footer lang={lang} />
    </main>
  )
}
