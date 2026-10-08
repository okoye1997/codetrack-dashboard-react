import { useMemo, useState } from 'react'
import { demoAccounts } from '../services/MockDataservice.js'
import { AuthContext } from './AuthContextValue.js'

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [accounts, setAccounts] = useState(demoAccounts)

  const value = useMemo(() => ({
    user,
    signIn(email, password) {
      const account = accounts.find((entry) => entry.email.toLowerCase() === email.toLowerCase() && entry.password === password)
      if (!account) return false
      setUser({ name: account.display_name, email: account.email })
      return true
    },
    signUp(name, email, password) {
      if (accounts.some((entry) => entry.email.toLowerCase() === email.toLowerCase())) return false
      const account = { display_name: name, email, password }
      setAccounts((current) => [...current, account])
      setUser({ name, email })
      return true
    },
    signOut() {
      setUser(null)
    },
  }), [accounts, user])

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
