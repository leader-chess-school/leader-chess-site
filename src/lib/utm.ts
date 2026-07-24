// Capture UTM params on first load (survives SPA navigation via sessionStorage),
// read them back when submitting the lead form — so paid-traffic leads carry their source.
const KEYS = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content'] as const
const STORE_KEY = 'utm'

export type Utm = Partial<Record<(typeof KEYS)[number], string>>

export function captureUtm(): void {
  if (typeof window === 'undefined') return
  const params = new URLSearchParams(window.location.search)
  const found: Utm = {}
  for (const k of KEYS) {
    const v = params.get(k)
    if (v) found[k] = v
  }
  if (Object.keys(found).length) {
    try {
      sessionStorage.setItem(STORE_KEY, JSON.stringify(found))
    } catch {
      /* private mode / storage disabled — ignore */
    }
  }
}

export function getUtm(): Utm {
  if (typeof window === 'undefined') return {}
  try {
    return JSON.parse(sessionStorage.getItem(STORE_KEY) || '{}')
  } catch {
    return {}
  }
}
