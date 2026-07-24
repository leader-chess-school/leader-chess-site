import { useEffect, useRef } from 'react'
import { useLocation } from 'react-router-dom'
import { hit } from '@/lib/analytics'
import { captureUtm } from '@/lib/utm'

// Capture UTM once on first load; send a Metrika pageview on each SPA route
// change (the first pageview is already counted by the counter in index.html).
export default function RouteTracker() {
  const { pathname } = useLocation()
  const first = useRef(true)

  useEffect(() => {
    captureUtm()
  }, [])

  useEffect(() => {
    if (first.current) {
      first.current = false
      return
    }
    hit(window.location.href)
  }, [pathname])

  return null
}
