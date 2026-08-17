import PageHead from '@/components/PageHead'
import PageCTA from '@/components/PageCTA'
import { REVIEWS_PAGE_HEAD, REVIEWS_PLATFORMS, REVIEWS_QUOTES, REVIEWS_PAGE_CTA } from '@/content/reviewsPage'

type Props = {
  onCTA: () => void
}

export default function ReviewsPage({ onCTA }: Props) {
  return (
    <>
      <PageHead eyebrow={REVIEWS_PAGE_HEAD.eyebrow} title={REVIEWS_PAGE_HEAD.title}>
        {REVIEWS_PAGE_HEAD.body}
      </PageHead>

      <div className="v4v-section alt">
        <h2 className="v4v-h1" style={{ marginTop: 10 }}>{REVIEWS_PLATFORMS.h2}</h2>
        <div className="v4v-grid-2" style={{ marginTop: 18 }}>
          {REVIEWS_PLATFORMS.items.map((p) => (
            <a
              key={p.name}
              className="v4v-card"
              href={p.url}
              target="_blank"
              rel="noopener"
              style={{ padding: 16, textDecoration: 'none', color: 'inherit', display: 'block' }}
            >
              <h3 className="v4v-h4">{p.name}</h3>
              <p className="v4v-h1" style={{ marginTop: 8 }}>{p.score}</p>
              <p className="v4v-caption" style={{ marginTop: 4 }}>{p.count}</p>
              <p
                className="v4v-caption"
                style={{ marginTop: 10, color: 'var(--v4v-green-dark)', fontWeight: 600 }}
              >
                читать на площадке →
              </p>
            </a>
          ))}
        </div>
      </div>

      <div className="v4v-section">
        <h2 className="v4v-h1" style={{ marginTop: 10 }}>{REVIEWS_QUOTES.h2}</h2>
        <div className="v4v-grid-2" style={{ marginTop: 18 }}>
          {REVIEWS_QUOTES.items.map((r) => (
            <article className="v4v-card" key={r.who} style={{ padding: 16 }}>
              <p className="v4v-body review-quote">«{r.text}»</p>
              <div className="v4v-caption review-who" style={{ marginTop: 10 }}>
                <b>{r.who}</b> · <span>{r.src}</span>
              </div>
            </article>
          ))}
        </div>
        <p className="v4v-caption" style={{ marginTop: 12 }}>{REVIEWS_QUOTES.note}</p>
      </div>

      <PageCTA
        h3={REVIEWS_PAGE_CTA.h3}
        sub={REVIEWS_PAGE_CTA.sub}
        cta={REVIEWS_PAGE_CTA.cta}
        onCTA={onCTA}
        links={[
          { label: 'шахматы с 5 лет', href: '/age-5' },
          { label: 'тренеры', href: '/coaches' },
          { label: 'стоимость', href: '/prices' },
        ]}
      />
    </>
  )
}
