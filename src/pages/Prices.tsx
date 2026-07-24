import PageHead from '@/components/PageHead'
import { TierGlyph } from '@/components/icons/ChessGlyphs'
import {
  PRICES_HEAD,
  TIERS,
  COMPARE,
  PROMO_CARD,
  INCLUDED,
  PRICES_FAQ,
} from '@/content/prices'
import { CONTACT } from '@/content/home'

type Props = {
  onCTA: () => void
}

export default function Prices({ onCTA }: Props) {
  return (
    <>
      <PageHead eyebrow={PRICES_HEAD.eyebrow} title={PRICES_HEAD.title}>
        {PRICES_HEAD.body}
      </PageHead>

      <div className="v4v-section alt" style={{ paddingTop: 32 }}>
        <div className="v4v-stack-lg tiers-grid">
          {TIERS.map((t) => (
            <div className={'tier' + (t.featured ? ' featured' : '')} key={t.id}>
              {t.tag && <span className="tier-tag">{t.tag}</span>}
              <div className="tier-head">
                <div>
                  <h3 className="tier-name">{t.name}</h3>
                  <p className="tier-sub">{t.sub}</p>
                </div>
                <span className="tier-glyph">
                  <TierGlyph kind={t.glyph} />
                </span>
              </div>
              <div className="price-row">
                <span className="price">
                  {t.price}
                  <span className="cur">₽</span>
                </span>
                <span className="per">{t.per}</span>
              </div>
              <div className="ppl">{t.ppl}</div>
              <ul>
                {t.items.map((it) => (
                  <li key={it}>{it}</li>
                ))}
              </ul>
              <div className="tier-cta">
                <button
                  type="button"
                  className={'v4v-btn ' + (t.featured ? 'primary' : 'secondary')}
                  onClick={onCTA}
                >
                  {t.ctaPrimary}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="v4v-section" style={{ paddingTop: 8, paddingBottom: 24 }}>
        <span className="v4v-eyebrow">{COMPARE.eyebrow}</span>
        <div className="compare" style={{ marginTop: 14 }}>
          {COMPARE.items.map((c) => (
            <div key={c.label}>
              <div className="label">{c.label}</div>
              <div className="val">
                {c.value}
                <small> {c.cur}</small>
              </div>
            </div>
          ))}
        </div>
        <p className="v4v-caption" style={{ marginTop: 10 }}>{COMPARE.note}</p>
      </div>

      <div className="v4v-section" style={{ paddingTop: 8 }}>
        <div className="promo-card">
          <span className="v4v-eyebrow">{PROMO_CARD.eyebrow}</span>
          <h3>{PROMO_CARD.h3}</h3>
          <ul className="promo-list">
            {PROMO_CARD.items.map((it) => (
              <li key={it.num}>
                <span className="num">{it.num}</span>
                <span dangerouslySetInnerHTML={{ __html: it.html }} />
              </li>
            ))}
          </ul>
          <div className="promo-foot">
            {PROMO_CARD.foot} · {CONTACT.phone}
          </div>
        </div>
      </div>

      <div className="v4v-section alt">
        <span className="v4v-eyebrow">{INCLUDED.eyebrow}</span>
        <h2 className="v4v-h1" style={{ marginTop: 10 }}>{INCLUDED.h2}</h2>
        <div className="v4v-grid-2" style={{ marginTop: 18 }}>
          {INCLUDED.items.map((it) => (
            <div className="v4v-card" key={it.t} style={{ padding: 16 }}>
              <h3 className="v4v-h4">{it.t}</h3>
              <p className="v4v-body-sm" style={{ marginTop: 8 }}>{it.d}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="v4v-section">
        <span className="v4v-eyebrow">{PRICES_FAQ.eyebrow}</span>
        <h2 className="v4v-h1" style={{ marginTop: 10 }}>{PRICES_FAQ.h2}</h2>
        <div className="faq faq-grid-wrap" style={{ marginTop: 18 }}>
          <div className="faq-grid">
            {PRICES_FAQ.items.map((it) => (
              <details key={it.q}>
                <summary>{it.q}</summary>
                <div className="ans">{it.a}</div>
              </details>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}
