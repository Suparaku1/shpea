'use client'

import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import { supabase } from '@/integrations/supabase/client'
import { Users } from 'lucide-react'

// Fallback images
import marcusPhoto from '../assets/team-member-1.png'
import sofiaPhoto from '../assets/team-member-2.png'
import jakePhoto from '../assets/team-member-3.png'
import mayaPhoto from '../assets/team-member-4.png'
import connorPhoto from '../assets/team-member-5.png'
import zaraPhoto from '../assets/team-member-6.png'
import leoPhoto from '../assets/team-member-7.png'

interface TeamMember {
  id: string
  full_name: string
  position: string
  department: string | null
  quote: string | null
  photo_url: string | null
  sort_order: number
}

const fallbackStaff = [
  {
    id: '1',
    full_name: "Leonidha Haxhinikolla",
    position: "DREJTOR",
    department: "Drejtoria",
    quote: "Edukimi profesional është çelësi i suksesit për të rinjtë tanë. Ne përgatisim të ardhmen e Shqipërisë.",
    photo_url: "/leonidha.jpg",
  },
  {
    id: '2',
    full_name: "Juljan Kasapi",
    position: "NënDREJTOR",
    department: "Drejtoria",
    quote: "Çdo nxënës ka potencial të jashtëzakonshëm. Detyra jonë është ta zbulojmë dhe ta zhvillojmë atë.",
    photo_url: "/juljan.jpg",
  },
  {
    id: '3',
    full_name: "Entela Progri",
    position: "PËRGJEGJËS DEPARTAMENTI",
    department: "TIK",
    quote: "Teknologjia po ndryshon botën. Ne përgatisim nxënësit për të qenë pionierë të këtij ndryshimi.",
    photo_url: "/entela.jpg",
  },
  {
    id: '4',
    full_name: "Esmerald Suparaku",
    position: "Zhvillimi Web",
    department: "TIK",
    quote: "Sipërmarrja dhe kreativiteti janë aftësitë e shekullit 21. Ne i mësojmë të dyja.",
    photo_url: "/esmerald.jpg",
  },
  {
    id: '5',
    full_name: "Lidia Guda",
    position: "Profesore",
    department: "TIK",
    quote: "Shqipëria ka potencial të jashtëzakonshëm. Ne përgatisim profesionistët e informatikes.",
    photo_url: "/lidia.jpg",
  },
  {
    id: '6',
    full_name: "Arisa Arapi",
    position: "Profesore",
    department: "TIK",
    quote: "Kodimi është gjuha e re e botës. Nxënësit tanë mësojnë të komunikojnë me teknologjinë.",
    photo_url: "/arisa.jpg",
  }
]

const rotations = ['rotate-3', 'rotate-2', '-rotate-2', 'rotate-1', '-rotate-1', 'rotate-2']

export function Staff() {
  const [staffMembers, setStaffMembers] = useState<TeamMember[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchStaff()
  }, [])

  const fetchStaff = async () => {
    const { data, error } = await supabase
      .from('team_members')
      .select('*')
      .eq('is_active', true)
      .order('sort_order', { ascending: true })

    if (data && data.length > 0) {
      setStaffMembers(data)
    } else {
      // Use fallback data if no data in DB
      setStaffMembers(fallbackStaff as TeamMember[])
    }
    setLoading(false)
  }

  return (
    <section id="staff" className="relative py-32 bg-background w-full overflow-visible">
      <div className="container mx-auto px-6 sm:px-8 lg:px-12 overflow-visible">
        
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-3 mb-6">
            <div className="w-3 h-3 bg-primary rounded-full animate-pulse" />
            <span className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
              Stafi Pedagogjik
            </span>
            <div className="w-3 h-3 bg-accent-emerald rounded-full animate-pulse" />
          </div>
          
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-heading leading-tight mb-6 text-foreground">
            <span className="block mb-2">Njihuni me</span>
            <span className="block text-primary">EKIPIN TONË</span>
          </h2>
          
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Mësues të kualifikuar dhe të përkushtuar për suksesin e çdo nxënësi
          </p>
        </motion.div>

        {loading ? (
          <div className="flex justify-center py-20">
            <div className="w-8 h-8 border-4 border-primary/30 border-t-primary rounded-full animate-spin" />
          </div>
        ) : (
          /* Framed Staff Board */
          <div className="max-w-7xl mx-auto overflow-visible">
            <div className="relative overflow-visible">
              
              {/* Dark Frame */}
              <div className="bg-gradient-to-br from-foreground via-foreground/95 to-foreground p-8 rounded-2xl shadow-2xl relative border border-muted/20 overflow-visible">
                
                {/* Frame texture */}
                <div className="absolute inset-0 opacity-10 rounded-2xl"
                     style={{
                       backgroundImage: `
                         linear-gradient(135deg, rgba(255, 255, 255, 0.05) 0%, transparent 50%, rgba(0, 0, 0, 0.1) 100%)
                       `
                     }} />
                
                {/* Board Background */}
                <div className="bg-gradient-to-br from-background via-muted/30 to-background rounded-xl p-8 relative border border-border/30 overflow-visible">
                  
                  {/* Subtle texture */}
                  <div className="absolute inset-0 opacity-20 rounded-xl"
                       style={{
                         backgroundImage: `
                           radial-gradient(circle at 30% 30%, hsl(var(--primary) / 0.05) 1px, transparent 1px),
                           radial-gradient(circle at 70% 70%, hsl(var(--muted) / 0.03) 1px, transparent 1px)
                         `,
                         backgroundSize: '30px 30px, 45px 45px'
                       }} />

                  {/* Staff Cards Grid */}
                  <div className="relative z-10 overflow-visible">
                    {/* First row - 4 cards */}
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8 mb-8 overflow-visible">
                      {staffMembers.slice(0, 4).map((member, index) => (
                        <motion.div
                          key={member.id}
                          initial={{ opacity: 0, y: 30 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.6, delay: index * 0.1 }}
                          className={`group transform ${rotations[index] || 'rotate-0'} hover:rotate-0 transition-all duration-500 hover:scale-105 hover:z-20`}
                          style={{
                            filter: 'drop-shadow(4px 4px 12px rgba(0,0,0,0.2))',
                          }}
                        >
                          <div className="bg-gradient-to-b from-card to-muted/20 border-4 border-primary/30 rounded-lg relative shadow-lg overflow-hidden">
                            
                            {/* Push pins */}
                            <div className="absolute -top-2 left-4 w-4 h-4 bg-gradient-to-br from-primary to-primary/80 rounded-full shadow-lg border border-primary/50 z-20" />
                            <div className="absolute -top-2 right-4 w-4 h-4 bg-gradient-to-br from-primary to-primary/80 rounded-full shadow-lg border border-primary/50 z-20" />
                            
                            {/* Subtle overlay */}
                            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-muted/10" />

                            <div className="p-6 text-center relative z-10">
                              
                              {/* Role Badge */}
                              <div className="mb-4">
                                <span className="inline-block bg-primary/10 text-primary text-xs font-bold px-3 py-1 rounded-full border border-primary/20">
                                  {member.department || member.position}
                                </span>
                              </div>

                              {/* Photo */}
                              <div className="relative mb-4 mx-auto w-28 h-28 border-3 border-primary/30 bg-muted rounded-full overflow-hidden group-hover:border-primary/50 transition-colors">
                                {member.photo_url ? (
                                  <img
                                    src={member.photo_url}
                                    alt={member.full_name}
                                    className="w-full h-full object-cover"
                                  />
                                ) : (
                                  <div className="w-full h-full flex items-center justify-center">
                                    <Users className="w-10 h-10 text-muted-foreground" />
                                  </div>
                                )}
                                <div className="absolute inset-0 bg-gradient-to-t from-primary/10 to-transparent" />
                              </div>

                              {/* Details */}
                              <div className="space-y-2">
                                <h3 className="font-heading text-lg text-foreground">{member.full_name}</h3>
                                <p className="font-bold text-primary text-sm">{member.position}</p>
                                {member.quote && (
                                  <p className="text-xs text-muted-foreground leading-relaxed italic bg-muted/30 p-3 rounded-lg border-l-2 border-primary/30">
                                    "{member.quote}"
                                  </p>
                                )}
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                    
                    {/* Second row - remaining cards centered */}
                    {staffMembers.length > 4 && (
                      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 max-w-5xl mx-auto overflow-visible">
                        {staffMembers.slice(4).map((member, index) => (
                          <motion.div
                            key={member.id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
                            className={`group transform ${rotations[4 + index] || 'rotate-0'} hover:rotate-0 transition-all duration-500 hover:scale-105 hover:z-20`}
                            style={{
                              filter: 'drop-shadow(4px 4px 12px rgba(0,0,0,0.2))',
                            }}
                          >
                            <div className="bg-gradient-to-b from-card to-muted/20 border-4 border-primary/30 rounded-lg relative shadow-lg overflow-hidden">
                              
                              {/* Push pins */}
                              <div className="absolute -top-2 left-4 w-4 h-4 bg-gradient-to-br from-primary to-primary/80 rounded-full shadow-lg border border-primary/50 z-20" />
                              <div className="absolute -top-2 right-4 w-4 h-4 bg-gradient-to-br from-primary to-primary/80 rounded-full shadow-lg border border-primary/50 z-20" />
                              
                              {/* Subtle overlay */}
                              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-muted/10" />

                              <div className="p-6 text-center relative z-10">
                                
                                {/* Role Badge */}
                                <div className="mb-4">
                                  <span className="inline-block bg-primary/10 text-primary text-xs font-bold px-3 py-1 rounded-full border border-primary/20">
                                    {member.department || member.position}
                                  </span>
                                </div>

                                {/* Photo */}
                                <div className="relative mb-4 mx-auto w-28 h-28 border-3 border-primary/30 bg-muted rounded-full overflow-hidden group-hover:border-primary/50 transition-colors">
                                  {member.photo_url ? (
                                    <img
                                      src={member.photo_url}
                                      alt={member.full_name}
                                      className="w-full h-full object-cover"
                                    />
                                  ) : (
                                    <div className="w-full h-full flex items-center justify-center">
                                      <Users className="w-10 h-10 text-muted-foreground" />
                                    </div>
                                  )}
                                  <div className="absolute inset-0 bg-gradient-to-t from-primary/10 to-transparent" />
                                </div>

                                {/* Details */}
                                <div className="space-y-2">
                                  <h3 className="font-heading text-lg text-foreground">{member.full_name}</h3>
                                  <p className="font-bold text-primary text-sm">{member.position}</p>
                                  {member.quote && (
                                    <p className="text-xs text-muted-foreground leading-relaxed italic bg-muted/30 p-3 rounded-lg border-l-2 border-primary/30">
                                      "{member.quote}"
                                    </p>
                                  )}
                                </div>
                              </div>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
