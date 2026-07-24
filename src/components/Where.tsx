import { CONTACT, WHERE } from '@/content/home'
import LeadForm from './LeadForm'

export default function Where() {
  return (
    <section id="where" className="v4v-section alt where-section">
      <span className="v4v-eyebrow">{WHERE.eyebrow}</span>
      <h2 className="v4v-h1" style={{ marginTop: 10 }}>{WHERE.h2}</h2>
      <p className="v4v-body-sm" style={{ marginTop: 6 }}>{WHERE.sub}</p>

      <div className="where-grid">
        <div>
          <iframe
            className="v4v-map"
            style={{ marginTop: 16, width: '100%', display: 'block' }}
            src="https://yandex.ru/map-widget/v1/?ll=30.324792%2C59.904708&z=17&pt=30.324792%2C59.904708%2Cpm2rdm"
            title={`Шахматная школа на карте — ${CONTACT.address}`}
            loading="lazy"
            allowFullScreen
          />
          <div className="checker-strip" aria-hidden="true" />
          <div className="v4v-row" style={{ marginTop: 14, gap: 8, flexWrap: 'wrap' }}>
            <a className="v4v-tag green-soft" href={CONTACT.vkUrl} target="_blank" rel="noopener">VK</a>
            <a className="v4v-tag green-soft" href={CONTACT.tgUrl} target="_blank" rel="noopener">TG</a>
            <span className="v4v-caption" style={{ marginLeft: 6 }}>
              {WHERE.socHint}
            </span>
          </div>
        </div>

        <LeadForm />
      </div>
    </section>
  )
}
