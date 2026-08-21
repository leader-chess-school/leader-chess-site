// Заявка с формы сайта.
//
// Два адресата, и порядок между ними важен.
//
// Первый — API школы: там заявка ложится в базу, там же считаются повторы,
// срабатывает приманка для роботов и уходит карточка с кнопками, которой
// менеджер ведёт заявку дальше. Если API ответил — своё уведомление мы уже
// не шлём, иначе в чате будет две одинаковые заявки, и живая карточка
// потеряется среди простыней.
//
// Второй — телеграм напрямую. Это запасной путь, не основной: API лежит,
// деплой едет, сеть моргнула — заявка всё равно должна долететь до людей,
// пусть и простым текстом без кнопок.
//
// API не настроен (нет LEADER_API_URL) — работаем как раньше, только
// телеграмом. Так эта версия спокойно живёт на сайте до того, как API
// подняли в бой.

type SubmitBody = {
  name?: string
  phone?: string
  source?: string
  utm?: Record<string, string>
  // Приманка: поле спрятано от людей стилями. Пришло непустым — писал робот.
  company?: string
  // Метка устройства и кусочки отпечатка браузера — по ним API ловит
  // повторы и пачки. Форма их присылает; наше дело — донести как есть.
  device_id?: string
  screen?: string
  lang?: string
  tz?: string
  platform?: string
}

const API_TIMEOUT_MS = 5000

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    res.status(405).json({ ok: false, error: 'method_not_allowed' })
    return
  }

  const body: SubmitBody = (typeof req.body === 'string' ? safeParse(req.body) : req.body) ?? {}
  const {
    name = '',
    phone = '',
    source = 'сайт Chess Leader',
    utm = {},
    company = '',
  } = body

  // Приманка. Отвечаем как обычно, чтобы робот не понял, что раскрыт,
  // но дальше не идём: ни в базу, ни в телеграм.
  if (company.trim()) {
    console.warn('honeypot: заявка не принята')
    res.status(200).json({ ok: true })
    return
  }

  let digits = phone.replace(/\D/g, '')
  if (digits.length === 10 && digits.startsWith('9')) digits = '7' + digits
  else if (digits.length === 11 && digits.startsWith('8')) digits = '7' + digits.slice(1)
  const phoneOk = digits.length === 11 && digits.startsWith('7')
  const nameOk = name.trim().length > 0
  if (!nameOk || !phoneOk) {
    res.status(400).json({ ok: false, error: 'invalid' })
    return
  }

  // Основной путь: API школы.
  if (await sendToApi(req, body)) {
    res.status(200).json({ ok: true })
    return
  }

  // Запасной: телеграм напрямую.
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

// Шлём в API всё, что прислала форма, включая метку устройства и отпечаток:
// без них API не отличит повтор от новой заявки и не поймает пачку.
// Адрес гостя передаём заголовком — иначе для API гостем будет Vercel.
async function sendToApi(req: any, body: SubmitBody): Promise<boolean> {
  const base = (process.env.LEADER_API_URL ?? '').replace(/\/+$/, '')
  if (!base) return false

  const guest = String(req.headers['x-forwarded-for'] ?? '').split(',')[0].trim()
  const siteToken = process.env.LEADER_SITE_TOKEN ?? ''
  const stop = new AbortController()
  const timer = setTimeout(() => stop.abort(), API_TIMEOUT_MS)
  try {
    const r = await fetch(`${base}/api/submit`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // Адрес гостя API примет только вместе с паролем сайта: без пароля
        // этот заголовок мог бы подделать кто угодно снаружи.
        ...(guest && siteToken ? { 'X-Guest-IP': guest, 'X-Site-Token': siteToken } : {}),
        'User-Agent': String(req.headers['user-agent'] ?? 'chess-spb-site'),
      },
      body: JSON.stringify(body),
      signal: stop.signal,
    })
    if (!r.ok) {
      // 429 — это осознанный отказ API: заявок с одного места слишком много.
      // Дублировать её телеграмом незачем, поток мы гасим нарочно.
      if (r.status === 429) return true
      console.error('api submit failed', r.status, await r.text())
      return false
    }
    return true
  } catch (e) {
    console.error('api submit unreachable', e)
    return false
  } finally {
    clearTimeout(timer)
  }
}

function safeParse(s: string): SubmitBody | null {
  try {
    return JSON.parse(s)
  } catch {
    return null
  }
}
