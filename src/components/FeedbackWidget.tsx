'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { supabase } from '@/integrations/supabase/client'
import { Star, MessageSquare, X, Send, CheckCircle } from 'lucide-react'
import { toast } from 'sonner'

export function FeedbackWidget() {
  const [isOpen, setIsOpen] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [feedback, setFeedback] = useState({
    category: '',
    rating: 0,
    comment: '',
    isAnonymous: true
  })

  const categories = [
    'Mësimdhënia',
    'Infrastruktura',
    'Aktivitetet',
    'Administrata',
    'Të përgjithshme'
  ]

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!feedback.category || feedback.rating === 0) {
      toast.error('Zgjidhni kategorinë dhe vlerësimin')
      return
    }

    setLoading(true)

    const { error } = await supabase
      .from('feedback_ratings')
      .insert({
        category: feedback.category,
        rating: feedback.rating,
        comment: feedback.comment || null,
        is_anonymous: feedback.isAnonymous
      })

    setLoading(false)

    if (error) {
      toast.error('Gabim gjatë dërgimit')
    } else {
      setSubmitted(true)
      toast.success('Faleminderit për feedback!')
    }
  }

  const handleClose = () => {
    setIsOpen(false)
    if (submitted) {
      setTimeout(() => {
        setSubmitted(false)
        setFeedback({ category: '', rating: 0, comment: '', isAnonymous: true })
      }, 300)
    }
  }

  return (
    <>
      {/* Feedback Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed left-0 top-1/2 -translate-y-1/2 bg-accent-purple text-white px-3 py-6 rounded-r-lg shadow-lg hover:bg-accent-purple/90 transition-colors z-40 flex flex-col items-center gap-2 writing-vertical"
        style={{ writingMode: 'vertical-rl', textOrientation: 'mixed' }}
      >
        <MessageSquare className="w-5 h-5 rotate-90" />
        <span className="text-sm font-medium">Feedback</span>
      </button>

      {/* Feedback Modal */}
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 bg-foreground/50 flex items-center justify-center z-50 p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-card border border-border rounded-2xl p-8 w-full max-w-md relative"
            >
              <button
                onClick={handleClose}
                className="absolute top-4 right-4 p-2 hover:bg-muted rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-muted-foreground" />
              </button>

              {submitted ? (
                <div className="text-center py-8">
                  <div className="w-16 h-16 bg-accent-emerald/20 rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle className="w-8 h-8 text-accent-emerald" />
                  </div>
                  <h3 className="text-2xl font-heading text-foreground mb-4">
                    Faleminderit!
                  </h3>
                  <p className="text-muted-foreground mb-6">
                    Vlerësimi juaj na ndihmon të përmirësojmë shërbimet tona.
                  </p>
                  <button
                    onClick={handleClose}
                    className="bg-primary text-primary-foreground px-6 py-3 rounded-lg hover:bg-primary/90"
                  >
                    Mbyll
                  </button>
                </div>
              ) : (
                <>
                  <div className="text-center mb-6">
                    <h3 className="text-2xl font-heading text-foreground">
                      Na jepni feedback
                    </h3>
                    <p className="text-muted-foreground mt-2">
                      Mendimi juaj na ndihmon të përmirësohemi
                    </p>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Category */}
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Kategoria *
                      </label>
                      <select
                        required
                        value={feedback.category}
                        onChange={(e) => setFeedback({ ...feedback, category: e.target.value })}
                        className="w-full px-4 py-3 bg-input-background border border-border rounded-lg text-foreground"
                      >
                        <option value="">Zgjidhni kategorinë</option>
                        {categories.map(cat => (
                          <option key={cat} value={cat}>{cat}</option>
                        ))}
                      </select>
                    </div>

                    {/* Rating */}
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Vlerësimi *
                      </label>
                      <div className="flex gap-2 justify-center">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <button
                            key={star}
                            type="button"
                            onClick={() => setFeedback({ ...feedback, rating: star })}
                            className="p-2 transition-transform hover:scale-110"
                          >
                            <Star
                              className={`w-8 h-8 ${
                                star <= feedback.rating
                                  ? 'fill-accent-orange text-accent-orange'
                                  : 'text-muted-foreground'
                              }`}
                            />
                          </button>
                        ))}
                      </div>
                      <p className="text-center text-sm text-muted-foreground mt-2">
                        {feedback.rating === 0 && 'Zgjidhni vlerësimin'}
                        {feedback.rating === 1 && 'Shumë dobët'}
                        {feedback.rating === 2 && 'Dobët'}
                        {feedback.rating === 3 && 'Mesatar'}
                        {feedback.rating === 4 && 'Mirë'}
                        {feedback.rating === 5 && 'Shkëlqyer'}
                      </p>
                    </div>

                    {/* Comment */}
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Komenti (opsional)
                      </label>
                      <textarea
                        rows={3}
                        value={feedback.comment}
                        onChange={(e) => setFeedback({ ...feedback, comment: e.target.value })}
                        className="w-full px-4 py-3 bg-input-background border border-border rounded-lg text-foreground resize-none"
                        placeholder="Shkruani komentet tuaja..."
                      />
                    </div>

                    {/* Anonymous */}
                    <label className="flex items-center gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={feedback.isAnonymous}
                        onChange={(e) => setFeedback({ ...feedback, isAnonymous: e.target.checked })}
                        className="w-5 h-5 text-primary border-border rounded"
                      />
                      <span className="text-sm text-foreground">Dërgo në mënyrë anonime</span>
                    </label>

                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full bg-accent-purple text-white font-semibold py-3 rounded-lg hover:bg-accent-purple/90 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
                    >
                      {loading ? (
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      ) : (
                        <>
                          <Send className="w-5 h-5" />
                          Dërgo Feedback
                        </>
                      )}
                    </button>
                  </form>
                </>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  )
}
