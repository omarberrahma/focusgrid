import type { Habit } from '../types'

type DayBar = { date: Date; minutes: number }
type BestHabit = { habit: Habit; count: number } | undefined
type Props = { weeklyRate: number; weeklyCompletions: number; weeklyFocus: number; bestHabit: BestHabit; weeklyBars: DayBar[]; maxBar: number }

export default function StatsOverview({ weeklyRate, weeklyCompletions, weeklyFocus, bestHabit, weeklyBars, maxBar }: Props) {
  return <section className="card stats-card" id="stats"><div className="section-head"><div><p className="eyebrow">YOUR LAST 7 DAYS</p><h2>Statistics</h2></div><span className="count-pill">Weekly overview</span></div><div className="stats-tiles"><div className="stats-tile"><span className="stat-label">HABIT COMPLETION</span><strong>{weeklyRate}%</strong><small>{weeklyCompletions} completions</small></div><div className="stats-tile"><span className="stat-label">FOCUS TIME</span><strong>{weeklyFocus}<small> min</small></strong><small>this week</small></div><div className="stats-tile"><span className="stat-label">TOP HABIT</span><strong className="top-habit">{bestHabit?.habit.icon||'—'} {bestHabit?.habit.name||'—'}</strong><small>{bestHabit?.count||0} check-ins</small></div></div><div className="weekly-chart"><div className="chart-title">Focus minutes per day</div><div className="chart-bars">{weeklyBars.map((d,i)=><div className="chart-column" key={i}><div className="chart-bar-wrap"><div className="chart-bar" style={{height:Math.max(4,d.minutes/maxBar*100)+'%'}} title={d.minutes+' focus minutes'}/></div><span className="chart-day">{d.date.toLocaleDateString(undefined,{weekday:'narrow'})}</span></div>)}</div></div></section>
}
