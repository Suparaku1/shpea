'use client'

import minimalBestFilm from '../assets/minimal-best-film.png'
import minimalAudienceChoice from '../assets/minimal-audience-choice.png'
import minimalInnovation from '../assets/minimal-innovation.png'
import minimalDirectorsChoice from '../assets/minimal-directors-choice.png'
import minimalExcellence from '../assets/minimal-excellence.png'
import minimalRisingTalent from '../assets/minimal-rising-talent.png'

export function Partners() {
  const awards = [
    { image: minimalBestFilm, delay: "0s", label: "Partner Premium" },
    { image: minimalAudienceChoice, delay: "0.5s", label: "Partner Strategjik" },
    { image: minimalInnovation, delay: "1s", label: "Partner Teknologjik" },
    { image: minimalDirectorsChoice, delay: "1.5s", label: "Partner Arsimor" },
    { image: minimalExcellence, delay: "2s", label: "Partner Biznesi" },
    { image: minimalRisingTalent, delay: "2.5s", label: "Partner Lokal" }
  ]

  return (
    <section id="partners" className="relative py-20 bg-background overflow-hidden">
      
      <div className="absolute inset-0 bg-gradient-to-b from-background via-card/30 to-background" />

      <div className="container mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
        
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-3 mb-6">
            <div className="w-3 h-3 bg-accent-purple rounded-full animate-pulse" />
            <span className="text-sm font-semibold text-muted-foreground">
              Bashkëpunimet Tona
            </span>
            <div className="w-3 h-3 bg-accent-blue rounded-full animate-pulse" />
          </div>
          
          <h2 className="text-5xl sm:text-6xl lg:text-7xl font-heading leading-tight mb-6 text-foreground">
            Partnerët & Certifikimet
          </h2>
          
          <p className="text-xl text-muted-foreground leading-relaxed max-w-3xl mx-auto">
            Bashkëpunim me biznese dhe organizata lider për suksesin e nxënësve tanë
          </p>
        </div>

        {/* Awards/Partners Display */}
        <div className="relative max-w-7xl mx-auto">
          <div className="relative grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
            {awards.map((award, index) => (
              <div
                key={index}
                className="group relative flex flex-col items-center text-center"
                style={{ animationDelay: award.delay }}
              >
                <div className="relative mb-6">
                  <div className={`relative p-6 rounded-2xl border shadow-md transition-all duration-500 hover:scale-105 ${
                    index === 2 || index === 3 ? 'bg-gray-800 border-gray-700' : 'bg-background border-border'
                  }`}
                       style={{ boxShadow: '0 8px 24px rgba(0,0,0,0.08)' }}>
                    
                    <img 
                      src={award.image}
                      alt={award.label}
                      className="w-full h-auto max-w-48 mx-auto"
                      style={{ filter: 'contrast(1.02) saturate(1.1)' }}
                    />
                  </div>
                  
                  <div className="float-gentle absolute inset-0 pointer-events-none" />
                </div>

                <p className="text-sm font-medium text-muted-foreground">{award.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Partnership Info */}
        <div className="mt-20 bg-primary/5 rounded-2xl p-8 lg:p-12 text-center max-w-4xl mx-auto">
          <h3 className="text-2xl font-heading text-foreground mb-4">
            Dëshironi të bëheni Partner?
          </h3>
          <p className="text-muted-foreground mb-6 leading-relaxed">
            Bashkëpunimi me Shkollën Profesionale Elbasan ju ofron akses në talente të përgatitur profesionalisht dhe mundësinë për të kontribuar në zhvillimin e arsimit profesional në rajon.
          </p>
          <a 
            href="#contact"
            className="inline-flex items-center gap-2 bg-primary text-primary-foreground font-semibold px-8 py-4 rounded-lg hover:bg-primary/90 gentle-animation"
          >
            Na Kontaktoni
          </a>
        </div>
      </div>
    </section>
  )
}
