'use client'

import { motion } from 'framer-motion'
import { MapPin, Phone, Mail, Clock, Send, Loader2, CheckCircle } from 'lucide-react'
import { useState } from 'react'
import { toast } from 'sonner'
import { supabase } from '@/integrations/supabase/client'

export function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })
  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!formData.name || !formData.email || !formData.message) {
      toast.error('Ju lutem plotësoni fushat e detyrueshme')
      return
    }
    
    setLoading(true)
    
    try {
      const { error } = await supabase
        .from('contact_messages')
        .insert([{
          name: formData.name,
          email: formData.email,
          subject: formData.subject || null,
          message: formData.message
        }])
      
      if (error) throw error
      
      setSubmitted(true)
      toast.success('Mesazhi u dërgua me sukses! Do t\'ju kontaktojmë së shpejti.')
      setFormData({ name: '', email: '', subject: '', message: '' })
      
      setTimeout(() => setSubmitted(false), 5000)
    } catch (error) {
      console.error('Error sending message:', error)
      toast.error('Gabim në dërgimin e mesazhit. Provoni përsëri.')
    } finally {
      setLoading(false)
    }
  }

  const contactInfo = [
    {
      icon: MapPin,
      title: 'Adresa e Shkollës',
      details: ['Rruga Zogu i Parë', 'Elbasan 3001, Shqipëri'],
      color: 'accent-blue'
    },
    {
      icon: Phone,
      title: 'Telefon',
      details: ['+355 68 333 71 71', '+355 69 88 10 796'],
      color: 'accent-emerald'
    },
    {
      icon: Mail,
      title: 'Email',
      details: ['info@shpe.al', 'leonidha.haxhinikolla@akpa.gov.al'],
      color: 'accent-purple'
    },
    {
      icon: Clock,
      title: 'Orari i Punës',
      details: ['E Hënë - E Premte', '08:00 - 16:00'],
      color: 'accent-orange'
    }
  ]

  return (
    <section id="contact" className="relative py-24 bg-background">
      <div className="container mx-auto px-6 sm:px-8 lg:px-12">
        
        {/* Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-3 mb-6"
          >
            <div className="w-3 h-3 bg-accent-blue rounded-full animate-pulse" />
            <span className="text-sm font-semibold text-muted-foreground">
              Na Kontaktoni
            </span>
            <div className="w-3 h-3 bg-accent-emerald rounded-full animate-pulse" />
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-heading text-foreground mb-6"
          >
            Kontakt
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-xl text-muted-foreground max-w-3xl mx-auto"
          >
            Nëse keni ndonjë pyetje ose kërkesë, ju lutem na kontaktoni përmes formës së mëposhtme ose vizitoni shkollën tonë.
          </motion.p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-card clean-border rounded-2xl p-8"
          >
            <h3 className="text-2xl font-bold text-foreground mb-6">
              Dërgoni një Mesazh
            </h3>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Emër Mbiemër *
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-3 bg-input-background border border-border rounded-lg focus:ring-2 focus:ring-primary/50 focus:border-primary gentle-animation"
                  placeholder="Shkruani emrin tuaj"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Email *
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-3 bg-input-background border border-border rounded-lg focus:ring-2 focus:ring-primary/50 focus:border-primary gentle-animation"
                  placeholder="email@example.com"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Subjekti
                </label>
                <select
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  className="w-full px-4 py-3 bg-input-background border border-border rounded-lg focus:ring-2 focus:ring-primary/50 focus:border-primary gentle-animation"
                >
                  <option value="">Zgjidhni subjektin</option>
                  <option value="registration">Regjistrimi i nxënësve</option>
                  <option value="programs">Informacion për programet</option>
                  <option value="partnership">Bashkëpunim / Partneritet</option>
                  <option value="other">Tjetër</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Mesazhi *
                </label>
                <textarea
                  required
                  rows={5}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-4 py-3 bg-input-background border border-border rounded-lg focus:ring-2 focus:ring-primary/50 focus:border-primary gentle-animation resize-none"
                  placeholder="Shkruani mesazhin tuaj këtu..."
                />
              </div>
              
              <button
                type="submit"
                disabled={loading || submitted}
                className="w-full bg-primary text-primary-foreground font-semibold px-8 py-4 rounded-lg hover:bg-primary/90 gentle-animation inline-flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Duke dërguar...
                  </>
                ) : submitted ? (
                  <>
                    <CheckCircle className="w-5 h-5" />
                    U Dërgua!
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5" />
                    Dërgo Mesazhin
                  </>
                )}
              </button>
            </form>
          </motion.div>

          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            {/* Contact Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {contactInfo.map((info, index) => (
                <motion.div
                  key={info.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-card clean-border rounded-xl p-6 card-hover"
                >
                  <div className={`w-12 h-12 bg-${info.color}/10 rounded-xl flex items-center justify-center mb-4`}>
                    <info.icon className={`w-6 h-6`} style={{ color: `var(--${info.color})` }} />
                  </div>
                  <h4 className="font-bold text-foreground mb-2">{info.title}</h4>
                  {info.details.map((detail, i) => (
                    <p key={i} className="text-muted-foreground text-sm">{detail}</p>
                  ))}
                </motion.div>
              ))}
            </div>

            {/* Map */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-card clean-border rounded-2xl overflow-hidden"
            >
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3030.8787367376344!2d20.07872!3d41.11417!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDHCsDA2JzUxLjAiTiAyMMKwMDQnNDMuNCJF!5e0!3m2!1sen!2s!4v1620000000000!5m2!1sen!2s"
                width="100%"
                height="300"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full"
              />
            </motion.div>

            {/* Quick Actions */}
            <div className="grid grid-cols-2 gap-4">
              <a
                href="tel:+355683337171"
                className="bg-primary/10 text-primary font-semibold px-6 py-4 rounded-lg hover:bg-primary/20 gentle-animation text-center inline-flex items-center justify-center gap-2"
              >
                <Phone className="w-5 h-5" />
                Telefono
              </a>
              <a
                href="mailto:info@shpe.al"
                className="bg-primary/10 text-primary font-semibold px-6 py-4 rounded-lg hover:bg-primary/20 gentle-animation text-center inline-flex items-center justify-center gap-2"
              >
                <Mail className="w-5 h-5" />
                Email
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
