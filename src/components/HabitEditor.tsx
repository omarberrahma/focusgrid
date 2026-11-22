import { useEffect, useState } from 'react'
import type { Habit, HabitCategory } from '../types'
import { X } from 'lucide-react'

type Props = { habit: Habit | null; onSave: (name: string, icon: string, category: HabitCategory) => void; onCancel: () => void }
const categories: { id: HabitCategory; label: string }[] = [
  { id: 'learning', label: 'Learning' }, { id: 'health', label: 'Health' },
  { id: 'mind', label: 'Mind' }, { id: 'work', label: 'Work' }, { id: 'other', label: 'Other' },
]
const icons = ['📚','🏃','🧠','✍️','💧','🧘','🎯','💻','🎨','💪','🌱','🎵','🛏️','🚶','✨','📖','🧹','🧑‍🍳','💰','🕌','☀️','📝','🔧','❤️']
export default function HabitEditor({ habit, onSave, onCancel }: Props) {
  const [name, setName] = useState(habit?.name ?? '')
  const [icon, setIcon] = useState(habit?.icon ?? '✨')
  const [category, setCategory] = useState<HabitCategory>(habit?.category ?? 'other')
  useEffect(() => { setName(habit?.name ?? ''); setIcon(habit?.icon ?? '✨'); setCategory(habit?.category ?? 'other') }, [habit])
  if (!habit) return null
  const submit = (e: React.FormEvent) => { e.preventDefault(); const clean = name.trim(); if (clean) onSave(clean, icon, category) }
  return <div className="habit-editor-backdrop" onMouseDown={e => { if (e.target === e.currentTarget) onCancel() }}>
    <form className="habit-editor" role="dialog" aria-modal="true" aria-labelledby="habit-editor-title" onSubmit={submit}>
      <header className="habit-editor-header"><div><p className="eyebrow">PERSONALIZE ROUTINE</p><h2 id="habit-editor-title">Edit habit</h2></div><button type="button" className="habit-editor-close" onClick={onCancel} aria-label="Close"><X size={18}/></button></header>
      <label className="habit-editor-label" htmlFor="habit-editor-name">Habit name</label><input id="habit-editor-name" className="habit-editor-name" maxLength={70} autoFocus value={name} onChange={e=>setName(e.target.value)} placeholder="Name your habit"/>
      <div className="habit-editor-label">Choose an icon</div><div className="habit-editor-icons" role="group" aria-label="Habit icons">{icons.map(item=><button type="button" key={item} className={icon===item?'selected':''} aria-pressed={icon===item} onClick={()=>setIcon(item)}>{item}</button>)}</div>
      <label className="habit-editor-label" htmlFor="habit-editor-category">Category</label><select id="habit-editor-category" className="habit-editor-category" value={category} onChange={e=>setCategory(e.target.value as HabitCategory)}>{categories.map(c=><option key={c.id} value={c.id}>{c.label}</option>)}</select>
      <div className="habit-editor-actions"><button type="button" className="habit-editor-cancel" onClick={onCancel}>Cancel</button><button type="submit" className="habit-editor-save" disabled={!name.trim()}>Save changes</button></div>
    </form>
  </div>
}
