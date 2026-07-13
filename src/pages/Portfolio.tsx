import { useState, useEffect } from 'react'
import { Link, useLocation } from 'wouter'
import { 
  ArrowLeft, Search, Calendar, Zap, Tv, Home, HelpCircle, Phone, 
  MapPin, CheckCircle2, Star, ShieldCheck, X, ChevronLeft, ChevronRight, Maximize2 
} from 'lucide-react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

interface Project {
  id: number
  src: string
  alt: string
  label: string
  title: string
  category: 'TV Mounting' | 'Home Theater' | 'EV Charging' | 'Lighting & Electrical' | 'Smart Home' | 'Painting & Drywall'
  description: string
  specs: string[]
  duration: string
}

const projects: Project[] = [
  {
    id: 1,
    src: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202026-07-04%20at%202.51.13%E2%80%AFPM-VKjt4ecWGSoDvRPcirUf8sekhUDyMo.png',
    alt: 'TV mounted above a wall fireplace in an elegant white living room',
    label: 'TV Mounting',
    title: 'Premium Over-Fireplace Mounting',
    category: 'TV Mounting',
    description: 'A perfectly aligned, low-profile television mount installed directly over a stone mantle fireplace. This project required precise drilling into the studs behind the drywall, heat-resistant cable routing, and an integrated power bridge to completely conceal all power and HDMI cables.',
    specs: ['Heat-shielded cable routing', 'Stud-anchored safety', 'Recessed power bridge', 'Tilt bracket adjustment'],
    duration: '1.5 Hours'
  },
  {
    id: 2,
    src: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202026-07-04%20at%202.51.29%E2%80%AFPM-pikfsNFEtO6EI6Ka5QmM7WL4s0VrPL.png',
    alt: 'Large projection screen home cinema with in-wall speakers and leather recliners',
    label: 'Home Cinema Setup',
    title: 'Audiophile Home Theater Suite',
    category: 'Home Theater',
    description: 'An ultimate residential theater featuring a 120" acoustically transparent screen and a calibrated 4K UHD laser projector. Features a custom-tuned Dolby Atmos 7.1.2 surround sound system with flush, paint-matched in-wall speakers, professional bass traps, and custom ambient smart lighting control systems.',
    specs: ['120" Acoustic transparency screen', 'Dolby Atmos 7.1.2 sound', 'In-wall paint-matched speakers', 'Acoustic calibration'],
    duration: '6 Hours'
  },
  {
    id: 3,
    src: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202026-07-04%20at%202.53.30%E2%80%AFPM-4xIx0XBl6sAQaGYcTAolZGwvL7rWUb.png',
    alt: 'Tesla EV wall charger installed next to electrical breaker panel',
    label: 'EV Charger Installation',
    title: 'Tesla Gen 3 Wall Connector',
    category: 'EV Charging',
    description: 'High-speed electric vehicle charging station installation. We added a dedicated 60A circuit breaker, ran solid copper lines through sleek, surface-mounted EMT metal conduits, and mounted the Tesla Gen 3 Wall Connector with active load sharing support.',
    specs: ['Dedicated 60-amp circuit breaker', 'Heavy-duty EMT conduit', 'Load sharing configuration', 'Full safety certification'],
    duration: '2.5 Hours'
  },
  {
    id: 4,
    src: '/gallery-tv-bedroom.png',
    alt: 'Large flat screen TV mounted flush on a bedroom accent wall with hidden cables',
    label: 'Bedroom TV Mount',
    title: 'Minimalist Bedroom Accent Wall',
    category: 'TV Mounting',
    description: 'A sleek, flush-to-wall mounting on a wood panel accent wall. Specialized cable grommets were used to route cables behind the paneling without compromising the wood finish, providing a clean wire-free look directly opposite the bed.',
    specs: ['Ultra-slim low-profile bracket', 'Wood panel cable routing', 'Micro-leveling adjustment', 'HDMI 2.1 premium cables'],
    duration: '1 Hour'
  },
  {
    id: 5,
    src: '/gallery-speakers.png',
    alt: 'Wall-mounted surround sound speakers on both sides of a living room TV',
    label: 'Surround Sound Setup',
    title: 'Dolby Surround Sound System',
    category: 'Home Theater',
    description: 'Living room multi-channel surround sound system integration. Side-channel satellite speakers were securely mounted to wall studs, and wiring was run cleanly through the crawlspace and walls using CL2-rated premium audio cables.',
    specs: ['CL2 wall-rated speaker wire', 'Acoustic angle targeting', 'Heavy-duty wall anchors', 'Soundbar integration'],
    duration: '2 Hours'
  },
  {
    id: 6,
    src: '/gallery-cables.png',
    alt: 'Clean in-wall cable concealment with no visible wires behind mounted TV',
    label: 'Cable Concealment',
    title: 'Recessed In-Wall Cable Concealment',
    category: 'TV Mounting',
    description: 'A flawless demonstration of our in-wall cable concealment service. We installed a dual recessed electrical box and low-voltage pass-through behind the TV, allowing all streaming device bricks, power plugs, and signal cables to remain completely hidden.',
    specs: ['Dual recessed power bridge', 'Flexible low-voltage grommets', 'No drywall damage', 'DFW code-compliant wiring'],
    duration: '45 Mins'
  },
  {
    id: 7,
    src: '/gallery-light-fixture.jpg',
    alt: 'Electrician installing a recessed ceiling light fixture',
    label: 'Light Fixture Installation',
    title: 'Recessed Ceiling LED Pot Lights',
    category: 'Lighting & Electrical',
    description: 'Upgraded a dark living space with six modern 4-inch ultra-thin LED recessed pot lights. Features 5-CCT selectable color temperatures and full integration with a Lutron smart dimmer switch for high energy efficiency and customizable ambiance.',
    specs: ['Ultra-thin LED driver kits', '5-CCT selectable spectrum', 'Lutron dimmer compatibility', 'Dustless ceiling cutting'],
    duration: '3 Hours'
  },
  {
    id: 8,
    src: '/gallery-chandelier.jpg',
    alt: 'Chandelier installed above a window in a dining room',
    label: 'Chandelier Installation',
    title: 'Luxury Dining Room Chandelier',
    category: 'Lighting & Electrical',
    description: 'Removed an outdated light fixture and reinforced the ceiling junction box with a heavy-duty steel brace rated for up to 150 lbs. Safely assembled and hung a multi-tier luxury crystal chandelier over the main dining table.',
    specs: ['Heavy-duty ceiling brace (150 lbs)', 'Safe scaffolding assembly', 'Laser leveling', 'LED filament bulb integration'],
    duration: '2 Hours'
  },
  {
    id: 9,
    src: '/gallery-outlet.jpg',
    alt: 'Electrician installing a wall outlet',
    label: 'Electrical Outlet Installation',
    title: 'Dedicated Wall Outlet Addition',
    category: 'Lighting & Electrical',
    description: 'Extended an existing circuit to create a brand new, code-compliant 15A electrical outlet behind a newly designed home office workstation. Perfect for powering desk monitors and organisers without messy extension cords.',
    specs: ['Drywall stud wire-pulling', 'Tamper-resistant receptacle', 'Sleek white wallplate', 'Circuit integrity verification'],
    duration: '1 Hour'
  },
  {
    id: 10,
    src: '/gallery-outdoor-lighting.png',
    alt: 'String lights and landscape lighting illuminating a backyard pool at night',
    label: 'Outdoor Lighting Installation',
    title: 'Backyard Pool & Landscape Illumination',
    category: 'Lighting & Electrical',
    description: 'Designed and installed a low-voltage exterior lighting system around a luxury pool deck. Includes brass LED path fixtures, upward tree spotlights, and commercial-grade heavy-duty overhead string lights connected to an outdoor smart timer.',
    specs: ['Low-voltage (12V) safe design', 'Weatherproof brass fixtures', 'App-controlled smart timer', 'Custom structural support poles'],
    duration: '4 Hours'
  },
  {
    id: 11,
    src: '/gallery-smart-home.png',
    alt: 'Hand adjusting a wall-mounted smart home thermostat panel',
    label: 'Smart Home System Installation',
    title: 'Ecobee Smart Climate System',
    category: 'Smart Home',
    description: 'Integrated a central smart thermostat with support for remote temperature sensors across multiple bedrooms. Configured custom schedules and integrated with Google Home and Apple HomeKit for hands-free voice control.',
    specs: ['Ecobee Premium Integration', 'Remote multi-sensor calibration', 'Wi-Fi network connection', 'App automation tuning'],
    duration: '1 Hour'
  },
  {
    id: 12,
    src: '/gallery-painting-new.jpg',
    alt: 'Professional painter rolling paint onto a turquoise interior wall with drop cloths and ladder',
    label: 'Painting Services',
    title: 'Modern Living Room Paint Refresh',
    category: 'Painting & Drywall',
    description: 'Provided premium painting services for a large family room. Features flawless wall prep with minor dent repairs, expert low-tack tape lining, and two coats of premium satin-finish paint for durable, wipeable walls.',
    specs: ['Two-coat satin paint finish', 'Full floor & trim protection', 'Seamless border cutting', 'Minor drywall patching included'],
    duration: '5 Hours'
  },
  {
    id: 13,
    src: '/gallery-drywall.jpg',
    alt: 'Workers installing and finishing drywall on a ceiling',
    label: 'Drywall Services',
    title: 'Ceiling Drywall Restructuring',
    category: 'Painting & Drywall',
    description: 'Taped, mudded, and sanded a large ceiling section following the removal of redundant built-in cabinetry. Applied a professional knock-down texture match to make the patched area completely invisible.',
    specs: ['Sheetrock compound layering', 'Dust-containment sheeting', 'Custom knock-down texture match', 'Primer coating preparation'],
    duration: '4 Hours'
  },
  {
    id: 14,
    src: '/gallery-security-camera.webp',
    alt: 'Technician installing an outdoor security camera under an eave',
    label: 'Security Camera Installation',
    title: '4K PoE Outdoor Security System',
    category: 'Smart Home',
    description: 'Mounted and configured weather-proof high-resolution 4K security cameras under the home roof overhang. Wired using solid-copper Cat6 cables back to a centralized network video recorder (NVR) with remote mobile app viewing.',
    specs: ['4K Ultra HD cameras', 'Power-over-Ethernet (Cat6 PoE)', 'Night vision & motion detection', 'Secure NVR local storage'],
    duration: '3.5 Hours'
  },
  {
    id: 15,
    src: '/gallery-home-entertainment.jpg',
    alt: 'Modern living room wall unit with mounted TV and entertainment storage',
    label: 'Home Entertainment Setup',
    title: 'Floating Media Unit & TV System',
    category: 'Home Theater',
    description: 'A complete family room centerpiece installation. Mounted an 85" Smart TV onto solid studs, coupled with a floating oak media console anchored securely with professional heavy-duty lag bolts. All connectivity wires are completely hidden.',
    specs: ['Stud-finder structural alignment', '150 lbs heavy-duty anchors', 'Hidden high-speed HDMI 2.1 cables', 'Level-verified precision alignment'],
    duration: '2.5 Hours'
  }
]

const categories = [
  'All',
  'TV Mounting',
  'Home Theater',
  'EV Charging',
  'Lighting & Electrical',
  'Smart Home',
  'Painting & Drywall'
]

export default function Portfolio() {
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [searchQuery, setSearchQuery] = useState('')
  const [activePhotoIndex, setActivePhotoIndex] = useState<number | null>(null)
  const [, setLocation] = useLocation()

  // Scroll to top on load
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [])

  // Handle ESC key for lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (activePhotoIndex === null) return
      if (e.key === 'Escape') setActivePhotoIndex(null)
      if (e.key === 'ArrowRight') handleNextPhoto()
      if (e.key === 'ArrowLeft') handlePrevPhoto()
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [activePhotoIndex])

  // Filter projects
  const filteredProjects = projects.filter((project) => {
    const matchesCategory = selectedCategory === 'All' || project.category === selectedCategory
    const matchesSearch = project.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          project.description.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          project.label.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  const handlePrevPhoto = () => {
    if (activePhotoIndex === null) return
    const prevIndex = activePhotoIndex === 0 ? filteredProjects.length - 1 : activePhotoIndex - 1
    setActivePhotoIndex(prevIndex)
  }

  const handleNextPhoto = () => {
    if (activePhotoIndex === null) return
    const nextIndex = activePhotoIndex === filteredProjects.length - 1 ? 0 : activePhotoIndex + 1
    setActivePhotoIndex(nextIndex)
  }

  const currentProject = activePhotoIndex !== null ? filteredProjects[activePhotoIndex] : null

  return (
    <div className="w-full min-h-screen bg-slate-50 flex flex-col pt-20">
      <Navbar />

      {/* Header Banner */}
      <section className="relative bg-[#0a1628] text-white py-16 px-4 overflow-hidden border-b border-white/10">
        {/* Background Gradients */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-yellow-400/5 rounded-full filter blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-500/5 rounded-full filter blur-3xl pointer-events-none" />

        <div className="max-w-6xl mx-auto relative z-10">
          <div className="flex items-center gap-2 text-[#c9a227] text-sm font-semibold uppercase tracking-wider mb-3">
            <Link to="/" className="flex items-center gap-1.5 hover:text-white transition">
              <ArrowLeft size={16} />
              Back to Home
            </Link>
            <span className="text-white/20">•</span>
            <span>Interactive Portfolio</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-white">
            Our Work Showcase
          </h1>
          <p className="text-gray-300 max-w-2xl mt-4 text-base md:text-lg leading-relaxed">
            Browse high-resolution photographs of our recent custom installations in the Dallas-Fort Worth area. Click any image to view exact technical specifications, completion times, and project highlights.
          </p>
        </div>
      </section>

      {/* Control Panel: Filters & Search */}
      <section className="bg-white border-b border-gray-200 sticky top-[72px] z-30 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 py-4 flex flex-col md:flex-row gap-4 items-center justify-between">
          
          {/* Categories Horizontal Scroll */}
          <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  setSelectedCategory(cat)
                  setActivePhotoIndex(null)
                }}
                className={`px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
                  selectedCategory === cat
                    ? 'bg-[#0a1628] text-white shadow-md'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Live Search Input */}
          <div className="relative w-full md:w-80">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
            <input
              type="text"
              placeholder="Search by keyword, tool, etc..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value)
                setActivePhotoIndex(null)
              }}
              className="w-full pl-9 pr-4 py-2 border border-gray-200 rounded-full text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#c9a227] focus:border-transparent transition-all bg-gray-50/50"
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <X size={14} />
              </button>
            )}
          </div>

        </div>
      </section>

      {/* Main Grid Section */}
      <section className="flex-1 w-full max-w-7xl mx-auto px-4 py-12">
        {filteredProjects.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-2xl border border-gray-200 shadow-xs">
            <Tv size={48} className="mx-auto text-gray-300 mb-4 animate-pulse" />
            <h3 className="text-lg font-bold text-gray-800">No projects match your query</h3>
            <p className="text-gray-500 text-sm mt-1 max-w-xs mx-auto">Try checking your spelling, removing search terms, or selecting "All" categories.</p>
            <button 
              onClick={() => {
                setSelectedCategory('All')
                setSearchQuery('')
              }}
              className="mt-6 inline-flex items-center gap-2 bg-[#0a1628] text-white font-semibold text-xs px-5 py-2.5 rounded-lg hover:bg-slate-800 transition"
            >
              Clear All Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project, index) => (
              <article 
                key={project.id}
                onClick={() => setActivePhotoIndex(index)}
                className="group bg-white rounded-2xl overflow-hidden border border-gray-200 shadow-xs hover:shadow-md transition-all duration-300 cursor-pointer flex flex-col"
              >
                {/* Image Section */}
                <div className="relative aspect-[4/3] overflow-hidden bg-slate-900">
                  <img 
                    src={project.src} 
                    alt={project.alt} 
                    loading="lazy" 
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  {/* Category Badge on Image */}
                  <div className="absolute top-4 left-4 bg-[#0a1628]/90 backdrop-blur-xs text-white text-[10px] font-bold px-3 py-1.5 rounded-full border border-white/10 tracking-wider uppercase">
                    {project.category}
                  </div>
                  {/* Hover Overlay Button */}
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <div className="bg-white/95 backdrop-blur-xs text-[#0a1628] font-semibold text-xs px-4 py-2 rounded-lg flex items-center gap-1.5 shadow-lg transform translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                      <Maximize2 size={14} />
                      View Project Details
                    </div>
                  </div>
                </div>

                {/* Info Text Area */}
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between text-xs text-gray-400 font-medium mb-1.5">
                      <span>DFW Metroplex Service</span>
                      <span className="flex items-center gap-1 text-[#c9a227]">
                        <Star size={12} fill="currentColor" />
                        5.0 Rating
                      </span>
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 group-hover:text-[#c9a227] transition-colors leading-snug">
                      {project.title}
                    </h3>
                    <p className="text-gray-500 text-xs mt-2 line-clamp-2 leading-relaxed">
                      {project.description}
                    </p>
                  </div>

                  <div className="mt-4 pt-4 border-t border-gray-100 flex items-center justify-between">
                    <span className="text-[11px] text-gray-400 font-medium tracking-wide uppercase">Est. Completion:</span>
                    <span className="text-xs font-semibold text-[#0a1628] bg-gray-100 px-2.5 py-1 rounded-sm">
                      {project.duration}
                    </span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>

      {/* CTA Section */}
      <section className="bg-[#0a1628] text-white py-16 px-4 text-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#c9a227_1px,transparent_1px)] [background-size:16px_16px]" />
        <div className="max-w-2xl mx-auto relative z-10">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">Want the Same Perfect Results?</h2>
          <p className="text-gray-300 mb-8 text-sm md:text-base">
            Whether you want a flat screen flush-mounted on your drywall, outdoor lights for your deck, or a whole home theater audio experience, we offer professional, certified home solutions.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link to="/#appointment" className="bg-[#c9a227] hover:bg-yellow-500 text-[#0a1628] font-bold px-8 py-3 rounded-lg text-sm transition shadow-lg">
              Book Your Service
            </Link>
            <a href="tel:4697933130" className="border border-white/20 hover:bg-white/5 text-white font-bold px-8 py-3 rounded-lg text-sm transition">
              Call (469) 793-3130
            </a>
          </div>
        </div>
      </section>

      <Footer />

      {/* Fullscreen Interactive Lightbox Modal */}
      {activePhotoIndex !== null && currentProject && (
        <div className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4 backdrop-blur-xs transition-opacity duration-300">
          {/* Close Area */}
          <div className="absolute inset-0 cursor-default" onClick={() => setActivePhotoIndex(null)} />

          {/* Main Lightbox Content Box */}
          <div className="relative w-full max-w-5xl bg-[#0a1628] border border-white/10 rounded-2xl overflow-hidden shadow-2xl z-10 grid grid-cols-1 md:grid-cols-12 max-h-[90vh]">
            
            {/* Top Bar for Close (Mobile-first, floating) */}
            <button 
              onClick={() => setActivePhotoIndex(null)}
              className="absolute top-4 right-4 text-white/70 hover:text-white bg-black/40 hover:bg-black/60 p-2.5 rounded-full transition z-20 shadow-lg"
              aria-label="Close modal"
            >
              <X size={20} />
            </button>

            {/* Visual Section (Left 7 Columns on MD+) */}
            <div className="md:col-span-7 relative flex items-center justify-center bg-black aspect-[4/3] md:aspect-auto md:h-[600px]">
              <img 
                src={currentProject.src} 
                alt={currentProject.alt} 
                className="max-w-full max-h-full object-contain"
                referrerPolicy="no-referrer"
              />

              {/* Navigation Arrows inside Image Box */}
              <button 
                onClick={handlePrevPhoto}
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-[#c9a227] text-white hover:text-[#0a1628] p-2 rounded-full transition z-10"
                aria-label="Previous photo"
              >
                <ChevronLeft size={24} />
              </button>
              <button 
                onClick={handleNextPhoto}
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-[#c9a227] text-white hover:text-[#0a1628] p-2 rounded-full transition z-10"
                aria-label="Next photo"
              >
                <ChevronRight size={24} />
              </button>

              {/* Image index badge */}
              <div className="absolute bottom-4 left-4 bg-black/60 text-white/90 text-xs px-3 py-1 rounded-full font-medium tracking-wide">
                {activePhotoIndex + 1} / {filteredProjects.length}
              </div>
            </div>

            {/* Technical Detail Section (Right 5 Columns on MD+) */}
            <div className="md:col-span-5 p-6 sm:p-8 flex flex-col justify-between overflow-y-auto text-white md:h-[600px] border-t md:border-t-0 md:border-l border-white/5">
              <div>
                {/* Category Indicator */}
                <div className="flex items-center gap-1.5 text-[#c9a227] text-xs font-bold uppercase tracking-wider mb-2">
                  <ShieldCheck size={14} />
                  <span>{currentProject.category} Service</span>
                </div>

                <h3 className="text-xl sm:text-2xl font-extrabold tracking-tight text-white leading-tight">
                  {currentProject.title}
                </h3>

                <p className="text-gray-300 text-sm mt-4 leading-relaxed">
                  {currentProject.description}
                </p>

                {/* Key Technical Specs list */}
                <div className="mt-6">
                  <h4 className="text-xs font-bold uppercase tracking-widest text-[#c9a227] mb-2.5">
                    Technical Specifications
                  </h4>
                  <ul className="space-y-2">
                    {currentProject.specs.map((spec, i) => (
                      <li key={i} className="flex items-center gap-2.5 text-gray-300 text-xs">
                        <CheckCircle2 size={14} className="text-[#c9a227] shrink-0" />
                        <span>{spec}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Booking Call-to-action details */}
              <div className="mt-8 pt-6 border-t border-white/10 flex flex-col gap-4">
                <div className="flex items-center justify-between text-xs text-gray-400">
                  <span className="flex items-center gap-1.5">
                    <Calendar size={14} className="text-yellow-500" />
                    Est. Duration:
                  </span>
                  <span className="font-bold text-white bg-white/10 px-2.5 py-1 rounded-xs">
                    {currentProject.duration}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-3 mt-1">
                  <button
                    onClick={() => {
                      setActivePhotoIndex(null)
                      setLocation('/#appointment')
                    }}
                    className="w-full bg-[#c9a227] hover:bg-yellow-500 text-[#0a1628] font-bold text-xs py-3 rounded-lg transition text-center"
                  >
                    Request Quote
                  </button>
                  <a
                    href="tel:4697933130"
                    className="w-full border border-white/10 hover:border-[#c9a227] hover:text-[#c9a227] text-white font-bold text-xs py-3 rounded-lg transition text-center flex items-center justify-center"
                  >
                    Call Now
                  </a>
                </div>
              </div>

            </div>

          </div>
        </div>
      )}
    </div>
  )
}
