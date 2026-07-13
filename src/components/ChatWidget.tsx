import { useState, useRef, useEffect, KeyboardEvent } from 'react'
import { MessageCircle, X, ChevronLeft, AlignJustify, ChevronDown, Send } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

interface Message { role: 'bot' | 'user'; text: string }

const PHONE = '(469) 793-3130'
const EMAIL = 'trusttvmountingservices@gmail.com'

const QUICK_REPLIES: Record<string, string[]> = {
  initial: ['How much does mounting cost?', 'Do you offer same-day service?', 'What areas do you serve?', 'Book an appointment'],
  pricing: ["What's included in the price?", 'Do you charge extra for cable hiding?', 'Do you give free estimates?'],
  booking: ['Call to schedule', 'What info do I need?', 'What areas do you serve?'],
  services: ['TV Mounting', 'Cable Concealment', 'Home Theater', 'Speaker Install', 'Security Cameras'],
}

interface BotReply { text: string; quickReplies?: string[] }

function buildReply(text: string, quickReplies?: string[]): BotReply {
  return { text, quickReplies }
}

function getResponse(input: string): BotReply {
  const msg = input.toLowerCase().trim()

  if (/^(hi+|hey+|hello|howdy|good\s*(morning|afternoon|evening)|sup|yo|what'?s up|hiya)\b/.test(msg))
    return buildReply(`Hey there! Welcome to Trust TV Mounting & Home Solutions. I'm here to help with pricing, booking, or any questions about our services. What can I help you with?`, QUICK_REPLIES.initial)

  if (/thank|thanks|thx|appreciate|helpful/.test(msg))
    return buildReply(`You're very welcome! Is there anything else I can help with? We're available 7 days a week — feel free to ask anytime.`, QUICK_REPLIES.initial)

  if (/^(bye|goodbye|see ya|later|take care|cya)\b/.test(msg))
    return buildReply(`Thanks for reaching out! Don't hesitate to come back if you have more questions. Have a great day!`)

  if (/pric|cost|how much|fee|rate|charg|expens|cheap|afford|\$|quote|estimate/.test(msg)) {
    if (/cable|wire|cord|conceal|hide/.test(msg))
      return buildReply(`Cable concealment starts from $39! We'll give you an exact quote before we start based on your setup. Want to schedule a free estimate?`, QUICK_REPLIES.booking)
    if (/theater|cinema|projector|surround/.test(msg))
      return buildReply(`Home theater setups start from $99. We'll assess your space and give you a free quote first. Sound good?`, QUICK_REPLIES.booking)
    if (/speaker|audio|sound/.test(msg))
      return buildReply(`Speaker installation starts from $39. Free estimate always included!`, QUICK_REPLIES.booking)
    if (/camera|security|surveillance/.test(msg))
      return buildReply(`Security camera installation starts from $49. We'll give you a free on-site estimate.`, QUICK_REPLIES.booking)
    if (/curtain|blind|shade|window/.test(msg))
      return buildReply(`Curtain rod and blind installation starts from $39 per window. Free estimate included.`, QUICK_REPLIES.booking)
    return buildReply(`TV mounting starts from $59! The final price depends on your wall type, TV size, and any add-ons like cable concealment.\n\nWe always give you a free estimate before any work begins — zero surprises. Want to schedule one?`, QUICK_REPLIES.pricing)
  }

  if (/includ|cover|come with|bring|tool|hardware|mount|bracket/.test(msg) && /what|do you|will you/.test(msg))
    return buildReply(`Everything is included! We bring:\n\n- All tools and hardware\n- The mounting bracket (standard flat or tilting)\n- Level, studs finder, drill\n- Cleanup when we're done\n\nYou don't need to buy or prep anything. Just let us know your TV size and we handle the rest.`)

  if (/free|estimat|no charge|no cost|visit/.test(msg))
    return buildReply(`Yes! All estimates are completely free with no obligation. We assess your wall, TV size, and setup needs before giving you a firm price. Call or text us at ${PHONE} to schedule yours.`, QUICK_REPLIES.booking)

  if (/book|appoint|schedul|reserv|set up|arrange|slot|time/.test(msg))
    return buildReply(`Booking is easy! You can:\n\n1. Scroll up to the **Book an Appointment** section\n2. Call or text us at ${PHONE}\n\nWe typically confirm within 1 hour. What service are you looking to schedule?`, QUICK_REPLIES.services)

  if (/same.?day|today|urgent|asap|right now|immediately|rush/.test(msg))
    return buildReply(`Same-day service is available most days! Call or text us at ${PHONE} right now and we'll check the next available slot. We typically confirm within 1 hour!`)

  if (/hour|open|when|availab|weekend|sunday|saturday|monday|tuesday|wednesday|thursday|friday/.test(msg))
    return buildReply(`We're available **7 days a week**, including weekends, typically until 11 PM. Same-day and next-day appointments are often available.\n\nCall or text anytime: ${PHONE}`)

  if (/\btv\b|television|mount|hang|wall|install|screen/.test(msg)) {
    if (/fireplace|above.*fire|mantel/.test(msg))
      return buildReply(`Absolutely! Above-fireplace mounting is one of our specialties. We handle:\n\n- Heat clearance assessment\n- Drilling into brick, stone, or drywall\n- In-wall cable routing for a clean finish\n\nStarting from $79. Want a free estimate?`, QUICK_REPLIES.booking)
    if (/brick|concrete|stone|tile|plaster/.test(msg))
      return buildReply(`No wall type is a problem for us! We mount on drywall, brick, stone, concrete, plaster, and tile. Starting from $59.`, QUICK_REPLIES.pricing)
    return buildReply(`TV mounting is our #1 service! We professionally mount any TV on any wall — drywall, brick, stone, concrete, tile, or above fireplaces. Starting from **$59** with a free estimate.\n\nWe bring all tools, hardware, and clean up afterward. Want to book?`, QUICK_REPLIES.booking)
  }

  if (/cable|wire|cord|conceal|hide|mess|visible|clean look|tidy/.test(msg))
    return buildReply(`We hide cables two ways:\n\n- **In-wall routing** — cables run completely inside the wall (cleanest look)\n- **Surface raceway** — cables hidden in a paint-matched channel\n\nStarts from $39. Totally worth it for that clean look!`, QUICK_REPLIES.pricing)

  if (/theater|cinema|projector|screen|home theater|media room/.test(msg))
    return buildReply(`We build complete home theater setups! Projector mounting, surround sound, AV receiver setup, and full cable management. Every setup tuned and tested before we leave. Free estimate — call ${PHONE}!`, QUICK_REPLIES.booking)

  if (/speaker|soundbar|audio|sound system|surround|subwoofer/.test(msg))
    return buildReply(`We install all types of speakers:\n\n- In-wall & ceiling speakers\n- Soundbar mounting & wiring\n- Full surround sound systems (5.1, 7.1)\n- Outdoor speakers\n\nStarting from $39. Want a free estimate?`, QUICK_REPLIES.booking)

  if (/camera|security|surveillance|cctv|ring|nest|arlo|doorbell/.test(msg))
    return buildReply(`We install security camera systems of all types — indoor & outdoor cameras, doorbell cameras (Ring, Nest, Arlo), and full CCTV systems. Starting from $49. Free estimate!`, QUICK_REPLIES.booking)

  if (/curtain|blind|shade|drape|rod|valance|window cover/.test(msg))
    return buildReply(`We install curtain rods, blinds, shades, and valances with proper anchoring and level alignment. Starting from $39 per window — bundle discounts for multiple windows.`, QUICK_REPLIES.booking)

  if (/handyman|shelf|shelv|furniture|assembl|mirror|picture|art|hang|fix|repair/.test(msg))
    return buildReply(`We handle all kinds of handyman projects:\n\n- Shelf & floating shelf installation\n- Furniture assembly\n- Mirror & artwork hanging\n- General home fixes\n\nCall ${PHONE} and describe your project!`)

  if (/area|serv|locat|near me|where|city|town|mckinney|frisco|plano|allen|prosper|celina|dfw|dallas/.test(msg))
    return buildReply(`We proudly serve the entire DFW metroplex, including:\n\nMcKinney, Frisco, Plano, Allen, Prosper, Celina, Little Elm, The Colony, Lewisville, Carrollton, Richardson, Garland\n\nNot sure if we cover your area? Just call or text at ${PHONE} — we probably do!`)

  if (/phone|call|text|number|contact|email|reach|get in touch/.test(msg))
    return buildReply(`Here's how to reach us:\n\nPhone/Text: ${PHONE}\nEmail: ${EMAIL}\nInstagram: @trusttvmounting\n\nWe're available 7 days a week until 11 PM. Fastest response is by call or text!`)

  if (/review|rating|star|reputation|trust|reliab|good|best|recommend/.test(msg))
    return buildReply(`We're proud to have a **5.0-star rating** from 300+ reviews — one of the highest-rated home service providers in the DFW area! You can check our reviews on Google.`)

  if (/warrant|guarante|damage|break|fall|safe|secure|liable/.test(msg))
    return buildReply(`Every installation is guaranteed to be secure and level. If anything isn't right, we'll come back and fix it — no questions asked. We treat your home with care.`)

  if (/how long|duration|fast|quick/.test(msg))
    return buildReply(`Most standard TV mounts take **45-90 minutes**. Here's a rough breakdown:\n\n- Basic TV mount: 45-60 min\n- Mount + cable concealment: 90-120 min\n- Full home theater: 3-6 hours\n\nWe work efficiently without cutting corners.`)

  if (/service|offer|do you do|what can|what do you|list/.test(msg))
    return buildReply(`Here's everything we do:\n\nTV Mounting (any wall, any size)\nCable Concealment (in-wall & raceway)\nHome Theater Installation\nSpeaker Installation\nCurtain & Blind Setup\nSecurity Camera Installation\nGeneral Handyman Projects\n\nWhat are you interested in?`, QUICK_REPLIES.services)

  return buildReply(`Great question! For the most accurate answer, the best way is to call or text us directly at **${PHONE}** — we're available 7 days a week until 11 PM.\n\nOr you can ask me about:`, QUICK_REPLIES.initial)
}

function formatText(text: string) {
  return text.split('\n').map((line, i) => {
    const parts = line.split(/\*\*(.+?)\*\*/g)
    return (
      <span key={i}>
        {parts.map((part, j) =>
          j % 2 === 1 ? <strong key={j} className="font-extrabold">{part}</strong> : part
        )}
        {i < text.split('\n').length - 1 && <br />}
      </span>
    )
  })
}

function TypewriterText({ 
  text, 
  speed = 15, 
  onComplete 
}: { 
  text: string; 
  speed?: number; 
  onComplete?: () => void 
}) {
  const [length, setLength] = useState(0)

  useEffect(() => {
    setLength(0)
    let currentLength = 0
    const interval = setInterval(() => {
      currentLength++
      setLength(currentLength)
      if (currentLength >= text.length) {
        clearInterval(interval)
        onComplete?.()
      }
    }, speed)
    return () => clearInterval(interval)
  }, [text, speed])

  const substring = text.slice(0, length)
  return <>{formatText(substring)}</>
}

type Mode = 'closed' | 'preview' | 'open'
type Stage = 'initial' | 'chat'

export default function ChatWidget() {
  const [mode, setMode] = useState<Mode>('closed')
  const [stage, setStage] = useState<Stage>('initial')
  const [messages, setMessages] = useState<Message[]>([])
  const [quickReplies, setQuickReplies] = useState<string[]>(QUICK_REPLIES.initial)
  const [input, setInput] = useState('')
  const [typing, setTyping] = useState(false)
  const scrollRef = useRef<HTMLDivElement>(null)

  const [greetingTyped, setGreetingTyped] = useState(false)
  const [previewTyping, setPreviewTyping] = useState(true)
  const [typedIndex, setTypedIndex] = useState<number>(-1)

  useEffect(() => {
    const t = setTimeout(() => setMode('preview'), 3000)
    return () => clearTimeout(t)
  }, [])

  useEffect(() => {
    if (mode === 'preview') {
      setPreviewTyping(true)
      setGreetingTyped(false)
      const t = setTimeout(() => {
        setPreviewTyping(false)
      }, 1000)
      return () => clearTimeout(t)
    }
  }, [mode])

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight
  }, [messages, typing])

  function handleMinimize() {
    setMode('closed')
    setTimeout(() => setMode('preview'), 1000)
  }

  function sendMessage(text: string) {
    if (!text.trim()) return
    setInput('')
    setQuickReplies([])
    const userMsg: Message = { role: 'user', text }
    setMessages((prev) => [...prev, userMsg])
    setTyping(true)
    const delay = 600 + Math.random() * 600
    setTimeout(() => {
      const { text: replyText, quickReplies: replyQuickReplies } = getResponse(text)
      setMessages((prev) => [...prev, { role: 'bot', text: replyText }])
      setQuickReplies(replyQuickReplies ?? [])
      setTyping(false)
    }, delay)
  }

  function handleKeyDown(e: KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter') sendMessage(input)
  }

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
      <AnimatePresence>
        {mode === 'preview' && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.85, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.85, y: 15 }}
            transition={{ type: 'spring', stiffness: 350, damping: 25 }}
            className="flex flex-col items-end gap-2"
          >
            <button
              onClick={() => setMode('closed')}
              aria-label="Dismiss"
              className="w-8 h-8 bg-white hover:bg-gray-100 text-gray-600 rounded-full flex items-center justify-center shadow-md transition-all self-end cursor-pointer hover:scale-105 active:scale-95"
            >
              <X size={14} />
            </button>
            <div className="bg-white rounded-2xl shadow-xl px-4 py-3 max-w-[240px] border border-gray-100/80">
              {previewTyping ? (
                <div className="flex items-center gap-1.5 py-1 px-2 justify-center">
                  <span className="w-1.5 h-1.5 bg-[#c9a227] rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                  <span className="w-1.5 h-1.5 bg-[#c9a227] rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                  <span className="w-1.5 h-1.5 bg-[#c9a227] rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                </div>
              ) : (
                <p className="text-gray-900 font-bold text-sm leading-snug">
                  <TypewriterText 
                    text="Hi! How can we help?" 
                    speed={40} 
                    onComplete={() => setGreetingTyped(true)} 
                  />
                </p>
              )}
            </div>
            
            {greetingTyped && (
              <motion.div 
                initial="hidden"
                animate="visible"
                variants={{
                  visible: {
                    transition: { staggerChildren: 0.1 }
                  }
                }}
                className="flex flex-col gap-2 w-full mt-1"
              >
                <motion.button
                  variants={{
                    hidden: { opacity: 0, scale: 0.9, y: 10 },
                    visible: { opacity: 1, scale: 1, y: 0, transition: { type: 'spring', stiffness: 400, damping: 25 } }
                  }}
                  onClick={() => { setMode('open'); setStage('chat'); sendMessage('I have a question') }}
                  className="bg-white hover:bg-gray-50 text-[#c9a227] font-bold text-sm px-5 py-2.5 rounded-full shadow-md border border-[#c9a227]/30 hover:border-[#c9a227] transition-all w-[200px] text-center cursor-pointer transform hover:scale-[1.02] active:scale-[0.98]"
                >
                  I have a question
                </motion.button>
                <motion.button
                  variants={{
                    hidden: { opacity: 0, scale: 0.9, y: 10 },
                    visible: { opacity: 1, scale: 1, y: 0, transition: { type: 'spring', stiffness: 400, damping: 25 } }
                  }}
                  onClick={() => { setMode('open'); setStage('chat'); sendMessage('Tell me more about your services') }}
                  className="bg-white hover:bg-gray-50 text-[#c9a227] font-bold text-sm px-5 py-2.5 rounded-full shadow-md border border-[#c9a227]/30 hover:border-[#c9a227] transition-all w-[200px] text-center cursor-pointer transform hover:scale-[1.02] active:scale-[0.98]"
                >
                  Tell me more
                </motion.button>
              </motion.div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {mode === 'open' && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: 'spring', stiffness: 350, damping: 26 }}
            className="bg-white rounded-2xl shadow-2xl border border-gray-100 w-80 flex flex-col overflow-hidden" 
            style={{ height: 480 }}
          >
            <div className="bg-[#0a1628] px-4 py-3 flex items-center justify-between shrink-0">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-full bg-[#c9a227] flex items-center justify-center">
                  <MessageCircle size={14} className="text-white" />
                </div>
                <div>
                  <p className="text-white font-semibold text-sm">Trust TV Mounting</p>
                  <p className="text-green-400 text-[10px] flex items-center gap-1">
                    <span className="w-1.5 h-1.5 bg-green-400 rounded-full inline-block animate-pulse" />
                    Online · Typically replies instantly
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                {stage === 'chat' && (
                  <button onClick={() => { setStage('initial'); setMessages([]); setTypedIndex(-1); setQuickReplies(QUICK_REPLIES.initial) }} aria-label="Back" className="text-white/60 hover:text-white transition cursor-pointer">
                    <ChevronLeft size={18} />
                  </button>
                )}
                <button onClick={() => setMode('preview')} aria-label="Minimize" className="text-white/60 hover:text-white transition cursor-pointer">
                  <AlignJustify size={18} />
                </button>
                <button onClick={handleMinimize} aria-label="Close" className="text-white/60 hover:text-white transition cursor-pointer">
                  <X size={18} />
                </button>
              </div>
            </div>

            {stage === 'initial' ? (
              <div className="flex-1 flex flex-col items-center justify-center px-5 py-6 text-center overflow-y-auto">
                <div className="w-14 h-14 rounded-full bg-[#c9a227]/10 flex items-center justify-center mb-4">
                  <MessageCircle size={28} className="text-[#c9a227]" />
                </div>
                <p className="text-[#0a1628] font-bold text-lg">Hi there!</p>
                <p className="text-gray-500 text-sm mt-1 mb-6 leading-relaxed">
                  Ask anything about TV mounting, pricing, booking, or our services — I'll answer right away.
                </p>
                <div className="flex flex-col gap-2 w-full">
                  {QUICK_REPLIES.initial.map((q) => (
                    <button
                      key={q}
                      onClick={() => { setStage('chat'); sendMessage(q) }}
                      className="text-left text-sm text-[#0a1628] bg-gray-50 hover:bg-[#c9a227]/10 border border-gray-200 hover:border-[#c9a227]/40 px-4 py-2.5 rounded-xl transition cursor-pointer"
                    >
                      {q}
                    </button>
                  ))}
                  <button
                    onClick={() => { setStage('chat') }}
                    className="text-sm text-gray-400 hover:text-[#c9a227] mt-1 transition cursor-pointer"
                  >
                    Ask something else →
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex-1 flex flex-col overflow-hidden">
                <div ref={scrollRef} className="flex-1 overflow-y-auto px-4 py-4 space-y-3">
                  {messages.length === 0 && (
                    <div className="bg-gray-50 rounded-xl px-4 py-3 text-sm text-gray-600 max-w-[88%] leading-relaxed border border-gray-100">
                      Hey! How can I help you today? Ask me about pricing, services, availability, or anything else.
                    </div>
                  )}
                  {messages.map((msg, i) => (
                    <motion.div 
                      key={i} 
                      initial={{ opacity: 0, y: 15, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      transition={{ type: 'spring', stiffness: 450, damping: 25 }}
                      className={msg.role === 'user' ? 'flex justify-end' : 'flex justify-start'}
                    >
                      <div
                        className={
                          msg.role === 'user'
                            ? 'bg-[#c9a227] text-[#0a1628] rounded-2xl rounded-br-sm px-4 py-2.5 text-sm max-w-[88%] font-medium leading-relaxed shadow-sm'
                            : 'bg-gray-50 text-gray-700 rounded-2xl rounded-bl-sm px-4 py-2.5 text-sm max-w-[88%] leading-relaxed border border-gray-100'
                        }
                      >
                        {msg.role === 'bot' ? (
                          i > typedIndex ? (
                            <TypewriterText 
                              text={msg.text} 
                              speed={12} 
                              onComplete={() => setTypedIndex(i)} 
                            />
                          ) : (
                            formatText(msg.text)
                          )
                        ) : (
                          msg.text
                        )}
                      </div>
                    </motion.div>
                  ))}
                  {typing && (
                    <div className="flex justify-start">
                      <div className="bg-gray-50 rounded-2xl rounded-bl-sm px-4 py-3 flex items-center gap-1 border border-gray-100">
                        <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                        <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                        <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                      </div>
                    </div>
                  )}
                </div>

                {quickReplies.length > 0 && !typing && (
                  <div className="px-3 pb-2 flex gap-1.5 overflow-x-auto" style={{ scrollbarWidth: 'none' }}>
                    {quickReplies.map((qr) => (
                      <button
                        key={qr}
                        onClick={() => sendMessage(qr)}
                        className="shrink-0 text-[11px] text-[#0a1628] bg-[#c9a227]/10 hover:bg-[#c9a227]/25 border border-[#c9a227]/40 px-2.5 py-1 rounded-full transition whitespace-nowrap font-medium cursor-pointer"
                      >
                        {qr}
                      </button>
                    ))}
                  </div>
                )}

                <div className="border-t border-gray-100 px-4 py-3 shrink-0">
                  <div className="flex items-center gap-2 bg-gray-50 rounded-xl px-3 py-2 border border-gray-100/50">
                    <input
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      onKeyDown={handleKeyDown}
                      placeholder="Type a message…"
                      className="flex-1 bg-transparent text-sm text-gray-700 placeholder-gray-400 outline-none"
                    />
                    <button
                      onClick={() => sendMessage(input)}
                      aria-label="Send message"
                      className="text-gray-400 hover:text-[#c9a227] transition-colors disabled:opacity-40 cursor-pointer"
                      disabled={!input.trim()}
                    >
                      <Send size={17} />
                    </button>
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      <button
        onClick={() => {
          if (mode === 'closed') setMode('preview')
          else if (mode === 'preview') { setMode('open'); setStage('initial') }
          else handleMinimize()
        }}
        className="relative w-14 h-14 bg-[#c9a227] hover:bg-[#e2be4a] rounded-full flex items-center justify-center shadow-lg transition-colors cursor-pointer"
        aria-label={mode === 'open' ? 'Minimize chat' : 'Open chat support'}
      >
        {mode === 'open' ? <ChevronDown size={26} className="text-white" /> : <MessageCircle size={26} className="text-white" />}
        {(mode === 'closed' || mode === 'preview') && (
          <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center text-white text-[11px] font-bold">1</span>
        )}
      </button>
    </div>
  )
}
