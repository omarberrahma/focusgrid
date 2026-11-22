import type { Habit, History, FocusSession } from '../types'

export type FocusGridBackup = {
  version: 1
  habits: Habit[]
  history: History
  sessions: FocusSession[]
  freezes?: string[]
  updatedAt: string
}

export function createBackup(habits: Habit[], history: History, sessions: FocusSession[], freezes: string[] = []): FocusGridBackup {
  return { version: 1, habits, history, sessions, freezes, updatedAt: new Date().toISOString() }
}

export function validateBackup(value: unknown): value is FocusGridBackup {
  if (!value || typeof value !== 'object') return false
  const backup = value as Partial<FocusGridBackup>
  if (backup.version !== 1 || !Array.isArray(backup.habits) || backup.habits.length > 5 ||
    !backup.history || typeof backup.history !== 'object' || Array.isArray(backup.history) ||
    !Array.isArray(backup.sessions) || typeof backup.updatedAt !== 'string' ||
    !Number.isFinite(Date.parse(backup.updatedAt))) return false
  const habitsValid = backup.habits.every(h => h && typeof h.id === 'string' && typeof h.name === 'string' && typeof h.icon === 'string' && (h.category === undefined || ['learning','health','mind','work','other'].includes(h.category)))
  const historyValid = Object.entries(backup.history).every(([date, ids]) =>
    /^\d{4}-\d{2}-\d{2}$/.test(date) && Array.isArray(ids) && ids.every(id => typeof id === 'string'))
  const sessionsValid = backup.sessions.every(s => s && typeof s.id === 'string' &&
    /^\d{4}-\d{2}-\d{2}$/.test(s.date) && Number.isFinite(s.minutes) && s.minutes > 0 && s.minutes <= 180 &&
    (s.habitId === undefined || typeof s.habitId === 'string') &&
    (s.habitName === undefined || typeof s.habitName === 'string'))
  const freezesValid = backup.freezes === undefined || (Array.isArray(backup.freezes) && backup.freezes.every(date => typeof date === 'string' && date.length === 10 && date[4] === '-' && date[7] === '-'))
  return habitsValid && historyValid && sessionsValid && freezesValid
}
