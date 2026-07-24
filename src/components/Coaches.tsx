import { COACHES } from '@/content/home'

// FIDE chip is shown when a coach's credentials reference FIDE
// (visual decoration only — derived from existing creds).
function hasFide(creds: ReadonlyArray<string>) {
  return creds.some((c) => /FIDE/i.test(c))
}

export default function Coaches() {
  return (
    <section id="coaches" className="v4v-section alt coaches-section">
      <h2 className="v4v-h1">{COACHES.h2}</h2>
      <p className="v4v-body-sm" style={{ marginTop: 6 }}>{COACHES.sub}</p>
      <div className="coaches-grid" style={{ marginTop: 16 }}>
        {COACHES.items.map((c) => (
          <article className="v4v-coach coach-card" key={c.name}>
            <img
              className="v4v-photo"
              src={c.photo}
              alt={c.photoAlt}
              style={{ height: 200 }}
            />
            <div className="coach-body" style={{ padding: 14 }}>
              {hasFide(c.creds) && <span className="fide-chip">FIDE</span>}
              <h4 className="v4v-h4" style={{ marginTop: 8 }}>{c.name}</h4>
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
    </section>
  )
}
