import type { ReactNode } from 'react'
import Sidebar from './Sidebar'
import Header from './Header'
import BottomNav from './BottomNav'

type HeaderProps = { isOffline: boolean; installPromptAvailable: boolean; installed: boolean; dateLabel: string; onInstall: () => void }
export default function AppShell({ children, header }: { children: ReactNode; header: HeaderProps }) {
  return <div className="app-shell"><Sidebar/><main className="main"><Header {...header}/>{children}<BottomNav/></main></div>
}
