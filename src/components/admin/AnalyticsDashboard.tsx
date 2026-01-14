'use client'

import { useState, useEffect } from 'react'
import { supabase } from '@/integrations/supabase/client'
import { 
  Users, FileText, MessageSquare, TrendingUp, 
  Mail, Eye, Calendar, ArrowUpRight, ArrowDownRight 
} from 'lucide-react'
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts'

interface Stats {
  totalApplications: number
  pendingApplications: number
  approvedApplications: number
  totalContacts: number
  unreadContacts: number
  totalSubscribers: number
  totalTestimonials: number
  totalTeamMembers: number
}

interface ApplicationTrend {
  date: string
  count: number
}

export function AnalyticsDashboard() {
  const [stats, setStats] = useState<Stats>({
    totalApplications: 0,
    pendingApplications: 0,
    approvedApplications: 0,
    totalContacts: 0,
    unreadContacts: 0,
    totalSubscribers: 0,
    totalTestimonials: 0,
    totalTeamMembers: 0
  })
  const [applicationTrends, setApplicationTrends] = useState<ApplicationTrend[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchStats()
  }, [])

  const fetchStats = async () => {
    try {
      // Fetch applications
      const { data: applications } = await supabase
        .from('student_applications')
        .select('status, created_at')
      
      // Fetch contacts
      const { data: contacts } = await supabase
        .from('contact_messages')
        .select('is_read, created_at')
      
      // Fetch subscribers
      const { count: subscribersCount } = await supabase
        .from('newsletter_subscribers')
        .select('*', { count: 'exact', head: true })
        .eq('is_active', true)
      
      // Fetch testimonials
      const { count: testimonialsCount } = await supabase
        .from('testimonials')
        .select('*', { count: 'exact', head: true })
        .eq('is_active', true)
      
      // Fetch team members
      const { count: teamCount } = await supabase
        .from('team_members')
        .select('*', { count: 'exact', head: true })
        .eq('is_active', true)

      // Calculate stats
      const totalApplications = applications?.length || 0
      const pendingApplications = applications?.filter(a => a.status === 'pending').length || 0
      const approvedApplications = applications?.filter(a => a.status === 'approved').length || 0
      const totalContacts = contacts?.length || 0
      const unreadContacts = contacts?.filter(c => !c.is_read).length || 0

      setStats({
        totalApplications,
        pendingApplications,
        approvedApplications,
        totalContacts,
        unreadContacts,
        totalSubscribers: subscribersCount || 0,
        totalTestimonials: testimonialsCount || 0,
        totalTeamMembers: teamCount || 0
      })

      // Calculate trends (last 7 days)
      const last7Days = Array.from({ length: 7 }, (_, i) => {
        const date = new Date()
        date.setDate(date.getDate() - (6 - i))
        return date.toISOString().split('T')[0]
      })

      const trends = last7Days.map(date => ({
        date: new Date(date).toLocaleDateString('sq-AL', { weekday: 'short' }),
        count: applications?.filter(a => a.created_at.startsWith(date)).length || 0
      }))

      setApplicationTrends(trends)
    } catch (error) {
      console.error('Error fetching stats:', error)
    } finally {
      setLoading(false)
    }
  }

  const statCards = [
    {
      title: 'Aplikime Totale',
      value: stats.totalApplications,
      icon: FileText,
      color: 'bg-primary/10 text-primary',
      trend: '+12%',
      trendUp: true
    },
    {
      title: 'Në Pritje',
      value: stats.pendingApplications,
      icon: Calendar,
      color: 'bg-amber-500/10 text-amber-500',
      trend: `${stats.pendingApplications} aktive`,
      trendUp: null
    },
    {
      title: 'Mesazhe Kontakti',
      value: stats.totalContacts,
      icon: MessageSquare,
      color: 'bg-blue-500/10 text-blue-500',
      trend: `${stats.unreadContacts} të palexuara`,
      trendUp: null
    },
    {
      title: 'Abonentë Newsletter',
      value: stats.totalSubscribers,
      icon: Mail,
      color: 'bg-emerald-500/10 text-emerald-500',
      trend: '+8%',
      trendUp: true
    }
  ]

  const applicationStatusData = [
    { name: 'Në Pritje', value: stats.pendingApplications, color: 'hsl(var(--accent-amber))' },
    { name: 'Aprovuar', value: stats.approvedApplications, color: 'hsl(var(--accent-emerald))' },
    { name: 'Refuzuar', value: stats.totalApplications - stats.pendingApplications - stats.approvedApplications, color: 'hsl(var(--destructive))' }
  ].filter(d => d.value > 0)

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-8 h-8 border-4 border-primary/30 border-t-primary rounded-full animate-spin" />
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map((stat, index) => (
          <div key={index} className="bg-card border border-border rounded-xl p-5 hover:shadow-lg transition-shadow">
            <div className="flex items-start justify-between">
              <div className={`p-3 rounded-lg ${stat.color}`}>
                <stat.icon className="w-5 h-5" />
              </div>
              {stat.trendUp !== null && (
                <span className={`flex items-center text-sm ${stat.trendUp ? 'text-emerald-500' : 'text-destructive'}`}>
                  {stat.trendUp ? <ArrowUpRight className="w-4 h-4" /> : <ArrowDownRight className="w-4 h-4" />}
                  {stat.trend}
                </span>
              )}
              {stat.trendUp === null && (
                <span className="text-sm text-muted-foreground">{stat.trend}</span>
              )}
            </div>
            <div className="mt-4">
              <h3 className="text-3xl font-heading text-foreground">{stat.value}</h3>
              <p className="text-sm text-muted-foreground mt-1">{stat.title}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Applications Trend Chart */}
        <div className="lg:col-span-2 bg-card border border-border rounded-xl p-6">
          <h3 className="text-lg font-heading text-foreground mb-4 flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-primary" />
            Trendi i Aplikimeve (7 ditët e fundit)
          </h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={applicationTrends}>
                <defs>
                  <linearGradient id="colorCount" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="date" stroke="hsl(var(--muted-foreground))" />
                <YAxis stroke="hsl(var(--muted-foreground))" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'hsl(var(--card))', 
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px'
                  }}
                />
                <Area 
                  type="monotone" 
                  dataKey="count" 
                  stroke="hsl(var(--primary))" 
                  fillOpacity={1} 
                  fill="url(#colorCount)" 
                  strokeWidth={2}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Application Status Pie Chart */}
        <div className="bg-card border border-border rounded-xl p-6">
          <h3 className="text-lg font-heading text-foreground mb-4 flex items-center gap-2">
            <Eye className="w-5 h-5 text-primary" />
            Statusi i Aplikimeve
          </h3>
          <div className="h-64">
            {applicationStatusData.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={applicationStatusData}
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {applicationStatusData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            ) : (
              <div className="flex items-center justify-center h-full text-muted-foreground">
                Nuk ka të dhëna
              </div>
            )}
          </div>
          <div className="space-y-2 mt-4">
            {applicationStatusData.map((item, index) => (
              <div key={index} className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                  <span className="text-muted-foreground">{item.name}</span>
                </div>
                <span className="font-medium text-foreground">{item.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-card border border-border rounded-xl p-5">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-lg bg-purple-500/10">
              <Users className="w-5 h-5 text-purple-500" />
            </div>
            <div>
              <p className="text-2xl font-heading text-foreground">{stats.totalTeamMembers}</p>
              <p className="text-sm text-muted-foreground">Anëtarë Ekipi</p>
            </div>
          </div>
        </div>
        <div className="bg-card border border-border rounded-xl p-5">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-lg bg-pink-500/10">
              <MessageSquare className="w-5 h-5 text-pink-500" />
            </div>
            <div>
              <p className="text-2xl font-heading text-foreground">{stats.totalTestimonials}</p>
              <p className="text-sm text-muted-foreground">Testimoniale</p>
            </div>
          </div>
        </div>
        <div className="bg-card border border-border rounded-xl p-5">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-lg bg-cyan-500/10">
              <FileText className="w-5 h-5 text-cyan-500" />
            </div>
            <div>
              <p className="text-2xl font-heading text-foreground">{stats.approvedApplications}</p>
              <p className="text-sm text-muted-foreground">Aplikime të Aprovuara</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
