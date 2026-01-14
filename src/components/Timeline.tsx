'use client'

import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { supabase } from '@/integrations/supabase/client'
import { 
  Building, Layers, RefreshCw, Globe, Monitor, Laptop, Star, Calendar,
  GraduationCap, Award, Trophy, Users, TrendingUp, Briefcase
} from 'lucide-react'

interface TimelineEvent {
  id: string
  year: number
  title: string
  description: string
  image_url: string | null
  icon: string
  is_milestone: boolean
  sort_order: number
}

const iconMap: Record<string, any> = {
  Building, Layers, RefreshCw, Globe, Monitor, Laptop, Star, Calendar,
  GraduationCap, Award, Trophy, Users, TrendingUp, Briefcase
}

export function Timeline() {
  const { t } = useTranslation()
  const [events, setEvents] = useState<TimelineEvent[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchEvents = async () => {
      const { data } = await supabase
        .from('timeline_events')
        .select('*')
        .eq('is_active', true)
        .order('sort_order')
      
      if (data) setEvents(data)
      setLoading(false)
    }
    fetchEvents()
  }, [])

  if (loading) {
    return (
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-6">
          <div className="flex justify-center">
            <div className="w-8 h-8 border-4 border-primary/30 border-t-primary rounded-full animate-spin" />
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="py-20 bg-gradient-to-b from-muted/30 to-background overflow-hidden">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-4">
            <Calendar className="w-4 h-4" />
            {t('timeline.badge', 'Historia Jonë')}
          </span>
          <h2 className="text-3xl md:text-4xl font-heading text-foreground mb-4">
            {t('timeline.title', 'Rrugëtimi i Shkollës')}
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            {t('timeline.subtitle', 'Momentet kyçe që kanë formësuar historinë tonë të suksesshme')}
          </p>
        </motion.div>

        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gradient-to-b from-primary via-accent-emerald to-primary/30 hidden md:block" />

          <div className="space-y-12">
            {events.map((event, index) => {
              const Icon = iconMap[event.icon] || Calendar
              const isLeft = index % 2 === 0

              return (
                <motion.div
                  key={event.id}
                  initial={{ opacity: 0, x: isLeft ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: '-100px' }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className={`relative flex flex-col md:flex-row items-center gap-8 ${
                    isLeft ? 'md:flex-row' : 'md:flex-row-reverse'
                  }`}
                >
                  {/* Content */}
                  <div className={`flex-1 ${isLeft ? 'md:text-right' : 'md:text-left'}`}>
                    <motion.div
                      whileHover={{ scale: 1.02, y: -5 }}
                      className={`bg-card rounded-2xl p-6 shadow-lg border border-border hover:border-primary/30 hover:shadow-xl transition-all duration-300 ${
                        event.is_milestone ? 'ring-2 ring-primary/20' : ''
                      }`}
                    >
                      {event.is_milestone && (
                        <span className="inline-flex items-center gap-1 bg-primary/10 text-primary px-3 py-1 rounded-full text-xs font-medium mb-3">
                          <Star className="w-3 h-3" />
                          Moment Kyç
                        </span>
                      )}
                      <h3 className="text-xl font-heading text-foreground mb-2">{event.title}</h3>
                      <p className="text-muted-foreground text-sm leading-relaxed">{event.description}</p>
                      {event.image_url && (
                        <img 
                          src={event.image_url} 
                          alt={event.title}
                          className="w-full h-40 object-cover rounded-lg mt-4"
                        />
                      )}
                    </motion.div>
                  </div>

                  {/* Center point */}
                  <div className="relative z-10 flex flex-col items-center">
                    <motion.div
                      whileHover={{ scale: 1.2, rotate: 10 }}
                      className={`w-16 h-16 rounded-full flex items-center justify-center shadow-lg ${
                        event.is_milestone 
                          ? 'bg-gradient-to-br from-primary to-accent-emerald' 
                          : 'bg-card border-2 border-primary'
                      }`}
                    >
                      <Icon className={`w-7 h-7 ${event.is_milestone ? 'text-primary-foreground' : 'text-primary'}`} />
                    </motion.div>
                    <div className="mt-2 px-3 py-1 bg-foreground text-background rounded-full text-sm font-bold">
                      {event.year}
                    </div>
                  </div>

                  {/* Empty space for alternating layout */}
                  <div className="flex-1 hidden md:block" />
                </motion.div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
