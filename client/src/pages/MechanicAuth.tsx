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
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

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
            // Check if an account already exists before attempting signup
            try {
              const API_URL = (import.meta.env.VITE_API_URL as string) || 'http://localhost:5000'
              const res = await fetch(`${API_URL}/api/auth/users/${encodeURIComponent(email)}/exists`)
              if (res.ok) {
                const payload = await res.json().catch(() => undefined as any)
                if (payload?.exists === true) {
                  setError('Account already exists. Please sign in or reset your password.')
                  return
                }
              }
            } catch {/* ignore existence check failures and fall back to sign up */}
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
                <div className="relative">
                  <input
                    className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white/50 backdrop-blur-sm"
                    placeholder="Enter your password"
                    autoComplete={isRegister ? 'new-password' : 'current-password'}
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"/>
                      </svg>
                    ) : (
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/>
                      </svg>
                    )}
                  </button>
                </div>
              </div>
              {isRegister && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Confirm Password</label>
                  <div className="relative">
                    <input
                      className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white/50 backdrop-blur-sm"
                      placeholder="Confirm your password"
                      autoComplete="new-password"
                      type={showConfirmPassword ? 'text' : 'password'}
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      required
                    />
                    <button
                      type="button"
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    >
                      {showConfirmPassword ? (
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"/>
                        </svg>
                      ) : (
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/>
                        </svg>
                      )}
                    </button>
                  </div>
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
                <div className="relative">
                  <input
                    className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white/50 backdrop-blur-sm"
                    placeholder="Enter your new password"
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"/>
                      </svg>
                    ) : (
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/>
                      </svg>
                    )}
                  </button>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Confirm New Password</label>
                <div className="relative">
                  <input
                    className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white/50 backdrop-blur-sm"
                    placeholder="Confirm your new password"
                    type={showConfirmPassword ? 'text' : 'password'}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? (
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"/>
                      </svg>
                    ) : (
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/>
                      </svg>
                    )}
                  </button>
                </div>
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
            <div className="text-center">
              <button
                className="text-blue-600 hover:text-blue-700 font-medium transition-colors underline"
                onClick={() => setIsRegister((v) => !v)}
              >
                {isRegister ? 'Already have an account? Sign In' : "Don't have an account? Create One"}
              </button>
            </div>
            {!isRegister && (
              <div className="text-center">
                <button 
                  className="text-blue-600 hover:text-blue-700 font-medium transition-colors underline"
                  onClick={forgotPassword}
                >
                  Forgot password?
                </button>
              </div>
            )}
            {isRegister && (
              <div className="text-center">
                <button 
                  className="text-blue-600 hover:text-blue-700 text-sm font-medium transition-colors underline"
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


