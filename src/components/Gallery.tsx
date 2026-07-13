import { Link } from 'wouter'
import { ArrowRight } from 'lucide-react'

const photos = [
  { src: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202026-07-04%20at%202.51.13%E2%80%AFPM-VKjt4ecWGSoDvRPcirUf8sekhUDyMo.png', alt: 'TV mounted above a wall fireplace in an elegant white living room', label: 'TV Mounting' },
  { src: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202026-07-04%20at%202.51.29%E2%80%AFPM-pikfsNFEtO6EI6Ka5QmM7WL4s0VrPL.png', alt: 'Large projection screen home cinema with in-wall speakers and leather recliners', label: 'Home Cinema Setup' },
  { src: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202026-07-04%20at%202.53.30%E2%80%AFPM-4xIx0XBl6sAQaGYcTAolZGwvL7rWUb.png', alt: 'Tesla EV wall charger installed next to electrical breaker panel', label: 'EV Charger Installation' },
  { src: '/gallery-tv-bedroom.png', alt: 'Large flat screen TV mounted flush on a bedroom accent wall with hidden cables', label: 'Bedroom TV Mount' },
  { src: '/gallery-speakers.png', alt: 'Wall-mounted surround sound speakers on both sides of a living room TV', label: 'Surround Sound Setup' },
  { src: '/gallery-cables.png', alt: 'Clean in-wall cable concealment with no visible wires behind mounted TV', label: 'Cable Concealment' },
  { src: '/gallery-light-fixture.jpg', alt: 'Electrician installing a recessed ceiling light fixture', label: 'Light Fixture Installation' },
  { src: '/gallery-chandelier.jpg', alt: 'Chandelier installed above a window in a dining room', label: 'Chandelier Installation' },
  { src: '/gallery-outlet.jpg', alt: 'Electrician installing a wall outlet', label: 'Electrical Outlet Installation' },
  { src: '/gallery-outdoor-lighting.png', alt: 'String lights and landscape lighting illuminating a backyard pool at night', label: 'Outdoor Lighting Installation' },
  { src: '/gallery-smart-home.png', alt: 'Hand adjusting a wall-mounted smart home thermostat panel', label: 'Smart Home System Installation' },
  { src: '/gallery-painting-new.jpg', alt: 'Professional painter rolling paint onto a turquoise interior wall with drop cloths and ladder', label: 'Painting Services' },
  { src: '/gallery-drywall.jpg', alt: 'Workers installing and finishing drywall on a ceiling', label: 'Drywall Services' },
  { src: '/gallery-security-camera.webp', alt: 'Technician installing an outdoor security camera under an eave', label: 'Security Camera Installation' },
  { src: '/gallery-home-entertainment.jpg', alt: 'Modern living room wall unit with mounted TV and entertainment storage', label: 'Home Entertainment Setup' },
]

function GalleryCard({ photo }: { photo: typeof photos[0] }) {
  return (
    <div className="group relative overflow-hidden rounded-2xl border border-white/10 shadow-lg w-[240px] sm:w-[300px] md:w-[340px] aspect-[4/3] flex-shrink-0">
      <div className="w-full h-full relative bg-slate-900">
        <img src={photo.src} alt={photo.alt} loading="lazy"
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
      </div>
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent px-5 py-4">
        <span className="text-white font-semibold text-xs sm:text-sm tracking-wide">{photo.label}</span>
      </div>
    </div>
  )
}

export default function Gallery() {
  const firstRow = photos.slice(0, 8)
  const secondRow = photos.slice(8)

  return (
    <section id="gallery" className="w-full py-20 px-4 bg-[#0a1628] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4">
        <p className="text-center text-[#c9a227] font-semibold uppercase tracking-widest text-sm mb-3">Real Work. Real Results.</p>
        <h2 className="text-center font-bold text-white text-3xl md:text-4xl mb-4 text-balance">Our Work Gallery</h2>
        <p className="text-center text-gray-400 max-w-xl mx-auto mb-12 leading-relaxed">
          Every installation is done with precision and care. Here are some of our recent jobs across the DFW metroplex.
        </p>
      </div>

      {/* Moving Gallery Container */}
      <div className="relative w-full overflow-hidden flex flex-col gap-6 py-4">
        {/* Left & Right Elegant Edge Fade Mask */}
        <div className="absolute inset-y-0 left-0 w-12 sm:w-32 bg-gradient-to-r from-[#0a1628] to-transparent z-10 pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-12 sm:w-32 bg-gradient-to-l from-[#0a1628] to-transparent z-10 pointer-events-none" />

        {/* Row 1 - Moves Left */}
        <div className="relative flex overflow-x-hidden w-full">
          <div className="flex w-max animate-marquee-left hover:[animation-play-state:paused]">
            {firstRow.map((photo, i) => (
              <div key={`row1-${i}`} className="px-3">
                <GalleryCard photo={photo} />
              </div>
            ))}
            {firstRow.map((photo, i) => (
              <div key={`row1-dup-${i}`} className="px-3">
                <GalleryCard photo={photo} />
              </div>
            ))}
          </div>
        </div>

        {/* Row 2 - Moves Right */}
        <div className="relative flex overflow-x-hidden w-full">
          <div className="flex w-max animate-marquee-right hover:[animation-play-state:paused]">
            {secondRow.map((photo, i) => (
              <div key={`row2-${i}`} className="px-3">
                <GalleryCard photo={photo} />
              </div>
            ))}
            {secondRow.map((photo, i) => (
              <div key={`row2-dup-${i}`} className="px-3">
                <GalleryCard photo={photo} />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* View Portfolio Button */}
      <div className="text-center mt-12 mb-6">
        <Link to="/gallery" className="inline-flex items-center gap-2.5 bg-[#c9a227] hover:bg-yellow-500 text-[#0a1628] font-bold px-8 py-3.5 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5 cursor-pointer">
          <span>Explore Interactive Gallery & Project Details</span>
          <ArrowRight size={16} />
        </Link>
      </div>

      <div className="max-w-6xl mx-auto">
        <div className="text-center mt-10 flex flex-col sm:flex-row items-center justify-center gap-2 text-gray-500 text-sm">
          <span>More photos on our <a href="https://www.instagram.com/trusttvmounting" target="_blank" rel="noopener noreferrer" className="text-[#c9a227] underline underline-offset-2 hover:text-yellow-400 transition-colors">Instagram</a></span>
          <span className="hidden sm:inline">·</span>
          <span>and our <a href="https://maps.google.com/?q=Trust+TV+Mounting" target="_blank" rel="noopener noreferrer" className="text-[#c9a227] underline underline-offset-2 hover:text-yellow-400 transition-colors">Google Business page</a></span>
        </div>
      </div>
    </section>
  )
}

