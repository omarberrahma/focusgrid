import { useEffect, useMemo, useState } from 'react'
import { Activity, Check, Circle, Flame, LayoutDashboard, Plus, Settings, Target, Timer, TrendingUp } from 'lucide-react'

type Habit = { id: string; name: string; icon: string; done: boolean }
const defaultHabits: Habit[] = [
  { id: 'read', name: 'Read for 20 minutes', icon: '📚', done: false },
  { id: 'move', name: 'Move your body', icon: '🏃', done: false },
  { id: 'learn', name: 'Learn something', icon: '🧠', done: false },
  { id: 'journal', name: 'Journal', icon: '✍️', done: false },
]
const key = 'focusgrid-habits-v1'

function loadHabits(): Habit[] {
  try {
    const saved = localStorage.getItem(key)
    return saved ? JSON.parse(saved) as Habit[] : defaultHabits
  } catch {
    return defaultHabits
  }
}

export default function App() {
  const [habits, setHabits] = useState<Habit[]>(loadHabits)
  const [newHabit, setNewHabit] = useState('')
  const today = new Date()
  const completed = habits.filter(h => h.done).length
  const percentage = habits.length ? Math.round(completed / habits.length * 100) : 0

  useEffect(() => { localStorage.setItem(key, JSON.stringify(habits)) }, [habits])

  const heatmap = useMemo(() => Array.from({ length: 84 }, (_, i) => {
    const day = new Date()
    day.setDate(day.getDate() - (83 - i))
    return { date: day, intensity: Math.abs((day.getDate() * 7 + day.getMonth() * 3) % 5) }
  }), [])

  const toggle = (id: string) => setHabits(prev => prev.map(h => h.id === id ? { ...h, done: !h.done } : h))
  const addHabit = () => {
    const name = newHabit.trim()
    if (!name || habits.length >= 5) return
    setHabits(prev => [...prev, { id: crypto.randomUUID(), name, icon: '✨', done: false }])
    setNewHabit('')
  }

  return <div className="app-shell">
    <aside className="sidebar">
      <div className="brand"><span className="brand-mark">F</span><span>focus<span className="brand-accent">grid</span></span></div>
      <nav><a className="nav-item active"><LayoutDashboard size={18}/> Overview</a><a className="nav-item"><Target size={18}/> Habits</a><a className="nav-item"><Timer size={18}/> Focus</a><a className="nav-item"><TrendingUp size={18}/> Stats</a></nav>
      <div className="sidebar-bottom"><a className="nav-item"><Settings size={18}/> Settings</a><div className="profile"><div className="avatar">O</div><div><strong>Your workspace</strong><small>Personal progress</small></div></div></div>
    </aside>
    <main className="main">
      <header className="topbar"><div><p className="eyebrow">YOUR DAILY RESET</p><h1>Good day. <span>Keep showing up.</span></h1></div><div className="date-chip">{today.toLocaleDateString(undefined,{weekday:'short',month:'short',day:'numeric'})}</div></header>
      <section className="summary-grid">
        <div className="card progress-card"><div className="card-label"><span>DAILY PROGRESS</span><Activity size={17}/></div><div className="progress-number">{completed}<span> / {habits.length}</span></div><div className="progress-track"><div className="progress-fill" style={{width:percentage+'%'}}/></div><p>{percentage === 100 ? 'All done. Great consistency.' : 'Small wins add up. One step at a time.'}</p></div>
        <div className="card streak-card"><div className="card-label"><span>STREAK</span><Flame size={17}/></div><div className="streak-value">0 <small>days</small></div><p>Start your streak today.</p><div className="streak-decoration">✦</div></div>
      </section>
      <section className="card habits-card"><div className="section-head"><div><p className="eyebrow">BUILD YOUR ROUTINE</p><h2>Today's habits</h2></div><span className="count-pill">{completed}/{habits.length} done</span></div>
        <div className="habit-list">{habits.map(h => <button key={h.id} className={'habit-row '+(h.done?'done':'')} onClick={() => toggle(h.id)}><span className="habit-icon">{h.icon}</span><span className="habit-name">{h.name}</span><span className="habit-check">{h.done?<Check size={16}/>:<Circle size={17}/>}</span></button>)}</div>
        <div className="add-habit"><input value={newHabit} onChange={e=>setNewHabit(e.target.value)} onKeyDown={e=>e.key==='Enter'&&addHabit()} placeholder={habits.length>=5?'Habit limit reached (5)':'Add a habit…'} disabled={habits.length>=5}/><button onClick={addHabit} disabled={!newHabit.trim()||habits.length>=5}><Plus size={17}/> Add</button></div>
      </section>
      <section className="card activity-card"><div className="section-head"><div><p className="eyebrow">CONSISTENCY OVER PERFECTION</p><h2>Activity</h2></div><span className="count-pill">Last 12 weeks</span></div><div className="heatmap">{heatmap.map((d,i)=><span key={i} className={'heat-cell level-'+d.intensity} title={d.date.toDateString()}/>)}</div><div className="heat-legend"><span>Less</span>{[0,1,2,3,4].map(n=><i key={n} className={'heat-cell level-'+n}/>)}<span>More</span></div><p className="muted small">Your activity map will become more meaningful as you build your daily routine.</p></section>
      <footer>FocusGrid <span>·</span> Progress, not perfection.</footer>
    </main>
  </div>
}
