import { BENEFITS } from '@/content/home'

// Chess piece glyphs map to benefit categories (visual decoration only).
const PIECE_BY_TAG: Record<string, string> = {
  purple: '♞', // ♞ knight — мышление
  orange: '♙', // ♙ pawn — цели
  blue: '♚',   // ♚ king — характер
  pink: '♛',   // ♛ queen — анализ
}

export default function Benefits() {
  return (
    <section id="benefits" className="v4v-section benefits-section">
      <h2 className="v4v-h1">{BENEFITS.h2}</h2>
      <div className="v4v-grid-2 benefits-grid" style={{ marginTop: 18 }}>
        {BENEFITS.items.map((it, i) => (
          <div className="v4v-card benefit-card" key={i}>
            <div className="benefit-head">
              <span className={`v4v-tag ${it.tagColor}`}>{it.tag}</span>
              <span
                className={`benefit-piece ${it.tagColor}`}
                aria-hidden="true"
              >
                {PIECE_BY_TAG[it.tagColor] ?? '♟'}
              </span>
            </div>
            <h3 className="v4v-h3" style={{ marginTop: 14 }}>{it.title}</h3>
            <p className="v4v-body-sm" style={{ marginTop: 8 }}>{it.body}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
