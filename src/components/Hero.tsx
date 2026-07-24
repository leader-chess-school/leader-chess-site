import { Fragment } from 'react'
import { HERO, STATS } from '@/content/home'

type Props = {
  onCTA: () => void
}

const FILES = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'] as const
const RANKS = [8, 7, 6, 5, 4, 3, 2, 1] as const

export default function Hero({ onCTA }: Props) {
  // Use first 3 real stats as trust strip (filtered to short labels).
  const trust = STATS.items.slice(0, 3)

  return (
    <section id="hero">
      {/* Mobile/tablet: photo with overlay card */}
      <div className="hero-mobile">
        <img
          className="v4v-photo hero-photo"
          src={HERO.photo}
          alt={HERO.photoAlt}
        />
        <div className="hero-card">
          <span className="v4v-eyebrow">{HERO.eyebrow}</span>
          <h1 className="v4v-h1" style={{ marginTop: 6 }}>{HERO.h1}</h1>
          <p className="v4v-body-sm" style={{ marginTop: 6 }}>{HERO.sub}</p>
          <button
            type="button"
            className="v4v-btn primary block lg"
            style={{ marginTop: 12 }}
            onClick={onCTA}
          >
            {HERO.cta}
          </button>
        </div>
      </div>

      {/* Desktop: split text + board-framed photo */}
      <div className="hero-desktop">
        <div className="hero-desktop-inner">
          <div className="hero-text">
            <span className="hero-notation">
              <span className="sq">e2</span>
              <span className="arr">→</span>
              <span className="sq">e4</span>
              <span className="dot">·</span>
              <span className="caption">с первого хода</span>
            </span>
            <h1>{HERO.h1}</h1>
            <p className="hero-lead">{HERO.sub}</p>
            <div className="hero-cta">
              <button
                type="button"
                className="v4v-btn primary lg"
                onClick={onCTA}
              >
                {HERO.cta}
              </button>
            </div>
            <p className="hero-cta-note">
              30 минут с тренером · перезвоним за 15 минут · без обязательств
            </p>
            <div className="hero-trust">
              {trust.map((s, i) => (
                <Fragment key={s.caption}>
                  <div>
                    <b>{s.value}</b>
                    <span>{s.caption}</span>
                  </div>
                  {i < trust.length - 1 && <span className="sep" aria-hidden="true" />}
                </Fragment>
              ))}
            </div>
          </div>

          <div className="hero-board">
            <div className="hero-board-frame">
              <div className="corner tl" />
              <div className="border-row top">
                {FILES.map((f, i) => (
                  <div key={f} className={'cell ' + (i % 2 === 0 ? 'light' : 'dark')}>
                    {f}
                  </div>
                ))}
              </div>
              <div className="corner tr" />

              <div className="border-col left">
                {RANKS.map((r, i) => (
                  <div key={r} className={'cell ' + (i % 2 === 0 ? 'dark' : 'light')}>
                    {r}
                  </div>
                ))}
              </div>
              <img
                className="hero-photo"
                src={HERO.photo}
                alt={HERO.photoAlt}
              />
              <div className="border-col right">
                {RANKS.map((r, i) => (
                  <div key={r} className={'cell ' + (i % 2 === 0 ? 'light' : 'dark')}>
                    {r}
                  </div>
                ))}
              </div>

              <div className="corner bl" />
              <div className="border-row bottom">
                {FILES.map((f, i) => (
                  <div key={f} className={'cell ' + (i % 2 === 0 ? 'dark' : 'light')}>
                    {f}
                  </div>
                ))}
              </div>
              <div className="corner br" />

              <div className="hero-photo-badge">
                <span className="badge-piece">♞</span>
                <div className="badge-text">
                  <span className="badge-mv">«Сама игра»</span>
                  <span className="badge-cap">живая и неожиданная</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
