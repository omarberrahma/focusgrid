import { Download } from 'lucide-react'

type Props = { isOffline: boolean; installPromptAvailable: boolean; installed: boolean; dateLabel: string; onInstall: () => void }
export default function Header({ isOffline, installPromptAvailable, installed, dateLabel, onInstall }: Props) {
  return <header className="topbar" id="overview"><div><p className="eyebrow">YOUR DAILY RESET</p><h1>Good day. <span>Keep showing up.</span></h1></div><div className="topbar-actions"><span className={"connection-chip "+(isOffline?"offline":"")}>{isOffline?"Offline":"Online"}</span>{installPromptAvailable&&!installed&&<button className="install-app" onClick={onInstall}><Download size={15}/> Install</button>}<div className="date-chip">{dateLabel}</div></div></header>
}
