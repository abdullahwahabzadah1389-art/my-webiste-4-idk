import { motion } from 'framer-motion'
import { useBusinessStatus } from '@/hooks/useBusinessStatus'

export default function Hero() {
  const { isOpen, label } = useBusinessStatus()
  return (
    <header className="relative w-full pt-16 min-h-screen flex items-center justify-center overflow-hidden">
      <img className="absolute inset-0 w-full h-full object-cover object-center" loading="eager"
        src="/hero-bg-new.jpg"
        alt="Symmetrically centered luxury wall-mounted TV with warm LED backlight in a modern living room" />
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a1628]/85 via-[#0a1628]/55 to-[#0a1628]/95" />
      
      <motion.div 
        initial={{ opacity: 0, scale: 0.98, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="relative z-10 flex flex-col items-center justify-center text-center px-4 py-24 max-w-7xl mx-auto w-full"
      >
        <div className="flex items-center gap-2 mb-6">
          <span className="text-[#c9a227] text-lg">★★★★★</span>
          <span className="text-white/80 text-sm">5.0</span>
        </div>
        
        <h1 className="text-white font-bold max-w-4xl leading-tight text-4xl md:text-5xl lg:text-6xl text-balance">
          Trust TV Mounting &amp; Home Theater Installation
        </h1>
        
        <p className="text-white/70 mt-5 max-w-2xl leading-relaxed text-base md:text-lg">
          Expert installation serving McKinney, Frisco, Plano, Allen, Celina, Princeton, & the DFW area. Trusted by hundreds for professional, clean, and reliable service.
        </p>
        
        <div className="flex items-center gap-2 mt-5">
          <span className={`inline-block w-2 h-2 rounded-full animate-pulse ${isOpen ? 'bg-green-400' : 'bg-red-400'}`} />
          <span className={`text-sm ${isOpen ? 'text-green-300' : 'text-red-400'}`}>{label}</span>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4 mt-10">
          <a href="#appointment" className="bg-[#c9a227] hover:bg-[#e2be4a] text-[#0a1628] font-bold px-10 py-4 rounded-xl text-lg transition shadow-lg">
            Book Appointment
          </a>
          <a href="tel:4697933130" className="border-2 border-white/30 hover:border-[#c9a227] text-white font-semibold px-10 py-4 rounded-xl text-lg transition">
            Call (469) 793-3130
          </a>
        </div>
      </motion.div>
    </header>
  );
}
