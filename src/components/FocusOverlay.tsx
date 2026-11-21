import { Maximize2, Minimize2, Pause, Play, RotateCcw, X } from 'lucide-react'
import type { TimerMode } from './FocusTimer'

type Props = {
  mode: TimerMode
  time: string
  running: boolean
  progress: number | null
  onToggle: () => void
  onReset: () => void
  onExit: () => void
}

const labels: Record<TimerMode, string> = {
  focus: 'DEEP WORK',
  short: 'SHORT BREAK',
  long: 'LONG BREAK',
  stopwatch: 'OPEN-ENDED SESSION',
}

export default function FocusOverlay({ mode, time, running, progress, onToggle, onReset, onExit }: Props) {
  const percent = progress === null ? null : Math.round(progress * 100)
  return <div className="focus-overlay" role="dialog" aria-modal="true" aria-label="Full-screen focus mode">
    <div className="focus-overlay-top">
      <div className="focus-overlay-brand"><span>✦</span> FOCUSGRID</div>
      <button className="focus-overlay-icon" onClick={onExit} aria-label="Exit focus mode"><X size={21}/></button>
    </div>
    <main className="focus-overlay-center">
      <p className="focus-overlay-label">{labels[mode]}</p>
      <div className="focus-overlay-ring" style={{ '--focus-progress': `${percent ?? 0}%` } as React.CSSProperties}>
        <div className="focus-overlay-ring-inner">
          <div className="focus-overlay-time">{time}</div>
          <div className="focus-overlay-state">{running ? 'IN SESSION' : 'PAUSED'}</div>
        </div>
      </div>
      <p className="focus-overlay-caption">{mode === 'stopwatch' ? 'Stay with the task. Your time is yours.' : percent === 100 ? 'Session complete' : 'One thing at a time. Keep your attention here.'}</p>
      <div className="focus-overlay-controls">
        <button className="focus-overlay-secondary" onClick={onReset} aria-label="Reset timer"><RotateCcw size={18}/></button>
        <button className="focus-overlay-primary" onClick={onToggle}>{running ? <Pause size={20}/> : <Play size={20}/>} {running ? 'Pause' : 'Start'}</button>
        <button className="focus-overlay-secondary" onClick={onExit} aria-label="Exit focus mode"><Minimize2 size={18}/></button>
      </div>
    </main>
    <div className="focus-overlay-footer">PROGRESS, NOT PERFECTION.</div>
  </div>
}
