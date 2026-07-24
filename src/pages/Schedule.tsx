import { useState } from 'react'
import PageHead from '@/components/PageHead'
import {
  SCHEDULE_OFFLINE,
  SCHEDULE_ONLINE,
  SCHEDULE_HEAD,
  SCHEDULE_COACHES,
  type Group,
} from '@/content/schedule'

type Mode = 'offline' | 'online'

type Props = {
  onCTA: () => void
}

const GROUP_TAG: Record<Group, string> = {
  старшая: 'blue',
  средняя: 'orange',
  младшая: 'green-soft',
}

export default function Schedule(_props: Props) {
  const [mode, setMode] = useState<Mode>('offline')
  const days = mode === 'offline' ? SCHEDULE_OFFLINE : SCHEDULE_ONLINE
  const sub =
    mode === 'offline'
      ? 'м. Фрунзенская · Смоленская 18'
      : 'по Zoom · ссылка приходит за час'

  return (
    <>
      <PageHead
        eyebrow={SCHEDULE_HEAD.eyebrow}
        title={SCHEDULE_HEAD.title}
        after={
          <div className="since">
            <i />
            {SCHEDULE_HEAD.since}
          </div>
        }
      >
        {SCHEDULE_HEAD.body}
      </PageHead>

      <div className="mode-tabs" role="tablist" aria-label="Формат занятий">
        <button
          type="button"
          role="tab"
          aria-selected={mode === 'offline'}
          className={'mode-tab' + (mode === 'offline' ? ' active' : '')}
          onClick={() => setMode('offline')}
        >
          <span className="dot" />
          Очно
        </button>
        <button
          type="button"
          role="tab"
          aria-selected={mode === 'online'}
          className={'mode-tab' + (mode === 'online' ? ' active' : '')}
          onClick={() => setMode('online')}
        >
          <span className="dot" />
          Онлайн
        </button>
      </div>

      <div className="week">
        <div className="week-head">
          <span className="week-sub">{sub}</span>
        </div>
        {days.map((d) => (
          <div className="day" key={d.short}>
            <div className="day-head">
              <h2 className="day-name">{d.day}</h2>
              <span className="day-short">{d.short}</span>
            </div>
            {d.slots.length === 0 ? (
              <div className="day-empty">— занятий нет —</div>
            ) : (
              <ul className="day-list">
                {d.slots.map((s, i) => (
                  <li key={i}>
                    <span className="time">{s.time}</span>
                    <span className="coach">
                      <span className={`v4v-tag ${GROUP_TAG[s.group]}`} style={{ marginRight: 8 }}>
                        {s.group}
                      </span>
                      {s.coach}
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </div>

      <div className="coaches-note">
        <span className="v4v-eyebrow">{SCHEDULE_COACHES.eyebrow}</span>
        {SCHEDULE_COACHES.rows.map((r) => (
          <div className="row" key={r.name}>
            <span className="name">{r.name}</span>
            <span className="days">{r.days}</span>
          </div>
        ))}
      </div>
    </>
  )
}
