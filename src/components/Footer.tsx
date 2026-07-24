import LogoMark from './icons/LogoMark'
import { CONTACT } from '@/content/home'
import type { PageId } from '@/content/nav'

type Props = {
  onNavigate: (id: PageId) => void
}

export default function Footer({ onNavigate }: Props) {
  return (
    <footer className="v4v-footer">
      <div className="v4v-footer-inner">
        <div className="v4v-row" style={{ justifyContent: 'space-between' }}>
          <button
            type="button"
            className="v4v-logo"
            onClick={() => onNavigate('home')}
            aria-label="На главную"
          >
            <LogoMark size={44} />
          </button>
          <div className="v4v-row" style={{ gap: 6 }}>
            <a className="v4v-tag green-soft" href={CONTACT.vkUrl} target="_blank" rel="noopener">VK</a>
            <a className="v4v-tag green-soft" href={CONTACT.tgUrl} target="_blank" rel="noopener">TG</a>
          </div>
        </div>

        <div className="v4v-footer-cols">
          <div>
            <h5>Шахматная школа «Лидер»</h5>
            <span className="v4v-footer-link" aria-disabled="true">СПб, м. {CONTACT.metro}</span>
            <span className="v4v-footer-link" aria-disabled="true">{CONTACT.address}</span>
          </div>
          <div>
            <h5>Школа</h5>
            <button type="button" className="v4v-footer-link" onClick={() => onNavigate('home')}>
              О школе
            </button>
            <button type="button" className="v4v-footer-link" onClick={() => onNavigate('schedule')}>
              Расписание
            </button>
            <button type="button" className="v4v-footer-link" onClick={() => onNavigate('prices')}>
              Стоимость
            </button>
          </div>
          <div>
            <h5>Контакты</h5>
            <a className="v4v-footer-link" href={`tel:${CONTACT.phoneTel}`}>
              {CONTACT.phone}
            </a>
            <a className="v4v-footer-link" href={`mailto:${CONTACT.email}`}>
              {CONTACT.email}
            </a>
            <a className="v4v-footer-link" href={CONTACT.vkUrl} target="_blank" rel="noopener">
              VK
            </a>
          </div>
        </div>

        <div className="v4v-footer-bottom">
          <span>© {new Date().getFullYear()} · СПб, м. {CONTACT.metro}</span>
          <span>Политика · ПД</span>
        </div>
      </div>
    </footer>
  )
}
