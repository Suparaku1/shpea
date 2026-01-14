'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { supabase } from '@/integrations/supabase/client'
import { Plus, Edit2, Trash2, Save, X, Star, Quote } from 'lucide-react'
import { toast } from 'sonner'
import { FileUpload } from '@/components/FileUpload'

interface Testimonial {
  id: string
  name: string
  role: string
  content: string
  rating: number
  avatar_url: string | null
  graduation_year: number | null
  program: string | null
  is_active: boolean
  sort_order: number | null
}

export function TestimonialsTab() {
  const [items, setItems] = useState<Testimonial[]>([])
  const [editing, setEditing] = useState<Testimonial | null>(null)
  const [isNew, setIsNew] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    role: '',
    content: '',
    rating: 5,
    avatar_url: '',
    graduation_year: new Date().getFullYear(),
    program: '',
    is_active: true,
    sort_order: 0
  })

  useEffect(() => {
    fetchItems()
  }, [])

  useEffect(() => {
    if (editing) {
      setFormData({
        name: editing.name,
        role: editing.role,
        content: editing.content,
        rating: editing.rating,
        avatar_url: editing.avatar_url || '',
        graduation_year: editing.graduation_year || new Date().getFullYear(),
        program: editing.program || '',
        is_active: editing.is_active,
        sort_order: editing.sort_order || 0
      })
    } else if (isNew) {
      setFormData({
        name: '',
        role: '',
        content: '',
        rating: 5,
        avatar_url: '',
        graduation_year: new Date().getFullYear(),
        program: '',
        is_active: true,
        sort_order: 0
      })
    }
  }, [editing, isNew])

  const fetchItems = async () => {
    const { data } = await supabase
      .from('testimonials')
      .select('*')
      .order('sort_order', { ascending: true })
    if (data) setItems(data)
  }

  const handleSave = async () => {
    try {
      if (editing) {
        const { error } = await supabase
          .from('testimonials')
          .update(formData)
          .eq('id', editing.id)
        if (error) throw error
        toast.success('U përditësua me sukses')
      } else {
        const { error } = await supabase
          .from('testimonials')
          .insert([formData])
        if (error) throw error
        toast.success('U shtua me sukses')
      }
      fetchItems()
      setEditing(null)
      setIsNew(false)
    } catch (error) {
      toast.error('Gabim në ruajtjen e të dhënave')
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Jeni të sigurt që doni të fshini?')) return
    try {
      const { error } = await supabase
        .from('testimonials')
        .delete()
        .eq('id', id)
      if (error) throw error
      toast.success('U fshi me sukses')
      fetchItems()
    } catch (error) {
      toast.error('Gabim në fshirje')
    }
  }

  if (isNew || editing) {
    return (
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <div className="bg-card border border-border rounded-xl p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-heading text-foreground">{editing ? 'Edito Testimonialin' : 'Shto Testimonial të Ri'}</h3>
            <button onClick={() => { setEditing(null); setIsNew(false) }} className="p-2 hover:bg-muted rounded-lg">
              <X className="w-5 h-5" />
            </button>
          </div>
          
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Emri *</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 py-2 bg-input-background border border-border rounded-lg text-foreground"
                placeholder="Emri i plotë"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Roli *</label>
              <input
                type="text"
                value={formData.role}
                onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                className="w-full px-4 py-2 bg-input-background border border-border rounded-lg text-foreground"
                placeholder="p.sh. I diplomuar 2023 - Elektroteknikë"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Programi</label>
              <input
                type="text"
                value={formData.program}
                onChange={(e) => setFormData({ ...formData, program: e.target.value })}
                className="w-full px-4 py-2 bg-input-background border border-border rounded-lg text-foreground"
                placeholder="p.sh. Elektroteknikë"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Viti i diplomimit</label>
              <input
                type="number"
                value={formData.graduation_year}
                onChange={(e) => setFormData({ ...formData, graduation_year: parseInt(e.target.value) || 2024 })}
                className="w-full px-4 py-2 bg-input-background border border-border rounded-lg text-foreground"
              />
            </div>
            <div className="sm:col-span-2">
              <label className="block text-sm font-medium text-foreground mb-2">Përmbajtja *</label>
              <textarea
                value={formData.content}
                onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                className="w-full px-4 py-2 bg-input-background border border-border rounded-lg text-foreground resize-none"
                rows={4}
                placeholder="Shkruani testimonialin..."
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Vlerësimi (1-5)</label>
              <div className="flex items-center gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setFormData({ ...formData, rating: star })}
                    className="p-1"
                  >
                    <Star
                      className={`w-6 h-6 ${star <= formData.rating ? 'text-yellow-500 fill-yellow-500' : 'text-muted-foreground'}`}
                    />
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Renditja</label>
              <input
                type="number"
                value={formData.sort_order}
                onChange={(e) => setFormData({ ...formData, sort_order: parseInt(e.target.value) || 0 })}
                className="w-full px-4 py-2 bg-input-background border border-border rounded-lg text-foreground"
              />
            </div>
            <div className="sm:col-span-2">
              <label className="block text-sm font-medium text-foreground mb-2">Foto</label>
              <div className="flex items-start gap-4">
                <FileUpload
                  currentUrl={formData.avatar_url}
                  onUploadComplete={(url) => setFormData({ ...formData, avatar_url: url })}
                  folder="testimonials"
                />
                <input
                  type="url"
                  value={formData.avatar_url}
                  onChange={(e) => setFormData({ ...formData, avatar_url: e.target.value })}
                  className="flex-1 px-4 py-2 bg-input-background border border-border rounded-lg text-foreground text-sm"
                  placeholder="ose vendosni URL"
                />
              </div>
            </div>
            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                checked={formData.is_active}
                onChange={(e) => setFormData({ ...formData, is_active: e.target.checked })}
                className="w-4 h-4"
              />
              <label className="text-sm text-foreground">Aktiv</label>
            </div>
          </div>

          <div className="flex justify-end gap-3 mt-6">
            <button onClick={() => { setEditing(null); setIsNew(false) }} className="px-4 py-2 text-muted-foreground">
              Anulo
            </button>
            <button
              onClick={handleSave}
              disabled={!formData.name || !formData.content}
              className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-lg hover:bg-primary/90 disabled:opacity-50"
            >
              <Save className="w-4 h-4" />
              Ruaj
            </button>
          </div>
        </div>
      </motion.div>
    )
  }

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
      <div className="flex justify-end mb-4">
        <button
          onClick={() => setIsNew(true)}
          className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-lg hover:bg-primary/90"
        >
          <Plus className="w-4 h-4" />
          Shto të ri
        </button>
      </div>

      <div className="grid gap-4">
        {items.map((item) => (
          <div key={item.id} className="bg-card border border-border rounded-xl p-4 flex items-start gap-4">
            {item.avatar_url ? (
              <img src={item.avatar_url} alt={item.name} className="w-12 h-12 rounded-full object-cover" />
            ) : (
              <div className="w-12 h-12 bg-muted rounded-full flex items-center justify-center">
                <Quote className="w-5 h-5 text-muted-foreground" />
              </div>
            )}
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <h3 className="font-heading text-foreground">{item.name}</h3>
                {!item.is_active && (
                  <span className="text-xs bg-muted text-muted-foreground px-2 py-0.5 rounded">Inaktiv</span>
                )}
              </div>
              <p className="text-sm text-muted-foreground">{item.role}</p>
              <p className="text-sm text-foreground mt-2 line-clamp-2">{item.content}</p>
              <div className="flex items-center gap-1 mt-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className={`w-4 h-4 ${star <= item.rating ? 'text-yellow-500 fill-yellow-500' : 'text-muted-foreground'}`}
                  />
                ))}
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setEditing(item)}
                className="p-2 hover:bg-muted rounded-lg text-muted-foreground hover:text-foreground"
              >
                <Edit2 className="w-4 h-4" />
              </button>
              <button
                onClick={() => handleDelete(item.id)}
                className="p-2 hover:bg-destructive/10 rounded-lg text-destructive"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  )
}
