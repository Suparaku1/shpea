'use client'

import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import { Play, X, Image as ImageIcon, Video } from 'lucide-react'
import { supabase } from '@/integrations/supabase/client'

interface GalleryItem {
  id: string
  title: string
  category: string | null
  media_type: string
  media_url: string
  thumbnail_url: string | null
}

const fallbackItems = [
  {
    id: '1',
    media_type: 'image',
    media_url: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800&h=600&fit=crop',
    thumbnail_url: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=400&h=300&fit=crop',
    title: 'Ceremonia e Diplomimit 2024',
    category: 'Ceremoni'
  },
  {
    id: '2',
    media_type: 'image',
    media_url: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&h=600&fit=crop',
    thumbnail_url: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=400&h=300&fit=crop',
    title: 'Laboratori i TIK',
    category: 'Laboratorë'
  },
  {
    id: '3',
    media_type: 'video',
    media_url: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    thumbnail_url: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=400&h=300&fit=crop',
    title: 'Klubi i Robotikës',
    category: 'Aktivitete'
  },
  {
    id: '4',
    media_type: 'image',
    media_url: 'https://images.unsplash.com/photo-1581092921461-eab62e97a780?w=800&h=600&fit=crop',
    thumbnail_url: 'https://images.unsplash.com/photo-1581092921461-eab62e97a780?w=400&h=300&fit=crop',
    title: 'Punëtoria e Mekanikës',
    category: 'Laboratorë'
  },
  {
    id: '5',
    media_type: 'image',
    media_url: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&h=600&fit=crop',
    thumbnail_url: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400&h=300&fit=crop',
    title: 'Praktika në Hotel',
    category: 'Praktika'
  },
  {
    id: '6',
    media_type: 'video',
    media_url: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    thumbnail_url: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=400&h=300&fit=crop',
    title: 'Vizitë në Natyrë',
    category: 'Ekskursione'
  },
  {
    id: '7',
    media_type: 'image',
    media_url: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&h=600&fit=crop',
    thumbnail_url: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=400&h=300&fit=crop',
    title: 'Konkursi i Biznesit',
    category: 'Konkurse'
  },
  {
    id: '8',
    media_type: 'image',
    media_url: 'https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?w=800&h=600&fit=crop',
    thumbnail_url: 'https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?w=400&h=300&fit=crop',
    title: 'Dita e Hapur',
    category: 'Aktivitete'
  },
]

export function Gallery() {
  const [selectedMedia, setSelectedMedia] = useState<{type: string, src: string, title: string} | null>(null)
  const [filter, setFilter] = useState<'all' | 'photos' | 'videos'>('all')
  const [galleryItems, setGalleryItems] = useState<GalleryItem[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchGallery()
  }, [])

  const fetchGallery = async () => {
    const { data, error } = await supabase
      .from('gallery_items')
      .select('*')
      .eq('is_active', true)
      .order('sort_order', { ascending: true })

    if (data && data.length > 0) {
      setGalleryItems(data)
    } else {
      setGalleryItems(fallbackItems)
    }
    setLoading(false)
  }

  const filteredItems = filter === 'all' 
    ? galleryItems 
    : filter === 'photos' 
      ? galleryItems.filter(item => item.media_type === 'image')
      : galleryItems.filter(item => item.media_type === 'video')

  return (
    <section id="gallery" className="relative py-24 bg-background overflow-hidden">
      
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-3 pointer-events-none">
        <div className="w-full h-full" style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, hsl(var(--muted-foreground)) 1px, transparent 0)`,
          backgroundSize: '50px 50px'
        }} />
      </div>

      <div className="container mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-3 mb-6">
            <ImageIcon className="w-5 h-5 text-primary" />
            <span className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
              Galeria
            </span>
            <Video className="w-5 h-5 text-primary" />
          </div>
          
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-heading leading-tight mb-6 text-foreground">
            <span className="block mb-2">Foto & Video nga</span>
            <span className="block text-primary">AKTIVITETET TONA</span>
          </h2>
          
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Shikoni momente nga jeta shkollore dhe aktivitetet tona
          </p>
        </motion.div>

        {/* Filter Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex justify-center gap-4 mb-12"
        >
          <button
            onClick={() => setFilter('all')}
            className={`px-6 py-3 rounded-lg font-medium transition-all ${
              filter === 'all' 
                ? 'bg-primary text-primary-foreground' 
                : 'bg-card border border-border text-foreground hover:bg-muted'
            }`}
          >
            Të gjitha
          </button>
          <button
            onClick={() => setFilter('photos')}
            className={`px-6 py-3 rounded-lg font-medium transition-all inline-flex items-center gap-2 ${
              filter === 'photos' 
                ? 'bg-primary text-primary-foreground' 
                : 'bg-card border border-border text-foreground hover:bg-muted'
            }`}
          >
            <ImageIcon className="w-4 h-4" />
            Foto
          </button>
          <button
            onClick={() => setFilter('videos')}
            className={`px-6 py-3 rounded-lg font-medium transition-all inline-flex items-center gap-2 ${
              filter === 'videos' 
                ? 'bg-primary text-primary-foreground' 
                : 'bg-card border border-border text-foreground hover:bg-muted'
            }`}
          >
            <Video className="w-4 h-4" />
            Video
          </button>
        </motion.div>

        {loading ? (
          <div className="flex justify-center py-20">
            <div className="w-8 h-8 border-4 border-primary/30 border-t-primary rounded-full animate-spin" />
          </div>
        ) : (
          /* Gallery Grid */
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {filteredItems.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="group relative aspect-[4/3] rounded-xl overflow-hidden cursor-pointer"
                onClick={() => setSelectedMedia({ type: item.media_type, src: item.media_url, title: item.title })}
              >
                <img 
                  src={item.thumbnail_url || item.media_url} 
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-foreground/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                {/* Video Play Icon */}
                {item.media_type === 'video' && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-16 h-16 bg-primary/90 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                      <Play className="w-6 h-6 text-primary-foreground ml-1" fill="currentColor" />
                    </div>
                  </div>
                )}
                
                {/* Info */}
                <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                  <span className="text-xs text-primary-foreground/80 bg-primary/80 px-2 py-1 rounded mb-2 inline-block">
                    {item.category || 'Pa kategori'}
                  </span>
                  <h3 className="text-background font-medium text-sm">{item.title}</h3>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <a
            href="https://www.facebook.com/shpe.al"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-primary text-primary-foreground font-semibold px-8 py-4 rounded-lg hover:bg-primary/90 transition-colors"
          >
            Shiko më shumë në Facebook
          </a>
        </motion.div>
      </div>

      {/* Lightbox Modal */}
      {selectedMedia && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-foreground/95 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedMedia(null)}
        >
          <button
            onClick={() => setSelectedMedia(null)}
            className="absolute top-4 right-4 w-12 h-12 bg-background/20 hover:bg-background/30 rounded-full flex items-center justify-center text-background transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
          
          <div className="max-w-5xl w-full" onClick={e => e.stopPropagation()}>
            {selectedMedia.type === 'image' ? (
              <img 
                src={selectedMedia.src} 
                alt={selectedMedia.title}
                className="w-full h-auto rounded-lg"
              />
            ) : (
              <div className="aspect-video">
                <iframe
                  src={selectedMedia.src}
                  className="w-full h-full rounded-lg"
                  allowFullScreen
                />
              </div>
            )}
            <p className="text-background text-center mt-4 font-medium">{selectedMedia.title}</p>
          </div>
        </motion.div>
      )}
    </section>
  )
}
