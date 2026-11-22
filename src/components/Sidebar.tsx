import { LayoutDashboard, Settings, Target, Timer, TrendingUp, History } from 'lucide-react'

export type AppPage = 'overview' | 'habits' | 'focus' | 'stats' | 'history' | 'settings'
const items: { id: AppPage; label: string; icon: typeof LayoutDashboard }[] = [
  { id: 'overview', label: 'Overview', icon: LayoutDashboard },
  { id: 'habits', label: 'Habits', icon: Target },
  { id: 'focus', label: 'Focus', icon: Timer },
  { id: 'stats', label: 'Statistics', icon: TrendingUp },
  { id: 'history', label: 'History', icon: History },
  { id: 'settings', label: 'Settings', icon: Settings },
]
type Props = { activePage: AppPage; onNavigate: (page: AppPage) => void; mobileOpen?: boolean; onClose?: () => void }
export default function Sidebar({ activePage, onNavigate, mobileOpen = false, onClose }: Props) {
  return <>
    {mobileOpen && <button className="mobile-menu-backdrop" aria-label="Close navigation menu" onClick={onClose}/>}
    <aside className={'sidebar '+(mobileOpen?'mobile-sidebar-open':'')}>
      <div className="brand"><span className="brand-mark">F</span><span>focus<span className="brand-accent">grid</span></span></div>
      <nav aria-label="Main navigation">{items.map(({id,label,icon:Icon})=><button key={id} type="button" className={'nav-item '+(activePage===id?'active':'')} onClick={()=>{onNavigate(id);onClose?.()}}><Icon size={18}/>{label}</button>)}</nav>
      <div className="sidebar-bottom"><div className="profile"><div className="avatar">F</div><div><strong>Your workspace</strong><small>Personal progress</small></div></div></div>
    </aside>
  </>
}
