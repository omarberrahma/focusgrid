import type { Habit, History, FocusSession } from '../types'

export type FocusGridBackup = {
  version: 1
  habits: Habit[]
  history: History
  sessions: FocusSession[]
  updatedAt: string
}

export function createBackup(habits: Habit[], history: History, sessions: FocusSession[]): FocusGridBackup {
  return { version: 1, habits, history, sessions, updatedAt: new Date().toISOString() }
}

export function validateBackup(value: unknown): value is FocusGridBackup {
  if (!value || typeof value !== 'object') return false
  const backup = value as Partial<FocusGridBackup>
  if (backup.version !== 1 || !Array.isArray(backup.habits) || backup.habits.length > 5 ||
    !backup.history || typeof backup.history !== 'object' || Array.isArray(backup.history) ||
    !Array.isArray(backup.sessions) || typeof backup.updatedAt !== 'string' ||
    !Number.isFinite(Date.parse(backup.updatedAt))) return false
  const habitsValid = backup.habits.every(h => h && typeof h.id === 'string' && typeof h.name === 'string' && typeof h.icon === 'string')
  const historyValid = Object.entries(backup.history).every(([date, ids]) =>
    /^\d{4}-\d{2}-\d{2}$/.test(date) && Array.isArray(ids) && ids.every(id => typeof id === 'string'))
  const sessionsValid = backup.sessions.every(s => s && typeof s.id === 'string' &&
    /^\d{4}-\d{2}-\d{2}$/.test(s.date) && Number.isFinite(s.minutes) && s.minutes > 0 && s.minutes <= 180)
  return habitsValid && historyValid && sessionsValid
}
