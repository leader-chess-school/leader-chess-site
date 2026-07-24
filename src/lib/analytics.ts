// Yandex.Metrika wrappers. Counter id matches index.html.
const COUNTER = 88489627

declare global {
  interface Window {
    ym?: (id: number, action: string, ...args: unknown[]) => void
  }
}

export function reachGoal(goal: string, params?: Record<string, unknown>): void {
  if (typeof window !== 'undefined' && window.ym) {
    window.ym(COUNTER, 'reachGoal', goal, params)
  }
}

export function hit(url: string): void {
  if (typeof window !== 'undefined' && window.ym) {
    window.ym(COUNTER, 'hit', url)
  }
}
