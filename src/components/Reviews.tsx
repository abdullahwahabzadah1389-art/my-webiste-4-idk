import { motion } from 'framer-motion'

const reviews = [
  { text: '"Incredibly professional! They mounted our 75-inch TV perfectly and concealed all the cables. The living room looks amazing now."', author: '— Sarah M., McKinney' },
  { text: '"On time, fair pricing, and the cleanest install I\'ve ever seen. They even helped me set up the sound system. Highly recommend!"', author: '— James R., Frisco' },
  { text: '"Best home service experience we\'ve had. Respectful, detailed work, and they explained everything. Will use again for our security cameras."', author: '— Linda K., Plano' },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    }
  }
}

const cardVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.95 },
  visible: { 
    opacity: 1, 
    y: 0, 
    scale: 1,
    transition: { 
      type: 'spring', 
      stiffness: 85, 
      damping: 15 
    } 
  }
}

export default function Reviews() {
  return (
    <section id="reviews" className="w-full py-24 px-4 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-center font-bold text-[#0a1628] text-3xl">What Our Customers Say</h2>
          <p className="text-center text-gray-500 mt-3">5.0 stars from 300+ reviews — one of the highest-rated in DFW.</p>
        </motion.div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-14"
        >
          {reviews.map((review) => (
            <motion.div 
              key={review.author} 
              variants={cardVariants}
              className="bg-gray-50 rounded-2xl p-7 border border-gray-100 hover:shadow-md transition-shadow"
            >
              <div className="text-[#c9a227] mb-3 text-sm">&#9733;&#9733;&#9733;&#9733;&#9733;</div>
              <p className="text-gray-700 text-sm italic leading-relaxed">{review.text}</p>
              <p className="text-[#0a1628] font-semibold mt-5 text-sm">{review.author}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
