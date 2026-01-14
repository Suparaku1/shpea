'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { supabase } from '@/integrations/supabase/client'
import { User, Session } from '@supabase/supabase-js'
import { 
  Users, Image as ImageIcon, FileText, LogOut, Menu,
  Plus, Edit2, Trash2, Save, X, ChevronLeft, 
  BookOpen, MessageSquare, Handshake, Newspaper, Settings, Globe,
  Star, BarChart3, Calendar as CalendarIcon, LayoutDashboard, Mail
} from 'lucide-react'
import { toast } from 'sonner'
import shpeLogo from '@/assets/shpe-logo.png'
import { FileUpload } from '@/components/FileUpload'
import { TestimonialsTab } from '@/components/admin/TestimonialsTab'
import { StatisticsTab } from '@/components/admin/StatisticsTab'
import { TimelineTab } from '@/components/admin/TimelineTab'
import { AnalyticsDashboard } from '@/components/admin/AnalyticsDashboard'
import { ContactMessagesTab } from '@/components/admin/ContactMessagesTab'
import { AdminNotifications } from '@/components/admin/AdminNotifications'
import TeamTab from '@/components/admin/TeamTab'
import GalleryTab from '@/components/admin/GalleryTab'
import NewsTab from '@/components/admin/NewsTab'
import PartnersTab from '@/components/admin/PartnersTab'

interface TeamMember {
  id: string
  full_name: string
  position: string
  department: string | null
  quote: string | null
  photo_url: string | null
  sort_order: number
  is_active: boolean
}

interface GalleryItem {
  id: string
  title: string
  category: string | null
  media_type: string
  media_url: string
  thumbnail_url: string | null
  sort_order: number
  is_active: boolean
}

interface SiteContent {
  id: string
  section_key: string
  content: string
  content_type: string
}

interface Program {
  id: string
  title: string
  description: string | null
  image_url: string | null
  color: string
  sort_order: number
  is_active: boolean
}

interface FAQItem {
  id: string
  question: string
  answer: string
  category: string | null
  sort_order: number
  is_active: boolean
}

interface Partner {
  id: string
  name: string
  logo_url: string | null
  website_url: string | null
  description: string | null
  sort_order: number
  is_active: boolean
}

interface NewsItem {
  id: string
  title: string
  content: string
  excerpt: string | null
  image_url: string | null
  category: string | null
  is_featured: boolean
  is_published: boolean
  published_at: string | null
}

interface ContactInfo {
  id: string
  info_type: string
  title: string
  details: string[]
  icon: string | null
  color: string
  sort_order: number
}

interface SocialLink {
  id: string
  platform: string
  url: string
  icon: string | null
  is_active: boolean
  sort_order: number
}

export default function Admin() {
  const navigate = useNavigate()
  const [user, setUser] = useState<User | null>(null)
  const [session, setSession] = useState<Session | null>(null)
  const [isAdmin, setIsAdmin] = useState(false)
  const [loading, setLoading] = useState(true)
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [activeTab, setActiveTab] = useState('dashboard')
  
  // Data states
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([])
  const [editingMember, setEditingMember] = useState<TeamMember | null>(null)
  const [newMember, setNewMember] = useState(false)
  
  const [galleryItems, setGalleryItems] = useState<GalleryItem[]>([])
  const [editingGallery, setEditingGallery] = useState<GalleryItem | null>(null)
  const [newGalleryItem, setNewGalleryItem] = useState(false)
  
  const [siteContents, setSiteContents] = useState<SiteContent[]>([])
  const [editingContent, setEditingContent] = useState<SiteContent | null>(null)
  
  const [programs, setPrograms] = useState<Program[]>([])
  const [editingProgram, setEditingProgram] = useState<Program | null>(null)
  const [newProgram, setNewProgram] = useState(false)
  
  const [faqItems, setFaqItems] = useState<FAQItem[]>([])
  const [editingFaq, setEditingFaq] = useState<FAQItem | null>(null)
  const [newFaq, setNewFaq] = useState(false)
  
  const [partners, setPartners] = useState<Partner[]>([])
  const [editingPartner, setEditingPartner] = useState<Partner | null>(null)
  const [newPartner, setNewPartner] = useState(false)
  
  const [newsItems, setNewsItems] = useState<NewsItem[]>([])
  const [editingNews, setEditingNews] = useState<NewsItem | null>(null)
  const [newNews, setNewNews] = useState(false)
  
  const [contactInfos, setContactInfos] = useState<ContactInfo[]>([])
  const [editingContactInfo, setEditingContactInfo] = useState<ContactInfo | null>(null)
  
  const [socialLinks, setSocialLinks] = useState<SocialLink[]>([])
  const [editingSocialLink, setEditingSocialLink] = useState<SocialLink | null>(null)
  const [newSocialLink, setNewSocialLink] = useState(false)

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      setSession(session)
      setUser(session?.user ?? null)
      
      if (!session) {
        navigate('/auth')
      } else if (session.user) {
        setTimeout(() => {
          checkAdminRole(session.user.id)
        }, 0)
      }
    })

    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
      setUser(session?.user ?? null)
      
      if (!session) {
        navigate('/auth')
      } else if (session.user) {
        checkAdminRole(session.user.id)
      }
      setLoading(false)
    })

    return () => subscription.unsubscribe()
  }, [navigate])

  const checkAdminRole = async (userId: string) => {
    const { data, error } = await supabase
      .from('user_roles')
      .select('role')
      .eq('user_id', userId)
      .eq('role', 'admin')
      .maybeSingle()

    if (data) {
      setIsAdmin(true)
      fetchAllData()
    } else {
      toast.error('Nuk keni të drejta administratori')
      navigate('/')
    }
  }

  const fetchAllData = async () => {
    await Promise.all([
      fetchTeamMembers(),
      fetchGalleryItems(),
      fetchSiteContents(),
      fetchPrograms(),
      fetchFaqItems(),
      fetchPartners(),
      fetchNewsItems(),
      fetchContactInfos(),
      fetchSocialLinks()
    ])
  }

  const fetchSiteContents = async () => {
    const { data } = await supabase.from('site_content').select('*').order('section_key')
    if (data) setSiteContents(data)
  }

  const fetchTeamMembers = async () => {
    const { data } = await supabase.from('team_members').select('*').order('sort_order')
    if (data) setTeamMembers(data)
  }

  const fetchGalleryItems = async () => {
    const { data } = await supabase.from('gallery_items').select('*').order('sort_order')
    if (data) setGalleryItems(data)
  }

  const fetchPrograms = async () => {
    const { data } = await supabase.from('programs').select('*').order('sort_order')
    if (data) setPrograms(data)
  }

  const fetchFaqItems = async () => {
    const { data } = await supabase.from('faq_items').select('*').order('sort_order')
    if (data) setFaqItems(data)
  }

  const fetchPartners = async () => {
    const { data } = await supabase.from('partners').select('*').order('sort_order')
    if (data) setPartners(data)
  }

  const fetchNewsItems = async () => {
    const { data } = await supabase.from('news_items').select('*').order('created_at', { ascending: false })
    if (data) setNewsItems(data)
  }

  const fetchContactInfos = async () => {
    const { data } = await supabase.from('contact_info').select('*').order('sort_order')
    if (data) setContactInfos(data)
  }

  const fetchSocialLinks = async () => {
    const { data } = await supabase.from('social_links').select('*').order('sort_order')
    if (data) setSocialLinks(data)
  }

  const handleLogout = async () => {
    await supabase.auth.signOut()
    toast.success('Dolët me sukses')
    navigate('/')
  }

  // Generic CRUD handlers
  const handleSave = async (table: string, data: Record<string, unknown>, id?: string, fetchFn?: () => void) => {
    try {
      if (id) {
        const { error } = await (supabase.from(table as any) as any).update(data).eq('id', id)
        if (error) throw error
        toast.success('U përditësua me sukses')
      } else {
        const { error } = await (supabase.from(table as any) as any).insert([data])
        if (error) throw error
        toast.success('U shtua me sukses')
      }
      if (fetchFn) fetchFn()
    } catch (error) {
      toast.error('Gabim në ruajtjen e të dhënave')
    }
  }

  const handleDelete = async (table: string, id: string, fetchFn: () => void) => {
    if (!confirm('Jeni të sigurt që doni të fshini?')) return
    try {
      const { error } = await (supabase.from(table as any) as any).delete().eq('id', id)
      if (error) throw error
      toast.success('U fshi me sukses')
      fetchFn()
    } catch (error) {
      toast.error('Gabim në fshirje')
    }
  }

  const menuItems = [
    { id: 'dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { id: 'messages', icon: Mail, label: 'Mesazhet' },
    { id: 'content', icon: FileText, label: 'Përmbajtja' },
    { id: 'programs', icon: BookOpen, label: 'Programet' },
    { id: 'team', icon: Users, label: 'Ekipi' },
    { id: 'gallery', icon: ImageIcon, label: 'Galeria' },
    { id: 'news', icon: Newspaper, label: 'Lajmet' },
    { id: 'faq', icon: MessageSquare, label: 'FAQ' },
    { id: 'partners', icon: Handshake, label: 'Partnerët' },
    { id: 'testimonials', icon: Star, label: 'Testimoniale' },
    { id: 'statistics', icon: BarChart3, label: 'Statistikat' },
    { id: 'timeline', icon: CalendarIcon, label: 'Timeline' },
    { id: 'settings', icon: Settings, label: 'Cilësimet' },
  ]

  if (loading || !isAdmin) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-primary/30 border-t-primary rounded-full animate-spin mx-auto" />
          <p className="text-muted-foreground mt-4">Duke verifikuar...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-muted/30">
      {sidebarOpen && (
        <div className="lg:hidden fixed inset-0 bg-foreground/50 z-40" onClick={() => setSidebarOpen(false)} />
      )}

      {/* Sidebar */}
      <aside className={`fixed top-0 left-0 h-full w-64 bg-card border-r border-border z-50 transform transition-transform lg:translate-x-0 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="flex flex-col h-full">
          <div className="p-6 border-b border-border">
            <a href="/" className="flex items-center gap-3">
              <img src={shpeLogo} alt="SHPE Logo" className="h-10 w-auto" />
              <div>
                <span className="font-heading text-foreground block">SHPE</span>
                <span className="text-xs text-primary font-semibold">CMS Admin</span>
              </div>
            </a>
          </div>

          <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => { setActiveTab(item.id); setSidebarOpen(false) }}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                  activeTab === item.id ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                }`}
              >
                <item.icon className="w-5 h-5" />
                {item.label}
              </button>
            ))}
          </nav>

          <div className="p-4 border-t border-border space-y-2">
            <a href="/" className="w-full flex items-center justify-center gap-2 px-4 py-2 text-muted-foreground hover:text-foreground hover:bg-muted rounded-lg transition-colors">
              <ChevronLeft className="w-4 h-4" />
              Kthehu në faqe
            </a>
            <button onClick={handleLogout} className="w-full flex items-center justify-center gap-2 px-4 py-2 text-destructive hover:bg-destructive/10 rounded-lg transition-colors">
              <LogOut className="w-4 h-4" />
              Dilni
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="lg:ml-64">
        <header className="sticky top-0 bg-card/80 backdrop-blur-xl border-b border-border z-30">
          <div className="flex items-center justify-between px-6 py-4">
            <div className="flex items-center gap-4">
              <button onClick={() => setSidebarOpen(true)} className="lg:hidden p-2 hover:bg-muted rounded-lg">
                <Menu className="w-5 h-5" />
              </button>
              <h1 className="text-xl font-heading text-foreground">
                {menuItems.find(m => m.id === activeTab)?.label}
              </h1>
            </div>
            
            <div className="flex items-center gap-2">
              <AdminNotifications />
            
              {activeTab !== 'content' && activeTab !== 'settings' && activeTab !== 'dashboard' && activeTab !== 'messages' && activeTab !== 'testimonials' && activeTab !== 'statistics' && activeTab !== 'timeline' && activeTab !== 'team' && activeTab !== 'gallery' && activeTab !== 'news' && activeTab !== 'partners' && (
                <button
                  onClick={() => {
                    if (activeTab === 'programs') setNewProgram(true)
                    if (activeTab === 'faq') setNewFaq(true)
                  }}
                  className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors"
                >
                  <Plus className="w-4 h-4" />
                  Shto të ri
                </button>
              )}
            </div>
          </div>
        </header>

        <div className="p-6">
          {/* Dashboard Tab */}
          {activeTab === 'dashboard' && <AnalyticsDashboard />}

          {/* Messages Tab */}
          {activeTab === 'messages' && <ContactMessagesTab />}

          {/* Site Content Tab */}
          {activeTab === 'content' && (
            <ContentTab 
              contents={siteContents}
              editingContent={editingContent}
              setEditingContent={setEditingContent}
              onSave={(data) => handleSave('site_content', { content: data.content }, editingContent?.id, () => { fetchSiteContents(); setEditingContent(null) })}
            />
          )}

          {/* Programs Tab */}
          {activeTab === 'programs' && (
            <ProgramsTab
              programs={programs}
              editing={editingProgram}
              setEditing={setEditingProgram}
              isNew={newProgram}
              setNew={setNewProgram}
              onSave={(data) => handleSave('programs', data, editingProgram?.id, () => { fetchPrograms(); setEditingProgram(null); setNewProgram(false) })}
              onDelete={(id) => handleDelete('programs', id, fetchPrograms)}
            />
          )}

          {/* Team Tab */}
          {activeTab === 'team' && <TeamTab />}

          {/* Gallery Tab */}
          {activeTab === 'gallery' && <GalleryTab />}

          {/* News Tab */}
          {activeTab === 'news' && <NewsTab />}

          {/* FAQ Tab */}
          {activeTab === 'faq' && (
            <FAQTab
              items={faqItems}
              editing={editingFaq}
              setEditing={setEditingFaq}
              isNew={newFaq}
              setNew={setNewFaq}
              onSave={(data) => handleSave('faq_items', data, editingFaq?.id, () => { fetchFaqItems(); setEditingFaq(null); setNewFaq(false) })}
              onDelete={(id) => handleDelete('faq_items', id, fetchFaqItems)}
            />
          )}

          {/* Partners Tab */}
          {activeTab === 'partners' && <PartnersTab />}

          {/* Testimonials Tab */}
          {activeTab === 'testimonials' && <TestimonialsTab />}

          {/* Statistics Tab */}
          {activeTab === 'statistics' && <StatisticsTab />}

          {/* Timeline Tab */}
          {activeTab === 'timeline' && <TimelineTab />}

          {/* Settings Tab */}
          {activeTab === 'settings' && (
            <SettingsTab
              contactInfos={contactInfos}
              socialLinks={socialLinks}
              editingContact={editingContactInfo}
              setEditingContact={setEditingContactInfo}
              editingSocial={editingSocialLink}
              setEditingSocial={setEditingSocialLink}
              newSocial={newSocialLink}
              setNewSocial={setNewSocialLink}
              onSaveContact={(data) => handleSave('contact_info', data, editingContactInfo?.id, () => { fetchContactInfos(); setEditingContactInfo(null) })}
              onSaveSocial={(data) => handleSave('social_links', data, editingSocialLink?.id, () => { fetchSocialLinks(); setEditingSocialLink(null); setNewSocialLink(false) })}
              onDeleteSocial={(id) => handleDelete('social_links', id, fetchSocialLinks)}
            />
          )}
        </div>
      </main>
    </div>
  )
}

// Content Tab Component
function ContentTab({ contents, editingContent, setEditingContent, onSave }: {
  contents: SiteContent[]
  editingContent: SiteContent | null
  setEditingContent: (c: SiteContent | null) => void
  onSave: (data: { content: string }) => void
}) {
  const [formData, setFormData] = useState({ content: '' })
  
  useEffect(() => {
    if (editingContent) setFormData({ content: editingContent.content })
  }, [editingContent])

  const contentLabels: Record<string, string> = {
    hero_title: 'Titulli Kryesor (Hero)',
    hero_subtitle: 'Nëntitulli (Hero)',
    hero_description: 'Përshkrimi (Hero)',
    about_title: 'Titulli - Rreth Nesh',
    about_description: 'Përshkrimi - Rreth Nesh',
    footer_description: 'Përshkrimi - Footer',
    stat_directions: 'Statistikë - Drejtimet',
    stat_years: 'Statistikë - Vitet',
    stat_employment: 'Statistikë - Punësimi'
  }

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
      {editingContent && (
        <div className="bg-card border border-border rounded-xl p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-heading text-foreground">{contentLabels[editingContent.section_key] || editingContent.section_key}</h3>
            <button onClick={() => setEditingContent(null)} className="p-2 hover:bg-muted rounded-lg"><X className="w-5 h-5" /></button>
          </div>
          <textarea
            value={formData.content}
            onChange={(e) => setFormData({ content: e.target.value })}
            className="w-full px-4 py-2 bg-input-background border border-border rounded-lg text-foreground resize-none"
            rows={4}
          />
          <div className="flex justify-end gap-3 mt-4">
            <button onClick={() => setEditingContent(null)} className="px-4 py-2 text-muted-foreground">Anulo</button>
            <button onClick={() => onSave(formData)} className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-lg hover:bg-primary/90">
              <Save className="w-4 h-4" />Ruaj
            </button>
          </div>
        </div>
      )}

      <div className="grid gap-4">
        {contents.map((content) => (
          <div key={content.id} className="bg-card border border-border rounded-xl p-4">
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <h3 className="font-heading text-foreground">{contentLabels[content.section_key] || content.section_key}</h3>
                <p className="text-sm text-muted-foreground mt-1 line-clamp-2">{content.content}</p>
              </div>
              <button onClick={() => setEditingContent(content)} className="p-2 hover:bg-muted rounded-lg text-muted-foreground hover:text-foreground">
                <Edit2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  )
}

// Programs Tab Component
function ProgramsTab({ programs, editing, setEditing, isNew, setNew, onSave, onDelete }: {
  programs: Program[]
  editing: Program | null
  setEditing: (p: Program | null) => void
  isNew: boolean
  setNew: (b: boolean) => void
  onSave: (data: any) => void
  onDelete: (id: string) => void
}) {
  const [formData, setFormData] = useState({
    title: '', description: '', image_url: '', color: 'accent-blue', sort_order: 0, is_active: true
  })

  useEffect(() => {
    if (editing) setFormData({ title: editing.title, description: editing.description || '', image_url: editing.image_url || '', color: editing.color, sort_order: editing.sort_order, is_active: editing.is_active })
    else if (isNew) setFormData({ title: '', description: '', image_url: '', color: 'accent-blue', sort_order: 0, is_active: true })
  }, [editing, isNew])

  if (isNew || editing) {
    return (
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <div className="bg-card border border-border rounded-xl p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-heading text-foreground">{editing ? 'Edito Programin' : 'Shto Program të Ri'}</h3>
            <button onClick={() => { setEditing(null); setNew(false) }} className="p-2 hover:bg-muted rounded-lg"><X className="w-5 h-5" /></button>
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Titulli *</label>
              <input type="text" value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full px-4 py-2 bg-input-background border border-border rounded-lg text-foreground" />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Ngjyra</label>
              <select value={formData.color} onChange={(e) => setFormData({ ...formData, color: e.target.value })}
                className="w-full px-4 py-2 bg-input-background border border-border rounded-lg text-foreground">
                <option value="accent-blue">Blu</option>
                <option value="accent-emerald">Jeshile</option>
                <option value="accent-purple">Lejla</option>
                <option value="accent-orange">Portokalli</option>
              </select>
            </div>
            <div className="sm:col-span-2">
              <label className="block text-sm font-medium text-foreground mb-2">Përshkrimi</label>
              <textarea value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="w-full px-4 py-2 bg-input-background border border-border rounded-lg text-foreground resize-none" rows={3} />
            </div>
            <div className="sm:col-span-2">
              <label className="block text-sm font-medium text-foreground mb-2">Foto</label>
              <div className="flex items-start gap-4">
                <FileUpload currentUrl={formData.image_url} onUploadComplete={(url) => setFormData({ ...formData, image_url: url })} folder="programs" />
                <input type="url" value={formData.image_url} onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
                  className="flex-1 px-4 py-2 bg-input-background border border-border rounded-lg text-foreground text-sm" placeholder="ose vendosni URL" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Renditja</label>
              <input type="number" value={formData.sort_order} onChange={(e) => setFormData({ ...formData, sort_order: parseInt(e.target.value) || 0 })}
                className="w-full px-4 py-2 bg-input-background border border-border rounded-lg text-foreground" />
            </div>
            <div className="flex items-center gap-3">
              <input type="checkbox" checked={formData.is_active} onChange={(e) => setFormData({ ...formData, is_active: e.target.checked })} className="w-4 h-4" />
              <label className="text-sm text-foreground">Aktiv</label>
            </div>
          </div>
          <div className="flex justify-end gap-3 mt-6">
            <button onClick={() => { setEditing(null); setNew(false) }} className="px-4 py-2 text-muted-foreground">Anulo</button>
            <button onClick={() => onSave(formData)} disabled={!formData.title} className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-lg hover:bg-primary/90 disabled:opacity-50">
              <Save className="w-4 h-4" />Ruaj
            </button>
          </div>
        </div>
      </motion.div>
    )
  }

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {programs.map((program) => (
        <div key={program.id} className="bg-card border border-border rounded-xl overflow-hidden group">
          {program.image_url && <img src={program.image_url} alt={program.title} className="w-full h-40 object-cover" />}
          <div className="p-4">
            <h3 className="font-heading text-foreground">{program.title}</h3>
            <p className="text-sm text-muted-foreground mt-1 line-clamp-2">{program.description}</p>
            <div className="flex items-center gap-2 mt-4">
              <button onClick={() => setEditing(program)} className="p-2 hover:bg-muted rounded-lg text-muted-foreground hover:text-foreground"><Edit2 className="w-4 h-4" /></button>
              <button onClick={() => onDelete(program.id)} className="p-2 hover:bg-destructive/10 rounded-lg text-destructive"><Trash2 className="w-4 h-4" /></button>
            </div>
          </div>
        </div>
      ))}
    </motion.div>
  )
}


// FAQ Tab Component
function FAQTab({ items, editing, setEditing, isNew, setNew, onSave, onDelete }: {
  items: FAQItem[]
  editing: FAQItem | null
  setEditing: (f: FAQItem | null) => void
  isNew: boolean
  setNew: (b: boolean) => void
  onSave: (data: any) => void
  onDelete: (id: string) => void
}) {
  const [formData, setFormData] = useState({ question: '', answer: '', category: '', sort_order: 0, is_active: true })

  useEffect(() => {
    if (editing) setFormData({ question: editing.question, answer: editing.answer, category: editing.category || '', sort_order: editing.sort_order, is_active: editing.is_active })
    else if (isNew) setFormData({ question: '', answer: '', category: '', sort_order: 0, is_active: true })
  }, [editing, isNew])

  if (isNew || editing) {
    return (
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <div className="bg-card border border-border rounded-xl p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-heading text-foreground">{editing ? 'Edito FAQ' : 'Shto FAQ të Re'}</h3>
            <button onClick={() => { setEditing(null); setNew(false) }} className="p-2 hover:bg-muted rounded-lg"><X className="w-5 h-5" /></button>
          </div>
          <div className="space-y-4">
            <div><label className="block text-sm font-medium text-foreground mb-2">Pyetja *</label>
              <input type="text" value={formData.question} onChange={(e) => setFormData({ ...formData, question: e.target.value })}
                className="w-full px-4 py-2 bg-input-background border border-border rounded-lg text-foreground" />
            </div>
            <div><label className="block text-sm font-medium text-foreground mb-2">Përgjigja *</label>
              <textarea value={formData.answer} onChange={(e) => setFormData({ ...formData, answer: e.target.value })}
                className="w-full px-4 py-2 bg-input-background border border-border rounded-lg text-foreground resize-none" rows={4} />
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              <div><label className="block text-sm font-medium text-foreground mb-2">Kategoria</label>
                <input type="text" value={formData.category} onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full px-4 py-2 bg-input-background border border-border rounded-lg text-foreground" />
              </div>
              <div><label className="block text-sm font-medium text-foreground mb-2">Renditja</label>
                <input type="number" value={formData.sort_order} onChange={(e) => setFormData({ ...formData, sort_order: parseInt(e.target.value) || 0 })}
                  className="w-full px-4 py-2 bg-input-background border border-border rounded-lg text-foreground" />
              </div>
            </div>
          </div>
          <div className="flex justify-end gap-3 mt-6">
            <button onClick={() => { setEditing(null); setNew(false) }} className="px-4 py-2 text-muted-foreground">Anulo</button>
            <button onClick={() => onSave(formData)} disabled={!formData.question || !formData.answer} className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-lg hover:bg-primary/90 disabled:opacity-50">
              <Save className="w-4 h-4" />Ruaj
            </button>
          </div>
        </div>
      </motion.div>
    )
  }

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="grid gap-4">
      {items.map((item) => (
        <div key={item.id} className="bg-card border border-border rounded-xl p-4">
          <div className="flex items-start justify-between gap-4">
            <div><h3 className="font-heading text-foreground">{item.question}</h3><p className="text-sm text-muted-foreground mt-1 line-clamp-2">{item.answer}</p></div>
            <div className="flex items-center gap-2 shrink-0">
              <button onClick={() => setEditing(item)} className="p-2 hover:bg-muted rounded-lg text-muted-foreground hover:text-foreground"><Edit2 className="w-4 h-4" /></button>
              <button onClick={() => onDelete(item.id)} className="p-2 hover:bg-destructive/10 rounded-lg text-destructive"><Trash2 className="w-4 h-4" /></button>
            </div>
          </div>
        </div>
      ))}
    </motion.div>
  )
}


// Settings Tab Component
function SettingsTab({ contactInfos, socialLinks, editingContact, setEditingContact, editingSocial, setEditingSocial, newSocial, setNewSocial, onSaveContact, onSaveSocial, onDeleteSocial }: {
  contactInfos: ContactInfo[]
  socialLinks: SocialLink[]
  editingContact: ContactInfo | null
  setEditingContact: (c: ContactInfo | null) => void
  editingSocial: SocialLink | null
  setEditingSocial: (s: SocialLink | null) => void
  newSocial: boolean
  setNewSocial: (b: boolean) => void
  onSaveContact: (data: any) => void
  onSaveSocial: (data: any) => void
  onDeleteSocial: (id: string) => void
}) {
  const [contactForm, setContactForm] = useState({ title: '', details: [''], icon: '', color: 'accent-blue' })
  const [socialForm, setSocialForm] = useState({ platform: '', url: '', icon: '', is_active: true, sort_order: 0 })

  useEffect(() => {
    if (editingContact) setContactForm({ title: editingContact.title, details: editingContact.details, icon: editingContact.icon || '', color: editingContact.color })
  }, [editingContact])

  useEffect(() => {
    if (editingSocial) setSocialForm({ platform: editingSocial.platform, url: editingSocial.url, icon: editingSocial.icon || '', is_active: editingSocial.is_active, sort_order: editingSocial.sort_order })
    else if (newSocial) setSocialForm({ platform: '', url: '', icon: '', is_active: true, sort_order: 0 })
  }, [editingSocial, newSocial])

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-8">
      {/* Contact Info Section */}
      <div>
        <h2 className="text-lg font-heading text-foreground mb-4">Informacionet e Kontaktit</h2>
        
        {editingContact && (
          <div className="bg-card border border-border rounded-xl p-6 mb-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-heading text-foreground">Edito: {editingContact.title}</h3>
              <button onClick={() => setEditingContact(null)} className="p-2 hover:bg-muted rounded-lg"><X className="w-5 h-5" /></button>
            </div>
            <div className="space-y-4">
              <div><label className="block text-sm font-medium text-foreground mb-2">Titulli</label>
                <input type="text" value={contactForm.title} onChange={(e) => setContactForm({ ...contactForm, title: e.target.value })}
                  className="w-full px-4 py-2 bg-input-background border border-border rounded-lg text-foreground" />
              </div>
              <div><label className="block text-sm font-medium text-foreground mb-2">Detajet (një për rresht)</label>
                <textarea value={contactForm.details.join('\n')} onChange={(e) => setContactForm({ ...contactForm, details: e.target.value.split('\n') })}
                  className="w-full px-4 py-2 bg-input-background border border-border rounded-lg text-foreground resize-none" rows={3} />
              </div>
            </div>
            <div className="flex justify-end gap-3 mt-4">
              <button onClick={() => setEditingContact(null)} className="px-4 py-2 text-muted-foreground">Anulo</button>
              <button onClick={() => onSaveContact({ ...contactForm, info_type: editingContact.info_type })} className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-lg hover:bg-primary/90">
                <Save className="w-4 h-4" />Ruaj
              </button>
            </div>
          </div>
        )}

        <div className="grid sm:grid-cols-2 gap-4">
          {contactInfos.map((info) => (
            <div key={info.id} className="bg-card border border-border rounded-xl p-4">
              <div className="flex items-start justify-between">
                <div><h4 className="font-heading text-foreground">{info.title}</h4>
                  {info.details.map((d, i) => <p key={i} className="text-sm text-muted-foreground">{d}</p>)}
                </div>
                <button onClick={() => setEditingContact(info)} className="p-2 hover:bg-muted rounded-lg text-muted-foreground hover:text-foreground"><Edit2 className="w-4 h-4" /></button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Social Links Section */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-heading text-foreground">Rrjetet Sociale</h2>
          <button onClick={() => setNewSocial(true)} className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-3 py-1.5 rounded-lg text-sm hover:bg-primary/90">
            <Plus className="w-4 h-4" />Shto
          </button>
        </div>

        {(newSocial || editingSocial) && (
          <div className="bg-card border border-border rounded-xl p-6 mb-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-heading text-foreground">{editingSocial ? 'Edito' : 'Shto Rrjet të Re'}</h3>
              <button onClick={() => { setEditingSocial(null); setNewSocial(false) }} className="p-2 hover:bg-muted rounded-lg"><X className="w-5 h-5" /></button>
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              <div><label className="block text-sm font-medium text-foreground mb-2">Platforma *</label>
                <input type="text" value={socialForm.platform} onChange={(e) => setSocialForm({ ...socialForm, platform: e.target.value })}
                  className="w-full px-4 py-2 bg-input-background border border-border rounded-lg text-foreground" placeholder="p.sh. Facebook, Instagram" />
              </div>
              <div><label className="block text-sm font-medium text-foreground mb-2">URL *</label>
                <input type="url" value={socialForm.url} onChange={(e) => setSocialForm({ ...socialForm, url: e.target.value })}
                  className="w-full px-4 py-2 bg-input-background border border-border rounded-lg text-foreground" />
              </div>
            </div>
            <div className="flex justify-end gap-3 mt-4">
              <button onClick={() => { setEditingSocial(null); setNewSocial(false) }} className="px-4 py-2 text-muted-foreground">Anulo</button>
              <button onClick={() => onSaveSocial(socialForm)} disabled={!socialForm.platform || !socialForm.url} className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-lg hover:bg-primary/90 disabled:opacity-50">
                <Save className="w-4 h-4" />Ruaj
              </button>
            </div>
          </div>
        )}

        <div className="grid sm:grid-cols-3 gap-4">
          {socialLinks.map((link) => (
            <div key={link.id} className="bg-card border border-border rounded-xl p-4 flex items-center gap-4">
              <Globe className="w-6 h-6 text-muted-foreground" />
              <div className="flex-1"><h4 className="font-heading text-foreground">{link.platform}</h4></div>
              <div className="flex items-center gap-2">
                <button onClick={() => setEditingSocial(link)} className="p-2 hover:bg-muted rounded-lg text-muted-foreground hover:text-foreground"><Edit2 className="w-4 h-4" /></button>
                <button onClick={() => onDeleteSocial(link.id)} className="p-2 hover:bg-destructive/10 rounded-lg text-destructive"><Trash2 className="w-4 h-4" /></button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  )
}
