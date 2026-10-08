import { useMemo } from 'react'
import { getDashboardData } from '../services/MockDataservice.js'
import { DashboardContext } from './DashboardContextValue.js'

export function DashboardProvider({ children }) {
  const data = useMemo(() => getDashboardData(), [])
  return <DashboardContext.Provider value={data}>{children}</DashboardContext.Provider>
}
