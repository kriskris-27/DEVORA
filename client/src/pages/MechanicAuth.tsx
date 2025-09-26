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
    if (user && role === 'mechanic') {
      navigate('/mechanic/dashboard', { replace: true })
    }
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
    const { error, ok } = await sendPasswordReset(email)
    if (error) return setError(error)
    if (ok) setInfo('Password reset email sent. Check your inbox.')
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
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-md bg-white rounded-lg shadow p-6">
        <h1 className="text-2xl font-semibold mb-4">
          {isPasswordReset ? 'Reset Password' : isRegister ? 'Mechanic Registration' : 'Mechanic Login'}
        </h1>
        {error && <p className="text-red-600 mb-3 text-sm">{error}</p>}
        {info && <p className="text-green-600 mb-3 text-sm">{info}</p>}

        {!isPasswordReset ? (
          <form onSubmit={onSubmit} className="space-y-3">
            <input
              className="w-full border rounded px-3 py-2"
              placeholder="Email"
              autoComplete="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              className="w-full border rounded px-3 py-2"
              placeholder="Password"
              autoComplete={isRegister ? 'new-password' : 'current-password'}
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            {isRegister && (
              <input
                className="w-full border rounded px-3 py-2"
                placeholder="Confirm Password"
                autoComplete="new-password"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            )}
            <button
              className="w-full bg-blue-600 text-white rounded py-2 hover:bg-blue-700 disabled:opacity-60"
              type="submit"
              disabled={loading}
            >
              {loading ? 'Please wait…' : isRegister ? 'Register' : 'Login'}
            </button>
          </form>
        ) : (
          <form onSubmit={onResetPassword} className="space-y-3">
            <input
              className="w-full border rounded px-3 py-2"
              placeholder="New Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <input
              className="w-full border rounded px-3 py-2"
              placeholder="Confirm New Password"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
            <button className="w-full bg-blue-600 text-white rounded py-2 hover:bg-blue-700" type="submit">
              Update Password
            </button>
          </form>
        )}

        {!isPasswordReset && (
          <>
            <div className="mt-4 flex items-center justify-between text-sm">
              <button
                className="text-blue-600 hover:underline"
                onClick={() => setIsRegister((v) => !v)}
              >
                {isRegister ? 'Have an account? Login' : "Don't have an account? Register"}
              </button>
              {!isRegister && (
                <button className="text-blue-600 hover:underline" onClick={forgotPassword}>
                  Forgot password?
                </button>
              )}
            </div>
            {isRegister && (
              <div className="mt-2 text-right">
                <button className="text-sm text-blue-600 hover:underline" onClick={resendConfirmation}>
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


