import { motion } from 'framer-motion'
import { CheckCircle2, Clock, Headphones, LayoutGrid, Building2, DollarSign } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

interface Feature { icon: LucideIcon; title: string; description: string }

const features: Feature[] = [
  { icon: CheckCircle2, title: 'Certified Experts', description: 'Skilled and certified technicians ensuring quality and safe service every time.' },
  { icon: Clock, title: 'Quick Response', description: 'Fast and reliable service to handle your needs without delay.' },
  { icon: Headphones, title: 'Support 24/7', description: 'Available around the clock to assist you whenever you need help.' },
  { icon: LayoutGrid, title: 'Variety of Services', description: 'Multiple services under one roof to meet all your home needs easily.' },
  { icon: Building2, title: 'Industrial Services', description: 'Reliable, professional solutions for large-scale and commercial projects.' },
  { icon: DollarSign, title: 'Cost Effective Service', description: 'High-quality service at competitive prices, with no hidden fees.' },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
    }
  }
}

const itemVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  visible: { 
    opacity: 1, 
    y: 0, 
    scale: 1,
    transition: { 
      type: 'spring', 
      stiffness: 100, 
      damping: 16 
    } 
  }
}

export default function Features() {
  return (
    <section id="features" className="w-full py-24 px-4 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6"
        >
          <div>
            <span className="inline-block bg-[#c9a227]/10 text-[#c9a227] text-xs font-semibold tracking-wide uppercase px-3 py-1.5 rounded-full">
              Trust TV Features
            </span>
            <h2 className="font-bold text-[#0a1628] text-3xl sm:text-4xl mt-4 max-w-xl">
              We provide professional TV mounting &amp; home services
            </h2>
          </div>
          <p className="text-gray-500 max-w-sm">
            From TV mounting and home theater setups to electrical, lighting, and drywall work — we handle it all with certified expertise and fast, friendly service.
          </p>
        </motion.div>
        
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-14"
        >
          {features.map((f) => {
            const Icon = f.icon
            return (
              <motion.div 
                key={f.title} 
                variants={itemVariants}
                className="bg-gray-50 rounded-2xl p-7 border border-gray-100 hover:shadow-md transition-shadow"
              >
                <div className="w-11 h-11 bg-white rounded-xl flex items-center justify-center mb-5 shadow-sm">
                  <Icon size={20} className="text-[#0a1628]" />
                </div>
                <h3 className="font-semibold text-[#0a1628] text-lg">{f.title}</h3>
                <p className="text-gray-500 text-sm mt-2 leading-relaxed">{f.description}</p>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}
