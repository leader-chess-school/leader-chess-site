// Single source of truth for page navigation.
// Tournaments / contacts / blog removed per scope.

export type PageId =
  | 'home'
  | 'prices'
  | 'schedule'
  | 'age5'
  | 'individual'
  | 'coaches'
  | 'reviews'

export const PAGES: ReadonlyArray<{ id: PageId; title: string; path: string; crumb: string | null }> = [
  { id: 'home', title: 'Главная', path: '/', crumb: null },
  { id: 'prices', title: 'Стоимость', path: '/prices', crumb: 'стоимость' },
  { id: 'schedule', title: 'Расписание', path: '/schedule', crumb: 'расписание' },
  { id: 'age5', title: 'Шахматы с 5 лет', path: '/age-5', crumb: 'с 5 лет' },
  { id: 'individual', title: 'Индивидуальные', path: '/individual', crumb: 'индивидуальные' },
  { id: 'coaches', title: 'Тренеры', path: '/coaches', crumb: 'тренеры' },
  { id: 'reviews', title: 'Отзывы', path: '/reviews', crumb: 'отзывы' },
] as const

export function pageFromPath(pathname: string): PageId {
  const match = PAGES.find((p) => p.path === pathname || pathname.startsWith(p.path + '/'))
  return match ? match.id : 'home'
}

export function pathFor(id: PageId): string {
  return PAGES.find((p) => p.id === id)?.path ?? '/'
}

export function crumbFor(id: PageId): string | null {
  return PAGES.find((p) => p.id === id)?.crumb ?? null
}

export const NOT_FOUND = {
  eyebrow: 'ошибка 404',
  title: 'Страница не найдена',
  body: 'Такой страницы на сайте нет — возможно, ссылка устарела.',
  cta: 'На главную',
} as const
