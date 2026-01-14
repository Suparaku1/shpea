'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'
import { User, Mail, Phone, Calendar, MapPin, GraduationCap, Send, CheckCircle } from 'lucide-react'
import { toast } from 'sonner'

export function Registration() {
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    birthDate: '',
    gender: '',
    email: '',
    phone: '',
    parentName: '',
    parentPhone: '',
    address: '',
    city: '',
    previousSchool: '',
    averageGrade: '',
    preferredDirection: '',
    secondChoice: '',
    motivation: '',
    hasConvikt: false,
    acceptTerms: false
  })

  const directions = [
    'TIK - Teknologji Informacioni',
    'Ekonomi - Biznes',
    'Hoteleri - Turizëm',
    'Mekanikë',
    'Elektroteknikë',
    'Ndërtim',
    'Instalime Hidraulike',
    'Përpunim Druri',
    'Përpunim Ushqimor',
    'Bujqësi',
    'Veterinari'
  ]

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.acceptTerms) {
      toast.error('Ju lutem pranoni kushtet e regjistrimit')
      return
    }
    setIsSubmitted(true)
    toast.success('Aplikimi u dërgua me sukses!')
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target
    const checked = (e.target as HTMLInputElement).checked
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
  }

  if (isSubmitted) {
    return (
      <section id="registration" className="relative py-24 bg-gradient-to-b from-muted/30 via-background to-background">
        <div className="container mx-auto px-6 sm:px-8 lg:px-12">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="max-w-2xl mx-auto text-center"
          >
            <div className="bg-card rounded-2xl p-12 border border-border shadow-lg">
              <div className="w-20 h-20 bg-accent-emerald/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="w-10 h-10 text-accent-emerald" />
              </div>
              <h2 className="text-3xl font-heading text-foreground mb-4">
                Aplikimi u Dërgua!
              </h2>
              <p className="text-muted-foreground mb-6">
                Faleminderit për aplikimin tuaj. Do t'ju kontaktojmë së shpejti për hapat e ardhshëm të procesit të regjistrimit.
              </p>
              <div className="bg-primary/10 rounded-lg p-4 mb-6">
                <p className="text-sm text-foreground">
                  <strong>Numri i aplikimit:</strong> SHPE-2025-{Math.random().toString(36).substr(2, 8).toUpperCase()}
                </p>
              </div>
              <button
                onClick={() => setIsSubmitted(false)}
                className="text-primary hover:text-primary/80 font-medium"
              >
                Dërgo një aplikim tjetër
              </button>
            </div>
          </motion.div>
        </div>
      </section>
    )
  }

  return (
    <section id="registration" className="relative py-24 bg-gradient-to-b from-muted/30 via-background to-background overflow-hidden">
      
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div className="w-full h-full" style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, hsl(var(--primary)) 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }} />
      </div>

      <div className="container mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-3 mb-6">
            <GraduationCap className="w-5 h-5 text-primary" />
            <span className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
              Regjistrimi Online
            </span>
            <GraduationCap className="w-5 h-5 text-primary" />
          </div>
          
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-heading leading-tight mb-6 text-foreground">
            <span className="block mb-2">Apliko për</span>
            <span className="block text-primary">VITIN 2025-2026</span>
          </h2>
          
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Plotësoni formën e mëposhtme për të aplikuar në Shkollën Profesionale Elbasan
          </p>
        </motion.div>

        {/* Registration Form */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto"
        >
          <form onSubmit={handleSubmit} className="bg-card rounded-2xl border border-border p-8 shadow-lg space-y-8">
            
            {/* Personal Information */}
            <div>
              <h3 className="text-xl font-heading text-foreground mb-6 flex items-center gap-2">
                <User className="w-5 h-5 text-primary" />
                Të Dhënat Personale
              </h3>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Emri *</label>
                  <input
                    type="text"
                    name="firstName"
                    required
                    value={formData.firstName}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-input-background border border-border rounded-lg focus:ring-2 focus:ring-primary/50 focus:border-primary text-foreground"
                    placeholder="Emri juaj"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Mbiemri *</label>
                  <input
                    type="text"
                    name="lastName"
                    required
                    value={formData.lastName}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-input-background border border-border rounded-lg focus:ring-2 focus:ring-primary/50 focus:border-primary text-foreground"
                    placeholder="Mbiemri juaj"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Datëlindja *</label>
                  <input
                    type="date"
                    name="birthDate"
                    required
                    value={formData.birthDate}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-input-background border border-border rounded-lg focus:ring-2 focus:ring-primary/50 focus:border-primary text-foreground"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Gjinia *</label>
                  <select
                    name="gender"
                    required
                    value={formData.gender}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-input-background border border-border rounded-lg focus:ring-2 focus:ring-primary/50 focus:border-primary text-foreground"
                  >
                    <option value="">Zgjidhni</option>
                    <option value="male">Mashkull</option>
                    <option value="female">Femër</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Contact Information */}
            <div>
              <h3 className="text-xl font-heading text-foreground mb-6 flex items-center gap-2">
                <Phone className="w-5 h-5 text-primary" />
                Informacioni i Kontaktit
              </h3>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Email *</label>
                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-input-background border border-border rounded-lg focus:ring-2 focus:ring-primary/50 focus:border-primary text-foreground"
                    placeholder="email@example.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Telefon *</label>
                  <input
                    type="tel"
                    name="phone"
                    required
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-input-background border border-border rounded-lg focus:ring-2 focus:ring-primary/50 focus:border-primary text-foreground"
                    placeholder="+355 6X XXX XXXX"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Emri i Prindit/Kujdestarit *</label>
                  <input
                    type="text"
                    name="parentName"
                    required
                    value={formData.parentName}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-input-background border border-border rounded-lg focus:ring-2 focus:ring-primary/50 focus:border-primary text-foreground"
                    placeholder="Emri i plotë"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Telefoni i Prindit *</label>
                  <input
                    type="tel"
                    name="parentPhone"
                    required
                    value={formData.parentPhone}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-input-background border border-border rounded-lg focus:ring-2 focus:ring-primary/50 focus:border-primary text-foreground"
                    placeholder="+355 6X XXX XXXX"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-foreground mb-2">Adresa *</label>
                  <input
                    type="text"
                    name="address"
                    required
                    value={formData.address}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-input-background border border-border rounded-lg focus:ring-2 focus:ring-primary/50 focus:border-primary text-foreground"
                    placeholder="Adresa e plotë"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Qyteti *</label>
                  <input
                    type="text"
                    name="city"
                    required
                    value={formData.city}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-input-background border border-border rounded-lg focus:ring-2 focus:ring-primary/50 focus:border-primary text-foreground"
                    placeholder="Qyteti"
                  />
                </div>
              </div>
            </div>

            {/* Academic Information */}
            <div>
              <h3 className="text-xl font-heading text-foreground mb-6 flex items-center gap-2">
                <GraduationCap className="w-5 h-5 text-primary" />
                Informacioni Akademik
              </h3>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Shkolla e Mëparshme *</label>
                  <input
                    type="text"
                    name="previousSchool"
                    required
                    value={formData.previousSchool}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-input-background border border-border rounded-lg focus:ring-2 focus:ring-primary/50 focus:border-primary text-foreground"
                    placeholder="Emri i shkollës 9-vjeçare"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Mesatarja *</label>
                  <input
                    type="number"
                    name="averageGrade"
                    required
                    step="0.01"
                    min="4"
                    max="10"
                    value={formData.averageGrade}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-input-background border border-border rounded-lg focus:ring-2 focus:ring-primary/50 focus:border-primary text-foreground"
                    placeholder="p.sh. 8.50"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Drejtimi i Preferuar *</label>
                  <select
                    name="preferredDirection"
                    required
                    value={formData.preferredDirection}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-input-background border border-border rounded-lg focus:ring-2 focus:ring-primary/50 focus:border-primary text-foreground"
                  >
                    <option value="">Zgjidhni drejtimin</option>
                    {directions.map(dir => (
                      <option key={dir} value={dir}>{dir}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Zgjedhja e Dytë</label>
                  <select
                    name="secondChoice"
                    value={formData.secondChoice}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-input-background border border-border rounded-lg focus:ring-2 focus:ring-primary/50 focus:border-primary text-foreground"
                  >
                    <option value="">Zgjidhni (opsionale)</option>
                    {directions.map(dir => (
                      <option key={dir} value={dir}>{dir}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Motivation */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Pse dëshironi të studioni në SHPE? (Opsionale)
              </label>
              <textarea
                name="motivation"
                rows={4}
                value={formData.motivation}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-input-background border border-border rounded-lg focus:ring-2 focus:ring-primary/50 focus:border-primary text-foreground resize-none"
                placeholder="Shkruani motivimin tuaj..."
              />
            </div>

            {/* Additional Options */}
            <div className="space-y-4">
              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  name="hasConvikt"
                  checked={formData.hasConvikt}
                  onChange={handleChange}
                  className="mt-1 w-5 h-5 text-primary border-border rounded focus:ring-primary/50"
                />
                <div>
                  <span className="text-foreground font-medium">Kërkoj konvikt</span>
                  <p className="text-sm text-muted-foreground">Nëse banoni larg shkollës, mund të aplikoni për konvikt falas</p>
                </div>
              </label>
              
              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  name="acceptTerms"
                  required
                  checked={formData.acceptTerms}
                  onChange={handleChange}
                  className="mt-1 w-5 h-5 text-primary border-border rounded focus:ring-primary/50"
                />
                <div>
                  <span className="text-foreground font-medium">Pranoj kushtet e regjistrimit *</span>
                  <p className="text-sm text-muted-foreground">Duke u regjistruar, pranoj që informacioni i dhënë është i saktë dhe pranoj rregulloren e shkollës</p>
                </div>
              </label>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-primary text-primary-foreground font-semibold px-8 py-4 rounded-lg hover:bg-primary/90 transition-colors inline-flex items-center justify-center gap-2"
            >
              <Send className="w-5 h-5" />
              Dërgo Aplikimin
            </button>
          </form>
        </motion.div>

        {/* Info Note */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto mt-8 text-center"
        >
          <p className="text-sm text-muted-foreground">
            Regjistrimi zyrtar bëhet përmes platformës eAlbania. Ky aplikim është për të shprehur interesin tuaj dhe për t'ju ndihmuar në procesin e regjistrimit.
          </p>
        </motion.div>
      </div>
    </section>
  )
}
