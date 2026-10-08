import seed from '../../Sim-Data/data.json'

const dateOnly = (value) => new Date(`${value}T00:00:00.000Z`)
const toDateKey = (date) => date.toISOString().slice(0, 10)

export const dashboardSnapshot = new Date(seed.simulation_context.dashboard_as_of)

export const demoAccounts = seed.mock_auth_users.map((account) => ({
  display_name: account.display_name,
  email: account.email,
  password: account.password,
}))

const logDate = (log) => new Date(log.logged_at)

function formatRecentDate(date) {
  const daysAgo = Math.round((dateOnly(toDateKey(dashboardSnapshot)) - dateOnly(toDateKey(date))) / 86400000)
  const weekday = new Intl.DateTimeFormat('en', { weekday: 'short', timeZone: 'UTC' }).format(date)
  const time = new Intl.DateTimeFormat('en', { hour: 'numeric', minute: '2-digit', timeZone: 'UTC' }).format(date)
  const label = daysAgo === 1 ? 'Yesterday' : daysAgo === 0 ? 'Today' : weekday
  return `${label} · ${time}`
}

const orderedLogs = [...seed.learning_logs].sort((a, b) => logDate(b) - logDate(a))
const recentLogs = orderedLogs.slice(0, 4).map((log) => ({
  ...log,
  dateLabel: formatRecentDate(logDate(log)),
}))

const activityDays = Array.from({ length: 14 }, (_, index) => {
  const date = new Date(dashboardSnapshot)
  date.setUTCDate(date.getUTCDate() - 13 + index)
  const key = toDateKey(date)
  const minutes = seed.learning_logs
    .filter((log) => toDateKey(logDate(log)) === key)
    .reduce((sum, log) => sum + log.duration_minutes, 0)
  return {
    key,
    label: new Intl.DateTimeFormat('en', { weekday: 'short', timeZone: 'UTC' }).format(date),
    minutes,
  }
})

const countsByDate = seed.learning_logs.reduce((counts, log) => {
  const key = toDateKey(logDate(log))
  counts[key] = (counts[key] || 0) + 1
  return counts
}, {})

export function getContributionWeeks(weeks = 53) {
  const start = new Date(dashboardSnapshot)
  start.setUTCHours(0, 0, 0, 0)
  start.setUTCDate(start.getUTCDate() - (weeks * 7 - 1))
  return Array.from({ length: weeks }, (_, weekIndex) =>
    Array.from({ length: 7 }, (_, dayIndex) => {
      const date = new Date(start)
      date.setUTCDate(start.getUTCDate() + weekIndex * 7 + dayIndex)
      const key = toDateKey(date)
      const count = countsByDate[key] || 0
      const level = count === 0 ? 0 : count === 1 ? 1 : count === 2 ? 2 : count <= 4 ? 3 : 4
      return { date: key, count, level }
    }),
  )
}

export function getDashboardData() {
  const thisMonth = seed.learning_logs.filter((log) => {
    const date = logDate(log)
    return date.getUTCFullYear() === dashboardSnapshot.getUTCFullYear()
      && date.getUTCMonth() === dashboardSnapshot.getUTCMonth()
  })
  const loggedDays = new Set(thisMonth.map((log) => toDateKey(logDate(log)))).size

  return {
    profile: seed.profiles[0],
    recentLogs,
    goals: seed.goals,
    activityDays,
    metrics: {
      streak: 12,
      personalBest: 40,
      loggedDays,
      monthDays: dashboardSnapshot.getUTCDate(),
      weeklyHours: 9.5,
      weeklyChange: '+2.0 vs last week',
    },
  }
}
