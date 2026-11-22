import { Check, Circle, Plus, Pencil, Trash2 } from 'lucide-react'
import type { Habit, HabitCategory } from '../types'

type Props = {
  habits: Habit[]
  completed: number
  completedIds: string[]
  newHabit: string
  newHabitCategory: HabitCategory
  onNewHabitCategoryChange: (category: HabitCategory) => void
  onToggle: (id: string) => void
  onEdit: (habit: Habit) => void
  onDelete: (habit: Habit) => void
  onNewHabitChange: (value: string) => void
  onAdd: () => void
}
const categories: { id: HabitCategory; label: string; icon: string }[] = [
  { id: 'learning', label: 'Learning', icon: '📚' }, { id: 'health', label: 'Health', icon: '💪' },
  { id: 'mind', label: 'Mind', icon: '🧠' }, { id: 'work', label: 'Work', icon: '🛠️' },
  { id: 'other', label: 'Other', icon: '✨' },
]
export default function HabitList({ habits, completed, completedIds, newHabit, newHabitCategory, onNewHabitCategoryChange, onToggle, onEdit, onDelete, onNewHabitChange, onAdd }: Props) {
  const [filter, setFilter] = useState<HabitCategory | 'all'>('all')
  const visible = filter === 'all' ? habits : habits.filter(h => (h.category || 'other') === filter)
  return <section className="card habits-card" id="habits">
    <div className="section-head"><div><p className="eyebrow">BUILD YOUR ROUTINE</p><h2>Today's habits</h2></div><span className="count-pill">{completed}/{habits.length} done</span></div>
    <div className="habit-category-tabs" aria-label="Filter habits by category">
      <button className={filter === 'all' ? 'selected' : ''} onClick={() => setFilter('all')}>All</button>
      {categories.map(c => <button key={c.id} className={filter === c.id ? 'selected' : ''} onClick={() => setFilter(c.id)}>{c.icon} {c.label}</button>)}
    </div>
    <div className="habit-list">{visible.map(h=><div key={h.id} className={'habit-row '+(completedIds.includes(h.id)?'done':'')}>
      <button className="habit-toggle" onClick={()=>onToggle(h.id)} aria-label={completedIds.includes(h.id)?'Mark incomplete':'Mark complete'}>
        <span className="habit-icon">{h.icon}</span><span className="habit-name">{h.name}</span><span className="habit-check">{completedIds.includes(h.id)?<Check size={16}/>:<Circle size={17}/>}</span>
      </button><div className="habit-actions"><button onClick={()=>onEdit(h)} aria-label="Edit habit" title="Edit"><Pencil size={14}/></button><button onClick={()=>onDelete(h)} aria-label="Delete habit" title="Delete"><Trash2 size={14}/></button></div></div>)}</div>
    {visible.length === 0 && <p className="muted small">No habits in this category yet.</p>}
    <div className="add-habit"><input value={newHabit} onChange={e=>onNewHabitChange(e.target.value)} onKeyDown={e=>e.key==='Enter'&&onAdd()} placeholder={habits.length>=5?'Habit limit reached (5)':'Add a habit…'} disabled={habits.length>=5}/><button onClick={onAdd} disabled={!newHabit.trim()||habits.length>=5}><Plus size={17}/> Add</button></div>
    <div className="habit-category-add"><label htmlFor="habit-category-new">Category for new habit</label><select id="habit-category-new" value={newHabitCategory} onChange={e=>onNewHabitCategoryChange(e.target.value as HabitCategory)}>{categories.map(c=><option key={c.id} value={c.id}>{c.icon} {c.label}</option>)}</select></div>
  </section>
}
