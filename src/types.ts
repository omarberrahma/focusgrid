export type HabitCategory = 'learning' | 'health' | 'mind' | 'work' | 'other'
export type Habit = { id: string; name: string; icon: string; category?: HabitCategory }
export type History = Record<string, string[]>
export type FocusSession = { id: string; date: string; minutes: number; habitId?: string; habitName?: string }
