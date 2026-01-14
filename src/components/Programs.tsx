'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { ImageWithFallback } from './figma/ImageWithFallback'

export function Programs() {
  const [isVisible, setIsVisible] = useState(false)
  const [hoveredPhoto, setHoveredPhoto] = useState<string | null>(null)

  const services = [
    {
      id: 'tik',
      title: "TIK - Teknologji Informacioni",
      description: "Zhvillimi i aftësive në programim, rrjete kompjuterike dhe sistemet e informacionit.",
      color: 'accent-blue',
      rotation: 'rotate-2',
      image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=400&h=300&fit=crop&auto=format'
    },
    {
      id: 'ekonomi',
      title: "Ekonomi - Biznes", 
      description: "Përgatitja për menaxhim biznesi, kontabilitet dhe sipërmarrje.",
      color: 'accent-emerald',
      rotation: '-rotate-1',
      image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=400&h=300&fit=crop&auto=format'
    },
    {
      id: 'hoteleri',
      title: "Hoteleri - Turizëm",
      description: "Shërbime hotelerie, kuzhina profesionale dhe udhërrëfyes turistik.",
      color: 'accent-purple',
      rotation: 'rotate-1',
      image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400&h=300&fit=crop&auto=format'
    },
    {
      id: 'mekanike',
      title: "Mekanikë",
      description: "Prodhimi dhe riparimi i makinerive, torneria dhe saldimi.",
      color: 'accent-orange',
      rotation: '-rotate-2',
      image: 'https://images.unsplash.com/photo-1581092921461-eab62e97a780?w=400&h=300&fit=crop&auto=format'
    },
    {
      id: 'elektroteknike',
      title: "Elektroteknikë",
      description: "Instalime elektrike, automatizim dhe sistemet e kontrollit.",
      color: 'accent-blue',
      rotation: 'rotate-3',
      image: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=400&h=300&fit=crop&auto=format'
    },
    {
      id: 'ndertim',
      title: "Ndërtim",
      description: "Teknikat e ndërtimit, leximi i projekteve dhe punime ndërtimore.",
      color: 'accent-emerald',
      rotation: '-rotate-1',
      image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=400&h=300&fit=crop&auto=format'
    }
  ]

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 300)
    return () => clearTimeout(timer)
  }, [])

  return (
    <section id="programs" className="relative py-20" style={{
      background: 'linear-gradient(135deg, hsl(210, 40%, 15%) 0%, hsl(210, 35%, 10%) 30%, hsl(210, 30%, 8%) 60%, hsl(210, 35%, 10%) 100%)',
      overflow: 'visible'
    }}>
      
      {/* Photo Lab Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-accent-blue/15 rounded-full blur-2xl" />
      </div>

      <div className="container mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
        
        {/* Header */}
        <div className="text-center mb-16">
          <div className={`inline-flex items-center gap-3 mb-6 transform transition-all duration-1000 ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
          }`}>
            <div className="w-3 h-3 bg-primary rounded-full animate-pulse" />
            <span className="text-sm font-semibold text-background/80">
              Drejtimet Profesionale
            </span>
            <div className="w-3 h-3 bg-accent-emerald rounded-full animate-pulse" />
          </div>
          
          <h2 className={`text-5xl sm:text-6xl lg:text-7xl font-heading leading-tight mb-6 text-background transform transition-all duration-1000 delay-200 ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'
          }`}>
            Oferta Shkollore
          </h2>
          
          <p className={`text-xl text-background/90 leading-relaxed max-w-3xl mx-auto transform transition-all duration-1000 delay-400 ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
          }`}>
            Zgjidhni drejtimin tuaj drejt një karriere të suksesshme
          </p>
        </div>

        {/* Photo Clotheslines */}
        <div className={`w-full transform transition-all duration-1000 delay-600 ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'
        }`} style={{ overflow: 'visible' }}>
          
          {/* First Clothesline */}
          <div className="relative mb-24" style={{ overflow: 'visible' }}>
            {/* Rope */}
            <div className="absolute top-8 left-0 right-0 h-4 rope-sway">
              <div className="w-full h-full bg-gradient-to-b from-yellow-800 via-amber-900 to-yellow-900 rounded-full shadow-lg" />
              <div className="absolute inset-0 opacity-90 rounded-full" 
                   style={{
                     backgroundImage: `repeating-linear-gradient(45deg, rgba(139,69,19,0.6) 0px, rgba(160,82,45,0.4) 2px, transparent 4px)`
                   }} />
              <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-transparent via-yellow-700 to-transparent rounded-full opacity-80" />
            </div>
            
            {/* Wall anchors */}
            <div className="absolute left-0 sm:-left-10 top-4 w-10 h-10 bg-gradient-to-br from-gray-500 to-gray-800 rounded-full shadow-xl border border-gray-400" />
            <div className="absolute right-0 sm:-right-10 top-4 w-10 h-10 bg-gradient-to-br from-gray-500 to-gray-800 rounded-full shadow-xl border border-gray-400" />
            
            {/* Photos */}
            <div className="flex flex-wrap justify-center gap-4 sm:gap-8 lg:gap-16 pt-20 max-w-7xl mx-auto px-4">
              {services.slice(0, 3).map((service, index) => (
                <motion.div
                  key={service.id}
                  className={`${index === 0 ? 'photo-sway-1' : index === 1 ? 'photo-sway-2' : 'photo-sway-3'}`}
                  onMouseEnter={() => setHoveredPhoto(service.id)}
                  onMouseLeave={() => setHoveredPhoto(null)}
                  style={{ perspective: 1000 }}
                  whileHover={{ 
                    scale: 1.08,
                    y: -10,
                    rotateY: 8,
                    rotateX: -3,
                    z: 50
                  }}
                  transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                >
                  {/* Clothespin */}
                  <div className="absolute -top-8 left-1/2 -translate-x-1/2 z-20">
                    <div className="relative w-5 h-10">
                      <div className="absolute left-0 top-0 w-2.5 h-10 bg-gradient-to-r from-yellow-200 to-orange-200 rounded-l-md shadow-md" />
                      <div className="absolute right-0 top-0 w-2.5 h-10 bg-gradient-to-l from-yellow-200 to-orange-200 rounded-r-md shadow-md" />
                      <div className="absolute top-2 left-1/2 -translate-x-1/2 w-4 h-2 bg-gradient-to-b from-gray-300 to-gray-500 rounded-sm" />
                    </div>
                  </div>
                  
                  {/* Photo Card with 3D effect */}
                  <motion.div 
                    className="relative bg-card p-4 pb-8 shadow-2xl cursor-pointer w-[260px] sm:w-[280px] max-w-[90vw] rounded-sm"
                    style={{
                      transformStyle: 'preserve-3d',
                      filter: hoveredPhoto === service.id ? 'brightness(1.1) contrast(1.05)' : 'brightness(1) contrast(0.95)',
                      boxShadow: hoveredPhoto === service.id 
                        ? '0 30px 60px rgba(0,0,0,0.7), 0 15px 30px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.1)'
                        : '0 20px 40px rgba(0,0,0,0.6), 0 8px 16px rgba(0,0,0,0.4)'
                    }}
                  >
                    {/* Shine effect */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent opacity-0 rounded-sm pointer-events-none"
                      animate={{ opacity: hoveredPhoto === service.id ? 1 : 0 }}
                      transition={{ duration: 0.3 }}
                    />
                    
                    <div className="h-48 mb-6 rounded-sm relative overflow-hidden">
                      <ImageWithFallback
                        src={service.image}
                        alt={service.title}
                        className="w-full h-full object-cover rounded-sm transition-transform duration-500"
                        style={{ transform: hoveredPhoto === service.id ? 'scale(1.1)' : 'scale(1)' }}
                      />
                      <div className="absolute inset-0 bg-primary/5 rounded-sm" />
                      
                      {/* Floating badge */}
                      <motion.div
                        className={`absolute top-3 right-3 px-2 py-1 rounded-full text-xs font-bold text-background bg-${service.color}`}
                        style={{ backgroundColor: `hsl(var(--${service.color}))` }}
                        animate={{ 
                          y: hoveredPhoto === service.id ? 0 : -50,
                          opacity: hoveredPhoto === service.id ? 1 : 0
                        }}
                        transition={{ duration: 0.3 }}
                      >
                        Shiko më shumë
                      </motion.div>
                    </div>
                    
                    <div className="relative" style={{ transform: 'translateZ(20px)' }}>
                      <h3 className="font-heading text-lg text-foreground mb-3 leading-tight">
                        {service.title}
                      </h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {service.description}
                      </p>
                    </div>
                    
                    <div className="absolute bottom-2 right-2 text-xs text-muted-foreground font-mono opacity-60">
                      SHPE
                    </div>
                  </motion.div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Second Clothesline */}
          <div className="relative" style={{ overflow: 'visible' }}>
            <div className="absolute top-8 left-0 right-0 h-4 rope-sway" style={{ animationDelay: '2s' }}>
              <div className="w-full h-full bg-gradient-to-b from-yellow-800 via-amber-900 to-yellow-900 rounded-full shadow-lg" />
              <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-transparent via-yellow-700 to-transparent rounded-full opacity-80" />
            </div>
            
            <div className="absolute left-0 sm:-left-10 top-4 w-10 h-10 bg-gradient-to-br from-gray-500 to-gray-800 rounded-full shadow-xl border border-gray-400" />
            <div className="absolute right-0 sm:-right-10 top-4 w-10 h-10 bg-gradient-to-br from-gray-500 to-gray-800 rounded-full shadow-xl border border-gray-400" />
            
            <div className="flex flex-wrap justify-center gap-4 sm:gap-8 lg:gap-16 pt-20 max-w-7xl mx-auto px-4">
              {services.slice(3, 6).map((service, index) => (
                <motion.div
                  key={service.id}
                  className={`${index === 0 ? 'photo-sway-2' : index === 1 ? 'photo-sway-3' : 'photo-sway-1'}`}
                  onMouseEnter={() => setHoveredPhoto(service.id)}
                  onMouseLeave={() => setHoveredPhoto(null)}
                  style={{ perspective: 1000 }}
                  whileHover={{ 
                    scale: 1.08,
                    y: -10,
                    rotateY: -8,
                    rotateX: -3,
                    z: 50
                  }}
                  transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                >
                  <div className="absolute -top-8 left-1/2 -translate-x-1/2 z-20">
                    <div className="relative w-5 h-10">
                      <div className="absolute left-0 top-0 w-2.5 h-10 bg-gradient-to-r from-yellow-200 to-orange-200 rounded-l-md shadow-md" />
                      <div className="absolute right-0 top-0 w-2.5 h-10 bg-gradient-to-l from-yellow-200 to-orange-200 rounded-r-md shadow-md" />
                      <div className="absolute top-2 left-1/2 -translate-x-1/2 w-4 h-2 bg-gradient-to-b from-gray-300 to-gray-500 rounded-sm" />
                    </div>
                  </div>
                  
                  <motion.div 
                    className="relative bg-card p-4 pb-8 shadow-2xl cursor-pointer w-[260px] sm:w-[280px] max-w-[90vw] rounded-sm"
                    style={{
                      transformStyle: 'preserve-3d',
                      filter: hoveredPhoto === service.id ? 'brightness(1.1) contrast(1.05)' : 'brightness(1) contrast(0.95)',
                      boxShadow: hoveredPhoto === service.id 
                        ? '0 30px 60px rgba(0,0,0,0.7), 0 15px 30px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.1)'
                        : '0 20px 40px rgba(0,0,0,0.6), 0 8px 16px rgba(0,0,0,0.4)'
                    }}
                  >
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent opacity-0 rounded-sm pointer-events-none"
                      animate={{ opacity: hoveredPhoto === service.id ? 1 : 0 }}
                      transition={{ duration: 0.3 }}
                    />
                    
                    <div className="h-48 mb-6 rounded-sm relative overflow-hidden">
                      <ImageWithFallback
                        src={service.image}
                        alt={service.title}
                        className="w-full h-full object-cover rounded-sm transition-transform duration-500"
                        style={{ transform: hoveredPhoto === service.id ? 'scale(1.1)' : 'scale(1)' }}
                      />
                      <div className="absolute inset-0 bg-primary/5 rounded-sm" />
                      
                      <motion.div
                        className="absolute top-3 right-3 px-2 py-1 rounded-full text-xs font-bold text-background"
                        style={{ backgroundColor: `hsl(var(--${service.color}))` }}
                        animate={{ 
                          y: hoveredPhoto === service.id ? 0 : -50,
                          opacity: hoveredPhoto === service.id ? 1 : 0
                        }}
                        transition={{ duration: 0.3 }}
                      >
                        Shiko më shumë
                      </motion.div>
                    </div>
                    
                    <div className="relative" style={{ transform: 'translateZ(20px)' }}>
                      <h3 className="font-heading text-lg text-foreground mb-3 leading-tight">
                        {service.title}
                      </h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {service.description}
                      </p>
                    </div>
                    
                    <div className="absolute bottom-2 right-2 text-xs text-muted-foreground font-mono opacity-60">
                      SHPE
                    </div>
                  </motion.div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center mt-20">
          <motion.a 
            href="#application"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center gap-2 bg-primary text-primary-foreground font-semibold px-8 py-4 rounded-lg hover:bg-primary/90 gentle-animation shadow-lg hover:shadow-xl"
          >
            Apliko Tani
          </motion.a>
        </div>
      </div>
    </section>
  )
}
