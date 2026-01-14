'use client'

import { motion, useMotionValue, useTransform, animate } from 'framer-motion'
import { useEffect, useState } from 'react'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import { Trophy, Users, Briefcase, Award, TrendingUp, GraduationCap, Star, Target } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { supabase } from '@/integrations/supabase/client'

interface CounterProps {
  from: number
  to: number
  duration?: number
  suffix?: string
}

function AnimatedCounter({ from, to, duration = 2, suffix = '' }: CounterProps) {
  const count = useMotionValue(from)
  const rounded = useTransform(count, (value) => Math.round(value))
  const [displayValue, setDisplayValue] = useState(from)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  useEffect(() => {
    if (isInView) {
      const controls = animate(count, to, { duration })
      return controls.stop
    }
  }, [isInView, count, to, duration])

  useEffect(() => {
    const unsubscribe = rounded.on('change', (v) => setDisplayValue(v))
    return unsubscribe
  }, [rounded])

  return (
    <span ref={ref} className="tabular-nums">
      {displayValue}{suffix}
    </span>
  )
}

interface Statistic {
  id: string
  stat_key: string
  value: number
  suffix: string
  label: string
  description: string | null
  icon: string
  color: string
}

const iconMap: Record<string, any> = {
  Trophy, Users, Briefcase, Award, TrendingUp, GraduationCap, Star, Target
}

export function Achievements() {
  const { t } = useTranslation()
  const containerRef = useRef(null)
  const isInView = useInView(containerRef, { once: true, margin: '-50px' })
  const [statistics, setStatistics] = useState<Statistic[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchStatistics = async () => {
      const { data } = await supabase
        .from('statistics')
        .select('*')
        .eq('is_active', true)
        .order('sort_order')
      
      if (data) setStatistics(data)
      setLoading(false)
    }
    fetchStatistics()
  }, [])

  if (loading) {
    return (
      <section className="py-24 relative overflow-hidden bg-foreground">
        <div className="container mx-auto px-6">
          <div className="flex justify-center">
            <div className="w-8 h-8 border-4 border-background/30 border-t-background rounded-full animate-spin" />
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="py-24 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-foreground via-foreground/95 to-primary/20">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-72 h-72 bg-primary rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent-emerald rounded-full blur-3xl animate-pulse delay-1000" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-accent-purple rounded-full blur-3xl animate-pulse delay-500" />
        </div>
      </div>
      
      <div ref={containerRef} className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-flex items-center gap-2 bg-background/10 backdrop-blur-sm text-background px-4 py-2 rounded-full text-sm font-medium mb-4">
            <Trophy className="w-4 h-4" />
            {t('achievements.badge', 'Arritjet Tona')}
          </span>
          <h2 className="text-3xl md:text-5xl font-heading text-background mb-4">
            {t('achievements.title', 'Numra që Flasin Vetë')}
          </h2>
          <p className="text-background/70 max-w-2xl mx-auto text-lg">
            {t('achievements.subtitle', 'Dekada të përkushtimit në arsimin profesional me rezultate të shkëlqyera')}
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-6">
          {statistics.map((stat, index) => {
            const Icon = iconMap[stat.icon] || Trophy
            return (
              <motion.div
                key={stat.id}
                initial={{ opacity: 0, scale: 0.8, y: 40 }}
                animate={isInView ? { opacity: 1, scale: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ 
                  scale: 1.05, 
                  y: -5,
                  rotateY: 10,
                  rotateX: -5
                }}
                style={{ perspective: 1000, transformStyle: 'preserve-3d' }}
                className="group"
              >
                <div className="relative bg-background/10 backdrop-blur-md rounded-2xl p-6 border border-background/20 hover:border-background/40 transition-all duration-300 h-full">
                  {/* Gradient Glow */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-0 group-hover:opacity-20 rounded-2xl transition-opacity duration-300`} />
                  
                  <div className="relative z-10">
                    <motion.div 
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.5 }}
                      className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center mb-4 shadow-lg`}
                    >
                      <Icon className="w-6 h-6 text-background" />
                    </motion.div>
                    
                    <div className="text-3xl md:text-4xl font-heading text-background mb-1">
                      <AnimatedCounter from={0} to={stat.value} suffix={stat.suffix || ''} />
                    </div>
                    
                    <h3 className="text-background font-semibold text-sm mb-1">{stat.label}</h3>
                    {stat.description && (
                      <p className="text-background/60 text-xs">{stat.description}</p>
                    )}
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
