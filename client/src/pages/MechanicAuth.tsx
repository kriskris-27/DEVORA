import { useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../auth/AuthProvider'
import { supabase } from '../lib/supabaseClient'

export default function MechanicAuth() {
  const { signInWithPassword, signUpMechanic, sendPasswordReset, updatePasswordWithCode, user, role } = useAuth()
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [isRegister, setIsRegister] = useState(false)
  const [error, setError] = useState<string | undefined>()
  const [info, setInfo] = useState<string | undefined>()
  const [loading, setLoading] = useState(false)

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(undefined)
    setInfo(undefined)
    setLoading(true)
    try {
      if (isRegister) {
        if (password.length < 6) {
          setError('Password must be at least 6 characters')
          return
        }
        if (password !== confirmPassword) {
          setError('Passwords do not match')
          return
        }
        const { error, userConfirmed } = await signUpMechanic(email, password)
        if (error) {
          setError(error)
          return
        }
        if (!userConfirmed) {
          setInfo('Check your email to confirm your account, then log in.')
        }
      } else {
        const { error } = await signInWithPassword(email, password)
        if (error) setError(error)
      }
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    const decideNext = async () => {
      if (!(user && role === 'mechanic')) return
      const API_URL = (import.meta.env.VITE_API_URL as string) || 'http://localhost:5000'
      try {
        const res = await fetch(`${API_URL}/api/mechanics/${encodeURIComponent(user.email!)}`)
        if (res.status === 404) {
          navigate('/mechanic/onboarding', { replace: true })
        } else if (res.ok) {
          navigate('/mechanic/dashboard', { replace: true })
        } else {
          navigate('/mechanic/onboarding', { replace: true })
        }
      } catch {
        navigate('/mechanic/onboarding', { replace: true })
      }
    }
    decideNext()
  }, [user, role, navigate])

  // Handle email confirmation redirect (PKCE flow): exchange ?code= for a session
  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const code = params.get('code')
    if (!code) return
    ;(async () => {
      const { error } = await supabase.auth.exchangeCodeForSession(code)
      if (error) setError(error.message)
      // on success, onAuthStateChange will set user/session and redirect via the other effect
      // clean the URL
      const url = new URL(window.location.href)
      url.searchParams.delete('code')
      window.history.replaceState({}, '', url.toString())
    })()
  }, [])

  const forgotPassword = async () => {
    setError(undefined)
    setInfo(undefined)
    if (!email) return setError('Enter your email first')
    try {
      setLoading(true)
      const API_URL = (import.meta.env.VITE_API_URL as string) || 'http://localhost:5000'
      const res = await fetch(`${API_URL}/api/auth/users/${encodeURIComponent(email)}/exists`)
      if (!res.ok) {
        return setError('Could not verify email. Try again later.')
      }
      const payload = await res.json().catch(() => undefined as any)
      if (!payload?.exists) {
        return setError('User not found')
      }
      const { error, ok } = await sendPasswordReset(email)
      if (error) return setError(error)
      if (ok) setInfo('Password reset email sent. Check your inbox.')
    } finally {
      setLoading(false)
    }
  }

  const resendConfirmation = async () => {
    setError(undefined)
    setInfo(undefined)
    if (!email) return setError('Enter your email first')
    const { error } = await supabase.auth.resend({
      type: 'signup',
      email,
      options: { emailRedirectTo: `${window.location.origin}/mechanic` },
    })
    if (error) return setError(error.message)
    setInfo('Confirmation email resent. Please check your inbox/spam folder.')
  }

  const codeInUrl = useMemo(() => new URLSearchParams(window.location.search).get('code'), [])
  const isPasswordReset = useMemo(() => new URLSearchParams(window.location.search).get('type') === 'recovery', [])

  const onResetPassword = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(undefined)
    setInfo(undefined)
    if (!codeInUrl) return setError('Missing recovery code in URL')
    if (password.length < 6) return setError('Password must be at least 6 characters')
    if (password !== confirmPassword) return setError('Passwords do not match')
    const { error, ok } = await updatePasswordWithCode(codeInUrl, password)
    if (error) return setError(error)
    if (ok) setInfo('Password updated. You can now log in.')
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-md glass p-6 animate-[fadeIn_300ms_ease-out]">
        <div className="flex items-center justify-between mb-4">
          <button className="btn btn-ghost" onClick={() => navigate(-1)}>Back</button>
          <span className="text-xs text-gray-600">Mechanic Portal</span>
        </div>
        <h1 className="text-2xl font-semibold mb-4">
          {isPasswordReset ? 'Reset Password' : isRegister ? 'Mechanic Registration' : 'Mechanic Login'}
        </h1>
        {error && <p className="text-red-600 mb-3 text-sm">{error}</p>}
        {info && <p className="text-green-600 mb-3 text-sm">{info}</p>}

        {!isPasswordReset ? (
          <form onSubmit={onSubmit} className="space-y-3">
            <input
              className="input"
              placeholder="Email"
              autoComplete="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              className="input"
              placeholder="Password"
              autoComplete={isRegister ? 'new-password' : 'current-password'}
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            {isRegister && (
              <input
                className="input"
                placeholder="Confirm Password"
                autoComplete="new-password"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            )}
            <button
              className="btn btn-primary w-full disabled:opacity-60"
              type="submit"
              disabled={loading}
            >
              {loading ? 'Please wait…' : isRegister ? 'Register' : 'Login'}
            </button>
          </form>
        ) : (
          <form onSubmit={onResetPassword} className="space-y-3">
            <input
              className="input"
              placeholder="New Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <input
              className="input"
              placeholder="Confirm New Password"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
            <button className="btn btn-primary w-full" type="submit">
              Update Password
            </button>
          </form>
        )}

        {!isPasswordReset && (
          <>
            <div className="mt-4 flex items-center justify-between text-sm">
              <button
                className="btn btn-ghost"
                onClick={() => setIsRegister((v) => !v)}
              >
                {isRegister ? 'Have an account? Login' : "Don't have an account? Register"}
              </button>
              {!isRegister && (
                <button className="btn btn-ghost" onClick={forgotPassword}>
                  Forgot password?
                </button>
              )}
            </div>
            {isRegister && (
              <div className="mt-2 text-right">
                <button className="btn btn-ghost text-sm" onClick={resendConfirmation}>
                  Resend confirmation email
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}


