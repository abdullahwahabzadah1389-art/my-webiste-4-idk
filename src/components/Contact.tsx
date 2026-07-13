import { useState, FormEvent } from 'react'
import { motion } from 'framer-motion'
import { Phone, Mail, MapPin, Clock } from 'lucide-react'
import { useBusinessStatus } from '@/hooks/useBusinessStatus'
import { useCreateContactRequest } from '@/lib/api'

function InstagramIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#c9a227" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill="#c9a227" stroke="none" />
    </svg>
  )
}

export default function Contact() {
  const { isOpen, label } = useBusinessStatus()
  const [sent, setSent] = useState(false)
  const [error, setError] = useState('')
  const { mutate, isPending } = useCreateContactRequest()

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setError('')
    const f = e.currentTarget
    const name = (f.elements.namedItem('name') as HTMLInputElement).value
    const phone = (f.elements.namedItem('phone') as HTMLInputElement).value
    const email = (f.elements.namedItem('email') as HTMLInputElement).value
    const details = (f.elements.namedItem('details') as HTMLTextAreaElement).value

    if (!email && !phone) {
      setError('Please provide an email address or a phone number.')
      return
    }

    mutate(
      { data: { name, phone: phone || undefined, email: email || undefined, details } },
      {
         onSuccess: () => {
          setSent(true)
          f.reset()
        },
        onError: () => setError('Something went wrong. Please call us at (469) 793-3130.'),
      },
    )
  }

  return (
    <section id="contact" className="w-full py-24 px-4 pb-0 bg-[#0a1628] overflow-hidden">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12">
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ type: 'spring', stiffness: 80, damping: 15 }}
        >
          <h2 className="font-bold text-white text-3xl">Get In Touch</h2>
          <div className="mt-6 space-y-4">
            <div className="flex items-center gap-3">
              <Phone size={20} className="text-[#c9a227] shrink-0" />
              <a href="tel:4697933130" className="text-white hover:text-[#c9a227] transition">(469) 793-3130</a>
            </div>
            <div className="flex items-center gap-3">
              <Mail size={20} className="text-[#c9a227] shrink-0" />
              <a href="mailto:trusttvmountingservices@gmail.com" className="text-white hover:text-[#c9a227] transition">trusttvmountingservices@gmail.com</a>
            </div>
            <div className="flex items-center gap-3">
              <a href="https://maps.app.goo.gl/dfUSphGaVdf597n37" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 hover:text-[#c9a227] transition">
                <MapPin size={20} className="text-[#c9a227] shrink-0" />
                <span className="text-white hover:text-[#c9a227]">View on Google Maps</span>
              </a>
            </div>
            <div className="flex items-center gap-3">
              <Clock size={20} className="text-[#c9a227] shrink-0" />
              <span className={isOpen ? 'text-green-400' : 'text-red-400'}>{label}</span>
            </div>
            <div className="flex items-center gap-3">
              <a href="https://www.instagram.com/trusttvmounting" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 hover:text-[#c9a227] transition">
                <InstagramIcon />
                <span className="text-white hover:text-[#c9a227]">Follow on Instagram</span>
              </a>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 mt-8">
            <a href="tel:4697933130" className="bg-[#c9a227] hover:bg-[#e2be4a] text-[#0a1628] font-bold px-6 py-3 rounded-xl text-center transition">
              Call Now
            </a>
          </div>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ type: 'spring', stiffness: 80, damping: 15 }}
        >
          <form onSubmit={handleSubmit} className="bg-[#142035] rounded-2xl p-7 border border-white/5">
            <h3 className="text-white font-semibold text-xl mb-5">Request a Free Quote</h3>
            <div className="space-y-4">
              <div>
                <label htmlFor="contact-name" className="text-white/60 text-sm block mb-1">Your Name</label>
                <input id="contact-name" name="name" type="text" className="w-full bg-[#0a1628] border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/30 focus:border-[#c9a227] focus:outline-none text-sm" placeholder="Your name" />
              </div>
              <div>
                <label htmlFor="contact-phone" className="text-white/60 text-sm block mb-1">Phone Number</label>
                <input id="contact-phone" name="phone" type="tel" className="w-full bg-[#0a1628] border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/30 focus:border-[#c9a227] focus:outline-none text-sm" placeholder="(555) 555-5555" />
              </div>
              <div>
                <label htmlFor="contact-email" className="text-white/60 text-sm block mb-1">Email Address</label>
                <input id="contact-email" name="email" type="email" className="w-full bg-[#0a1628] border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/30 focus:border-[#c9a227] focus:outline-none text-sm" placeholder="jane@example.com" />
                <p className="text-white/30 text-xs mt-1">Provide an email or a phone number so we can reach you.</p>
              </div>
              <div>
                <label htmlFor="contact-details" className="text-white/60 text-sm block mb-1">Project Details</label>
                <textarea id="contact-details" name="details" rows={3} className="w-full bg-[#0a1628] border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/30 focus:border-[#c9a227] focus:outline-none text-sm resize-none" placeholder="Tell us about your project" />
              </div>
              <button type="submit" disabled={isPending} className="w-full bg-[#c9a227] hover:bg-[#e2be4a] disabled:opacity-60 text-[#0a1628] font-bold py-3 rounded-xl transition">
                {isPending ? 'Sending\u2026' : 'Send Request'}
              </button>
            </div>
            {sent && <p className="text-green-400 text-sm mt-3 text-center">Thank you! We'll contact you shortly.</p>}
            {error && <p className="text-red-400 text-sm mt-3 text-center">{error}</p>}
          </form>
        </motion.div>
      </div>
      
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
        className="max-w-7xl mx-auto mt-16 pb-16"
      >
        <div className="flex items-center gap-3 mb-5">
          <MapPin size={20} className="text-[#c9a227]" />
          <h3 className="text-white font-semibold text-lg">Find Us &middot; Serving All of DFW</h3>
        </div>
        <div className="rounded-2xl overflow-hidden border border-white/10" style={{ height: 360 }}>
          <iframe title="Trust TV Mounting Location"
            src="https://maps.google.com/maps?q=Trust+TV+Mounting+%26+Home+Solutions+McKinney+TX+469-793-3130&output=embed&z=11"
            width="100%" height="360"
            style={{ border: 0, filter: 'invert(90%) hue-rotate(180deg) saturate(0.8) brightness(0.85)' }}
            allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
        </div>
        <p className="text-white/30 text-xs mt-3 text-center">
          <a href="https://maps.app.goo.gl/XLRD2c2ysioC43ph9" target="_blank" rel="noopener noreferrer" className="underline hover:text-white/60 transition">Open in Google Maps</a>
          &nbsp;&middot;&nbsp; We travel throughout the DFW metroplex
        </p>
      </motion.div>
    </section>
  )
}
