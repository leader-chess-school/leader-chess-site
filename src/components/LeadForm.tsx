import { useState, type FormEvent } from 'react'
import { CONTACT, WHERE } from '@/content/home'
import { formatRuPhone, isValidRuPhone } from '@/lib/phone'
import { reachGoal } from '@/lib/analytics'
import { getUtm } from '@/lib/utm'
import { getDeviceMark } from '@/lib/device'

const SOURCE = 'сайт Chess Leader'

export default function LeadForm() {
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('+7 ')
  const [nameTouched, setNameTouched] = useState(false)
  const [phoneTouched, setPhoneTouched] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState(false)
  // Приманка для роботов: поле спрятано от глаз, человек его не заполнит.
  // Пришло непустым — заявка тихо не доедет до базы.
  const [company, setCompany] = useState('')

  const nameValid = name.trim().length > 0
  const phoneValid = isValidRuPhone(phone)
  const nameError = nameTouched && !nameValid
  const phoneError = phoneTouched && !phoneValid

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setNameTouched(true)
    setPhoneTouched(true)
    if (!nameValid || !phoneValid || submitting) return
    setSubmitting(true)
    setError(false)
    try {
      const r = await fetch('/api/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          phone,
          source: SOURCE,
          utm: getUtm(),
          company,
          ...getDeviceMark(),
        }),
      })
      if (!r.ok) throw new Error('submit failed')
      reachGoal('lead_submitted', { source: SOURCE })
      setSubmitted(true)
    } catch {
      setError(true)
    } finally {
      setSubmitting(false)
    }
  }

  const fieldStyle = (valid: boolean, errored: boolean) => ({
    borderColor: valid ? 'var(--v4v-green-dark)' : errored ? '#dc2626' : undefined,
  })

  return (
    <div id="lead-form" className="v4v-card feature where-form" style={{ marginTop: 22, padding: 22 }}>
      <h3 className="v4v-h3">{WHERE.formCard.h3}</h3>
      <p className="v4v-body-sm" style={{ marginTop: 6 }}>{WHERE.formCard.sub}</p>

      {submitted ? (
        <p
          className="v4v-body"
          role="status"
          style={{
            marginTop: 18,
            padding: '14px 16px',
            background: 'var(--v4v-green-soft)',
            color: 'var(--v4v-green-dark)',
            borderRadius: 'var(--v4v-r-md)',
            fontWeight: 600,
          }}
        >
          {WHERE.formCard.thanks}
        </p>
      ) : (
        <form className="v4v-form-stack" style={{ marginTop: 16 }} onSubmit={onSubmit} noValidate>
          <div>
            <input
              className="v4v-input"
              placeholder={WHERE.formCard.namePh}
              autoComplete="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              onBlur={() => setNameTouched(true)}
              aria-invalid={nameError}
              style={fieldStyle(nameValid, nameError)}
            />
            {nameError && (
              <p className="v4v-caption" role="alert" style={{ color: '#dc2626', marginTop: 4 }}>
                Введите имя
              </p>
            )}
          </div>

          <div>
            <input
              className="v4v-input"
              type="tel"
              inputMode="tel"
              placeholder="+7 (___) ___-__-__"
              autoComplete="tel"
              value={phone}
              onChange={(e) => setPhone(formatRuPhone(e.target.value))}
              onBlur={() => setPhoneTouched(true)}
              aria-invalid={phoneError}
              style={fieldStyle(phoneValid, phoneError)}
            />
            {phoneValid && (
              <p className="v4v-caption" style={{ color: 'var(--v4v-green-dark)', marginTop: 4 }}>
                ✓ Номер корректен
              </p>
            )}
            {phoneError && (
              <p className="v4v-caption" role="alert" style={{ color: '#dc2626', marginTop: 4 }}>
                Введите корректный номер телефона
              </p>
            )}
          </div>

          {/*
            Приманка для роботов. Спрятана стилями, а не type="hidden": скрытые
            поля роботы пропускают, а видимое в разметке — заполняют охотно.
            tabIndex и autoComplete держат её подальше от людей: ни табом не
            попасть, ни автозаполнением не задеть.
          */}
          <input
            type="text"
            name="company"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            tabIndex={-1}
            autoComplete="off"
            aria-hidden="true"
            style={{
              position: 'absolute',
              left: '-9999px',
              width: 1,
              height: 1,
              opacity: 0,
            }}
          />

          <button className="v4v-btn primary lg block" type="submit" disabled={submitting}>
            {submitting ? 'Отправляем…' : WHERE.formCard.cta}
          </button>
          {error && (
            <p
              className="v4v-caption"
              role="alert"
              style={{ color: '#b91c1c', textAlign: 'center', marginTop: 4 }}
            >
              Не удалось отправить. Попробуйте ещё раз или позвоните нам.
            </p>
          )}
          <div style={{ textAlign: 'center', marginTop: 4 }}>
            <a
              className="v4v-caption"
              href={`tel:${CONTACT.phoneTel}`}
              onClick={() => reachGoal('phone_click', { source: SOURCE })}
              style={{ color: 'var(--v4v-green-dark)', fontWeight: 600, textDecoration: 'none' }}
            >
              {WHERE.formCard.callLink} {CONTACT.phone}
            </a>
          </div>
        </form>
      )}
    </div>
  )
}
