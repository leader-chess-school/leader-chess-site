import PageHead from '@/components/PageHead'
import PageCTA from '@/components/PageCTA'
import { COACHES } from '@/content/home'
import { COACHES_PAGE_HEAD, COACHES_PAGE_NOTES, COACHES_PAGE_CTA } from '@/content/coachesPage'

type Props = {
  onCTA: () => void
}

function hasFide(creds: ReadonlyArray<string>) {
  return creds.some((c) => /FIDE/i.test(c))
}

export default function CoachesPage({ onCTA }: Props) {
  return (
    <>
      <PageHead eyebrow={COACHES_PAGE_HEAD.eyebrow} title={COACHES_PAGE_HEAD.title}>
        {COACHES_PAGE_HEAD.body}
      </PageHead>

      <div className="v4v-section alt coaches-section">
        <div className="coaches-grid" style={{ marginTop: 6 }}>
          {COACHES.items.map((c) => (
            <article className="v4v-coach coach-card" key={c.name}>
              <img className="v4v-photo" src={c.photo} alt={c.photoAlt} style={{ height: 200 }} />
              <div className="coach-body" style={{ padding: 14 }}>
                {hasFide(c.creds) && <span className="fide-chip">FIDE</span>}
                <h3 className="v4v-h4" style={{ marginTop: 8 }}>{c.name}</h3>
                <ul style={{ listStyle: 'none', padding: 0, margin: '8px 0 0' }}>
                  {c.creds.map((cred) => (
                    <li key={cred} className="v4v-caption" style={{ padding: '2px 0' }}>
                      · {cred}
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>
      </div>

      <div className="v4v-section">
        <span className="v4v-eyebrow">{COACHES_PAGE_NOTES.eyebrow}</span>
        <div className="v4v-card" style={{ padding: 16, marginTop: 14 }}>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
            {COACHES_PAGE_NOTES.items.map((it) => (
              <li key={it} className="v4v-body-sm" style={{ padding: '6px 0' }}>
                · {it}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <PageCTA
        h3={COACHES_PAGE_CTA.h3}
        sub={COACHES_PAGE_CTA.sub}
        cta={COACHES_PAGE_CTA.cta}
        onCTA={onCTA}
        links={[
          { label: 'шахматы с 5 лет', href: '/age-5' },
          { label: 'индивидуальные занятия', href: '/individual' },
          { label: 'отзывы', href: '/reviews' },
        ]}
      />
    </>
  )
}
