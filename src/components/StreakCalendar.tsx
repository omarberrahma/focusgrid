import { useState } from 'react'
import { ChevronLeft, ChevronRight, CalendarDays, Snowflake } from 'lucide-react'
import type { Habit, History } from '../types'
import { dateKey, shiftDate } from '../lib/date'

type Props = { today: Date; history: History; habits: Habit[]; frozenDates: string[] }
const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

export default function StreakCalendar({ today, history, habits, frozenDates }: Props) {
  const [month, setMonth] = useState(() => new Date(today.getFullYear(), today.getMonth(), 1))
  const monthStart = new Date(month.getFullYear(), month.getMonth(), 1)
  const daysInMonth = new Date(month.getFullYear(), month.getMonth() + 1, 0).getDate()
  const currentMonth = today.getFullYear() * 12 + today.getMonth()
  const selectedMonth = month.getFullYear() * 12 + month.getMonth()
  const frozen = new Set(frozenDates)
  const cells = [...Array(monthStart.getDay()).fill(null), ...Array.from({ length: daysInMonth }, (_, i) => i + 1)]
  const recentFreezes = [...frozenDates].sort((a, b) => b.localeCompare(a))
  const formatDate = (key: string) => { const [year, m, day] = key.split('-').map(Number); return new Date(year, m - 1, day).toLocaleDateString(undefined, { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' }) }

  return <section className="card streak-calendar-card">
    <div className="section-head"><div><p className="eyebrow">YOUR CONSISTENCY</p><h2>Streak calendar</h2></div><div className="streak-calendar-controls"><button aria-label="Previous month" onClick={() => setMonth(new Date(month.getFullYear(), month.getMonth() - 1, 1))}><ChevronLeft size={16}/></button><strong>{month.toLocaleDateString(undefined, { month: 'long', year: 'numeric' })}</strong><button aria-label="Next month" disabled={selectedMonth >= currentMonth} onClick={() => setMonth(new Date(month.getFullYear(), month.getMonth() + 1, 1))}><ChevronRight size={16}/></button></div></div>
    <div className="streak-calendar-grid">{weekdays.map(day => <span className="streak-calendar-weekday" key={day}>{day}</span>)}{cells.map((day, index) => { if (day === null) return <span className="streak-calendar-day empty" key={'empty-'+index}/>; const date = new Date(month.getFullYear(), month.getMonth(), day); const key = dateKey(date); const isFrozen = frozen.has(key); const count = (history[key] || []).filter(id => habits.some(h => h.id === id)).length; const isToday = key === dateKey(today); const status = isFrozen ? 'frozen' : count > 0 ? 'completed' : ''; return <span key={key} className={'streak-calendar-day '+status+(isToday?' today':'')} title={isFrozen ? formatDate(key)+' · Streak freeze used' : count ? formatDate(key)+' · '+count+' habits completed' : formatDate(key)}>{day}{(isFrozen || count > 0) && <i className="day-mark"/>}</span> })}</div>
    <div className="streak-calendar-legend"><span><i/>Completed habits</span><span><i className="freeze-dot"/>Protected day</span><span><CalendarDays size={12}/>Today outlined</span></div>
    <div className="freeze-history"><div className="freeze-history-heading"><strong><Snowflake size={14} style={{display:'inline',verticalAlign:'-2px',marginRight:6}}/>Freeze history</strong><span className="count-pill">{frozenDates.length} total</span></div>{recentFreezes.length ? <div className="freeze-history-list">{recentFreezes.map(key => <div className="freeze-history-row" key={key}><span>{formatDate(key)}</span><span>Protected</span></div>)}</div> : <p className="freeze-history-empty">No freezes used yet. Protected days will appear here.</p>}</div>
  </section>
}
