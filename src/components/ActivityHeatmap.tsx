import type { Habit } from '../types'

type HeatDay = { date: Date; count: number }
export default function ActivityHeatmap({ heatmap, habits }: { heatmap: HeatDay[]; habits: Habit[] }) {
  return <section className="card activity-card"><div className="section-head"><div><p className="eyebrow">CONSISTENCY OVER PERFECTION</p><h2>Activity</h2></div><span className="count-pill">Last 12 weeks</span></div><div className="heatmap">{heatmap.map((d,i)=>{const level=d.count===0?0:Math.min(4,Math.ceil(d.count/Math.max(1,habits.length)*4));return <span key={i} className={'heat-cell level-'+level} title={`${d.date.toDateString()}: ${d.count} habits completed`}/>})}</div><div className="heat-legend"><span>Less</span>{[0,1,2,3,4].map(n=><i key={n} className={'heat-cell level-'+n}/>)}<span>More</span></div><p className="muted small">Each square represents actual completed habits. Check in daily to build your activity history.</p></section>
}
