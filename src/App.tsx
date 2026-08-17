import { useEffect, useState } from 'react'
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom'
import Home from '@/pages/Home'
import Prices from '@/pages/Prices'
import Schedule from '@/pages/Schedule'
import NotFound from '@/pages/NotFound'
import PromoStrip from '@/components/PromoStrip'
import TopNav from '@/components/TopNav'
import Footer from '@/components/Footer'
import StickyCTA from '@/components/StickyCTA'
import MenuOverlay from '@/components/MenuOverlay'
import Crumbs from '@/components/Crumbs'
import RouteTracker from '@/components/RouteTracker'
import { pageFromPath, pathFor, crumbFor, type PageId } from '@/content/nav'

export default function App() {
  const location = useLocation()
  const navigateRouter = useNavigate()
  const page: PageId = pageFromPath(location.pathname)
  const [menuOpen, setMenuOpen] = useState(false)

  // Close menu on route changes.
  useEffect(() => {
    setMenuOpen(false)
  }, [location.pathname])

  const navigate = (id: PageId) => {
    const target = pathFor(id)
    if (target !== location.pathname) {
      navigateRouter(target)
    }
    setMenuOpen(false)
    window.scrollTo({ top: 0, behavior: 'auto' })
  }

  const scrollToForm = () => {
    const el = document.getElementById('lead-form') ?? document.getElementById('where')
    if (!el) return
    el.scrollIntoView({ behavior: 'smooth', block: 'center' })
    // Re-center after late reflow: web font swap + lazy images change the page
    // height after the first scroll, which would otherwise leave the form low.
    setTimeout(() => el.scrollIntoView({ behavior: 'smooth', block: 'center' }), 500)
  }

  const triggerCTA = () => {
    if (page === 'home') {
      scrollToForm()
    } else {
      navigate('home')
      setTimeout(scrollToForm, 50)
    }
  }

  const crumb = crumbFor(page)

  return (
    <div id="top" className={`v4v page-${page}`}>
      <RouteTracker />
      <PromoStrip />
      <TopNav
        current={page}
        onLogo={() => navigate('home')}
        onMenu={() => setMenuOpen(true)}
        onNavigate={navigate}
        onCTA={triggerCTA}
      />
      {crumb && <Crumbs crumb={crumb} onHome={() => navigate('home')} />}
      <Routes>
        <Route path="/" element={<Home onCTA={triggerCTA} />} />
        <Route path="/prices" element={<Prices onCTA={triggerCTA} />} />
        <Route path="/schedule" element={<Schedule onCTA={triggerCTA} />} />
        <Route path="*" element={<NotFound onHome={() => navigate('home')} />} />
      </Routes>
      <Footer onNavigate={navigate} />
      <StickyCTA onCTA={triggerCTA} />
      <MenuOverlay
        open={menuOpen}
        current={page}
        onClose={() => setMenuOpen(false)}
        onNavigate={navigate}
        onCTA={triggerCTA}
      />
    </div>
  )
}
