import { motion } from 'framer-motion'
import { Tv, Wrench, Shield, Heart } from 'lucide-react'

interface StatItem {
  id: string
  number: string
  label: string
  sublabel: string
  icon: React.ComponentType<any>
}

const stats: StatItem[] = [
  {
    id: 'projects',
    number: '10K+',
    label: 'SERVICE PROJECTS',
    sublabel: 'Successfully completed',
    icon: Tv,
  },
  {
    id: 'services',
    number: '9+',
    label: 'TYPES OF SERVICES',
    sublabel: 'Custom home solutions',
    icon: Wrench,
  },
  {
    id: 'experts',
    number: '5+',
    label: 'EXPERT INSTALLERS',
    sublabel: 'Highly trained pros',
    icon: Shield,
  },
  {
    id: 'satisfaction',
    number: '100%',
    label: 'CLIENTS SATISFACTION',
    sublabel: '5-star reviewed',
    icon: Heart,
  },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: 'spring',
      stiffness: 100,
      damping: 15,
    },
  },
}

export default function Stats() {
  return (
    <section className="relative w-full overflow-hidden bg-gradient-to-b from-white to-gray-50 py-4 px-4">
      <div className="max-w-5xl mx-auto">
        {/* Overlapping Glassmorphic Stats Container */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          style={{ backgroundColor: '#0a1331' }}
          className="relative z-10 glass-card-dark rounded-[1.5rem] p-4 md:p-6 shadow-depth-dark overflow-hidden"
        >
          {/* Decorative Background Elements */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-[#c9a227]/5 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-10 -left-10 w-80 h-80 bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-2 relative z-10">
            {stats.map((stat, idx) => {
              const Icon = stat.icon
              return (
                <motion.div
                  key={stat.id}
                  variants={itemVariants}
                  className={`flex flex-col items-center text-center p-3 rounded-lg transition-all duration-300 hover:bg-white/5 ${
                    idx !== stats.length - 1 ? 'lg:border-r lg:border-white/10' : ''
                  }`}
                >
                  {/* Premium Icon Badge */}
                  <div className="w-10 h-10 rounded-lg bg-[#c9a227]/10 flex items-center justify-center text-[#c9a227] mb-2 border border-[#c9a227]/20 shadow-inner">
                    <Icon className="w-5 h-5 stroke-[1.75]" />
                  </div>

                  {/* Stat Number */}
                  <span className="font-extrabold text-white text-2xl md:text-3xl tracking-tight mb-0.5 tabular-nums">
                    {stat.number}
                  </span>

                  {/* Label */}
                  <span className="text-[#c9a227] font-bold text-[9px] tracking-widest uppercase mb-0.5">
                    {stat.label}
                  </span>

                  {/* Sublabel */}
                  <span className="text-white/60 text-[10px] font-medium">
                    {stat.sublabel}
                  </span>
                </motion.div>
              )
            })}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
