'use client'

import { GraduationCap, MapPin, Phone, Mail, Facebook, Instagram, Youtube } from 'lucide-react'

export function Footer() {
  const programs = [
    'TIK',
    'Ekonomi - Biznes',
    'Hoteleri - Turizëm',
    'Mekanikë',
    'Elektroteknikë',
    'Ndërtim'
  ]

  const quickLinks = [
    { label: 'Rreth Nesh', href: '#about' },
    { label: 'Oferta Shkollore', href: '#programs' },
    { label: 'Stafi', href: '#staff' },
    { label: 'Galeria', href: '#gallery' },
    { label: 'Kontakt', href: '#contact' }
  ]

  return (
    <footer className="relative py-16 bg-foreground text-background">
      <div className="container mx-auto px-6 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          
          {/* Logo and Description */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-background rounded-lg flex items-center justify-center">
                <GraduationCap className="w-7 h-7 text-foreground" />
              </div>
              <div>
                <span className="font-heading text-background text-lg block">SHPE</span>
                <span className="text-background/70 text-xs">Shkolla Profesionale Elbasan</span>
              </div>
            </div>
            <p className="text-background/70 leading-relaxed mb-6">
              Synojmë të jemi një qendër inovacioni, duke përgatitur të rinjtë për punësim të denjë përmes edukimit profesional.
            </p>
            
            {/* Social Media */}
            <div className="flex items-center space-x-4">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-background/10 rounded-lg flex items-center justify-center hover:bg-background/20 gentle-animation"
              >
                <Facebook className="w-5 h-5 text-background" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-background/10 rounded-lg flex items-center justify-center hover:bg-background/20 gentle-animation"
              >
                <Instagram className="w-5 h-5 text-background" />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-background/10 rounded-lg flex items-center justify-center hover:bg-background/20 gentle-animation"
              >
                <Youtube className="w-5 h-5 text-background" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold text-background text-lg mb-6">Lidhje të Shpejta</h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <a 
                    href={link.href}
                    className="text-background/70 hover:text-background gentle-animation"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Programs */}
          <div>
            <h4 className="font-bold text-background text-lg mb-6">Drejtimet</h4>
            <ul className="space-y-3">
              {programs.map((program) => (
                <li key={program}>
                  <a 
                    href="#programs"
                    className="text-background/70 hover:text-background gentle-animation"
                  >
                    {program}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-bold text-background text-lg mb-6">Kontakt</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-background/70 flex-shrink-0 mt-0.5" />
                <span className="text-background/70">
                  Rruga Zogu i Parë<br/>
                  Elbasan 3001, Shqipëri
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-background/70" />
                <a href="tel:+355683337171" className="text-background/70 hover:text-background gentle-animation">
                  +355 68 333 71 71
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-background/70" />
                <a href="mailto:info@shpe.al" className="text-background/70 hover:text-background gentle-animation">
                  info@shpe.al
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-background/20 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-sm text-background/60">
              © {new Date().getFullYear()} Shkolla Profesionale Elbasan. Të gjitha të drejtat e rezervuara.
            </div>
            <div className="flex items-center gap-6 text-sm text-background/60">
              <a href="#" className="hover:text-background gentle-animation">Politika e Privatësisë</a>
              <a href="#" className="hover:text-background gentle-animation">Kushtet e Përdorimit</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
