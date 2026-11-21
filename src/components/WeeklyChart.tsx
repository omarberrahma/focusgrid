type DayBar = { date: Date; minutes: number }
export default function WeeklyChart({ weeklyBars, maxBar }: { weeklyBars: DayBar[]; maxBar: number }) {
  return <div className="weekly-chart"><div className="chart-title">Focus minutes per day</div><div className="chart-bars">{weeklyBars.map((d,i)=><div className="chart-column" key={i}><div className="chart-bar-wrap"><div className="chart-bar" style={{height:Math.max(4,d.minutes/maxBar*100)+'%'}} title={d.minutes+' focus minutes'}/></div><span className="chart-day">{d.date.toLocaleDateString(undefined,{weekday:'narrow'})}</span></div>)}</div></div>
}
