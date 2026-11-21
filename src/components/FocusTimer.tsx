import { Clock, Play, Pause, RotateCcw } from 'lucide-react'

export type TimerMode = 'focus' | 'short' | 'long'
type Session = { id: string; date: string; minutes: number }
type Props = {
  mode: TimerMode
  remainingText: string
  running: boolean
  focusLength: number
  focusToday: number
  focusTotal: number
  sessions: Session[]
  onModeChange: (mode: TimerMode) => void
  onDurationChange: (minutes: number) => void
  onToggle: () => void
  onReset: () => void
}

export default function FocusTimer({ mode, remainingText, running, focusLength, focusToday, focusTotal, sessions, onModeChange, onDurationChange, onToggle, onReset }: Props) {
  return <section className="card focus-card" id="focus"><div className="section-head"><div><p className="eyebrow">DEEP WORK</p><h2>Focus timer</h2></div><span className="count-pill"><Clock size={13}/> {focusToday} min today</span></div><div className="timer-layout"><div className="timer-main"><div className="timer-modes"><button className={mode==='focus'?'selected':''} onClick={()=>onModeChange('focus')}>Focus</button><button className={mode==='short'?'selected':''} onClick={()=>onModeChange('short')}>Short break</button><button className={mode==='long'?'selected':''} onClick={()=>onModeChange('long')}>Long break</button></div><div className={'timer-clock '+(running?'timer-running':'')}>{remainingText}</div>{mode==='focus'&&!running&&<div className="custom-duration"><label>Focus minutes</label><input type="number" min={1} max={180} value={focusLength} onChange={e=>onDurationChange(Number(e.target.value))}/></div>}<div className="timer-controls"><button className="timer-primary" onClick={onToggle}>{running?<Pause size={17}/>:<Play size={17}/>} {running?'Pause':'Start'}</button><button className="timer-reset" onClick={onReset}><RotateCcw size={16}/> Reset</button></div><p className="timer-note">Completed focus blocks are saved automatically.</p></div><div className="focus-stats"><div><span className="stat-label">TODAY</span><strong>{focusToday}<small> min</small></strong><span className="stat-hint">focused time</span></div><div><span className="stat-label">ALL TIME</span><strong>{focusTotal}<small> min</small></strong><span className="stat-hint">{sessions.length} completed sessions</span></div><div className="session-list"><span className="stat-label">RECENT SESSIONS</span>{sessions.slice(0,3).length?sessions.slice(0,3).map(s=><div className="session-item" key={s.id}><span>{new Date(s.date+'T12:00:00').toLocaleDateString(undefined,{month:'short',day:'numeric'})}</span><b>{s.minutes} min</b></div>):<p className="muted small">Your completed sessions will appear here.</p>}</div></div></div></section>
}
