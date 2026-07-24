import LogoMark from './icons/LogoMark'
import { CONTACT } from '@/content/home'
import { PAGES, type PageId } from '@/content/nav'

type Props = {
  open: boolean
  current: PageId
  onClose: () => void
  onNavigate: (id: PageId) => void
  onCTA: () => void
}

export default function MenuOverlay({ open, current, onClose, onNavigate, onCTA }: Props) {
  return (
    <>
      <div
        className={'menu-scrim' + (open ? ' open' : '')}
        onClick={onClose}
        aria-hidden="true"
      />
      <aside
        className={'menu-sheet' + (open ? ' open' : '')}
        aria-hidden={!open}
        aria-label="Меню"
      >
        <div className="menu-head">
          <div className="v4v-logo">
            <LogoMark size={42} />
          </div>
          <button
            type="button"
            className="menu-close"
            onClick={onClose}
            aria-label="Закрыть меню"
          >
            ×
          </button>
        </div>
        <ul className="menu-list">
          {PAGES.map((p) => (
            <li key={p.id}>
              <button
                type="button"
                className={'menu-link' + (current === p.id ? ' active' : '')}
                onClick={() => onNavigate(p.id)}
              >
                <span>{p.title}</span>
                <span className="meta">{current === p.id ? 'вы здесь' : '→'}</span>
              </button>
            </li>
          ))}
        </ul>
        <div className="menu-foot">
          <a className="phone" href={`tel:${CONTACT.phoneTel}`}>
            {CONTACT.phone}
          </a>
          <div className="row">
            <span>
              <i />м. {CONTACT.metro}
            </span>
            <span>
              <a href={CONTACT.vkUrl} target="_blank" rel="noopener">VK</a>
              {' · '}
              <a href={CONTACT.tgUrl} target="_blank" rel="noopener">TG</a>
            </span>
          </div>
          <button
            type="button"
            className="v4v-btn primary block lg"
            style={{ marginTop: 6 }}
            onClick={() => {
              onClose()
              onCTA()
            }}
          >
            Записаться на пробный урок
          </button>
        </div>
      </aside>
    </>
  )
}
