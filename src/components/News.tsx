'use client'

import { motion } from 'framer-motion'
import { Calendar, ArrowRight, Bell } from 'lucide-react'

export function News() {
  const news = [
    {
      id: 1,
      title: 'Prezantimi dhe Miratimi i Planit Vjetor për Vitin Shkollor 2025–2026',
      excerpt: 'Me fillimin e vitit të ri shkollor 2025–2026, Shkolla Profesionale Elbasan nisi zyrtarisht aktivitetin e saj me një takim të rëndësishëm për prezantimin e planit vjetor.',
      date: '22 Shtator 2025',
      category: 'Lajme',
      image: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=600&h=400&fit=crop'
    },
    {
      id: 2,
      title: 'Circular Tourism - Drejt Turizmit të Qëndrueshëm në Shqipëri',
      excerpt: 'Projekti Circular Tourism Albania synon të transformojë industrinë e turizmit duke promovuar praktikat e qëndrueshme dhe ekonominë qarkulluese.',
      date: '14 Shtator 2025',
      category: 'Projekte',
      image: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=600&h=400&fit=crop'
    },
    {
      id: 3,
      title: 'Klubi i Robotikës në Shkollën Profesionale Elbasan',
      excerpt: 'Nxënësit e shkollës sonë kanë mundësinë të mësojnë robotikë dhe programim përmes klubit të robotikës, një iniciativë inovative për zhvillimin e aftësive të shekullit 21.',
      date: '10 Shtator 2025',
      category: 'Aktivitete',
      image: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=600&h=400&fit=crop'
    },
    {
      id: 4,
      title: 'Regjistrimet kanë filluar për vitin shkollor 2025-2026',
      excerpt: 'Shkolla Profesionale Elbasan njofton fillimin e regjistrimeve për vitin e ri shkollor. Aplikimet pranohen në të gjitha drejtimet tona profesionale.',
      date: '1 Shtator 2025',
      category: 'Njoftime',
      image: 'https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?w=600&h=400&fit=crop'
    },
    {
      id: 5,
      title: 'Mëso Vetë - Një hap përpara në arsimin profesional',
      excerpt: 'Iniciativa "Mëso Vetë" ofron resurse dixhitale për nxënësit që duan të zgjerojnë njohuritë e tyre përtej programit mësimor tradicional.',
      date: '25 Gusht 2025',
      category: 'Projekte',
      image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=600&h=400&fit=crop'
    },
    {
      id: 6,
      title: 'Vizitë në Bibliotekë - Ditë e Hapur',
      excerpt: 'Biblioteka e shkollës organizoi një ditë të hapur për nxënësit e rinj, duke i njohur me resurset dhe shërbimet e disponueshme.',
      date: '20 Gusht 2025',
      category: 'Aktivitete',
      image: 'https://images.unsplash.com/photo-1521587760476-6c12a4b040da?w=600&h=400&fit=crop'
    }
  ]

  const categoryColors: Record<string, string> = {
    'Lajme': 'bg-accent-blue/10 text-accent-blue',
    'Projekte': 'bg-accent-emerald/10 text-accent-emerald',
    'Aktivitete': 'bg-accent-purple/10 text-accent-purple',
    'Njoftime': 'bg-accent-orange/10 text-accent-orange'
  }

  return (
    <section id="news" className="relative py-24 bg-background">
      <div className="container mx-auto px-6 sm:px-8 lg:px-12">
        
        {/* Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-3 mb-6"
          >
            <div className="w-3 h-3 bg-accent-orange rounded-full animate-pulse" />
            <span className="text-sm font-semibold text-muted-foreground">
              Njoftime & Lajme
            </span>
            <div className="w-3 h-3 bg-accent-emerald rounded-full animate-pulse" />
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-heading text-foreground mb-6"
          >
            Të Rejat e Shkollës
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-xl text-muted-foreground max-w-3xl mx-auto"
          >
            Ndiqni aktivitetet, projektet dhe njoftimet më të fundit nga Shkolla Profesionale Elbasan.
          </motion.p>
        </div>

        {/* Featured News */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <div className="bg-card clean-border rounded-2xl overflow-hidden card-hover">
            <div className="grid lg:grid-cols-2 gap-0">
              <div className="relative h-64 lg:h-auto">
                <img 
                  src={news[0].image} 
                  alt={news[0].title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 left-4">
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${categoryColors[news[0].category]}`}>
                    {news[0].category}
                  </span>
                </div>
              </div>
              <div className="p-8 lg:p-12 flex flex-col justify-center">
                <div className="flex items-center gap-2 text-muted-foreground mb-4">
                  <Calendar className="w-4 h-4" />
                  <span className="text-sm">{news[0].date}</span>
                </div>
                <h3 className="text-2xl lg:text-3xl font-bold text-foreground mb-4 leading-tight">
                  {news[0].title}
                </h3>
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  {news[0].excerpt}
                </p>
                <a 
                  href="#"
                  className="inline-flex items-center gap-2 text-primary font-semibold hover:gap-3 gentle-animation"
                >
                  Lexo më shumë
                  <ArrowRight className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>
        </motion.div>

        {/* News Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {news.slice(1).map((item, index) => (
            <motion.article
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              className="bg-card clean-border rounded-2xl overflow-hidden card-hover group"
            >
              <div className="relative h-48">
                <img 
                  src={item.image} 
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 gentle-animation"
                />
                <div className="absolute top-4 left-4">
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${categoryColors[item.category]}`}>
                    {item.category}
                  </span>
                </div>
              </div>
              <div className="p-6">
                <div className="flex items-center gap-2 text-muted-foreground mb-3">
                  <Calendar className="w-4 h-4" />
                  <span className="text-sm">{item.date}</span>
                </div>
                <h3 className="text-lg font-bold text-foreground mb-3 leading-tight line-clamp-2">
                  {item.title}
                </h3>
                <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                  {item.excerpt}
                </p>
                <a 
                  href="#"
                  className="inline-flex items-center gap-2 text-primary font-medium text-sm group-hover:gap-3 gentle-animation"
                >
                  Lexo më shumë
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </motion.article>
          ))}
        </div>

        {/* Newsletter CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 bg-primary/5 rounded-2xl p-8 lg:p-12 text-center"
        >
          <Bell className="w-12 h-12 text-primary mx-auto mb-4" />
          <h3 className="text-2xl font-bold text-foreground mb-4">
            Abonohu për Njoftime
          </h3>
          <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
            Regjistrohu për të marrë njoftimet më të fundit nga shkolla jonë direkt në emailin tënd.
          </p>
          <a 
            href="#contact"
            className="inline-flex items-center gap-2 bg-primary text-primary-foreground font-semibold px-8 py-4 rounded-lg hover:bg-primary/90 gentle-animation"
          >
            Na Kontaktoni
            <ArrowRight className="w-5 h-5" />
          </a>
        </motion.div>
      </div>
    </section>
  )
}
