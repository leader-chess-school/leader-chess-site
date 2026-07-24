import { Fragment } from 'react'
import { STORYBOARD } from '@/content/home'

export default function Storyboard() {
  return (
    <section id="storyboard" className="v4v-section">
      <span className="v4v-eyebrow">{STORYBOARD.eyebrow}</span>
      <h2 className="v4v-h1" style={{ marginTop: 10 }}>{STORYBOARD.h2}</h2>
      <div className="v4v-stack-lg storyboard-grid" style={{ marginTop: 22 }}>
        {STORYBOARD.steps.map((s) => (
          <div key={s.n}>
            <img
              className="v4v-photo"
              src={s.photo}
              alt={s.photoAlt}
              style={{ height: 220, borderRadius: 'var(--v4v-r-lg)' }}
            />
            <div className="v4v-row" style={{ marginTop: 12, gap: 10, alignItems: 'center' }}>
              <span className={`v4v-tag ${s.tag}`}>{s.n}</span>
              <p className="v4v-body" style={{ margin: 0 }}>{s.caption}</p>
            </div>
          </div>
        ))}
      </div>
      <div
        className="v4v-row scheme-row"
        style={{ marginTop: 22, gap: 8, flexWrap: 'wrap', alignItems: 'center' }}
      >
        <span className="v4v-caption" style={{ marginRight: 2 }}>Схема урока:</span>
        {STORYBOARD.scheme.map((step, i) => (
          <Fragment key={step}>
            <span className="v4v-tag green-soft">{step}</span>
            {i < STORYBOARD.scheme.length - 1 && (
              <span className="v4v-caption" aria-hidden="true">→</span>
            )}
          </Fragment>
        ))}
      </div>
    </section>
  )
}
