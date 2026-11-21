import { Clock3, Trash2 } from 'lucide-react'
import type { FocusSession } from '../types'

type Props = {
  sessions: FocusSession[]
  onDelete: (id: string) => void
}

function formatDate(value: string) {
  const date = new Date(value + 'T12:00:00')
  const today = new Date()
  const yesterday = new Date()
  yesterday.setDate(today.getDate() - 1)
  const key = (d: Date) => `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`
  if (value === key(today)) return 'Today'
  if (value === key(yesterday)) return 'Yesterday'
  return date.toLocaleDateString(undefined, { weekday: 'long', month: 'short', day: 'numeric', year: 'numeric' })
}

export default function SessionHistory({ sessions, onDelete }: Props) {
  const sorted = [...sessions].sort((a,b) => b.date.localeCompare(a.date))
  const grouped = sorted.reduce<Array<{ date: string; sessions: FocusSession[] }>>((groups, session) => {
    const group = groups.find(item => item.date === session.date)
    if (group) group.sessions.push(session)
    else groups.push({ date: session.date, sessions: [session] })
    return groups
  }, [])
  const totalMinutes = sessions.reduce((sum, session) => sum + session.minutes, 0)

  return <section className="card session-history-card" id="session-history">
    <div className="section-head">
      <div><p className="eyebrow">YOUR FOCUS RECORD</p><h2>Session history</h2></div>
      <span className="count-pill">{sessions.length} sessions · {totalMinutes} min</span>
    </div>
    {grouped.length ? <div className="session-history-groups">
      {grouped.map(group => <section className="session-day" key={group.date}>
        <div className="session-day-heading"><span>{formatDate(group.date)}</span><span>{group.sessions.reduce((sum,s)=>sum+s.minutes,0)} min</span></div>
        {group.sessions.map((session,index) => <div className="session-history-row" key={session.id}>
          <div className="session-history-icon"><Clock3 size={16}/></div>
          <div className="session-history-info"><strong>Focus session {index + 1}</strong><span>{session.minutes} minutes{session.habitName ? ` · ${session.habitName}` : ''}</span></div>
          <button className="session-delete" onClick={() => onDelete(session.id)} aria-label={`Delete ${session.minutes} minute session from ${group.date}`} title="Delete session"><Trash2 size={16}/></button>
        </div>)}
      </section>)}
    </div> : <div className="session-history-empty"><Clock3 size={22}/><p>No focus sessions yet</p><span>Completed focus blocks and saved stopwatch minutes will appear here.</span></div>}
  </section>
}
