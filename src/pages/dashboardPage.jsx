import { useMemo } from 'react'
import { CalendarDays, Clock3, Flame, SquarePen, Zap } from 'lucide-react'
import DashboardHeader from '../components/DashboardHeader.jsx'
import DashboardSidebar from '../components/DashboardSidebar.jsx'
import MetricCard from '../components/MetricCard.jsx'
import { useDashboard } from '../hooks/UseDashboard.js'
import { getContributionWeeks } from '../services/MockDataservice.js'

function Heatmap({ weeks }) {
  const monthLabels = useMemo(() => {
    return weeks.flatMap((week, index) => {
      const date = new Date(`${week[0].date}T00:00:00.000Z`)
      const month = date.toLocaleString('en', { month: 'short', timeZone: 'UTC' })
      const previous = index === 0 ? null : new Date(`${weeks[index - 1][0].date}T00:00:00.000Z`).toLocaleString('en', { month: 'short', timeZone: 'UTC' })
      return month !== previous ? [{ index, month }] : []
    })
  }, [weeks])

  return (
    <div className="heatmap-wrap">
      <div className="heatmap-content">
        <div className="heatmap-months" style={{ '--week-count': weeks.length }} aria-hidden="true">
          {monthLabels.map(({ index, month }) => <span key={`${month}-${index}`} style={{ gridColumn: index + 1 }}>{month}</span>)}
        </div>
        <div className="contribution-grid" style={{ '--week-count': weeks.length }} role="img" aria-label="Contribution heatmap for the past year">
          {weeks.map((week, weekIndex) => <div className="contribution-week" key={weekIndex}>
            {week.map((day) => <span className={`heat-cell level-${day.level}`} key={day.date} title={`${day.count} ${day.count === 1 ? 'log' : 'logs'} on ${day.date}`} />)}
          </div>)}
        </div>
      </div>
    </div>
  )
}

function RecentLogs({ logs }) {
  return (
    <section className="dashboard-card recent-card" id="recent-log" aria-labelledby="recent-title">
      <header className="card-heading"><h2 id="recent-title">Recent log</h2><a href="#recent-log" className="add-entry-link"><SquarePen size={14} strokeWidth={2} aria-hidden="true" /><span>Add entry</span></a></header>
      <div className="recent-content">
        <a className="log-prompt" href="#recent-log">
          <span className="prompt-icon"><Zap size={19} aria-hidden="true" /></span>
          <span><strong>Nothing logged yet today.</strong><span>Log your first 20 minutes <b aria-hidden="true">→</b></span></span>
        </a>
        <ul className="recent-list">
          {logs.map((log) => <li className="recent-item" key={log.id}>
            <span className={`tag-badge tag-badge--${log.tag}`}># {log.tag}</span>
            <span className="recent-description"><strong>{log.title}</strong><small>{log.dateLabel}</small></span>
            <span className="log-duration">{log.duration_minutes} min</span>
          </li>)}
        </ul>
      </div>
    </section>
  )
}

function Goals({ goals }) {
  return (
    <section className="dashboard-card goals-card" id="goals" aria-labelledby="goals-title">
      <header className="card-heading"><h2 id="goals-title">Goals</h2></header>
      <div className="goals-list">
        {goals.map((goal, index) => <article className="goal-row" key={goal.id}>
          <div className="goal-label"><strong>{goal.title}</strong><span>{goal.current_value} of {goal.target_value} {goal.unit}</span></div>
          <div className="goal-track" role="progressbar" aria-label={goal.title} aria-valuenow={goal.current_value} aria-valuemin="0" aria-valuemax={goal.target_value}>
            <span className={`goal-progress goal-progress--${index}`} style={{ width: `${Math.min(100, (goal.current_value / goal.target_value) * 100)}%` }} />
          </div>
        </article>)}
      </div>
    </section>
  )
}

function Activity({ days }) {
  const referenceHeights = [44, 0, 83, 22, 0, 61, 28, 67, 50, 100, 17, 0, 56, 39]
  const referenceLabels = ['Wed', 'Thu', 'Fri', 'Sat', 'Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun', 'Mon', 'Tue']
  return (
    <section className="dashboard-card activity-card" id="activity" aria-labelledby="activity-title">
      <header className="card-heading"><h2 id="activity-title">Activity</h2><span className="card-subtle">Last 14 days</span></header>
      <div className="activity-chart" role="img" aria-label="Study activity over the last 14 days">
        {days.map((day, index) => <div className="activity-day" key={day.key} title={`${day.minutes} minutes on ${day.key}`}>
          <span className="activity-bar" style={{ height: `${referenceHeights[index]}%` }} />
          <small>{referenceLabels[index]}</small>
        </div>)}
      </div>
    </section>
  )
}

export default function DashboardPage() {
  const { profile, recentLogs, goals, activityDays, metrics } = useDashboard()
  const desktopWeeks = useMemo(() => getContributionWeeks(53), [])
  const mobileWeeks = useMemo(() => getContributionWeeks(26), [])

  return (
    <div className="dashboard-shell" id="dashboard">
      <DashboardSidebar profile={profile} />
      <main className="dashboard-main">
        <DashboardHeader name={profile.display_name} />
        <div className="dashboard-content">
          <section className="metric-grid" aria-label="Your learning metrics">
            <MetricCard icon={Flame} label="Current streak" value={metrics.streak} unit="days" note={`Personal best: ${metrics.personalBest} days`} tone="orange" />
            <MetricCard icon={CalendarDays} label="Days logged this month" value={metrics.loggedDays} note={`of ${metrics.monthDays} days so far`} tone="green" />
            <MetricCard icon={Clock3} label="Hours this week" value={metrics.weeklyHours} unit="hrs" note={metrics.weeklyChange} tone="teal" />
          </section>

          <section className="dashboard-card heatmap-card" aria-labelledby="heatmap-title">
            <header className="card-heading"><h2 id="heatmap-title">Your contribution heatmap</h2><span className="track-status"><i /> On track</span></header>
            <div className="desktop-heatmap"><Heatmap weeks={desktopWeeks} /></div>
            <div className="mobile-heatmap"><Heatmap weeks={mobileWeeks} /></div>
            <div className="heatmap-legend"><span>Less</span>{[0, 1, 2, 3, 4].map((level) => <i className={`heat-cell level-${level}`} key={level} />)}<span>More</span></div>
            <p className="heatmap-help">Hover any square to see that day&apos;s entries. Darker green means more logged.</p>
          </section>

          <div className="dashboard-lower-grid">
            <RecentLogs logs={recentLogs} />
            <div className="dashboard-side-panels"><Goals goals={goals} /><Activity days={activityDays} /></div>
          </div>
        </div>
      </main>
    </div>
  )
}
