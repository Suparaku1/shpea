'use client'

import { useState, useEffect } from 'react'
import { supabase } from '@/integrations/supabase/client'
import { Mail, MailOpen, Trash2, Clock, User } from 'lucide-react'
import { toast } from 'sonner'
import { motion, AnimatePresence } from 'framer-motion'

interface ContactMessage {
  id: string
  name: string
  email: string
  subject: string | null
  message: string
  is_read: boolean
  created_at: string
}

export function ContactMessagesTab() {
  const [messages, setMessages] = useState<ContactMessage[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedMessage, setSelectedMessage] = useState<ContactMessage | null>(null)

  useEffect(() => {
    fetchMessages()
    
    // Set up realtime subscription
    const channel = supabase
      .channel('contact_messages_changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'contact_messages'
        },
        (payload) => {
          if (payload.eventType === 'INSERT') {
            setMessages(prev => [payload.new as ContactMessage, ...prev])
            toast.info('Mesazh i ri kontakti!', {
              description: `Nga: ${(payload.new as ContactMessage).name}`
            })
          } else if (payload.eventType === 'DELETE') {
            setMessages(prev => prev.filter(m => m.id !== payload.old.id))
          } else if (payload.eventType === 'UPDATE') {
            setMessages(prev => prev.map(m => 
              m.id === payload.new.id ? payload.new as ContactMessage : m
            ))
          }
        }
      )
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [])

  const fetchMessages = async () => {
    const { data, error } = await supabase
      .from('contact_messages')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) {
      toast.error('Gabim në ngarkimin e mesazheve')
    } else {
      setMessages(data || [])
    }
    setLoading(false)
  }

  const markAsRead = async (id: string) => {
    const { error } = await supabase
      .from('contact_messages')
      .update({ is_read: true })
      .eq('id', id)

    if (error) {
      toast.error('Gabim në përditësim')
    }
  }

  const deleteMessage = async (id: string) => {
    if (!confirm('Jeni të sigurt që doni të fshini këtë mesazh?')) return

    const { error } = await supabase
      .from('contact_messages')
      .delete()
      .eq('id', id)

    if (error) {
      toast.error('Gabim në fshirje')
    } else {
      toast.success('Mesazhi u fshi')
      setSelectedMessage(null)
    }
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()
    const diff = now.getTime() - date.getTime()
    const hours = Math.floor(diff / (1000 * 60 * 60))
    const days = Math.floor(hours / 24)

    if (hours < 1) return 'Pak më parë'
    if (hours < 24) return `${hours} orë më parë`
    if (days < 7) return `${days} ditë më parë`
    return date.toLocaleDateString('sq-AL')
  }

  const unreadCount = messages.filter(m => !m.is_read).length

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-8 h-8 border-4 border-primary/30 border-t-primary rounded-full animate-spin" />
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Messages List */}
      <div className="lg:col-span-1 bg-card border border-border rounded-xl overflow-hidden">
        <div className="p-4 border-b border-border flex items-center justify-between">
          <h3 className="font-heading text-foreground">Mesazhet</h3>
          {unreadCount > 0 && (
            <span className="bg-primary text-primary-foreground text-xs px-2 py-1 rounded-full">
              {unreadCount} të reja
            </span>
          )}
        </div>
        
        <div className="max-h-[600px] overflow-y-auto divide-y divide-border">
          {messages.length === 0 ? (
            <div className="p-8 text-center text-muted-foreground">
              <Mail className="w-12 h-12 mx-auto mb-3 opacity-50" />
              <p>Nuk ka mesazhe</p>
            </div>
          ) : (
            <AnimatePresence>
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  onClick={() => {
                    setSelectedMessage(message)
                    if (!message.is_read) markAsRead(message.id)
                  }}
                  className={`p-4 cursor-pointer transition-colors hover:bg-muted/50 ${
                    selectedMessage?.id === message.id ? 'bg-muted' : ''
                  } ${!message.is_read ? 'bg-primary/5' : ''}`}
                >
                  <div className="flex items-start gap-3">
                    <div className={`p-2 rounded-lg ${!message.is_read ? 'bg-primary/10' : 'bg-muted'}`}>
                      {message.is_read ? (
                        <MailOpen className="w-4 h-4 text-muted-foreground" />
                      ) : (
                        <Mail className="w-4 h-4 text-primary" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2">
                        <span className={`font-medium truncate ${!message.is_read ? 'text-foreground' : 'text-muted-foreground'}`}>
                          {message.name}
                        </span>
                        <span className="text-xs text-muted-foreground whitespace-nowrap">
                          {formatDate(message.created_at)}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground truncate">
                        {message.subject || message.message.substring(0, 50)}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          )}
        </div>
      </div>

      {/* Message Detail */}
      <div className="lg:col-span-2 bg-card border border-border rounded-xl overflow-hidden">
        {selectedMessage ? (
          <div className="h-full flex flex-col">
            <div className="p-4 border-b border-border flex items-center justify-between">
              <div>
                <h3 className="font-heading text-foreground">{selectedMessage.subject || 'Pa subjekt'}</h3>
                <p className="text-sm text-muted-foreground">Nga: {selectedMessage.name}</p>
              </div>
              <button
                onClick={() => deleteMessage(selectedMessage.id)}
                className="p-2 text-destructive hover:bg-destructive/10 rounded-lg transition-colors"
              >
                <Trash2 className="w-5 h-5" />
              </button>
            </div>
            
            <div className="p-6 flex-1">
              <div className="space-y-4">
                <div className="flex items-center gap-4 text-sm">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <User className="w-4 h-4" />
                    {selectedMessage.email}
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Clock className="w-4 h-4" />
                    {new Date(selectedMessage.created_at).toLocaleString('sq-AL')}
                  </div>
                </div>
                
                <div className="bg-muted/50 rounded-lg p-4">
                  <p className="text-foreground whitespace-pre-wrap">{selectedMessage.message}</p>
                </div>
                
                <div className="flex gap-2">
                  <a
                    href={`mailto:${selectedMessage.email}?subject=Re: ${selectedMessage.subject || 'Mesazhi juaj'}`}
                    className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors"
                  >
                    <Mail className="w-4 h-4" />
                    Përgjigju me Email
                  </a>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="h-full flex items-center justify-center p-8 text-center text-muted-foreground">
            <div>
              <Mail className="w-16 h-16 mx-auto mb-4 opacity-30" />
              <p className="text-lg">Zgjidhni një mesazh për të parë detajet</p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
