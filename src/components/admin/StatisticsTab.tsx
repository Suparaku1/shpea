'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { supabase } from '@/integrations/supabase/client'
import { Plus, Edit2, Trash2, Save, X, BarChart3 } from 'lucide-react'
import { toast } from 'sonner'

interface Statistic {
  id: string
  stat_key: string
  label: string
  value: number
  suffix: string | null
  icon: string | null
  color: string | null
  description: string | null
  is_active: boolean
  sort_order: number | null
}

export function StatisticsTab() {
  const [items, setItems] = useState<Statistic[]>([])
  const [editing, setEditing] = useState<Statistic | null>(null)
  const [isNew, setIsNew] = useState(false)
  const [formData, setFormData] = useState({
    stat_key: '',
    label: '',
    value: 0,
    suffix: '',
    icon: '',
    color: 'primary',
    description: '',
    is_active: true,
    sort_order: 0
  })

  useEffect(() => {
    fetchItems()
  }, [])

  useEffect(() => {
    if (editing) {
      setFormData({
        stat_key: editing.stat_key,
        label: editing.label,
        value: editing.value,
        suffix: editing.suffix || '',
        icon: editing.icon || '',
        color: editing.color || 'primary',
        description: editing.description || '',
        is_active: editing.is_active,
        sort_order: editing.sort_order || 0
      })
    } else if (isNew) {
      setFormData({
        stat_key: '',
        label: '',
        value: 0,
        suffix: '',
        icon: '',
        color: 'primary',
        description: '',
        is_active: true,
        sort_order: 0
      })
    }
  }, [editing, isNew])

  const fetchItems = async () => {
    const { data } = await supabase
      .from('statistics')
      .select('*')
      .order('sort_order', { ascending: true })
    if (data) setItems(data)
  }

  const handleSave = async () => {
    try {
      if (editing) {
        const { error } = await supabase
          .from('statistics')
          .update(formData)
          .eq('id', editing.id)
        if (error) throw error
        toast.success('U përditësua me sukses')
      } else {
        const { error } = await supabase
          .from('statistics')
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
        .from('statistics')
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
            <h3 className="font-heading text-foreground">{editing ? 'Edito Statistikën' : 'Shto Statistikë të Re'}</h3>
            <button onClick={() => { setEditing(null); setIsNew(false) }} className="p-2 hover:bg-muted rounded-lg">
              <X className="w-5 h-5" />
            </button>
          </div>
          
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Çelësi unik *</label>
              <input
                type="text"
                value={formData.stat_key}
                onChange={(e) => setFormData({ ...formData, stat_key: e.target.value.toLowerCase().replace(/\s+/g, '_') })}
                className="w-full px-4 py-2 bg-input-background border border-border rounded-lg text-foreground"
                placeholder="p.sh. total_students"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Emërtimi *</label>
              <input
                type="text"
                value={formData.label}
                onChange={(e) => setFormData({ ...formData, label: e.target.value })}
                className="w-full px-4 py-2 bg-input-background border border-border rounded-lg text-foreground"
                placeholder="p.sh. Studentë"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Vlera *</label>
              <input
                type="number"
                value={formData.value}
                onChange={(e) => setFormData({ ...formData, value: parseInt(e.target.value) || 0 })}
                className="w-full px-4 py-2 bg-input-background border border-border rounded-lg text-foreground"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Sufiks (p.sh. +, %)</label>
              <input
                type="text"
                value={formData.suffix}
                onChange={(e) => setFormData({ ...formData, suffix: e.target.value })}
                className="w-full px-4 py-2 bg-input-background border border-border rounded-lg text-foreground"
                placeholder="p.sh. +"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Ikona (Lucide)</label>
              <input
                type="text"
                value={formData.icon}
                onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
                className="w-full px-4 py-2 bg-input-background border border-border rounded-lg text-foreground"
                placeholder="p.sh. GraduationCap"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Ngjyra</label>
              <select
                value={formData.color}
                onChange={(e) => setFormData({ ...formData, color: e.target.value })}
                className="w-full px-4 py-2 bg-input-background border border-border rounded-lg text-foreground"
              >
                <option value="primary">Primary</option>
                <option value="accent-blue">Blu</option>
                <option value="accent-emerald">Jeshile</option>
                <option value="accent-purple">Lejla</option>
                <option value="accent-orange">Portokalli</option>
              </select>
            </div>
            <div className="sm:col-span-2">
              <label className="block text-sm font-medium text-foreground mb-2">Përshkrimi</label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="w-full px-4 py-2 bg-input-background border border-border rounded-lg text-foreground resize-none"
                rows={2}
                placeholder="Përshkrim i shkurtër..."
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
              disabled={!formData.stat_key || !formData.label}
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

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {items.map((item) => (
          <div key={item.id} className="bg-card border border-border rounded-xl p-4">
            <div className="flex items-start justify-between mb-4">
              <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                <BarChart3 className="w-6 h-6 text-primary" />
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
            <div className="text-3xl font-heading text-foreground mb-1">
              {item.value}{item.suffix}
            </div>
            <div className="text-sm text-muted-foreground">{item.label}</div>
            {!item.is_active && (
              <span className="inline-block mt-2 text-xs bg-muted text-muted-foreground px-2 py-0.5 rounded">Inaktiv</span>
            )}
          </div>
        ))}
      </div>
    </motion.div>
  )
}
