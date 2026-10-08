import { BarChart3, GraduationCap, LayoutDashboard, Settings, SquarePen, Target } from 'lucide-react'
import CodeTrackBrand from './CodeTrackBrand.jsx'

const navigation = [
  { label: 'Dashboard', id: 'dashboard', icon: LayoutDashboard },
  { label: 'Log', id: 'recent-log', icon: SquarePen },
  { label: 'Goals', id: 'goals', icon: Target },
  { label: 'Skills', id: 'skills', icon: GraduationCap },
  { label: 'Stats', id: 'activity', icon: BarChart3 },
]

export default function DashboardSidebar({ profile }) {
  return (
    <>
      <aside className="dashboard-sidebar">
        <a className="sidebar-brand" href="#dashboard"><CodeTrackBrand compact /></a>
        <nav aria-label="Main navigation" className="sidebar-nav">
          {navigation.map(({ label, id, icon: Icon }, index) => (
            <a className={`sidebar-link${index === 0 ? ' is-active' : ''}`} href={`#${id}`} key={id}>
              <Icon size={18} aria-hidden="true" /><span>{label}</span>
            </a>
          ))}
          <a className="sidebar-link" href="#dashboard"><Settings size={18} aria-hidden="true" /><span>Settings</span></a>
        </nav>
        <div className="sidebar-profile">
          <span className="profile-avatar" aria-hidden="true">AR</span>
          <span className="profile-name"><strong>{profile.display_name}</strong><small>Free plan</small></span>
        </div>
      </aside>
      <nav className="mobile-bottom-nav" aria-label="Mobile navigation">
        {navigation.filter((item) => item.label !== 'Settings').map(({ label, id, icon: Icon }, index) => (
          <a className={`mobile-nav-link${index === 0 ? ' is-active' : ''}`} href={`#${id}`} key={id}>
            <Icon size={20} aria-hidden="true" /><span>{label}</span>
          </a>
        ))}
      </nav>
    </>
  )
}
