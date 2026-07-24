// Schedule page — data from the school's «Расписание занятий с 1 июня 2026 года».

export type Group = 'старшая' | 'средняя' | 'младшая'
export type Slot = { time: string; coach: string; group: Group }
export type Day = { day: string; short: 'ПН' | 'ВТ' | 'СР' | 'ЧТ' | 'ПТ' | 'СБ' | 'ВС'; slots: ReadonlyArray<Slot> }

export const SCHEDULE_HEAD = {
  eyebrow: 'расписание · очно и онлайн',
  title: 'Наше расписание',
  body: 'Группы по возрасту: старшая, средняя, младшая.',
  since: 'действует с 1 июня 2026',
} as const

const kvitko = 'Квитко Н.К.'

export const SCHEDULE_OFFLINE: ReadonlyArray<Day> = [
  {
    day: 'Понедельник',
    short: 'ПН',
    slots: [
      { time: '16:30', coach: kvitko, group: 'старшая' },
      { time: '17:30', coach: kvitko, group: 'средняя' },
      { time: '18:45', coach: kvitko, group: 'младшая' },
    ],
  },
  {
    day: 'Четверг',
    short: 'ЧТ',
    slots: [
      { time: '16:30', coach: kvitko, group: 'старшая' },
      { time: '17:30', coach: kvitko, group: 'средняя' },
      { time: '18:45', coach: kvitko, group: 'младшая' },
    ],
  },
]

export const SCHEDULE_ONLINE: ReadonlyArray<Day> = [
  {
    day: 'Вторник',
    short: 'ВТ',
    slots: [
      { time: '16:30', coach: kvitko, group: 'старшая' },
      { time: '17:30', coach: kvitko, group: 'средняя' },
    ],
  },
  {
    day: 'Четверг',
    short: 'ЧТ',
    slots: [
      { time: '16:00', coach: kvitko, group: 'средняя' },
      { time: '16:45', coach: kvitko, group: 'старшая' },
    ],
  },
]

export const SCHEDULE_COACHES = {
  eyebrow: 'тренеры',
  rows: [
    { name: 'Квитко Н.К.', days: 'пн, чт очно · вт, чт онлайн' },
    { name: 'Бурцев И.Л.', days: 'в сезоне — чт очно' },
  ],
} as const
