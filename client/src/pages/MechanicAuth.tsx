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
    <div className="min-h-screen flex items-center justify-center px-4 bg-gradient-to-br from-blue-50 via-white to-blue-100">
      <div className="w-full max-w-md">
        {/* Header Section */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <button 
              className="inline-flex items-center gap-1 bg-white/80 backdrop-blur-sm text-gray-600 hover:text-blue-600 hover:bg-blue-50 px-2 py-1 rounded-full border border-gray-200 hover:border-blue-300 transition-all duration-200 shadow-sm hover:shadow-md"
              onClick={() => navigate(-1)}
            >
              <div className="w-4 h-4 bg-gray-100 hover:bg-blue-100 rounded-full flex items-center justify-center transition-colors duration-200">
                <span className="text-xs">←</span>
              </div>
              <span className="text-xs font-medium">Back</span>
            </button>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-blue-700 rounded-full flex items-center justify-center shadow-lg">
                <span className="text-white text-xl">🔧</span>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Mechanic Portal</h1>
                <p className="text-sm text-gray-600">Professional Service Access</p>
              </div>
            </div>
            <div className="w-20"></div> {/* Spacer for balance */}
          </div>
        </div>

        {/* Login Card */}
        <div className="glass p-8 rounded-3xl shadow-xl border border-white/20 animate-[fadeIn_300ms_ease-out]">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              {isPasswordReset ? 'Reset Password' : isRegister ? 'Create Account' : 'Welcome Back'}
            </h2>
            <p className="text-gray-600">
              {isPasswordReset ? 'Enter your new password' : isRegister ? 'Join our network of professional mechanics' : 'Sign in to access your dashboard'}
            </p>
          </div>
        {error && <p className="text-red-600 mb-3 text-sm">{error}</p>}
        {info && <p className="text-green-600 mb-3 text-sm">{info}</p>}

        {!isPasswordReset ? (
          <form onSubmit={onSubmit} className="space-y-6">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                <input
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white/50 backdrop-blur-sm"
                  placeholder="Enter your email address"
                  autoComplete="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
                <input
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white/50 backdrop-blur-sm"
                  placeholder="Enter your password"
                  autoComplete={isRegister ? 'new-password' : 'current-password'}
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              {isRegister && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Confirm Password</label>
                  <input
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white/50 backdrop-blur-sm"
                    placeholder="Confirm your password"
                    autoComplete="new-password"
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                  />
                </div>
              )}
            </div>
            <button
              className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold py-3 px-6 rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed disabled:transform-none"
              type="submit"
              disabled={loading}
            >
              {loading ? (
                <div className="flex items-center justify-center gap-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Please wait...
                </div>
              ) : (
                <div className="flex items-center justify-center gap-2">
                  {isRegister ? 'Create Account' : 'Sign In'}
                  <span>{isRegister ? '→' : '→'}</span>
                </div>
              )}
            </button>
          </form>
        ) : (
          <form onSubmit={onResetPassword} className="space-y-6">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">New Password</label>
                <input
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white/50 backdrop-blur-sm"
                  placeholder="Enter your new password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Confirm New Password</label>
                <input
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white/50 backdrop-blur-sm"
                  placeholder="Confirm your new password"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
              </div>
            </div>
            <button 
              className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold py-3 px-6 rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200"
              type="submit"
            >
              Update Password
            </button>
          </form>
        )}

        {!isPasswordReset && (
          <div className="mt-8 space-y-4">
            <div className="flex items-center justify-between text-sm">
              <button
                className="text-blue-600 hover:text-blue-700 font-medium transition-colors"
                onClick={() => setIsRegister((v) => !v)}
              >
                {isRegister ? 'Already have an account? Sign In' : "Don't have an account? Create One"}
              </button>
              {!isRegister && (
                <button 
                  className="text-blue-600 hover:text-blue-700 font-medium transition-colors"
                  onClick={forgotPassword}
                >
                  Forgot password?
                </button>
              )}
            </div>
            {isRegister && (
              <div className="text-center">
                <button 
                  className="text-blue-600 hover:text-blue-700 text-sm font-medium transition-colors"
                  onClick={resendConfirmation}
                >
                  Resend confirmation email
                </button>
              </div>
            )}
          </div>
        )}
        </div>
      </div>
    </div>
  )
}


