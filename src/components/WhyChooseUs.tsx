import { motion } from 'framer-motion'

const reasons = [
  { title: 'Professional & Licensed', description: 'Trained technicians who treat every job with expert precision.' },
  { title: 'Always Punctual', description: 'We arrive on time, every time. Your schedule is respected.' },
  { title: 'Clean Workmanship', description: 'We leave your home spotless — no mess, no dust, no debris.' },
  { title: 'Respectful Service', description: 'Courteous, friendly, and mindful of your space and belongings.' },
  { title: 'Detailed Installation', description: 'Every cable is hidden, every mount is level, every detail perfect.' },
  { title: 'Great Pricing', description: 'Transparent, competitive rates with no hidden fees or surprises.' },
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

const cardVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  visible: { 
    opacity: 1, 
    y: 0, 
    scale: 1,
    transition: { 
      type: 'spring', 
      stiffness: 90, 
      damping: 15 
    } 
  }
}

export default function WhyChooseUs() {
  return (
    <section className="w-full py-24 px-4 bg-[#0a1628] overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-center font-bold text-white text-3xl">Why Choose Us</h2>
          <p className="text-center text-white/50 mt-3">Trusted by hundreds of homeowners across the DFW area.</p>
        </motion.div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-14"
        >
          {reasons.map((reason) => (
            <motion.div 
              key={reason.title} 
              variants={cardVariants}
              className="bg-[#142035] rounded-2xl p-6 border border-white/5 hover:border-white/10 transition-colors"
            >
              <div className="text-[#c9a227] text-xl mb-3">&#10003;</div>
              <h3 className="text-white font-semibold text-lg">{reason.title}</h3>
              <p className="text-white/50 text-sm mt-2">{reason.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
