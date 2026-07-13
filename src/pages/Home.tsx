import { useEffect } from 'react'
import { motion } from 'framer-motion'
import { ShieldCheck, Star, Zap, Sparkles } from 'lucide-react'
import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import Services from '@/components/Services'
import Features from '@/components/Features'
import About from '@/components/About'
import Gallery from '@/components/Gallery'
import ServiceArea from '@/components/ServiceArea'
import WhyChooseUs from '@/components/WhyChooseUs'
import Reviews from '@/components/Reviews'
import AppointmentForm from '@/components/AppointmentForm'
import FAQ from '@/components/FAQ'
import Contact from '@/components/Contact'
import Footer from '@/components/Footer'
import ChatWidget from '@/components/ChatWidget'
import SpeedDial from '@/components/SpeedDial'

const badgesContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    }
  }
}

const badgeVariants = {
  hidden: { opacity: 0, y: 25 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { 
      type: 'spring', 
      stiffness: 90, 
      damping: 14 
    } 
  }
}

export default function Home() {
  useEffect(() => {
    if (window.location.hash) {
      const id = window.location.hash.replace('#', '')
      const element = document.getElementById(id)
      if (element) {
        const timer = setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth' })
          // Clean up the hash from the address bar so that page refreshes start at the top
          window.history.replaceState(null, '', window.location.pathname)
        }, 150)
        return () => clearTimeout(timer)
      }
    }
  }, [])

  return (
    <main className="w-full bg-white text-gray-900">
      <Navbar />
      <Hero />
      <Features />
      <About />
      <Services />
      <Gallery />
      <ServiceArea />
      <WhyChooseUs />
      <Reviews />
      
      <section id="appointment" className="w-full py-24 px-4 bg-gray-50 text-gray-900 relative overflow-hidden">
        {/* Subtle dot matrix background */}
        <div 
          className="absolute inset-0 opacity-[0.4] pointer-events-none" 
          style={{
            backgroundImage: 'radial-gradient(#c9a227 1px, transparent 1px)',
            backgroundSize: '24px 24px'
          }}
        />

        {/* Large soft background blurs to frame the content */}
        <div className="absolute top-1/4 -left-48 w-96 h-96 bg-[#c9a227]/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-1/4 -right-48 w-96 h-96 bg-[#0a1628]/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="max-w-3xl mx-auto relative z-10">
          {/* Elegant Section Header */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center gap-1.5 bg-[#c9a227]/10 border border-[#c9a227]/20 text-[#0a1628] font-bold text-xs uppercase tracking-widest px-4 py-2 rounded-full mb-4">
              <Sparkles size={12} className="text-[#c9a227]" />
              <span>Easy Scheduling</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0a1628] tracking-tight">
              Book Your Premium Solution
            </h2>
            <p className="text-gray-600 mt-3 max-w-lg mx-auto text-sm sm:text-base">
              Select your preferred date and time. Our team will verify and confirm your service window in less than an hour.
            </p>
          </motion.div>

          {/* Centered Modern Appointment Box */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: 30 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ type: 'spring', stiffness: 85, damping: 15 }}
            className="bg-[#0a1628] rounded-[2rem] p-6 sm:p-10 md:p-12 shadow-2xl border border-[#c9a227]/30 relative overflow-hidden mb-12"
          >
            {/* Subtle background glow inside the box */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-[#c9a227]/5 rounded-full blur-3xl pointer-events-none" />
            
            <div className="relative z-10 bg-white rounded-2xl p-6 sm:p-10 shadow-2xl border border-gray-100 text-gray-900 text-left">
              <div className="mb-6 border-b border-gray-100 pb-5 text-center sm:text-left">
                <h3 className="font-extrabold text-2xl text-[#0a1628] tracking-tight">Request an Appointment</h3>
                <p className="text-gray-500 text-sm mt-1.5">Tell us what you need and we will confirm your preferred slot in less than 1 hour.</p>
              </div>
              <AppointmentForm />
            </div>
          </motion.div>

          {/* Modern Compact Trust Badges Row */}
          <motion.div 
            variants={badgesContainerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            <motion.div variants={badgeVariants} className="bg-white border border-gray-100 p-5 rounded-2xl shadow-sm flex items-start gap-4 text-left transition-all duration-300 hover:shadow-md">
              <div className="w-10 h-10 rounded-xl bg-green-50 flex items-center justify-center text-[#22c55e] shrink-0">
                <ShieldCheck size={20} className="stroke-[2.5]" />
              </div>
              <div>
                <h4 className="font-extrabold text-[#0a1628] text-sm leading-tight">Licensed & Insured</h4>
                <p className="text-gray-500 text-xs mt-1">Full liability coverage and certified expert installers.</p>
              </div>
            </motion.div>

            <motion.div variants={badgeVariants} className="bg-white border border-gray-100 p-5 rounded-2xl shadow-sm flex items-start gap-4 text-left transition-all duration-300 hover:shadow-md">
              <div className="w-10 h-10 rounded-xl bg-yellow-50 flex items-center justify-center text-[#c9a227] shrink-0">
                <Star size={20} className="fill-[#c9a227] stroke-[#c9a227]" />
              </div>
              <div>
                <h4 className="font-extrabold text-[#0a1628] text-sm leading-tight">5-Star Reputation</h4>
                <p className="text-gray-500 text-xs mt-1">Consistently rated 5.0 for quality, precision, and care.</p>
              </div>
            </motion.div>

            <motion.div variants={badgeVariants} className="bg-white border border-gray-100 p-5 rounded-2xl shadow-sm flex items-start gap-4 text-left transition-all duration-300 hover:shadow-md">
              <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-[#2979ff] shrink-0">
                <Zap size={20} className="stroke-[2.5]" />
              </div>
              <div>
                <h4 className="font-extrabold text-[#0a1628] text-sm leading-tight">Quick Confirmation</h4>
                <p className="text-gray-500 text-xs mt-1">Get immediate updates and instant slot verification.</p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>
      
      <FAQ />
      <Contact />
      <Footer />
      <SpeedDial />
      <ChatWidget />
    </main>
  )
}
