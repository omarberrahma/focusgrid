import { useEffect, useMemo, useState } from 'react'
import CloudBackupPanel from './CloudBackupPanel'
import HabitList from './components/HabitList'
import FocusTimer from './components/FocusTimer'
import StatsOverview from './components/StatsOverview'
import ActivityHeatmap from './components/ActivityHeatmap'
import AppShell from './components/AppShell'
import { dateKey, shiftDate } from './lib/date'
import { calculateStreaks } from './lib/habits'
import type { Habit, History, FocusSession } from './types'
import { Activity, Flame, Share2 } from 'lucide-react'

type TimerMode = 'focus' | 'short' | 'long'
type InstallPromptEvent = Event & { prompt: () => Promise<void>; userChoice: Promise<{ outcome: 'accepted' | 'dismissed'; platform: string }> }
const defaultHabits: Habit[] = [
  { id: 'read', name: 'Read for 20 minutes', icon: '📚' },
  { id: 'move', name: 'Move your body', icon: '🏃' },
  { id: 'learn', name: 'Learn something', icon: '🧠' },
  { id: 'journal', name: 'Journal', icon: '✍️' },
]
const habitsKey = 'focusgrid-habits-v2', historyKey = 'focusgrid-history-v1'
const sessionsKey = 'focusgrid-focus-sessions-v1'
function loadHabits(): Habit[] { try { const saved=localStorage.getItem(habitsKey); if(saved){const parsed=JSON.parse(saved);if(Array.isArray(parsed)){const valid=parsed.filter((h):h is Habit=>h&&typeof h.id==='string'&&typeof h.name==='string'&&typeof h.icon==='string').slice(0,5);if(valid.length)return valid}} const old=localStorage.getItem('focusgrid-habits-v1'); if(old){const parsed=JSON.parse(old);if(Array.isArray(parsed)){const valid=parsed.filter((h=>h&&typeof h.id==='string'&&typeof h.name==='string'&&typeof h.icon==='string')).slice(0,5);if(valid.length)return valid}} return defaultHabits.map(h=>({...h})) } catch { return defaultHabits.map(h=>({...h})) } }
function loadHistory(): History { try { const parsed=JSON.parse(localStorage.getItem(historyKey)||'{}'); if(!parsed||typeof parsed!=='object'||Array.isArray(parsed))return {}; return Object.fromEntries(Object.entries(parsed).filter(([date,ids])=>/^\d{4}-\d{2}-\d{2}$/.test(date)&&Array.isArray(ids)).map(([date,ids])=>[date,(ids as unknown[]).filter(id=>typeof id==='string')])) as History } catch { return {} } }
function loadSessions(): FocusSession[] { try { const parsed=JSON.parse(localStorage.getItem(sessionsKey)||'[]'); if(!Array.isArray(parsed))return []; return parsed.filter((s):s is FocusSession=>s&&typeof s.id==='string'&&/^\d{4}-\d{2}-\d{2}$/.test(s.date)&&Number.isFinite(s.minutes)&&s.minutes>0&&s.minutes<=180) } catch { return [] } }
const modeMinutes: Record<TimerMode,number>={focus:25,short:5,long:15}
export default function App() {
  const [installPrompt,setInstallPrompt]=useState<InstallPromptEvent|null>(null),[isOffline,setIsOffline]=useState(!navigator.onLine),[installed,setInstalled]=useState(window.matchMedia('(display-mode: standalone)').matches)
  useEffect(()=>{const handlePrompt=(e:Event)=>{e.preventDefault();setInstallPrompt(e as InstallPromptEvent)};const online=()=>setIsOffline(false),offline=()=>setIsOffline(true),installedEvt=()=>{setInstalled(true);setInstallPrompt(null)};window.addEventListener('beforeinstallprompt',handlePrompt);window.addEventListener('online',online);window.addEventListener('offline',offline);window.addEventListener('appinstalled',installedEvt);return()=>{window.removeEventListener('beforeinstallprompt',handlePrompt);window.removeEventListener('online',online);window.removeEventListener('offline',offline);window.removeEventListener('appinstalled',installedEvt)}},[])
  const installApp=async()=>{if(!installPrompt)return;await installPrompt.prompt();const choice=await installPrompt.userChoice;if(choice.outcome==='accepted')setInstallPrompt(null)}
  const [habits,setHabits]=useState<Habit[]>(loadHabits),[history,setHistory]=useState<History>(loadHistory),[sessions,setSessions]=useState<FocusSession[]>(loadSessions),[newHabit,setNewHabit]=useState('')
  const [mode,setMode]=useState<TimerMode>('focus'),[focusLength,setFocusLength]=useState(25),[remaining,setRemaining]=useState(25*60),[running,setRunning]=useState(false)
  const [today,setToday]=useState(()=>new Date()),todayKey=dateKey(today),completedIds=history[todayKey]||[],completed=habits.filter(h=>completedIds.includes(h.id)).length,percentage=habits.length?Math.round(completed/habits.length*100):0
  const streak=useMemo(()=>calculateStreaks(history,today),[history,today])
  useEffect(()=>{const checkDate=()=>{const now=new Date();if(dateKey(now)!==dateKey(today))setToday(now)};const interval=window.setInterval(checkDate,60000);return()=>window.clearInterval(interval)},[today])
  const focusToday=sessions.filter(s=>s.date===todayKey).reduce((sum,s)=>sum+s.minutes,0),focusTotal=sessions.reduce((sum,s)=>sum+s.minutes,0)
  useEffect(()=>localStorage.setItem(habitsKey,JSON.stringify(habits)),[habits])
  useEffect(()=>localStorage.setItem(historyKey,JSON.stringify(history)),[history])
  useEffect(()=>localStorage.setItem(sessionsKey,JSON.stringify(sessions)),[sessions])
  useEffect(()=>{if(!running)return;const timer=window.setInterval(()=>setRemaining(r=>{if(r<=1){window.clearInterval(timer);setRunning(false);if(mode==='focus'){setSessions(prev=>[{id:crypto.randomUUID(),date:dateKey(new Date()),minutes:focusLength},...prev]);setMode('short');setRemaining(modeMinutes.short*60)}else{setMode('focus');setRemaining(focusLength*60)}return mode==='focus'?modeMinutes.short*60:focusLength*60}return r-1}),1000);return()=>window.clearInterval(timer)},[running,mode,focusLength])
  const heatmap=useMemo(()=>Array.from({length:84},(_,i)=>{const date=shiftDate(today,-83+i);const count=(history[dateKey(date)]||[]).filter(id=>habits.some(h=>h.id===id)).length;return {date,count}}),[today,history,habits])
  const weekDays=useMemo(()=>Array.from({length:7},(_,i)=>shiftDate(today,-6+i)),[today])
  const weeklyCompletions=weekDays.reduce((sum,d)=>sum+(history[dateKey(d)]||[]).filter(id=>habits.some(h=>h.id===id)).length,0)
  const weeklyRate=habits.length?Math.round(weeklyCompletions/(habits.length*7)*100):0
  const weeklyFocus=weekDays.reduce((sum,d)=>sum+sessions.filter(s=>s.date===dateKey(d)).reduce((m,s)=>m+s.minutes,0),0)
  const weeklyBars=weekDays.map(d=>({date:d,minutes:sessions.filter(s=>s.date===dateKey(d)).reduce((m,s)=>m+s.minutes,0)}))
  const maxBar=Math.max(1,...weeklyBars.map(d=>d.minutes))
  const bestHabit=habits.map(h=>({habit:h,count:weekDays.reduce((sum,d)=>sum+(history[dateKey(d)]||[]).filter(id=>id===h.id).length,0)})).sort((a,b)=>b.count-a.count)[0]
  const setTimerMode=(next:TimerMode)=>{setRunning(false);setMode(next);setRemaining(next==='focus'?focusLength*60:modeMinutes[next]*60)}
  const toggle= (id:string)=>setHistory(prev=>{const day=prev[todayKey]||[],next=day.includes(id)?day.filter(x=>x!==id):[...day,id];return {...prev,[todayKey]:next}})
  const addHabit=()=>{const name=newHabit.trim();if(!name||habits.length>=5)return;setHabits(prev=>[...prev,{id:crypto.randomUUID(),name,icon:'✨'}]);setNewHabit('')}
  const editHabit=(h:Habit)=>{const name=window.prompt('Edit habit name',h.name)?.trim();if(name)setHabits(prev=>prev.map(x=>x.id===h.id?{...x,name}:x))}
  const deleteHabit=(h:Habit)=>{if(!window.confirm(`Delete "${h.name}" and its completion history?`))return;setHabits(prev=>prev.filter(x=>x.id!==h.id));setHistory(prev=>Object.fromEntries(Object.entries(prev).map(([date,ids])=>[date,ids.filter(id=>id!==h.id)])))}
  const resetTimer=()=>{setRunning(false);setRemaining(mode==='focus'?focusLength*60:modeMinutes[mode]*60)}
  const exportStory=()=>{const canvas=document.createElement('canvas');canvas.width=1080;canvas.height=1920;const ctx=canvas.getContext('2d');if(!ctx)return;const g=ctx.createLinearGradient(0,0,1080,1920);g.addColorStop(0,'#101711');g.addColorStop(1,'#1c2b20');ctx.fillStyle=g;ctx.fillRect(0,0,1080,1920);ctx.strokeStyle='#344b38';ctx.lineWidth=3;ctx.strokeRect(56,56,968,1808);ctx.fillStyle='#83b891';ctx.font='bold 64px sans-serif';ctx.fillText('FOCUSGRID',100,180);ctx.fillStyle='#dce8dd';ctx.font='48px sans-serif';ctx.fillText('DAILY PROGRESS',100,340);ctx.fillStyle='#83b891';ctx.font='bold 180px sans-serif';ctx.fillText(`${percentage}%`,100,610);ctx.fillStyle='#dce8dd';ctx.font='44px sans-serif';ctx.fillText('habits completed',100,700);ctx.fillStyle='#344b38';ctx.fillRect(100,760,880,28);ctx.fillStyle='#83b891';ctx.fillRect(100,760,880*percentage/100,28);ctx.fillStyle='#dce8dd';ctx.font='bold 54px sans-serif';ctx.fillText(`${completed} / ${habits.length} habits`,100,900);ctx.fillStyle='#91a398';ctx.font='40px sans-serif';ctx.fillText('FOCUS TIME TODAY',100,1080);ctx.fillStyle='#dce8dd';ctx.font='bold 112px sans-serif';ctx.fillText(`${focusToday} min`,100,1220);ctx.fillStyle='#91a398';ctx.font='40px sans-serif';ctx.fillText('CURRENT STREAK',100,1400);ctx.fillStyle='#dce8dd';ctx.font='bold 112px sans-serif';ctx.fillText(`${streak.current} days`,100,1540);ctx.fillStyle='#91a398';ctx.font='34px sans-serif';ctx.fillText(today.toLocaleDateString(undefined,{weekday:'long',month:'long',day:'numeric',year:'numeric'}),100,1690);ctx.fillStyle='#83b891';ctx.font='36px sans-serif';ctx.fillText('Progress, not perfection.',100,1800);const link=document.createElement('a');link.download=`focusgrid-${todayKey}.png`;link.href=canvas.toDataURL('image/png');link.click()}
  const formatTime=(secs:number)=>`${Math.floor(secs/60).toString().padStart(2,'0')}:${(secs%60).toString().padStart(2,'0')}`
  return <AppShell header={{isOffline, installPromptAvailable: Boolean(installPrompt), installed, dateLabel: today.toLocaleDateString(undefined,{weekday:'short',month:'short',day:'numeric'}), onInstall: installApp}}>
  <section className="summary-grid"><div className="card progress-card"><div className="card-label"><span>DAILY PROGRESS</span><Activity size={17}/></div><div className="progress-number">{completed}<span> / {habits.length}</span></div><div className="progress-track"><div className="progress-fill" style={{width:percentage+'%'}}/></div><p>{percentage===100?'All done. Great consistency.':'Small wins add up. One step at a time.'}</p></div><div className="card streak-card"><div className="card-label"><span>ACTIVE STREAK</span><Flame size={17}/></div><div className="streak-value">{streak.current} <small>days</small></div><p>Longest streak: {streak.longest} days</p><div className="streak-decoration">✦</div></div></section>
  <FocusTimer mode={mode} remainingText={formatTime(remaining)} running={running} focusLength={focusLength} focusToday={focusToday} focusTotal={focusTotal} sessions={sessions} onModeChange={setTimerMode} onDurationChange={minutes=>{const val=Math.min(180,Math.max(1,minutes||1));setFocusLength(val);setRemaining(val*60)}} onToggle={()=>setRunning(!running)} onReset={resetTimer}/>
  <HabitList habits={habits} completed={completed} completedIds={completedIds} newHabit={newHabit} onToggle={toggle} onEdit={editHabit} onDelete={deleteHabit} onNewHabitChange={setNewHabit} onAdd={addHabit}/>
  <section className="card share-card"><div className="section-head"><div><p className="eyebrow">MAKE PROGRESS VISIBLE</p><h2>Share your day</h2></div><span className="count-pill">1080 × 1920</span></div><div className="story-preview"><div className="story-brand">FOCUSGRID</div><div className="story-kicker">DAILY PROGRESS</div><div className="story-percent">{percentage}%</div><div className="story-sub">{completed} of {habits.length} habits completed</div><div className="story-progress"><span style={{width:percentage+'%'}}/></div><div className="story-metrics"><div><small>FOCUS TODAY</small><strong>{focusToday} min</strong></div><div><small>STREAK</small><strong>{streak.current} days</strong></div></div><div className="story-date">{today.toLocaleDateString(undefined,{month:'long',day:'numeric',year:'numeric'})}</div><div className="story-footer">Progress, not perfection.</div></div><button className="export-story" onClick={exportStory}><Share2 size={17}/> Export Story PNG</button><p className="muted small">Create a vertical story card from today's real progress and save it as an image.</p></section>
  <div id="settings"><CloudBackupPanel habits={habits} history={history} sessions={sessions} onRestore={(backup)=>{setHabits(backup.habits);setHistory(backup.history);setSessions(backup.sessions)}} /></div>
  <StatsOverview weeklyRate={weeklyRate} weeklyCompletions={weeklyCompletions} weeklyFocus={weeklyFocus} bestHabit={bestHabit} weeklyBars={weeklyBars} maxBar={maxBar}/>
  <ActivityHeatmap heatmap={heatmap} habits={habits}/>
  <footer>FocusGrid <span>·</span> Progress, not perfection.</footer>
  </AppShell>
}
