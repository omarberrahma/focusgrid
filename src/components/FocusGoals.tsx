type Props = {
  dailyGoal: number
  weeklyGoal: number
  dailyMinutes: number
  weeklyMinutes: number
  onDailyGoalChange: (minutes: number) => void
  onWeeklyGoalChange: (minutes: number) => void
}

function Progress({ label, minutes, goal }: { label: string; minutes: number; goal: number }) {
  const percentage = Math.min(100, Math.round((minutes / goal) * 100))
  const complete = minutes >= goal
  return <div className="goal-progress">
    <div className="goal-progress-heading"><span>{label}</span><strong>{minutes} <small>/ {goal} min</small></strong></div>
    <div className="goal-track" role="progressbar" aria-label={label} aria-valuenow={Math.min(minutes, goal)} aria-valuemin={0} aria-valuemax={goal}>
      <span style={{ width: percentage + '%' }} />
    </div>
    <p>{complete ? 'Goal reached — great work.' : `${goal - minutes} min left to reach your goal`}</p>
  </div>
}

export default function FocusGoals({ dailyGoal, weeklyGoal, dailyMinutes, weeklyMinutes, onDailyGoalChange, onWeeklyGoalChange }: Props) {
  return <section className="card goals-card" id="goals">
    <div className="section-head"><div><p className="eyebrow">BUILD A CONSISTENT ROUTINE</p><h2>Focus goals</h2></div><span className="count-pill">Daily + 7 days</span></div>
    <div className="goals-grid">
      <div className="goal-setting"><label htmlFor="daily-focus-goal">Daily target</label><div><input id="daily-focus-goal" type="number" min={15} max={600} step={15} value={dailyGoal} onChange={event => onDailyGoalChange(Number(event.target.value))}/><span>min / day</span></div></div>
      <div className="goal-setting"><label htmlFor="weekly-focus-goal">7-day target</label><div><input id="weekly-focus-goal" type="number" min={60} max={4200} step={30} value={weeklyGoal} onChange={event => onWeeklyGoalChange(Number(event.target.value))}/><span>min / 7 days</span></div></div>
    </div>
    <div className="goals-progress">
      <Progress label="TODAY" minutes={dailyMinutes} goal={dailyGoal}/>
      <Progress label="LAST 7 DAYS" minutes={weeklyMinutes} goal={weeklyGoal}/>
    </div>
    <p className="muted small">Goals are saved on this device. The 7-day target follows the same rolling window as your statistics.</p>
  </section>
}
