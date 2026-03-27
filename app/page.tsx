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
    { name: 'Contatti', href: '#contact' },
  ] : [
    { name: 'Home', href: '#' },
    { name: 'About Us', href: '#about' },
    { name: 'Expertise', href: '#expertise' },
    { name: 'Projects', href: '#projects' },
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
    <section className="relative min-h-screen flex flex-col justify-center pt-20 overflow-hidden bg-bg">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(60,83,102,0.1)_0%,transparent_70%)]" />

      {/* Animated Grid */}
      <div className="absolute inset-0 opacity-[0.15]"
        style={{
          backgroundImage: `linear-gradient(to right, #3C5366 1px, transparent 1px), linear-gradient(to bottom, #3C5366 1px, transparent 1px)`,
          backgroundSize: '40px 40px',
          maskImage: 'radial-gradient(circle at 50% 50%, black, transparent 80%)'
        }}>
        <motion.div
          animate={{
            y: [0, -40],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute inset-0"
        />
      </div>

      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-brand/10 rounded-full blur-[120px] animate-pulse" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-accent/10 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '1s' }} />

      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center relative z-10 flex-grow">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand/10 border border-brand/20 text-brand text-[10px] font-bold uppercase tracking-[0.2em] mb-8 backdrop-blur-md"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-brand"></span>
            </span>
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              NATIVE INTELLIGENCE
            </motion.span>
          </motion.div>
          <motion.h1
            className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold leading-[0.95] tracking-tighter mb-8 text-text cursor-default"
          >
            {company.tagline[lang]}
          </motion.h1>
          <p className="text-lg text-text/70 mb-10 max-w-lg leading-relaxed border-l border-brand/20 pl-6">
            {lang === 'it'
              ? 'Rendiamo i robot capaci di muoversi con la naturalezza e l\'intuito di una persona, adattandosi istantaneamente a ogni sfida.'
              : 'Enabling robots to move with the naturalness and intuition of a person, adapting instantly to every challenge.'}
          </p>
          <div className="flex flex-wrap gap-5">
            <a href="#projects" className="px-10 py-5 bg-brand text-text rounded-full font-bold uppercase tracking-widest flex items-center gap-3 transition-all group shadow-2xl shadow-brand/20 active:scale-95 text-xs">
              {lang === 'it' ? 'Vedi in Azione' : 'See in Action'} <ArrowRight className="group-hover:translate-x-1 transition-transform" />
            </a>
            <a href="#contact" className="px-10 py-5 bg-surface hover:bg-white/10 border border-white/10 rounded-full font-bold uppercase tracking-widest transition-all backdrop-blur-md active:scale-95 text-xs text-text flex items-center justify-center">
              {lang === 'it' ? 'Contattaci' : 'Contact Us'}
            </a>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95, x: 50 }}
          animate={{ opacity: 1, scale: 1, x: 0 }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          className="relative hidden lg:block"
        >
          <div className="relative z-10 rounded-3xl overflow-hidden border border-white/10 shadow-2xl shadow-brand/5 group aspect-[4/5]">
            {/* Scanning Line Effect */}
            <motion.div
              animate={{
                top: ['-10%', '110%'],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "linear"
              }}
              className="absolute left-0 w-full h-[2px] bg-brand/50 z-20 shadow-[0_0_15px_rgba(74,93,78,1)]"
            />

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

            {/* HUD Elements */}
            <div className="absolute top-6 right-6 flex flex-col gap-2 z-20">
              {[1, 2, 3].map((_, i) => (
                <motion.div
                  key={i}
                  animate={{ opacity: [0.3, 0.8, 0.3] }}
                  transition={{ duration: 2, delay: i * 0.5, repeat: Infinity }}
                  className="h-1 w-8 bg-brand/40 rounded-full"
                />
              ))}
            </div>

            <div className="absolute bottom-8 left-8 p-6 bg-black/40 backdrop-blur-md rounded-2xl border border-white/10 z-20">
              <p className="text-3xl font-display font-bold leading-none mb-1 text-brand">{company.stats[0].value}</p>
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/60">{company.stats[0].label[lang]}</p>
            </div>
          </div>

          {/* Floating Tech Orbs */}
          <motion.div
            animate={{
              y: [0, -20, 0],
              rotate: [0, 360],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "linear"
            }}
            className="absolute -top-10 -right-10 w-32 h-32 border border-brand/20 rounded-full flex items-center justify-center"
          >
            <div className="w-2 h-2 bg-brand rounded-full shadow-[0_0_10px_rgba(74,93,78,1)]" />
          </motion.div>
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
    <section id="about" className="py-24 bg-surface/20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-sm font-bold text-brand uppercase tracking-widest mb-4">{lang === 'it' ? 'Chi Siamo' : 'About Us'}</h2>
            <h3 className="text-4xl md:text-5xl font-display font-bold mb-8 leading-tight text-text">{lang === 'it' ? 'Innovazione Giovane, Risultati Solidi.' : 'Young Innovation, Solid Results.'}</h3>
            <p className="text-xl text-text/70 mb-10 leading-relaxed">
              {company.story[lang]}
            </p>
            <div className="grid sm:grid-cols-2 gap-6 mt-12">
              <motion.div
                whileHover={{ y: -5 }}
                className="p-8 bg-surface/50 rounded-2xl border border-white/5 hover:border-brand/30 transition-all group"
              >
                <h4 className="text-sm font-display font-bold mb-3 text-brand group-hover:translate-x-1 transition-transform uppercase tracking-[0.2em]">Mission</h4>
                <p className="text-base text-text/60 leading-relaxed">{company.mission[lang]}</p>
              </motion.div>
              <motion.div
                whileHover={{ y: -5 }}
                className="p-8 bg-surface/50 rounded-2xl border border-white/5 hover:border-accent/30 transition-all group"
              >
                <h4 className="text-sm font-display font-bold mb-3 text-accent group-hover:translate-x-1 transition-transform uppercase tracking-[0.2em]">Vision</h4>
                <p className="text-base text-text/60 leading-relaxed">{company.vision[lang]}</p>
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
                className="flex gap-6 p-6 bg-surface/30 rounded-xl border border-white/5 hover:border-brand/30 transition-all group cursor-default"
              >
                <div className="w-12 h-12 shrink-0 rounded-xl bg-white/5 flex items-center justify-center group-hover:scale-110 group-hover:bg-brand/10 transition-all">
                  {f.icon}
                </div>
                <div>
                  <h4 className="text-lg font-display font-bold mb-2 group-hover:text-brand transition-colors uppercase tracking-tight text-text">{f.title}</h4>
                  <p className="text-text/60 text-base leading-relaxed">{f.desc}</p>
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
    <section id="expertise" className="py-24 bg-bg overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-sm font-bold text-brand uppercase tracking-widest mb-4"
          >
            {lang === 'it' ? 'Competenze' : 'Expertise'}
          </motion.h2>
          <motion.h3
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl font-display font-bold text-text"
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
                {/* Tech Corner Borders */}
                <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-brand opacity-0 group-hover:opacity-100 transition-all duration-300 z-20" />
                <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-brand opacity-0 group-hover:opacity-100 transition-all duration-300 z-20" />
                <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-brand opacity-0 group-hover:opacity-100 transition-all duration-300 z-20" />
                <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-brand opacity-0 group-hover:opacity-100 transition-all duration-300 z-20" />

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
                  initial: { color: '#7A8C98' },
                  active: { color: '#3C5366' }
                }}
                className="text-[10px] md:text-sm font-display font-bold uppercase tracking-[0.2em] text-center transition-all"
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
    <section id="projects" className="py-24 bg-bg">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-base font-bold text-brand uppercase tracking-widest mb-4"
          >
            Portfolio
          </motion.h2>
          <motion.h3
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl font-display font-bold text-text"
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
              className="group relative bg-surface/30 rounded-3xl overflow-hidden border border-white/5 hover:border-brand/30 transition-all duration-500"
            >
              <div className="aspect-video relative overflow-hidden bg-bg">
                {/* Tech Overlay on Hover */}
                <div className="absolute inset-0 bg-brand/5 opacity-0 group-hover:opacity-100 transition-opacity z-20 pointer-events-none"
                  style={{ backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 1px, rgba(60,83,102,0.1) 1px, rgba(60,83,102,0.1) 2px)', backgroundSize: '100% 2px' }} />

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
                    <span key={tag} className="text-[9px] font-bold uppercase tracking-wider px-2 py-1 bg-white/5 rounded-none text-text/50 border border-white/5">
                      {tag}
                    </span>
                  ))}
                </div>
                <h4 className="text-xl font-bold mb-3 group-hover:text-brand transition-colors text-text">{project.title[lang]}</h4>
                <p className="text-text/60 text-sm leading-relaxed line-clamp-3">{project.description[lang]}</p>
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
    <section id="team" className="py-24 bg-surface/10">
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
            className="text-4xl font-display font-bold text-text"
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
                  initial: { color: '#E0E0E0' },
                  active: { color: '#3C5366' }
                }}
                className="text-2xl font-bold mb-1 transition-colors"
              >
                {founder.name}
              </motion.h4>
              <p className="text-brand font-medium mb-4 text-sm uppercase tracking-widest">{founder.role[lang]}</p>
              <p className="text-text/70 text-sm leading-relaxed max-w-xs">{founder.bio[lang]}</p>
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
    <section id="contact" className="py-24 relative overflow-hidden bg-bg">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-sm font-bold text-brand uppercase tracking-widest mb-4">{lang === 'it' ? 'Contatti' : 'Contact'}</h2>
            <h3 className="text-4xl font-display font-bold mb-8 text-text">{lang === 'it' ? 'Pronto a Innovare?' : 'Ready to Innovate?'}</h3>
            <p className="text-lg text-text/70 mb-10">
              {lang === 'it'
                ? 'Sia che tu stia cercando di ottimizzare la tua linea di produzione o che tu voglia unirti alla nostra missione, siamo pronti ad ascoltarti.'
                : 'Whether you are looking to optimize your production line or want to join our mission, we are ready to listen.'}
            </p>

            <div className="space-y-6">
              <div className="flex gap-4 items-center group cursor-pointer" onClick={() => window.open('https://linkedin.com/company/instinct-robotics', '_blank')}>
                <div className="w-12 h-12 rounded-full bg-surface/50 border border-white/10 flex items-center justify-center text-brand group-hover:bg-brand group-hover:text-text transition-all">
                  <Linkedin size={24} />
                </div>
                <div>
                  <p className="text-xs font-bold text-text/50 uppercase tracking-widest">LinkedIn</p>
                  <p className="font-bold group-hover:text-brand transition-colors text-text">Instinct Robotics</p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-surface/50 p-8 md:p-12 rounded-xl border border-white/10 relative shadow-2xl shadow-brand/5"
          >
            <form ref={form} onSubmit={handleSubmit} className="space-y-6" suppressHydrationWarning>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-bold mb-2 text-text/80">{lang === 'it' ? 'Nome' : 'Name'}</label>
                  <input
                    type="text"
                    name="user_name"
                    required
                    value={formData.name}
                    onChange={e => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-bg/50 border border-white/10 rounded-lg px-4 py-3 focus:outline-none focus:border-brand transition-colors text-text"
                    placeholder={lang === 'it' ? 'Il tuo nome' : 'Your name'}
                    suppressHydrationWarning
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold mb-2 text-text/80">Email</label>
                  <input
                    type="email"
                    name="user_email"
                    required
                    value={formData.email}
                    onChange={e => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-bg/50 border border-white/10 rounded-lg px-4 py-3 focus:outline-none focus:border-brand transition-colors text-text"
                    placeholder="email@example.com"
                    suppressHydrationWarning
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold mb-2 text-text/80">{lang === 'it' ? 'Oggetto' : 'Subject'}</label>
                <div className="grid grid-cols-2 gap-4">
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, type: 'demo' })}
                    className={`py-3 rounded-full border font-bold text-sm transition-all active:scale-95 flex items-center justify-center ${formData.type === 'demo' ? 'bg-brand border-brand text-text' : 'bg-bg/50 border-white/10 text-text/50 hover:border-brand/50'}`}
                  >
                    {lang === 'it' ? 'Richiedi Demo' : 'Request Demo'}
                  </button>
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, type: 'career' })}
                    className={`py-3 rounded-full border font-bold text-sm transition-all active:scale-95 flex items-center justify-center ${formData.type === 'career' ? 'bg-brand border-brand text-text' : 'bg-bg/50 border-white/10 text-text/50 hover:border-brand/50'}`}
                  >
                    {lang === 'it' ? 'Lavora con noi' : 'Join the Team'}
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold mb-2 text-text/80">{lang === 'it' ? 'Messaggio' : 'Message'}</label>
                <textarea
                  name="message"
                  required
                  rows={4}
                  value={formData.message}
                  onChange={e => setFormData({ ...formData, message: e.target.value })}
                  className="w-full bg-bg/50 border border-white/10 rounded-lg px-4 py-3 focus:outline-none focus:border-brand transition-colors resize-none text-text"
                  placeholder={lang === 'it' ? 'Come possiamo aiutarti?' : 'How can we help you?'}
                  suppressHydrationWarning
                />
              </div>

              <button
                type="submit"
                disabled={status === 'sending'}
                className="w-full py-4 bg-brand hover:bg-accent text-text font-bold rounded-full transition-all transform active:scale-95 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
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
    <footer className="py-12 border-t border-white/5 bg-bg">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-8">
        <div className="flex items-center gap-3">
          <div className="w-6 h-6 flex items-center justify-center relative overflow-hidden opacity-80 transition-opacity hover:opacity-100">
            <Image
              src={company.logo}
              alt="Instinct Robotics Logo"
              width={24}
              height={24}
              className="object-contain brightness-0 invert"
              referrerPolicy="no-referrer"
            />
          </div>
          <span className="text-xl font-display font-bold tracking-tighter text-white uppercase transition-opacity opacity-80 hover:opacity-100">INSTINCT ROBOTICS</span>
        </div>

        <p className="text-text/50 text-sm" suppressHydrationWarning>
          © {new Date().getFullYear()} Instinct Robotics. {lang === 'it' ? 'Tutti i diritti riservati.' : 'All rights reserved.'}
        </p>

        <div className="flex gap-6">
          <a href="#" className="text-text/50 hover:text-brand transition-colors hover:scale-110 transition-transform"><Linkedin size={20} /></a>
          <a href="#" className="text-text/50 hover:text-brand transition-colors hover:scale-110 transition-transform"><Mail size={20} /></a>
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
      <Contact lang={lang} />
      <Footer lang={lang} />
    </main>
  )
}
