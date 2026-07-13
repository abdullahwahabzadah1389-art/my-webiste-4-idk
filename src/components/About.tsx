import { motion } from 'framer-motion'

const checklistLeft = [
  'TV Mounting',
  'Light Fixture Installation',
  'Chandelier Installation',
  'Smart Home System Installation',
]

const checklistRight = [
  'Electrical Outlet Installation',
  'Outdoor Lighting Installation',
  'Security Camera Installation',
  'Drywall & Painting Services',
]

export default function About() {
  return (
    <section className="w-full py-24 px-4 bg-gray-50 overflow-hidden">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        
        {/* Left Side: Images */}
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ type: 'spring', stiffness: 80, damping: 15 }}
          className="flex items-center gap-6"
        >
          <span className="hidden sm:block text-gray-400 text-xs font-semibold tracking-[0.3em] uppercase [writing-mode:vertical-lr] rotate-180">
            Years of Experience
          </span>
          <div className="relative flex-1 max-w-md">
            <img
              src="/gallery-tv-back.webp"
              alt="Technician attaching a TV to a wall mount bracket"
              className="w-full h-80 object-cover rounded-2xl shadow-lg"
            />
            <div className="absolute top-24 right-4 sm:top-28 sm:-right-20 bg-[#0a1628] text-white rounded-xl px-5 py-4 shadow-lg z-10">
              <p className="text-2xl font-bold text-[#c9a227]">10+</p>
              <p className="text-xs text-white/70 tracking-wide uppercase mt-0.5">Years Experience</p>
            </div>
            <img
              src="/gallery-cables.png"
              alt="Technician mounting a TV"
              className="hidden sm:block absolute -bottom-10 -right-10 w-2/3 h-48 object-cover rounded-2xl shadow-xl border-4 border-white"
            />
          </div>
        </motion.div>

        {/* Right Side: Content */}
        <motion.div 
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ type: 'spring', stiffness: 80, damping: 15 }}
          className="lg:pl-8"
        >
          <span className="inline-block bg-[#c9a227]/10 text-[#c9a227] text-xs font-semibold tracking-wide uppercase px-3 py-1.5 rounded-full">
            Resolving Every Need
          </span>
          <h2 className="font-bold text-[#0a1628] text-3xl sm:text-4xl mt-4">
            Trusted TV Mounting &amp; Home Solutions
          </h2>
          <p className="text-gray-500 mt-4 leading-relaxed">
            We provide professional TV mounting services to securely install your television for the best viewing experience. Along with that, we handle electrical, lighting, smart home, and drywall work to enhance the comfort and aesthetics of your space.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-3 mt-8">
            <ul className="space-y-3">
              {checklistLeft.map((item) => (
                <li key={item} className="flex items-center gap-2.5 text-gray-700 text-sm">
                  <span className="text-[#c9a227] font-bold">&#10003;</span>
                  {item}
                </li>
              ))}
            </ul>
            <ul className="space-y-3">
              {checklistRight.map((item) => (
                <li key={item} className="flex items-center gap-2.5 text-gray-700 text-sm">
                  <span className="text-[#c9a227] font-bold">&#10003;</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="flex flex-wrap items-center gap-6 mt-10">
            <a
              href="tel:+14697933130"
              className="bg-[#c9a227] text-[#0a1628] font-semibold px-7 py-3.5 rounded-lg hover:bg-[#b8921f] transition-colors"
            >
              Contact Us
            </a>
            <div>
              <p className="text-gray-500 text-sm">Have Any Questions?</p>
              <a href="tel:+14697933130" className="text-[#0a1628] font-bold">(469) 793-3130</a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
