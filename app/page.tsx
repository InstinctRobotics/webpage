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
import content from '@/data/content.json'

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
    { name: 'Progetti', href: '#projects' },
    { name: 'Team', href: '#team' },
    { name: 'Contatti', href: '#contact' },
  ] : [
    { name: 'Home', href: '#' },
    { name: 'About Us', href: '#about' },
    { name: 'Projects', href: '#projects' },
    { name: 'Team', href: '#team' },
    { name: 'Contact', href: '#contact' },
  ]

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-500 ${isScrolled ? 'bg-slate-950/90 backdrop-blur-xl border-b border-white py-3' : 'bg-transparent py-6'}`}>
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <button onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})} className="flex items-center gap-4 group">
          <div className="relative w-14 h-14 flex items-center justify-center overflow-hidden transition-transform group-hover:scale-110">
             <Image 
               src="/logo.png" 
               alt="Velaxys Logo" 
               width={56} 
               height={56} 
               className="object-contain"
               referrerPolicy="no-referrer"
             />
          </div>
          <span className="text-3xl font-display font-bold tracking-tighter bg-gradient-to-r from-white via-white to-slate-500 bg-clip-text text-transparent">Velaxys</span>
        </button>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-10">
          {navLinks.map((link) => (
            <a 
              key={link.name} 
              href={link.href} 
              className="text-sm font-semibold text-slate-400 hover:text-cyan-400 transition-all relative group"
            >
              {link.name}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-cyan-400 transition-all group-hover:w-full" />
            </a>
          ))}
          
          {/* Language Switcher */}
          <button 
            onClick={() => setLang(lang === 'it' ? 'en' : 'it')}
            className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-slate-400 hover:text-white transition-colors group"
          >
            <Globe size={14} className="group-hover:rotate-12 transition-transform" />
            {lang === 'it' ? 'EN' : 'IT'}
          </button>

          <a 
            href="#contact" 
            className="px-6 py-2.5 bg-white text-slate-950 hover:bg-cyan-400 transition-colors rounded-full text-sm font-bold shadow-xl shadow-white/5 active:scale-95 transition-transform"
          >
            {lang === 'it' ? 'Richiedi una Demo' : 'Demo Request'}
          </a>
        </div>

        {/* Mobile Toggle */}
        <button className="md:hidden text-slate-50" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
          {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 w-full bg-slate-900 border-b border-white/10 p-6 flex flex-col gap-4 md:hidden"
          >
            {navLinks.map((link) => (
              <a 
                key={link.name} 
                href={link.href} 
                className="text-lg font-medium text-slate-300"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.name}
              </a>
            ))}
            <button 
              onClick={() => { setLang(lang === 'it' ? 'en' : 'it'); setIsMobileMenuOpen(false); }}
              className="flex items-center gap-2 text-lg font-medium text-cyan-400"
            >
              <Globe size={18} />
              {lang === 'it' ? 'English Version' : 'Versione Italiana'}
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}

const Hero = ({ lang }: { lang: 'it' | 'en' }) => {
  return (
    <section className="relative min-h-screen flex flex-col justify-center pt-20 overflow-hidden">
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-cyan-500/10 rounded-full blur-[120px] animate-pulse" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-blue-600/10 rounded-full blur-[120px] animate-pulse delay-1000" />
      
      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center relative z-10 flex-grow">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-bold uppercase tracking-[0.2em] mb-8">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
            </span>
            SOTA Computer Vision
          </div>
          <h1 className="text-6xl lg:text-8xl font-display font-bold leading-[0.9] tracking-tighter mb-8">
            {lang === 'it' ? 'Visione' : 'Intelligent'} <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-600">{lang === 'it' ? 'Intelligente' : 'Vision'}</span> <br />
            {lang === 'it' ? 'per la Robotica.' : 'for Robotics.'}
          </h1>
          <p className="text-xl text-slate-400 mb-10 max-w-lg leading-relaxed">
            {lang === 'it' 
              ? 'Portiamo l\'automazione al livello successivo con algoritmi SOTA e simulazioni digitali avanzate.'
              : 'Taking automation to the next level with SOTA algorithms and advanced digital simulations.'}
          </p>
          <div className="flex flex-wrap gap-5">
            <a href="#projects" className="px-10 py-5 bg-cyan-500 hover:bg-cyan-400 text-slate-950 rounded-2xl font-bold flex items-center gap-3 transition-all group shadow-2xl shadow-cyan-500/20 active:scale-95">
              {lang === 'it' ? 'Vedi in Azione' : 'See in Action'} <ArrowRight className="group-hover:translate-x-1 transition-transform" />
            </a>
            <a href="#contact" className="px-10 py-5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-2xl font-bold transition-all backdrop-blur-md active:scale-95">
              {lang === 'it' ? 'Contattaci' : 'Contact Us'}
            </a>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9, rotateY: 20 }}
          animate={{ opacity: 1, scale: 1, rotateY: 0 }}
          transition={{ duration: 1.2, delay: 0.2 }}
          className="relative perspective-1000 hidden lg:block"
        >
          <div className="relative z-10 rounded-[3rem] overflow-hidden border border-white/10 shadow-2xl shadow-cyan-500/10 group">
            <Image 
              src="https://picsum.photos/seed/robot-vision/1000/1200" 
              alt="Robot Vision" 
              width={1000}
              height={1200}
              className="w-full h-auto grayscale group-hover:grayscale-0 transition-all duration-1000 ease-in-out scale-105 group-hover:scale-100"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />
            
            <div className="absolute top-10 left-10 p-4 bg-slate-900/80 backdrop-blur-xl border border-white/10 rounded-2xl animate-bounce-slow">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                <span className="text-xs font-mono text-slate-300 tracking-tighter">SIMULATION_READY: TRUE</span>
              </div>
            </div>

            <div className="absolute bottom-10 right-10 p-6 bg-cyan-500/90 backdrop-blur-xl rounded-3xl text-slate-950 shadow-2xl">
              <p className="text-3xl font-display font-black leading-none mb-1">99.9%</p>
              <p className="text-[10px] font-bold uppercase tracking-widest opacity-80">{lang === 'it' ? 'Precisione Rilevata' : 'Detected Accuracy'}</p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Stats Row */}
      <div className="w-full bg-slate-950/50 backdrop-blur-sm py-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {content.company.stats.map((stat, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-center group cursor-default"
              >
                <p className="text-4xl font-display font-bold text-white mb-1 group-hover:text-cyan-400 group-hover:scale-110 transition-all duration-300">{stat.value}</p>
                <p className="text-xs font-bold uppercase tracking-widest text-slate-500 group-hover:text-slate-300 transition-colors">{stat.label[lang]}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

const About = ({ lang }: { lang: 'it' | 'en' }) => {
  const features = lang === 'it' ? [
    {
      icon: <Cpu className="text-cyan-400" />,
      title: "State-of-the-Art",
      desc: "Utilizziamo le ultime architetture di Deep Learning per una precisione millimetrica."
    },
    {
      icon: <ShieldCheck className="text-blue-400" />,
      title: "Robustezza",
      desc: "Soluzioni testate in ambienti industriali reali per garantire continuità operativa."
    },
    {
      icon: <Zap className="text-purple-400" />,
      title: "Simulazione Massiccia",
      desc: "Validiamo ogni scenario in ambienti virtuali fotorealistici prima del deployment."
    }
  ] : [
    {
      icon: <Cpu className="text-cyan-400" />,
      title: "State-of-the-Art",
      desc: "We use the latest Deep Learning architectures for millimeter precision."
    },
    {
      icon: <ShieldCheck className="text-blue-400" />,
      title: "Robustness",
      desc: "Solutions tested in real industrial environments to ensure operational continuity."
    },
    {
      icon: <Zap className="text-purple-400" />,
      title: "Massive Simulation",
      desc: "We validate every scenario in photorealistic virtual environments before deployment."
    }
  ]

  return (
    <section id="about" className="py-24 bg-slate-900/50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-sm font-bold text-cyan-400 uppercase tracking-widest mb-4">{lang === 'it' ? 'Chi Siamo' : 'About Us'}</h2>
            <h3 className="text-4xl font-display font-bold mb-6">{lang === 'it' ? 'Innovazione Giovane, Risultati Solidi.' : 'Young Innovation, Solid Results.'}</h3>
            <p className="text-lg text-slate-400 mb-6 leading-relaxed">
              {content.company.story[lang]}
            </p>
            <div className="grid sm:grid-cols-2 gap-6 mt-10">
              <div className="p-6 bg-white/5 rounded-2xl border border-white/10 hover:border-cyan-500/30 transition-colors group">
                <h4 className="font-bold mb-2 text-cyan-400 group-hover:translate-x-1 transition-transform">Mission</h4>
                <p className="text-sm text-slate-400 leading-relaxed">{content.company.mission[lang]}</p>
              </div>
              <div className="p-6 bg-white/5 rounded-2xl border border-white/10 hover:border-blue-500/30 transition-colors group">
                <h4 className="font-bold mb-2 text-blue-400 group-hover:translate-x-1 transition-transform">Vision</h4>
                <p className="text-sm text-slate-400 leading-relaxed">{content.company.vision[lang]}</p>
              </div>
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
                className="flex gap-6 p-8 bg-slate-950 rounded-3xl border border-white/5 hover:border-cyan-500/30 transition-all group cursor-default"
              >
                <div className="w-14 h-14 shrink-0 rounded-2xl bg-white/5 flex items-center justify-center group-hover:scale-110 group-hover:bg-cyan-500/10 transition-all">
                  {f.icon}
                </div>
                <div>
                  <h4 className="text-xl font-bold mb-2 group-hover:text-cyan-400 transition-colors">{f.title}</h4>
                  <p className="text-slate-400">{f.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

const Projects = ({ lang }: { lang: 'it' | 'en' }) => {
  const [activeVideo, setActiveVideo] = useState<string | null>(null)

  return (
    <section id="projects" className="py-24">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-sm font-bold text-cyan-400 uppercase tracking-widest mb-4">Portfolio</h2>
          <h3 className="text-4xl font-display font-bold">{lang === 'it' ? 'I Nostri Progetti' : 'Our Projects'}</h3>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {content.projects.map((project, i) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group relative bg-slate-900 rounded-3xl overflow-hidden border border-white/10 hover:border-cyan-500/50 transition-all"
            >
              <div className="aspect-video relative overflow-hidden">
                <Image 
                  src={project.thumbnail} 
                  alt={project.title[lang]} 
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-slate-950/40 group-hover:bg-slate-950/20 transition-all flex items-center justify-center">
                  <button 
                    onClick={() => setActiveVideo(project.videoUrl)}
                    className="w-16 h-16 bg-cyan-500 text-slate-950 rounded-full flex items-center justify-center transform group-hover:scale-110 transition-all shadow-xl shadow-cyan-500/20 active:scale-90"
                  >
                    <Play fill="currentColor" size={24} />
                  </button>
                </div>
              </div>
              <div className="p-8">
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tags.map(tag => (
                    <span key={tag} className="text-[10px] font-bold uppercase tracking-wider px-2 py-1 bg-white/5 rounded-md text-slate-400 border border-white/10">
                      {tag}
                    </span>
                  ))}
                </div>
                <h4 className="text-xl font-bold mb-3 group-hover:text-cyan-400 transition-colors">{project.title[lang]}</h4>
                <p className="text-slate-400 text-sm leading-relaxed">{project.description[lang]}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {activeVideo && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-slate-950/95 backdrop-blur-xl flex items-center justify-center p-6"
            onClick={() => setActiveVideo(null)}
          >
            <button className="absolute top-8 right-8 text-white hover:text-cyan-400 transition-colors">
              <X size={40} />
            </button>
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="w-full max-w-5xl aspect-video bg-black rounded-3xl overflow-hidden shadow-2xl"
              onClick={e => e.stopPropagation()}
            >
              <video 
                src={activeVideo} 
                controls 
                autoPlay 
                className="w-full h-full"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}

const Founders = ({ lang }: { lang: 'it' | 'en' }) => {
  return (
    <section id="team" className="py-24 bg-slate-900/30">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-sm font-bold text-cyan-400 uppercase tracking-widest mb-4">{lang === 'it' ? 'Il Team' : 'The Team'}</h2>
          <h3 className="text-4xl font-display font-bold">{lang === 'it' ? 'I Fondatori' : 'The Founders'}</h3>
        </div>

        <div className="grid md:grid-cols-2 gap-12 max-w-4xl mx-auto">
          {content.founders.map((founder, i) => (
            <motion.div
              key={founder.id}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.2 }}
              className="group"
            >
              <div className="relative mb-6 overflow-hidden rounded-3xl aspect-square border border-white/10">
                <Image 
                  src={founder.image} 
                  alt={founder.name} 
                  fill
                  className="object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-60" />
                <div className="absolute bottom-6 left-6 flex gap-3">
                  <a href={founder.linkedin} target="_blank" rel="noreferrer" className="w-10 h-10 bg-white/10 backdrop-blur-md rounded-xl flex items-center justify-center hover:bg-cyan-500 hover:text-slate-950 transition-all hover:scale-110">
                    <Linkedin size={20} />
                  </a>
                  <a href={`mailto:${founder.email}`} className="w-10 h-10 bg-white/10 backdrop-blur-md rounded-xl flex items-center justify-center hover:bg-cyan-500 hover:text-slate-950 transition-all hover:scale-110">
                    <Mail size={20} />
                  </a>
                </div>
              </div>
              <h4 className="text-2xl font-bold mb-1 group-hover:text-cyan-400 transition-colors">{founder.name}</h4>
              <p className="text-cyan-400 font-medium mb-4">{founder.role[lang]}</p>
              <p className="text-slate-400">{founder.bio[lang]}</p>
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
          to_name: 'Velaxys Team',
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
    <section id="contact" className="py-24 relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent" />
      
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-sm font-bold text-cyan-400 uppercase tracking-widest mb-4">{lang === 'it' ? 'Contatti' : 'Contact'}</h2>
            <h3 className="text-4xl font-display font-bold mb-8">{lang === 'it' ? 'Pronto a Innovare?' : 'Ready to Innovate?'}</h3>
            <p className="text-lg text-slate-400 mb-10">
              {lang === 'it' 
                ? 'Sia che tu stia cercando di ottimizzare la tua linea di produzione o che tu voglia unirti alla nostra missione, siamo pronti ad ascoltarti.'
                : 'Whether you are looking to optimize your production line or want to join our mission, we are ready to listen.'}
            </p>

            <div className="space-y-6">
              <div className="flex gap-4 items-center group cursor-pointer" onClick={() => window.location.href = 'mailto:info@velaxys.com'}>
                <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-cyan-400 group-hover:bg-cyan-500 group-hover:text-slate-950 transition-all group-hover:scale-110">
                  <Mail size={24} />
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-500 uppercase">Email</p>
                  <p className="font-medium group-hover:text-cyan-400 transition-colors">info@velaxys.com</p>
                </div>
              </div>
              <div className="flex gap-4 items-center group cursor-pointer" onClick={() => window.open('https://linkedin.com/company/velaxys', '_blank')}>
                <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-blue-400 group-hover:bg-blue-500 group-hover:text-slate-950 transition-all group-hover:scale-110">
                  <Linkedin size={24} />
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-500 uppercase">LinkedIn</p>
                  <p className="font-medium group-hover:text-blue-400 transition-colors">Velaxys Robotics</p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-slate-900 p-8 md:p-12 rounded-[2.5rem] border border-white/10 relative shadow-2xl shadow-cyan-500/5"
          >
            <form ref={form} onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-bold mb-2 text-slate-300">{lang === 'it' ? 'Nome' : 'Name'}</label>
                  <input 
                    type="text" 
                    name="user_name"
                    required
                    value={formData.name}
                    onChange={e => setFormData({...formData, name: e.target.value})}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-cyan-500 transition-colors"
                    placeholder={lang === 'it' ? 'Il tuo nome' : 'Your name'}
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
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-cyan-500 transition-colors"
                    placeholder="email@example.com"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold mb-2 text-slate-300">{lang === 'it' ? 'Oggetto' : 'Subject'}</label>
                <div className="grid grid-cols-2 gap-4">
                  <button 
                    type="button"
                    onClick={() => setFormData({...formData, type: 'demo'})}
                    className={`py-3 rounded-xl border font-bold text-sm transition-all active:scale-95 ${formData.type === 'demo' ? 'bg-cyan-500 border-cyan-500 text-slate-950' : 'bg-white/5 border-white/10 text-slate-400 hover:border-cyan-500/50'}`}
                  >
                    {lang === 'it' ? 'Richiedi Demo' : 'Request Demo'}
                  </button>
                  <button 
                    type="button"
                    onClick={() => setFormData({...formData, type: 'career'})}
                    className={`py-3 rounded-xl border font-bold text-sm transition-all active:scale-95 ${formData.type === 'career' ? 'bg-cyan-500 border-cyan-500 text-slate-950' : 'bg-white/5 border-white/10 text-slate-400 hover:border-cyan-500/50'}`}
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
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-cyan-500 transition-colors resize-none"
                  placeholder={lang === 'it' ? 'Come possiamo aiutarti?' : 'How can we help you?'}
                />
              </div>

              <button 
                type="submit"
                disabled={status === 'sending'}
                className="w-full py-4 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold rounded-xl transition-all transform active:scale-95 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {status === 'sending' ? (lang === 'it' ? 'Invio in corso...' : 'Sending...') : (lang === 'it' ? 'Invia Messaggio' : 'Send Message')}
                <ArrowRight size={18} />
              </button>

              {status === 'success' && (
                <p className="text-cyan-400 text-center font-bold animate-bounce">
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
    <footer className="py-12 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-8">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-gradient-to-br from-cyan-400 to-blue-600 rounded-lg flex items-center justify-center font-bold text-sm">V</div>
          <span className="text-xl font-display font-bold tracking-tighter">Velaxys</span>
        </div>
        
        <p className="text-slate-500 text-sm">
          © {new Date().getFullYear()} Velaxys Robotics. {lang === 'it' ? 'Tutti i diritti riservati.' : 'All rights reserved.'}
        </p>

        <div className="flex gap-6">
          <a href="#" className="text-slate-400 hover:text-cyan-400 transition-colors hover:scale-110 transition-transform"><Linkedin size={20} /></a>
          <a href="#" className="text-slate-400 hover:text-cyan-400 transition-colors hover:scale-110 transition-transform"><Mail size={20} /></a>
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
      <Projects lang={lang} />
      <Founders lang={lang} />
      <Contact lang={lang} />
      <Footer lang={lang} />
    </main>
  )
}
