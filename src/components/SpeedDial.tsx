import { useState, useEffect, useRef } from 'react'
import { Phone, MessageSquare } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

export default function SpeedDial() {
  const [isOpen, setIsOpen] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  // Close when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  return (
    <div ref={containerRef} className="fixed bottom-5 left-5 z-50 flex flex-col items-start">
      {/* Expanded Speed Dial Actions */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial="closed"
            animate="open"
            exit="closed"
            variants={{
              open: {
                transition: { staggerChildren: 0.1, delayChildren: 0.05 }
              },
              closed: {
                transition: { staggerChildren: 0.05, staggerDirection: -1 }
              }
            }}
            className="flex flex-col items-start gap-3 mb-3 pl-1"
          >
            {/* Call Us Option */}
            <motion.div
              variants={{
                open: { opacity: 1, y: 0, scale: 1 },
                closed: { opacity: 0, y: 20, scale: 0.8 }
              }}
              className="flex items-center gap-2.5 group"
            >
              <a
                href="tel:4697933130"
                className="w-10 h-10 rounded-full bg-[#15c05c] hover:bg-[#12a64f] text-white flex items-center justify-center shadow-lg transition-transform duration-200 hover:scale-110 active:scale-95"
                aria-label="Call us"
              >
                <Phone size={16} className="text-white stroke-[2.5]" />
              </a>
              <div className="bg-white text-[#0a1628] font-bold text-xs px-3 py-1.5 rounded-full shadow-md border border-gray-100/80">
                Call us
              </div>
            </motion.div>

            {/* Text Us Option */}
            <motion.div
              variants={{
                open: { opacity: 1, y: 0, scale: 1 },
                closed: { opacity: 0, y: 20, scale: 0.8 }
              }}
              className="flex items-center gap-2.5 group"
            >
              <a
                href="sms:4697933130"
                className="w-10 h-10 rounded-full bg-[#2979ff] hover:bg-[#1c66e2] text-white flex items-center justify-center shadow-lg transition-transform duration-200 hover:scale-110 active:scale-95"
                aria-label="Text us"
              >
                <MessageSquare size={16} className="text-white stroke-[2.5]" />
              </a>
              <div className="bg-white text-[#0a1628] font-bold text-xs px-3 py-1.5 rounded-full shadow-md border border-gray-100/80">
                Text us
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Trigger Button */}
      <div className="flex items-center">
        <button
          onClick={() => setIsOpen(!isOpen)}
          aria-label={isOpen ? 'Close contact menu' : 'Need more help? Contact us'}
          className="w-11 h-11 rounded-full bg-[#c9a227] hover:bg-yellow-500 text-white flex items-center justify-center shadow-2xl border border-yellow-400/20 transition-all duration-300 transform hover:scale-105 active:scale-95 cursor-pointer relative z-10"
        >
          {/* Pulsing ring around the button when closed to attract attention */}
          {!isOpen && (
            <span className="absolute -inset-1 bg-[#c9a227]/30 rounded-full blur-sm opacity-75 animate-pulse pointer-events-none" />
          )}

          <motion.div
            animate={{ rotate: isOpen ? 135 : 0 }}
            transition={{ type: 'spring', stiffness: 200, damping: 15 }}
            className="flex items-center justify-center"
          >
            <Phone size={18} className="text-[#22c55e] stroke-[2.5]" />
          </motion.div>
        </button>

        {/* Floating label next to the button when closed */}
        <AnimatePresence>
          {!isOpen && (
            <motion.div
              initial={{ opacity: 0, x: -10, scale: 0.95 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: -10, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              onClick={() => setIsOpen(true)}
              className="ml-2.5 bg-white text-[#0a1628] font-extrabold text-xs px-3 py-1.5 rounded-full shadow-xl border border-gray-100 cursor-pointer hover:bg-gray-50 transition-colors select-none whitespace-nowrap"
            >
              Need more help?
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}


