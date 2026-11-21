import { supabase, cloudEnabled } from './supabase'
import { createBackup, validateBackup } from './cloud'
import type { Habit, History, FocusSession } from '../types'

export async function uploadBackup(habits: Habit[], history: History, sessions: FocusSession[]) {
  if (!supabase || !cloudEnabled) throw new Error('Cloud is not configured. Add Supabase environment variables.')
  const { data: userData, error: authError } = await supabase.auth.getUser()
  if (authError) throw authError
  const user = userData.user
  if (!user) throw new Error('Sign in to back up your FocusGrid data.')
  const payload = createBackup(habits, history, sessions)
  const { error } = await supabase.from('focusgrid_backups').upsert({
    user_id: user.id,
    payload,
    updated_at: payload.updatedAt,
  }, { onConflict: 'user_id' })
  if (error) throw error
  return payload.updatedAt
}

export async function downloadBackup() {
  if (!supabase || !cloudEnabled) throw new Error('Cloud is not configured.')
  const { data: userData, error: authError } = await supabase.auth.getUser()
  if (authError) throw authError
  if (!userData.user) throw new Error('Sign in to restore your cloud backup.')
  const { data, error } = await supabase.from('focusgrid_backups').select('payload').eq('user_id', userData.user.id).maybeSingle()
  if (error) throw error
  if (!data?.payload || !validateBackup(data.payload)) throw new Error('No valid cloud backup found.')
  return data.payload
}

export async function signInWithEmail(email: string) {
  if (!supabase) throw new Error('Cloud is not configured.')
  return supabase.auth.signInWithOtp({ email, options: { emailRedirectTo: window.location.origin } })
}

export async function signOutCloud() {
  if (!supabase) throw new Error('Cloud is not configured.')
  return supabase.auth.signOut()
}
