type Props = { used: number; remaining: number; canUse: boolean; protectedYesterday: boolean; onUse: () => void }

export default function StreakFreeze({ used, remaining, canUse, protectedYesterday, onUse }: Props) {
  return <section className="card streak-freeze-card"><div className="section-head"><div><p className="eyebrow">STREAK PROTECTION</p><h2>Streak freeze</h2></div><span className="count-pill">{remaining} left this month</span></div><p className="muted small">Use a freeze to protect yesterday when you missed a day. You get 2 freezes per calendar month.</p><button className="freeze-action" onClick={onUse} disabled={!canUse}>{protectedYesterday ? 'Yesterday protected' : canUse ? 'Protect yesterday' : 'No freeze available'}</button>{protectedYesterday&&<p className="freeze-status">Yesterday is protected. Your streak is safe.</p>}<p className="freeze-footnote">{used} of 2 used this month · A freeze protects one day; it does not mark a habit complete.</p></section>
}
