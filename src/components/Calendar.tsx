'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'
import { Calendar as CalendarIcon, Clock, MapPin, ChevronLeft, ChevronRight } from 'lucide-react'

interface Event {
  id: number
  title: string
  date: string
  time: string
  location: string
  type: 'academic' | 'event' | 'holiday' | 'deadline'
  description: string
}

export function SchoolCalendar() {
  const [currentMonth, setCurrentMonth] = useState(new Date())

  const events: Event[] = [
    {
      id: 1,
      title: 'Fillimi i Vitit Shkollor',
      date: '2025-09-15',
      time: '08:00',
      location: 'Shkolla',
      type: 'academic',
      description: 'Ceremonia zyrtare e fillimit të vitit shkollor 2025-2026'
    },
    {
      id: 2,
      title: 'Dita e Mësuesit',
      date: '2025-03-07',
      time: '10:00',
      location: 'Salla e Konferencave',
      type: 'event',
      description: 'Festimi i Ditës Ndërkombëtare të Mësuesit'
    },
    {
      id: 3,
      title: 'Pushimet Dimërore',
      date: '2025-12-23',
      time: 'Tërë ditën',
      location: '-',
      type: 'holiday',
      description: 'Pushimet dimërore - 23 Dhjetor deri 8 Janar'
    },
    {
      id: 4,
      title: 'Afati i Regjistrimit',
      date: '2025-09-01',
      time: '16:00',
      location: 'Sekretaria',
      type: 'deadline',
      description: 'Afati i fundit për dorëzimin e dokumentave të regjistrimit'
    },
    {
      id: 5,
      title: 'Konkursi i Robotikës',
      date: '2025-11-15',
      time: '09:00',
      location: 'Laboratori TIK',
      type: 'event',
      description: 'Konkursi vjetor ndërshkollor i robotikës'
    },
    {
      id: 6,
      title: 'Provimet Gjysmëvjetore',
      date: '2026-01-20',
      time: '08:00',
      location: 'Shkolla',
      type: 'academic',
      description: 'Fillimi i provimeve të semestrit të parë'
    },
    {
      id: 7,
      title: 'Dita e Pavarësisë',
      date: '2025-11-28',
      time: 'Tërë ditën',
      location: '-',
      type: 'holiday',
      description: 'Pushim zyrtar - Dita e Pavarësisë'
    },
    {
      id: 8,
      title: 'Panair Karriere',
      date: '2025-10-20',
      time: '10:00',
      location: 'Oborri i Shkollës',
      type: 'event',
      description: 'Takime me biznese partnere dhe mundësi punësimi'
    },
    {
      id: 9,
      title: 'Mbarimi i Semestrit I',
      date: '2026-01-31',
      time: '-',
      location: '-',
      type: 'academic',
      description: 'Përfundimi zyrtar i semestrit të parë'
    },
    {
      id: 10,
      title: 'Fillimi i Semestrit II',
      date: '2026-02-10',
      time: '08:00',
      location: 'Shkolla',
      type: 'academic',
      description: 'Fillimi i semestrit të dytë'
    },
    {
      id: 11,
      title: 'Pushimet e Verës',
      date: '2026-06-15',
      time: 'Tërë ditën',
      location: '-',
      type: 'holiday',
      description: 'Fillimi i pushimeve verore'
    },
    {
      id: 12,
      title: 'Ceremonia e Diplomimit',
      date: '2026-06-10',
      time: '11:00',
      location: 'Salla e Madhe',
      type: 'event',
      description: 'Ceremonia e diplomimit për nxënësit e vitit të fundit'
    }
  ]

  const typeColors = {
    academic: 'bg-accent-blue/10 text-accent-blue border-accent-blue/30',
    event: 'bg-accent-emerald/10 text-accent-emerald border-accent-emerald/30',
    holiday: 'bg-accent-purple/10 text-accent-purple border-accent-purple/30',
    deadline: 'bg-accent-orange/10 text-accent-orange border-accent-orange/30'
  }

  const typeLabels = {
    academic: 'Akademik',
    event: 'Aktivitet',
    holiday: 'Pushim',
    deadline: 'Afat'
  }

  const months = [
    'Janar', 'Shkurt', 'Mars', 'Prill', 'Maj', 'Qershor',
    'Korrik', 'Gusht', 'Shtator', 'Tetor', 'Nëntor', 'Dhjetor'
  ]

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr)
    return `${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`
  }

  const upcomingEvents = events
    .filter(e => new Date(e.date) >= new Date())
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    .slice(0, 6)

  const navigateMonth = (direction: 'prev' | 'next') => {
    const newDate = new Date(currentMonth)
    newDate.setMonth(newDate.getMonth() + (direction === 'next' ? 1 : -1))
    setCurrentMonth(newDate)
  }

  // Get days in month
  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear()
    const month = date.getMonth()
    const firstDay = new Date(year, month, 1).getDay()
    const daysInMonth = new Date(year, month + 1, 0).getDate()
    
    const days: (number | null)[] = []
    // Add empty slots for days before first of month (adjust for Monday start)
    const adjustedFirstDay = firstDay === 0 ? 6 : firstDay - 1
    for (let i = 0; i < adjustedFirstDay; i++) {
      days.push(null)
    }
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(i)
    }
    return days
  }

  const getEventsForDay = (day: number) => {
    const year = currentMonth.getFullYear()
    const month = currentMonth.getMonth()
    const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`
    return events.filter(e => e.date === dateStr)
  }

  const days = getDaysInMonth(currentMonth)
  const weekDays = ['Hë', 'Ma', 'Më', 'En', 'Pr', 'Sh', 'Di']

  return (
    <section id="calendar" className="relative py-24 bg-gradient-to-b from-background via-muted/20 to-background overflow-hidden">
      
      <div className="container mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-3 mb-6">
            <CalendarIcon className="w-5 h-5 text-primary" />
            <span className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
              Kalendari Shkollor
            </span>
            <CalendarIcon className="w-5 h-5 text-primary" />
          </div>
          
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-heading leading-tight mb-6 text-foreground">
            <span className="block mb-2">Ngjarje & Data</span>
            <span className="block text-primary">TË RËNDËSISHME</span>
          </h2>
          
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Ndiqni kalendarin shkollor dhe mos humbisni asnjë ngjarje të rëndësishme
          </p>
        </motion.div>

        {/* Legend */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-4 mb-12"
        >
          {Object.entries(typeLabels).map(([key, label]) => (
            <div key={key} className="flex items-center gap-2">
              <div className={`w-3 h-3 rounded-full ${typeColors[key as keyof typeof typeColors].split(' ')[0].replace('/10', '')}`} />
              <span className="text-sm text-muted-foreground">{label}</span>
            </div>
          ))}
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8">
          
          {/* Calendar View */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-card rounded-2xl border border-border p-6 shadow-lg"
          >
            {/* Month Navigation */}
            <div className="flex items-center justify-between mb-6">
              <button
                onClick={() => navigateMonth('prev')}
                className="w-10 h-10 rounded-full bg-muted hover:bg-primary/10 flex items-center justify-center transition-colors"
              >
                <ChevronLeft className="w-5 h-5 text-foreground" />
              </button>
              
              <h3 className="text-xl font-heading text-foreground">
                {months[currentMonth.getMonth()]} {currentMonth.getFullYear()}
              </h3>
              
              <button
                onClick={() => navigateMonth('next')}
                className="w-10 h-10 rounded-full bg-muted hover:bg-primary/10 flex items-center justify-center transition-colors"
              >
                <ChevronRight className="w-5 h-5 text-foreground" />
              </button>
            </div>

            {/* Week Days */}
            <div className="grid grid-cols-7 gap-1 mb-2">
              {weekDays.map(day => (
                <div key={day} className="text-center text-sm font-medium text-muted-foreground py-2">
                  {day}
                </div>
              ))}
            </div>

            {/* Days Grid */}
            <div className="grid grid-cols-7 gap-1">
              {days.map((day, index) => {
                const dayEvents = day ? getEventsForDay(day) : []
                const isToday = day === new Date().getDate() && 
                  currentMonth.getMonth() === new Date().getMonth() &&
                  currentMonth.getFullYear() === new Date().getFullYear()
                
                return (
                  <div
                    key={index}
                    className={`aspect-square p-1 rounded-lg relative ${
                      day ? 'hover:bg-muted/50 cursor-pointer' : ''
                    } ${isToday ? 'bg-primary/10 ring-2 ring-primary' : ''}`}
                  >
                    {day && (
                      <>
                        <span className={`text-sm ${isToday ? 'text-primary font-bold' : 'text-foreground'}`}>
                          {day}
                        </span>
                        {dayEvents.length > 0 && (
                          <div className="absolute bottom-1 left-1/2 -translate-x-1/2 flex gap-0.5">
                            {dayEvents.slice(0, 3).map((event, i) => (
                              <div
                                key={i}
                                className={`w-1.5 h-1.5 rounded-full ${
                                  typeColors[event.type].split(' ')[0].replace('/10', '')
                                }`}
                              />
                            ))}
                          </div>
                        )}
                      </>
                    )}
                  </div>
                )
              })}
            </div>
          </motion.div>

          {/* Upcoming Events List */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            <h3 className="text-xl font-heading text-foreground mb-6">
              Ngjarjet e Ardhshme
            </h3>
            
            {upcomingEvents.map((event, index) => (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className={`bg-card rounded-xl border p-4 hover:shadow-md transition-all ${typeColors[event.type]}`}
              >
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-14 h-14 bg-background rounded-lg flex flex-col items-center justify-center border border-border">
                    <span className="text-xs text-muted-foreground">
                      {months[new Date(event.date).getMonth()].slice(0, 3)}
                    </span>
                    <span className="text-xl font-bold text-foreground">
                      {new Date(event.date).getDate()}
                    </span>
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2 mb-1">
                      <h4 className="font-heading text-foreground">{event.title}</h4>
                      <span className={`text-xs px-2 py-1 rounded-full ${typeColors[event.type]}`}>
                        {typeLabels[event.type]}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">{event.description}</p>
                    <div className="flex items-center gap-4 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {event.time}
                      </span>
                      {event.location !== '-' && (
                        <span className="flex items-center gap-1">
                          <MapPin className="w-3 h-3" />
                          {event.location}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Download Calendar CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <div className="bg-primary/5 rounded-2xl p-8 max-w-2xl mx-auto border border-primary/20">
            <h3 className="font-heading text-2xl text-foreground mb-4">
              Shkarkoni Kalendarin e Plotë
            </h3>
            <p className="text-muted-foreground mb-6">
              Merrni kalendarin shkollor të plotë në format PDF
            </p>
            <button className="inline-flex items-center gap-2 bg-primary text-primary-foreground font-semibold px-6 py-3 rounded-lg hover:bg-primary/90 transition-colors">
              <CalendarIcon className="w-5 h-5" />
              Shkarko PDF
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
