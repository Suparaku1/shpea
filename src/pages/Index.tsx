import { Hero } from '@/components/Hero'
import { About } from '@/components/About'
import { Programs } from '@/components/Programs'
import { Staff } from '@/components/Staff'
import { Registration } from '@/components/Registration'
import { Gallery } from '@/components/Gallery'
import { SchoolCalendar } from '@/components/Calendar'
import { News } from '@/components/News'
import { Partners } from '@/components/Partners'
import { FAQ } from '@/components/FAQ'
import { Contact } from '@/components/Contact'
import { Footer } from '@/components/Footer'
import { Newsletter } from '@/components/Newsletter'
import { LiveChat } from '@/components/LiveChat'
import { FeedbackWidget } from '@/components/FeedbackWidget'
import { Testimonials } from '@/components/Testimonials'
import { Achievements } from '@/components/Achievements'
import { VideoPresentation } from '@/components/VideoPresentation'
import { Timeline } from '@/components/Timeline'
import { StudentApplication } from '@/components/StudentApplication'

export default function Index() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <main className="relative" role="main">
        <section id="hero" aria-label="Hero section">
          <Hero />
        </section>
        <section id="achievements-section" aria-label="Achievements section">
          <Achievements />
        </section>
        <section id="about-section" aria-label="About section">
          <About />
        </section>
        <section id="video-section" aria-label="Video presentation section">
          <VideoPresentation />
        </section>
        <section id="programs-section" aria-label="Programs section">
          <Programs />
        </section>
        <section id="application-section" aria-label="Student application section">
          <StudentApplication />
        </section>
        <section id="testimonials-section" aria-label="Testimonials section">
          <Testimonials />
        </section>
        <section id="timeline-section" aria-label="Timeline section">
          <Timeline />
        </section>
        <section id="registration-section" aria-label="Registration section">
          <Registration />
        </section>
        <section id="staff-section" aria-label="Staff section">
          <Staff />
        </section>
        <section id="gallery-section" aria-label="Gallery section">
          <Gallery />
        </section>
        <section id="calendar-section" aria-label="Calendar section">
          <SchoolCalendar />
        </section>
        <section id="news-section" aria-label="News section">
          <News />
        </section>
        <section id="partners-section" aria-label="Partners section">
          <Partners />
        </section>
        <section id="faq-section" aria-label="FAQ section">
          <FAQ />
        </section>
        <Newsletter />
        <section id="contact-section" aria-label="Contact section">
          <Contact />
        </section>
      </main>
      <Footer />
      <LiveChat />
      <FeedbackWidget />
    </div>
  )
}
