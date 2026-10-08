import { Flame, Plus } from 'lucide-react'
import { Link } from 'react-router-dom'
import CodeTrackBrand from './CodeTrackBrand.jsx'

export default function DashboardHeader({ name }) {
  return (
    <header className="dashboard-header">
      <div className="mobile-brand"><CodeTrackBrand compact /></div>
      <div className="dashboard-greeting">
        <h1>Good evening, {name.split(' ')[0]}</h1>
        <p>Thursday <span>·</span> Jun 26, 2026</p>
      </div>
      <div className="header-actions">
        <span className="streak-pill"><Flame size={16} aria-hidden="true" /><span>12-day streak</span></span>
        <Link className="log-today-button" to="#recent-log"><Plus size={17} aria-hidden="true" /><span>Log today</span></Link>
      </div>
    </header>
  )
}
