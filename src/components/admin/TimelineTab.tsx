'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { supabase } from '@/integrations/supabase/client'
import { Plus, Edit2, Trash2, Save, X, Calendar, Milestone } from 'lucide-react'
import { toast } from 'sonner'

interface TimelineEvent {
  id: string
  year: number
  title: string
  description: string
  image_url: string | null
  icon: string | null
  is_milestone: boolean
  is_active: boolean
  sort_order: number | null
}

export function TimelineTab() {
  const [items, setItems] = useState<TimelineEvent[]>([])
  const [editing, setEditing] = useState<TimelineEvent | null>(null)
  const [isNew, setIsNew] = useState(false)
  const [formData, setFormData] = useState({
    year: new Date().getFullYear(),
    title: '',
    description: '',
    image_url: '',
    icon: '',
    is_milestone: false,
    is_active: true,
    sort_order: 0
  })

  useEffect(() => {
    fetchItems()
  }, [])

  useEffect(() => {
    if (editing) {
      setFormData({
        year: editing.year,
        title: editing.title,
        description: editing.description,
        image_url: editing.image_url || '',
        icon: editing.icon || '',
        is_milestone: editing.is_milestone,
        is_active: editing.is_active,
        sort_order: editing.sort_order || 0
      })
    } else if (isNew) {
      setFormData({
        year: new Date().getFullYear(),
        title: '',
        description: '',
        image_url: '',
        icon: '',
        is_milestone: false,
        is_active: true,
        sort_order: 0
      })
    }
  }, [editing, isNew])

  const fetchItems = async () => {
    const { data } = await supabase
      .from('timeline_events')
      .select('*')
      .order('sort_order', { ascending: true })
    if (data) setItems(data)
  }

  const handleSave = async () => {
    try {
      if (editing) {
        const { error } = await supabase
          .from('timeline_events')
          .update(formData)
          .eq('id', editing.id)
        if (error) throw error
        toast.success('U përditësua me sukses')
      } else {
        const { error } = await supabase
          .from('timeline_events')
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
        .from('timeline_events')
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
            <h3 className="font-heading text-foreground">{editing ? 'Edito Ngjarjen' : 'Shto Ngjarje të Re'}</h3>
            <button onClick={() => { setEditing(null); setIsNew(false) }} className="p-2 hover:bg-muted rounded-lg">
              <X className="w-5 h-5" />
            </button>
          </div>
          
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Viti *</label>
              <input
                type="number"
                value={formData.year}
                onChange={(e) => setFormData({ ...formData, year: parseInt(e.target.value) || new Date().getFullYear() })}
                className="w-full px-4 py-2 bg-input-background border border-border rounded-lg text-foreground"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Titulli *</label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full px-4 py-2 bg-input-background border border-border rounded-lg text-foreground"
                placeholder="Titulli i ngjarjes"
              />
            </div>
            <div className="sm:col-span-2">
              <label className="block text-sm font-medium text-foreground mb-2">Përshkrimi *</label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="w-full px-4 py-2 bg-input-background border border-border rounded-lg text-foreground resize-none"
                rows={3}
                placeholder="Përshkrimi i ngjarjes..."
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Ikona (Lucide)</label>
              <input
                type="text"
                value={formData.icon}
                onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
                className="w-full px-4 py-2 bg-input-background border border-border rounded-lg text-foreground"
                placeholder="p.sh. Building, Star, Globe"
              />
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
            <div className="flex items-center gap-6">
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.is_milestone}
                  onChange={(e) => setFormData({ ...formData, is_milestone: e.target.checked })}
                  className="w-4 h-4"
                />
                <span className="text-sm text-foreground">Moment kyç (milestone)</span>
              </label>
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.is_active}
                  onChange={(e) => setFormData({ ...formData, is_active: e.target.checked })}
                  className="w-4 h-4"
                />
                <span className="text-sm text-foreground">Aktiv</span>
              </label>
            </div>
          </div>

          <div className="flex justify-end gap-3 mt-6">
            <button onClick={() => { setEditing(null); setIsNew(false) }} className="px-4 py-2 text-muted-foreground">
              Anulo
            </button>
            <button
              onClick={handleSave}
              disabled={!formData.title || !formData.description}
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

      <div className="space-y-4">
        {items.map((item) => (
          <div key={item.id} className="bg-card border border-border rounded-xl p-4 flex items-start gap-4">
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${item.is_milestone ? 'bg-primary/20' : 'bg-muted'}`}>
              {item.is_milestone ? (
                <Milestone className="w-6 h-6 text-primary" />
              ) : (
                <Calendar className="w-6 h-6 text-muted-foreground" />
              )}
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-sm font-semibold text-primary">{item.year}</span>
                <h3 className="font-heading text-foreground">{item.title}</h3>
                {item.is_milestone && (
                  <span className="text-xs bg-primary/20 text-primary px-2 py-0.5 rounded">Milestone</span>
                )}
                {!item.is_active && (
                  <span className="text-xs bg-muted text-muted-foreground px-2 py-0.5 rounded">Inaktiv</span>
                )}
              </div>
              <p className="text-sm text-muted-foreground line-clamp-2">{item.description}</p>
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
