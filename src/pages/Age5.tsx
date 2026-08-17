import PageHead from '@/components/PageHead'
import PageCTA from '@/components/PageCTA'
import { AGE5_HEAD, AGE5_POINTS, AGE5_FAQ, AGE5_CTA } from '@/content/age5'

type Props = {
  onCTA: () => void
}

export default function Age5({ onCTA }: Props) {
  return (
    <>
      <PageHead eyebrow={AGE5_HEAD.eyebrow} title={AGE5_HEAD.title}>
        {AGE5_HEAD.body}
      </PageHead>

      <div className="v4v-section alt">
        <h2 className="v4v-h1" style={{ marginTop: 10 }}>{AGE5_POINTS.h2}</h2>
        <div className="v4v-grid-2" style={{ marginTop: 18 }}>
          {AGE5_POINTS.items.map((it) => (
            <div className="v4v-card" key={it.t} style={{ padding: 16 }}>
              <h3 className="v4v-h4">{it.t}</h3>
              <p className="v4v-body-sm" style={{ marginTop: 8 }}>{it.d}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="v4v-section">
        <span className="v4v-eyebrow">{AGE5_FAQ.eyebrow}</span>
        <h2 className="v4v-h1" style={{ marginTop: 10 }}>{AGE5_FAQ.h2}</h2>
        <div className="faq faq-grid-wrap" style={{ marginTop: 18 }}>
          <div className="faq-grid">
            {AGE5_FAQ.items.map((it) => (
              <details key={it.q}>
                <summary>{it.q}</summary>
                <div className="ans">{it.a}</div>
              </details>
            ))}
          </div>
        </div>
      </div>

      <PageCTA
        h3={AGE5_CTA.h3}
        sub={AGE5_CTA.sub}
        cta={AGE5_CTA.cta}
        onCTA={onCTA}
        links={[
          { label: 'стоимость абонементов', href: '/prices' },
          { label: 'индивидуальные занятия', href: '/individual' },
          { label: 'расписание', href: '/schedule' },
        ]}
      />
    </>
  )
}
