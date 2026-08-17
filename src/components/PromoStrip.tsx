import { CONTACT, PROMO } from '@/content/home'

export default function PromoStrip() {
  return (
    <div className="v4v-promo">
      <span className="v4v-promo-loc">{PROMO.left}</span>
      <b className="v4v-promo-actions">
        <a href={`tel:${CONTACT.phoneTel}`}>{CONTACT.phone}</a>
      </b>
    </div>
  )
}
