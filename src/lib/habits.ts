import type { History } from '../types'
import { dateKey, shiftDate } from './date'

export function calculateStreaks(history: History, today: Date, frozenDates: string[] = []) {
  const frozen = new Set(frozenDates)
  const active = (date: Date) => (history[dateKey(date)] || []).length > 0 || frozen.has(dateKey(date))
  let current = 0
  let cursor = today
  if (!active(cursor)) cursor = shiftDate(cursor, -1)
  while (active(cursor)) {
    current++
    cursor = shiftDate(cursor, -1)
  }

  const dates = [...new Set([...Object.keys(history).filter(key => history[key]?.length), ...frozenDates])].sort()
  let longest = 0
  let run = 0
  let previous: Date | null = null
  for (const key of dates) {
    const [year, month, day] = key.split('-').map(Number)
    const date = new Date(year, month - 1, day)
    if (previous && dateKey(shiftDate(previous, 1)) === key) run++
    else run = 1
    longest = Math.max(longest, run)
    previous = date
  }
  return { current, longest }
}
