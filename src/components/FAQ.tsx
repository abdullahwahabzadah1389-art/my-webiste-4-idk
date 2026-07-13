import { useState } from 'react'
import { motion } from 'framer-motion'
import { ChevronDown } from 'lucide-react'

const faqs = [
  { question: 'How much does TV mounting cost?', answer: 'TV mounting starts from $59. The final price depends on your wall type (drywall, brick, concrete, etc.), the TV size, and whether you need cable concealment or other add-ons. We provide a free estimate before any work begins — no surprise charges.' },
  { question: 'Do you offer same-day service?', answer: "Yes! We frequently offer same-day and next-day appointments across the DFW area. Give us a call or text at (469) 793-3130 and we'll find the earliest available slot for you." },
  { question: 'Can you mount a TV above a fireplace?', answer: 'Absolutely. Above-fireplace mounting is one of our specialties. We handle the heat clearance, stud finding in stone or brick, and cable concealment to make it look seamless and safe.' },
  { question: 'Do you conceal the cables?', answer: 'Yes! We offer in-wall cable concealment as an add-on to any mounting service. We run cables cleanly through the wall so there are zero visible wires — just a clean, professional look.' },
  { question: 'What TV sizes do you mount?', answer: 'We mount TVs of all sizes, from small 24" screens to massive 100"+ displays. We bring the appropriate mount and hardware for any size and weight.' },
  { question: 'What areas do you serve?', answer: 'We proudly serve McKinney, Frisco, Plano, Allen, Prosper, Celina, and the entire DFW metroplex. Not sure if we cover your area? Give us a call at (469) 793-3130!' },
  { question: 'Do you bring your own tools and hardware?', answer: "Yes! Our technicians arrive fully equipped with all necessary tools. If a specific mount or bracket is needed, we'll let you know in advance or can source it for you." },
 ]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
    }
  }
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { 
      type: 'spring', 
      stiffness: 100, 
      damping: 15 
    } 
  }
}

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)
  return (
    <section id="faq" className="w-full py-24 px-4 bg-white overflow-hidden">
      <div className="max-w-3xl mx-auto">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center font-bold text-[#0a1628] text-3xl"
        >
          Frequently Asked Questions
        </motion.h2>
        
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="mt-10 space-y-4"
        >
          {faqs.map((faq, i) => {
            const isOpen = openIndex === i
            return (
              <motion.div 
                key={faq.question} 
                variants={itemVariants}
                className="border border-gray-200 rounded-xl overflow-hidden"
              >
                <button className="w-full flex items-center justify-between p-5 text-left" aria-expanded={isOpen} onClick={() => setOpenIndex(isOpen ? null : i)}>
                  <span className="font-semibold text-[#0a1628]">{faq.question}</span>
                  <ChevronDown size={20} className="text-[#0a1628] transition-transform shrink-0" style={{ transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)' }} />
                </button>
                <div className="px-5 overflow-hidden transition-all duration-300" style={{ maxHeight: isOpen ? '300px' : '0', paddingBottom: isOpen ? '20px' : '0' }}>
                  <p className="text-gray-600 text-sm">{faq.answer}</p>
                </div>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}
