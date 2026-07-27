import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { 
  Tv, EyeOff, Film, Speaker, Blinds, Camera, Wrench, Lightbulb, 
  LampCeiling, Zap, Sun, Home, PaintRoller, HardHat, 
  Clock, CheckCircle2, ShieldCheck, X, ArrowRight, Sparkles 
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

interface Service {
  icon: LucideIcon
  title: string
  description: string
  longDescription: string
  photo: string
  highlights: string[]
  estimatedTime: string
  colSpan?: string
}

const services: Service[] = [
  {
    icon: Tv,
    title: 'TV Mounting',
    description: 'Secure, level mounting on any wall type with perfect positioning.',
    longDescription: 'Professional flat screen and OLED mounting on drywall, brick, plaster, stone, or wood panels. Includes level-verification, dynamic stud-anchoring, bracket assembly, and perfect height calibration for ultimate eye comfort.',
    photo: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202026-07-04%20at%202.51.13%E2%80%AFPM-VKjt4ecWGSoDvRPcirUf8sekhUDyMo.png',
    highlights: [
      'Level-verified precision alignment',
      'Stud-anchored heavy-duty safety',
      'Tile, brick, and stone specialized drilling',
      'Tilt, full-motion, or flush-mount setups'
    ],
    estimatedTime: '1 - 2 Hours'
  },
  {
    icon: Lightbulb,
    title: 'Light Fixture Installation',
    description: 'Safe, precise installation of indoor light fixtures and ceiling fans.',
    longDescription: 'Ditch outdated lighting with professional installations. We replace old light fixtures, install sleek modern ceiling fans, add energy-efficient LED flush-mounts, and configure modern dimmers with absolute electrical safety.',
    photo: '/gallery-light-fixture.jpg',
    highlights: [
      'Ceiling fan motor reinforcement',
      'Modern dimmers & Lutron smart switches',
      'Flush-mount and pendant hanging',
      'Fully code-certified electrical work'
    ],
    estimatedTime: '1 - 2 Hours'
  },
  {
    icon: LampCeiling,
    title: 'Chandelier Installation',
    description: 'Expert mounting and wiring for chandeliers of any size or weight.',
    longDescription: 'From minimalist modern ring lights to high-end multi-tier crystal masterpieces. We reinforce your existing ceiling junction box with heavy-duty steel braces to safely support high-weight chandeliers, and handle delicate final assemblies.',
    photo: '/gallery-chandelier.jpg',
    highlights: [
      'Heavy-weight steel box bracing (up to 150 lbs)',
      'Delicate crystal/glass manual assembly',
      'Laser-centered overhead placement',
      'High-ceiling safety rigging'
    ],
    estimatedTime: '2 - 3 Hours'
  },
  {
    icon: Zap,
    title: 'Electrical Outlet Installation',
    description: 'New outlet installation and relocation for entertainment centers and beyond.',
    longDescription: 'Convenient, certified electrical work to add or move outlets exactly where you need them. Perfect for hidden home office wires, bathroom additions, smart bidet plugs, or dedicated home theater power panels.',
    photo: '/gallery-outlet.jpg',
    highlights: [
      'Circuit load balancing & safety tests',
      'Tamper-resistant code-compliant outlets',
      'No drywall damage wire pulling',
      'Custom USB-C integrated outlets'
    ],
    estimatedTime: '1 - 2 Hours'
  },
  {
    icon: Sun,
    title: 'Outdoor Lighting Installation',
    description: 'Landscape and pathway lighting to enhance your property day and night.',
    longDescription: 'Enrich your property\'s curb appeal and outdoor safety with premium low-voltage LED landscaping lights. We design and install path lights, structural spotlights, tree up-lights, and overhead patio string lights.',
    photo: '/gallery-outdoor-lighting.png',
    highlights: [
      'Safe low-voltage transformer setups',
      'Premium solid brass weatherproof fixtures',
      'Automatic photo-sensor & smart timers',
      'Elegant overhead patio string guides'
    ],
    estimatedTime: '3 - 5 Hours'
  },
  {
    icon: Camera,
    title: 'Security Camera Installation',
    description: 'Indoor and outdoor camera installation with proper positioning.',
    longDescription: 'Protect your home with professional grade security cameras. We install Ring, Nest, Arlo, or hardwired PoE (Power over Ethernet) IP cameras under eaves, on brick walls, or at entries, with custom coverage mapping to eliminate blind spots.',
    photo: '/gallery-security-camera.webp',
    highlights: [
      'Weather-proof exterior mounting',
      'Hardwired Cat6 PoE camera routing',
      'Real-time mobile app configuration',
      'Optimum angle & height targeting'
    ],
    estimatedTime: '2 - 4 Hours'
  },
  {
    icon: Home,
    title: 'Smart Home System Installation',
    description: 'Setup for smart hubs, thermostats, locks, and connected home devices.',
    longDescription: 'Unify your home with integrated smart systems. We install and program smart thermostats (Nest, Ecobee), keyless smart locks, Ring video doorbells, smart hubs, and automated scenes for ultimate convenience and efficiency.',
    photo: '/gallery-smart-home.png',
    highlights: [
      'Smart thermostat C-wire configurations',
      'Keyless deadbolt and keypad tuning',
      'Google Home, Alexa & HomeKit mapping',
      'Mesh Wi-Fi network optimization'
    ],
    estimatedTime: '1 - 2 Hours'
  },
  {
    icon: HardHat,
    title: 'Drywall Services',
    description: 'Patching, repair, and finishing after any mounting or installation job.',
    longDescription: 'Expert sheetrock repairing and ceiling texture matches. Whether patching holes from old mounts, completing structural re-routes, or repairing accidental dents, we mud, tape, sand, and prime for a perfectly smooth wall surface.',
    photo: '/gallery-drywall.jpg',
    highlights: [
      'Perfect flat-sand seam taping',
      'Orange peel & knockdown texture matching',
      'Premium non-shrink mudding',
      'Ready-to-paint primer finish'
    ],
    estimatedTime: '2 - 4 Hours'
  },
  {
    icon: PaintRoller,
    title: 'Painting Services',
    description: 'Clean interior and exterior painting to finish the job to perfection.',
    longDescription: 'Transform your rooms with custom interior painting services. We handle meticulous surface preparations, trim tape lining, corner cutting, and roll on two coats of high-durability premium paints for a rich, uniform color finish.',
    photo: '/gallery-painting-new.jpg',
    highlights: [
      'Dual-coat satin or matte finishes',
      'Full protection for floors & furniture',
      'Laser-sharp color cutting borders',
      'Eco-friendly low-VOC premium paints'
    ],
    estimatedTime: '3 - 6 Hours'
  },
  {
    icon: EyeOff,
    title: 'Cable Concealment',
    description: 'Clean, hidden wiring for a seamless look with no visible cables.',
    longDescription: 'Complete in-wall cable concealment to eliminate hanging wires. We install professional, code-compliant low-voltage pass-throughs and recessed power bridges behind your TV to route HDMI, optical, and power cords inside the wall safely.',
    photo: '/gallery-cables.png',
    highlights: [
      'DFW building code-compliant wiring',
      'Recessed dual power outlets',
      'No visible cord tracks or plastic channels',
      'Safe for standard drywall and plaster'
    ],
    estimatedTime: '45 Mins - 1 Hour'
  },
  {
    icon: Film,
    title: 'Home Cinema Installation',
    description: 'Complete home theater setup with surround sound and projectors.',
    longDescription: 'Turn any space into a premium cinema room. We install elite 4K UHD projectors, high-definition motorized projection screens, and custom multi-channel speaker layouts. We calibrate the entire soundstage for optimal acoustics and perfect sightlines.',
    photo: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202026-07-04%20at%202.51.29%E2%80%AFPM-pikfsNFEtO6EI6Ka5QmM7WL4s0VrPL.png',
    highlights: [
      'Projector & screen structural anchoring',
      'Acoustic soundstage calibration',
      'Receiver & media system programming',
      'Atmospheric smart lighting integration'
    ],
    estimatedTime: '4 - 8 Hours'
  },
  {
    icon: Speaker,
    title: 'Speaker Installation',
    description: 'In-wall, ceiling, and surround speaker mounting and wiring.',
    longDescription: 'Professional audio integration for any room. We install premium soundbars, in-wall speakers, flush ceiling speakers, and multi-speaker surround arrays with hidden high-performance wiring for crisp, cinema-grade audio.',
    photo: '/gallery-speakers.png',
    highlights: [
      'In-wall and in-ceiling flush mounting',
      'Clean routing of CL2-rated speaker wire',
      'Acoustically tuned soundbars',
      'Multi-zone audio system setup'
    ],
    estimatedTime: '1 - 3 Hours'
  },
  {
    icon: Blinds,
    title: 'Curtain & Blind Setup',
    description: 'Professional curtain rod and blind installation for any window.',
    longDescription: 'Upgrade your windows with flawlessly installed curtains, drapes, blinds, or motorized shades. We secure heavy rods and brackets into structural studs, ensuring clean, symmetric alignments and effortless glide operations.',
    photo: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&q=80&w=800',
    highlights: [
      'Heavy drape bracket stud-anchoring',
      'Laser-leveled double rods',
      'Manual & motorized smart shades',
      'Custom valance and track setups'
    ],
    estimatedTime: '1 - 2 Hours'
  },
  {
    icon: Wrench,
    title: 'Any Handyman Projects',
    description: 'Shelf mounting, furniture assembly, and general home fixes.',
    longDescription: 'Your go-to solution for tedious assembly and mounting lists. We mount heavy floating wooden shelves, secure vanity mirrors, build complex flat-pack furniture, hang art collections, and handle other quick home improvements.',
    photo: '/gallery-home-entertainment.jpg',
    highlights: [
      'Complex flat-pack furniture build',
      'Floating heavy-shelf alignment',
      'Large heavy mirror stud anchoring',
      'Pictures & gallery wall levelings'
    ],
    estimatedTime: '1 - 3 Hours'
  }
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05
    }
  }
}

const cardVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.96 },
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

export default function Services() {
  const [activeService, setActiveService] = useState<Service | null>(null)
  const [isExpanded, setIsExpanded] = useState(false)

  // Listen to escape key to close modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setActiveService(null)
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  const handleBookService = (serviceTitle: string) => {
    setActiveService(null)
    
    // Dispatch custom event to let AppointmentForm auto-select this service
    const event = new CustomEvent('select-service', { detail: serviceTitle })
    window.dispatchEvent(event)

    // Smooth scroll to the appointment form
    const element = document.getElementById('appointment')
    if (element) {
      setTimeout(() => {
        element.scrollIntoView({ behavior: 'smooth' })
      }, 100)
    }
  }

  const displayedServices = isExpanded ? services : services.slice(0, 9)

  return (
    <section id="services" className="relative w-full py-24 px-4 bg-gray-50/80 bg-ambient-mesh overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-center"
        >
          <p className="text-[#c9a227] text-xs font-bold uppercase tracking-widest bg-[#c9a227]/10 border border-[#c9a227]/20 px-3.5 py-1.5 rounded-full mb-3 flex items-center gap-1.5 shadow-sm">
            <Sparkles size={12} className="text-[#c9a227]" />
            What We Do Best
          </p>
          <h2 className="text-center font-extrabold text-[#0a1628] text-3xl md:text-4xl tracking-tight">Our Services</h2>
          <div className="w-16 h-1 bg-[#c9a227] rounded-full mt-4 shadow-sm" />
          <p className="text-center text-gray-600 mt-5 max-w-2xl mx-auto text-base leading-relaxed">
            From professional TV mounting to custom smart home setups and home painting — we handle your home solutions with certified expertise. Click any service card to view complete specifications and photos.
          </p>
        </motion.div>

        {/* Services Grid */}
        <motion.div 
          key={isExpanded.toString()}
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7 mt-14"
        >
          {displayedServices.map((s) => {
            const Icon = s.icon
            return (
              <motion.div 
                key={s.title} 
                variants={cardVariants}
                onClick={() => setActiveService(s)}
                className={`group depth-card glass-card rounded-2xl p-7 border border-white/80 shadow-depth-sm hover:border-[#c9a227]/40 cursor-pointer flex flex-col justify-between ${s.colSpan ?? ''}`}
              >
                <div>
                  <div className="w-13 h-13 bg-[#c9a227]/10 rounded-2xl flex items-center justify-center mb-5 group-hover:bg-[#c9a227] group-hover:text-[#0a1628] transition-all duration-300 shadow-inner">
                    <Icon size={24} className="text-[#c9a227] group-hover:text-[#0a1628] transition-colors" />
                  </div>
                  <h3 className="font-bold text-[#0a1628] text-lg group-hover:text-[#c9a227] transition-colors">
                    {s.title}
                  </h3>
                  <p className="text-gray-600 text-sm mt-2 leading-relaxed">
                    {s.description}
                  </p>
                </div>
                
                <div className="mt-6 pt-4 border-t border-gray-100 flex items-center justify-between text-[#c9a227] text-xs font-bold tracking-wide">
                  <span>View Photo &amp; Details</span>
                  <ArrowRight size={14} className="transform group-hover:translate-x-1.5 transition-transform duration-300" />
                </div>
              </motion.div>
            )
          })}
        </motion.div>

        {/* Read More / Toggle Button */}
        <div className="flex justify-center mt-12">
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="inline-flex items-center gap-2 btn-tactile-outline text-[#0a1628] font-extrabold text-sm px-8 py-3.5 rounded-full shadow-depth-sm transition-all duration-300 transform hover:scale-[1.02] active:scale-95 cursor-pointer"
          >
            <span>{isExpanded ? 'Show Less' : 'More Services'}</span>
            <ArrowRight size={16} className={`text-[#c9a227] transition-transform duration-300 ${isExpanded ? 'rotate-[-90deg]' : 'rotate-90'}`} />
          </button>
        </div>
      </div>

      {/* Interactive Detail Modal */}
      {activeService && (
        <div className="fixed inset-0 bg-[#0a1628]/80 backdrop-blur-md z-50 flex items-center justify-center p-4 transition-all duration-300">
          {/* Backdrop Close Click */}
          <div className="absolute inset-0" onClick={() => setActiveService(null)} />

          {/* Modal Card */}
          <div className="relative w-full max-w-4xl glass-card-dark rounded-3xl overflow-hidden shadow-depth-dark z-10 grid grid-cols-1 md:grid-cols-12 max-h-[90vh]">
            
            {/* Floating Close Button */}
            <button 
              onClick={() => setActiveService(null)}
              className="absolute top-4 right-4 text-white/80 hover:text-white bg-black/50 hover:bg-black/70 p-2.5 rounded-full backdrop-blur-md border border-white/10 transition-all z-20 shadow-md"
              aria-label="Close details"
            >
              <X size={20} />
            </button>

            {/* Photo Container (Left/Top) */}
            <div className="md:col-span-6 relative aspect-[16/10] md:aspect-auto md:h-[480px] bg-slate-900 overflow-hidden flex items-center justify-center">
              <img 
                src={activeService.photo} 
                alt={activeService.title} 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0a1628] via-transparent to-transparent md:hidden" />
            </div>

            {/* Text & Action Details (Right/Bottom) */}
            <div className="md:col-span-6 p-6 sm:p-8 flex flex-col justify-between overflow-y-auto max-h-[50vh] md:max-h-[480px] text-white">
              <div>
                <div className="flex items-center gap-1.5 text-[#c9a227] text-xs font-bold uppercase tracking-wider mb-2">
                  <ShieldCheck size={14} />
                  <span>Verified Solution</span>
                </div>

                <h3 className="text-xl sm:text-2xl font-extrabold tracking-tight text-white leading-snug">
                  {activeService.title}
                </h3>

                <p className="text-gray-300 text-sm mt-3.5 leading-relaxed">
                  {activeService.longDescription}
                </p>

                {/* Highlights List */}
                <div className="mt-5">
                  <h4 className="text-xs font-bold uppercase tracking-widest text-[#c9a227] mb-2.5">
                    Service Standards
                  </h4>
                  <ul className="space-y-2">
                    {activeService.highlights.map((item, idx) => (
                      <li key={idx} className="flex items-center gap-2.5 text-gray-300 text-xs">
                        <CheckCircle2 size={14} className="text-[#c9a227] shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Estimated Time and CTA Buttons */}
              <div className="mt-6 pt-5 border-t border-white/10 flex flex-col gap-4">
                <div className="flex items-center justify-between text-xs text-gray-400">
                  <span className="flex items-center gap-1.5">
                    <Clock size={14} className="text-yellow-500" />
                    Est. Duration:
                  </span>
                  <span className="font-bold text-white bg-white/10 px-2.5 py-1 rounded-md border border-white/10">
                    {activeService.estimatedTime}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={() => handleBookService(activeService.title)}
                    className="w-full btn-tactile-gold text-[#0a1628] font-bold text-xs py-3 rounded-xl transition-all text-center cursor-pointer shadow-md"
                  >
                    Book This Service
                  </button>
                  <a
                    href="tel:4697933130"
                    className="w-full btn-tactile-outline text-white font-bold text-xs py-3 rounded-xl transition-all text-center flex items-center justify-center"
                  >
                    Call Now
                  </a>
                </div>
              </div>

            </div>

          </div>
        </div>
      )}
    </section>
  )
}

