import { Download, Menu } from 'lucide-react'

type Props = { isOffline: boolean; installPromptAvailable: boolean; installed: boolean; dateLabel: string; onInstall: () => void; pageTitle: string; onMenuOpen: () => void }
export default function Header({ isOffline, installPromptAvailable, installed, dateLabel, onInstall, pageTitle, onMenuOpen }: Props) {
  return <header className="topbar"><div className="topbar-title"><button type="button" className="menu-toggle" onClick={onMenuOpen} aria-label="Open navigation menu"><Menu size={21}/></button><div><p className="eyebrow">FOCUSGRID WORKSPACE</p><h1>{pageTitle}</h1></div></div><div className="topbar-actions"><span className={"connection-chip "+(isOffline?"offline":"")}>{isOffline?"Offline":"Online"}</span>{installPromptAvailable&&!installed&&<button className="install-app" onClick={onInstall}><Download size={15}/> Install</button>}<div className="date-chip">{dateLabel}</div></div></header>
}
