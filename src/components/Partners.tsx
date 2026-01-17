'use client'

export function Partners() {
  const partners = [
    { image: "/partners/ac-logo.png", delay: "0s", label: "AC - Akademia e Certifikimit", darkBg: false },
    { image: "/partners/elite-academy.webp", delay: "0.5s", label: "Elite Academy", darkBg: false },
    { image: "/partners/s-logo.png", delay: "1s", label: "S Digital", darkBg: true },
    { image: "/partners/webmaster.png", delay: "1.5s", label: "Web Master", darkBg: false },
    { image: "/partners/best-cable.png", delay: "2s", label: "Best Cable Fiber", darkBg: false },
    { image: "/partners/digispark.png", delay: "2.5s", label: "DigiSpark Agency", darkBg: true }
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
            {partners.map((partner, index) => (
              <div
                key={index}
                className="group relative flex flex-col items-center text-center"
                style={{ animationDelay: partner.delay }}
              >
                <div className="relative mb-6">
                  <div className={`relative p-6 rounded-2xl border shadow-md transition-all duration-500 hover:scale-105 ${
                    partner.darkBg ? 'bg-gray-800 border-gray-700' : 'bg-background border-border'
                  }`}
                       style={{ boxShadow: '0 8px 24px rgba(0,0,0,0.08)' }}>
                    
                    <img 
                      src={partner.image}
                      alt={partner.label}
                      className="w-full h-auto max-w-48 mx-auto object-contain"
                      style={{ filter: 'contrast(1.02) saturate(1.1)', maxHeight: '120px' }}
                    />
                  </div>
                  
                  <div className="float-gentle absolute inset-0 pointer-events-none" />
                </div>

                <p className="text-sm font-medium text-muted-foreground">{partner.label}</p>
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
