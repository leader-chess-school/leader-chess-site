import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { CONTACT, STICKY } from '@/content/home'

type Props = {
  onCTA: () => void
  label?: string
}

export default function StickyCTA({ onCTA, label = STICKY.cta }: Props) {
  const location = useLocation()
  const [heroPassed, setHeroPassed] = useState(false)
  const [formInView, setFormInView] = useState(false)

  // Reveal once the hero (with its own CTA) is scrolled out. On pages without
  // a hero, reveal after a small scroll.
  useEffect(() => {
    const onScroll = () => {
      const hero = document.getElementById('hero')
      if (!hero) {
        setHeroPassed(window.scrollY > 40)
        return
      }
      setHeroPassed(hero.getBoundingClientRect().bottom < 64)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [location.pathname])

  // Hide while the lead form is on screen — the bar would otherwise cover its
  // submit button. Reappears once the form scrolls out of view.
  useEffect(() => {
    const form = document.getElementById('lead-form')
    if (!form) {
      setFormInView(false)
      return
    }
    const io = new IntersectionObserver(
      ([entry]) => setFormInView(entry.isIntersecting),
      { threshold: 0 },
    )
    io.observe(form)
    return () => io.disconnect()
  }, [location.pathname])

  const visible = heroPassed && !formInView

  return (
    <div className={'v4v-sticky' + (visible ? ' show' : '')}>
      <button type="button" className="v4v-btn primary block" onClick={onCTA}>
        {label}
      </button>
      <a
        className="v4v-btn secondary"
        href={`tel:${CONTACT.phoneTel}`}
        aria-label={STICKY.callAria}
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path
            d="M22 16.92V21a1 1 0 0 1-1.09 1 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.79 19.79 0 0 1 3.21 4.18 1 1 0 0 1 4.2 3H8.3a1 1 0 0 1 1 .75c.13.94.36 1.85.69 2.71a1 1 0 0 1-.23 1L8.09 9.13a16 16 0 0 0 6 6l1.66-1.66a1 1 0 0 1 1-.23c.86.33 1.77.56 2.71.69a1 1 0 0 1 .75 1z"
            stroke="#001E2B"
            strokeWidth="1.6"
            strokeLinejoin="round"
          />
        </svg>
      </a>
    </div>
  )
}
