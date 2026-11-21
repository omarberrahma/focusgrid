import { useEffect, useState } from 'react'
import { Cloud, CloudDownload, CloudUpload, LogOut } from 'lucide-react'
import { supabase, cloudEnabled } from './lib/supabase'
import { downloadBackup, signInWithEmail, signOutCloud, uploadBackup } from './lib/cloudBackup'
import type { Habit, History, FocusSession } from './types'

type Props = {
  habits: Habit[]
  history: History
  sessions: FocusSession[]
  freezes: string[]
  onRestore: (backup: { habits: Habit[]; history: History; sessions: FocusSession[]; freezes?: string[] }) => void
}

export default function CloudBackupPanel({ habits, history, sessions, freezes, onRestore }: Props) {
  const [email, setEmail] = useState('')
  const [userEmail, setUserEmail] = useState<string | null>(null)
  const [busy, setBusy] = useState(false)
  const [status, setStatus] = useState('')
  useEffect(() => {
    if (!supabase) return
    supabase.auth.getUser().then(({ data }) => setUserEmail(data.user?.email ?? null))
    const { data } = supabase.auth.onAuthStateChange((_event, session) => setUserEmail(session?.user?.email ?? null))
    return () => data.subscription.unsubscribe()
  }, [])
  const signIn = async () => {
    setBusy(true); setStatus('')
    try { const { error } = await signInWithEmail(email.trim()); if (error) throw error; setStatus('Check your email for the sign-in link.') }
    catch (e) { setStatus(e instanceof Error ? e.message : 'Sign-in failed.') }
    finally { setBusy(false) }
  }
  const backup = async () => {
    setBusy(true); setStatus('')
    try { await uploadBackup(habits, history, sessions, freezes); setStatus('Backup uploaded successfully.') }
    catch (e) { setStatus(e instanceof Error ? e.message : 'Backup failed.') }
    finally { setBusy(false) }
  }
  const restore = async () => {
    if (!window.confirm('Replace your current local FocusGrid data with the cloud backup?')) return
    setBusy(true); setStatus('')
    try { const backup = await downloadBackup(); onRestore(backup); setStatus('Backup restored. Refresh if any screen does not update.') }
    catch (e) { setStatus(e instanceof Error ? e.message : 'Restore failed.') }
    finally { setBusy(false) }
  }
  const signOut = async () => { const { error } = await signOutCloud(); if (error) setStatus(error.message) }
  return <section className="card cloud-card"><div className="section-head"><div><p className="eyebrow">OPTIONAL CLOUD</p><h2><Cloud size={18}/> Backup & restore</h2></div><span className="count-pill">{cloudEnabled?'Configured':'Not configured'}</span></div>
    {!cloudEnabled ? <p className="muted small">Add Supabase credentials to enable cloud backups. FocusGrid continues working locally.</p> : userEmail ? <><p className="cloud-account">Signed in as <strong>{userEmail}</strong></p><div className="cloud-actions"><button disabled={busy} onClick={backup}><CloudUpload size={16}/> Back up now</button><button disabled={busy} onClick={restore}><CloudDownload size={16}/> Restore backup</button><button className="cloud-signout" disabled={busy} onClick={signOut}><LogOut size={15}/> Sign out</button></div></> : <div className="cloud-login"><input type="email" value={email} onChange={e=>setEmail(e.target.value)} placeholder="Email address"/><button disabled={busy||!email.includes('@')} onClick={signIn}>Send sign-in link</button></div>}
    {status&&<p className="cloud-status">{status}</p>}
    <p className="muted small">Cloud backups include your habits, completion history, focus sessions, and streak freezes. Restoring replaces current local data.</p>
  </section>
}
