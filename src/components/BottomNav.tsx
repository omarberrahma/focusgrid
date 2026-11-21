import { LayoutDashboard, Target, Timer, TrendingUp, Settings } from 'lucide-react'
export default function BottomNav() {
  return <nav className="mobile-nav"><a href="#overview"><LayoutDashboard size={17}/>Home</a><a href="#habits"><Target size={17}/>Habits</a><a href="#focus"><Timer size={17}/>Focus</a><a href="#stats"><TrendingUp size={17}/>Stats</a><a href="#settings"><Settings size={17}/>Settings</a></nav>
}
