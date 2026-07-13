import { motion } from 'framer-motion'

const cities = [
  'Dallas', 'McKinney', 'Frisco', 'Plano', 'Allen', 'Prosper', 'Celina', 'Little Elm', 'The Colony', 'Lewisville', 'Flower Mound',
  'Carrollton', 'Addison', 'Richardson', 'Garland', 'Mesquite', 'Irving', 'Grapevine', 'Southlake', 'Colleyville', 'Coppell',
  'Farmers Branch', 'Rowlett', 'Sachse', 'Wylie', 'Murphy', 'Fairview', 'Anna', 'Melissa', 'Princeton', 'Denton', 'Highland Park',
  'University Park', 'Arlington', 'Fort Worth', 'Bedford', 'Euless', 'Hurst', 'North Richland Hills', 'Keller',
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.02,
    }
  }
}

const itemVariants = {
  hidden: { opacity: 0, scale: 0.8, y: 15 },
  visible: { 
    opacity: 1, 
    scale: 1, 
    y: 0,
    transition: { 
      type: 'spring', 
      stiffness: 120, 
      damping: 14 
    } 
  }
}

export default function ServiceArea() {
  return (
    <section className="w-full py-24 px-4 bg-white overflow-hidden">
      <div className="max-w-5xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-block bg-[#c9a227]/10 text-[#c9a227] text-xs font-semibold tracking-wide uppercase px-3 py-1.5 rounded-full">
            Where We Work
          </span>
          <h2 className="font-bold text-[#0a1628] text-3xl sm:text-4xl mt-4">
            Proudly Serving the Dallas-Fort Worth Metroplex
          </h2>
          <p className="text-gray-500 mt-3 max-w-xl mx-auto">
            Wherever you are in DFW, our team is ready to help. Here are just some of the cities we regularly serve:
          </p>
        </motion.div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="flex flex-wrap justify-center gap-3 mt-10"
        >
          {cities.map((city) => (
            <motion.span
              key={city}
              variants={itemVariants}
              className="bg-gray-50 border border-gray-100 text-gray-700 text-sm font-medium px-4 py-2 rounded-full hover:border-[#c9a227]/40 hover:text-[#0a1628] transition-colors"
            >
              {city}
            </motion.span>
          ))}
        </motion.div>

        <motion.p 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="text-gray-500 text-sm mt-10"
        >
          Don't see your city listed?{' '}
          <a href="#contact" className="text-[#c9a227] underline underline-offset-2 hover:text-yellow-600 transition-colors">
            Contact us
          </a>{' '}
          — we likely still serve your area.
        </motion.p>
      </div>
    </section>
  )
}
