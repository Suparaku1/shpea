'use client'

import { useEffect, useState } from 'react'
import schoolBuilding from '@/assets/school-building.png'

export function About() {
  const [activeFrame, setActiveFrame] = useState(-1)
  const [animationStarted, setAnimationStarted] = useState(false)

  const processSteps = [
    {
      number: "01",
      title: "Regjistrimi",
      description: "Aplikimi dhe regjistrimi i nxënësve të rinj",
      color: "accent-blue"
    },
    {
      number: "02", 
      title: "Orientimi",
      description: "Zgjedhja e drejtimit dhe profilit profesional",
      color: "accent-emerald"
    },
    {
      number: "03",
      title: "Arsimi Teorik",
      description: "Mësimi në klasë me metodat më moderne",
      color: "accent-purple"
    },
    {
      number: "04",
      title: "Praktika",
      description: "Trajnimi praktik në laboratorë dhe biznese",
      color: "accent-blue"
    },
    {
      number: "05",
      title: "Punësimi",
      description: "Lidhja me tregun e punës dhe karriera",
      color: "accent-purple"
    }
  ]

  useEffect(() => {
    setTimeout(() => {
      setAnimationStarted(true)
      processSteps.forEach((_, index) => {
        setTimeout(() => {
          setActiveFrame(index)
        }, index * 2000 + 1000)
      })
    }, 3000)
  }, [])

  return (
    <section id="about" className="relative py-20 bg-background overflow-hidden">
      
      {/* Cinematic Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-card/20 to-background" />
      
      {/* Film Grain Effect */}
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none">
        <div className="w-full h-full" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, rgba(0,0,0,0.8) 1px, transparent 0)`,
          backgroundSize: '3px 3px',
          animation: 'filmGrain 8s infinite'
        }} />
      </div>

      <div className="container mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
        
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-3 mb-6">
            <div className="w-3 h-3 bg-accent-emerald rounded-full animate-pulse" />
            <span className="text-sm font-semibold text-muted-foreground">
              Rrugëtimi Ynë
            </span>
            <div className="w-3 h-3 bg-accent-blue rounded-full animate-pulse" />
          </div>
          
          <h2 className="text-5xl sm:text-6xl lg:text-7xl font-heading leading-tight mb-6 text-foreground">
            Si Funksionon
          </h2>
          
          <p className="text-xl text-muted-foreground leading-relaxed max-w-3xl mx-auto">
            Ndiqni hapat e rrugëtimit tuaj drejt suksesit profesional
          </p>
        </div>

        {/* Film Strip Container */}
        <div className="relative max-w-7xl mx-auto">
          
          {/* Film Strip Background */}
          <div className="relative bg-gradient-to-r from-gray-950 via-gray-900 to-gray-950 rounded-xl overflow-hidden"
               style={{ boxShadow: '0 25px 50px rgba(0,0,0,0.5), inset 0 2px 0 rgba(255,255,255,0.05)' }}>
            
            {/* Film Perforations - Top */}
            <div className="absolute top-0 left-0 right-0 h-6 bg-foreground z-20 overflow-hidden">
              <div className={`flex items-center justify-between px-12 h-full ${
                animationStarted ? 'perforations-scroll-animation' : ''
              }`} style={{ width: '200%' }}>
                {[...Array(40)].map((_, i) => (
                  <div key={`top-${i}`} className="w-4 h-3 bg-gray-800 rounded-sm border border-gray-700 flex-shrink-0" 
                       style={{ boxShadow: 'inset 0 1px 2px rgba(0,0,0,0.8)' }} />
                ))}
              </div>
            </div>
            
            {/* Film Perforations - Bottom */}
            <div className="absolute bottom-0 left-0 right-0 h-6 bg-foreground z-20 overflow-hidden">
              <div className={`flex items-center justify-between px-12 h-full ${
                animationStarted ? 'perforations-scroll-animation' : ''
              }`} style={{ width: '200%' }}>
                {[...Array(40)].map((_, i) => (
                  <div key={`bottom-${i}`} className="w-4 h-3 bg-gray-800 rounded-sm border border-gray-700 flex-shrink-0"
                       style={{ boxShadow: 'inset 0 1px 2px rgba(0,0,0,0.8)' }} />
                ))}
              </div>
            </div>

            {/* Film Frames Container */}
            <div className="relative py-6 px-8 overflow-hidden h-64 max-w-full">
              <div className={`flex transition-transform duration-1000 ease-in-out ${
                animationStarted ? 'film-scroll-animation' : ''
              }`} style={{ width: 'max-content', gap: '32px' }}>
                
                {/* Start frame */}
                <div className="flex-shrink-0 w-80 h-52 bg-gray-800 rounded-lg border-2 border-gray-700 opacity-60 flex items-center justify-center" 
                     style={{ boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.4)' }}>
                  <div className="text-gray-400 font-mono tracking-wider">● FILLIM</div>
                </div>
                
                {/* Process Step Frames */}
                {processSteps.map((step, index) => (
                  <div
                    key={step.number}
                    className={`flex-shrink-0 w-80 h-52 bg-background rounded-lg border-4 ${
                      activeFrame >= index 
                        ? `border-${step.color}` 
                        : 'border-gray-600'
                    }`}
                    style={{
                      boxShadow: '0 8px 16px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.05)'
                    }}
                  >
                    <div className="relative h-full p-6 flex flex-col justify-between">
                      <div className="absolute -top-4 -left-4 w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-heading z-10 border-3 border-background text-lg"
                           style={{ boxShadow: '0 6px 12px rgba(0,0,0,0.4)' }}>
                        {step.number}
                      </div>
                      
                      <div className="opacity-100">
                        <h3 className="font-heading text-xl leading-tight mb-4 text-foreground">
                          {step.title}
                        </h3>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          {step.description}
                        </p>
                      </div>
                      
                      <div className="absolute left-1 top-1 bottom-1 w-px bg-gray-300/20" />
                      <div className="absolute right-1 top-1 bottom-1 w-px bg-gray-300/20" />
                    </div>
                  </div>
                ))}
                
                {/* End frame */}
                <div className="flex-shrink-0 w-80 h-52 bg-gray-800 rounded-lg border-2 border-gray-700 opacity-60 flex items-center justify-center"
                     style={{ boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.4)' }}>
                  <div className="text-gray-400 font-mono tracking-wider">● SUKSES</div>
                </div>
                
                {/* Duplicate for loop */}
                <div className="flex-shrink-0 w-80 h-52 bg-gray-800 rounded-lg border-2 border-gray-700 opacity-60 flex items-center justify-center" 
                     style={{ boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.4)' }}>
                  <div className="text-gray-400 font-mono tracking-wider">● FILLIM</div>
                </div>
                
                {processSteps.map((step, index) => (
                  <div
                    key={`dup-${step.number}`}
                    className={`flex-shrink-0 w-80 h-52 bg-background rounded-lg border-4 border-gray-600`}
                    style={{
                      boxShadow: '0 8px 16px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.05)'
                    }}
                  >
                    <div className="relative h-full p-6 flex flex-col justify-between">
                      <div className="absolute -top-4 -left-4 w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-heading z-10 border-3 border-background text-lg">
                        {step.number}
                      </div>
                      <div className="opacity-100">
                        <h3 className="font-heading text-xl leading-tight mb-4 text-foreground">{step.title}</h3>
                        <p className="text-sm text-muted-foreground leading-relaxed">{step.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Film Controls */}
        <div className="mt-12 text-center">
          <div className="inline-flex items-center gap-6 bg-card/80 backdrop-blur-sm clean-border rounded-2xl px-8 py-4 subtle-shadow">
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 bg-accent-emerald rounded-full animate-pulse" />
              <span className="text-sm font-semibold text-foreground">11 Drejtime</span>
            </div>
            <div className="w-px h-6 bg-border" />
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 bg-accent-blue rounded-full animate-pulse" />
              <span className="text-sm font-semibold text-foreground">4 Vite</span>
            </div>
            <div className="w-px h-6 bg-border" />
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 bg-accent-purple rounded-full animate-pulse" />
              <span className="text-sm font-semibold text-foreground">100% Punësim</span>
            </div>
          </div>
        </div>

        {/* Gallery Image */}
        <div className="mt-20">
          <div className="text-center mb-8">
            <p className="text-muted-foreground">
              Një vështrim në aktivitetet dhe projektet tona
            </p>
          </div>
          
          <div className="relative max-w-6xl mx-auto">
            <div className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 rounded-2xl p-4 overflow-hidden">
              <div className="absolute inset-0 opacity-[0.03] pointer-events-none"
                   style={{
                     backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.8) 1px, transparent 0)`,
                     backgroundSize: '4px 4px'
                   }} />
              
              <img 
                src={schoolBuilding}
                alt="Godina e Shkollës Profesionale Elbasan"
                className="w-full h-auto rounded-xl"
                style={{
                  filter: 'contrast(1.05) saturate(1.1) brightness(0.95)'
                }}
              />
            </div>
            
            <div className="mt-6 text-center">
              <p className="text-sm text-muted-foreground italic">
                "Arsim cilësor, praktikë reale, punësim i sigurt"
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
