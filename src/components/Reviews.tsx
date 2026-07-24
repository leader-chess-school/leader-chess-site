import { useRef } from 'react'
import { CONTACT, REVIEWS } from '@/content/home'

export default function Reviews() {
  const scrollRef = useRef<HTMLDivElement | null>(null)
  const scrollBy = (dir: 1 | -1) => {
    const el = scrollRef.current
    if (!el) return
    el.scrollBy({ left: dir * el.clientWidth * 0.7, behavior: 'smooth' })
  }

  return (
    <section id="reviews" className="v4v-section reviews-section">
      <div className="reviews-head">
        <h2 className="v4v-h1">{REVIEWS.h2}</h2>
        <div className="reviews-nav">
          <button
            type="button"
            className="rn-btn"
            onClick={() => scrollBy(-1)}
            aria-label="Предыдущий отзыв"
          >
            ←
          </button>
          <button
            type="button"
            className="rn-btn"
            onClick={() => scrollBy(1)}
            aria-label="Следующий отзыв"
          >
            →
          </button>
        </div>
      </div>
      <div className="reviews-scroller" ref={scrollRef}>
        {REVIEWS.items.map((r) => (
          <article className="v4v-card review-card" key={r.name}>
            <img
              className="v4v-photo"
              src={r.photo}
              alt={r.photoAlt}
              style={{ height: 200, borderRadius: 'var(--v4v-r-md)' }}
            />
            <div className="review-body">
              <p className="v4v-body review-quote">«{r.text}»</p>
              <div className="v4v-caption review-who">
                <b>{r.name}</b> · <span className="review-kid">{r.childAge}</span>
              </div>
            </div>
          </article>
        ))}
      </div>
      <div className="reviews-hint">
        <a
          className="v4v-caption"
          href={CONTACT.vkReviewsUrl}
          target="_blank"
          rel="noopener"
          style={{
            color: 'var(--v4v-green-dark)',
            fontWeight: 600,
            textDecoration: 'none',
          }}
        >
          {REVIEWS.moreLinkText}
        </a>
      </div>
    </section>
  )
}
