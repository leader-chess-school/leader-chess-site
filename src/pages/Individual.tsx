import PageHead from '@/components/PageHead'
import PageCTA from '@/components/PageCTA'
import { INDIVIDUAL_HEAD, INDIVIDUAL_FOR, INDIVIDUAL_NOTES, INDIVIDUAL_CTA } from '@/content/individual'

type Props = {
  onCTA: () => void
}

export default function Individual({ onCTA }: Props) {
  return (
    <>
      <PageHead eyebrow={INDIVIDUAL_HEAD.eyebrow} title={INDIVIDUAL_HEAD.title}>
        {INDIVIDUAL_HEAD.body}
      </PageHead>

      <div className="v4v-section alt">
        <h2 className="v4v-h1" style={{ marginTop: 10 }}>{INDIVIDUAL_FOR.h2}</h2>
        <div className="v4v-grid-2" style={{ marginTop: 18 }}>
          {INDIVIDUAL_FOR.items.map((it) => (
            <div className="v4v-card" key={it.t} style={{ padding: 16 }}>
              <h3 className="v4v-h4">{it.t}</h3>
              <p className="v4v-body-sm" style={{ marginTop: 8 }}>{it.d}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="v4v-section">
        <span className="v4v-eyebrow">{INDIVIDUAL_NOTES.eyebrow}</span>
        <div className="v4v-card" style={{ padding: 16, marginTop: 14 }}>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
            {INDIVIDUAL_NOTES.items.map((it) => (
              <li key={it} className="v4v-body-sm" style={{ padding: '6px 0' }}>
                · {it}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <PageCTA
        h3={INDIVIDUAL_CTA.h3}
        sub={INDIVIDUAL_CTA.sub}
        cta={INDIVIDUAL_CTA.cta}
        onCTA={onCTA}
        links={[
          { label: 'шахматы с 5 лет', href: '/age-5' },
          { label: 'стоимость абонементов', href: '/prices' },
          { label: 'тренеры', href: '/coaches' },
        ]}
      />
    </>
  )
}
