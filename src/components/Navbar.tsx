import { useState, useEffect } from 'react'
import { Menu, X } from 'lucide-react'
import { useLocation, Link } from 'wouter'

const navLinks = [
  { href: '#services', label: 'Services' },
  { href: '#gallery', label: 'Gallery' },
  { href: '#reviews', label: 'Reviews' },
  { href: '#faq', label: 'FAQ' },
  { href: '#contact', label: 'Contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [location, setLocation] = useLocation()

  const isHome = location === '/'

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (isHome) {
      e.preventDefault()
      const element = document.getElementById(href.replace('#', ''))
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' })
      }
      setMobileOpen(false)
    } else {
      // Allow default router navigation to homepage anchor
      setMobileOpen(false)
    }
  }

  const getHref = (href: string) => {
    if (isHome) return href
    return `/${href}`
  }

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-[#0a1628]/95 backdrop-blur-sm shadow-lg' : 'bg-transparent'}`}>
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 cursor-pointer">
          <img src="/logo.png" alt="Trust TV Mounting Logo" className="h-11 w-11 object-cover rounded-full bg-white p-0.5 border border-white/10" />
          <span className="text-white font-bold text-base leading-tight">
            Trust TV Mounting<br /><span className="text-[#c9a227] font-medium text-xs">& Home Solutions</span>
          </span>
        </Link>

        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a 
              key={link.href} 
              href={getHref(link.href)} 
              onClick={(e) => handleLinkClick(e, link.href)}
              className="text-white/70 hover:text-[#c9a227] text-sm font-medium transition"
            >
              {link.label}
            </a>
          ))}
          <a 
            href={isHome ? '#appointment' : '/#appointment'} 
            onClick={(e) => handleLinkClick(e, '#appointment')}
            className="bg-[#c9a227] hover:bg-[#e2be4a] text-[#0a1628] font-semibold px-5 py-2 rounded-lg text-sm transition"
          >
            Book Appointment
          </a>
        </div>

        <button className="md:hidden text-white" aria-label={mobileOpen ? 'Close menu' : 'Open menu'} onClick={() => setMobileOpen((o) => !o)}>
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {mobileOpen && (
        <div className="md:hidden px-4 pb-4 space-y-3 bg-[#0a1628]/95">
          {navLinks.map((link) => (
            <a 
              key={link.href} 
              href={getHref(link.href)} 
              onClick={(e) => handleLinkClick(e, link.href)}
              className="block text-white/70 hover:text-[#c9a227] text-sm"
            >
              {link.label}
            </a>
          ))}
          <a 
            href={isHome ? '#appointment' : '/#appointment'} 
            onClick={(e) => handleLinkClick(e, '#appointment')}
            className="block bg-[#c9a227] text-[#0a1628] font-semibold px-4 py-2 rounded-lg text-sm text-center"
          >
            Book Appointment
          </a>
        </div>
      )}
    </nav>
  )
}
