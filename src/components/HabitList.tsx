import { Check, Circle, Plus, Pencil, Trash2 } from 'lucide-react'
import type { Habit } from '../types'

type Props = {
  habits: Habit[]
  completed: number
  completedIds: string[]
  newHabit: string
  onToggle: (id: string) => void
  onEdit: (habit: Habit) => void
  onDelete: (habit: Habit) => void
  onNewHabitChange: (value: string) => void
  onAdd: () => void
}

export default function HabitList({ habits, completed, completedIds, newHabit, onToggle, onEdit, onDelete, onNewHabitChange, onAdd }: Props) {
  return <section className="card habits-card" id="habits">
    <div className="section-head"><div><p className="eyebrow">BUILD YOUR ROUTINE</p><h2>Today's habits</h2></div><span className="count-pill">{completed}/{habits.length} done</span></div>
    <div className="habit-list">{habits.map(h=><div key={h.id} className={'habit-row '+(completedIds.includes(h.id)?'done':'')}>
      <button className="habit-toggle" onClick={()=>onToggle(h.id)} aria-label={completedIds.includes(h.id)?'Mark incomplete':'Mark complete'}>
        <span className="habit-icon">{h.icon}</span><span className="habit-name">{h.name}</span><span className="habit-check">{completedIds.includes(h.id)?<Check size={16}/>:<Circle size={17}/>}</span>
      </button><div className="habit-actions"><button onClick={()=>onEdit(h)} aria-label="Edit habit" title="Edit"><Pencil size={14}/></button><button onClick={()=>onDelete(h)} aria-label="Delete habit" title="Delete"><Trash2 size={14}/></button></div></div>)}</div>
    <div className="add-habit"><input value={newHabit} onChange={e=>onNewHabitChange(e.target.value)} onKeyDown={e=>e.key==='Enter'&&onAdd()} placeholder={habits.length>=5?'Habit limit reached (5)':'Add a habit…'} disabled={habits.length>=5}/><button onClick={onAdd} disabled={!newHabit.trim()||habits.length>=5}><Plus size={17}/> Add</button></div>
  </section>
}
