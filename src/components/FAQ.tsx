'use client'

import { motion } from 'framer-motion'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { HelpCircle, GraduationCap, MapPin, Wallet, Building, BookOpen, Briefcase, Home } from 'lucide-react'

export function FAQ() {
  const faqItems = [
    {
      id: "cost",
      icon: Wallet,
      question: "Sa kushton viti shkollor?",
      answer: "Shkolla është publike, pra falas. Nuk ka asnjë tarifë për regjistrimin apo vijimin e mësimeve."
    },
    {
      id: "duration",
      icon: BookOpen,
      question: "Sa vite zgjat shkolla?",
      answer: "Shkolla zgjat 4 vite. Sistemet që ofrojmë janë të tipologjisë 2+1+1 dhe 2+2 vjeçare."
    },
    {
      id: "directions",
      icon: GraduationCap,
      question: "Çfarë drejtimesh ofroni?",
      answer: "Shkolla ofron aktualisht 11 drejtime në nivelin e IV të KSHK-së dhe 1 drejtim në nivelin e V të KSHK-së (pas të mesmes). Gjithashtu ofrojmë mbi 15 profile të ndryshme profesionale."
    },
    {
      id: "practice",
      icon: Building,
      question: "Si zhvillohet praktika profesionale?",
      answer: "Praktika profesionale zhvillohet në shkollë dhe në biznes. Shkolla aktualisht ka partneritet me mbi 275 biznese që operojnë kryesisht në qarkun e Elbasanit, por jo vetëm."
    },
    {
      id: "employment",
      icon: Briefcase,
      question: "A mund ta gjej një punë pas përfundimit të shkollës?",
      answer: "Sigurisht që po! Në bashkëpunim me zyrën rajonale të punësimit AKPA, ne kemi punësuar rreth 67.5% të nxënësve tanë që në vitin e tretë të shkollës. Shkolla do ju ndihmojë në këtë proces."
    },
    {
      id: "university",
      icon: GraduationCap,
      question: "A mund të ndjek universitetin pas përfundimit?",
      answer: "Po, ju mundeni! Në përfundim të ciklit 4-vjeçar të studimeve, ju pajiseni me diplomë të Maturës Shtetërore Profesionale e cila ju jep të drejtën të ndiqni studimet universitare."
    },
    {
      id: "scholarship",
      icon: Wallet,
      question: "A ofroni bursa për nxënësit?",
      answer: "Ne ofrojmë bursë të plotë studimi për nxënësit me mesatare mbi 9.0 nga një vit më parë. Gjithashtu, për nxënësit që banojnë mbi 5km larg shkollës rimbursojmë transportin. Në fokus kemi dhe nxënësit nga shtresa në nevojë duke ofruar tekstet falas."
    },
    {
      id: "dormitory",
      icon: Home,
      question: "A ka konvikt shkolla?",
      answer: "Po, shkolla ka konvikt dhe ju e përfitoni atë FALAS! Konvikti ofron kushte të përshtatshme për nxënësit që banojnë larg."
    },
    {
      id: "registration",
      icon: BookOpen,
      question: "Si mund të regjistrohem?",
      answer: "Regjistrimi bëhet përmes platformës eAlbania. Ne jemi të gatshëm t'ju asistojmë me regjistrimin në çdo kohë. Kontaktoni sekretarinë për ndihmë."
    },
    {
      id: "location",
      icon: MapPin,
      question: "Ku ndodhet shkolla?",
      answer: "Shkolla ndodhet në adresën 'Rruga Zogu i Pare, Elbasan 3001, Shqipëri', midis rrethrrotullimit të luleve dhe Doganës Elbasan."
    }
  ]

  return (
    <section id="faq" className="relative py-32 bg-gradient-to-b from-muted/30 via-background to-background overflow-hidden">
      
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div className="w-full h-full" style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, hsl(var(--primary)) 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }} />
      </div>

      <div className="container mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-3 mb-6">
            <HelpCircle className="w-5 h-5 text-primary" />
            <span className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
              Pyetje të Shpeshta
            </span>
            <HelpCircle className="w-5 h-5 text-primary" />
          </div>
          
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-heading leading-tight mb-6 text-foreground">
            <span className="block mb-2">Keni Pyetje?</span>
            <span className="block text-primary">GJENI PËRGJIGJET</span>
          </h2>
          
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Përgjigjet për pyetjet më të zakonshme nga nxënësit dhe prindërit
          </p>
        </motion.div>

        {/* FAQ Grid */}
        <div className="max-w-4xl mx-auto">
          <Accordion type="single" collapsible className="space-y-4">
            {faqItems.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
              >
                <AccordionItem 
                  value={item.id}
                  className="bg-card border border-border rounded-xl px-6 shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden"
                >
                  <AccordionTrigger className="py-5 hover:no-underline group">
                    <div className="flex items-center gap-4 text-left">
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 transition-colors">
                        <item.icon className="w-5 h-5 text-primary" />
                      </div>
                      <span className="font-heading text-lg text-foreground group-hover:text-primary transition-colors">
                        {item.question}
                      </span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="pb-5 pt-2">
                    <div className="pl-14">
                      <p className="text-muted-foreground leading-relaxed">
                        {item.answer}
                      </p>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </motion.div>
            ))}
          </Accordion>
        </div>

        {/* Contact CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="text-center mt-16"
        >
          <div className="bg-gradient-to-r from-primary/10 via-primary/5 to-primary/10 rounded-2xl p-8 border border-primary/20 max-w-2xl mx-auto">
            <h3 className="font-heading text-2xl text-foreground mb-4">
              Nuk e gjeni përgjigjen që kërkoni?
            </h3>
            <p className="text-muted-foreground mb-6">
              Na kontaktoni dhe do t'ju përgjigjemi menjëherë
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="#contact"
                className="inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground font-semibold px-6 py-3 rounded-lg hover:bg-primary/90 transition-colors"
              >
                Na Kontaktoni
              </a>
              <a
                href="tel:+355683337171"
                className="inline-flex items-center justify-center gap-2 bg-card border border-border text-foreground font-semibold px-6 py-3 rounded-lg hover:bg-muted transition-colors"
              >
                +355 68 333 71 71
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
