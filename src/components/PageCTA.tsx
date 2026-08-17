// Закрывающий CTA-блок внутренних страниц: кнопка ведёт к форме на главной,
// ссылки внизу — обычные <a>, чтобы перелинковка была видна поисковику.

type Props = {
  h3: string
  sub: string
  cta: string
  onCTA: () => void
  links?: ReadonlyArray<{ label: string; href: string }>
}

export default function PageCTA({ h3, sub, cta, onCTA, links }: Props) {
  return (
    <div className="v4v-section">
      <div className="promo-card">
        <h3>{h3}</h3>
        <p className="v4v-body-sm" style={{ marginTop: 8 }}>{sub}</p>
        <div style={{ marginTop: 14 }}>
          <button type="button" className="v4v-btn primary lg" onClick={onCTA}>
            {cta}
          </button>
        </div>
        {links && links.length > 0 && (
          <p className="v4v-caption" style={{ marginTop: 14 }}>
            Смотрите также:{' '}
            {links.map((l, i) => (
              <span key={l.href}>
                {i > 0 && ' · '}
                <a
                  href={l.href}
                  style={{ color: 'var(--v4v-green-dark)', fontWeight: 600, textDecoration: 'none' }}
                >
                  {l.label}
                </a>
              </span>
            ))}
          </p>
        )}
      </div>
    </div>
  )
}
