type SubmitBody = {
  name?: string
  phone?: string
  source?: string
  utm?: Record<string, string>
}

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    res.status(405).json({ ok: false, error: 'method_not_allowed' })
    return
  }

  const token = process.env.TELEGRAM_BOT_TOKEN
  const chatIds = (process.env.TELEGRAM_ADMIN_CHAT_IDS ?? '')
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean)
  if (!token || chatIds.length === 0) {
    console.error('telegram env missing')
    res.status(500).json({ ok: false, error: 'telegram_not_configured' })
    return
  }

  const body: SubmitBody = (typeof req.body === 'string' ? safeParse(req.body) : req.body) ?? {}
  const { name = '', phone = '', source = 'сайт Chess Leader', utm = {} } = body

  let digits = phone.replace(/\D/g, '')
  if (digits.length === 10 && digits.startsWith('9')) digits = '7' + digits
  else if (digits.length === 11 && digits.startsWith('8')) digits = '7' + digits.slice(1)
  const phoneOk = digits.length === 11 && digits.startsWith('7')
  const nameOk = name.trim().length > 0
  if (!nameOk || !phoneOk) {
    res.status(400).json({ ok: false, error: 'invalid' })
    return
  }

  const lines = [`🆕 Заявка с ${source}`, '', `Имя: ${name}`, `Телефон: ${phone}`]
  if (utm.utm_source || utm.utm_campaign || utm.utm_term) {
    lines.push('', `UTM: ${utm.utm_source || '—'} / ${utm.utm_campaign || '—'} / ${utm.utm_term || '—'}`)
  }
  const text = lines.join('\n')

  const results = await Promise.allSettled(
    chatIds.map((chatId) =>
      fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ chat_id: chatId, text }),
      }).then(async (r) => {
        if (!r.ok) throw new Error(`${chatId}: ${r.status} ${await r.text()}`)
      })
    )
  )

  results
    .filter((r): r is PromiseRejectedResult => r.status === 'rejected')
    .forEach((r) => console.error('telegram send failed', r.reason))

  const delivered = results.filter((r) => r.status === 'fulfilled').length
  if (delivered === 0) {
    res.status(502).json({ ok: false })
    return
  }

  res.status(200).json({ ok: true })
}

function safeParse(s: string): SubmitBody | null {
  try {
    return JSON.parse(s)
  } catch {
    return null
  }
}
