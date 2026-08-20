// Метка устройства — чтобы отличить растерянного родителя от робота.
//
// Дубли заявок мы не режем: нажал два раза — две заявки, и админ это видит.
// Режем другое: поток заявок пачкой. Отличить одно от другого можно, только
// если заявка приносит с собой, с какого она устройства.
//
// MAC-адрес браузер не отдаёт ни одному сайту — это закрыто наглухо, и обойти
// нечем. Поэтому метка своя: случайный UUID, который лежит в localStorage.
// Стёр хранилище — метка сменится, и чтобы это не давало чистого листа, рядом
// едет отпечаток: окно, язык, часовой пояс, платформа. Он чистку переживает.
//
// Ничего личного здесь нет: ни имени, ни почты, ни истории. Только «это тот же
// браузер, что полчаса назад» — и на сервере отпечаток ещё и хешируется.

const KEY = 'device_id'

export type DeviceMark = {
  device_id: string
  screen: string
  lang: string
  tz: string
  platform: string
}

function uuid(): string {
  // crypto.randomUUID есть везде, кроме совсем старых браузеров; для них —
  // запасной вариант из случайных байт.
  try {
    const c: Crypto | undefined = typeof crypto !== 'undefined' ? crypto : undefined
    if (c?.randomUUID) return c.randomUUID()
    if (c?.getRandomValues) {
      const bytes = new Uint8Array(16)
      c.getRandomValues(bytes)
      return Array.from(bytes, (b) => b.toString(16).padStart(2, '0')).join('')
    }
    throw new Error('no crypto')
  } catch {
    return `${Date.now().toString(16)}-${Math.random().toString(16).slice(2)}`
  }
}

export function getDeviceMark(): DeviceMark {
  const empty: DeviceMark = { device_id: '', screen: '', lang: '', tz: '', platform: '' }
  if (typeof window === 'undefined') return empty

  let id = ''
  try {
    id = localStorage.getItem(KEY) || ''
    if (!id) {
      id = uuid()
      localStorage.setItem(KEY, id)
    }
  } catch {
    // Приватный режим или запрещённое хранилище — метки не будет, и это
    // нормально: останется отпечаток, а за ним IP. Заявку не теряем.
  }

  let tz = ''
  try {
    tz = Intl.DateTimeFormat().resolvedOptions().timeZone || ''
  } catch {
    /* редкая сборка без Intl — переживём */
  }

  return {
    device_id: id,
    screen: `${window.screen?.width ?? 0}x${window.screen?.height ?? 0}`,
    lang: navigator.language || '',
    tz,
    platform: navigator.platform || '',
  }
}
