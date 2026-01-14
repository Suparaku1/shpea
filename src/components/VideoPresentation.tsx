'use client'

import { motion } from 'framer-motion'
import { Play, Pause, Volume2, VolumeX, Maximize2 } from 'lucide-react'
import { useState, useRef } from 'react'
import { useTranslation } from 'react-i18next'

export function VideoPresentation() {
  const { t } = useTranslation()
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(true)
  const [showControls, setShowControls] = useState(true)
  const videoRef = useRef<HTMLVideoElement>(null)

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause()
      } else {
        videoRef.current.play()
      }
      setIsPlaying(!isPlaying)
    }
  }

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted
      setIsMuted(!isMuted)
    }
  }

  const toggleFullscreen = () => {
    if (videoRef.current) {
      if (document.fullscreenElement) {
        document.exitFullscreen()
      } else {
        videoRef.current.requestFullscreen()
      }
    }
  }

  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-4">
            <Play className="w-4 h-4" />
            {t('video.badge', 'Video Prezantuese')}
          </span>
          <h2 className="text-3xl md:text-4xl font-heading text-foreground mb-4">
            {t('video.title', 'Njihuni me Shkollën Tonë')}
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            {t('video.subtitle', 'Shikoni videon tonë për të parë ambientet, mësuesit dhe studentët tanë në veprim')}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="relative max-w-5xl mx-auto rounded-3xl overflow-hidden shadow-2xl group"
          onMouseEnter={() => setShowControls(true)}
          onMouseLeave={() => isPlaying && setShowControls(false)}
        >
          {/* Video Container */}
          <div className="relative aspect-video bg-foreground">
            <video
              ref={videoRef}
              className="w-full h-full object-cover"
              muted={isMuted}
              loop
              playsInline
              poster="https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=1920&h=1080&fit=crop"
              onPlay={() => setIsPlaying(true)}
              onPause={() => setIsPlaying(false)}
            >
              <source src="https://mojli.s3.us-east-2.amazonaws.com/Mojli+Website+upscaled+(12mb).webm" type="video/webm" />
            </video>

            {/* Overlay Gradient */}
            <div className={`absolute inset-0 bg-gradient-to-t from-foreground/60 via-transparent to-transparent transition-opacity duration-300 ${isPlaying && !showControls ? 'opacity-0' : 'opacity-100'}`} />

            {/* Play Button Overlay */}
            {!isPlaying && (
              <motion.button
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={togglePlay}
                className="absolute inset-0 flex items-center justify-center cursor-pointer"
              >
                <div className="w-24 h-24 md:w-32 md:h-32 bg-primary rounded-full flex items-center justify-center shadow-2xl">
                  <Play className="w-10 h-10 md:w-14 md:h-14 text-primary-foreground ml-2" fill="currentColor" />
                </div>
              </motion.button>
            )}

            {/* Controls Bar */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: showControls || !isPlaying ? 1 : 0, y: showControls || !isPlaying ? 0 : 20 }}
              className="absolute bottom-0 left-0 right-0 p-4 md:p-6 flex items-center justify-between"
            >
              <div className="flex items-center gap-3">
                <button
                  onClick={togglePlay}
                  className="w-12 h-12 bg-background/20 backdrop-blur-md rounded-full flex items-center justify-center text-background hover:bg-background/30 transition-colors cursor-pointer"
                >
                  {isPlaying ? (
                    <Pause className="w-5 h-5" />
                  ) : (
                    <Play className="w-5 h-5 ml-0.5" />
                  )}
                </button>
                
                <button
                  onClick={toggleMute}
                  className="w-12 h-12 bg-background/20 backdrop-blur-md rounded-full flex items-center justify-center text-background hover:bg-background/30 transition-colors cursor-pointer"
                >
                  {isMuted ? (
                    <VolumeX className="w-5 h-5" />
                  ) : (
                    <Volume2 className="w-5 h-5" />
                  )}
                </button>
              </div>

              <div className="flex items-center gap-3">
                <span className="text-background/80 text-sm font-medium hidden md:block">
                  {t('video.watchFull', 'Shiko Videon e Plotë')}
                </span>
                <button
                  onClick={toggleFullscreen}
                  className="w-12 h-12 bg-background/20 backdrop-blur-md rounded-full flex items-center justify-center text-background hover:bg-background/30 transition-colors cursor-pointer"
                >
                  <Maximize2 className="w-5 h-5" />
                </button>
              </div>
            </motion.div>
          </div>

          {/* Decorative Elements */}
          <div className="absolute -top-4 -right-4 w-24 h-24 bg-primary/20 rounded-full blur-2xl" />
          <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-accent-emerald/20 rounded-full blur-2xl" />
        </motion.div>

        {/* Features Below Video */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12 max-w-4xl mx-auto"
        >
          {[
            { title: t('video.feature1', 'Laboratorë Modernë'), desc: t('video.feature1Desc', 'Pajisje të fundit teknologjike') },
            { title: t('video.feature2', 'Mësim Praktik'), desc: t('video.feature2Desc', 'Mësoni duke bërë, jo vetëm duke dëgjuar') },
            { title: t('video.feature3', 'Praktikë Profesionale'), desc: t('video.feature3Desc', 'Partneritet me biznese të suksesshme') }
          ].map((feature, index) => (
            <div key={index} className="text-center p-4">
              <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-primary/10 flex items-center justify-center">
                <div className="w-3 h-3 bg-primary rounded-full" />
              </div>
              <h3 className="font-semibold text-foreground mb-1">{feature.title}</h3>
              <p className="text-sm text-muted-foreground">{feature.desc}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
