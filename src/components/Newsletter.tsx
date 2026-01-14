'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { supabase } from '@/integrations/supabase/client'
import { Mail, Send, CheckCircle } from 'lucide-react'
import { toast } from 'sonner'

export function Newsletter() {
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [loading, setLoading] = useState(false)
  const [subscribed, setSubscribed] = useState(false)

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!email) {
      toast.error('Ju lutem shkruani emailin')
      return
    }

    setLoading(true)

    const { error } = await supabase
      .from('newsletter_subscribers')
      .insert({
        email,
        full_name: name || null,
        is_active: true
      })

    setLoading(false)

    if (error) {
      if (error.code === '23505') {
        toast.error('Ky email është regjistruar tashmë')
      } else {
        toast.error('Gabim gjatë regjistrimit')
      }
    } else {
      setSubscribed(true)
      toast.success('U regjistruat me sukses!')
    }
  }

  if (subscribed) {
    return (
      <section className="py-16 bg-gradient-to-r from-primary/10 via-accent-purple/10 to-accent-emerald/10">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="max-w-2xl mx-auto text-center"
          >
            <div className="w-16 h-16 bg-accent-emerald/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-8 h-8 text-accent-emerald" />
            </div>
            <h3 className="text-2xl font-heading text-foreground mb-4">
              Faleminderit për Abonimin!
            </h3>
            <p className="text-muted-foreground">
              Do të merrni lajmet më të fundit nga shkolla jonë direkt në emailin tuaj.
            </p>
          </motion.div>
        </div>
      </section>
    )
  }

  return (
    <section className="py-16 bg-gradient-to-r from-primary/10 via-accent-purple/10 to-accent-emerald/10">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto"
        >
          <div className="bg-card border border-border rounded-2xl p-8 md:p-12">
            <div className="text-center mb-8">
              <div className="inline-flex items-center gap-2 bg-primary/20 text-primary px-4 py-2 rounded-full mb-6">
                <Mail className="w-5 h-5" />
                <span className="font-medium text-sm">Newsletter</span>
              </div>
              
              <h3 className="text-3xl font-heading text-foreground mb-4">
                Merrni Lajmet në Email
              </h3>
              <p className="text-muted-foreground">
                Regjistrohuni për të marrë njoftimet më të fundit, ngjarjet dhe lajmet e shkollës direkt në emailin tuaj.
              </p>
            </div>

            <form onSubmit={handleSubscribe} className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="Emri juaj (opsional)"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-3 bg-input-background border border-border rounded-lg focus:ring-2 focus:ring-primary/50 focus:border-primary text-foreground"
                />
                <input
                  type="email"
                  required
                  placeholder="Email *"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 bg-input-background border border-border rounded-lg focus:ring-2 focus:ring-primary/50 focus:border-primary text-foreground"
                />
              </div>
              
              <button
                type="submit"
                disabled={loading}
                className="w-full md:w-auto bg-primary text-primary-foreground font-semibold px-8 py-3 rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-50 flex items-center justify-center gap-2 mx-auto"
              >
                {loading ? (
                  <div className="w-5 h-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                ) : (
                  <>
                    <Send className="w-5 h-5" />
                    Abonohu
                  </>
                )}
              </button>
              
              <p className="text-xs text-muted-foreground text-center">
                Duke u regjistruar, pranoni të merrni email nga SHPE. Mund të çabonoheni në çdo kohë.
              </p>
            </form>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
