import { useEffect, useMemo, useState } from 'react'
import { Activity, Check, Circle, Flame, LayoutDashboard, Plus, Settings, Target, Timer, TrendingUp, Pencil, Trash2 } from 'lucide-react'

type Habit = { id: string; name: string; icon: string }
type History = Record<string, string[]>
const defaultHabits: Habit[] = [
  { id: 'read', name: 'Read for 20 minutes', icon: '📚' },
  { id: 'move', name: 'Move your body', icon: '🏃' },
  { id: 'learn', name: 'Learn something', icon: '🧠' },
  { id: 'journal', name: 'Journal', icon: '✍️' },
]
const habitsKey = 'focusgrid-habits-v2'
const historyKey = 'focusgrid-history-v1'
function dateKey(date: Date) { return `${date.getFullYear()}-${String(date.getMonth()+1).padStart(2,'0')}-${String(date.getDate()).padStart(2,'0')}` }
function shiftDate(date: Date, amount: number) { const copy = new Date(date.getFullYear(), date.getMonth(), date.getDate()); copy.setDate(copy.getDate()+amount); return copy }
function loadHabits(): Habit[] {
  try {
    const saved=localStorage.getItem(habitsKey)
    if(saved)return JSON.parse(saved) as Habit[]
    const old=localStorage.getItem('focusgrid-habits-v1')
    if(old)return (JSON.parse(old) as Array<{id:string;name:string;icon:string}>).map(({id,name,icon})=>({id,name,icon}))
    return defaultHabits
  } catch { return defaultHabits }
}
function loadHistory(): History { try { return JSON.parse(localStorage.getItem(historyKey)||'{}') as History } catch { return {} } }
function streaks(history: History, today: Date) {
  const active=(d:Date)=>(history[dateKey(d)]||[]).length>0
  let current=0, cursor=today
  if(!active(cursor))cursor=shiftDate(cursor,-1)
  while(active(cursor)){current++;cursor=shiftDate(cursor,-1)}
  const dates=Object.keys(history).filter(k=>history[k]?.length).sort()
  let longest=0,run=0,prev:Date|null=null
  for(const k of dates){const [y,m,d]=k.split('-').map(Number),date=new Date(y,m-1,d);if(prev&&dateKey(shiftDate(prev,1))===k)run++;else run=1;longest=Math.max(longest,run);prev=date}
  return {current,longest}
}
export default function App() {
  const [habits,setHabits]=useState<Habit[]>(loadHabits)
  const [history,setHistory]=useState<History>(loadHistory)
  const [newHabit,setNewHabit]=useState('')
  const [today]=useState(()=>new Date())
  const todayKey=dateKey(today),completedIds=history[todayKey]||[]
  const completed=habits.filter(h=>completedIds.includes(h.id)).length
  const percentage=habits.length?Math.round(completed/habits.length*100):0
  const streak=useMemo(()=>streaks(history,today),[history,today])
  useEffect(()=>localStorage.setItem(habitsKey,JSON.stringify(habits)),[habits])
  useEffect(()=>localStorage.setItem(historyKey,JSON.stringify(history)),[history])
  const heatmap=useMemo(()=>Array.from({length:84},(_,i)=>{const date=shiftDate(today,-83+i);const count=(history[dateKey(date)]||[]).filter(id=>habits.some(h=>h.id===id)).length;return {date,count}}),[today,history,habits])
  const toggle=(id:string)=>setHistory(prev=>{const day=prev[todayKey]||[],next=day.includes(id)?day.filter(x=>x!==id):[...day,id];return {...prev,[todayKey]:next}})
  const addHabit=()=>{const name=newHabit.trim();if(!name||habits.length>=5)return;setHabits(prev=>[...prev,{id:crypto.randomUUID(),name,icon:'✨'}]);setNewHabit('')}
  const editHabit=(h:Habit)=>{const name=window.prompt('Edit habit name',h.name)?.trim();if(name)setHabits(prev=>prev.map(x=>x.id===h.id?{...x,name}:x))}
  const deleteHabit=(h:Habit)=>{if(!window.confirm(`Delete "${h.name}" and its completion history?`))return;setHabits(prev=>prev.filter(x=>x.id!==h.id));setHistory(prev=>Object.fromEntries(Object.entries(prev).map(([date,ids])=>[date,ids.filter(id=>id!==h.id)])))}
  return <div className="app-shell">
    <aside className="sidebar"><div className="brand"><span className="brand-mark">F</span><span>focus<span className="brand-accent">grid</span></span></div><nav><a className="nav-item active"><LayoutDashboard size={18}/> Overview</a><a className="nav-item"><Target size={18}/> Habits</a><a className="nav-item"><Timer size={18}/> Focus</a><a className="nav-item"><TrendingUp size={18}/> Stats</a></nav><div className="sidebar-bottom"><a className="nav-item"><Settings size={18}/> Settings</a><div className="profile"><div className="avatar">F</div><div><strong>Your workspace</strong><small>Personal progress</small></div></div></div></aside>
    <main className="main"><header className="topbar"><div><p className="eyebrow">YOUR DAILY RESET</p><h1>Good day. <span>Keep showing up.</span></h1></div><div className="date-chip">{today.toLocaleDateString(undefined,{weekday:'short',month:'short',day:'numeric'})}</div></header>
      <section className="summary-grid"><div className="card progress-card"><div className="card-label"><span>DAILY PROGRESS</span><Activity size={17}/></div><div className="progress-number">{completed}<span> / {habits.length}</span></div><div className="progress-track"><div className="progress-fill" style={{width:percentage+'%'}}/></div><p>{percentage===100?'All done. Great consistency.':'Small wins add up. One step at a time.'}</p></div><div className="card streak-card"><div className="card-label"><span>ACTIVE STREAK</span><Flame size={17}/></div><div className="streak-value">{streak.current} <small>days</small></div><p>Longest streak: {streak.longest} days</p><div className="streak-decoration">✦</div></div></section>
      <section className="card habits-card"><div className="section-head"><div><p className="eyebrow">BUILD YOUR ROUTINE</p><h2>Today's habits</h2></div><span className="count-pill">{completed}/{habits.length} done</span></div><div className="habit-list">{habits.map(h=><div key={h.id} className={'habit-row '+(completedIds.includes(h.id)?'done':'')}><button className="habit-toggle" onClick={()=>toggle(h.id)} aria-label={completedIds.includes(h.id)?'Mark incomplete':'Mark complete'}><span className="habit-icon">{h.icon}</span><span className="habit-name">{h.name}</span><span className="habit-check">{completedIds.includes(h.id)?<Check size={16}/>:<Circle size={17}/>}</span></button><div className="habit-actions"><button onClick={()=>editHabit(h)} aria-label="Edit habit" title="Edit"><Pencil size={14}/></button><button onClick={()=>deleteHabit(h)} aria-label="Delete habit" title="Delete"><Trash2 size={14}/></button></div></div>)}</div><div className="add-habit"><input value={newHabit} onChange={e=>setNewHabit(e.target.value)} onKeyDown={e=>e.key==='Enter'&&addHabit()} placeholder={habits.length>=5?'Habit limit reached (5)':'Add a habit…'} disabled={habits.length>=5}/><button onClick={addHabit} disabled={!newHabit.trim()||habits.length>=5}><Plus size={17}/> Add</button></div></section>
      <section className="card activity-card"><div className="section-head"><div><p className="eyebrow">CONSISTENCY OVER PERFECTION</p><h2>Activity</h2></div><span className="count-pill">Last 12 weeks</span></div><div className="heatmap">{heatmap.map((d,i)=>{const level=d.count===0?0:Math.min(4,Math.ceil(d.count/Math.max(1,habits.length)*4));return <span key={i} className={'heat-cell level-'+level} title={`${d.date.toDateString()}: ${d.count} habits completed`}/>})}</div><div className="heat-legend"><span>Less</span>{[0,1,2,3,4].map(n=><i key={n} className={'heat-cell level-'+n}/>)}<span>More</span></div><p className="muted small">Each square represents actual completed habits. Check in daily to build your activity history.</p></section><footer>FocusGrid <span>·</span> Progress, not perfection.</footer></main></div>
}
