'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { supabase } from '@/integrations/supabase/client'
import { MessageCircle, X, Send, Minimize2 } from 'lucide-react'
import { toast } from 'sonner'

interface ChatMessage {
  id: string
  message: string
  is_from_admin: boolean
  created_at: string
  sender_name?: string
}

export function LiveChat() {
  const [isOpen, setIsOpen] = useState(false)
  const [isMinimized, setIsMinimized] = useState(false)
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [newMessage, setNewMessage] = useState('')
  const [sessionId, setSessionId] = useState('')
  const [userInfo, setUserInfo] = useState({ name: '', email: '' })
  const [hasStarted, setHasStarted] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Generate or get session ID
    let storedSessionId = localStorage.getItem('chat_session_id')
    if (!storedSessionId) {
      storedSessionId = `chat_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
      localStorage.setItem('chat_session_id', storedSessionId)
    }
    setSessionId(storedSessionId)

    // Check for existing messages
    const storedName = localStorage.getItem('chat_user_name')
    const storedEmail = localStorage.getItem('chat_user_email')
    if (storedName && storedEmail) {
      setUserInfo({ name: storedName, email: storedEmail })
      setHasStarted(true)
      fetchMessages(storedSessionId)
    }
  }, [])

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const fetchMessages = async (sid: string) => {
    const { data } = await supabase
      .from('chat_messages')
      .select('*')
      .eq('session_id', sid)
      .order('created_at')

    if (data) {
      setMessages(data)
    }
  }

  const handleStartChat = (e: React.FormEvent) => {
    e.preventDefault()
    if (!userInfo.name || !userInfo.email) {
      toast.error('Ju lutem plotësoni emrin dhe emailin')
      return
    }
    
    localStorage.setItem('chat_user_name', userInfo.name)
    localStorage.setItem('chat_user_email', userInfo.email)
    setHasStarted(true)
    
    // Add welcome message
    const welcomeMessage: ChatMessage = {
      id: 'welcome',
      message: `Përshëndetje ${userInfo.name}! Si mund t'ju ndihmojmë sot?`,
      is_from_admin: true,
      created_at: new Date().toISOString(),
      sender_name: 'SHPE Support'
    }
    setMessages([welcomeMessage])
  }

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!newMessage.trim()) return

    const messageToSend = newMessage
    setNewMessage('')

    // Optimistic update
    const tempMessage: ChatMessage = {
      id: `temp_${Date.now()}`,
      message: messageToSend,
      is_from_admin: false,
      created_at: new Date().toISOString(),
      sender_name: userInfo.name
    }
    setMessages(prev => [...prev, tempMessage])

    // Save to database
    const { error } = await supabase
      .from('chat_messages')
      .insert({
        session_id: sessionId,
        message: messageToSend,
        sender_name: userInfo.name,
        sender_email: userInfo.email,
        is_from_admin: false
      })

    if (error) {
      toast.error('Mesazhi nuk u dërgua')
    }

    // Simulate auto-reply after 2 seconds
    setTimeout(() => {
      const autoReplies = [
        'Faleminderit për mesazhin! Do t\'ju përgjigjemi sa më shpejt të jetë e mundur.',
        'Pyetja juaj u regjistrua. Ekipi ynë do t\'ju kontaktojë brenda 24 orëve.',
        'Mirë se vini! Nëse keni pyetje urgjente, mund të na telefononi në +355 68 333 71 71.'
      ]
      
      const autoReply: ChatMessage = {
        id: `auto_${Date.now()}`,
        message: autoReplies[Math.floor(Math.random() * autoReplies.length)],
        is_from_admin: true,
        created_at: new Date().toISOString(),
        sender_name: 'SHPE Support'
      }
      setMessages(prev => [...prev, autoReply])
    }, 2000)
  }

  const formatTime = (dateString: string) => {
    return new Date(dateString).toLocaleTimeString('sq-AL', {
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  return (
    <>
      {/* Chat Button */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            onClick={() => setIsOpen(true)}
            className="fixed bottom-6 right-6 w-14 h-14 bg-primary text-primary-foreground rounded-full shadow-lg hover:bg-primary/90 transition-colors z-50 flex items-center justify-center"
          >
            <MessageCircle className="w-6 h-6" />
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-accent-emerald rounded-full animate-pulse" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ 
              opacity: 1, 
              y: 0, 
              scale: 1,
              height: isMinimized ? 'auto' : '500px'
            }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-6 right-6 w-96 max-w-[calc(100vw-3rem)] bg-card border border-border rounded-2xl shadow-2xl z-50 flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="bg-primary text-primary-foreground p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-primary-foreground/20 rounded-full flex items-center justify-center">
                  <MessageCircle className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-heading text-sm">Chat Live</h3>
                  <p className="text-xs text-primary-foreground/70">Online</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setIsMinimized(!isMinimized)}
                  className="p-2 hover:bg-primary-foreground/10 rounded-lg transition-colors"
                >
                  <Minimize2 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 hover:bg-primary-foreground/10 rounded-lg transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {!isMinimized && (
              <>
                {!hasStarted ? (
                  /* Start Chat Form */
                  <form onSubmit={handleStartChat} className="p-6 space-y-4">
                    <div className="text-center mb-4">
                      <h4 className="font-heading text-foreground">Filloni një Bisedë</h4>
                      <p className="text-sm text-muted-foreground">Plotësoni të dhënat për të vazhduar</p>
                    </div>
                    <div>
                      <input
                        type="text"
                        placeholder="Emri juaj"
                        value={userInfo.name}
                        onChange={(e) => setUserInfo({ ...userInfo, name: e.target.value })}
                        className="w-full px-4 py-3 bg-input-background border border-border rounded-lg text-foreground text-sm"
                        required
                      />
                    </div>
                    <div>
                      <input
                        type="email"
                        placeholder="Email"
                        value={userInfo.email}
                        onChange={(e) => setUserInfo({ ...userInfo, email: e.target.value })}
                        className="w-full px-4 py-3 bg-input-background border border-border rounded-lg text-foreground text-sm"
                        required
                      />
                    </div>
                    <button
                      type="submit"
                      className="w-full bg-primary text-primary-foreground py-3 rounded-lg hover:bg-primary/90 transition-colors font-medium"
                    >
                      Fillo Bisedën
                    </button>
                  </form>
                ) : (
                  <>
                    {/* Messages */}
                    <div className="flex-1 overflow-y-auto p-4 space-y-4">
                      {messages.map((msg) => (
                        <motion.div
                          key={msg.id}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className={`flex ${msg.is_from_admin ? 'justify-start' : 'justify-end'}`}
                        >
                          <div className={`max-w-[80%] ${
                            msg.is_from_admin 
                              ? 'bg-muted text-foreground' 
                              : 'bg-primary text-primary-foreground'
                          } rounded-2xl px-4 py-3`}>
                            {msg.is_from_admin && (
                              <p className="text-xs font-medium mb-1 opacity-70">
                                {msg.sender_name}
                              </p>
                            )}
                            <p className="text-sm">{msg.message}</p>
                            <p className={`text-xs mt-1 ${
                              msg.is_from_admin ? 'text-muted-foreground' : 'text-primary-foreground/70'
                            }`}>
                              {formatTime(msg.created_at)}
                            </p>
                          </div>
                        </motion.div>
                      ))}
                      <div ref={messagesEndRef} />
                    </div>

                    {/* Input */}
                    <form onSubmit={handleSendMessage} className="p-4 border-t border-border">
                      <div className="flex gap-2">
                        <input
                          type="text"
                          placeholder="Shkruani mesazhin..."
                          value={newMessage}
                          onChange={(e) => setNewMessage(e.target.value)}
                          className="flex-1 px-4 py-3 bg-input-background border border-border rounded-lg text-foreground text-sm"
                        />
                        <button
                          type="submit"
                          disabled={!newMessage.trim()}
                          className="bg-primary text-primary-foreground p-3 rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-50"
                        >
                          <Send className="w-5 h-5" />
                        </button>
                      </div>
                    </form>
                  </>
                )}
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
