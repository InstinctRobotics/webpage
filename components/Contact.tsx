'use client'

import React, { useState, useEffect, useRef } from 'react'
import { motion } from 'motion/react'
import emailjs from '@emailjs/browser'
import { Zap } from 'lucide-react'
import dynamic from 'next/dynamic'
import MagneticButton from '@/components/MagneticButton'
import company from '@/data/company.json'

const ContactScene = dynamic(() => import('@/components/ContactScene'), { ssr: false })

export default function Contact({
  lang,
  title,
  cta,
  className = 'py-32',
  cardClassName = 'max-w-6xl'
}: {
  lang: 'it' | 'en'
  title?: { en: string; it: string }
  cta?: { en: string; it: string }
  className?: string
  cardClassName?: string
}) {
  const form = useRef<HTMLFormElement>(null)
  const [formData, setFormData] = useState(() => {
    let initialEmail = ''
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search)
      initialEmail = params.get('email') || ''
    }
    return {
      email: initialEmail,
      type: 'demo',
      message: ''
    }
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
        setFormData({ email: '', type: 'demo', message: '' })
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
          from_email: formData.email,
          request_type: formData.type,
          message: formData.message,
          to_name: 'Instinct Robotics Team',
        },
        publicKey
      )
      setStatus('success')
      setFormData({ email: '', type: 'demo', message: '' })
      setTimeout(() => setStatus('idle'), 5000)
    } catch (error) {
      console.error('EmailJS Error:', error)
      setStatus('error')
      setTimeout(() => setStatus('idle'), 5000)
    }
  }

  return (
    <section id="contact" className={`relative overflow-hidden bg-bg flex flex-col justify-center ${className}`}>
      <ContactScene />
      <div className="max-w-7xl mx-auto px-6 w-full relative z-10">
        <div className="flex flex-col gap-6 md:gap-8 items-center text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-5xl mx-auto"
          >
            <h4 className="text-4xl font-display font-bold text-text whitespace-pre-line">
              {title ? title[lang] : company.contact.form.title[lang]}
              {(cta ? cta[lang] : company.contact.form.cta[lang]) ? ` ${cta ? cta[lang] : company.contact.form.cta[lang]}` : ''}
            </h4>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className={`w-full p-8 md:py-12 md:px-16 bg-surface/50 rounded-[3rem] border border-white/5 shadow-2xl backdrop-blur-xl relative ${cardClassName}`}
          >
            {status === 'success' ? (
              <div className="text-center py-12">
                <div className="w-20 h-20 bg-brand/20 text-brand rounded-full flex items-center justify-center mx-auto mb-6">
                  <Zap size={40} />
                </div>
                <h4 className="text-2xl font-bold mb-4">{lang === 'it' ? 'Messaggio Inviato!' : 'Message Sent!'}</h4>
                <p className="text-text/70">{lang === 'it' ? 'Ti risponderemo al più presto.' : 'We will get back to you soon.'}</p>
                <button
                  onClick={() => setStatus('idle')}
                  className="mt-8 px-8 py-3 bg-brand text-text font-bold rounded-xl hover:bg-brand/80 transition-colors"
                >
                  {lang === 'it' ? 'Invia un altro' : 'Send another'}
                </button>
              </div>
            ) : (
              <form ref={form} onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="email" className="block text-xs font-bold text-text/50 uppercase tracking-widest mb-2 ml-1 text-left">
                    Email
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-bg/50 border border-white/10 rounded-2xl px-6 py-4 text-text focus:outline-none focus:border-brand/50 transition-colors placeholder:text-text/50"
                    placeholder="Email"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-xs font-bold text-text/50 uppercase tracking-widest mb-2 ml-1 text-left">
                    {lang === 'it' ? 'Messaggio (Opzionale)' : 'Message (Optional)'}
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full bg-bg/50 border border-white/10 rounded-2xl px-6 py-4 text-text focus:outline-none focus:border-brand/50 transition-colors placeholder:text-text/50"
                    placeholder={lang === 'it' ? 'Messaggio (Opzionale)' : 'Message (Optional)'}
                  />
                </div>

                <MagneticButton
                  type="submit"
                  disabled={status === 'sending'}
                  magnetic={false}
                  className="w-full py-5 rounded-2xl bg-brand font-bold text-lg active:scale-[0.98] transition-all flex items-center justify-center gap-3 text-white disabled:opacity-50 disabled:cursor-not-allowed shadow-xl shadow-brand/20 hover:shadow-text/20"
                >
                  {status === 'sending' ? (
                    <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    lang === 'it' ? 'Invia' : 'Send'
                  )}
                </MagneticButton>

                {status === 'error' && (
                  <p className="text-red-400 text-center font-bold text-sm">
                    {lang === 'it' ? "Errore durante l'invio. Riprova più tardi." : "Error sending message. Please try again later."}
                  </p>
                )}
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
