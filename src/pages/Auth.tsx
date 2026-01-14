'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { supabase } from '@/integrations/supabase/client'
import { Mail, Lock, Eye, EyeOff, Shield, ArrowLeft } from 'lucide-react'
import { toast } from 'sonner'
import { z } from 'zod'
import shpeLogo from '@/assets/shpe-logo.png'

const emailSchema = z.string().email('Email i pavlefshëm')
const passwordSchema = z.string().min(6, 'Fjalëkalimi duhet të ketë të paktën 6 karaktere')

export default function Auth() {
  const navigate = useNavigate()
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({})

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (session?.user) {
        // Check if admin and redirect
        checkAdminAndRedirect(session.user.id)
      }
    })

    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        checkAdminAndRedirect(session.user.id)
      }
    })

    return () => subscription.unsubscribe()
  }, [navigate])

  const checkAdminAndRedirect = async (userId: string) => {
    const { data } = await supabase
      .from('user_roles')
      .select('role')
      .eq('user_id', userId)
      .eq('role', 'admin')
      .maybeSingle()

    if (data) {
      navigate('/admin')
    } else {
      toast.error('Vetëm administratorët kanë qasje')
      await supabase.auth.signOut()
    }
  }

  const validateForm = () => {
    const newErrors: typeof errors = {}
    
    try {
      emailSchema.parse(formData.email)
    } catch (e) {
      if (e instanceof z.ZodError) {
        newErrors.email = e.errors[0].message
      }
    }

    try {
      passwordSchema.parse(formData.password)
    } catch (e) {
      if (e instanceof z.ZodError) {
        newErrors.password = e.errors[0].message
      }
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) return
    
    setLoading(true)

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email: formData.email,
        password: formData.password,
      })

      if (error) {
        if (error.message.includes('Invalid login credentials')) {
          toast.error('Email ose fjalëkalim i gabuar')
        } else {
          toast.error(error.message)
        }
      }
    } catch (error) {
      toast.error('Ndodhi një gabim. Provo përsëri.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-accent/5 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        <div className="bg-card border border-border rounded-2xl p-8 shadow-xl">
          {/* Logo and Header */}
          <div className="text-center mb-8">
            <a href="/" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-6">
              <ArrowLeft className="w-4 h-4" />
              Kthehu në faqen kryesore
            </a>
            
            <img src={shpeLogo} alt="SHPE Logo" className="h-16 mx-auto mb-4" />
            <div className="inline-flex items-center gap-2 mb-4">
              <Shield className="w-5 h-5 text-primary" />
              <span className="text-primary font-semibold">Panel Administratori</span>
            </div>
            <h1 className="text-2xl font-heading text-foreground">
              Hyrje Administrator
            </h1>
            <p className="text-muted-foreground mt-2">
              Vetëm për administratorët e autorizuar
            </p>
          </div>

          {/* Auth Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Email
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className={`w-full pl-10 pr-4 py-3 bg-input-background border rounded-lg focus:ring-2 focus:ring-primary/50 focus:border-primary text-foreground ${errors.email ? 'border-destructive' : 'border-border'}`}
                  placeholder="admin@shpe.edu.al"
                />
              </div>
              {errors.email && <p className="text-destructive text-sm mt-1">{errors.email}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Fjalëkalimi
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className={`w-full pl-10 pr-12 py-3 bg-input-background border rounded-lg focus:ring-2 focus:ring-primary/50 focus:border-primary text-foreground ${errors.password ? 'border-destructive' : 'border-border'}`}
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              {errors.password && <p className="text-destructive text-sm mt-1">{errors.password}</p>}
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-primary text-primary-foreground font-semibold py-3 rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
              ) : (
                <>
                  <Shield className="w-5 h-5" />
                  Hyr si Administrator
                </>
              )}
            </button>
          </form>

          {/* Info */}
          <div className="mt-8 p-4 bg-muted/50 rounded-lg">
            <p className="text-sm text-muted-foreground text-center">
              Kjo faqe është vetëm për administratorët e shkollës.
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
