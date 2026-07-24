import { STATS } from '@/content/home'

// Chess piece glyphs added as visual decoration only (per design handoff).
// Order maps to STATS.items.
const PIECES = ['♚', '♙', '★', '♛'] as const // ♚ ♙ ★ ♛

export default function Stats() {
  return (
    <section id="stats" className="v4v-section alt stats-section">
      <span className="v4v-eyebrow">{STATS.eyebrow}</span>
      <h2 className="v4v-h1" style={{ marginTop: 10 }}>{STATS.h2}</h2>
      <div className="v4v-grid-2 stats-grid" style={{ gap: 22, marginTop: 24 }}>
        {STATS.items.map((it, i) => {
          const accent = it.value.endsWith('%') || it.value.endsWith('+')
          return (
            <div className="stat-tile" key={i}>
              <span className="stat-piece" aria-hidden="true">
                {PIECES[i % PIECES.length]}
              </span>
              <div className="stat-big">
                {accent ? (
                  <>
                    {it.value.slice(0, -1)}
                    <span className="stat-tail">{it.value.slice(-1)}</span>
                  </>
                ) : (
                  it.value
                )}
              </div>
              <div className="stat-label">{it.caption}</div>
            </div>
          )
        })}
      </div>
      <div
        className="v4v-row stats-facts"
        style={{ marginTop: 22, gap: 8, flexWrap: 'wrap', alignItems: 'center' }}
      >
        {STATS.facts.map((f) => (
          <span className="v4v-tag green-soft" key={f}>{f}</span>
        ))}
      </div>
    </section>
  )
}
