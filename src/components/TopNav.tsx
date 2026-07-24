import LogoMark from './icons/LogoMark'
import { CONTACT } from '@/content/home'
import { PAGES, type PageId } from '@/content/nav'

type Props = {
  current: PageId
  onLogo: () => void
  onMenu: () => void
  onNavigate: (id: PageId) => void
  onCTA: () => void
}

export default function TopNav({ current, onLogo, onMenu, onNavigate, onCTA }: Props) {
  return (
    <nav className="v4v-nav" aria-label="Главная навигация">
      <button
        type="button"
        className="v4v-logo"
        onClick={onLogo}
        aria-label="Школа Лидер — на главную"
      >
        <LogoMark size={40} />
      </button>

      <div className="v4v-nav-links" aria-label="Разделы">
        {PAGES.map((p) => (
          <button
            type="button"
            key={p.id}
            className={'nav-link' + (current === p.id ? ' active' : '')}
            onClick={() => onNavigate(p.id)}
          >
            {p.title}
          </button>
        ))}
      </div>

      <div className="v4v-nav-actions">
        <a
          className="v4v-btn secondary sm topnav-phone"
          href={`tel:${CONTACT.phoneTel}`}
          style={{ minHeight: 32 }}
        >
          <span className="topnav-phone-short">+7 911</span>
          <span className="topnav-phone-full">{CONTACT.phone}</span>
        </a>
        <button
          type="button"
          className="v4v-btn primary sm topnav-cta"
          onClick={onCTA}
        >
          Бесплатный пробный урок
        </button>
        <button
          className="v4v-hamb"
          type="button"
          aria-label="Меню"
          onClick={onMenu}
        />
      </div>
    </nav>
  )
}
