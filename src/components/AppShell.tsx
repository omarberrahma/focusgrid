import type { ReactNode } from 'react'
import { useState } from 'react'
import Sidebar, { type AppPage } from './Sidebar'
import Header from './Header'

type HeaderProps = { isOffline: boolean; installPromptAvailable: boolean; installed: boolean; dateLabel: string; onInstall: () => void }
const pageTitles: Record<AppPage,string> = { overview: 'Overview', habits: 'Habits', focus: 'Focus sessions', stats: 'Statistics', history: 'Session history', settings: 'Settings' }
export default function AppShell({ children, header, activePage, onNavigate }: { children: ReactNode; header: HeaderProps; activePage: AppPage; onNavigate: (page: AppPage) => void }) {
  const [mobileOpen,setMobileOpen] = useState(false)
  return <div className="app-shell">
    <Sidebar activePage={activePage} onNavigate={onNavigate} mobileOpen={mobileOpen} onClose={()=>setMobileOpen(false)}/>
    <main className="main"><Header {...header} pageTitle={pageTitles[activePage]} onMenuOpen={()=>setMobileOpen(true)}/>{children}</main>
  </div>
}
