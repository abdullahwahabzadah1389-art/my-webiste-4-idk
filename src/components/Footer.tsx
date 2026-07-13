import { Phone, Mail, MapPin, ArrowRight, Instagram, MessageCircle } from 'lucide-react'

const services = [
  'TV Mounting',
  'Cable Concealment',
  'Home Cinema Installation',
  'Speaker Installation',
  'Security Cameras',
  'Light Fixture Installation',
  'Outdoor Lighting',
  'Smart Home System',
  'Painting Services',
  'Any Handyman Projects',
]

const socialLinks = [
  { icon: Instagram, label: 'Follow Trust TV Mounting on Instagram', href: 'https://www.instagram.com/trusttvmounting' },
  { icon: MapPin, label: 'Find Trust TV Mounting on Google Maps', href: 'https://maps.app.goo.gl/dfUSphGaVdf597n37' },
  { icon: MessageCircle, label: 'Message Trust TV Mounting on iMessage', href: 'sms:+14697933130' },
]

const contactItems = [
  { icon: Phone, label: '(469) 793-3130', sub: 'Call For Services', href: 'tel:4697933130' },
  { icon: Mail, label: 'trusttvmountingservices@gmail.com', sub: 'Send Us Email', href: 'mailto:trusttvmountingservices@gmail.com' },
  { icon: MapPin, label: 'DFW, Texas, United States', sub: 'Visit Our Location', href: 'https://maps.app.goo.gl/dfUSphGaVdf597n37' },
]

export default function Footer() {
  return (
    <footer className="w-full bg-[#0a1628] border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 py-16 grid grid-cols-1 md:grid-cols-3 gap-12">
        <div>
          <div className="flex items-center gap-3">
            <img src="/logo.png" alt="Trust TV Mounting Logo" className="h-14 w-14 object-cover rounded-full bg-white p-0.5 border border-white/10" />
            <div>
              <p className="text-white font-bold leading-tight">Trust TV Mounting</p>
              <p className="text-[#c9a227] text-xs">&amp; Home Solutions</p>
            </div>
          </div>
          <p className="text-white/40 text-sm mt-5 leading-relaxed">
            We provide professional TV mounting and home services to securely install your television for the best viewing experience, along with lighting, electrical, and more.
          </p>
          <div className="flex items-center gap-3 mt-6">
            {socialLinks.map(({ icon: Icon, label, href }) => (
              <a
                key={label}
                href={href}
                target={href.startsWith('http') ? '_blank' : undefined}
                rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
                aria-label={label}
                className="inline-flex items-center justify-center w-9 h-9 rounded-full border border-white/10 text-white/60 hover:text-[#c9a227] hover:border-[#c9a227]/40 transition-colors"
              >
                <Icon size={16} />
              </a>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-white font-semibold text-lg">Services</h3>
          <ul className="mt-5 space-y-3">
            {services.map((s) => (
              <li key={s}>
                <a href="#services" className="flex items-center gap-2 text-white/50 text-sm hover:text-[#c9a227] transition-colors">
                  <ArrowRight size={14} className="text-[#c9a227] shrink-0" />
                  {s}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-white font-semibold text-lg">Contact Us</h3>
          <ul className="mt-5 space-y-5">
            {contactItems.map(({ icon: Icon, label, sub, href }) => (
              <li key={sub} className="flex items-start gap-3 border-b border-white/5 pb-4 last:border-0 last:pb-0">
                <Icon size={18} className="text-[#c9a227] shrink-0 mt-0.5" />
                <a href={href} target={href.startsWith('http') ? '_blank' : undefined} rel="noopener noreferrer" className="group">
                  <p className="text-white text-sm group-hover:text-[#c9a227] transition-colors break-all">{label}</p>
                  <p className="text-[#c9a227] text-xs mt-0.5">{sub}</p>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t border-white/5 py-6 px-4">
        <p className="text-white/30 text-xs text-center">
          &copy; 2026 Trust TV Mounting &amp; Home Solutions. All Rights Reserved. Proudly serving McKinney, Frisco, Plano, Allen, Celina, Princeton &amp; the DFW area.
        </p>
      </div>
    </footer>
  )
}
