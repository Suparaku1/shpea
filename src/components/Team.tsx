'use client'

import { ImageWithFallback } from './figma/ImageWithFallback'

export function Team() {
  const teamMembers = [
    {
      name: "Leonidha Haxhinikolla",
      department: "Drejtoria",
      position: "DREJTOR",
      quote: "Edukimi profesional është çelësi i suksesit për të rinjtë tanë. Ne përgatisim të ardhmen e Shqipërisë.",
      image: "/leonidha.jpg",
      rotation: 'rotate-1'
    },
    {
      name: "Juljan Kasapi",
      department: "Drejtoria",
      position: "NënDREJTOR",
      quote: "Çdo nxënës ka potencial të jashtëzakonshëm. Detyra jonë është ta zbulojmë dhe ta zhvillojmë atë.",
      image: "/juljan.jpg",
      rotation: '-rotate-1'
    },
    {
      name: "Entela Progri",
      department: "TIK",
      position: "PËRGJEGJËS DEPARTAMENTI",
      quote: "Teknologjia po ndryshon botën. Ne përgatisim nxënësit për të qenë pionierë të këtij ndryshimi.",
      image: "/entela.jpg",
      rotation: 'rotate-2'
    },
    {
      name: "Esmerald Suparaku",
      department: "TIK",
      position: "Zhvillimi Web",
      quote: "Sipërmarrja dhe kreativiteti janë aftësitë e shekullit 21. Ne i mësojmë të dyja.",
      image: "/esmerald.jpg",
      rotation: '-rotate-2'
    },
    {
      name: "Lidia Guda",
      department: "TIK",
      position: "Profesore",
      quote: "Shqipëria ka potencial të jashtëzakonshëm. Ne përgatisim profesionistët e informatikes.",
      image: "/lidia.jpg",
      rotation: 'rotate-1'
    },
    {
      name: "Arisa Arapi",
      department: "TIK",
      position: "Profesore",
      quote: "Kodimi është gjuha e re e botës. Nxënësit tanë mësojnë të komunikojnë me teknologjinë.",
      image: "/arisa.jpg",
      rotation: '-rotate-1'
    }
  ]

  return (
    <section id="team" className="relative py-32 bg-background w-full">
      <div className="container mx-auto px-6 sm:px-8 lg:px-12">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-3 mb-6">
            <div className="w-3 h-3 bg-accent-emerald rounded-full animate-pulse" />
            <span className="text-sm font-semibold text-muted-foreground">
              Njihuni me EKIPIN TONË
            </span>
            <div className="w-3 h-3 bg-accent-blue rounded-full animate-pulse" />
          </div>
          
          <h2 className="text-5xl sm:text-6xl lg:text-7xl font-heading leading-tight mb-8 text-foreground">
            Ekipi Ynë
          </h2>
          
          <p className="text-xl lg:text-2xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
            Mësues të kualifikuar dhe të përkushtuar për suksesin e çdo nxënësi
          </p>
        </div>

        {/* Team Grid */}
        <div className="max-w-7xl mx-auto">
          <div className="relative">
            
            {/* Elegant Frame */}
            <div className="bg-gradient-to-br from-primary/5 via-card to-primary/5 p-8 rounded-2xl shadow-lg relative border border-border">
              
              {/* Subtle pattern */}
              <div className="absolute inset-0 opacity-5"
                   style={{
                     backgroundImage: `radial-gradient(circle at 30% 30%, var(--accent-blue) 1px, transparent 1px)`,
                     backgroundSize: '30px 30px'
                   }} />

              {/* Team Cards Grid */}
              <div className="relative z-10">
                {/* First row - 3 cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 mb-8">
                  {teamMembers.slice(0, 3).map((member) => (
                    <div
                      key={member.name}
                      className={`group transform ${member.rotation} hover:rotate-0 transition-all duration-500 hover:scale-105 hover:z-20`}
                      style={{
                        filter: 'drop-shadow(4px 4px 12px rgba(0,0,0,0.15))'
                      }}
                    >
                      <div className="bg-card rounded-xl border border-border overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
                        
                        {/* Photo Container */}
                        <div className="relative h-64 overflow-hidden bg-muted">
                          <ImageWithFallback
                            src={member.image}
                            alt={member.name}
                            className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-110"
                          />
                          
                          {/* Gradient overlay */}
                          <div className="absolute inset-0 bg-gradient-to-t from-card/90 via-transparent to-transparent" />
                          
                          {/* Department Badge */}
                          <div className="absolute top-4 left-4 bg-primary text-primary-foreground px-3 py-1 rounded-full text-sm font-semibold">
                            {member.department}
                          </div>
                        </div>

                        {/* Content */}
                        <div className="p-6 -mt-12 relative z-10">
                          <div className="bg-card rounded-lg p-4 border border-border shadow-sm">
                            <h3 className="font-heading text-xl text-foreground mb-1">
                              {member.name}
                            </h3>
                            <p className="text-primary font-semibold text-sm mb-3">
                              {member.position}
                            </p>
                            <p className="text-muted-foreground text-sm leading-relaxed italic">
                              "{member.quote}"
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                
                {/* Second row - 3 cards centered */}
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                  {teamMembers.slice(3, 6).map((member) => (
                    <div
                      key={member.name}
                      className={`group transform ${member.rotation} hover:rotate-0 transition-all duration-500 hover:scale-105 hover:z-20`}
                      style={{
                        filter: 'drop-shadow(4px 4px 12px rgba(0,0,0,0.15))'
                      }}
                    >
                      <div className="bg-card rounded-xl border border-border overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
                        
                        {/* Photo Container */}
                        <div className="relative h-64 overflow-hidden bg-muted">
                          <ImageWithFallback
                            src={member.image}
                            alt={member.name}
                            className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-110"
                          />
                          
                          {/* Gradient overlay */}
                          <div className="absolute inset-0 bg-gradient-to-t from-card/90 via-transparent to-transparent" />
                          
                          {/* Department Badge */}
                          <div className="absolute top-4 left-4 bg-primary text-primary-foreground px-3 py-1 rounded-full text-sm font-semibold">
                            {member.department}
                          </div>
                        </div>

                        {/* Content */}
                        <div className="p-6 -mt-12 relative z-10">
                          <div className="bg-card rounded-lg p-4 border border-border shadow-sm">
                            <h3 className="font-heading text-xl text-foreground mb-1">
                              {member.name}
                            </h3>
                            <p className="text-primary font-semibold text-sm mb-3">
                              {member.position}
                            </p>
                            <p className="text-muted-foreground text-sm leading-relaxed italic">
                              "{member.quote}"
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
