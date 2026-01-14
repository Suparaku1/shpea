'use client'

import { useState, useEffect } from 'react'
import { supabase } from '@/integrations/supabase/client'
import { Bell, X, FileText, MessageSquare, Mail, Check } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { toast } from 'sonner'

interface Notification {
  id: string
  type: 'application' | 'contact' | 'newsletter'
  title: string
  message: string
  timestamp: Date
  read: boolean
}

export function AdminNotifications() {
  const [notifications, setNotifications] = useState<Notification[]>([])
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    // Subscribe to student applications
    const applicationsChannel = supabase
      .channel('admin_applications')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'student_applications'
        },
        (payload) => {
          const newApp = payload.new as { applicant_name: string; program: string; id: string }
          const notification: Notification = {
            id: `app-${newApp.id}`,
            type: 'application',
            title: 'Aplikim i Ri',
            message: `${newApp.applicant_name} aplikoi për ${newApp.program}`,
            timestamp: new Date(),
            read: false
          }
          setNotifications(prev => [notification, ...prev].slice(0, 20))
          
          toast.info('Aplikim i ri!', {
            description: notification.message,
            icon: <FileText className="w-4 h-4" />
          })
        }
      )
      .subscribe()

    // Subscribe to contact messages
    const contactsChannel = supabase
      .channel('admin_contacts')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'contact_messages'
        },
        (payload) => {
          const newContact = payload.new as { name: string; subject: string; id: string }
          const notification: Notification = {
            id: `contact-${newContact.id}`,
            type: 'contact',
            title: 'Mesazh i Ri Kontakti',
            message: `${newContact.name}: ${newContact.subject || 'Pa subjekt'}`,
            timestamp: new Date(),
            read: false
          }
          setNotifications(prev => [notification, ...prev].slice(0, 20))
          
          toast.info('Mesazh i ri!', {
            description: notification.message,
            icon: <MessageSquare className="w-4 h-4" />
          })
        }
      )
      .subscribe()

    // Subscribe to newsletter
    const newsletterChannel = supabase
      .channel('admin_newsletter')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'newsletter_subscribers'
        },
        (payload) => {
          const newSub = payload.new as { email: string; id: string }
          const notification: Notification = {
            id: `sub-${newSub.id}`,
            type: 'newsletter',
            title: 'Abonent i Ri',
            message: `${newSub.email} u abonua në newsletter`,
            timestamp: new Date(),
            read: false
          }
          setNotifications(prev => [notification, ...prev].slice(0, 20))
          
          toast.success('Abonent i ri!', {
            description: notification.message,
            icon: <Mail className="w-4 h-4" />
          })
        }
      )
      .subscribe()

    return () => {
      supabase.removeChannel(applicationsChannel)
      supabase.removeChannel(contactsChannel)
      supabase.removeChannel(newsletterChannel)
    }
  }, [])

  const unreadCount = notifications.filter(n => !n.read).length

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })))
  }

  const clearAll = () => {
    setNotifications([])
    setIsOpen(false)
  }

  const getIcon = (type: string) => {
    switch (type) {
      case 'application':
        return <FileText className="w-4 h-4 text-primary" />
      case 'contact':
        return <MessageSquare className="w-4 h-4 text-blue-500" />
      case 'newsletter':
        return <Mail className="w-4 h-4 text-emerald-500" />
      default:
        return <Bell className="w-4 h-4" />
    }
  }

  const formatTime = (date: Date) => {
    const now = new Date()
    const diff = now.getTime() - date.getTime()
    const minutes = Math.floor(diff / 60000)
    
    if (minutes < 1) return 'Tani'
    if (minutes < 60) return `${minutes} min më parë`
    const hours = Math.floor(minutes / 60)
    if (hours < 24) return `${hours} orë më parë`
    return date.toLocaleDateString('sq-AL')
  }

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 hover:bg-muted rounded-lg transition-colors"
      >
        <Bell className="w-5 h-5 text-muted-foreground" />
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 w-5 h-5 bg-destructive text-destructive-foreground text-xs rounded-full flex items-center justify-center">
            {unreadCount > 9 ? '9+' : unreadCount}
          </span>
        )}
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            <div 
              className="fixed inset-0 z-40" 
              onClick={() => setIsOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.95 }}
              className="absolute right-0 top-full mt-2 w-80 bg-card border border-border rounded-xl shadow-xl z-50 overflow-hidden"
            >
              <div className="p-3 border-b border-border flex items-center justify-between">
                <h3 className="font-heading text-sm text-foreground">Njoftimet</h3>
                <div className="flex items-center gap-2">
                  {unreadCount > 0 && (
                    <button
                      onClick={markAllAsRead}
                      className="text-xs text-primary hover:underline"
                    >
                      Shëno të lexuara
                    </button>
                  )}
                  {notifications.length > 0 && (
                    <button
                      onClick={clearAll}
                      className="p-1 hover:bg-muted rounded"
                    >
                      <X className="w-4 h-4 text-muted-foreground" />
                    </button>
                  )}
                </div>
              </div>

              <div className="max-h-96 overflow-y-auto">
                {notifications.length === 0 ? (
                  <div className="p-8 text-center text-muted-foreground">
                    <Bell className="w-8 h-8 mx-auto mb-2 opacity-50" />
                    <p className="text-sm">Nuk ka njoftime</p>
                  </div>
                ) : (
                  <div className="divide-y divide-border">
                    {notifications.map((notification) => (
                      <div
                        key={notification.id}
                        className={`p-3 hover:bg-muted/50 transition-colors ${
                          !notification.read ? 'bg-primary/5' : ''
                        }`}
                      >
                        <div className="flex gap-3">
                          <div className="p-2 rounded-lg bg-muted">
                            {getIcon(notification.type)}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between gap-2">
                              <span className="font-medium text-sm text-foreground">
                                {notification.title}
                              </span>
                              {!notification.read && (
                                <div className="w-2 h-2 bg-primary rounded-full" />
                              )}
                            </div>
                            <p className="text-xs text-muted-foreground truncate">
                              {notification.message}
                            </p>
                            <span className="text-xs text-muted-foreground">
                              {formatTime(notification.timestamp)}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  )
}
