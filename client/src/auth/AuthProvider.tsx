import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import type { Session, User } from '@supabase/supabase-js'
import { supabase } from '../lib/supabaseClient'

type Role = 'user' | 'mechanic'

type AuthContextValue = {
  session: Session | null
  user: User | null
  role: Role | null
  signInWithPassword: (email: string, password: string) => Promise<{ error?: string; ok?: boolean }>
  signUpMechanic: (
    email: string,
    password: string
  ) => Promise<{ error?: string; userConfirmed?: boolean; ok?: boolean }>
  sendPasswordReset: (email: string) => Promise<{ error?: string; ok?: boolean }>
  updatePasswordWithCode: (code: string, newPassword: string) => Promise<{ error?: string; ok?: boolean }>
  signOut: () => Promise<void>
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [session, setSession] = useState<Session | null>(null)
  const [user, setUser] = useState<User | null>(null)
  const [role, setRole] = useState<Role | null>(null)

  function getRoleFromMeta(meta: unknown): Role | undefined {
    if (meta && typeof meta === 'object' && 'role' in (meta as Record<string, unknown>)) {
      const value = (meta as Record<string, unknown>).role
      if (value === 'mechanic' || value === 'user') return value
    }
    return undefined
  }

  useEffect(() => {
    supabase.auth.getSession().then(({ data, error }) => {
      if (error) console.error('[supabase.getSession] error', error)
      else console.log('[supabase.getSession] data', data)
      setSession(data.session ?? null)
      setUser(data.session?.user ?? null)
    })
    const { data: listener } = supabase.auth.onAuthStateChange((_event, newSession) => {
      console.log('[supabase.onAuthStateChange]', _event, newSession)
      setSession(newSession)
      setUser(newSession?.user ?? null)
    })
    return () => listener.subscription.unsubscribe()
  }, [])

  useEffect(() => {
    if (!user) {
      setRole(null)
      return
    }
    const claim = getRoleFromMeta(user.user_metadata) ?? getRoleFromMeta(user.app_metadata)
    setRole(claim ?? 'user')
    console.log('[auth] resolved role + user1:', claim ?? 'user')
    console.log('[auth] resolved for user',user)
  }, [user])

  const signInWithPassword = async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) console.error('[signInWithPassword] error', error)
    else console.log('[signInWithPassword] data', data)
    return { error: error?.message, ok: !error }
  }

  const signUpMechanic = async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { role: 'mechanic' },
        emailRedirectTo: `${window.location.origin}/mechanic`,
      },
    })
    if (error) console.error('[signUpMechanic] error', error)
    else console.log('[signUpMechanic] data', data)
    const userConfirmed = !!data.session
    return { error: error?.message, userConfirmed, ok: !error }
  }

  const sendPasswordReset = async (email: string) => {
    const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/mechanic`,
    })
    if (error) console.error('[resetPasswordForEmail] error', error)
    else console.log('[resetPasswordForEmail] data', data)
    return { error: error?.message, ok: !error }
  }

  const updatePasswordWithCode = async (code: string, newPassword: string) => {
    const { data: xData, error } = await supabase.auth.exchangeCodeForSession(code)
    if (error) {
      console.error('[exchangeCodeForSession] error', error)
      return { error: error.message }
    }
    console.log('[exchangeCodeForSession] data', xData)
    const { data: uData, error: updateErr } = await supabase.auth.updateUser({ password: newPassword })
    if (updateErr) console.error('[updateUser password] error', updateErr)
    else console.log('[updateUser password] data', uData)
    return { error: updateErr?.message, ok: !updateErr }
  }

  const signOut = async () => {
    await supabase.auth.signOut()
  }

  const value = useMemo<AuthContextValue>(
    () => ({ session, user, role, signInWithPassword, signUpMechanic, sendPasswordReset, updatePasswordWithCode, signOut }),
    [session, user, role]
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}


