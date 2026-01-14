'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef, ReactNode } from 'react'

interface ParallaxSectionProps {
  children: ReactNode
  className?: string
  backgroundImage?: string
  overlay?: boolean
  speed?: number
}

export function ParallaxSection({ 
  children, 
  className = '', 
  backgroundImage,
  overlay = true,
  speed = 0.5
}: ParallaxSectionProps) {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start']
  })
  
  const y = useTransform(scrollYProgress, [0, 1], ['0%', `${speed * 100}%`])
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.6, 1, 1, 0.6])

  return (
    <div ref={ref} className={`relative overflow-hidden ${className}`}>
      {backgroundImage && (
        <motion.div 
          style={{ y }}
          className="absolute inset-0 -top-20 -bottom-20"
        >
          <div 
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: `url(${backgroundImage})` }}
          />
          {overlay && (
            <div className="absolute inset-0 bg-foreground/70" />
          )}
        </motion.div>
      )}
      <motion.div style={{ opacity }} className="relative z-10">
        {children}
      </motion.div>
    </div>
  )
}

interface ParallaxTextProps {
  children: ReactNode
  direction?: 'left' | 'right' | 'up' | 'down'
  className?: string
}

export function ParallaxText({ children, direction = 'up', className = '' }: ParallaxTextProps) {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start']
  })

  const getTransform = () => {
    switch (direction) {
      case 'left':
        return useTransform(scrollYProgress, [0, 1], ['50px', '-50px'])
      case 'right':
        return useTransform(scrollYProgress, [0, 1], ['-50px', '50px'])
      case 'up':
        return useTransform(scrollYProgress, [0, 1], ['30px', '-30px'])
      case 'down':
        return useTransform(scrollYProgress, [0, 1], ['-30px', '30px'])
      default:
        return useTransform(scrollYProgress, [0, 1], ['0px', '0px'])
    }
  }

  const transform = getTransform()
  const isHorizontal = direction === 'left' || direction === 'right'

  return (
    <motion.div
      ref={ref}
      style={isHorizontal ? { x: transform } : { y: transform }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

interface FloatingElementProps {
  children: ReactNode
  delay?: number
  duration?: number
  className?: string
}

export function FloatingElement({ children, delay = 0, duration = 6, className = '' }: FloatingElementProps) {
  return (
    <motion.div
      animate={{
        y: [0, -15, 0],
        rotate: [0, 2, -2, 0],
      }}
      transition={{
        duration,
        delay,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
