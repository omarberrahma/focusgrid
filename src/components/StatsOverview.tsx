import type { Habit } from '../types'
import WeeklyChart from './WeeklyChart'

type DayBar = { date: Date; minutes: number }
type BestHabit = { habit: Habit; count: number } | undefined
type Props = { weeklyRate: number; weeklyCompletions: number; weeklyFocus: number; bestHabit: BestHabit; weeklyBars: DayBar[]; maxBar: number }

export default function StatsOverview({ weeklyRate, weeklyCompletions, weeklyFocus, bestHabit, weeklyBars, maxBar }: Props) {
  return <section className="card stats-card" id="stats"><div className="section-head"><div><p className="eyebrow">YOUR LAST 7 DAYS</p><h2>Statistics</h2></div><span className="count-pill">Weekly overview</span></div><div className="stats-tiles"><div className="stats-tile"><span className="stat-label">HABIT COMPLETION</span><strong>{weeklyRate}%</strong><small>{weeklyCompletions} completions</small></div><div className="stats-tile"><span className="stat-label">FOCUS TIME</span><strong>{weeklyFocus}<small> min</small></strong><small>this week</small></div><div className="stats-tile"><span className="stat-label">TOP HABIT</span><strong className="top-habit">{bestHabit?.habit.icon||'—'} {bestHabit?.habit.name||'—'}</strong><small>{bestHabit?.count||0} check-ins</small></div></div><WeeklyChart weeklyBars={weeklyBars} maxBar={maxBar}/></section>
}
