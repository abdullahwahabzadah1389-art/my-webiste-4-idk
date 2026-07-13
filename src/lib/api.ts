import { useMutation } from '@tanstack/react-query'

// Base URL of your backend API (the Express server that sends emails via
// Resend). Set VITE_API_URL in Netlify's environment variables / a local
// .env file to point this at wherever that backend is deployed, e.g.
// https://your-api.onrender.com
const API_URL = (import.meta.env.VITE_API_URL as string | undefined)?.replace(/\/+$/, '') ?? ''

async function postJson<T>(path: string, body: unknown): Promise<T> {
  const res = await fetch(`${API_URL}${path}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  })

  if (!res.ok) {
    let message = `Request failed with status ${res.status}`
    try {
      const data = await res.json()
      message = data?.error ?? message
    } catch {
      // ignore body parse errors, fall back to generic message
    }
    throw new Error(message)
  }

  return res.json() as Promise<T>
}

export interface AppointmentInput {
  name: string
  phone?: string
  email?: string
  service: string
  customService?: string
  preferredDate?: string
  preferredTime?: string
  address?: string
  notes?: string
}

export interface ContactRequestInput {
  name: string
  phone?: string
  email?: string
  details: string
}

export interface SubmissionResult {
  success: boolean
}

export function useCreateAppointment() {
  return useMutation({
    mutationFn: (variables: { data: AppointmentInput }) =>
      postJson<SubmissionResult>('/api/appointments', variables.data),
  })
}

export function useCreateContactRequest() {
  return useMutation({
    mutationFn: (variables: { data: ContactRequestInput }) =>
      postJson<SubmissionResult>('/api/contact-requests', variables.data),
  })
}
