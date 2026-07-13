export function useBusinessStatus() {
  const now = new Date()
  const hour = now.getHours()
  const minute = now.getMinutes()
  const totalMinutes = hour * 60 + minute

  const openMinutes = 6 * 60
  const closeMinutes = 23 * 60

  const isOpen = totalMinutes >= openMinutes && totalMinutes < closeMinutes

  return {
    isOpen,
    label: isOpen ? 'Open · Closes 11 PM' : 'Closed · Opens at 6 AM',
  }
}
