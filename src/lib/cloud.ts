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
  return backup.version === 1 && Array.isArray(backup.habits) &&
    !!backup.history && typeof backup.history === 'object' &&
    Array.isArray(backup.sessions) && typeof backup.updatedAt === 'string'
}
