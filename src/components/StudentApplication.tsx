'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { supabase } from '@/integrations/supabase/client'
import { toast } from 'sonner'
import { 
  GraduationCap, User, Mail, Phone, Users, School, FileText, 
  CheckCircle, ArrowRight, ArrowLeft, Send, Loader2
} from 'lucide-react'

interface FormData {
  applicant_name: string
  applicant_email: string
  applicant_phone: string
  parent_name: string
  parent_phone: string
  grade_level: string
  previous_school: string
  program: string
  notes: string
}

const programs = [
  'TIK - Teknologji Informacioni',
  'Ekonomi - Biznes',
  'Hoteleri - Turizëm',
  'Mekanikë',
  'Elektroteknikë',
  'Ndërtim'
]

const gradeLevels = [
  'Klasa 10',
  'Klasa 11',
  'Klasa 12',
  'Transferim'
]

export function StudentApplication() {
  const { t } = useTranslation()
  const [step, setStep] = useState(1)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [formData, setFormData] = useState<FormData>({
    applicant_name: '',
    applicant_email: '',
    applicant_phone: '',
    parent_name: '',
    parent_phone: '',
    grade_level: '',
    previous_school: '',
    program: '',
    notes: ''
  })

  const updateField = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const validateStep = (currentStep: number): boolean => {
    switch (currentStep) {
      case 1:
        return !!(formData.applicant_name && formData.applicant_email)
      case 2:
        return !!(formData.parent_name && formData.parent_phone)
      case 3:
        return !!(formData.program && formData.grade_level)
      default:
        return true
    }
  }

  const handleSubmit = async () => {
    if (!validateStep(3)) {
      toast.error('Ju lutem plotësoni të gjitha fushat e detyrueshme')
      return
    }

    setIsSubmitting(true)
    try {
      const { error } = await supabase
        .from('student_applications')
        .insert([formData])

      if (error) throw error

      setIsSubmitted(true)
      toast.success('Aplikimi u dërgua me sukses!')
    } catch (error) {
      console.error('Error submitting application:', error)
      toast.error('Gabim në dërgimin e aplikimit. Ju lutem provoni përsëri.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const steps = [
    { number: 1, title: 'Të Dhënat e Nxënësit', icon: User },
    { number: 2, title: 'Të Dhënat e Prindit', icon: Users },
    { number: 3, title: 'Programi & Dokumentat', icon: FileText }
  ]

  if (isSubmitted) {
    return (
      <section id="application" className="py-20 bg-gradient-to-b from-background to-muted/30">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="max-w-2xl mx-auto text-center"
          >
            <div className="w-20 h-20 bg-accent-emerald/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-10 h-10 text-accent-emerald" />
            </div>
            <h2 className="text-3xl font-heading text-foreground mb-4">
              {t('application.success.title', 'Aplikimi u Regjistrua!')}
            </h2>
            <p className="text-muted-foreground mb-8">
              {t('application.success.message', 'Faleminderit për aplikimin tuaj. Do të kontaktoheni së shpejti për hapat e ardhshëm.')}
            </p>
            <button
              onClick={() => {
                setIsSubmitted(false)
                setStep(1)
                setFormData({
                  applicant_name: '',
                  applicant_email: '',
                  applicant_phone: '',
                  parent_name: '',
                  parent_phone: '',
                  grade_level: '',
                  previous_school: '',
                  program: '',
                  notes: ''
                })
              }}
              className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-lg hover:bg-primary/90 transition-colors"
            >
              <GraduationCap className="w-5 h-5" />
              Apliko Përsëri
            </button>
          </motion.div>
        </div>
      </section>
    )
  }

  return (
    <section id="application" className="py-20 bg-gradient-to-b from-background to-muted/30 overflow-hidden">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-4">
            <GraduationCap className="w-4 h-4" />
            {t('application.badge', 'Aplikim Online')}
          </span>
          <h2 className="text-3xl md:text-4xl font-heading text-foreground mb-4">
            {t('application.title', 'Apliko Tani')}
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            {t('application.subtitle', 'Plotësoni formularin për të aplikuar në shkollën tonë. Procesi është i thjeshtë dhe i shpejtë.')}
          </p>
        </motion.div>

        {/* Steps Indicator */}
        <div className="max-w-3xl mx-auto mb-12">
          <div className="flex items-center justify-between relative">
            <div className="absolute top-6 left-0 right-0 h-1 bg-border" />
            <div 
              className="absolute top-6 left-0 h-1 bg-primary transition-all duration-500"
              style={{ width: `${((step - 1) / (steps.length - 1)) * 100}%` }}
            />
            {steps.map((s) => {
              const Icon = s.icon
              return (
                <div key={s.number} className="relative z-10 flex flex-col items-center">
                  <motion.div
                    animate={{
                      scale: step === s.number ? 1.1 : 1,
                      backgroundColor: step >= s.number ? 'hsl(var(--primary))' : 'hsl(var(--muted))'
                    }}
                    className="w-12 h-12 rounded-full flex items-center justify-center shadow-lg"
                  >
                    <Icon className={`w-5 h-5 ${step >= s.number ? 'text-primary-foreground' : 'text-muted-foreground'}`} />
                  </motion.div>
                  <span className={`mt-2 text-sm font-medium ${step >= s.number ? 'text-foreground' : 'text-muted-foreground'}`}>
                    {s.title}
                  </span>
                </div>
              )
            })}
          </div>
        </div>

        {/* Form */}
        <div className="max-w-2xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-card rounded-2xl p-8 shadow-xl border border-border"
          >
            <AnimatePresence mode="wait">
              {step === 1 && (
                <motion.div
                  key="step1"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-6"
                >
                  <h3 className="text-xl font-heading text-foreground mb-6 flex items-center gap-2">
                    <User className="w-5 h-5 text-primary" />
                    Të Dhënat e Nxënësit
                  </h3>
                  
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Emri i Plotë *
                      </label>
                      <input
                        type="text"
                        value={formData.applicant_name}
                        onChange={(e) => updateField('applicant_name', e.target.value)}
                        className="w-full px-4 py-3 bg-input-background border border-border rounded-lg text-foreground focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
                        placeholder="Shkruani emrin e plotë"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Email *
                      </label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                        <input
                          type="email"
                          value={formData.applicant_email}
                          onChange={(e) => updateField('applicant_email', e.target.value)}
                          className="w-full pl-10 pr-4 py-3 bg-input-background border border-border rounded-lg text-foreground focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
                          placeholder="email@shembull.com"
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Numri i Telefonit
                    </label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                      <input
                        type="tel"
                        value={formData.applicant_phone}
                        onChange={(e) => updateField('applicant_phone', e.target.value)}
                        className="w-full pl-10 pr-4 py-3 bg-input-background border border-border rounded-lg text-foreground focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
                        placeholder="+355 69 XXX XXXX"
                      />
                    </div>
                  </div>
                </motion.div>
              )}

              {step === 2 && (
                <motion.div
                  key="step2"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-6"
                >
                  <h3 className="text-xl font-heading text-foreground mb-6 flex items-center gap-2">
                    <Users className="w-5 h-5 text-primary" />
                    Të Dhënat e Prindit/Kujdestarit
                  </h3>
                  
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Emri i Prindit *
                      </label>
                      <input
                        type="text"
                        value={formData.parent_name}
                        onChange={(e) => updateField('parent_name', e.target.value)}
                        className="w-full px-4 py-3 bg-input-background border border-border rounded-lg text-foreground focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
                        placeholder="Emri i plotë i prindit"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Telefoni i Prindit *
                      </label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                        <input
                          type="tel"
                          value={formData.parent_phone}
                          onChange={(e) => updateField('parent_phone', e.target.value)}
                          className="w-full pl-10 pr-4 py-3 bg-input-background border border-border rounded-lg text-foreground focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
                          placeholder="+355 69 XXX XXXX"
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Shkolla e Mëparshme
                    </label>
                    <div className="relative">
                      <School className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                      <input
                        type="text"
                        value={formData.previous_school}
                        onChange={(e) => updateField('previous_school', e.target.value)}
                        className="w-full pl-10 pr-4 py-3 bg-input-background border border-border rounded-lg text-foreground focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
                        placeholder="Emri i shkollës së mëparshme"
                      />
                    </div>
                  </div>
                </motion.div>
              )}

              {step === 3 && (
                <motion.div
                  key="step3"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-6"
                >
                  <h3 className="text-xl font-heading text-foreground mb-6 flex items-center gap-2">
                    <FileText className="w-5 h-5 text-primary" />
                    Programi dhe Informacione Shtesë
                  </h3>
                  
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Programi i Dëshiruar *
                      </label>
                      <select
                        value={formData.program}
                        onChange={(e) => updateField('program', e.target.value)}
                        className="w-full px-4 py-3 bg-input-background border border-border rounded-lg text-foreground focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
                      >
                        <option value="">Zgjidhni programin</option>
                        {programs.map((p) => (
                          <option key={p} value={p}>{p}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Niveli/Klasa *
                      </label>
                      <select
                        value={formData.grade_level}
                        onChange={(e) => updateField('grade_level', e.target.value)}
                        className="w-full px-4 py-3 bg-input-background border border-border rounded-lg text-foreground focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
                      >
                        <option value="">Zgjidhni klasën</option>
                        {gradeLevels.map((g) => (
                          <option key={g} value={g}>{g}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Shënime Shtesë
                    </label>
                    <textarea
                      value={formData.notes}
                      onChange={(e) => updateField('notes', e.target.value)}
                      rows={4}
                      className="w-full px-4 py-3 bg-input-background border border-border rounded-lg text-foreground focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all resize-none"
                      placeholder="Shkruani çdo informacion shtesë që dëshironi të ndani..."
                    />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Navigation Buttons */}
            <div className="flex justify-between mt-8 pt-6 border-t border-border">
              <button
                onClick={() => setStep(s => Math.max(1, s - 1))}
                disabled={step === 1}
                className="inline-flex items-center gap-2 px-6 py-3 text-muted-foreground hover:text-foreground disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                Mbrapa
              </button>

              {step < 3 ? (
                <button
                  onClick={() => {
                    if (validateStep(step)) {
                      setStep(s => s + 1)
                    } else {
                      toast.error('Ju lutem plotësoni fushat e detyrueshme')
                    }
                  }}
                  className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-lg hover:bg-primary/90 transition-colors"
                >
                  Vazhdo
                  <ArrowRight className="w-4 h-4" />
                </button>
              ) : (
                <button
                  onClick={handleSubmit}
                  disabled={isSubmitting || !validateStep(3)}
                  className="inline-flex items-center gap-2 bg-accent-emerald text-primary-foreground px-6 py-3 rounded-lg hover:bg-accent-emerald/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Duke dërguar...
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      Dërgo Aplikimin
                    </>
                  )}
                </button>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
