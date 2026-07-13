import { useState, FormEvent, useEffect } from 'react'
import { CheckCircle, Loader2 } from 'lucide-react'
import { useCreateAppointment } from '@/lib/api'

const services = [
  'TV Mounting', 'Cable Concealment', 'Home Cinema Installation',
  'Speaker Installation', 'Curtain & Blind Setup', 'Security Cameras',
  'Light Fixture Installation', 'Chandelier Installation',
  'Electrical Outlet Installation', 'Outdoor Lighting Installation',
  'Smart Home System Installation', 'Drywall Services',
  'Painting Services', 'Any Handyman Projects', 'Other',
]

export default function AppointmentForm() {
  const [selectedService, setSelectedService] = useState('')
  const [showCustomService, setShowCustomService] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState('')
  const { mutate, isPending } = useCreateAppointment()

  // Listen to select-service custom event from Services component click
  useEffect(() => {
    const handleSelectService = (e: Event) => {
      const customEvent = e as CustomEvent<string>
      const serviceName = customEvent.detail
      if (serviceName) {
        if (services.includes(serviceName)) {
          setSelectedService(serviceName)
          setShowCustomService(serviceName === 'Other')
        } else {
          setSelectedService('Other')
          setShowCustomService(true)
        }
      }
    }
    window.addEventListener('select-service', handleSelectService)
    return () => window.removeEventListener('select-service', handleSelectService)
  }, [])

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setError('')
    const formData = new FormData(e.currentTarget)
    const get = (key: string) => (formData.get(key) as string | null) ?? undefined

    if (!get('email') && !get('phone')) {
      setError('Please provide an email address or a phone number.')
      return
    }

    mutate(
      {
        data: {
          name: get('name') ?? '',
          phone: get('phone') || undefined,
          email: get('email') ?? '',
          service: get('service') ?? '',
          customService: get('custom_service') || undefined,
          preferredDate: get('preferred_date') || undefined,
          preferredTime: get('preferred_time') || undefined,
          address: get('address') || undefined,
          notes: get('notes') || undefined,
        },
      },
      {
        onSuccess: () => setSubmitted(true),
        onError: () => setError('Something went wrong. Please call us at (469) 793-3130.'),
      },
    )
  }

  if (submitted) {
    return (
      <div className="mt-10 flex flex-col items-center justify-center gap-4 py-16">
        <CheckCircle size={56} className="text-green-500" />
        <h3 className="text-[#0a1628] font-bold text-2xl text-center">Appointment Requested!</h3>
        <p className="text-gray-500 text-center max-w-sm">We'll confirm your appointment within 1 hour! You can also call or text us at <a href="tel:4697933130" className="text-[#c9a227] font-semibold">(469) 793-3130</a>.</p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="mt-10 space-y-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label className="text-sm font-medium text-gray-700 block mb-1.5">Full Name *</label>
          <input name="name" required type="text" placeholder="Jane Smith"
            className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:border-[#c9a227] focus:outline-none focus:ring-2 focus:ring-[#c9a227]/20 transition" />
        </div>
        <div>
          <label className="text-sm font-medium text-gray-700 block mb-1.5">Phone Number</label>
          <input name="phone" type="tel" placeholder="(555) 555-5555"
            className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:border-[#c9a227] focus:outline-none focus:ring-2 focus:ring-[#c9a227]/20 transition" />
        </div>
      </div>
      <div>
        <label className="text-sm font-medium text-gray-700 block mb-1.5">Email Address</label>
        <input name="email" type="email" placeholder="jane@example.com"
          className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:border-[#c9a227] focus:outline-none focus:ring-2 focus:ring-[#c9a227]/20 transition" />
        <p className="text-gray-400 text-xs mt-1">Provide an email or a phone number so we can reach you </p>
      </div>
      <div>
        <label className="text-sm font-medium text-gray-700 block mb-1.5">Service Needed *</label>
        <select 
          name="service" 
          required 
          value={selectedService}
          onChange={(e) => {
            const val = e.target.value
            setSelectedService(val)
            setShowCustomService(val === 'Other')
          }}
          className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:border-[#c9a227] focus:outline-none focus:ring-2 focus:ring-[#c9a227]/20 transition bg-white"
        >
          <option value="">Select a service&hellip;</option>
          {services.map((s) => <option key={s} value={s}>{s}</option>)}
        </select>
      </div>
      {showCustomService && (
        <div>
          <label className="text-sm font-medium text-gray-700 block mb-1.5">Describe your project</label>
          <input name="custom_service" type="text" placeholder="Tell us more&hellip;"
            className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:border-[#c9a227] focus:outline-none focus:ring-2 focus:ring-[#c9a227]/20 transition" />
        </div>
      )}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label className="text-sm font-medium text-gray-700 block mb-1.5">Preferred Date</label>
          <input name="preferred_date" type="date"
            className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:border-[#c9a227] focus:outline-none focus:ring-2 focus:ring-[#c9a227]/20 transition" />
        </div>
        <div>
          <label className="text-sm font-medium text-gray-700 block mb-1.5">Preferred Time</label>
          <input name="preferred_time" type="time"
            className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:border-[#c9a227] focus:outline-none focus:ring-2 focus:ring-[#c9a227]/20 transition" />
        </div>
      </div>
      <div>
        <label className="text-sm font-medium text-gray-700 block mb-1.5">Address</label>
        <input name="address" type="text" placeholder="123 Main St, McKinney, TX 75070"
          className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:border-[#c9a227] focus:outline-none focus:ring-2 focus:ring-[#c9a227]/20 transition" />
      </div>
      <div>
        <label className="text-sm font-medium text-gray-700 block mb-1.5">Additional Notes</label>
        <textarea name="notes" rows={3} placeholder="TV size, wall type, any special instructions&hellip;"
          className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:border-[#c9a227] focus:outline-none focus:ring-2 focus:ring-[#c9a227]/20 resize-none transition" />
      </div>
      {error && <p className="text-red-500 text-sm">{error}</p>}
      <button type="submit" disabled={isPending}
        className="w-full bg-[#c9a227] hover:bg-[#e2be4a] disabled:opacity-60 text-[#0a1628] font-bold py-4 rounded-xl text-base transition flex items-center justify-center gap-2">
        {isPending ? (<><Loader2 size={18} className="animate-spin" />Sending&hellip;</>) : 'Request Appointment'}
      </button>
      <p className="text-center text-gray-400 text-xs">We'll confirm within 1 hour &middot; No payment required</p>
    </form>
  );
}
