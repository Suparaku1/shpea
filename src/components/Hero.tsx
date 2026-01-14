'use client'

import { motion } from 'framer-motion'
import { Volume2, VolumeX, Menu, X, GraduationCap, Users, BookOpen, Award } from 'lucide-react'
import { useState, useRef, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import shpeLogo from '../assets/shpe-logo.png'
import schoolStudents from '../assets/school-students.png'
import schoolTeachers from '../assets/school-teachers.png'
import schoolDirections from '../assets/school-directions.png'
import schoolProfiles from '../assets/school-profiles.png'
import { ThemeToggle } from './ThemeToggle'
import { LanguageSwitcher } from './LanguageSwitcher'

export function Hero() {
  const { t } = useTranslation()
  const [isMuted, setIsMuted] = useState(true)
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.volume = 0
      videoRef.current.muted = true
      videoRef.current.defaultMuted = true
      
      videoRef.current.addEventListener('play', () => {
        if (videoRef.current) {
          videoRef.current.muted = isMuted
          videoRef.current.volume = isMuted ? 0 : 0.7
        }
      })
      
      const playPromise = videoRef.current.play()
      if (playPromise !== undefined) {
        playPromise.catch(error => console.error('Video autoplay failed:', error))
      }
    }
  }, [])

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.muted = isMuted
      videoRef.current.volume = isMuted ? 0 : 0.7
    }
  }, [isMuted])

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isMobileMenuOpen])

  const stats = [
    { icon: GraduationCap, value: '1300+', label: t('stats.students'), image: schoolStudents },
    { icon: Users, value: '100+', label: t('stats.teachers'), image: schoolTeachers },
    { icon: BookOpen, value: '11', label: t('stats.directions'), image: schoolDirections },
    { icon: Award, value: '15+', label: t('stats.profiles'), image: schoolProfiles },
  ]

  const navLinks = [
    { href: '#about', label: t('nav.about') },
    { href: '#programs', label: t('nav.programs') },
    { href: '#staff', label: t('nav.staff') },
    { href: '#gallery', label: t('nav.gallery') },
    { href: '#contact', label: t('nav.contact') },
  ]

  return (
    <div className="relative h-screen w-full overflow-hidden bg-foreground">
      {/* Video Background */}
      <video
        ref={videoRef}
        className="absolute inset-0 w-full h-full object-cover scale-110"
        autoPlay
        muted
        loop
        playsInline
      >
        <source src="https://mojli.s3.us-east-2.amazonaws.com/Mojli+Website+upscaled+(12mb).webm" type="video/webm" />
      </video>

      {/* Dark Overlay for text readability */}
      <div className="absolute inset-0 bg-gradient-to-r from-foreground/80 via-foreground/60 to-foreground/40" />

      {/* Navbar */}
      <motion.nav
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.3 }}
        className="fixed top-0 left-0 right-0 w-full z-[110]"
      >
        <div 
          className={`w-full px-6 sm:px-8 lg:px-12 py-4 transition-all duration-300 ease-out ${
            isScrolled 
              ? 'bg-foreground/80 backdrop-blur-xl border-b border-background/10' 
              : 'bg-transparent'
          }`}
        >
          <div className="flex items-center justify-between max-w-7xl mx-auto">
            {/* Logo */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="flex items-center cursor-pointer gap-3"
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            >
              <img 
                src={shpeLogo} 
                alt="SHPE Logo" 
                className="h-12 w-auto object-contain"
              />
              <div className="hidden sm:block">
                <span className="font-heading text-background text-lg leading-tight block">SHPE</span>
                <span className="text-background/70 text-xs">Shkolla Profesionale Elbasan</span>
              </div>
            </motion.div>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-8">
              {navLinks.map((link) => (
                <a 
                  key={link.href}
                  href={link.href} 
                  className="text-background/90 hover:text-background font-medium gentle-animation hover:scale-105"
                >
                  {link.label}
                </a>
              ))}
            </div>

            {/* Right Side Controls */}
            <div className="flex items-center space-x-2 sm:space-x-3">
              {/* Theme Toggle */}
              <ThemeToggle />
              
              {/* Language Switcher */}
              <LanguageSwitcher />

              {/* Video Controls */}
              <div className="relative">
                <button
                  onClick={() => setIsMuted(!isMuted)}
                  className="glass-effect p-3 rounded-full text-background hover:bg-background/20 gentle-animation cursor-pointer"
                >
                  {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                </button>
                
                {isMuted && (
                  <div className="absolute -bottom-10 right-0 flex items-center text-background/80 hidden sm:flex">
                    <span className="whitespace-nowrap font-medium text-sm mr-2">{t('hero.soundOn')}</span>
                    <span className="text-lg">↗</span>
                  </div>
                )}
              </div>

              <motion.a
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                href="/auth"
                className="hidden sm:block bg-primary text-primary-foreground font-semibold px-6 py-3 rounded-lg hover:bg-primary/90 gentle-animation ml-2"
              >
                {t('nav.admin')}
              </motion.a>

              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="lg:hidden glass-effect p-3 rounded-full text-background hover:bg-background/20 gentle-animation cursor-pointer z-[120]"
              >
                {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="lg:hidden fixed inset-0 bg-foreground/50 backdrop-blur-md z-[80]"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Mobile Menu Panel */}
      <motion.div
        initial={{ x: '100%' }}
        animate={{ x: isMobileMenuOpen ? '0%' : '100%' }}
        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
        className="lg:hidden fixed top-0 right-0 h-full w-72 max-w-[85vw] bg-foreground/90 backdrop-blur-xl border-l border-background/10 z-[90]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex flex-col h-full">
          <div className="flex justify-end p-4">
            <button
              onClick={() => setIsMobileMenuOpen(false)}
              className="glass-effect p-3 rounded-full text-background hover:bg-background/20 gentle-animation"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          
          <div className="flex flex-col px-6 pb-6 h-full">
            <div className="flex flex-col space-y-2">
              {navLinks.map((link) => (
                <a 
                  key={link.href}
                  href={link.href} 
                  className="px-4 py-3 text-background hover:bg-background/10 rounded-lg gentle-animation font-medium text-lg"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.label}
                </a>
              ))}
            </div>

            <motion.a
              whileTap={{ scale: 0.95 }}
              href="#contact"
              onClick={() => setIsMobileMenuOpen(false)}
              className="bg-primary text-primary-foreground font-semibold px-6 py-3 rounded-lg hover:bg-primary/90 gentle-animation mt-8 text-center"
            >
              {t('nav.register')}
            </motion.a>
          </div>
        </div>
      </motion.div>

      {/* Hero Content */}
      <div className="relative z-10 container mx-auto px-6 sm:px-8 lg:px-12 h-full flex flex-col justify-end pb-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mb-6"
        >
          <span className="inline-flex items-center gap-2 bg-background/20 backdrop-blur-sm text-background px-4 py-2 rounded-full text-sm font-medium">
            <div className="w-2 h-2 bg-accent-emerald rounded-full animate-pulse" />
            {t('hero.announcement')}
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-heading leading-tight text-background mb-4"
        >
          <span className="block">{t('hero.title1')}</span>
          <span className="block">{t('hero.title2')}</span>
          <span className="block text-primary">{t('hero.title3')}</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="text-lg text-background/80 mb-8 max-w-xl"
        >
          {t('hero.description')}
        </motion.p>

        {/* Stats Row */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 1.3 + index * 0.1 }}
              className="glass-effect rounded-xl p-4 text-center group hover:scale-105 transition-transform duration-300"
            >
              <div className="relative w-12 h-12 mx-auto mb-2 rounded-full overflow-hidden border-2 border-background/30">
                <img 
                  src={stat.image} 
                  alt={stat.label}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-primary/20 group-hover:bg-transparent transition-colors" />
              </div>
              <div className="text-2xl sm:text-3xl font-heading text-background mb-1">
                {stat.value}
              </div>
              <div className="text-background/70 text-sm font-medium">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  )
}
